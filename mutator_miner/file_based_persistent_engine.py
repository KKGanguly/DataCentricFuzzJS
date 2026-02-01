#!/usr/bin/env python3
"""
file_based_persistent_engine.py

File-based persistent engine that works with STOCK V8 (no patches needed).
Uses file polling instead of pipes - much simpler and actually works!

Expected performance: 500-2000 execs/s per worker (vs 8.5 with one-shot)
"""

import os
import time
import tempfile
import subprocess
from pathlib import Path
from typing import Tuple

class FilePersistentEngine:
    """
    File-based persistent engine for stock V8.
    
    Protocol:
    1. Write code to input.js
    2. Write signal to trigger.txt (timestamp)
    3. Wrapper reads input.js, executes, writes status.json
    4. Parent reads status.json
    5. Repeat
    """
    
    def __init__(self, engine: str, engine_path: str, args: list, timeout: float = 2.0):
        self.engine = engine
        self.engine_path = engine_path
        self.args = args
        self.timeout = timeout
        self.proc = None
        
        # Create communication directory
        self.work_dir = Path(tempfile.mkdtemp(prefix=f'fuzzer_{engine}_'))
        self.input_file = self.work_dir / 'input.js'
        self.status_file = self.work_dir / 'status.json'
        self.trigger_file = self.work_dir / 'trigger.txt'
        self.wrapper_file = self.work_dir / 'wrapper.js'
        
        # Create wrapper script
        self._create_wrapper()
        
        # Start persistent session
        self._start()
    
    def _create_wrapper(self):
        """Create wrapper script that polls for new test cases"""
        
        wrapper = f'''
// File-based persistent fuzzing wrapper for V8
const INPUT_FILE = '{self.input_file}';
const STATUS_FILE = '{self.status_file}';
const TRIGGER_FILE = '{self.trigger_file}';

// Helper to read file content
function readFileContent(path) {{
    try {{
        return read(path);
    }} catch (e) {{
        return null;
    }}
}}

// Helper to write JSON status
function writeStatus(exitCode) {{
    const status = JSON.stringify({{
        exit_code: exitCode,
        timestamp: Date.now()
    }});
    
    // Use os.system to write file (works in d8)
    const cmd = `echo '${{status}}' > ${{STATUS_FILE}}`;
    try {{
        os.system(cmd);
    }} catch (e) {{
        // Fallback: try using write()
        try {{
            write(STATUS_FILE, status);
        }} catch (e2) {{
            print('WRITE_ERROR: ' + e2);
        }}
    }}
}}

// Main loop
let iteration = 0;
let lastTrigger = '';

print('WRAPPER_READY');

while (iteration < 100000) {{
    try {{
        // Poll for trigger file changes
        const trigger = readFileContent(TRIGGER_FILE);
        
        if (trigger && trigger !== lastTrigger) {{
            lastTrigger = trigger;
            iteration++;
            
            // Read test case
            const code = readFileContent(INPUT_FILE);
            
            if (!code) {{
                writeStatus(99);
                continue;
            }}
            
            // Clear previous state
            if (typeof gc === 'function') {{
                try {{ gc(); }} catch (e) {{}}
            }}
            
            // Execute test case
            let exitCode = 0;
            try {{
                eval(code);
            }} catch (e) {{
                // Execution error (syntax, reference, etc.)
                exitCode = 1;
            }}
            
            // Write status
            writeStatus(exitCode);
        }}
        
        // Small sleep to avoid busy-waiting
        os.sleep(0.001);  // 1ms
        
    }} catch (e) {{
        print('WRAPPER_ERROR: ' + e);
        writeStatus(99);
    }}
}}

print('WRAPPER_EXIT');
quit(0);
'''
        
        self.wrapper_file.write_text(wrapper)
    
    def _start(self):
        """Start the persistent engine process"""
        try:
            # Initialize files
            self.input_file.write_text('')
            self.status_file.write_text('')
            self.trigger_file.write_text('0')
            
            # Start wrapper
            cmd = [self.engine_path] + self.args + [str(self.wrapper_file)]
            
            self.proc = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                stdin=subprocess.DEVNULL,
                cwd=str(self.work_dir),
            )
            
            # Wait for wrapper to be ready
            start = time.time()
            while time.time() - start < 2.0:
                if self.proc.poll() is not None:
                    stderr = self.proc.stderr.read().decode('utf-8', errors='ignore')
                    raise Exception(f"Wrapper died immediately: {stderr}")
                
                # Check for ready signal
                try:
                    line = self.proc.stdout.readline()
                    if line and b'WRAPPER_READY' in line:
                        print(f"✓ FILE-BASED PERSISTENT SESSION STARTED for {self.engine} (PID: {self.proc.pid})")
                        return
                except:
                    pass
                
                time.sleep(0.01)
            
            raise Exception("Wrapper didn't signal ready in time")
        
        except Exception as e:
            print(f"[!] Failed to start persistent session: {e}")
            if self.proc:
                self.proc.kill()
                self.proc = None
            raise
    
    def execute(self, code: str) -> Tuple[int, str, str]:
        """
        Execute code in persistent session.
        Returns (exit_code, stdout, stderr)
        """
        if not self.proc or self.proc.poll() is not None:
            return (-2, '', 'ENGINE_DIED')
        
        try:
            # Write test case
            self.input_file.write_text(code)
            
            # Clear old status
            self.status_file.write_text('')
            
            # Trigger execution (write new timestamp)
            trigger = str(time.time())
            self.trigger_file.write_text(trigger)
            
            # Wait for result
            start = time.time()
            while time.time() - start < self.timeout:
                # Check if status file was written
                try:
                    status_content = self.status_file.read_text()
                    if status_content:
                        import json
                        status = json.loads(status_content)
                        exit_code = status.get('exit_code', 0)
                        return (exit_code, '', '')
                except (json.JSONDecodeError, FileNotFoundError):
                    pass
                
                # Check if process died
                if self.proc.poll() is not None:
                    return (-2, '', 'ENGINE_DIED')
                
                time.sleep(0.001)  # 1ms polling
            
            # Timeout
            return (-1, '', 'TIMEOUT')
        
        except Exception as e:
            return (-2, '', f'ERROR: {e}')
    
    def close(self):
        """Close the persistent session"""
        if self.proc:
            try:
                self.proc.terminate()
                self.proc.wait(timeout=1)
            except:
                self.proc.kill()
            self.proc = None
        
        # Cleanup work directory
        try:
            import shutil
            shutil.rmtree(self.work_dir, ignore_errors=True)
        except:
            pass
    
    def __del__(self):
        self.close()


# Quick test
if __name__ == '__main__':
    import sys
    
    v8_path = os.environ.get('V8_PATH', '/home/kgangul/DataCentricFuzzJS/v8/out/fuzzbuild/d8')
    
    if not os.path.exists(v8_path):
        print(f"V8 not found at {v8_path}")
        print("Set V8_PATH environment variable")
        sys.exit(1)
    
    print("Testing file-based persistent engine...")
    print(f"V8: {v8_path}")
    print()
    
    # Create session
    engine = FilePersistentEngine(
        engine='v8',
        engine_path=v8_path,
        args=['--expose-gc', '--allow-natives-syntax'],
        timeout=1.0
    )
    
    # Run test cases
    test_cases = [
        "print('test 1');",
        "var x = 1 + 1; print(x);",
        "function foo() { return 42; } print(foo());",
        "throw new Error('test error');",  # Should return exit_code=1
        "var arr = [1,2,3]; print(arr.length);",
    ]
    
    print("Running test cases...")
    start = time.time()
    
    for i, code in enumerate(test_cases * 100):  # 500 total executions
        exit_code, stdout, stderr = engine.execute(code)
        
        if i % 100 == 0:
            elapsed = time.time() - start
            rate = (i + 1) / elapsed if elapsed > 0 else 0
            print(f"  {i+1} execs | Rate: {rate:.1f}/s | Exit: {exit_code}")
    
    elapsed = time.time() - start
    total = len(test_cases) * 100
    rate = total / elapsed
    
    print()
    print(f"✓ Completed {total} executions in {elapsed:.2f}s")
    print(f"✓ Rate: {rate:.1f} execs/second")
    print()
    
    if rate > 100:
        print("SUCCESS! File-based persistent session is working!")
    else:
        print("WARNING: Rate is low, something might be wrong")
    
    engine.close()
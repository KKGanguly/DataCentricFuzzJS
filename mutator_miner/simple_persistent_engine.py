#!/usr/bin/env python3
"""
ULTRA-OPTIMIZED SimplePersistentEngine
Target: 500+ execs/s
"""

import os
import sys
import time
import tempfile
import subprocess
from pathlib import Path
from typing import Tuple

class SimplePersistentEngine:
    """
    Ultra-optimized version - minimal overhead
    """
    
    def __init__(self, engine: str, engine_path: str, args: list, timeout: float = 2.0):
        self.engine = engine
        self.engine_path = engine_path
        self.args = args
        self.timeout = timeout
        self.proc = None
        self.exec_count = 0
        
        self.wrapper_file = self._create_wrapper()
        self._start()
    
    def _create_wrapper(self) -> Path:
        """Create wrapper"""
        
        wrapper = '''
// Ultra-optimized wrapper
print('READY');

while (true) {
    try {
        var line = readline();
        if (!line || line === 'QUIT') quit(0);
        
        if (typeof gc === 'function') {
            try { gc(); } catch (e) {}
        }
        
        var capturedOutput = [];
        var originalPrint = print;
        print = function() {
            capturedOutput.push(Array.prototype.slice.call(arguments).join(' '));
        };
        
        var exitCode = 0;
        var errorMsg = '';
        try {
            eval(line);
        } catch (e) {
            exitCode = 1;
            errorMsg = String(e);
        }
        
        print = originalPrint;
        
        var stdout = capturedOutput.join('\\n').replace(/\\n/g, '\\\\n').replace(/\\|/g, '\\\\|');
        var stderr = errorMsg.replace(/\\n/g, '\\\\n').replace(/\\|/g, '\\\\|');
        
        print('STATUS:' + exitCode + '|STDOUT:' + stdout + '|STDERR:' + stderr);
    } catch (e) {
        print('ERROR:' + e);
        quit(1);
    }
}
'''
        
        tmp = tempfile.NamedTemporaryFile(
            mode='w', suffix='.js', delete=False, prefix=f'wrapper_{self.engine}_'
        )
        tmp.write(wrapper)
        tmp.close()
        
        self.wrapper_file = Path(tmp.name)
        return self.wrapper_file
    
    def _start(self):
        """Start the persistent process"""
        try:
            cmd = [self.engine_path] + self.args + [str(self.wrapper_file)]
            
            self.proc = subprocess.Popen(
                cmd,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                bufsize=0,
            )
            
            # Wait for READY
            start = time.time()
            while time.time() - start < 2.0:
                line = self.proc.stdout.readline()
                if line and b'READY' in line:
                    print(f"✓ PERSISTENT ENGINE STARTED (PID: {self.proc.pid})")
                    return
            
            raise Exception("No READY signal")
        
        except Exception as e:
            print(f"[!] Failed to start: {e}")
            if self.proc:
                self.proc.kill()
                self.proc = None
            raise
    
    def execute(self, code: str) -> Tuple[int, str, str]:
        """Execute code - ULTRA OPTIMIZED"""
        if not self.proc or self.proc.poll() is not None:
            return (-2, '', 'ENGINE_DIED')
        
        try:
            # Escape and send
            code_oneline = code.replace('\\', '\\\\').replace('\n', '\\n').replace('\r', '')
            self.proc.stdin.write((code_oneline + '\n').encode('utf-8'))
            self.proc.stdin.flush()
            
            # OPTIMIZED: Just readline() - it blocks until data is available
            # This is MUCH faster than select() polling
            line = self.proc.stdout.readline()
            
            if not line:
                return (-2, '', 'NO_RESPONSE')
            
            line = line.decode('utf-8', errors='ignore').strip()
            
            if line.startswith('STATUS:'):
                # Fast parse
                parts = line.split('|', 2)  # Split into max 3 parts
                
                exit_code = 0
                stdout = ''
                stderr = ''
                
                # Parse STATUS
                if parts[0].startswith('STATUS:'):
                    exit_code = int(parts[0].split(':', 1)[1])
                
                # Parse STDOUT
                if len(parts) > 1 and parts[1].startswith('STDOUT:'):
                    stdout = parts[1].split(':', 1)[1] if ':' in parts[1] else ''
                    stdout = stdout.replace('\\n', '\n')
                
                # Parse STDERR
                if len(parts) > 2 and parts[2].startswith('STDERR:'):
                    stderr = parts[2].split(':', 1)[1] if ':' in parts[2] else ''
                    stderr = stderr.replace('\\n', '\n')
                
                self.exec_count += 1
                
                if self.exec_count >= 10000:
                    self._restart()
                
                return (exit_code, stdout, stderr)
            
            elif line.startswith('ERROR:'):
                return (-2, '', line)
            
            else:
                return (-2, '', f'UNEXPECTED: {line}')
        
        except Exception as e:
            return (-2, '', f'ERROR: {e}')
    
    def _restart(self):
        """Restart the engine"""
        self.close()
        self.exec_count = 0
        time.sleep(0.01)
        self._start()
    
    def close(self):
        """Close the engine"""
        if self.proc:
            try:
                self.proc.stdin.write(b'QUIT\n')
                self.proc.stdin.flush()
                self.proc.wait(timeout=1)
            except:
                self.proc.kill()
            self.proc = None
        
        if self.wrapper_file and self.wrapper_file.exists():
            try:
                self.wrapper_file.unlink()
            except:
                pass
    
    def __del__(self):
        self.close()


# Test
if __name__ == '__main__':
    v8_path = os.environ.get('V8_PATH', '/home/kgangul/DataCentricFuzzJS/v8/out/fuzzbuild/d8')
    
    if not os.path.exists(v8_path):
        print(f"V8 not found: {v8_path}")
        sys.exit(1)
    
    print("="*70)
    print("ULTRA-OPTIMIZED ENGINE TEST")
    print("="*70)
    
    engine = SimplePersistentEngine(
        engine='v8',
        engine_path=v8_path,
        args=['--expose-gc', '--allow-natives-syntax'],
        timeout=1.0
    )
    
    # Quick functional test
    print("\nFunctional test...")
    tests = [
        ("print('hello');", 0, 'hello'),
        ("throw new Error('e');", 1, ''),
        ("print('a'); print('b');", 0, 'a\nb'),
    ]
    
    all_pass = True
    for code, expected_exit, expected_stdout in tests:
        exit_code, stdout, stderr = engine.execute(code)
        passed = (exit_code == expected_exit and stdout == expected_stdout)
        all_pass = all_pass and passed
        status = "✓" if passed else "✗"
        print(f"  {status} {code[:30]:30s} exit={exit_code} stdout={repr(stdout[:20])}")
    
    if not all_pass:
        print("\n❌ Functional tests FAILED!")
        engine.close()
        sys.exit(1)
    
    print("✓ All functional tests passed!\n")
    
    # Performance test
    print("="*70)
    print("PERFORMANCE TEST")
    print("="*70)
    
    perf_tests = [
        "print('x');",
        "var x = 1;",
        "var y = 2 + 2;",
        "print('a'); print('b');",
    ]
    
    # Warmup
    print("Warming up...")
    for _ in range(50):
        engine.execute(perf_tests[0])
    
    print("\nRunning 1000 executions...")
    start = time.time()
    
    for i in range(1000):
        code = perf_tests[i % len(perf_tests)]
        exit_code, stdout, stderr = engine.execute(code)
        
        if i % 250 == 0 and i > 0:
            elapsed = time.time() - start
            rate = i / elapsed
            print(f"  {i:4d} execs | {elapsed:5.2f}s | {rate:6.1f}/s")
    
    elapsed = time.time() - start
    rate = 1000 / elapsed
    
    print(f"\n{'='*70}")
    print(f"RESULTS:")
    print(f"  Total executions: 1000")
    print(f"  Total time:       {elapsed:.2f}s")
    print(f"  Average rate:     {rate:.1f} execs/s")
    print(f"{'='*70}")
    
    if rate > 500:
        print("\n🚀 BLAZING FAST! Excellent performance!")
    elif rate > 300:
        print("\n✅ VERY GOOD! High performance!")
    elif rate > 150:
        print("\n✅ GOOD! Decent performance!")
    elif rate > 100:
        print("\n✓ OK - Acceptable performance")
    else:
        print("\n⚠️  WARNING: Performance is lower than expected")
        print("   This might be due to:")
        print("   - Slow disk I/O")
        print("   - V8 build not optimized")
        print("   - System load")
    
    engine.close()
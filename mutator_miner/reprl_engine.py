#!/usr/bin/env python3
"""
reprl_engine.py

REPRL (Read-Eval-Print-Reset-Loop) engine wrapper for maximum fuzzing performance.
Similar to Fuzzilli's approach - keeps engine alive and communicates via pipes.
"""

import os
import subprocess
import tempfile
import time
import struct
from pathlib import Path
from typing import Tuple, Optional

class REPRLEngine:
    """
    REPRL-style engine wrapper using pipes for IPC.
    Protocol:
    1. Parent writes code length (4 bytes)
    2. Parent writes code
    3. Child executes code
    4. Child writes status (4 bytes: exit code)
    5. Repeat
    """
    
    def __init__(self, engine: str, engine_path: str, args: list, timeout: float = 2.0):
        self.engine = engine
        self.engine_path = engine_path
        self.args = args
        self.timeout = timeout
        
        # Create pipes for IPC
        self.ctrl_pipe_read, self.ctrl_pipe_write = os.pipe()
        self.data_pipe_read, self.data_pipe_write = os.pipe()
        self.status_pipe_read, self.status_pipe_write = os.pipe()
        
        # Create wrapper script
        self.wrapper_script = self._create_wrapper()
        
        # Start engine process
        self.proc = None
        self._start()
    
    def _create_wrapper(self) -> Path:
        """Create REPRL wrapper script for the engine"""
        
        if self.engine == 'v8':
            wrapper = f'''
// REPRL wrapper for V8
const CTRL_FD = {self.ctrl_pipe_read};
const DATA_FD = {self.data_pipe_read};
const STATUS_FD = {self.status_pipe_write};

// Helper to read exactly N bytes
function readNBytes(fd, n) {{
    let buf = new ArrayBuffer(n);
    let view = new Uint8Array(buf);
    let offset = 0;
    while (offset < n) {{
        let chunk = read(fd);
        if (chunk.length === 0) quit(0);
        for (let i = 0; i < chunk.length && offset < n; i++) {{
            view[offset++] = chunk.charCodeAt(i);
        }}
    }}
    return buf;
}}

// Helper to write status
function writeStatus(status) {{
    let buf = new ArrayBuffer(4);
    let view = new DataView(buf);
    view.setInt32(0, status, true);
    let arr = new Uint8Array(buf);
    let str = String.fromCharCode.apply(null, arr);
    write(STATUS_FD, str);
}}

// Main REPRL loop
while (true) {{
    try {{
        // Read code length (4 bytes, little-endian)
        let lenBuf = readNBytes(CTRL_FD, 4);
        let lenView = new DataView(lenBuf);
        let codeLen = lenView.getUint32(0, true);
        
        if (codeLen === 0 || codeLen > 10000000) break;
        
        // Read code
        let codeBuf = readNBytes(DATA_FD, codeLen);
        let codeView = new Uint8Array(codeBuf);
        let code = String.fromCharCode.apply(null, codeView);
        
        // Execute code
        let status = 0;
        try {{
            // Clear previous state
            if (typeof gc === 'function') gc();
            
            // Eval code
            eval(code);
        }} catch (e) {{
            // Execution error (but not crash)
            status = 1;
        }}
        
        // Write status
        writeStatus(status);
        
    }} catch (e) {{
        // Wrapper error
        print('REPRL_ERROR: ' + e);
        quit(99);
    }}
}}

quit(0);
'''
        
        elif self.engine == 'jsc':
            wrapper = f'''
// REPRL wrapper for JSC
const CTRL_FD = {self.ctrl_pipe_read};
const DATA_FD = {self.data_pipe_read};
const STATUS_FD = {self.status_pipe_write};

function readNBytes(fd, n) {{
    let result = '';
    while (result.length < n) {{
        let chunk = read(fd);
        if (chunk.length === 0) quit(0);
        result += chunk;
    }}
    return result.substr(0, n);
}}

function writeStatus(status) {{
    let buf = new ArrayBuffer(4);
    let view = new DataView(buf);
    view.setInt32(0, status, true);
    let arr = new Uint8Array(buf);
    let str = '';
    for (let i = 0; i < arr.length; i++) {{
        str += String.fromCharCode(arr[i]);
    }}
    write(STATUS_FD, str);
}}

while (true) {{
    try {{
        let lenStr = readNBytes(CTRL_FD, 4);
        let lenBuf = new ArrayBuffer(4);
        let lenView = new Uint8Array(lenBuf);
        for (let i = 0; i < 4; i++) {{
            lenView[i] = lenStr.charCodeAt(i);
        }}
        let codeLen = new DataView(lenBuf).getUint32(0, true);
        
        if (codeLen === 0 || codeLen > 10000000) break;
        
        let code = readNBytes(DATA_FD, codeLen);
        
        let status = 0;
        try {{
            if (typeof fullGC === 'function') fullGC();
            eval(code);
        }} catch (e) {{
            status = 1;
        }}
        
        writeStatus(status);
        
    }} catch (e) {{
        print('REPRL_ERROR: ' + e);
        quit(99);
    }}
}}

quit(0);
'''
        
        elif self.engine == 'spidermonkey':
            wrapper = f'''
// REPRL wrapper for SpiderMonkey
const CTRL_FD = {self.ctrl_pipe_read};
const DATA_FD = {self.data_pipe_read};
const STATUS_FD = {self.status_pipe_write};

function readNBytes(fd, n) {{
    let result = '';
    while (result.length < n) {{
        let chunk = readRelativeToScript(fd);
        if (!chunk) quit(0);
        result += chunk;
    }}
    return result.substr(0, n);
}}

function writeStatus(status) {{
    let buf = new ArrayBuffer(4);
    let view = new DataView(buf);
    view.setInt32(0, status, true);
    // Write to STATUS_FD
    putstr(String.fromCharCode.apply(null, new Uint8Array(buf)));
}}

while (true) {{
    try {{
        let lenStr = read(CTRL_FD, 4);
        if (!lenStr || lenStr.length < 4) break;
        
        let lenBuf = new ArrayBuffer(4);
        let lenView = new Uint8Array(lenBuf);
        for (let i = 0; i < 4; i++) {{
            lenView[i] = lenStr.charCodeAt(i);
        }}
        let codeLen = new DataView(lenBuf).getUint32(0, true);
        
        if (codeLen === 0 || codeLen > 10000000) break;
        
        let code = read(DATA_FD, codeLen);
        
        let status = 0;
        try {{
            if (typeof gc === 'function') gc();
            eval(code);
        }} catch (e) {{
            status = 1;
        }}
        
        writeStatus(status);
        
    }} catch (e) {{
        print('REPRL_ERROR: ' + e);
        quit(99);
    }}
}}

quit(0);
'''
        
        else:
            raise ValueError(f"REPRL not supported for {self.engine}")
        
        # Write wrapper to temp file
        tmp = tempfile.NamedTemporaryFile(
            mode='w', suffix='.js', delete=False, prefix=f'reprl_{self.engine}_'
        )
        tmp.write(wrapper)
        tmp.close()
        
        return Path(tmp.name)
    
    def _start(self):
        """Start the REPRL engine process"""
        try:
            # Close child ends of pipes in parent
            os.close(self.ctrl_pipe_read)
            os.close(self.data_pipe_read)
            os.close(self.status_pipe_write)
            
            # Start process with wrapper
            self.proc = subprocess.Popen(
                [self.engine_path] + self.args + [str(self.wrapper_script)],
                stdin=subprocess.DEVNULL,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                pass_fds=(self.ctrl_pipe_read, self.data_pipe_read, self.status_pipe_write),
            )
            
            # Give it time to start
            time.sleep(0.05)
            
            # Check if started
            if self.proc.poll() is not None:
                raise Exception(f"Engine failed to start: {self.proc.returncode}")
        
        except Exception as e:
            raise Exception(f"Failed to start REPRL engine: {e}")
    
    def execute(self, code: str) -> Tuple[int, str, str]:
        """
        Execute code via REPRL protocol.
        Returns (exit_code, stdout, stderr)
        """
        if not self.proc or self.proc.poll() is not None:
            return (-2, '', 'ENGINE_DIED')
        
        try:
            code_bytes = code.encode('utf-8')
            code_len = len(code_bytes)
            
            # Write code length (4 bytes, little-endian)
            len_bytes = struct.pack('<I', code_len)
            os.write(self.ctrl_pipe_write, len_bytes)
            
            # Write code
            os.write(self.data_pipe_write, code_bytes)
            
            # Read status with timeout
            start = time.time()
            status_bytes = b''
            while len(status_bytes) < 4:
                if time.time() - start > self.timeout:
                    return (-1, '', 'TIMEOUT')
                
                try:
                    chunk = os.read(self.status_pipe_read, 4 - len(status_bytes))
                    if not chunk:
                        return (-2, '', 'ENGINE_DIED')
                    status_bytes += chunk
                except BlockingIOError:
                    time.sleep(0.001)
            
            # Decode status
            status = struct.unpack('<i', status_bytes)[0]
            
            return (status, '', '')
        
        except Exception as e:
            return (-2, '', f'REPRL_ERROR: {e}')
    
    def close(self):
        """Close the REPRL engine"""
        if self.proc:
            try:
                # Signal shutdown (send 0-length code)
                len_bytes = struct.pack('<I', 0)
                os.write(self.ctrl_pipe_write, len_bytes)
                
                self.proc.wait(timeout=1)
            except:
                self.proc.kill()
            
            self.proc = None
        
        # Close pipes
        for fd in [self.ctrl_pipe_write, self.data_pipe_write, self.status_pipe_read]:
            try:
                os.close(fd)
            except:
                pass
        
        # Cleanup wrapper
        if self.wrapper_script and self.wrapper_script.exists():
            try:
                self.wrapper_script.unlink()
            except:
                pass
    
    def __del__(self):
        self.close()


# ============================================================================
# SIMPLE FILE-BASED PROTOCOL (fallback for engines that don't support REPRL)
# ============================================================================

class SimplePersistentEngine:
    """
    Simpler file-based persistent engine (for engines that don't work with REPRL).
    Still much faster than spawning new process each time.
    """
    
    def __init__(self, engine: str, engine_path: str, args: list, timeout: float = 2.0):
        self.engine = engine
        self.engine_path = engine_path
        self.args = args
        self.timeout = timeout
        
        # Create communication files
        self.code_file = tempfile.NamedTemporaryFile(
            mode='w', suffix='.js', delete=False, prefix=f'code_{engine}_'
        )
        self.status_file = tempfile.NamedTemporaryFile(
            mode='w', suffix='.json', delete=False, prefix=f'status_{engine}_'
        )
        self.wrapper_file = tempfile.NamedTemporaryFile(
            mode='w', suffix='.js', delete=False, prefix=f'wrapper_{engine}_'
        )
        
        # Create wrapper
        wrapper = f'''
// Simple persistent wrapper
const CODE_FILE = '{self.code_file.name}';
const STATUS_FILE = '{self.status_file.name}';

let iteration = 0;

while (iteration < 10000) {{  // Restart after 10k runs to prevent memory issues
    iteration++;
    
    try {{
        // Read code
        let code = read(CODE_FILE);
        
        // Clear state
        if (typeof gc === 'function') gc();
        
        // Execute
        let status = 0;
        try {{
            eval(code);
        }} catch (e) {{
            status = 1;
        }}
        
        // Write status  
        let statusData = JSON.stringify({{status: status, iteration: iteration}});
        
        // Signal completion by writing status
        const fs = {{
            writeFile: function(path, data) {{
                // Use print to write to file (engine-specific)
                printToFile(path, data);
            }}
        }};
        
        // Write completion marker
        print('DONE:' + iteration);
        
    }} catch (e) {{
        print('ERROR:' + e);
        quit(1);
    }}
}}

quit(0);
'''
        
        self.wrapper_file.write(wrapper)
        self.wrapper_file.close()
        self.code_file.close()
        self.status_file.close()
        
        # Start process
        self.proc = None
        self._start()
    
    def _start(self):
        """Start the engine"""
        try:
            self.proc = subprocess.Popen(
                [self.engine_path] + self.args + [self.wrapper_file.name],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                bufsize=0,
            )
            
            time.sleep(0.05)
            
            if self.proc.poll() is not None:
                raise Exception(f"Engine failed to start")
        
        except Exception as e:
            raise Exception(f"Failed to start engine: {e}")
    
    def execute(self, code: str) -> Tuple[int, str, str]:
        """Execute code"""
        if not self.proc or self.proc.poll() is not None:
            return (-2, '', 'ENGINE_DIED')
        
        try:
            # Write code
            with open(self.code_file.name, 'w') as f:
                f.write(code)
            
            # Wait for completion
            start = time.time()
            while time.time() - start < self.timeout:
                # Check stdout for completion marker
                line = self.proc.stdout.readline()
                if line:
                    line = line.decode('utf-8', errors='ignore').strip()
                    if line.startswith('DONE:'):
                        return (0, '', '')
                    elif line.startswith('ERROR:'):
                        return (1, '', line)
                
                time.sleep(0.001)
            
            # Timeout
            return (-1, '', 'TIMEOUT')
        
        except Exception as e:
            return (-2, '', f'ERROR: {e}')
    
    def close(self):
        """Close engine"""
        if self.proc:
            try:
                self.proc.terminate()
                self.proc.wait(timeout=1)
            except:
                self.proc.kill()
            self.proc = None
        
        # Cleanup files
        for f in [self.code_file, self.status_file, self.wrapper_file]:
            if hasattr(f, 'name') and os.path.exists(f.name):
                try:
                    os.unlink(f.name)
                except:
                    pass
    
    def __del__(self):
        self.close()
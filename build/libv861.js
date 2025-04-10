;
var injection={
    screen_event:((...a)=>{}),
    WebSocket: undefined,
};
(function() {
    'use strict';
    var $jscomp = $jscomp || {};
    $jscomp.scope = {};
    $jscomp.ASSUME_ES5 = !1;
    $jscomp.ASSUME_NO_NATIVE_MAP = !1;
    $jscomp.ASSUME_NO_NATIVE_SET = !1;
    $jscomp.SIMPLE_FROUND_POLYFILL = !1;
    $jscomp.ISOLATE_POLYFILLS = !1;
    $jscomp.FORCE_POLYFILL_PROMISE = !1;
    $jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
    $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    };

    $jscomp.getGlobal = function(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c
        }
        throw Error("Cannot find global object");
    };
    $jscomp.global = $jscomp.getGlobal(this);
    $jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
    $jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE;
    $jscomp.polyfills = {};
    $jscomp.propertyToPolyfillSymbol = {};
    $jscomp.POLYFILL_PREFIX = "$jscp$";

    var $jscomp$lookupPolyfilledValue = function(a, b) {
        var c = $jscomp.propertyToPolyfillSymbol[b];
        if (null == c) return a[b];
        c = a[c];
        return void 0 !== c ? c : a[b]
    };
    $jscomp.polyfill = function(a, b, c, d) {
        b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, c, d) : $jscomp.polyfillUnisolated(a, b, c, d))
    };
    $jscomp.polyfillUnisolated = function(a, b, c, d) {
        c = $jscomp.global;
        a = a.split(".");
        for (d = 0; d < a.length - 1; d++) {
            var e = a[d];
            if (!(e in c)) return;
            c = c[e]
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && $jscomp.defineProperty(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    };
    $jscomp.polyfillIsolated = function(a, b, c, d) {
        var e = a.split(".");
        a = 1 === e.length;
        d = e[0];
        d = !a && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global;
        for (var f = 0; f < e.length - 1; f++) {
            var g = e[f];
            if (!(g in d)) return;
            d = d[g]
        }
        e = e[e.length - 1];
        c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? d[e] : null;
        b = b(c);
        null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, e, {
            configurable: !0,
            writable: !0,
            value: b
        }) : b !== c && (void 0 === $jscomp.propertyToPolyfillSymbol[e] && (c = 1E9 * Math.random() >>> 0, $jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ?
            $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + c + "$" + e), $jscomp.defineProperty(d, $jscomp.propertyToPolyfillSymbol[e], {
            configurable: !0,
            writable: !0,
            value: b
        })))
    };
    $jscomp.polyfill("globalThis", function(a) {
        return a || $jscomp.global
    }, "es_2020", "es3");
    $jscomp.polyfill("String.prototype.trimRight", function(a) {
        function b() {
            return this.replace(/[\s\xa0]+$/, "")
        }
        return a || b
    }, "es_2019", "es3");
    var LOG_ALL = -1,
        LOG_NONE = 0,
        LOG_OTHER = 1,
        LOG_CPU = 2,
        LOG_FPU = 4,
        LOG_MEM = 8,
        LOG_DMA = 16,
        LOG_IO = 32,
        LOG_PS2 = 64,
        LOG_PIC = 128,
        LOG_VGA = 256,
        LOG_PIT = 512,
        LOG_MOUSE = 1024,
        LOG_PCI = 2048,
        LOG_BIOS = 4096,
        LOG_FLOPPY = 8192,
        LOG_SERIAL = 16384,
        LOG_DISK = 32768,
        LOG_RTC = 65536,
        LOG_HPET = 131072,
        LOG_ACPI = 262144,
        LOG_APIC = 524288,
        LOG_NET = 1048576,
        LOG_VIRTIO = 2097152,
        LOG_9P = 4194304,
        LOG_SB16 = 8388608,
        LOG_NAMES = [
            [1, ""],
            [LOG_CPU, "CPU"],
            [LOG_DISK, "DISK"],
            [LOG_FPU, "FPU"],
            [LOG_MEM, "MEM"],
            [LOG_DMA, "DMA"],
            [LOG_IO, "IO"],
            [LOG_PS2, "PS2"],
            [LOG_PIC, "PIC"],
            [LOG_VGA, "VGA"],
            [LOG_PIT, "PIT"],
            [LOG_MOUSE, "MOUS"],
            [LOG_PCI, "PCI"],
            [LOG_BIOS, "BIOS"],
            [LOG_FLOPPY, "FLOP"],
            [LOG_SERIAL, "SERI"],
            [LOG_RTC, "RTC"],
            [LOG_HPET, "HPET"],
            [LOG_ACPI, "ACPI"],
            [LOG_APIC, "APIC"],
            [LOG_NET, "NET"],
            [LOG_VIRTIO, "VIO"],
            [LOG_9P, "9P"],
            [LOG_SB16, "SB16"]
        ],
        FLAG_CARRY = 1,
        FLAG_PARITY = 4,
        FLAG_ADJUST = 16,
        FLAG_ZERO = 64,
        FLAG_SIGN = 128,
        FLAG_TRAP = 256,
        FLAG_INTERRUPT = 512,
        FLAG_DIRECTION = 1024,
        FLAG_OVERFLOW = 2048,
        FLAG_IOPL = 12288,
        FLAG_NT = 16384,
        FLAG_RF = 65536,
        FLAG_VM = 131072,
        FLAG_AC = 262144,
        FLAG_VIF = 524288,
        FLAG_VIP =
        1048576,
        FLAG_ID = 2097152,
        FLAGS_DEFAULT = 2,
        REG_EAX = 0,
        REG_ECX = 1,
        REG_EDX = 2,
        REG_EBX = 3,
        REG_ESP = 4,
        REG_EBP = 5,
        REG_ESI = 6,
        REG_EDI = 7,
        REG_ES = 0,
        REG_CS = 1,
        REG_SS = 2,
        REG_DS = 3,
        REG_FS = 4,
        REG_GS = 5,
        REG_LDTR = 7,
        MMAP_BLOCK_BITS = 17,
        MMAP_BLOCK_SIZE = 1 << MMAP_BLOCK_BITS,
        CR0_PG = -2147483648,
        CR4_PAE = 32,
        FW_CFG_SIGNATURE = 0,
        FW_CFG_ID = 1,
        FW_CFG_RAM_SIZE = 3,
        FW_CFG_NB_CPUS = 5,
        FW_CFG_MAX_CPUS = 15,
        FW_CFG_NUMA = 13,
        FW_CFG_FILE_DIR = 25,
        FW_CFG_CUSTOM_START = 32768,
        FW_CFG_FILE_START = 49152,
        FW_CFG_SIGNATURE_QEMU = 1431127377,
        WASM_TABLE_SIZE = 900,
        WASM_TABLE_OFFSET =
        1024,
        MIXER_CHANNEL_LEFT = 0,
        MIXER_CHANNEL_RIGHT = 1,
        MIXER_CHANNEL_BOTH = 2,
        MIXER_SRC_MASTER = 0,
        MIXER_SRC_PCSPEAKER = 1,
        MIXER_SRC_DAC = 2;

    function ScreenAdapter(a, b) {
        function c(w) {
            w = w.toString(16);
            return "#" + "0".repeat(6 - w.length) + w
        }

        function d(w, y, C, B) {
            w.style.width = "";
            w.style.height = "";
            B && (w.style.transform = "");
            var E = w.getBoundingClientRect();
            B ? w.style.transform = (1 === y ? "" : " scaleX(" + y + ")") + (1 === C ? "" : " scaleY(" + C + ")") : (0 === y % 1 && 0 === C % 1 ? (e.style.imageRendering = "crisp-edges", e.style.imageRendering = "pixelated", e.style["-ms-interpolation-mode"] = "nearest-neighbor") : (e.style.imageRendering = "", e.style["-ms-interpolation-mode"] = ""), B = window.devicePixelRatio ||
                1, 0 !== B % 1 && (y /= B, C /= B));
            1 !== y && (w.style.width = E.width * y + "px");
            1 !== C && (w.style.height = E.height * C + "px")
        }
        console.assert(a, "1st argument must be a DOM container");
        var e = a.getElementsByTagName("canvas")[0],
            f = e.getContext("2d", {
                alpha: !1
            }),
            g = a.getElementsByTagName("div")[0],
            k = document.createElement("div"),
            l, m, n = 1,
            p = 1,
            t = 1,
            q, r = !1,
            v, u, x, z = !1,
            A = this;
        a = new Uint16Array([199, 252, 233, 226, 228, 224, 229, 231, 234, 235, 232, 239, 238, 236, 196, 197, 201, 230, 198, 244, 246, 242, 251, 249, 255, 214, 220, 162, 163, 165, 8359, 402, 225, 237, 243,
            250, 241, 209, 170, 186, 191, 8976, 172, 189, 188, 161, 171, 187, 9617, 9618, 9619, 9474, 9508, 9569, 9570, 9558, 9557, 9571, 9553, 9559, 9565, 9564, 9563, 9488, 9492, 9524, 9516, 9500, 9472, 9532, 9566, 9567, 9562, 9556, 9577, 9574, 9568, 9552, 9580, 9575, 9576, 9572, 9573, 9561, 9560, 9554, 9555, 9579, 9578, 9496, 9484, 9608, 9604, 9612, 9616, 9600, 945, 223, 915, 960, 931, 963, 181, 964, 934, 920, 937, 948, 8734, 966, 949, 8745, 8801, 177, 8805, 8804, 8992, 8993, 247, 8776, 176, 8729, 183, 8730, 8319, 178, 9632, 160
        ]);
        for (var D = new Uint16Array([32, 9786, 9787, 9829, 9830, 9827, 9824, 8226, 9688,
                9675, 9689, 9794, 9792, 9834, 9835, 9788, 9658, 9668, 8597, 8252, 182, 167, 9644, 8616, 8593, 8595, 8594, 8592, 8735, 8596, 9650, 9660
            ]), I = [], J, G = 0; 256 > G; G++) J = 127 < G ? a[G - 128] : 32 > G ? D[G] : G, I[G] = String.fromCharCode(J);
        f.imageSmoothingEnabled = !1;
        k.style.position = "absolute";
        k.style.backgroundColor = "#ccc";
        k.style.width = "7px";
        k.style.display = "inline-block";
        g.style.display = "block";
        e.style.display = "none";
        this.bus = b;
        b.register("screen-set-mode", function(w) {
            injection.screen_event("screen-set-mode", w);
            this.set_mode(w)
        }, this);
        b.register("screen-fill-buffer-end", function(w) {
            injection.screen_event("screen-fill-buffer-end", w);
                this.update_buffer(w)
            },
            this);
        b.register("screen-put-char", function(w) {
            injection.screen_event("screen-put-char", w);
            this.put_char(w[0], w[1], w[2], w[3], w[4])
        }, this);
        b.register("screen-update-cursor", function(w) {
            injection.screen_event("screen-update-cursor", w);
            this.update_cursor(w[0], w[1])
        }, this);
        b.register("screen-update-cursor-scanline", function(w) {
            injection.screen_event("screen-update-cursor-scanline", w);
            this.update_cursor_scanline(w[0], w[1])
        }, this);
        b.register("screen-clear", function() {
            injection.screen_event("screen-clear", );
            this.clear_screen()
        }, this);
        b.register("screen-set-size-text", function(w) {
            injection.screen_event("screen-set-size-text", w);
            this.set_size_text(w[0], w[1])
        }, this);
        b.register("screen-set-size-graphical", function(w) {
            injection.screen_event("screen-set-size-graphical", w);
            this.set_size_graphical(w[0],
                w[1], w[2], w[3])
        }, this);
        this.init = function() {
            this.set_size_text(80, 25);
            this.timer()
        };
        this.make_screenshot = function() {
            const w = new Image;
            if (r) w.src = e.toDataURL("image/png");
            else {
                const y = [9, 16],
                    C = document.createElement("canvas");
                C.width = u * y[0];
                C.height = x * y[1];
                const B = C.getContext("2d");
                B.imageSmoothingEnabled = !1;
                B.font = window.getComputedStyle(g).font;
                B.textBaseline = "top";
                for (let E = 0; E < u; E++)
                    for (let F = 0; F < x; F++) {
                        const H = 3 * (F * u + E);
                        B.fillStyle = c(v[H + 1]);
                        B.fillRect(E * y[0], F * y[1], y[0], y[1]);
                        B.fillStyle = c(v[H +
                            2]);
                        B.fillText(I[v[H]], E * y[0], F * y[1])
                    }
                "none" !== k.style.display && (B.fillStyle = k.style.backgroundColor, B.fillRect(m * y[0], l * y[1] + parseInt(k.style.marginTop, 10) - 1, parseInt(k.style.width, 10), parseInt(k.style.height, 10)));
                w.src = C.toDataURL("image/png")
            }
            try {
                window.open("").document.write(w.outerHTML)
            } catch (y) {}
        };
        this.put_char = function(w, y, C, B, E) {
            w < x && y < u && (y = 3 * (w * u + y), dbg_assert(0 <= C && 256 > C), v[y] = C, v[y + 1] = B, v[y + 2] = E, q[w] = 1)
        };
        this.timer = function() {
            z || requestAnimationFrame(r ? N : O)
        };
        var O = function() {
                for (var w =
                        0; w < x; w++) q[w] && (A.text_update_row(w), q[w] = 0);
                this.timer()
            }.bind(this),
            N = function() {
                this.bus.send("screen-fill-buffer");
                this.timer()
            }.bind(this);
        this.destroy = function() {
            z = !0
        };
        this.set_mode = function(w) {
            (r = w) ? (g.style.display = "none", e.style.display = "block") : (g.style.display = "block", e.style.display = "none")
        };
        this.clear_screen = function() {
            f.fillStyle = "#000";
            f.fillRect(0, 0, e.width, e.height)
        };
        this.set_size_text = function(w, y) {
            if (w !== u || y !== x) {
                q = new Int8Array(y);
                v = new Int32Array(w * y * 3);
                u = w;
                for (x = y; g.childNodes.length >
                    y;) g.removeChild(g.firstChild);
                for (; g.childNodes.length < y;) g.appendChild(document.createElement("div"));
                for (w = 0; w < y; w++) this.text_update_row(w);
                d(g, n, p, !0)
            }
        };
        this.set_size_graphical = function(w, y, C, B) {
            DEBUG_SCREEN_LAYERS && (w = C, y = B);
            e.style.display = "block";
            e.width = w;
            e.height = y;
            t = 640 >= w && 2 * w < window.innerWidth && 2 * w < window.innerHeight ? 2 : 1;
            d(e, n * t, p * t, !1)
        };
        this.set_scale = function(w, y) {
            n = w;
            p = y;
            d(g, n, p, !0);
            d(e, n * t, p * t, !1)
        };
        this.set_scale(n, p);
        this.update_cursor_scanline = function(w, y) {
            w & 32 ? k.style.display =
                "none" : (k.style.display = "inline", k.style.height = Math.min(15, y - w) + "px", k.style.marginTop = Math.min(15, w) + "px")
        };
        this.update_cursor = function(w, y) {
            if (w !== l || y !== m) q[w] = 1, q[l] = 1, l = w, m = y
        };
        this.text_update_row = function(w) {
            var y = 3 * w * u,
                C;
            var B = g.childNodes[w];
            var E = document.createElement("div");
            for (var F = 0; F < u;) {
                var H = document.createElement("span");
                var K = v[y + 1];
                var L = v[y + 2];
                H.style.backgroundColor = c(K);
                H.style.color = c(L);
                for (C = ""; F < u && v[y + 1] === K && v[y + 2] === L;) {
                    var M = v[y];
                    C += I[M];
                    dbg_assert(I[M]);
                    F++;
                    y += 3;
                    if (w ===
                        l)
                        if (F === m) break;
                        else if (F === m + 1) {
                        E.appendChild(k);
                        break
                    }
                }
                H.textContent = C;
                E.appendChild(H)
            }
            B.parentNode.replaceChild(E, B)
        };
        this.update_buffer = function(w) {
            DEBUG_SCREEN_LAYERS ? (f.strokeStyle = "#0F0", f.lineWidth = 4, w.forEach(y => {
                f.strokeRect(y.buffer_x, y.buffer_y, y.buffer_width, y.buffer_height)
            }), f.lineWidth = 1) : w.forEach(y => {
                f.putImageData(y.image_data, y.screen_x - y.buffer_x, y.screen_y - y.buffer_y, y.buffer_x, y.buffer_y, y.buffer_width, y.buffer_height)
            })
        };
        this.init()
    };
    const VIRTIO_9P_F_MOUNT_TAG = 0,
        VIRTIO_9P_MAX_TAGLEN = 254;
    var EPERM = 1,
        ENOENT = 2,
        EEXIST = 17,
        EINVAL = 22,
        EOPNOTSUPP = 95,
        ENOTEMPTY = 39,
        EPROTO = 71,
        P9_SETATTR_MODE = 1,
        P9_SETATTR_UID = 2,
        P9_SETATTR_GID = 4,
        P9_SETATTR_SIZE = 8,
        P9_SETATTR_ATIME = 16,
        P9_SETATTR_MTIME = 32,
        P9_SETATTR_CTIME = 64,
        P9_SETATTR_ATIME_SET = 128,
        P9_SETATTR_MTIME_SET = 256,
        P9_STAT_MODE_DIR = 2147483648,
        P9_STAT_MODE_APPEND = 1073741824,
        P9_STAT_MODE_EXCL = 536870912,
        P9_STAT_MODE_MOUNT = 268435456,
        P9_STAT_MODE_AUTH = 134217728,
        P9_STAT_MODE_TMP = 67108864,
        P9_STAT_MODE_SYMLINK = 33554432,
        P9_STAT_MODE_LINK = 16777216,
        P9_STAT_MODE_DEVICE =
        8388608,
        P9_STAT_MODE_NAMED_PIPE = 2097152,
        P9_STAT_MODE_SOCKET = 1048576,
        P9_STAT_MODE_SETUID = 524288,
        P9_STAT_MODE_SETGID = 262144,
        P9_STAT_MODE_SETVTX = 65536;
    const P9_LOCK_TYPE_RDLCK = 0,
        P9_LOCK_TYPE_WRLCK = 1,
        P9_LOCK_TYPE_UNLCK = 2,
        P9_LOCK_TYPES = Object.freeze(["shared", "exclusive", "unlock"]),
        P9_LOCK_FLAGS_BLOCK = 1,
        P9_LOCK_FLAGS_RECLAIM = 2,
        P9_LOCK_SUCCESS = 0,
        P9_LOCK_BLOCKED = 1,
        P9_LOCK_ERROR = 2,
        P9_LOCK_GRACE = 3;
    var FID_NONE = -1,
        FID_INODE = 1,
        FID_XATTR = 2;

    function Virtio9p(a, b, c) {
        this.fs = a;
        this.bus = c;
        this.configspace_tagname = [104, 111, 115, 116, 57, 112];
        this.configspace_taglen = this.configspace_tagname.length;
        this.VERSION = "9P2000.L";
        this.msize = this.BLOCKSIZE = 8192;
        this.replybuffer = new Uint8Array(2 * this.msize);
        this.replybuffersize = 0;
        this.fids = [];
        this.virtio = new VirtIO(b, {
            name: "virtio-9p",
            pci_id: 48,
            device_id: 4169,
            subsystem_device_id: 9,
            common: {
                initial_port: 43008,
                queues: [{
                    size_supported: 32,
                    notify_offset: 0
                }],
                features: [VIRTIO_9P_F_MOUNT_TAG, VIRTIO_F_VERSION_1,
                    VIRTIO_F_RING_EVENT_IDX, VIRTIO_F_RING_INDIRECT_DESC
                ],
                on_driver_ok: () => {}
            },
            notification: {
                initial_port: 43264,
                single_handler: !1,
                handlers: [d => {
                    if (0 !== d) dbg_assert(!1, "Virtio9P Notified for non-existent queue: " + d + " (expected queue_id of 0)");
                    else {
                        for (; this.virtqueue.has_request();) d = this.virtqueue.pop_request(), this.ReceiveRequest(d);
                        this.virtqueue.notify_me_after(0)
                    }
                }]
            },
            isr_status: {
                initial_port: 42752
            },
            device_specific: {
                initial_port: 42496,
                struct: [{
                    bytes: 2,
                    name: "mount tag length",
                    read: () => this.configspace_taglen,
                    write: d => {}
                }].concat(v86util.range(VIRTIO_9P_MAX_TAGLEN).map(d => ({
                    bytes: 1,
                    name: "mount tag name " + d,
                    read: () => this.configspace_tagname[d] || 0,
                    write: e => {}
                })))
            }
        });
        this.virtqueue = this.virtio.queues[0]
    }
    Virtio9p.prototype.get_state = function() {
        var a = [];
        a[0] = this.configspace_tagname;
        a[1] = this.configspace_taglen;
        a[2] = this.virtio;
        a[3] = this.VERSION;
        a[4] = this.BLOCKSIZE;
        a[5] = this.msize;
        a[6] = this.replybuffer;
        a[7] = this.replybuffersize;
        a[8] = this.fids.map(function(b) {
            return [b.inodeid, b.type, b.uid, b.dbg_name]
        });
        a[9] = this.fs;
        return a
    };
    Virtio9p.prototype.set_state = function(a) {
        this.configspace_tagname = a[0];
        this.configspace_taglen = a[1];
        this.virtio.set_state(a[2]);
        this.virtqueue = this.virtio.queues[0];
        this.VERSION = a[3];
        this.BLOCKSIZE = a[4];
        this.msize = a[5];
        this.replybuffer = a[6];
        this.replybuffersize = a[7];
        this.fids = a[8].map(function(b) {
            return {
                inodeid: b[0],
                type: b[1],
                uid: b[2],
                dbg_name: b[3]
            }
        });
        this.fs.set_state(a[9])
    };
    Virtio9p.prototype.Createfid = function(a, b, c, d) {
        return {
            inodeid: a,
            type: b,
            uid: c,
            dbg_name: d
        }
    };
    Virtio9p.prototype.update_dbg_name = function(a, b) {
        for (const c of this.fids) c.inodeid === a && (c.dbg_name = b)
    };
    Virtio9p.prototype.Reset = function() {
        this.fids = []
    };
    Virtio9p.prototype.BuildReply = function(a, b, c) {
        dbg_assert(0 <= c, "9P: Negative payload size");
        marshall.Marshall(["w", "b", "h"], [c + 7, a + 1, b], this.replybuffer, 0);
        c + 7 >= this.replybuffer.length && message.Debug("Error in 9p: payloadsize exceeds maximum length");
        this.replybuffersize = c + 7
    };
    Virtio9p.prototype.SendError = function(a, b, c) {
        b = marshall.Marshall(["w"], [c], this.replybuffer, 7);
        this.BuildReply(6, a, b)
    };
    Virtio9p.prototype.SendReply = function(a) {
        dbg_assert(0 <= this.replybuffersize, "9P: Negative replybuffersize");
        a.set_next_blob(this.replybuffer.subarray(0, this.replybuffersize));
        this.virtqueue.push_reply(a);
        this.virtqueue.flush_replies()
    };
    Virtio9p.prototype.ReceiveRequest = async function(a) {
        var b = new Uint8Array(a.length_readable);
        a.get_next_blob(b);
        var c = {
                offset: 0
            },
            d = marshall.Unmarshall(["w", "b", "h"], b, c),
            e = d[0],
            f = d[1],
            g = d[2];
        switch (f) {
            case 8:
                e = this.fs.GetTotalSize();
                b = this.fs.GetSpace();
                d = [16914839];
                d[1] = this.BLOCKSIZE;
                d[2] = Math.floor(b / d[1]);
                d[3] = d[2] - Math.floor(e / d[1]);
                d[4] = d[2] - Math.floor(e / d[1]);
                d[5] = this.fs.CountUsedInodes();
                d[6] = this.fs.CountFreeInodes();
                d[7] = 0;
                d[8] = 256;
                e = marshall.Marshall("wwddddddw".split(""), d, this.replybuffer,
                    7);
                this.BuildReply(f, g, e);
                this.SendReply(a);
                break;
            case 112:
            case 12:
                d = marshall.Unmarshall(["w", "w"], b, c);
                var k = d[0];
                c = d[1];
                message.Debug("[open] fid=" + k + ", mode=" + c);
                b = this.fids[k].inodeid;
                var l = this.fs.GetInode(b);
                message.Debug("file open " + this.fids[k].dbg_name);
                d = this.fs.OpenInode(b, c);
                this.fs.AddEvent(this.fids[k].inodeid, function() {
                    message.Debug("file opened " + this.fids[k].dbg_name + " tag:" + g);
                    var t = [];
                    t[0] = l.qid;
                    t[1] = this.msize - 24;
                    marshall.Marshall(["Q", "w"], t, this.replybuffer, 7);
                    this.BuildReply(f,
                        g, 17);
                    this.SendReply(a)
                }.bind(this));
                break;
            case 70:
                d = marshall.Unmarshall(["w", "w", "s"], b, c);
                b = d[0];
                k = d[1];
                e = d[2];
                message.Debug("[link] dfid=" + b + ", name=" + e);
                d = this.fs.Link(this.fids[b].inodeid, this.fids[k].inodeid, e);
                if (0 > d) {
                    e = "";
                    d === -EPERM ? e = "Operation not permitted" : (e = "Unknown error: " + -d, dbg_assert(!1, "[link]: Unexpected error code: " + -d));
                    this.SendError(g, e, -d);
                    this.SendReply(a);
                    break
                }
                this.BuildReply(f, g, 0);
                this.SendReply(a);
                break;
            case 16:
                d = marshall.Unmarshall(["w", "s", "s", "w"], b, c);
                k = d[0];
                e =
                    d[1];
                b = d[2];
                d = d[3];
                message.Debug("[symlink] fid=" + k + ", name=" + e + ", symgt=" + b + ", gid=" + d);
                b = this.fs.CreateSymlink(e, this.fids[k].inodeid, b);
                l = this.fs.GetInode(b);
                l.uid = this.fids[k].uid;
                l.gid = d;
                marshall.Marshall(["Q"], [l.qid], this.replybuffer, 7);
                this.BuildReply(f, g, 13);
                this.SendReply(a);
                break;
            case 18:
                d = marshall.Unmarshall("wswwww".split(""), b, c);
                k = d[0];
                e = d[1];
                c = d[2];
                b = d[3];
                var m = d[4];
                d = d[5];
                message.Debug("[mknod] fid=" + k + ", name=" + e + ", major=" + b + ", minor=" + m);
                b = this.fs.CreateNode(e, this.fids[k].inodeid,
                    b, m);
                l = this.fs.GetInode(b);
                l.mode = c;
                l.uid = this.fids[k].uid;
                l.gid = d;
                marshall.Marshall(["Q"], [l.qid], this.replybuffer, 7);
                this.BuildReply(f, g, 13);
                this.SendReply(a);
                break;
            case 22:
                d = marshall.Unmarshall(["w"], b, c);
                k = d[0];
                l = this.fs.GetInode(this.fids[k].inodeid);
                message.Debug("[readlink] fid=" + k + " name=" + this.fids[k].dbg_name + " target=" + l.symlink);
                e = marshall.Marshall(["s"], [l.symlink], this.replybuffer, 7);
                this.BuildReply(f, g, e);
                this.SendReply(a);
                break;
            case 72:
                d = marshall.Unmarshall(["w", "s", "w", "w"], b, c);
                k = d[0];
                e = d[1];
                c = d[2];
                d = d[3];
                message.Debug("[mkdir] fid=" + k + ", name=" + e + ", mode=" + c + ", gid=" + d);
                b = this.fs.CreateDirectory(e, this.fids[k].inodeid);
                l = this.fs.GetInode(b);
                l.mode = c | S_IFDIR;
                l.uid = this.fids[k].uid;
                l.gid = d;
                marshall.Marshall(["Q"], [l.qid], this.replybuffer, 7);
                this.BuildReply(f, g, 13);
                this.SendReply(a);
                break;
            case 14:
                d = marshall.Unmarshall(["w", "s", "w", "w", "w"], b, c);
                k = d[0];
                e = d[1];
                b = d[2];
                c = d[3];
                d = d[4];
                this.bus.send("9p-create", [e, this.fids[k].inodeid]);
                message.Debug("[create] fid=" + k + ", name=" +
                    e + ", flags=" + b + ", mode=" + c + ", gid=" + d);
                b = this.fs.CreateFile(e, this.fids[k].inodeid);
                this.fids[k].inodeid = b;
                this.fids[k].type = FID_INODE;
                this.fids[k].dbg_name = e;
                l = this.fs.GetInode(b);
                l.uid = this.fids[k].uid;
                l.gid = d;
                l.mode = c;
                marshall.Marshall(["Q", "w"], [l.qid, this.msize - 24], this.replybuffer, 7);
                this.BuildReply(f, g, 17);
                this.SendReply(a);
                break;
            case 52:
                d = marshall.Unmarshall("wbwddws".split(""), b, c);
                k = d[0];
                b = d[2];
                e = 0 === d[4] ? Infinity : d[4];
                e = this.fs.DescribeLock(d[1], d[3], e, d[5], d[6]);
                message.Debug("[lock] fid=" +
                    k + ", type=" + P9_LOCK_TYPES[e.type] + ", start=" + e.start + ", length=" + e.length + ", proc_id=" + e.proc_id);
                d = this.fs.Lock(this.fids[k].inodeid, e, b);
                marshall.Marshall(["b"], [d], this.replybuffer, 7);
                this.BuildReply(f, g, 1);
                this.SendReply(a);
                break;
            case 54:
                d = marshall.Unmarshall("wbddws".split(""), b, c);
                k = d[0];
                e = 0 === d[3] ? Infinity : d[3];
                e = this.fs.DescribeLock(d[1], d[2], e, d[4], d[5]);
                message.Debug("[getlock] fid=" + k + ", type=" + P9_LOCK_TYPES[e.type] + ", start=" + e.start + ", length=" + e.length + ", proc_id=" + e.proc_id);
                d = this.fs.GetLock(this.fids[k].inodeid,
                    e);
                d || (d = e, d.type = P9_LOCK_TYPE_UNLCK);
                e = marshall.Marshall(["b", "d", "d", "w", "s"], [d.type, d.start, Infinity === d.length ? 0 : d.length, d.proc_id, d.client_id], this.replybuffer, 7);
                this.BuildReply(f, g, e);
                this.SendReply(a);
                break;
            case 24:
                d = marshall.Unmarshall(["w", "d"], b, c);
                k = d[0];
                l = this.fs.GetInode(this.fids[k].inodeid);
                message.Debug("[getattr]: fid=" + k + " name=" + this.fids[k].dbg_name + " request mask=" + d[1]);
                if (!l || l.status === STATUS_UNLINKED) {
                    message.Debug("getattr: unlinked");
                    this.SendError(g, "No such file or directory",
                        ENOENT);
                    this.SendReply(a);
                    break
                }
                d[0] |= 4096;
                d[0] = d[1];
                d[1] = l.qid;
                d[2] = l.mode;
                d[3] = l.uid;
                d[4] = l.gid;
                d[5] = l.nlinks;
                d[6] = l.major << 8 | l.minor;
                d[7] = l.size;
                d[8] = this.BLOCKSIZE;
                d[9] = Math.floor(l.size / 512 + 1);
                d[10] = l.atime;
                d[11] = 0;
                d[12] = l.mtime;
                d[13] = 0;
                d[14] = l.ctime;
                d[15] = 0;
                d[16] = 0;
                d[17] = 0;
                d[18] = 0;
                d[19] = 0;
                marshall.Marshall("dQwwwddddddddddddddd".split(""), d, this.replybuffer, 7);
                this.BuildReply(f, g, 153);
                this.SendReply(a);
                break;
            case 26:
                d = marshall.Unmarshall("wwwwwddddd".split(""), b, c);
                k = d[0];
                l = this.fs.GetInode(this.fids[k].inodeid);
                message.Debug("[setattr]: fid=" + k + " request mask=" + d[1] + " name=" + this.fids[k].dbg_name);
                d[1] & P9_SETATTR_MODE && (l.mode = d[2]);
                d[1] & P9_SETATTR_UID && (l.uid = d[3]);
                d[1] & P9_SETATTR_GID && (l.gid = d[4]);
                d[1] & P9_SETATTR_ATIME && (l.atime = Math.floor((new Date).getTime() / 1E3));
                d[1] & P9_SETATTR_MTIME && (l.mtime = Math.floor((new Date).getTime() / 1E3));
                d[1] & P9_SETATTR_CTIME && (l.ctime = Math.floor((new Date).getTime() / 1E3));
                d[1] & P9_SETATTR_ATIME_SET && (l.atime = d[6]);
                d[1] & P9_SETATTR_MTIME_SET && (l.mtime = d[8]);
                d[1] & P9_SETATTR_SIZE &&
                    await this.fs.ChangeSize(this.fids[k].inodeid, d[5]);
                this.BuildReply(f, g, 0);
                this.SendReply(a);
                break;
            case 50:
                d = marshall.Unmarshall(["w", "d"], b, c);
                k = d[0];
                this.BuildReply(f, g, 0);
                this.SendReply(a);
                break;
            case 40:
            case 116:
                d = marshall.Unmarshall(["w", "d", "w"], b, c);
                k = d[0];
                e = d[1];
                m = d[2];
                l = this.fs.GetInode(this.fids[k].inodeid);
                40 == f && message.Debug("[treaddir]: fid=" + k + " offset=" + e + " count=" + m);
                116 == f && message.Debug("[read]: fid=" + k + " (" + this.fids[k].dbg_name + ") offset=" + e + " count=" + m + " fidtype=" + this.fids[k].type);
                if (!l || l.status === STATUS_UNLINKED) {
                    message.Debug("read/treaddir: unlinked");
                    this.SendError(g, "No such file or directory", ENOENT);
                    this.SendReply(a);
                    break
                }
                if (this.fids[k].type == FID_XATTR)
                    for (l.caps.length < e + m && (m = l.caps.length - e), d = 0; d < m; d++) this.replybuffer[11 + d] = l.caps[e + d];
                else this.fs.OpenInode(this.fids[k].inodeid, void 0), d = this.fids[k].inodeid, m = Math.min(m, this.replybuffer.length - 11), l.size < e + m ? m = l.size - e : 40 == f && (m = this.fs.RoundToDirentry(d, e + m) - e), e > l.size && (m = 0), this.bus.send("9p-read-start",
                    [this.fids[k].dbg_name]), d = await this.fs.Read(d, e, m), this.bus.send("9p-read-end", [this.fids[k].dbg_name, m]), d && this.replybuffer.set(d, 11);
                marshall.Marshall(["w"], [m], this.replybuffer, 7);
                this.BuildReply(f, g, 4 + m);
                this.SendReply(a);
                break;
            case 118:
                d = marshall.Unmarshall(["w", "d", "w"], b, c);
                k = d[0];
                e = d[1];
                m = d[2];
                d = this.fids[k].dbg_name;
                message.Debug("[write]: fid=" + k + " (" + d + ") offset=" + e + " count=" + m + " fidtype=" + this.fids[k].type);
                if (this.fids[k].type === FID_XATTR) {
                    this.SendError(g, "Setxattr not supported",
                        EOPNOTSUPP);
                    this.SendReply(a);
                    break
                } else await this.fs.Write(this.fids[k].inodeid, e, m, b.subarray(c.offset));
                this.bus.send("9p-write-end", [d, m]);
                marshall.Marshall(["w"], [m], this.replybuffer, 7);
                this.BuildReply(f, g, 4);
                this.SendReply(a);
                break;
            case 74:
                d = marshall.Unmarshall(["w", "s", "w", "s"], b, c);
                c = d[0];
                m = d[1];
                e = d[2];
                b = d[3];
                message.Debug("[renameat]: oldname=" + m + " newname=" + b);
                d = await this.fs.Rename(this.fids[c].inodeid, m, this.fids[e].inodeid, b);
                if (0 > d) {
                    e = "";
                    d === -ENOENT ? e = "No such file or directory" : d ===
                        -EPERM ? e = "Operation not permitted" : d === -ENOTEMPTY ? e = "Directory not empty" : (e = "Unknown error: " + -d, dbg_assert(!1, "[renameat]: Unexpected error code: " + -d));
                    this.SendError(g, e, -d);
                    this.SendReply(a);
                    break
                }
                TRACK_FILENAMES && (d = this.fs.Search(this.fids[e].inodeid, b), this.update_dbg_name(d, b));
                this.BuildReply(f, g, 0);
                this.SendReply(a);
                break;
            case 76:
                d = marshall.Unmarshall(["w", "s", "w"], b, c);
                c = d[0];
                e = d[1];
                b = d[2];
                message.Debug("[unlink]: dirfd=" + c + " name=" + e + " flags=" + b);
                k = this.fs.Search(this.fids[c].inodeid,
                    e);
                if (-1 == k) {
                    this.SendError(g, "No such file or directory", ENOENT);
                    this.SendReply(a);
                    break
                }
                d = this.fs.Unlink(this.fids[c].inodeid, e);
                if (0 > d) {
                    e = "";
                    d === -ENOTEMPTY ? e = "Directory not empty" : d === -EPERM ? e = "Operation not permitted" : (e = "Unknown error: " + -d, dbg_assert(!1, "[unlink]: Unexpected error code: " + -d));
                    this.SendError(g, e, -d);
                    this.SendReply(a);
                    break
                }
                this.BuildReply(f, g, 0);
                this.SendReply(a);
                break;
            case 100:
                d = marshall.Unmarshall(["w", "s"], b, c);
                message.Debug("[version]: msize=" + d[0] + " version=" + d[1]);
                this.msize =
                    d[0];
                e = marshall.Marshall(["w", "s"], [this.msize, this.VERSION], this.replybuffer, 7);
                this.BuildReply(f, g, e);
                this.SendReply(a);
                break;
            case 104:
                d = marshall.Unmarshall(["w", "w", "s", "s", "w"], b, c);
                k = d[0];
                e = d[4];
                message.Debug("[attach]: fid=" + k + " afid=" + hex8(d[1]) + " uname=" + d[2] + " aname=" + d[3]);
                this.fids[k] = this.Createfid(0, FID_INODE, e, "");
                l = this.fs.GetInode(this.fids[k].inodeid);
                marshall.Marshall(["Q"], [l.qid], this.replybuffer, 7);
                this.BuildReply(f, g, 13);
                this.SendReply(a);
                this.bus.send("9p-attach");
                break;
            case 108:
                d =
                    marshall.Unmarshall(["h"], b, c);
                message.Debug("[flush] " + g);
                this.BuildReply(f, g, 0);
                this.SendReply(a);
                break;
            case 110:
                d = marshall.Unmarshall(["w", "w", "h"], b, c);
                k = d[0];
                m = d[1];
                var n = d[2];
                message.Debug("[walk]: fid=" + d[0] + " nwfid=" + d[1] + " nwname=" + n);
                if (0 == n) {
                    this.fids[m] = this.Createfid(this.fids[k].inodeid, FID_INODE, this.fids[k].uid, this.fids[k].dbg_name);
                    marshall.Marshall(["h"], [0], this.replybuffer, 7);
                    this.BuildReply(f, g, 2);
                    this.SendReply(a);
                    break
                }
                e = [];
                for (d = 0; d < n; d++) e.push("s");
                c = marshall.Unmarshall(e,
                    b, c);
                b = this.fids[k].inodeid;
                e = 9;
                var p = 0;
                message.Debug("walk in dir " + this.fids[k].dbg_name + " to: " + c.toString());
                for (d = 0; d < n; d++) {
                    b = this.fs.Search(b, c[d]);
                    if (-1 == b) {
                        message.Debug("Could not find: " + c[d]);
                        break
                    }
                    e += marshall.Marshall(["Q"], [this.fs.GetInode(b).qid], this.replybuffer, e);
                    p++;
                    this.fids[m] = this.Createfid(b, FID_INODE, this.fids[k].uid, c[d])
                }
                marshall.Marshall(["h"], [p], this.replybuffer, 7);
                this.BuildReply(f, g, e - 7);
                this.SendReply(a);
                break;
            case 120:
                d = marshall.Unmarshall(["w"], b, c);
                message.Debug("[clunk]: fid=" +
                    d[0]);
                this.fids[d[0]] && 0 <= this.fids[d[0]].inodeid && (await this.fs.CloseInode(this.fids[d[0]].inodeid), this.fids[d[0]].inodeid = -1, this.fids[d[0]].type = FID_NONE);
                this.BuildReply(f, g, 0);
                this.SendReply(a);
                break;
            case 32:
                d = marshall.Unmarshall(["w", "s", "d", "w"], b, c);
                k = d[0];
                e = d[1];
                c = d[2];
                b = d[3];
                message.Debug("[txattrcreate]: fid=" + k + " name=" + e + " attr_size=" + c + " flags=" + b);
                this.fids[k].type = FID_XATTR;
                this.BuildReply(f, g, 0);
                this.SendReply(a);
                break;
            case 30:
                d = marshall.Unmarshall(["w", "w", "s"], b, c);
                k = d[0];
                e = d[2];
                message.Debug("[xattrwalk]: fid=" + d[0] + " newfid=" + d[1] + " name=" + d[2]);
                this.SendError(g, "Setxattr not supported", EOPNOTSUPP);
                this.SendReply(a);
                break;
            default:
                message.Debug("Error in Virtio9p: Unknown id " + f + " received"), message.Abort()
        }
    };
    var DEBUG = !1,
        LOG_TO_FILE = !1,
        LOG_ALL_IO = !1,
        DUMP_GENERATED_WASM = !1,
        DUMP_UNCOMPILED_ASSEMBLY = !1,
        TRACK_FILENAMES = !1,
        LOG_LEVEL = LOG_ALL & ~LOG_PS2 & ~LOG_PIT & ~LOG_VIRTIO & ~LOG_9P & ~LOG_PIC & ~LOG_DMA & ~LOG_SERIAL & ~LOG_NET & ~LOG_FLOPPY & ~LOG_DISK & ~LOG_VGA & ~LOG_SB16,
        DEBUG_SCREEN_LAYERS = DEBUG && !1,
        ENABLE_HPET = DEBUG && !1,
        TIME_PER_FRAME = 1,
        TSC_RATE = 1E6,
        APIC_TIMER_FREQ = TSC_RATE;

    function IO(a) {
        this.ports = [];
        this.cpu = a;
        for (var b = 0; 65536 > b; b++) this.ports[b] = this.create_empty_entry();
        var c = a.memory_size[0];
        for (b = 0; b << MMAP_BLOCK_BITS < c; b++) a.memory_map_read8[b] = a.memory_map_write8[b] = void 0, a.memory_map_read32[b] = a.memory_map_write32[b] = void 0;
        this.mmap_register(c, 4294967296 - c, function(d) {
            dbg_log("Read from unmapped memory space, addr=" + h(d >>> 0, 8), LOG_IO);
            return 255
        }, function(d, e) {
            dbg_log("Write to unmapped memory space, addr=" + h(d >>> 0, 8) + " value=" + h(e, 2), LOG_IO)
        }, function(d) {
            dbg_log("Read from unmapped memory space, addr=" +
                h(d >>> 0, 8), LOG_IO);
            return -1
        }, function(d, e) {
            dbg_log("Write to unmapped memory space, addr=" + h(d >>> 0, 8) + " value=" + h(e >>> 0, 8), LOG_IO)
        })
    }
    IO.prototype.create_empty_entry = function() {
        return {
            read8: this.empty_port_read8,
            read16: this.empty_port_read16,
            read32: this.empty_port_read32,
            write8: this.empty_port_write,
            write16: this.empty_port_write,
            write32: this.empty_port_write,
            device: void 0
        }
    };
    IO.prototype.empty_port_read8 = function() {
        return 255
    };
    IO.prototype.empty_port_read16 = function() {
        return 65535
    };
    IO.prototype.empty_port_read32 = function() {
        return -1
    };
    IO.prototype.empty_port_write = function(a) {};
    IO.prototype.register_read = function(a, b, c, d, e) {
        dbg_assert("number" === typeof a);
        dbg_assert("object" === typeof b);
        dbg_assert(!c || "function" === typeof c);
        dbg_assert(!d || "function" === typeof d);
        dbg_assert(!e || "function" === typeof e);
        dbg_assert(c || d || e);
        if (DEBUG) {
            var f = function(g) {
                dbg_assert(!1, "Overlapped read" + g + " " + h(a, 4) + " (" + b.name + ")");
                return -1 >>> 32 - g | 0
            };
            c || (c = f.bind(this, 8));
            d || (d = f.bind(this, 16));
            e || (e = f.bind(this, 32))
        }
        c && (this.ports[a].read8 = c);
        d && (this.ports[a].read16 = d);
        e && (this.ports[a].read32 =
            e);
        this.ports[a].device = b
    };
    IO.prototype.register_write = function(a, b, c, d, e) {
        dbg_assert("number" === typeof a);
        dbg_assert("object" === typeof b);
        dbg_assert(!c || "function" === typeof c);
        dbg_assert(!d || "function" === typeof d);
        dbg_assert(!e || "function" === typeof e);
        dbg_assert(c || d || e);
        if (DEBUG) {
            var f = function(g) {
                dbg_assert(!1, "Overlapped write" + g + " " + h(a) + " (" + b.name + ")")
            };
            c || (c = f.bind(this, 8));
            d || (d = f.bind(this, 16));
            e || (e = f.bind(this, 32))
        }
        c && (this.ports[a].write8 = c);
        d && (this.ports[a].write16 = d);
        e && (this.ports[a].write32 = e);
        this.ports[a].device =
            b
    };
    IO.prototype.register_read_consecutive = function(a, b, c, d, e, f) {
        function g() {
            return c.call(this) | d.call(this) << 8
        }

        function k() {
            return e.call(this) | f.call(this) << 8
        }

        function l() {
            return c.call(this) | d.call(this) << 8 | e.call(this) << 16 | f.call(this) << 24
        }
        dbg_assert(4 === arguments.length || 6 === arguments.length);
        e && f ? (this.register_read(a, b, c, g, l), this.register_read(a + 1, b, d), this.register_read(a + 2, b, e, k), this.register_read(a + 3, b, f)) : (this.register_read(a, b, c, g), this.register_read(a + 1, b, d))
    };
    IO.prototype.register_write_consecutive = function(a, b, c, d, e, f) {
        function g(m) {
            c.call(this, m & 255);
            d.call(this, m >> 8 & 255)
        }

        function k(m) {
            e.call(this, m & 255);
            f.call(this, m >> 8 & 255)
        }

        function l(m) {
            c.call(this, m & 255);
            d.call(this, m >> 8 & 255);
            e.call(this, m >> 16 & 255);
            f.call(this, m >>> 24)
        }
        dbg_assert(4 === arguments.length || 6 === arguments.length);
        e && f ? (this.register_write(a, b, c, g, l), this.register_write(a + 1, b, d), this.register_write(a + 2, b, e, k), this.register_write(a + 3, b, f)) : (this.register_write(a, b, c, g), this.register_write(a +
            1, b, d))
    };
    IO.prototype.mmap_read32_shim = function(a) {
        var b = this.cpu.memory_map_read8[a >>> MMAP_BLOCK_BITS];
        return b(a) | b(a + 1) << 8 | b(a + 2) << 16 | b(a + 3) << 24
    };
    IO.prototype.mmap_write32_shim = function(a, b) {
        var c = this.cpu.memory_map_write8[a >>> MMAP_BLOCK_BITS];
        c(a, b & 255);
        c(a + 1, b >> 8 & 255);
        c(a + 2, b >> 16 & 255);
        c(a + 3, b >>> 24)
    };
    IO.prototype.mmap_register = function(a, b, c, d, e, f) {
        dbg_log("mmap_register addr=" + h(a >>> 0, 8) + " size=" + h(b, 8), LOG_IO);
        dbg_assert(0 === (a & MMAP_BLOCK_SIZE - 1));
        dbg_assert(b && 0 === (b & MMAP_BLOCK_SIZE - 1));
        e || (e = this.mmap_read32_shim.bind(this));
        f || (f = this.mmap_write32_shim.bind(this));
        for (a >>>= MMAP_BLOCK_BITS; 0 < b; a++) this.cpu.memory_map_read8[a] = c, this.cpu.memory_map_write8[a] = d, this.cpu.memory_map_read32[a] = e, this.cpu.memory_map_write32[a] = f, b -= MMAP_BLOCK_SIZE
    };
    IO.prototype.port_write8 = function(a, b) {
        var c = this.ports[a];
        (c.write8 === this.empty_port_write || LOG_ALL_IO) && dbg_log("write8 port #" + h(a, 4) + " <- " + h(b, 2) + this.get_port_description(a), LOG_IO);
        return c.write8.call(c.device, b)
    };
    IO.prototype.port_write16 = function(a, b) {
        var c = this.ports[a];
        (c.write16 === this.empty_port_write || LOG_ALL_IO) && dbg_log("write16 port #" + h(a, 4) + " <- " + h(b, 4) + this.get_port_description(a), LOG_IO);
        return c.write16.call(c.device, b)
    };
    IO.prototype.port_write32 = function(a, b) {
        var c = this.ports[a];
        (c.write32 === this.empty_port_write || LOG_ALL_IO) && dbg_log("write32 port #" + h(a, 4) + " <- " + h(b >>> 0, 8) + this.get_port_description(a), LOG_IO);
        return c.write32.call(c.device, b)
    };
    IO.prototype.port_read8 = function(a) {
        var b = this.ports[a];
        (b.read8 === this.empty_port_read8 || LOG_ALL_IO) && dbg_log("read8 port  #" + h(a, 4) + this.get_port_description(a), LOG_IO);
        b = b.read8.call(b.device);
        dbg_assert(256 > b, "8 bit port returned large value: " + h(a));
        return b
    };
    IO.prototype.port_read16 = function(a) {
        var b = this.ports[a];
        (b.read16 === this.empty_port_read16 || LOG_ALL_IO) && dbg_log("read16 port  #" + h(a, 4) + this.get_port_description(a), LOG_IO);
        b = b.read16.call(b.device);
        dbg_assert(65536 > b && 0 <= b, "16 bit port returned large value: " + h(a));
        return b
    };
    IO.prototype.port_read32 = function(a) {
        var b = this.ports[a];
        (b.read32 === this.empty_port_read32 || LOG_ALL_IO) && dbg_log("read32 port  #" + h(a, 4) + this.get_port_description(a), LOG_IO);
        a = b.read32.call(b.device);
        dbg_assert((a | 0) === a);
        return a
    };
    var debug_port_list = {
        4: "PORT_DMA_ADDR_2",
        5: "PORT_DMA_CNT_2",
        10: "PORT_DMA1_MASK_REG",
        11: "PORT_DMA1_MODE_REG",
        12: "PORT_DMA1_CLEAR_FF_REG",
        13: "PORT_DMA1_MASTER_CLEAR",
        32: "PORT_PIC1_CMD",
        33: "PORT_PIC1_DATA",
        64: "PORT_PIT_COUNTER0",
        65: "PORT_PIT_COUNTER1",
        66: "PORT_PIT_COUNTER2",
        67: "PORT_PIT_MODE",
        96: "PORT_PS2_DATA",
        97: "PORT_PS2_CTRLB",
        100: "PORT_PS2_STATUS",
        112: "PORT_CMOS_INDEX",
        113: "PORT_CMOS_DATA",
        128: "PORT_DIAG",
        129: "PORT_DMA_PAGE_2",
        146: "PORT_A20",
        160: "PORT_PIC2_CMD",
        161: "PORT_PIC2_DATA",
        178: "PORT_SMI_CMD",
        179: "PORT_SMI_STATUS",
        212: "PORT_DMA2_MASK_REG",
        214: "PORT_DMA2_MODE_REG",
        218: "PORT_DMA2_MASTER_CLEAR",
        240: "PORT_MATH_CLEAR",
        368: "PORT_ATA2_CMD_BASE",
        496: "PORT_ATA1_CMD_BASE",
        632: "PORT_LPT2",
        744: "PORT_SERIAL4",
        760: "PORT_SERIAL2",
        884: "PORT_ATA2_CTRL_BASE",
        888: "PORT_LPT1",
        1E3: "PORT_SERIAL3",
        1008: "PORT_FD_BASE",
        1010: "PORT_FD_DOR",
        1012: "PORT_FD_STATUS",
        1013: "PORT_FD_DATA",
        1014: "PORT_HD_DATA",
        1015: "PORT_FD_DIR",
        1016: "PORT_SERIAL1",
        3320: "PORT_PCI_CMD",
        3321: "PORT_PCI_REBOOT",
        3324: "PORT_PCI_DATA",
        1026: "PORT_BIOS_DEBUG",
        1296: "PORT_QEMU_CFG_CTL",
        1297: "PORT_QEMU_CFG_DATA",
        45056: "PORT_ACPI_PM_BASE",
        45312: "PORT_SMB_BASE",
        35072: "PORT_BIOS_APM"
    };
    IO.prototype.get_port_description = function(a) {
        return debug_port_list[a] ? "  (" + debug_port_list[a] + ")" : ""
    };

    function v86(a, b) {
        this.stopped = this.running = !1;
        this.tick_counter = 0;
        this.worker = null;
        this.cpu = new CPU(a, b, () => {
            this.idle && this.next_tick(0)
        });
        this.bus = a;
        a.register("cpu-init", this.init, this);
        a.register("cpu-run", this.run, this);
        a.register("cpu-stop", this.stop, this);
        a.register("cpu-restart", this.restart, this);
        this.register_yield()
    }
    v86.prototype.run = function() {
        this.stopped = !1;
        this.running || (this.running = !0, this.bus.send("emulator-started"));
        this.next_tick(0)
    };
    v86.prototype.do_tick = function() {
        if (this.stopped || !this.running) this.stopped = this.running = !1, this.bus.send("emulator-stopped");
        else {
            this.idle = !1;
            var a = this.cpu.main_run();
            this.next_tick(a)
        }
    };
    v86.prototype.next_tick = function(a) {
        const b = ++this.tick_counter;
        this.idle = !0;
        this.yield(a, b)
    };
    v86.prototype.yield_callback = function(a) {
        a === this.tick_counter && this.do_tick()
    };
    v86.prototype.stop = function() {
        this.running && (this.stopped = !0)
    };
    v86.prototype.destroy = function() {
        this.unregister_yield()
    };
    v86.prototype.restart = function() {
        this.cpu.reset_cpu();
        this.cpu.load_bios()
    };
    v86.prototype.init = function(a) {
        this.cpu.init(a, this.bus);
        this.bus.send("emulator-ready")
    };
    if ("undefined" !== typeof process) v86.prototype.yield = function(a, b) {
        1 > a ? global.setImmediate(c => this.yield_callback(c), b) : setTimeout(c => this.yield_callback(c), a, b)
    }, v86.prototype.register_yield = function() {}, v86.prototype.unregister_yield = function() {};
    else if ("undefined" !== typeof Worker) {
        function a() {
            globalThis.onmessage = function(b) {
                const c = b.data.t;
                1 > c ? postMessage(b.data.tick) : setTimeout(() => postMessage(b.data.tick), c)
            }
        }
        v86.prototype.register_yield = function() {
            const b = URL.createObjectURL(new Blob(["(" +
                a.toString() + ")()"
            ], {
                type: "text/javascript"
            }));
            this.worker = new Worker(b);
            this.worker.onmessage = c => this.yield_callback(c.data);
            URL.revokeObjectURL(b)
        };
        v86.prototype.yield = function(b, c) {
            this.worker.postMessage({
                t: b,
                tick: c
            })
        };
        v86.prototype.unregister_yield = function() {
            this.worker.terminate();
            this.worker = null
        }
    } else v86.prototype.yield = function(a) {
        setTimeout(() => {
            this.do_tick()
        }, a)
    }, v86.prototype.register_yield = function() {}, v86.prototype.unregister_yield = function() {};
    v86.prototype.save_state = function() {
        return this.cpu.save_state()
    };
    v86.prototype.restore_state = function(a) {
        return this.cpu.restore_state(a)
    };
    if ("object" === typeof performance && performance.now) v86.microtick = performance.now.bind(performance);
    else if ("function" === typeof require) {
        const {
            performance: a
        } = require("perf_hooks");
        v86.microtick = a.now.bind(a)
    } else v86.microtick = "object" === typeof process && process.hrtime ? function() {
        var a = process.hrtime();
        return 1E3 * a[0] + a[1] / 1E6
    } : Date.now;
    var goog = goog || {};
    goog.exportSymbol = function() {};
    goog.exportProperty = function() {};
    var v86util = v86util || {};
    v86util.pads = function(a, b) {
        return (a || 0 === a ? a + "" : "").padEnd(b, " ")
    };
    v86util.pad0 = function(a, b) {
        return (a || 0 === a ? a + "" : "").padStart(b, "0")
    };
    v86util.zeros = function(a) {
        return Array(a).fill(0)
    };
    v86util.range = function(a) {
        return Array.from(Array(a).keys())
    };
    v86util.view = function(a, b, c, d) {
        return new Proxy({}, {
            get: function(e, f, g) {
                e = new a(b.buffer, c, d);
                g = e[f];
                if ("function" === typeof g) return g.bind(e);
                dbg_assert(/^\d+$/.test(f) || "buffer" === f || "length" === f || "BYTES_PER_ELEMENT" === f || "byteOffset" === f);
                return g
            },
            set: function(e, f, g, k) {
                dbg_assert(/^\d+$/.test(f));
                (new a(b.buffer, c, d))[f] = g;
                return !0
            }
        })
    };

    function h(a, b) {
        a = a ? a.toString(16) : "";
        return "0x" + v86util.pad0(a.toUpperCase(), b || 1)
    }

    function hex_dump(a) {
        function b(k, l) {
            return v86util.pad0(k.toString(16).toUpperCase(), l)
        }
        const c = [];
        let d = 0;
        for (; d + 15 < a.length; d += 16) {
            var e = b(d, 5) + "   ";
            for (var f = 0; 16 > f; f++) e += b(a[d + f], 2) + " ";
            e += "  ";
            for (f = 0; 16 > f; f++) {
                var g = a[d + f];
                e += 33 <= g && 34 !== g && 92 !== g && 126 >= g ? String.fromCharCode(g) : "."
            }
            c.push(e)
        }
        for (e = b(d, 5) + "   "; d < a.length; d++) e += b(a[d], 2) + " ";
        f = d & 15;
        e += "   ".repeat(16 - f);
        e += "  ";
        for (g = 0; g < f; g++) {
            const k = a[d + g];
            e += 33 <= k && 34 !== k && 92 !== k && 126 >= k ? String.fromCharCode(k) : "."
        }
        c.push(e);
        return "\n" +
            c.join("\n") + "\n"
    }
    if ("undefined" !== typeof crypto && crypto.getRandomValues) {
        let a = new Int32Array(1);
        v86util.get_rand_int = function() {
            crypto.getRandomValues(a);
            return a[0]
        }
    } else if ("undefined" !== typeof require) {
        const a = require("crypto");
        v86util.get_rand_int = function() {
            return a.randomBytes(4).readInt32LE(0)
        }
    } else dbg_assert(!1, "Unsupported platform: No cryptographic random values");

    function SyncBuffer(a) {
        dbg_assert(a instanceof ArrayBuffer);
        this.buffer = a;
        this.byteLength = a.byteLength;
        this.onprogress = this.onload = void 0
    }
    SyncBuffer.prototype.load = function() {
        this.onload && this.onload({
            buffer: this.buffer
        })
    };
    SyncBuffer.prototype.get = function(a, b, c) {
        dbg_assert(a + b <= this.byteLength);
        c(new Uint8Array(this.buffer, a, b))
    };
    SyncBuffer.prototype.set = function(a, b, c) {
        dbg_assert(a + b.byteLength <= this.byteLength);
        (new Uint8Array(this.buffer, a, b.byteLength)).set(b);
        c()
    };
    SyncBuffer.prototype.get_buffer = function(a) {
        a(this.buffer)
    };
    SyncBuffer.prototype.get_state = function() {
        const a = [];
        a[0] = this.byteLength;
        a[1] = new Uint8Array(this.buffer);
        return a
    };
    SyncBuffer.prototype.set_state = function(a) {
        this.byteLength = a[0];
        this.buffer = a[1].slice().buffer
    };
    (function() {
        if ("function" === typeof Math.clz32) v86util.int_log2_byte = function(d) {
            dbg_assert(0 < d);
            dbg_assert(256 > d);
            return 31 - Math.clz32(d)
        }, v86util.int_log2 = function(d) {
            dbg_assert(0 < d);
            return 31 - Math.clz32(d)
        };
        else {
            for (var a = new Int8Array(256), b = 0, c = -2; 256 > b; b++) b & b - 1 || c++, a[b] = c;
            v86util.int_log2_byte = function(d) {
                dbg_assert(0 < d);
                dbg_assert(256 > d);
                return a[d]
            };
            v86util.int_log2 = function(d) {
                d >>>= 0;
                dbg_assert(0 < d);
                var e = d >>> 16;
                if (e) {
                    var f = e >>> 8;
                    return f ? 24 + a[f] : 16 + a[e]
                }
                return (f = d >>> 8) ? 8 + a[f] : a[d]
            }
        }
    })();

    function ByteQueue(a) {
        var b = new Uint8Array(a),
            c, d;
        dbg_assert(0 === (a & a - 1));
        this.length = 0;
        this.push = function(e) {
            this.length !== a && this.length++;
            b[d] = e;
            d = d + 1 & a - 1
        };
        this.shift = function() {
            if (this.length) {
                var e = b[c];
                c = c + 1 & a - 1;
                this.length--;
                return e
            }
            return -1
        };
        this.peek = function() {
            return this.length ? b[c] : -1
        };
        this.clear = function() {
            this.length = d = c = 0
        };
        this.clear()
    }

    function FloatQueue(a) {
        this.size = a;
        this.data = new Float32Array(a);
        this.length = this.end = this.start = 0;
        dbg_assert(0 === (a & a - 1))
    }
    FloatQueue.prototype.push = function(a) {
        this.length === this.size ? this.start = this.start + 1 & this.size - 1 : this.length++;
        this.data[this.end] = a;
        this.end = this.end + 1 & this.size - 1
    };
    FloatQueue.prototype.shift = function() {
        if (this.length) {
            var a = this.data[this.start];
            this.start = this.start + 1 & this.size - 1;
            this.length--;
            return a
        }
    };
    FloatQueue.prototype.shift_block = function(a) {
        var b = new Float32Array(a);
        a > this.length && (a = this.length);
        var c = this.start + a,
            d = this.data.subarray(this.start, c);
        b.set(d);
        c >= this.size && (c -= this.size, b.set(this.data.subarray(0, c), d.length));
        this.start = c;
        this.length -= a;
        return b
    };
    FloatQueue.prototype.peek = function() {
        if (this.length) return this.data[this.start]
    };
    FloatQueue.prototype.clear = function() {
        this.length = this.end = this.start = 0
    };

    function CircularQueue(a) {
        this.data = [];
        this.index = 0;
        this.size = a
    }
    CircularQueue.prototype.add = function(a) {
        this.data[this.index] = a;
        this.index = (this.index + 1) % this.size
    };
    CircularQueue.prototype.toArray = function() {
        return [].slice.call(this.data, this.index).concat([].slice.call(this.data, 0, this.index))
    };
    CircularQueue.prototype.clear = function() {
        this.data = [];
        this.index = 0
    };
    CircularQueue.prototype.set = function(a) {
        this.data = a;
        this.index = 0
    };

    function dump_file(a, b) {
        a instanceof Array || (a = [a]);
        a = new Blob(a);
        download(a, b)
    }

    function download(a, b) {
        var c = document.createElement("a");
        c.download = b;
        c.href = window.URL.createObjectURL(a);
        c.dataset.downloadurl = ["application/octet-stream", c.download, c.href].join(":");
        document.createEvent ? (a = document.createEvent("MouseEvent"), a.initMouseEvent("click", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), c.dispatchEvent(a)) : c.click();
        window.URL.revokeObjectURL(c.href)
    }
    v86util.Bitmap = function(a) {
        "number" === typeof a ? this.view = new Uint8Array(a + 7 >> 3) : a instanceof ArrayBuffer ? this.view = new Uint8Array(a) : console.assert(!1)
    };
    v86util.Bitmap.prototype.set = function(a, b) {
        const c = a >> 3;
        a = 1 << (a & 7);
        this.view[c] = b ? this.view[c] | a : this.view[c] & ~a
    };
    v86util.Bitmap.prototype.get = function(a) {
        return this.view[a >> 3] >> (a & 7) & 1
    };
    v86util.Bitmap.prototype.get_buffer = function() {
        return this.view.buffer
    };
    var CDROM_SECTOR_SIZE = 2048,
        HD_SECTOR_SIZE = 512;

    function IDEDevice(a, b, c, d, e, f) {
        this.master = new IDEInterface(this, a, b, d, e, 0, f);
        this.slave = new IDEInterface(this, a, c, !1, e, 1, f);
        this.current_interface = this.master;
        this.cpu = a;
        0 === e ? (this.ata_port = 496, this.irq = 14, this.pci_id = 240) : 1 === e ? (this.ata_port = 368, this.irq = 15, this.pci_id = 248) : dbg_assert(!1, "IDE device with nr " + e + " ignored", LOG_DISK);
        this.ata_port_high = this.ata_port | 516;
        this.master_port = 46080;
        this.pci_space = [134, 128, 16, 112, 5, 0, 160, 2, 0, 128, 1, 1, 0, 0, 0, 0, this.ata_port & 255 | 1, this.ata_port >> 8, 0, 0, this.ata_port_high &
            255 | 1, this.ata_port_high >> 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.master_port & 255 | 1, this.master_port >> 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 67, 16, 212, 130, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.irq, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ];
        this.pci_bars = [{
            size: 8
        }, {
            size: 4
        }, void 0, void 0, {
            size: 16
        }];
        this.name = "ide" + e;
        this.device_control = 2;
        a.io.register_read(this.ata_port | 7, this, function() {
            dbg_log("lower irq",
                LOG_DISK);
            this.cpu.device_lower_irq(this.irq);
            return this.read_status()
        });
        a.io.register_read(this.ata_port_high | 2, this, this.read_status);
        a.io.register_write(this.ata_port_high | 2, this, this.write_control);
        a.io.register_read(this.ata_port | 0, this, function() {
            return this.current_interface.read_data(1)
        }, function() {
            return this.current_interface.read_data(2)
        }, function() {
            return this.current_interface.read_data(4)
        });
        a.io.register_read(this.ata_port | 1, this, function() {
            dbg_log("Read error: " + h(this.current_interface.error &
                255) + " slave=" + (this.current_interface === this.slave), LOG_DISK);
            return this.current_interface.error & 255
        });
        a.io.register_read(this.ata_port | 2, this, function() {
            dbg_log("Read bytecount: " + h(this.current_interface.bytecount & 255), LOG_DISK);
            return this.current_interface.bytecount & 255
        });
        a.io.register_read(this.ata_port | 3, this, function() {
            dbg_log("Read sector: " + h(this.current_interface.sector & 255), LOG_DISK);
            return this.current_interface.sector & 255
        });
        a.io.register_read(this.ata_port | 4, this, function() {
            dbg_log("Read 1F4: " +
                h(this.current_interface.cylinder_low & 255), LOG_DISK);
            return this.current_interface.cylinder_low & 255
        });
        a.io.register_read(this.ata_port | 5, this, function() {
            dbg_log("Read 1F5: " + h(this.current_interface.cylinder_high & 255), LOG_DISK);
            return this.current_interface.cylinder_high & 255
        });
        a.io.register_read(this.ata_port | 6, this, function() {
            dbg_log("Read 1F6", LOG_DISK);
            return this.current_interface.drive_head & 255
        });
        a.io.register_write(this.ata_port | 0, this, function(g) {
                this.current_interface.write_data_port8(g)
            },
            function(g) {
                this.current_interface.write_data_port16(g)
            },
            function(g) {
                this.current_interface.write_data_port32(g)
            });
        a.io.register_write(this.ata_port | 1, this, function(g) {
            dbg_log("1F1/lba_count: " + h(g), LOG_DISK);
            this.master.lba_count = (this.master.lba_count << 8 | g) & 65535;
            this.slave.lba_count = (this.slave.lba_count << 8 | g) & 65535
        });
        a.io.register_write(this.ata_port | 2, this, function(g) {
            dbg_log("1F2/bytecount: " + h(g), LOG_DISK);
            this.master.bytecount = (this.master.bytecount << 8 | g) & 65535;
            this.slave.bytecount = (this.slave.bytecount <<
                8 | g) & 65535
        });
        a.io.register_write(this.ata_port | 3, this, function(g) {
            dbg_log("1F3/sector: " + h(g), LOG_DISK);
            this.master.sector = (this.master.sector << 8 | g) & 65535;
            this.slave.sector = (this.slave.sector << 8 | g) & 65535
        });
        a.io.register_write(this.ata_port | 4, this, function(g) {
            dbg_log("1F4/sector low: " + h(g), LOG_DISK);
            this.master.cylinder_low = (this.master.cylinder_low << 8 | g) & 65535;
            this.slave.cylinder_low = (this.slave.cylinder_low << 8 | g) & 65535
        });
        a.io.register_write(this.ata_port | 5, this, function(g) {
            dbg_log("1F5/sector high: " +
                h(g), LOG_DISK);
            this.master.cylinder_high = (this.master.cylinder_high << 8 | g) & 65535;
            this.slave.cylinder_high = (this.slave.cylinder_high << 8 | g) & 65535
        });
        a.io.register_write(this.ata_port | 6, this, function(g) {
            var k = g & 16;
            dbg_log("1F6/drive: " + h(g, 2), LOG_DISK);
            k ? (dbg_log("Slave", LOG_DISK), this.current_interface = this.slave) : this.current_interface = this.master;
            this.master.drive_head = g;
            this.slave.drive_head = g;
            this.master.is_lba = this.slave.is_lba = g >> 6 & 1;
            this.master.head = this.slave.head = g & 15
        });
        this.dma_command = this.dma_status =
            this.prdt_addr = 0;
        a.io.register_write(this.ata_port | 7, this, function(g) {
            dbg_log("lower irq", LOG_DISK);
            this.cpu.device_lower_irq(this.irq);
            this.current_interface.ata_command(g)
        });
        a.io.register_read(this.master_port | 4, this, void 0, void 0, this.dma_read_addr);
        a.io.register_write(this.master_port | 4, this, void 0, void 0, this.dma_set_addr);
        a.io.register_read(this.master_port, this, this.dma_read_command8, void 0, this.dma_read_command);
        a.io.register_write(this.master_port, this, this.dma_write_command8, void 0, this.dma_write_command);
        a.io.register_read(this.master_port | 2, this, this.dma_read_status);
        a.io.register_write(this.master_port | 2, this, this.dma_write_status);
        a.io.register_read(this.master_port | 8, this, function() {
            dbg_log("DMA read 0x8", LOG_DISK);
            return 0
        });
        a.io.register_read(this.master_port | 10, this, function() {
            dbg_log("DMA read 0xA", LOG_DISK);
            return 0
        });
        a.devices.pci.register_device(this);
        DEBUG && Object.seal(this)
    }
    IDEDevice.prototype.read_status = function() {
        if (this.current_interface.buffer) {
            var a = this.current_interface.status;
            dbg_log("ATA read status: " + h(a, 2), LOG_DISK);
            return a
        }
        return 0
    };
    IDEDevice.prototype.write_control = function(a) {
        dbg_log("set device control: " + h(a, 2) + " interrupts " + (a & 2 ? "disabled" : "enabled"), LOG_DISK);
        a & 4 && (dbg_log("Reset via control port", LOG_DISK), this.cpu.device_lower_irq(this.irq), this.master.device_reset(), this.slave.device_reset());
        this.device_control = a
    };
    IDEDevice.prototype.dma_read_addr = function() {
        dbg_log("dma get address: " + h(this.prdt_addr, 8), LOG_DISK);
        return this.prdt_addr
    };
    IDEDevice.prototype.dma_set_addr = function(a) {
        dbg_log("dma set address: " + h(a, 8), LOG_DISK);
        this.prdt_addr = a
    };
    IDEDevice.prototype.dma_read_status = function() {
        dbg_log("DMA read status: " + h(this.dma_status), LOG_DISK);
        return this.dma_status
    };
    IDEDevice.prototype.dma_write_status = function(a) {
        dbg_log("DMA set status: " + h(a), LOG_DISK);
        this.dma_status &= ~(a & 6)
    };
    IDEDevice.prototype.dma_read_command = function() {
        return this.dma_read_command8() | this.dma_read_status() << 16
    };
    IDEDevice.prototype.dma_read_command8 = function() {
        dbg_log("DMA read command: " + h(this.dma_command), LOG_DISK);
        return this.dma_command
    };
    IDEDevice.prototype.dma_write_command = function(a) {
        dbg_log("DMA write command: " + h(a), LOG_DISK);
        this.dma_write_command8(a & 255);
        this.dma_write_status(a >> 16 & 255)
    };
    IDEDevice.prototype.dma_write_command8 = function(a) {
        dbg_log("DMA write command8: " + h(a), LOG_DISK);
        let b = this.dma_command;
        this.dma_command = a & 9;
        if ((b & 1) !== (a & 1))
            if (0 === (a & 1)) this.dma_status &= -2;
            else switch (this.dma_status |= 1, this.current_interface.current_command) {
                case 37:
                case 200:
                    this.current_interface.do_ata_read_sectors_dma();
                    break;
                case 202:
                case 53:
                    this.current_interface.do_ata_write_sectors_dma();
                    break;
                case 160:
                    this.current_interface.do_atapi_dma();
                    break;
                default:
                    dbg_log("Spurious dma command write, current command: " +
                        h(this.current_interface.current_command), LOG_DISK), dbg_assert(!1)
            }
    };
    IDEDevice.prototype.push_irq = function() {
        0 === (this.device_control & 2) && (dbg_log("push irq", LOG_DISK), this.dma_status |= 4, this.cpu.device_raise_irq(this.irq))
    };
    IDEDevice.prototype.get_state = function() {
        var a = [];
        a[0] = this.master;
        a[1] = this.slave;
        a[2] = this.ata_port;
        a[3] = this.irq;
        a[4] = this.pci_id;
        a[5] = this.ata_port_high;
        a[6] = this.master_port;
        a[7] = this.name;
        a[8] = this.device_control;
        a[9] = this.prdt_addr;
        a[10] = this.dma_status;
        a[11] = this.current_interface === this.master;
        a[12] = this.dma_command;
        return a
    };
    IDEDevice.prototype.set_state = function(a) {
        this.master.set_state(a[0]);
        this.slave.set_state(a[1]);
        this.ata_port = a[2];
        this.irq = a[3];
        this.pci_id = a[4];
        this.ata_port_high = a[5];
        this.master_port = a[6];
        this.name = a[7];
        this.device_control = a[8];
        this.prdt_addr = a[9];
        this.dma_status = a[10];
        this.current_interface = a[11] ? this.master : this.slave;
        this.dma_command = a[12]
    };

    function IDEInterface(a, b, c, d, e, f, g) {
        this.device = a;
        this.bus = g;
        this.nr = e;
        this.cpu = b;
        this.buffer = c;
        this.sector_size = d ? CDROM_SECTOR_SIZE : HD_SECTOR_SIZE;
        this.is_atapi = d;
        this.cylinder_count = this.sectors_per_track = this.head_count = this.sector_count = 0;
        this.buffer && (this.sector_count = this.buffer.byteLength / this.sector_size, this.sector_count !== (this.sector_count | 0) && (dbg_log("Warning: Disk size not aligned with sector size", LOG_DISK), this.sector_count = Math.ceil(this.sector_count)), d ? (this.head_count = 1, this.sectors_per_track =
                0) : (this.head_count = 16, this.sectors_per_track = 63), this.cylinder_count = this.sector_count / this.head_count / this.sectors_per_track, this.cylinder_count !== (this.cylinder_count | 0) && (dbg_log("Warning: Rounding up cylinder count. Choose different head number", LOG_DISK), this.cylinder_count = Math.floor(this.cylinder_count)), a = b.devices.rtc, a.cmos_write(CMOS_BIOS_DISKTRANSFLAG, a.cmos_read(CMOS_BIOS_DISKTRANSFLAG) | 1 << 4 * this.nr), a.cmos_write(CMOS_DISK_DATA, a.cmos_read(CMOS_DISK_DATA) & 15 | 240), b = CMOS_DISK_DRIVE1_CYL,
            a.cmos_write(b + 0, this.cylinder_count & 255), a.cmos_write(b + 1, this.cylinder_count >> 8 & 255), a.cmos_write(b + 2, this.head_count & 255), a.cmos_write(b + 3, 255), a.cmos_write(b + 4, 255), a.cmos_write(b + 5, 200), a.cmos_write(b + 6, this.cylinder_count & 255), a.cmos_write(b + 7, this.cylinder_count >> 8 & 255), a.cmos_write(b + 8, this.sectors_per_track & 255));
        this.stats = {
            sectors_read: 0,
            sectors_written: 0,
            bytes_read: 0,
            bytes_written: 0,
            loading: !1
        };
        this.buffer = c;
        this.drive_head = this.head = this.cylinder_high = this.cylinder_low = this.lba_count =
            this.sector = this.bytecount = this.is_lba = 0;
        this.status = 80;
        this.sectors_per_drq = 128;
        this.data_pointer = this.error = 0;
        this.data = new Uint8Array(65536);
        this.data16 = new Uint16Array(this.data.buffer);
        this.data32 = new Int32Array(this.data.buffer);
        this.data_end = this.data_length = 0;
        this.current_atapi_command = this.current_command = -1;
        this.last_io_id = this.write_dest = 0;
        this.in_progress_io_ids = new Set;
        this.cancelled_io_ids = new Set;
        Object.seal(this)
    }
    IDEInterface.prototype.device_reset = function() {
        this.is_atapi ? (this.status = 0, this.sector = this.error = this.bytecount = 1, this.cylinder_low = 20, this.cylinder_high = 235) : (this.status = 81, this.sector = this.error = this.bytecount = 1, this.cylinder_high = this.cylinder_low = 0);
        this.cancel_io_operations()
    };
    IDEInterface.prototype.push_irq = function() {
        this.device.push_irq()
    };
    IDEInterface.prototype.ata_command = function(a) {
        dbg_log("ATA Command: " + h(a) + " slave=" + (this.drive_head >> 4 & 1), LOG_DISK);
        if (this.buffer) switch (this.current_command = a, this.error = 0, a) {
            case 8:
                dbg_log("ATA device reset", LOG_DISK);
                this.data_length = this.data_end = this.data_pointer = 0;
                this.device_reset();
                this.push_irq();
                break;
            case 16:
                this.status = 80;
                this.cylinder_low = 0;
                this.push_irq();
                break;
            case 248:
                this.status = 80;
                a = this.sector_count - 1;
                this.sector = a & 255;
                this.cylinder_low = a >> 8 & 255;
                this.cylinder_high = a >> 16 & 255;
                this.drive_head = this.drive_head & 240 | a >> 24 & 15;
                this.push_irq();
                break;
            case 39:
                this.status = 80;
                a = this.sector_count - 1;
                this.sector = a & 255;
                this.cylinder_low = a >> 8 & 255;
                this.cylinder_high = a >> 16 & 255;
                this.sector |= a >> 24 << 8 & 65280;
                this.push_irq();
                break;
            case 32:
            case 36:
            case 41:
            case 196:
                this.ata_read_sectors(a);
                break;
            case 48:
            case 52:
            case 57:
            case 197:
                this.ata_write_sectors(a);
                break;
            case 144:
                this.push_irq();
                this.error = 257;
                this.status = 80;
                break;
            case 145:
                this.status = 80;
                this.push_irq();
                break;
            case 160:
                this.is_atapi && (this.status =
                    88, this.data_allocate(12), this.data_end = 12, this.bytecount = 1, this.push_irq());
                break;
            case 161:
                dbg_log("ATA identify packet device", LOG_DISK);
                this.is_atapi ? (this.create_identify_packet(), this.status = 88, this.cylinder_low = 20, this.cylinder_high = 235) : this.status = 65;
                this.push_irq();
                break;
            case 198:
                dbg_log("Logical sectors per DRQ Block: " + h(this.bytecount & 255), LOG_DISK);
                this.sectors_per_drq = this.bytecount & 255;
                this.status = 80;
                this.push_irq();
                break;
            case 37:
            case 200:
                this.ata_read_sectors_dma(a);
                break;
            case 53:
            case 202:
                this.ata_write_sectors_dma(a);
                break;
            case 64:
                dbg_log("read verify sectors", LOG_DISK);
                this.status = 80;
                this.push_irq();
                break;
            case 218:
                dbg_log("Unimplemented: get media status", LOG_DISK);
                this.status = 65;
                this.error = 4;
                this.push_irq();
                break;
            case 224:
                dbg_log("ATA standby immediate", LOG_DISK);
                this.status = 80;
                this.push_irq();
                break;
            case 225:
                dbg_log("ATA idle immediate", LOG_DISK);
                this.status = 80;
                this.push_irq();
                break;
            case 231:
                dbg_log("ATA flush cache", LOG_DISK);
                this.status = 80;
                this.push_irq();
                break;
            case 236:
                dbg_log("ATA identify device", LOG_DISK);
                if (this.is_atapi) {
                    this.status = 65;
                    this.error = 4;
                    this.push_irq();
                    break
                }
                this.create_identify_packet();
                this.status = 88;
                this.push_irq();
                break;
            case 234:
                dbg_log("flush cache ext", LOG_DISK);
                this.status = 80;
                this.push_irq();
                break;
            case 239:
                dbg_log("set features: " + h(this.bytecount & 255), LOG_DISK);
                this.status = 80;
                this.push_irq();
                break;
            case 222:
                this.status = 80;
                this.push_irq();
                break;
            case 245:
                dbg_log("security freeze lock", LOG_DISK);
                this.status = 80;
                this.push_irq();
                break;
            case 249:
                dbg_log("Unimplemented: set max address",
                    LOG_DISK);
                this.status = 65;
                this.error = 4;
                break;
            default:
                dbg_assert(!1, "New ATA cmd on 1F7: " + h(a), LOG_DISK), this.status = 65, this.error = 4
        } else dbg_log("abort: No buffer", LOG_DISK), this.error = 4, this.status = 65, this.push_irq()
    };
    IDEInterface.prototype.atapi_handle = function() {
        dbg_log("ATAPI Command: " + h(this.data[0]) + " slave=" + (this.drive_head >> 4 & 1), LOG_DISK);
        this.data_pointer = 0;
        this.current_atapi_command = this.data[0];
        switch (this.current_atapi_command) {
            case 0:
                dbg_log("test unit ready", LOG_DISK);
                this.data_allocate(0);
                this.data_end = this.data_length;
                this.status = 80;
                break;
            case 3:
                this.data_allocate(this.data[4]);
                this.data_end = this.data_length;
                this.status = 88;
                this.data[0] = 240;
                this.data[2] = 5;
                this.data[7] = 8;
                break;
            case 18:
                var a = this.data[4];
                this.status = 88;
                dbg_log("inquiry: " + h(this.data[1], 2) + " length=" + a, LOG_DISK);
                this.data.set([5, 128, 1, 49, 31, 0, 0, 0, 83, 79, 78, 89, 32, 32, 32, 32, 67, 68, 45, 82, 79, 77, 32, 67, 68, 85, 45, 49, 48, 48, 48, 32, 49, 46, 49, 97]);
                this.data_end = this.data_length = Math.min(36, a);
                break;
            case 26:
                this.data_allocate(this.data[4]);
                this.data_end = this.data_length;
                this.status = 88;
                break;
            case 30:
                this.data_allocate(0);
                this.data_end = this.data_length;
                this.status = 80;
                break;
            case 37:
                a = this.sector_count - 1;
                this.data_set(new Uint8Array([a >> 24 & 255, a >> 16 & 255,
                    a >> 8 & 255, a & 255, 0, 0, this.sector_size >> 8 & 255, this.sector_size & 255
                ]));
                this.data_end = this.data_length;
                this.status = 88;
                break;
            case 40:
                this.lba_count & 1 ? this.atapi_read_dma(this.data) : this.atapi_read(this.data);
                break;
            case 66:
                a = this.data[8];
                this.data_allocate(Math.min(8, a));
                this.data_end = this.data_length;
                dbg_log("read q subcode: length=" + a, LOG_DISK);
                this.status = 88;
                break;
            case 67:
                a = this.data[8] | this.data[7] << 8;
                var b = this.data[9] >> 6;
                this.data_allocate(a);
                this.data_end = this.data_length;
                dbg_log("read toc: " + h(b,
                    2) + " length=" + a + " " + (this.data[1] & 2) + " " + h(this.data[6]), LOG_DISK);
                0 === b ? (a = this.sector_count, this.data.set(new Uint8Array([0, 18, 1, 1, 0, 20, 1, 0, 0, 0, 0, 0, 0, 22, 170, 0, a >> 24, a >> 16 & 255, a >> 8 & 255, a & 255]))) : 1 === b ? this.data.set(new Uint8Array([0, 10, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0])) : dbg_assert(!1, "Unimplemented format: " + b);
                this.status = 88;
                break;
            case 70:
                a = this.data[8] | this.data[7] << 8;
                a = Math.min(a, 32);
                this.data_allocate(a);
                this.data_end = this.data_length;
                this.data[0] = a - 4 >> 24 & 255;
                this.data[1] = a - 4 >> 16 & 255;
                this.data[2] = a - 4 >> 8 &
                    255;
                this.data[3] = a - 4 & 255;
                this.data[6] = 8;
                this.data[10] = 3;
                this.status = 88;
                break;
            case 81:
                this.data_allocate(0);
                this.data_end = this.data_length;
                this.status = 80;
                break;
            case 82:
                dbg_log("Unimplemented ATAPI command: " + h(this.data[0]), LOG_DISK);
                this.status = 81;
                this.data_length = 0;
                this.error = 80;
                break;
            case 90:
                a = this.data[8] | this.data[7] << 8;
                b = this.data[2];
                dbg_log("mode sense: " + h(b) + " length=" + a, LOG_DISK);
                42 === b && this.data_allocate(Math.min(30, a));
                this.data_end = this.data_length;
                this.status = 88;
                break;
            case 189:
                this.data_allocate(this.data[9] |
                    this.data[8] << 8);
                this.data_end = this.data_length;
                this.data[5] = 1;
                this.status = 88;
                break;
            case 74:
                this.status = 81;
                this.data_length = 0;
                this.error = 80;
                dbg_log("Unimplemented ATAPI command: " + h(this.data[0]), LOG_DISK);
                break;
            case 190:
                dbg_log("Unimplemented ATAPI command: " + h(this.data[0]), LOG_DISK);
                this.data_allocate(0);
                this.data_end = this.data_length;
                this.status = 80;
                break;
            default:
                this.status = 81, this.data_length = 0, this.error = 80, dbg_log("Unimplemented ATAPI command: " + h(this.data[0]), LOG_DISK), dbg_assert(!1)
        }
        this.bytecount =
            this.bytecount & -8 | 2;
        0 === (this.status & 128) && this.push_irq();
        0 === (this.status & 128) && 0 === this.data_length && (this.bytecount |= 1, this.status &= -9)
    };
    IDEInterface.prototype.do_write = function() {
        this.status = 80;
        dbg_assert(this.data_length <= this.data.length);
        var a = this.data.subarray(0, this.data_length);
        dbg_assert(0 === this.data_length % 512);
        this.ata_advance(this.current_command, this.data_length / 512);
        this.push_irq();
        this.buffer.set(this.write_dest, a, function() {});
        this.report_write(this.data_length)
    };
    IDEInterface.prototype.atapi_read = function(a) {
        var b = a[2] << 24 | a[3] << 16 | a[4] << 8 | a[5],
            c = a[7] << 8 | a[8];
        a = a[1];
        var d = c * this.sector_size,
            e = b * this.sector_size;
        dbg_log("CD read lba=" + h(b) + " lbacount=" + h(c) + " bytecount=" + h(d) + " flags=" + h(a), LOG_DISK);
        this.data_length = 0;
        var f = this.cylinder_high << 8 & 65280 | this.cylinder_low & 255;
        dbg_log(h(this.cylinder_high, 2) + " " + h(this.cylinder_low, 2), LOG_DISK);
        this.cylinder_low = this.cylinder_high = 0;
        65535 === f && f--;
        f > d && (f = d);
        e >= this.buffer.byteLength ? (dbg_assert(!1, "CD read: Outside of disk  end=" +
            h(e + d) + " size=" + h(this.buffer.byteLength), LOG_DISK), this.status = 255, this.push_irq()) : 0 === d ? (this.status = 80, this.data_pointer = 0) : (d = Math.min(d, this.buffer.byteLength - e), this.status = 208, this.report_read_start(), this.read_buffer(e, d, g => {
            dbg_log("cd read: data arrived", LOG_DISK);
            this.data_set(g);
            this.status = 88;
            this.bytecount = this.bytecount & -8 | 2;
            this.push_irq();
            this.data_end = f &= -4;
            this.data_end > this.data_length && (this.data_end = this.data_length);
            this.cylinder_low = this.data_end & 255;
            this.cylinder_high = this.data_end >>
                8 & 255;
            this.report_read_end(d)
        }))
    };
    IDEInterface.prototype.atapi_read_dma = function(a) {
        var b = a[2] << 24 | a[3] << 16 | a[4] << 8 | a[5],
            c = a[7] << 8 | a[8];
        a = a[1];
        var d = c * this.sector_size,
            e = b * this.sector_size;
        dbg_log("CD read DMA lba=" + h(b) + " lbacount=" + h(c) + " bytecount=" + h(d) + " flags=" + h(a), LOG_DISK);
        e >= this.buffer.byteLength ? (dbg_assert(!1, "CD read: Outside of disk  end=" + h(e + d) + " size=" + h(this.buffer.byteLength), LOG_DISK), this.status = 255, this.push_irq()) : (this.status = 208, this.report_read_start(), this.read_buffer(e, d, f => {
            dbg_log("atapi_read_dma: Data arrived");
            this.report_read_end(d);
            this.status = 88;
            this.bytecount = this.bytecount & -8 | 2;
            this.data_set(f);
            this.do_atapi_dma()
        }))
    };
    IDEInterface.prototype.do_atapi_dma = function() {
        if (0 === (this.device.dma_status & 1)) dbg_log("do_atapi_dma: Status not set", LOG_DISK);
        else if (0 === (this.status & 8)) dbg_log("do_atapi_dma: DRQ not set", LOG_DISK);
        else {
            dbg_log("atapi dma transfer len=" + this.data_length, LOG_DISK);
            var a = this.device.prdt_addr,
                b = 0,
                c = this.data;
            do {
                var d = this.cpu.read32s(a),
                    e = this.cpu.read16(a + 4),
                    f = this.cpu.read8(a + 7) & 128;
                e || (e = 65536);
                dbg_log("dma read dest=" + h(d) + " count=" + h(e) + " datalen=" + h(this.data_length), LOG_DISK);
                this.cpu.write_blob(c.subarray(b,
                    Math.min(b + e, this.data_length)), d);
                b += e;
                a += 8;
                if (b >= this.data_length && !f) {
                    dbg_log("leave early end=" + +f + " offset=" + h(b) + " data_length=" + h(this.data_length) + " cmd=" + h(this.current_command), LOG_DISK);
                    break
                }
            } while (!f);
            dbg_log("end offset=" + b, LOG_DISK);
            this.status = 80;
            this.device.dma_status &= -2;
            this.bytecount = this.bytecount & -8 | 3;
            this.push_irq()
        }
    };
    IDEInterface.prototype.read_data = function(a) {
        if (this.data_pointer < this.data_end) {
            dbg_assert(this.data_pointer + a - 1 < this.data_end);
            dbg_assert(0 === this.data_pointer % a, h(this.data_pointer) + " " + a);
            var b = 1 === a ? this.data[this.data_pointer] : 2 === a ? this.data16[this.data_pointer >>> 1] : this.data32[this.data_pointer >>> 2];
            this.data_pointer += a;
            0 === (this.data_pointer & (0 === (this.data_end & 4095) ? 4095 : 255)) && dbg_log("Read 1F0: " + h(this.data[this.data_pointer], 2) + " cur=" + h(this.data_pointer) + " cnt=" + h(this.data_length),
                LOG_DISK);
            this.data_pointer >= this.data_end && this.read_end();
            return b
        }
        dbg_log("Read 1F0: empty", LOG_DISK);
        this.data_pointer += a;
        return 0
    };
    IDEInterface.prototype.read_end = function() {
        dbg_log("read_end cmd=" + h(this.current_command) + " data_pointer=" + h(this.data_pointer) + " end=" + h(this.data_end) + " length=" + h(this.data_length), LOG_DISK);
        if (160 === this.current_command)
            if (this.data_end === this.data_length) this.status = 80, this.bytecount = this.bytecount & -8 | 3, this.push_irq();
            else {
                this.status = 88;
                this.bytecount = this.bytecount & -8 | 2;
                this.push_irq();
                var a = this.cylinder_high << 8 & 65280 | this.cylinder_low & 255;
                this.data_end + a > this.data_length ? (this.cylinder_low =
                    this.data_length - this.data_end & 255, this.cylinder_high = this.data_length - this.data_end >> 8 & 255, this.data_end = this.data_length) : this.data_end += a;
                dbg_log("data_end=" + h(this.data_end), LOG_DISK)
            }
        else this.error = 0, this.data_pointer >= this.data_length ? this.status = 80 : (196 === this.current_command || 41 === this.current_command ? (a = Math.min(this.sectors_per_drq, (this.data_length - this.data_end) / 512), dbg_assert(0 === a % 1)) : (dbg_assert(32 === this.current_command || 36 === this.current_command), a = 1), this.ata_advance(this.current_command,
            a), this.data_end += 512 * a, this.status = 88), this.push_irq()
    };
    IDEInterface.prototype.write_data_port = function(a, b) {
        dbg_assert(0 === this.data_pointer % b);
        this.data_pointer >= this.data_end ? dbg_log("Redundant write to data port: " + h(a) + " count=" + h(this.data_end) + " cur=" + h(this.data_pointer), LOG_DISK) : ((0 === (this.data_pointer + b & (0 === (this.data_end & 4095) ? 4095 : 255)) || 20 > this.data_end) && dbg_log("Data port: " + h(a >>> 0) + " count=" + h(this.data_end) + " cur=" + h(this.data_pointer), LOG_DISK), 1 === b ? this.data[this.data_pointer++] = a : 2 === b ? (this.data16[this.data_pointer >>> 1] = a, this.data_pointer +=
            2) : (this.data32[this.data_pointer >>> 2] = a, this.data_pointer += 4), dbg_assert(this.data_pointer <= this.data_end), this.data_pointer === this.data_end && this.write_end())
    };
    IDEInterface.prototype.write_data_port8 = function(a) {
        this.write_data_port(a, 1)
    };
    IDEInterface.prototype.write_data_port16 = function(a) {
        this.write_data_port(a, 2)
    };
    IDEInterface.prototype.write_data_port32 = function(a) {
        this.write_data_port(a, 4)
    };
    IDEInterface.prototype.write_end = function() {
        160 === this.current_command ? this.atapi_handle() : (dbg_log("write_end data_pointer=" + h(this.data_pointer) + " data_length=" + h(this.data_length), LOG_DISK), this.data_pointer >= this.data_length ? this.do_write() : (dbg_assert(48 === this.current_command || 52 === this.current_command || 197 === this.current_command, "Unexpected command: " + h(this.current_command)), this.status = 88, this.data_end += 512, this.push_irq()))
    };
    IDEInterface.prototype.ata_advance = function(a, b) {
        dbg_log("Advance sectors=" + b + " old_bytecount=" + this.bytecount, LOG_DISK);
        this.bytecount -= b;
        36 === a || 41 === a || 52 === a || 57 === a || 37 === a || 53 === a ? (a = b + this.get_lba48(), this.sector = a & 255 | a >> 16 & 65280, this.cylinder_low = a >> 8 & 255, this.cylinder_high = a >> 16 & 255) : this.is_lba ? (a = b + this.get_lba28(), this.sector = a & 255, this.cylinder_low = a >> 8 & 255, this.cylinder_high = a >> 16 & 255, this.head = this.head & -16 | a & 15) : (a = b + this.get_chs(), b = a / (this.head_count * this.sectors_per_track) | 0, this.cylinder_low =
            b & 255, this.cylinder_high = b >> 8 & 255, this.head = (a / this.sectors_per_track | 0) % this.head_count & 15, this.sector = a % this.sectors_per_track + 1 & 255, dbg_assert(a === this.get_chs()))
    };
    IDEInterface.prototype.ata_read_sectors = function(a) {
        var b = 36 === a || 41 === a,
            c = this.get_count(b);
        b = this.get_lba(b);
        var d = 32 === a || 36 === a,
            e = c * this.sector_size,
            f = b * this.sector_size;
        dbg_log("ATA read cmd=" + h(a) + " mode=" + (this.is_lba ? "lba" : "chs") + " lba=" + h(b) + " lbacount=" + h(c) + " bytecount=" + h(e), LOG_DISK);
        f + e > this.buffer.byteLength ? (dbg_assert(!1, "ATA read: Outside of disk", LOG_DISK), this.status = 255, this.push_irq()) : (this.status = 192, this.report_read_start(), this.read_buffer(f, e, g => {
            dbg_log("ata_read: Data arrived",
                LOG_DISK);
            this.data_set(g);
            this.status = 88;
            this.data_end = d ? 512 : Math.min(e, 512 * this.sectors_per_drq);
            this.ata_advance(a, d ? 1 : Math.min(c, this.sectors_per_track));
            this.push_irq();
            this.report_read_end(e)
        }))
    };
    IDEInterface.prototype.ata_read_sectors_dma = function(a) {
        var b = 37 === a;
        a = this.get_count(b);
        b = this.get_lba(b);
        var c = a * this.sector_size,
            d = b * this.sector_size;
        dbg_log("ATA DMA read lba=" + h(b) + " lbacount=" + h(a) + " bytecount=" + h(c), LOG_DISK);
        d + c > this.buffer.byteLength ? (dbg_assert(!1, "ATA read: Outside of disk", LOG_DISK), this.status = 255, this.push_irq()) : (this.status = 88, this.device.dma_status |= 1)
    };
    IDEInterface.prototype.do_ata_read_sectors_dma = function() {
        var a = 37 === this.current_command,
            b = this.get_count(a);
        a = this.get_lba(a);
        var c = b * this.sector_size,
            d = a * this.sector_size;
        dbg_assert(a < this.buffer.byteLength);
        this.report_read_start();
        var e = this.device.prdt_addr;
        this.read_buffer(d, c, f => {
            dbg_log("do_ata_read_sectors_dma: Data arrived", LOG_DISK);
            var g = this.device.prdt_addr,
                k = 0;
            dbg_assert(e === g);
            do {
                var l = this.cpu.read32s(g),
                    m = this.cpu.read16(g + 4),
                    n = this.cpu.read8(g + 7) & 128;
                m || (m = 65536, dbg_log("dma: prd count was 0",
                    LOG_DISK));
                dbg_log("dma read transfer dest=" + h(l) + " prd_count=" + h(m), LOG_DISK);
                this.cpu.write_blob(f.subarray(k, k + m), l);
                k += m;
                g += 8
            } while (!n);
            dbg_assert(k === c);
            this.ata_advance(this.current_command, b);
            this.status = 80;
            this.device.dma_status &= -2;
            this.current_command = -1;
            this.push_irq();
            this.report_read_end(c)
        })
    };
    IDEInterface.prototype.ata_write_sectors = function(a) {
        var b = 52 === a || 57 === a,
            c = this.get_count(b);
        b = this.get_lba(b);
        a = 48 === a || 52 === a;
        var d = c * this.sector_size,
            e = b * this.sector_size;
        dbg_log("ATA write lba=" + h(b) + " mode=" + (this.is_lba ? "lba" : "chs") + " lbacount=" + h(c) + " bytecount=" + h(d), LOG_DISK);
        e + d > this.buffer.byteLength ? (dbg_assert(!1, "ATA write: Outside of disk", LOG_DISK), this.status = 255, this.push_irq()) : (this.status = 88, this.data_allocate_noclear(d), this.data_end = a ? 512 : Math.min(d, 512 * this.sectors_per_drq),
            this.write_dest = e)
    };
    IDEInterface.prototype.ata_write_sectors_dma = function(a) {
        var b = 53 === a;
        a = this.get_count(b);
        b = this.get_lba(b);
        var c = a * this.sector_size,
            d = b * this.sector_size;
        dbg_log("ATA DMA write lba=" + h(b) + " lbacount=" + h(a) + " bytecount=" + h(c), LOG_DISK);
        d + c > this.buffer.byteLength ? (dbg_assert(!1, "ATA DMA write: Outside of disk", LOG_DISK), this.status = 255, this.push_irq()) : (this.status = 88, this.device.dma_status |= 1)
    };
    IDEInterface.prototype.do_ata_write_sectors_dma = function() {
        var a = 53 === this.current_command,
            b = this.get_count(a),
            c = this.get_lba(a);
        a = b * this.sector_size;
        c *= this.sector_size;
        var d = this.device.prdt_addr,
            e = 0;
        dbg_log("prdt addr: " + h(d, 8), LOG_DISK);
        const f = new Uint8Array(a);
        do {
            var g = this.cpu.read32s(d),
                k = this.cpu.read16(d + 4),
                l = this.cpu.read8(d + 7) & 128;
            k || (k = 65536, dbg_log("dma: prd count was 0", LOG_DISK));
            dbg_log("dma write transfer dest=" + h(g) + " prd_count=" + h(k), LOG_DISK);
            g = this.cpu.mem8.subarray(g, g + k);
            dbg_assert(g.length ===
                k);
            f.set(g, e);
            e += k;
            d += 8
        } while (!l);
        dbg_assert(e === f.length);
        this.buffer.set(c, f, () => {
            dbg_log("dma write completed", LOG_DISK);
            this.ata_advance(this.current_command, b);
            this.status = 80;
            this.push_irq();
            this.device.dma_status &= -2;
            this.current_command = -1
        });
        this.report_write(a)
    };
    IDEInterface.prototype.get_chs = function() {
        var a = this.cylinder_low & 255 | this.cylinder_high << 8 & 65280,
            b = this.head,
            c = this.sector & 255;
        dbg_log("get_chs: c=" + a + " h=" + b + " s=" + c, LOG_DISK);
        return (a * this.head_count + b) * this.sectors_per_track + c - 1
    };
    IDEInterface.prototype.get_lba28 = function() {
        return this.sector & 255 | this.cylinder_low << 8 & 65280 | this.cylinder_high << 16 & 16711680 | (this.head & 15) << 24
    };
    IDEInterface.prototype.get_lba48 = function() {
        return (this.sector & 255 | this.cylinder_low << 8 & 65280 | this.cylinder_high << 16 & 16711680 | this.sector >> 8 << 24 & 4278190080) >>> 0
    };
    IDEInterface.prototype.get_lba = function(a) {
        return a ? this.get_lba48() : this.is_lba ? this.get_lba28() : this.get_chs()
    };
    IDEInterface.prototype.get_count = function(a) {
        a ? (a = this.bytecount, 0 === a && (a = 65536)) : (a = this.bytecount & 255, 0 === a && (a = 256));
        return a
    };
    IDEInterface.prototype.create_identify_packet = function() {
        if (this.drive_head & 16) this.data_allocate(0);
        else {
            for (var a = 0; 512 > a; a++) this.data[a] = 0;
            a = Math.min(16383, this.cylinder_count);
            this.data_set([64, this.is_atapi ? 133 : 0, a, a >> 8, 0, 0, this.head_count, this.head_count >> 8, this.sectors_per_track / 512, this.sectors_per_track / 512 >> 8, 0, 2, this.sectors_per_track, this.sectors_per_track >> 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 118, 32, 54, 68, 72, 32, 32, 32, 32, 32, 32, 32, 32, 32,
                32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 128, 0, 1, 0, 0, 2, 0, 0, 0, 2, 0, 2, 7, 0, a, a >> 8, this.head_count, this.head_count >> 8, this.sectors_per_track, 0, this.sector_count & 255, this.sector_count >> 8 & 255, this.sector_count >> 16 & 255, this.sector_count >> 24 & 255, 0, 0, this.sector_count & 255, this.sector_count >> 8 & 255, this.sector_count >> 16 & 255, this.sector_count >> 24 & 255, 0, 0, 160 === this.current_command ? 0 : 7, 160 === this.current_command ? 0 : 4, 0, 0, 30, 0, 30, 0, 30, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 126, 0, 0, 0, 0, 0, 0, 116, 0, 64, 0, 64, 0, 116, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.sector_count & 255, this.sector_count >> 8 & 255, this.sector_count >> 16 & 255, this.sector_count >> 24 & 255
            ]);
            this.data_end = this.data_length = 512
        }
    };
    IDEInterface.prototype.data_allocate = function(a) {
        this.data_allocate_noclear(a);
        for (var b = 0; b < a + 3 >> 2; b++) this.data32[b] = 0
    };
    IDEInterface.prototype.data_allocate_noclear = function(a) {
        this.data.length < a && (this.data = new Uint8Array(a + 3 & -4), this.data16 = new Uint16Array(this.data.buffer), this.data32 = new Int32Array(this.data.buffer));
        this.data_length = a;
        this.data_pointer = 0
    };
    IDEInterface.prototype.data_set = function(a) {
        this.data_allocate_noclear(a.length);
        this.data.set(a)
    };
    IDEInterface.prototype.report_read_start = function() {
        this.stats.loading = !0;
        this.bus.send("ide-read-start")
    };
    IDEInterface.prototype.report_read_end = function(a) {
        this.stats.loading = !1;
        var b = a / this.sector_size | 0;
        this.stats.sectors_read += b;
        this.stats.bytes_read += a;
        this.bus.send("ide-read-end", [this.nr, a, b])
    };
    IDEInterface.prototype.report_write = function(a) {
        var b = a / this.sector_size | 0;
        this.stats.sectors_written += b;
        this.stats.bytes_written += a;
        this.bus.send("ide-write-end", [this.nr, a, b])
    };
    IDEInterface.prototype.read_buffer = function(a, b, c) {
        const d = this.last_io_id++;
        this.in_progress_io_ids.add(d);
        this.buffer.get(a, b, e => {
            if (this.cancelled_io_ids.delete(d)) dbg_assert(!this.in_progress_io_ids.has(d));
            else {
                var f = this.in_progress_io_ids.delete(d);
                dbg_assert(f);
                c(e)
            }
        })
    };
    IDEInterface.prototype.cancel_io_operations = function() {
        for (const a of this.in_progress_io_ids) this.cancelled_io_ids.add(a);
        this.in_progress_io_ids.clear()
    };
    IDEInterface.prototype.get_state = function() {
        var a = [];
        a[0] = this.bytecount;
        a[1] = this.cylinder_count;
        a[2] = this.cylinder_high;
        a[3] = this.cylinder_low;
        a[4] = this.data_pointer;
        a[5] = 0;
        a[6] = 0;
        a[7] = 0;
        a[8] = 0;
        a[9] = this.drive_head;
        a[10] = this.error;
        a[11] = this.head;
        a[12] = this.head_count;
        a[13] = this.is_atapi;
        a[14] = this.is_lba;
        a[15] = this.lba_count;
        a[16] = this.data;
        a[17] = this.data_length;
        a[18] = this.sector;
        a[19] = this.sector_count;
        a[20] = this.sector_size;
        a[21] = this.sectors_per_drq;
        a[22] = this.sectors_per_track;
        a[23] = this.status;
        a[24] = this.write_dest;
        a[25] = this.current_command;
        a[26] = this.data_end;
        a[27] = this.current_atapi_command;
        a[28] = this.buffer;
        return a
    };
    IDEInterface.prototype.set_state = function(a) {
        this.bytecount = a[0];
        this.cylinder_count = a[1];
        this.cylinder_high = a[2];
        this.cylinder_low = a[3];
        this.data_pointer = a[4];
        this.drive_head = a[9];
        this.error = a[10];
        this.head = a[11];
        this.head_count = a[12];
        this.is_atapi = a[13];
        this.is_lba = a[14];
        this.lba_count = a[15];
        this.data = a[16];
        this.data_length = a[17];
        this.sector = a[18];
        this.sector_count = a[19];
        this.sector_size = a[20];
        this.sectors_per_drq = a[21];
        this.sectors_per_track = a[22];
        this.status = a[23];
        this.write_dest = a[24];
        this.current_command =
            a[25];
        this.data_end = a[26];
        this.current_atapi_command = a[27];
        this.data16 = new Uint16Array(this.data.buffer);
        this.data32 = new Int32Array(this.data.buffer);
        this.buffer && this.buffer.set_state(a[28])
    };
    var PCI_CONFIG_ADDRESS = 3320,
        PCI_CONFIG_DATA = 3324;

    function PCI(a) {
        this.pci_addr = new Uint8Array(4);
        this.pci_value = new Uint8Array(4);
        this.pci_response = new Uint8Array(4);
        this.pci_status = new Uint8Array(4);
        this.pci_addr32 = new Int32Array(this.pci_addr.buffer);
        this.pci_value32 = new Int32Array(this.pci_value.buffer);
        this.pci_response32 = new Int32Array(this.pci_response.buffer);
        this.pci_status32 = new Int32Array(this.pci_status.buffer);
        this.device_spaces = [];
        this.devices = [];
        this.cpu = a;
        for (var b = 0; 256 > b; b++) this.device_spaces[b] = void 0, this.devices[b] = void 0;
        this.io =
            a.io;
        a.io.register_write(PCI_CONFIG_DATA, this, function(c) {
            this.pci_write8(this.pci_addr32[0], c)
        }, function(c) {
            this.pci_write16(this.pci_addr32[0], c)
        }, function(c) {
            this.pci_write32(this.pci_addr32[0], c)
        });
        a.io.register_write(PCI_CONFIG_DATA + 1, this, function(c) {
            this.pci_write8(this.pci_addr32[0] + 1 | 0, c)
        });
        a.io.register_write(PCI_CONFIG_DATA + 2, this, function(c) {
            this.pci_write8(this.pci_addr32[0] + 2 | 0, c)
        }, function(c) {
            this.pci_write16(this.pci_addr32[0] + 2 | 0, c)
        });
        a.io.register_write(PCI_CONFIG_DATA + 3, this, function(c) {
            this.pci_write8(this.pci_addr32[0] +
                3 | 0, c)
        });
        a.io.register_read_consecutive(PCI_CONFIG_DATA, this, function() {
            return this.pci_response[0]
        }, function() {
            return this.pci_response[1]
        }, function() {
            return this.pci_response[2]
        }, function() {
            return this.pci_response[3]
        });
        a.io.register_read_consecutive(PCI_CONFIG_ADDRESS, this, function() {
            return this.pci_status[0]
        }, function() {
            return this.pci_status[1]
        }, function() {
            return this.pci_status[2]
        }, function() {
            return this.pci_status[3]
        });
        a.io.register_write_consecutive(PCI_CONFIG_ADDRESS, this, function(c) {
            this.pci_addr[0] =
                c & 252
        }, function(c) {
            2 === (this.pci_addr[1] & 6) && 6 === (c & 6) ? (dbg_log("CPU reboot via PCI"), a.reboot_internal()) : this.pci_addr[1] = c
        }, function(c) {
            this.pci_addr[2] = c
        }, function(c) {
            this.pci_addr[3] = c;
            this.pci_query()
        });
        this.register_device({
            pci_id: 0,
            pci_space: [134, 128, 55, 18, 0, 0, 0, 0, 2, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0],
            pci_bars: [],
            name: "82441FX PMC"
        });
        this.isa_bridge = {
            pci_id: 8,
            pci_space: [134, 128, 0, 112, 7, 0, 0, 2, 0, 0, 1, 6, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            pci_bars: [],
            name: "82371SB PIIX3 ISA"
        };
        this.isa_bridge_space = this.register_device(this.isa_bridge);
        this.isa_bridge_space8 = new Uint8Array(this.isa_bridge_space.buffer)
    }
    PCI.prototype.get_state = function() {
        for (var a = [], b = 0; 256 > b; b++) a[b] = this.device_spaces[b];
        a[256] = this.pci_addr;
        a[257] = this.pci_value;
        a[258] = this.pci_response;
        a[259] = this.pci_status;
        return a
    };
    PCI.prototype.set_state = function(a) {
        for (var b = 0; 256 > b; b++) {
            var c = this.devices[b],
                d = a[b];
            if (c && d) {
                for (var e = 0; e < c.pci_bars.length; e++) {
                    var f = d[4 + e];
                    if (f & 1) {
                        var g = c.pci_bars[e];
                        this.set_io_bars(g, g.original_bar & 65534, f & 65534)
                    }
                }
                this.device_spaces[b].set(d)
            } else c && dbg_log("Warning: While restoring PCI device: Device exists in current configuration but not in snapshot (" + c.name + ")"), d && dbg_log("Warning: While restoring PCI device: Device doesn't exist in current configuration but does in snapshot (device " +
                h(b, 2) + ")")
        }
        this.pci_addr.set(a[256]);
        this.pci_value.set(a[257]);
        this.pci_response.set(a[258]);
        this.pci_status.set(a[259])
    };
    PCI.prototype.pci_query = function() {
        var a = this.pci_addr[2] << 8 | this.pci_addr[1],
            b = this.pci_addr[0] & 252,
            c = a >> 3 & 31;
        var d = "query enabled=" + (this.pci_addr[3] >> 7) + (" bdf=" + h(a, 4));
        d += " dev=" + h(c, 2);
        d += " addr=" + h(b, 2);
        c = this.device_spaces[a];
        void 0 !== c ? (this.pci_status32[0] = -2147483648, this.pci_response32[0] = b < c.byteLength ? c[b >> 2] : 0, d += " " + h(this.pci_addr32[0] >>> 0, 8) + " -> " + h(this.pci_response32[0] >>> 0, 8), b >= c.byteLength && (d += " (undef)"), d += " (" + this.devices[a].name + ")", dbg_log(d, LOG_PCI)) : (this.pci_response32[0] = -1, this.pci_status32[0] = 0)
    };
    PCI.prototype.pci_write8 = function(a, b) {
        var c = a >> 8 & 65535;
        a &= 255;
        var d = new Uint8Array(this.device_spaces[c].buffer),
            e = this.devices[c];
        d && (dbg_assert(!(16 <= a && 44 > a || 48 <= a && 52 > a), "PCI: Expected 32-bit write, got 8-bit (addr: " + h(a) + ")"), dbg_log("PCI write8 dev=" + h(c >> 3, 2) + " (" + e.name + ") addr=" + h(a, 4) + " value=" + h(b, 2), LOG_PCI), d[a] = b)
    };
    PCI.prototype.pci_write16 = function(a, b) {
        dbg_assert(0 === (a & 1));
        var c = a >> 8 & 65535;
        a &= 255;
        var d = new Uint16Array(this.device_spaces[c].buffer),
            e = this.devices[c];
        d && (16 <= a && 44 > a ? dbg_log("Warning: PCI: Expected 32-bit write, got 16-bit (addr: " + h(a) + ")") : (dbg_assert(!(48 <= a && 52 > a), "PCI: Expected 32-bit write, got 16-bit (addr: " + h(a) + ")"), dbg_log("PCI writ16 dev=" + h(c >> 3, 2) + " (" + e.name + ") addr=" + h(a, 4) + " value=" + h(b, 4), LOG_PCI), d[a >>> 1] = b))
    };
    PCI.prototype.pci_write32 = function(a, b) {
        dbg_assert(0 === (a & 3));
        var c = a >> 8 & 65535;
        a &= 255;
        var d = this.device_spaces[c],
            e = this.devices[c];
        if (d)
            if (16 <= a && 40 > a) {
                var f = a - 16 >> 2,
                    g = e.pci_bars[f];
                dbg_log("BAR" + f + " exists=" + (g ? "y" : "n") + " changed to " + h(b >>> 0) + " dev=" + h(c >> 3, 2) + " (" + e.name + ") ", LOG_PCI);
                g ? (dbg_assert(!(g.size & g.size - 1), "bar size should be power of 2"), c = a >> 2, e = d[c] & 1, -1 === (b | 3 | g.size - 1) ? (b = ~(g.size - 1) | e, 0 === e && (d[c] = b)) : 0 === e && (f = g.original_bar, (b & -16) !== (f & -16) && dbg_log("Warning: Changing memory bar not supported, ignored",
                    LOG_PCI), d[c] = f), 1 === e && (dbg_assert(1 === e), e = d[c] & 65534, f = b & 65534, dbg_log("io bar changed from " + h(e >>> 0, 8) + " to " + h(f >>> 0, 8) + " size=" + g.size, LOG_PCI), this.set_io_bars(g, e, f), d[c] = b | 1)) : d[a >> 2] = 0;
                dbg_log("BAR effective value: " + h(d[a >> 2] >>> 0), LOG_PCI)
            } else 48 === a ? (dbg_log("PCI write rom address dev=" + h(c >> 3, 2) + " (" + e.name + ") value=" + h(b >>> 0, 8), LOG_PCI), d[a >> 2] = e.pci_rom_size ? -1 === (b | 2047) ? -e.pci_rom_size | 0 : e.pci_rom_address | 0 : 0) : 4 === a ? dbg_log("PCI write dev=" + h(c >> 3, 2) + " (" + e.name + ") addr=" + h(a, 4) +
                " value=" + h(b >>> 0, 8), LOG_PCI) : (dbg_log("PCI write dev=" + h(c >> 3, 2) + " (" + e.name + ") addr=" + h(a, 4) + " value=" + h(b >>> 0, 8), LOG_PCI), d[a >>> 2] = b)
    };
    PCI.prototype.register_device = function(a) {
        dbg_assert(void 0 !== a.pci_id);
        dbg_assert(void 0 !== a.pci_space);
        dbg_assert(void 0 !== a.pci_bars);
        var b = a.pci_id;
        dbg_log("PCI register bdf=" + h(b) + " (" + a.name + ")", LOG_PCI);
        dbg_assert(!this.devices[b]);
        dbg_assert(64 <= a.pci_space.length);
        dbg_assert(b < this.devices.length);
        var c = new Int32Array(64);
        c.set(new Int32Array((new Uint8Array(a.pci_space)).buffer));
        this.device_spaces[b] = c;
        this.devices[b] = a;
        b = c.slice(4, 10);
        for (var d = 0; d < a.pci_bars.length; d++) {
            var e = a.pci_bars[d];
            if (e) {
                var f = b[d],
                    g = f & 1;
                e.original_bar = f;
                e.entries = [];
                if (0 !== g)
                    for (dbg_assert(1 === g), f &= -2, g = 0; g < e.size; g++) e.entries[g] = this.io.ports[f + g]
            }
        }
        return c
    };
    PCI.prototype.set_io_bars = function(a, b, c) {
        var d = a.size;
        dbg_log("Move io bars: from=" + h(b) + " to=" + h(c) + " count=" + d, LOG_PCI);
        for (var e = this.io.ports, f = 0; f < d; f++) {
            var g = e[b + f];
            4096 <= b + f && (e[b + f] = this.io.create_empty_entry());
            g.read8 === this.io.empty_port_read8 && g.read16 === this.io.empty_port_read16 && g.read32 === this.io.empty_port_read32 && g.write8 === this.io.empty_port_write && g.write16 === this.io.empty_port_write && g.write32 === this.io.empty_port_write && dbg_log("Warning: Bad IO bar: Source not mapped, port=" +
                h(b + f, 4), LOG_PCI);
            g = a.entries[f];
            var k = e[c + f];
            dbg_assert(g && k);
            4096 <= c + f && (e[c + f] = g);
            k.read8 !== this.io.empty_port_read8 && k.read16 !== this.io.empty_port_read16 && k.read32 !== this.io.empty_port_read32 && k.write8 !== this.io.empty_port_write && k.write16 !== this.io.empty_port_write && k.write32 !== this.io.empty_port_write || dbg_log("Warning: Bad IO bar: Target already mapped, port=" + h(c + f, 4), LOG_PCI)
        }
    };
    PCI.prototype.raise_irq = function(a) {
        var b = this.device_spaces[a];
        dbg_assert(b);
        this.cpu.device_raise_irq(this.isa_bridge_space8[96 + ((b[15] >> 8 & 255) - 1 + ((a >> 3) - 1 & 255) & 3)])
    };
    PCI.prototype.lower_irq = function(a) {
        var b = this.device_spaces[a];
        dbg_assert(b);
        this.cpu.device_lower_irq(this.isa_bridge_space8[96 + ((b[15] >> 8 & 255) + (a >> 3 & 255) - 2 & 3)])
    };

    function FloppyController(a, b, c) {
        this.io = a.io;
        this.cpu = a;
        this.dma = a.devices.dma;
        this.bytes_expecting = 0;
        this.receiving_command = new Uint8Array(10);
        this.receiving_index = 0;
        this.next_command = null;
        this.response_data = new Uint8Array(10);
        this.response_length = this.response_index = 0;
        this.fda_image = b;
        this.fdb_image = c;
        this.last_head = this.last_cylinder = this.drive = this.status_reg2 = this.status_reg1 = this.status_reg0 = 0;
        this.last_sector = 1;
        this.dor = 0;
        if (b) {
            var d = {
                [163840]: {
                    type: 1,
                    tracks: 40,
                    sectors: 8,
                    heads: 1
                },
                [184320]: {
                    type: 1,
                    tracks: 40,
                    sectors: 9,
                    heads: 1
                },
                [204800]: {
                    type: 1,
                    tracks: 40,
                    sectors: 10,
                    heads: 1
                },
                [327680]: {
                    type: 1,
                    tracks: 40,
                    sectors: 8,
                    heads: 2
                },
                [368640]: {
                    type: 1,
                    tracks: 40,
                    sectors: 9,
                    heads: 2
                },
                [409600]: {
                    type: 1,
                    tracks: 40,
                    sectors: 10,
                    heads: 2
                },
                [737280]: {
                    type: 3,
                    tracks: 80,
                    sectors: 9,
                    heads: 2
                },
                [1228800]: {
                    type: 2,
                    tracks: 80,
                    sectors: 15,
                    heads: 2
                },
                [1474560]: {
                    type: 4,
                    tracks: 80,
                    sectors: 18,
                    heads: 2
                },
                [1763328]: {
                    type: 5,
                    tracks: 82,
                    sectors: 21,
                    heads: 2
                },
                [2949120]: {
                    type: 5,
                    tracks: 80,
                    sectors: 36,
                    heads: 2
                },
                512: {
                    type: 1,
                    tracks: 1,
                    sectors: 1,
                    heads: 1
                }
            };
            let e = b.byteLength;
            c = d[e];
            c || (e = 1474560 < b.byteLength ? 2949120 : 1474560, c = d[e], dbg_log("Warning: Unkown floppy size: " + b.byteLength + ", assuming " + e));
            a.devices.rtc.cmos_write(CMOS_FLOPPY_DRIVE_TYPE, c.type << 4);
            a = c.sectors;
            b = c.heads;
            c = c.tracks;
            this.sectors_per_track = a;
            this.number_of_heads = b;
            this.number_of_cylinders = c
        } else a.devices.rtc.cmos_write(CMOS_FLOPPY_DRIVE_TYPE, 64), this.number_of_cylinders = this.number_of_heads = this.sectors_per_track = 0;
        this.io.register_read(1008, this, this.port3F0_read);
        this.io.register_read(1010,
            this, this.port3F2_read);
        this.io.register_read(1012, this, this.port3F4_read);
        this.io.register_read(1013, this, this.port3F5_read);
        this.io.register_read(1015, this, this.port3F7_read);
        this.io.register_write(1010, this, this.port3F2_write);
        this.io.register_write(1013, this, this.port3F5_write)
    }
    FloppyController.prototype.get_state = function() {
        var a = [];
        a[0] = this.bytes_expecting;
        a[1] = this.receiving_command;
        a[2] = this.receiving_index;
        a[4] = this.response_data;
        a[5] = this.response_index;
        a[6] = this.response_length;
        a[8] = this.status_reg0;
        a[9] = this.status_reg1;
        a[10] = this.status_reg2;
        a[11] = this.drive;
        a[12] = this.last_cylinder;
        a[13] = this.last_head;
        a[14] = this.last_sector;
        a[15] = this.dor;
        a[16] = this.sectors_per_track;
        a[17] = this.number_of_heads;
        a[18] = this.number_of_cylinders;
        return a
    };
    FloppyController.prototype.set_state = function(a) {
        this.bytes_expecting = a[0];
        this.receiving_command = a[1];
        this.receiving_index = a[2];
        this.next_command = a[3];
        this.response_data = a[4];
        this.response_index = a[5];
        this.response_length = a[6];
        this.status_reg0 = a[8];
        this.status_reg1 = a[9];
        this.status_reg2 = a[10];
        this.drive = a[11];
        this.last_cylinder = a[12];
        this.last_head = a[13];
        this.last_sector = a[14];
        this.dor = a[15];
        this.sectors_per_track = a[16];
        this.number_of_heads = a[17];
        this.number_of_cylinders = a[18]
    };
    FloppyController.prototype.port3F0_read = function() {
        dbg_log("3F0 read", LOG_FLOPPY);
        return 0
    };
    FloppyController.prototype.port3F4_read = function() {
        dbg_log("3F4 read", LOG_FLOPPY);
        var a = 128;
        this.response_index < this.response_length && (a |= 80);
        0 === (this.dor & 8) && (a |= 32);
        return a
    };
    FloppyController.prototype.port3F7_read = function() {
        dbg_log("3F7 read", LOG_FLOPPY);
        return 0
    };
    FloppyController.prototype.port3F5_read = function() {
        if (this.response_index < this.response_length) return dbg_log("3F5 read: " + this.response_data[this.response_index], LOG_FLOPPY), this.cpu.device_lower_irq(6), this.response_data[this.response_index++];
        dbg_log("3F5 read, empty", LOG_FLOPPY);
        return 255
    };
    FloppyController.prototype.port3F5_write = function(a) {
        if (this.fda_image)
            if (dbg_log("3F5 write " + h(a), LOG_FLOPPY), 0 < this.bytes_expecting) {
                if (this.receiving_command[this.receiving_index++] = a, this.bytes_expecting--, 0 === this.bytes_expecting) {
                    if (DEBUG) {
                        a = "3F5 command received: ";
                        for (var b = 0; b < this.receiving_index; b++) a += h(this.receiving_command[b]) + " ";
                        dbg_log(a, LOG_FLOPPY)
                    }
                    this.next_command.call(this, this.receiving_command)
                }
            } else {
                switch (a) {
                    case 3:
                        this.next_command = this.fix_drive_data;
                        this.bytes_expecting =
                            2;
                        break;
                    case 4:
                        this.next_command = this.check_drive_status;
                        this.bytes_expecting = 1;
                        break;
                    case 5:
                    case 69:
                    case 197:
                        this.next_command = function(c) {
                            this.do_sector(!0, c)
                        };
                        this.bytes_expecting = 8;
                        break;
                    case 230:
                        this.next_command = function(c) {
                            this.do_sector(!1, c)
                        };
                        this.bytes_expecting = 8;
                        break;
                    case 7:
                        this.next_command = this.calibrate;
                        this.bytes_expecting = 1;
                        break;
                    case 8:
                        this.check_interrupt_status();
                        break;
                    case 74:
                        this.next_command = this.read_sector_id;
                        this.bytes_expecting = 1;
                        break;
                    case 15:
                        this.bytes_expecting = 2;
                        this.next_command =
                            this.seek;
                        break;
                    case 14:
                        dbg_log("dump registers", LOG_FLOPPY);
                        this.response_data[0] = 128;
                        this.response_index = 0;
                        this.response_length = 1;
                        this.bytes_expecting = 0;
                        break;
                    default:
                        dbg_assert(!1, "Unimplemented floppy command call " + h(a))
                }
                this.receiving_index = 0
            }
    };
    FloppyController.prototype.port3F2_read = function() {
        dbg_log("read 3F2: DOR", LOG_FLOPPY);
        return this.dor
    };
    FloppyController.prototype.port3F2_write = function(a) {
        4 === (a & 4) && 0 === (this.dor & 4) && this.cpu.device_raise_irq(6);
        dbg_log("start motors: " + h(a >> 4), LOG_FLOPPY);
        dbg_log("enable dma: " + !!(a & 8), LOG_FLOPPY);
        dbg_log("reset fdc: " + !!(a & 4), LOG_FLOPPY);
        dbg_log("drive select: " + (a & 3), LOG_FLOPPY);
        dbg_log("DOR = " + h(a), LOG_FLOPPY);
        this.dor = a
    };
    FloppyController.prototype.check_drive_status = function(a) {
        dbg_log("check drive status", LOG_FLOPPY);
        this.response_index = 0;
        this.response_length = 1;
        this.response_data[0] = 32
    };
    FloppyController.prototype.seek = function(a) {
        dbg_log("seek", LOG_FLOPPY);
        dbg_assert(0 === (a[0] & 3), "Unhandled seek drive");
        this.last_cylinder = a[1];
        this.last_head = a[0] >> 2 & 1;
        this.raise_irq()
    };
    FloppyController.prototype.calibrate = function(a) {
        dbg_log("floppy calibrate", LOG_FLOPPY);
        this.raise_irq()
    };
    FloppyController.prototype.check_interrupt_status = function() {
        dbg_log("floppy check interrupt status", LOG_FLOPPY);
        this.response_index = 0;
        this.response_length = 2;
        this.response_data[0] = 32;
        this.response_data[1] = this.last_cylinder
    };
    FloppyController.prototype.do_sector = function(a, b) {
        var c = b[2],
            d = b[1],
            e = b[3],
            f = 128 << b[4],
            g = b[5] - b[3] + 1,
            k = ((c + this.number_of_heads * d) * this.sectors_per_track + e - 1) * f;
        dbg_log("Floppy " + (a ? "Write" : "Read"), LOG_FLOPPY);
        dbg_log("from " + h(k) + " length " + h(g * f), LOG_FLOPPY);
        dbg_log(d + " / " + c + " / " + e, LOG_FLOPPY);
        b[4] || dbg_log("FDC: sector count is zero, use data length instead", LOG_FLOPPY);
        this.fda_image && (a ? this.dma.do_write(this.fda_image, k, g * f, 2, this.done.bind(this, b, d, c, e)) : this.dma.do_read(this.fda_image,
            k, g * f, 2, this.done.bind(this, b, d, c, e)))
    };
    FloppyController.prototype.done = function(a, b, c, d, e) {
        e || (d++, d > this.sectors_per_track && (d = 1, c++, c >= this.number_of_heads && (c = 0, b++)), this.last_cylinder = b, this.last_head = c, this.last_sector = d, this.response_index = 0, this.response_length = 7, this.response_data[0] = c << 2 | 32, this.response_data[1] = 0, this.response_data[2] = 0, this.response_data[3] = b, this.response_data[4] = c, this.response_data[5] = d, this.response_data[6] = a[4], this.raise_irq())
    };
    FloppyController.prototype.fix_drive_data = function(a) {
        dbg_log("floppy fix drive data " + a, LOG_FLOPPY)
    };
    FloppyController.prototype.read_sector_id = function(a) {
        dbg_log("floppy read sector id " + a, LOG_FLOPPY);
        this.response_index = 0;
        this.response_length = 7;
        this.response_data[0] = 0;
        this.response_data[1] = 0;
        this.response_data[2] = 0;
        this.response_data[3] = 0;
        this.response_data[4] = 0;
        this.response_data[5] = 0;
        this.response_data[6] = 0;
        this.raise_irq()
    };
    FloppyController.prototype.raise_irq = function() {
        this.dor & 8 && this.cpu.device_raise_irq(6)
    };
    CPU.prototype.mmap_read8 = function(a) {
        a = this.memory_map_read8[a >>> MMAP_BLOCK_BITS](a);
        dbg_assert(0 <= a && 255 >= a);
        return a
    };
    CPU.prototype.mmap_write8 = function(a, b) {
        dbg_assert(0 <= b && 255 >= b);
        this.memory_map_write8[a >>> MMAP_BLOCK_BITS](a, b)
    };
    CPU.prototype.mmap_read16 = function(a) {
        var b = this.memory_map_read8[a >>> MMAP_BLOCK_BITS];
        a = b(a) | b(a + 1 | 0) << 8;
        dbg_assert(0 <= a && 65535 >= a);
        return a
    };
    CPU.prototype.mmap_write16 = function(a, b) {
        var c = this.memory_map_write8[a >>> MMAP_BLOCK_BITS];
        dbg_assert(0 <= b && 65535 >= b);
        c(a, b & 255);
        c(a + 1 | 0, b >> 8)
    };
    CPU.prototype.mmap_read32 = function(a) {
        return this.memory_map_read32[a >>> MMAP_BLOCK_BITS](a)
    };
    CPU.prototype.mmap_write32 = function(a, b) {
        this.memory_map_write32[a >>> MMAP_BLOCK_BITS](a, b)
    };
    CPU.prototype.mmap_write64 = function(a, b, c) {
        var d = a >>> MMAP_BLOCK_BITS;
        dbg_assert(d === a + 7 >>> MMAP_BLOCK_BITS);
        d = this.memory_map_write32[d];
        d(a, b);
        d(a + 4, c)
    };
    CPU.prototype.mmap_write128 = function(a, b, c, d, e) {
        var f = a >>> MMAP_BLOCK_BITS;
        dbg_assert(f === a + 12 >>> MMAP_BLOCK_BITS);
        f = this.memory_map_write32[f];
        f(a, b);
        f(a + 4, c);
        f(a + 8, d);
        f(a + 12, e)
    };
    CPU.prototype.write_blob = function(a, b) {
        dbg_assert(a && 0 <= a.length);
        a.length && (dbg_assert(!this.in_mapped_range(b)), dbg_assert(!this.in_mapped_range(b + a.length - 1)), this.jit_dirty_cache(b, b + a.length), this.mem8.set(a, b))
    };
    CPU.prototype.read_blob = function(a, b) {
        b && (dbg_assert(!this.in_mapped_range(a)), dbg_assert(!this.in_mapped_range(a + b - 1)));
        return this.mem8.subarray(a, a + b)
    };

    function DMA(a) {
        this.cpu = a;
        this.channel_page = new Uint8Array(8);
        this.channel_pagehi = new Uint8Array(8);
        this.channel_addr = new Uint16Array(8);
        this.channel_addr_init = new Uint16Array(8);
        this.channel_count = new Uint16Array(8);
        this.channel_count_init = new Uint16Array(8);
        this.channel_mask = new Uint8Array(8);
        this.channel_mode = new Uint8Array(8);
        this.unmask_listeners = [];
        this.lsb_msb_flipflop = 0;
        a = a.io;
        a.register_write(0, this, this.port_addr_write.bind(this, 0));
        a.register_write(2, this, this.port_addr_write.bind(this,
            1));
        a.register_write(4, this, this.port_addr_write.bind(this, 2));
        a.register_write(6, this, this.port_addr_write.bind(this, 3));
        a.register_write(1, this, this.port_count_write.bind(this, 0));
        a.register_write(3, this, this.port_count_write.bind(this, 1));
        a.register_write(5, this, this.port_count_write.bind(this, 2));
        a.register_write(7, this, this.port_count_write.bind(this, 3));
        a.register_read(0, this, this.port_addr_read.bind(this, 0));
        a.register_read(2, this, this.port_addr_read.bind(this, 1));
        a.register_read(4, this, this.port_addr_read.bind(this,
            2));
        a.register_read(6, this, this.port_addr_read.bind(this, 3));
        a.register_read(1, this, this.port_count_read.bind(this, 0));
        a.register_read(3, this, this.port_count_read.bind(this, 1));
        a.register_read(5, this, this.port_count_read.bind(this, 2));
        a.register_read(7, this, this.port_count_read.bind(this, 3));
        a.register_write(192, this, this.port_addr_write.bind(this, 4));
        a.register_write(196, this, this.port_addr_write.bind(this, 5));
        a.register_write(200, this, this.port_addr_write.bind(this, 6));
        a.register_write(204, this,
            this.port_addr_write.bind(this, 7));
        a.register_write(194, this, this.port_count_write.bind(this, 4));
        a.register_write(198, this, this.port_count_write.bind(this, 5));
        a.register_write(202, this, this.port_count_write.bind(this, 6));
        a.register_write(206, this, this.port_count_write.bind(this, 7));
        a.register_read(192, this, this.port_addr_read.bind(this, 4));
        a.register_read(196, this, this.port_addr_read.bind(this, 5));
        a.register_read(200, this, this.port_addr_read.bind(this, 6));
        a.register_read(204, this, this.port_addr_read.bind(this,
            7));
        a.register_read(194, this, this.port_count_read.bind(this, 4));
        a.register_read(198, this, this.port_count_read.bind(this, 5));
        a.register_read(202, this, this.port_count_read.bind(this, 6));
        a.register_read(206, this, this.port_count_read.bind(this, 7));
        a.register_write(135, this, this.port_page_write.bind(this, 0));
        a.register_write(131, this, this.port_page_write.bind(this, 1));
        a.register_write(129, this, this.port_page_write.bind(this, 2));
        a.register_write(130, this, this.port_page_write.bind(this, 3));
        a.register_write(143,
            this, this.port_page_write.bind(this, 4));
        a.register_write(139, this, this.port_page_write.bind(this, 5));
        a.register_write(137, this, this.port_page_write.bind(this, 6));
        a.register_write(138, this, this.port_page_write.bind(this, 7));
        a.register_read(135, this, this.port_page_read.bind(this, 0));
        a.register_read(131, this, this.port_page_read.bind(this, 1));
        a.register_read(129, this, this.port_page_read.bind(this, 2));
        a.register_read(130, this, this.port_page_read.bind(this, 3));
        a.register_read(143, this, this.port_page_read.bind(this,
            4));
        a.register_read(139, this, this.port_page_read.bind(this, 5));
        a.register_read(137, this, this.port_page_read.bind(this, 6));
        a.register_read(138, this, this.port_page_read.bind(this, 7));
        a.register_write(1159, this, this.port_pagehi_write.bind(this, 0));
        a.register_write(1155, this, this.port_pagehi_write.bind(this, 1));
        a.register_write(1153, this, this.port_pagehi_write.bind(this, 2));
        a.register_write(1154, this, this.port_pagehi_write.bind(this, 3));
        a.register_write(1163, this, this.port_pagehi_write.bind(this, 5));
        a.register_write(1161, this, this.port_pagehi_write.bind(this, 6));
        a.register_write(1162, this, this.port_pagehi_write.bind(this, 7));
        a.register_read(1159, this, this.port_pagehi_read.bind(this, 0));
        a.register_read(1155, this, this.port_pagehi_read.bind(this, 1));
        a.register_read(1153, this, this.port_pagehi_read.bind(this, 2));
        a.register_read(1154, this, this.port_pagehi_read.bind(this, 3));
        a.register_read(1163, this, this.port_pagehi_read.bind(this, 5));
        a.register_read(1161, this, this.port_pagehi_read.bind(this, 6));
        a.register_read(1162,
            this, this.port_pagehi_read.bind(this, 7));
        a.register_write(10, this, this.port_singlemask_write.bind(this, 0));
        a.register_write(212, this, this.port_singlemask_write.bind(this, 4));
        a.register_write(15, this, this.port_multimask_write.bind(this, 0));
        a.register_write(222, this, this.port_multimask_write.bind(this, 4));
        a.register_read(15, this, this.port_multimask_read.bind(this, 0));
        a.register_read(222, this, this.port_multimask_read.bind(this, 4));
        a.register_write(11, this, this.port_mode_write.bind(this, 0));
        a.register_write(214,
            this, this.port_mode_write.bind(this, 4));
        a.register_write(12, this, this.portC_write);
        a.register_write(216, this, this.portC_write)
    }
    DMA.prototype.get_state = function() {
        return [this.channel_page, this.channel_pagehi, this.channel_addr, this.channel_addr_init, this.channel_count, this.channel_count_init, this.channel_mask, this.channel_mode, this.lsb_msb_flipflop]
    };
    DMA.prototype.set_state = function(a) {
        this.channel_page = a[0];
        this.channel_pagehi = a[1];
        this.channel_addr = a[2];
        this.channel_addr_init = a[3];
        this.channel_count = a[4];
        this.channel_count_init = a[5];
        this.channel_mask = a[6];
        this.channel_mode = a[7];
        this.lsb_msb_flipflop = a[8]
    };
    DMA.prototype.port_count_write = function(a, b) {
        dbg_log("count write [" + a + "] = " + h(b), LOG_DMA);
        this.channel_count[a] = this.flipflop_get(this.channel_count[a], b, !1);
        this.channel_count_init[a] = this.flipflop_get(this.channel_count_init[a], b, !0)
    };
    DMA.prototype.port_count_read = function(a) {
        dbg_log("count read [" + a + "] -> " + h(this.channel_count[a]), LOG_DMA);
        return this.flipflop_read(this.channel_count[a])
    };
    DMA.prototype.port_addr_write = function(a, b) {
        dbg_log("addr write [" + a + "] = " + h(b), LOG_DMA);
        this.channel_addr[a] = this.flipflop_get(this.channel_addr[a], b, !1);
        this.channel_addr_init[a] = this.flipflop_get(this.channel_addr_init[a], b, !0)
    };
    DMA.prototype.port_addr_read = function(a) {
        dbg_log("addr read [" + a + "] -> " + h(this.channel_addr[a]), LOG_DMA);
        return this.flipflop_read(this.channel_addr[a])
    };
    DMA.prototype.port_pagehi_write = function(a, b) {
        dbg_log("pagehi write [" + a + "] = " + h(b), LOG_DMA);
        this.channel_pagehi[a] = b
    };
    DMA.prototype.port_pagehi_read = function(a) {
        dbg_log("pagehi read [" + a + "]", LOG_DMA);
        return this.channel_pagehi[a]
    };
    DMA.prototype.port_page_write = function(a, b) {
        dbg_log("page write [" + a + "] = " + h(b), LOG_DMA);
        this.channel_page[a] = b
    };
    DMA.prototype.port_page_read = function(a) {
        dbg_log("page read [" + a + "]", LOG_DMA);
        return this.channel_page[a]
    };
    DMA.prototype.port_singlemask_write = function(a, b) {
        a = (b & 3) + a;
        b = b & 4 ? 1 : 0;
        dbg_log("singlechannel mask write [" + a + "] = " + b, LOG_DMA);
        this.update_mask(a, b)
    };
    DMA.prototype.port_multimask_write = function(a, b) {
        dbg_log("multichannel mask write: " + h(b), LOG_DMA);
        for (var c = 0; 4 > c; c++) this.update_mask(a + c, b & 1 << c)
    };
    DMA.prototype.port_multimask_read = function(a) {
        var b = 0 | this.channel_mask[a + 0];
        b |= this.channel_mask[a + 1] << 1;
        b |= this.channel_mask[a + 2] << 2;
        b |= this.channel_mask[a + 3] << 3;
        dbg_log("multichannel mask read: " + h(b), LOG_DMA);
        return b
    };
    DMA.prototype.port_mode_write = function(a, b) {
        a = (b & 3) + a;
        dbg_log("mode write [" + a + "] = " + h(b), LOG_DMA);
        this.channel_mode[a] = b
    };
    DMA.prototype.portC_write = function(a) {
        dbg_log("flipflop reset", LOG_DMA);
        this.lsb_msb_flipflop = 0
    };
    DMA.prototype.on_unmask = function(a, b) {
        this.unmask_listeners.push({
            fn: a,
            this_value: b
        })
    };
    DMA.prototype.update_mask = function(a, b) {
        if (this.channel_mask[a] !== b && (this.channel_mask[a] = b, !b))
            for (dbg_log("firing on_unmask(" + a + ")", LOG_DMA), b = 0; b < this.unmask_listeners.length; b++) this.unmask_listeners[b].fn.call(this.unmask_listeners[b].this_value, a)
    };
    DMA.prototype.do_read = function(a, b, c, d, e) {
        var f = this.count_get_8bit(d),
            g = this.address_get_8bit(d);
        dbg_log("DMA write channel " + d, LOG_DMA);
        dbg_log("to " + h(g) + " len " + h(f), LOG_DMA);
        c < f && dbg_log("DMA should read more than provided: " + h(c) + " " + h(f), LOG_DMA);
        if (b + f > a.byteLength) dbg_log("DMA read outside of buffer", LOG_DMA), e(!0);
        else {
            var k = this.cpu;
            this.channel_addr[d] += f;
            a.get(b, f, function(l) {
                k.write_blob(l, g);
                e(!1)
            })
        }
    };
    DMA.prototype.do_write = function(a, b, c, d, e) {
        var f = this.channel_count[d] + 1 & 65535,
            g = 5 <= d ? 2 : 1,
            k = f * g,
            l = this.address_get_8bit(d),
            m = !1,
            n = !1,
            p = this.channel_mode[d] & 16;
        dbg_log("DMA write channel " + d, LOG_DMA);
        dbg_log("to " + h(l) + " len " + h(k), LOG_DMA);
        c < k ? (dbg_log("DMA should read more than provided", LOG_DMA), f = Math.floor(c / g), k = f * g, m = !0) : c > k && (dbg_log("DMA attempted to read more than provided", LOG_DMA), n = !0);
        b + k > a.byteLength ? (dbg_log("DMA write outside of buffer", LOG_DMA), e(!0)) : (this.channel_addr[d] += f, this.channel_count[d] -=
            f, !m && p && (dbg_log("DMA autoinit", LOG_DMA), this.channel_addr[d] = this.channel_addr_init[d], this.channel_count[d] = this.channel_count_init[d]), a.set(b, this.cpu.mem8.subarray(l, l + k), () => {
                n && p ? (dbg_log("DMA continuing from start", LOG_DMA), this.do_write(a, b + k, c - k, d, e)) : e(!1)
            }))
    };
    DMA.prototype.address_get_8bit = function(a) {
        var b = this.channel_addr[a];
        5 <= a && (b <<= 1);
        b = b & 65535 | this.channel_page[a] << 16;
        return b |= this.channel_pagehi[a] << 24
    };
    DMA.prototype.count_get_8bit = function(a) {
        var b = this.channel_count[a] + 1;
        5 <= a && (b *= 2);
        return b
    };
    DMA.prototype.flipflop_get = function(a, b, c) {
        c || (this.lsb_msb_flipflop ^= 1);
        return this.lsb_msb_flipflop ? a & -256 | b : a & -65281 | b << 8
    };
    DMA.prototype.flipflop_read = function(a) {
        return (this.lsb_msb_flipflop ^= 1) ? a & 255 : a >> 8 & 255
    };
    var OSCILLATOR_FREQ = 1193.1816666;

    function PIT(a, b) {
        this.cpu = a;
        this.bus = b;
        this.counter_start_time = new Float64Array(3);
        this.counter_start_value = new Uint16Array(3);
        this.counter_next_low = new Uint8Array(4);
        this.counter_enabled = new Uint8Array(4);
        this.counter_mode = new Uint8Array(4);
        this.counter_read_mode = new Uint8Array(4);
        this.counter_latch = new Uint8Array(4);
        this.counter_latch_value = new Uint16Array(3);
        this.counter_reload = new Uint16Array(3);
        a.io.register_read(97, this, function() {
            var c = v86.microtick(),
                d = 66.66666666666667 * c & 1;
            c = this.did_rollover(2,
                c);
            return d << 4 | c << 5
        });
        a.io.register_write(97, this, function(c) {
            c & 1 ? this.bus.send("pcspeaker-enable") : this.bus.send("pcspeaker-disable")
        });
        a.io.register_read(64, this, function() {
            return this.counter_read(0)
        });
        a.io.register_read(65, this, function() {
            return this.counter_read(1)
        });
        a.io.register_read(66, this, function() {
            return this.counter_read(2)
        });
        a.io.register_write(64, this, function(c) {
            this.counter_write(0, c)
        });
        a.io.register_write(65, this, function(c) {
            this.counter_write(1, c)
        });
        a.io.register_write(66, this,
            function(c) {
                this.counter_write(2, c);
                this.bus.send("pcspeaker-update", [this.counter_mode[2], this.counter_reload[2]])
            });
        a.io.register_write(67, this, this.port43_write)
    }
    PIT.prototype.get_state = function() {
        var a = [];
        a[0] = this.counter_next_low;
        a[1] = this.counter_enabled;
        a[2] = this.counter_mode;
        a[3] = this.counter_read_mode;
        a[4] = this.counter_latch;
        a[5] = this.counter_latch_value;
        a[6] = this.counter_reload;
        a[7] = this.counter_start_time;
        a[8] = this.counter_start_value;
        return a
    };
    PIT.prototype.set_state = function(a) {
        this.counter_next_low = a[0];
        this.counter_enabled = a[1];
        this.counter_mode = a[2];
        this.counter_read_mode = a[3];
        this.counter_latch = a[4];
        this.counter_latch_value = a[5];
        this.counter_reload = a[6];
        this.counter_start_time = a[7];
        this.counter_start_value = a[8]
    };
    PIT.prototype.timer = function(a, b) {
        var c = 100;
        b || (this.counter_enabled[0] && this.did_rollover(0, a) ? (this.counter_start_value[0] = this.get_counter_value(0, a), this.counter_start_time[0] = a, dbg_log("pit interrupt. new value: " + this.counter_start_value[0], LOG_PIT), this.cpu.device_lower_irq(0), this.cpu.device_raise_irq(0), 0 === this.counter_mode[0] && (this.counter_enabled[0] = 0)) : this.cpu.device_lower_irq(0), this.counter_enabled[0] && (c = (this.counter_start_value[0] - Math.floor((a - this.counter_start_time[0]) * OSCILLATOR_FREQ)) /
            OSCILLATOR_FREQ));
        return c
    };
    PIT.prototype.get_counter_value = function(a, b) {
        if (!this.counter_enabled[a]) return 0;
        var c = b - this.counter_start_time[a],
            d = Math.floor(c * OSCILLATOR_FREQ);
        b = this.counter_start_value[a] - d;
        dbg_log("diff=" + c + " dticks=" + d + " value=" + b + " reload=" + this.counter_reload[a], LOG_PIT);
        c = this.counter_reload[a];
        b >= c ? (dbg_log("Warning: Counter" + a + " value " + b + " is larger than reload " + c, LOG_PIT), b %= c) : 0 > b && (b = b % c + c);
        return b
    };
    PIT.prototype.did_rollover = function(a, b) {
        b -= this.counter_start_time[a];
        return 0 > b ? (dbg_log("Warning: PIT timer difference is negative, resetting (timer " + a + ")"), !0) : this.counter_start_value[a] < Math.floor(b * OSCILLATOR_FREQ)
    };
    PIT.prototype.counter_read = function(a) {
        var b = this.counter_latch[a];
        if (b) return this.counter_latch[a]--, 2 === b ? this.counter_latch_value[a] & 255 : this.counter_latch_value[a] >> 8;
        b = this.counter_next_low[a];
        3 === this.counter_mode[a] && (this.counter_next_low[a] ^= 1);
        a = this.get_counter_value(a, v86.microtick());
        return b ? a & 255 : a >> 8
    };
    PIT.prototype.counter_write = function(a, b) {
        this.counter_reload[a] = this.counter_next_low[a] ? this.counter_reload[a] & -256 | b : this.counter_reload[a] & 255 | b << 8;
        3 === this.counter_read_mode[a] && this.counter_next_low[a] || (this.counter_reload[a] || (this.counter_reload[a] = 65535), this.counter_start_value[a] = this.counter_reload[a], this.counter_enabled[a] = !0, this.counter_start_time[a] = v86.microtick(), dbg_log("counter" + a + " reload=" + h(this.counter_reload[a]) + " tick=" + (this.counter_reload[a] || 65536) / OSCILLATOR_FREQ + "ms",
            LOG_PIT));
        3 === this.counter_read_mode[a] && (this.counter_next_low[a] ^= 1)
    };
    PIT.prototype.port43_write = function(a) {
        var b = a >> 1 & 7,
            c = a & 1,
            d = a >> 6 & 3;
        a = a >> 4 & 3;
        1 === d && dbg_log("Unimplemented timer1", LOG_PIT);
        3 === d ? dbg_log("Unimplemented read back", LOG_PIT) : 0 === a ? (this.counter_latch[d] = 2, b = this.get_counter_value(d, v86.microtick()), dbg_log("latch: " + b, LOG_PIT), this.counter_latch_value[d] = b ? b - 1 : 0) : (6 <= b && (b &= -5), dbg_log("Control: mode=" + b + " ctr=" + d + " read_mode=" + a + " bcd=" + c, LOG_PIT), this.counter_next_low[d] = 1 === a ? 0 : 1, 0 === d && this.cpu.device_lower_irq(0), 0 !== b && 3 !== b && 2 !== b && dbg_log("Unimplemented counter mode: " +
            h(b), LOG_PIT), this.counter_mode[d] = b, this.counter_read_mode[d] = a, 2 === d && this.bus.send("pcspeaker-update", [this.counter_mode[2], this.counter_reload[2]]))
    };
    PIT.prototype.dump = function() {
        const a = this.counter_reload[0];
        dbg_log("counter0 ticks every " + (a || 65536) / OSCILLATOR_FREQ + "ms (reload=" + a + ")")
    };
    var VGA_BANK_SIZE = 65536,
        MAX_XRES = 2560,
        MAX_YRES = 1600,
        MAX_BPP = 32,
        VGA_LFB_ADDRESS = 3758096384,
        VGA_PIXEL_BUFFER_SIZE = 8 * VGA_BANK_SIZE,
        VGA_MIN_MEMORY_SIZE = 4 * VGA_BANK_SIZE,
        VGA_HOST_MEMORY_SPACE_START = Uint32Array.from([655360, 655360, 720896, 753664]),
        VGA_HOST_MEMORY_SPACE_SIZE = Uint32Array.from([131072, 65536, 32768, 32768]);

    function VGAScreen(a, b, c) {
        this.cpu = a;
        this.bus = b;
        this.vga_memory_size = c;
        this.cursor_address = 0;
        this.cursor_scanline_start = 14;
        this.cursor_scanline_end = 15;
        this.max_cols = 80;
        this.max_rows = 25;
        this.virtual_height = this.virtual_width = this.screen_height = this.screen_width = 0;
        this.layers = [];
        this.start_address_latched = this.start_address = 0;
        this.crtc = new Uint8Array(25);
        this.line_compare = this.offset_register = this.preset_row_scan = this.underline_location_register = this.vertical_blank_start = this.vertical_display_enable_end =
            this.horizontal_blank_start = this.horizontal_display_enable_end = this.crtc_mode = 0;
        this.graphical_mode_is_linear = !0;
        this.graphical_mode = !1;
        setTimeout(() => {
            b.send("screen-set-mode", this.graphical_mode)
        }, 0);
        this.vga256_palette = new Int32Array(256);
        this.svga_height = this.svga_width = this.latch_dword = 0;
        this.svga_enabled = !1;
        this.svga_bpp = 32;
        this.svga_offset = this.svga_bank_offset = 0;
        this.pci_space = [52, 18, 17, 17, 3, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 8, VGA_LFB_ADDRESS >>> 8, VGA_LFB_ADDRESS >>> 16, VGA_LFB_ADDRESS >>> 24, 0, 0, 0, 0, 0, 0,
            191, 254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 26, 0, 17, 0, 0, 190, 254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ];
        this.pci_id = 144;
        this.pci_bars = [{
            size: c
        }];
        this.pci_rom_size = 65536;
        this.pci_rom_address = 4272947200;
        this.name = "vga";
        this.stats = {
            is_graphical: !1,
            res_x: 0,
            res_y: 0,
            bpp: 0
        };
        this.dac_state = this.dac_color_index_read = this.dac_color_index_write = this.index_crtc = 0;
        this.dac_mask = 255;
        this.dac_map = new Uint8Array(16);
        this.attribute_controller_index = -1;
        this.palette_source = 32;
        this.color_select = this.horizontal_panning = this.color_plane_enable =
            this.attribute_mode = 0;
        this.sequencer_index = -1;
        this.plane_write_bm = 15;
        this.clocking_mode = this.sequencer_memory_mode = 0;
        this.graphics_index = -1;
        this.planar_rotate_reg = this.planar_mode = this.plane_read = 0;
        this.planar_bitmap = 255;
        this.max_scan_line = this.color_dont_care = this.color_compare = this.miscellaneous_graphics_register = this.planar_setreset_enable = this.planar_setreset = 0;
        this.port_3DA_value = this.miscellaneous_output_register = 255;
        c = a.io;
        c.register_write(960, this, this.port3C0_write);
        c.register_read(960, this,
            this.port3C0_read, this.port3C0_read16);
        c.register_read(961, this, this.port3C1_read);
        c.register_write(962, this, this.port3C2_write);
        c.register_write_consecutive(964, this, this.port3C4_write, this.port3C5_write);
        c.register_read(964, this, this.port3C4_read);
        c.register_read(965, this, this.port3C5_read);
        c.register_write_consecutive(974, this, this.port3CE_write, this.port3CF_write);
        c.register_read(974, this, this.port3CE_read);
        c.register_read(975, this, this.port3CF_read);
        c.register_read(966, this, this.port3C6_read);
        c.register_write(966, this, this.port3C6_write);
        c.register_write(967, this, this.port3C7_write);
        c.register_read(967, this, this.port3C7_read);
        c.register_write(968, this, this.port3C8_write);
        c.register_read(968, this, this.port3C8_read);
        c.register_write(969, this, this.port3C9_write);
        c.register_read(969, this, this.port3C9_read);
        c.register_read(972, this, this.port3CC_read);
        c.register_write_consecutive(980, this, this.port3D4_write, this.port3D5_write);
        c.register_read(980, this, this.port3D4_read);
        c.register_read(981,
            this, this.port3D5_read, () => {
                dbg_log("Warning: 16-bit read from 3D5", LOG_VGA);
                return this.port3D5_read()
            });
        c.register_read(970, this, function() {
            dbg_log("3CA read", LOG_VGA);
            return 0
        });
        c.register_read(986, this, this.port3DA_read);
        c.register_read(954, this, this.port3DA_read);
        this.dispi_index = -1;
        this.dispi_enable_value = 0;
        c.register_write(462, this, void 0, this.port1CE_write);
        c.register_write(463, this, void 0, this.port1CF_write);
        c.register_read(463, this, void 0, this.port1CF_read);
        void 0 === this.vga_memory_size ||
            this.vga_memory_size < VGA_MIN_MEMORY_SIZE ? (this.vga_memory_size = VGA_MIN_MEMORY_SIZE, dbg_log("vga memory size rounded up to " + this.vga_memory_size, LOG_VGA)) : this.vga_memory_size & VGA_BANK_SIZE - 1 && (this.vga_memory_size |= VGA_BANK_SIZE - 1, this.vga_memory_size++);
        const d = a.svga_allocate_memory(this.vga_memory_size);
        this.svga_memory = v86util.view(Uint8Array, a.wasm_memory, d, this.vga_memory_size);
        this.diff_addr_min = this.vga_memory_size;
        this.diff_addr_max = 0;
        this.diff_plot_min = this.vga_memory_size;
        this.diff_plot_max =
            0;
        this.image_data = null;
        b.register("screen-fill-buffer", function() {
            this.screen_fill_buffer()
        }, this);
        this.vga_memory = new Uint8Array(4 * VGA_BANK_SIZE);
        this.plane0 = new Uint8Array(this.vga_memory.buffer, 0 * VGA_BANK_SIZE, VGA_BANK_SIZE);
        this.plane1 = new Uint8Array(this.vga_memory.buffer, 1 * VGA_BANK_SIZE, VGA_BANK_SIZE);
        this.plane2 = new Uint8Array(this.vga_memory.buffer, 2 * VGA_BANK_SIZE, VGA_BANK_SIZE);
        this.plane3 = new Uint8Array(this.vga_memory.buffer, 3 * VGA_BANK_SIZE, VGA_BANK_SIZE);
        this.pixel_buffer = new Uint8Array(VGA_PIXEL_BUFFER_SIZE);
        var e = this;
        c.mmap_register(655360, 131072, function(f) {
            return e.vga_memory_read(f)
        }, function(f, g) {
            e.vga_memory_write(f, g)
        });
        a.devices.pci.register_device(this)
    }
    VGAScreen.prototype.get_state = function() {
        var a = [];
        a[0] = this.vga_memory_size;
        a[1] = this.cursor_address;
        a[2] = this.cursor_scanline_start;
        a[3] = this.cursor_scanline_end;
        a[4] = this.max_cols;
        a[5] = this.max_rows;
        a[6] = this.vga_memory;
        a[7] = this.dac_state;
        a[8] = this.start_address;
        a[9] = this.graphical_mode;
        a[10] = this.vga256_palette;
        a[11] = this.latch_dword;
        a[12] = this.color_compare;
        a[13] = this.color_dont_care;
        a[14] = this.miscellaneous_graphics_register;
        a[15] = this.svga_width;
        a[16] = this.svga_height;
        a[17] = this.crtc_mode;
        a[18] = this.svga_enabled;
        a[19] = this.svga_bpp;
        a[20] = this.svga_bank_offset;
        a[21] = this.svga_offset;
        a[22] = this.index_crtc;
        a[23] = this.dac_color_index_write;
        a[24] = this.dac_color_index_read;
        a[25] = this.dac_map;
        a[26] = this.sequencer_index;
        a[27] = this.plane_write_bm;
        a[28] = this.sequencer_memory_mode;
        a[29] = this.graphics_index;
        a[30] = this.plane_read;
        a[31] = this.planar_mode;
        a[32] = this.planar_rotate_reg;
        a[33] = this.planar_bitmap;
        a[34] = this.max_scan_line;
        a[35] = this.miscellaneous_output_register;
        a[36] = this.port_3DA_value;
        a[37] = this.dispi_index;
        a[38] = this.dispi_enable_value;
        a[39] = this.svga_memory;
        a[40] = this.graphical_mode_is_linear;
        a[41] = this.attribute_controller_index;
        a[42] = this.offset_register;
        a[43] = this.planar_setreset;
        a[44] = this.planar_setreset_enable;
        a[45] = this.start_address_latched;
        a[46] = this.crtc;
        a[47] = this.horizontal_display_enable_end;
        a[48] = this.horizontal_blank_start;
        a[49] = this.vertical_display_enable_end;
        a[50] = this.vertical_blank_start;
        a[51] = this.underline_location_register;
        a[52] = this.preset_row_scan;
        a[53] =
            this.offset_register;
        a[54] = this.palette_source;
        a[55] = this.attribute_mode;
        a[56] = this.color_plane_enable;
        a[57] = this.horizontal_panning;
        a[58] = this.color_select;
        a[59] = this.clocking_mode;
        a[60] = this.line_compare;
        a[61] = this.pixel_buffer;
        a[62] = this.dac_mask;
        return a
    };
    VGAScreen.prototype.set_state = function(a) {
        this.vga_memory_size = a[0];
        this.cursor_address = a[1];
        this.cursor_scanline_start = a[2];
        this.cursor_scanline_end = a[3];
        this.max_cols = a[4];
        this.max_rows = a[5];
        a[6] && this.vga_memory.set(a[6]);
        this.dac_state = a[7];
        this.start_address = a[8];
        this.graphical_mode = a[9];
        this.vga256_palette = a[10];
        this.latch_dword = a[11];
        this.color_compare = a[12];
        this.color_dont_care = a[13];
        this.miscellaneous_graphics_register = a[14];
        this.svga_width = a[15];
        this.svga_height = a[16];
        this.crtc_mode = a[17];
        this.svga_enabled = a[18];
        this.svga_bpp = a[19];
        this.svga_bank_offset = a[20];
        this.svga_offset = a[21];
        this.index_crtc = a[22];
        this.dac_color_index_write = a[23];
        this.dac_color_index_read = a[24];
        this.dac_map = a[25];
        this.sequencer_index = a[26];
        this.plane_write_bm = a[27];
        this.sequencer_memory_mode = a[28];
        this.graphics_index = a[29];
        this.plane_read = a[30];
        this.planar_mode = a[31];
        this.planar_rotate_reg = a[32];
        this.planar_bitmap = a[33];
        this.max_scan_line = a[34];
        this.miscellaneous_output_register = a[35];
        this.port_3DA_value = a[36];
        this.dispi_index = a[37];
        this.dispi_enable_value = a[38];
        this.svga_memory.set(a[39]);
        this.graphical_mode_is_linear = a[40];
        this.attribute_controller_index = a[41];
        this.offset_register = a[42];
        this.planar_setreset = a[43];
        this.planar_setreset_enable = a[44];
        this.start_address_latched = a[45];
        this.crtc.set(a[46]);
        this.horizontal_display_enable_end = a[47];
        this.horizontal_blank_start = a[48];
        this.vertical_display_enable_end = a[49];
        this.vertical_blank_start = a[50];
        this.underline_location_register = a[51];
        this.preset_row_scan =
            a[52];
        this.offset_register = a[53];
        this.palette_source = a[54];
        this.attribute_mode = a[55];
        this.color_plane_enable = a[56];
        this.horizontal_panning = a[57];
        this.color_select = a[58];
        this.clocking_mode = a[59];
        this.line_compare = a[60];
        a[61] && this.pixel_buffer.set(a[61]);
        this.dac_mask = void 0 === a[62] ? 255 : a[62];
        this.bus.send("screen-set-mode", this.graphical_mode);
        this.graphical_mode ? (this.screen_height = this.screen_width = 0, this.svga_enabled ? (this.set_size_graphical(this.svga_width, this.svga_height, this.svga_bpp, this.svga_width,
            this.svga_height), this.update_layers()) : (this.update_vga_size(), this.update_layers(), this.complete_replot())) : (this.set_size_text(this.max_cols, this.max_rows), this.update_cursor_scanline(), this.update_cursor());
        this.complete_redraw()
    };
    VGAScreen.prototype.vga_memory_read = function(a) {
        if (this.svga_enabled && this.graphical_mode_is_linear) return this.cpu.read8((a - 655360 | this.svga_bank_offset) + VGA_LFB_ADDRESS | 0);
        var b = this.miscellaneous_graphics_register >> 2 & 3;
        a -= VGA_HOST_MEMORY_SPACE_START[b];
        if (0 > a || a >= VGA_HOST_MEMORY_SPACE_SIZE[b]) return dbg_log("vga read outside memory space: addr:" + h(a), LOG_VGA), 0;
        this.latch_dword = this.plane0[a];
        this.latch_dword |= this.plane1[a] << 8;
        this.latch_dword |= this.plane2[a] << 16;
        this.latch_dword |= this.plane3[a] <<
            24;
        if (this.planar_mode & 8) return b = 255, this.color_dont_care & 1 && (b &= this.plane0[a] ^ ~(this.color_compare & 1 ? 255 : 0)), this.color_dont_care & 2 && (b &= this.plane1[a] ^ ~(this.color_compare & 2 ? 255 : 0)), this.color_dont_care & 4 && (b &= this.plane2[a] ^ ~(this.color_compare & 4 ? 255 : 0)), this.color_dont_care & 8 && (b &= this.plane3[a] ^ ~(this.color_compare & 8 ? 255 : 0)), b;
        b = this.plane_read;
        this.graphical_mode ? this.sequencer_memory_mode & 8 ? (b = a & 3, a &= -4) : this.planar_mode & 16 && (b = a & 1, a &= -2) : b = 0;
        return this.vga_memory[b << 16 | a]
    };
    VGAScreen.prototype.vga_memory_write = function(a, b) {
        if (this.svga_enabled && this.graphical_mode && this.graphical_mode_is_linear) this.cpu.write8((a - 655360 | this.svga_bank_offset) + VGA_LFB_ADDRESS | 0, b);
        else {
            var c = this.miscellaneous_graphics_register >> 2 & 3;
            a -= VGA_HOST_MEMORY_SPACE_START[c];
            0 > a || a >= VGA_HOST_MEMORY_SPACE_SIZE[c] ? dbg_log("vga write outside memory space: addr:" + h(a) + ", value:" + h(b), LOG_VGA) : this.graphical_mode ? this.vga_memory_write_graphical(a, b) : this.plane_write_bm & 3 && this.vga_memory_write_text_mode(a,
                b)
        }
    };
    VGAScreen.prototype.vga_memory_write_graphical = function(a, b) {
        var c = this.planar_mode & 3,
            d = this.apply_feed(this.planar_bitmap),
            e = this.apply_expand(this.planar_setreset),
            f = this.apply_expand(this.planar_setreset_enable);
        switch (c) {
            case 0:
                b = this.apply_rotate(b);
                var g = this.apply_feed(b);
                g = this.apply_setreset(g, f);
                g = this.apply_logical(g, this.latch_dword);
                g = this.apply_bitmask(g, d);
                break;
            case 1:
                g = this.latch_dword;
                break;
            case 2:
                g = this.apply_expand(b);
                g = this.apply_logical(g, this.latch_dword);
                g = this.apply_bitmask(g, d);
                break;
            case 3:
                b = this.apply_rotate(b), d &= this.apply_feed(b), g = this.apply_bitmask(e, d)
        }
        b = 15;
        switch (this.sequencer_memory_mode & 12) {
            case 0:
                b = 5 << (a & 1);
                a &= -2;
                break;
            case 8:
            case 12:
                b = 1 << (a & 3), a &= -4
        }
        b &= this.plane_write_bm;
        b & 1 && (this.plane0[a] = g >> 0 & 255);
        b & 2 && (this.plane1[a] = g >> 8 & 255);
        b & 4 && (this.plane2[a] = g >> 16 & 255);
        b & 8 && (this.plane3[a] = g >> 24 & 255);
        a = this.vga_addr_to_pixel(a);
        this.partial_replot(a, a + 7)
    };
    VGAScreen.prototype.apply_feed = function(a) {
        return a | a << 8 | a << 16 | a << 24
    };
    VGAScreen.prototype.apply_expand = function(a) {
        return (a & 1 ? 255 : 0) | (a & 2 ? 255 : 0) << 8 | (a & 4 ? 255 : 0) << 16 | (a & 8 ? 255 : 0) << 24
    };
    VGAScreen.prototype.apply_rotate = function(a) {
        return (a | a << 8) >>> (this.planar_rotate_reg & 7) & 255
    };
    VGAScreen.prototype.apply_setreset = function(a, b) {
        var c = this.apply_expand(this.planar_setreset);
        return (a | b & c) & (~b | c)
    };
    VGAScreen.prototype.apply_logical = function(a, b) {
        switch (this.planar_rotate_reg & 24) {
            case 8:
                return a & b;
            case 16:
                return a | b;
            case 24:
                return a ^ b
        }
        return a
    };
    VGAScreen.prototype.apply_bitmask = function(a, b) {
        return b & a | ~b & this.latch_dword
    };
    VGAScreen.prototype.text_mode_redraw = function() {
        for (var a = this.start_address << 1, b, c, d = 0; d < this.max_rows; d++)
            for (var e = 0; e < this.max_cols; e++) b = this.vga_memory[a], c = this.vga_memory[a | 1], this.bus.send("screen-put-char", [d, e, b, this.vga256_palette[this.dac_mask & this.dac_map[c >> 4 & 15]], this.vga256_palette[this.dac_mask & this.dac_map[c & 15]]]), a += 2
    };
    VGAScreen.prototype.vga_memory_write_text_mode = function(a, b) {
        var c = (a >> 1) - this.start_address,
            d = c / this.max_cols | 0;
        c %= this.max_cols;
        if (a & 1) {
            var e = b;
            var f = this.vga_memory[a & -2]
        } else f = b, e = this.vga_memory[a | 1];
        this.bus.send("screen-put-char", [d, c, f, this.vga256_palette[this.dac_mask & this.dac_map[e >> 4 & 15]], this.vga256_palette[this.dac_mask & this.dac_map[e & 15]]]);
        this.vga_memory[a] = b
    };
    VGAScreen.prototype.update_cursor = function() {
        var a = (this.cursor_address - this.start_address) / this.max_cols | 0,
            b = (this.cursor_address - this.start_address) % this.max_cols;
        a = Math.min(this.max_rows - 1, a);
        this.bus.send("screen-update-cursor", [a, b])
    };
    VGAScreen.prototype.complete_redraw = function() {
        dbg_log("complete redraw", LOG_VGA);
        this.graphical_mode ? this.svga_enabled ? this.cpu.svga_mark_dirty() : (this.diff_addr_min = 0, this.diff_addr_max = VGA_PIXEL_BUFFER_SIZE) : this.text_mode_redraw()
    };
    VGAScreen.prototype.complete_replot = function() {
        dbg_log("complete replot", LOG_VGA);
        this.graphical_mode && !this.svga_enabled && (this.diff_plot_min = 0, this.diff_plot_max = VGA_PIXEL_BUFFER_SIZE, this.complete_redraw())
    };
    VGAScreen.prototype.partial_redraw = function(a, b) {
        a < this.diff_addr_min && (this.diff_addr_min = a);
        b > this.diff_addr_max && (this.diff_addr_max = b)
    };
    VGAScreen.prototype.partial_replot = function(a, b) {
        a < this.diff_plot_min && (this.diff_plot_min = a);
        b > this.diff_plot_max && (this.diff_plot_max = b);
        this.partial_redraw(a, b)
    };
    VGAScreen.prototype.reset_diffs = function() {
        this.diff_addr_min = this.vga_memory_size;
        this.diff_addr_max = 0;
        this.diff_plot_min = this.vga_memory_size;
        this.diff_plot_max = 0
    };
    VGAScreen.prototype.destroy = function() {};
    VGAScreen.prototype.vga_bytes_per_line = function() {
        var a = this.offset_register << 2;
        this.underline_location_register & 64 ? a <<= 1 : this.crtc_mode & 64 && (a >>>= 1);
        return a
    };
    VGAScreen.prototype.vga_addr_shift_count = function() {
        var a = 128 + (~this.underline_location_register & this.crtc_mode & 64);
        a -= this.underline_location_register & 64;
        a -= this.attribute_mode & 64;
        return a >>> 6
    };
    VGAScreen.prototype.vga_addr_to_pixel = function(a) {
        var b = this.vga_addr_shift_count();
        if (~this.crtc_mode & 3) {
            var c = a - this.start_address;
            c &= this.crtc_mode << 13 | -24577;
            c <<= b;
            var d = c / this.virtual_width | 0;
            c %= this.virtual_width;
            switch (this.crtc_mode & 3) {
                case 2:
                    d = d << 1 | a >> 13 & 1;
                    break;
                case 1:
                    d = d << 1 | a >> 14 & 1;
                    break;
                case 0:
                    d = d << 2 | a >> 13 & 3
            }
            return d * this.virtual_width + c + (this.start_address << b)
        }
        return a << b
    };
    VGAScreen.prototype.scan_line_to_screen_row = function(a) {
        this.max_scan_line & 128 && (a >>>= 1);
        a = Math.ceil(a / (1 + (this.max_scan_line & 31)));
        this.crtc_mode & 1 || (a <<= 1);
        this.crtc_mode & 2 || (a <<= 1);
        return a
    };
    VGAScreen.prototype.set_size_text = function(a, b) {
        this.max_cols = a;
        this.max_rows = b;
        this.bus.send("screen-set-size-text", [a, b])
    };
    VGAScreen.prototype.set_size_graphical = function(a, b, c, d, e) {
        if (!this.stats.is_graphical || this.stats.bpp !== c || this.screen_width !== a || this.screen_height !== b || this.virtual_width !== d || this.virtual_height !== e) {
            this.screen_width = a;
            this.screen_height = b;
            this.virtual_width = d;
            this.virtual_height = e;
            this.stats.bpp = c;
            this.stats.is_graphical = !0;
            this.stats.res_x = a;
            this.stats.res_y = b;
            if ("undefined" !== typeof ImageData) {
                const f = d * e,
                    g = this.cpu.svga_allocate_dest_buffer(f) >>> 0;
                this.dest_buffet_offset = g;
                this.image_data =
                    new ImageData(new Uint8ClampedArray(this.cpu.wasm_memory.buffer, g, 4 * f), d, e);
                this.cpu.svga_mark_dirty()
            }
            this.bus.send("screen-set-size-graphical", [a, b, d, e, c])
        }
    };
    VGAScreen.prototype.update_vga_size = function() {
        if (!this.svga_enabled) {
            var a = Math.min(1 + this.horizontal_display_enable_end, this.horizontal_blank_start),
                b = Math.min(1 + this.vertical_display_enable_end, this.vertical_blank_start);
            if (a && b)
                if (this.graphical_mode) {
                    a <<= 3;
                    var c = this.offset_register << 4;
                    this.attribute_mode & 64 && (a >>>= 1, c >>>= 1);
                    b = this.scan_line_to_screen_row(b);
                    var d = Math.ceil(VGA_HOST_MEMORY_SPACE_SIZE[0] / this.vga_bytes_per_line());
                    this.set_size_graphical(a, b, 8, c, d);
                    this.update_vertical_retrace();
                    this.update_layers()
                } else this.max_scan_line & 128 && (b >>>= 1), c = b / (1 + (this.max_scan_line & 31)) | 0, a && c && this.set_size_text(a, c)
        }
    };
    VGAScreen.prototype.update_layers = function() {
        this.graphical_mode || this.text_mode_redraw();
        if (this.svga_enabled) this.layers = [];
        else if (this.virtual_width && this.screen_width)
            if (!this.palette_source || this.clocking_mode & 32) this.layers = [], this.bus.send("screen-clear");
            else {
                var a = this.start_address_latched,
                    b = this.horizontal_panning;
                this.attribute_mode & 64 && (b >>>= 1);
                var c = this.preset_row_scan >> 5 & 3,
                    d = this.vga_addr_to_pixel(a + c);
                a = d / this.virtual_width | 0;
                var e = d % this.virtual_width + b;
                d = this.scan_line_to_screen_row(1 +
                    this.line_compare);
                d = Math.min(d, this.screen_height);
                var f = this.screen_height - d;
                this.layers = [];
                e = -e;
                for (var g = 0; e < this.screen_width; e += this.virtual_width, g++) this.layers.push({
                    image_data: this.image_data,
                    screen_x: e,
                    screen_y: 0,
                    buffer_x: 0,
                    buffer_y: a + g,
                    buffer_width: this.virtual_width,
                    buffer_height: d
                });
                a = 0;
                this.attribute_mode & 32 || (a = this.vga_addr_to_pixel(c) + b);
                e = -a;
                for (g = 0; e < this.screen_width; e += this.virtual_width, g++) this.layers.push({
                    image_data: this.image_data,
                    screen_x: e,
                    screen_y: d,
                    buffer_x: 0,
                    buffer_y: g,
                    buffer_width: this.virtual_width,
                    buffer_height: f
                })
            }
    };
    VGAScreen.prototype.update_vertical_retrace = function() {
        this.port_3DA_value |= 8;
        this.start_address_latched !== this.start_address && (this.start_address_latched = this.start_address, this.update_layers())
    };
    VGAScreen.prototype.update_cursor_scanline = function() {
        this.bus.send("screen-update-cursor-scanline", [this.cursor_scanline_start, this.cursor_scanline_end])
    };
    VGAScreen.prototype.port3C0_write = function(a) {
        if (-1 === this.attribute_controller_index) dbg_log("attribute controller index register: " + h(a), LOG_VGA), this.attribute_controller_index = a & 31, dbg_log("attribute actual index: " + h(this.attribute_controller_index), LOG_VGA), this.palette_source !== (a & 32) && (this.palette_source = a & 32, this.update_layers());
        else {
            if (16 > this.attribute_controller_index) dbg_log("internal palette: " + h(this.attribute_controller_index) + " -> " + h(a), LOG_VGA), this.dac_map[this.attribute_controller_index] =
                a, this.attribute_mode & 64 || this.complete_redraw();
            else switch (this.attribute_controller_index) {
                case 16:
                    dbg_log("3C0 / attribute mode control: " + h(a), LOG_VGA);
                    if (this.attribute_mode !== a) {
                        var b = this.attribute_mode;
                        this.attribute_mode = a;
                        var c = 0 < (a & 1);
                        this.svga_enabled || this.graphical_mode === c || (this.graphical_mode = c, this.bus.send("screen-set-mode", this.graphical_mode));
                        (b ^ a) & 64 && this.complete_replot();
                        this.update_vga_size();
                        this.complete_redraw()
                    }
                    break;
                case 18:
                    dbg_log("3C0 / color plane enable: " + h(a),
                        LOG_VGA);
                    this.color_plane_enable !== a && (this.color_plane_enable = a, this.complete_redraw());
                    break;
                case 19:
                    dbg_log("3C0 / horizontal panning: " + h(a), LOG_VGA);
                    this.horizontal_panning !== a && (this.horizontal_panning = a & 15, this.update_layers());
                    break;
                case 20:
                    dbg_log("3C0 / color select: " + h(a), LOG_VGA);
                    this.color_select !== a && (this.color_select = a, this.complete_redraw());
                    break;
                default:
                    dbg_log("3C0 / attribute controller write " + h(this.attribute_controller_index) + ": " + h(a), LOG_VGA)
            }
            this.attribute_controller_index = -1
        }
    };
    VGAScreen.prototype.port3C0_read = function() {
        dbg_log("3C0 read", LOG_VGA);
        return this.attribute_controller_index | this.palette_source
    };
    VGAScreen.prototype.port3C0_read16 = function() {
        dbg_log("3C0 read16", LOG_VGA);
        return this.port3C0_read() & 255 | this.port3C1_read() << 8 & 65280
    };
    VGAScreen.prototype.port3C1_read = function() {
        if (16 > this.attribute_controller_index) return dbg_log("3C1 / internal palette read: " + h(this.attribute_controller_index) + " -> " + h(this.dac_map[this.attribute_controller_index]), LOG_VGA), this.dac_map[this.attribute_controller_index] & 255;
        switch (this.attribute_controller_index) {
            case 16:
                return dbg_log("3C1 / attribute mode read: " + h(this.attribute_mode), LOG_VGA), this.attribute_mode;
            case 18:
                return dbg_log("3C1 / color plane enable read: " + h(this.color_plane_enable),
                    LOG_VGA), this.color_plane_enable;
            case 19:
                return dbg_log("3C1 / horizontal panning read: " + h(this.horizontal_panning), LOG_VGA), this.horizontal_panning;
            case 20:
                return dbg_log("3C1 / color select read: " + h(this.color_select), LOG_VGA), this.color_select;
            default:
                dbg_log("3C1 / attribute controller read " + h(this.attribute_controller_index), LOG_VGA)
        }
        return 255
    };
    VGAScreen.prototype.port3C2_write = function(a) {
        dbg_log("3C2 / miscellaneous output register = " + h(a), LOG_VGA);
        this.miscellaneous_output_register = a
    };
    VGAScreen.prototype.port3C4_write = function(a) {
        this.sequencer_index = a
    };
    VGAScreen.prototype.port3C4_read = function() {
        return this.sequencer_index
    };
    VGAScreen.prototype.port3C5_write = function(a) {
        switch (this.sequencer_index) {
            case 1:
                dbg_log("clocking mode: " + h(a), LOG_VGA);
                var b = this.clocking_mode;
                this.clocking_mode = a;
                (b ^ a) & 32 && this.update_layers();
                break;
            case 2:
                dbg_log("plane write mask: " + h(a), LOG_VGA);
                this.plane_write_bm = a;
                break;
            case 4:
                dbg_log("sequencer memory mode: " + h(a), LOG_VGA);
                this.sequencer_memory_mode = a;
                break;
            default:
                dbg_log("3C5 / sequencer write " + h(this.sequencer_index) + ": " + h(a), LOG_VGA)
        }
    };
    VGAScreen.prototype.port3C5_read = function() {
        dbg_log("3C5 / sequencer read " + h(this.sequencer_index), LOG_VGA);
        switch (this.sequencer_index) {
            case 1:
                return this.clocking_mode;
            case 2:
                return this.plane_write_bm;
            case 4:
                return this.sequencer_memory_mode;
            case 6:
                return 18
        }
        return 0
    };
    VGAScreen.prototype.port3C6_write = function(a) {
        this.dac_mask = a
    };
    VGAScreen.prototype.port3C6_read = function() {
        return this.dac_mask
    };
    VGAScreen.prototype.port3C7_write = function(a) {
        dbg_log("3C7 write: " + h(a), LOG_VGA);
        this.dac_color_index_read = 3 * a;
        this.dac_state &= 0
    };
    VGAScreen.prototype.port3C7_read = function() {
        return this.dac_state
    };
    VGAScreen.prototype.port3C8_write = function(a) {
        this.dac_color_index_write = 3 * a;
        this.dac_state |= 3
    };
    VGAScreen.prototype.port3C8_read = function() {
        return this.dac_color_index_write / 3 & 255
    };
    VGAScreen.prototype.port3C9_write = function(a) {
        var b = this.dac_color_index_write / 3 | 0,
            c = this.dac_color_index_write % 3,
            d = this.vga256_palette[b];
        if (0 === (this.dispi_enable_value & 32)) {
            a &= 63;
            const e = a & 1;
            a = a << 2 | e << 1 | e
        }
        0 === c ? d = d & -16711681 | a << 16 : 1 === c ? d = d & -65281 | a << 8 : (d = d & -256 | a, dbg_log("dac set color, index=" + h(b) + " value=" + h(d), LOG_VGA));
        this.vga256_palette[b] !== d && (this.vga256_palette[b] = d, this.complete_redraw());
        this.dac_color_index_write++
    };
    VGAScreen.prototype.port3C9_read = function() {
        dbg_log("3C9 read", LOG_VGA);
        var a = this.vga256_palette[this.dac_color_index_read / 3 | 0] >> 8 * (2 - this.dac_color_index_read % 3) & 255;
        this.dac_color_index_read++;
        return this.dispi_enable_value & 32 ? a : a >> 2
    };
    VGAScreen.prototype.port3CC_read = function() {
        dbg_log("3CC read", LOG_VGA);
        return this.miscellaneous_output_register
    };
    VGAScreen.prototype.port3CE_write = function(a) {
        this.graphics_index = a
    };
    VGAScreen.prototype.port3CE_read = function() {
        return this.graphics_index
    };
    VGAScreen.prototype.port3CF_write = function(a) {
        switch (this.graphics_index) {
            case 0:
                this.planar_setreset = a;
                dbg_log("plane set/reset: " + h(a), LOG_VGA);
                break;
            case 1:
                this.planar_setreset_enable = a;
                dbg_log("plane set/reset enable: " + h(a), LOG_VGA);
                break;
            case 2:
                this.color_compare = a;
                dbg_log("color compare: " + h(a), LOG_VGA);
                break;
            case 3:
                this.planar_rotate_reg = a;
                dbg_log("plane rotate: " + h(a), LOG_VGA);
                break;
            case 4:
                this.plane_read = a;
                dbg_log("plane read: " + h(a), LOG_VGA);
                break;
            case 5:
                var b = this.planar_mode;
                this.planar_mode =
                    a;
                dbg_log("planar mode: " + h(a), LOG_VGA);
                (b ^ a) & 96 && this.complete_replot();
                break;
            case 6:
                dbg_log("miscellaneous graphics register: " + h(a), LOG_VGA);
                this.miscellaneous_graphics_register !== a && (this.miscellaneous_graphics_register = a, this.update_vga_size());
                break;
            case 7:
                this.color_dont_care = a;
                dbg_log("color don't care: " + h(a), LOG_VGA);
                break;
            case 8:
                this.planar_bitmap = a;
                dbg_log("planar bitmap: " + h(a), LOG_VGA);
                break;
            default:
                dbg_log("3CF / graphics write " + h(this.graphics_index) + ": " + h(a), LOG_VGA)
        }
    };
    VGAScreen.prototype.port3CF_read = function() {
        dbg_log("3CF / graphics read " + h(this.graphics_index), LOG_VGA);
        switch (this.graphics_index) {
            case 0:
                return this.planar_setreset;
            case 1:
                return this.planar_setreset_enable;
            case 2:
                return this.color_compare;
            case 3:
                return this.planar_rotate_reg;
            case 4:
                return this.plane_read;
            case 5:
                return this.planar_mode;
            case 6:
                return this.miscellaneous_graphics_register;
            case 7:
                return this.color_dont_care;
            case 8:
                return this.planar_bitmap
        }
        return 0
    };
    VGAScreen.prototype.port3D4_write = function(a) {
        dbg_log("3D4 / crtc index: " + a, LOG_VGA);
        this.index_crtc = a
    };
    VGAScreen.prototype.port3D4_read = function() {
        dbg_log("3D4 read / crtc index: " + this.index_crtc, LOG_VGA);
        return this.index_crtc
    };
    VGAScreen.prototype.port3D5_write = function(a) {
        switch (this.index_crtc) {
            case 1:
                dbg_log("3D5 / hdisp enable end write: " + h(a), LOG_VGA);
                this.horizontal_display_enable_end !== a && (this.horizontal_display_enable_end = a, this.update_vga_size());
                break;
            case 2:
                this.horizontal_blank_start !== a && (this.horizontal_blank_start = a, this.update_vga_size());
                break;
            case 7:
                dbg_log("3D5 / overflow register write: " + h(a), LOG_VGA);
                var b = this.vertical_display_enable_end;
                this.vertical_display_enable_end &= 255;
                this.vertical_display_enable_end =
                    this.vertical_display_enable_end | a << 3 & 512 | a << 7 & 256;
                b != this.vertical_display_enable_end && this.update_vga_size();
                this.line_compare = this.line_compare & 767 | a << 4 & 256;
                b = this.vertical_blank_start;
                this.vertical_blank_start = this.vertical_blank_start & 767 | a << 5 & 256;
                b !== this.vertical_blank_start && this.update_vga_size();
                this.update_layers();
                break;
            case 8:
                dbg_log("3D5 / preset row scan write: " + h(a), LOG_VGA);
                this.preset_row_scan = a;
                this.update_layers();
                break;
            case 9:
                dbg_log("3D5 / max scan line write: " + h(a), LOG_VGA);
                this.max_scan_line = a;
                this.line_compare = this.line_compare & 511 | a << 3 & 512;
                b = this.vertical_blank_start;
                this.vertical_blank_start = this.vertical_blank_start & 511 | a << 4 & 512;
                b !== this.vertical_blank_start && this.update_vga_size();
                this.update_layers();
                break;
            case 10:
                dbg_log("3D5 / cursor scanline start write: " + h(a), LOG_VGA);
                this.cursor_scanline_start = a;
                this.update_cursor_scanline();
                break;
            case 11:
                dbg_log("3D5 / cursor scanline end write: " + h(a), LOG_VGA);
                this.cursor_scanline_end = a;
                this.update_cursor_scanline();
                break;
            case 12:
                (this.start_address >> 8 & 255) !== a && (this.start_address = this.start_address & 255 | a << 8, this.update_layers(), ~this.crtc_mode & 3 && this.complete_replot());
                dbg_log("3D5 / start addr hi write: " + h(a) + " -> " + h(this.start_address, 4), LOG_VGA);
                break;
            case 13:
                (this.start_address & 255) !== a && (this.start_address = this.start_address & 65280 | a, this.update_layers(), ~this.crtc_mode & 3 && this.complete_replot());
                dbg_log("3D5 / start addr lo write: " + h(a) + " -> " + h(this.start_address, 4), LOG_VGA);
                break;
            case 14:
                dbg_log("3D5 / cursor address hi write: " +
                    h(a), LOG_VGA);
                this.cursor_address = this.cursor_address & 255 | a << 8;
                this.update_cursor();
                break;
            case 15:
                dbg_log("3D5 / cursor address lo write: " + h(a), LOG_VGA);
                this.cursor_address = this.cursor_address & 65280 | a;
                this.update_cursor();
                break;
            case 18:
                dbg_log("3D5 / vdisp enable end write: " + h(a), LOG_VGA);
                (this.vertical_display_enable_end & 255) !== a && (this.vertical_display_enable_end = this.vertical_display_enable_end & 768 | a, this.update_vga_size());
                break;
            case 19:
                dbg_log("3D5 / offset register write: " + h(a), LOG_VGA);
                this.offset_register !== a && (this.offset_register = a, this.update_vga_size(), ~this.crtc_mode & 3 && this.complete_replot());
                break;
            case 20:
                dbg_log("3D5 / underline location write: " + h(a), LOG_VGA);
                this.underline_location_register !== a && (b = this.underline_location_register, this.underline_location_register = a, this.update_vga_size(), (b ^ a) & 64 && this.complete_replot());
                break;
            case 21:
                dbg_log("3D5 / vertical blank start write: " + h(a), LOG_VGA);
                (this.vertical_blank_start & 255) !== a && (this.vertical_blank_start = this.vertical_blank_start &
                    768 | a, this.update_vga_size());
                break;
            case 23:
                dbg_log("3D5 / crtc mode write: " + h(a), LOG_VGA);
                this.crtc_mode !== a && (b = this.crtc_mode, this.crtc_mode = a, this.update_vga_size(), (b ^ a) & 67 && this.complete_replot());
                break;
            case 24:
                dbg_log("3D5 / line compare write: " + h(a), LOG_VGA);
                this.line_compare = this.line_compare & 768 | a;
                this.update_layers();
                break;
            default:
                this.index_crtc < this.crtc.length && (this.crtc[this.index_crtc] = a), dbg_log("3D5 / CRTC write " + h(this.index_crtc) + ": " + h(a), LOG_VGA)
        }
    };
    VGAScreen.prototype.port3D5_read = function() {
        dbg_log("3D5 read " + h(this.index_crtc), LOG_VGA);
        switch (this.index_crtc) {
            case 1:
                return this.horizontal_display_enable_end;
            case 2:
                return this.horizontal_blank_start;
            case 7:
                return this.vertical_display_enable_end >> 7 & 2 | this.vertical_blank_start >> 5 & 8 | this.line_compare >> 4 & 16 | this.vertical_display_enable_end >> 3 & 64;
            case 8:
                return this.preset_row_scan;
            case 9:
                return this.max_scan_line;
            case 10:
                return this.cursor_scanline_start;
            case 11:
                return this.cursor_scanline_end;
            case 12:
                return this.start_address & 255;
            case 13:
                return this.start_address >> 8;
            case 14:
                return this.cursor_address >> 8;
            case 15:
                return this.cursor_address & 255;
            case 18:
                return this.vertical_display_enable_end & 255;
            case 19:
                return this.offset_register;
            case 20:
                return this.underline_location_register;
            case 21:
                return this.vertical_blank_start & 255;
            case 23:
                return this.crtc_mode;
            case 24:
                return this.line_compare & 255
        }
        return this.index_crtc < this.crtc.length ? this.crtc[this.index_crtc] : 0
    };
    VGAScreen.prototype.port3DA_read = function() {
        dbg_log("3DA read - status 1 and clear attr index", LOG_VGA);
        var a = this.port_3DA_value;
        this.graphical_mode ? (this.port_3DA_value ^= 1, this.port_3DA_value &= 1) : (this.port_3DA_value & 1 && (this.port_3DA_value ^= 8), this.port_3DA_value ^= 1);
        this.attribute_controller_index = -1;
        return a
    };
    VGAScreen.prototype.port1CE_write = function(a) {
        this.dispi_index = a
    };
    VGAScreen.prototype.port1CF_write = function(a) {
        dbg_log("1CF / dispi write " + h(this.dispi_index) + ": " + h(a), LOG_VGA);
        switch (this.dispi_index) {
            case 1:
                this.svga_width = a;
                this.svga_width > MAX_XRES && (dbg_log("svga_width reduced from " + this.svga_width + " to " + MAX_XRES, LOG_VGA), this.svga_width = MAX_XRES);
                break;
            case 2:
                this.svga_height = a;
                this.svga_height > MAX_YRES && (dbg_log("svga_height reduced from " + this.svga_height + " to " + MAX_YRES, LOG_VGA), this.svga_height = MAX_YRES);
                break;
            case 3:
                this.svga_bpp = a;
                break;
            case 4:
                this.svga_enabled =
                    1 === (a & 1);
                this.dispi_enable_value = a;
                break;
            case 5:
                dbg_log("SVGA bank offset: " + h(a << 16), LOG_VGA);
                this.svga_bank_offset = a << 16;
                break;
            case 9:
                const b = a * this.svga_width;
                dbg_log("SVGA offset: " + h(b) + " y=" + h(a), LOG_VGA);
                this.svga_offset !== b && (this.svga_offset = b, this.complete_redraw())
        }!this.svga_enabled || this.svga_width && this.svga_height || (dbg_log("SVGA: disabled because of invalid width/height: " + this.svga_width + "x" + this.svga_height, LOG_VGA), this.svga_enabled = !1);
        dbg_assert(4 !== this.svga_bpp, "unimplemented svga bpp: 4");
        dbg_assert(4 === this.svga_bpp || 8 === this.svga_bpp || 15 === this.svga_bpp || 16 === this.svga_bpp || 24 === this.svga_bpp || 32 === this.svga_bpp, "unexpected svga bpp: " + this.svga_bpp);
        dbg_log("SVGA: enabled=" + this.svga_enabled + ", " + this.svga_width + "x" + this.svga_height + "x" + this.svga_bpp, LOG_VGA);
        this.svga_enabled && 4 === this.dispi_index && (this.set_size_graphical(this.svga_width, this.svga_height, this.svga_bpp, this.svga_width, this.svga_height), this.bus.send("screen-set-mode", !0), this.graphical_mode_is_linear = this.graphical_mode = !0);
        this.svga_enabled || (this.svga_bank_offset = 0);
        this.update_layers()
    };
    VGAScreen.prototype.port1CF_read = function() {
        dbg_log("1CF / dispi read " + h(this.dispi_index), LOG_VGA);
        return this.svga_register_read(this.dispi_index)
    };
    VGAScreen.prototype.svga_register_read = function(a) {
        switch (a) {
            case 0:
                return 45248;
            case 1:
                return this.dispi_enable_value & 2 ? MAX_XRES : this.svga_width;
            case 2:
                return this.dispi_enable_value & 2 ? MAX_YRES : this.svga_height;
            case 3:
                return this.dispi_enable_value & 2 ? MAX_BPP : this.svga_bpp;
            case 4:
                return this.dispi_enable_value;
            case 5:
                return this.svga_bank_offset >>> 16;
            case 6:
                return this.screen_width ? this.screen_width : 1;
            case 8:
                return 0;
            case 10:
                return this.vga_memory_size / VGA_BANK_SIZE | 0
        }
        return 255
    };
    VGAScreen.prototype.vga_replot = function() {
        for (var a = this.diff_plot_min & -16, b = Math.min(this.diff_plot_max | 15, VGA_PIXEL_BUFFER_SIZE - 1), c = this.vga_addr_shift_count(), d = ~this.crtc_mode & 3, e = this.planar_mode & 96, f = this.attribute_mode & 64; a <= b;) {
            var g = a >>> c;
            if (d) {
                var k = a / this.virtual_width | 0,
                    l = a - this.virtual_width * k;
                switch (d) {
                    case 1:
                        g = (k & 1) << 13;
                        k >>>= 1;
                        break;
                    case 2:
                        g = (k & 1) << 14;
                        k >>>= 1;
                        break;
                    case 3:
                        g = (k & 3) << 13, k >>>= 2
                }
                g |= (k * this.virtual_width + l >>> c) + this.start_address
            }
            k = this.plane0[g];
            l = this.plane1[g];
            var m = this.plane2[g],
                n = this.plane3[g];
            g = new Uint8Array(8);
            switch (e) {
                case 0:
                    k <<= 0;
                    l <<= 1;
                    m <<= 2;
                    n <<= 3;
                    for (var p = 7; 0 <= p; p--) g[7 - p] = k >> p & 1 | l >> p & 2 | m >> p & 4 | n >> p & 8;
                    break;
                case 32:
                    g[0] = k >> 6 & 3 | m >> 4 & 12;
                    g[1] = k >> 4 & 3 | m >> 2 & 12;
                    g[2] = k >> 2 & 3 | m >> 0 & 12;
                    g[3] = k >> 0 & 3 | m << 2 & 12;
                    g[4] = l >> 6 & 3 | n >> 4 & 12;
                    g[5] = l >> 4 & 3 | n >> 2 & 12;
                    g[6] = l >> 2 & 3 | n >> 0 & 12;
                    g[7] = l >> 0 & 3 | n << 2 & 12;
                    break;
                case 64:
                case 96:
                    g[0] = k >> 4 & 15, g[1] = k >> 0 & 15, g[2] = l >> 4 & 15, g[3] = l >> 0 & 15, g[4] = m >> 4 & 15, g[5] = m >> 0 & 15, g[6] = n >> 4 & 15, g[7] = n >> 0 & 15
            }
            if (f)
                for (k = p = 0; 4 > p; p++, a++, k += 2) this.pixel_buffer[a] = g[k] << 4 | g[k + 1];
            else
                for (p = 0; 8 > p; p++, a++) this.pixel_buffer[a] = g[p]
        }
    };
    VGAScreen.prototype.vga_redraw = function() {
        var a = this.diff_addr_min,
            b = Math.min(this.diff_addr_max, VGA_PIXEL_BUFFER_SIZE - 1);
        const c = new Int32Array(this.cpu.wasm_memory.buffer, this.dest_buffet_offset, this.virtual_width * this.virtual_height);
        var d = 255,
            e = 0;
        this.attribute_mode & 128 && (d &= 207, e |= this.color_select << 4 & 48);
        if (this.attribute_mode & 64)
            for (; a <= b; a++) {
                var f = this.pixel_buffer[a] & d | e;
                f = this.vga256_palette[f];
                c[a] = f & 65280 | f << 16 | f >> 16 | 4278190080
            } else
                for (d &= 63, e |= this.color_select << 4 & 192; a <= b; a++) f = this.dac_map[this.pixel_buffer[a] &
                    this.color_plane_enable] & d | e, f = this.vga256_palette[f], c[a] = f & 65280 | f << 16 | f >> 16 | 4278190080
    };
    VGAScreen.prototype.screen_fill_buffer = function() {
        if (this.graphical_mode) {
            if (0 === this.image_data.data.byteLength) {
                var a = new Uint8ClampedArray(this.cpu.wasm_memory.buffer, this.dest_buffet_offset, 4 * this.virtual_width * this.virtual_height);
                this.image_data = new ImageData(a, this.virtual_width, this.virtual_height);
                this.update_layers()
            }
            if (this.svga_enabled) {
                a = 0;
                let d = this.svga_height;
                if (8 === this.svga_bpp) {
                    const e = new Int32Array(this.cpu.wasm_memory.buffer, this.dest_buffet_offset, this.screen_width * this.screen_height),
                        f = new Uint8Array(this.cpu.wasm_memory.buffer, this.svga_memory.byteOffset, this.vga_memory_size);
                    for (var b = 0; b < e.length; b++) {
                        var c = this.vga256_palette[f[b]];
                        e[b] = c & 65280 | c << 16 | c >> 16 | 4278190080
                    }
                } else this.cpu.svga_fill_pixel_buffer(this.svga_bpp, this.svga_offset), b = 15 === this.svga_bpp ? 2 : this.svga_bpp / 8, a = ((this.cpu.svga_dirty_bitmap_min_offset[0] / b | 0) - this.svga_offset) / this.svga_width | 0, d = (((this.cpu.svga_dirty_bitmap_max_offset[0] / b | 0) - this.svga_offset) / this.svga_width | 0) + 1;
                a < d && (a = Math.max(a, 0), d = Math.min(d,
                    this.svga_height), this.bus.send("screen-fill-buffer-end", [{
                    image_data: this.image_data,
                    screen_x: 0,
                    screen_y: a,
                    buffer_x: 0,
                    buffer_y: a,
                    buffer_width: this.svga_width,
                    buffer_height: d - a
                }]))
            } else this.vga_replot(), this.vga_redraw(), this.bus.send("screen-fill-buffer-end", this.layers);
            this.reset_diffs()
        }
        this.update_vertical_retrace()
    };
    let PS2_LOG_VERBOSE = !1;

    function PS2(a, b) {
        this.cpu = a;
        this.bus = b;
        this.use_mouse = this.enable_mouse_stream = !1;
        this.have_mouse = !0;
        this.mouse_clicks = this.mouse_delta_y = this.mouse_delta_x = 0;
        this.have_keyboard = !0;
        this.next_read_resolution = this.next_read_rate = this.next_handle_scan_code_set = this.next_read_led = this.next_read_sample = this.next_is_mouse_command = this.enable_keyboard_stream = !1;
        this.kbd_buffer = new ByteQueue(1024);
        this.last_port60_byte = 0;
        this.sample_rate = 100;
        this.mouse_id = this.mouse_detect_state = 0;
        this.mouse_reset_workaround = !1;
        this.wheel_movement = 0;
        this.resolution = 4;
        this.scaling2 = !1;
        this.last_mouse_packet = -1;
        this.mouse_buffer = new ByteQueue(1024);
        this.next_byte_is_aux = this.next_byte_is_ready = !1;
        this.bus.register("keyboard-code", function(c) {
            this.kbd_send_code(c)
        }, this);
        this.bus.register("mouse-click", function(c) {
            this.mouse_send_click(c[0], c[1], c[2])
        }, this);
        this.bus.register("mouse-delta", function(c) {
            this.mouse_send_delta(c[0], c[1])
        }, this);
        this.bus.register("mouse-wheel", function(c) {
            this.wheel_movement -= c[0];
            this.wheel_movement -=
                2 * c[1];
            this.wheel_movement = Math.min(7, Math.max(-8, this.wheel_movement));
            this.send_mouse_packet(0, 0)
        }, this);
        this.command_register = 5;
        this.controller_output_port = 0;
        this.read_controller_output_port = this.read_command_register = this.read_output_register = !1;
        a.io.register_read(96, this, this.port60_read);
        a.io.register_read(100, this, this.port64_read);
        a.io.register_write(96, this, this.port60_write);
        a.io.register_write(100, this, this.port64_write)
    }
    PS2.prototype.get_state = function() {
        var a = [];
        a[0] = this.enable_mouse_stream;
        a[1] = this.use_mouse;
        a[2] = this.have_mouse;
        a[3] = this.mouse_delta_x;
        a[4] = this.mouse_delta_y;
        a[5] = this.mouse_clicks;
        a[6] = this.have_keyboard;
        a[7] = this.enable_keyboard_stream;
        a[8] = this.next_is_mouse_command;
        a[9] = this.next_read_sample;
        a[10] = this.next_read_led;
        a[11] = this.next_handle_scan_code_set;
        a[12] = this.next_read_rate;
        a[13] = this.next_read_resolution;
        a[15] = this.last_port60_byte;
        a[16] = this.sample_rate;
        a[17] = this.resolution;
        a[18] =
            this.scaling2;
        a[20] = this.command_register;
        a[21] = this.read_output_register;
        a[22] = this.read_command_register;
        a[23] = this.controller_output_port;
        a[24] = this.read_controller_output_port;
        a[25] = this.mouse_id;
        a[26] = this.mouse_detect_state;
        a[27] = this.mouse_reset_workaround;
        return a
    };
    PS2.prototype.set_state = function(a) {
        this.enable_mouse_stream = a[0];
        this.use_mouse = a[1];
        this.have_mouse = a[2];
        this.mouse_delta_x = a[3];
        this.mouse_delta_y = a[4];
        this.mouse_clicks = a[5];
        this.have_keyboard = a[6];
        this.enable_keyboard_stream = a[7];
        this.next_is_mouse_command = a[8];
        this.next_read_sample = a[9];
        this.next_read_led = a[10];
        this.next_handle_scan_code_set = a[11];
        this.next_read_rate = a[12];
        this.next_read_resolution = a[13];
        this.last_port60_byte = a[15];
        this.sample_rate = a[16];
        this.resolution = a[17];
        this.scaling2 =
            a[18];
        this.command_register = a[20];
        this.read_output_register = a[21];
        this.read_command_register = a[22];
        this.controller_output_port = a[23];
        this.read_controller_output_port = a[24];
        this.mouse_id = a[25] || 0;
        this.mouse_detect_state = a[26] || 0;
        this.mouse_reset_workaround = a[27] || !1;
        this.next_byte_is_aux = this.next_byte_is_ready = !1;
        this.kbd_buffer.clear();
        this.mouse_buffer.clear();
        this.bus.send("mouse-enable", this.use_mouse)
    };
    PS2.prototype.raise_irq = function() {
        this.next_byte_is_ready || (this.kbd_buffer.length ? this.kbd_irq() : this.mouse_buffer.length && this.mouse_irq())
    };
    PS2.prototype.mouse_irq = function() {
        this.next_byte_is_aux = this.next_byte_is_ready = !0;
        this.command_register & 2 && (dbg_log("Mouse irq", LOG_PS2), this.cpu.device_lower_irq(12), this.cpu.device_raise_irq(12))
    };
    PS2.prototype.kbd_irq = function() {
        this.next_byte_is_ready = !0;
        this.next_byte_is_aux = !1;
        this.command_register & 1 && (dbg_log("Keyboard irq", LOG_PS2), this.cpu.device_lower_irq(1), this.cpu.device_raise_irq(1))
    };
    PS2.prototype.kbd_send_code = function(a) {
        this.enable_keyboard_stream && (dbg_log("adding kbd code: " + h(a), LOG_PS2), this.kbd_buffer.push(a), this.raise_irq())
    };
    PS2.prototype.mouse_send_delta = function(a, b) {
        if (this.have_mouse && this.use_mouse) {
            var c = this.resolution * this.sample_rate / 80;
            this.mouse_delta_x += a * c;
            this.mouse_delta_y += b * c;
            this.enable_mouse_stream && (a = this.mouse_delta_x | 0, b = this.mouse_delta_y | 0, a || b) && (Date.now(), this.mouse_delta_x -= a, this.mouse_delta_y -= b, this.send_mouse_packet(a, b))
        }
    };
    PS2.prototype.mouse_send_click = function(a, b, c) {
        this.have_mouse && this.use_mouse && (this.mouse_clicks = a | c << 1 | b << 2, this.enable_mouse_stream && this.send_mouse_packet(0, 0))
    };
    PS2.prototype.send_mouse_packet = function(a, b) {
        var c = (0 > b) << 5 | (0 > a) << 4 | 8 | this.mouse_clicks;
        this.last_mouse_packet = Date.now();
        this.mouse_buffer.push(c);
        this.mouse_buffer.push(a);
        this.mouse_buffer.push(b);
        4 === this.mouse_id ? (this.mouse_buffer.push(0 | this.wheel_movement & 15), this.wheel_movement = 0) : 3 === this.mouse_id && (this.mouse_buffer.push(this.wheel_movement & 255), this.wheel_movement = 0);
        PS2_LOG_VERBOSE && dbg_log("adding mouse packets: " + [c, a, b], LOG_PS2);
        this.raise_irq()
    };
    PS2.prototype.apply_scaling2 = function(a) {
        var b = a >> 31;
        switch (Math.abs(a)) {
            case 0:
            case 1:
            case 3:
                return a;
            case 2:
                return b;
            case 4:
                return 6 * b;
            case 5:
                return 9 * b;
            default:
                return a << 1
        }
    };
    PS2.prototype.port60_read = function() {
        this.next_byte_is_ready = !1;
        if (!this.kbd_buffer.length && !this.mouse_buffer.length) return dbg_log("Port 60 read: Empty", LOG_PS2), this.last_port60_byte;
        this.next_byte_is_aux ? (this.cpu.device_lower_irq(12), this.last_port60_byte = this.mouse_buffer.shift(), dbg_log("Port 60 read (mouse): " + h(this.last_port60_byte), LOG_PS2)) : (this.cpu.device_lower_irq(1), this.last_port60_byte = this.kbd_buffer.shift(), dbg_log("Port 60 read (kbd)  : " + h(this.last_port60_byte), LOG_PS2));
        (this.kbd_buffer.length ||
            this.mouse_buffer.length) && this.raise_irq();
        return this.last_port60_byte
    };
    PS2.prototype.port64_read = function() {
        var a = 16;
        this.next_byte_is_ready && (a |= 1);
        this.next_byte_is_aux && (a |= 32);
        dbg_log("port 64 read: " + h(a), LOG_PS2);
        return a
    };
    PS2.prototype.port60_write = function(a) {
        dbg_log("port 60 write: " + h(a), LOG_PS2);
        if (this.read_command_register) this.command_register = a, this.read_command_register = !1, dbg_log("Keyboard command register = " + h(this.command_register), LOG_PS2);
        else if (this.read_output_register) this.read_output_register = !1, this.mouse_buffer.clear(), this.mouse_buffer.push(a), this.mouse_irq();
        else if (this.next_read_sample) {
            this.next_read_sample = !1;
            this.mouse_buffer.clear();
            this.mouse_buffer.push(250);
            this.sample_rate = a;
            switch (this.mouse_detect_state) {
                case -1:
                    60 ===
                        a ? (this.mouse_reset_workaround = !0, this.mouse_detect_state = 0) : (this.mouse_reset_workaround = !1, this.mouse_detect_state = 200 === a ? 1 : 0);
                    break;
                case 0:
                    200 === a && (this.mouse_detect_state = 1);
                    break;
                case 1:
                    this.mouse_detect_state = 100 === a ? 2 : 200 === a ? 3 : 0;
                    break;
                case 2:
                    80 === a && (this.mouse_id = 3);
                    this.mouse_detect_state = -1;
                    break;
                case 3:
                    80 === a && (this.mouse_id = 4), this.mouse_detect_state = -1
            }
            dbg_log("mouse sample rate: " + h(a) + ", mouse id: " + h(this.mouse_id), LOG_PS2);
            this.sample_rate || (dbg_log("invalid sample rate, reset to 100",
                LOG_PS2), this.sample_rate = 100);
            this.mouse_irq()
        } else if (this.next_read_resolution) this.next_read_resolution = !1, this.mouse_buffer.clear(), this.mouse_buffer.push(250), 3 < a ? (this.resolution = 4, dbg_log("invalid resolution, resetting to 4", LOG_PS2)) : (this.resolution = 1 << a, dbg_log("resolution: " + this.resolution, LOG_PS2)), this.mouse_irq();
        else if (this.next_read_led) this.next_read_led = !1, this.kbd_buffer.push(250), this.kbd_irq();
        else if (this.next_handle_scan_code_set) this.next_handle_scan_code_set = !1, this.kbd_buffer.push(250),
            this.kbd_irq(), a || this.kbd_buffer.push(2);
        else if (this.next_read_rate) this.next_read_rate = !1, this.kbd_buffer.push(250), this.kbd_irq();
        else if (this.next_is_mouse_command) {
            if (this.next_is_mouse_command = !1, dbg_log("Port 60 data register write: " + h(a), LOG_PS2), this.have_mouse) {
                this.kbd_buffer.clear();
                this.mouse_buffer.clear();
                this.mouse_buffer.push(250);
                switch (a) {
                    case 230:
                        dbg_log("Scaling 1:1", LOG_PS2);
                        this.scaling2 = !1;
                        break;
                    case 231:
                        dbg_log("Scaling 2:1", LOG_PS2);
                        this.scaling2 = !0;
                        break;
                    case 232:
                        this.next_read_resolution = !0;
                        break;
                    case 233:
                        this.send_mouse_packet(0, 0);
                        break;
                    case 235:
                        dbg_log("unimplemented request single packet", LOG_PS2);
                        this.send_mouse_packet(0, 0);
                        break;
                    case 242:
                        dbg_log("required id: " + h(this.mouse_id), LOG_PS2);
                        this.mouse_buffer.push(this.mouse_id);
                        this.mouse_clicks = this.mouse_delta_x = this.mouse_delta_y = 0;
                        this.raise_irq();
                        break;
                    case 243:
                        this.next_read_sample = !0;
                        break;
                    case 244:
                        this.use_mouse = this.enable_mouse_stream = !0;
                        this.bus.send("mouse-enable", !0);
                        this.mouse_clicks = this.mouse_delta_x = this.mouse_delta_y =
                            0;
                        break;
                    case 245:
                        this.enable_mouse_stream = !1;
                        break;
                    case 246:
                        this.enable_mouse_stream = !1;
                        this.sample_rate = 100;
                        this.scaling2 = !1;
                        this.resolution = 4;
                        break;
                    case 255:
                        dbg_log("Mouse reset", LOG_PS2);
                        this.mouse_buffer.push(170);
                        this.mouse_buffer.push(0);
                        this.use_mouse = !0;
                        this.bus.send("mouse-enable", !0);
                        this.enable_mouse_stream = !1;
                        this.sample_rate = 100;
                        this.scaling2 = !1;
                        this.resolution = 4;
                        this.mouse_reset_workaround || (this.mouse_id = 0);
                        this.mouse_clicks = this.mouse_delta_x = this.mouse_delta_y = 0;
                        break;
                    default:
                        dbg_log("Unimplemented mouse command: " +
                            h(a), LOG_PS2)
                }
                this.mouse_irq()
            }
        } else if (this.read_controller_output_port) this.read_controller_output_port = !1, this.controller_output_port = a;
        else {
            dbg_log("Port 60 data register write: " + h(a), LOG_PS2);
            this.mouse_buffer.clear();
            this.kbd_buffer.clear();
            this.kbd_buffer.push(250);
            switch (a) {
                case 237:
                    this.next_read_led = !0;
                    break;
                case 240:
                    this.next_handle_scan_code_set = !0;
                    break;
                case 242:
                    this.kbd_buffer.push(171);
                    this.kbd_buffer.push(83);
                    break;
                case 243:
                    this.next_read_rate = !0;
                    break;
                case 244:
                    dbg_log("kbd enable scanning",
                        LOG_PS2);
                    this.enable_keyboard_stream = !0;
                    break;
                case 245:
                    dbg_log("kbd disable scanning", LOG_PS2);
                    this.enable_keyboard_stream = !1;
                    break;
                case 246:
                    break;
                case 255:
                    this.kbd_buffer.clear();
                    this.kbd_buffer.push(250);
                    this.kbd_buffer.push(170);
                    this.kbd_buffer.push(0);
                    break;
                default:
                    dbg_log("Unimplemented keyboard command: " + h(a), LOG_PS2)
            }
            this.kbd_irq()
        }
    };
    PS2.prototype.port64_write = function(a) {
        dbg_log("port 64 write: " + h(a), LOG_PS2);
        switch (a) {
            case 32:
                this.kbd_buffer.clear();
                this.mouse_buffer.clear();
                this.kbd_buffer.push(this.command_register);
                this.kbd_irq();
                break;
            case 96:
                this.read_command_register = !0;
                break;
            case 209:
                this.read_controller_output_port = !0;
                break;
            case 211:
                this.read_output_register = !0;
                break;
            case 212:
                this.next_is_mouse_command = !0;
                break;
            case 167:
                dbg_log("Disable second port", LOG_PS2);
                this.command_register |= 32;
                break;
            case 168:
                dbg_log("Enable second port",
                    LOG_PS2);
                this.command_register &= -33;
                break;
            case 169:
                this.kbd_buffer.clear();
                this.mouse_buffer.clear();
                this.kbd_buffer.push(0);
                this.kbd_irq();
                break;
            case 170:
                this.kbd_buffer.clear();
                this.mouse_buffer.clear();
                this.kbd_buffer.push(85);
                this.kbd_irq();
                break;
            case 171:
                this.kbd_buffer.clear();
                this.mouse_buffer.clear();
                this.kbd_buffer.push(0);
                this.kbd_irq();
                break;
            case 173:
                dbg_log("Disable Keyboard", LOG_PS2);
                this.command_register |= 16;
                break;
            case 174:
                dbg_log("Enable Keyboard", LOG_PS2);
                this.command_register &= -17;
                break;
            case 254:
                dbg_log("CPU reboot via PS2");
                this.cpu.reboot_internal();
                break;
            default:
                dbg_log("port 64: Unimplemented command byte: " + h(a), LOG_PS2)
        }
    };
    var PIC_LOG_VERBOSE = !1;

    function PIC(a, b) {
        this.irq_value = this.irr = this.isr = this.irq_map = this.irq_mask = 0;
        this.requested_irq = -1;
        this.master = b;
        this.is_master = void 0 === this.master;
        this.slave = void 0;
        this.name = this.is_master ? "master" : "slave ";
        this.expect_icw4 = !1;
        this.read_isr = this.state = 0;
        this.auto_eoi = 1;
        this.elcr = this.special_mask_mode = 0;
        this.cpu = a;
        this.is_master ? (this.slave = new PIC(this.cpu, this), this.check_irqs = function() {
            if (0 <= this.requested_irq) PIC_LOG_VERBOSE && dbg_log("master> Already requested irq: " + this.requested_irq,
                LOG_PIC), this.cpu.handle_irqs();
            else {
                var c = this.irr & this.irq_mask;
                if (c) {
                    c &= -c;
                    var d = this.special_mask_mode ? this.irq_mask : -1;
                    this.isr && (this.isr & -this.isr & d) <= c ? dbg_log("master> higher prio: isr=" + h(this.isr, 2) + " mask=" + h(this.irq_mask & 255, 2) + " irq=" + h(c, 2), LOG_PIC) : (dbg_assert(0 !== c), d = v86util.int_log2_byte(c), dbg_assert(c === 1 << d), PIC_LOG_VERBOSE && dbg_log("master> request irq " + d, LOG_PIC), this.requested_irq = d, this.cpu.handle_irqs())
                } else PIC_LOG_VERBOSE && dbg_log("master> no unmasked irrs. irr=" + h(this.irr,
                    2) + " mask=" + h(this.irq_mask & 255, 2) + " isr=" + h(this.isr, 2), LOG_PIC)
            }
        }, this.acknowledge_irq = function() {
            if (-1 !== this.requested_irq)
                if (0 === this.irr) PIC_LOG_VERBOSE && dbg_log("master> spurious requested=" + this.requested_irq, LOG_PIC), this.requested_irq = -1;
                else {
                    dbg_assert(this.irr);
                    dbg_assert(0 <= this.requested_irq);
                    var c = 1 << this.requested_irq;
                    0 === (this.elcr & c) && (this.irr &= ~c);
                    this.auto_eoi || (this.isr |= c);
                    PIC_LOG_VERBOSE && dbg_log("master> acknowledge " + this.requested_irq, LOG_PIC);
                    2 === this.requested_irq ? this.slave.acknowledge_irq() :
                        this.cpu.pic_call_irq(this.irq_map | this.requested_irq);
                    this.requested_irq = -1;
                    this.check_irqs()
                }
        }) : (this.check_irqs = function() {
            if (0 <= this.requested_irq) PIC_LOG_VERBOSE && dbg_log("slave > Already requested irq: " + this.requested_irq, LOG_PIC), this.cpu.handle_irqs();
            else {
                var c = this.irr & this.irq_mask;
                if (c) {
                    c &= -c;
                    var d = this.special_mask_mode ? this.irq_mask : -1;
                    this.isr && (this.isr & -this.isr & d) <= c ? PIC_LOG_VERBOSE && dbg_log("slave > higher prio: isr=" + h(this.isr, 2) + " irq=" + h(c, 2), LOG_PIC) : (dbg_assert(0 !== c), d =
                        v86util.int_log2_byte(c), dbg_assert(c === 1 << d), PIC_LOG_VERBOSE && dbg_log("slave > request irq " + d, LOG_PIC), this.requested_irq = d, this.master.set_irq(2))
                } else PIC_LOG_VERBOSE && dbg_log("slave > no unmasked irrs. irr=" + h(this.irr, 2) + " mask=" + h(this.irq_mask & 255, 2) + " isr=" + h(this.isr, 2), LOG_PIC)
            }
        }, this.acknowledge_irq = function() {
            if (-1 !== this.requested_irq)
                if (0 === this.irr) PIC_LOG_VERBOSE && dbg_log("slave > spurious requested=" + this.requested_irq, LOG_PIC), this.requested_irq = -1, this.master.irq_value &= -5, this.cpu.pic_call_irq(this.irq_map |
                    7);
                else {
                    dbg_assert(this.irr);
                    dbg_assert(0 <= this.requested_irq);
                    var c = 1 << this.requested_irq;
                    0 === (this.elcr & c) && (this.irr &= ~c);
                    this.auto_eoi || (this.isr |= c);
                    this.master.irq_value &= -5;
                    PIC_LOG_VERBOSE && dbg_log("slave > acknowledge " + this.requested_irq, LOG_PIC);
                    this.cpu.pic_call_irq(this.irq_map | this.requested_irq);
                    this.requested_irq = -1;
                    this.check_irqs()
                }
        });
        this.dump = function() {
            dbg_log("mask: " + h(this.irq_mask & 255), LOG_PIC);
            dbg_log("base: " + h(this.irq_map), LOG_PIC);
            dbg_log("requested: " + h(this.irr), LOG_PIC);
            dbg_log("serviced: " + h(this.isr), LOG_PIC);
            this.is_master && this.slave.dump()
        };
        this.is_master ? (a = 32, b = 1232) : (a = 160, b = 1233);
        this.cpu.io.register_write(a, this, this.port20_write);
        this.cpu.io.register_read(a, this, this.port20_read);
        this.cpu.io.register_write(a | 1, this, this.port21_write);
        this.cpu.io.register_read(a | 1, this, this.port21_read);
        this.cpu.io.register_write(b, this, this.port4D0_write);
        this.cpu.io.register_read(b, this, this.port4D0_read);
        this.is_master ? (this.set_irq = function(c) {
            dbg_assert(0 <= c && 16 > c);
            if (8 <= c) this.slave.set_irq(c - 8);
            else {
                var d = 1 << c;
                0 === (this.irq_value & d) ? (PIC_LOG_VERBOSE && dbg_log("master> set irq " + c, LOG_PIC), this.irr |= d, this.irq_value |= d, this.check_irqs()) : PIC_LOG_VERBOSE && dbg_log("master> set irq " + c + ": already set!", LOG_PIC)
            }
        }, this.clear_irq = function(c) {
            dbg_assert(0 <= c && 16 > c);
            PIC_LOG_VERBOSE && dbg_log("master> clear irq " + c, LOG_PIC);
            8 <= c ? this.slave.clear_irq(c - 8) : (c = 1 << c, this.irq_value & c && (this.irq_value &= ~c, this.irr &= ~c, this.check_irqs()))
        }) : (this.set_irq = function(c) {
            dbg_assert(0 <=
                c && 8 > c);
            var d = 1 << c;
            0 === (this.irq_value & d) ? (PIC_LOG_VERBOSE && dbg_log("slave > set irq " + c, LOG_PIC), this.irr |= d, this.irq_value |= d, this.check_irqs()) : PIC_LOG_VERBOSE && dbg_log("slave > set irq " + c + ": already set!", LOG_PIC)
        }, this.clear_irq = function(c) {
            dbg_assert(0 <= c && 8 > c);
            PIC_LOG_VERBOSE && dbg_log("slave > clear irq " + c, LOG_PIC);
            c = 1 << c;
            this.irq_value & c && (this.irq_value &= ~c, this.irr &= ~c, this.check_irqs())
        });
        this.get_isr = function() {
            return this.isr
        }
    }
    PIC.prototype.get_state = function() {
        var a = [];
        a[0] = this.irq_mask;
        a[1] = this.irq_map;
        a[2] = this.isr;
        a[3] = this.irr;
        a[4] = this.is_master;
        a[5] = this.slave;
        a[6] = this.expect_icw4;
        a[7] = this.state;
        a[8] = this.read_isr;
        a[9] = this.auto_eoi;
        a[10] = this.elcr;
        return a
    };
    PIC.prototype.set_state = function(a) {
        this.irq_mask = a[0];
        this.irq_map = a[1];
        this.isr = a[2];
        this.irr = a[3];
        this.is_master = a[4];
        this.slave && this.slave.set_state(a[5]);
        this.expect_icw4 = a[6];
        this.state = a[7];
        this.read_isr = a[8];
        this.auto_eoi = a[9];
        this.elcr = a[10]
    };
    PIC.prototype.port20_write = function(a) {
        if (a & 16) dbg_log("icw1 = " + h(a), LOG_PIC), this.irq_value = this.irq_mask = this.irr = this.isr = 0, this.auto_eoi = 1, this.requested_irq = -1, this.expect_icw4 = a & 1, this.state = 1;
        else if (a & 8) dbg_log("ocw3: " + h(a), LOG_PIC), a & 2 && (this.read_isr = a & 1), a & 4 && dbg_assert(!1, "unimplemented: polling", LOG_PIC), a & 64 && (this.special_mask_mode = 32 === (a & 32), dbg_log("special mask mode: " + this.special_mask_mode, LOG_PIC));
        else {
            dbg_log("eoi: " + h(a) + " (" + this.name + ")", LOG_PIC);
            var b = a >> 5;
            1 === b ? (this.isr &=
                this.isr - 1, dbg_log("new isr: " + h(this.isr, 2), LOG_PIC)) : 3 === b ? this.isr &= ~(1 << (a & 7)) : 192 === (a & 200) ? dbg_log("lowest priority: " + h(a & 7), LOG_PIC) : (dbg_log("Unknown eoi: " + h(a), LOG_PIC), dbg_assert(!1), this.isr &= this.isr - 1);
            this.check_irqs()
        }
    };
    PIC.prototype.port20_read = function() {
        if (this.read_isr) return dbg_log("read port 20h (isr): " + h(this.isr), LOG_PIC), this.isr;
        dbg_log("read port 20h (irr): " + h(this.irr), LOG_PIC);
        return this.irr
    };
    PIC.prototype.port21_write = function(a) {
        0 === this.state ? this.expect_icw4 ? (this.expect_icw4 = !1, this.auto_eoi = a & 2, dbg_log("icw4: " + h(a) + " autoeoi=" + this.auto_eoi, LOG_PIC), 0 === (a & 1) && dbg_assert(!1, "unimplemented: not 8086 mode", LOG_PIC)) : (this.irq_mask = ~a, PIC_LOG_VERBOSE && dbg_log("interrupt mask: " + (this.irq_mask & 255).toString(2) + " (" + this.name + ")", LOG_PIC), this.check_irqs()) : 1 === this.state ? (this.irq_map = a, dbg_log("interrupts are mapped to " + h(this.irq_map) + " (" + this.name + ")", LOG_PIC), this.state++) : 2 ===
            this.state && (this.state = 0, dbg_log("icw3: " + h(a), LOG_PIC))
    };
    PIC.prototype.port21_read = function() {
        dbg_log("21h read " + h(~this.irq_mask & 255), LOG_PIC);
        return ~this.irq_mask & 255
    };
    PIC.prototype.port4D0_read = function() {
        dbg_log("elcr read: " + h(this.elcr, 2), LOG_PIC);
        return this.elcr
    };
    PIC.prototype.port4D0_write = function(a) {
        dbg_log("elcr write: " + h(a, 2), LOG_PIC);
        this.elcr = a
    };
    var CMOS_RTC_SECONDS = 0,
        CMOS_RTC_SECONDS_ALARM = 1,
        CMOS_RTC_MINUTES = 2,
        CMOS_RTC_MINUTES_ALARM = 3,
        CMOS_RTC_HOURS = 4,
        CMOS_RTC_HOURS_ALARM = 5,
        CMOS_RTC_DAY_WEEK = 6,
        CMOS_RTC_DAY_MONTH = 7,
        CMOS_RTC_MONTH = 8,
        CMOS_RTC_YEAR = 9,
        CMOS_STATUS_A = 10,
        CMOS_STATUS_B = 11,
        CMOS_STATUS_C = 12,
        CMOS_STATUS_D = 13,
        CMOS_RESET_CODE = 15,
        CMOS_FLOPPY_DRIVE_TYPE = 16,
        CMOS_DISK_DATA = 18,
        CMOS_EQUIPMENT_INFO = 20,
        CMOS_MEM_BASE_LOW = 21,
        CMOS_MEM_BASE_HIGH = 22,
        CMOS_MEM_OLD_EXT_LOW = 23,
        CMOS_MEM_OLD_EXT_HIGH = 24,
        CMOS_DISK_DRIVE1_TYPE = 25,
        CMOS_DISK_DRIVE2_TYPE = 26,
        CMOS_DISK_DRIVE1_CYL = 27,
        CMOS_DISK_DRIVE2_CYL = 36,
        CMOS_MEM_EXTMEM_LOW = 48,
        CMOS_MEM_EXTMEM_HIGH = 49,
        CMOS_CENTURY = 50,
        CMOS_MEM_EXTMEM2_LOW = 52,
        CMOS_MEM_EXTMEM2_HIGH = 53,
        CMOS_BIOS_BOOTFLAG1 = 56,
        CMOS_BIOS_DISKTRANSFLAG = 57,
        CMOS_BIOS_BOOTFLAG2 = 61,
        CMOS_MEM_HIGHMEM_LOW = 91,
        CMOS_MEM_HIGHMEM_MID = 92,
        CMOS_MEM_HIGHMEM_HIGH = 93,
        CMOS_BIOS_SMP_COUNT = 95;

    function RTC(a) {
        this.cpu = a;
        this.cmos_index = 0;
        this.cmos_data = new Uint8Array(128);
        this.last_update = this.rtc_time = Date.now();
        this.next_interrupt_alarm = this.next_interrupt = 0;
        this.periodic_interrupt = !1;
        this.periodic_interrupt_time = .9765625;
        this.cmos_a = 38;
        this.cmos_b = 2;
        this.nmi_disabled = this.cmos_c = 0;
        a.io.register_write(112, this, function(b) {
            this.cmos_index = b & 127;
            this.nmi_disabled = b >> 7
        });
        a.io.register_write(113, this, this.cmos_port_write);
        a.io.register_read(113, this, this.cmos_port_read)
    }
    RTC.prototype.get_state = function() {
        var a = [];
        a[0] = this.cmos_index;
        a[1] = this.cmos_data;
        a[2] = this.rtc_time;
        a[3] = this.last_update;
        a[4] = this.next_interrupt;
        a[5] = this.next_interrupt_alarm;
        a[6] = this.periodic_interrupt;
        a[7] = this.periodic_interrupt_time;
        a[8] = this.cmos_a;
        a[9] = this.cmos_b;
        a[10] = this.cmos_c;
        a[11] = this.nmi_disabled;
        return a
    };
    RTC.prototype.set_state = function(a) {
        this.cmos_index = a[0];
        this.cmos_data = a[1];
        this.rtc_time = a[2];
        this.last_update = a[3];
        this.next_interrupt = a[4];
        this.next_interrupt_alarm = a[5];
        this.periodic_interrupt = a[6];
        this.periodic_interrupt_time = a[7];
        this.cmos_a = a[8];
        this.cmos_b = a[9];
        this.cmos_c = a[10];
        this.nmi_disabled = a[11]
    };
    RTC.prototype.timer = function(a, b) {
        a = Date.now();
        this.rtc_time += a - this.last_update;
        this.last_update = a;
        this.periodic_interrupt && this.next_interrupt < a ? (this.cpu.device_raise_irq(8), this.cmos_c |= 192, this.next_interrupt += this.periodic_interrupt_time * Math.ceil((a - this.next_interrupt) / this.periodic_interrupt_time)) : this.next_interrupt_alarm && this.next_interrupt_alarm < a && (this.cpu.device_raise_irq(8), this.cmos_c |= 160, this.next_interrupt_alarm = 0);
        b = 100;
        this.periodic_interrupt && this.next_interrupt && (b = Math.min(b,
            Math.max(0, this.next_interrupt - a)));
        this.next_interrupt_alarm && (b = Math.min(b, Math.max(0, this.next_interrupt_alarm - a)));
        return b
    };
    RTC.prototype.bcd_pack = function(a) {
        for (var b = 0, c = 0, d; a;) d = a % 10, c |= d << 4 * b, b++, a = (a - d) / 10;
        return c
    };
    RTC.prototype.bcd_unpack = function(a) {
        const b = a & 15,
            c = a >> 4 & 15;
        dbg_assert(256 > a);
        dbg_assert(10 > b);
        dbg_assert(10 > c);
        return b + 10 * c
    };
    RTC.prototype.encode_time = function(a) {
        return this.cmos_b & 4 ? a : this.bcd_pack(a)
    };
    RTC.prototype.decode_time = function(a) {
        return this.cmos_b & 4 ? a : this.bcd_unpack(a)
    };
    RTC.prototype.cmos_port_read = function() {
        var a = this.cmos_index;
        switch (a) {
            case CMOS_RTC_SECONDS:
                return this.encode_time((new Date(this.rtc_time)).getUTCSeconds());
            case CMOS_RTC_MINUTES:
                return this.encode_time((new Date(this.rtc_time)).getUTCMinutes());
            case CMOS_RTC_HOURS:
                return this.encode_time((new Date(this.rtc_time)).getUTCHours());
            case CMOS_RTC_DAY_MONTH:
                return this.encode_time((new Date(this.rtc_time)).getUTCDate());
            case CMOS_RTC_MONTH:
                return this.encode_time((new Date(this.rtc_time)).getUTCMonth() +
                    1);
            case CMOS_RTC_YEAR:
                return this.encode_time((new Date(this.rtc_time)).getUTCFullYear() % 100);
            case CMOS_STATUS_A:
                return this.cmos_a;
            case CMOS_STATUS_B:
                return this.cmos_b;
            case CMOS_STATUS_C:
                return this.cpu.device_lower_irq(8), dbg_log("cmos reg C read", LOG_RTC), a = this.cmos_c, this.cmos_c &= -241, a;
            case CMOS_STATUS_D:
                return 0;
            case CMOS_CENTURY:
                return this.encode_time((new Date(this.rtc_time)).getUTCFullYear() / 100 | 0);
            default:
                return dbg_log("cmos read from index " + h(a), LOG_RTC), this.cmos_data[this.cmos_index]
        }
    };
    RTC.prototype.cmos_port_write = function(a) {
        switch (this.cmos_index) {
            case 10:
                this.cmos_a = a & 127;
                this.periodic_interrupt_time = 1E3 / (32768 >> (this.cmos_a & 15) - 1);
                dbg_log("Periodic interrupt, a=" + h(this.cmos_a, 2) + " t=" + this.periodic_interrupt_time, LOG_RTC);
                break;
            case 11:
                this.cmos_b = a;
                this.cmos_b & 64 && (this.next_interrupt = Date.now());
                if (this.cmos_b & 32) {
                    a = new Date;
                    const b = this.decode_time(this.cmos_data[CMOS_RTC_SECONDS_ALARM]),
                        c = this.decode_time(this.cmos_data[CMOS_RTC_MINUTES_ALARM]),
                        d = this.decode_time(this.cmos_data[CMOS_RTC_HOURS_ALARM]),
                        e = new Date(Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), d, c, b));
                    dbg_log("RTC alarm scheduled for " + e + " hh:mm:ss=" + d + ":" + c + ":" + b + " ms_from_now=" + (e - a), LOG_RTC);
                    this.next_interrupt_alarm = +e
                }
                this.cmos_b & 16 && dbg_log("Unimplemented: updated interrupt", LOG_RTC);
                dbg_log("cmos b=" + h(this.cmos_b, 2), LOG_RTC);
                break;
            case CMOS_RTC_SECONDS_ALARM:
            case CMOS_RTC_MINUTES_ALARM:
            case CMOS_RTC_HOURS_ALARM:
                this.cmos_write(this.cmos_index, a);
                break;
            default:
                dbg_log("cmos write index " + h(this.cmos_index) + ": " +
                    h(a), LOG_RTC)
        }
        this.periodic_interrupt = 64 === (this.cmos_b & 64) && 0 < (this.cmos_a & 15)
    };
    RTC.prototype.cmos_read = function(a) {
        dbg_assert(128 > a);
        return this.cmos_data[a]
    };
    RTC.prototype.cmos_write = function(a, b) {
        dbg_log("cmos " + h(a) + " <- " + h(b), LOG_RTC);
        dbg_assert(128 > a);
        this.cmos_data[a] = b
    };
    var DLAB = 128,
        UART_IER_MSI = 8,
        UART_IER_THRI = 2,
        UART_IER_RDI = 1,
        UART_IIR_MSI = 0,
        UART_IIR_NO_INT = 1,
        UART_IIR_THRI = 2,
        UART_IIR_RDI = 4,
        UART_IIR_RLSI = 6,
        UART_IIR_CTI = 12,
        UART_LSR_DATA_READY = 1,
        UART_LSR_TX_EMPTY = 32,
        UART_LSR_TRANSMITTER_EMPTY = 64;

    function UART(a, b, c) {
        this.bus = c;
        this.cpu = a;
        this.ints = 1 << UART_IIR_THRI;
        this.line_control = this.baud_rate = 0;
        this.lsr = UART_LSR_TRANSMITTER_EMPTY | UART_LSR_TX_EMPTY;
        this.ier = this.fifo_control = 0;
        this.iir = UART_IIR_NO_INT;
        this.irq = this.scratch_register = this.modem_status = this.modem_control = 0;
        this.input = new ByteQueue(4096);
        this.current_line = [];
        switch (b) {
            case 1016:
                this.com = 0;
                this.irq = 4;
                break;
            case 760:
                this.com = 1;
                this.irq = 3;
                break;
            case 1E3:
                this.com = 2;
                this.irq = 4;
                break;
            case 744:
                this.irq = this.com = 3;
                break;
            default:
                dbg_log("Invalid serial port: " +
                    h(b), LOG_SERIAL), this.com = 0, this.irq = 4
        }
        this.bus.register("serial" + this.com + "-input", function(d) {
            this.data_received(d)
        }, this);
        a = a.io;
        a.register_write(b, this, function(d) {
            this.write_data(d)
        }, function(d) {
            this.write_data(d & 255);
            this.write_data(d >> 8)
        });
        a.register_write(b | 1, this, function(d) {
            this.line_control & DLAB ? (this.baud_rate = this.baud_rate & 255 | d << 8, dbg_log("baud rate: " + h(this.baud_rate), LOG_SERIAL)) : (0 === (this.ier & UART_IIR_THRI) && d & UART_IIR_THRI && this.ThrowInterrupt(UART_IIR_THRI), this.ier = d & 15, dbg_log("interrupt enable: " +
                h(d), LOG_SERIAL), this.CheckInterrupt())
        });
        a.register_read(b, this, function() {
            if (this.line_control & DLAB) return this.baud_rate & 255;
            var d = this.input.shift(); - 1 === d ? dbg_log("Read input empty", LOG_SERIAL) : dbg_log("Read input: " + h(d), LOG_SERIAL);
            0 === this.input.length && (this.lsr &= ~UART_LSR_DATA_READY, this.ClearInterrupt(UART_IIR_CTI), this.ClearInterrupt(UART_IIR_RDI));
            return d
        });
        a.register_read(b | 1, this, function() {
            return this.line_control & DLAB ? this.baud_rate >> 8 : this.ier & 15
        });
        a.register_read(b | 2, this, function() {
            var d =
                this.iir & 15;
            dbg_log("read interrupt identification: " + h(this.iir), LOG_SERIAL);
            this.iir == UART_IIR_THRI && this.ClearInterrupt(UART_IIR_THRI);
            this.fifo_control & 1 && (d |= 192);
            return d
        });
        a.register_write(b | 2, this, function(d) {
            dbg_log("fifo control: " + h(d), LOG_SERIAL);
            this.fifo_control = d
        });
        a.register_read(b | 3, this, function() {
            dbg_log("read line control: " + h(this.line_control), LOG_SERIAL);
            return this.line_control
        });
        a.register_write(b | 3, this, function(d) {
            dbg_log("line control: " + h(d), LOG_SERIAL);
            this.line_control =
                d
        });
        a.register_read(b | 4, this, function() {
            return this.modem_control
        });
        a.register_write(b | 4, this, function(d) {
            dbg_log("modem control: " + h(d), LOG_SERIAL);
            this.modem_control = d
        });
        a.register_read(b | 5, this, function() {
            dbg_log("read line status: " + h(this.lsr), LOG_SERIAL);
            return this.lsr
        });
        a.register_write(b | 5, this, function(d) {
            dbg_log("Factory test write", LOG_SERIAL)
        });
        a.register_read(b | 6, this, function() {
            dbg_log("read modem status: " + h(this.modem_status), LOG_SERIAL);
            return this.modem_status
        });
        a.register_write(b |
            6, this,
            function(d) {
                dbg_log("Unkown register write (base+6)", LOG_SERIAL)
            });
        a.register_read(b | 7, this, function() {
            return this.scratch_register
        });
        a.register_write(b | 7, this, function(d) {
            this.scratch_register = d
        })
    }
    UART.prototype.get_state = function() {
        var a = [];
        a[0] = this.ints;
        a[1] = this.baud_rate;
        a[2] = this.line_control;
        a[3] = this.lsr;
        a[4] = this.fifo_control;
        a[5] = this.ier;
        a[6] = this.iir;
        a[7] = this.modem_control;
        a[8] = this.modem_status;
        a[9] = this.scratch_register;
        a[10] = this.irq;
        return a
    };
    UART.prototype.set_state = function(a) {
        this.ints = a[0];
        this.baud_rate = a[1];
        this.line_control = a[2];
        this.lsr = a[3];
        this.fifo_control = a[4];
        this.ier = a[5];
        this.iir = a[6];
        this.modem_control = a[7];
        this.modem_status = a[8];
        this.scratch_register = a[9];
        this.irq = a[10]
    };
    UART.prototype.CheckInterrupt = function() {
        this.ints & 1 << UART_IIR_CTI && this.ier & UART_IER_RDI ? (this.iir = UART_IIR_CTI, this.cpu.device_raise_irq(this.irq)) : this.ints & 1 << UART_IIR_RDI && this.ier & UART_IER_RDI ? (this.iir = UART_IIR_RDI, this.cpu.device_raise_irq(this.irq)) : this.ints & 1 << UART_IIR_THRI && this.ier & UART_IER_THRI ? (this.iir = UART_IIR_THRI, this.cpu.device_raise_irq(this.irq)) : this.ints & 1 << UART_IIR_MSI && this.ier & UART_IER_MSI ? (this.iir = UART_IIR_MSI, this.cpu.device_raise_irq(this.irq)) : (this.iir = UART_IIR_NO_INT,
            this.cpu.device_lower_irq(this.irq))
    };
    UART.prototype.ThrowInterrupt = function(a) {
        this.ints |= 1 << a;
        this.CheckInterrupt()
    };
    UART.prototype.ClearInterrupt = function(a) {
        this.ints &= ~(1 << a);
        this.CheckInterrupt()
    };
    UART.prototype.data_received = function(a) {
        dbg_log("input: " + h(a), LOG_SERIAL);
        this.input.push(a);
        this.lsr |= UART_LSR_DATA_READY;
        this.fifo_control & 1 ? this.ThrowInterrupt(UART_IIR_CTI) : this.ThrowInterrupt(UART_IIR_RDI)
    };
    UART.prototype.write_data = function(a) {
        if (this.line_control & DLAB) this.baud_rate = this.baud_rate & -256 | a;
        else if (dbg_log("data: " + h(a), LOG_SERIAL), this.ThrowInterrupt(UART_IIR_THRI), 255 !== a) {
            var b = String.fromCharCode(a);
            this.bus.send("serial" + this.com + "-output-char", b);
            this.current_line.push(a);
            "\n" === b && (a = String.fromCharCode.apply("", this.current_line).trimRight().replace(/[\x00-\x08\x0b-\x1f\x7f\x80-\xff]/g, ""), dbg_log("SERIAL: " + a), this.bus.send("serial" + this.com + "-output-line", String.fromCharCode.apply("",
                this.current_line)), this.current_line = [])
        }
    };
    var HPET_ADDR = 4275044352,
        HPET_PERIOD = 1E8,
        HPET_FREQ_MS = 1E12 / HPET_PERIOD,
        HPET_SUPPORT_64 = 0,
        HPET_COUNTER_CONFIG = 16 | HPET_SUPPORT_64 << 5,
        HPET_COUNTER_CONFIG_MASK = 32816,
        HPET_NUM_COUNTERS = 4;

    function HPET(a) {
        function b() {
            return e ? (Date.now() - f) * HPET_FREQ_MS + g | 0 : g
        }

        function c() {
            return HPET_SUPPORT_64 ? e ? (Date.now() - f) * (HPET_FREQ_MS / 4294967296) + k | 0 : k : 0
        }
        var d = this,
            e = !1,
            f = Date.now(),
            g = 0,
            k = 0,
            l = !1,
            m = 0,
            n = new Int32Array(HPET_NUM_COUNTERS << 1),
            p = new Int32Array(HPET_NUM_COUNTERS << 1),
            t = new Int32Array(HPET_NUM_COUNTERS << 1),
            q = 0;
        this.legacy_mode = !1;
        this.timer = function(r) {
            if (!e) return 100;
            r = b() >>> 0;
            for (var v, u, x = 0; x < HPET_NUM_COUNTERS; x++)
                if (v = n[x << 1], u = p[x << 1] >>> 0, q <= r ? u > q && u <= r : u > q || u <= r) u = v & 4, v & 2 ? (u =
                    u && !(m & 1 << x), m |= 1 << x) : m &= ~(1 << x), v & 8 && (p[x << 1] += t[x << 1]), u && a.device_raise_irq(0);
            q = r;
            return 100
        };
        a.io.mmap_register(HPET_ADDR, 16384, function(r) {
            dbg_log("Read " + h(r, 4) + " (ctr=" + h(b() >>> 0) + ")", LOG_HPET);
            switch (r) {
                case 0:
                    return HPET_NUM_COUNTERS - 1 << 8 | 98305 | HPET_SUPPORT_64 << 13;
                case 4:
                    return HPET_PERIOD;
                case 16:
                    return d.legacy_mode << 1 | e;
                case 240:
                    return b();
                case 244:
                    return c()
            }
            var v = r >> 2 & 7,
                u = r - 256 >> 5;
            if (256 > r || u >= HPET_NUM_COUNTERS || 5 < v) return dbg_log("Read reserved address: " + h(r), LOG_HPET), 0;
            dbg_log("Read counter: addr=" +
                h(r) + " counter=" + h(u, 2) + " reg=" + h(v), LOG_HPET);
            switch (v) {
                case 0:
                    return n[u << 1] & ~HPET_COUNTER_CONFIG_MASK | HPET_COUNTER_CONFIG;
                case 1:
                    return n[u << 1 | 1];
                case 2:
                    return p[u << 1];
                case 3:
                    return p[u << 1 | 1];
                case 4:
                case 5:
                    return 0
            }
        }, function(r, v) {
            dbg_log("Write " + h(r, 4) + ": " + h(v, 2), LOG_HPET);
            switch (r) {
                case 16:
                    dbg_log("conf: enabled=" + (v & 1) + " legacy=" + (v >> 1 & 1), LOG_HPET);
                    (e ^ v) & 1 && (v & 1 ? f = Date.now() : (g = b(), k = c()));
                    e = 1 === (v & 1);
                    d.legacy_mode = 2 === (v & 2);
                    return;
                case 32:
                    m &= ~v;
                    return;
                case 240:
                    g = v;
                    return;
                case 244:
                    k = v;
                    return
            }
            var u =
                r >> 2 & 7,
                x = r - 256 >> 5;
            if (256 > r || x >= HPET_NUM_COUNTERS || 2 < u) dbg_log("Write reserved address: " + h(r) + " data=" + h(v), LOG_HPET);
            else switch (dbg_log("Write counter: addr=" + h(r) + " counter=" + h(x, 2) + " reg=" + h(u) + " data=" + h(v, 2), LOG_HPET), u) {
                case 0:
                    n[x << 1] = v;
                    break;
                case 2:
                    l ? (t[x << 1] = v, l = !1, dbg_log("Accumulator acc=" + h(v >>> 0, 8) + " ctr=" + h(x, 2), LOG_HPET)) : (p[x << 1] = v, n[x << 1] & 64 && (l = !0, n[x << 1] &= -65));
                    break;
                case 3:
                    p[x << 1 | 1] = v
            }
        })
    };
    var PMTIMER_FREQ_SECONDS = 3579545;

    function ACPI(a) {
        this.cpu = a;
        var b = a.io;
        a.devices.pci.register_device({
            pci_id: 56,
            pci_space: [134, 128, 19, 113, 7, 0, 128, 2, 8, 0, 128, 6, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 0, 0],
            pci_bars: [],
            name: "acpi"
        });
        this.timer_imprecision_offset = this.timer_last_value = 0;
        this.status = 1;
        this.pm1_enable = this.pm1_status = 0;
        this.last_timer = this.get_timer(v86.microtick());
        this.gpe = new Uint8Array(4);
        b.register_read(45056, this, void 0, function() {
            dbg_log("ACPI pm1_status read",
                LOG_ACPI);
            return this.pm1_status
        });
        b.register_write(45056, this, void 0, function(c) {
            dbg_log("ACPI pm1_status write: " + h(c, 4), LOG_ACPI);
            this.pm1_status &= ~c
        });
        b.register_read(45058, this, void 0, function() {
            dbg_log("ACPI pm1_enable read", LOG_ACPI);
            return this.pm1_enable
        });
        b.register_write(45058, this, void 0, function(c) {
            dbg_log("ACPI pm1_enable write: " + h(c), LOG_ACPI);
            this.pm1_enable = c
        });
        b.register_read(45060, this, void 0, function() {
            dbg_log("ACPI status read", LOG_ACPI);
            return this.status
        });
        b.register_write(45060,
            this, void 0,
            function(c) {
                dbg_log("ACPI status write: " + h(c), LOG_ACPI);
                this.status = c
            });
        b.register_read(45064, this, void 0, void 0, function() {
            return this.get_timer(v86.microtick()) & 16777215
        });
        b.register_read(45024, this, function() {
            dbg_log("Read gpe#0", LOG_ACPI);
            return this.gpe[0]
        });
        b.register_read(45025, this, function() {
            dbg_log("Read gpe#1", LOG_ACPI);
            return this.gpe[1]
        });
        b.register_read(45026, this, function() {
            dbg_log("Read gpe#2", LOG_ACPI);
            return this.gpe[2]
        });
        b.register_read(45027, this, function() {
            dbg_log("Read gpe#3",
                LOG_ACPI);
            return this.gpe[3]
        });
        b.register_write(45024, this, function(c) {
            dbg_log("Write gpe#0: " + h(c), LOG_ACPI);
            this.gpe[0] = c
        });
        b.register_write(45025, this, function(c) {
            dbg_log("Write gpe#1: " + h(c), LOG_ACPI);
            this.gpe[1] = c
        });
        b.register_write(45026, this, function(c) {
            dbg_log("Write gpe#2: " + h(c), LOG_ACPI);
            this.gpe[2] = c
        });
        b.register_write(45027, this, function(c) {
            dbg_log("Write gpe#3: " + h(c), LOG_ACPI);
            this.gpe[3] = c
        })
    }
    ACPI.prototype.timer = function(a) {
        a = this.get_timer(a);
        var b = 0 !== ((a ^ this.last_timer) & 8388608);
        this.pm1_enable & 1 && b ? (dbg_log("ACPI raise irq", LOG_ACPI), this.pm1_status |= 1, this.cpu.device_raise_irq(9)) : this.cpu.device_lower_irq(9);
        this.last_timer = a;
        return 100
    };
    ACPI.prototype.get_timer = function(a) {
        a = Math.round(PMTIMER_FREQ_SECONDS / 1E3 * a);
        a === this.timer_last_value ? this.timer_imprecision_offset < PMTIMER_FREQ_SECONDS / 1E3 && this.timer_imprecision_offset++ : (dbg_assert(a > this.timer_last_value), this.timer_last_value + this.timer_imprecision_offset <= a ? (this.timer_imprecision_offset = 0, this.timer_last_value = a) : dbg_log("Warning: Overshot pmtimer, waiting; current=" + a + " last=" + this.timer_last_value + " offset=" + this.timer_imprecision_offset, LOG_ACPI));
        return this.timer_last_value +
            this.timer_imprecision_offset
    };
    ACPI.prototype.get_state = function() {
        var a = [];
        a[0] = this.status;
        a[1] = this.pm1_status;
        a[2] = this.pm1_enable;
        a[3] = this.gpe;
        return a
    };
    ACPI.prototype.set_state = function(a) {
        this.status = a[0];
        this.pm1_status = a[1];
        this.pm1_enable = a[2];
        this.gpe = a[3]
    };
    var APIC_LOG_VERBOSE = !1,
        APIC_ADDRESS = 4276092928,
        APIC_TIMER_MODE_MASK = 393216,
        APIC_TIMER_MODE_ONE_SHOT = 0,
        APIC_TIMER_MODE_PERIODIC = 131072,
        APIC_TIMER_MODE_TSC = 262144,
        DELIVERY_MODES = "Fixed (0);Lowest Prio (1);SMI (2);Reserved (3);NMI (4);INIT (5);Reserved (6);ExtINT (7)".split(";"),
        DESTINATION_MODES = ["physical", "logical"];

    function APIC(a) {
        this.cpu = a;
        this.timer_divider = this.apic_id = 0;
        this.timer_divider_shift = 1;
        this.timer_current_count = this.timer_initial_count = 0;
        this.next_tick = v86.microtick();
        this.lvt_error = this.lvt_int1 = this.lvt_int0 = this.lvt_perf_counter = this.lvt_timer = IOAPIC_CONFIG_MASKED;
        this.icr1 = this.icr0 = this.tpr = 0;
        this.irr = new Int32Array(8);
        this.isr = new Int32Array(8);
        this.tmr = new Int32Array(8);
        this.spurious_vector = 254;
        this.destination_format = -1;
        this.read_error = this.error = this.local_destination = 0;
        a.io.mmap_register(APIC_ADDRESS,
            1048576, b => {
                dbg_log("Unsupported read8 from apic: " + h(b >>> 0), LOG_APIC);
                var c = b & 3;
                return this.read32(b & -4) >> 8 * c & 255
            }, (b, c) => {
                dbg_log("Unsupported write8 from apic: " + h(b) + " <- " + h(c), LOG_APIC);
                dbg_trace();
                dbg_assert(!1)
            }, b => this.read32(b), (b, c) => this.write32(b, c))
    }
    APIC.prototype.read32 = function(a) {
        a = a - APIC_ADDRESS | 0;
        switch (a) {
            case 32:
                return dbg_log("APIC read id", LOG_APIC), this.apic_id;
            case 48:
                return dbg_log("APIC read version", LOG_APIC), 327700;
            case 128:
                return APIC_LOG_VERBOSE && dbg_log("APIC read tpr", LOG_APIC), this.tpr;
            case 208:
                return dbg_log("Read local destination", LOG_APIC), this.local_destination;
            case 224:
                return dbg_log("Read destination format", LOG_APIC), this.destination_format;
            case 240:
                return this.spurious_vector;
            case 256:
            case 272:
            case 288:
            case 304:
            case 320:
            case 336:
            case 352:
            case 368:
                return a =
                    a - 256 >> 4, dbg_log("Read isr " + a + ": " + h(this.isr[a] >>> 0, 8), LOG_APIC), this.isr[a];
            case 384:
            case 400:
            case 416:
            case 432:
            case 448:
            case 464:
            case 480:
            case 496:
                return a = a - 384 >> 4, dbg_log("Read tmr " + a + ": " + h(this.tmr[a] >>> 0, 8), LOG_APIC), this.tmr[a];
            case 512:
            case 528:
            case 544:
            case 560:
            case 576:
            case 592:
            case 608:
            case 624:
                return a = a - 512 >> 4, dbg_log("Read irr " + a + ": " + h(this.irr[a] >>> 0, 8), LOG_APIC), this.irr[a];
            case 640:
                return dbg_log("Read error: " + h(this.read_error >>> 0, 8), LOG_APIC), this.read_error;
            case 768:
                return APIC_LOG_VERBOSE &&
                    dbg_log("APIC read icr0", LOG_APIC), this.icr0;
            case 784:
                return dbg_log("APIC read icr1", LOG_APIC), this.icr1;
            case 800:
                return dbg_log("read timer lvt", LOG_APIC), this.lvt_timer;
            case 832:
                return dbg_log("read lvt perf counter", LOG_APIC), this.lvt_perf_counter;
            case 848:
                return dbg_log("read lvt int0", LOG_APIC), this.lvt_int0;
            case 864:
                return dbg_log("read lvt int1", LOG_APIC), this.lvt_int1;
            case 880:
                return dbg_log("read lvt error", LOG_APIC), this.lvt_error;
            case 992:
                return dbg_log("read timer divider", LOG_APIC),
                    this.timer_divider;
            case 896:
                return dbg_log("read timer initial count", LOG_APIC), this.timer_initial_count;
            case 912:
                return dbg_log("read timer current count: " + h(this.timer_current_count >>> 0, 8), LOG_APIC), this.timer_current_count;
            default:
                return dbg_log("APIC read " + h(a), LOG_APIC), dbg_assert(!1), 0
        }
    };
    APIC.prototype.write32 = function(a, b) {
        a = a - APIC_ADDRESS | 0;
        switch (a) {
            case 48:
                dbg_log("APIC write version: " + h(b >>> 0, 8) + ", ignored", LOG_APIC);
                break;
            case 128:
                APIC_LOG_VERBOSE && dbg_log("Set tpr: " + h(b & 255, 2), LOG_APIC);
                this.tpr = b & 255;
                this.check_vector();
                break;
            case 176:
                a = this.highest_isr(); - 1 !== a ? (APIC_LOG_VERBOSE && dbg_log("eoi: " + h(b >>> 0, 8) + " for vector " + h(a), LOG_APIC), this.register_clear_bit(this.isr, a), this.register_get_bit(this.tmr, a) && this.cpu.devices.ioapic.remote_eoi(a), this.check_vector()) : dbg_log("Bad eoi: No isr set",
                    LOG_APIC);
                break;
            case 208:
                dbg_log("Set local destination: " + h(b >>> 0, 8), LOG_APIC);
                this.local_destination = b & 4278190080;
                break;
            case 224:
                dbg_log("Set destination format: " + h(b >>> 0, 8), LOG_APIC);
                this.destination_format = b | 16777215;
                break;
            case 240:
                dbg_log("Set spurious vector: " + h(b >>> 0, 8), LOG_APIC);
                this.spurious_vector = b;
                break;
            case 640:
                dbg_log("Write error: " + h(b >>> 0, 8), LOG_APIC);
                this.read_error = this.error;
                this.error = 0;
                break;
            case 768:
                a = b & 255;
                var c = b >> 8 & 7,
                    d = b >> 11 & 1,
                    e = b >> 15 & 1,
                    f = b >> 18 & 3,
                    g = this.icr1 >>> 24;
                dbg_log("APIC write icr0: " +
                    h(b, 8) + " vector=" + h(a, 2) + " destination_mode=" + DESTINATION_MODES[d] + " delivery_mode=" + DELIVERY_MODES[c] + " destination_shorthand=" + ["no", "self", "all with self", "all without self"][f], LOG_APIC);
                this.icr0 = b & -4097;
                0 === f ? this.route(a, c, e, g, d) : 1 === f ? this.deliver(a, IOAPIC_DELIVERY_FIXED, e) : 2 === f ? this.deliver(a, c, e) : 3 !== f && dbg_assert(!1);
                break;
            case 784:
                dbg_log("APIC write icr1: " + h(b >>> 0, 8), LOG_APIC);
                this.icr1 = b;
                break;
            case 800:
                dbg_log("timer lvt: " + h(b >>> 0, 8), LOG_APIC);
                this.lvt_timer = b;
                break;
            case 832:
                dbg_log("lvt perf counter: " +
                    h(b >>> 0, 8), LOG_APIC);
                this.lvt_perf_counter = b;
                break;
            case 848:
                dbg_log("lvt int0: " + h(b >>> 0, 8), LOG_APIC);
                this.lvt_int0 = b;
                break;
            case 864:
                dbg_log("lvt int1: " + h(b >>> 0, 8), LOG_APIC);
                this.lvt_int1 = b;
                break;
            case 880:
                dbg_log("lvt error: " + h(b >>> 0, 8), LOG_APIC);
                this.lvt_error = b;
                break;
            case 992:
                dbg_log("timer divider: " + h(b >>> 0, 8), LOG_APIC);
                this.timer_divider = b;
                b = b & 3 | (b & 8) >> 1;
                this.timer_divider_shift = 7 === b ? 0 : b + 1;
                break;
            case 896:
                dbg_log("timer initial: " + h(b >>> 0, 8), LOG_APIC);
                this.timer_initial_count = b >>> 0;
                this.timer_current_count =
                    b >>> 0;
                this.next_tick = v86.microtick();
                this.timer_active = !0;
                break;
            case 912:
                dbg_log("timer current: " + h(b >>> 0, 8), LOG_APIC);
                dbg_assert(!1, "read-only register");
                break;
            default:
                dbg_log("APIC write32 " + h(a) + " <- " + h(b >>> 0, 8), LOG_APIC), dbg_assert(!1)
        }
    };
    APIC.prototype.timer = function(a) {
        if (0 === this.timer_current_count) return 100;
        const b = TSC_RATE / (1 << this.timer_divider_shift);
        a = (a - this.next_tick) * b >>> 0;
        this.next_tick += a / b;
        this.timer_current_count -= a;
        0 >= this.timer_current_count && (a = this.lvt_timer & APIC_TIMER_MODE_MASK, a === APIC_TIMER_MODE_PERIODIC ? (this.timer_current_count %= this.timer_initial_count, 0 >= this.timer_current_count && (this.timer_current_count += this.timer_initial_count), dbg_assert(0 !== this.timer_current_count), 0 === (this.lvt_timer & IOAPIC_CONFIG_MASKED) &&
            this.deliver(this.lvt_timer & 255, IOAPIC_DELIVERY_FIXED, !1)) : a === APIC_TIMER_MODE_ONE_SHOT && (this.timer_current_count = 0, dbg_log("APIC timer one shot end", LOG_APIC), 0 === (this.lvt_timer & IOAPIC_CONFIG_MASKED) && this.deliver(this.lvt_timer & 255, IOAPIC_DELIVERY_FIXED, !1)));
        return Math.max(0, this.timer_current_count / b)
    };
    APIC.prototype.route = function(a, b, c, d, e) {
        this.deliver(a, b, c)
    };
    APIC.prototype.deliver = function(a, b, c) {
        APIC_LOG_VERBOSE && dbg_log("Deliver " + h(a, 2) + " mode=" + b + " level=" + c, LOG_APIC);
        b !== IOAPIC_DELIVERY_INIT && b !== IOAPIC_DELIVERY_NMI && ((16 > a || 255 === a) && dbg_assert(!1, "TODO: Invalid vector"), this.register_get_bit(this.irr, a) ? dbg_log("Not delivered: irr already set, vector=" + h(a, 2), LOG_APIC) : (this.register_set_bit(this.irr, a), c ? this.register_set_bit(this.tmr, a) : this.register_clear_bit(this.tmr, a), this.check_vector()))
    };
    APIC.prototype.highest_irr = function() {
        var a = this.register_get_highest_bit(this.irr);
        dbg_assert(255 !== a);
        dbg_assert(16 <= a || -1 === a);
        return a
    };
    APIC.prototype.highest_isr = function() {
        var a = this.register_get_highest_bit(this.isr);
        dbg_assert(255 !== a);
        dbg_assert(16 <= a || -1 === a);
        return a
    };
    APIC.prototype.check_vector = function() {
        var a = this.highest_irr();
        if (-1 !== a) {
            var b = this.highest_isr();
            b >= a ? APIC_LOG_VERBOSE && dbg_log("Higher isr, isr=" + h(b) + " irr=" + h(a), LOG_APIC) : (a & 240) <= (this.tpr & 240) ? APIC_LOG_VERBOSE && dbg_log("Higher tpr, tpr=" + h(this.tpr & 240) + " irr=" + h(a), LOG_APIC) : this.cpu.handle_irqs()
        }
    };
    APIC.prototype.acknowledge_irq = function() {
        var a = this.highest_irr();
        if (-1 !== a) {
            var b = this.highest_isr();
            b >= a ? APIC_LOG_VERBOSE && dbg_log("Higher isr, isr=" + h(b) + " irr=" + h(a), LOG_APIC) : (a & 240) <= (this.tpr & 240) ? APIC_LOG_VERBOSE && dbg_log("Higher tpr, tpr=" + h(this.tpr & 240) + " irr=" + h(a), LOG_APIC) : (this.register_clear_bit(this.irr, a), this.register_set_bit(this.isr, a), APIC_LOG_VERBOSE && dbg_log("Calling vector " + h(a), LOG_APIC), this.cpu.pic_call_irq(a), this.check_vector())
        }
    };
    APIC.prototype.get_state = function() {
        var a = [];
        a[0] = this.apic_id;
        a[1] = this.timer_divider;
        a[2] = this.timer_divider_shift;
        a[3] = this.timer_initial_count;
        a[4] = this.timer_current_count;
        a[5] = this.next_tick;
        a[6] = this.lvt_timer;
        a[7] = this.lvt_perf_counter;
        a[8] = this.lvt_int0;
        a[9] = this.lvt_int1;
        a[10] = this.lvt_error;
        a[11] = this.tpr;
        a[12] = this.icr0;
        a[13] = this.icr1;
        a[14] = this.irr;
        a[15] = this.isr;
        a[16] = this.tmr;
        a[17] = this.spurious_vector;
        a[18] = this.destination_format;
        a[19] = this.local_destination;
        a[20] = this.error;
        a[21] =
            this.read_error;
        return a
    };
    APIC.prototype.set_state = function(a) {
        this.apic_id = a[0];
        this.timer_divider = a[1];
        this.timer_divider_shift = a[2];
        this.timer_initial_count = a[3];
        this.timer_current_count = a[4];
        this.next_tick = a[5];
        this.lvt_timer = a[6];
        this.lvt_perf_counter = a[7];
        this.lvt_int0 = a[8];
        this.lvt_int1 = a[9];
        this.lvt_error = a[10];
        this.tpr = a[11];
        this.icr0 = a[12];
        this.icr1 = a[13];
        this.irr = a[14];
        this.isr = a[15];
        this.tmr = a[16];
        this.spurious_vector = a[17];
        this.destination_format = a[18];
        this.local_destination = a[19];
        this.error = a[20];
        this.read_error =
            a[21]
    };
    APIC.prototype.register_get_bit = function(a, b) {
        dbg_assert(0 <= b && 256 > b);
        return a[b >> 5] >> (b & 31) & 1
    };
    APIC.prototype.register_set_bit = function(a, b) {
        dbg_assert(0 <= b && 256 > b);
        a[b >> 5] |= 1 << (b & 31)
    };
    APIC.prototype.register_clear_bit = function(a, b) {
        dbg_assert(0 <= b && 256 > b);
        a[b >> 5] &= ~(1 << (b & 31))
    };
    APIC.prototype.register_get_highest_bit = function(a) {
        for (var b = 7; 0 <= b; b--) {
            var c = a[b];
            if (c) return v86util.int_log2(c >>> 0) | b << 5
        }
        return -1
    };
    var IOAPIC_ADDRESS = 4273995776,
        IOREGSEL = 0,
        IOWIN = 16,
        IOAPIC_IRQ_COUNT = 24,
        IOAPIC_ID = 0,
        IOAPIC_CONFIG_TRIGGER_MODE_LEVEL = 32768,
        IOAPIC_CONFIG_MASKED = 65536,
        IOAPIC_CONFIG_DELIVS = 4096,
        IOAPIC_CONFIG_REMOTE_IRR = 16384,
        IOAPIC_CONFIG_READONLY_MASK = IOAPIC_CONFIG_REMOTE_IRR | IOAPIC_CONFIG_DELIVS | 4294836224,
        IOAPIC_DELIVERY_FIXED = 0,
        IOAPIC_DELIVERY_LOWEST_PRIORITY = 1,
        IOAPIC_DELIVERY_NMI = 4,
        IOAPIC_DELIVERY_INIT = 5;

    function IOAPIC(a) {
        this.cpu = a;
        this.ioredtbl_config = new Int32Array(IOAPIC_IRQ_COUNT);
        this.ioredtbl_destination = new Int32Array(IOAPIC_IRQ_COUNT);
        for (var b = 0; b < this.ioredtbl_config.length; b++) this.ioredtbl_config[b] = IOAPIC_CONFIG_MASKED;
        this.ioregsel = 0;
        this.ioapic_id = IOAPIC_ID;
        this.irq_value = this.irr = 0;
        dbg_assert(32 <= MMAP_BLOCK_SIZE);
        a.io.mmap_register(IOAPIC_ADDRESS, MMAP_BLOCK_SIZE, c => {
            c = c - IOAPIC_ADDRESS | 0;
            if (c >= IOWIN && c < IOWIN + 4) return c -= IOWIN, dbg_log("ioapic read8 byte " + c + " " + h(this.ioregsel), LOG_APIC),
                this.read(this.ioregsel) >> 8 * c & 255;
            dbg_log("Unexpected IOAPIC register read: " + h(c >>> 0), LOG_APIC);
            dbg_assert(!1);
            return 0
        }, (c, d) => {
            dbg_assert(!1, "unsupported write8 from ioapic: " + h(c >>> 0))
        }, c => {
            c = c - IOAPIC_ADDRESS | 0;
            if (c === IOREGSEL) return this.ioregsel;
            if (c === IOWIN) return this.read(this.ioregsel);
            dbg_log("Unexpected IOAPIC register read: " + h(c >>> 0), LOG_APIC);
            dbg_assert(!1);
            return 0
        }, (c, d) => {
            c = c - IOAPIC_ADDRESS | 0;
            c === IOREGSEL ? this.ioregsel = d : c === IOWIN ? this.write(this.ioregsel, d) : (dbg_log("Unexpected IOAPIC register write: " +
                h(c >>> 0) + " <- " + h(d >>> 0, 8), LOG_APIC), dbg_assert(!1))
        })
    }
    IOAPIC.prototype.remote_eoi = function(a) {
        for (var b = 0; b < IOAPIC_IRQ_COUNT; b++) {
            var c = this.ioredtbl_config[b];
            (c & 255) === a && c & IOAPIC_CONFIG_REMOTE_IRR && (dbg_log("Clear remote IRR for irq=" + h(b), LOG_APIC), this.ioredtbl_config[b] &= ~IOAPIC_CONFIG_REMOTE_IRR, this.check_irq(b))
        }
    };
    IOAPIC.prototype.check_irq = function(a) {
        var b = 1 << a;
        if (0 !== (this.irr & b)) {
            var c = this.ioredtbl_config[a];
            if (0 === (c & IOAPIC_CONFIG_MASKED)) {
                var d = c >> 8 & 7,
                    e = c >> 11 & 1,
                    f = c & 255,
                    g = this.ioredtbl_destination[a] >>> 24,
                    k = (c & IOAPIC_CONFIG_TRIGGER_MODE_LEVEL) === IOAPIC_CONFIG_TRIGGER_MODE_LEVEL;
                if (0 === (c & IOAPIC_CONFIG_TRIGGER_MODE_LEVEL)) this.irr &= ~b;
                else if (this.ioredtbl_config[a] |= IOAPIC_CONFIG_REMOTE_IRR, c & IOAPIC_CONFIG_REMOTE_IRR) {
                    dbg_log("No route: level interrupt and remote IRR still set", LOG_APIC);
                    return
                }
                d === IOAPIC_DELIVERY_FIXED ||
                    d === IOAPIC_DELIVERY_LOWEST_PRIORITY ? this.cpu.devices.apic.route(f, d, k, g, e) : dbg_assert(!1, "TODO");
                this.ioredtbl_config[a] &= ~IOAPIC_CONFIG_DELIVS
            }
        }
    };
    IOAPIC.prototype.set_irq = function(a) {
        if (a >= IOAPIC_IRQ_COUNT) dbg_assert(!1, "Bad irq: " + a, LOG_APIC);
        else {
            var b = 1 << a;
            0 === (this.irq_value & b) && (APIC_LOG_VERBOSE && dbg_log("apic set irq " + a, LOG_APIC), this.irq_value |= b, (this.ioredtbl_config[a] & (IOAPIC_CONFIG_TRIGGER_MODE_LEVEL | IOAPIC_CONFIG_MASKED)) !== IOAPIC_CONFIG_MASKED && (this.irr |= b, this.check_irq(a)))
        }
    };
    IOAPIC.prototype.clear_irq = function(a) {
        if (a >= IOAPIC_IRQ_COUNT) dbg_assert(!1, "Bad irq: " + a, LOG_APIC);
        else {
            var b = 1 << a;
            (this.irq_value & b) === b && (this.irq_value &= ~b, this.ioredtbl_config[a] & IOAPIC_CONFIG_TRIGGER_MODE_LEVEL && (this.irr &= ~b))
        }
    };
    IOAPIC.prototype.read = function(a) {
        if (0 === a) return dbg_log("IOAPIC Read id", LOG_APIC), this.ioapic_id << 24;
        if (1 === a) return dbg_log("IOAPIC Read version", LOG_APIC), 17 | IOAPIC_IRQ_COUNT - 1 << 16;
        if (2 === a) return dbg_log("IOAPIC Read arbitration id", LOG_APIC), this.ioapic_id << 24;
        if (16 <= a && a < 16 + 2 * IOAPIC_IRQ_COUNT) {
            var b = a - 16 >> 1;
            a & 1 ? (a = this.ioredtbl_destination[b], dbg_log("IOAPIC Read destination irq=" + h(b) + " -> " + h(a, 8), LOG_APIC)) : (a = this.ioredtbl_config[b], dbg_log("IOAPIC Read config irq=" + h(b) + " -> " + h(a, 8),
                LOG_APIC));
            return a
        }
        dbg_log("IOAPIC register read outside of range " + h(a), LOG_APIC);
        dbg_assert(!1);
        return 0
    };
    IOAPIC.prototype.write = function(a, b) {
        if (0 === a) this.ioapic_id = b >>> 24 & 15;
        else if (1 === a || 2 === a) dbg_log("Invalid write: " + a, LOG_APIC);
        else if (16 <= a && a < 16 + 2 * IOAPIC_IRQ_COUNT) {
            var c = a - 16 >> 1;
            if (a & 1) this.ioredtbl_destination[c] = b & 4278190080, dbg_log("Write destination " + h(b >>> 0, 8) + " irq=" + h(c) + " dest=" + h(b >>> 24, 2), LOG_APIC);
            else {
                this.ioredtbl_config[c] = b & ~IOAPIC_CONFIG_READONLY_MASK | this.ioredtbl_config[c] & IOAPIC_CONFIG_READONLY_MASK;
                a = b & 255;
                var d = b >> 8 & 7,
                    e = b >> 11 & 1,
                    f = b >> 15 & 1,
                    g = b >> 16 & 1;
                dbg_log("Write config " +
                    h(b >>> 0, 8) + " irq=" + h(c) + " vector=" + h(a, 2) + " deliverymode=" + DELIVERY_MODES[d] + " destmode=" + DESTINATION_MODES[e] + " is_level=" + f + " disabled=" + g, LOG_APIC);
                this.check_irq(c)
            }
        } else dbg_log("IOAPIC register write outside of range " + h(a) + ": " + h(b >>> 0, 8), LOG_APIC), dbg_assert(!1)
    };
    IOAPIC.prototype.get_state = function() {
        var a = [];
        a[0] = this.ioredtbl_config;
        a[1] = this.ioredtbl_destination;
        a[2] = this.ioregsel;
        a[3] = this.ioapic_id;
        a[4] = this.irr;
        a[5] = this.irq_value;
        return a
    };
    IOAPIC.prototype.set_state = function(a) {
        this.ioredtbl_config = a[0];
        this.ioredtbl_destination = a[1];
        this.ioregsel = a[2];
        this.ioapic_id = a[3];
        this.irr = a[4];
        this.irq_value = a[5]
    };
    var STATE_VERSION = 6,
        STATE_MAGIC = -2039052682,
        STATE_INDEX_MAGIC = 0,
        STATE_INDEX_VERSION = 1,
        STATE_INDEX_TOTAL_LEN = 2,
        STATE_INDEX_INFO_LEN = 3,
        STATE_INFO_BLOCK_START = 16;
    const ZSTD_MAGIC = 4247762216;

    function StateLoadError(a) {
        this.message = a
    }
    StateLoadError.prototype = Error();
    const CONSTRUCTOR_TABLE = {
        Uint8Array,
        Int8Array,
        Uint16Array,
        Int16Array,
        Uint32Array,
        Int32Array,
        Float32Array,
        Float64Array
    };

    function save_object(a, b) {
        if ("object" !== typeof a || null === a) return dbg_assert("function" !== typeof a), a;
        if (a instanceof Array) return a.map(f => save_object(f, b));
        a.constructor === Object && (console.log(a), dbg_assert(a.constructor !== Object, "Expected non-object"));
        if (a.BYTES_PER_ELEMENT) {
            var c = new Uint8Array(a.buffer, a.byteOffset, a.length * a.BYTES_PER_ELEMENT);
            a = a.constructor.name.replace("bound ", "");
            dbg_assert(CONSTRUCTOR_TABLE[a]);
            return {
                __state_type__: a,
                buffer_id: b.push(c) - 1
            }
        }
        DEBUG && !a.get_state && console.log("Object without get_state: ",
            a);
        c = a.get_state();
        a = [];
        for (var d = 0; d < c.length; d++) {
            var e = c[d];
            dbg_assert("function" !== typeof e);
            a[d] = save_object(e, b)
        }
        return a
    }

    function restore_buffers(a, b) {
        if ("object" !== typeof a || null === a) return dbg_assert("function" !== typeof a), a;
        if (a instanceof Array) {
            for (var c = 0; c < a.length; c++) a[c] = restore_buffers(a[c], b);
            return a
        }
        c = a.__state_type__;
        dbg_assert(void 0 !== c);
        const d = CONSTRUCTOR_TABLE[c];
        dbg_assert(d, "Unkown type: " + c);
        return new d(b[a.buffer_id])
    }
    CPU.prototype.save_state = function() {
        for (var a = [], b = save_object(this, a), c = [], d = 0, e = 0; e < a.length; e++) {
            var f = a[e].byteLength;
            c[e] = {
                offset: d,
                length: f
            };
            d += f;
            d = d + 3 & -4
        }
        b = JSON.stringify({
            buffer_infos: c,
            state: b
        });
        b = (new TextEncoder).encode(b);
        e = STATE_INFO_BLOCK_START + b.length;
        e = e + 3 & -4;
        var g = e + d;
        d = new ArrayBuffer(g);
        var k = new Int32Array(d, 0, STATE_INFO_BLOCK_START / 4);
        (new Uint8Array(d, STATE_INFO_BLOCK_START, b.length)).set(b);
        f = new Uint8Array(d, e);
        k[STATE_INDEX_MAGIC] = STATE_MAGIC;
        k[STATE_INDEX_VERSION] = STATE_VERSION;
        k[STATE_INDEX_TOTAL_LEN] = g;
        k[STATE_INDEX_INFO_LEN] = b.length;
        for (e = 0; e < a.length; e++) g = a[e], dbg_assert(g.constructor === Uint8Array), f.set(g, c[e].offset);
        dbg_log("State: json size " + (b.byteLength >> 10) + "k");
        dbg_log("State: Total buffers size " + (f.byteLength >> 10) + "k");
        return d
    };
    CPU.prototype.restore_state = function(a) {
        function b(t, q) {
            const r = t.length;
            if (r < STATE_INFO_BLOCK_START) throw new StateLoadError("Invalid length: " + r);
            t = new Int32Array(t.buffer, t.byteOffset, 4);
            if (t[STATE_INDEX_MAGIC] !== STATE_MAGIC) throw new StateLoadError("Invalid header: " + h(t[STATE_INDEX_MAGIC] >>> 0));
            if (t[STATE_INDEX_VERSION] !== STATE_VERSION) throw new StateLoadError("Version mismatch: dump=" + t[STATE_INDEX_VERSION] + " we=" + STATE_VERSION);
            if (q && t[STATE_INDEX_TOTAL_LEN] !== r) throw new StateLoadError("Length doesn't match header: real=" +
                r + " header=" + t[STATE_INDEX_TOTAL_LEN]);
            return t[STATE_INDEX_INFO_LEN]
        }

        function c(t) {
            t = (new TextDecoder).decode(t);
            return JSON.parse(t)
        }
        a = new Uint8Array(a);
        if ((new Uint32Array(a.buffer, 0, 1))[0] === ZSTD_MAGIC) {
            var d = this.zstd_create_ctx(a.length);
            (new Uint8Array(this.wasm_memory.buffer, this.zstd_get_src_ptr(d), a.length)).set(a);
            var e = this.zstd_read(d, 16),
                f = new Uint8Array(this.wasm_memory.buffer, e, 16),
                g = b(f, !1);
            this.zstd_read_free(e, 16);
            e = this.zstd_read(d, g);
            f = new Uint8Array(this.wasm_memory.buffer, e,
                g);
            f = c(f);
            this.zstd_read_free(e, g);
            e = f.state;
            var k = f.buffer_infos;
            f = [];
            g = STATE_INFO_BLOCK_START + g;
            for (var l of k) {
                k = (g + 3 & -4) - g;
                if (1048576 < l.length) {
                    var m = this.zstd_read(d, k);
                    this.zstd_read_free(m, k);
                    m = new Uint8Array(l.length);
                    f.push(m.buffer);
                    for (var n = 0; n < l.length;) {
                        var p = l.length - n;
                        dbg_assert(0 <= p);
                        p = Math.min(p, 1048576);
                        const t = this.zstd_read(d, p);
                        m.set(new Uint8Array(this.wasm_memory.buffer, t, p), n);
                        this.zstd_read_free(t, p);
                        n += p
                    }
                } else m = this.zstd_read(d, k + l.length), n = m + k, f.push(this.wasm_memory.buffer.slice(n,
                    n + l.length)), this.zstd_read_free(m, k + l.length);
                g += k + l.length
            }
            e = restore_buffers(e, f);
            this.set_state(e);
            this.zstd_free_ctx(d)
        } else {
            d = b(a, !0);
            if (0 > d || d + 12 >= a.length) throw new StateLoadError("Invalid info block length: " + d);
            l = a.subarray(STATE_INFO_BLOCK_START, STATE_INFO_BLOCK_START + d);
            e = c(l);
            l = e.state;
            e = e.buffer_infos;
            let t = STATE_INFO_BLOCK_START + d;
            t = t + 3 & -4;
            d = e.map(q => {
                const r = t + q.offset;
                return a.buffer.slice(r, r + q.length)
            });
            l = restore_buffers(l, d);
            this.set_state(l)
        }
    };
    const NE2K_LOG_VERBOSE = !1,
        NE2K_LOG_PACKETS = !1;
    var E8390_CMD = 0,
        EN0_CLDALO = 1,
        EN0_STARTPG = 1,
        EN0_CLDAHI = 2,
        EN0_STOPPG = 2,
        EN0_BOUNDARY = 3,
        EN0_TSR = 4,
        EN0_TPSR = 4,
        EN0_NCR = 5,
        EN0_TCNTLO = 5,
        EN0_FIFO = 6,
        EN0_TCNTHI = 6,
        EN0_ISR = 7,
        EN0_CRDALO = 8,
        EN0_RSARLO = 8,
        EN0_CRDAHI = 9,
        EN0_RSARHI = 9,
        EN0_RCNTLO = 10,
        EN0_RCNTHI = 11,
        EN0_RSR = 12,
        EN0_RXCR = 12,
        EN0_TXCR = 13,
        EN0_COUNTER0 = 13,
        EN0_DCFG = 14,
        EN0_COUNTER1 = 14,
        EN0_IMR = 15,
        EN0_COUNTER2 = 15,
        NE_DATAPORT = 16,
        NE_RESET = 31,
        ENISR_RX = 1,
        ENISR_TX = 2,
        ENISR_RX_ERR = 4,
        ENISR_TX_ERR = 8,
        ENISR_OVER = 16,
        ENISR_COUNTERS = 32,
        ENISR_RDC = 64,
        ENISR_RESET = 128,
        ENISR_ALL = 63,
        ENRSR_RXOK = 1,
        START_PAGE = 64,
        START_RX_PAGE = 76,
        STOP_PAGE = 128;

    function translate_mac_address(a, b, c) {
        a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && (dbg_log("Replace mac in eth destination field", LOG_NET), a[0] = c[0], a[1] = c[1], a[2] = c[2], a[3] = c[3], a[4] = c[4], a[5] = c[5]);
        a[6] === b[0] && a[7] === b[1] && a[8] === b[2] && a[9] === b[3] && a[10] === b[4] && a[11] === b[5] && (dbg_log("Replace mac in eth source field", LOG_NET), a[6] = c[0], a[7] = c[1], a[8] = c[2], a[9] = c[3], a[10] = c[4], a[11] = c[5]);
        var d = a[12] << 8 | a[13];
        if (2048 === d)
            if (a = a.subarray(14), d = a[0] >> 4, 4 !== d) dbg_log("Expected ipv4.version==4 but got: " +
                d, LOG_NET);
            else {
                if (dbg_assert(5 === (a[0] & 15), "TODO: ihl!=5"), 17 === a[9]) {
                    a = a.subarray(20);
                    d = a[0] << 8 | a[1];
                    var e = a[2] << 8 | a[3];
                    dbg_log("udp srcport=" + d + " dstport=" + e + " checksum=" + h(a[6] << 8 | a[7], 4), LOG_NET);
                    if (67 === d || 67 === e)
                        if (d = a.subarray(8), e = d[236] << 24 | d[237] << 16 | d[238] << 8 | d[239], 1669485411 !== e) dbg_log("dhcp packet didn't match magic: " + h(e, 8));
                        else
                            for (d[28] === b[0] && d[29] === b[1] && d[30] === b[2] && d[31] === b[3] && d[32] === b[4] && d[33] === b[5] && (dbg_log("Replace mac in dhcp.chaddr", LOG_NET), d[28] = c[0], d[29] =
                                    c[1], d[30] = c[2], d[31] = c[3], d[32] = c[4], d[33] = c[5], a[6] = a[7] = 0), e = 240; e < d.length;) {
                                const f = d[e++];
                                if (255 === f) break;
                                const g = d[e++];
                                61 === f && 1 === d[e + 0] && d[e + 1] === b[0] && d[e + 2] === b[1] && d[e + 3] === b[2] && d[e + 4] === b[3] && d[e + 5] === b[4] && d[e + 6] === b[5] && (dbg_log("Replace mac in dhcp.clientidentifier", LOG_NET), d[e + 1] = c[0], d[e + 2] = c[1], d[e + 3] = c[2], d[e + 4] = c[3], d[e + 5] = c[4], d[e + 6] = c[5], a[6] = a[7] = 0);
                                e += g
                            }
                }
            }
        else 2054 === d && (a = a.subarray(14), dbg_log("arp oper=" + a[7] + " " + format_mac(a.subarray(8, 14)) + " " + format_mac(a.subarray(18,
            24)), LOG_NET), a[8] === b[0] && a[9] === b[1] && a[10] === b[2] && a[11] === b[3] && a[12] === b[4] && a[13] === b[5] && (dbg_log("Replace mac in arp.sha", LOG_NET), a[8] = c[0], a[9] = c[1], a[10] = c[2], a[11] = c[3], a[12] = c[4], a[13] = c[5]))
    }

    function format_mac(a) {
        return [a[0].toString(16).padStart(2, "0"), a[1].toString(16).padStart(2, "0"), a[2].toString(16).padStart(2, "0"), a[3].toString(16).padStart(2, "0"), a[4].toString(16).padStart(2, "0"), a[5].toString(16).padStart(2, "0")].join(":")
    }

    function dump_packet(a, b) {
        const c = a[12] << 8 | a[13] << 0;
        if (2048 === c) {
            var d = a.subarray(14);
            const g = d[2] << 8 | d[3];
            var e = d[9];
            if (17 === e) {
                var f = d.subarray(20);
                d = f[0] << 8 | f[1];
                e = f[2] << 8 | f[3];
                const k = f[6] << 8 | f[7];
                67 === d || 67 === e ? (f = f.subarray(8).subarray(28, 34), dbg_log(b + " len=" + a.length + " ethertype=" + h(c) + " ipv4.len=" + g + " ipv4.proto=" + h(a[23]) + " udp.srcport=" + d + " udp.dstport=" + e + " udp.chksum=" + h(k, 4) + " dhcp.chaddr=" + format_mac(f))) : dbg_log(b + " len=" + a.length + " ethertype=" + h(c) + " ipv4.len=" + g + " ipv4.proto=" + h(a[23]) +
                    " udp.srcport=" + d + " udp.dstport=" + e + " udp.chksum=" + h(k, 4))
            } else 1 !== e && dbg_log(b + " len=" + a.length + " ethertype=" + h(c) + " ipv4.len=" + g + " ipv4.proto=" + h(a[23]))
        } else a.subarray(14), dbg_log(b + " len=" + a.length + " ethertype=" + h(c) + " arp");
        dbg_log(hex_dump(a))
    }

    function Ne2k(a, b, c, d) {
        this.cpu = a;
        this.pci = a.devices.pci;
        this.preserve_mac_from_state_image = c;
        this.mac_address_translation = d;
        this.bus = b;
        this.bus.register("net0-receive", function(e) {
            this.receive(e)
        }, this);
        this.port = 768;
        this.name = "ne2k";
        this.pci_space = [236, 16, 41, 128, 3, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, this.port & 255 | 1, this.port >> 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 26, 0, 17, 0, 0, 184, 254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
        this.pci_id = 40;
        this.pci_bars = [{
            size: 32
        }];
        this.imr = this.isr = 0;
        this.cr = 1;
        this.tpsr = this.tcnt =
            this.rcnt = this.dcfg = 0;
        this.memory = new Uint8Array(32768);
        this.txcr = this.rxcr = 0;
        this.tsr = 1;
        this.mac = new Uint8Array([0, 34, 21, 255 * Math.random() | 0, 255 * Math.random() | 0, 255 * Math.random() | 0]);
        this.mac_address_in_state = null;
        for (b = 0; 6 > b; b++) this.memory[b << 1] = this.memory[b << 1 | 1] = this.mac[b];
        this.memory[28] = this.memory[29] = 87;
        this.memory[30] = this.memory[31] = 87;
        dbg_log("Mac: " + format_mac(this.mac), LOG_NET);
        this.rsar = 0;
        this.pstart = START_PAGE;
        this.pstop = STOP_PAGE;
        this.boundary = this.curpg = START_RX_PAGE;
        b = a.io;
        b.register_read(this.port |
            E8390_CMD, this,
            function() {
                dbg_log("Read cmd", LOG_NET);
                return this.cr
            });
        b.register_write(this.port | E8390_CMD, this, function(e) {
            this.cr = e;
            dbg_log("Write command: " + h(e, 2) + " newpg=" + (this.cr >> 6) + " txcr=" + h(this.txcr, 2), LOG_NET);
            this.cr & 1 || (e & 24 && 0 === this.rcnt && this.do_interrupt(ENISR_RDC), e & 4 && (e = this.tpsr << 8, e = this.memory.subarray(e, e + this.tcnt), NE2K_LOG_PACKETS && dump_packet(e, "send"), this.mac_address_in_state && (e = new Uint8Array(e), translate_mac_address(e, this.mac_address_in_state, this.mac)), this.bus.send("net0-send",
                e), this.bus.send("eth-transmit-end", [e.length]), this.cr &= -5, this.do_interrupt(ENISR_TX), dbg_log("Command: Transfer. length=" + h(e.byteLength), LOG_NET)))
        });
        b.register_read(this.port | EN0_COUNTER0, this, function() {
            dbg_log("Read counter0", LOG_NET);
            return 0
        });
        b.register_read(this.port | EN0_COUNTER1, this, function() {
            dbg_log("Read8 counter1", LOG_NET);
            return 0
        }, function() {
            dbg_log("Read16 counter1", LOG_NET);
            return 0
        });
        b.register_read(this.port | EN0_COUNTER2, this, function() {
            dbg_log("Read counter2", LOG_NET);
            return 0
        });
        b.register_read(this.port | NE_RESET, this, function() {
            this.get_page();
            dbg_log("Read reset", LOG_NET);
            this.do_interrupt(ENISR_RESET);
            return 0
        });
        b.register_write(this.port | NE_RESET, this, function(e) {
            this.get_page();
            dbg_log("Write reset: " + h(e, 2), LOG_NET)
        });
        b.register_read(this.port | EN0_STARTPG, this, function() {
            var e = this.get_page();
            if (0 === e) return this.pstart;
            if (1 === e) return dbg_log("Read pg1/01 (mac[0])", LOG_NET), this.mac[0];
            if (2 === e) return this.pstart;
            dbg_log("Read pg" + e + "/01");
            dbg_assert(!1);
            return 0
        });
        b.register_write(this.port | EN0_STARTPG, this, function(e) {
            var f = this.get_page();
            0 === f ? (dbg_log("start page: " + h(e, 2), LOG_NET), this.pstart = e) : 1 === f ? (dbg_log("mac[0] = " + h(e), LOG_NET), this.mac[0] = e) : 3 === f ? dbg_log("Unimplemented: Write pg3/01 (9346CR): " + h(e), LOG_NET) : (dbg_log("Write pg" + f + "/01: " + h(e), LOG_NET), dbg_assert(!1))
        });
        b.register_read(this.port | EN0_STOPPG, this, function() {
            var e = this.get_page();
            if (0 === e) return this.pstop;
            if (1 === e) return dbg_log("Read pg1/02 (mac[1])", LOG_NET), this.mac[1];
            if (2 ===
                e) return this.pstop;
            dbg_log("Read pg" + e + "/02", LOG_NET);
            dbg_assert(!1);
            return 0
        });
        b.register_write(this.port | EN0_STOPPG, this, function(e) {
            var f = this.get_page();
            0 === f ? (dbg_log("stop page: " + h(e, 2), LOG_NET), e > this.memory.length >> 8 && (e = this.memory.length >> 8, dbg_log("XXX: Adjusting stop page to " + h(e), LOG_NET)), this.pstop = e) : 1 === f ? (dbg_log("mac[1] = " + h(e), LOG_NET), this.mac[1] = e) : (dbg_log("Write pg" + f + "/02: " + h(e), LOG_NET), dbg_assert(!1))
        });
        b.register_read(this.port | EN0_ISR, this, function() {
            var e = this.get_page();
            if (0 === e) return dbg_log("Read isr: " + h(this.isr, 2), LOG_NET), this.isr;
            if (1 === e) return dbg_log("Read curpg: " + h(this.curpg, 2), LOG_NET), this.curpg;
            dbg_assert(!1)
        });
        b.register_write(this.port | EN0_ISR, this, function(e) {
            var f = this.get_page();
            0 === f ? (dbg_log("Write isr: " + h(e, 2), LOG_NET), this.isr &= ~e, this.update_irq()) : 1 === f ? (dbg_log("Write curpg: " + h(e, 2), LOG_NET), this.curpg = e) : dbg_assert(!1)
        });
        b.register_write(this.port | EN0_TXCR, this, function(e) {
            var f = this.get_page();
            0 === f ? (this.txcr = e, dbg_log("Write tx config: " +
                h(e, 2), LOG_NET)) : dbg_log("Unimplemented: Write pg" + f + "/0d " + h(e, 2), LOG_NET)
        });
        b.register_write(this.port | EN0_DCFG, this, function(e) {
            var f = this.get_page();
            0 === f ? (dbg_log("Write data configuration: " + h(e, 2), LOG_NET), this.dcfg = e) : dbg_log("Unimplemented: Write pg" + f + "/0e " + h(e, 2), LOG_NET)
        });
        b.register_read(this.port | EN0_RCNTLO, this, function() {
            if (0 === this.get_page()) return dbg_log("Read pg0/0a", LOG_NET), 80;
            dbg_assert(!1, "TODO");
            return 0
        });
        b.register_write(this.port | EN0_RCNTLO, this, function(e) {
            var f = this.get_page();
            0 === f ? (dbg_log("Write remote byte count low: " + h(e, 2), LOG_NET), this.rcnt = this.rcnt & 65280 | e & 255) : dbg_log("Unimplemented: Write pg" + f + "/0a " + h(e, 2), LOG_NET)
        });
        b.register_read(this.port | EN0_RCNTHI, this, function() {
            if (0 === this.get_page()) return dbg_log("Read pg0/0b", LOG_NET), 67;
            dbg_assert(!1, "TODO");
            return 0
        });
        b.register_write(this.port | EN0_RCNTHI, this, function(e) {
            var f = this.get_page();
            0 === f ? (dbg_log("Write remote byte count high: " + h(e, 2), LOG_NET), this.rcnt = this.rcnt & 255 | e << 8 & 65280) : dbg_log("Unimplemented: Write pg" +
                f + "/0b " + h(e, 2), LOG_NET)
        });
        b.register_read(this.port | EN0_RSARLO, this, function() {
            var e = this.get_page();
            if (0 === e) return dbg_log("Read remote start address low", LOG_NET), this.rsar & 255;
            dbg_log("Unimplemented: Read pg" + e + "/08", LOG_NET);
            dbg_assert(!1)
        });
        b.register_write(this.port | EN0_RSARLO, this, function(e) {
            var f = this.get_page();
            0 === f ? (dbg_log("Write remote start address low: " + h(e, 2), LOG_NET), this.rsar = this.rsar & 65280 | e & 255) : dbg_log("Unimplemented: Write pg" + f + "/08 " + h(e, 2), LOG_NET)
        });
        b.register_read(this.port |
            EN0_RSARHI, this,
            function() {
                var e = this.get_page();
                if (0 === e) return dbg_log("Read remote start address high", LOG_NET), this.rsar >> 8 & 255;
                dbg_log("Unimplemented: Read pg" + e + "/09", LOG_NET);
                dbg_assert(!1)
            });
        b.register_write(this.port | EN0_RSARHI, this, function(e) {
            var f = this.get_page();
            0 === f ? (dbg_log("Write remote start address low: " + h(e, 2), LOG_NET), this.rsar = this.rsar & 255 | e << 8 & 65280) : dbg_log("Unimplemented: Write pg" + f + "/09 " + h(e, 2), LOG_NET)
        });
        b.register_write(this.port | EN0_IMR, this, function(e) {
            var f = this.get_page();
            0 === f ? (dbg_log("Write interrupt mask register: " + h(e, 2) + " isr=" + h(this.isr, 2), LOG_NET), this.imr = e, this.update_irq()) : dbg_log("Unimplemented: Write pg" + f + "/0f " + h(e, 2), LOG_NET)
        });
        b.register_read(this.port | EN0_BOUNDARY, this, function() {
            var e = this.get_page();
            if (0 === e) return dbg_log("Read boundary: " + h(this.boundary, 2), LOG_NET), this.boundary;
            if (1 === e) return dbg_log("Read pg1/03 (mac[2])", LOG_NET), this.mac[2];
            3 === e ? dbg_log("Unimplemented: Read pg3/03 (CONFIG0)", LOG_NET) : (dbg_log("Read pg" + e + "/03", LOG_NET),
                dbg_assert(!1));
            return 0
        });
        b.register_write(this.port | EN0_BOUNDARY, this, function(e) {
            var f = this.get_page();
            0 === f ? (dbg_log("Write boundary: " + h(e, 2), LOG_NET), this.boundary = e) : 1 === f ? (dbg_log("mac[2] = " + h(e), LOG_NET), this.mac[2] = e) : (dbg_log("Write pg" + f + "/03: " + h(e), LOG_NET), dbg_assert(!1))
        });
        b.register_read(this.port | EN0_TSR, this, function() {
            var e = this.get_page();
            if (0 === e) return this.tsr;
            if (1 === e) return dbg_log("Read pg1/04 (mac[3])", LOG_NET), this.mac[3];
            dbg_log("Read pg" + e + "/04", LOG_NET);
            dbg_assert(!1);
            return 0
        });
        b.register_write(this.port | EN0_TPSR, this, function(e) {
            var f = this.get_page();
            0 === f ? (dbg_log("Write tpsr: " + h(e, 2), LOG_NET), this.tpsr = e) : 1 === f ? (dbg_log("mac[3] = " + h(e), LOG_NET), this.mac[3] = e) : (dbg_log("Write pg" + f + "/04: " + h(e), LOG_NET), dbg_assert(!1))
        });
        b.register_read(this.port | EN0_TCNTLO, this, function() {
            var e = this.get_page();
            if (0 === e) return dbg_log("Unimplemented: Read pg0/05 (NCR: Number of Collisions Register)", LOG_NET), 0;
            if (1 === e) return dbg_log("Read pg1/05 (mac[4])", LOG_NET), this.mac[4];
            3 === e ? dbg_log("Unimplemented: Read pg3/05 (CONFIG2)", LOG_NET) : (dbg_log("Read pg" + e + "/05", LOG_NET), dbg_assert(!1));
            return 0
        });
        b.register_write(this.port | EN0_TCNTLO, this, function(e) {
            var f = this.get_page();
            0 === f ? (dbg_log("Write tcnt low: " + h(e, 2), LOG_NET), this.tcnt = this.tcnt & -256 | e) : 1 === f ? (dbg_log("mac[4] = " + h(e), LOG_NET), this.mac[4] = e) : 3 === f ? dbg_log("Unimplemented: Write pg3/05 (CONFIG2): " + h(e), LOG_NET) : (dbg_log("Write pg" + f + "/05: " + h(e), LOG_NET), dbg_assert(!1))
        });
        b.register_read(this.port | EN0_TCNTHI,
            this,
            function() {
                var e = this.get_page();
                if (0 === e) return dbg_assert(!1, "TODO"), 0;
                if (1 === e) return dbg_log("Read pg1/06 (mac[5])", LOG_NET), this.mac[5];
                3 === e ? dbg_log("Unimplemented: Read pg3/06 (CONFIG3)", LOG_NET) : (dbg_log("Read pg" + e + "/06", LOG_NET), dbg_assert(!1));
                return 0
            });
        b.register_write(this.port | EN0_TCNTHI, this, function(e) {
            var f = this.get_page();
            0 === f ? (dbg_log("Write tcnt high: " + h(e, 2), LOG_NET), this.tcnt = this.tcnt & 255 | e << 8) : 1 === f ? (dbg_log("mac[5] = " + h(e), LOG_NET), this.mac[5] = e) : 3 === f ? dbg_log("Unimplemented: Write pg3/06 (CONFIG3): " +
                h(e), LOG_NET) : (dbg_log("Write pg" + f + "/06: " + h(e), LOG_NET), dbg_assert(!1))
        });
        b.register_read(this.port | EN0_RSR, this, function() {
            var e = this.get_page();
            if (0 === e) return 9;
            dbg_log("Unimplemented: Read pg" + e + "/0c", LOG_NET);
            dbg_assert(!1);
            return 0
        });
        b.register_write(this.port | EN0_RXCR, this, function(e) {
            var f = this.get_page();
            0 === f ? (dbg_log("RX configuration reg write: " + h(e, 2), LOG_NET), this.rxcr = e) : dbg_log("Unimplemented: Write pg" + f + "/0c: " + h(e), LOG_NET)
        });
        b.register_read(this.port | NE_DATAPORT | 0, this, this.data_port_read8,
            this.data_port_read16, this.data_port_read32);
        b.register_write(this.port | NE_DATAPORT | 0, this, this.data_port_write16, this.data_port_write16, this.data_port_write32);
        a.devices.pci.register_device(this)
    }
    Ne2k.prototype.get_state = function() {
        var a = [];
        a[0] = this.isr;
        a[1] = this.imr;
        a[2] = this.cr;
        a[3] = this.dcfg;
        a[4] = this.rcnt;
        a[5] = this.tcnt;
        a[6] = this.tpsr;
        a[7] = this.rsar;
        a[8] = this.pstart;
        a[9] = this.curpg;
        a[10] = this.boundary;
        a[11] = this.pstop;
        a[12] = this.rxcr;
        a[13] = this.txcr;
        a[14] = this.tsr;
        a[15] = this.mac;
        a[16] = this.memory;
        return a
    };
    Ne2k.prototype.set_state = function(a) {
        this.isr = a[0];
        this.imr = a[1];
        this.cr = a[2];
        this.dcfg = a[3];
        this.rcnt = a[4];
        this.tcnt = a[5];
        this.tpsr = a[6];
        this.rsar = a[7];
        this.pstart = a[8];
        this.curpg = a[9];
        this.boundary = a[10];
        this.pstop = a[11];
        this.rxcr = a[12];
        this.txcr = a[13];
        this.tsr = a[14];
        this.preserve_mac_from_state_image ? (this.mac = a[15], this.memory = a[16]) : this.mac_address_translation && (this.mac_address_in_state = a[15], this.memory = a[16], dbg_log("Using mac address translation guest_os_mac=" + format_mac(this.mac_address_in_state) +
            " real_mac=" + format_mac(this.mac), LOG_NET))
    };
    Ne2k.prototype.do_interrupt = function(a) {
        dbg_log("Do interrupt " + h(a, 2), LOG_NET);
        this.isr |= a;
        this.update_irq()
    };
    Ne2k.prototype.update_irq = function() {
        this.imr & this.isr ? this.pci.raise_irq(this.pci_id) : this.pci.lower_irq(this.pci_id)
    };
    Ne2k.prototype.data_port_write = function(a) {
        NE2K_LOG_VERBOSE && dbg_log("Write data port: data=" + h(a & 255, 2) + " rsar=" + h(this.rsar, 4) + " rcnt=" + h(this.rcnt, 4), LOG_NET);
        if (16 >= this.rsar || this.rsar >= START_PAGE << 8 && this.rsar < STOP_PAGE << 8) this.memory[this.rsar] = a;
        this.rsar++;
        this.rcnt--;
        this.rsar >= this.pstop << 8 && (this.rsar += this.pstart - this.pstop << 8);
        0 === this.rcnt && this.do_interrupt(ENISR_RDC)
    };
    Ne2k.prototype.data_port_write16 = function(a) {
        this.data_port_write(a);
        this.dcfg & 1 && this.data_port_write(a >> 8)
    };
    Ne2k.prototype.data_port_write32 = function(a) {
        this.data_port_write(a);
        this.data_port_write(a >> 8);
        this.data_port_write(a >> 16);
        this.data_port_write(a >> 24)
    };
    Ne2k.prototype.data_port_read = function() {
        let a = 0;
        this.rsar < STOP_PAGE << 8 && (a = this.memory[this.rsar]);
        NE2K_LOG_VERBOSE && dbg_log("Read data port: data=" + h(a, 2) + " rsar=" + h(this.rsar, 4) + " rcnt=" + h(this.rcnt, 4), LOG_NET);
        this.rsar++;
        this.rcnt--;
        this.rsar >= this.pstop << 8 && (this.rsar += this.pstart - this.pstop << 8);
        0 === this.rcnt && this.do_interrupt(ENISR_RDC);
        return a
    };
    Ne2k.prototype.data_port_read8 = function() {
        return this.data_port_read16() & 255
    };
    Ne2k.prototype.data_port_read16 = function() {
        return this.dcfg & 1 ? this.data_port_read() | this.data_port_read() << 8 : this.data_port_read()
    };
    Ne2k.prototype.data_port_read32 = function() {
        return this.data_port_read() | this.data_port_read() << 8 | this.data_port_read() << 16 | this.data_port_read() << 24
    };
    Ne2k.prototype.receive = function(a) {
        if (!(this.cr & 1) && (NE2K_LOG_PACKETS && dump_packet(a, "receive"), this.bus.send("eth-receive-end", [a.length]), this.rxcr & 16 || this.rxcr & 4 && 255 === a[0] && 255 === a[1] && 255 === a[2] && 255 === a[3] && 255 === a[4] && 255 === a[5] || !(this.rxcr & 8 && 1 === (a[0] & 1) || a[0] !== this.mac[0] || a[1] !== this.mac[1] || a[2] !== this.mac[2] || a[3] !== this.mac[3] || a[4] !== this.mac[4] || a[5] !== this.mac[5]))) {
            this.mac_address_in_state && (a = new Uint8Array(a), translate_mac_address(a, this.mac, this.mac_address_in_state));
            var b =
                this.curpg << 8,
                c = Math.max(60, a.length) + 4,
                d = b + 4,
                e = this.curpg + 1 + (c >> 8),
                f = b + c,
                g = 1 + (c >> 8),
                k = this.boundary > this.curpg ? this.boundary - this.curpg : this.pstop - this.curpg + this.boundary - this.pstart;
            k < g && 0 !== this.boundary ? dbg_log("Buffer full, dropping packet pstart=" + h(this.pstart) + " pstop=" + h(this.pstop) + " curpg=" + h(this.curpg) + " needed=" + h(g) + " boundary=" + h(this.boundary) + " available=" + h(k), LOG_NET) : (f > this.pstop << 8 ? (dbg_assert(60 <= a.length), f = (this.pstop << 8) - d, dbg_assert(0 <= f), this.memory.set(a.subarray(0,
                f), d), this.memory.set(a.subarray(f), this.pstart << 8), dbg_log("rcv cut=" + h(f), LOG_NET)) : (this.memory.set(a, d), 60 > a.length && this.memory.fill(0, d + a.length, d + 60)), e >= this.pstop && (e += this.pstart - this.pstop), this.memory[b] = ENRSR_RXOK, this.memory[b + 1] = e, this.memory[b + 2] = c, this.memory[b + 3] = c >> 8, this.curpg = e, dbg_log("rcv offset=" + h(b) + " len=" + h(c) + " next=" + h(e), LOG_NET), this.do_interrupt(ENISR_RX))
        }
    };
    Ne2k.prototype.get_page = function() {
        return this.cr >> 6 & 3
    };
    var DSP_COPYRIGHT = "COPYRIGHT (C) CREATIVE TECHNOLOGY LTD, 1992.",
        DSP_NO_COMMAND = 0,
        DSP_BUFSIZE = 64,
        DSP_DACSIZE = 65536,
        SB_DMA_BUFSIZE = 65536,
        SB_DMA_BLOCK_SAMPLES = 1024,
        SB_DMA0 = 0,
        SB_DMA1 = 1,
        SB_DMA3 = 3,
        SB_DMA5 = 5,
        SB_DMA6 = 6,
        SB_DMA7 = 7,
        SB_DMA_CHANNEL_8BIT = SB_DMA1,
        SB_DMA_CHANNEL_16BIT = SB_DMA5,
        SB_IRQ2 = 2,
        SB_IRQ5 = 5,
        SB_IRQ7 = 7,
        SB_IRQ10 = 10,
        SB_IRQ = SB_IRQ5,
        SB_IRQ_8BIT = 1,
        SB_IRQ_16BIT = 2,
        SB_IRQ_MIDI = 1,
        SB_IRQ_MPU = 4,
        DSP_COMMAND_SIZES = new Uint8Array(256),
        DSP_COMMAND_HANDLERS = [],
        MIXER_READ_HANDLERS = [],
        MIXER_WRITE_HANDLERS = [],
        MIXER_REGISTER_IS_LEGACY = new Uint8Array(256),
        FM_HANDLERS = [];

    function SB16(a, b) {
        this.cpu = a;
        this.bus = b;
        this.write_buffer = new ByteQueue(DSP_BUFSIZE);
        this.read_buffer = new ByteQueue(DSP_BUFSIZE);
        this.read_buffer_lastvalue = 0;
        this.command = DSP_NO_COMMAND;
        this.mixer_current_address = this.command_size = 0;
        this.mixer_registers = new Uint8Array(256);
        this.mixer_reset();
        this.dummy_speaker_enabled = !1;
        this.test_register = 0;
        this.dsp_signed = this.dsp_16bit = this.dsp_stereo = this.dsp_highspeed = !1;
        this.dac_buffers = [new FloatQueue(DSP_DACSIZE), new FloatQueue(DSP_DACSIZE)];
        this.dma = a.devices.dma;
        this.dma_channel = this.dma_irq = this.dma_bytes_block = this.dma_bytes_left = this.dma_bytes_count = this.dma_sample_count = 0;
        this.dma_channel_8bit = SB_DMA1;
        this.dma_channel_16bit = SB_DMA5;
        this.dma_autoinit = !1;
        this.dma_buffer = new ArrayBuffer(SB_DMA_BUFSIZE);
        this.dma_buffer_int8 = new Int8Array(this.dma_buffer);
        this.dma_buffer_uint8 = new Uint8Array(this.dma_buffer);
        this.dma_buffer_int16 = new Int16Array(this.dma_buffer);
        this.dma_buffer_uint16 = new Uint16Array(this.dma_buffer);
        this.dma_syncbuffer = new SyncBuffer(this.dma_buffer);
        this.dma_paused = this.dma_waiting_transfer = !1;
        this.sampling_rate = 22050;
        b.send("dac-tell-sampling-rate", this.sampling_rate);
        this.bytes_per_sample = 1;
        this.e2_value = 170;
        this.e2_count = 0;
        this.asp_registers = new Uint8Array(256);
        this.mpu_read_buffer = new ByteQueue(DSP_BUFSIZE);
        this.fm_current_address1 = this.fm_current_address0 = this.mpu_read_buffer_lastvalue = 0;
        this.fm_waveform_select_enable = !1;
        this.irq = SB_IRQ5;
        this.irq_triggered = new Uint8Array(16);
        a.io.register_read_consecutive(544, this, this.port2x0_read, this.port2x1_read,
            this.port2x2_read, this.port2x3_read);
        a.io.register_read_consecutive(904, this, this.port2x0_read, this.port2x1_read);
        a.io.register_read_consecutive(548, this, this.port2x4_read, this.port2x5_read);
        a.io.register_read(550, this, this.port2x6_read);
        a.io.register_read(551, this, this.port2x7_read);
        a.io.register_read(552, this, this.port2x8_read);
        a.io.register_read(553, this, this.port2x9_read);
        a.io.register_read(554, this, this.port2xA_read);
        a.io.register_read(555, this, this.port2xB_read);
        a.io.register_read(556, this,
            this.port2xC_read);
        a.io.register_read(557, this, this.port2xD_read);
        a.io.register_read_consecutive(558, this, this.port2xE_read, this.port2xF_read);
        a.io.register_write_consecutive(544, this, this.port2x0_write, this.port2x1_write, this.port2x2_write, this.port2x3_write);
        a.io.register_write_consecutive(904, this, this.port2x0_write, this.port2x1_write);
        a.io.register_write_consecutive(548, this, this.port2x4_write, this.port2x5_write);
        a.io.register_write(550, this, this.port2x6_write);
        a.io.register_write(551, this, this.port2x7_write);
        a.io.register_write_consecutive(552, this, this.port2x8_write, this.port2x9_write);
        a.io.register_write(554, this, this.port2xA_write);
        a.io.register_write(555, this, this.port2xB_write);
        a.io.register_write(556, this, this.port2xC_write);
        a.io.register_write(557, this, this.port2xD_write);
        a.io.register_write(558, this, this.port2xE_write);
        a.io.register_write(559, this, this.port2xF_write);
        a.io.register_read_consecutive(816, this, this.port3x0_read, this.port3x1_read);
        a.io.register_write_consecutive(816, this, this.port3x0_write,
            this.port3x1_write);
        this.dma.on_unmask(this.dma_on_unmask, this);
        b.register("dac-request-data", function() {
            this.dac_handle_request()
        }, this);
        b.register("speaker-has-initialized", function() {
            this.mixer_reset()
        }, this);
        b.send("speaker-confirm-initialized");
        this.dsp_reset()
    }
    SB16.prototype.dsp_reset = function() {
        this.write_buffer.clear();
        this.read_buffer.clear();
        this.command = DSP_NO_COMMAND;
        this.command_size = 0;
        this.dummy_speaker_enabled = !1;
        this.test_register = 0;
        this.dsp_signed = this.dsp_16bit = this.dsp_stereo = this.dsp_highspeed = !1;
        this.dac_buffers[0].clear();
        this.dac_buffers[1].clear();
        this.dma_channel = this.dma_irq = this.dma_bytes_block = this.dma_bytes_left = this.dma_bytes_count = this.dma_sample_count = 0;
        this.dma_autoinit = !1;
        this.dma_buffer_uint8.fill(0);
        this.dma_paused = this.dma_waiting_transfer = !1;
        this.e2_value = 170;
        this.e2_count = 0;
        this.sampling_rate = 22050;
        this.bytes_per_sample = 1;
        this.lower_irq(SB_IRQ_8BIT);
        this.irq_triggered.fill(0);
        this.asp_registers.fill(0);
        this.asp_registers[5] = 1;
        this.asp_registers[9] = 248
    };
    SB16.prototype.get_state = function() {
        var a = [];
        a[2] = this.read_buffer_lastvalue;
        a[3] = this.command;
        a[4] = this.command_size;
        a[5] = this.mixer_current_address;
        a[6] = this.mixer_registers;
        a[7] = this.dummy_speaker_enabled;
        a[8] = this.test_register;
        a[9] = this.dsp_highspeed;
        a[10] = this.dsp_stereo;
        a[11] = this.dsp_16bit;
        a[12] = this.dsp_signed;
        a[15] = this.dma_sample_count;
        a[16] = this.dma_bytes_count;
        a[17] = this.dma_bytes_left;
        a[18] = this.dma_bytes_block;
        a[19] = this.dma_irq;
        a[20] = this.dma_channel;
        a[21] = this.dma_channel_8bit;
        a[22] =
            this.dma_channel_16bit;
        a[23] = this.dma_autoinit;
        a[24] = this.dma_buffer_uint8;
        a[25] = this.dma_waiting_transfer;
        a[26] = this.dma_paused;
        a[27] = this.sampling_rate;
        a[28] = this.bytes_per_sample;
        a[29] = this.e2_value;
        a[30] = this.e2_count;
        a[31] = this.asp_registers;
        a[33] = this.mpu_read_buffer_last_value;
        a[34] = this.irq;
        a[35] = this.irq_triggered;
        return a
    };
    SB16.prototype.set_state = function(a) {
        this.read_buffer_lastvalue = a[2];
        this.command = a[3];
        this.command_size = a[4];
        this.mixer_current_address = a[5];
        this.mixer_registers = a[6];
        this.mixer_full_update();
        this.dummy_speaker_enabled = a[7];
        this.test_register = a[8];
        this.dsp_highspeed = a[9];
        this.dsp_stereo = a[10];
        this.dsp_16bit = a[11];
        this.dsp_signed = a[12];
        this.dma_sample_count = a[15];
        this.dma_bytes_count = a[16];
        this.dma_bytes_left = a[17];
        this.dma_bytes_block = a[18];
        this.dma_irq = a[19];
        this.dma_channel = a[20];
        this.dma_channel_8bit =
            a[21];
        this.dma_channel_16bit = a[22];
        this.dma_autoinit = a[23];
        this.dma_buffer_uint8 = a[24];
        this.dma_waiting_transfer = a[25];
        this.dma_paused = a[26];
        this.sampling_rate = a[27];
        this.bytes_per_sample = a[28];
        this.e2_value = a[29];
        this.e2_count = a[30];
        this.asp_registers = a[31];
        this.mpu_read_buffer_last_value = a[33];
        this.irq = a[34];
        this.irq_triggered = a[35];
        this.dma_buffer = this.dma_buffer_uint8.buffer;
        this.dma_buffer_int8 = new Int8Array(this.dma_buffer);
        this.dma_buffer_int16 = new Int16Array(this.dma_buffer);
        this.dma_buffer_uint16 =
            new Uint16Array(this.dma_buffer);
        this.dma_syncbuffer = new SyncBuffer(this.dma_buffer);
        this.dma_paused ? this.bus.send("dac-disable") : this.bus.send("dac-enable")
    };
    SB16.prototype.port2x0_read = function() {
        dbg_log("220 read: fm music status port (unimplemented)", LOG_SB16);
        return 255
    };
    SB16.prototype.port2x1_read = function() {
        dbg_log("221 read: fm music data port (write only)", LOG_SB16);
        return 255
    };
    SB16.prototype.port2x2_read = function() {
        dbg_log("222 read: advanced fm music status port (unimplemented)", LOG_SB16);
        return 255
    };
    SB16.prototype.port2x3_read = function() {
        dbg_log("223 read: advanced music data port (write only)", LOG_SB16);
        return 255
    };
    SB16.prototype.port2x4_read = function() {
        dbg_log("224 read: mixer address port", LOG_SB16);
        return this.mixer_current_address
    };
    SB16.prototype.port2x5_read = function() {
        dbg_log("225 read: mixer data port", LOG_SB16);
        return this.mixer_read(this.mixer_current_address)
    };
    SB16.prototype.port2x6_read = function() {
        dbg_log("226 read: (write only)", LOG_SB16);
        return 255
    };
    SB16.prototype.port2x7_read = function() {
        dbg_log("227 read: undocumented", LOG_SB16);
        return 255
    };
    SB16.prototype.port2x8_read = function() {
        dbg_log("228 read: fm music status port (unimplemented)", LOG_SB16);
        return 255
    };
    SB16.prototype.port2x9_read = function() {
        dbg_log("229 read: fm music data port (write only)", LOG_SB16);
        return 255
    };
    SB16.prototype.port2xA_read = function() {
        dbg_log("22A read: read data", LOG_SB16);
        this.read_buffer.length && (this.read_buffer_lastvalue = this.read_buffer.shift());
        dbg_log(" <- " + this.read_buffer_lastvalue + " " + h(this.read_buffer_lastvalue) + " '" + String.fromCharCode(this.read_buffer_lastvalue) + "'", LOG_SB16);
        return this.read_buffer_lastvalue
    };
    SB16.prototype.port2xB_read = function() {
        dbg_log("22B read: undocumented", LOG_SB16);
        return 255
    };
    SB16.prototype.port2xC_read = function() {
        dbg_log("22C read: write-buffer status", LOG_SB16);
        return 127
    };
    SB16.prototype.port2xD_read = function() {
        dbg_log("22D read: undocumented", LOG_SB16);
        return 255
    };
    SB16.prototype.port2xE_read = function() {
        dbg_log("22E read: read-buffer status / irq 8bit ack.", LOG_SB16);
        this.irq_triggered[SB_IRQ_8BIT] && this.lower_irq(SB_IRQ_8BIT);
        return (this.read_buffer.length && !this.dsp_highspeed) << 7 | 127
    };
    SB16.prototype.port2xF_read = function() {
        dbg_log("22F read: irq 16bit ack", LOG_SB16);
        this.lower_irq(SB_IRQ_16BIT);
        return 0
    };
    SB16.prototype.port2x0_write = function(a) {
        dbg_log("220 write: (unimplemented) fm register 0 address = " + h(a), LOG_SB16);
        this.fm_current_address0 = 0
    };
    SB16.prototype.port2x1_write = function(a) {
        dbg_log("221 write: (unimplemented) fm register 0 data = " + h(a), LOG_SB16);
        var b = FM_HANDLERS[this.fm_current_address0];
        b || (b = this.fm_default_write);
        b.call(this, a, 0, this.fm_current_address0)
    };
    SB16.prototype.port2x2_write = function(a) {
        dbg_log("222 write: (unimplemented) fm register 1 address = " + h(a), LOG_SB16);
        this.fm_current_address1 = 0
    };
    SB16.prototype.port2x3_write = function(a) {
        dbg_log("223 write: (unimplemented) fm register 1 data =" + h(a), LOG_SB16);
        var b = FM_HANDLERS[this.fm_current_address1];
        b || (b = this.fm_default_write);
        b.call(this, a, 1, this.fm_current_address1)
    };
    SB16.prototype.port2x4_write = function(a) {
        dbg_log("224 write: mixer address = " + h(a), LOG_SB16);
        this.mixer_current_address = a
    };
    SB16.prototype.port2x5_write = function(a) {
        dbg_log("225 write: mixer data = " + h(a), LOG_SB16);
        this.mixer_write(this.mixer_current_address, a)
    };
    SB16.prototype.port2x6_write = function(a) {
        dbg_log("226 write: reset = " + h(a), LOG_SB16);
        this.dsp_highspeed ? (dbg_log(" -> exit highspeed", LOG_SB16), this.dsp_highspeed = !1) : a && (dbg_log(" -> reset", LOG_SB16), this.dsp_reset());
        this.read_buffer.clear();
        this.read_buffer.push(170)
    };
    SB16.prototype.port2x7_write = function(a) {
        dbg_log("227 write: undocumented", LOG_SB16)
    };
    SB16.prototype.port2x8_write = function(a) {
        dbg_log("228 write: fm music register port (unimplemented)", LOG_SB16)
    };
    SB16.prototype.port2x9_write = function(a) {
        dbg_log("229 write: fm music data port (unimplemented)", LOG_SB16)
    };
    SB16.prototype.port2xA_write = function(a) {
        dbg_log("22A write: dsp read data port (read only)", LOG_SB16)
    };
    SB16.prototype.port2xB_write = function(a) {
        dbg_log("22B write: undocumented", LOG_SB16)
    };
    SB16.prototype.port2xC_write = function(a) {
        dbg_log("22C write: write command/data", LOG_SB16);
        this.command === DSP_NO_COMMAND ? (dbg_log("22C write: command = " + h(a), LOG_SB16), this.command = a, this.write_buffer.clear(), this.command_size = DSP_COMMAND_SIZES[a]) : (dbg_log("22C write: data: " + h(a), LOG_SB16), this.write_buffer.push(a));
        this.write_buffer.length >= this.command_size && this.command_do()
    };
    SB16.prototype.port2xD_write = function(a) {
        dbg_log("22D write: undocumented", LOG_SB16)
    };
    SB16.prototype.port2xE_write = function(a) {
        dbg_log("22E write: dsp read buffer status (read only)", LOG_SB16)
    };
    SB16.prototype.port2xF_write = function(a) {
        dbg_log("22F write: undocumented", LOG_SB16)
    };
    SB16.prototype.port3x0_read = function() {
        dbg_log("330 read: mpu data", LOG_SB16);
        this.mpu_read_buffer.length && (this.mpu_read_buffer_lastvalue = this.mpu_read_buffer.shift());
        dbg_log(" <- " + h(this.mpu_read_buffer_lastvalue), LOG_SB16);
        return this.mpu_read_buffer_lastvalue
    };
    SB16.prototype.port3x0_write = function(a) {
        dbg_log("330 write: mpu data (unimplemented) : " + h(a), LOG_SB16)
    };
    SB16.prototype.port3x1_read = function() {
        dbg_log("331 read: mpu status", LOG_SB16);
        return 0 | 128 * !this.mpu_read_buffer.length
    };
    SB16.prototype.port3x1_write = function(a) {
        dbg_log("331 write: mpu command: " + h(a), LOG_SB16);
        255 == a && (this.mpu_read_buffer.clear(), this.mpu_read_buffer.push(254))
    };
    SB16.prototype.command_do = function() {
        var a = DSP_COMMAND_HANDLERS[this.command];
        a || (a = this.dsp_default_handler);
        a.call(this);
        this.command = DSP_NO_COMMAND;
        this.command_size = 0;
        this.write_buffer.clear()
    };
    SB16.prototype.dsp_default_handler = function() {
        dbg_log("Unhandled command: " + h(this.command), LOG_SB16)
    };

    function register_dsp_command(a, b, c) {
        c || (c = SB16.prototype.dsp_default_handler);
        for (var d = 0; d < a.length; d++) DSP_COMMAND_SIZES[a[d]] = b, DSP_COMMAND_HANDLERS[a[d]] = c
    }

    function any_first_digit(a) {
        for (var b = [], c = 0; 16 > c; c++) b.push(a + c);
        return b
    }
    register_dsp_command([14], 2, function() {
        this.asp_registers[this.write_buffer.shift()] = this.write_buffer.shift()
    });
    register_dsp_command([15], 1, function() {
        this.read_buffer.clear();
        this.read_buffer.push(this.asp_registers[this.write_buffer.shift()])
    });
    register_dsp_command([16], 1, function() {
        var a = audio_normalize(this.write_buffer.shift(), 127.5, -1);
        this.dac_buffers[0].push(a);
        this.dac_buffers[1].push(a);
        this.bus.send("dac-enable")
    });
    register_dsp_command([20, 21], 2, function() {
        this.dma_irq = SB_IRQ_8BIT;
        this.dma_channel = this.dma_channel_8bit;
        this.dsp_highspeed = this.dsp_16bit = this.dsp_signed = this.dma_autoinit = !1;
        this.dma_transfer_size_set();
        this.dma_transfer_start()
    });
    register_dsp_command([22], 2);
    register_dsp_command([23], 2);
    register_dsp_command([28], 0, function() {
        this.dma_irq = SB_IRQ_8BIT;
        this.dma_channel = this.dma_channel_8bit;
        this.dma_autoinit = !0;
        this.dsp_highspeed = this.dsp_16bit = this.dsp_signed = !1;
        this.dma_transfer_start()
    });
    register_dsp_command([31], 0);
    register_dsp_command([32], 0, function() {
        this.read_buffer.clear();
        this.read_buffer.push(127)
    });
    register_dsp_command([36], 2);
    register_dsp_command([44], 0);
    register_dsp_command([48], 0);
    register_dsp_command([49], 0);
    register_dsp_command([52], 0);
    register_dsp_command([53], 0);
    register_dsp_command([54], 0);
    register_dsp_command([55], 0);
    register_dsp_command([56], 0);
    register_dsp_command([64], 1, function() {
        this.sampling_rate_change(1E6 / (256 - this.write_buffer.shift()) / this.get_channel_count())
    });
    register_dsp_command([65, 66], 2, function() {
        this.sampling_rate_change(this.write_buffer.shift() << 8 | this.write_buffer.shift())
    });
    register_dsp_command([72], 2, function() {
        this.dma_transfer_size_set()
    });
    register_dsp_command([116], 2);
    register_dsp_command([117], 2);
    register_dsp_command([118], 2);
    register_dsp_command([119], 2);
    register_dsp_command([125], 0);
    register_dsp_command([127], 0);
    register_dsp_command([128], 2);
    register_dsp_command([144], 0, function() {
        this.dma_irq = SB_IRQ_8BIT;
        this.dma_channel = this.dma_channel_8bit;
        this.dma_autoinit = !0;
        this.dsp_signed = !1;
        this.dsp_highspeed = !0;
        this.dsp_16bit = !1;
        this.dma_transfer_start()
    });
    register_dsp_command([145], 0);
    register_dsp_command([152], 0);
    register_dsp_command([153], 0);
    register_dsp_command([160], 0);
    register_dsp_command([168], 0);
    register_dsp_command(any_first_digit(176), 3, function() {
        if (this.command & 8) this.dsp_default_handler();
        else {
            var a = this.write_buffer.shift();
            this.dma_irq = SB_IRQ_16BIT;
            this.dma_channel = this.dma_channel_16bit;
            this.dma_autoinit = !!(this.command & 4);
            this.dsp_signed = !!(a & 16);
            this.dsp_stereo = !!(a & 32);
            this.dsp_16bit = !0;
            this.dma_transfer_size_set();
            this.dma_transfer_start()
        }
    });
    register_dsp_command(any_first_digit(192), 3, function() {
        if (this.command & 8) this.dsp_default_handler();
        else {
            var a = this.write_buffer.shift();
            this.dma_irq = SB_IRQ_8BIT;
            this.dma_channel = this.dma_channel_8bit;
            this.dma_autoinit = !!(this.command & 4);
            this.dsp_signed = !!(a & 16);
            this.dsp_stereo = !!(a & 32);
            this.dsp_16bit = !1;
            this.dma_transfer_size_set();
            this.dma_transfer_start()
        }
    });
    register_dsp_command([208], 0, function() {
        this.dma_paused = !0;
        this.bus.send("dac-disable")
    });
    register_dsp_command([209], 0, function() {
        this.dummy_speaker_enabled = !0
    });
    register_dsp_command([211], 0, function() {
        this.dummy_speaker_enabled = !1
    });
    register_dsp_command([212], 0, function() {
        this.dma_paused = !1;
        this.bus.send("dac-enable")
    });
    register_dsp_command([213], 0, function() {
        this.dma_paused = !0;
        this.bus.send("dac-disable")
    });
    register_dsp_command([214], 0, function() {
        this.dma_paused = !1;
        this.bus.send("dac-enable")
    });
    register_dsp_command([216], 0, function() {
        this.read_buffer.clear();
        this.read_buffer.push(255 * this.dummy_speaker_enabled)
    });
    register_dsp_command([217, 218], 0, function() {
        this.dma_autoinit = !1
    });
    register_dsp_command([224], 1, function() {
        this.read_buffer.clear();
        this.read_buffer.push(~this.write_buffer.shift())
    });
    register_dsp_command([225], 0, function() {
        this.read_buffer.clear();
        this.read_buffer.push(4);
        this.read_buffer.push(5)
    });
    register_dsp_command([226], 1);
    register_dsp_command([227], 0, function() {
        this.read_buffer.clear();
        for (var a = 0; a < DSP_COPYRIGHT.length; a++) this.read_buffer.push(DSP_COPYRIGHT.charCodeAt(a));
        this.read_buffer.push(0)
    });
    register_dsp_command([228], 1, function() {
        this.test_register = this.write_buffer.shift()
    });
    register_dsp_command([232], 0, function() {
        this.read_buffer.clear();
        this.read_buffer.push(this.test_register)
    });
    register_dsp_command([242, 243], 0, function() {
        this.raise_irq()
    });
    var SB_F9 = new Uint8Array(256);
    SB_F9[14] = 255;
    SB_F9[15] = 7;
    SB_F9[55] = 56;
    register_dsp_command([249], 1, function() {
        var a = this.write_buffer.shift();
        dbg_log("dsp 0xf9: unknown function. input: " + a, LOG_SB16);
        this.read_buffer.clear();
        this.read_buffer.push(SB_F9[a])
    });
    SB16.prototype.mixer_read = function(a) {
        var b = MIXER_READ_HANDLERS[a];
        b ? b = b.call(this) : (b = this.mixer_registers[a], dbg_log("unhandled mixer register read. addr:" + h(a) + " data:" + h(b), LOG_SB16));
        return b
    };
    SB16.prototype.mixer_write = function(a, b) {
        var c = MIXER_WRITE_HANDLERS[a];
        c ? c.call(this, b) : dbg_log("unhandled mixer register write. addr:" + h(a) + " data:" + h(b), LOG_SB16)
    };
    SB16.prototype.mixer_default_read = function() {
        dbg_log("mixer register read. addr:" + h(this.mixer_current_address), LOG_SB16);
        return this.mixer_registers[this.mixer_current_address]
    };
    SB16.prototype.mixer_default_write = function(a) {
        dbg_log("mixer register write. addr:" + h(this.mixer_current_address) + " data:" + h(a), LOG_SB16);
        this.mixer_registers[this.mixer_current_address] = a
    };
    SB16.prototype.mixer_reset = function() {
        this.mixer_registers[4] = 204;
        this.mixer_registers[34] = 204;
        this.mixer_registers[38] = 204;
        this.mixer_registers[40] = 0;
        this.mixer_registers[46] = 0;
        this.mixer_registers[10] = 0;
        this.mixer_registers[48] = 192;
        this.mixer_registers[49] = 192;
        this.mixer_registers[50] = 192;
        this.mixer_registers[51] = 192;
        this.mixer_registers[52] = 192;
        this.mixer_registers[53] = 192;
        this.mixer_registers[54] = 0;
        this.mixer_registers[55] = 0;
        this.mixer_registers[56] = 0;
        this.mixer_registers[57] = 0;
        this.mixer_registers[59] =
            0;
        this.mixer_registers[60] = 31;
        this.mixer_registers[61] = 21;
        this.mixer_registers[62] = 11;
        this.mixer_registers[63] = 0;
        this.mixer_registers[64] = 0;
        this.mixer_registers[65] = 0;
        this.mixer_registers[66] = 0;
        this.mixer_registers[67] = 0;
        this.mixer_registers[68] = 128;
        this.mixer_registers[69] = 128;
        this.mixer_registers[70] = 128;
        this.mixer_registers[71] = 128;
        this.mixer_full_update()
    };
    SB16.prototype.mixer_full_update = function() {
        for (var a = 1; a < this.mixer_registers.length; a++) MIXER_REGISTER_IS_LEGACY[a] || this.mixer_write(a, this.mixer_registers[a])
    };

    function register_mixer_read(a, b) {
        b || (b = SB16.prototype.mixer_default_read);
        MIXER_READ_HANDLERS[a] = b
    }

    function register_mixer_write(a, b) {
        b || (b = SB16.prototype.mixer_default_write);
        MIXER_WRITE_HANDLERS[a] = b
    }

    function register_mixer_legacy(a, b, c) {
        MIXER_REGISTER_IS_LEGACY[a] = 1;
        MIXER_READ_HANDLERS[a] = function() {
            return this.mixer_registers[b] & 240 | this.mixer_registers[c] >>> 4
        };
        MIXER_WRITE_HANDLERS[a] = function(d) {
            this.mixer_registers[a] = d;
            var e = d << 4 & 240 | this.mixer_registers[c] & 15;
            this.mixer_write(b, d & 240 | this.mixer_registers[b] & 15);
            this.mixer_write(c, e)
        }
    }

    function register_mixer_volume(a, b, c) {
        MIXER_READ_HANDLERS[a] = SB16.prototype.mixer_default_read;
        MIXER_WRITE_HANDLERS[a] = function(d) {
            this.mixer_registers[a] = d;
            this.bus.send("mixer-volume", [b, c, (d >>> 2) - 62])
        }
    }
    register_mixer_read(0, function() {
        this.mixer_reset();
        return 0
    });
    register_mixer_write(0);
    register_mixer_legacy(4, 50, 51);
    register_mixer_legacy(34, 48, 49);
    register_mixer_legacy(38, 52, 53);
    register_mixer_legacy(40, 54, 55);
    register_mixer_legacy(46, 56, 57);
    register_mixer_volume(48, MIXER_SRC_MASTER, MIXER_CHANNEL_LEFT);
    register_mixer_volume(49, MIXER_SRC_MASTER, MIXER_CHANNEL_RIGHT);
    register_mixer_volume(50, MIXER_SRC_DAC, MIXER_CHANNEL_LEFT);
    register_mixer_volume(51, MIXER_SRC_DAC, MIXER_CHANNEL_RIGHT);
    register_mixer_read(59);
    register_mixer_write(59, function(a) {
        this.mixer_registers[59] = a;
        this.bus.send("mixer-volume", [MIXER_SRC_PCSPEAKER, MIXER_CHANNEL_BOTH, 6 * (a >>> 6) - 18])
    });
    register_mixer_read(65);
    register_mixer_write(65, function(a) {
        this.mixer_registers[65] = a;
        this.bus.send("mixer-gain-left", 6 * (a >>> 6))
    });
    register_mixer_read(66);
    register_mixer_write(66, function(a) {
        this.mixer_registers[66] = a;
        this.bus.send("mixer-gain-right", 6 * (a >>> 6))
    });
    register_mixer_read(68);
    register_mixer_write(68, function(a) {
        this.mixer_registers[68] = a;
        a >>>= 3;
        this.bus.send("mixer-treble-left", a - (16 > a ? 14 : 16))
    });
    register_mixer_read(69);
    register_mixer_write(69, function(a) {
        this.mixer_registers[69] = a;
        a >>>= 3;
        this.bus.send("mixer-treble-right", a - (16 > a ? 14 : 16))
    });
    register_mixer_read(70);
    register_mixer_write(70, function(a) {
        this.mixer_registers[70] = a;
        a >>>= 3;
        this.bus.send("mixer-bass-right", a - (16 > a ? 14 : 16))
    });
    register_mixer_read(71);
    register_mixer_write(71, function(a) {
        this.mixer_registers[71] = a;
        a >>>= 3;
        this.bus.send("mixer-bass-right", a - (16 > a ? 14 : 16))
    });
    register_mixer_read(128, function() {
        switch (this.irq) {
            case SB_IRQ2:
                return 1;
            case SB_IRQ5:
                return 2;
            case SB_IRQ7:
                return 4;
            case SB_IRQ10:
                return 8;
            default:
                return 0
        }
    });
    register_mixer_write(128, function(a) {
        a & 1 && (this.irq = SB_IRQ2);
        a & 2 && (this.irq = SB_IRQ5);
        a & 4 && (this.irq = SB_IRQ7);
        a & 8 && (this.irq = SB_IRQ10)
    });
    register_mixer_read(129, function() {
        var a = 0;
        switch (this.dma_channel_8bit) {
            case SB_DMA0:
                a |= 1;
                break;
            case SB_DMA1:
                a |= 2;
                break;
            case SB_DMA3:
                a |= 8
        }
        switch (this.dma_channel_16bit) {
            case SB_DMA5:
                a |= 32;
                break;
            case SB_DMA6:
                a |= 64;
                break;
            case SB_DMA7:
                a |= 128
        }
        return a
    });
    register_mixer_write(129, function(a) {
        a & 1 && (this.dma_channel_8bit = SB_DMA0);
        a & 2 && (this.dma_channel_8bit = SB_DMA1);
        a & 8 && (this.dma_channel_8bit = SB_DMA3);
        a & 32 && (this.dma_channel_16bit = SB_DMA5);
        a & 64 && (this.dma_channel_16bit = SB_DMA6);
        a & 128 && (this.dma_channel_16bit = SB_DMA7)
    });
    register_mixer_read(130, function() {
        for (var a = 32, b = 0; 16 > b; b++) a |= b * this.irq_triggered[b];
        return a
    });
    SB16.prototype.fm_default_write = function(a, b, c) {
        dbg_log("unhandled fm register write. addr:" + b + "|" + h(c) + " data:" + h(a), LOG_SB16)
    };

    function register_fm_write(a, b) {
        b || (b = SB16.prototype.fm_default_write);
        for (var c = 0; c < a.length; c++) FM_HANDLERS[a[c]] = b
    }

    function between(a, b) {
        for (var c = []; a <= b; a++) c.push(a);
        return c
    }
    var SB_FM_OPERATORS_BY_OFFSET = new Uint8Array(32);
    SB_FM_OPERATORS_BY_OFFSET[0] = 0;
    SB_FM_OPERATORS_BY_OFFSET[1] = 1;
    SB_FM_OPERATORS_BY_OFFSET[2] = 2;
    SB_FM_OPERATORS_BY_OFFSET[3] = 3;
    SB_FM_OPERATORS_BY_OFFSET[4] = 4;
    SB_FM_OPERATORS_BY_OFFSET[5] = 5;
    SB_FM_OPERATORS_BY_OFFSET[8] = 6;
    SB_FM_OPERATORS_BY_OFFSET[9] = 7;
    SB_FM_OPERATORS_BY_OFFSET[10] = 8;
    SB_FM_OPERATORS_BY_OFFSET[11] = 9;
    SB_FM_OPERATORS_BY_OFFSET[12] = 10;
    SB_FM_OPERATORS_BY_OFFSET[13] = 11;
    SB_FM_OPERATORS_BY_OFFSET[16] = 12;
    SB_FM_OPERATORS_BY_OFFSET[17] = 13;
    SB_FM_OPERATORS_BY_OFFSET[18] = 14;
    SB_FM_OPERATORS_BY_OFFSET[19] = 15;
    SB_FM_OPERATORS_BY_OFFSET[20] = 16;
    SB_FM_OPERATORS_BY_OFFSET[21] = 17;

    function get_fm_operator(a, b) {
        return 18 * a + SB_FM_OPERATORS_BY_OFFSET[b]
    }
    register_fm_write([1], function(a, b, c) {
        this.fm_waveform_select_enable[b] = a & 1;
        this.fm_update_waveforms()
    });
    register_fm_write([2]);
    register_fm_write([3]);
    register_fm_write([4], function(a, b, c) {});
    register_fm_write([5], function(a, b, c) {
        0 === b && this.fm_default_write(a, b, c)
    });
    register_fm_write([8], function(a, b, c) {});
    register_fm_write(between(32, 53), function(a, b, c) {
        get_fm_operator(b, c - 32)
    });
    register_fm_write(between(64, 85), function(a, b, c) {
        get_fm_operator(b, c - 64)
    });
    register_fm_write(between(96, 117), function(a, b, c) {
        get_fm_operator(b, c - 96)
    });
    register_fm_write(between(128, 149), function(a, b, c) {
        get_fm_operator(b, c - 128)
    });
    register_fm_write(between(160, 168), function(a, b, c) {});
    register_fm_write(between(176, 184), function(a, b, c) {});
    register_fm_write([189], function(a, b, c) {});
    register_fm_write(between(192, 200), function(a, b, c) {});
    register_fm_write(between(224, 245), function(a, b, c) {
        get_fm_operator(b, c - 224)
    });
    SB16.prototype.fm_update_waveforms = function() {};
    SB16.prototype.sampling_rate_change = function(a) {
        this.sampling_rate = a;
        this.bus.send("dac-tell-sampling-rate", a)
    };
    SB16.prototype.get_channel_count = function() {
        return this.dsp_stereo ? 2 : 1
    };
    SB16.prototype.dma_transfer_size_set = function() {
        this.dma_sample_count = 1 + (this.write_buffer.shift() << 0) + (this.write_buffer.shift() << 8)
    };
    SB16.prototype.dma_transfer_start = function() {
        dbg_log("begin dma transfer", LOG_SB16);
        this.bytes_per_sample = 1;
        this.dsp_16bit && (this.bytes_per_sample *= 2);
        this.dma_bytes_count = this.dma_sample_count * this.bytes_per_sample;
        this.dma_bytes_block = SB_DMA_BLOCK_SAMPLES * this.bytes_per_sample;
        this.dma_bytes_block = Math.min(Math.max(this.dma_bytes_count >> 2 & -4, 32), this.dma_bytes_block);
        this.dma_waiting_transfer = !0;
        this.dma.channel_mask[this.dma_channel] || this.dma_on_unmask(this.dma_channel)
    };
    SB16.prototype.dma_on_unmask = function(a) {
        a === this.dma_channel && this.dma_waiting_transfer && (this.dma_waiting_transfer = !1, this.dma_bytes_left = this.dma_bytes_count, this.dma_paused = !1, this.bus.send("dac-enable"))
    };
    SB16.prototype.dma_transfer_next = function() {
        dbg_log("dma transfering next block", LOG_SB16);
        var a = Math.min(this.dma_bytes_left, this.dma_bytes_block),
            b = Math.floor(a / this.bytes_per_sample);
        this.dma.do_write(this.dma_syncbuffer, 0, a, this.dma_channel, c => {
            dbg_log("dma block transfer " + (c ? "unsuccessful" : "successful"), LOG_SB16);
            c || (this.dma_to_dac(b), this.dma_bytes_left -= a, this.dma_bytes_left || (this.raise_irq(this.dma_irq), this.dma_autoinit && (this.dma_bytes_left = this.dma_bytes_count)))
        })
    };
    SB16.prototype.dma_to_dac = function(a) {
        var b = this.dsp_16bit ? 32767.5 : 127.5,
            c = this.dsp_signed ? 0 : -1,
            d = this.dsp_stereo ? 1 : 2;
        var e = this.dsp_16bit ? this.dsp_signed ? this.dma_buffer_int16 : this.dma_buffer_uint16 : this.dsp_signed ? this.dma_buffer_int8 : this.dma_buffer_uint8;
        for (var f = 0, g = 0; g < a; g++)
            for (var k = audio_normalize(e[g], b, c), l = 0; l < d; l++) this.dac_buffers[f].push(k), f ^= 1;
        this.dac_send()
    };
    SB16.prototype.dac_handle_request = function() {
        !this.dma_bytes_left || this.dma_paused ? this.dac_send() : this.dma_transfer_next()
    };
    SB16.prototype.dac_send = function() {
        if (this.dac_buffers[0].length) {
            var a = this.dac_buffers[0].shift_block(this.dac_buffers[0].length),
                b = this.dac_buffers[1].shift_block(this.dac_buffers[1].length);
            this.bus.send("dac-send-data", [a, b], [a.buffer, b.buffer])
        }
    };
    SB16.prototype.raise_irq = function(a) {
        dbg_log("raise irq", LOG_SB16);
        this.irq_triggered[a] = 1;
        this.cpu.device_raise_irq(this.irq)
    };
    SB16.prototype.lower_irq = function(a) {
        dbg_log("lower irq", LOG_SB16);
        this.irq_triggered[a] = 0;
        this.cpu.device_lower_irq(this.irq)
    };

    function audio_normalize(a, b, c) {
        return audio_clip(a / b + c, -1, 1)
    }

    function audio_clip(a, b, c) {
        return (a < b) * b + (a > c) * c + (b <= a && a <= c) * a
    };
    const VIRTIO_PCI_VENDOR_ID = 6900,
        VIRTIO_PCI_CAP_VENDOR = 9,
        VIRTIO_PCI_CAP_LENGTH = 16,
        VIRTIO_PCI_CAP_COMMON_CFG = 1,
        VIRTIO_PCI_CAP_NOTIFY_CFG = 2,
        VIRTIO_PCI_CAP_ISR_CFG = 3,
        VIRTIO_PCI_CAP_DEVICE_CFG = 4,
        VIRTIO_PCI_CAP_PCI_CFG = 5,
        VIRTIO_STATUS_ACKNOWLEDGE = 1,
        VIRTIO_STATUS_DRIVER = 2,
        VIRTIO_STATUS_DRIVER_OK = 4,
        VIRTIO_STATUS_FEATURES_OK = 8,
        VIRTIO_STATUS_DEVICE_NEEDS_RESET = 64,
        VIRTIO_STATUS_FAILED = 128,
        VIRTIO_ISR_QUEUE = 1,
        VIRTIO_ISR_DEVICE_CFG = 2,
        VIRTIO_F_RING_INDIRECT_DESC = 28,
        VIRTIO_F_RING_EVENT_IDX = 29,
        VIRTIO_F_VERSION_1 =
        32,
        VIRTQ_DESC_ENTRYSIZE = 16,
        VIRTQ_AVAIL_BASESIZE = 6,
        VIRTQ_AVAIL_ENTRYSIZE = 2,
        VIRTQ_USED_BASESIZE = 6,
        VIRTQ_USED_ENTRYSIZE = 8,
        VIRTQ_IDX_MASK = 65535,
        VIRTQ_DESC_F_NEXT = 1,
        VIRTQ_DESC_F_WRITE = 2,
        VIRTQ_DESC_F_INDIRECT = 4,
        VIRTQ_AVAIL_F_NO_INTERRUPT = 1,
        VIRTQ_USED_F_NO_NOTIFY = 1;
    var VirtIO_CapabilityStruct, VirtIO_CapabilityInfo, VirtQueue_Options, VirtIO_CommonCapabilityOptions, VirtIO_NotificationCapabilityOptions, VirtIO_ISRCapabilityOptions, VirtIO_DeviceSpecificCapabilityOptions, VirtIO_Options;

    function VirtIO(a, b) {
        this.cpu = a;
        this.pci = a.devices.pci;
        this.device_id = b.device_id;
        this.pci_space = [VIRTIO_PCI_VENDOR_ID & 255, VIRTIO_PCI_VENDOR_ID >> 8, b.device_id & 255, b.device_id >> 8, 7, 5, 16, 0, 1, 0, 2, 0, 0, 0, 0, 0, 1, 168, 0, 0, 0, 16, 191, 254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, VIRTIO_PCI_VENDOR_ID & 255, VIRTIO_PCI_VENDOR_ID >> 8, b.subsystem_device_id & 255, b.subsystem_device_id >> 8, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
        this.pci_space = this.pci_space.concat(v86util.zeros(256 - this.pci_space.length));
        this.pci_id = b.pci_id;
        this.pci_bars = [];
        this.name = b.name;
        this.driver_feature_select = this.device_feature_select = 0;
        this.device_feature = new Uint32Array(4);
        this.driver_feature = new Uint32Array(4);
        for (var c of b.common.features) dbg_assert(0 <= c, "VirtIO device<" + this.name + "> feature bit numbers must be non-negative"), dbg_assert(128 > c, "VirtIO device<" + this.name + "> feature bit numbers assumed less than 128 in implementation"), this.device_feature[c >>> 5] |= 1 << (c & 31), this.driver_feature[c >>> 5] |= 1 << (c & 31);
        dbg_assert(b.common.features.includes(VIRTIO_F_VERSION_1),
            "VirtIO device<" + this.name + "> only non-transitional devices are supported");
        this.features_ok = !0;
        this.device_status = 0;
        this.config_has_changed = !1;
        this.config_generation = 0;
        this.queues = [];
        for (var d of b.common.queues) this.queues.push(new VirtQueue(a, this, d));
        this.queue_select = 0;
        this.queue_selected = this.queues[0];
        this.isr_status = 0;
        if (DEBUG) {
            c = new Set;
            for (var e of this.queues.map(f => f.notify_offset)) d = b.notification.single_handler ? 0 : e, c.add(d), dbg_assert(b.notification.handlers[d], "VirtIO device<" + this.name +
                "> every queue's notifier must exist");
            for (const [f, g] of b.notification.handlers.entries()) dbg_assert(!g || c.has(f), "VirtIO device<" + this.name + "> no defined notify handler should be unused")
        }
        e = [];
        e.push(this.create_common_capability(b.common));
        e.push(this.create_notification_capability(b.notification));
        e.push(this.create_isr_capability(b.isr_status));
        b.device_specific && e.push(this.create_device_specific_capability(b.device_specific));
        this.init_capabilities(e);
        a.devices.pci.register_device(this);
        this.reset()
    }
    VirtIO.prototype.create_common_capability = function(a) {
        return {
            type: VIRTIO_PCI_CAP_COMMON_CFG,
            bar: 0,
            port: a.initial_port,
            use_mmio: !1,
            offset: 0,
            extra: new Uint8Array(0),
            struct: [{
                bytes: 4,
                name: "device_feature_select",
                read: () => this.device_feature_select,
                write: b => {
                    this.device_feature_select = b
                }
            }, {
                bytes: 4,
                name: "device_feature",
                read: () => this.device_feature[this.device_feature_select] || 0,
                write: b => {}
            }, {
                bytes: 4,
                name: "driver_feature_select",
                read: () => this.driver_feature_select,
                write: b => {
                    this.driver_feature_select =
                        b
                }
            }, {
                bytes: 4,
                name: "driver_feature",
                read: () => this.driver_feature[this.driver_feature_select] || 0,
                write: b => {
                    const c = this.device_feature[this.driver_feature_select];
                    this.driver_feature_select < this.driver_feature.length && (this.driver_feature[this.driver_feature_select] = b & c);
                    this.features_ok = this.features_ok && !(b & ~c)
                }
            }, {
                bytes: 2,
                name: "msix_config",
                read: () => {
                    dbg_log("No msi-x capability supported.", LOG_VIRTIO);
                    return 65535
                },
                write: b => {
                    dbg_log("No msi-x capability supported.", LOG_VIRTIO)
                }
            }, {
                bytes: 2,
                name: "num_queues",
                read: () => this.queues.length,
                write: b => {}
            }, {
                bytes: 1,
                name: "device_status",
                read: () => this.device_status,
                write: b => {
                    0 === b ? (dbg_log("Reset device<" + this.name + ">", LOG_VIRTIO), this.reset()) : b & VIRTIO_STATUS_FAILED ? dbg_log("Warning: Device<" + this.name + "> status failed", LOG_VIRTIO) : dbg_log("Device<" + this.name + "> status: " + (b & VIRTIO_STATUS_ACKNOWLEDGE ? "ACKNOWLEDGE " : "") + (b & VIRTIO_STATUS_DRIVER ? "DRIVER " : "") + (b & VIRTIO_STATUS_DRIVER_OK ? "DRIVER_OK" : "") + (b & VIRTIO_STATUS_FEATURES_OK ? "FEATURES_OK " : "") + (b & VIRTIO_STATUS_DEVICE_NEEDS_RESET ?
                        "DEVICE_NEEDS_RESET" : ""), LOG_VIRTIO);
                    b & ~this.device_status & VIRTIO_STATUS_DRIVER_OK && this.device_status & VIRTIO_STATUS_DEVICE_NEEDS_RESET && this.notify_config_changes();
                    this.features_ok || (DEBUG && b & VIRTIO_STATUS_FEATURES_OK && dbg_log("Removing FEATURES_OK", LOG_VIRTIO), b &= ~VIRTIO_STATUS_FEATURES_OK);
                    this.device_status = b;
                    if (b & ~this.device_status & VIRTIO_STATUS_DRIVER_OK) a.on_driver_ok()
                }
            }, {
                bytes: 1,
                name: "config_generation",
                read: () => this.config_generation,
                write: b => {}
            }, {
                bytes: 2,
                name: "queue_select",
                read: () =>
                    this.queue_select,
                write: b => {
                    this.queue_select = b;
                    this.queue_select < this.queues.length ? this.queues_selected = this.queues[this.queue_select] : this.queue_selected = null
                }
            }, {
                bytes: 2,
                name: "queue_size",
                read: () => this.queue_selected ? this.queue_selected.size : 0,
                write: b => {
                    this.queue_selected && (b & b - 1 && (dbg_log("Warning: dev<" + this.name + "> Given queue size was not a power of 2. Rounding up to next power of 2.", LOG_VIRTIO), b = 1 << v86util.int_log2(b - 1) + 1), b > this.queue_selected.size_supported && (dbg_log("Warning: dev<" +
                        this.name + "> Trying to set queue size greater than supported. Clamping to supported size.", LOG_VIRTIO), b = this.queue_selected.size_supported), this.queue_selected.set_size(b))
                }
            }, {
                bytes: 2,
                name: "queue_msix_vector",
                read: () => {
                    dbg_log("No msi-x capability supported.", LOG_VIRTIO);
                    return 65535
                },
                write: b => {
                    dbg_log("No msi-x capability supported.", LOG_VIRTIO)
                }
            }, {
                bytes: 2,
                name: "queue_enable",
                read: () => this.queue_selected ? this.queue_selected.enabled | 0 : 0,
                write: b => {
                    this.queue_selected && (1 === b ? this.queue_selected.is_configured() ?
                        this.queue_selected.enable() : dbg_log("Driver bug: tried enabling unconfigured queue", LOG_VIRTIO) : 0 === b && dbg_log("Driver bug: tried writing 0 to queue_enable", LOG_VIRTIO))
                }
            }, {
                bytes: 2,
                name: "queue_notify_off",
                read: () => this.queue_selected ? this.queue_selected.notify_offset : 0,
                write: b => {}
            }, {
                bytes: 4,
                name: "queue_desc (low dword)",
                read: () => this.queue_selected ? this.queue_selected.desc_addr : 0,
                write: b => {
                    this.queue_selected && (this.queue_selected.desc_addr = b)
                }
            }, {
                bytes: 4,
                name: "queue_desc (high dword)",
                read: () => 0,
                write: b => {
                    dbg_log("Warning: High dword of 64 bit queue_desc ignored", LOG_VIRTIO)
                }
            }, {
                bytes: 4,
                name: "queue_avail (low dword)",
                read: () => this.queue_selected ? this.queue_selected.avail_addr : 0,
                write: b => {
                    this.queue_selected && (this.queue_selected.avail_addr = b)
                }
            }, {
                bytes: 4,
                name: "queue_avail (high dword)",
                read: () => 0,
                write: b => {
                    dbg_log("Warning: High dword of 64 bit queue_avail ignored", LOG_VIRTIO)
                }
            }, {
                bytes: 4,
                name: "queue_used (low dword)",
                read: () => this.queue_selected ? this.queue_selected.used_addr : 0,
                write: b => {
                    this.queue_selected &&
                        (this.queue_selected.used_addr = b)
                }
            }, {
                bytes: 4,
                name: "queue_used (high dword)",
                read: () => 0,
                write: b => {
                    dbg_log("Warning: High dword of 64 bit queue_used ignored", LOG_VIRTIO)
                }
            }]
        }
    };
    VirtIO.prototype.create_notification_capability = function(a) {
        const b = [];
        let c;
        a.single_handler ? (dbg_assert(1 === a.handlers.length, "VirtIO device<" + this.name + "> too many notify handlers specified: expected single handler"), c = 0) : c = 2;
        for (const [d, e] of a.handlers.entries()) b.push({
            bytes: 2,
            name: "notify" + d,
            read: () => 65535,
            write: e || (f => {})
        });
        return {
            type: VIRTIO_PCI_CAP_NOTIFY_CFG,
            bar: 1,
            port: a.initial_port,
            use_mmio: !1,
            offset: 0,
            extra: new Uint8Array([c & 255, c >> 8 & 255, c >> 16 & 255, c >> 24]),
            struct: b
        }
    };
    VirtIO.prototype.create_isr_capability = function(a) {
        return {
            type: VIRTIO_PCI_CAP_ISR_CFG,
            bar: 2,
            port: a.initial_port,
            use_mmio: !1,
            offset: 0,
            extra: new Uint8Array(0),
            struct: [{
                bytes: 1,
                name: "isr_status",
                read: () => {
                    const b = this.isr_status;
                    this.lower_irq();
                    return b
                },
                write: b => {}
            }]
        }
    };
    VirtIO.prototype.create_device_specific_capability = function(a) {
        dbg_assert(~a.offset & 3, "VirtIO device<" + this.name + "> device specific cap offset must be 4-byte aligned");
        return {
            type: VIRTIO_PCI_CAP_DEVICE_CFG,
            bar: 3,
            port: a.initial_port,
            use_mmio: !1,
            offset: 0,
            extra: new Uint8Array(0),
            struct: a.struct
        }
    };
    VirtIO.prototype.init_capabilities = function(a) {
        let b = this.pci_space[52] = 64;
        var c = b;
        for (const e of a) {
            a = VIRTIO_PCI_CAP_LENGTH + e.extra.length;
            c = b;
            b = c + a;
            dbg_assert(256 >= b, "VirtIO device<" + this.name + "> can't fit all capabilities into 256byte configspace");
            dbg_assert(0 <= e.bar && 6 > e.bar, "VirtIO device<" + this.name + "> capability invalid bar number");
            var d = e.struct.reduce((f, g) => f + g.bytes, 0);
            d += e.offset;
            d = 16 > d ? 16 : 1 << v86util.int_log2(d - 1) + 1;
            dbg_assert(0 === (e.port & d - 1), "VirtIO device<" + this.name + "> capability port should be aligned to pci bar size");
            this.pci_bars[e.bar] = {
                size: d
            };
            this.pci_space[c] = VIRTIO_PCI_CAP_VENDOR;
            this.pci_space[c + 1] = b;
            this.pci_space[c + 2] = a;
            this.pci_space[c + 3] = e.type;
            this.pci_space[c + 4] = e.bar;
            this.pci_space[c + 5] = 0;
            this.pci_space[c + 6] = 0;
            this.pci_space[c + 7] = 0;
            this.pci_space[c + 8] = e.offset & 255;
            this.pci_space[c + 9] = e.offset >>> 8 & 255;
            this.pci_space[c + 10] = e.offset >>> 16 & 255;
            this.pci_space[c + 11] = e.offset >>> 24;
            this.pci_space[c + 12] = d & 255;
            this.pci_space[c + 13] = d >>> 8 & 255;
            this.pci_space[c + 14] = d >>> 16 & 255;
            this.pci_space[c + 15] = d >>> 24;
            for (const [f,
                    g
                ] of e.extra.entries()) this.pci_space[c + 16 + f] = g;
            c = 16 + 4 * e.bar;
            this.pci_space[c] = e.port & 254 | !e.use_mmio;
            this.pci_space[c + 1] = e.port >>> 8 & 255;
            this.pci_space[c + 2] = e.port >>> 16 & 255;
            this.pci_space[c + 3] = e.port >>> 24 & 255;
            c = e.port + e.offset;
            for (const f of e.struct) {
                let g = f.read;
                a = f.write;
                DEBUG && (g = () => {
                    const k = f.read();
                    dbg_log("Device<" + this.name + "> cap[" + e.type + "] read[" + f.name + "] => " + h(k, 8 * f.bytes), LOG_VIRTIO);
                    return k
                }, a = k => {
                    dbg_log("Device<" + this.name + "> cap[" + e.type + "] write[" + f.name + "] <= " + h(k, 8 * f.bytes),
                        LOG_VIRTIO);
                    f.write(k)
                });
                if (e.use_mmio) dbg_assert(!1, "VirtIO device <" + this.name + "> mmio capability not implemented.");
                else {
                    d = function(l) {
                        dbg_log("Warning: 8-bit read from 16-bit virtio port", LOG_VIRTIO);
                        return g(l & -2) >> ((l & 1) << 3) & 255
                    };
                    const k = function(l) {
                        dbg_log("Warning: 8-bit read from 32-bit virtio port", LOG_VIRTIO);
                        return g(l & -4) >> ((l & 3) << 3) & 255
                    };
                    switch (f.bytes) {
                        case 4:
                            this.cpu.io.register_read(c, this, k, void 0, g);
                            this.cpu.io.register_write(c, this, void 0, void 0, a);
                            break;
                        case 2:
                            this.cpu.io.register_read(c,
                                this, d, g);
                            this.cpu.io.register_write(c, this, void 0, a);
                            break;
                        case 1:
                            this.cpu.io.register_read(c, this, g);
                            this.cpu.io.register_write(c, this, a);
                            break;
                        default:
                            dbg_assert(!1, "VirtIO device <" + this.name + "> invalid capability field width of " + f.bytes + " bytes")
                    }
                }
                c += f.bytes
            }
        }
        c = VIRTIO_PCI_CAP_LENGTH + 4;
        dbg_assert(256 >= b + c, "VirtIO device<" + this.name + "> can't fit all capabilities into 256byte configspace");
        this.pci_space[b] = VIRTIO_PCI_CAP_VENDOR;
        this.pci_space[b + 1] = 0;
        this.pci_space[b + 2] = c;
        this.pci_space[b + 3] = VIRTIO_PCI_CAP_PCI_CFG;
        this.pci_space[b + 4] = 0;
        this.pci_space[b + 5] = 0;
        this.pci_space[b + 6] = 0;
        this.pci_space[b + 7] = 0;
        this.pci_space[b + 8] = 0;
        this.pci_space[b + 9] = 0;
        this.pci_space[b + 10] = 0;
        this.pci_space[b + 11] = 0;
        this.pci_space[b + 12] = 0;
        this.pci_space[b + 13] = 0;
        this.pci_space[b + 14] = 0;
        this.pci_space[b + 15] = 0;
        this.pci_space[b + 16] = 0;
        this.pci_space[b + 17] = 0;
        this.pci_space[b + 18] = 0;
        this.pci_space[b + 19] = 0
    };
    VirtIO.prototype.get_state = function() {
        let a = [];
        a[0] = this.device_feature_select;
        a[1] = this.driver_feature_select;
        a[2] = this.device_feature;
        a[3] = this.driver_feature;
        a[4] = this.features_ok;
        a[5] = this.device_status;
        a[6] = this.config_has_changed;
        a[7] = this.config_generation;
        a[8] = this.isr_status;
        a[9] = this.queue_select;
        return a = a.concat(this.queues)
    };
    VirtIO.prototype.set_state = function(a) {
        this.device_feature_select = a[0];
        this.driver_feature_select = a[1];
        this.device_feature = a[2];
        this.driver_feature = a[3];
        this.features_ok = a[4];
        this.device_status = a[5];
        this.config_has_changed = a[6];
        this.config_generation = a[7];
        this.isr_status = a[8];
        this.queue_select = a[9];
        let b = 0;
        for (let c of a.slice(10)) this.queues[b].set_state(c), b++;
        this.queue_selected = this.queues[this.queue_select] || null
    };
    VirtIO.prototype.reset = function() {
        this.driver_feature_select = this.device_feature_select = 0;
        this.driver_feature.set(this.device_feature);
        this.features_ok = !0;
        this.queue_select = this.device_status = 0;
        this.queue_selected = this.queues[0];
        for (const a of this.queues) a.reset();
        this.config_has_changed = !1;
        this.config_generation = 0;
        this.lower_irq()
    };
    VirtIO.prototype.notify_config_changes = function() {
        this.config_has_changed = !0;
        this.device_status & VIRTIO_STATUS_DRIVER_OK ? this.raise_irq(VIRTIO_ISR_DEVICE_CFG) : dbg_assert(!1, "VirtIO device<" + this.name + "> attempted to notify driver before DRIVER_OK")
    };
    VirtIO.prototype.update_config_generation = function() {
        this.config_has_changed && (this.config_generation++, this.config_generation &= 255, this.config_has_changed = !1)
    };
    VirtIO.prototype.is_feature_negotiated = function(a) {
        return 0 < (this.driver_feature[a >>> 5] & 1 << (a & 31))
    };
    VirtIO.prototype.needs_reset = function() {
        dbg_log("Device<" + this.name + "> experienced error - requires reset", LOG_VIRTIO);
        this.device_status |= VIRTIO_STATUS_DEVICE_NEEDS_RESET;
        this.device_status & VIRTIO_STATUS_DRIVER_OK && this.notify_config_changes()
    };
    VirtIO.prototype.raise_irq = function(a) {
        dbg_log("Raise irq " + h(a), LOG_VIRTIO);
        this.isr_status |= a;
        this.pci.raise_irq(this.pci_id)
    };
    VirtIO.prototype.lower_irq = function() {
        dbg_log("Lower irq ", LOG_VIRTIO);
        this.isr_status = 0;
        this.pci.lower_irq(this.pci_id)
    };

    function VirtQueue(a, b, c) {
        this.cpu = a;
        this.virtio = b;
        this.size_supported = this.size = c.size_supported;
        this.mask = this.size - 1;
        this.enabled = !1;
        this.notify_offset = c.notify_offset;
        this.num_staged_replies = this.used_addr = this.avail_last_idx = this.avail_addr = this.desc_addr = 0;
        this.reset()
    }
    VirtQueue.prototype.get_state = function() {
        const a = [];
        a[0] = this.size;
        a[1] = this.size_supported;
        a[2] = this.enabled;
        a[3] = this.notify_offset;
        a[4] = this.desc_addr;
        a[5] = this.avail_addr;
        a[6] = this.avail_last_idx;
        a[7] = this.used_addr;
        a[8] = this.num_staged_replies;
        return a
    };
    VirtQueue.prototype.set_state = function(a) {
        this.size = a[0];
        this.size_supported = a[1];
        this.enabled = a[2];
        this.notify_offset = a[3];
        this.desc_addr = a[4];
        this.avail_addr = a[5];
        this.avail_last_idx = a[6];
        this.used_addr = a[7];
        this.num_staged_replies = a[8];
        this.mask = this.size - 1
    };
    VirtQueue.prototype.reset = function() {
        this.enabled = !1;
        this.num_staged_replies = this.used_addr = this.avail_last_idx = this.avail_addr = this.desc_addr = 0;
        this.set_size(this.size_supported)
    };
    VirtQueue.prototype.is_configured = function() {
        return this.desc_addr && this.avail_addr && this.used_addr
    };
    VirtQueue.prototype.enable = function() {
        dbg_assert(this.is_configured(), "VirtQueue must be configured before enabled");
        this.enabled = !0
    };
    VirtQueue.prototype.set_size = function(a) {
        dbg_assert(0 === (a & a - 1), "VirtQueue size must be power of 2 or zero");
        dbg_assert(a <= this.size_supported, "VirtQueue size must be within supported size");
        this.size = a;
        this.mask = a - 1
    };
    VirtQueue.prototype.count_requests = function() {
        dbg_assert(this.avail_addr, "VirtQueue addresses must be configured before use");
        return this.avail_get_idx() - this.avail_last_idx & this.mask
    };
    VirtQueue.prototype.has_request = function() {
        dbg_assert(this.avail_addr, "VirtQueue addresses must be configured before use");
        return (this.avail_get_idx() & this.mask) !== this.avail_last_idx
    };
    VirtQueue.prototype.pop_request = function() {
        dbg_assert(this.avail_addr, "VirtQueue addresses must be configured before use");
        dbg_assert(this.has_request(), "VirtQueue must not pop nonexistent request");
        var a = this.avail_get_entry(this.avail_last_idx);
        dbg_log("Pop request: avail_last_idx=" + this.avail_last_idx + " desc_idx=" + a, LOG_VIRTIO);
        a = new VirtQueueBufferChain(this, a);
        this.avail_last_idx = this.avail_last_idx + 1 & this.mask;
        return a
    };
    VirtQueue.prototype.push_reply = function(a) {
        dbg_assert(this.used_addr, "VirtQueue addresses must be configured before use");
        dbg_assert(this.num_staged_replies < this.size, "VirtQueue replies must not exceed queue size");
        const b = this.used_get_idx() + this.num_staged_replies & this.mask;
        dbg_log("Push reply: used_idx=" + b + " desc_idx=" + a.head_idx, LOG_VIRTIO);
        this.used_set_entry(b, a.head_idx, a.length_written);
        this.num_staged_replies++
    };
    VirtQueue.prototype.flush_replies = function() {
        dbg_assert(this.used_addr, "VirtQueue addresses must be configured before use");
        if (0 === this.num_staged_replies) dbg_log("flush_replies: Nothing to flush", LOG_VIRTIO);
        else {
            dbg_log("Flushing " + this.num_staged_replies + " replies", LOG_VIRTIO);
            var a = this.used_get_idx() + this.num_staged_replies & VIRTQ_IDX_MASK;
            this.used_set_idx(a);
            this.num_staged_replies = 0;
            this.virtio.is_feature_negotiated(VIRTIO_F_RING_EVENT_IDX) ? (this.avail_get_used_event(), this.virtio.raise_irq(VIRTIO_ISR_QUEUE)) :
                ~this.avail_get_flags() & VIRTQ_AVAIL_F_NO_INTERRUPT && this.virtio.raise_irq(VIRTIO_ISR_QUEUE)
        }
    };
    VirtQueue.prototype.notify_me_after = function(a) {
        dbg_assert(0 <= a, "Must skip a non-negative number of requests");
        a = this.avail_get_idx() + a & 65535;
        this.used_set_avail_event(a)
    };
    VirtQueue.prototype.get_descriptor = function(a, b) {
        return {
            addr_low: this.cpu.read32s(a + b * VIRTQ_DESC_ENTRYSIZE),
            addr_high: this.cpu.read32s(a + b * VIRTQ_DESC_ENTRYSIZE + 4),
            len: this.cpu.read32s(a + b * VIRTQ_DESC_ENTRYSIZE + 8),
            flags: this.cpu.read16(a + b * VIRTQ_DESC_ENTRYSIZE + 12),
            next: this.cpu.read16(a + b * VIRTQ_DESC_ENTRYSIZE + 14)
        }
    };
    VirtQueue.prototype.avail_get_flags = function() {
        return this.cpu.read16(this.avail_addr)
    };
    VirtQueue.prototype.avail_get_idx = function() {
        return this.cpu.read16(this.avail_addr + 2)
    };
    VirtQueue.prototype.avail_get_entry = function(a) {
        return this.cpu.read16(this.avail_addr + 4 + VIRTQ_AVAIL_ENTRYSIZE * a)
    };
    VirtQueue.prototype.avail_get_used_event = function() {
        return this.cpu.read16(this.avail_addr + 4 + VIRTQ_AVAIL_ENTRYSIZE * this.size)
    };
    VirtQueue.prototype.used_get_flags = function() {
        return this.cpu.read16(this.used_addr)
    };
    VirtQueue.prototype.used_set_flags = function(a) {
        this.cpu.write16(this.used_addr, a)
    };
    VirtQueue.prototype.used_get_idx = function() {
        return this.cpu.read16(this.used_addr + 2)
    };
    VirtQueue.prototype.used_set_idx = function(a) {
        this.cpu.write16(this.used_addr + 2, a)
    };
    VirtQueue.prototype.used_set_entry = function(a, b, c) {
        this.cpu.write32(this.used_addr + 4 + VIRTQ_USED_ENTRYSIZE * a, b);
        this.cpu.write32(this.used_addr + 8 + VIRTQ_USED_ENTRYSIZE * a, c)
    };
    VirtQueue.prototype.used_set_avail_event = function(a) {
        this.cpu.write16(this.used_addr + 4 + VIRTQ_USED_ENTRYSIZE * this.size, a)
    };

    function VirtQueueBufferChain(a, b) {
        this.cpu = a.cpu;
        this.virtio = a.virtio;
        this.head_idx = b;
        this.read_buffers = [];
        this.length_readable = this.read_buffer_offset = this.read_buffer_idx = 0;
        this.write_buffers = [];
        this.length_writable = this.length_written = this.write_buffer_offset = this.write_buffer_idx = 0;
        let c = a.desc_addr,
            d = 0,
            e = a.size,
            f = !1;
        const g = this.virtio.is_feature_negotiated(VIRTIO_F_RING_INDIRECT_DESC);
        dbg_log("<<< Descriptor chain start", LOG_VIRTIO);
        do {
            const k = a.get_descriptor(c, b);
            dbg_log("descriptor: idx=" +
                b + " addr=" + h(k.addr_high, 8) + ":" + h(k.addr_low, 8) + " len=" + h(k.len, 8) + " flags=" + h(k.flags, 4) + " next=" + h(k.next, 4), LOG_VIRTIO);
            if (g && k.flags & VIRTQ_DESC_F_INDIRECT) DEBUG && k.flags & VIRTQ_DESC_F_NEXT && dbg_log("Driver bug: has set VIRTQ_DESC_F_NEXT flag in an indirect table descriptor", LOG_VIRTIO), c = k.addr_low, d = b = 0, e = k.len / VIRTQ_DESC_ENTRYSIZE, dbg_log("start indirect", LOG_VIRTIO);
            else {
                if (k.flags & VIRTQ_DESC_F_WRITE) f = !0, this.write_buffers.push(k), this.length_writable += k.len;
                else {
                    if (f) {
                        dbg_log("Driver bug: readonly buffer after writeonly buffer within chain",
                            LOG_VIRTIO);
                        break
                    }
                    this.read_buffers.push(k);
                    this.length_readable += k.len
                }
                d++;
                if (d > e) {
                    dbg_log("Driver bug: descriptor chain cycle detected", LOG_VIRTIO);
                    break
                }
                if (k.flags & VIRTQ_DESC_F_NEXT) b = k.next;
                else break
            }
        } while (1);
        dbg_log("Descriptor chain end >>>", LOG_VIRTIO)
    }
    VirtQueueBufferChain.prototype.get_next_blob = function(a) {
        let b = 0,
            c = a.length;
        for (; c;) {
            if (this.read_buffer_idx === this.read_buffers.length) {
                dbg_log("Device<" + this.virtio.name + "> Read more than device-readable buffers has", LOG_VIRTIO);
                break
            }
            var d = this.read_buffers[this.read_buffer_idx];
            const e = d.addr_low + this.read_buffer_offset;
            d = d.len - this.read_buffer_offset;
            d > c ? (d = c, this.read_buffer_offset += c) : (this.read_buffer_idx++, this.read_buffer_offset = 0);
            a.set(this.cpu.read_blob(e, d), b);
            b += d;
            c -= d
        }
        return b
    };
    VirtQueueBufferChain.prototype.set_next_blob = function(a) {
        let b = 0,
            c = a.length;
        for (; c;) {
            if (this.write_buffer_idx === this.write_buffers.length) {
                dbg_log("Device<" + this.virtio.name + "> Write more than device-writable capacity", LOG_VIRTIO);
                break
            }
            var d = this.write_buffers[this.write_buffer_idx];
            const e = d.addr_low + this.write_buffer_offset;
            d = d.len - this.write_buffer_offset;
            d > c ? (d = c, this.write_buffer_offset += c) : (this.write_buffer_idx++, this.write_buffer_offset = 0);
            this.cpu.write_blob(a.subarray(b, b + d), e);
            b += d;
            c -=
                d
        }
        this.length_written += b;
        return b
    };
    var Bus = {};

    function BusConnector() {
        this.listeners = {};
        this.pair = void 0
    }
    BusConnector.prototype.register = function(a, b, c) {
        var d = this.listeners[a];
        void 0 === d && (d = this.listeners[a] = []);
        d.push({
            fn: b,
            this_value: c
        })
    };
    BusConnector.prototype.unregister = function(a, b) {
        var c = this.listeners[a];
        void 0 !== c && (this.listeners[a] = c.filter(function(d) {
            return d.fn !== b
        }))
    };
    BusConnector.prototype.send = function(a, b, c) {
        if (this.pair && (a = this.pair.listeners[a], void 0 !== a))
            for (c = 0; c < a.length; c++) {
                var d = a[c];
                d.fn.call(d.this_value, b)
            }
    };
    BusConnector.prototype.send_async = function(a, b) {
        dbg_assert(1 === arguments.length || 2 === arguments.length);
        setTimeout(this.send.bind(this, a, b), 0)
    };
    Bus.create = function() {
        var a = new BusConnector,
            b = new BusConnector;
        a.pair = b;
        b.pair = a;
        return [a, b]
    };
    var log_data = [];

    function do_the_log(a) {
        LOG_TO_FILE ? log_data.push(a, "\n") : console.log(a)
    }
    var dbg_log = function() {
        if (!DEBUG) return function() {};
        var a = LOG_NAMES.reduce(function(d, e) {
                d[e[0]] = e[1];
                return d
            }, {}),
            b = "",
            c = 0;
        return function(d, e) {
            if (DEBUG && (e = e || 1, e & LOG_LEVEL)) {
                d = "[" + v86util.pads(a[e] || "", 4) + "] " + d;
                if (d === b && (c++, 2048 > c)) return;
                e = new Date;
                e = v86util.pad0(e.getHours(), 2) + ":" + v86util.pad0(e.getMinutes(), 2) + ":" + v86util.pad0(e.getSeconds(), 2) + "+" + v86util.pad0(e.getMilliseconds(), 3) + " ";
                c && (1 === c ? do_the_log(e + b) : do_the_log("Previous message repeated " + c + " times"), c = 0);
                do_the_log(e + d);
                b = d
            }
        }
    }();

    function dbg_trace(a) {
        DEBUG && dbg_log(Error().stack, a)
    }

    function dbg_assert(a, b, c) {
        DEBUG && (a || dbg_assert_failed(b))
    }

    function dbg_assert_failed(a) {
        debugger;
        console.trace();
        if (a) throw "Assert failed: " + a;
        throw "Assert failed";
    };
    var CPU_LOG_VERBOSE = !1;

    function CPU(a, b, c) {
        this.next_tick_immediately = c;
        this.wm = b;
        this.wasm_patch();
        this.create_jit_imports();
        this.wasm_memory = b = this.wm.exports.memory;
        this.memory_size = v86util.view(Uint32Array, b, 812, 1);
        this.mem8 = new Uint8Array(0);
        this.mem32s = new Int32Array(this.mem8.buffer);
        this.segment_is_null = v86util.view(Uint8Array, b, 724, 8);
        this.segment_offsets = v86util.view(Int32Array, b, 736, 8);
        this.segment_limits = v86util.view(Uint32Array, b, 768, 8);
        this.protected_mode = v86util.view(Int32Array, b, 800, 1);
        this.idtr_size = v86util.view(Int32Array,
            b, 564, 1);
        this.idtr_offset = v86util.view(Int32Array, b, 568, 1);
        this.gdtr_size = v86util.view(Int32Array, b, 572, 1);
        this.gdtr_offset = v86util.view(Int32Array, b, 576, 1);
        this.tss_size_32 = v86util.view(Int32Array, b, 1128, 1);
        this.page_fault = v86util.view(Uint32Array, b, 540, 8);
        this.cr = v86util.view(Int32Array, b, 580, 8);
        this.cpl = v86util.view(Uint8Array, b, 612, 1);
        this.is_32 = v86util.view(Int32Array, b, 804, 1);
        this.stack_size_32 = v86util.view(Int32Array, b, 808, 1);
        this.in_hlt = v86util.view(Uint8Array, b, 616, 1);
        this.last_virt_eip =
            v86util.view(Int32Array, b, 620, 1);
        this.eip_phys = v86util.view(Int32Array, b, 624, 1);
        this.sysenter_cs = v86util.view(Int32Array, b, 636, 1);
        this.sysenter_esp = v86util.view(Int32Array, b, 640, 1);
        this.sysenter_eip = v86util.view(Int32Array, b, 644, 1);
        this.prefixes = v86util.view(Int32Array, b, 648, 1);
        this.flags = v86util.view(Int32Array, b, 120, 1);
        this.flags_changed = v86util.view(Int32Array, b, 116, 1);
        this.last_op1 = v86util.view(Int32Array, b, 96, 1);
        this.last_op_size = v86util.view(Int32Array, b, 104, 1);
        this.last_result = v86util.view(Int32Array,
            b, 112, 1);
        this.current_tsc = v86util.view(Uint32Array, b, 960, 2);
        this.devices = {};
        this.instruction_pointer = v86util.view(Int32Array, b, 556, 1);
        this.previous_ip = v86util.view(Int32Array, b, 560, 1);
        this.apic_enabled = v86util.view(Uint8Array, b, 548, 1);
        this.acpi_enabled = v86util.view(Uint8Array, b, 552, 1);
        this.memory_map_read8 = [];
        this.memory_map_write8 = [];
        this.memory_map_read32 = [];
        this.memory_map_write32 = [];
        this.bios = {
            main: null,
            vga: null
        };
        this.instruction_counter = v86util.view(Uint32Array, b, 664, 1);
        this.reg32 = v86util.view(Int32Array,
            b, 64, 8);
        this.fpu_st = v86util.view(Int32Array, b, 1152, 32);
        this.fpu_stack_empty = v86util.view(Uint8Array, b, 816, 1);
        this.fpu_stack_empty[0] = 255;
        this.fpu_stack_ptr = v86util.view(Uint8Array, b, 1032, 1);
        this.fpu_stack_ptr[0] = 0;
        this.fpu_control_word = v86util.view(Uint16Array, b, 1036, 1);
        this.fpu_control_word[0] = 895;
        this.fpu_status_word = v86util.view(Uint16Array, b, 1040, 1);
        this.fpu_status_word[0] = 0;
        this.fpu_ip = v86util.view(Int32Array, b, 1048, 1);
        this.fpu_ip[0] = 0;
        this.fpu_ip_selector = v86util.view(Int32Array, b, 1052, 1);
        this.fpu_ip_selector[0] =
            0;
        this.fpu_opcode = v86util.view(Int32Array, b, 1044, 1);
        this.fpu_opcode[0] = 0;
        this.fpu_dp = v86util.view(Int32Array, b, 1056, 1);
        this.fpu_dp[0] = 0;
        this.fpu_dp_selector = v86util.view(Int32Array, b, 1060, 1);
        this.fpu_dp_selector[0] = 0;
        this.reg_xmm32s = v86util.view(Int32Array, b, 832, 32);
        this.mxcsr = v86util.view(Int32Array, b, 824, 1);
        this.sreg = v86util.view(Uint16Array, b, 668, 8);
        this.dreg = v86util.view(Int32Array, b, 684, 8);
        this.reg_pdpte = v86util.view(Int32Array, b, 968, 8);
        this.svga_dirty_bitmap_min_offset = v86util.view(Uint32Array,
            b, 716, 1);
        this.svga_dirty_bitmap_max_offset = v86util.view(Uint32Array, b, 720, 1);
        this.fw_value = [];
        this.fw_pointer = 0;
        this.option_roms = [];
        this.io = void 0;
        this.bus = a;
        this.set_tsc(0, 0);
        this.debug_init();
        DEBUG && (this.do_many_cycles_total = this.do_many_cycles_count = 0, this.seen_code = {}, this.seen_code_uncompiled = {})
    }
    CPU.prototype.clear_opstats = function() {
        (new Uint8Array(this.wasm_memory.buffer, 32768, 131072)).fill(0);
        this.wm.exports.profiler_init()
    };
    CPU.prototype.create_jit_imports = function() {
        const a = Object.create(null);
        a.m = this.wm.exports.memory;
        for (let b of Object.keys(this.wm.exports)) b.startsWith("_") || b.startsWith("zstd") || b.endsWith("_js") || (a[b] = this.wm.exports[b]);
        this.jit_imports = a
    };
    CPU.prototype.wasm_patch = function() {
        const a = c => this.wm.exports[c],
            b = c => {
                const d = a(c);
                console.assert(d, "Missing import: " + c);
                return d
            };
        this.reset_cpu = b("reset_cpu");
        this.getiopl = b("getiopl");
        this.get_eflags = b("get_eflags");
        this.get_eflags_no_arith = b("get_eflags_no_arith");
        this.pic_call_irq = b("pic_call_irq");
        this.do_many_cycles_native = b("do_many_cycles_native");
        this.cycle_internal = b("cycle_internal");
        this.read8 = b("read8");
        this.read16 = b("read16");
        this.read32s = b("read32s");
        this.write8 = b("write8");
        this.write16 =
            b("write16");
        this.write32 = b("write32");
        this.in_mapped_range = b("in_mapped_range");
        this.fpu_load_tag_word = b("fpu_load_tag_word");
        this.fpu_load_status_word = b("fpu_load_status_word");
        this.fpu_get_sti_f64 = b("fpu_get_sti_f64");
        this.translate_address_system_read = b("translate_address_system_read_js");
        this.get_seg_cs = b("get_seg_cs");
        this.get_real_eip = b("get_real_eip");
        this.clear_tlb = b("clear_tlb");
        this.full_clear_tlb = b("full_clear_tlb");
        this.set_tsc = b("set_tsc");
        this.store_current_tsc = b("store_current_tsc");
        DEBUG && (this.jit_force_generate_unsafe = a("jit_force_generate_unsafe"));
        this.jit_clear_cache = b("jit_clear_cache_js");
        this.jit_dirty_cache = b("jit_dirty_cache");
        this.codegen_finalize_finished = b("codegen_finalize_finished");
        this.allocate_memory = b("allocate_memory");
        this.zero_memory = b("zero_memory");
        this.svga_allocate_memory = b("svga_allocate_memory");
        this.svga_allocate_dest_buffer = b("svga_allocate_dest_buffer");
        this.svga_fill_pixel_buffer = b("svga_fill_pixel_buffer");
        this.svga_mark_dirty = b("svga_mark_dirty");
        this.zstd_create_ctx = b("zstd_create_ctx");
        this.zstd_get_src_ptr = b("zstd_get_src_ptr");
        this.zstd_free_ctx = b("zstd_free_ctx");
        this.zstd_read = b("zstd_read");
        this.zstd_read_free = b("zstd_read_free")
    };
    CPU.prototype.jit_force_generate = function(a) {
        this.jit_force_generate_unsafe ? this.jit_force_generate_unsafe(a) : dbg_assert(!1, "Not supported in this wasm build: jit_force_generate_unsafe")
    };
    CPU.prototype.jit_clear_func = function(a) {
        dbg_assert(0 <= a && a < WASM_TABLE_SIZE);
        this.wm.wasm_table.set(a + WASM_TABLE_OFFSET, null)
    };
    CPU.prototype.jit_clear_all_funcs = function() {
        const a = this.wm.wasm_table;
        for (let b = 0; b < WASM_TABLE_SIZE; b++) a.set(WASM_TABLE_OFFSET + b, null)
    };
    CPU.prototype.get_state = function() {
        var a = [];
        a[0] = this.memory_size[0];
        a[1] = this.segment_is_null;
        a[2] = this.segment_offsets;
        a[3] = this.segment_limits;
        a[4] = this.protected_mode[0];
        a[5] = this.idtr_offset[0];
        a[6] = this.idtr_size[0];
        a[7] = this.gdtr_offset[0];
        a[8] = this.gdtr_size[0];
        a[9] = this.page_fault[0];
        a[10] = this.cr;
        a[11] = this.cpl[0];
        a[13] = this.is_32[0];
        a[16] = this.stack_size_32[0];
        a[17] = this.in_hlt[0];
        a[18] = this.last_virt_eip[0];
        a[19] = this.eip_phys[0];
        a[22] = this.sysenter_cs[0];
        a[23] = this.sysenter_eip[0];
        a[24] =
            this.sysenter_esp[0];
        a[25] = this.prefixes[0];
        a[26] = this.flags[0];
        a[27] = this.flags_changed[0];
        a[28] = this.last_op1[0];
        a[30] = this.last_op_size[0];
        a[37] = this.instruction_pointer[0];
        a[38] = this.previous_ip[0];
        a[39] = this.reg32;
        a[40] = this.sreg;
        a[41] = this.dreg;
        a[42] = this.reg_pdpte;
        this.store_current_tsc();
        a[43] = this.current_tsc;
        a[45] = this.devices.virtio_9p;
        a[46] = this.devices.apic;
        a[47] = this.devices.rtc;
        a[48] = this.devices.pci;
        a[49] = this.devices.dma;
        a[50] = this.devices.acpi;
        a[51] = this.devices.hpet;
        a[52] = this.devices.vga;
        a[53] = this.devices.ps2;
        a[54] = this.devices.uart0;
        a[55] = this.devices.fdc;
        a[56] = this.devices.cdrom;
        a[57] = this.devices.hda;
        a[58] = this.devices.pit;
        a[59] = this.devices.net;
        a[60] = this.devices.pic;
        a[61] = this.devices.sb16;
        a[62] = this.fw_value;
        a[63] = this.devices.ioapic;
        a[64] = this.tss_size_32[0];
        a[66] = this.reg_xmm32s;
        a[67] = this.fpu_st;
        a[68] = this.fpu_stack_empty[0];
        a[69] = this.fpu_stack_ptr[0];
        a[70] = this.fpu_control_word[0];
        a[71] = this.fpu_ip[0];
        a[72] = this.fpu_ip_selector[0];
        a[73] = this.fpu_dp[0];
        a[74] = this.fpu_dp_selector[0];
        a[75] = this.fpu_opcode[0];
        const {
            packed_memory: b,
            bitmap: c
        } = this.pack_memory();
        a[77] = b;
        a[78] = new Uint8Array(c.get_buffer());
        a[79] = this.devices.uart1;
        a[80] = this.devices.uart2;
        a[81] = this.devices.uart3;
        return a
    };
    CPU.prototype.set_state = function(a) {
        this.memory_size[0] = a[0];
        this.mem8.length !== this.memory_size[0] && console.warn("Note: Memory size mismatch. we=" + this.mem8.length + " state=" + this.memory_size[0]);
        this.segment_is_null.set(a[1]);
        this.segment_offsets.set(a[2]);
        this.segment_limits.set(a[3]);
        this.protected_mode[0] = a[4];
        this.idtr_offset[0] = a[5];
        this.idtr_size[0] = a[6];
        this.gdtr_offset[0] = a[7];
        this.gdtr_size[0] = a[8];
        this.page_fault[0] = a[9];
        this.cr.set(a[10]);
        this.cpl[0] = a[11];
        this.is_32[0] = a[13];
        this.stack_size_32[0] =
            a[16];
        this.in_hlt[0] = a[17];
        this.last_virt_eip[0] = a[18];
        this.eip_phys[0] = a[19];
        this.sysenter_cs[0] = a[22];
        this.sysenter_eip[0] = a[23];
        this.sysenter_esp[0] = a[24];
        this.prefixes[0] = a[25];
        this.flags[0] = a[26];
        this.flags_changed[0] = a[27];
        this.last_op1[0] = a[28];
        this.last_op_size[0] = a[30];
        this.instruction_pointer[0] = a[37];
        this.previous_ip[0] = a[38];
        this.reg32.set(a[39]);
        this.sreg.set(a[40]);
        this.dreg.set(a[41]);
        a[42] && this.reg_pdpte.set(a[42]);
        this.set_tsc(a[43][0], a[43][1]);
        this.devices.virtio_9p && this.devices.virtio_9p.set_state(a[45]);
        this.devices.apic && this.devices.apic.set_state(a[46]);
        this.devices.rtc && this.devices.rtc.set_state(a[47]);
        this.devices.pci && this.devices.pci.set_state(a[48]);
        this.devices.dma && this.devices.dma.set_state(a[49]);
        this.devices.acpi && this.devices.acpi.set_state(a[50]);
        this.devices.hpet && this.devices.hpet.set_state(a[51]);
        this.devices.vga && this.devices.vga.set_state(a[52]);
        this.devices.ps2 && this.devices.ps2.set_state(a[53]);
        this.devices.uart0 && this.devices.uart0.set_state(a[54]);
        this.devices.fdc && this.devices.fdc.set_state(a[55]);
        this.devices.cdrom && this.devices.cdrom.set_state(a[56]);
        this.devices.hda && this.devices.hda.set_state(a[57]);
        this.devices.pit && this.devices.pit.set_state(a[58]);
        this.devices.net && this.devices.net.set_state(a[59]);
        this.devices.pic && this.devices.pic.set_state(a[60]);
        this.devices.sb16 && this.devices.sb16.set_state(a[61]);
        this.devices.uart1 && this.devices.uart1.set_state(a[79]);
        this.devices.uart2 && this.devices.uart2.set_state(a[80]);
        this.devices.uart3 && this.devices.uart3.set_state(a[81]);
        this.fw_value = a[62];
        this.devices.ioapic && this.devices.ioapic.set_state(a[63]);
        this.tss_size_32[0] = a[64];
        this.reg_xmm32s.set(a[66]);
        this.fpu_st.set(a[67]);
        this.fpu_stack_empty[0] = a[68];
        this.fpu_stack_ptr[0] = a[69];
        this.fpu_control_word[0] = a[70];
        this.fpu_ip[0] = a[71];
        this.fpu_ip_selector[0] = a[72];
        this.fpu_dp[0] = a[73];
        this.fpu_dp_selector[0] = a[74];
        this.fpu_opcode[0] = a[75];
        const b = new v86util.Bitmap(a[78].buffer);
        this.unpack_memory(b, a[77]);
        this.full_clear_tlb();
        this.jit_clear_cache()
    };
    CPU.prototype.pack_memory = function() {
        dbg_assert(0 === (this.mem8.length & 4095));
        var a = this.mem8.length >> 12,
            b = [];
        for (var c = 0; c < a; c++) {
            var d = c << 12;
            d = this.mem32s.subarray(d >> 2, d + 4096 >> 2);
            let e = !0;
            for (let f = 0; f < d.length; f++)
                if (0 !== d[f]) {
                    e = !1;
                    break
                } e || b.push(c)
        }
        a = new v86util.Bitmap(a);
        c = new Uint8Array(b.length << 12);
        for (let [e, f] of b.entries()) a.set(f, 1), b = f << 12, b = this.mem8.subarray(b, b + 4096), c.set(b, e << 12);
        return {
            bitmap: a,
            packed_memory: c
        }
    };
    CPU.prototype.unpack_memory = function(a, b) {
        this.zero_memory(this.memory_size[0]);
        const c = this.memory_size[0] >> 12;
        let d = 0;
        for (let f = 0; f < c; f++)
            if (a.get(f)) {
                var e = d << 12;
                e = b.subarray(e, e + 4096);
                this.mem8.set(e, f << 12);
                d++
            }
    };
    CPU.prototype.main_run = function() {
        if (this.in_hlt[0]) {
            var a = this.hlt_loop();
            if (this.in_hlt[0]) return a
        }
        let b = a = v86.microtick();
        for (; b - a < TIME_PER_FRAME;) {
            this.do_many_cycles();
            b = v86.microtick();
            const c = this.run_hardware_timers(b);
            this.handle_irqs();
            if (this.in_hlt[0]) return c
        }
        return 0
    };
    CPU.prototype.reboot_internal = function() {
        this.reset_cpu();
        this.fw_value = [];
        this.devices.virtio && this.devices.virtio.reset();
        this.load_bios()
    };
    CPU.prototype.reset_memory = function() {
        this.mem8.fill(0)
    };
    CPU.prototype.create_memory = function(a) {
        1048576 > a ? a = 1048576 : 0 > (a | 0) && (a = Math.pow(2, 31) - MMAP_BLOCK_SIZE);
        a = (a - 1 | MMAP_BLOCK_SIZE - 1) + 1 | 0;
        dbg_assert(0 < (a | 0));
        dbg_assert(0 === (a & MMAP_BLOCK_SIZE - 1));
        console.assert(0 === this.memory_size[0], "Expected uninitialised memory");
        this.memory_size[0] = a;
        const b = this.allocate_memory(a);
        this.mem8 = v86util.view(Uint8Array, this.wasm_memory, b, a);
        this.mem32s = v86util.view(Uint32Array, this.wasm_memory, b, a >> 2)
    };
    goog.exportProperty(CPU.prototype, "create_memory", CPU.prototype.create_memory);
    CPU.prototype.init = function(a, b) {
        "number" === typeof a.log_level && (LOG_LEVEL = a.log_level);
        this.create_memory("number" === typeof a.memory_size ? a.memory_size : 67108864);
        this.acpi_enabled[0] = +a.acpi;
        this.reset_cpu();
        var c = new IO(this);
        this.io = c;
        this.bios.main = a.bios;
        this.bios.vga = a.vga_bios;
        this.load_bios();
        if (a.bzimage) {
            const {
                option_rom: e
            } = load_kernel(this.mem8, a.bzimage, a.initrd, a.cmdline || "");
            e && this.option_roms.push(e)
        }
        c.register_read(179, this, function() {
            dbg_log("port 0xB3 read");
            return 0
        });
        var d = 0;
        c.register_read(146, this, function() {
            return d
        });
        c.register_write(146, this, function(e) {
            d = e
        });
        c.register_read(1297, this, function() {
            if (this.fw_pointer < this.fw_value.length) return this.fw_value[this.fw_pointer++];
            dbg_assert(!1, "config port: Read past value");
            return 0
        });
        c.register_write(1296, this, void 0, function(e) {
            function f(l) {
                return new Uint8Array((new Int32Array([l])).buffer)
            }

            function g(l) {
                return l >> 8 | l << 8 & 65280
            }

            function k(l) {
                return l << 24 | l << 8 & 16711680 | l >> 8 & 65280 | l >>> 24
            }
            dbg_log("bios config port, index=" +
                h(e));
            this.fw_pointer = 0;
            if (e === FW_CFG_SIGNATURE) this.fw_value = f(FW_CFG_SIGNATURE_QEMU);
            else if (e === FW_CFG_ID) this.fw_value = f(0);
            else if (e === FW_CFG_RAM_SIZE) this.fw_value = f(this.memory_size[0]);
            else if (e === FW_CFG_NB_CPUS) this.fw_value = f(1);
            else if (e === FW_CFG_MAX_CPUS) this.fw_value = f(1);
            else if (e === FW_CFG_NUMA) this.fw_value = new Uint8Array(16);
            else if (e === FW_CFG_FILE_DIR) {
                e = new Int32Array(4 + 64 * this.option_roms.length);
                const l = new Uint8Array(e.buffer);
                e[0] = k(this.option_roms.length);
                for (let m = 0; m < this.option_roms.length; m++) {
                    const {
                        name: n,
                        data: p
                    } = this.option_roms[m], t = 4 + 64 * m;
                    dbg_assert(65536 > FW_CFG_FILE_START + m);
                    e[t + 0 >> 2] = k(p.length);
                    e[t + 4 >> 2] = g(FW_CFG_FILE_START + m);
                    dbg_assert(56 > n.length);
                    for (let q = 0; q < n.length; q++) l[t + 8 + q] = n.charCodeAt(q)
                }
                this.fw_value = l
            } else e >= FW_CFG_CUSTOM_START && e < FW_CFG_FILE_START ? this.fw_value = f(0) : e >= FW_CFG_FILE_START && e - FW_CFG_FILE_START < this.option_roms.length ? this.fw_value = this.option_roms[e - FW_CFG_FILE_START].data : (dbg_log("Warning: Unimplemented fw index: " + h(e)), this.fw_value = f(0))
        });
        DEBUG && (c.register_write(128,
            this,
            function(e) {}), c.register_read(128, this, function() {
            return 255
        }), c.register_write(233, this, function(e) {}));
        this.devices = {};
        a.load_devices && (this.devices.pic = new PIC(this), this.devices.pci = new PCI(this), this.acpi_enabled[0] && (this.devices.ioapic = new IOAPIC(this), this.devices.apic = new APIC(this), this.devices.acpi = new ACPI(this)), this.devices.rtc = new RTC(this), this.fill_cmos(this.devices.rtc, a), this.devices.dma = new DMA(this), ENABLE_HPET && (this.devices.hpet = new HPET(this)), this.devices.vga = new VGAScreen(this,
                b, a.vga_memory_size || 8388608), this.devices.ps2 = new PS2(this, b), this.devices.uart0 = new UART(this, 1016, b), a.uart1 && (this.devices.uart1 = new UART(this, 760, b)), a.uart2 && (this.devices.uart2 = new UART(this, 1E3, b)), a.uart3 && (this.devices.uart3 = new UART(this, 744, b)), this.devices.fdc = new FloppyController(this, a.fda, a.fdb), c = 0, a.hda && (this.devices.hda = new IDEDevice(this, a.hda, a.hdb, !1, c++, b)), a.cdrom && (this.devices.cdrom = new IDEDevice(this, a.cdrom, void 0, !0, c++, b)), this.devices.pit = new PIT(this, b), a.enable_ne2k &&
            (this.devices.net = new Ne2k(this, b, a.preserve_mac_from_state_image, a.mac_address_translation)), a.fs9p && (this.devices.virtio_9p = new Virtio9p(a.fs9p, this, b)), this.devices.sb16 = new SB16(this, b));
        a.multiboot && this.load_multiboot(a.multiboot);
        DEBUG && this.debug.init()
    };
    CPU.prototype.load_multiboot = function(a) {
        dbg_log("Trying multiboot from buffer of size " + a.byteLength, LOG_CPU);
        if (8192 > a.byteLength) {
            var b = new Int32Array(2048);
            (new Uint8Array(b.buffer)).set(new Uint8Array(a))
        } else b = new Int32Array(a, 0, 2048);
        for (var c = 0; 8192 > c; c += 4)
            if (464367618 === b[c >> 2]) {
                var d = b[c + 4 >> 2];
                if (464367618 + d + b[c + 8 >> 2] | 0) dbg_log("Multiboot checksum check failed", LOG_CPU);
                else {
                    dbg_log("Multiboot magic found, flags: " + h(d >>> 0, 8), LOG_CPU);
                    dbg_assert(0 === (d & -65537), "TODO");
                    this.reg32[REG_EAX] =
                        732803074;
                    this.reg32[REG_EBX] = 31744;
                    this.write32(31744, 0);
                    this.cr[0] = 1;
                    this.protected_mode[0] = 1;
                    this.flags[0] = FLAGS_DEFAULT;
                    this.is_32[0] = 1;
                    this.stack_size_32[0] = 1;
                    for (var e = 0; 6 > e; e++) this.segment_is_null[e] = 0, this.segment_offsets[e] = 0, this.segment_limits[e] = 4294967295, this.sreg[e] = 45058;
                    if (d & 65536) {
                        dbg_log("Multiboot specifies its own address table", LOG_CPU);
                        e = b[c + 12 >> 2];
                        var f = b[c + 16 >> 2];
                        d = b[c + 20 >> 2];
                        var g = b[c + 24 >> 2];
                        b = b[c + 28 >> 2];
                        dbg_log("header=" + h(e, 8) + " load=" + h(f, 8) + " load_end=" + h(d, 8) + " bss_end=" +
                            h(g, 8) + " entry=" + h(b, 8));
                        dbg_assert(f <= e);
                        c -= e - f;
                        0 === d ? d = void 0 : (dbg_assert(d >= f), d -= f);
                        a = new Uint8Array(a, c, d);
                        this.write_blob(a, f);
                        this.instruction_pointer[0] = this.get_seg_cs() + b | 0
                    } else if (1179403647 === b[0]) {
                        dbg_log("Multiboot image is in elf format", LOG_CPU);
                        c = read_elf(a);
                        this.instruction_pointer[0] = this.get_seg_cs() + c.header.entry | 0;
                        for (f of c.program_headers) 0 !== f.type && (1 === f.type ? (dbg_assert(f.paddr === f.vaddr), dbg_assert(f.filesz <= f.memsz), f.paddr + f.memsz < this.memory_size[0] ? f.filesz && (c = new Uint8Array(a,
                            f.offset, f.filesz), this.write_blob(c, f.paddr)) : dbg_log("Warning: Skipped loading section, paddr=" + h(f.paddr) + " memsz=" + f.memsz, LOG_CPU)) : 2 !== f.type && 3 !== f.type && 4 !== f.type && 6 !== f.type && 1685382480 !== f.type && 1685382481 !== f.type && 1685382483 !== f.type && dbg_assert(!1, "unimplemented elf section type: " + h(f.type)))
                    } else dbg_assert(!1, "Not a bootable multiboot format");
                    this.io.register_write_consecutive(244, this, function(k) {
                            console.log("Test exited with code " + h(k, 2));
                            throw "HALT";
                        }, function() {}, function() {},
                        function() {});
                    for (let k = 14; 15 >= k; k++) this.io.register_write(8192 + k, this, function(l) {
                        dbg_log("kvm-unit-test: Set irq " + h(k) + " to " + h(l, 2));
                        l ? this.device_raise_irq(k) : this.device_lower_irq(k)
                    });
                    dbg_log("Starting multiboot kernel at:", LOG_CPU);
                    this.debug.dump_state();
                    this.debug.dump_regs();
                    break
                }
            }
    };
    CPU.prototype.fill_cmos = function(a, b) {
        var c = b.boot_order || 531;
        a.cmos_write(CMOS_BIOS_BOOTFLAG1, 1 | c >> 4 & 240);
        a.cmos_write(CMOS_BIOS_BOOTFLAG2, c & 255);
        a.cmos_write(CMOS_MEM_BASE_LOW, 128);
        a.cmos_write(CMOS_MEM_BASE_HIGH, 2);
        c = 0;
        1048576 <= this.memory_size[0] && (c = this.memory_size[0] - 1048576 >> 10, c = Math.min(c, 65535));
        a.cmos_write(CMOS_MEM_OLD_EXT_LOW, c & 255);
        a.cmos_write(CMOS_MEM_OLD_EXT_HIGH, c >> 8 & 255);
        a.cmos_write(CMOS_MEM_EXTMEM_LOW, c & 255);
        a.cmos_write(CMOS_MEM_EXTMEM_HIGH, c >> 8 & 255);
        c = 0;
        16777216 <= this.memory_size[0] &&
            (c = this.memory_size[0] - 16777216 >> 16, c = Math.min(c, 65535));
        a.cmos_write(CMOS_MEM_EXTMEM2_LOW, c & 255);
        a.cmos_write(CMOS_MEM_EXTMEM2_HIGH, c >> 8 & 255);
        a.cmos_write(CMOS_MEM_HIGHMEM_LOW, 0);
        a.cmos_write(CMOS_MEM_HIGHMEM_MID, 0);
        a.cmos_write(CMOS_MEM_HIGHMEM_HIGH, 0);
        a.cmos_write(CMOS_EQUIPMENT_INFO, 47);
        a.cmos_write(CMOS_BIOS_SMP_COUNT, 0);
        b.fastboot && a.cmos_write(63, 1)
    };
    CPU.prototype.load_bios = function() {
        var a = this.bios.main,
            b = this.bios.vga;
        if (a) {
            var c = new Uint8Array(a);
            this.write_blob(c, 1048576 - a.byteLength);
            if (b) {
                var d = new Uint8Array(b);
                this.write_blob(d, 786432);
                this.io.mmap_register(4272947200, 1048576, function(e) {
                    e = e - 4272947200 | 0;
                    return e < d.length ? d[e] : 0
                }, function(e, f) {
                    dbg_assert(!1, "Unexpected write to VGA rom")
                })
            } else dbg_log("Warning: No VGA BIOS");
            this.io.mmap_register(4293918720, 1048576, function(e) {
                return this.mem8[e & 1048575]
            }.bind(this), function(e, f) {
                this.mem8[e &
                    1048575] = f
            }.bind(this))
        } else dbg_log("Warning: No BIOS")
    };
    CPU.prototype.do_many_cycles = function() {
        if (DEBUG) var a = v86.microtick();
        this.do_many_cycles_native();
        DEBUG && (this.do_many_cycles_total += v86.microtick() - a, this.do_many_cycles_count++)
    };
    CPU.prototype.cycle = function() {
        this.cycle_internal()
    };
    goog.exportProperty(CPU.prototype, "cycle", CPU.prototype.cycle);
    CPU.prototype.codegen_finalize = function(a, b, c, d, e) {
        d >>>= 0;
        e >>>= 0;
        dbg_assert(0 <= a && a < WASM_TABLE_SIZE);
        const f = new Uint8Array(this.wasm_memory.buffer, d, e);
        DEBUG && (DUMP_GENERATED_WASM && !this.seen_code[b] && this.debug.dump_wasm(f), this.seen_code[b] = (this.seen_code[b] || 0) + 1, this.test_hook_did_generate_wasm && this.test_hook_did_generate_wasm(f));
        d = WebAssembly.instantiate(f, {
            e: this.jit_imports
        }).then(g => {
            g = g.instance.exports.f;
            this.codegen_finalize_finished(a, b, c);
            this.wm.wasm_table.set(a + WASM_TABLE_OFFSET,
                g);
            this.test_hook_did_finalize_wasm && this.test_hook_did_finalize_wasm(f)
        });
        DEBUG && d.catch(g => {
            console.log(g);
            debugger;
            throw g;
        })
    };
    CPU.prototype.log_uncompiled_code = function(a, b) {
        if (DEBUG && DUMP_UNCOMPILED_ASSEMBLY && 100 > (this.seen_code_uncompiled[a] || 0)) {
            this.seen_code_uncompiled[a] = (this.seen_code_uncompiled[a] || 0) + 1;
            b += 8;
            (a ^ b) & -4096 && (dbg_log("truncated disassembly start=" + h(a >>> 0) + " end=" + h(b >>> 0)), b = (a | 4095) + 1);
            b < a && (b = a);
            dbg_assert(b >= a);
            const c = new Uint8Array(b - a);
            for (let d = a; d < b; d++) c[d - a] = this.read8(d);
            dbg_log("Uncompiled code:");
            this.debug.dump_code(this.is_32[0] ? 1 : 0, c, a)
        }
    };
    CPU.prototype.dump_function_code = function(a, b) {
        if (DEBUG && DUMP_GENERATED_WASM) {
            var c = new Int32Array(this.wasm_memory.buffer);
            dbg_assert(0 === (a & 3));
            var d = this.is_32[0];
            for (let f = 0; f < b; f++) {
                var e = (a >> 2) + 7 * f;
                const g = c[e + 0],
                    k = c[e + 1];
                e = c[e + 6] & 65280;
                const l = new Uint8Array(k - g);
                for (let m = g; m < k; m++) l[m - g] = this.read8(this.translate_address_system_read(m));
                dbg_log("---" + (e ? " entry" : ""));
                this.debug.dump_code(d ? 1 : 0, l, g)
            }
        }
    };
    CPU.prototype.hlt_loop = function() {
        if (this.get_eflags_no_arith() & FLAG_INTERRUPT) {
            const a = this.run_hardware_timers(v86.microtick());
            this.handle_irqs();
            return a
        }
        return 100
    };
    CPU.prototype.run_hardware_timers = function(a) {
        if (ENABLE_HPET) var b = this.devices.pit.timer(a, this.devices.hpet.legacy_mode),
            c = this.devices.rtc.timer(a, this.devices.hpet.legacy_mode),
            d = this.devices.hpet.timer(a);
        else b = this.devices.pit.timer(a, !1), c = this.devices.rtc.timer(a, !1), d = 100;
        let e = 100,
            f = 100;
        this.acpi_enabled[0] && (e = this.devices.acpi.timer(a), f = this.devices.apic.timer(a));
        return Math.min(b, c, d, e, f)
    };
    CPU.prototype.hlt_op = function() {
        0 === (this.get_eflags_no_arith() & FLAG_INTERRUPT) && this.bus.send("cpu-event-halt");
        this.in_hlt[0] = 1;
        this.hlt_loop()
    };
    CPU.prototype.handle_irqs = function() {
        this.get_eflags_no_arith() & FLAG_INTERRUPT && (this.pic_acknowledge(), this.next_tick_immediately())
    };
    CPU.prototype.pic_acknowledge = function() {
        dbg_assert(this.get_eflags_no_arith() & FLAG_INTERRUPT);
        this.devices.pic && this.devices.pic.acknowledge_irq();
        this.devices.apic && this.devices.apic.acknowledge_irq()
    };
    CPU.prototype.device_raise_irq = function(a) {
        dbg_assert(1 === arguments.length);
        this.devices.pic && this.devices.pic.set_irq(a);
        this.devices.ioapic && this.devices.ioapic.set_irq(a)
    };
    CPU.prototype.device_lower_irq = function(a) {
        this.devices.pic && this.devices.pic.clear_irq(a);
        this.devices.ioapic && this.devices.ioapic.clear_irq(a)
    };
    "undefined" !== typeof window ? window.CPU = CPU : "undefined" !== typeof module && "undefined" !== typeof module.exports ? module.exports.CPU = CPU : "function" === typeof importScripts && (self.CPU = CPU);
    CPU.prototype.debug_init = function() {
        function a(m) {
            if (DEBUG) {
                for (var n = e.protected_mode[0] ? "prot" : "real", p = e.get_eflags(), t = e.getiopl(), q = e.cpl[0], r = h(e.sreg[REG_CS], 4) + ":" + h(e.get_real_eip() >>> 0, 8), v = h(e.sreg[REG_SS], 4) + ":" + h(e.reg32[REG_ES] >>> 0, 8), u = e.is_32[0] ? "32" : "16", x = e.flags[0] & FLAG_INTERRUPT ? 1 : 0, z = {
                        [FLAG_CARRY]: "c",
                        [FLAG_PARITY]: "p",
                        [FLAG_ADJUST]: "a",
                        [FLAG_ZERO]: "z",
                        [FLAG_SIGN]: "s",
                        [FLAG_TRAP]: "t",
                        [FLAG_INTERRUPT]: "i",
                        [FLAG_DIRECTION]: "d",
                        [FLAG_OVERFLOW]: "o"
                    }, A = "", D = 0; 16 > D; D++) z[1 << D] && (A =
                    p & 1 << D ? A + z[1 << D] : A + " ");
                return "mode=" + n + "/" + u + " paging=" + +(0 !== (e.cr[0] & CR0_PG)) + " pae=" + +(0 !== (e.cr[4] & CR4_PAE)) + " iopl=" + t + " cpl=" + q + " if=" + x + " cs:eip=" + r + " cs_off=" + h(e.get_seg_cs() >>> 0, 8) + " flgs=" + h(e.get_eflags() >>> 0, 6) + " (" + A + ") ss:esp=" + v + " ssize=" + +e.stack_size_32[0] + (m ? " in " + m : "")
            }
        }

        function b() {
            if (DEBUG) {
                for (var m = {
                        eax: REG_EAX,
                        ecx: REG_ECX,
                        edx: REG_EDX,
                        ebx: REG_EBX,
                        esp: REG_ESP,
                        ebp: REG_EBP,
                        esi: REG_ESI,
                        edi: REG_EDI
                    }, n = "eax ecx edx ebx esp ebp esi edi".split(" "), p = "", t = "", q = 0; 4 > q; q++) p += n[q] +
                    "=" + h(e.reg32[m[n[q]]] >>> 0, 8) + " ", t += n[q + 4] + "=" + h(e.reg32[m[n[q + 4]]] >>> 0, 8) + " ";
                p += "  ds=" + h(e.sreg[REG_DS], 4) + " es=" + h(e.sreg[REG_ES], 4) + " fs=" + h(e.sreg[REG_FS], 4);
                t += "  gs=" + h(e.sreg[REG_GS], 4) + " cs=" + h(e.sreg[REG_CS], 4) + " ss=" + h(e.sreg[REG_SS], 4);
                return [p, t]
            }
        }

        function c(m, n, p) {
            if (DEBUG) {
                if (!(m & 1)) return !1;
                var t = 128 === (m & 128);
                return {
                    size: t,
                    global: 256 === (m & 256),
                    accessed: 32 === (m & 32),
                    dirty: 64 === (m & 64),
                    cache_disable: 16 === (m & 16),
                    user: 4 === (m & 4),
                    read_write: 2 === (m & 2),
                    address: (t && !p ? m & (n ? 4292870144 : 4290772992) :
                        m & 4294963200) >>> 0
                }
            }
        }

        function d(m, n, p) {
            if (DEBUG)
                for (var t = n ? 512 : 1024, q = n ? 8 : 4, r = n ? 21 : 22, v = 0; v < t; v++) {
                    var u = e.read32s(m + v * q),
                        x = c(u, n, !0);
                    if (x)
                        if (u = "", u += x.size ? "S " : "  ", u += x.accessed ? "A " : "  ", u += x.cache_disable ? "Cd " : "  ", u += x.user ? "U " : "  ", u += x.read_write ? "Rw " : "   ", x.size) dbg_log("=== " + h(p + (v << r) >>> 0, 8) + " -> " + h(x.address >>> 0, 8) + " | " + u);
                        else {
                            dbg_log("=== " + h(p + (v << r) >>> 0, 8) + " | " + u);
                            for (var z = 0; z < t; z++) {
                                var A = x.address + z * q;
                                u = e.read32s(A);
                                var D = c(u, n, !1);
                                D && (u = "", u += D.cache_disable ? "Cd " : "   ",
                                    u += D.user ? "U " : "  ", u += D.read_write ? "Rw " : "   ", u += D.global ? "G " : "  ", u += D.accessed ? "A " : "  ", u += D.dirty ? "Di " : "   ", dbg_log("# " + h(p + (v << r | z << 12) >>> 0, 8) + " -> " + h(D.address, 8) + " | " + u + "        (at " + h(A, 8) + ")"))
                            }
                        }
                }
        }
        var e = this,
            f = {};
        this.debug = f;
        f.init = function() {
            function m(p) {
                10 === p ? (dbg_log(n, LOG_BIOS), n = "") : n += String.fromCharCode(p)
            }
            if (DEBUG && e.io) {
                var n = "";
                e.io.register_write(1026, this, m);
                e.io.register_write(1280, this, m)
            }
        };
        f.get_regs_short = b;
        f.dump_regs = function() {
            if (DEBUG) {
                var m = b();
                dbg_log(m[0],
                    LOG_CPU);
                dbg_log(m[1], LOG_CPU)
            }
        };
        f.get_state = a;
        f.dump_state = function(m) {
            DEBUG && dbg_log(a(m), LOG_CPU)
        };
        f.dump_stack = function(m, n) {
            if (DEBUG) {
                var p = e.reg32[REG_ESP];
                dbg_log("========= STACK ==========");
                if (n >= m || void 0 === n) m = 5, n = -5;
                for (; m > n; m--) {
                    var t = "    ";
                    m || (t = "=>  ");
                    t += h(m, 2) + " | ";
                    dbg_log(t + h(p + 4 * m, 8) + " | " + h(e.read32s(p + 4 * m) >>> 0))
                }
            }
        };
        f.dump_page_structures = function() {
            if (e.cr[4] & CR4_PAE) {
                dbg_log("PAE enabled");
                for (var m = 0; 4 > m; m++) {
                    var n = e.read32s(e.cr[3] + 8 * m);
                    n & 1 && d(n & 4294963200, !0, m << 30)
                }
            } else dbg_log("PAE disabled"),
                d(e.cr[3], !1, 0)
        };
        f.dump_gdt_ldt = function() {
            function m(n, p) {
                for (var t = 0; t < p; t += 8, n += 8) {
                    var q = e.read16(n + 2) | e.read8(n + 4) << 16 | e.read8(n + 7) << 24,
                        r = e.read16(n) | (e.read8(n + 6) & 15) << 16,
                        v = e.read8(n + 5),
                        u = e.read8(n + 6) >> 4,
                        x = "",
                        z = v >> 5 & 3;
                    x = v & 128 ? x + " P " : x + "NP ";
                    v & 16 ? (x = u & 4 ? x + "32b " : x + "16b ", v & 8 ? (x += "X ", v & 4 && (x += "C ")) : x += "R ", x += "RW ") : x += "sys: " + h(v & 15);
                    u & 8 && (r = r << 12 | 4095);
                    dbg_log(h(t & -8, 4) + " " + h(q >>> 0, 8) + " (" + h(r >>> 0, 8) + " bytes) " + x + ";  dpl = " + z + ", a = " + v.toString(2) + ", f = " + u.toString(2))
                }
            }
            DEBUG && (dbg_log("gdt: (len = " +
                h(e.gdtr_size[0]) + ")"), m(e.translate_address_system_read(e.gdtr_offset[0]), e.gdtr_size[0]), dbg_log("\nldt: (len = " + h(e.segment_limits[REG_LDTR]) + ")"), m(e.translate_address_system_read(e.segment_offsets[REG_LDTR]), e.segment_limits[REG_LDTR]))
        };
        f.dump_idt = function() {
            if (DEBUG)
                for (var m = 0; m < e.idtr_size[0]; m += 8) {
                    var n = e.translate_address_system_read(e.idtr_offset[0] + m),
                        p = e.read16(n) | e.read16(n + 6) << 16,
                        t = e.read16(n + 2);
                    n = e.read8(n + 5);
                    var q = n >> 5 & 3;
                    var r = 5 === (n & 31) ? "task gate " : 14 === (n & 31) ? "intr gate " : 15 ===
                        (n & 31) ? "trap gate " : "invalid   ";
                    r = n & 128 ? r + " P" : r + "NP";
                    dbg_log(h(m >> 3, 4) + " " + h(p >>> 0, 8) + ", " + h(t, 4) + "; " + r + ";  dpl = " + q + ", t = " + n.toString(2))
                }
        };
        f.get_memory_dump = function(m, n) {
            if (DEBUG) return void 0 === m ? (m = 0, n = e.memory_size[0]) : void 0 === n && (n = m, m = 0), e.mem8.slice(m, m + n).buffer
        };
        f.memory_hex_dump = function(m, n) {
            if (DEBUG) {
                n = n || 64;
                for (var p, t, q = 0; q < n >> 4; q++) {
                    p = h(m + (q << 4), 5) + "   ";
                    for (var r = 0; 16 > r; r++) t = e.read8(m + (q << 4) + r), p += h(t, 2) + " ";
                    p += "  ";
                    for (r = 0; 16 > r; r++) t = e.read8(m + (q << 4) + r), p += 33 > t || 126 < t ? "." :
                        String.fromCharCode(t);
                    dbg_log(p)
                }
            }
        };
        f.used_memory_dump = function() {
            if (DEBUG)
                for (var m = e.memory_size[0] / 128 / 16 | 0, n, p = 0; 16 > p; p++) {
                    n = h(128 * p * m, 8) + " | ";
                    for (var t = 0; 128 > t; t++) n += 0 < e.mem32s[(128 * p + t) * m] ? "X" : " ";
                    dbg_log(n)
                }
        };
        f.debug_interrupt = function(m) {};
        let g, k;
        f.dump_code = function(m, n, p) {
            if (!k) {
                if (void 0 === g && (g = "function" === typeof require ? require("./capstone-x86.min.js") : window.cs, void 0 === g)) {
                    dbg_log("Warning: Missing capstone library, disassembly not available");
                    return
                }
                k = [new g.Capstone(g.ARCH_X86,
                    g.MODE_16), new g.Capstone(g.ARCH_X86, g.MODE_32)]
            }
            try {
                k[m].disasm(n, p).forEach(function(t) {
                    dbg_log(h(t.address >>> 0) + ": " + v86util.pads(t.bytes.map(q => h(q, 2).slice(-2)).join(" "), 20) + " " + t.mnemonic + " " + t.op_str)
                }), dbg_log("")
            } catch (t) {
                dbg_log("Could not disassemble: " + Array.from(n).map(q => h(q, 2)).join(" "))
            }
        };
        let l;
        f.dump_wasm = function(m) {
            if (void 0 === l && (l = "function" === typeof require ? require("./libwabt.js") : new window.WabtModule, void 0 === l)) {
                dbg_log("Warning: Missing libwabt, wasm dump not available");
                return
            }
            m = m.slice();
            try {
                var n = l.readWasm(m, {
                    readDebugNames: !1
                });
                n.generateNames();
                n.applyNames();
                const q = n.toText({
                    foldExprs: !0,
                    inlineExport: !0
                });
                dbg_log(q)
            } catch (q) {
                var p = new Blob([m]),
                    t = document.createElement("a");
                t.download = "failed.wasm";
                t.href = window.URL.createObjectURL(p);
                t.dataset.downloadurl = ["application/octet-stream", t.download, t.href].join(":");
                t.click();
                window.URL.revokeObjectURL(t.src);
                console.log(q.toString())
            } finally {
                n && n.destroy()
            }
        }
    };
    const ELF_MAGIC = 1179403647;
    let types = DataView.prototype,
        U8 = {
            size: 1,
            get: types.getUint8,
            set: types.setUint8
        },
        U16 = {
            size: 2,
            get: types.getUint16,
            set: types.setUint16
        },
        U32 = {
            size: 4,
            get: types.getUint32,
            set: types.setUint32
        },
        pad = function(a) {
            return {
                size: a,
                get: b => -1
            }
        },
        Header = create_struct([{
            magic: U32
        }, {
            class: U8
        }, {
            data: U8
        }, {
            version0: U8
        }, {
            osabi: U8
        }, {
            abiversion: U8
        }, {
            pad0: pad(7)
        }, {
            type: U16
        }, {
            machine: U16
        }, {
            version1: U32
        }, {
            entry: U32
        }, {
            phoff: U32
        }, {
            shoff: U32
        }, {
            flags: U32
        }, {
            ehsize: U16
        }, {
            phentsize: U16
        }, {
            phnum: U16
        }, {
            shentsize: U16
        }, {
            shnum: U16
        }, {
            shstrndx: U16
        }]);
    console.assert(52 === Header.reduce((a, b) => a + b.size, 0));
    let ProgramHeader = create_struct([{
        type: U32
    }, {
        offset: U32
    }, {
        vaddr: U32
    }, {
        paddr: U32
    }, {
        filesz: U32
    }, {
        memsz: U32
    }, {
        flags: U32
    }, {
        align: U32
    }]);
    console.assert(32 === ProgramHeader.reduce((a, b) => a + b.size, 0));
    let SectionHeader = create_struct([{
        name: U32
    }, {
        type: U32
    }, {
        flags: U32
    }, {
        addr: U32
    }, {
        offset: U32
    }, {
        size: U32
    }, {
        link: U32
    }, {
        info: U32
    }, {
        addralign: U32
    }, {
        entsize: U32
    }]);
    console.assert(40 === SectionHeader.reduce((a, b) => a + b.size, 0));

    function create_struct(a) {
        return a.map(function(b) {
            var c = Object.keys(b);
            console.assert(1 === c.length);
            c = c[0];
            b = b[c];
            console.assert(0 < b.size);
            return {
                name: c,
                type: b,
                size: b.size,
                get: b.get,
                set: b.set
            }
        })
    }

    function read_elf(a) {
        a = new DataView(a);
        let [b, c] = read_struct(a, Header);
        console.assert(52 === c);
        if (DEBUG) {
            for (var d of Object.keys(b)) dbg_log(d + ": 0x" + b[d].toString(16));
            dbg_log(b)
        }
        console.assert(b.magic === ELF_MAGIC, "Bad magic");
        console.assert(1 === b.class, "Unimplemented: 64 bit elf");
        console.assert(1 === b.data, "Unimplemented: big endian");
        console.assert(1 === b.version0, "Bad version0");
        console.assert(2 === b.type, "Unimplemented type");
        console.assert(1 === b.version1, "Bad version1");
        console.assert(52 === b.ehsize,
            "Bad header size");
        console.assert(32 === b.phentsize, "Bad program header size");
        console.assert(40 === b.shentsize, "Bad section header size");
        [d] = read_structs(view_slice(a, b.phoff, b.phentsize * b.phnum), ProgramHeader, b.phnum);
        [a] = read_structs(view_slice(a, b.shoff, b.shentsize * b.shnum), SectionHeader, b.shnum);
        if (DEBUG && LOG_LEVEL) {
            console.log("%d program headers:", d.length);
            for (let e of d) console.log("type=%s offset=%s vaddr=%s paddr=%s filesz=%s memsz=%s flags=%s align=%s", e.type.toString(16), e.offset.toString(16),
                e.vaddr.toString(16), e.paddr.toString(16), e.filesz.toString(16), e.memsz.toString(16), e.flags.toString(16), e.align.toString(16));
            console.log("%d program headers:", a.length);
            for (let e of a) console.log("name=%s type=%s flags=%s addr=%s offset=%s size=%s link=%s info=%s addralign=%s entsize=%s", e.name.toString(16), e.type.toString(16), e.flags.toString(16), e.addr.toString(16), e.offset.toString(16), e.size.toString(16), e.link.toString(16), e.info.toString(16), e.addralign.toString(16), e.entsize.toString(16))
        }
        return {
            header: b,
            program_headers: d,
            sections_headers: a
        }
    }

    function read_struct(a, b) {
        let c = {},
            d = 0;
        for (let e of b) b = e.get.call(a, d, !0), console.assert(void 0 === c[e.name]), c[e.name] = b, d += e.size;
        return [c, d]
    }

    function read_structs(a, b, c) {
        let d = [],
            e = 0;
        for (var f = 0; f < c; f++) {
            let [g, k] = read_struct(view_slice(a, e), b);
            d.push(g);
            e += k
        }
        return [d, e]
    }

    function view_slice(a, b, c) {
        return new DataView(a.buffer, a.byteOffset + b, c)
    };
    const LINUX_BOOT_HDR_SETUP_SECTS = 497,
        LINUX_BOOT_HDR_SYSSIZE = 500,
        LINUX_BOOT_HDR_VIDMODE = 506,
        LINUX_BOOT_HDR_BOOT_FLAG = 510,
        LINUX_BOOT_HDR_HEADER = 514,
        LINUX_BOOT_HDR_VERSION = 518,
        LINUX_BOOT_HDR_TYPE_OF_LOADER = 528,
        LINUX_BOOT_HDR_LOADFLAGS = 529,
        LINUX_BOOT_HDR_CODE32_START = 532,
        LINUX_BOOT_HDR_RAMDISK_IMAGE = 536,
        LINUX_BOOT_HDR_RAMDISK_SIZE = 540,
        LINUX_BOOT_HDR_HEAP_END_PTR = 548,
        LINUX_BOOT_HDR_CMD_LINE_PTR = 552,
        LINUX_BOOT_HDR_INITRD_ADDR_MAX = 556,
        LINUX_BOOT_HDR_KERNEL_ALIGNMENT = 560,
        LINUX_BOOT_HDR_RELOCATABLE_KERNEL =
        564,
        LINUX_BOOT_HDR_MIN_ALIGNMENT = 565,
        LINUX_BOOT_HDR_XLOADFLAGS = 566,
        LINUX_BOOT_HDR_CMDLINE_SIZE = 568,
        LINUX_BOOT_HDR_PAYLOAD_OFFSET = 584,
        LINUX_BOOT_HDR_PAYLOAD_LENGTH = 588,
        LINUX_BOOT_HDR_PREF_ADDRESS = 600,
        LINUX_BOOT_HDR_INIT_SIZE = 608,
        LINUX_BOOT_HDR_CHECKSUM1 = 43605,
        LINUX_BOOT_HDR_CHECKSUM2 = 1400005704,
        LINUX_BOOT_HDR_TYPE_OF_LOADER_NOT_ASSIGNED = 255,
        LINUX_BOOT_HDR_LOADFLAGS_LOADED_HIGH = 1,
        LINUX_BOOT_HDR_LOADFLAGS_QUIET_FLAG = 32,
        LINUX_BOOT_HDR_LOADFLAGS_KEEP_SEGMENTS = 64,
        LINUX_BOOT_HDR_LOADFLAGS_CAN_USE_HEAPS =
        128;

    function load_kernel(a, b, c, d) {
        dbg_log("Trying to load kernel of size " + b.byteLength);
        var e = new Uint8Array(b);
        const f = new Uint16Array(b),
            g = new Uint32Array(b);
        var k = e[LINUX_BOOT_HDR_SETUP_SECTS] || 4,
            l = f[LINUX_BOOT_HDR_BOOT_FLAG >> 1];
        if (l !== LINUX_BOOT_HDR_CHECKSUM1) dbg_log("Bad checksum1: " + h(l));
        else if (l = f[LINUX_BOOT_HDR_HEADER >> 1] | f[LINUX_BOOT_HDR_HEADER + 2 >> 1] << 16, l !== LINUX_BOOT_HDR_CHECKSUM2) dbg_log("Bad checksum2: " + h(l));
        else {
            l = f[LINUX_BOOT_HDR_VERSION >> 1];
            dbg_assert(514 <= l);
            var m = e[LINUX_BOOT_HDR_LOADFLAGS];
            dbg_assert(m &
                LINUX_BOOT_HDR_LOADFLAGS_LOADED_HIGH);
            var n = f[LINUX_BOOT_HDR_XLOADFLAGS >> 1],
                p = g[LINUX_BOOT_HDR_INITRD_ADDR_MAX >> 2],
                t = g[LINUX_BOOT_HDR_KERNEL_ALIGNMENT >> 2],
                q = e[LINUX_BOOT_HDR_RELOCATABLE_KERNEL],
                r = e[LINUX_BOOT_HDR_MIN_ALIGNMENT],
                v = g[LINUX_BOOT_HDR_CMDLINE_SIZE >> 2],
                u = g[LINUX_BOOT_HDR_PAYLOAD_OFFSET >> 2],
                x = g[LINUX_BOOT_HDR_PAYLOAD_LENGTH >> 2],
                z = g[LINUX_BOOT_HDR_PREF_ADDRESS >> 2],
                A = g[LINUX_BOOT_HDR_PREF_ADDRESS + 4 >> 2],
                D = g[LINUX_BOOT_HDR_INIT_SIZE >> 2];
            dbg_log("kernel boot protocol version: " + h(l));
            dbg_log("flags=" +
                h(m) + " xflags=" + h(n));
            dbg_log("code32_start=" + h(g[LINUX_BOOT_HDR_CODE32_START >> 2]));
            dbg_log("initrd_addr_max=" + h(p));
            dbg_log("kernel_alignment=" + h(t));
            dbg_log("relocatable=" + q);
            dbg_log("min_alignment=" + h(r));
            dbg_log("cmdline max=" + h(v));
            dbg_log("payload offset=" + h(u) + " size=" + h(x));
            dbg_log("pref_address=" + h(A) + ":" + h(z));
            dbg_log("init_size=" + h(D));
            e[LINUX_BOOT_HDR_TYPE_OF_LOADER] = LINUX_BOOT_HDR_TYPE_OF_LOADER_NOT_ASSIGNED;
            e[LINUX_BOOT_HDR_LOADFLAGS] = m & ~LINUX_BOOT_HDR_LOADFLAGS_QUIET_FLAG & ~LINUX_BOOT_HDR_LOADFLAGS_KEEP_SEGMENTS |
                LINUX_BOOT_HDR_LOADFLAGS_CAN_USE_HEAPS;
            f[LINUX_BOOT_HDR_HEAP_END_PTR >> 1] = 56832;
            f[LINUX_BOOT_HDR_VIDMODE >> 1] = 65535;
            dbg_log("heap_end_ptr=" + h(56832));
            d += "\x00";
            dbg_assert(d.length < v);
            dbg_log("cmd_line_ptr=" + h(581632));
            g[LINUX_BOOT_HDR_CMD_LINE_PTR >> 2] = 581632;
            for (e = 0; e < d.length; e++) a[581632 + e] = d.charCodeAt(e);
            k = 512 * (k + 1);
            dbg_log("prot_mode_kernel_start=" + h(k));
            d = new Uint8Array(b, 0, k);
            b = new Uint8Array(b, k);
            e = k = 0;
            c && (k = 67108864, e = c.byteLength, dbg_assert(1048576 + b.length < k), a.set(new Uint8Array(c), k));
            g[LINUX_BOOT_HDR_RAMDISK_IMAGE >> 2] = k;
            g[LINUX_BOOT_HDR_RAMDISK_SIZE >> 2] = e;
            dbg_assert(655360 > 524288 + d.length);
            a.set(d, 524288);
            a.set(b, 1048576);
            return {
                option_rom: {
                    name: "genroms/kernel.bin",
                    data: make_linux_boot_rom(32768, 57344)
                }
            }
        }
    }

    function make_linux_boot_rom(a, b) {
        const c = new Uint8Array(256);
        (new Uint16Array(c.buffer))[0] = 43605;
        c[2] = 1;
        var d = 3;
        c[d++] = 250;
        c[d++] = 184;
        c[d++] = a >> 0;
        c[d++] = a >> 8;
        c[d++] = 142;
        c[d++] = 192;
        c[d++] = 142;
        c[d++] = 216;
        c[d++] = 142;
        c[d++] = 224;
        c[d++] = 142;
        c[d++] = 232;
        c[d++] = 142;
        c[d++] = 208;
        c[d++] = 188;
        c[d++] = b >> 0;
        c[d++] = b >> 8;
        c[d++] = 234;
        c[d++] = 0;
        c[d++] = 0;
        c[d++] = a + 32 >> 0;
        c[d++] = a + 32 >> 8;
        dbg_assert(512 > d);
        a = d;
        b = c[a] = 0;
        for (d = 0; d < c.length; d++) b += c[d];
        c[a] = -b;
        return c
    };
    var SHIFT_SCAN_CODE = 42,
        SCAN_CODE_RELEASE = 128;

    function KeyboardAdapter(a) {
        function b(q) {
            !q.altKey && k[56] && f(56, !1);
            return e(q, !1)
        }

        function c(q) {
            !q.altKey && k[56] && f(56, !1);
            return e(q, !0)
        }

        function d(q) {
            q = Object.keys(k);
            for (var r, v = 0; v < q.length; v++) r = +q[v], k[r] && f(r, !1);
            k = {}
        }

        function e(q, r) {
            var v;
            if (v = l.bus) v = q.shiftKey && q.ctrlKey && (73 === q.keyCode || 74 === q.keyCode || 75 === q.keyCode) || !l.emu_enabled ? !1 : q.target ? q.target.classList.contains("phone_keyboard") || "INPUT" !== q.target.nodeName && "TEXTAREA" !== q.target.nodeName : !0;
            if (v) {
                a: {
                    if (void 0 !== q.code &&
                        (v = t[q.code], void 0 !== v)) break a;v = m[q.keyCode]
                }
                if (v) return f(v, r, q.repeat),
                q.preventDefault && q.preventDefault(),
                !1;console.log("Missing char in map: keyCode=" + (q.keyCode || -1).toString(16) + " code=" + q.code)
            }
        }

        function f(q, r, v) {
            if (r) k[q] && !v && f(q, !1);
            else if (!k[q]) return;
            (k[q] = r) || (q |= 128);
            255 < q ? (g(q >> 8), g(q & 255)) : g(q)
        }

        function g(q) {
            // console.log(q);
            l.bus.send("keyboard-code", q)
        }
        injection.send_input=g;
        var k = {},
            l = this;
        this.emu_enabled = !0;
        var m = new Uint16Array([
            0, 0, 0, 0, 0, 0, 0, 0, 14, 15,
            0, 0, 0, 28, 0, 0, 42, 29, 56, 0, 58,
            0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 57, 57417, 57425, 57423, 57415, 57419, 57416, 57421, 80,
            0, 0, 0, 0, 82, 83, 0, 11, 2, 3,
            4, 5, 6, 7, 8, 9, 10, 0, 39, 0,
            13, 0, 0, 0, 30, 48, 46, 32, 18, 33,
            34, 35, 23, 36, 37, 38, 50, 49, 24, 25,
            16, 19, 31, 20, 22, 47, 17, 45, 21, 44,
            57435, 57436, 57437, 0, 0, 82, 79, 80, 81, 75,
            76, 77, 71, 72, 73, 0, 0, 0, 0, 0,
            0, 59, 60, 61, 62, 63, 64, 65, 66, 67,
            68, 87, 88, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 69, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 12, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 39, 13, 51, 12,
            52, 53, 41, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 26,
            43, 27, 40, 0, 57435, 57400, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ]),
            n = {
                8: 8,
                10: 13,
                32: 32,
                39: 222,
                44: 188,
                45: 189,
                46: 190,
                47: 191,
                48: 48,
                49: 49,
                50: 50,
                51: 51,
                52: 52,
                53: 53,
                54: 54,
                55: 55,
                56: 56,
                57: 57,
                59: 186,
                61: 187,
                91: 219,
                92: 220,
                93: 221,
                96: 192,
                97: 65,
                98: 66,
                99: 67,
                100: 68,
                101: 69,
                102: 70,
                103: 71,
                104: 72,
                105: 73,
                106: 74,
                107: 75,
                108: 76,
                109: 77,
                110: 78,
                111: 79,
                112: 80,
                113: 81,
                114: 82,
                115: 83,
                116: 84,
                117: 85,
                118: 86,
                119: 87,
                120: 88,
                121: 89,
                122: 90
            },
            p = {
                33: 49,
                34: 222,
                35: 51,
                36: 52,
                37: 53,
                38: 55,
                40: 57,
                41: 48,
                42: 56,
                43: 187,
                58: 186,
                60: 188,
                62: 190,
                63: 191,
                64: 50,
                65: 65,
                66: 66,
                67: 67,
                68: 68,
                69: 69,
                70: 70,
                71: 71,
                72: 72,
                73: 73,
                74: 74,
                75: 75,
                76: 76,
                77: 77,
                78: 78,
                79: 79,
                80: 80,
                81: 81,
                82: 82,
                83: 83,
                84: 84,
                85: 85,
                86: 86,
                87: 87,
                88: 88,
                89: 89,
                90: 90,
                94: 54,
                95: 189,
                123: 219,
                124: 220,
                125: 221,
                126: 192
            },
            t = {
                Escape: 1,
                Digit1: 2,
                Digit2: 3,
                Digit3: 4,
                Digit4: 5,
                Digit5: 6,
                Digit6: 7,
                Digit7: 8,
                Digit8: 9,
                Digit9: 10,
                Digit0: 11,
                Minus: 12,
                Equal: 13,
                Backspace: 14,
                Tab: 15,
                KeyQ: 16,
                KeyW: 17,
                KeyE: 18,
                KeyR: 19,
                KeyT: 20,
                KeyY: 21,
                KeyU: 22,
                KeyI: 23,
                KeyO: 24,
                KeyP: 25,
                BracketLeft: 26,
                BracketRight: 27,
                Enter: 28,
                ControlLeft: 29,
                KeyA: 30,
                KeyS: 31,
                KeyD: 32,
                KeyF: 33,
                KeyG: 34,
                KeyH: 35,
                KeyJ: 36,
                KeyK: 37,
                KeyL: 38,
                Semicolon: 39,
                Quote: 40,
                Backquote: 41,
                ShiftLeft: 42,
                Backslash: 43,
                KeyZ: 44,
                KeyX: 45,
                KeyC: 46,
                KeyV: 47,
                KeyB: 48,
                KeyN: 49,
                KeyM: 50,
                Comma: 51,
                Period: 52,
                Slash: 53,
                ShiftRight: 54,
                NumpadMultiply: 55,
                AltLeft: 56,
                Space: 57,
                CapsLock: 58,
                F1: 59,
                F2: 60,
                F3: 61,
                F4: 62,
                F5: 63,
                F6: 64,
                F7: 65,
                F8: 66,
                F9: 67,
                F10: 68,
                NumLock: 69,
                ScrollLock: 70,
                Numpad7: 71,
                Numpad8: 72,
                Numpad9: 73,
                NumpadSubtract: 74,
                Numpad4: 75,
                Numpad5: 76,
                Numpad6: 77,
                NumpadAdd: 78,
                Numpad1: 79,
                Numpad2: 80,
                Numpad3: 81,
                Numpad0: 82,
                NumpadDecimal: 83,
                IntlBackslash: 86,
                F11: 87,
                F12: 88,
                NumpadEnter: 57372,
                ControlRight: 57373,
                NumpadDivide: 57397,
                AltRight: 57400,
                Home: 57415,
                ArrowUp: 57416,
                PageUp: 57417,
                ArrowLeft: 57419,
                ArrowRight: 57421,
                End: 57423,
                ArrowDown: 57424,
                PageDown: 57425,
                Insert: 57426,
                Delete: 57427,
                OSLeft: 57435,
                OSRight: 57436,
                ContextMenu: 57437
            };
        this.bus = a;
        this.destroy = function() {
            "undefined" !== typeof window && (window.removeEventListener("keyup", b, !1), window.removeEventListener("keydown", c, !1), window.removeEventListener("blur", d, !1))
        };
        this.init = function() {
            "undefined" !== typeof window && (this.destroy(), window.addEventListener("keyup",
                b, !1), window.addEventListener("keydown", c, !1), window.addEventListener("blur", d, !1))
        };
        this.init();
        this.simulate_press = function(q) {
            q = {
                keyCode: q
            };
            e(q, !0);
            e(q, !1)
        };
        this.simulate_char = function(q) {
            var r = q.charCodeAt(0);
            r in n ? this.simulate_press(n[r]) : r in p ? (g(SHIFT_SCAN_CODE), this.simulate_press(p[r]), g(SHIFT_SCAN_CODE | SCAN_CODE_RELEASE)) : console.log("ascii -> keyCode not found: ", r, q)
        }
    };

    function MouseAdapter(a, b) {
        function c(u) {
            if (!v.enabled || !v.emu_enabled) return !1;
            var x = b || document.body,
                z;
            if (!(z = document.pointerLockElement)) a: {
                for (u = u.target; u.parentNode;) {
                    if (u === x) {
                        z = !0;
                        break a
                    }
                    u = u.parentNode
                }
                z = !1
            }
            return z
        }

        function d(u) {
            c(u) && (u = u.changedTouches) && u.length && (u = u[u.length - 1], q = u.clientX, r = u.clientY)
        }

        function e(u) {
            if (n || t || p) v.bus.send("mouse-click", [!1, !1, !1]), n = t = p = !1
        }

        function f(u) {
            if (v.bus && c(u) && v.is_running) {
                var x = 0,
                    z = 0,
                    A = u.changedTouches;
                A ? A.length && (A = A[A.length - 1], x = A.clientX -
                    q, z = A.clientY - r, q = A.clientX, r = A.clientY, u.preventDefault()) : "number" === typeof u.movementX ? (x = u.movementX, z = u.movementY) : "number" === typeof u.webkitMovementX ? (x = u.webkitMovementX, z = u.webkitMovementY) : "number" === typeof u.mozMovementX ? (x = u.mozMovementX, z = u.mozMovementY) : (x = u.clientX - q, z = u.clientY - r, q = u.clientX, r = u.clientY);
                v.bus.send("mouse-delta", [.15 * x, -(.15 * z)]);
                b && v.bus.send("mouse-absolute", [u.pageX - b.offsetLeft, u.pageY - b.offsetTop, b.offsetWidth, b.offsetHeight])
            }
        }

        function g(u) {
            c(u) && l(u, !0)
        }

        function k(u) {
            c(u) &&
                l(u, !1)
        }

        function l(u, x) {
            v.bus && (1 === u.which ? n = x : 2 === u.which ? t = x : 3 === u.which ? p = x : dbg_log("Unknown event.which: " + u.which), v.bus.send("mouse-click", [n, t, p]), u.preventDefault())
        }

        function m(u) {
            if (c(u)) {
                var x = u.wheelDelta || -u.detail;
                0 > x ? x = -1 : 0 < x && (x = 1);
                v.bus.send("mouse-wheel", [x, 0]);
                u.preventDefault()
            }
        }
        var n = !1,
            p = !1,
            t = !1,
            q = 0,
            r = 0,
            v = this;
        this.enabled = !1;
        this.emu_enabled = !0;
        this.bus = a;
        this.bus.register("mouse-enable", function(u) {
            this.enabled = u
        }, this);
        this.is_running = !1;
        this.bus.register("emulator-stopped",
            function() {
                this.is_running = !1
            }, this);
        this.bus.register("emulator-started", function() {
            this.is_running = !0
        }, this);
        this.destroy = function() {
            "undefined" !== typeof window && (window.removeEventListener("touchstart", d, !1), window.removeEventListener("touchend", e, !1), window.removeEventListener("touchmove", f, !1), window.removeEventListener("mousemove", f, !1), window.removeEventListener("mousedown", g, !1), window.removeEventListener("mouseup", k, !1), window.removeEventListener("wheel", m, {
                passive: !1
            }))
        };
        this.init = function() {
            "undefined" !==
            typeof window && (this.destroy(), window.addEventListener("touchstart", d, !1), window.addEventListener("touchend", e, !1), window.addEventListener("touchmove", f, !1), window.addEventListener("mousemove", f, !1), window.addEventListener("mousedown", g, !1), window.addEventListener("mouseup", k, !1), window.addEventListener("wheel", m, {
                passive: !1
            }))
        };
        this.init()
    };
    var DAC_QUEUE_RESERVE = .2,
        AUDIOBUFFER_MINIMUM_SAMPLING_RATE = 8E3;

    function SpeakerAdapter(a) {
        if ("undefined" !== typeof window)
            if (window.AudioContext || window.webkitAudioContext) {
                var b = window.AudioWorklet ? SpeakerWorkletDAC : SpeakerBufferSourceDAC;
                this.bus = a;
                this.audio_context = window.AudioContext ? new AudioContext : new webkitAudioContext;
                this.mixer = new SpeakerMixer(a, this.audio_context);
                this.pcspeaker = new PCSpeaker(a, this.audio_context, this.mixer);
                this.dac = new b(a, this.audio_context, this.mixer);
                this.pcspeaker.start();
                a.register("emulator-stopped", function() {
                        this.audio_context.suspend()
                    },
                    this);
                a.register("emulator-started", function() {
                    this.audio_context.resume()
                }, this);
                a.register("speaker-confirm-initialized", function() {
                    a.send("speaker-has-initialized")
                }, this);
                a.send("speaker-has-initialized")
            } else console.warn("Web browser doesn't support Web Audio API")
    }
    SpeakerAdapter.prototype.destroy = function() {
        this.audio_context && this.audio_context.close();
        this.dac && this.dac.node_processor && this.dac.node_processor.port.close()
    };

    function SpeakerMixer(a, b) {
        function c(d) {
            return function(e) {
                d.gain.setValueAtTime(e, this.audio_context.currentTime)
            }
        }
        this.audio_context = b;
        this.sources = new Map;
        this.gain_right = this.gain_left = this.volume_right = this.volume_left = this.volume_both = 1;
        this.node_treble_left = this.audio_context.createBiquadFilter();
        this.node_treble_right = this.audio_context.createBiquadFilter();
        this.node_treble_left.type = "highshelf";
        this.node_treble_right.type = "highshelf";
        this.node_treble_left.frequency.setValueAtTime(2E3, this.audio_context.currentTime);
        this.node_treble_right.frequency.setValueAtTime(2E3, this.audio_context.currentTime);
        this.node_bass_left = this.audio_context.createBiquadFilter();
        this.node_bass_right = this.audio_context.createBiquadFilter();
        this.node_bass_left.type = "lowshelf";
        this.node_bass_right.type = "lowshelf";
        this.node_bass_left.frequency.setValueAtTime(200, this.audio_context.currentTime);
        this.node_bass_right.frequency.setValueAtTime(200, this.audio_context.currentTime);
        this.node_gain_left = this.audio_context.createGain();
        this.node_gain_right =
            this.audio_context.createGain();
        this.node_merger = this.audio_context.createChannelMerger(2);
        this.input_left = this.node_treble_left;
        this.input_right = this.node_treble_right;
        this.node_treble_left.connect(this.node_bass_left);
        this.node_bass_left.connect(this.node_gain_left);
        this.node_gain_left.connect(this.node_merger, 0, 0);
        this.node_treble_right.connect(this.node_bass_right);
        this.node_bass_right.connect(this.node_gain_right);
        this.node_gain_right.connect(this.node_merger, 0, 1);
        this.node_merger.connect(this.audio_context.destination);
        a.register("mixer-connect", function(d) {
            this.connect_source(d[0], d[1])
        }, this);
        a.register("mixer-disconnect", function(d) {
            this.disconnect_source(d[0], d[1])
        }, this);
        a.register("mixer-volume", function(d) {
            var e = d[0],
                f = d[1];
            d = Math.pow(10, d[2] / 20);
            var g = e === MIXER_SRC_MASTER ? this : this.sources.get(e);
            void 0 === g ? dbg_assert(!1, "Mixer set volume - cannot set volume for undefined source: " + e) : g.set_volume(d, f)
        }, this);
        a.register("mixer-gain-left", function(d) {
            this.gain_left = Math.pow(10, d / 20);
            this.update()
        }, this);
        a.register("mixer-gain-right", function(d) {
            this.gain_right = Math.pow(10, d / 20);
            this.update()
        }, this);
        a.register("mixer-treble-left", c(this.node_treble_left), this);
        a.register("mixer-treble-right", c(this.node_treble_right), this);
        a.register("mixer-bass-left", c(this.node_bass_left), this);
        a.register("mixer-bass-right", c(this.node_bass_right), this)
    }
    SpeakerMixer.prototype.add_source = function(a, b) {
        a = new SpeakerMixerSource(this.audio_context, a, this.input_left, this.input_right);
        dbg_assert(!this.sources.has(b), "Mixer add source - overwritting source: " + b);
        this.sources.set(b, a);
        return a
    };
    SpeakerMixer.prototype.connect_source = function(a, b) {
        var c = this.sources.get(a);
        void 0 === c ? dbg_assert(!1, "Mixer connect - cannot connect undefined source: " + a) : c.connect(b)
    };
    SpeakerMixer.prototype.disconnect_source = function(a, b) {
        var c = this.sources.get(a);
        void 0 === c ? dbg_assert(!1, "Mixer disconnect - cannot disconnect undefined source: " + a) : c.disconnect(b)
    };
    SpeakerMixer.prototype.set_volume = function(a, b) {
        void 0 === b && (b = MIXER_CHANNEL_BOTH);
        switch (b) {
            case MIXER_CHANNEL_LEFT:
                this.volume_left = a;
                break;
            case MIXER_CHANNEL_RIGHT:
                this.volume_right = a;
                break;
            case MIXER_CHANNEL_BOTH:
                this.volume_both = a;
                break;
            default:
                dbg_assert(!1, "Mixer set master volume - unknown channel: " + b);
                return
        }
        this.update()
    };
    SpeakerMixer.prototype.update = function() {
        var a = this.volume_both * this.volume_right * this.gain_right;
        this.node_gain_left.gain.setValueAtTime(this.volume_both * this.volume_left * this.gain_left, this.audio_context.currentTime);
        this.node_gain_right.gain.setValueAtTime(a, this.audio_context.currentTime)
    };

    function SpeakerMixerSource(a, b, c, d) {
        this.audio_context = a;
        this.connected_right = this.connected_left = !0;
        this.volume_right = this.volume_left = this.volume_both = this.gain_hidden = 1;
        this.node_splitter = a.createChannelSplitter(2);
        this.node_gain_left = a.createGain();
        this.node_gain_right = a.createGain();
        b.connect(this.node_splitter);
        this.node_splitter.connect(this.node_gain_left, 0);
        this.node_gain_left.connect(c);
        this.node_splitter.connect(this.node_gain_right, 1);
        this.node_gain_right.connect(d)
    }
    SpeakerMixerSource.prototype.update = function() {
        var a = this.connected_right * this.gain_hidden * this.volume_both * this.volume_right;
        this.node_gain_left.gain.setValueAtTime(this.connected_left * this.gain_hidden * this.volume_both * this.volume_left, this.audio_context.currentTime);
        this.node_gain_right.gain.setValueAtTime(a, this.audio_context.currentTime)
    };
    SpeakerMixerSource.prototype.connect = function(a) {
        var b = !a || a === MIXER_CHANNEL_BOTH;
        if (b || a === MIXER_CHANNEL_LEFT) this.connected_left = !0;
        if (b || a === MIXER_CHANNEL_RIGHT) this.connected_right = !0;
        this.update()
    };
    SpeakerMixerSource.prototype.disconnect = function(a) {
        var b = !a || a === MIXER_CHANNEL_BOTH;
        if (b || a === MIXER_CHANNEL_LEFT) this.connected_left = !1;
        if (b || a === MIXER_CHANNEL_RIGHT) this.connected_right = !1;
        this.update()
    };
    SpeakerMixerSource.prototype.set_volume = function(a, b) {
        void 0 === b && (b = MIXER_CHANNEL_BOTH);
        switch (b) {
            case MIXER_CHANNEL_LEFT:
                this.volume_left = a;
                break;
            case MIXER_CHANNEL_RIGHT:
                this.volume_right = a;
                break;
            case MIXER_CHANNEL_BOTH:
                this.volume_both = a;
                break;
            default:
                dbg_assert(!1, "Mixer set volume - unknown channel: " + b);
                return
        }
        this.update()
    };
    SpeakerMixerSource.prototype.set_gain_hidden = function(a) {
        this.gain_hidden = a
    };

    function PCSpeaker(a, b, c) {
        this.node_oscillator = b.createOscillator();
        this.node_oscillator.type = "square";
        this.node_oscillator.frequency.setValueAtTime(440, b.currentTime);
        this.mixer_connection = c.add_source(this.node_oscillator, MIXER_SRC_PCSPEAKER);
        this.mixer_connection.disconnect();
        a.register("pcspeaker-enable", function() {
            c.connect_source(MIXER_SRC_PCSPEAKER)
        }, this);
        a.register("pcspeaker-disable", function() {
            c.disconnect_source(MIXER_SRC_PCSPEAKER)
        }, this);
        a.register("pcspeaker-update", function(d) {
            var e =
                d[1],
                f = 0;
            3 === d[0] && (f = 1E3 * OSCILLATOR_FREQ / e, f = Math.min(f, this.node_oscillator.frequency.maxValue), f = Math.max(f, 0));
            this.node_oscillator.frequency.setValueAtTime(f, b.currentTime)
        }, this)
    }
    PCSpeaker.prototype.start = function() {
        this.node_oscillator.start()
    };

    function SpeakerWorkletDAC(a, b, c) {
        this.bus = a;
        this.audio_context = b;
        this.enabled = !1;
        this.sampling_rate = 48E3;
        b = function() {
            function g(m) {
                if (0 === m) return 1;
                m *= Math.PI;
                return Math.sin(m) / m
            }

            function k() {
                var m = Reflect.construct(AudioWorkletProcessor, [], k);
                m.kernel_size = 3;
                m.queue_data = Array(1024);
                m.queue_start = 0;
                m.queue_end = 0;
                m.queue_length = 0;
                m.queue_size = m.queue_data.length;
                m.queued_samples = 0;
                m.source_buffer_previous = l;
                m.source_buffer_current = l;
                m.source_samples_per_destination = 1;
                m.source_block_start = 0;
                m.source_time =
                    0;
                m.source_offset = 0;
                m.port.onmessage = n => {
                    switch (n.data.type) {
                        case "queue":
                            m.queue_push(n.data.value);
                            break;
                        case "sampling-rate":
                            m.source_samples_per_destination = n.data.value / sampleRate
                    }
                };
                return m
            }
            var l = [new Float32Array(256), new Float32Array(256)];
            Reflect.setPrototypeOf(k.prototype, AudioWorkletProcessor.prototype);
            Reflect.setPrototypeOf(k, AudioWorkletProcessor);
            k.prototype.process = k.prototype.process = function(m, n, p) {
                for (m = 0; m < n[0][0].length; m++) {
                    for (var t = p = 0, q = this.source_offset + this.kernel_size,
                            r = this.source_offset - this.kernel_size + 1; r <= q; r++) {
                        var v = this.source_block_start + r;
                        p += this.get_sample(v, 0) * this.kernel(this.source_time - r);
                        t += this.get_sample(v, 1) * this.kernel(this.source_time - r)
                    }
                    if (isNaN(p) || isNaN(t)) p = t = 0, this.dbg_log("ERROR: NaN values! Ignoring for now.");
                    n[0][0][m] = p;
                    n[0][1][m] = t;
                    this.source_time += this.source_samples_per_destination;
                    this.source_offset = Math.floor(this.source_time)
                }
                n = this.source_offset;
                n += this.kernel_size + 2;
                this.source_time -= this.source_offset;
                this.source_block_start +=
                    this.source_offset;
                this.source_offset = 0;
                this.ensure_enough_data(n);
                return !0
            };
            k.prototype.kernel = function(m) {
                return g(m) * g(m / this.kernel_size)
            };
            k.prototype.get_sample = function(m, n) {
                return 0 > m ? (m += this.source_buffer_previous[0].length, this.source_buffer_previous[n][m]) : this.source_buffer_current[n][m]
            };
            k.prototype.ensure_enough_data = function(m) {
                var n = this.source_buffer_current[0].length;
                n - this.source_block_start < m && (this.prepare_next_buffer(), this.source_block_start -= n)
            };
            k.prototype.prepare_next_buffer =
                function() {
                    256 > this.queued_samples && this.queue_length && this.dbg_log("Not enough samples - should not happen during midway of playback");
                    this.source_buffer_previous = this.source_buffer_current;
                    this.source_buffer_current = this.queue_shift();
                    var m = this.source_buffer_current[0].length;
                    if (256 > m) {
                        for (var n = this.queue_start, p = 0; 256 > m && p < this.queue_length;) m += this.queue_data[n][0].length, n = n + 1 & this.queue_size - 1, p++;
                        m = Math.max(m, 256);
                        m = [new Float32Array(m), new Float32Array(m)];
                        m[0].set(this.source_buffer_current[0]);
                        m[1].set(this.source_buffer_current[1]);
                        n = this.source_buffer_current[0].length;
                        for (var t = 0; t < p; t++) {
                            var q = this.queue_shift();
                            m[0].set(q[0], n);
                            m[1].set(q[1], n);
                            n += q[0].length
                        }
                        this.source_buffer_current = m
                    }
                    this.pump()
                };
            k.prototype.pump = function() {
                1024 > this.queued_samples / this.source_samples_per_destination && this.port.postMessage({
                    type: "pump"
                })
            };
            k.prototype.queue_push = function(m) {
                this.queue_length < this.queue_size && (this.queue_data[this.queue_end] = m, this.queue_end = this.queue_end + 1 & this.queue_size - 1, this.queue_length++,
                    this.queued_samples += m[0].length, this.pump())
            };
            k.prototype.queue_shift = function() {
                if (!this.queue_length) return l;
                var m = this.queue_data[this.queue_start];
                this.queue_data[this.queue_start] = null;
                this.queue_start = this.queue_start + 1 & this.queue_size - 1;
                this.queue_length--;
                this.queued_samples -= m[0].length;
                return m
            };
            k.prototype.dbg_log = function(m) {
                DEBUG && this.port.postMessage({
                    type: "debug-log",
                    value: m
                })
            };
            registerProcessor("dac-processor", k)
        }.toString();
        var d = b.indexOf("{") + 1,
            e = b.lastIndexOf("}");
        b = b.substring(d,
            e);
        DEBUG && (b = "var DEBUG = true;\n" + b);
        b = new Blob([b], {
            type: "application/javascript"
        });
        var f = URL.createObjectURL(b);
        this.node_processor = null;
        this.node_output = this.audio_context.createGain();
        this.audio_context.audioWorklet.addModule(f).then(() => {
            URL.revokeObjectURL(f);
            this.node_processor = new AudioWorkletNode(this.audio_context, "dac-processor", {
                numberOfInputs: 0,
                numberOfOutputs: 1,
                outputChannelCount: [2],
                parameterData: {},
                processorOptions: {}
            });
            this.node_processor.port.postMessage({
                type: "sampling-rate",
                value: this.sampling_rate
            });
            this.node_processor.port.onmessage = g => {
                switch (g.data.type) {
                    case "pump":
                        this.pump();
                        break;
                    case "debug-log":
                        dbg_log("SpeakerWorkletDAC - Worklet: " + g.data.value)
                }
            };
            this.node_processor.connect(this.node_output)
        });
        this.mixer_connection = c.add_source(this.node_output, MIXER_SRC_DAC);
        this.mixer_connection.set_gain_hidden(3);
        a.register("dac-send-data", function(g) {
            this.queue(g)
        }, this);
        a.register("dac-enable", function(g) {
            this.enabled = !0
        }, this);
        a.register("dac-disable", function() {
            this.enabled = !1
        }, this);
        a.register("dac-tell-sampling-rate",
            function(g) {
                dbg_assert(0 < g, "Sampling rate should be nonzero");
                this.sampling_rate = g;
                this.node_processor && this.node_processor.port.postMessage({
                    type: "sampling-rate",
                    value: g
                })
            }, this);
        DEBUG && (this.debugger = new SpeakerDACDebugger(this.audio_context, this.node_output))
    }
    SpeakerWorkletDAC.prototype.queue = function(a) {
        this.node_processor && (DEBUG && this.debugger.push_queued_data(a), this.node_processor.port.postMessage({
            type: "queue",
            value: a
        }, [a[0].buffer, a[1].buffer]))
    };
    SpeakerWorkletDAC.prototype.pump = function() {
        this.enabled && this.bus.send("dac-request-data")
    };

    function SpeakerBufferSourceDAC(a, b, c) {
        this.bus = a;
        this.audio_context = b;
        this.enabled = !1;
        this.sampling_rate = 22050;
        this.buffered_time = 0;
        this.rate_ratio = 1;
        this.node_lowpass = this.audio_context.createBiquadFilter();
        this.node_lowpass.type = "lowpass";
        this.node_output = this.node_lowpass;
        this.mixer_connection = c.add_source(this.node_output, MIXER_SRC_DAC);
        this.mixer_connection.set_gain_hidden(3);
        a.register("dac-send-data", function(d) {
            this.queue(d)
        }, this);
        a.register("dac-enable", function(d) {
                this.enabled = !0;
                this.pump()
            },
            this);
        a.register("dac-disable", function() {
            this.enabled = !1
        }, this);
        a.register("dac-tell-sampling-rate", function(d) {
            dbg_assert(0 < d, "Sampling rate should be nonzero");
            this.sampling_rate = d;
            this.rate_ratio = Math.ceil(AUDIOBUFFER_MINIMUM_SAMPLING_RATE / d);
            this.node_lowpass.frequency.setValueAtTime(d / 2, this.audio_context.currentTime)
        }, this);
        DEBUG && (this.debugger = new SpeakerDACDebugger(this.audio_context, this.node_output))
    }
    SpeakerBufferSourceDAC.prototype.queue = function(a) {
        DEBUG && this.debugger.push_queued_data(a);
        var b = a[0].length,
            c = b / this.sampling_rate;
        if (1 < this.rate_ratio) {
            var d = this.audio_context.createBuffer(2, b * this.rate_ratio, this.sampling_rate * this.rate_ratio);
            for (var e = d.getChannelData(0), f = d.getChannelData(1), g = 0, k = 0; k < b; k++)
                for (var l = 0; l < this.rate_ratio; l++, g++) e[g] = a[0][k], f[g] = a[1][k]
        } else d = this.audio_context.createBuffer(2, b, this.sampling_rate), d.copyToChannel ? (d.copyToChannel(a[0], 0), d.copyToChannel(a[1],
            1)) : (d.getChannelData(0).set(a[0]), d.getChannelData(1).set(a[1]));
        a = this.audio_context.createBufferSource();
        a.buffer = d;
        a.connect(this.node_lowpass);
        a.addEventListener("ended", this.pump.bind(this));
        d = this.audio_context.currentTime;
        if (this.buffered_time < d)
            for (dbg_log("Speaker DAC - Creating/Recreating reserve - shouldn't occur frequently during playback"), this.buffered_time = d, d = DAC_QUEUE_RESERVE - c, b = 0; b <= d;) b += c, this.buffered_time += c, setTimeout(() => this.pump(), 1E3 * b);
        a.start(this.buffered_time);
        this.buffered_time +=
            c;
        setTimeout(() => this.pump(), 0)
    };
    SpeakerBufferSourceDAC.prototype.pump = function() {
        this.enabled && (this.buffered_time - this.audio_context.currentTime > DAC_QUEUE_RESERVE || this.bus.send("dac-request-data"))
    };

    function SpeakerDACDebugger(a, b) {
        this.audio_context = a;
        this.node_source = b;
        this.node_processor = null;
        this.node_gain = this.audio_context.createGain();
        this.node_gain.gain.setValueAtTime(0, this.audio_context.currentTime);
        this.node_gain.connect(this.audio_context.destination);
        this.is_active = !1;
        this.queued_history = [];
        this.output_history = [];
        this.queued = [
            [],
            []
        ];
        this.output = [
            [],
            []
        ]
    }
    SpeakerDACDebugger.prototype.start = function(a) {
        this.is_active = !0;
        this.queued = [
            [],
            []
        ];
        this.output = [
            [],
            []
        ];
        this.queued_history.push(this.queued);
        this.output_history.push(this.output);
        this.node_processor = this.audio_context.createScriptProcessor(1024, 2, 2);
        this.node_processor.onaudioprocess = b => {
            this.output[0].push(b.inputBuffer.getChannelData(0).slice());
            this.output[1].push(b.inputBuffer.getChannelData(1).slice())
        };
        this.node_source.connect(this.node_processor);
        this.node_processor.connect(this.node_gain);
        setTimeout(() => {
            this.stop()
        }, a)
    };
    SpeakerDACDebugger.prototype.stop = function() {
        this.is_active = !1;
        this.node_source.disconnect(this.node_processor);
        this.node_processor.disconnect();
        this.node_processor = null
    };
    SpeakerDACDebugger.prototype.push_queued_data = function(a) {
        this.is_active && (this.queued[0].push(a[0].slice()), this.queued[1].push(a[1].slice()))
    };
    SpeakerDACDebugger.prototype.download_txt = function(a, b) {
        a = this.output_history[a][b].map(c => c.join(" ")).join(" ");
        dump_file(a, "dacdata.txt")
    };
    SpeakerDACDebugger.prototype.download_csv = function(a) {
        a = this.output_history[a];
        for (var b = [], c = 0; c < a[0].length; c++)
            for (var d = 0; d < a[0][c].length; d++) b.push(`${a[0][c][d]},${a[1][c][d]}`);
        dump_file(b.join("\n"), "dacdata.csv")
    };

    function SerialAdapter(a, b) {
        function c(k) {
            g.bus && g.enabled && (g.send_char(k.which), k.preventDefault())
        }

        function d(k) {
            var l = k.which;
            8 === l ? (g.send_char(127), k.preventDefault()) : 9 === l && (g.send_char(9), k.preventDefault())
        }

        function e(k) {
            if (g.enabled) {
                for (var l = k.clipboardData.getData("text/plain"), m = 0; m < l.length; m++) g.send_char(l.charCodeAt(m));
                k.preventDefault()
            }
        }

        function f(k) {
            k.target !== a && a.blur()
        }
        var g = this;
        this.enabled = !0;
        this.bus = b;
        this.text = "";
        this.text_new_line = !1;
        this.last_update = 0;
        this.bus.register("serial0-output-char",
            function(k) {
                this.show_char(k)
            }, this);
        this.destroy = function() {
            a.removeEventListener("keypress", c, !1);
            a.removeEventListener("keydown", d, !1);
            a.removeEventListener("paste", e, !1);
            window.removeEventListener("mousedown", f, !1)
        };
        this.init = function() {
            this.destroy();
            a.style.display = "block";
            a.addEventListener("keypress", c, !1);
            a.addEventListener("keydown", d, !1);
            a.addEventListener("paste", e, !1);
            window.addEventListener("mousedown", f, !1)
        };
        this.init();
        this.show_char = function(k) {
            "\b" === k ? (this.text = this.text.slice(0,
                -1), this.update()) : "\r" !== k && (this.text += k, "\n" === k && (this.text_new_line = !0), this.update())
        };
        this.update = function() {
            var k = Date.now(),
                l = k - this.last_update;
            16 > l ? void 0 === this.update_timer && (this.update_timer = setTimeout(() => {
                this.update_timer = void 0;
                var m = Date.now();
                dbg_assert(15 <= m - this.last_update);
                this.last_update = m;
                this.render()
            }, 16 - l)) : (void 0 !== this.update_timer && (clearTimeout(this.update_timer), this.update_timer = void 0), this.last_update = k, this.render())
        };
        this.render = function() {
            a.value = this.text;
            this.text_new_line && (this.text_new_line = !1, a.scrollTop = 1E9)
        };
        this.send_char = function(k) {
            g.bus && g.bus.send("serial0-input", k)
        }
    }

    function SerialRecordingAdapter(a) {
        this.text = "";
        a.register("serial0-output-char", function(b) {
            this.text += b
        }, this)
    }

    function SerialAdapterXtermJS(a, b) {
        this.element = a;
        if (window.Terminal) {
            var c = this.term = new window.Terminal;
            c.setOption("logLevel", "off");
            c.write("This is the serial console. Whatever you type or paste here will be sent to COM1");
            c.onData(function(d) {
                for (let e = 0; e < d.length; e++) b.send("serial0-input", d.charCodeAt(e))
            });
            b.register("serial0-output-char", function(d) {
                c.write(d)
            }, this)
        }
    }
    SerialAdapterXtermJS.prototype.show = function() {
        this.term && this.term.open(this.element)
    };

    function NetworkAdapter(a, b) {
        this.bus = b;
        this.socket = void 0;
        this.send_queue = [];
        this.url = a;
        this.reconnect_interval = 1E4;
        this.last_connect_attempt = Date.now() - this.reconnect_interval;
        this.send_queue_limit = 64;
        this.bus.register("net0-send", function(c) {
            this.send(c)
        }, this)
        this.injection = injection;
    }
    NetworkAdapter.prototype.handle_message = function(a) {
        this.bus && this.bus.send("net0-receive", new Uint8Array(a.data))
    };
    NetworkAdapter.prototype.handle_close = function(a) {
        this.connect();
        setTimeout(this.connect.bind(this), this.reconnect_interval)
    };
    NetworkAdapter.prototype.handle_open = function(a) {
        for (a = 0; a < this.send_queue.length; a++) this.send(this.send_queue[a]);
        this.send_queue = []
    };
    NetworkAdapter.prototype.handle_error = function(a) {};
    NetworkAdapter.prototype.destroy = function() {
        this.socket && this.socket.close()
    };
    NetworkAdapter.prototype.connect = function() {
        if ("undefined" !== typeof this.injection.WebSocket) {
            if (this.socket) {
                var a = this.socket.readyState;
                if (0 === a || 1 === a) return
            }
            a = Date.now();
            this.last_connect_attempt + this.reconnect_interval > a || (
                this.last_connect_attempt = Date.now(),
                this.socket = new this.injection.WebSocket(this.url),
                this.socket.binaryType = "arraybuffer",
                this.socket.onopen = this.handle_open.bind(this),
                this.socket.onmessage = this.handle_message.bind(this),
                this.socket.onclose = this.handle_close.bind(this),
                this.socket.onerror = this.handle_error.bind(this)
            )
        }else{
            // console.log('---------------------------------------------------------------------------------------------------------no internet!!!');
        }
    };
    NetworkAdapter.prototype.send = function(a) {
        // for (let q of a){
        //     console.log('<<<<'+q+'>>>>');
        // }
        this.socket && 1 === this.socket.readyState ? this.socket.send(a) : (this.send_queue.push(a), this.send_queue.length > 2 * this.send_queue_limit && (this.send_queue = this.send_queue.slice(-this.send_queue_limit)), this.connect())
    };
    NetworkAdapter.prototype.change_proxy = function(a) {
        this.url = a;
        this.socket && (this.socket.onclose = function() {}, this.socket.onerror = function() {}, this.socket.close(), this.socket = void 0)
    };
    var ASYNC_SAFE = !1;
    (function() {
        function a(k, l, m) {
            function n() {
                const v = m || 0;
                setTimeout(() => {
                    a(k, l, v + 1)
                }, 1E3 * ([1, 1, 2, 3, 5, 8, 13, 21][v] || 34))
            }
            var p = new XMLHttpRequest;
            p.open(l.method || "get", k, !0);
            p.responseType = l.as_json ? "json" : "arraybuffer";
            if (l.headers)
                for (var t = Object.keys(l.headers), q = 0; q < t.length; q++) {
                    var r = t[q];
                    p.setRequestHeader(r, l.headers[r])
                }
            l.range && (t = l.range.start, p.setRequestHeader("Range", "bytes=" + t + "-" + (t + l.range.length - 1)), p.onreadystatechange = function() {
                200 === p.status && p.abort()
            });
            p.onload = function(v) {
                4 ===
                    p.readyState && (200 !== p.status && 206 !== p.status ? (console.error("Loading the image " + k + " failed (status %d)", p.status), 500 <= p.status && 600 > p.status && n()) : p.response && l.done && l.done(p.response, p))
            };
            p.onerror = function(v) {
                console.error("Loading the image " + k + " failed", v);
                n()
            };
            l.progress && (p.onprogress = function(v) {
                l.progress(v)
            });
            p.send(null)
        }

        function b(k, l) {
            let m = require("fs");
            l.range ? (dbg_assert(!l.as_json), m.open(k, "r", (n, p) => {
                if (n) throw n;
                let t = l.range.length;
                var q = Buffer.allocUnsafe(t);
                m.read(p, q, 0,
                    t, l.range.start, (r, v) => {
                        if (r) throw r;
                        dbg_assert(v === t);
                        l.done && l.done(new Uint8Array(q));
                        m.close(p, u => {
                            if (u) throw u;
                        })
                    })
            })) : m.readFile(k, {
                encoding: l.as_json ? "utf-8" : null
            }, function(n, p) {
                n ? console.log("Could not read file:", k, n) : (n = p, n = l.as_json ? JSON.parse(n) : (new Uint8Array(n)).buffer, l.done(n))
            })
        }

        function c(k, l) {
            this.filename = k;
            this.block_size = 256;
            this.byteLength = l;
            this.block_cache = new Map;
            this.block_cache_is_write = new Set;
            this.onprogress = this.onload = void 0
        }

        function d(k, l, m, n) {
            const p = k.match(/(.*)(\..*)/);
            p ? (this.basename = p[1], this.extension = p[2]) : (this.basename = k, this.extension = "");
            this.block_size = 256;
            this.block_cache = new Map;
            this.block_cache_is_write = new Set;
            this.byteLength = l;
            this.fixed_chunk_size = m;
            this.partfile_alt_format = !!n;
            this.cache_reads = !!m;
            this.onprogress = this.onload = void 0
        }

        function e(k) {
            this.file = k;
            this.byteLength = k.size;
            1073741824 < k.size && console.warn("SyncFileBuffer: Allocating buffer of " + (k.size >> 20) + " MB ...");
            this.buffer = new ArrayBuffer(k.size);
            this.onprogress = this.onload = void 0
        }

        function f(k) {
            this.file = k;
            this.byteLength = k.size;
            this.block_size = 256;
            this.block_cache = new Map;
            this.block_cache_is_write = new Set;
            this.onprogress = this.onload = void 0
        }
        v86util.load_file = "undefined" === typeof XMLHttpRequest ? b : a;
        v86util.AsyncXHRBuffer = c;
        v86util.AsyncXHRPartfileBuffer = d;
        v86util.AsyncFileBuffer = f;
        v86util.SyncFileBuffer = e;
        v86util.read_sized_string_from_mem = function(k, l, m) {
            return String.fromCharCode(...(new Uint8Array(k.buffer, l >>> 0, m >>> 0)))
        };
        var g = "undefined" === typeof XMLHttpRequest ? function(k,
            l) {
            require("fs").stat(k, (m, n) => {
                m ? l(m) : l(null, n.size)
            })
        } : function(k, l) {
            v86util.load_file(k, {
                done: (m, n) => {
                    m = n.getResponseHeader("Content-Range") || "";
                    (n = m.match(/\/(\d+)\s*$/)) ? l(null, +n[1]): l("`Range: bytes=...` header not supported (Got `" + m + "`)")
                },
                headers: {
                    Range: "bytes=0-0"
                }
            })
        };
        c.prototype.load = function() {
            void 0 !== this.byteLength ? this.onload && this.onload(Object.create(null)) : g(this.filename, (k, l) => {
                if (k) throw Error("Cannot use: " + this.filename + ". " + k);
                dbg_assert(0 <= l);
                this.byteLength = l;
                this.onload &&
                    this.onload(Object.create(null))
            })
        };
        c.prototype.get_from_cache = function(k, l) {
            var m = l / this.block_size;
            k /= this.block_size;
            for (var n = 0; n < m; n++)
                if (!this.block_cache.get(k + n)) return;
            if (1 === m) return this.block_cache.get(k);
            l = new Uint8Array(l);
            for (n = 0; n < m; n++) l.set(this.block_cache.get(k + n), n * this.block_size);
            return l
        };
        c.prototype.get = function(k, l, m) {
            console.assert(k + l <= this.byteLength);
            console.assert(0 === k % this.block_size);
            console.assert(0 === l % this.block_size);
            console.assert(l);
            var n = this.get_from_cache(k,
                l);
            n ? ASYNC_SAFE ? setTimeout(m.bind(this, n), 0) : m(n) : v86util.load_file(this.filename, {
                done: function(p) {
                    p = new Uint8Array(p);
                    this.handle_read(k, l, p);
                    m(p)
                }.bind(this),
                range: {
                    start: k,
                    length: l
                }
            })
        };
        c.prototype.set = function(k, l, m) {
            console.assert(k + l.byteLength <= this.byteLength);
            var n = l.length;
            console.assert(0 === k % this.block_size);
            console.assert(0 === n % this.block_size);
            console.assert(n);
            k /= this.block_size;
            n /= this.block_size;
            for (var p = 0; p < n; p++) {
                var t = this.block_cache.get(k + p);
                void 0 === t && (t = new Uint8Array(this.block_size),
                    this.block_cache.set(k + p, t));
                var q = l.subarray(p * this.block_size, (p + 1) * this.block_size);
                t.set(q);
                console.assert(t.byteLength === q.length);
                this.block_cache_is_write.add(k + p)
            }
            m()
        };
        c.prototype.handle_read = function(k, l, m) {
            k /= this.block_size;
            l /= this.block_size;
            for (var n = 0; n < l; n++) {
                var p = this.block_cache.get(k + n);
                p ? m.set(p, n * this.block_size) : this.cache_reads && (p = new Uint8Array(this.block_size), p.set(m.subarray(n * this.block_size, (n + 1) * this.block_size)), this.block_cache.set(k + n, p))
            }
        };
        c.prototype.get_buffer =
            function(k) {
                k()
            };
        c.prototype.get_state = function() {
            const k = [],
                l = [];
            for (let [m, n] of this.block_cache) dbg_assert(isFinite(m)), this.block_cache_is_write.has(m) && l.push([m, n]);
            k[0] = l;
            return k
        };
        c.prototype.set_state = function(k) {
            k = k[0];
            this.block_cache.clear();
            this.block_cache_is_write.clear();
            for (let [l, m] of k) dbg_assert(isFinite(l)), this.block_cache.set(l, m), this.block_cache_is_write.add(l)
        };
        d.prototype.load = function() {
            void 0 === this.byteLength && dbg_assert(!1);
            this.onload && this.onload(Object.create(null))
        };
        d.prototype.get = function(k, l, m) {
            console.assert(k + l <= this.byteLength);
            console.assert(0 === k % this.block_size);
            console.assert(0 === l % this.block_size);
            console.assert(l);
            var n = this.get_from_cache(k, l);
            if (n) ASYNC_SAFE ? setTimeout(m.bind(this, n), 0) : m(n);
            else if (this.fixed_chunk_size) {
                const t = Math.floor(k / this.fixed_chunk_size),
                    q = k - t * this.fixed_chunk_size;
                dbg_assert(0 <= q);
                const r = Math.ceil((q + l) / this.fixed_chunk_size),
                    v = new Uint8Array(r * this.fixed_chunk_size);
                let u = 0;
                for (let x = 0; x < r; x++) {
                    var p = (t + x) * this.fixed_chunk_size;
                    n = this.partfile_alt_format ? this.basename + "-" + (t + x + "").padStart(8, "0") + this.extension : this.basename + "-" + p + "-" + (p + this.fixed_chunk_size) + this.extension;
                    (p = this.get_from_cache(p, this.fixed_chunk_size)) ? (v.set(p, x * this.fixed_chunk_size), u++, u === r && (n = v.subarray(q, q + l), m(n))) : v86util.load_file(n, {
                        done: function(z) {
                            var A = x * this.fixed_chunk_size;
                            z = new Uint8Array(z);
                            this.handle_read((t + x) * this.fixed_chunk_size, this.fixed_chunk_size | 0, z);
                            v.set(z, A);
                            u++;
                            u === r && (A = v.subarray(q, q + l), m(A))
                        }.bind(this)
                    })
                }
            } else v86util.load_file(this.basename +
                "-" + k + "-" + (k + l) + this.extension, {
                    done: function(t) {
                        dbg_assert(t.byteLength === l);
                        t = new Uint8Array(t);
                        this.handle_read(k, l, t);
                        m(t)
                    }.bind(this)
                })
        };
        d.prototype.get_from_cache = c.prototype.get_from_cache;
        d.prototype.set = c.prototype.set;
        d.prototype.handle_read = c.prototype.handle_read;
        d.prototype.get_state = c.prototype.get_state;
        d.prototype.set_state = c.prototype.set_state;
        e.prototype.load = function() {
            this.load_next(0)
        };
        e.prototype.load_next = function(k) {
            var l = new FileReader;
            l.onload = function(n) {
                n = new Uint8Array(n.target.result);
                (new Uint8Array(this.buffer, k)).set(n);
                this.load_next(k + 4194304)
            }.bind(this);
            if (this.onprogress) this.onprogress({
                loaded: k,
                total: this.byteLength,
                lengthComputable: !0
            });
            if (k < this.byteLength) {
                var m = this.file.slice(k, Math.min(k + 4194304, this.byteLength));
                l.readAsArrayBuffer(m)
            } else this.file = void 0, this.onload && this.onload({
                buffer: this.buffer
            })
        };
        e.prototype.get = function(k, l, m) {
            console.assert(k + l <= this.byteLength);
            m(new Uint8Array(this.buffer, k, l))
        };
        e.prototype.set = function(k, l, m) {
            console.assert(k + l.byteLength <=
                this.byteLength);
            (new Uint8Array(this.buffer, k, l.byteLength)).set(l);
            m()
        };
        e.prototype.get_buffer = function(k) {
            k(this.buffer)
        };
        e.prototype.get_state = function() {
            const k = [];
            k[0] = this.byteLength;
            k[1] = new Uint8Array(this.buffer);
            return k
        };
        e.prototype.set_state = function(k) {
            this.byteLength = k[0];
            this.buffer = k[1].slice().buffer
        };
        f.prototype.load = function() {
            this.onload && this.onload(Object.create(null))
        };
        f.prototype.get = function(k, l, m) {
            console.assert(0 === k % this.block_size);
            console.assert(0 === l % this.block_size);
            console.assert(l);
            var n = this.get_from_cache(k, l);
            n ? m(n) : (n = new FileReader, n.onload = function(p) {
                p = new Uint8Array(p.target.result);
                this.handle_read(k, l, p);
                m(p)
            }.bind(this), n.readAsArrayBuffer(this.file.slice(k, k + l)))
        };
        f.prototype.get_from_cache = c.prototype.get_from_cache;
        f.prototype.set = c.prototype.set;
        f.prototype.handle_read = c.prototype.handle_read;
        f.prototype.get_state = c.prototype.get_state;
        f.prototype.get_buffer = function(k) {
            k()
        };
        f.prototype.get_as_file = function(k) {
            for (var l = [], m = Array.from(this.block_cache.keys()).sort(function(r,
                    v) {
                    return r - v
                }), n = 0, p = 0; p < m.length; p++) {
                var t = m[p],
                    q = this.block_cache.get(t);
                t *= this.block_size;
                console.assert(t >= n);
                t !== n && (l.push(this.file.slice(n, t)), n = t);
                l.push(q);
                n += q.length
            }
            n !== this.file.size && l.push(this.file.slice(n));
            k = new File(l, k);
            console.assert(k.size === this.file.size);
            return k
        }
    })();

    function V86Starter(a) {
        if (typeof a.injection !== 'undefined'){
            for (var _w in a.injection){
                injection[_w]=a.injection[_w];
            }
        }
        this.injection=injection;
        // if (typeof a.write_proxy !== 'undefined'){
        //     injection.write_proxy=a.write_proxy;
        // }
        // if (typeof a.read_proxy !== 'undefined'){
        //     injection.read_proxy=a.read_proxy;
        // }
        this.cpu_is_running = !1;
        var b = Bus.create();
        this.bus = b[0];
        this.emulator_bus = b[1];
        var c, d;
        const e = new WebAssembly.Table({
            element: "anyfunc",
            initial: WASM_TABLE_SIZE + WASM_TABLE_OFFSET
        });
        b = {
            cpu_exception_hook: g => this.cpu_exception_hook && this.cpu_exception_hook(g),
            hlt_op: function() {
                return c.hlt_op()
            },
            abort: function() {
                dbg_assert(!1)
            },
            microtick: v86.microtick,
            get_rand_int: function() {
                return v86util.get_rand_int()
            },
            pic_acknowledge: function() {
                c.pic_acknowledge()
            },
            io_port_read8: function(g) {
                return c.io.port_read8(g)
            },
            io_port_read16: function(g) {
                return c.io.port_read16(g)
            },
            io_port_read32: function(g) {
                return c.io.port_read32(g)
            },
            io_port_write8: function(g, k) {
                c.io.port_write8(g, k)
            },
            io_port_write16: function(g, k) {
                c.io.port_write16(g, k)
            },
            io_port_write32: function(g, k) {
                c.io.port_write32(g, k)
            },
            mmap_read8: function(g) {
                return c.mmap_read8(g)
            },
            mmap_read16: function(g) {
                return c.mmap_read16(g)
            },
            mmap_read32: function(g) {
                return c.mmap_read32(g)
            },
            mmap_write8: function(g, k) {
                c.mmap_write8(g, k)
            },
            mmap_write16: function(g, k) {
                c.mmap_write16(g,
                    k)
            },
            mmap_write32: function(g, k) {
                c.mmap_write32(g, k)
            },
            mmap_write64: function(g, k, l) {
                c.mmap_write64(g, k, l)
            },
            mmap_write128: function(g, k, l, m, n) {
                c.mmap_write128(g, k, l, m, n)
            },
            log_from_wasm: function(g, k) {
                g = v86util.read_sized_string_from_mem(d, g, k);
                dbg_log(g, LOG_CPU)
            },
            console_log_from_wasm: function(g, k) {
                g = v86util.read_sized_string_from_mem(d, g, k);
                console.error(g)
            },
            dbg_trace_from_wasm: function() {
                dbg_trace(LOG_CPU)
            },
            codegen_finalize: (g, k, l, m, n) => {
                c.codegen_finalize(g, k, l, m, n)
            },
            jit_clear_func: g => c.jit_clear_func(g),
            jit_clear_all_funcs: () => c.jit_clear_all_funcs(),
            __indirect_function_table: e
        };
        let f = a.wasm_fn;
        f || (f = g => new Promise(k => {
            let l = DEBUG ? "v86-debug.wasm" : "v86.wasm",
                m = "v86-fallback.wasm";
            if (a.wasm_path) {
                l = a.wasm_path;
                const n = l.lastIndexOf("/");
                m = (-1 === n ? "" : l.substr(0, n)) + "/" + m
            } else "undefined" === typeof window && "string" === typeof __dirname ? (l = __dirname + "/" + l, m = __dirname + "/" + m) : (l = "build/" + l, m = "build/" + m);
            v86util.load_file(l, {
                done: async n => {
                    try {
                        const {
                            instance: p
                        } = await WebAssembly.instantiate(n, g);
                        k(p.exports)
                    } catch (p) {
                        v86util.load_file(m, {
                            done: async t => {
                                ({
                                    instance: t
                                } = await WebAssembly.instantiate(t, g));
                                k(t.exports)
                            }
                        })
                    }
                },
                progress: n => {
                    this.emulator_bus.send("download-progress", {
                        file_index: 0,
                        file_count: 1,
                        file_name: l,
                        lengthComputable: n.lengthComputable,
                        total: n.total,
                        loaded: n.loaded
                    })
                }
            })
        }));
        f({
            env: b
        }).then(g => {
            d = g.memory;
            g.rust_init();
            g = this.v86 = new v86(this.emulator_bus, {
                exports: g,
                wasm_table: e
            });
            c = g.cpu;
            this.continue_init(g, a)
        })
    }
    V86Starter.prototype.continue_init = async function(a, b) {
        function c(q, r) {
            switch (q) {
                case "hda":
                    f.hda = this.disk_images.hda = r;
                    break;
                case "hdb":
                    f.hdb = this.disk_images.hdb = r;
                    break;
                case "cdrom":
                    f.cdrom = this.disk_images.cdrom = r;
                    break;
                case "fda":
                    f.fda = this.disk_images.fda = r;
                    break;
                case "fdb":
                    f.fdb = this.disk_images.fdb = r;
                    break;
                case "multiboot":
                    f.multiboot = this.disk_images.multiboot = r.buffer;
                    break;
                case "bzimage":
                    f.bzimage = this.disk_images.bzimage = r.buffer;
                    break;
                case "initrd":
                    f.initrd = this.disk_images.initrd = r.buffer;
                    break;
                case "bios":
                    f.bios = r.buffer;
                    break;
                case "vga_bios":
                    f.vga_bios = r.buffer;
                    break;
                case "initial_state":
                    f.initial_state = r.buffer;
                    break;
                case "fs9p_json":
                    f.fs9p_json = r;
                    break;
                default:
                    dbg_assert(!1, q)
            }
        }

        function d(q, r) {
            if (r)
                if (r.get && r.set && r.load) g.push({
                    name: q,
                    loadable: r
                });
                else {
                    if ("bios" === q || "vga_bios" === q || "initial_state" === q || "multiboot" === q || "bzimage" === q || "initrd" === q) r.async = !1;
                    r.buffer instanceof ArrayBuffer ? (r = new SyncBuffer(r.buffer), g.push({
                        name: q,
                        loadable: r
                    })) : "undefined" !== typeof File && r.buffer instanceof
                    File ? (void 0 === r.async && (r.async = 268435456 <= r.buffer.size), r = r.async ? new v86util.AsyncFileBuffer(r.buffer) : new v86util.SyncFileBuffer(r.buffer), g.push({
                        name: q,
                        loadable: r
                    })) : r.url ? r.async ? (r = r.use_parts ? new v86util.AsyncXHRPartfileBuffer(r.url, r.size, r.fixed_chunk_size) : new v86util.AsyncXHRBuffer(r.url, r.size), g.push({
                        name: q,
                        loadable: r
                    })) : g.push({
                        name: q,
                        url: r.url,
                        size: r.size
                    }) : dbg_log("Ignored file: url=" + r.url + " buffer=" + r.buffer)
                }
        }
        async function e() {
            if (f.fs9p && f.fs9p_json) {
                if (f.initial_state ? dbg_log("Filesystem basefs ignored: Overridden by state image") :
                    f.fs9p.load_from_json(f.fs9p_json), b.bzimage_initrd_from_filesystem) {
                    const {
                        bzimage_path: q,
                        initrd_path: r
                    } = this.get_bzimage_initrd_from_filesystem(f.fs9p);
                    dbg_log("Found bzimage: " + q + " and initrd: " + r);
                    const [v, u] = await Promise.all([f.fs9p.read_file(r), f.fs9p.read_file(q)]);
                    c.call(this, "initrd", new SyncBuffer(v.buffer));
                    c.call(this, "bzimage", new SyncBuffer(u.buffer))
                }
            } else console.assert(!b.bzimage_initrd_from_filesystem, "bzimage_initrd_from_filesystem: Requires a filesystem");
            this.serial_adapter &&
                this.serial_adapter.show && this.serial_adapter.show();
            this.bus.send("cpu-init", f);
            f.initial_state && (a.restore_state(f.initial_state), f.initial_state = void 0);
            b.autostart && this.bus.send("cpu-run");
            this.emulator_bus.send("emulator-loaded")
        }
        this.bus.register("emulator-stopped", function() {
            this.cpu_is_running = !1
        }, this);
        this.bus.register("emulator-started", function() {
            this.cpu_is_running = !0
        }, this);
        var f = {};
        this.disk_images = {
            fda: void 0,
            fdb: void 0,
            hda: void 0,
            hdb: void 0,
            cdrom: void 0
        };
        f.acpi = b.acpi;
        f.load_devices = !0;
        f.log_level = b.log_level;
        f.memory_size = b.memory_size || 67108864;
        f.vga_memory_size = b.vga_memory_size || 8388608;
        f.boot_order = b.boot_order || 531;
        f.fastboot = b.fastboot || !1;
        f.fda = void 0;
        f.fdb = void 0;
        f.uart1 = b.uart1;
        f.uart2 = b.uart2;
        f.uart3 = b.uart3;
        f.cmdline = b.cmdline;
        f.preserve_mac_from_state_image = b.preserve_mac_from_state_image;
        f.mac_address_translation = b.mac_address_translation;
        b.network_adapter ? this.network_adapter = b.network_adapter(this.bus) : b.network_relay_url && (this.network_adapter = new NetworkAdapter(b.network_relay_url,
            this.bus));
        f.enable_ne2k = !0;
        b.disable_keyboard || (this.keyboard_adapter = new KeyboardAdapter(this.bus));
        b.disable_mouse || (this.mouse_adapter = new MouseAdapter(this.bus, b.screen_container));
        b.screen_container ? this.screen_adapter = new ScreenAdapter(b.screen_container, this.bus) : b.screen_dummy && (this.screen_adapter = new DummyScreenAdapter(this.bus));
        b.serial_container && (this.serial_adapter = new SerialAdapter(b.serial_container, this.bus));
        b.serial_container_xtermjs && (this.serial_adapter = new SerialAdapterXtermJS(b.serial_container_xtermjs,
            this.bus));
        b.disable_speaker || (this.speaker_adapter = new SpeakerAdapter(this.bus));
        var g = [];
        b.state && console.warn("Warning: Unknown option 'state'. Did you mean 'initial_state'?");
        for (var k = "bios vga_bios cdrom hda hdb fda fdb initial_state multiboot bzimage initrd".split(" "), l = 0; l < k.length; l++) d(k[l], b[k[l]]);
        if (b.filesystem) {
            k = b.filesystem.basefs;
            l = b.filesystem.baseurl;
            let q = new MemoryFileStorage;
            l && (q = new ServerFileStorageWrapper(q, l));
            f.fs9p = this.fs9p = new FS(q);
            if (k) {
                console.assert(l, "Filesystem: baseurl must be specified");
                if ("object" === typeof k) {
                    var m = k.size;
                    k = k.url
                }
                dbg_assert("string" === typeof k);
                g.push({
                    name: "fs9p_json",
                    url: k,
                    size: m,
                    as_json: !0
                })
            }
        }
        var n = this,
            p = g.length,
            t = function(q) {
                if (q === p) setTimeout(e.bind(this), 0);
                else {
                    var r = g[q];
                    r.loadable ? (r.loadable.onload = function(v) {
                        c.call(this, r.name, r.loadable);
                        t(q + 1)
                    }.bind(this), r.loadable.load()) : v86util.load_file(r.url, {
                        done: function(v) {
                            c.call(this, r.name, r.as_json ? v : new SyncBuffer(v));
                            t(q + 1)
                        }.bind(this),
                        progress: function(v) {
                            200 === v.target.status ? n.emulator_bus.send("download-progress", {
                                file_index: q,
                                file_count: p,
                                file_name: r.url,
                                lengthComputable: v.lengthComputable,
                                total: v.total || r.size,
                                loaded: v.loaded
                            }) : n.emulator_bus.send("download-error", {
                                file_index: q,
                                file_count: p,
                                file_name: r.url,
                                request: v.target
                            })
                        },
                        as_json: r.as_json
                    })
                }
            }.bind(this);
        t(0)
    };
    V86Starter.prototype.get_bzimage_initrd_from_filesystem = function(a) {
        const b = (a.read_dir("/") || []).map(e => "/" + e);
        a = (a.read_dir("/boot/") || []).map(e => "/boot/" + e);
        let c, d;
        for (let e of [].concat(b, a)) {
            const f = /old/i.test(e) || /fallback/i.test(e),
                g = /vmlinuz/i.test(e) || /bzimage/i.test(e),
                k = /initrd/i.test(e) || /initramfs/i.test(e);
            !g || d && f || (d = e);
            !k || c && f || (c = e)
        }
        c && d || (console.log("Failed to find bzimage or initrd in filesystem. Files:"), console.log(b.join(" ")), console.log(a.join(" ")));
        return {
            initrd_path: c,
            bzimage_path: d
        }
    };
    V86Starter.prototype.run = async function() {
        this.bus.send("cpu-run")
    };
    goog.exportProperty(V86Starter.prototype, "run", V86Starter.prototype.run);
    V86Starter.prototype.stop = async function() {
        this.bus.send("cpu-stop")
    };
    goog.exportProperty(V86Starter.prototype, "stop", V86Starter.prototype.stop);
    V86Starter.prototype.destroy = function() {
        this.stop();
        this.v86.destroy();
        this.keyboard_adapter && this.keyboard_adapter.destroy();
        this.network_adapter && this.network_adapter.destroy();
        this.mouse_adapter && this.mouse_adapter.destroy();
        this.screen_adapter && this.screen_adapter.destroy();
        this.serial_adapter && this.serial_adapter.destroy();
        this.speaker_adapter && this.speaker_adapter.destroy()
    };
    goog.exportProperty(V86Starter.prototype, "destroy", V86Starter.prototype.destroy);
    V86Starter.prototype.restart = function() {
        this.bus.send("cpu-restart")
    };
    goog.exportProperty(V86Starter.prototype, "restart", V86Starter.prototype.restart);
    V86Starter.prototype.add_listener = function(a, b) {
        this.bus.register(a, b, this)
    };
    goog.exportProperty(V86Starter.prototype, "add_listener", V86Starter.prototype.add_listener);
    V86Starter.prototype.remove_listener = function(a, b) {
        this.bus.unregister(a, b)
    };
    goog.exportProperty(V86Starter.prototype, "remove_listener", V86Starter.prototype.remove_listener);
    V86Starter.prototype.restore_state = async function(a) {
        console.assert(1 === arguments.length);
        this.v86.restore_state(a)
    };
    goog.exportProperty(V86Starter.prototype, "restore_state", V86Starter.prototype.restore_state);
    V86Starter.prototype.save_state = async function() {
        console.assert(0 === arguments.length);
        return this.v86.save_state()
    };
    goog.exportProperty(V86Starter.prototype, "save_state", V86Starter.prototype.save_state);
    V86Starter.prototype.get_statistics = function() {
        console.warn("V86Starter.prototype.get_statistics is deprecated. Use events instead.");
        var a = {
            cpu: {
                instruction_counter: this.get_instruction_counter()
            }
        };
        if (!this.v86) return a;
        var b = this.v86.cpu.devices;
        b.hda && (a.hda = b.hda.stats);
        b.cdrom && (a.cdrom = b.cdrom.stats);
        b.ps2 && (a.mouse = {
            enabled: b.ps2.use_mouse
        });
        b.vga && (a.vga = {
            is_graphical: b.vga.stats.is_graphical
        });
        return a
    };
    goog.exportProperty(V86Starter.prototype, "get_statistics", V86Starter.prototype.get_statistics);
    V86Starter.prototype.get_instruction_counter = function() {
        return this.v86 ? this.v86.cpu.instruction_counter[0] >>> 0 : 0
    };
    goog.exportProperty(V86Starter.prototype, "get_instruction_counter", V86Starter.prototype.get_instruction_counter);
    V86Starter.prototype.is_running = function() {
        return this.cpu_is_running
    };
    goog.exportProperty(V86Starter.prototype, "is_running", V86Starter.prototype.is_running);
    V86Starter.prototype.keyboard_send_scancodes = function(a) {
        for (var b = 0; b < a.length; b++) this.bus.send("keyboard-code", a[b])
    };
    goog.exportProperty(V86Starter.prototype, "keyboard_send_scancodes", V86Starter.prototype.keyboard_send_scancodes);
    V86Starter.prototype.keyboard_send_keys = function(a) {
        for (var b = 0; b < a.length; b++) this.keyboard_adapter.simulate_press(a[b])
    };
    goog.exportProperty(V86Starter.prototype, "keyboard_send_keys", V86Starter.prototype.keyboard_send_keys);
    V86Starter.prototype.keyboard_send_text = function(a) {
        for (var b = 0; b < a.length; b++) this.keyboard_adapter.simulate_char(a[b])
    };
    goog.exportProperty(V86Starter.prototype, "keyboard_send_text", V86Starter.prototype.keyboard_send_text);
    V86Starter.prototype.screen_make_screenshot = function() {
        this.screen_adapter && this.screen_adapter.make_screenshot()
    };
    goog.exportProperty(V86Starter.prototype, "screen_make_screenshot", V86Starter.prototype.screen_make_screenshot);
    V86Starter.prototype.screen_set_scale = function(a, b) {
        this.screen_adapter && this.screen_adapter.set_scale(a, b)
    };
    goog.exportProperty(V86Starter.prototype, "screen_set_scale", V86Starter.prototype.screen_set_scale);
    V86Starter.prototype.screen_go_fullscreen = function() {
        if (this.screen_adapter) {
            var a = document.getElementById("screen_container");
            if (a) {
                var b = a.requestFullScreen || a.webkitRequestFullscreen || a.mozRequestFullScreen || a.msRequestFullScreen;
                b && (b.call(a), (a = document.getElementsByClassName("phone_keyboard")[0]) && a.focus());
                try {
                    navigator.keyboard.lock()
                } catch (c) {}
                this.lock_mouse()
            }
        }
    };
    goog.exportProperty(V86Starter.prototype, "screen_go_fullscreen", V86Starter.prototype.screen_go_fullscreen);
    V86Starter.prototype.lock_mouse = function() {
        var a = document.body,
            b = a.requestPointerLock || a.mozRequestPointerLock || a.webkitRequestPointerLock;
        b && b.call(a)
    };
    goog.exportProperty(V86Starter.prototype, "lock_mouse", V86Starter.prototype.lock_mouse);
    V86Starter.prototype.mouse_set_status = function(a) {
        this.mouse_adapter && (this.mouse_adapter.emu_enabled = a)
    };
    V86Starter.prototype.keyboard_set_status = function(a) {
        this.keyboard_adapter && (this.keyboard_adapter.emu_enabled = a)
    };
    goog.exportProperty(V86Starter.prototype, "keyboard_set_status", V86Starter.prototype.keyboard_set_status);
    V86Starter.prototype.serial0_send = function(a) {
        for (var b = 0; b < a.length; b++) this.bus.send("serial0-input", a.charCodeAt(b))
    };
    goog.exportProperty(V86Starter.prototype, "serial0_send", V86Starter.prototype.serial0_send);
    V86Starter.prototype.serial_send_bytes = function(a, b) {
        for (var c = 0; c < b.length; c++) this.bus.send("serial" + a + "-input", b[c])
    };
    goog.exportProperty(V86Starter.prototype, "serial_send_bytes", V86Starter.prototype.serial_send_bytes);
    V86Starter.prototype.mount_fs = async function(a, b, c, d) {
        let e = new MemoryFileStorage;
        b && (e = new ServerFileStorageWrapper(e, b));
        const f = new FS(e, this.fs9p.qidcounter),
            g = () => {
                const k = this.fs9p.Mount(a, f);
                d && (k === -ENOENT ? d(new FileNotFoundError) : k === -EEXIST ? d(new FileExistsError) : 0 > k ? (dbg_assert(!1, "Unexpected error code: " + -k), d(Error("Failed to mount. Error number: " + -k))) : d(null))
            };
        b ? (dbg_assert("object" === typeof c, "Filesystem: basefs must be a JSON object"), f.load_from_json(c, () => g())) : g()
    };
    goog.exportProperty(V86Starter.prototype, "mount_fs", V86Starter.prototype.mount_fs);
    V86Starter.prototype.create_file = async function(a, b) {
        console.assert(2 === arguments.length);
        var c = this.fs9p;
        if (c) {
            var d = a.split("/");
            d = d[d.length - 1];
            var e = c.SearchPath(a).parentid;
            if ("" !== d && -1 !== e) await c.CreateBinaryFile(d, e, b);
            else return Promise.reject(new FileNotFoundError)
        }
    };
    goog.exportProperty(V86Starter.prototype, "create_file", V86Starter.prototype.create_file);
    V86Starter.prototype.read_file = async function(a) {
        console.assert(1 === arguments.length);
        var b = this.fs9p;
        if (b) return (b = await b.read_file(a)) ? b : Promise.reject(new FileNotFoundError)
    };
    goog.exportProperty(V86Starter.prototype, "read_file", V86Starter.prototype.read_file);
    V86Starter.prototype.automatically = function(a) {
        const b = c => {
            const d = c[0];
            if (d) {
                var e = c.slice(1);
                if (d.sleep) setTimeout(() => b(e), 1E3 * d.sleep);
                else if (d.vga_text) {
                    const f = this.screen_adapter.get_text_screen();
                    for (let g of f)
                        if (g.includes(d.vga_text)) {
                            b(e);
                            return
                        } setTimeout(() => b(c), 1E3)
                } else d.keyboard_send ? (d.keyboard_send instanceof Array ? this.keyboard_send_scancodes(d.keyboard_send) : (dbg_assert("string" === typeof d.keyboard_send), this.keyboard_send_text(d.keyboard_send)), b(e)) : d.call ? (d.call(), b(e)) :
                    console.assert(!1, d)
            }
        };
        b(a)
    };
    V86Starter.prototype.read_memory = function(a, b) {
        return this.v86.cpu.read_blob(a, b)
    };
    V86Starter.prototype.write_memory = function(a, b) {
        this.v86.cpu.write_blob(a, b)
    };

    function FileExistsError(a) {
        this.message = a || "File already exists"
    }
    FileExistsError.prototype = Error.prototype;

    function FileNotFoundError(a) {
        this.message = a || "File not found"
    }
    FileNotFoundError.prototype = Error.prototype;
    "undefined" !== typeof window ? (window.V86Starter = V86Starter, window.V86 = V86Starter) : "undefined" !== typeof module && "undefined" !== typeof module.exports ? (module.exports.V86Starter = V86Starter, module.exports.V86 = V86Starter) : "function" === typeof importScripts && (self.V86Starter = V86Starter, self.V86 = V86Starter);
    var WorkerBus = {
        Connector: function(a) {
            this.listeners = {};
            this.pair = a;
            a.addEventListener("message", function(b) {
                b = b.data;
                for (var c = this.listeners[b[0]], d = 0; d < c.length; d++) {
                    var e = c[d];
                    e.fn.call(e.this_value, b[1])
                }
            }.bind(this), !1)
        }
    };
    WorkerBus.Connector.prototype.register = function(a, b, c) {
        var d = this.listeners[a];
        void 0 === d && (d = this.listeners[a] = []);
        d.push({
            fn: b,
            this_value: c
        })
    };
    WorkerBus.Connector.prototype.send = function(a, b, c) {
        dbg_assert(1 <= arguments.length);
        this.pair && this.pair.postMessage([a, b], c)
    };
    WorkerBus.init = function(a) {
        return new WorkerBus.Connector(a)
    };

    function DummyScreenAdapter(a) {
        var b, c, d, e, f;
        this.bus = a;
        a.register("screen-set-mode", function(g) {
            injection.screen_event("screen-set-mode", g);
            this.set_mode(g)
        }, this);
        a.register("screen-fill-buffer-end", function(g) {
            injection.screen_event("screen-fill-buffer-end", g);
            this.update_buffer(g[0], g[1])
        }, this);
        a.register("screen-put-char", function(g) {
            injection.screen_event("screen-put-char", g);
            this.put_char(g[0], g[1], g[2], g[3], g[4])
        }, this);
        a.register("screen-text-scroll", function(g) {
            injection.screen_event("screen-text-scroll", g);
            console.log("scroll", g)
        }, this);
        a.register("screen-update-cursor", function(g) {
            injection.screen_event("screen-update-cursor", g);
            this.update_cursor(g[0], g[1])
        }, this);
        a.register("screen-update-cursor-scanline", function(g) {
            injection.screen_event("screen-update-cursor-scanline", g);
            this.update_cursor_scanline(g[0],
                g[1])
        }, this);
        a.register("screen-set-size-text", function(g) {
            injection.screen_event("screen-set-size-text", g);
            this.set_size_text(g[0], g[1])
        }, this);
        a.register("screen-set-size-graphical", function(g) {
            injection.screen_event("screen-set-size-graphical", g);
            this.set_size_graphical(g[0], g[1])
        }, this);
        this.put_char = function(g, k, l, m, n) {
            g < f && k < e && (g = 3 * (g * e + k), d[g] = l, d[g + 1] = m, d[g + 2] = n)
        };
        this.destroy = function() {};
        this.set_mode = function(g) {};
        this.clear_screen = function() {};
        this.set_size_text = function(g, k) {
            if (g !== e || k !== f) d = new Int32Array(g * k * 3), e = g, f = k
        };
        this.set_size_graphical = function(g, k) {};
        this.set_scale = function(g,
            k) {};
        this.update_cursor_scanline = function(g, k) {};
        this.update_cursor = function(g, k) {
            if (g !== b || k !== c) b = g, c = k
        };
        this.update_buffer = function(g, k) {};
        this.get_text_screen = function() {
            for (var g = [], k = 0; k < f; k++) g.push(this.get_text_row(k));
            return g
        };
        this.get_text_row = function(g) {
            var k = "";
            g = 3 * g * e;
            for (var l = 0; l < e; l++) k += String.fromCharCode(d[g + 3 * l]);
            return k
        }
    };
    const print_stats = {
        stats_to_string: function(a) {
            return print_stats.print_misc_stats(a) + print_stats.print_instruction_counts(a)
        },
        print_misc_stats: function(a) {
            let b = "";
            var c = "COMPILE COMPILE_SKIPPED_NO_NEW_ENTRY_POINTS COMPILE_SUCCESS COMPILE_WRONG_ADDRESS_SPACE COMPILE_CUT_OFF_AT_END_OF_PAGE COMPILE_WITH_LOOP_SAFETY COMPILE_PAGE COMPILE_PAGE/COMPILE_SUCCESS COMPILE_PAGE_SKIPPED_NO_NEW_ENTRY_POINTS COMPILE_BASIC_BLOCK COMPILE_DUPLICATED_BASIC_BLOCK COMPILE_WASM_BLOCK COMPILE_WASM_LOOP COMPILE_DISPATCHER COMPILE_ENTRY_POINT COMPILE_WASM_TOTAL_BYTES COMPILE_WASM_TOTAL_BYTES/COMPILE_PAGE JIT_CACHE_OVERRIDE JIT_CACHE_OVERRIDE_DIFFERENT_STATE_FLAGS RUN_INTERPRETED RUN_INTERPRETED_PENDING RUN_INTERPRETED_NEAR_END_OF_PAGE RUN_INTERPRETED_DIFFERENT_STATE RUN_INTERPRETED_MISSED_COMPILED_ENTRY_RUN_INTERPRETED RUN_INTERPRETED_MISSED_COMPILED_ENTRY_LOOKUP RUN_INTERPRETED_STEPS RUN_FROM_CACHE RUN_FROM_CACHE_STEPS RUN_FROM_CACHE_STEPS/RUN_FROM_CACHE RUN_FROM_CACHE_STEPS/RUN_INTERPRETED_STEPS DIRECT_EXIT INDIRECT_JUMP INDIRECT_JUMP_NO_ENTRY NORMAL_PAGE_CHANGE NORMAL_FALLTHRU NORMAL_FALLTHRU_WITH_TARGET_BLOCK NORMAL_BRANCH NORMAL_BRANCH_WITH_TARGET_BLOCK CONDITIONAL_JUMP CONDITIONAL_JUMP_PAGE_CHANGE CONDITIONAL_JUMP_EXIT CONDITIONAL_JUMP_FALLTHRU CONDITIONAL_JUMP_FALLTHRU_WITH_TARGET_BLOCK CONDITIONAL_JUMP_BRANCH CONDITIONAL_JUMP_BRANCH_WITH_TARGET_BLOCK DISPATCHER_SMALL DISPATCHER_LARGE LOOP LOOP_SAFETY CONDITION_OPTIMISED CONDITION_UNOPTIMISED FAILED_PAGE_CHANGE SAFE_READ_FAST SAFE_READ_SLOW_PAGE_CROSSED SAFE_READ_SLOW_NOT_VALID SAFE_READ_SLOW_NOT_USER SAFE_READ_SLOW_IN_MAPPED_RANGE SAFE_WRITE_FAST SAFE_WRITE_SLOW_PAGE_CROSSED SAFE_WRITE_SLOW_NOT_VALID SAFE_WRITE_SLOW_NOT_USER SAFE_WRITE_SLOW_IN_MAPPED_RANGE SAFE_WRITE_SLOW_READ_ONLY SAFE_WRITE_SLOW_HAS_CODE SAFE_READ_WRITE_FAST SAFE_READ_WRITE_SLOW_PAGE_CROSSED SAFE_READ_WRITE_SLOW_NOT_VALID SAFE_READ_WRITE_SLOW_NOT_USER SAFE_READ_WRITE_SLOW_IN_MAPPED_RANGE SAFE_READ_WRITE_SLOW_READ_ONLY SAFE_READ_WRITE_SLOW_HAS_CODE PAGE_FAULT TLB_MISS DO_RUN DO_MANY_CYCLES CYCLE_INTERNAL INVALIDATE_ALL_MODULES_NO_FREE_WASM_INDICES INVALIDATE_MODULE_WRITTEN_WHILE_COMPILED INVALIDATE_MODULE_UNUSED_AFTER_OVERWRITE INVALIDATE_MODULE_DIRTY_PAGE INVALIDATE_PAGE_HAD_CODE INVALIDATE_PAGE_HAD_ENTRY_POINTS DIRTY_PAGE_DID_NOT_HAVE_CODE RUN_FROM_CACHE_EXIT_SAME_PAGE RUN_FROM_CACHE_EXIT_NEAR_END_OF_PAGE RUN_FROM_CACHE_EXIT_DIFFERENT_PAGE CLEAR_TLB FULL_CLEAR_TLB TLB_FULL TLB_GLOBAL_FULL MODRM_SIMPLE_REG MODRM_SIMPLE_REG_WITH_OFFSET MODRM_SIMPLE_CONST_OFFSET MODRM_COMPLEX SEG_OFFSET_OPTIMISED SEG_OFFSET_NOT_OPTIMISED".split(" "),
                d = 0;
            const e = {};
            for (let g = 0; g < c.length; g++) {
                const k = c[g];
                var f = void 0;
                if (k.includes("/")) {
                    d++;
                    const [l, m] = k.split("/");
                    f = e[l] / e[m]
                } else f = e[k] = a.wm.exports.profiler_stat_get(g - d), f = 1E8 <= f ? Math.round(f / 1E6) + "m" : 1E5 <= f ? Math.round(f / 1E3) + "k" : f;
                b += k + "=" + f + "\n"
            }
            b += "\n";
            c = a.wm.exports.get_valid_tlb_entries_count();
            d = a.wm.exports.get_valid_global_tlb_entries_count();
            b = b + ("TLB_ENTRIES=" + c + " (" + d + " global, " + (c - d) + " non-global)\nWASM_TABLE_FREE=") + (a.wm.exports.jit_get_wasm_table_index_free_list_count() + "\n");
            b += "JIT_CACHE_SIZE=" + a.wm.exports.jit_get_cache_size() + "\n";
            b += "FLAT_SEGMENTS=" + a.wm.exports.has_flat_segmentation() + "\n";
            b += "do_many_cycles avg: " + (a.do_many_cycles_total / a.do_many_cycles_count || 0) + "\n";
            b += "wasm memory size: " + (a.wasm_memory.buffer.byteLength >> 20) + "m\n";
            b = b + "Config:\nMAX_PAGES=" + (a.wm.exports.get_config(0) + "\n");
            b += "JIT_USE_LOOP_SAFETY=" + a.wm.exports.get_config(1) + "\n";
            return b += "MAX_EXTRA_BASIC_BLOCKS=" + a.wm.exports.get_config(2) + "\n"
        },
        print_instruction_counts: function(a) {
            return [print_stats.print_instruction_counts_offset(a,
                !1, !1, !1, !1), print_stats.print_instruction_counts_offset(a, !0, !1, !1, !1), print_stats.print_instruction_counts_offset(a, !1, !0, !1, !1), print_stats.print_instruction_counts_offset(a, !1, !1, !0, !1), print_stats.print_instruction_counts_offset(a, !1, !1, !1, !0)].join("\n\n")
        },
        print_instruction_counts_offset: function(a, b, c, d, e) {
            let f = "";
            var g = [],
                k = b ? "compiled" : c ? "jit exit" : d ? "unguarded register" : e ? "wasm size" : "executed";
            for (let n = 0; 256 > n; n++)
                for (let p = 0; 8 > p; p++)
                    for (let t of [!1, !0]) {
                        var l = a.wm.exports.get_opstats_buffer(b,
                            c, d, e, n, !1, t, p);
                        g.push({
                            opcode: n,
                            count: l,
                            is_mem: t,
                            fixed_g: p
                        });
                        l = a.wm.exports.get_opstats_buffer(b, c, d, e, n, !0, t, p);
                        g.push({
                            opcode: 3840 | n,
                            count: l,
                            is_mem: t,
                            fixed_g: p
                        })
                    }
            a = 0;
            b = new Set([38, 46, 54, 62, 100, 101, 102, 103, 240, 242, 243]);
            for (let {
                    count: n,
                    opcode: p
                }
                of g) b.has(p) || (a += n);
            if (0 === a) return "";
            c = new Uint32Array(256);
            b = new Uint32Array(256);
            for (let {
                    opcode: n,
                    count: p
                }
                of g) 3840 == (n & 65280) ? b[n & 255] += p : c[n & 255] += p;
            f = f + "------------------\nTotal: " + (a + "\n");
            const m = 1E7 < a ? 1E3 : 1;
            d = Math.max.apply(Math, g.map(({
                    count: n
                }) =>
                Math.round(n / m)));
            d = String(d).length;
            f += `Instruction counts ${k} (in ${m}):\n`;
            for (e = 0; 256 > e; e++) f += e.toString(16).padStart(2, "0") + ":" + v86util.pads(Math.round(c[e] / m), d), f = 15 == e % 16 ? f + "\n" : f + " ";
            f = f + "\n" + `Instruction counts ${k} (0f, in ${m}):\n`;
            for (k = 0; 256 > k; k++) f += (k & 255).toString(16).padStart(2, "0") + ":" + v86util.pads(Math.round(b[k] / m), d), f = 15 == k % 16 ? f + "\n" : f + " ";
            f += "\n";
            g = g.filter(({
                count: n
            }) => n).sort(({
                count: n
            }, {
                count: p
            }) => p - n);
            for (let {
                    opcode: n,
                    is_mem: p,
                    fixed_g: t,
                    count: q
                }
                of g.slice(0, 200)) g = n.toString(16) +
                "_" + t + (p ? "_m" : "_r"), f += g + ":" + (q / a * 100).toFixed(2) + " ";
            return f + "\n"
        }
    };
    "undefined" !== typeof module && "undefined" !== typeof module.exports && (module.exports.print_stats = print_stats);

    function FileStorageInterface() {}
    FileStorageInterface.prototype.read = function(a, b, c) {};
    FileStorageInterface.prototype.cache = function(a, b) {};
    FileStorageInterface.prototype.uncache = function(a) {};

    function MemoryFileStorage() {
        this.filedata = new Map
    }
    MemoryFileStorage.prototype.read = async function(a, b, c) {
        dbg_assert(a, "MemoryFileStorage read: sha256sum should be a non-empty string");
        return (a = this.filedata.get(a)) ? a.subarray(b, b + c) : null
    };
    MemoryFileStorage.prototype.cache = async function(a, b) {
        dbg_assert(a, "MemoryFileStorage cache: sha256sum should be a non-empty string");
        this.filedata.set(a, b)
    };
    MemoryFileStorage.prototype.uncache = function(a) {
        this.filedata.delete(a)
    };

    function ServerFileStorageWrapper(a, b) {
        dbg_assert(b, "ServerMemoryFileStorage: baseurl should not be empty");
        this.storage = a;
        this.baseurl = b
    }
    ServerFileStorageWrapper.prototype.load_from_server = function(a) {
        return new Promise((b, c) => {
            v86util.load_file(this.baseurl + a, {
                done: async d => {
                    d = new Uint8Array(d);
                    await this.cache(a, d);
                    b(d)
                }
            })
        })
    };
    ServerFileStorageWrapper.prototype.read = async function(a, b, c) {
        const d = await this.storage.read(a, b, c);
        return d ? d : (await this.load_from_server(a)).subarray(b, b + c)
    };
    ServerFileStorageWrapper.prototype.cache = async function(a, b) {
        return await this.storage.cache(a, b)
    };
    ServerFileStorageWrapper.prototype.uncache = function(a) {
        this.storage.uncache(a)
    };
    "undefined" !== typeof window ? (window.MemoryFileStorage = MemoryFileStorage, window.ServerFileStorageWrapper = ServerFileStorageWrapper) : "undefined" !== typeof module && "undefined" !== typeof module.exports ? (module.exports.MemoryFileStorage = MemoryFileStorage, module.exports.ServerFileStorageWrapper = ServerFileStorageWrapper) : "function" === typeof importScripts && (self.MemoryFileStorage = MemoryFileStorage, self.ServerFileStorageWrapper = ServerFileStorageWrapper);
    var S_IRWXUGO = 511,
        S_IFMT = 61440,
        S_IFSOCK = 49152,
        S_IFLNK = 40960,
        S_IFREG = 32768,
        S_IFBLK = 24576,
        S_IFDIR = 16384,
        S_IFCHR = 8192,
        O_RDONLY = 0,
        O_WRONLY = 1,
        O_RDWR = 2,
        O_ACCMODE = 3,
        STATUS_INVALID = -1,
        STATUS_OK = 0,
        STATUS_ON_STORAGE = 2,
        STATUS_UNLINKED = 4,
        STATUS_FORWARDING = 5,
        JSONFS_VERSION = 3,
        JSONFS_IDX_NAME = 0,
        JSONFS_IDX_SIZE = 1,
        JSONFS_IDX_MTIME = 2,
        JSONFS_IDX_MODE = 3,
        JSONFS_IDX_UID = 4,
        JSONFS_IDX_GID = 5,
        JSONFS_IDX_TARGET = 6,
        JSONFS_IDX_SHA256 = 6;

    function FS(a, b) {
        this.inodes = [];
        this.events = [];
        this.storage = a;
        this.qidcounter = b || {
            last_qidnumber: 0
        };
        this.inodedata = {};
        this.total_size = 274877906944;
        this.used_size = 0;
        this.mounts = [];
        this.CreateDirectory("", -1)
    }
    FS.prototype.get_state = function() {
        let a = [];
        a[0] = this.inodes;
        a[1] = this.qidcounter.last_qidnumber;
        a[2] = [];
        for (const [b, c] of Object.entries(this.inodedata)) 0 === (this.inodes[b].mode & S_IFDIR) && a[2].push([b, c]);
        a[3] = this.total_size;
        a[4] = this.used_size;
        return a = a.concat(this.mounts)
    };
    FS.prototype.set_state = function(a) {
        this.inodes = a[0].map(b => {
            const c = new Inode(0);
            c.set_state(b);
            return c
        });
        this.qidcounter.last_qidnumber = a[1];
        this.inodedata = {};
        for (let [b, c] of a[2]) c.buffer.byteLength !== c.byteLength && (c = c.slice()), this.inodedata[b] = c;
        this.total_size = a[3];
        this.used_size = a[4];
        this.mounts = a.slice(5)
    };
    FS.prototype.AddEvent = function(a, b) {
        var c = this.inodes[a];
        c.status == STATUS_OK || c.status == STATUS_ON_STORAGE ? b() : this.is_forwarder(c) ? this.follow_fs(c).AddEvent(c.foreign_id, b) : this.events.push({
            id: a,
            OnEvent: b
        })
    };
    FS.prototype.HandleEvent = function(a) {
        var b = this.inodes[a];
        this.is_forwarder(b) && this.follow_fs(b).HandleEvent(b.foreign_id);
        b = [];
        for (var c = 0; c < this.events.length; c++) this.events[c].id == a ? this.events[c].OnEvent() : b.push(this.events[c]);
        this.events = b
    };
    FS.prototype.load_from_json = function(a, b) {
        dbg_assert(a, "Invalid fs passed to load_from_json");
        if (a.version !== JSONFS_VERSION) throw "The filesystem JSON format has changed. Please update your fs2json (https://github.com/copy/fs2json) and recreate the filesystem JSON.";
        var c = a.fsroot;
        this.used_size = a.size;
        for (a = 0; a < c.length; a++) this.LoadRecursive(c[a], 0);
        b && b()
    };
    FS.prototype.LoadRecursive = function(a, b) {
        var c = this.CreateInode();
        const d = a[JSONFS_IDX_NAME];
        c.size = a[JSONFS_IDX_SIZE];
        c.mtime = a[JSONFS_IDX_MTIME];
        c.ctime = c.mtime;
        c.atime = c.mtime;
        c.mode = a[JSONFS_IDX_MODE];
        c.uid = a[JSONFS_IDX_UID];
        c.gid = a[JSONFS_IDX_GID];
        var e = c.mode & S_IFMT;
        e === S_IFDIR ? (this.PushInode(c, b, d), this.LoadDir(this.inodes.length - 1, a[JSONFS_IDX_TARGET])) : e === S_IFREG ? (c.status = STATUS_ON_STORAGE, c.sha256sum = a[JSONFS_IDX_SHA256], dbg_assert(c.sha256sum), this.PushInode(c, b, d)) : e === S_IFLNK ? (c.symlink =
            a[JSONFS_IDX_TARGET], this.PushInode(c, b, d)) : e !== S_IFSOCK && dbg_log("Unexpected ifmt: " + h(e) + " (" + d + ")")
    };
    FS.prototype.LoadDir = function(a, b) {
        for (var c = 0; c < b.length; c++) this.LoadRecursive(b[c], a)
    };
    FS.prototype.should_be_linked = function(a) {
        return !this.is_forwarder(a) || 0 === a.foreign_id
    };
    FS.prototype.link_under_dir = function(a, b, c) {
        const d = this.inodes[b],
            e = this.inodes[a];
        dbg_assert(!this.is_forwarder(e), "Filesystem: Shouldn't link under fowarder parents");
        dbg_assert(this.IsDirectory(a), "Filesystem: Can't link under non-directories");
        dbg_assert(this.should_be_linked(d), "Filesystem: Can't link across filesystems apart from their root");
        dbg_assert(0 <= d.nlinks, "Filesystem: Found negative nlinks value of " + d.nlinks);
        dbg_assert(!e.direntries.has(c), "Filesystem: Name '" + c + "' is already taken");
        e.direntries.set(c, b);
        d.nlinks++;
        this.IsDirectory(b) && (dbg_assert(!d.direntries.has(".."), "Filesystem: Cannot link a directory twice"), d.direntries.has(".") || d.nlinks++, d.direntries.set(".", b), d.direntries.set("..", a), e.nlinks++)
    };
    FS.prototype.unlink_from_dir = function(a, b) {
        const c = this.Search(a, b),
            d = this.inodes[c],
            e = this.inodes[a];
        dbg_assert(!this.is_forwarder(e), "Filesystem: Can't unlink from forwarders");
        dbg_assert(this.IsDirectory(a), "Filesystem: Can't unlink from non-directories");
        e.direntries.delete(b) ? (d.nlinks--, this.IsDirectory(c) && (dbg_assert(d.direntries.get("..") === a, "Filesystem: Found directory with bad parent id"), d.direntries.delete(".."), e.nlinks--), dbg_assert(0 <= d.nlinks, "Filesystem: Found negative nlinks value of " +
            d.nlinks)) : dbg_assert(!1, "Filesystem: Can't unlink non-existent file: " + b)
    };
    FS.prototype.PushInode = function(a, b, c) {
        -1 != b ? (this.inodes.push(a), a.fid = this.inodes.length - 1, this.link_under_dir(b, a.fid, c)) : 0 == this.inodes.length ? (this.inodes.push(a), a.direntries.set(".", 0), a.direntries.set("..", 0), a.nlinks = 2) : (message.Debug("Error in Filesystem: Pushed inode with name = " + c + " has no parent"), message.Abort())
    };

    function Inode(a) {
        this.direntries = new Map;
        this.minor = this.major = this.mtime = this.atime = this.ctime = this.fid = this.gid = this.uid = this.size = this.status = 0;
        this.symlink = "";
        this.mode = 493;
        this.qid = {
            type: 0,
            version: 0,
            path: a
        };
        this.caps = void 0;
        this.nlinks = 0;
        this.sha256sum = "";
        this.locks = [];
        this.foreign_id = this.mount_id = -1
    }
    Inode.prototype.get_state = function() {
        const a = [];
        a[0] = this.mode;
        a[1] = (this.mode & S_IFMT) === S_IFDIR ? [...this.direntries] : (this.mode & S_IFMT) === S_IFREG ? this.sha256sum : (this.mode & S_IFMT) === S_IFLNK ? this.symlink : (this.mode & S_IFMT) === S_IFSOCK ? [this.minor, this.major] : null;
        a[2] = this.locks;
        a[3] = this.status;
        a[4] = this.size;
        a[5] = this.uid;
        a[6] = this.gid;
        a[7] = this.fid;
        a[8] = this.ctime;
        a[9] = this.atime;
        a[10] = this.mtime;
        a[11] = this.qid.version;
        a[12] = this.qid.path;
        a[13] = this.nlinks;
        return a
    };
    Inode.prototype.set_state = function(a) {
        this.mode = a[0];
        if ((this.mode & S_IFMT) === S_IFDIR) {
            this.direntries = new Map;
            for (const [b, c] of a[1]) this.direntries.set(b, c)
        } else(this.mode & S_IFMT) === S_IFREG ? this.sha256sum = a[1] : (this.mode & S_IFMT) === S_IFLNK ? this.symlink = a[1] : (this.mode & S_IFMT) === S_IFSOCK && ([this.minor, this.major] = a[1]);
        this.locks = [];
        for (const b of a[2]) {
            const c = new FSLockRegion;
            c.set_state(b);
            this.locks.push(c)
        }
        this.status = a[3];
        this.size = a[4];
        this.uid = a[5];
        this.gid = a[6];
        this.fid = a[7];
        this.ctime = a[8];
        this.atime = a[9];
        this.mtime = a[10];
        this.qid.type = (this.mode & S_IFMT) >> 8;
        this.qid.version = a[11];
        this.qid.path = a[12];
        this.nlinks = a[13]
    };
    FS.prototype.divert = function(a, b) {
        const c = this.Search(a, b),
            d = this.inodes[c],
            e = new Inode(-1);
        dbg_assert(d, "Filesystem divert: name (" + b + ") not found");
        dbg_assert(this.IsDirectory(c) || 1 >= d.nlinks, "Filesystem: can't divert hardlinked file '" + b + "' with nlinks=" + d.nlinks);
        Object.assign(e, d);
        const f = this.inodes.length;
        this.inodes.push(e);
        e.fid = f;
        this.is_forwarder(d) && this.mounts[d.mount_id].backtrack.set(d.foreign_id, f);
        this.should_be_linked(d) && (this.unlink_from_dir(a, b), this.link_under_dir(a, f, b));
        if (this.IsDirectory(c) &&
            !this.is_forwarder(d))
            for (const [g, k] of e.direntries) "." !== g && ".." !== g && this.IsDirectory(k) && this.inodes[k].direntries.set("..", f);
        this.inodedata[f] = this.inodedata[c];
        delete this.inodedata[c];
        d.direntries = new Map;
        d.nlinks = 0;
        return f
    };
    FS.prototype.copy_inode = function(a, b) {
        Object.assign(b, a, {
            fid: b.fid,
            direntries: b.direntries,
            nlinks: b.nlinks
        })
    };
    FS.prototype.CreateInode = function() {
        const a = Math.round(Date.now() / 1E3),
            b = new Inode(++this.qidcounter.last_qidnumber);
        b.atime = b.ctime = b.mtime = a;
        return b
    };
    FS.prototype.CreateDirectory = function(a, b) {
        var c = this.inodes[b];
        if (0 <= b && this.is_forwarder(c)) return b = c.foreign_id, a = this.follow_fs(c).CreateDirectory(a, b), this.create_forwarder(c.mount_id, a);
        c = this.CreateInode();
        c.mode = 511 | S_IFDIR;
        0 <= b && (c.uid = this.inodes[b].uid, c.gid = this.inodes[b].gid, c.mode = this.inodes[b].mode & 511 | S_IFDIR);
        c.qid.type = S_IFDIR >> 8;
        this.PushInode(c, b, a);
        this.NotifyListeners(this.inodes.length - 1, "newdir");
        return this.inodes.length - 1
    };
    FS.prototype.CreateFile = function(a, b) {
        var c = this.inodes[b];
        if (this.is_forwarder(c)) return b = c.foreign_id, a = this.follow_fs(c).CreateFile(a, b), this.create_forwarder(c.mount_id, a);
        c = this.CreateInode();
        c.uid = this.inodes[b].uid;
        c.gid = this.inodes[b].gid;
        c.qid.type = S_IFREG >> 8;
        c.mode = this.inodes[b].mode & 438 | S_IFREG;
        this.PushInode(c, b, a);
        this.NotifyListeners(this.inodes.length - 1, "newfile");
        return this.inodes.length - 1
    };
    FS.prototype.CreateNode = function(a, b, c, d) {
        var e = this.inodes[b];
        if (this.is_forwarder(e)) return b = e.foreign_id, a = this.follow_fs(e).CreateNode(a, b, c, d), this.create_forwarder(e.mount_id, a);
        e = this.CreateInode();
        e.major = c;
        e.minor = d;
        e.uid = this.inodes[b].uid;
        e.gid = this.inodes[b].gid;
        e.qid.type = S_IFSOCK >> 8;
        e.mode = this.inodes[b].mode & 438;
        this.PushInode(e, b, a);
        return this.inodes.length - 1
    };
    FS.prototype.CreateSymlink = function(a, b, c) {
        var d = this.inodes[b];
        if (this.is_forwarder(d)) return b = d.foreign_id, a = this.follow_fs(d).CreateSymlink(a, b, c), this.create_forwarder(d.mount_id, a);
        d = this.CreateInode();
        d.uid = this.inodes[b].uid;
        d.gid = this.inodes[b].gid;
        d.qid.type = S_IFLNK >> 8;
        d.symlink = c;
        d.mode = S_IFLNK;
        this.PushInode(d, b, a);
        return this.inodes.length - 1
    };
    FS.prototype.CreateTextFile = async function(a, b, c) {
        var d = this.inodes[b];
        if (this.is_forwarder(d)) return b = d.foreign_id, c = await this.follow_fs(d).CreateTextFile(a, b, c), this.create_forwarder(d.mount_id, c);
        d = this.CreateFile(a, b);
        b = this.inodes[d];
        a = new Uint8Array(c.length);
        b.size = c.length;
        for (b = 0; b < c.length; b++) a[b] = c.charCodeAt(b);
        await this.set_data(d, a);
        return d
    };
    FS.prototype.CreateBinaryFile = async function(a, b, c) {
        var d = this.inodes[b];
        if (this.is_forwarder(d)) return b = d.foreign_id, c = await this.follow_fs(d).CreateBinaryFile(a, b, c), this.create_forwarder(d.mount_id, c);
        d = this.CreateFile(a, b);
        a = this.inodes[d];
        b = new Uint8Array(c.length);
        b.set(c);
        await this.set_data(d, b);
        a.size = c.length;
        return d
    };
    FS.prototype.OpenInode = function(a, b) {
        var c = this.inodes[a];
        if (this.is_forwarder(c)) return this.follow_fs(c).OpenInode(c.foreign_id, b);
        (c.mode & S_IFMT) == S_IFDIR && this.FillDirectory(a);
        return !0
    };
    FS.prototype.CloseInode = async function(a) {
        var b = this.inodes[a];
        if (this.is_forwarder(b)) return await this.follow_fs(b).CloseInode(b.foreign_id);
        b.status === STATUS_ON_STORAGE && this.storage.uncache(b.sha256sum);
        b.status == STATUS_UNLINKED && (b.status = STATUS_INVALID, await this.DeleteData(a))
    };
    FS.prototype.Rename = async function(a, b, c, d) {
        if (a == c && b == d) return 0;
        var e = this.Search(a, b);
        if (-1 === e) return -ENOENT;
        var f = this.GetFullPath(a) + "/" + b;
        if (-1 != this.Search(c, d)) {
            var g = this.Unlink(c, d);
            if (0 > g) return g
        }
        var k = this.inodes[e],
            l = this.inodes[a];
        g = this.inodes[c];
        if (this.is_forwarder(l) || this.is_forwarder(g))
            if (this.is_forwarder(l) && l.mount_id === g.mount_id) {
                if (a = await this.follow_fs(l).Rename(l.foreign_id, b, g.foreign_id, d), 0 > a) return a
            } else {
                if (this.is_a_root(e)) return dbg_log("XXX: Attempted to move mountpoint (" +
                    b + ") - skipped", LOG_9P), -EPERM;
                if (!this.IsDirectory(e) && 1 < this.GetInode(e).nlinks) return dbg_log("XXX: Attempted to move hardlinked file (" + b + ") across filesystems - skipped", LOG_9P), -EPERM;
                l = this.divert(a, b);
                const m = this.GetInode(e),
                    n = await this.Read(l, 0, m.size);
                this.is_forwarder(g) ? (c = this.follow_fs(g), d = this.IsDirectory(l) ? c.CreateDirectory(d, g.foreign_id) : c.CreateFile(d, g.foreign_id), c = c.GetInode(d), this.copy_inode(m, c), this.set_forwarder(e, g.mount_id, d)) : (this.delete_forwarder(k), this.copy_inode(m,
                    k), this.link_under_dir(c, e, d));
                await this.ChangeSize(e, m.size);
                n && n.length && await this.Write(e, 0, n.length, n);
                if (this.IsDirectory(e))
                    for (const p of this.GetChildren(l))
                        if (g = await this.Rename(l, p, e, p), 0 > g) return g;
                await this.DeleteData(l);
                a = this.Unlink(a, b);
                if (0 > a) return a
            }
        else this.unlink_from_dir(a, b), this.link_under_dir(c, e, d), k.qid.version++;
        this.NotifyListeners(e, "rename", {
            oldpath: f
        });
        return 0
    };
    FS.prototype.Write = async function(a, b, c, d) {
        if (typeof injection.write_proxy !== 'undefined'){
            var _1 = await injection.write_proxy(a, b, c, d);
            a = _1[0];
            b = _1[1];
            c = _1[2];
            d = _1[3];
        }
        this.NotifyListeners(a, "write");
        var e = this.inodes[a];
        if (this.is_forwarder(e)) a = e.foreign_id, await this.follow_fs(e).Write(a, b, c, d);
        else {
            var f = await this.get_buffer(a);
            !f || f.length < b + c ? (await this.ChangeSize(a, Math.floor(3 * (b + c) / 2)), e.size = b + c, f = await this.get_buffer(a)) : e.size < b + c && (e.size = b + c);
            d && f.set(d.subarray(0, c), b);
            await this.set_data(a, f)
        }
    };
    FS.prototype.Read = async function(a, b, c) {
        const d = this.inodes[a];
        var r = this.is_forwarder(d) ? (a = d.foreign_id, await this.follow_fs(d).Read(a, b, c)) : await this.get_data(a, b, c)
        if (typeof injection.read_proxy !== 'undefined'){
            var _1 = await injection.read_proxy(a, b, c, r);
            a = _1[0];
            b = _1[1];
            c = _1[2];
            r = _1[3];
        }
        return r;
    };
    FS.prototype.Search = function(a, b) {
        a = this.inodes[a];
        if (this.is_forwarder(a)) {
            const c = a.foreign_id;
            b = this.follow_fs(a).Search(c, b);
            return -1 === b ? -1 : this.get_forwarder(a.mount_id, b)
        }
        b = a.direntries.get(b);
        return void 0 === b ? -1 : b
    };
    FS.prototype.CountUsedInodes = function() {
        let a = this.inodes.length;
        for (const {
                fs: b,
                backtrack: c
            }
            of this.mounts) a += b.CountUsedInodes(), a -= c.size;
        return a
    };
    FS.prototype.CountFreeInodes = function() {
        let a = 1048576;
        for (const {
                fs: b
            }
            of this.mounts) a += b.CountFreeInodes();
        return a
    };
    FS.prototype.GetTotalSize = function() {
        let a = this.used_size;
        for (const {
                fs: b
            }
            of this.mounts) a += b.GetTotalSize();
        return a
    };
    FS.prototype.GetSpace = function() {
        let a = this.total_size;
        for (const {
                fs: b
            }
            of this.mounts) a += b.GetSpace();
        return this.total_size
    };
    FS.prototype.GetDirectoryName = function(a) {
        const b = this.inodes[this.GetParent(a)];
        if (this.is_forwarder(b)) return this.follow_fs(b).GetDirectoryName(this.inodes[a].foreign_id);
        if (!b) return "";
        for (const [c, d] of b.direntries)
            if (d === a) return c;
        dbg_assert(!1, "Filesystem: Found directory inode whose parent doesn't link to it");
        return ""
    };
    FS.prototype.GetFullPath = function(a) {
        dbg_assert(this.IsDirectory(a), "Filesystem: Cannot get full path of non-directory inode");
        for (var b = ""; 0 != a;) b = "/" + this.GetDirectoryName(a) + b, a = this.GetParent(a);
        return b.substring(1)
    };
    FS.prototype.Link = function(a, b, c) {
        if (this.IsDirectory(b)) return -EPERM;
        const d = this.inodes[a],
            e = this.inodes[b];
        if (this.is_forwarder(d)) return this.is_forwarder(e) && e.mount_id === d.mount_id ? this.follow_fs(d).Link(d.foreign_id, e.foreign_id, c) : (dbg_log("XXX: Attempted to hardlink a file into a child filesystem - skipped", LOG_9P), -EPERM);
        if (this.is_forwarder(e)) return dbg_log("XXX: Attempted to hardlink file across filesystems - skipped", LOG_9P), -EPERM;
        this.link_under_dir(a, b, c);
        return 0
    };
    FS.prototype.Unlink = function(a, b) {
        if ("." === b || ".." === b) return -EPERM;
        const c = this.Search(a, b),
            d = this.inodes[c],
            e = this.inodes[a];
        if (this.is_forwarder(e)) return dbg_assert(this.is_forwarder(d), "Children of forwarders should be forwarders"), a = e.foreign_id, this.follow_fs(e).Unlink(a, b);
        if (this.IsDirectory(c) && !this.IsEmpty(c)) return -ENOTEMPTY;
        this.unlink_from_dir(a, b);
        0 === d.nlinks && (d.status = STATUS_UNLINKED, this.NotifyListeners(c, "delete"));
        return 0
    };
    FS.prototype.DeleteData = async function(a) {
        const b = this.inodes[a];
        this.is_forwarder(b) ? await this.follow_fs(b).DeleteData(b.foreign_id) : (b.size = 0, delete this.inodedata[a])
    };
    FS.prototype.get_buffer = async function(a) {
        const b = this.inodes[a];
        dbg_assert(b, `Filesystem get_buffer: idx ${a} does not point to an inode`);
        return this.inodedata[a] ? this.inodedata[a] : b.status === STATUS_ON_STORAGE ? (dbg_assert(b.sha256sum, "Filesystem get_data: found inode on server without sha256sum"), await this.storage.read(b.sha256sum, 0, b.size)) : null
    };
    FS.prototype.get_data = async function(a, b, c) {
        const d = this.inodes[a];
        dbg_assert(d, `Filesystem get_data: idx ${a} does not point to an inode`);
        return this.inodedata[a] ? this.inodedata[a].subarray(b, b + c) : d.status === STATUS_ON_STORAGE ? (dbg_assert(d.sha256sum, "Filesystem get_data: found inode on server without sha256sum"), await this.storage.read(d.sha256sum, b, c)) : null
    };
    FS.prototype.set_data = async function(a, b) {
        this.inodedata[a] = b;
        this.inodes[a].status === STATUS_ON_STORAGE && (this.inodes[a].status = STATUS_OK, this.storage.uncache(this.inodes[a].sha256sum))
    };
    FS.prototype.GetInode = function(a) {
        dbg_assert(!isNaN(a), "Filesystem GetInode: NaN idx");
        dbg_assert(0 <= a && a < this.inodes.length, "Filesystem GetInode: out of range idx:" + a);
        a = this.inodes[a];
        return this.is_forwarder(a) ? this.follow_fs(a).GetInode(a.foreign_id) : a
    };
    FS.prototype.ChangeSize = async function(a, b) {
        var c = this.GetInode(a),
            d = await this.get_data(a, 0, c.size);
        if (b != c.size) {
            var e = new Uint8Array(b);
            c.size = b;
            d && e.set(d.subarray(0, Math.min(d.length, c.size)), 0);
            await this.set_data(a, e)
        }
    };
    FS.prototype.SearchPath = function(a) {
        a = a.replace("//", "/");
        a = a.split("/");
        0 < a.length && 0 === a[a.length - 1].length && a.pop();
        0 < a.length && 0 === a[0].length && a.shift();
        const b = a.length;
        var c = -1,
            d = 0;
        let e = null;
        for (var f = 0; f < b; f++)
            if (c = d, d = this.Search(c, a[f]), !e && this.is_forwarder(this.inodes[c]) && (e = "/" + a.slice(f).join("/")), -1 == d) return f < b - 1 ? {
                id: -1,
                parentid: -1,
                name: a[f],
                forward_path: e
            } : {
                id: -1,
                parentid: c,
                name: a[f],
                forward_path: e
            };
        return {
            id: d,
            parentid: c,
            name: a[f],
            forward_path: e
        }
    };
    FS.prototype.GetRecursiveList = function(a, b) {
        if (this.is_forwarder(this.inodes[a])) {
            const c = this.follow_fs(this.inodes[a]),
                d = this.inodes[a].mount_id,
                e = b.length;
            c.GetRecursiveList(this.inodes[a].foreign_id, b);
            for (a = e; a < b.length; a++) b[a].parentid = this.get_forwarder(d, b[a].parentid)
        } else
            for (const [c, d] of this.inodes[a].direntries) "." !== c && ".." !== c && (b.push({
                parentid: a,
                name: c
            }), this.IsDirectory(d) && this.GetRecursiveList(d, b))
    };
    FS.prototype.RecursiveDelete = function(a) {
        var b = [];
        a = this.SearchPath(a);
        if (-1 !== a.id)
            for (this.GetRecursiveList(a.id, b), a = b.length - 1; 0 <= a; a--) {
                const c = this.Unlink(b[a].parentid, b[a].name);
                dbg_assert(0 === c, "Filesystem RecursiveDelete failed at parent=" + b[a].parentid + ", name='" + b[a].name + "' with error code: " + -c)
            }
    };
    FS.prototype.DeleteNode = function(a) {
        var b = this.SearchPath(a); - 1 != b.id && ((this.inodes[b.id].mode & S_IFMT) == S_IFREG ? (a = this.Unlink(b.parentid, b.name), dbg_assert(0 === a, "Filesystem DeleteNode failed with error code: " + -a)) : (this.inodes[b.id].mode & S_IFMT) == S_IFDIR && (this.RecursiveDelete(a), a = this.Unlink(b.parentid, b.name), dbg_assert(0 === a, "Filesystem DeleteNode failed with error code: " + -a)))
    };
    FS.prototype.NotifyListeners = function(a, b, c) {};
    FS.prototype.Check = function() {
        for (var a = 1; a < this.inodes.length; a++)
            if (this.inodes[a].status != STATUS_INVALID) {
                var b = this.GetInode(a);
                0 > b.nlinks && message.Debug("Error in filesystem: negative nlinks=" + b.nlinks + " at id =" + a);
                if (this.IsDirectory(a)) {
                    b = this.GetInode(a);
                    this.IsDirectory(a) && 0 > this.GetParent(a) && message.Debug("Error in filesystem: negative parent id " + a);
                    for (const [c, d] of b.direntries) {
                        0 === c.length && message.Debug("Error in filesystem: inode with no name and id " + d);
                        for (const e of c) 32 > e &&
                            message.Debug("Error in filesystem: Unallowed char in filename")
                    }
                }
            }
    };
    FS.prototype.FillDirectory = function(a) {
        var b = this.inodes[a];
        if (this.is_forwarder(b)) this.follow_fs(b).FillDirectory(b.foreign_id);
        else {
            var c = 0;
            for (const d of b.direntries.keys()) c += 24 + UTF8.UTF8Length(d);
            a = this.inodedata[a] = new Uint8Array(c);
            b.size = c;
            c = 0;
            for (const [d, e] of b.direntries) b = this.GetInode(e), c += marshall.Marshall(["Q", "d", "b", "s"], [b.qid, c + 13 + 8 + 1 + 2 + UTF8.UTF8Length(d), b.mode >> 12, d], a, c)
        }
    };
    FS.prototype.RoundToDirentry = function(a, b) {
        const c = this.inodedata[a];
        dbg_assert(c, `FS directory data for dirid=${a} should be generated`);
        dbg_assert(c.length, "FS directory should have at least an entry");
        if (b >= c.length) return c.length;
        for (a = 0;;) {
            const d = marshall.Unmarshall(["Q", "d"], c, {
                offset: a
            })[1];
            if (d > b) break;
            a = d
        }
        return a
    };
    FS.prototype.IsDirectory = function(a) {
        a = this.inodes[a];
        return this.is_forwarder(a) ? this.follow_fs(a).IsDirectory(a.foreign_id) : (a.mode & S_IFMT) === S_IFDIR
    };
    FS.prototype.IsEmpty = function(a) {
        a = this.inodes[a];
        if (this.is_forwarder(a)) return this.follow_fs(a).IsDirectory(a.foreign_id);
        for (const b of a.direntries.keys())
            if ("." !== b && ".." !== b) return !1;
        return !0
    };
    FS.prototype.GetChildren = function(a) {
        dbg_assert(this.IsDirectory(a), "Filesystem: cannot get children of non-directory inode");
        a = this.inodes[a];
        if (this.is_forwarder(a)) return this.follow_fs(a).GetChildren(a.foreign_id);
        const b = [];
        for (const c of a.direntries.keys()) "." !== c && ".." !== c && b.push(c);
        return b
    };
    FS.prototype.GetParent = function(a) {
        dbg_assert(this.IsDirectory(a), "Filesystem: cannot get parent of non-directory inode");
        a = this.inodes[a];
        if (this.should_be_linked(a)) return a.direntries.get("..");
        const b = this.follow_fs(a).GetParent(a.foreign_id);
        dbg_assert(-1 !== b, "Filesystem: should not have invalid parent ids");
        return this.get_forwarder(a.mount_id, b)
    };
    FS.prototype.PrepareCAPs = function(a) {
        a = this.GetInode(a);
        if (a.caps) return a.caps.length;
        a.caps = new Uint8Array(20);
        a.caps[0] = 0;
        a.caps[1] = 0;
        a.caps[2] = 0;
        a.caps[3] = 2;
        a.caps[4] = 255;
        a.caps[5] = 255;
        a.caps[6] = 255;
        a.caps[7] = 255;
        a.caps[8] = 255;
        a.caps[9] = 255;
        a.caps[10] = 255;
        a.caps[11] = 255;
        a.caps[12] = 63;
        a.caps[13] = 0;
        a.caps[14] = 0;
        a.caps[15] = 0;
        a.caps[16] = 63;
        a.caps[17] = 0;
        a.caps[18] = 0;
        a.caps[19] = 0;
        return a.caps.length
    };

    function FSMountInfo(a) {
        this.fs = a;
        this.backtrack = new Map
    }
    FSMountInfo.prototype.get_state = function() {
        const a = [];
        a[0] = this.fs;
        a[1] = [...this.backtrack];
        return a
    };
    FSMountInfo.prototype.set_state = function(a) {
        this.fs = a[0];
        this.backtrack = new Map(a[1])
    };
    FS.prototype.set_forwarder = function(a, b, c) {
        const d = this.inodes[a];
        dbg_assert(0 === d.nlinks, "Filesystem: attempted to convert an inode into forwarder before unlinking the inode");
        this.is_forwarder(d) && this.mounts[d.mount_id].backtrack.delete(d.foreign_id);
        d.status = STATUS_FORWARDING;
        d.mount_id = b;
        d.foreign_id = c;
        this.mounts[b].backtrack.set(c, a)
    };
    FS.prototype.create_forwarder = function(a, b) {
        const c = this.CreateInode(),
            d = this.inodes.length;
        this.inodes.push(c);
        c.fid = d;
        this.set_forwarder(d, a, b);
        return d
    };
    FS.prototype.is_forwarder = function(a) {
        return a.status === STATUS_FORWARDING
    };
    FS.prototype.is_a_root = function(a) {
        return 0 === this.GetInode(a).fid
    };
    FS.prototype.get_forwarder = function(a, b) {
        var c = this.mounts[a];
        dbg_assert(0 <= b, "Filesystem get_forwarder: invalid foreign_id: " + b);
        dbg_assert(c, "Filesystem get_forwarder: invalid mount number: " + a);
        c = c.backtrack.get(b);
        return void 0 === c ? this.create_forwarder(a, b) : c
    };
    FS.prototype.delete_forwarder = function(a) {
        dbg_assert(this.is_forwarder(a), "Filesystem delete_forwarder: expected forwarder");
        a.status = STATUS_INVALID;
        this.mounts[a.mount_id].backtrack.delete(a.foreign_id)
    };
    FS.prototype.follow_fs = function(a) {
        const b = this.mounts[a.mount_id];
        dbg_assert(this.is_forwarder(a), "Filesystem follow_fs: inode should be a forwarding inode");
        dbg_assert(b, "Filesystem follow_fs: inode<id=" + a.fid + "> should point to valid mounted FS");
        return b.fs
    };
    FS.prototype.Mount = function(a, b) {
        dbg_assert(b.qidcounter === this.qidcounter, "Cannot mount filesystem whose qid numbers aren't synchronised with current filesystem.");
        var c = this.SearchPath(a);
        if (-1 === c.parentid) return dbg_log("Mount failed: parent for path not found: " + a, LOG_9P), -ENOENT;
        if (-1 !== c.id) return dbg_log("Mount failed: file already exists at path: " + a, LOG_9P), -EEXIST;
        if (c.forward_path) return a = this.inodes[c.parentid], c = this.follow_fs(a).Mount(c.forward_path, b), 0 > c ? c : this.get_forwarder(a.mount_id,
            c);
        a = this.mounts.length;
        this.mounts.push(new FSMountInfo(b));
        b = this.create_forwarder(a, 0);
        this.link_under_dir(c.parentid, b, c.name);
        return b
    };

    function FSLockRegion() {
        this.type = P9_LOCK_TYPE_UNLCK;
        this.start = 0;
        this.length = Infinity;
        this.proc_id = -1;
        this.client_id = ""
    }
    FSLockRegion.prototype.get_state = function() {
        const a = [];
        a[0] = this.type;
        a[1] = this.start;
        a[2] = Infinity === this.length ? 0 : this.length;
        a[3] = this.proc_id;
        a[4] = this.client_id;
        return a
    };
    FSLockRegion.prototype.set_state = function(a) {
        this.type = a[0];
        this.start = a[1];
        this.length = 0 === a[2] ? Infinity : a[2];
        this.proc_id = a[3];
        this.client_id = a[4]
    };
    FSLockRegion.prototype.clone = function() {
        const a = new FSLockRegion;
        a.set_state(this.get_state());
        return a
    };
    FSLockRegion.prototype.conflicts_with = function(a) {
        return this.proc_id === a.proc_id && this.client_id === a.client_id || this.type === P9_LOCK_TYPE_UNLCK || a.type === P9_LOCK_TYPE_UNLCK || this.type !== P9_LOCK_TYPE_WRLCK && a.type !== P9_LOCK_TYPE_WRLCK || this.start + this.length <= a.start || a.start + a.length <= this.start ? !1 : !0
    };
    FSLockRegion.prototype.is_alike = function(a) {
        return a.proc_id === this.proc_id && a.client_id === this.client_id && a.type === this.type
    };
    FSLockRegion.prototype.may_merge_after = function(a) {
        return this.is_alike(a) && a.start + a.length === this.start
    };
    FS.prototype.DescribeLock = function(a, b, c, d, e) {
        dbg_assert(a === P9_LOCK_TYPE_RDLCK || a === P9_LOCK_TYPE_WRLCK || a === P9_LOCK_TYPE_UNLCK, "Filesystem: Invalid lock type: " + a);
        dbg_assert(0 <= b, "Filesystem: Invalid negative lock starting offset: " + b);
        dbg_assert(0 < c, "Filesystem: Invalid non-positive lock length: " + c);
        const f = new FSLockRegion;
        f.type = a;
        f.start = b;
        f.length = c;
        f.proc_id = d;
        f.client_id = e;
        return f
    };
    FS.prototype.GetLock = function(a, b) {
        a = this.inodes[a];
        if (this.is_forwarder(a)) {
            var c = a.foreign_id;
            return this.follow_fs(a).GetLock(c, b)
        }
        for (c of a.locks)
            if (b.conflicts_with(c)) return c.clone();
        return null
    };
    FS.prototype.Lock = function(a, b, c) {
        const d = this.inodes[a];
        if (this.is_forwarder(d)) return a = d.foreign_id, this.follow_fs(d).Lock(a, b, c);
        b = b.clone();
        if (b.type !== P9_LOCK_TYPE_UNLCK && this.GetLock(a, b)) return P9_LOCK_BLOCKED;
        for (c = 0; c < d.locks.length; c++) {
            a = d.locks[c];
            dbg_assert(0 < a.length, "Filesystem: Found non-positive lock region length: " + a.length);
            dbg_assert(a.type === P9_LOCK_TYPE_RDLCK || a.type === P9_LOCK_TYPE_WRLCK, "Filesystem: Found invalid lock type: " + a.type);
            dbg_assert(!d.locks[c - 1] || d.locks[c - 1].start <=
                a.start, "Filesystem: Locks should be sorted by starting offset");
            if (a.start + a.length <= b.start) continue;
            if (b.start + b.length <= a.start) break;
            if (a.proc_id !== b.proc_id || a.client_id !== b.client_id) {
                dbg_assert(!a.conflicts_with(b), "Filesytem: Found conflicting lock region, despite already checked for conflicts");
                continue
            }
            var e = b.start + b.length;
            const f = b.start - a.start,
                g = a.start + a.length - e;
            if (0 < f && 0 < g && a.type === b.type) return P9_LOCK_SUCCESS;
            0 < f && (a.length = f);
            if (0 >= f && 0 < g) a.start = e, a.length = g;
            else if (0 < g) {
                for (; c <
                    d.locks.length && d.locks[c].start < e;) c++;
                d.locks.splice(c, 0, this.DescribeLock(a.type, e, g, a.proc_id, a.client_id))
            } else 0 >= f && (d.locks.splice(c, 1), c--)
        }
        if (b.type !== P9_LOCK_TYPE_UNLCK) {
            c = b;
            a = !1;
            for (e = 0; e < d.locks.length && !(c.may_merge_after(d.locks[e]) && (d.locks[e].length += b.length, c = d.locks[e], a = !0), b.start <= d.locks[e].start); e++);
            a || (d.locks.splice(e, 0, c), e++);
            for (; e < d.locks.length; e++)
                if (d.locks[e].is_alike(c)) {
                    d.locks[e].may_merge_after(c) && (c.length += d.locks[e].length, d.locks.splice(e, 1));
                    break
                }
        }
        return P9_LOCK_SUCCESS
    };
    FS.prototype.read_dir = function(a) {
        a = this.SearchPath(a);
        if (-1 !== a.id) return a = this.GetInode(a.id), Array.from(a.direntries.keys()).filter(b => "." !== b && ".." !== b)
    };
    FS.prototype.read_file = function(a) {
        a = this.SearchPath(a);
        if (-1 === a.id) return Promise.resolve(null);
        const b = this.GetInode(a.id);
        return this.Read(a.id, 0, b.size)
    };
    var VIRTIO_MAGIC_REG = 0,
        VIRTIO_VERSION_REG = 4,
        VIRTIO_DEVICE_REG = 8,
        VIRTIO_VENDOR_REG = 12,
        VIRTIO_HOSTFEATURES_REG = 16,
        VIRTIO_HOSTFEATURESSEL_REG = 20,
        VIRTIO_GUESTFEATURES_REG = 32,
        VIRTIO_GUESTFEATURESSEL_REG = 36,
        VIRTIO_GUEST_PAGE_SIZE_REG = 40,
        VIRTIO_QUEUESEL_REG = 48,
        VIRTIO_QUEUENUMMAX_REG = 52,
        VIRTIO_QUEUENUM_REG = 56,
        VIRTIO_QUEUEALIGN_REG = 60,
        VIRTIO_QUEUEPFN_REG = 64,
        VIRTIO_QUEUENOTIFY_REG = 80,
        VIRTIO_INTERRUPTSTATUS_REG = 96,
        VIRTIO_INTERRUPTACK_REG = 100,
        VIRTIO_STATUS_REG = 112,
        VRING_DESC_F_NEXT = 1,
        VRING_DESC_F_WRITE = 2,
        VRING_DESC_F_INDIRECT =
        4;

    function hex8(a) {
        return h(a)
    }
    var message = {
            Debug: function(a) {
                dbg_log([].slice.apply(arguments).join(" "), LOG_9P)
            },
            Abort: function() {
                if (DEBUG) throw Error("message.Abort()");
            }
        },
        LoadBinaryResource;
    LoadBinaryResource = "undefined" !== typeof XMLHttpRequest ? function(a, b, c) {
        var d = new XMLHttpRequest;
        d.open("GET", a, !0);
        d.responseType = "arraybuffer";
        d.onreadystatechange = function() {
            if (4 == d.readyState)
                if (200 != d.status && 0 != d.status) c("Error: Could not load file " + a);
                else {
                    var e = d.response;
                    e ? b(e) : c("Error: No data received from: " + a)
                }
        };
        d.send(null)
    } : function(a, b, c) {
        require("fs").readFile(a, function(d, e) {
            d ? c(d) : b(e.buffer)
        })
    };
    var marshall = {
        Marshall: function(a, b, c, d) {
            for (var e, f = 0, g = 0; g < a.length; g++) switch (e = b[g], a[g]) {
                case "w":
                    c[d++] = e & 255;
                    c[d++] = e >> 8 & 255;
                    c[d++] = e >> 16 & 255;
                    c[d++] = e >> 24 & 255;
                    f += 4;
                    break;
                case "d":
                    c[d++] = e & 255;
                    c[d++] = e >> 8 & 255;
                    c[d++] = e >> 16 & 255;
                    c[d++] = e >> 24 & 255;
                    c[d++] = 0;
                    c[d++] = 0;
                    c[d++] = 0;
                    c[d++] = 0;
                    f += 8;
                    break;
                case "h":
                    c[d++] = e & 255;
                    c[d++] = e >> 8;
                    f += 2;
                    break;
                case "b":
                    c[d++] = e;
                    f += 1;
                    break;
                case "s":
                    var k = d,
                        l = 0;
                    c[d++] = 0;
                    c[d++] = 0;
                    f += 2;
                    for (var m of e) UnicodeToUTF8Stream(m.charCodeAt(0)).forEach(function(n) {
                        c[d++] = n;
                        f += 1;
                        l++
                    });
                    c[k + 0] = l & 255;
                    c[k + 1] = l >> 8 & 255;
                    break;
                case "Q":
                    marshall.Marshall(["b", "w", "d"], [e.type, e.version, e.path], c, d);
                    d += 13;
                    f += 13;
                    break;
                default:
                    message.Debug("Marshall: Unknown type=" + a[g])
            }
            return f
        },
        Unmarshall: function(a, b, c) {
            let d = c.offset;
            for (var e = [], f = 0; f < a.length; f++) switch (a[f]) {
                case "w":
                    var g = b[d++];
                    g += b[d++] << 8;
                    g += b[d++] << 16;
                    g += b[d++] << 24 >>> 0;
                    e.push(g);
                    break;
                case "d":
                    g = b[d++];
                    g += b[d++] << 8;
                    g += b[d++] << 16;
                    g += b[d++] << 24 >>> 0;
                    d += 4;
                    e.push(g);
                    break;
                case "h":
                    g = b[d++];
                    e.push(g + (b[d++] << 8));
                    break;
                case "b":
                    e.push(b[d++]);
                    break;
                case "s":
                    g = b[d++];
                    g += b[d++] << 8;
                    for (var k = "", l = new UTF8StreamToUnicode, m = 0; m < g; m++) {
                        var n = l.Put(b[d++]); - 1 != n && (k += String.fromCharCode(n))
                    }
                    e.push(k);
                    break;
                case "Q":
                    c.offset = d;
                    g = marshall.Unmarshall(["b", "w", "d"], b, c);
                    d = c.offset;
                    e.push({
                        type: g[0],
                        version: g[1],
                        path: g[2]
                    });
                    break;
                default:
                    message.Debug("Error in Unmarshall: Unknown type=" + a[f])
            }
            c.offset = d;
            return e
        }
    };
    var UTF8 = {};

    function UTF8StreamToUnicode() {
        this.stream = new Uint8Array(5);
        this.ofs = 0;
        this.Put = function(a) {
            this.stream[this.ofs] = a;
            this.ofs++;
            switch (this.ofs) {
                case 1:
                    if (128 > this.stream[0]) return this.ofs = 0, this.stream[0];
                    break;
                case 2:
                    if (192 == (this.stream[0] & 224) && 128 == (this.stream[1] & 192)) return this.ofs = 0, (this.stream[0] & 31) << 6 | this.stream[1] & 63
            }
            return -1
        }
    }

    function UnicodeToUTF8Stream(a) {
        if (128 > a) return [a];
        if (2048 > a) return [192 | a >> 6 & 31, 128 | a & 63]
    }
    UTF8.UTF8Length = function(a) {
        for (var b = 0, c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            b += 128 > d ? 1 : 2
        }
        return b
    };
}).call(this);
'use strict';
var q, ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    if (a == Array.prototype || a == Object.prototype) return a;
    a[b] = c.value;
    return a
};

function ca(a) {
    a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
    for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        if (c && c.Math == Math) return c
    }
    throw Error("Cannot find global object");
}
var da = ca(this);

function ea(a, b) {
    if (b) a: {
        var c = da;a = a.split(".");
        for (var d = 0; d < a.length - 1; d++) {
            var e = a[d];
            if (!(e in c)) break a;
            c = c[e]
        }
        a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && ba(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}
ea("globalThis", function(a) {
    return a || da
});
Object.freeze(["shared", "exclusive", "unlock"]);

function fa(a, b, c) {
    this.h = a;
    this.v = c;
    this.B = [104, 111, 115, 116, 57, 112];
    this.F = this.B.length;
    this.D = "9P2000.L";
    this.j = this.o = 8192;
    this.i = new Uint8Array(2 * this.j);
    this.C = 0;
    this.g = [];
    this.ab = new ka(b, {
        name: "virtio-9p",
        Ia: 48,
        Ee: 4169,
        Pg: 9,
        De: {
            Vc: 43008,
            Xa: [{
                Kc: 32,
                ie: 0
            }],
            features: [0, 32, 29, 28],
            uk: () => {}
        },
        notification: {
            Vc: 43264,
            Dj: !1,
            Gh: [d => {
                if (0 === d) {
                    for (; la(this.l);) {
                        d = this.l;
                        la(d);
                        var e = d.s.Na(d.h + 4 + 2 * d.j);
                        e = new ma(d, e);
                        d.j = d.j + 1 & d.o;
                        na(this, e)
                    }
                    d = this.l;
                    e = d.s.Na(d.h + 2) + 0 & 65535;
                    d.s.we(d.g + 4 + 8 * d.size, e)
                }
            }]
        },
        hc: {
            Vc: 42752
        },
        Tf: {
            Vc: 42496,
            td: [{
                bytes: 2,
                name: "mount tag length",
                read: () => this.F,
                write: () => {}
            }].concat(Array.from(Array(254).keys()).map(d => ({
                bytes: 1,
                name: "mount tag name " + d,
                read: () => this.B[d] || 0,
                write: () => {}
            })))
        }
    });
    this.l = this.ab.Xa[0]
}
fa.prototype.$ = function() {
    var a = [];
    a[0] = this.B;
    a[1] = this.F;
    a[2] = this.ab;
    a[3] = this.D;
    a[4] = this.o;
    a[5] = this.j;
    a[6] = this.i;
    a[7] = this.C;
    a[8] = this.g.map(function(b) {
        return [b.Z, b.type, b.uid, b.$b]
    });
    a[9] = this.h;
    return a
};
fa.prototype.G = function(a) {
    this.B = a[0];
    this.F = a[1];
    this.ab.G(a[2]);
    this.l = this.ab.Xa[0];
    this.D = a[3];
    this.o = a[4];
    this.j = a[5];
    this.i = a[6];
    this.C = a[7];
    this.g = a[8].map(function(b) {
        return {
            Z: b[0],
            type: b[1],
            uid: b[2],
            $b: b[3]
        }
    });
    this.h.G(a[9])
};

function u(a, b, c, d) {
    v(["w", "b", "h"], [d + 7, b + 1, c], a.i, 0);
    a.C = d + 7
}

function qa(a, b, c) {
    c = v(["w"], [c], a.i, 7);
    u(a, 6, b, c)
}

function D(a, b) {
    for (var c = a.i.subarray(0, a.C), d = 0, e = c.length; e && b.Lf !== b.Mf.length;) {
        var g = b.Mf[b.Lf];
        const h = g.bf + b.xe;
        g = g.Ke - b.xe;
        g > e ? (g = e, b.xe += e) : (b.Lf++, b.xe = 0);
        ra(b.s, c.subarray(d, d + g), h);
        d += g;
        e -= g
    }
    b.nf += d;
    c = a.l;
    d = c.s.Na(c.g + 2) + c.i & c.o;
    e = b.nf;
    c.s.Lc(c.g + 4 + 8 * d, b.Hh);
    c.s.Lc(c.g + 8 + 8 * d, e);
    c.i++;
    a = a.l;
    0 !== a.i && (b = a.s.Na(a.g + 2) + a.i & 65535, a.s.we(a.g + 2, b), a.i = 0, 0 < (a.ab.h[0] & 536870912) ? (a.s.Na(a.h + 4 + 2 * a.size), a.ab.za(1)) : ~a.s.Na(a.h) & 1 && a.ab.za(1))
}
async function na(a, b) {
    var c = new Uint8Array(b.mf);
    ua(b, c);
    var d = {
            offset: 0
        },
        e = E(["w", "b", "h"], c, d),
        g = e[0],
        h = e[1],
        f = e[2];
    switch (h) {
        case 8:
            g = va(a.h);
            var k = wa(a.h);
            e = [16914839];
            e[1] = a.o;
            e[2] = Math.floor(k / e[1]);
            e[3] = e[2] - Math.floor(g / e[1]);
            e[4] = e[2] - Math.floor(g / e[1]);
            e[5] = xa(a.h);
            e[6] = ya(a.h);
            e[7] = 0;
            e[8] = 256;
            g = v("wwddddddw".split(""), e, a.i, 7);
            u(a, h, f, g);
            D(a, b);
            break;
        case 112:
        case 12:
            e = E(["w", "w"], c, d);
            g = e[0];
            d = e[1];
            c = a.g[g].Z;
            var l = I(a.h, c);
            k = Aa(a.h, c, d);
            Ba(a.h, a.g[g].Z, function() {
                var p = [];
                p[0] = l.ya;
                p[1] = this.j - 24;
                v(["Q", "w"], p, this.i, 7);
                u(this, h, f, 17);
                D(this, b)
            }.bind(a));
            break;
        case 70:
            e = E(["w", "w", "s"], c, d);
            c = e[0];
            g = e[1];
            k = e[2];
            k = Ca(a.h, a.g[c].Z, a.g[g].Z, k);
            if (0 > k) {
                qa(a, f, -k);
                D(a, b);
                break
            }
            u(a, h, f, 0);
            D(a, b);
            break;
        case 16:
            e = E(["w", "s", "s", "w"], c, d);
            g = e[0];
            k = e[1];
            var n = e[3];
            c = Da(a.h, k, a.g[g].Z, e[2]);
            l = I(a.h, c);
            l.uid = a.g[g].uid;
            l.Ga = n;
            v(["Q"], [l.ya], a.i, 7);
            u(a, h, f, 13);
            D(a, b);
            break;
        case 18:
            e = E("wswwww".split(""), c, d);
            g = e[0];
            k = e[1];
            d = e[2];
            c = e[3];
            var m = e[4];
            n = e[5];
            c = Ea(a.h, k, a.g[g].Z, c, m);
            l = I(a.h,
                c);
            l.mode = d;
            l.uid = a.g[g].uid;
            l.Ga = n;
            v(["Q"], [l.ya], a.i, 7);
            u(a, h, f, 13);
            D(a, b);
            break;
        case 22:
            e = E(["w"], c, d);
            g = e[0];
            l = I(a.h, a.g[g].Z);
            g = v(["s"], [l.pe], a.i, 7);
            u(a, h, f, g);
            D(a, b);
            break;
        case 72:
            e = E(["w", "s", "w", "w"], c, d);
            g = e[0];
            k = e[1];
            d = e[2];
            n = e[3];
            c = Fa(a.h, k, a.g[g].Z);
            l = I(a.h, c);
            l.mode = d | Ga;
            l.uid = a.g[g].uid;
            l.Ga = n;
            v(["Q"], [l.ya], a.i, 7);
            u(a, h, f, 13);
            D(a, b);
            break;
        case 14:
            e = E(["w", "s", "w", "w", "w"], c, d);
            g = e[0];
            k = e[1];
            c = e[2];
            d = e[3];
            n = e[4];
            a.v.send("9p-create", [k, a.g[g].Z]);
            c = Ha(a.h, k, a.g[g].Z);
            a.g[g].Z = c;
            a.g[g].type =
                1;
            a.g[g].$b = k;
            l = I(a.h, c);
            l.uid = a.g[g].uid;
            l.Ga = n;
            l.mode = d;
            v(["Q", "w"], [l.ya, a.j - 24], a.i, 7);
            u(a, h, f, 17);
            D(a, b);
            break;
        case 52:
            e = E("wbwddws".split(""), c, d);
            g = e[0];
            c = e[2];
            k = 0 === e[4] ? Infinity : e[4];
            e = Ia(e[1], e[3], k, e[5], e[6]);
            k = Ja(a.h, a.g[g].Z, e, c);
            v(["b"], [k], a.i, 7);
            u(a, h, f, 1);
            D(a, b);
            break;
        case 54:
            e = E("wbddws".split(""), c, d);
            g = e[0];
            k = 0 === e[3] ? Infinity : e[3];
            e = Ia(e[1], e[2], k, e[4], e[5]);
            k = Ka(a.h, a.g[g].Z, e);
            k || (k = e, k.type = 2);
            g = v(["b", "d", "d", "w", "s"], [k.type, k.start, Infinity === k.length ? 0 : k.length, k.h, k.g],
                a.i, 7);
            u(a, h, f, g);
            D(a, b);
            break;
        case 24:
            e = E(["w", "d"], c, d);
            g = e[0];
            l = I(a.h, a.g[g].Z);
            if (!l || l.status === La) {
                qa(a, f, 2);
                D(a, b);
                break
            }
            e[0] |= 4096;
            e[0] = e[1];
            e[1] = l.ya;
            e[2] = l.mode;
            e[3] = l.uid;
            e[4] = l.Ga;
            e[5] = l.Ua;
            e[6] = l.Le << 8 | l.Me;
            e[7] = l.size;
            e[8] = a.o;
            e[9] = Math.floor(l.size / 512 + 1);
            e[10] = l.Oc;
            e[11] = 0;
            e[12] = l.ic;
            e[13] = 0;
            e[14] = l.Dd;
            e[15] = 0;
            e[16] = 0;
            e[17] = 0;
            e[18] = 0;
            e[19] = 0;
            v("dQwwwddddddddddddddd".split(""), e, a.i, 7);
            u(a, h, f, 153);
            D(a, b);
            break;
        case 26:
            e = E("wwwwwddddd".split(""), c, d);
            g = e[0];
            l = I(a.h, a.g[g].Z);
            e[1] & 1 &&
                (l.mode = e[2]);
            e[1] & 2 && (l.uid = e[3]);
            e[1] & 4 && (l.Ga = e[4]);
            e[1] & 16 && (l.Oc = Math.floor((new Date).getTime() / 1E3));
            e[1] & 32 && (l.ic = Math.floor((new Date).getTime() / 1E3));
            e[1] & 64 && (l.Dd = Math.floor((new Date).getTime() / 1E3));
            e[1] & 128 && (l.Oc = e[6]);
            e[1] & 256 && (l.ic = e[8]);
            e[1] & 8 && await Ma(a.h, a.g[g].Z, e[5]);
            u(a, h, f, 0);
            D(a, b);
            break;
        case 50:
            e = E(["w", "d"], c, d);
            g = e[0];
            u(a, h, f, 0);
            D(a, b);
            break;
        case 40:
        case 116:
            e = E(["w", "d", "w"], c, d);
            g = e[0];
            k = e[1];
            n = e[2];
            l = I(a.h, a.g[g].Z);
            if (!l || l.status === La) {
                qa(a, f, 2);
                D(a, b);
                break
            }
            if (2 ==
                a.g[g].type) {
                (void 0).length < k + n && (n = (void 0).length - k);
                for (e = 0; e < n; e++) a.i[11 + e] = (void 0)[k + e];
                v(["w"], [n], a.i, 7);
                u(a, h, f, 4 + n)
            } else Aa(a.h, a.g[g].Z, void 0), e = a.g[g].Z, n = Math.min(n, a.i.length - 11), l.size < k + n ? n = l.size - k : 40 == h && (n = Na(a.h, e, k + n) - k), k > l.size && (n = 0), a.v.send("9p-read-start", [a.g[g].$b]), e = await Oa(a.h, e, k, n), a.v.send("9p-read-end", [a.g[g].$b, n]), e && a.i.set(e, 11), v(["w"], [n], a.i, 7), u(a, h, f, 4 + n);
            D(a, b);
            break;
        case 118:
            e = E(["w", "d", "w"], c, d);
            g = e[0];
            k = e[1];
            n = e[2];
            e = a.g[g].$b;
            if (2 === a.g[g].type) {
                qa(a,
                    f, 95);
                D(a, b);
                break
            } else await Pa(a.h, a.g[g].Z, k, n, c.subarray(d.offset));
            a.v.send("9p-write-end", [e, n]);
            v(["w"], [n], a.i, 7);
            u(a, h, f, 4);
            D(a, b);
            break;
        case 74:
            e = E(["w", "s", "w", "s"], c, d);
            k = await Ra(a.h, a.g[e[0]].Z, e[1], a.g[e[2]].Z, e[3]);
            if (0 > k) {
                qa(a, f, -k);
                D(a, b);
                break
            }
            u(a, h, f, 0);
            D(a, b);
            break;
        case 76:
            e = E(["w", "s", "w"], c, d);
            d = e[0];
            k = e[1];
            c = e[2];
            g = Sa(a.h, a.g[d].Z, k);
            if (-1 == g) {
                qa(a, f, 2);
                D(a, b);
                break
            }
            k = Ta(a.h, a.g[d].Z, k);
            if (0 > k) {
                qa(a, f, -k);
                D(a, b);
                break
            }
            u(a, h, f, 0);
            D(a, b);
            break;
        case 100:
            g = E(["w", "s"], c, d);
            a.j =
                g[0];
            g = v(["w", "s"], [a.j, a.D], a.i, 7);
            u(a, h, f, g);
            D(a, b);
            break;
        case 104:
            e = E(["w", "w", "s", "s", "w"], c, d);
            g = e[0];
            a.g[g] = {
                Z: 0,
                type: 1,
                uid: e[4],
                $b: ""
            };
            l = I(a.h, a.g[g].Z);
            v(["Q"], [l.ya], a.i, 7);
            u(a, h, f, 13);
            D(a, b);
            a.v.send("9p-attach");
            break;
        case 108:
            e = E(["h"], c, d);
            u(a, h, f, 0);
            D(a, b);
            break;
        case 110:
            e = E(["w", "w", "h"], c, d);
            g = e[0];
            n = e[1];
            m = e[2];
            if (0 == m) {
                a.g[n] = {
                    Z: a.g[g].Z,
                    type: 1,
                    uid: a.g[g].uid,
                    $b: a.g[g].$b
                };
                v(["h"], [0], a.i, 7);
                u(a, h, f, 2);
                D(a, b);
                break
            }
            k = [];
            for (e = 0; e < m; e++) k.push("s");
            d = E(k, c, d);
            c = a.g[g].Z;
            k = 9;
            var t =
                0;
            for (e = 0; e < m; e++) {
                c = Sa(a.h, c, d[e]);
                if (-1 == c) break;
                k += v(["Q"], [I(a.h, c).ya], a.i, k);
                t++;
                a.g[n] = {
                    Z: c,
                    type: 1,
                    uid: a.g[g].uid,
                    $b: d[e]
                }
            }
            v(["h"], [t], a.i, 7);
            u(a, h, f, k - 7);
            D(a, b);
            break;
        case 120:
            e = E(["w"], c, d);
            a.g[e[0]] && 0 <= a.g[e[0]].Z && (await Ua(a.h, a.g[e[0]].Z), a.g[e[0]].Z = -1, a.g[e[0]].type = -1);
            u(a, h, f, 0);
            D(a, b);
            break;
        case 32:
            e = E(["w", "s", "d", "w"], c, d);
            g = e[0];
            k = e[1];
            c = e[3];
            a.g[g].type = 2;
            u(a, h, f, 0);
            D(a, b);
            break;
        case 30:
            e = E(["w", "w", "s"], c, d), g = e[0], k = e[2], qa(a, f, 95), D(a, b)
    }
};

function Va(a, b) {
    function c(y) {
        y = y.toString(16);
        return "#" + "0".repeat(6 - y.length) + y
    }

    function d(y, A, V, R) {
        y.style.width = "";
        y.style.height = "";
        R && (y.style.transform = "");
        var aa = y.getBoundingClientRect();
        R ? y.style.transform = (1 === A ? "" : " scaleX(" + A + ")") + (1 === V ? "" : " scaleY(" + V + ")") : (0 === A % 1 && 0 === V % 1 ? (e.style.imageRendering = "crisp-edges", e.style.imageRendering = "pixelated", e.style["-ms-interpolation-mode"] = "nearest-neighbor") : (e.style.pk = "", e.style["-ms-interpolation-mode"] = ""), R = window.devicePixelRatio || 1, 0 !==
            R % 1 && (A /= R, V /= R));
        1 !== A && (y.style.width = aa.width * A + "px");
        1 !== V && (y.style.height = aa.height * V + "px")
    }
    console.assert(a, "1st argument must be a DOM container");
    var e = a.getElementsByTagName("canvas")[0],
        g = e.getContext("2d", {
            alpha: !1
        }),
        h = a.getElementsByTagName("div")[0],
        f = document.createElement("div"),
        k, l, n = 1,
        m = 1,
        t = 1,
        p, r = !1,
        w, x, C, H = !1,
        K = this;
    a = new Uint16Array([199, 252, 233, 226, 228, 224, 229, 231, 234, 235, 232, 239, 238, 236, 196, 197, 201, 230, 198, 244, 246, 242, 251, 249, 255, 214, 220, 162, 163, 165, 8359, 402, 225, 237, 243, 250,
        241, 209, 170, 186, 191, 8976, 172, 189, 188, 161, 171, 187, 9617, 9618, 9619, 9474, 9508, 9569, 9570, 9558, 9557, 9571, 9553, 9559, 9565, 9564, 9563, 9488, 9492, 9524, 9516, 9500, 9472, 9532, 9566, 9567, 9562, 9556, 9577, 9574, 9568, 9552, 9580, 9575, 9576, 9572, 9573, 9561, 9560, 9554, 9555, 9579, 9578, 9496, 9484, 9608, 9604, 9612, 9616, 9600, 945, 223, 915, 960, 931, 963, 181, 964, 934, 920, 937, 948, 8734, 966, 949, 8745, 8801, 177, 8805, 8804, 8992, 8993, 247, 8776, 176, 8729, 183, 8730, 8319, 178, 9632, 160
    ]);
    for (var B = new Uint16Array([32, 9786, 9787, 9829, 9830, 9827, 9824, 8226, 9688,
            9675, 9689, 9794, 9792, 9834, 9835, 9788, 9658, 9668, 8597, 8252, 182, 167, 9644, 8616, 8593, 8595, 8594, 8592, 8735, 8596, 9650, 9660
        ]), F = [], N, G = 0; 256 > G; G++) N = 127 < G ? a[G - 128] : 32 > G ? B[G] : G, F[G] = String.fromCharCode(N);
    g.imageSmoothingEnabled = !1;
    f.style.position = "absolute";
    f.style.backgroundColor = "#ccc";
    f.style.width = "7px";
    f.style.display = "inline-block";
    h.style.display = "block";
    e.style.display = "none";
    this.v = b;
    b.register("screen-set-mode", function(y) {
        console.log(y);
        this.Bf(y)
    }, this);
    b.register("screen-fill-buffer-end", function(y) {
        console.log(y);
            this.If(y)
        },
        this);
    b.register("screen-put-char", function(y) {
        // window._a=window._a ? window._a.concat([y]) : [y];
        console.log(y);
        this.vf(y[0], y[1], y[2], y[3], y[4])
    }, this);
    b.register("screen-update-cursor", function(y) {
        console.log(y);
        this.wd(y[0], y[1])
    }, this);
    b.register("screen-update-cursor-scanline", function(y) {
        console.log(y);
        this.xd(y[0], y[1])
    }, this);
    b.register("screen-clear", function() {
        this.Qf()
    }, this);
    b.register("screen-set-size-text", function(y) {
        console.log(y);
        this.rd(y[0], y[1])
    }, this);
    b.register("screen-set-size-graphical", function(y) {
        console.log(y);
        this.qd(y[0], y[1], y[2], y[3])
    }, this);
    this.hb = function() {
        this.rd(80, 25);
        this.rb()
    };
    this.Ph =
        function() {
            const y = new Image;
            if (r) y.src = e.toDataURL("image/png");
            else {
                const A = [9, 16],
                    V = document.createElement("canvas");
                V.width = x * A[0];
                V.height = C * A[1];
                const R = V.getContext("2d");
                R.imageSmoothingEnabled = !1;
                R.font = window.getComputedStyle(h).font;
                R.textBaseline = "top";
                for (let aa = 0; aa < x; aa++)
                    for (let ha = 0; ha < C; ha++) {
                        const ia = 3 * (ha * x + aa);
                        R.fillStyle = c(w[ia + 1]);
                        R.fillRect(aa * A[0], ha * A[1], A[0], A[1]);
                        R.fillStyle = c(w[ia + 2]);
                        R.fillText(F[w[ia]], aa * A[0], ha * A[1])
                    }
                "none" !== f.style.display && (R.fillStyle = f.style.backgroundColor,
                    R.fillRect(l * A[0], k * A[1] + parseInt(f.style.marginTop, 10) - 1, parseInt(f.style.width, 10), parseInt(f.style.height, 10)));
                y.src = V.toDataURL("image/png")
            }
            try {
                window.open("").document.write(y.outerHTML)
            } catch (A) {}
        };
    this.vf = function(y, A, V, R, aa) {
        y < C && A < x && (A = 3 * (y * x + A), w[A] = V, w[A + 1] = R, w[A + 2] = aa, p[y] = 1)
    };
    this.rb = function() {
        H || requestAnimationFrame(r ? W : ja)
    };
    var ja = function() {
            for (var y = 0; y < C; y++) p[y] && (K.g(y), p[y] = 0);
            this.rb()
        }.bind(this),
        W = function() {
            this.v.send("screen-fill-buffer");
            this.rb()
        }.bind(this);
    this.va =
        function() {
            H = !0
        };
    this.Bf = function(y) {
        (r = y) ? (h.style.display = "none", e.style.display = "block") : (h.style.display = "block", e.style.display = "none")
    };
    this.Qf = function() {
        g.fillStyle = "#000";
        g.fillRect(0, 0, e.width, e.height)
    };
    this.rd = function(y, A) {
        if (y !== x || A !== C) {
            p = new Int8Array(A);
            w = new Int32Array(y * A * 3);
            x = y;
            for (C = A; h.childNodes.length > A;) h.removeChild(h.firstChild);
            for (; h.childNodes.length < A;) h.appendChild(document.createElement("div"));
            for (y = 0; y < A; y++) this.g(y);
            d(h, n, m, !0)
        }
    };
    this.qd = function(y, A) {
        e.style.display =
            "block";
        e.width = y;
        e.height = A;
        t = 640 >= y && 2 * y < window.innerWidth && 2 * y < window.innerHeight ? 2 : 1;
        d(e, n * t, m * t, !1)
    };
    this.Cf = function(y, A) {
        n = y;
        m = A;
        d(h, n, m, !0);
        d(e, n * t, m * t, !1)
    };
    this.Cf(n, m);
    this.xd = function(y, A) {
        y & 32 ? f.style.display = "none" : (f.style.display = "inline", f.style.height = Math.min(15, A - y) + "px", f.style.marginTop = Math.min(15, y) + "px")
    };
    this.wd = function(y, A) {
        if (y !== k || A !== l) p[y] = 1, p[k] = 1, k = y, l = A
    };
    this.g = function(y) {
        var A = 3 * y * x,
            V;
        var R = h.childNodes[y];
        var aa = document.createElement("div");
        for (var ha = 0; ha < x;) {
            var ia =
                document.createElement("span");
            var z = w[A + 1];
            var O = w[A + 2];
            ia.style.backgroundColor = c(z);
            ia.style.color = c(O);
            for (V = ""; ha < x && w[A + 1] === z && w[A + 2] === O;)
                if (V += F[w[A]], ha++, A += 3, y === k)
                    if (ha === l) break;
                    else if (ha === l + 1) {
                aa.appendChild(f);
                break
            }
            ia.textContent = V;
            aa.appendChild(ia)
        }
        R.parentNode.replaceChild(aa, R)
    };
    this.If = function(y) {
        y.forEach(A => {
            g.putImageData(A.Fb, A.zf - A.Be, A.Af - A.Ce, A.Be, A.Ce, A.df, A.cf)
        })
    };
    this.hb()
};
(function() {
    function a() {
        for (var m = location.search.substr(1).split("&"), t = {}, p = 0; p < m.length; p++) {
            var r = m[p].split("=");
            t[r[0]] = decodeURIComponent(r.slice(1).join("="))
        }
        return t
    }

    function b(m) {
        document.title = m + " - Virtual x86";
        const t = document.querySelector("meta[name=description]");
        t && (t.content = "Running " + m)
    }

    function c(m) {
        return document.getElementById(m)
    }

    function d() {
        function m(B) {
            c("boot_options").style.display = "none";
            b(B.name);
            r.filesystem = B.filesystem;
            B.state && (c("reset").style.display = "none",
                r.Wc = B.state);
            r.ma = B.ma;
            r.fa = B.fa;
            r.M = B.M;
            r.ed = B.ed;
            r.ub = B.ub;
            r.Xc = B.Xc;
            r.Pc = B.Pc;
            r.ef = B.ef;
            r.Gb = B.Gb;
            r.Ea = B.state || void 0 === r.Ea ? B.Ea : r.Ea;
            r.H = !B.state && r.H ? r.H : B.H;
            r.ea = !B.state && r.ea ? r.ea : B.ea;
            r.id = B.id;
            void 0 !== B.oc && (r.oc = B.oc);
            var F = parseInt(w.chunk_size, 10);
            0 <= F && (F ? (F = Math.min(4194304, Math.max(512, F)), F = 1 << Math.ceil(Math.log2(F))) : F = void 0, r.M && (r.M.P = F), r.fa && (r.fa.P = F));
            B.ha && (c("description").style.display = "block", F = document.createElement("a"), F.href = B.ha, F.textContent = B.name, F.target =
                "_blank", c("description").appendChild(document.createTextNode("Running ")), c("description").appendChild(F));
            e(r, t)
        }

        function t(B) {
            w.c && setTimeout(function() {
                Wa(B, w.c + "\n")
            }, 25)
        }
        if (window.WebAssembly) {
            var p = document.createElement("script");
            p.src = "build/xterm.js";
            p.async = !0;
            document.body.appendChild(p);
            var r = {};
            // c("start_emulation").onclick = function() {
            window.start_emulation=function() {
                // c("boot_options").style.display = "none";
                // k("custom");
                // var B = c("floppy_image").files[0];
                // if (B) {
                //     var F = B;
                //     r.ma = {
                //         buffer: B
                //     }
                // }
                // if (B = c("cd_image").files[0]) F = B
                r.fa = {
                    // buffer: B
                    url: 'tinycore.iso'
                };
                // if (B = c("hda_image").files[0]) F = B, r.M = {
                //     buffer: B
                // };
                // if (B = c("hdb_image") && c("hdb_image").files[0]) F = B, r.He = {
                //     buffer: B
                // };
                // c("multiboot_image") && (B = c("multiboot_image").files[0]) && (F = B, r.ed = {
                //     buffer: B
                // });
                // F && b(F.name);
                e(r)
            };
            setTimeout(() => {
                window.start_emulation();
            }, (0));
            var w = a();
            p = w.cdn || (l ? "images/" : "//k.copy.sh/");
            p = [{
                    id: "archlinux",
                    name: "Arch Linux",
                    H: 536870912,
                    ea: 8388608,
                    state: {
                        url: p + "arch_state.bin.zst"
                    },
                    filesystem: {
                        Ae: p + "arch/"
                    }
                }, {
                    id: "archlinux-boot",
                    name: "Arch Linux",
                    H: 536870912,
                    ea: 8388608,
                    filesystem: {
                        Ae: p + "arch/",
                        ah: {
                            url: p + "fs.json"
                        }
                    },
                    Pc: "rw apm=off vga=0x344 video=vesafb:ypan,vremap:8 root=host9p rootfstype=9p rootflags=trans=virtio,cache=loose mitigations=off audit=0 page_poison=on tsc=reliable random.trust_cpu=on nowatchdog init=/usr/bin/init-openrc net.ifnames=0 biosdevname=0",
                    ef: !0
                }, {
                    id: "serenity",
                    name: "SerenityOS",
                    M: {
                        url: p + "serenity-v2.img",
                        size: 700448768,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    H: 536870912,
                    state: {
                        url: p + "serenity_state-v3.bin.zst"
                    },
                    ha: "https://serenityos.org/",
                    Gb: !0
                }, {
                    id: "serenity-boot",
                    name: "SerenityOS",
                    M: {
                        url: p + "serenity-v2.img",
                        size: 700448768,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    H: 536870912,
                    ha: "https://serenityos.org/"
                }, {
                    id: "serenity-old",
                    name: "SerenityOS",
                    M: {
                        url: p + "serenity.img",
                        size: 918552576,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    H: 536870912,
                    state: {
                        url: p + "serenity_state-v2.bin.zst"
                    },
                    ha: "https://serenityos.org/"
                }, {
                    id: "serenity-old-boot",
                    name: "SerenityOS",
                    M: {
                        url: p + "serenity.img",
                        size: 918552576,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    H: 536870912,
                    ha: "https://serenityos.org/"
                }, {
                    id: "helenos",
                    H: 268435456,
                    fa: {
                        url: p + "HelenOS-0.11.2-ia32.iso",
                        size: 25765888,
                        async: !1
                    },
                    name: "HelenOS",
                    ha: "http://www.helenos.org/"
                }, {
                    id: "haiku",
                    H: 536870912,
                    M: {
                        url: p + "haiku-v2.img",
                        size: 1073741824,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    state: {
                        url: p + "haiku_state-v2.bin.zst"
                    },
                    name: "Haiku",
                    ha: "https://www.haiku-os.org/"
                }, {
                    id: "haiku-boot",
                    H: 536870912,
                    M: {
                        url: p + "haiku-v2.img",
                        size: 1073741824,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    name: "Haiku",
                    ha: "https://www.haiku-os.org/"
                }, {
                    id: "msdos",
                    M: {
                        url: p + "msdos.img",
                        size: 8388608,
                        async: !1
                    },
                    oc: 306,
                    name: "MS-DOS"
                }, {
                    id: "freedos",
                    ma: {
                        url: p + "freedos722.img",
                        size: 737280,
                        async: !1
                    },
                    name: "FreeDOS"
                },
                {
                    id: "psychdos",
                    M: {
                        url: p + "psychdos.img",
                        size: 549453824,
                        async: !0,
                        P: 262144,
                        la: !l
                    },
                    name: "PsychDOS",
                    ha: "https://psychoslinux.gitlab.io/DOS/INDEX.HTM"
                }, {
                    id: "oberon",
                    M: {
                        url: p + "oberon.img",
                        size: 25165824,
                        async: !1
                    },
                    name: "Oberon"
                }, {
                    id: "windows1",
                    ma: {
                        url: p + "windows101.img",
                        size: 1474560,
                        async: !1
                    },
                    name: "Windows"
                }, {
                    id: "linux26",
                    fa: {
                        url: p + "linux.iso",
                        size: 6547456,
                        async: !1
                    },
                    name: "Linux"
                }, {
                    id: "linux3",
                    fa: {
                        url: p + "linux3.iso",
                        size: 8624128,
                        async: !1
                    },
                    name: "Linux"
                }, {
                    id: "linux4",
                    fa: {
                        url: p + "linux4.iso",
                        size: 7731200,
                        async: !1
                    },
                    name: "Linux",
                    filesystem: {}
                }, {
                    id: "buildroot",
                    ub: {
                        url: p + "buildroot-bzimage.bin",
                        size: 5166352,
                        async: !1
                    },
                    name: "Buildroot Linux",
                    filesystem: {},
                    Pc: "tsc=reliable mitigations=off random.trust_cpu=on"
                }, {
                    id: "nodeos",
                    ub: {
                        url: p + "nodeos-kernel.bin",
                        size: 14452E3,
                        async: !1
                    },
                    name: "NodeOS",
                    Pc: "tsc=reliable mitigations=off random.trust_cpu=on"
                }, {
                    id: "dsl",
                    H: 268435456,
                    fa: {
                        url: p + "dsl-4.11.rc2.iso",
                        size: 52824064,
                        async: !1
                    },
                    name: "Damn Small Linux",
                    ha: "http://www.damnsmalllinux.org/"
                }, {
                    id: "minix",
                    name: "Minix",
                    H: 268435456,
                    fa: {
                        url: p + "minix-3.3.0.iso",
                        size: 605581312,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    ha: "https://www.minix3.org/"
                }, {
                    id: "kolibrios",
                    ma: {
                        url: l ? p + "kolibri.img" : "//builds.kolibrios.org/eng/data/data/kolibri.img",
                        size: 1474560,
                        async: !1
                    },
                    name: "KolibriOS",
                    ha: "https://kolibrios.org/en/"
                }, {
                    id: "kolibrios-fallback",
                    ma: {
                        url: p + "kolibri.img",
                        size: 1474560,
                        async: !1
                    },
                    name: "KolibriOS"
                }, {
                    id: "openbsd",
                    M: {
                        url: p + "openbsd.img",
                        size: 1073741824,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    state: {
                        url: p + "openbsd_state.bin.zst"
                    },
                    H: 268435456,
                    name: "OpenBSD"
                }, {
                    id: "openbsd-boot",
                    M: {
                        url: p + "openbsd.img",
                        size: 1073741824,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    H: 268435456,
                    name: "OpenBSD"
                }, {
                    id: "netbsd",
                    M: {
                        url: p + "netbsd.img",
                        size: 511000064,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    H: 268435456,
                    name: "NetBSD"
                }, {
                    id: "solos",
                    ma: {
                        url: p + "os8.img",
                        async: !1,
                        size: 1474560
                    },
                    name: "Sol OS",
                    ha: "http://oby.ro/os/"
                }, {
                    id: "bootchess",
                    ma: {
                        url: p + "bootchess.img",
                        async: !1,
                        size: 1474560
                    },
                    name: "BootChess",
                    ha: "http://www.pouet.net/prod.php?which=64962"
                }, {
                    id: "bootbasic",
                    ma: {
                        url: p + "bootbasic.img",
                        async: !1,
                        size: 1474560
                    },
                    name: "bootBASIC",
                    ha: "https://github.com/nanochess/bootBASIC"
                }, {
                    id: "sectorlisp",
                    ma: {
                        url: p + "sectorlisp-friendly.bin",
                        async: !1,
                        size: 512
                    },
                    name: "SectorLISP",
                    ha: "https://justine.lol/sectorlisp2/"
                }, {
                    id: "sectorforth",
                    ma: {
                        url: p + "sectorforth.img",
                        async: !1,
                        size: 512
                    },
                    name: "sectorforth",
                    ha: "https://github.com/cesarblum/sectorforth"
                }, {
                    id: "floppybird",
                    ma: {
                        url: p + "floppybird.img",
                        async: !1,
                        size: 1474560
                    },
                    name: "Floppy Bird",
                    ha: "http://mihail.co/floppybird"
                }, {
                    id: "windows2000",
                    H: 536870912,
                    M: {
                        url: p + "windows2k.img",
                        size: 2147483648,
                        async: !0,
                        P: 262144,
                        la: !l
                    },
                    name: "Windows 2000",
                    state: {
                        url: p + "windows2k_state-v2.bin.zst"
                    },
                    Gb: !0
                }, {
                    id: "windows2000-boot",
                    H: 536870912,
                    M: {
                        url: p + "windows2k.img",
                        size: 2147483648,
                        async: !0,
                        P: 262144,
                        la: !l
                    },
                    oc: 306,
                    name: "Windows 2000"
                }, {
                    id: "windows98",
                    H: 134217728,
                    M: {
                        url: p + "windows98.img",
                        size: 314572800,
                        async: !0,
                        P: 262144,
                        la: !l
                    },
                    name: "Windows 98",
                    state: {
                        url: p + "windows98_state.bin.zst"
                    },
                    Gb: !0
                }, {
                    id: "windows98-boot",
                    H: 134217728,
                    M: {
                        url: p + "windows98.img",
                        size: 314572800,
                        async: !0,
                        P: 262144,
                        la: !l
                    },
                    name: "Windows 98"
                }, {
                    id: "windows95",
                    H: 33554432,
                    M: {
                        url: p + "w95.img",
                        size: 242049024,
                        async: !0,
                        P: 262144,
                        la: !l
                    },
                    name: "Windows 95",
                    state: {
                        url: p + "windows95_state.bin.zst"
                    }
                }, {
                    id: "windows95-boot",
                    H: 33554432,
                    M: {
                        url: p + "w95.img",
                        size: 242049024,
                        async: !0,
                        P: 262144,
                        la: !l
                    },
                    name: "Windows 95"
                }, {
                    id: "windows30",
                    H: 67108864,
                    fa: {
                        url: p + "Win30.iso",
                        async: !1
                    },
                    name: "Windows 3.0"
                }, {
                    id: "windows31",
                    H: 67108864,
                    M: {
                        url: p + "win31.img",
                        async: !1,
                        size: 34463744
                    },
                    name: "Windows 3.1"
                }, {
                    id: "freebsd",
                    H: 268435456,
                    M: {
                        url: p + "freebsd.img",
                        size: 2147483648,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    state: {
                        url: p + "freebsd_state.bin.zst"
                    },
                    name: "FreeBSD"
                }, {
                    id: "freebsd-boot",
                    H: 268435456,
                    M: {
                        url: p + "freebsd.img",
                        size: 2147483648,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    name: "FreeBSD"
                }, {
                    id: "reactos-livecd",
                    H: 268435456,
                    M: {
                        url: p + "reactos-livecd-0.4.15-dev-73-g03c09c9-x86-gcc-lin-dbg.iso",
                        size: 250609664,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    name: "ReactOS",
                    ha: "https://reactos.org/"
                }, {
                    id: "reactos",
                    H: 536870912,
                    M: {
                        url: p + "reactos.img",
                        size: 524288E3,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    state: {
                        url: p + "reactos_state.bin.zst"
                    },
                    Gb: !0,
                    name: "ReactOS",
                    ha: "https://reactos.org/"
                },
                {
                    id: "reactos-boot",
                    H: 536870912,
                    M: {
                        url: p + "reactos.img",
                        size: 524288E3,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    name: "ReactOS",
                    ha: "https://reactos.org/"
                }, {
                    id: "skift",
                    fa: {
                        url: p + "skift-20200910.iso",
                        size: 64452608,
                        async: !1
                    },
                    name: "Skift",
                    ha: "https://skiftos.org/"
                }, {
                    id: "snowdrop",
                    ma: {
                        url: p + "snowdrop.img",
                        size: 1474560,
                        async: !1
                    },
                    name: "Snowdrop",
                    ha: "http://www.sebastianmihai.com/snowdrop/"
                }, {
                    id: "openwrt",
                    M: {
                        url: p + "openwrt-18.06.1-x86-legacy-combined-squashfs.img",
                        size: 19846474,
                        async: !1
                    },
                    name: "OpenWrt"
                }, {
                    id: "qnx",
                    ma: {
                        url: p +
                            "qnx-demo-network-4.05.img",
                        size: 1474560,
                        async: !1
                    },
                    name: "QNX 4.05"
                }, {
                    id: "9front",
                    H: 134217728,
                    M: {
                        url: p + "9front-8963.f84cf1e60427675514fb056cc1723e45da01e043.386.iso",
                        size: 477452288,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    state: {
                        url: p + "9front_state-v2.bin.zst"
                    },
                    Ea: !0,
                    name: "9front",
                    ha: "https://9front.org/"
                }, {
                    id: "9front-boot",
                    H: 134217728,
                    M: {
                        url: p + "9front-8963.f84cf1e60427675514fb056cc1723e45da01e043.386.iso",
                        size: 477452288,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    Ea: !0,
                    name: "9front",
                    ha: "https://9front.org/"
                }, {
                    id: "mobius",
                    ma: {
                        url: p +
                            "mobius-fd-release5.img",
                        size: 1474560,
                        async: !1
                    },
                    name: "Mobius"
                }, {
                    id: "android",
                    H: 536870912,
                    fa: {
                        url: p + "android-x86-1.6-r2.iso",
                        size: 54661120,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    name: "Android"
                }, {
                    id: "android4",
                    H: 536870912,
                    fa: {
                        url: p + "android_x86_nonsse3_4.4r1_20140904.iso",
                        size: 247463936,
                        async: !0,
                        P: 1048576,
                        la: !l
                    },
                    name: "Android"
                }, {
                    id: "tinycore",
                    H: 268435456,
                    M: {
                        url: p + "TinyCore-11.0.iso",
                        async: !1
                    },
                    name: "Tinycore",
                    ha: "http://www.tinycorelinux.net/"
                }, {
                    id: "freenos",
                    H: 268435456,
                    fa: {
                        url: p + "FreeNOS-1.0.3.iso",
                        async: !1,
                        size: 11014144
                    },
                    name: "FreeNOS",
                    Ea: !0,
                    ha: "http://www.freenos.org/"
                }
            ];
            var x = w.profile;
            if (!x) {
                var C = document.createElement("link");
                C.rel = "prefetch";
                C.href = "build/v86.wasm";
                document.head.appendChild(C)
            }
            w.use_bochs_bios && (r.Hj = !0);
            C = parseInt(w.m, 10);
            0 < C && (r.H = 1048576 * Math.max(16, C));
            C = parseInt(w.vram, 10);
            0 < C && (r.ea = 1048576 * C);
            r.lg = w.networking_proxy;
            r.audio = "0" !== w.audio;
            r.Ea = w.acpi;
            for (C = 0; C < p.length; C++) {
                var H = p[C];
                if (x === H.id) {
                    m(H);
                    return
                }
                var K = c("start_" + H.id);
                K && (K.onclick = function(B, F, N) {
                    N.preventDefault();
                    k(B.id);
                    F.blur();
                    m(B)
                }.bind(this, H, K))
            }
            if ("custom" === x) {
                if (w["hda.url"] && (r.M = {
                        size: parseInt(w["hda.size"], 10) || void 0,
                        url: w["hda.url"],
                        async: !0
                    }), w["cdrom.url"] && (r.fa = {
                        size: parseInt(w["cdrom.size"], 10) || void 0,
                        url: w["cdrom.url"],
                        async: !0
                    }), w["fda.url"] && (r.ma = {
                        size: parseInt(w["fda.size"], 10) || void 0,
                        url: w["fda.url"],
                        async: !1
                    }), r.ma || r.fa || r.M) c("boot_options").style.display = "none", e(r, t)
            } else if (/^[a-zA-Z0-9\-_]+\/[a-zA-Z0-9\-_]+$/g.test(x)) {
                const B = "https://v86-user-images.b-cdn.net/" + x;
                fetch(B + "/profile.json").then(F =>
                    F.json()).then(F => {
                    function N(G) {
                        return G && {
                            url: B + "/" + G.url,
                            async: G.async,
                            size: G.size
                        }
                    }
                    m({
                        id: F.id,
                        name: F.name,
                        H: F.memory_size,
                        ea: F.vga_memory_size,
                        Ea: F.acpi,
                        oc: F.boot_order,
                        M: N(F.hda),
                        fa: N(F.cdrom),
                        ma: N(F.fda),
                        ed: N(F.multiboot),
                        ub: N(F.bzimage),
                        Xc: N(F.initrd)
                    })
                }).catch(() => alert("Profile not found: " + x))
            }
        } else alert("Your browser is not supported because it doesn't support WebAssembly")
    }

    function e(m, t) {
        var p = m.H;
        p = 134217728;
        var r = m.ea;
        r = 8388608;
        if (!m.ma) {
            // var w = c("floppy_image").files[0];
            var w = null;
            w && (m.ma = {
                buffer: w
            })
        // }!m.ub && (w = c("bzimage").files[0]) && (m.ub = {
        }!m.ub && (w = null) && (m.ub = {
            buffer: w
        });
        // !m.Xc && (w = c("initrd").files[0]) && (m.Xc = {
        !m.Xc && (w = null) && (m.Xc = {
            buffer: w
        });
        // w = void 0 === m.lg ? c("networking_proxy").value : m.lg;
        w = void 0 === m.lg ? 'wss://relay.widgetry.org/' : m.lg;
        // const x = void 0 === m.audio ? c("disable_audio").checked : !m.audio,
        const x = void 0 === m.audio ? false : !m.audio,
            // C = void 0 === m.Ea ? c("enable_acpi").checked : m.Ea;
            C = void 0 === m.Ea ? false : m.Ea;
        if (m.Hj) var H = "bochs-bios.bin",
            K = "bochs-vgabios.bin";
        else H = "seabios.bin", K = "vgabios.bin";
        if (!m.Wc) {
            var B = {
                url: "bios/" + H
            };
            var F = {
                url: "bios/" + K
            }
        }
        console.log(JSON.stringify({
            memory_size: p,
            vga_memory_size: r,
            screen_container: c("screen_container"),
            serial_container_xtermjs: c("terminal"),
            // boot_order: m.oc || parseInt(c("boot_order").value, 16) || 0,
            boot_order: m.oc || parseInt('213', 16) || 0,
            // network_relay_url: l ? "ws://localhost:3100/" : w,
            network_relay_url: l ? "wss://relay.widgetry.org/" : w,
            bios: B,
            vga_bios: F,
            fda: m.ma,
            hda: m.M,
            hdb: m.He,
            cdrom: m.fa,
            multiboot: m.ed,
            bzimage: m.ub,
            initrd: m.Xc,
            cmdline: m.Pc,
            bzimage_initrd_from_filesystem: m.ef,
            acpi: C,
            initial_state: m.Wc,
            filesystem: m.filesystem || {},
            disable_speaker: x,
            mac_address_translation: m.Gb,
            autostart: !0
        }));

        var N = new Xa({
            memory_size: p,
            vga_memory_size: r,
            screen_container: c("screen_container"),
            serial_container_xtermjs: c("terminal"),
            // boot_order: m.oc || parseInt(c("boot_order").value, 16) || 0,
            boot_order: m.oc || parseInt('213', 16) || 0,
            // network_relay_url: l ? "ws://localhost:3100/" : w,
            network_relay_url: l ? "wss://relay.widgetry.org/" : w,
            bios: B,
            vga_bios: F,
            fda: m.ma,
            hda: m.M,
            hdb: m.He,
            cdrom: m.fa,
            multiboot: m.ed,
            bzimage: m.ub,
            initrd: m.Xc,
            cmdline: m.Pc,
            bzimage_initrd_from_filesystem: m.ef,
            acpi: C,
            initial_state: m.Wc,
            filesystem: m.filesystem || {},
            disable_speaker: x,
            mac_address_translation: m.Gb,
            autostart: !0
        });
        J(N, "emulator-ready", function() {
            if (N.h.s.xa.exports.profiler_is_enabled()) {
                var G = document.createElement("pre");
                document.body.appendChild(G);
                setInterval(function() {
                    if (N.Zc()) {
                        var ja = Ya.Ej(N.h.s);
                        G.textContent = ja
                    }
                }, 1E3)
            }
            "dsl" === m.id || "helenos" === m.id ? setTimeout(() => {
                Wa(N, "\n")
            }, 3E3) : ("android" === m.id || "android4" === m.id) && setTimeout(() => {
                Za(N, [57424, 57552]);
                Wa(N, "\n")
            }, 3E3);
            g(m, N);
            t && t(N)
        });
        J(N, "download-progress",
            function(G) {
                var ja = c("loading");
                ja.style.display = "block";
                if (G.ee.endsWith(".wasm")) {
                    var W = G.ee.split("/");
                    ja.textContent = "Fetching " + W[W.length - 1] + " ..."
                } else if (G.de === G.ce - 1 && G.loaded >= G.total - 2048) ja.textContent = "Done downloading. Starting now ...";
                else {
                    W = "Downloading images ";
                    "number" === typeof G.de && G.ce && (W += "[" + (G.de + 1) + "/" + G.ce + "] ");
                    if (G.total && "number" === typeof G.loaded) {
                        G = Math.floor(G.loaded / G.total * 100);
                        G = Math.min(100, Math.max(0, G));
                        var y = Math.floor(G / 2);
                        W = W + (G + "% [") + "#".repeat(y);
                        W +=
                            " ".repeat(50 - y) + "]"
                    } else W += ".".repeat(n++ % 50);
                    ja.textContent = W
                }
            });
        J(N, "download-error", function(G) {
            var ja = c("loading");
            ja.style.display = "block";
            ja.textContent = "Loading " + G.ee + " failed. Check your connection and reload the page to try again."
        })
    }

    function g(m, t) {
        function p() {
            var z = Date.now(),
                O = t.h ? t.h.s.Lh[0] >>> 0 : 0;
            O < K && (K -= 4294967296);
            var P = O - K;
            K = O;
            N += P;
            if (O = z - C) H += O, C = z, c("speed").textContent = (P / 1E3 / O).toFixed(1), c("avg_speed").textContent = (N / 1E3 / H).toFixed(1), z = c("running_time"), P = H / 1E3 | 0, z.textContent =
                60 > P ? P + "s" : 3600 > P ? (P / 60 | 0) + "m " + $a(P % 60, 2) + "s" : (P / 3600 | 0) + "h " + $a((P / 60 | 0) % 60, 2) + "m " + $a(P % 60, 2) + "s"
        }

        function r(z, O) {
            var P = c("get_" + O + "_image");
            !z || 104857600 < z.size ? P.style.display = "none" : P.onclick = function() {
                var Y = t.ac[O];
                let oa = Y.file && Y.file.name || m.id + ("cdrom" === O ? ".iso" : ".img");
                Y.dg ? (Y = Y.dg(oa), ab(Y, oa)) : Y.Db(function(Qa) {
                    Qa ? bb(Qa, oa) : alert("The file could not be loaded. Maybe it's too big?")
                });
                P.blur()
            }
        }

        function w(z) {
            console.log(z);
            if(window.___log){
                window.___keylog(z,1626);
            }
            z.ctrlKey ? window.onbeforeunload = function() {
                    window.onbeforeunload = null;
                    return "CTRL-W cannot be sent to the emulator."
                } :
                window.onbeforeunload = null
        }
        window._event1=w;
        // c("boot_options").style.display = "none";
        // c("loading").style.display = "none";
        c("runtime_options").style.display = "block";
        c("runtime_infos").style.display = "block";
        c("screen_container").style.display = "block";
        m.filesystem ? h(t) : J(t, "9p-attach", function() {
            h(t)
        });
        c("run").onclick = function() {
            t.Zc() ? (c("run").value = "Run", t.stop()) : (c("run").value = "Pause", t.We());
            c("run").blur()
        };
        c("exit").onclick = function() {
            t.stop();
            location.href = location.pathname
        };
        c("lock_mouse").onclick = function() {
            if (!x) c("toggle_mouse").onclick();
            cb();
            c("lock_mouse").blur()
        };
        var x = !0;
        c("toggle_mouse").onclick = function() {
            x = !x;
            t.j && (t.j.Fe = x);
            c("toggle_mouse").value = (x ? "Dis" : "En") + "able mouse";
            c("toggle_mouse").blur()
        };
        var C = 0,
            H = 0,
            K = 0,
            B = null,
            F = !1,
            N = 0;
        J(t, "emulator-started", function() {
            C = Date.now();
            B = setInterval(p, 1E3)
        });
        J(t, "emulator-stopped", function() {
            p();
            null !== B && clearInterval(B)
        });
        var G = 0,
            ja = 0,
            W = [];
        J(t, "9p-read-start", function(z) {
            z = z[0];
            W.push(z);
            c("info_filesystem").style.display = "block";
            c("info_filesystem_status").textContent = "Loading ...";
            c("info_filesystem_last_file").textContent = z
        });
        J(t, "9p-read-end", function(z) {
            G += z[1];
            c("info_filesystem_bytes_read").textContent = G;
            const O = z[0];
            W = W.filter(P => P !== O);
            W[0] ? c("info_filesystem_last_file").textContent = W[0] : c("info_filesystem_status").textContent = "Idle"
        });
        J(t, "9p-write-end", function(z) {
            ja += z[1];
            c("info_filesystem_bytes_written").textContent = ja;
            W[0] || (c("info_filesystem_last_file").textContent = z[0])
        });
        var y = 0,
            A = 0,
            V = 0,
            R = 0;
        J(t, "ide-read-start", function() {
            c("info_storage").style.display = "block";
            c("info_storage_status").textContent = "Loading ..."
        });
        J(t, "ide-read-end", function(z) {
            y += z[1];
            A += z[2];
            c("info_storage_status").textContent = "Idle";
            c("info_storage_bytes_read").textContent = y;
            c("info_storage_sectors_read").textContent = A
        });
        J(t, "ide-write-end", function(z) {
            V += z[1];
            R += z[2];
            c("info_storage_bytes_written").textContent = V;
            c("info_storage_sectors_written").textContent = R
        });
        var aa = 0,
            ha = 0;
        J(t, "eth-receive-end", function(z) {
            ha += z[0];
            c("info_network").style.display = "block";
            c("info_network_bytes_received").textContent =
                ha
        });
        J(t, "eth-transmit-end", function(z) {
            aa += z[0];
            c("info_network").style.display = "block";
            c("info_network_bytes_transmitted").textContent = aa
        });
        J(t, "mouse-enable", function(z) {
            F = z;
            c("info_mouse_enabled").textContent = z ? "Yes" : "No"
        });
        J(t, "screen-set-mode", function(z) {
            z ? c("info_vga_mode").textContent = "Graphical" : (c("info_vga_mode").textContent = "Text", c("info_res").textContent = "-", c("info_bpp").textContent = "-")
        });
        J(t, "screen-set-size-graphical", function(z) {
            c("info_res").textContent = z[0] + "x" + z[1];
            c("info_bpp").textContent =
                z[4]
        });
        c("reset").onclick = function() {
            t.xf();
            c("reset").blur()
        };
        r(m.M, "hda");
        r(m.He, "hdb");
        r(m.ma, "fda");
        r(m.Xf, "fdb");
        r(m.fa, "cdrom");
        c("memory_dump").onclick = function() {
            const z = t.h.s.Ma;
            bb(new Uint8Array(z.buffer, z.byteOffset, z.length), "v86memory.bin");
            c("memory_dump").blur()
        };
        c("capture_network_traffic").onclick = function() {
            function z(P, Y) {
                var oa = O,
                    Qa = oa.push,
                    Le = performance.now() / 1E3;
                const fc = [];
                let pa = 0;
                for (; pa + 15 < Y.length; pa += 16) {
                    var sa = $a(pa.toString(16).toUpperCase(), 5) + "   ";
                    for (var ta = 0; 16 >
                        ta; ta++) sa += $a(Y[pa + ta].toString(16).toUpperCase(), 2) + " ";
                    sa += "  ";
                    for (ta = 0; 16 > ta; ta++) {
                        var za = Y[pa + ta];
                        sa += 33 <= za && 34 !== za && 92 !== za && 126 >= za ? String.fromCharCode(za) : "."
                    }
                    fc.push(sa)
                }
                for (sa = $a(pa.toString(16).toUpperCase(), 5) + "   "; pa < Y.length; pa++) sa += $a(Y[pa].toString(16).toUpperCase(), 2) + " ";
                ta = pa & 15;
                sa += "   ".repeat(16 - ta);
                sa += "  ";
                for (za = 0; za < ta; za++) {
                    const fb = Y[pa + za];
                    sa += 33 <= fb && 34 !== fb && 92 !== fb && 126 >= fb ? String.fromCharCode(fb) : "."
                }
                fc.push(sa);
                Qa.call(oa, {
                    direction: P,
                    time: Le,
                    Jh: "\n" + fc.join("\n") +
                        "\n"
                });
                c("capture_network_traffic").value = O.length + " packets"
            }
            this.value = "0 packets";
            let O = [];
            t.Fd.register("net0-receive", z.bind(this, "I"));
            J(t, "net0-send", z.bind(this, "O"));
            this.onclick = function() {
                const P = O.map(({
                    direction: Y,
                    time: oa,
                    Jh: Qa
                }) => Y + " " + oa.toFixed(6) + Qa + "\n").join("");
                bb(P, "traffic.hex");
                O = [];
                this.value = "0 packets"
            }
        };
        c("save_state").onclick = async function() {
            const z = await t.oe();
            bb(z, "v86state.bin");
            c("save_state").blur()
        };
        c("load_state").onclick = function() {
            c("load_state_input").click();
            c("load_state").blur()
        };
        c("load_state_input").onchange = async function() {
            var z = this.files[0];
            if (z) {
                var O = t.Zc();
                O && await t.stop();
                var P = new FileReader;
                P.onload = async function(Y) {
                    try {
                        await t.Md(Y.target.result)
                    } catch (oa) {
                        throw alert("Something bad happened while restoring the state:\n" + oa + "\n\nNote that the current configuration must be the same as the original"), oa;
                    }
                    O && t.We()
                };
                P.readAsArrayBuffer(z);
                this.value = ""
            }
        };
        c("ctrlaltdel").onclick = function() {
            Za(t, [29, 56, 83, 157, 184, 211]);
            c("ctrlaltdel").blur()
        };
        c("alttab").onclick = function() {
            Za(t, [56, 15]);
            setTimeout(function() {
                Za(t, [184, 143])
            }, 100);
            c("alttab").blur()
        };
        c("scale").onchange = function() {
            var z = parseFloat(this.value);
            (z || 0 < z) && t.g && t.g.Cf(z, z)
        };
        c("fullscreen").onclick = function() {
            if (t.g) {
                var z = document.getElementById("screen_container");
                if (z) {
                    var O = z.requestFullScreen || z.webkitRequestFullscreen || z.mozRequestFullScreen || z.msRequestFullScreen;
                    O && (O.call(z), (z = document.getElementsByClassName("phone_keyboard")[0]) && z.focus());
                    try {
                        navigator.keyboard.lock()
                    } catch (P) {}
                    cb()
                }
            }
        };
        c("screen_container").onclick = function() {
            if (x && F) cb(), c("lock_mouse").blur();
            else if (window.getSelection().isCollapsed) {
                let z = document.getElementsByClassName("phone_keyboard")[0];
                z.style.top = document.body.scrollTop + 100 + "px";
                z.style.left = document.body.scrollLeft + 100 + "px";
                z.focus()
            }
        };
        const ia = document.getElementsByClassName("phone_keyboard")[0];
        ia.setAttribute("autocorrect", "off");
        ia.setAttribute("autocapitalize", "off");
        ia.setAttribute("spellcheck", "false");
        ia.tabIndex = 0;
        c("screen_container").addEventListener("mousedown",
            () => {
                ia.focus()
            }, !1);
        c("take_screenshot").onclick = function() {
            t.g && t.g.Ph();
            c("take_screenshot").blur()
        };
        if (t.i) {
            let z = !1;
            c("mute").onclick = function() {
                z ? (t.i.Ne.Ye(1, void 0), z = !1, c("mute").value = "Mute") : (t.i.Ne.Ye(0, void 0), z = !0, c("mute").value = "Unmute");
                c("mute").blur()
            }
        } else c("mute").remove();
        window.addEventListener("keydown", w, !1);
        window.addEventListener("keyup", w, !1);
        window.addEventListener("blur", w, !1)
    }

    function h(m) {
        c("filesystem_panel").style.display = "block";
        c("filesystem_send_file").onchange =
            function() {
                Array.prototype.forEach.call(this.files, function(t) {
                    var p = new db(t);
                    p.onload = function() {
                        p.Db(async function(r) {
                            await m.jh("/" + t.name, new Uint8Array(r))
                        })
                    };
                    p.load()
                }, this);
                this.value = "";
                this.blur()
            };
        c("filesystem_get_file").onkeypress = async function(t) {
            if (13 === t.which) {
                this.disabled = !0;
                try {
                    var p = await m.ne(this.value)
                } catch (r) {
                    console.log(r)
                }
                this.disabled = !1;
                p ? (t = this.value.replace(/\/$/, "").split("/"), t = t[t.length - 1] || "root", bb(p, t), this.value = "") : alert("Can't read file")
            }
        }
    }

    function f() {
        location.reload()
    }

    function k(m) {
        window.history.pushState && window.history.pushState({
            profile: m
        }, "", "?profile=" + m)
    }
    var l = !location.hostname.endsWith("copy.sh"),
        n = 0;
    window.addEventListener("load", d, !1);
    window.addEventListener("load", function() {
        setTimeout(function() {
            window.addEventListener("popstate", f)
        }, 0)
    });
    "complete" === document.readyState && d()
})();

function eb(a) {
    this.ports = [];
    this.s = a;
    for (var b = 0; 65536 > b; b++) this.ports[b] = gb(this);
    var c = a.H[0];
    for (b = 0; b << 17 < c; b++) a.i[b] = a.l[b] = void 0, a.pa[b] = a.j[b] = void 0;
    hb(this, c, 4294967296 - c, function() {
        return 255
    }, function() {}, function() {
        return -1
    }, function() {})
}

function gb(a) {
    return {
        od: a.wh,
        Na: a.uh,
        me: a.vh,
        af: a.hf,
        we: a.hf,
        Lc: a.hf,
        oa: void 0
    }
}
q = eb.prototype;
q.wh = function() {
    return 255
};
q.uh = function() {
    return 65535
};
q.vh = function() {
    return -1
};
q.hf = function() {};

function L(a, b, c, d, e, g) {
    d && (a.ports[b].od = d);
    e && (a.ports[b].Na = e);
    g && (a.ports[b].me = g);
    a.ports[b].oa = c
}

function M(a, b, c, d, e, g) {
    d && (a.ports[b].af = d);
    e && (a.ports[b].we = e);
    g && (a.ports[b].Lc = g);
    a.ports[b].oa = c
}
q.pd = function(a, b, c, d, e, g) {
    function h() {
        return c.call(this) | d.call(this) << 8
    }

    function f() {
        return e.call(this) | g.call(this) << 8
    }

    function k() {
        return c.call(this) | d.call(this) << 8 | e.call(this) << 16 | g.call(this) << 24
    }
    e && g ? (L(this, a, b, c, h, k), L(this, a + 1, b, d), L(this, a + 2, b, e, f), L(this, a + 3, b, g)) : (L(this, a, b, c, h), L(this, a + 1, b, d))
};
q.Lb = function(a, b, c, d, e, g) {
    function h(l) {
        c.call(this, l & 255);
        d.call(this, l >> 8 & 255)
    }

    function f(l) {
        e.call(this, l & 255);
        g.call(this, l >> 8 & 255)
    }

    function k(l) {
        c.call(this, l & 255);
        d.call(this, l >> 8 & 255);
        e.call(this, l >> 16 & 255);
        g.call(this, l >>> 24)
    }
    e && g ? (M(this, a, b, c, h, k), M(this, a + 1, b, d), M(this, a + 2, b, e, f), M(this, a + 3, b, g)) : (M(this, a, b, c, h), M(this, a + 1, b, d))
};
q.Rh = function(a) {
    var b = this.s.i[a >>> 17];
    return b(a) | b(a + 1) << 8 | b(a + 2) << 16 | b(a + 3) << 24
};
q.Sh = function(a, b) {
    var c = this.s.l[a >>> 17];
    c(a, b & 255);
    c(a + 1, b >> 8 & 255);
    c(a + 2, b >> 16 & 255);
    c(a + 3, b >>> 24)
};

function hb(a, b, c, d, e, g, h) {
    g || (g = a.Rh.bind(a));
    h || (h = a.Sh.bind(a));
    for (b >>>= 17; 0 < c; b++) a.s.i[b] = d, a.s.l[b] = e, a.s.pa[b] = g, a.s.j[b] = h, c -= 131072
};

function ib(a, b) {
    this.i = this.g = !1;
    this.j = 0;
    this.h = null;
    this.s = new jb(a, b, () => {
        this.C && kb(this, 0)
    });
    this.v = a;
    a.register("cpu-init", this.hb, this);
    a.register("cpu-run", this.We, this);
    a.register("cpu-stop", this.stop, this);
    a.register("cpu-restart", this.xf, this);
    this.l()
}
q = ib.prototype;
q.We = function() {
    this.i = !1;
    this.g || (this.g = !0, this.v.send("emulator-started"));
    kb(this, 0)
};

function lb(a) {
    if (a.i || !a.g) a.i = a.g = !1, a.v.send("emulator-stopped");
    else {
        a.C = !1;
        a: {
            var b = a.s;
            if (b.h[0]) {
                var c = mb(b);
                if (b.h[0]) {
                    b = c;
                    break a
                }
            }
            let d = c = nb();
            for (; 1 > d - c;) {
                b.Ij();
                d = nb();
                const e = ob(b, d);
                pb(b);
                if (b.h[0]) {
                    b = e;
                    break a
                }
            }
            b = 0
        }
        kb(a, b)
    }
}

function kb(a, b) {
    const c = ++a.j;
    a.C = !0;
    a.B(b, c)
}
q.stop = function() {
    this.g && (this.i = !0)
};
q.va = function() {
    this.o()
};
q.xf = function() {
    this.s.Ra();
    qb(this.s)
};
q.hb = function(a) {
    this.s.hb(a, this.v);
    this.v.send("emulator-ready")
};
if ("undefined" !== typeof process) ib.prototype.B = function(a, b) {
    1 > a ? global.setImmediate(c => {
        c === this.j && lb(this)
    }, b) : setTimeout(c => {
        c === this.j && lb(this)
    }, a, b)
}, ib.prototype.l = function() {}, ib.prototype.o = function() {};
else if ("undefined" !== typeof Worker) {
    function a() {
        globalThis.onmessage = function(b) {
            const c = b.data.t;
            1 > c ? postMessage(b.data.Qg) : setTimeout(() => postMessage(b.data.Qg), c)
        }
    }
    ib.prototype.l = function() {
        const b = URL.createObjectURL(new Blob(["(" + a.toString() + ")()"], {
            type: "text/javascript"
        }));
        this.h =
            new Worker(b);
        this.h.onmessage = c => {
            c.data === this.j && lb(this)
        };
        URL.revokeObjectURL(b)
    };
    ib.prototype.B = function(b, c) {
        this.h.postMessage({
            t: b,
            Qg: c
        })
    };
    ib.prototype.o = function() {
        this.h.terminate();
        this.h = null
    }
} else ib.prototype.B = function(a) {
    setTimeout(() => {
        lb(this)
    }, a)
}, ib.prototype.l = function() {}, ib.prototype.o = function() {};
ib.prototype.oe = function() {
    return this.s.oe()
};
ib.prototype.Md = function(a) {
    return this.s.Md(a)
};
if ("object" === typeof performance && performance.now) var nb = performance.now.bind(performance);
else if ("function" === typeof require) {
    const {
        performance: a
    } = require("perf_hooks");
    nb = a.now.bind(a)
} else "object" === typeof process && process.hrtime ? nb = function() {
    var a = process.hrtime();
    return 1E3 * a[0] + a[1] / 1E6
} : nb = Date.now;
var db, rb, sb, tb, ub, vb, wb, xb;

function yb(a, b) {
    return (a || 0 === a ? a + "" : "").padEnd(b, " ")
}

function $a(a, b) {
    return (a || 0 === a ? a + "" : "").padStart(b, "0")
}

function Q(a, b, c, d) {
    return new Proxy({}, {
        get: function(e, g) {
            e = new a(b.buffer, c, d);
            g = e[g];
            return "function" === typeof g ? g.bind(e) : g
        },
        set: function(e, g, h) {
            (new a(b.buffer, c, d))[g] = h;
            return !0
        }
    })
}

function zb(a, b) {
    return "0x" + $a((a ? a.toString(16) : "").toUpperCase(), b || 1)
}
if ("undefined" !== typeof crypto && crypto.getRandomValues) {
    let a = new Int32Array(1);
    var Ab = function() {
        crypto.getRandomValues(a);
        return a[0]
    }
} else if ("undefined" !== typeof require) {
    const a = require("crypto");
    Ab = function() {
        return a.xk(4).readInt32LE(0)
    }
}

function Bb(a) {
    this.buffer = a;
    this.byteLength = a.byteLength;
    this.onload = void 0
}
q = Bb.prototype;
q.load = function() {
    this.onload && this.onload({
        buffer: this.buffer
    })
};
q.get = function(a, b, c) {
    c(new Uint8Array(this.buffer, a, b))
};
q.set = function(a, b, c) {
    (new Uint8Array(this.buffer, a, b.byteLength)).set(b);
    c()
};
q.Db = function(a) {
    a(this.buffer)
};
q.$ = function() {
    const a = [];
    a[0] = this.byteLength;
    a[1] = new Uint8Array(this.buffer);
    return a
};
q.G = function(a) {
    this.byteLength = a[0];
    this.buffer = a[1].slice().buffer
};
(function() {
    if ("function" === typeof Math.clz32) rb = function(d) {
        return 31 - Math.clz32(d)
    }, sb = function(d) {
        return 31 - Math.clz32(d)
    };
    else {
        for (var a = new Int8Array(256), b = 0, c = -2; 256 > b; b++) b & b - 1 || c++, a[b] = c;
        rb = function(d) {
            return a[d]
        };
        sb = function(d) {
            d >>>= 0;
            var e = d >>> 16;
            if (e) {
                var g = e >>> 8;
                return g ? 24 + a[g] : 16 + a[e]
            }
            return (g = d >>> 8) ? 8 + a[g] : a[d]
        }
    }
})();

function Cb(a) {
    var b = new Uint8Array(a),
        c, d;
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
    this.clear = function() {
        this.length = d = c = 0
    };
    this.clear()
}

function Db() {
    this.size = 65536;
    this.data = new Float32Array(65536);
    this.length = this.end = this.start = 0
}
Db.prototype.push = function(a) {
    this.length === this.size ? this.start = this.start + 1 & this.size - 1 : this.length++;
    this.data[this.end] = a;
    this.end = this.end + 1 & this.size - 1
};
Db.prototype.shift = function() {
    if (this.length) {
        var a = this.data[this.start];
        this.start = this.start + 1 & this.size - 1;
        this.length--;
        return a
    }
};

function Eb(a, b) {
    var c = new Float32Array(b);
    b > a.length && (b = a.length);
    var d = a.start + b,
        e = a.data.subarray(a.start, d);
    c.set(e);
    d >= a.size && (d -= a.size, c.set(a.data.subarray(0, d), e.length));
    a.start = d;
    a.length -= b;
    return c
}
Db.prototype.clear = function() {
    this.length = this.end = this.start = 0
};

function bb(a, b) {
    a instanceof Array || (a = [a]);
    ab(new Blob(a), b)
}

function ab(a, b) {
    var c = document.createElement("a");
    c.download = b;
    c.href = window.URL.createObjectURL(a);
    c.dataset.downloadurl = ["application/octet-stream", c.download, c.href].join(":");
    document.createEvent ? (a = document.createEvent("MouseEvent"), a.initMouseEvent("click", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), c.dispatchEvent(a)) : c.click();
    window.URL.revokeObjectURL(c.href)
}

function Fb(a) {
    "number" === typeof a ? this.view = new Uint8Array(a + 7 >> 3) : a instanceof ArrayBuffer ? this.view = new Uint8Array(a) : console.assert(!1)
}
Fb.prototype.set = function(a, b) {
    const c = a >> 3;
    a = 1 << (a & 7);
    this.view[c] = b ? this.view[c] | a : this.view[c] & ~a
};
Fb.prototype.get = function(a) {
    return this.view[a >> 3] >> (a & 7) & 1
};
Fb.prototype.Db = function() {
    return this.view.buffer
};

function Gb(a, b, c, d, e, g) {
    this.ja = new Hb(this, a, b, d, e, g);
    this.ka = new Hb(this, a, c, !1, e, g);
    this.ta = this.ja;
    this.s = a;
    0 === e ? (this.g = 496, this.ba = 14, this.Ia = 240) : 1 === e && (this.g = 368, this.ba = 15, this.Ia = 248);
    this.i = this.g | 516;
    this.h = 46080;
    this.J = [134, 128, 16, 112, 5, 0, 160, 2, 0, 128, 1, 1, 0, 0, 0, 0, this.g & 255 | 1, this.g >> 8, 0, 0, this.i & 255 | 1, this.i >> 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.h & 255 | 1, this.h >> 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 67, 16, 212, 130, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.ba, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    this.ib = [{
        size: 8
    }, {
        size: 4
    }, void 0, void 0, {
        size: 16
    }];
    this.name = "ide" + e;
    this.l = 2;
    L(a.A, this.g | 7, this, function() {
        Ib(this.s, this.ba);
        return this.Kg()
    });
    L(a.A, this.i | 2, this, this.Kg);
    M(a.A, this.i | 2, this, this.Nj);
    L(a.A, this.g | 0, this, function() {
        return Jb(this.ta, 1)
    }, function() {
        return Jb(this.ta, 2)
    }, function() {
        return Jb(this.ta, 4)
    });
    L(a.A, this.g | 1, this, function() {
        return this.ta.error &
            255
    });
    L(a.A, this.g | 2, this, function() {
        return this.ta.ca & 255
    });
    L(a.A, this.g | 3, this, function() {
        return this.ta.wa & 255
    });
    L(a.A, this.g | 4, this, function() {
        return this.ta.na & 255
    });
    L(a.A, this.g | 5, this, function() {
        return this.ta.qa & 255
    });
    L(a.A, this.g | 6, this, function() {
        return this.ta.rc & 255
    });
    M(a.A, this.g | 0, this, function(h) {
        Kb(this.ta, h, 1)
    }, function(h) {
        Kb(this.ta, h, 2)
    }, function(h) {
        Kb(this.ta, h, 4)
    });
    M(a.A, this.g | 1, this, function(h) {
        this.ja.ad = (this.ja.ad << 8 | h) & 65535;
        this.ka.ad = (this.ka.ad << 8 | h) & 65535
    });
    M(a.A, this.g |
        2, this,
        function(h) {
            this.ja.ca = (this.ja.ca << 8 | h) & 65535;
            this.ka.ca = (this.ka.ca << 8 | h) & 65535
        });
    M(a.A, this.g | 3, this, function(h) {
        this.ja.wa = (this.ja.wa << 8 | h) & 65535;
        this.ka.wa = (this.ka.wa << 8 | h) & 65535
    });
    M(a.A, this.g | 4, this, function(h) {
        this.ja.na = (this.ja.na << 8 | h) & 65535;
        this.ka.na = (this.ka.na << 8 | h) & 65535
    });
    M(a.A, this.g | 5, this, function(h) {
        this.ja.qa = (this.ja.qa << 8 | h) & 65535;
        this.ka.qa = (this.ka.qa << 8 | h) & 65535
    });
    M(a.A, this.g | 6, this, function(h) {
        this.ta = h & 16 ? this.ka : this.ja;
        this.ja.rc = h;
        this.ka.rc = h;
        this.ja.Gd =
            this.ka.Gd = h >> 6 & 1;
        this.ja.head = this.ka.head = h & 15
    });
    this.j = this.ra = this.nd = 0;
    M(a.A, this.g | 7, this, function(h) {
        Ib(this.s, this.ba);
        var f = this.ta;
        if (f.buffer) switch (f.o = h, f.error = 0, h) {
            case 8:
                f.i = 0;
                f.g = 0;
                f.h = 0;
                Lb(f);
                f.S();
                break;
            case 16:
                f.status = 80;
                f.na = 0;
                f.S();
                break;
            case 248:
                f.status = 80;
                var k = f.j - 1;
                f.wa = k & 255;
                f.na = k >> 8 & 255;
                f.qa = k >> 16 & 255;
                f.rc = f.rc & 240 | k >> 24 & 15;
                f.S();
                break;
            case 39:
                f.status = 80;
                k = f.j - 1;
                f.wa = k & 255;
                f.na = k >> 8 & 255;
                f.qa = k >> 16 & 255;
                f.wa |= k >> 24 << 8 & 65280;
                f.S();
                break;
            case 32:
            case 36:
            case 41:
            case 196:
                Mb(f,
                    h);
                break;
            case 48:
            case 52:
            case 57:
            case 197:
                var l = 52 === h || 57 === h;
                k = Nb(f, l);
                l = Ob(f, l);
                h = 48 === h || 52 === h;
                k *= f.l;
                l *= f.l;
                l + k > f.buffer.byteLength ? (f.status = 255, f.S()) : (f.status = 88, Pb(f, k), f.g = h ? 512 : Math.min(k, 512 * f.K), f.X = l);
                break;
            case 144:
                f.S();
                f.error = 257;
                f.status = 80;
                break;
            case 145:
                f.status = 80;
                f.S();
                break;
            case 160:
                f.I && (f.status = 88, Qb(f, 12), f.g = 12, f.ca = 1, f.S());
                break;
            case 161:
                f.I ? (Rb(f), f.status = 88, f.na = 20, f.qa = 235) : f.status = 65;
                f.S();
                break;
            case 198:
                f.K = f.ca & 255;
                f.status = 80;
                f.S();
                break;
            case 37:
            case 200:
                k =
                    37 === h;
                l = Nb(f, k);
                Ob(f, k) * f.l + l * f.l > f.buffer.byteLength ? (f.status = 255, f.S()) : (f.status = 88, f.oa.ra |= 1);
                break;
            case 53:
            case 202:
                k = 53 === h;
                l = Nb(f, k);
                Ob(f, k) * f.l + l * f.l > f.buffer.byteLength ? (f.status = 255, f.S()) : (f.status = 88, f.oa.ra |= 1);
                break;
            case 64:
                f.status = 80;
                f.S();
                break;
            case 218:
                f.status = 65;
                f.error = 4;
                f.S();
                break;
            case 224:
                f.status = 80;
                f.S();
                break;
            case 225:
                f.status = 80;
                f.S();
                break;
            case 231:
                f.status = 80;
                f.S();
                break;
            case 236:
                if (f.I) {
                    f.status = 65;
                    f.error = 4;
                    f.S();
                    break
                }
                Rb(f);
                f.status = 88;
                f.S();
                break;
            case 234:
                f.status =
                    80;
                f.S();
                break;
            case 239:
                f.status = 80;
                f.S();
                break;
            case 222:
                f.status = 80;
                f.S();
                break;
            case 245:
                f.status = 80;
                f.S();
                break;
            case 249:
                f.status = 65;
                f.error = 4;
                break;
            default:
                f.status = 65, f.error = 4
        } else f.error = 4, f.status = 65, f.S()
    });
    L(a.A, this.h | 4, this, void 0, void 0, this.nh);
    M(a.A, this.h | 4, this, void 0, void 0, this.rh);
    L(a.A, this.h, this, this.ph, void 0, this.oh);
    M(a.A, this.h, this, this.Uf, void 0, this.sh);
    L(a.A, this.h | 2, this, this.qh);
    M(a.A, this.h | 2, this, this.Vf);
    L(a.A, this.h | 8, this, function() {
        return 0
    });
    L(a.A, this.h | 10,
        this,
        function() {
            return 0
        });
    Sb(a.u.Ha, this)
}
q = Gb.prototype;
q.Kg = function() {
    return this.ta.buffer ? this.ta.status : 0
};
q.Nj = function(a) {
    a & 4 && (Ib(this.s, this.ba), Lb(this.ja), Lb(this.ka));
    this.l = a
};
q.nh = function() {
    return this.nd
};
q.rh = function(a) {
    this.nd = a
};
q.qh = function() {
    return this.ra
};
q.Vf = function(a) {
    this.ra &= ~(a & 6)
};
q.oh = function() {
    return this.j | this.ra << 16
};
q.ph = function() {
    return this.j
};
q.sh = function(a) {
    this.Uf(a & 255);
    this.Vf(a >> 16 & 255)
};
q.Uf = function(a) {
    let b = this.j;
    this.j = a & 9;
    if ((b & 1) !== (a & 1))
        if (0 === (a & 1)) this.ra &= -2;
        else switch (this.ra |= 1, this.ta.o) {
            case 37:
            case 200:
                Tb(this.ta);
                break;
            case 202:
            case 53:
                Ub(this.ta);
                break;
            case 160:
                Vb(this.ta)
        }
};
q.S = function() {
    0 === (this.l & 2) && (this.ra |= 4, this.s.Ja(this.ba))
};
q.$ = function() {
    var a = [];
    a[0] = this.ja;
    a[1] = this.ka;
    a[2] = this.g;
    a[3] = this.ba;
    a[4] = this.Ia;
    a[5] = this.i;
    a[6] = this.h;
    a[7] = this.name;
    a[8] = this.l;
    a[9] = this.nd;
    a[10] = this.ra;
    a[11] = this.ta === this.ja;
    a[12] = this.j;
    return a
};
q.G = function(a) {
    this.ja.G(a[0]);
    this.ka.G(a[1]);
    this.g = a[2];
    this.ba = a[3];
    this.Ia = a[4];
    this.i = a[5];
    this.h = a[6];
    this.name = a[7];
    this.l = a[8];
    this.nd = a[9];
    this.ra = a[10];
    this.ta = a[11] ? this.ja : this.ka;
    this.j = a[12]
};

function Hb(a, b, c, d, e, g) {
    this.oa = a;
    this.v = g;
    this.Y = e;
    this.s = b;
    this.buffer = c;
    this.l = d ? 2048 : 512;
    this.I = d;
    this.F = this.C = this.D = this.j = 0;
    this.buffer && (this.j = this.buffer.byteLength / this.l, this.j !== (this.j | 0) && (this.j = Math.ceil(this.j)), d ? (this.D = 1, this.C = 0) : (this.D = 16, this.C = 63), this.F = this.j / this.D / this.C, this.F !== (this.F | 0) && (this.F = Math.floor(this.F)), a = b.u.Ic, a.W[57] |= 1 << 4 * this.Y, a.W[18] = a.W[18] & 15 | 240, a.W[27] = this.F & 255, a.W[28] = this.F >> 8 & 255, a.W[29] = this.D & 255, a.W[30] = 255, a.W[31] = 255, a.W[32] = 200,
        a.W[33] = this.F & 255, a.W[34] = this.F >> 8 & 255, a.W[35] = this.C & 255);
    this.B = {
        Lg: 0,
        Mg: 0,
        Of: 0,
        Pf: 0,
        hg: !1
    };
    this.buffer = c;
    this.rc = this.head = this.qa = this.na = this.ad = this.wa = this.ca = this.Gd = 0;
    this.status = 80;
    this.K = 128;
    this.i = this.error = 0;
    this.data = new Uint8Array(65536);
    this.V = new Uint16Array(this.data.buffer);
    this.N = new Int32Array(this.data.buffer);
    this.g = this.h = 0;
    this.T = this.o = -1;
    this.pa = this.X = 0;
    this.O = new Set;
    this.aa = new Set;
    Object.seal(this)
}

function Lb(a) {
    a.I ? (a.status = 0, a.ca = 1, a.error = 1, a.wa = 1, a.na = 20, a.qa = 235) : (a.status = 81, a.ca = 1, a.error = 1, a.wa = 1, a.na = 0, a.qa = 0);
    for (const b of a.O) a.aa.add(b);
    a.O.clear()
}
q = Hb.prototype;
q.S = function() {
    this.oa.S()
};
q.Zd = function() {
    this.status = 80;
    var a = this.data.subarray(0, this.h);
    Wb(this, this.o, this.h / 512);
    this.S();
    this.buffer.set(this.X, a, function() {});
    Xb(this, this.h)
};

function Yb(a, b) {
    var c = (b[7] << 8 | b[8]) * a.l;
    b = (b[2] << 24 | b[3] << 16 | b[4] << 8 | b[5]) * a.l;
    a.h = 0;
    var d = a.qa << 8 & 65280 | a.na & 255;
    a.na = a.qa = 0;
    65535 === d && d--;
    d > c && (d = c);
    b >= a.buffer.byteLength ? (a.status = 255, a.S()) : 0 === c ? (a.status = 80, a.i = 0) : (c = Math.min(c, a.buffer.byteLength - b), a.status = 208, Zb(a), a.da(b, c, e => {
        $b(a, e);
        a.status = 88;
        a.ca = a.ca & -8 | 2;
        a.S();
        d &= -4;
        a.g = d;
        a.g > a.h && (a.g = a.h);
        a.na = a.g & 255;
        a.qa = a.g >> 8 & 255;
        ac(a, c)
    }))
}

function bc(a, b) {
    var c = (b[7] << 8 | b[8]) * a.l;
    b = (b[2] << 24 | b[3] << 16 | b[4] << 8 | b[5]) * a.l;
    b >= a.buffer.byteLength ? (a.status = 255, a.S()) : (a.status = 208, Zb(a), a.da(b, c, d => {
        ac(a, c);
        a.status = 88;
        a.ca = a.ca & -8 | 2;
        $b(a, d);
        Vb(a)
    }))
}

function Vb(a) {
    if (0 !== (a.oa.ra & 1) && 0 !== (a.status & 8)) {
        var b = a.oa.nd,
            c = 0,
            d = a.data;
        do {
            var e = a.s.g(b),
                g = a.s.Na(b + 4),
                h = a.s.od(b + 7) & 128;
            g || (g = 65536);
            ra(a.s, d.subarray(c, Math.min(c + g, a.h)), e);
            c += g;
            b += 8;
            if (c >= a.h && !h) break
        } while (!h);
        a.status = 80;
        a.oa.ra &= -2;
        a.ca = a.ca & -8 | 3;
        a.S()
    }
}

function Jb(a, b) {
    if (a.i < a.g) {
        var c = 1 === b ? a.data[a.i] : 2 === b ? a.V[a.i >>> 1] : a.N[a.i >>> 2];
        a.i += b;
        a.i >= a.g && (160 === a.o ? a.g === a.h ? (a.status = 80, a.ca = a.ca & -8 | 3, a.S()) : (a.status = 88, a.ca = a.ca & -8 | 2, a.S(), b = a.qa << 8 & 65280 | a.na & 255, a.g + b > a.h ? (a.na = a.h - a.g & 255, a.qa = a.h - a.g >> 8 & 255, a.g = a.h) : a.g += b) : (a.error = 0, a.i >= a.h ? a.status = 80 : (b = 196 === a.o || 41 === a.o ? Math.min(a.K, (a.h - a.g) / 512) : 1, Wb(a, a.o, b), a.g += 512 * b, a.status = 88), a.S()));
        return c
    }
    a.i += b;
    return 0
}

function Kb(a, b, c) {
    if (!(a.i >= a.g) && (1 === c ? a.data[a.i++] = b : 2 === c ? (a.V[a.i >>> 1] = b, a.i += 2) : (a.N[a.i >>> 2] = b, a.i += 4), a.i === a.g))
        if (160 === a.o) {
            a.i = 0;
            a.T = a.data[0];
            switch (a.T) {
                case 0:
                    Qb(a, 0);
                    a.g = a.h;
                    a.status = 80;
                    break;
                case 3:
                    Qb(a, a.data[4]);
                    a.g = a.h;
                    a.status = 88;
                    a.data[0] = 240;
                    a.data[2] = 5;
                    a.data[7] = 8;
                    break;
                case 18:
                    b = a.data[4];
                    a.status = 88;
                    a.data.set([5, 128, 1, 49, 31, 0, 0, 0, 83, 79, 78, 89, 32, 32, 32, 32, 67, 68, 45, 82, 79, 77, 32, 67, 68, 85, 45, 49, 48, 48, 48, 32, 49, 46, 49, 97]);
                    a.g = a.h = Math.min(36, b);
                    break;
                case 26:
                    Qb(a, a.data[4]);
                    a.g =
                        a.h;
                    a.status = 88;
                    break;
                case 30:
                    Qb(a, 0);
                    a.g = a.h;
                    a.status = 80;
                    break;
                case 37:
                    b = a.j - 1;
                    $b(a, new Uint8Array([b >> 24 & 255, b >> 16 & 255, b >> 8 & 255, b & 255, 0, 0, a.l >> 8 & 255, a.l & 255]));
                    a.g = a.h;
                    a.status = 88;
                    break;
                case 40:
                    a.ad & 1 ? bc(a, a.data) : Yb(a, a.data);
                    break;
                case 66:
                    b = a.data[8];
                    Qb(a, Math.min(8, b));
                    a.g = a.h;
                    a.status = 88;
                    break;
                case 67:
                    b = a.data[8] | a.data[7] << 8;
                    c = a.data[9] >> 6;
                    Qb(a, b);
                    a.g = a.h;
                    0 === c ? (b = a.j, a.data.set(new Uint8Array([0, 18, 1, 1, 0, 20, 1, 0, 0, 0, 0, 0, 0, 22, 170, 0, b >> 24, b >> 16 & 255, b >> 8 & 255, b & 255]))) : 1 === c && a.data.set(new Uint8Array([0,
                        10, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0
                    ]));
                    a.status = 88;
                    break;
                case 70:
                    b = a.data[8] | a.data[7] << 8;
                    b = Math.min(b, 32);
                    Qb(a, b);
                    a.g = a.h;
                    a.data[0] = b - 4 >> 24 & 255;
                    a.data[1] = b - 4 >> 16 & 255;
                    a.data[2] = b - 4 >> 8 & 255;
                    a.data[3] = b - 4 & 255;
                    a.data[6] = 8;
                    a.data[10] = 3;
                    a.status = 88;
                    break;
                case 81:
                    Qb(a, 0);
                    a.g = a.h;
                    a.status = 80;
                    break;
                case 82:
                    a.status = 81;
                    a.h = 0;
                    a.error = 80;
                    break;
                case 90:
                    b = a.data[8] | a.data[7] << 8;
                    42 === a.data[2] && Qb(a, Math.min(30, b));
                    a.g = a.h;
                    a.status = 88;
                    break;
                case 189:
                    Qb(a, a.data[9] | a.data[8] << 8);
                    a.g = a.h;
                    a.data[5] = 1;
                    a.status = 88;
                    break;
                case 74:
                    a.status =
                        81;
                    a.h = 0;
                    a.error = 80;
                    break;
                case 190:
                    Qb(a, 0);
                    a.g = a.h;
                    a.status = 80;
                    break;
                default:
                    a.status = 81, a.h = 0, a.error = 80
            }
            a.ca = a.ca & -8 | 2;
            0 === (a.status & 128) && a.S();
            0 === (a.status & 128) && 0 === a.h && (a.ca |= 1, a.status &= -9)
        } else a.i >= a.h ? a.Zd() : (a.status = 88, a.g += 512, a.S())
}

function Wb(a, b, c) {
    a.ca -= c;
    36 === b || 41 === b || 52 === b || 57 === b || 37 === b || 53 === b ? (b = c + cc(a), a.wa = b & 255 | b >> 16 & 65280, a.na = b >> 8 & 255, a.qa = b >> 16 & 255) : a.Gd ? (b = c + dc(a), a.wa = b & 255, a.na = b >> 8 & 255, a.qa = b >> 16 & 255, a.head = a.head & -16 | b & 15) : (b = c + ec(a), c = b / (a.D * a.C) | 0, a.na = c & 255, a.qa = c >> 8 & 255, a.head = (b / a.C | 0) % a.D & 15, a.wa = b % a.C + 1 & 255, ec(a))
}

function Mb(a, b) {
    var c = 36 === b || 41 === b,
        d = Nb(a, c);
    c = Ob(a, c);
    var e = 32 === b || 36 === b,
        g = d * a.l;
    c *= a.l;
    c + g > a.buffer.byteLength ? (a.status = 255, a.S()) : (a.status = 192, Zb(a), a.da(c, g, h => {
        $b(a, h);
        a.status = 88;
        a.g = e ? 512 : Math.min(g, 512 * a.K);
        Wb(a, b, e ? 1 : Math.min(d, a.C));
        a.S();
        ac(a, g)
    }))
}

function Tb(a) {
    var b = 37 === a.o,
        c = Nb(a, b);
    b = Ob(a, b);
    var d = c * a.l;
    b *= a.l;
    Zb(a);
    a.da(b, d, e => {
        var g = a.oa.nd,
            h = 0;
        do {
            var f = a.s.g(g),
                k = a.s.Na(g + 4),
                l = a.s.od(g + 7) & 128;
            k || (k = 65536);
            ra(a.s, e.subarray(h, h + k), f);
            h += k;
            g += 8
        } while (!l);
        Wb(a, a.o, c);
        a.status = 80;
        a.oa.ra &= -2;
        a.o = -1;
        a.S();
        ac(a, d)
    })
}

function Ub(a) {
    var b = 53 === a.o,
        c = Nb(a, b),
        d = Ob(a, b);
    b = c * a.l;
    d *= a.l;
    var e = a.oa.nd,
        g = 0;
    const h = new Uint8Array(b);
    do {
        var f = a.s.g(e),
            k = a.s.Na(e + 4),
            l = a.s.od(e + 7) & 128;
        k || (k = 65536);
        h.set(a.s.Ma.subarray(f, f + k), g);
        g += k;
        e += 8
    } while (!l);
    a.buffer.set(d, h, () => {
        Wb(a, a.o, c);
        a.status = 80;
        a.S();
        a.oa.ra &= -2;
        a.o = -1
    });
    Xb(a, b)
}

function ec(a) {
    return ((a.na & 255 | a.qa << 8 & 65280) * a.D + a.head) * a.C + (a.wa & 255) - 1
}

function dc(a) {
    return a.wa & 255 | a.na << 8 & 65280 | a.qa << 16 & 16711680 | (a.head & 15) << 24
}

function cc(a) {
    return (a.wa & 255 | a.na << 8 & 65280 | a.qa << 16 & 16711680 | a.wa >> 8 << 24 & 4278190080) >>> 0
}

function Ob(a, b) {
    return b ? cc(a) : a.Gd ? dc(a) : ec(a)
}

function Nb(a, b) {
    b ? (a = a.ca, 0 === a && (a = 65536)) : (a = a.ca & 255, 0 === a && (a = 256));
    return a
}

function Rb(a) {
    if (a.rc & 16) Qb(a, 0);
    else {
        for (var b = 0; 512 > b; b++) a.data[b] = 0;
        b = Math.min(16383, a.F);
        $b(a, [64, a.I ? 133 : 0, b, b >> 8, 0, 0, a.D, a.D >> 8, a.C / 512, a.C / 512 >> 8, 0, 2, a.C, a.C >> 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 118, 32, 54, 68, 72, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 128, 0, 1, 0, 0, 2, 0, 0, 0, 2, 0, 2, 7, 0, b, b >> 8, a.D, a.D >> 8, a.C, 0, a.j & 255, a.j >> 8 & 255, a.j >> 16 & 255, a.j >> 24 & 255, 0, 0, a.j & 255, a.j >> 8 & 255, a.j >> 16 & 255,
            a.j >> 24 & 255, 0, 0, 160 === a.o ? 0 : 7, 160 === a.o ? 0 : 4, 0, 0, 30, 0, 30, 0, 30, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 126, 0, 0, 0, 0, 0, 0, 116, 0, 64, 0, 64, 0, 116, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 96, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, a.j & 255, a.j >> 8 & 255, a.j >> 16 & 255, a.j >> 24 & 255
        ]);
        a.h = 512;
        a.g = 512
    }
}

function Qb(a, b) {
    Pb(a, b);
    for (var c = 0; c < b + 3 >> 2; c++) a.N[c] = 0
}

function Pb(a, b) {
    a.data.length < b && (a.data = new Uint8Array(b + 3 & -4), a.V = new Uint16Array(a.data.buffer), a.N = new Int32Array(a.data.buffer));
    a.h = b;
    a.i = 0
}

function $b(a, b) {
    Pb(a, b.length);
    a.data.set(b)
}

function Zb(a) {
    a.B.hg = !0;
    a.v.send("ide-read-start")
}

function ac(a, b) {
    a.B.hg = !1;
    var c = b / a.l | 0;
    a.B.Lg += c;
    a.B.Of += b;
    a.v.send("ide-read-end", [a.Y, b, c])
}

function Xb(a, b) {
    var c = b / a.l | 0;
    a.B.Mg += c;
    a.B.Pf += b;
    a.v.send("ide-write-end", [a.Y, b, c])
}
q.da = function(a, b, c) {
    const d = this.pa++;
    this.O.add(d);
    this.buffer.get(a, b, e => {
        this.aa.delete(d) ? this.O.has(d) : (this.O.delete(d), c(e))
    })
};
q.$ = function() {
    var a = [];
    a[0] = this.ca;
    a[1] = this.F;
    a[2] = this.qa;
    a[3] = this.na;
    a[4] = this.i;
    a[5] = 0;
    a[6] = 0;
    a[7] = 0;
    a[8] = 0;
    a[9] = this.rc;
    a[10] = this.error;
    a[11] = this.head;
    a[12] = this.D;
    a[13] = this.I;
    a[14] = this.Gd;
    a[15] = this.ad;
    a[16] = this.data;
    a[17] = this.h;
    a[18] = this.wa;
    a[19] = this.j;
    a[20] = this.l;
    a[21] = this.K;
    a[22] = this.C;
    a[23] = this.status;
    a[24] = this.X;
    a[25] = this.o;
    a[26] = this.g;
    a[27] = this.T;
    a[28] = this.buffer;
    return a
};
q.G = function(a) {
    this.ca = a[0];
    this.F = a[1];
    this.qa = a[2];
    this.na = a[3];
    this.i = a[4];
    this.rc = a[9];
    this.error = a[10];
    this.head = a[11];
    this.D = a[12];
    this.I = a[13];
    this.Gd = a[14];
    this.ad = a[15];
    this.data = a[16];
    this.h = a[17];
    this.wa = a[18];
    this.j = a[19];
    this.l = a[20];
    this.K = a[21];
    this.C = a[22];
    this.status = a[23];
    this.X = a[24];
    this.o = a[25];
    this.g = a[26];
    this.T = a[27];
    this.V = new Uint16Array(this.data.buffer);
    this.N = new Int32Array(this.data.buffer);
    this.buffer && this.buffer.G(a[28])
};

function gc(a) {
    this.pb = new Uint8Array(4);
    this.g = new Uint8Array(4);
    this.hd = new Uint8Array(4);
    this.jd = new Uint8Array(4);
    this.gd = new Int32Array(this.pb.buffer);
    new Int32Array(this.g.buffer);
    this.qg = new Int32Array(this.hd.buffer);
    this.sg = new Int32Array(this.jd.buffer);
    this.xb = [];
    this.u = [];
    this.s = a;
    for (var b = 0; 256 > b; b++) this.xb[b] = void 0, this.u[b] = void 0;
    this.A = a.A;
    M(a.A, 3324, this, function(c) {
        hc(this, this.gd[0], c)
    }, function(c) {
        ic(this, this.gd[0], c)
    }, function(c) {
        var d = this.gd[0],
            e = d >> 8 & 65535,
            g = d & 255;
        d =
            this.xb[e];
        e = this.u[e];
        if (d)
            if (16 <= g && 40 > g)
                if (e = e.ib[g - 16 >> 2]) {
                    g >>= 2;
                    var h = d[g] & 1; - 1 === (c | 3 | e.size - 1) ? (c = ~(e.size - 1) | h, 0 === h && (d[g] = c)) : 0 === h && (d[g] = e.ng);
                    1 === h && (jc(this, e, d[g] & 65534, c & 65534), d[g] = c | 1)
                } else d[g >> 2] = 0;
        else 48 === g ? d[g >> 2] = e.rg ? -1 === (c | 2047) ? -e.rg | 0 : e.Vh | 0 : 0 : 4 !== g && (d[g >>> 2] = c)
    });
    M(a.A, 3325, this, function(c) {
        hc(this, this.gd[0] + 1 | 0, c)
    });
    M(a.A, 3326, this, function(c) {
        hc(this, this.gd[0] + 2 | 0, c)
    }, function(c) {
        ic(this, this.gd[0] + 2 | 0, c)
    });
    M(a.A, 3327, this, function(c) {
        hc(this, this.gd[0] + 3 | 0, c)
    });
    a.A.pd(3324, this, function() {
        return this.hd[0]
    }, function() {
        return this.hd[1]
    }, function() {
        return this.hd[2]
    }, function() {
        return this.hd[3]
    });
    a.A.pd(3320, this, function() {
        return this.jd[0]
    }, function() {
        return this.jd[1]
    }, function() {
        return this.jd[2]
    }, function() {
        return this.jd[3]
    });
    a.A.Lb(3320, this, function(c) {
        this.pb[0] = c & 252
    }, function(c) {
        2 === (this.pb[1] & 6) && 6 === (c & 6) ? kc(a) : this.pb[1] = c
    }, function(c) {
        this.pb[2] = c
    }, function(c) {
        this.pb[3] = c;
        c = this.pb[0] & 252;
        var d = this.xb[this.pb[2] << 8 | this.pb[1]];
        void 0 !==
            d ? (this.sg[0] = -2147483648, this.qg[0] = c < d.byteLength ? d[c >> 2] : 0) : (this.qg[0] = -1, this.sg[0] = 0)
    });
    Sb(this, {
        Ia: 0,
        J: [134, 128, 55, 18, 0, 0, 0, 0, 2, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0],
        ib: [],
        name: "82441FX PMC"
    });
    this.i = {
        Ia: 8,
        J: [134, 128, 0, 112, 7, 0, 0, 2, 0, 0, 1, 6, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ib: [],
        name: "82371SB PIIX3 ISA"
    };
    this.j = Sb(this, this.i);
    this.h = new Uint8Array(this.j.buffer)
}
gc.prototype.$ = function() {
    for (var a = [], b = 0; 256 > b; b++) a[b] = this.xb[b];
    a[256] = this.pb;
    a[257] = this.g;
    a[258] = this.hd;
    a[259] = this.jd;
    return a
};
gc.prototype.G = function(a) {
    for (var b = 0; 256 > b; b++) {
        var c = this.u[b],
            d = a[b];
        if (c && d) {
            for (var e = 0; e < c.ib.length; e++) {
                var g = d[4 + e];
                if (g & 1) {
                    var h = c.ib[e];
                    jc(this, h, h.ng & 65534, g & 65534)
                }
            }
            this.xb[b].set(d)
        }
    }
    this.pb.set(a[256]);
    this.g.set(a[257]);
    this.hd.set(a[258]);
    this.jd.set(a[259])
};

function hc(a, b, c) {
    var d = b & 255;
    (new Uint8Array(a.xb[b >> 8 & 65535].buffer))[d] = c
}

function ic(a, b, c) {
    var d = b & 255;
    a = new Uint16Array(a.xb[b >> 8 & 65535].buffer);
    !a || 16 <= d && 44 > d || (a[d >>> 1] = c)
}

function Sb(a, b) {
    var c = b.Ia,
        d = new Int32Array(64);
    d.set(new Int32Array((new Uint8Array(b.J)).buffer));
    a.xb[c] = d;
    a.u[c] = b;
    c = d.slice(4, 10);
    for (var e = 0; e < b.ib.length; e++) {
        var g = b.ib[e];
        if (g) {
            var h = c[e],
                f = h & 1;
            g.ng = h;
            g.entries = [];
            if (0 !== f)
                for (h &= -2, f = 0; f < g.size; f++) g.entries[f] = a.A.ports[h + f]
        }
    }
    return d
}

function jc(a, b, c, d) {
    for (var e = b.size, g = a.A.ports, h = 0; h < e; h++) {
        4096 <= c + h && (g[c + h] = gb(a.A));
        var f = b.entries[h];
        4096 <= d + h && (g[d + h] = f)
    }
}
gc.prototype.za = function(a) {
    this.s.Ja(this.h[96 + ((this.xb[a][15] >> 8 & 255) - 1 + ((a >> 3) - 1 & 255) & 3)])
};

function lc(a, b) {
    Ib(a.s, a.h[96 + ((a.xb[b][15] >> 8 & 255) + (b >> 3 & 255) - 2 & 3)])
};

function mc(a, b) {
    this.A = a.A;
    this.s = a;
    this.eb = a.u.eb;
    this.h = 0;
    this.K = new Uint8Array(10);
    this.N = 0;
    this.j = null;
    this.g = new Uint8Array(10);
    this.l = this.i = 0;
    this.F = b;
    this.I = this.C = this.V = this.aa = this.Y = this.X = 0;
    this.O = 1;
    this.o = 0;
    if (b) {
        var c = {
                [163840]: {
                    type: 1,
                    kb: 40,
                    jb: 8,
                    gb: 1
                },
                [184320]: {
                    type: 1,
                    kb: 40,
                    jb: 9,
                    gb: 1
                },
                [204800]: {
                    type: 1,
                    kb: 40,
                    jb: 10,
                    gb: 1
                },
                [327680]: {
                    type: 1,
                    kb: 40,
                    jb: 8,
                    gb: 2
                },
                [368640]: {
                    type: 1,
                    kb: 40,
                    jb: 9,
                    gb: 2
                },
                [409600]: {
                    type: 1,
                    kb: 40,
                    jb: 10,
                    gb: 2
                },
                [737280]: {
                    type: 3,
                    kb: 80,
                    jb: 9,
                    gb: 2
                },
                [1228800]: {
                    type: 2,
                    kb: 80,
                    jb: 15,
                    gb: 2
                },
                [1474560]: {
                    type: 4,
                    kb: 80,
                    jb: 18,
                    gb: 2
                },
                [1763328]: {
                    type: 5,
                    kb: 82,
                    jb: 21,
                    gb: 2
                },
                [2949120]: {
                    type: 5,
                    kb: 80,
                    jb: 36,
                    gb: 2
                },
                512: {
                    type: 1,
                    kb: 1,
                    jb: 1,
                    gb: 1
                }
            },
            d = b.byteLength;
        d = c[d];
        d || (d = 1474560 < b.byteLength ? 2949120 : 1474560, d = c[d]);
        a.u.Ic.W[16] = d.type << 4;
        a = d.jb;
        b = d.gb;
        d = d.kb;
        this.B = a;
        this.D = b;
        this.T = d
    } else a.u.Ic.W[16] = 64, this.T = this.D = this.B = 0;
    L(this.A, 1008, this, this.cj);
    L(this.A, 1010, this, this.dj);
    L(this.A, 1012, this, this.fj);
    L(this.A, 1013, this, this.gj);
    L(this.A, 1015, this, this.ij);
    M(this.A, 1010, this, this.ej);
    M(this.A,
        1013, this, this.hj)
}
q = mc.prototype;
q.$ = function() {
    var a = [];
    a[0] = this.h;
    a[1] = this.K;
    a[2] = this.N;
    a[4] = this.g;
    a[5] = this.i;
    a[6] = this.l;
    a[8] = this.X;
    a[9] = this.Y;
    a[10] = this.aa;
    a[11] = this.V;
    a[12] = this.C;
    a[13] = this.I;
    a[14] = this.O;
    a[15] = this.o;
    a[16] = this.B;
    a[17] = this.D;
    a[18] = this.T;
    return a
};
q.G = function(a) {
    this.h = a[0];
    this.K = a[1];
    this.N = a[2];
    this.j = a[3];
    this.g = a[4];
    this.i = a[5];
    this.l = a[6];
    this.X = a[8];
    this.Y = a[9];
    this.aa = a[10];
    this.V = a[11];
    this.C = a[12];
    this.I = a[13];
    this.O = a[14];
    this.o = a[15];
    this.B = a[16];
    this.D = a[17];
    this.T = a[18]
};
q.cj = function() {
    return 0
};
q.fj = function() {
    var a = 128;
    this.i < this.l && (a |= 80);
    0 === (this.o & 8) && (a |= 32);
    return a
};
q.ij = function() {
    return 0
};
q.gj = function() {
    return this.i < this.l ? (Ib(this.s, 6), this.g[this.i++]) : 255
};
q.hj = function(a) {
    if (this.F)
        if (0 < this.h) this.K[this.N++] = a, this.h--, 0 === this.h && this.j.call(this, this.K);
        else {
            switch (a) {
                case 3:
                    this.j = this.Ah;
                    this.h = 2;
                    break;
                case 4:
                    this.j = this.fh;
                    this.h = 1;
                    break;
                case 5:
                case 69:
                case 197:
                    this.j = function(b) {
                        nc(this, !0, b)
                    };
                    this.h = 8;
                    break;
                case 230:
                    this.j = function(b) {
                        nc(this, !1, b)
                    };
                    this.h = 8;
                    break;
                case 7:
                    this.j = this.eh;
                    this.h = 1;
                    break;
                case 8:
                    this.i = 0;
                    this.l = 2;
                    this.g[0] = 32;
                    this.g[1] = this.C;
                    break;
                case 74:
                    this.j = this.wj;
                    this.h = 1;
                    break;
                case 15:
                    this.h = 2;
                    this.j = this.$g;
                    break;
                case 14:
                    this.g[0] =
                        128, this.i = 0, this.l = 1, this.h = 0
            }
            this.N = 0
        }
};
q.dj = function() {
    return this.o
};
q.ej = function(a) {
    4 === (a & 4) && 0 === (this.o & 4) && this.s.Ja(6);
    this.o = a
};
q.fh = function() {
    this.i = 0;
    this.l = 1;
    this.g[0] = 32
};
q.$g = function(a) {
    this.C = a[1];
    this.I = a[0] >> 2 & 1;
    this.za()
};
q.eh = function() {
    this.za()
};

function nc(a, b, c) {
    var d = c[2],
        e = c[1],
        g = c[3],
        h = 128 << c[4],
        f = c[5] - c[3] + 1,
        k = ((d + a.D * e) * a.B + g - 1) * h;
    a.F && (b ? a.eb.Zd(a.F, k, f * h, 2, a.done.bind(a, c, e, d, g)) : oc(a.eb, a.F, k, a.done.bind(a, c, e, d, g)))
}
q.done = function(a, b, c, d, e) {
    e || (d++, d > this.B && (d = 1, c++, c >= this.D && (c = 0, b++)), this.C = b, this.I = c, this.O = d, this.i = 0, this.l = 7, this.g[0] = c << 2 | 32, this.g[1] = 0, this.g[2] = 0, this.g[3] = b, this.g[4] = c, this.g[5] = d, this.g[6] = a[4], this.za())
};
q.Ah = function() {};
q.wj = function() {
    this.i = 0;
    this.l = 7;
    this.g[0] = 0;
    this.g[1] = 0;
    this.g[2] = 0;
    this.g[3] = 0;
    this.g[4] = 0;
    this.g[5] = 0;
    this.g[6] = 0;
    this.za()
};
q.za = function() {
    this.o & 8 && this.s.Ja(6)
};

function ra(a, b, c) {
    b.length && (a.Je(c), a.Je(c + b.length - 1), a.Mh(c, c + b.length), a.Ma.set(b, c))
};

function pc(a) {
    this.s = a;
    this.o = new Uint8Array(8);
    this.B = new Uint8Array(8);
    this.g = new Uint16Array(8);
    this.j = new Uint16Array(8);
    this.h = new Uint16Array(8);
    this.l = new Uint16Array(8);
    this.Yb = new Uint8Array(8);
    this.C = new Uint8Array(8);
    this.$e = [];
    this.i = 0;
    a = a.A;
    M(a, 0, this, this.Dc.bind(this, 0));
    M(a, 2, this, this.Dc.bind(this, 1));
    M(a, 4, this, this.Dc.bind(this, 2));
    M(a, 6, this, this.Dc.bind(this, 3));
    M(a, 1, this, this.Fc.bind(this, 0));
    M(a, 3, this, this.Fc.bind(this, 1));
    M(a, 5, this, this.Fc.bind(this, 2));
    M(a, 7, this, this.Fc.bind(this,
        3));
    L(a, 0, this, this.Cc.bind(this, 0));
    L(a, 2, this, this.Cc.bind(this, 1));
    L(a, 4, this, this.Cc.bind(this, 2));
    L(a, 6, this, this.Cc.bind(this, 3));
    L(a, 1, this, this.Ec.bind(this, 0));
    L(a, 3, this, this.Ec.bind(this, 1));
    L(a, 5, this, this.Ec.bind(this, 2));
    L(a, 7, this, this.Ec.bind(this, 3));
    M(a, 192, this, this.Dc.bind(this, 4));
    M(a, 196, this, this.Dc.bind(this, 5));
    M(a, 200, this, this.Dc.bind(this, 6));
    M(a, 204, this, this.Dc.bind(this, 7));
    M(a, 194, this, this.Fc.bind(this, 4));
    M(a, 198, this, this.Fc.bind(this, 5));
    M(a, 202, this, this.Fc.bind(this,
        6));
    M(a, 206, this, this.Fc.bind(this, 7));
    L(a, 192, this, this.Cc.bind(this, 4));
    L(a, 196, this, this.Cc.bind(this, 5));
    L(a, 200, this, this.Cc.bind(this, 6));
    L(a, 204, this, this.Cc.bind(this, 7));
    L(a, 194, this, this.Ec.bind(this, 4));
    L(a, 198, this, this.Ec.bind(this, 5));
    L(a, 202, this, this.Ec.bind(this, 6));
    L(a, 206, this, this.Ec.bind(this, 7));
    M(a, 135, this, this.Hc.bind(this, 0));
    M(a, 131, this, this.Hc.bind(this, 1));
    M(a, 129, this, this.Hc.bind(this, 2));
    M(a, 130, this, this.Hc.bind(this, 3));
    M(a, 143, this, this.Hc.bind(this, 4));
    M(a, 139,
        this, this.Hc.bind(this, 5));
    M(a, 137, this, this.Hc.bind(this, 6));
    M(a, 138, this, this.Hc.bind(this, 7));
    L(a, 135, this, this.Gc.bind(this, 0));
    L(a, 131, this, this.Gc.bind(this, 1));
    L(a, 129, this, this.Gc.bind(this, 2));
    L(a, 130, this, this.Gc.bind(this, 3));
    L(a, 143, this, this.Gc.bind(this, 4));
    L(a, 139, this, this.Gc.bind(this, 5));
    L(a, 137, this, this.Gc.bind(this, 6));
    L(a, 138, this, this.Gc.bind(this, 7));
    M(a, 1159, this, this.md.bind(this, 0));
    M(a, 1155, this, this.md.bind(this, 1));
    M(a, 1153, this, this.md.bind(this, 2));
    M(a, 1154, this, this.md.bind(this,
        3));
    M(a, 1163, this, this.md.bind(this, 5));
    M(a, 1161, this, this.md.bind(this, 6));
    M(a, 1162, this, this.md.bind(this, 7));
    L(a, 1159, this, this.ld.bind(this, 0));
    L(a, 1155, this, this.ld.bind(this, 1));
    L(a, 1153, this, this.ld.bind(this, 2));
    L(a, 1154, this, this.ld.bind(this, 3));
    L(a, 1163, this, this.ld.bind(this, 5));
    L(a, 1161, this, this.ld.bind(this, 6));
    L(a, 1162, this, this.ld.bind(this, 7));
    M(a, 10, this, this.Hg.bind(this, 0));
    M(a, 212, this, this.Hg.bind(this, 4));
    M(a, 15, this, this.Gg.bind(this, 0));
    M(a, 222, this, this.Gg.bind(this, 4));
    L(a, 15, this, this.Fg.bind(this, 0));
    L(a, 222, this, this.Fg.bind(this, 4));
    M(a, 11, this, this.Eg.bind(this, 0));
    M(a, 214, this, this.Eg.bind(this, 4));
    M(a, 12, this, this.Dg);
    M(a, 216, this, this.Dg)
}
q = pc.prototype;
q.$ = function() {
    return [this.o, this.B, this.g, this.j, this.h, this.l, this.Yb, this.C, this.i]
};
q.G = function(a) {
    this.o = a[0];
    this.B = a[1];
    this.g = a[2];
    this.j = a[3];
    this.h = a[4];
    this.l = a[5];
    this.Yb = a[6];
    this.C = a[7];
    this.i = a[8]
};
q.Fc = function(a, b) {
    this.h[a] = qc(this, this.h[a], b, !1);
    this.l[a] = qc(this, this.l[a], b, !0)
};
q.Ec = function(a) {
    return rc(this, this.h[a])
};
q.Dc = function(a, b) {
    this.g[a] = qc(this, this.g[a], b, !1);
    this.j[a] = qc(this, this.j[a], b, !0)
};
q.Cc = function(a) {
    return rc(this, this.g[a])
};
q.md = function(a, b) {
    this.B[a] = b
};
q.ld = function(a) {
    return this.B[a]
};
q.Hc = function(a, b) {
    this.o[a] = b
};
q.Gc = function(a) {
    return this.o[a]
};
q.Hg = function(a, b) {
    sc(this, (b & 3) + a, b & 4 ? 1 : 0)
};
q.Gg = function(a, b) {
    for (var c = 0; 4 > c; c++) sc(this, a + c, b & 1 << c)
};
q.Fg = function(a) {
    var b = 0 | this.Yb[a + 0];
    b |= this.Yb[a + 1] << 1;
    b |= this.Yb[a + 2] << 2;
    return b |= this.Yb[a + 3] << 3
};
q.Eg = function(a, b) {
    this.C[(b & 3) + a] = b
};
q.Dg = function() {
    this.i = 0
};

function sc(a, b, c) {
    if (a.Yb[b] !== c && (a.Yb[b] = c, !c))
        for (c = 0; c < a.$e.length; c++) a.$e[c].Ge.call(a.$e[c].Ef, b)
}

function oc(a, b, c, d) {
    var e = a.h[2] + 1,
        g = tc(a, 2);
    if (c + e > b.byteLength) d(!0);
    else {
        var h = a.s;
        a.g[2] += e;
        b.get(c, e, function(f) {
            ra(h, f, g);
            d(!1)
        })
    }
}
q.Zd = function(a, b, c, d, e) {
    var g = this.h[d] + 1 & 65535,
        h = 5 <= d ? 2 : 1,
        f = g * h,
        k = tc(this, d),
        l = !1,
        n = !1,
        m = this.C[d] & 16;
    c < f ? (g = Math.floor(c / h), f = g * h, l = !0) : c > f && (n = !0);
    b + f > a.byteLength ? e(!0) : (this.g[d] += g, this.h[d] -= g, !l && m && (this.g[d] = this.j[d], this.h[d] = this.l[d]), a.set(b, this.s.Ma.subarray(k, k + f), () => {
        n && m ? this.Zd(a, b + f, c - f, d, e) : e(!1)
    }))
};

function tc(a, b) {
    var c = a.g[b];
    5 <= b && (c <<= 1);
    c = c & 65535 | a.o[b] << 16;
    return c |= a.B[b] << 24
}

function qc(a, b, c, d) {
    d || (a.i ^= 1);
    return a.i ? b & -256 | c : b & -65281 | c << 8
}

function rc(a, b) {
    a.i ^= 1;
    return a.i ? b & 255 : b >> 8 & 255
};

function uc(a, b) {
    this.s = a;
    this.v = b;
    this.i = new Float64Array(3);
    this.j = new Uint16Array(3);
    this.g = new Uint8Array(4);
    this.h = new Uint8Array(4);
    this.Sc = new Uint8Array(4);
    this.B = new Uint8Array(4);
    this.l = new Uint8Array(4);
    this.o = new Uint16Array(3);
    this.mb = new Uint16Array(3);
    L(a.A, 97, this, function() {
        var c = nb(),
            d = 66.66666666666667 * c & 1;
        c = vc(this, 2, c);
        return d << 4 | c << 5
    });
    M(a.A, 97, this, function(c) {
        c & 1 ? this.v.send("pcspeaker-enable") : this.v.send("pcspeaker-disable")
    });
    L(a.A, 64, this, function() {
        return wc(this, 0)
    });
    L(a.A, 65, this, function() {
        return wc(this, 1)
    });
    L(a.A, 66, this, function() {
        return wc(this, 2)
    });
    M(a.A, 64, this, function(c) {
        xc(this, 0, c)
    });
    M(a.A, 65, this, function(c) {
        xc(this, 1, c)
    });
    M(a.A, 66, this, function(c) {
        xc(this, 2, c);
        this.v.send("pcspeaker-update", [this.Sc[2], this.mb[2]])
    });
    M(a.A, 67, this, this.C)
}
uc.prototype.$ = function() {
    var a = [];
    a[0] = this.g;
    a[1] = this.h;
    a[2] = this.Sc;
    a[3] = this.B;
    a[4] = this.l;
    a[5] = this.o;
    a[6] = this.mb;
    a[7] = this.i;
    a[8] = this.j;
    return a
};
uc.prototype.G = function(a) {
    this.g = a[0];
    this.h = a[1];
    this.Sc = a[2];
    this.B = a[3];
    this.l = a[4];
    this.o = a[5];
    this.mb = a[6];
    this.i = a[7];
    this.j = a[8]
};
uc.prototype.rb = function(a, b) {
    var c = 100;
    b || (this.h[0] && vc(this, 0, a) ? (this.j[0] = yc(this, 0, a), this.i[0] = a, Ib(this.s, 0), this.s.Ja(0), 0 === this.Sc[0] && (this.h[0] = 0)) : Ib(this.s, 0), this.h[0] && (c = (this.j[0] - Math.floor(1193.1816666 * (a - this.i[0]))) / 1193.1816666));
    return c
};

function yc(a, b, c) {
    if (!a.h[b]) return 0;
    c = a.j[b] - Math.floor(1193.1816666 * (c - a.i[b]));
    a = a.mb[b];
    c >= a ? c %= a : 0 > c && (c = c % a + a);
    return c
}

function vc(a, b, c) {
    c -= a.i[b];
    return 0 > c ? !0 : a.j[b] < Math.floor(1193.1816666 * c)
}

function wc(a, b) {
    var c = a.l[b];
    if (c) return a.l[b]--, 2 === c ? a.o[b] & 255 : a.o[b] >> 8;
    c = a.g[b];
    3 === a.Sc[b] && (a.g[b] ^= 1);
    a = yc(a, b, nb());
    return c ? a & 255 : a >> 8
}

function xc(a, b, c) {
    a.mb[b] = a.g[b] ? a.mb[b] & -256 | c : a.mb[b] & 255 | c << 8;
    3 === a.B[b] && a.g[b] || (a.mb[b] || (a.mb[b] = 65535), a.j[b] = a.mb[b], a.h[b] = !0, a.i[b] = nb());
    3 === a.B[b] && (a.g[b] ^= 1)
}
uc.prototype.C = function(a) {
    var b = a >> 1 & 7,
        c = a >> 6 & 3;
    a = a >> 4 & 3;
    3 !== c && (0 === a ? (this.l[c] = 2, b = yc(this, c, nb()), this.o[c] = b ? b - 1 : 0) : (6 <= b && (b &= -5), this.g[c] = 1 === a ? 0 : 1, 0 === c && Ib(this.s, 0), this.Sc[c] = b, this.B[c] = a, 2 === c && this.v.send("pcspeaker-update", [this.Sc[2], this.mb[2]])))
};
var zc = Uint32Array.from([655360, 655360, 720896, 753664]),
    Ac = Uint32Array.from([131072, 65536, 32768, 32768]);

function Bc(a, b, c) {
    this.s = a;
    this.v = b;
    this.ea = c;
    this.D = 0;
    this.sc = 14;
    this.qc = 15;
    this.K = 80;
    this.Tb = 25;
    this.ve = this.Da = this.Od = this.mc = 0;
    this.Hd = [];
    this.Ac = this.Aa = 0;
    this.cb = new Uint8Array(25);
    this.C = this.N = this.zc = this.O = this.g = this.i = this.Qb = this.Rb = this.Fa = 0;
    this.uc = !0;
    this.Ca = !1;
    setTimeout(() => {
        b.send("screen-set-mode", this.Ca)
    }, 0);
    this.$a = new Int32Array(256);
    this.Za = this.Oa = this.h = 0;
    this.Ka = !1;
    this.Mb = 32;
    this.ud = this.Sa = 0;
    this.J = [52, 18, 17, 17, 3, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 8, 14680064, 57344, 224, 0, 0, 0, 0, 0,
        0, 191, 254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 26, 0, 17, 0, 0, 190, 254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    this.Ia = 144;
    this.ib = [{
        size: c
    }];
    this.rg = 65536;
    this.Vh = 4272947200;
    this.name = "vga";
    this.B = {
        fg: !1,
        xj: 0,
        yj: 0,
        Nf: 0
    };
    this.pa = this.sb = this.aa = this.F = 0;
    this.X = 255;
    this.Zb = new Uint8Array(16);
    this.l = -1;
    this.Ub = 32;
    this.Rc = this.Sb = this.Cd = this.Ta = 0;
    this.Wb = -1;
    this.Vb = 15;
    this.bb = this.Xb = 0;
    this.Pb = -1;
    this.Ra = this.kc = this.xc = 0;
    this.vc = 255;
    this.Y = this.V = this.T = this.Qa = this.wc = this.Ob = 0;
    this.j = this.$c = 255;
    c = a.A;
    M(c, 960, this,
        this.Hi);
    L(c, 960, this, this.zg, this.Gi);
    L(c, 961, this, this.Ag);
    M(c, 962, this, this.Ii);
    c.Lb(964, this, this.Ki, this.Mi);
    L(c, 964, this, this.Ji);
    L(c, 965, this, this.Li);
    c.Lb(974, this, this.Xi, this.Zi);
    L(c, 974, this, this.Wi);
    L(c, 975, this, this.Yi);
    L(c, 966, this, this.Ni);
    M(c, 966, this, this.Oi);
    M(c, 967, this, this.Qi);
    L(c, 967, this, this.Pi);
    M(c, 968, this, this.Si);
    L(c, 968, this, this.Ri);
    M(c, 969, this, this.Ui);
    L(c, 969, this, this.Ti);
    L(c, 972, this, this.Vi);
    c.Lb(980, this, this.aj, this.bj);
    L(c, 980, this, this.$i);
    L(c, 981, this, this.Bg,
        () => this.Bg());
    L(c, 970, this, function() {
        return 0
    });
    L(c, 986, this, this.Cg);
    L(c, 954, this, this.Cg);
    this.tb = -1;
    this.I = 0;
    M(c, 462, this, void 0, this.Xh);
    M(c, 463, this, void 0, this.Zh);
    L(c, 463, this, void 0, this.Yh);
    void 0 === this.ea || 262144 > this.ea ? this.ea = 262144 : this.ea & 65535 && (this.ea |= 65535, this.ea++);
    const d = a.Ug(this.ea);
    this.Df = Q(Uint8Array, a.Pa, d, this.ea);
    this.Wd = this.ea;
    this.Vd = 0;
    this.Yd = this.ea;
    this.Xd = 0;
    this.Fb = null;
    b.register("screen-fill-buffer", function() {
        if (this.Ca) {
            if (0 === this.Fb.data.byteLength) {
                var g =
                    new Uint8ClampedArray(this.s.Pa.buffer, this.gf, 4 * this.Da * this.ve);
                this.Fb = new ImageData(g, this.Da, this.ve);
                Cc(this)
            }
            if (this.Ka) {
                g = 0;
                var h = this.Za;
                if (8 === this.Mb)
                    for (var f = new Int32Array(this.s.Pa.buffer, this.gf, this.mc * this.Od), k = new Uint8Array(this.s.Pa.buffer, this.Df.byteOffset, this.ea), l = 0; l < f.length; l++) {
                        var n = this.$a[k[l]];
                        f[l] = n & 65280 | n << 16 | n >> 16 | 4278190080
                    } else this.s.Xg(this.Mb, this.ud), l = 15 === this.Mb ? 2 : this.Mb / 8, g = ((this.s.Wg[0] / l | 0) - this.ud) / this.Oa | 0, h = (((this.s.Vg[0] / l | 0) - this.ud) / this.Oa |
                        0) + 1;
                g < h && (g = Math.max(g, 0), h = Math.min(h, this.Za), this.v.send("screen-fill-buffer-end", [{
                    Fb: this.Fb,
                    zf: 0,
                    Af: g,
                    Be: 0,
                    Ce: g,
                    df: this.Oa,
                    cf: h - g
                }]))
            } else {
                g = Math.min(this.Xd | 15, 524287);
                l = Dc(this);
                n = ~this.Fa & 3;
                h = this.kc & 96;
                f = this.Ta & 64;
                for (k = this.Yd & -16; k <= g;) {
                    var m = k >>> l;
                    if (n) {
                        var t = k / this.Da | 0,
                            p = k - this.Da * t;
                        switch (n) {
                            case 1:
                                m = (t & 1) << 13;
                                t >>>= 1;
                                break;
                            case 2:
                                m = (t & 1) << 14;
                                t >>>= 1;
                                break;
                            case 3:
                                m = (t & 3) << 13, t >>>= 2
                        }
                        m |= (t * this.Da + p >>> l) + this.Aa
                    }
                    t = this.Se[m];
                    p = this.Te[m];
                    var r = this.Ue[m],
                        w = this.Ve[m];
                    m = new Uint8Array(8);
                    switch (h) {
                        case 0:
                            t <<= 0;
                            p <<= 1;
                            r <<= 2;
                            w <<= 3;
                            for (var x = 7; 0 <= x; x--) m[7 - x] = t >> x & 1 | p >> x & 2 | r >> x & 4 | w >> x & 8;
                            break;
                        case 32:
                            m[0] = t >> 6 & 3 | r >> 4 & 12;
                            m[1] = t >> 4 & 3 | r >> 2 & 12;
                            m[2] = t >> 2 & 3 | r >> 0 & 12;
                            m[3] = t >> 0 & 3 | r << 2 & 12;
                            m[4] = p >> 6 & 3 | w >> 4 & 12;
                            m[5] = p >> 4 & 3 | w >> 2 & 12;
                            m[6] = p >> 2 & 3 | w >> 0 & 12;
                            m[7] = p >> 0 & 3 | w << 2 & 12;
                            break;
                        case 64:
                        case 96:
                            m[0] = t >> 4 & 15, m[1] = t >> 0 & 15, m[2] = p >> 4 & 15, m[3] = p >> 0 & 15, m[4] = r >> 4 & 15, m[5] = r >> 0 & 15, m[6] = w >> 4 & 15, m[7] = w >> 0 & 15
                    }
                    if (f)
                        for (t = x = 0; 4 > x; x++, k++, t += 2) this.Jd[k] = m[t] << 4 | m[t + 1];
                    else
                        for (x = 0; 8 > x; x++, k++) this.Jd[k] = m[x]
                }
                f = this.Wd;
                g = Math.min(this.Vd, 524287);
                h = new Int32Array(this.s.Pa.buffer, this.gf, this.Da * this.ve);
                l = 255;
                n = 0;
                this.Ta & 128 && (l &= 207, n |= this.Rc << 4 & 48);
                if (this.Ta & 64)
                    for (; f <= g; f++) k = this.Jd[f] & l | n, k = this.$a[k], h[f] = k & 65280 | k << 16 | k >> 16 | 4278190080;
                else
                    for (l &= 63, n |= this.Rc << 4 & 192; f <= g; f++) k = this.Zb[this.Jd[f] & this.Cd] & l | n, k = this.$a[k], h[f] = k & 65280 | k << 16 | k >> 16 | 4278190080;
                this.v.send("screen-fill-buffer-end", this.Hd)
            }
            this.Wd = this.ea;
            this.Vd = 0;
            this.Yd = this.ea;
            this.Xd = 0
        }
        Ec(this)
    }, this);
    this.o = new Uint8Array(262144);
    this.Se =
        new Uint8Array(this.o.buffer, 0, 65536);
    this.Te = new Uint8Array(this.o.buffer, 65536, 65536);
    this.Ue = new Uint8Array(this.o.buffer, 131072, 65536);
    this.Ve = new Uint8Array(this.o.buffer, 196608, 65536);
    this.Jd = new Uint8Array(524288);
    var e = this;
    hb(c, 655360, 131072, function(g) {
        return Fc(e, g)
    }, function(g, h) {
        if (e.Ka && e.Ca && e.uc) e.s.af((g - 655360 | e.Sa) + 3758096384 | 0, h);
        else {
            var f = e.Qa >> 2 & 3;
            g -= zc[f];
            if (!(0 > g || g >= Ac[f]))
                if (e.Ca) {
                    var k = h;
                    h = Gc(e.vc);
                    var l = Hc(e.Ob);
                    f = Hc(e.wc);
                    switch (e.kc & 3) {
                        case 0:
                            k = (k | k << 8) >>> (e.Ra & 7) & 255;
                            var n = Gc(k);
                            k = Hc(e.Ob);
                            n = Ic(e, (n | f & k) & (~f | k), e.h);
                            n = h & n | ~h & e.h;
                            break;
                        case 1:
                            n = e.h;
                            break;
                        case 2:
                            n = Hc(k);
                            n = Ic(e, n, e.h);
                            n = h & n | ~h & e.h;
                            break;
                        case 3:
                            k = (k | k << 8) >>> (e.Ra & 7) & 255, h &= Gc(k), n = h & l | ~h & e.h
                    }
                    h = 15;
                    switch (e.Xb & 12) {
                        case 0:
                            h = 5 << (g & 1);
                            g &= -2;
                            break;
                        case 8:
                        case 12:
                            h = 1 << (g & 3), g &= -4
                    }
                    h &= e.Vb;
                    h & 1 && (e.Se[g] = n >> 0 & 255);
                    h & 2 && (e.Te[g] = n >> 8 & 255);
                    h & 4 && (e.Ue[g] = n >> 16 & 255);
                    h & 8 && (e.Ve[g] = n >> 24 & 255);
                    h = Jc(e, g);
                    n = h + 7;
                    h < e.Yd && (e.Yd = h);
                    n > e.Xd && (e.Xd = n);
                    h < e.Wd && (e.Wd = h);
                    n > e.Vd && (e.Vd = n)
                } else e.Vb & 3 && (n = g, f = (n >> 1) - e.Aa, g = f / e.K |
                    0, f %= e.K, n & 1 ? (l = h, k = e.o[n & -2]) : (k = h, l = e.o[n | 1]), e.v.send("screen-put-char", [g, f, k, e.$a[e.X & e.Zb[l >> 4 & 15]], e.$a[e.X & e.Zb[l & 15]]]), e.o[n] = h)
        }
    });
    Sb(a.u.Ha, this)
}
q = Bc.prototype;
q.$ = function() {
    var a = [];
    a[0] = this.ea;
    a[1] = this.D;
    a[2] = this.sc;
    a[3] = this.qc;
    a[4] = this.K;
    a[5] = this.Tb;
    a[6] = this.o;
    a[7] = this.pa;
    a[8] = this.Aa;
    a[9] = this.Ca;
    a[10] = this.$a;
    a[11] = this.h;
    a[12] = this.T;
    a[13] = this.V;
    a[14] = this.Qa;
    a[15] = this.Oa;
    a[16] = this.Za;
    a[17] = this.Fa;
    a[18] = this.Ka;
    a[19] = this.Mb;
    a[20] = this.Sa;
    a[21] = this.ud;
    a[22] = this.F;
    a[23] = this.aa;
    a[24] = this.sb;
    a[25] = this.Zb;
    a[26] = this.Wb;
    a[27] = this.Vb;
    a[28] = this.Xb;
    a[29] = this.Pb;
    a[30] = this.xc;
    a[31] = this.kc;
    a[32] = this.Ra;
    a[33] = this.vc;
    a[34] = this.Y;
    a[35] =
        this.$c;
    a[36] = this.j;
    a[37] = this.tb;
    a[38] = this.I;
    a[39] = this.Df;
    a[40] = this.uc;
    a[41] = this.l;
    a[42] = this.N;
    a[43] = this.Ob;
    a[44] = this.wc;
    a[45] = this.Ac;
    a[46] = this.cb;
    a[47] = this.Rb;
    a[48] = this.Qb;
    a[49] = this.i;
    a[50] = this.g;
    a[51] = this.O;
    a[52] = this.zc;
    a[53] = this.N;
    a[54] = this.Ub;
    a[55] = this.Ta;
    a[56] = this.Cd;
    a[57] = this.Sb;
    a[58] = this.Rc;
    a[59] = this.bb;
    a[60] = this.C;
    a[61] = this.Jd;
    a[62] = this.X;
    return a
};
q.G = function(a) {
    this.ea = a[0];
    this.D = a[1];
    this.sc = a[2];
    this.qc = a[3];
    this.K = a[4];
    this.Tb = a[5];
    a[6] && this.o.set(a[6]);
    this.pa = a[7];
    this.Aa = a[8];
    this.Ca = a[9];
    this.$a = a[10];
    this.h = a[11];
    this.T = a[12];
    this.V = a[13];
    this.Qa = a[14];
    this.Oa = a[15];
    this.Za = a[16];
    this.Fa = a[17];
    this.Ka = a[18];
    this.Mb = a[19];
    this.Sa = a[20];
    this.ud = a[21];
    this.F = a[22];
    this.aa = a[23];
    this.sb = a[24];
    this.Zb = a[25];
    this.Wb = a[26];
    this.Vb = a[27];
    this.Xb = a[28];
    this.Pb = a[29];
    this.xc = a[30];
    this.kc = a[31];
    this.Ra = a[32];
    this.vc = a[33];
    this.Y = a[34];
    this.$c =
        a[35];
    this.j = a[36];
    this.tb = a[37];
    this.I = a[38];
    this.Df.set(a[39]);
    this.uc = a[40];
    this.l = a[41];
    this.N = a[42];
    this.Ob = a[43];
    this.wc = a[44];
    this.Ac = a[45];
    this.cb.set(a[46]);
    this.Rb = a[47];
    this.Qb = a[48];
    this.i = a[49];
    this.g = a[50];
    this.O = a[51];
    this.zc = a[52];
    this.N = a[53];
    this.Ub = a[54];
    this.Ta = a[55];
    this.Cd = a[56];
    this.Sb = a[57];
    this.Rc = a[58];
    this.bb = a[59];
    this.C = a[60];
    a[61] && this.Jd.set(a[61]);
    this.X = void 0 === a[62] ? 255 : a[62];
    this.v.send("screen-set-mode", this.Ca);
    this.Ca ? (this.Od = this.mc = 0, this.Ka ? (this.qd(this.Oa,
        this.Za, this.Mb, this.Oa, this.Za), Cc(this)) : (Kc(this), Cc(this), Lc(this))) : (this.rd(this.K, this.Tb), this.xd(), this.wd());
    Mc(this)
};

function Fc(a, b) {
    if (a.Ka && a.uc) return a.s.od((b - 655360 | a.Sa) + 3758096384 | 0);
    var c = a.Qa >> 2 & 3;
    b -= zc[c];
    if (0 > b || b >= Ac[c]) return 0;
    a.h = a.Se[b];
    a.h |= a.Te[b] << 8;
    a.h |= a.Ue[b] << 16;
    a.h |= a.Ve[b] << 24;
    if (a.kc & 8) return c = 255, a.V & 1 && (c &= a.Se[b] ^ ~(a.T & 1 ? 255 : 0)), a.V & 2 && (c &= a.Te[b] ^ ~(a.T & 2 ? 255 : 0)), a.V & 4 && (c &= a.Ue[b] ^ ~(a.T & 4 ? 255 : 0)), a.V & 8 && (c &= a.Ve[b] ^ ~(a.T & 8 ? 255 : 0)), c;
    c = a.xc;
    a.Ca ? a.Xb & 8 ? (c = b & 3, b &= -4) : a.kc & 16 && (c = b & 1, b &= -2) : c = 0;
    return a.o[c << 16 | b]
}

function Gc(a) {
    return a | a << 8 | a << 16 | a << 24
}

function Hc(a) {
    return (a & 1 ? 255 : 0) | (a & 2 ? 255 : 0) << 8 | (a & 4 ? 255 : 0) << 16 | (a & 8 ? 255 : 0) << 24
}

function Ic(a, b, c) {
    switch (a.Ra & 24) {
        case 8:
            return b & c;
        case 16:
            return b | c;
        case 24:
            return b ^ c
    }
    return b
}

function Nc(a) {
    for (var b = a.Aa << 1, c, d, e = 0; e < a.Tb; e++)
        for (var g = 0; g < a.K; g++) c = a.o[b], d = a.o[b | 1], a.v.send("screen-put-char", [e, g, c, a.$a[a.X & a.Zb[d >> 4 & 15]], a.$a[a.X & a.Zb[d & 15]]]), b += 2
}
q.wd = function() {
    var a = (this.D - this.Aa) / this.K | 0,
        b = (this.D - this.Aa) % this.K;
    a = Math.min(this.Tb - 1, a);
    this.v.send("screen-update-cursor", [a, b])
};

function Mc(a) {
    a.Ca ? a.Ka ? a.s.kg() : (a.Wd = 0, a.Vd = 524288) : Nc(a)
}

function Lc(a) {
    a.Ca && !a.Ka && (a.Yd = 0, a.Xd = 524288, Mc(a))
}
q.va = function() {};

function Dc(a) {
    var b = 128 + (~a.O & a.Fa & 64);
    b -= a.O & 64;
    b -= a.Ta & 64;
    return b >>> 6
}

function Jc(a, b) {
    var c = Dc(a);
    if (~a.Fa & 3) {
        var d = b - a.Aa;
        d &= a.Fa << 13 | -24577;
        d <<= c;
        var e = d / a.Da | 0;
        d %= a.Da;
        switch (a.Fa & 3) {
            case 2:
                e = e << 1 | b >> 13 & 1;
                break;
            case 1:
                e = e << 1 | b >> 14 & 1;
                break;
            case 0:
                e = e << 2 | b >> 13 & 3
        }
        return e * a.Da + d + (a.Aa << c)
    }
    return b << c
}

function Oc(a, b) {
    a.Y & 128 && (b >>>= 1);
    b = Math.ceil(b / (1 + (a.Y & 31)));
    a.Fa & 1 || (b <<= 1);
    a.Fa & 2 || (b <<= 1);
    return b
}
q.rd = function(a, b) {
    this.K = a;
    this.Tb = b;
    this.v.send("screen-set-size-text", [a, b])
};
q.qd = function(a, b, c, d, e) {
    if (!this.B.fg || this.B.Nf !== c || this.mc !== a || this.Od !== b || this.Da !== d || this.ve !== e) {
        this.mc = a;
        this.Od = b;
        this.Da = d;
        this.ve = e;
        this.B.Nf = c;
        this.B.fg = !0;
        this.B.xj = a;
        this.B.yj = b;
        if ("undefined" !== typeof ImageData) {
            const g = d * e,
                h = this.s.Tg(g) >>> 0;
            this.gf = h;
            this.Fb = new ImageData(new Uint8ClampedArray(this.s.Pa.buffer, h, 4 * g), d, e);
            this.s.kg()
        }
        this.v.send("screen-set-size-graphical", [a, b, d, e, c])
    }
};

function Kc(a) {
    if (!a.Ka) {
        var b = Math.min(1 + a.Rb, a.Qb),
            c = Math.min(1 + a.i, a.g);
        if (b && c)
            if (a.Ca) {
                b <<= 3;
                var d = a.N << 4;
                a.Ta & 64 && (b >>>= 1, d >>>= 1);
                var e = a.N << 2;
                a.O & 64 ? e <<= 1 : a.Fa & 64 && (e >>>= 1);
                a.qd(b, Oc(a, c), 8, d, Math.ceil(Ac[0] / e));
                Ec(a);
                Cc(a)
            } else a.Y & 128 && (c >>>= 1), c = c / (1 + (a.Y & 31)) | 0, b && c && a.rd(b, c)
    }
}

function Cc(a) {
    a.Ca || Nc(a);
    if (a.Ka) a.Hd = [];
    else if (a.Da && a.mc)
        if (!a.Ub || a.bb & 32) a.Hd = [], a.v.send("screen-clear");
        else {
            var b = a.Ac,
                c = a.Sb;
            a.Ta & 64 && (c >>>= 1);
            var d = a.zc >> 5 & 3,
                e = Jc(a, b + d);
            b = e / a.Da | 0;
            var g = e % a.Da + c;
            e = Oc(a, 1 + a.C);
            e = Math.min(e, a.Od);
            var h = a.Od - e;
            a.Hd = [];
            g = -g;
            for (var f = 0; g < a.mc; g += a.Da, f++) a.Hd.push({
                Fb: a.Fb,
                zf: g,
                Af: 0,
                Be: 0,
                Ce: b + f,
                df: a.Da,
                cf: e
            });
            b = 0;
            a.Ta & 32 || (b = Jc(a, d) + c);
            g = -b;
            for (f = 0; g < a.mc; g += a.Da, f++) a.Hd.push({
                Fb: a.Fb,
                zf: g,
                Af: e,
                Be: 0,
                Ce: f,
                df: a.Da,
                cf: h
            })
        }
}

function Ec(a) {
    a.j |= 8;
    a.Ac !== a.Aa && (a.Ac = a.Aa, Cc(a))
}
q.xd = function() {
    this.v.send("screen-update-cursor-scanline", [this.sc, this.qc])
};
q.Hi = function(a) {
    if (-1 === this.l) this.l = a & 31, this.Ub !== (a & 32) && (this.Ub = a & 32, Cc(this));
    else {
        if (16 > this.l) this.Zb[this.l] = a, this.Ta & 64 || Mc(this);
        else switch (this.l) {
            case 16:
                if (this.Ta !== a) {
                    var b = this.Ta;
                    this.Ta = a;
                    var c = 0 < (a & 1);
                    this.Ka || this.Ca === c || (this.Ca = c, this.v.send("screen-set-mode", this.Ca));
                    (b ^ a) & 64 && Lc(this);
                    Kc(this);
                    Mc(this)
                }
                break;
            case 18:
                this.Cd !== a && (this.Cd = a, Mc(this));
                break;
            case 19:
                this.Sb !== a && (this.Sb = a & 15, Cc(this));
                break;
            case 20:
                this.Rc !== a && (this.Rc = a, Mc(this))
        }
        this.l = -1
    }
};
q.zg = function() {
    return this.l | this.Ub
};
q.Gi = function() {
    return this.zg() & 255 | this.Ag() << 8 & 65280
};
q.Ag = function() {
    if (16 > this.l) return this.Zb[this.l] & 255;
    switch (this.l) {
        case 16:
            return this.Ta;
        case 18:
            return this.Cd;
        case 19:
            return this.Sb;
        case 20:
            return this.Rc
    }
    return 255
};
q.Ii = function(a) {
    this.$c = a
};
q.Ki = function(a) {
    this.Wb = a
};
q.Ji = function() {
    return this.Wb
};
q.Mi = function(a) {
    switch (this.Wb) {
        case 1:
            var b = this.bb;
            this.bb = a;
            (b ^ a) & 32 && Cc(this);
            break;
        case 2:
            this.Vb = a;
            break;
        case 4:
            this.Xb = a
    }
};
q.Li = function() {
    switch (this.Wb) {
        case 1:
            return this.bb;
        case 2:
            return this.Vb;
        case 4:
            return this.Xb;
        case 6:
            return 18
    }
    return 0
};
q.Oi = function(a) {
    this.X = a
};
q.Ni = function() {
    return this.X
};
q.Qi = function(a) {
    this.sb = 3 * a;
    this.pa &= 0
};
q.Pi = function() {
    return this.pa
};
q.Si = function(a) {
    this.aa = 3 * a;
    this.pa |= 3
};
q.Ri = function() {
    return this.aa / 3 & 255
};
q.Ui = function(a) {
    var b = this.aa / 3 | 0,
        c = this.aa % 3,
        d = this.$a[b];
    if (0 === (this.I & 32)) {
        a &= 63;
        const e = a & 1;
        a = a << 2 | e << 1 | e
    }
    d = 0 === c ? d & -16711681 | a << 16 : 1 === c ? d & -65281 | a << 8 : d & -256 | a;
    this.$a[b] !== d && (this.$a[b] = d, Mc(this));
    this.aa++
};
q.Ti = function() {
    var a = this.$a[this.sb / 3 | 0] >> 8 * (2 - this.sb % 3) & 255;
    this.sb++;
    return this.I & 32 ? a : a >> 2
};
q.Vi = function() {
    return this.$c
};
q.Xi = function(a) {
    this.Pb = a
};
q.Wi = function() {
    return this.Pb
};
q.Zi = function(a) {
    switch (this.Pb) {
        case 0:
            this.Ob = a;
            break;
        case 1:
            this.wc = a;
            break;
        case 2:
            this.T = a;
            break;
        case 3:
            this.Ra = a;
            break;
        case 4:
            this.xc = a;
            break;
        case 5:
            var b = this.kc;
            this.kc = a;
            (b ^ a) & 96 && Lc(this);
            break;
        case 6:
            this.Qa !== a && (this.Qa = a, Kc(this));
            break;
        case 7:
            this.V = a;
            break;
        case 8:
            this.vc = a
    }
};
q.Yi = function() {
    switch (this.Pb) {
        case 0:
            return this.Ob;
        case 1:
            return this.wc;
        case 2:
            return this.T;
        case 3:
            return this.Ra;
        case 4:
            return this.xc;
        case 5:
            return this.kc;
        case 6:
            return this.Qa;
        case 7:
            return this.V;
        case 8:
            return this.vc
    }
    return 0
};
q.aj = function(a) {
    this.F = a
};
q.$i = function() {
    return this.F
};
q.bj = function(a) {
    switch (this.F) {
        case 1:
            this.Rb !== a && (this.Rb = a, Kc(this));
            break;
        case 2:
            this.Qb !== a && (this.Qb = a, Kc(this));
            break;
        case 7:
            var b = this.i;
            this.i &= 255;
            this.i = this.i | a << 3 & 512 | a << 7 & 256;
            b != this.i && Kc(this);
            this.C = this.C & 767 | a << 4 & 256;
            b = this.g;
            this.g = this.g & 767 | a << 5 & 256;
            b !== this.g && Kc(this);
            Cc(this);
            break;
        case 8:
            this.zc = a;
            Cc(this);
            break;
        case 9:
            this.Y = a;
            this.C = this.C & 511 | a << 3 & 512;
            b = this.g;
            this.g = this.g & 511 | a << 4 & 512;
            b !== this.g && Kc(this);
            Cc(this);
            break;
        case 10:
            this.sc = a;
            this.xd();
            break;
        case 11:
            this.qc =
                a;
            this.xd();
            break;
        case 12:
            (this.Aa >> 8 & 255) !== a && (this.Aa = this.Aa & 255 | a << 8, Cc(this), ~this.Fa & 3 && Lc(this));
            break;
        case 13:
            (this.Aa & 255) !== a && (this.Aa = this.Aa & 65280 | a, Cc(this), ~this.Fa & 3 && Lc(this));
            break;
        case 14:
            this.D = this.D & 255 | a << 8;
            this.wd();
            break;
        case 15:
            this.D = this.D & 65280 | a;
            this.wd();
            break;
        case 18:
            (this.i & 255) !== a && (this.i = this.i & 768 | a, Kc(this));
            break;
        case 19:
            this.N !== a && (this.N = a, Kc(this), ~this.Fa & 3 && Lc(this));
            break;
        case 20:
            this.O !== a && (b = this.O, this.O = a, Kc(this), (b ^ a) & 64 && Lc(this));
            break;
        case 21:
            (this.g &
                255) !== a && (this.g = this.g & 768 | a, Kc(this));
            break;
        case 23:
            this.Fa !== a && (b = this.Fa, this.Fa = a, Kc(this), (b ^ a) & 67 && Lc(this));
            break;
        case 24:
            this.C = this.C & 768 | a;
            Cc(this);
            break;
        default:
            this.F < this.cb.length && (this.cb[this.F] = a)
    }
};
q.Bg = function() {
    switch (this.F) {
        case 1:
            return this.Rb;
        case 2:
            return this.Qb;
        case 7:
            return this.i >> 7 & 2 | this.g >> 5 & 8 | this.C >> 4 & 16 | this.i >> 3 & 64;
        case 8:
            return this.zc;
        case 9:
            return this.Y;
        case 10:
            return this.sc;
        case 11:
            return this.qc;
        case 12:
            return this.Aa & 255;
        case 13:
            return this.Aa >> 8;
        case 14:
            return this.D >> 8;
        case 15:
            return this.D & 255;
        case 18:
            return this.i & 255;
        case 19:
            return this.N;
        case 20:
            return this.O;
        case 21:
            return this.g & 255;
        case 23:
            return this.Fa;
        case 24:
            return this.C & 255
    }
    return this.F < this.cb.length ?
        this.cb[this.F] : 0
};
q.Cg = function() {
    var a = this.j;
    this.Ca ? (this.j ^= 1, this.j &= 1) : (this.j & 1 && (this.j ^= 8), this.j ^= 1);
    this.l = -1;
    return a
};
q.Xh = function(a) {
    this.tb = a
};
q.Zh = function(a) {
    switch (this.tb) {
        case 1:
            this.Oa = a;
            2560 < this.Oa && (this.Oa = 2560);
            break;
        case 2:
            this.Za = a;
            1600 < this.Za && (this.Za = 1600);
            break;
        case 3:
            this.Mb = a;
            break;
        case 4:
            this.Ka = 1 === (a & 1);
            this.I = a;
            break;
        case 5:
            this.Sa = a << 16;
            break;
        case 9:
            a *= this.Oa, this.ud !== a && (this.ud = a, Mc(this))
    }!this.Ka || this.Oa && this.Za || (this.Ka = !1);
    this.Ka && 4 === this.tb && (this.qd(this.Oa, this.Za, this.Mb, this.Oa, this.Za), this.v.send("screen-set-mode", !0), this.uc = this.Ca = !0);
    this.Ka || (this.Sa = 0);
    Cc(this)
};
q.Yh = function() {
    return Pc(this, this.tb)
};

function Pc(a, b) {
    switch (b) {
        case 0:
            return 45248;
        case 1:
            return a.I & 2 ? 2560 : a.Oa;
        case 2:
            return a.I & 2 ? 1600 : a.Za;
        case 3:
            return a.I & 2 ? 32 : a.Mb;
        case 4:
            return a.I;
        case 5:
            return a.Sa >>> 16;
        case 6:
            return a.mc ? a.mc : 1;
        case 8:
            return 0;
        case 10:
            return a.ea / 65536 | 0
    }
    return 255
};

function Qc(a, b) {
    this.s = a;
    this.v = b;
    this.yd = this.tc = !1;
    this.fe = !0;
    this.dd = this.Ib = this.Hb = 0;
    this.pa = !0;
    this.O = this.N = this.F = this.K = this.T = this.I = this.$d = !1;
    this.ia = new Cb(1024);
    this.l = 0;
    this.Jc = 100;
    this.j = this.i = 0;
    this.C = !1;
    this.Nb = 0;
    this.Ld = 4;
    this.B = !1;
    this.g = new Cb(1024);
    this.D = this.o = !1;
    this.v.register("keyboard-code", function(c) {
        this.$d && (this.ia.push(c), this.za())
    }, this);
    this.v.register("mouse-click", function(c) {
        this.fe && this.yd && (this.dd = c[0] | c[2] << 1 | c[1] << 2, this.tc && Rc(this, 0, 0))
    }, this);
    this.v.register("mouse-delta",
        function(c) {
            var d = c[1];
            if (this.fe && this.yd) {
                var e = this.Ld * this.Jc / 80;
                this.Hb += c[0] * e;
                this.Ib += d * e;
                this.tc && (c = this.Hb | 0, d = this.Ib | 0, c || d) && (this.Hb -= c, this.Ib -= d, Rc(this, c, d))
            }
        }, this);
    this.v.register("mouse-wheel", function(c) {
        this.Nb -= c[0];
        this.Nb -= 2 * c[1];
        this.Nb = Math.min(7, Math.max(-8, this.Nb));
        Rc(this, 0, 0)
    }, this);
    this.h = 5;
    this.aa = 0;
    this.X = this.V = this.Y = !1;
    L(a.A, 96, this, this.pj);
    L(a.A, 100, this, this.rj);
    M(a.A, 96, this, this.qj);
    M(a.A, 100, this, this.sj)
}
q = Qc.prototype;
q.$ = function() {
    var a = [];
    a[0] = this.tc;
    a[1] = this.yd;
    a[2] = this.fe;
    a[3] = this.Hb;
    a[4] = this.Ib;
    a[5] = this.dd;
    a[6] = this.pa;
    a[7] = this.$d;
    a[8] = this.I;
    a[9] = this.T;
    a[10] = this.K;
    a[11] = this.F;
    a[12] = this.N;
    a[13] = this.O;
    a[15] = this.l;
    a[16] = this.Jc;
    a[17] = this.Ld;
    a[18] = this.B;
    a[20] = this.h;
    a[21] = this.Y;
    a[22] = this.V;
    a[23] = this.aa;
    a[24] = this.X;
    a[25] = this.j;
    a[26] = this.i;
    a[27] = this.C;
    return a
};
q.G = function(a) {
    this.tc = a[0];
    this.yd = a[1];
    this.fe = a[2];
    this.Hb = a[3];
    this.Ib = a[4];
    this.dd = a[5];
    this.pa = a[6];
    this.$d = a[7];
    this.I = a[8];
    this.T = a[9];
    this.K = a[10];
    this.F = a[11];
    this.N = a[12];
    this.O = a[13];
    this.l = a[15];
    this.Jc = a[16];
    this.Ld = a[17];
    this.B = a[18];
    this.h = a[20];
    this.Y = a[21];
    this.V = a[22];
    this.aa = a[23];
    this.X = a[24];
    this.j = a[25] || 0;
    this.i = a[26] || 0;
    this.C = a[27] || !1;
    this.D = this.o = !1;
    this.ia.clear();
    this.g.clear();
    this.v.send("mouse-enable", this.yd)
};
q.za = function() {
    this.o || (this.ia.length ? Sc(this) : this.g.length && Tc(this))
};

function Tc(a) {
    a.o = !0;
    a.D = !0;
    a.h & 2 && (Ib(a.s, 12), a.s.Ja(12))
}

function Sc(a) {
    a.o = !0;
    a.D = !1;
    a.h & 1 && (Ib(a.s, 1), a.s.Ja(1))
}

function Rc(a, b, c) {
    a.g.push((0 > c) << 5 | (0 > b) << 4 | 8 | a.dd);
    a.g.push(b);
    a.g.push(c);
    4 === a.j ? (a.g.push(0 | a.Nb & 15), a.Nb = 0) : 3 === a.j && (a.g.push(a.Nb & 255), a.Nb = 0);
    a.za()
}
q.pj = function() {
    this.o = !1;
    if (!this.ia.length && !this.g.length) return this.l;
    this.D ? (Ib(this.s, 12), this.l = this.g.shift()) : (Ib(this.s, 1), this.l = this.ia.shift());
    (this.ia.length || this.g.length) && this.za();
    return this.l
};
q.rj = function() {
    var a = 16;
    this.o && (a |= 1);
    this.D && (a |= 32);
    return a
};
q.qj = function(a) {
    if (this.V) this.h = a, this.V = !1;
    else if (this.Y) this.Y = !1, this.g.clear(), this.g.push(a), Tc(this);
    else if (this.T) {
        this.T = !1;
        this.g.clear();
        this.g.push(250);
        this.Jc = a;
        switch (this.i) {
            case -1:
                60 === a ? (this.C = !0, this.i = 0) : (this.C = !1, this.i = 200 === a ? 1 : 0);
                break;
            case 0:
                200 === a && (this.i = 1);
                break;
            case 1:
                this.i = 100 === a ? 2 : 200 === a ? 3 : 0;
                break;
            case 2:
                80 === a && (this.j = 3);
                this.i = -1;
                break;
            case 3:
                80 === a && (this.j = 4), this.i = -1
        }
        this.Jc || (this.Jc = 100);
        Tc(this)
    } else if (this.O) this.O = !1, this.g.clear(), this.g.push(250),
        this.Ld = 3 < a ? 4 : 1 << a, Tc(this);
    else if (this.K) this.K = !1, this.ia.push(250), Sc(this);
    else if (this.F) this.F = !1, this.ia.push(250), Sc(this), a || this.ia.push(2);
    else if (this.N) this.N = !1, this.ia.push(250), Sc(this);
    else if (this.I) {
        if (this.I = !1, this.fe) {
            this.ia.clear();
            this.g.clear();
            this.g.push(250);
            switch (a) {
                case 230:
                    this.B = !1;
                    break;
                case 231:
                    this.B = !0;
                    break;
                case 232:
                    this.O = !0;
                    break;
                case 233:
                    Rc(this, 0, 0);
                    break;
                case 235:
                    Rc(this, 0, 0);
                    break;
                case 242:
                    this.g.push(this.j);
                    this.dd = this.Hb = this.Ib = 0;
                    this.za();
                    break;
                case 243:
                    this.T = !0;
                    break;
                case 244:
                    this.yd = this.tc = !0;
                    this.v.send("mouse-enable", !0);
                    this.dd = this.Hb = this.Ib = 0;
                    break;
                case 245:
                    this.tc = !1;
                    break;
                case 246:
                    this.tc = !1;
                    this.Jc = 100;
                    this.B = !1;
                    this.Ld = 4;
                    break;
                case 255:
                    this.g.push(170), this.g.push(0), this.yd = !0, this.v.send("mouse-enable", !0), this.tc = !1, this.Jc = 100, this.B = !1, this.Ld = 4, this.C || (this.j = 0), this.dd = this.Hb = this.Ib = 0
            }
            Tc(this)
        }
    } else if (this.X) this.X = !1, this.aa = a;
    else {
        this.g.clear();
        this.ia.clear();
        this.ia.push(250);
        switch (a) {
            case 237:
                this.K = !0;
                break;
            case 240:
                this.F = !0;
                break;
            case 242:
                this.ia.push(171);
                this.ia.push(83);
                break;
            case 243:
                this.N = !0;
                break;
            case 244:
                this.$d = !0;
                break;
            case 245:
                this.$d = !1;
                break;
            case 255:
                this.ia.clear(), this.ia.push(250), this.ia.push(170), this.ia.push(0)
        }
        Sc(this)
    }
};
q.sj = function(a) {
    switch (a) {
        case 32:
            this.ia.clear();
            this.g.clear();
            this.ia.push(this.h);
            Sc(this);
            break;
        case 96:
            this.V = !0;
            break;
        case 209:
            this.X = !0;
            break;
        case 211:
            this.Y = !0;
            break;
        case 212:
            this.I = !0;
            break;
        case 167:
            this.h |= 32;
            break;
        case 168:
            this.h &= -33;
            break;
        case 169:
            this.ia.clear();
            this.g.clear();
            this.ia.push(0);
            Sc(this);
            break;
        case 170:
            this.ia.clear();
            this.g.clear();
            this.ia.push(85);
            Sc(this);
            break;
        case 171:
            this.ia.clear();
            this.g.clear();
            this.ia.push(0);
            Sc(this);
            break;
        case 173:
            this.h |= 16;
            break;
        case 174:
            this.h &=
                -17;
            break;
        case 254:
            kc(this.s)
    }
};

function Uc(a, b) {
    this.h = this.g = this.R = this.C = this.l = 0;
    this.i = -1;
    this.ja = b;
    this.D = void 0 === this.ja;
    this.ka = void 0;
    this.name = this.D ? "master" : "slave ";
    this.F = !1;
    this.I = this.state = 0;
    this.o = 1;
    this.B = this.K = 0;
    this.s = a;
    this.D ? (this.ka = new Uc(this.s, this), this.j = function() {
        if (0 <= this.i) pb(this.s);
        else {
            var c = this.g & this.l;
            if (c) {
                c &= -c;
                var d = this.K ? this.l : -1;
                this.R && (this.R & -this.R & d) <= c || (this.i = rb(c), pb(this.s))
            }
        }
    }, this.Sd = function() {
        if (-1 !== this.i)
            if (0 === this.g) this.i = -1;
            else {
                var c = 1 << this.i;
                0 === (this.B &
                    c) && (this.g &= ~c);
                this.o || (this.R |= c);
                2 === this.i ? this.ka.Sd() : this.s.C(this.C | this.i);
                this.i = -1;
                this.j()
            }
    }) : (this.j = function() {
        if (0 <= this.i) pb(this.s);
        else {
            var c = this.g & this.l;
            if (c) {
                c &= -c;
                var d = this.K ? this.l : -1;
                this.R && (this.R & -this.R & d) <= c || (this.i = rb(c), this.ja.Qd(2))
            }
        }
    }, this.Sd = function() {
        if (-1 !== this.i)
            if (0 === this.g) this.i = -1, this.ja.h &= -5, this.s.C(this.C | 7);
            else {
                var c = 1 << this.i;
                0 === (this.B & c) && (this.g &= ~c);
                this.o || (this.R |= c);
                this.ja.h &= -5;
                this.s.C(this.C | this.i);
                this.i = -1;
                this.j()
            }
    });
    this.D ?
        (a = 32, b = 1232) : (a = 160, b = 1233);
    M(this.s.A, a, this, this.ai);
    L(this.s.A, a, this, this.$h);
    M(this.s.A, a | 1, this, this.ci);
    L(this.s.A, a | 1, this, this.bi);
    M(this.s.A, b, this, this.oj);
    L(this.s.A, b, this, this.nj);
    this.D ? (this.Qd = function(c) {
        8 <= c ? this.ka.Qd(c - 8) : (c = 1 << c, 0 === (this.h & c) && (this.g |= c, this.h |= c, this.j()))
    }, this.Td = function(c) {
        8 <= c ? this.ka.Td(c - 8) : (c = 1 << c, this.h & c && (this.h &= ~c, this.g &= ~c, this.j()))
    }) : (this.Qd = function(c) {
        c = 1 << c;
        0 === (this.h & c) && (this.g |= c, this.h |= c, this.j())
    }, this.Td = function(c) {
        c = 1 << c;
        this.h &
            c && (this.h &= ~c, this.g &= ~c, this.j())
    })
}
q = Uc.prototype;
q.$ = function() {
    var a = [];
    a[0] = this.l;
    a[1] = this.C;
    a[2] = this.R;
    a[3] = this.g;
    a[4] = this.D;
    a[5] = this.ka;
    a[6] = this.F;
    a[7] = this.state;
    a[8] = this.I;
    a[9] = this.o;
    a[10] = this.B;
    return a
};
q.G = function(a) {
    this.l = a[0];
    this.C = a[1];
    this.R = a[2];
    this.g = a[3];
    this.D = a[4];
    this.ka && this.ka.G(a[5]);
    this.F = a[6];
    this.state = a[7];
    this.I = a[8];
    this.o = a[9];
    this.B = a[10]
};
q.ai = function(a) {
    if (a & 16) this.h = this.l = this.g = this.R = 0, this.o = 1, this.i = -1, this.F = a & 1, this.state = 1;
    else if (a & 8) a & 2 && (this.I = a & 1), a & 64 && (this.K = 32 === (a & 32));
    else {
        var b = a >> 5;
        1 === b ? this.R &= this.R - 1 : 3 === b ? this.R &= ~(1 << (a & 7)) : 192 !== (a & 200) && (this.R &= this.R - 1);
        this.j()
    }
};
q.$h = function() {
    return this.I ? this.R : this.g
};
q.ci = function(a) {
    0 === this.state ? this.F ? (this.F = !1, this.o = a & 2) : (this.l = ~a, this.j()) : 1 === this.state ? (this.C = a, this.state++) : 2 === this.state && (this.state = 0)
};
q.bi = function() {
    return ~this.l & 255
};
q.nj = function() {
    return this.B
};
q.oj = function(a) {
    this.B = a
};

function Vc(a) {
    this.s = a;
    this.Qc = 0;
    this.W = new Uint8Array(128);
    this.D = this.g = Date.now();
    this.l = this.j = 0;
    this.B = !1;
    this.C = .9765625;
    this.o = 38;
    this.h = 2;
    this.rf = this.i = 0;
    M(a.A, 112, this, function(b) {
        this.Qc = b & 127;
        this.rf = b >> 7
    });
    M(a.A, 113, this, this.ih);
    L(a.A, 113, this, this.hh)
}
q = Vc.prototype;
q.$ = function() {
    var a = [];
    a[0] = this.Qc;
    a[1] = this.W;
    a[2] = this.g;
    a[3] = this.D;
    a[4] = this.j;
    a[5] = this.l;
    a[6] = this.B;
    a[7] = this.C;
    a[8] = this.o;
    a[9] = this.h;
    a[10] = this.i;
    a[11] = this.rf;
    return a
};
q.G = function(a) {
    this.Qc = a[0];
    this.W = a[1];
    this.g = a[2];
    this.D = a[3];
    this.j = a[4];
    this.l = a[5];
    this.B = a[6];
    this.C = a[7];
    this.o = a[8];
    this.h = a[9];
    this.i = a[10];
    this.rf = a[11]
};
q.rb = function(a) {
    a = Date.now();
    this.g += a - this.D;
    this.D = a;
    this.B && this.j < a ? (this.s.Ja(8), this.i |= 192, this.j += this.C * Math.ceil((a - this.j) / this.C)) : this.l && this.l < a && (this.s.Ja(8), this.i |= 160, this.l = 0);
    let b = 100;
    this.B && this.j && (b = Math.min(b, Math.max(0, this.j - a)));
    this.l && (b = Math.min(b, Math.max(0, this.l - a)));
    return b
};

function Wc(a, b) {
    if (a.h & 4) a = b;
    else {
        a = b;
        for (var c = b = 0, d; a;) d = a % 10, c |= d << 4 * b, b++, a = (a - d) / 10;
        a = c
    }
    return a
}

function Xc(a, b) {
    var c;
    a.h & 4 ? c = b : c = (b & 15) + 10 * (b >> 4 & 15);
    return c
}
q.hh = function() {
    switch (this.Qc) {
        case 0:
            return Wc(this, (new Date(this.g)).getUTCSeconds());
        case 2:
            return Wc(this, (new Date(this.g)).getUTCMinutes());
        case 4:
            return Wc(this, (new Date(this.g)).getUTCHours());
        case 7:
            return Wc(this, (new Date(this.g)).getUTCDate());
        case 8:
            return Wc(this, (new Date(this.g)).getUTCMonth() + 1);
        case 9:
            return Wc(this, (new Date(this.g)).getUTCFullYear() % 100);
        case 10:
            return this.o;
        case 11:
            return this.h;
        case 12:
            Ib(this.s, 8);
            var a = this.i;
            this.i &= -241;
            return a;
        case 13:
            return 0;
        case 50:
            return Wc(this,
                (new Date(this.g)).getUTCFullYear() / 100 | 0);
        default:
            return this.W[this.Qc]
    }
};
q.ih = function(a) {
    switch (this.Qc) {
        case 10:
            this.o = a & 127;
            this.C = 1E3 / (32768 >> (this.o & 15) - 1);
            break;
        case 11:
            this.h = a;
            this.h & 64 && (this.j = Date.now());
            if (this.h & 32) {
                a = new Date;
                const b = Xc(this, this.W[1]),
                    c = Xc(this, this.W[3]),
                    d = Xc(this, this.W[5]);
                this.l = +new Date(Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), d, c, b))
            }
            break;
        case 1:
        case 3:
        case 5:
            this.W[this.Qc] = a
    }
    this.B = 64 === (this.h & 64) && 0 < (this.o & 15)
};

function Yc(a, b, c) {
    this.v = c;
    this.s = a;
    this.g = 4;
    this.Bc = this.nc = 0;
    this.cd = 96;
    this.ec = this.be = 0;
    this.fc = 1;
    this.ba = this.Xe = this.pf = this.Oe = 0;
    this.input = new Cb(4096);
    this.i = [];
    switch (b) {
        case 1016:
            this.h = 0;
            this.ba = 4;
            break;
        case 760:
            this.h = 1;
            this.ba = 3;
            break;
        case 1E3:
            this.h = 2;
            this.ba = 4;
            break;
        case 744:
            this.ba = this.h = 3;
            break;
        default:
            this.h = 0, this.ba = 4
    }
    this.v.register("serial" + this.h + "-input", function(d) {
        this.input.push(d);
        this.cd |= 1;
        this.be & 1 ? Zc(this, 12) : Zc(this, 4)
    }, this);
    a = a.A;
    M(a, b, this, function(d) {
        $c(this,
            d)
    }, function(d) {
        $c(this, d & 255);
        $c(this, d >> 8)
    });
    M(a, b | 1, this, function(d) {
        this.Bc & 128 ? this.nc = this.nc & 255 | d << 8 : (0 === (this.ec & 2) && d & 2 && Zc(this, 2), this.ec = d & 15, ad(this))
    });
    L(a, b, this, function() {
        if (this.Bc & 128) return this.nc & 255;
        var d = this.input.shift();
        0 === this.input.length && (this.cd &= -2, bd(this, 12), bd(this, 4));
        return d
    });
    L(a, b | 1, this, function() {
        return this.Bc & 128 ? this.nc >> 8 : this.ec & 15
    });
    L(a, b | 2, this, function() {
        var d = this.fc & 15;
        2 == this.fc && bd(this, 2);
        this.be & 1 && (d |= 192);
        return d
    });
    M(a, b | 2, this, function(d) {
        this.be =
            d
    });
    L(a, b | 3, this, function() {
        return this.Bc
    });
    M(a, b | 3, this, function(d) {
        this.Bc = d
    });
    L(a, b | 4, this, function() {
        return this.Oe
    });
    M(a, b | 4, this, function(d) {
        this.Oe = d
    });
    L(a, b | 5, this, function() {
        return this.cd
    });
    M(a, b | 5, this, function() {});
    L(a, b | 6, this, function() {
        return this.pf
    });
    M(a, b | 6, this, function() {});
    L(a, b | 7, this, function() {
        return this.Xe
    });
    M(a, b | 7, this, function(d) {
        this.Xe = d
    })
}
Yc.prototype.$ = function() {
    var a = [];
    a[0] = this.g;
    a[1] = this.nc;
    a[2] = this.Bc;
    a[3] = this.cd;
    a[4] = this.be;
    a[5] = this.ec;
    a[6] = this.fc;
    a[7] = this.Oe;
    a[8] = this.pf;
    a[9] = this.Xe;
    a[10] = this.ba;
    return a
};
Yc.prototype.G = function(a) {
    this.g = a[0];
    this.nc = a[1];
    this.Bc = a[2];
    this.cd = a[3];
    this.be = a[4];
    this.ec = a[5];
    this.fc = a[6];
    this.Oe = a[7];
    this.pf = a[8];
    this.Xe = a[9];
    this.ba = a[10]
};

function ad(a) {
    a.g & 4096 && a.ec & 1 ? (a.fc = 12, a.s.Ja(a.ba)) : a.g & 16 && a.ec & 1 ? (a.fc = 4, a.s.Ja(a.ba)) : a.g & 4 && a.ec & 2 ? (a.fc = 2, a.s.Ja(a.ba)) : a.g & 1 && a.ec & 8 ? (a.fc = 0, a.s.Ja(a.ba)) : (a.fc = 1, Ib(a.s, a.ba))
}

function Zc(a, b) {
    a.g |= 1 << b;
    ad(a)
}

function bd(a, b) {
    a.g &= ~(1 << b);
    ad(a)
}

function $c(a, b) {
    if (a.Bc & 128) a.nc = a.nc & -256 | b;
    else if (Zc(a, 2), 255 !== b) {
        var c = String.fromCharCode(b);
        a.v.send("serial" + a.h + "-output-char", c);
        a.i.push(b);
        "\n" === c && (a.v.send("serial" + a.h + "-output-line", String.fromCharCode.apply("", a.i)), a.i = [])
    }
};

function cd(a) {
    this.s = a;
    var b = a.A;
    Sb(a.u.Ha, {
        Ia: 56,
        J: [134, 128, 19, 113, 7, 0, 128, 2, 8, 0, 128, 6, 0, 0, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 0, 0],
        ib: [],
        name: "acpi"
    });
    this.g = this.h = 0;
    this.status = 1;
    this.je = this.kd = 0;
    this.i = dd(this, nb());
    this.Eb = new Uint8Array(4);
    L(b, 45056, this, void 0, function() {
        return this.kd
    });
    M(b, 45056, this, void 0, function(c) {
        this.kd &= ~c
    });
    L(b, 45058, this, void 0, function() {
        return this.je
    });
    M(b, 45058, this, void 0, function(c) {
        this.je =
            c
    });
    L(b, 45060, this, void 0, function() {
        return this.status
    });
    M(b, 45060, this, void 0, function(c) {
        this.status = c
    });
    L(b, 45064, this, void 0, void 0, function() {
        return dd(this, nb()) & 16777215
    });
    L(b, 45024, this, function() {
        return this.Eb[0]
    });
    L(b, 45025, this, function() {
        return this.Eb[1]
    });
    L(b, 45026, this, function() {
        return this.Eb[2]
    });
    L(b, 45027, this, function() {
        return this.Eb[3]
    });
    M(b, 45024, this, function(c) {
        this.Eb[0] = c
    });
    M(b, 45025, this, function(c) {
        this.Eb[1] = c
    });
    M(b, 45026, this, function(c) {
        this.Eb[2] = c
    });
    M(b, 45027, this,
        function(c) {
            this.Eb[3] = c
        })
}
cd.prototype.rb = function(a) {
    a = dd(this, a);
    var b = 0 !== ((a ^ this.i) & 8388608);
    this.je & 1 && b ? (this.kd |= 1, this.s.Ja(9)) : Ib(this.s, 9);
    this.i = a;
    return 100
};

function dd(a, b) {
    b = Math.round(3579.545 * b);
    b === a.h ? 3579.545 > a.g && a.g++ : a.h + a.g <= b && (a.g = 0, a.h = b);
    return a.h + a.g
}
cd.prototype.$ = function() {
    var a = [];
    a[0] = this.status;
    a[1] = this.kd;
    a[2] = this.je;
    a[3] = this.Eb;
    return a
};
cd.prototype.G = function(a) {
    this.status = a[0];
    this.kd = a[1];
    this.je = a[2];
    this.Eb = a[3]
};

function ed(a) {
    this.s = a;
    this.Y = this.pa = 0;
    this.aa = 1;
    this.g = this.l = 0;
    this.j = nb();
    this.K = this.O = this.N = this.T = this.h = 65536;
    this.F = this.D = this.B = 0;
    this.i = new Int32Array(8);
    this.R = new Int32Array(8);
    this.o = new Int32Array(8);
    this.X = 254;
    this.C = -1;
    this.V = this.error = this.I = 0;
    hb(a.A, 4276092928, 1048576, b => {
        var c = b & 3;
        return this.me(b & -4) >> 8 * c & 255
    }, () => {}, b => this.me(b), (b, c) => this.Lc(b, c))
}
q = ed.prototype;
q.me = function(a) {
    a = a - 4276092928 | 0;
    switch (a) {
        case 32:
            return this.pa;
        case 48:
            return 327700;
        case 128:
            return this.B;
        case 208:
            return this.I;
        case 224:
            return this.C;
        case 240:
            return this.X;
        case 256:
        case 272:
        case 288:
        case 304:
        case 320:
        case 336:
        case 352:
        case 368:
            return this.R[a - 256 >> 4];
        case 384:
        case 400:
        case 416:
        case 432:
        case 448:
        case 464:
        case 480:
        case 496:
            return this.o[a - 384 >> 4];
        case 512:
        case 528:
        case 544:
        case 560:
        case 576:
        case 592:
        case 608:
        case 624:
            return this.i[a - 512 >> 4];
        case 640:
            return this.V;
        case 768:
            return this.D;
        case 784:
            return this.F;
        case 800:
            return this.h;
        case 832:
            return this.T;
        case 848:
            return this.N;
        case 864:
            return this.O;
        case 880:
            return this.K;
        case 992:
            return this.Y;
        case 896:
            return this.l;
        case 912:
            return this.g;
        default:
            return 0
    }
};
q.Lc = function(a, b) {
    switch (a - 4276092928 | 0) {
        case 128:
            this.B = b & 255;
            fd(this);
            break;
        case 176:
            b = gd(this.R);
            if (-1 !== b) {
                hd(this.R, b);
                if (this.o[b >> 5] >> (b & 31) & 1) {
                    a = this.s.u.yc;
                    for (var c = 0; 24 > c; c++) {
                        var d = a.g[c];
                        (d & 255) === b && d & 16384 && (a.g[c] &= -16385, id(a, c))
                    }
                }
                fd(this)
            }
            break;
        case 208:
            this.I = b & 4278190080;
            break;
        case 224:
            this.C = b | 16777215;
            break;
        case 240:
            this.X = b;
            break;
        case 640:
            this.V = this.error;
            this.error = 0;
            break;
        case 768:
            a = b & 255;
            c = b >> 8 & 7;
            d = b >> 15 & 1;
            var e = b >> 18 & 3;
            this.D = b & -4097;
            0 === e ? jd(this, a, c, d) : 1 === e ? jd(this,
                a, 0, d) : 2 === e && jd(this, a, c, d);
            break;
        case 784:
            this.F = b;
            break;
        case 800:
            this.h = b;
            break;
        case 832:
            this.T = b;
            break;
        case 848:
            this.N = b;
            break;
        case 864:
            this.O = b;
            break;
        case 880:
            this.K = b;
            break;
        case 992:
            this.Y = b;
            b = b & 3 | (b & 8) >> 1;
            this.aa = 7 === b ? 0 : b + 1;
            break;
        case 896:
            this.l = b >>> 0, this.g = b >>> 0, this.j = nb()
    }
};
q.rb = function(a) {
    if (0 === this.g) return 100;
    const b = 1E6 / (1 << this.aa);
    a = (a - this.j) * b >>> 0;
    this.j += a / b;
    this.g -= a;
    0 >= this.g && (a = this.h & 393216, 131072 === a ? (this.g %= this.l, 0 >= this.g && (this.g += this.l), 0 === (this.h & 65536) && jd(this, this.h & 255, 0, !1)) : 0 === a && (this.g = 0, 0 === (this.h & 65536) && jd(this, this.h & 255, 0, !1)));
    return Math.max(0, this.g / b)
};

function jd(a, b, c, d) {
    5 === c || 4 === c || a.i[b >> 5] >> (b & 31) & 1 || (kd(a.i, b), d ? kd(a.o, b) : hd(a.o, b), fd(a))
}

function fd(a) {
    var b = gd(a.i); - 1 !== b && (gd(a.R) >= b || (b & 240) <= (a.B & 240) || pb(a.s))
}
q.Sd = function() {
    var a = gd(this.i); - 1 === a || gd(this.R) >= a || (a & 240) <= (this.B & 240) || (hd(this.i, a), kd(this.R, a), this.s.C(a), fd(this))
};
q.$ = function() {
    var a = [];
    a[0] = this.pa;
    a[1] = this.Y;
    a[2] = this.aa;
    a[3] = this.l;
    a[4] = this.g;
    a[5] = this.j;
    a[6] = this.h;
    a[7] = this.T;
    a[8] = this.N;
    a[9] = this.O;
    a[10] = this.K;
    a[11] = this.B;
    a[12] = this.D;
    a[13] = this.F;
    a[14] = this.i;
    a[15] = this.R;
    a[16] = this.o;
    a[17] = this.X;
    a[18] = this.C;
    a[19] = this.I;
    a[20] = this.error;
    a[21] = this.V;
    return a
};
q.G = function(a) {
    this.pa = a[0];
    this.Y = a[1];
    this.aa = a[2];
    this.l = a[3];
    this.g = a[4];
    this.j = a[5];
    this.h = a[6];
    this.T = a[7];
    this.N = a[8];
    this.O = a[9];
    this.K = a[10];
    this.B = a[11];
    this.D = a[12];
    this.F = a[13];
    this.i = a[14];
    this.R = a[15];
    this.o = a[16];
    this.X = a[17];
    this.C = a[18];
    this.I = a[19];
    this.error = a[20];
    this.V = a[21]
};

function kd(a, b) {
    a[b >> 5] |= 1 << (b & 31)
}

function hd(a, b) {
    a[b >> 5] &= ~(1 << (b & 31))
}

function gd(a) {
    for (var b = 7; 0 <= b; b--) {
        var c = a[b];
        if (c) return sb(c >>> 0) | b << 5
    }
    return -1
};

function ld(a) {
    this.s = a;
    this.g = new Int32Array(24);
    this.o = new Int32Array(24);
    for (var b = 0; b < this.g.length; b++) this.g[b] = 65536;
    this.i = this.h = this.l = this.j = 0;
    hb(a.A, 4273995776, 131072, c => {
        c = c - 4273995776 | 0;
        return 16 <= c && 20 > c ? (c -= 16, this.read(this.j) >> 8 * c & 255) : 0
    }, () => {}, c => {
        c = c - 4273995776 | 0;
        return 0 === c ? this.j : 16 === c ? this.read(this.j) : 0
    }, (c, d) => {
        c = c - 4273995776 | 0;
        0 === c ? this.j = d : 16 === c && this.write(this.j, d)
    })
}

function id(a, b) {
    var c = 1 << b;
    if (0 !== (a.h & c)) {
        var d = a.g[b];
        if (0 === (d & 65536)) {
            var e = d >> 8 & 7;
            if (0 === (d & 32768)) a.h &= ~c;
            else if (a.g[b] |= 16384, d & 16384) return;
            0 !== e && 1 !== e || jd(a.s.u.Mc, d & 255, e, 32768 === (d & 32768));
            a.g[b] &= -4097
        }
    }
}
q = ld.prototype;
q.Qd = function(a) {
    if (!(24 <= a)) {
        var b = 1 << a;
        0 === (this.i & b) && (this.i |= b, 65536 !== (this.g[a] & 98304) && (this.h |= b, id(this, a)))
    }
};
q.Td = function(a) {
    if (!(24 <= a)) {
        var b = 1 << a;
        (this.i & b) === b && (this.i &= ~b, this.g[a] & 32768 && (this.h &= ~b))
    }
};
q.read = function(a) {
    if (0 === a) return this.l << 24;
    if (1 === a) return 1507345;
    if (2 === a) return this.l << 24;
    if (16 <= a && 64 > a) {
        var b = a - 16 >> 1;
        return a & 1 ? this.o[b] : this.g[b]
    }
    return 0
};
q.write = function(a, b) {
    if (0 === a) this.l = b >>> 24 & 15;
    else if (1 !== a && 2 !== a && 16 <= a && 64 > a) {
        var c = a - 16 >> 1;
        a & 1 ? this.o[c] = b & 4278190080 : (this.g[c] = b & 110591 | this.g[c] & -110592, id(this, c))
    }
};
q.$ = function() {
    var a = [];
    a[0] = this.g;
    a[1] = this.o;
    a[2] = this.j;
    a[3] = this.l;
    a[4] = this.h;
    a[5] = this.i;
    return a
};
q.G = function(a) {
    this.g = a[0];
    this.o = a[1];
    this.j = a[2];
    this.l = a[3];
    this.h = a[4];
    this.i = a[5]
};

function md(a) {
    this.message = a
}
md.prototype = Error();
const nd = {
    Uint8Array,
    Int8Array,
    Uint16Array,
    Int16Array,
    Uint32Array,
    Int32Array,
    Float32Array,
    Float64Array
};

function od(a, b) {
    if ("object" !== typeof a || null === a) return a;
    if (a instanceof Array) return a.map(e => od(e, b));
    a.constructor === Object && console.log(a);
    if (a.BYTES_PER_ELEMENT) {
        var c = new Uint8Array(a.buffer, a.byteOffset, a.length * a.BYTES_PER_ELEMENT);
        return {
            __state_type__: a.constructor.name.replace("bound ", ""),
            buffer_id: b.push(c) - 1
        }
    }
    a = a.$();
    c = [];
    for (var d = 0; d < a.length; d++) c[d] = od(a[d], b);
    return c
}

function pd(a, b) {
    if ("object" !== typeof a || null === a) return a;
    if (a instanceof Array) {
        for (let c = 0; c < a.length; c++) a[c] = pd(a[c], b);
        return a
    }
    return new nd[a.__state_type__](b[a.buffer_id])
}
jb.prototype.oe = function() {
    for (var a = [], b = od(this, a), c = [], d = 0, e = 0; e < a.length; e++) {
        var g = a[e].byteLength;
        c[e] = {
            offset: d,
            length: g
        };
        d += g;
        d = d + 3 & -4
    }
    e = JSON.stringify({
        buffer_infos: c,
        state: b
    });
    e = (new TextEncoder).encode(e);
    b = 16 + e.length;
    b = b + 3 & -4;
    g = b + d;
    d = new ArrayBuffer(g);
    var h = new Int32Array(d, 0, 4);
    (new Uint8Array(d, 16, e.length)).set(e);
    b = new Uint8Array(d, b);
    h[0] = -2039052682;
    h[1] = 6;
    h[2] = g;
    h[3] = e.length;
    for (e = 0; e < a.length; e++) b.set(a[e], c[e].offset);
    return d
};
jb.prototype.Md = function(a) {
    function b(m, t) {
        const p = m.length;
        if (16 > p) throw new md("Invalid length: " + p);
        m = new Int32Array(m.buffer, m.byteOffset, 4);
        if (-2039052682 !== m[0]) throw new md("Invalid header: " + zb(m[0] >>> 0));
        if (6 !== m[1]) throw new md("Version mismatch: dump=" + m[1] + " we=6");
        if (t && m[2] !== p) throw new md("Length doesn't match header: real=" + p + " header=" + m[2]);
        return m[3]
    }

    function c(m) {
        m = (new TextDecoder).decode(m);
        return JSON.parse(m)
    }
    a = new Uint8Array(a);
    if (4247762216 === (new Uint32Array(a.buffer,
            0, 1))[0]) {
        var d = this.Rj(a.length);
        (new Uint8Array(this.Pa.buffer, this.Tj(d), a.length)).set(a);
        var e = this.ye(d, 16),
            g = new Uint8Array(this.Pa.buffer, e, 16),
            h = b(g, !1);
        this.ze(e, 16);
        e = this.ye(d, h);
        g = new Uint8Array(this.Pa.buffer, e, h);
        g = c(g);
        this.ze(e, h);
        e = g.state;
        var f = g.buffer_infos;
        g = [];
        h = 16 + h;
        for (var k of f) {
            f = (h + 3 & -4) - h;
            if (1048576 < k.length) {
                var l = this.ye(d, f);
                this.ze(l, f);
                l = new Uint8Array(k.length);
                g.push(l.buffer);
                for (var n = 0; n < k.length;) {
                    const m = Math.min(k.length - n, 1048576),
                        t = this.ye(d, m);
                    l.set(new Uint8Array(this.Pa.buffer,
                        t, m), n);
                    this.ze(t, m);
                    n += m
                }
            } else l = this.ye(d, f + k.length), n = l + f, g.push(this.Pa.buffer.slice(n, n + k.length)), this.ze(l, f + k.length);
            h += f + k.length
        }
        e = pd(e, g);
        this.G(e);
        this.Sj(d)
    } else {
        k = b(a, !0);
        if (0 > k || k + 12 >= a.length) throw new md("Invalid info block length: " + k);
        e = c(a.subarray(16, 16 + k));
        d = e.state;
        e = e.buffer_infos;
        let m = 16 + k;
        m = m + 3 & -4;
        k = e.map(t => {
            const p = m + t.offset;
            return a.buffer.slice(p, p + t.length)
        });
        d = pd(d, k);
        this.G(d)
    }
};

function qd(a, b, c) {
    a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && (a[0] = c[0], a[1] = c[1], a[2] = c[2], a[3] = c[3], a[4] = c[4], a[5] = c[5]);
    a[6] === b[0] && a[7] === b[1] && a[8] === b[2] && a[9] === b[3] && a[10] === b[4] && a[11] === b[5] && (a[6] = c[0], a[7] = c[1], a[8] = c[2], a[9] = c[3], a[10] = c[4], a[11] = c[5]);
    var d = a[12] << 8 | a[13];
    if (2048 === d) {
        if (a = a.subarray(14), 4 === a[0] >> 4 && 17 === a[9] && (a = a.subarray(20), d = a[2] << 8 | a[3], 67 === (a[0] << 8 | a[1]) || 67 === d)) {
            const e = a.subarray(8);
            if (1669485411 === (e[236] << 24 | e[237] <<
                    16 | e[238] << 8 | e[239]))
                for (e[28] === b[0] && e[29] === b[1] && e[30] === b[2] && e[31] === b[3] && e[32] === b[4] && e[33] === b[5] && (e[28] = c[0], e[29] = c[1], e[30] = c[2], e[31] = c[3], e[32] = c[4], e[33] = c[5], a[6] = a[7] = 0), d = 240; d < e.length;) {
                    const g = e[d++];
                    if (255 === g) break;
                    const h = e[d++];
                    61 === g && 1 === e[d + 0] && e[d + 1] === b[0] && e[d + 2] === b[1] && e[d + 3] === b[2] && e[d + 4] === b[3] && e[d + 5] === b[4] && e[d + 6] === b[5] && (e[d + 1] = c[0], e[d + 2] = c[1], e[d + 3] = c[2], e[d + 4] = c[3], e[d + 5] = c[4], e[d + 6] = c[5], a[6] = a[7] = 0);
                    d += h
                }
        }
    } else 2054 === d && (a = a.subarray(14), a[8] === b[0] &&
        a[9] === b[1] && a[10] === b[2] && a[11] === b[3] && a[12] === b[4] && a[13] === b[5] && (a[8] = c[0], a[9] = c[1], a[10] = c[2], a[11] = c[3], a[12] = c[4], a[13] = c[5]))
}

function rd(a, b, c, d) {
    this.s = a;
    this.Ha = a.u.Ha;
    this.tf = c;
    this.Gb = d;
    this.v = b;
    this.v.register("net0-receive", function(e) {
        if (!(this.La & 1) && (this.v.send("eth-receive-end", [e.length]), this.Nd & 16 || this.Nd & 4 && 255 === e[0] && 255 === e[1] && 255 === e[2] && 255 === e[3] && 255 === e[4] && 255 === e[5] || !(this.Nd & 8 && 1 === (e[0] & 1) || e[0] !== this.sa[0] || e[1] !== this.sa[1] || e[2] !== this.sa[2] || e[3] !== this.sa[3] || e[4] !== this.sa[4] || e[5] !== this.sa[5]))) {
            this.he && (e = new Uint8Array(e), qd(e, this.sa, this.he));
            var g = this.vb << 8,
                h = Math.max(60, e.length) +
                4,
                f = g + 4,
                k = this.vb + 1 + (h >> 8);
            if (!((this.pc > this.vb ? this.pc - this.vb : this.Va - this.vb + this.pc - this.Kb) < 1 + (h >> 8) && 0 !== this.pc)) {
                if (g + h > this.Va << 8) {
                    var l = (this.Va << 8) - f;
                    this.memory.set(e.subarray(0, l), f);
                    this.memory.set(e.subarray(l), this.Kb << 8)
                } else this.memory.set(e, f), 60 > e.length && this.memory.fill(0, f + e.length, f + 60);
                k >= this.Va && (k += this.Kb - this.Va);
                this.memory[g] = 1;
                this.memory[g + 1] = k;
                this.memory[g + 2] = h;
                this.memory[g + 3] = h >> 8;
                this.vb = k;
                sd(this, 1)
            }
        }
    }, this);
    this.port = 768;
    this.name = "ne2k";
    this.J = [236, 16, 41,
        128, 3, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, this.port & 255 | 1, this.port >> 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 26, 0, 17, 0, 0, 184, 254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0
    ];
    this.Ia = 40;
    this.ib = [{
        size: 32
    }];
    this.Ie = this.R = 0;
    this.La = 1;
    this.Ze = this.vd = this.qb = this.Ud = 0;
    this.memory = new Uint8Array(32768);
    this.Gf = this.Nd = 0;
    this.Ff = 1;
    this.sa = new Uint8Array([0, 34, 21, 255 * Math.random() | 0, 255 * Math.random() | 0, 255 * Math.random() | 0]);
    this.he = null;
    for (b = 0; 6 > b; b++) this.memory[b << 1] = this.memory[b << 1 | 1] = this.sa[b];
    this.memory[28] = this.memory[29] =
        87;
    this.memory[30] = this.memory[31] = 87;
    this.ua = 0;
    this.Kb = 64;
    this.Va = 128;
    this.pc = this.vb = 76;
    b = a.A;
    L(b, this.port | 0, this, function() {
        return this.La
    });
    M(b, this.port | 0, this, function(e) {
        this.La = e;
        this.La & 1 || (e & 24 && 0 === this.qb && sd(this, 64), e & 4 && (e = this.Ze << 8, e = this.memory.subarray(e, e + this.vd), this.he && (e = new Uint8Array(e), qd(e, this.he, this.sa)), this.v.send("net0-send", e), this.v.send("eth-transmit-end", [e.length]), this.La &= -5, sd(this, 2)))
    });
    L(b, this.port | 13, this, function() {
        return 0
    });
    L(b, this.port | 14, this,
        function() {
            return 0
        },
        function() {
            return 0
        });
    L(b, this.port | 15, this, function() {
        return 0
    });
    L(b, this.port | 31, this, function() {
        sd(this, 128);
        return 0
    });
    M(b, this.port | 31, this, function() {});
    L(b, this.port | 1, this, function() {
        var e = S(this);
        return 0 === e ? this.Kb : 1 === e ? this.sa[0] : 2 === e ? this.Kb : 0
    });
    M(b, this.port | 1, this, function(e) {
        var g = S(this);
        0 === g ? this.Kb = e : 1 === g && (this.sa[0] = e)
    });
    L(b, this.port | 2, this, function() {
        var e = S(this);
        return 0 === e ? this.Va : 1 === e ? this.sa[1] : 2 === e ? this.Va : 0
    });
    M(b, this.port | 2, this, function(e) {
        var g =
            S(this);
        0 === g ? (e > this.memory.length >> 8 && (e = this.memory.length >> 8), this.Va = e) : 1 === g && (this.sa[1] = e)
    });
    L(b, this.port | 7, this, function() {
        var e = S(this);
        if (0 === e) return this.R;
        if (1 === e) return this.vb
    });
    M(b, this.port | 7, this, function(e) {
        var g = S(this);
        0 === g ? (this.R &= ~e, td(this)) : 1 === g && (this.vb = e)
    });
    M(b, this.port | 13, this, function(e) {
        0 === S(this) && (this.Gf = e)
    });
    M(b, this.port | 14, this, function(e) {
        0 === S(this) && (this.Ud = e)
    });
    L(b, this.port | 10, this, function() {
        return 0 === S(this) ? 80 : 0
    });
    M(b, this.port | 10, this, function(e) {
        0 ===
            S(this) && (this.qb = this.qb & 65280 | e & 255)
    });
    L(b, this.port | 11, this, function() {
        return 0 === S(this) ? 67 : 0
    });
    M(b, this.port | 11, this, function(e) {
        0 === S(this) && (this.qb = this.qb & 255 | e << 8 & 65280)
    });
    L(b, this.port | 8, this, function() {
        if (0 === S(this)) return this.ua & 255
    });
    M(b, this.port | 8, this, function(e) {
        0 === S(this) && (this.ua = this.ua & 65280 | e & 255)
    });
    L(b, this.port | 9, this, function() {
        if (0 === S(this)) return this.ua >> 8 & 255
    });
    M(b, this.port | 9, this, function(e) {
        0 === S(this) && (this.ua = this.ua & 255 | e << 8 & 65280)
    });
    M(b, this.port | 15, this,
        function(e) {
            0 === S(this) && (this.Ie = e, td(this))
        });
    L(b, this.port | 3, this, function() {
        var e = S(this);
        return 0 === e ? this.pc : 1 === e ? this.sa[2] : 0
    });
    M(b, this.port | 3, this, function(e) {
        var g = S(this);
        0 === g ? this.pc = e : 1 === g && (this.sa[2] = e)
    });
    L(b, this.port | 4, this, function() {
        var e = S(this);
        return 0 === e ? this.Ff : 1 === e ? this.sa[3] : 0
    });
    M(b, this.port | 4, this, function(e) {
        var g = S(this);
        0 === g ? this.Ze = e : 1 === g && (this.sa[3] = e)
    });
    L(b, this.port | 5, this, function() {
        var e = S(this);
        return 0 === e ? 0 : 1 === e ? this.sa[4] : 0
    });
    M(b, this.port | 5, this,
        function(e) {
            var g = S(this);
            0 === g ? this.vd = this.vd & -256 | e : 1 === g && (this.sa[4] = e)
        });
    L(b, this.port | 6, this, function() {
        var e = S(this);
        return 0 === e ? 0 : 1 === e ? this.sa[5] : 0
    });
    M(b, this.port | 6, this, function(e) {
        var g = S(this);
        0 === g ? this.vd = this.vd & 255 | e << 8 : 1 === g && (this.sa[5] = e)
    });
    L(b, this.port | 12, this, function() {
        return 0 === S(this) ? 9 : 0
    });
    M(b, this.port | 12, this, function(e) {
        0 === S(this) && (this.Nd = e)
    });
    L(b, this.port | 16, this, this.lh, this.Rf, this.kh);
    M(b, this.port | 16, this, this.Sf, this.Sf, this.mh);
    Sb(a.u.Ha, this)
}
q = rd.prototype;
q.$ = function() {
    var a = [];
    a[0] = this.R;
    a[1] = this.Ie;
    a[2] = this.La;
    a[3] = this.Ud;
    a[4] = this.qb;
    a[5] = this.vd;
    a[6] = this.Ze;
    a[7] = this.ua;
    a[8] = this.Kb;
    a[9] = this.vb;
    a[10] = this.pc;
    a[11] = this.Va;
    a[12] = this.Nd;
    a[13] = this.Gf;
    a[14] = this.Ff;
    a[15] = this.sa;
    a[16] = this.memory;
    return a
};
q.G = function(a) {
    this.R = a[0];
    this.Ie = a[1];
    this.La = a[2];
    this.Ud = a[3];
    this.qb = a[4];
    this.vd = a[5];
    this.Ze = a[6];
    this.ua = a[7];
    this.Kb = a[8];
    this.vb = a[9];
    this.pc = a[10];
    this.Va = a[11];
    this.Nd = a[12];
    this.Gf = a[13];
    this.Ff = a[14];
    this.tf ? (this.sa = a[15], this.memory = a[16]) : this.Gb && (this.he = a[15], this.memory = a[16])
};

function sd(a, b) {
    a.R |= b;
    td(a)
}

function td(a) {
    a.Ie & a.R ? a.Ha.za(a.Ia) : lc(a.Ha, a.Ia)
}

function ud(a, b) {
    if (16 >= a.ua || 16384 <= a.ua && 32768 > a.ua) a.memory[a.ua] = b;
    a.ua++;
    a.qb--;
    a.ua >= a.Va << 8 && (a.ua += a.Kb - a.Va << 8);
    0 === a.qb && sd(a, 64)
}
q.Sf = function(a) {
    ud(this, a);
    this.Ud & 1 && ud(this, a >> 8)
};
q.mh = function(a) {
    ud(this, a);
    ud(this, a >> 8);
    ud(this, a >> 16);
    ud(this, a >> 24)
};

function vd(a) {
    let b = 0;
    32768 > a.ua && (b = a.memory[a.ua]);
    a.ua++;
    a.qb--;
    a.ua >= a.Va << 8 && (a.ua += a.Kb - a.Va << 8);
    0 === a.qb && sd(a, 64);
    return b
}
q.lh = function() {
    return this.Rf() & 255
};
q.Rf = function() {
    return this.Ud & 1 ? vd(this) | vd(this) << 8 : vd(this)
};
q.kh = function() {
    return vd(this) | vd(this) << 8 | vd(this) << 16 | vd(this) << 24
};

function S(a) {
    return a.La >> 6 & 3
};
var wd = new Uint8Array(256),
    xd = [],
    yd = [],
    zd = [],
    Ad = new Uint8Array(256),
    Bd = [];

function Cd(a, b) {
    this.s = a;
    this.v = b;
    this.Ba = new Cb(64);
    this.da = new Cb(64);
    this.i = this.o = this.lb = this.I = 0;
    this.L = new Uint8Array(256);
    Dd(this);
    this.Ed = !1;
    this.qe = 0;
    this.ob = this.nb = this.Uc = this.cc = !1;
    this.wb = [new Db, new Db];
    this.eb = a.u.eb;
    this.fb = this.bc = this.j = this.zb = this.l = this.D = 0;
    this.Ab = 1;
    this.Tc = 5;
    this.yb = !1;
    this.g = new ArrayBuffer(65536);
    this.Y = new Int8Array(this.g);
    this.C = new Uint8Array(this.g);
    this.X = new Int16Array(this.g);
    this.aa = new Uint16Array(this.g);
    this.Qa = new Bb(this.g);
    this.Bb = this.B = !1;
    this.Ya = 22050;
    b.send("dac-tell-sampling-rate", this.Ya);
    this.h = 1;
    this.N = 170;
    this.K = 0;
    this.Nc = new Uint8Array(256);
    this.F = new Cb(64);
    this.T = this.O = this.Sa = 0;
    this.Bh = !1;
    this.ba = 5;
    this.Yc = new Uint8Array(16);
    a.A.pd(544, this, this.vg, this.xg, this.di, this.fi);
    a.A.pd(904, this, this.vg, this.xg);
    a.A.pd(548, this, this.hi, this.ji);
    L(a.A, 550, this, this.li);
    L(a.A, 551, this, this.ni);
    L(a.A, 552, this, this.pi);
    L(a.A, 553, this, this.si);
    L(a.A, 554, this, this.ui);
    L(a.A, 555, this, this.wi);
    L(a.A, 556, this, this.yi);
    L(a.A, 557, this,
        this.Ai);
    a.A.pd(558, this, this.Ci, this.Ei);
    a.A.Lb(544, this, this.wg, this.yg, this.ei, this.gi);
    a.A.Lb(904, this, this.wg, this.yg);
    a.A.Lb(548, this, this.ii, this.ki);
    M(a.A, 550, this, this.mi);
    M(a.A, 551, this, this.oi);
    a.A.Lb(552, this, this.ri, this.ti);
    M(a.A, 554, this, this.vi);
    M(a.A, 555, this, this.xi);
    M(a.A, 556, this, this.zi);
    M(a.A, 557, this, this.Bi);
    M(a.A, 558, this, this.Di);
    M(a.A, 559, this, this.Fi);
    a.A.pd(816, this, this.jj, this.lj);
    a.A.Lb(816, this, this.kj, this.mj);
    this.eb.$e.push({
        Ge: this.pa,
        Ef: this
    });
    b.register("dac-request-data",
        function() {
            !this.zb || this.Bb ? Ed(this) : Fd(this)
        }, this);
    b.register("speaker-has-initialized", function() {
        Dd(this)
    }, this);
    b.send("speaker-confirm-initialized");
    Gd(this)
}

function Gd(a) {
    a.Ba.clear();
    a.da.clear();
    a.lb = 0;
    a.o = 0;
    a.Ed = !1;
    a.qe = 0;
    a.cc = !1;
    a.Uc = !1;
    a.nb = !1;
    a.ob = !1;
    a.wb[0].clear();
    a.wb[1].clear();
    a.D = 0;
    a.l = 0;
    a.zb = 0;
    a.j = 0;
    a.bc = 0;
    a.fb = 0;
    a.yb = !1;
    a.C.fill(0);
    a.B = !1;
    a.Bb = !1;
    a.N = 170;
    a.K = 0;
    a.Ya = 22050;
    a.h = 1;
    Hd(a, 1);
    a.Yc.fill(0);
    a.Nc.fill(0);
    a.Nc[5] = 1;
    a.Nc[9] = 248
}
q = Cd.prototype;
q.$ = function() {
    var a = [];
    a[2] = this.I;
    a[3] = this.lb;
    a[4] = this.o;
    a[5] = this.i;
    a[6] = this.L;
    a[7] = this.Ed;
    a[8] = this.qe;
    a[9] = this.cc;
    a[10] = this.Uc;
    a[11] = this.nb;
    a[12] = this.ob;
    a[15] = this.D;
    a[16] = this.l;
    a[17] = this.zb;
    a[18] = this.j;
    a[19] = this.bc;
    a[20] = this.fb;
    a[21] = this.Ab;
    a[22] = this.Tc;
    a[23] = this.yb;
    a[24] = this.C;
    a[25] = this.B;
    a[26] = this.Bb;
    a[27] = this.Ya;
    a[28] = this.h;
    a[29] = this.N;
    a[30] = this.K;
    a[31] = this.Nc;
    a[33] = this.cb;
    a[34] = this.ba;
    a[35] = this.Yc;
    return a
};
q.G = function(a) {
    this.I = a[2];
    this.lb = a[3];
    this.o = a[4];
    this.i = a[5];
    this.L = a[6];
    Id(this);
    this.Ed = a[7];
    this.qe = a[8];
    this.cc = a[9];
    this.Uc = a[10];
    this.nb = a[11];
    this.ob = a[12];
    this.D = a[15];
    this.l = a[16];
    this.zb = a[17];
    this.j = a[18];
    this.bc = a[19];
    this.fb = a[20];
    this.Ab = a[21];
    this.Tc = a[22];
    this.yb = a[23];
    this.C = a[24];
    this.B = a[25];
    this.Bb = a[26];
    this.Ya = a[27];
    this.h = a[28];
    this.N = a[29];
    this.K = a[30];
    this.Nc = a[31];
    this.cb = a[33];
    this.ba = a[34];
    this.Yc = a[35];
    this.g = this.C.buffer;
    this.Y = new Int8Array(this.g);
    this.X = new Int16Array(this.g);
    this.aa = new Uint16Array(this.g);
    this.Qa = new Bb(this.g);
    this.Bb ? this.v.send("dac-disable") : this.v.send("dac-enable")
};
q.vg = function() {
    return 255
};
q.xg = function() {
    return 255
};
q.di = function() {
    return 255
};
q.fi = function() {
    return 255
};
q.hi = function() {
    return this.i
};
q.ji = function() {
    var a = this.i,
        b = yd[a];
    return b ? b.call(this) : this.L[a]
};
q.li = function() {
    return 255
};
q.ni = function() {
    return 255
};
q.pi = function() {
    return 255
};
q.si = function() {
    return 255
};
q.ui = function() {
    this.da.length && (this.I = this.da.shift());
    return this.I
};
q.wi = function() {
    return 255
};
q.yi = function() {
    return 127
};
q.Ai = function() {
    return 255
};
q.Ci = function() {
    this.Yc[1] && Hd(this, 1);
    return (this.da.length && !this.cc) << 7 | 127
};
q.Ei = function() {
    Hd(this, 2);
    return 0
};
q.wg = function() {
    this.O = 0
};
q.yg = function(a) {
    var b = Bd[this.O];
    b || (b = this.V);
    b.call(this, a, 0, this.O)
};
q.ei = function() {
    this.T = 0
};
q.gi = function(a) {
    var b = Bd[this.T];
    b || (b = this.V);
    b.call(this, a, 1, this.T)
};
q.ii = function(a) {
    this.i = a
};
q.ki = function(a) {
    Jd(this, this.i, a)
};
q.mi = function(a) {
    this.cc ? this.cc = !1 : a && Gd(this);
    this.da.clear();
    this.da.push(170)
};
q.oi = function() {};
q.ri = function() {};
q.ti = function() {};
q.vi = function() {};
q.xi = function() {};
q.zi = function(a) {
    0 === this.lb ? (this.lb = a, this.Ba.clear(), this.o = wd[a]) : this.Ba.push(a);
    this.Ba.length >= this.o && (a = xd[this.lb], a || (a = this.Wf), a.call(this), this.o = this.lb = 0, this.Ba.clear())
};
q.Bi = function() {};
q.Di = function() {};
q.Fi = function() {};
q.jj = function() {
    this.F.length && (this.Sa = this.F.shift());
    return this.Sa
};
q.kj = function() {};
q.lj = function() {
    return 0 | 128 * !this.F.length
};
q.mj = function(a) {
    255 == a && (this.F.clear(), this.F.push(254))
};
q.Wf = function() {};

function T(a, b, c) {
    c || (c = Cd.prototype.Wf);
    for (var d = 0; d < a.length; d++) wd[a[d]] = b, xd[a[d]] = c
}

function Kd(a) {
    for (var b = [], c = 0; 16 > c; c++) b.push(a + c);
    return b
}
T([14], 2, function() {
    this.Nc[this.Ba.shift()] = this.Ba.shift()
});
T([15], 1, function() {
    this.da.clear();
    this.da.push(this.Nc[this.Ba.shift()])
});
T([16], 1, function() {
    var a = this.Ba.shift();
    a = Ld(a / 127.5 + -1);
    this.wb[0].push(a);
    this.wb[1].push(a);
    this.v.send("dac-enable")
});
T([20, 21], 2, function() {
    this.bc = 1;
    this.fb = this.Ab;
    this.cc = this.nb = this.ob = this.yb = !1;
    Md(this);
    Nd(this)
});
T([22], 2);
T([23], 2);
T([28], 0, function() {
    this.bc = 1;
    this.fb = this.Ab;
    this.yb = !0;
    this.cc = this.nb = this.ob = !1;
    Nd(this)
});
T([31], 0);
T([32], 0, function() {
    this.da.clear();
    this.da.push(127)
});
T([36], 2);
T([44], 0);
T([48], 0);
T([49], 0);
T([52], 0);
T([53], 0);
T([54], 0);
T([55], 0);
T([56], 0);
T([64], 1, function() {
    Od(this, 1E6 / (256 - this.Ba.shift()) / (this.Uc ? 2 : 1))
});
T([65, 66], 2, function() {
    Od(this, this.Ba.shift() << 8 | this.Ba.shift())
});
T([72], 2, function() {
    Md(this)
});
T([116], 2);
T([117], 2);
T([118], 2);
T([119], 2);
T([125], 0);
T([127], 0);
T([128], 2);
T([144], 0, function() {
    this.bc = 1;
    this.fb = this.Ab;
    this.yb = !0;
    this.ob = !1;
    this.cc = !0;
    this.nb = !1;
    Nd(this)
});
T([145], 0);
T([152], 0);
T([153], 0);
T([160], 0);
T([168], 0);
T(Kd(176), 3, function() {
    if (!(this.lb & 8)) {
        var a = this.Ba.shift();
        this.bc = 2;
        this.fb = this.Tc;
        this.yb = !!(this.lb & 4);
        this.ob = !!(a & 16);
        this.Uc = !!(a & 32);
        this.nb = !0;
        Md(this);
        Nd(this)
    }
});
T(Kd(192), 3, function() {
    if (!(this.lb & 8)) {
        var a = this.Ba.shift();
        this.bc = 1;
        this.fb = this.Ab;
        this.yb = !!(this.lb & 4);
        this.ob = !!(a & 16);
        this.Uc = !!(a & 32);
        this.nb = !1;
        Md(this);
        Nd(this)
    }
});
T([208], 0, function() {
    this.Bb = !0;
    this.v.send("dac-disable")
});
T([209], 0, function() {
    this.Ed = !0
});
T([211], 0, function() {
    this.Ed = !1
});
T([212], 0, function() {
    this.Bb = !1;
    this.v.send("dac-enable")
});
T([213], 0, function() {
    this.Bb = !0;
    this.v.send("dac-disable")
});
T([214], 0, function() {
    this.Bb = !1;
    this.v.send("dac-enable")
});
T([216], 0, function() {
    this.da.clear();
    this.da.push(255 * this.Ed)
});
T([217, 218], 0, function() {
    this.yb = !1
});
T([224], 1, function() {
    this.da.clear();
    this.da.push(~this.Ba.shift())
});
T([225], 0, function() {
    this.da.clear();
    this.da.push(4);
    this.da.push(5)
});
T([226], 1);
T([227], 0, function() {
    this.da.clear();
    for (var a = 0; 44 > a; a++) this.da.push("COPYRIGHT (C) CREATIVE TECHNOLOGY LTD, 1992.".charCodeAt(a));
    this.da.push(0)
});
T([228], 1, function() {
    this.qe = this.Ba.shift()
});
T([232], 0, function() {
    this.da.clear();
    this.da.push(this.qe)
});
T([242, 243], 0, function() {
    this.za()
});
var Pd = new Uint8Array(256);
Pd[14] = 255;
Pd[15] = 7;
Pd[55] = 56;
T([249], 1, function() {
    var a = this.Ba.shift();
    this.da.clear();
    this.da.push(Pd[a])
});

function Jd(a, b, c) {
    (b = zd[b]) && b.call(a, c)
}
Cd.prototype.Ra = function() {
    return this.L[this.i]
};
Cd.prototype.bb = function(a) {
    this.L[this.i] = a
};

function Dd(a) {
    a.L[4] = 204;
    a.L[34] = 204;
    a.L[38] = 204;
    a.L[40] = 0;
    a.L[46] = 0;
    a.L[10] = 0;
    a.L[48] = 192;
    a.L[49] = 192;
    a.L[50] = 192;
    a.L[51] = 192;
    a.L[52] = 192;
    a.L[53] = 192;
    a.L[54] = 0;
    a.L[55] = 0;
    a.L[56] = 0;
    a.L[57] = 0;
    a.L[59] = 0;
    a.L[60] = 31;
    a.L[61] = 21;
    a.L[62] = 11;
    a.L[63] = 0;
    a.L[64] = 0;
    a.L[65] = 0;
    a.L[66] = 0;
    a.L[67] = 0;
    a.L[68] = 128;
    a.L[69] = 128;
    a.L[70] = 128;
    a.L[71] = 128;
    Id(a)
}

function Id(a) {
    for (var b = 1; b < a.L.length; b++) Ad[b] || Jd(a, b, a.L[b])
}

function Qd(a, b) {
    b || (b = Cd.prototype.Ra);
    yd[a] = b
}

function Rd(a, b) {
    b || (b = Cd.prototype.bb);
    zd[a] = b
}

function Sd(a, b, c) {
    Ad[a] = 1;
    yd[a] = function() {
        return this.L[b] & 240 | this.L[c] >>> 4
    };
    zd[a] = function(d) {
        this.L[a] = d;
        var e = d << 4 & 240 | this.L[c] & 15;
        Jd(this, b, d & 240 | this.L[b] & 15);
        Jd(this, c, e)
    }
}

function Td(a, b, c) {
    yd[a] = Cd.prototype.Ra;
    zd[a] = function(d) {
        this.L[a] = d;
        this.v.send("mixer-volume", [b, c, (d >>> 2) - 62])
    }
}
Qd(0, function() {
    Dd(this);
    return 0
});
Rd(0);
Sd(4, 50, 51);
Sd(34, 48, 49);
Sd(38, 52, 53);
Sd(40, 54, 55);
Sd(46, 56, 57);
Td(48, 0, 0);
Td(49, 0, 1);
Td(50, 2, 0);
Td(51, 2, 1);
Qd(59);
Rd(59, function(a) {
    this.L[59] = a;
    this.v.send("mixer-volume", [1, 2, 6 * (a >>> 6) - 18])
});
Qd(65);
Rd(65, function(a) {
    this.L[65] = a;
    this.v.send("mixer-gain-left", 6 * (a >>> 6))
});
Qd(66);
Rd(66, function(a) {
    this.L[66] = a;
    this.v.send("mixer-gain-right", 6 * (a >>> 6))
});
Qd(68);
Rd(68, function(a) {
    this.L[68] = a;
    a >>>= 3;
    this.v.send("mixer-treble-left", a - (16 > a ? 14 : 16))
});
Qd(69);
Rd(69, function(a) {
    this.L[69] = a;
    a >>>= 3;
    this.v.send("mixer-treble-right", a - (16 > a ? 14 : 16))
});
Qd(70);
Rd(70, function(a) {
    this.L[70] = a;
    a >>>= 3;
    this.v.send("mixer-bass-right", a - (16 > a ? 14 : 16))
});
Qd(71);
Rd(71, function(a) {
    this.L[71] = a;
    a >>>= 3;
    this.v.send("mixer-bass-right", a - (16 > a ? 14 : 16))
});
Qd(128, function() {
    switch (this.ba) {
        case 2:
            return 1;
        case 5:
            return 2;
        case 7:
            return 4;
        case 10:
            return 8;
        default:
            return 0
    }
});
Rd(128, function(a) {
    a & 1 && (this.ba = 2);
    a & 2 && (this.ba = 5);
    a & 4 && (this.ba = 7);
    a & 8 && (this.ba = 10)
});
Qd(129, function() {
    var a = 0;
    switch (this.Ab) {
        case 0:
            a |= 1;
            break;
        case 1:
            a |= 2;
            break;
        case 3:
            a |= 8
    }
    switch (this.Tc) {
        case 5:
            a |= 32;
            break;
        case 6:
            a |= 64;
            break;
        case 7:
            a |= 128
    }
    return a
});
Rd(129, function(a) {
    a & 1 && (this.Ab = 0);
    a & 2 && (this.Ab = 1);
    a & 8 && (this.Ab = 3);
    a & 32 && (this.Tc = 5);
    a & 64 && (this.Tc = 6);
    a & 128 && (this.Tc = 7)
});
Qd(130, function() {
    for (var a = 32, b = 0; 16 > b; b++) a |= b * this.Yc[b];
    return a
});
Cd.prototype.V = function() {};

function Ud(a, b) {
    b || (b = Cd.prototype.V);
    for (var c = 0; c < a.length; c++) Bd[a[c]] = b
}

function Vd(a, b) {
    for (var c = []; a <= b; a++) c.push(a);
    return c
}
var U = new Uint8Array(32);
U[0] = 0;
U[1] = 1;
U[2] = 2;
U[3] = 3;
U[4] = 4;
U[5] = 5;
U[8] = 6;
U[9] = 7;
U[10] = 8;
U[11] = 9;
U[12] = 10;
U[13] = 11;
U[16] = 12;
U[17] = 13;
U[18] = 14;
U[19] = 15;
U[20] = 16;
U[21] = 17;
Ud([1], function(a, b) {
    this.Bh[b] = a & 1
});
Ud([2]);
Ud([3]);
Ud([4], function() {});
Ud([5], function() {});
Ud([8], function() {});
Ud(Vd(32, 53), function() {});
Ud(Vd(64, 85), function() {});
Ud(Vd(96, 117), function() {});
Ud(Vd(128, 149), function() {});
Ud(Vd(160, 168), function() {});
Ud(Vd(176, 184), function() {});
Ud([189], function() {});
Ud(Vd(192, 200), function() {});
Ud(Vd(224, 245), function() {});

function Od(a, b) {
    a.Ya = b;
    a.v.send("dac-tell-sampling-rate", b)
}

function Md(a) {
    a.D = 1 + (a.Ba.shift() << 0) + (a.Ba.shift() << 8)
}

function Nd(a) {
    a.h = 1;
    a.nb && (a.h *= 2);
    a.l = a.D * a.h;
    a.j = 1024 * a.h;
    a.j = Math.min(Math.max(a.l >> 2 & -4, 32), a.j);
    a.B = !0;
    a.eb.Yb[a.fb] || a.pa(a.fb)
}
Cd.prototype.pa = function(a) {
    a === this.fb && this.B && (this.B = !1, this.zb = this.l, this.Bb = !1, this.v.send("dac-enable"))
};

function Fd(a) {
    var b = Math.min(a.zb, a.j),
        c = Math.floor(b / a.h);
    a.eb.Zd(a.Qa, 0, b, a.fb, d => {
        if (!d) {
            d = a.nb ? 32767.5 : 127.5;
            var e = a.ob ? 0 : -1,
                g = a.Uc ? 1 : 2,
                h;
            a.nb ? h = a.ob ? a.X : a.aa : h = a.ob ? a.Y : a.C;
            for (var f = 0, k = 0; k < c; k++)
                for (var l = Ld(h[k] / d + e), n = 0; n < g; n++) a.wb[f].push(l), f ^= 1;
            Ed(a);
            a.zb -= b;
            a.zb || (a.za(a.bc), a.yb && (a.zb = a.l))
        }
    })
}

function Ed(a) {
    if (a.wb[0].length) {
        var b = Eb(a.wb[0], a.wb[0].length),
            c = Eb(a.wb[1], a.wb[1].length);
        a.v.send("dac-send-data", [b, c], [b.buffer, c.buffer])
    }
}
Cd.prototype.za = function(a) {
    this.Yc[a] = 1;
    this.s.Ja(this.ba)
};

function Hd(a, b) {
    a.Yc[b] = 0;
    Ib(a.s, a.ba)
}

function Ld(a) {
    return -1 * (-1 > a) + 1 * (1 < a) + (-1 <= a && 1 >= a) * a
};

function ka(a, b) {
    this.s = a;
    this.Ha = a.u.Ha;
    this.Ee = b.Ee;
    this.J = [244, 26, b.Ee & 255, b.Ee >> 8, 7, 5, 16, 0, 1, 0, 2, 0, 0, 0, 0, 0, 1, 168, 0, 0, 0, 16, 191, 254, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 244, 26, b.Pg & 255, b.Pg >> 8, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
    this.J = this.J.concat(Array(256 - this.J.length).fill(0));
    this.Ia = b.Ia;
    this.ib = [];
    this.name = b.name;
    this.i = this.B = 0;
    this.l = new Uint32Array(4);
    this.h = new Uint32Array(4);
    for (var c of b.De.features) this.l[c >>> 5] |= 1 << (c & 31), this.h[c >>> 5] |= 1 << (c & 31);
    b.De.features.includes(32);
    this.C = !0;
    this.j = 0;
    this.F = !1;
    this.D = 0;
    this.Xa = [];
    for (var d of b.De.Xa) this.Xa.push(new Wd(a, this, d));
    this.o = 0;
    this.g = this.Xa[0];
    this.hc = 0;
    c = [];
    c.push(Xd(this, b.De));
    c.push(Yd(b.notification));
    c.push(Zd(this, b.hc));
    b.Tf && (d = c.push, b = b.Tf, b = {
        type: 4,
        Ad: 3,
        port: b.Vc,
        ue: !1,
        offset: 0,
        ae: new Uint8Array(0),
        td: b.td
    }, d.call(c, b));
    $d(this, c);
    Sb(a.u.Ha, this);
    this.reset()
}

function Xd(a, b) {
    return {
        type: 1,
        Ad: 0,
        port: b.Vc,
        ue: !1,
        offset: 0,
        ae: new Uint8Array(0),
        td: [{
            bytes: 4,
            name: "device_feature_select",
            read: () => a.B,
            write: c => {
                a.B = c
            }
        }, {
            bytes: 4,
            name: "device_feature",
            read: () => a.l[a.B] || 0,
            write: () => {}
        }, {
            bytes: 4,
            name: "driver_feature_select",
            read: () => a.i,
            write: c => {
                a.i = c
            }
        }, {
            bytes: 4,
            name: "driver_feature",
            read: () => a.h[a.i] || 0,
            write: c => {
                const d = a.l[a.i];
                a.i < a.h.length && (a.h[a.i] = c & d);
                a.C = a.C && !(c & ~d)
            }
        }, {
            bytes: 2,
            name: "msix_config",
            read: () => 65535,
            write: () => {}
        }, {
            bytes: 2,
            name: "num_queues",
            read: () => a.Xa.length,
            write: () => {}
        }, {
            bytes: 1,
            name: "device_status",
            read: () => a.j,
            write: c => {
                0 === c && a.reset();
                c & ~a.j & 4 && a.j & 64 && (a.F = !0, a.j & 4 && a.za(2));
                a.C || (c &= -9);
                a.j = c
            }
        }, {
            bytes: 1,
            name: "config_generation",
            read: () => a.D,
            write: () => {}
        }, {
            bytes: 2,
            name: "queue_select",
            read: () => a.o,
            write: c => {
                a.o = c;
                a.o < a.Xa.length || (a.g = null)
            }
        }, {
            bytes: 2,
            name: "queue_size",
            read: () => a.g ? a.g.size : 0,
            write: c => {
                if (a.g) {
                    c & c - 1 && (c = 1 << sb(c - 1) + 1);
                    c > a.g.Kc && (c = a.g.Kc);
                    var d = a.g;
                    d.size = c;
                    d.o = c - 1
                }
            }
        }, {
            bytes: 2,
            name: "queue_msix_vector",
            read: () =>
                65535,
            write: () => {}
        }, {
            bytes: 2,
            name: "queue_enable",
            read: () => a.g ? a.g.enabled | 0 : 0,
            write: c => {
                a.g && 1 === c && (c = a.g, c.l && c.h && c.g && (a.g.enabled = !0))
            }
        }, {
            bytes: 2,
            name: "queue_notify_off",
            read: () => a.g ? a.g.ie : 0,
            write: () => {}
        }, {
            bytes: 4,
            name: "queue_desc (low dword)",
            read: () => a.g ? a.g.l : 0,
            write: c => {
                a.g && (a.g.l = c)
            }
        }, {
            bytes: 4,
            name: "queue_desc (high dword)",
            read: () => 0,
            write: () => {}
        }, {
            bytes: 4,
            name: "queue_avail (low dword)",
            read: () => a.g ? a.g.h : 0,
            write: c => {
                a.g && (a.g.h = c)
            }
        }, {
            bytes: 4,
            name: "queue_avail (high dword)",
            read: () =>
                0,
            write: () => {}
        }, {
            bytes: 4,
            name: "queue_used (low dword)",
            read: () => a.g ? a.g.g : 0,
            write: c => {
                a.g && (a.g.g = c)
            }
        }, {
            bytes: 4,
            name: "queue_used (high dword)",
            read: () => 0,
            write: () => {}
        }]
    }
}

function Yd(a) {
    const b = [];
    let c;
    c = a.Dj ? 0 : 2;
    for (const [d, e] of a.Gh.entries()) b.push({
        bytes: 2,
        name: "notify" + d,
        read: () => 65535,
        write: e || (() => {})
    });
    return {
        type: 2,
        Ad: 1,
        port: a.Vc,
        ue: !1,
        offset: 0,
        ae: new Uint8Array([c & 255, c >> 8 & 255, c >> 16 & 255, c >> 24]),
        td: b
    }
}

function Zd(a, b) {
    return {
        type: 3,
        Ad: 2,
        port: b.Vc,
        ue: !1,
        offset: 0,
        ae: new Uint8Array(0),
        td: [{
            bytes: 1,
            name: "isr_status",
            read: () => {
                const c = a.hc;
                a.hc = 0;
                lc(a.Ha, a.Ia);
                return c
            },
            write: () => {}
        }]
    }
}

function $d(a, b) {
    let c = a.J[52] = 64;
    var d = c;
    for (const g of b) {
        b = 16 + g.ae.length;
        d = c;
        c = d + b;
        var e = g.td.reduce((h, f) => h + f.bytes, 0);
        e += g.offset;
        e = 16 > e ? 16 : 1 << sb(e - 1) + 1;
        a.ib[g.Ad] = {
            size: e
        };
        a.J[d] = 9;
        a.J[d + 1] = c;
        a.J[d + 2] = b;
        a.J[d + 3] = g.type;
        a.J[d + 4] = g.Ad;
        a.J[d + 5] = 0;
        a.J[d + 6] = 0;
        a.J[d + 7] = 0;
        a.J[d + 8] = g.offset & 255;
        a.J[d + 9] = g.offset >>> 8 & 255;
        a.J[d + 10] = g.offset >>> 16 & 255;
        a.J[d + 11] = g.offset >>> 24;
        a.J[d + 12] = e & 255;
        a.J[d + 13] = e >>> 8 & 255;
        a.J[d + 14] = e >>> 16 & 255;
        a.J[d + 15] = e >>> 24;
        for (const [h, f] of g.ae.entries()) a.J[d + 16 + h] = f;
        d = 16 + 4 *
            g.Ad;
        a.J[d] = g.port & 254 | !g.ue;
        a.J[d + 1] = g.port >>> 8 & 255;
        a.J[d + 2] = g.port >>> 16 & 255;
        a.J[d + 3] = g.port >>> 24 & 255;
        d = g.port + g.offset;
        for (const h of g.td) {
            let f = h.read;
            b = h.write;
            if (!g.ue) {
                e = function(l) {
                    return f(l & -2) >> ((l & 1) << 3) & 255
                };
                const k = function(l) {
                    return f(l & -4) >> ((l & 3) << 3) & 255
                };
                switch (h.bytes) {
                    case 4:
                        L(a.s.A, d, a, k, void 0, f);
                        M(a.s.A, d, a, void 0, void 0, b);
                        break;
                    case 2:
                        L(a.s.A, d, a, e, f);
                        M(a.s.A, d, a, void 0, b);
                        break;
                    case 1:
                        L(a.s.A, d, a, f), M(a.s.A, d, a, b)
                }
            }
            d += h.bytes
        }
    }
    a.J[c] = 9;
    a.J[c + 1] = 0;
    a.J[c + 2] = 20;
    a.J[c + 3] = 5;
    a.J[c +
        4] = 0;
    a.J[c + 5] = 0;
    a.J[c + 6] = 0;
    a.J[c + 7] = 0;
    a.J[c + 8] = 0;
    a.J[c + 9] = 0;
    a.J[c + 10] = 0;
    a.J[c + 11] = 0;
    a.J[c + 12] = 0;
    a.J[c + 13] = 0;
    a.J[c + 14] = 0;
    a.J[c + 15] = 0;
    a.J[c + 16] = 0;
    a.J[c + 17] = 0;
    a.J[c + 18] = 0;
    a.J[c + 19] = 0
}
ka.prototype.$ = function() {
    let a = [];
    a[0] = this.B;
    a[1] = this.i;
    a[2] = this.l;
    a[3] = this.h;
    a[4] = this.C;
    a[5] = this.j;
    a[6] = this.F;
    a[7] = this.D;
    a[8] = this.hc;
    a[9] = this.o;
    return a = a.concat(this.Xa)
};
ka.prototype.G = function(a) {
    this.B = a[0];
    this.i = a[1];
    this.l = a[2];
    this.h = a[3];
    this.C = a[4];
    this.j = a[5];
    this.F = a[6];
    this.D = a[7];
    this.hc = a[8];
    this.o = a[9];
    let b = 0;
    for (let c of a.slice(10)) this.Xa[b].G(c), b++;
    this.g = this.Xa[this.o] || null
};
ka.prototype.reset = function() {
    this.i = this.B = 0;
    this.h.set(this.l);
    this.C = !0;
    this.o = this.j = 0;
    this.g = this.Xa[0];
    for (const a of this.Xa) a.reset();
    this.F = !1;
    this.hc = this.D = 0;
    lc(this.Ha, this.Ia)
};
ka.prototype.za = function(a) {
    this.hc |= a;
    this.Ha.za(this.Ia)
};

function Wd(a, b, c) {
    this.s = a;
    this.ab = b;
    this.Kc = this.size = c.Kc;
    this.o = this.size - 1;
    this.enabled = !1;
    this.ie = c.ie;
    this.i = this.g = this.j = this.h = this.l = 0;
    this.reset()
}
Wd.prototype.$ = function() {
    const a = [];
    a[0] = this.size;
    a[1] = this.Kc;
    a[2] = this.enabled;
    a[3] = this.ie;
    a[4] = this.l;
    a[5] = this.h;
    a[6] = this.j;
    a[7] = this.g;
    a[8] = this.i;
    return a
};
Wd.prototype.G = function(a) {
    this.size = a[0];
    this.Kc = a[1];
    this.enabled = a[2];
    this.ie = a[3];
    this.l = a[4];
    this.h = a[5];
    this.j = a[6];
    this.g = a[7];
    this.i = a[8];
    this.o = this.size - 1
};
Wd.prototype.reset = function() {
    this.enabled = !1;
    this.i = this.g = this.j = this.h = this.l = 0;
    var a = this.Kc;
    this.size = a;
    this.o = a - 1
};

function la(a) {
    return (a.s.Na(a.h + 2) & a.o) !== a.j
}

function ma(a, b) {
    this.s = a.s;
    this.ab = a.ab;
    this.Hh = b;
    this.i = [];
    this.mf = this.g = this.h = 0;
    this.Mf = [];
    this.nf = this.xe = this.Lf = 0;
    let c = a.l;
    var d = b;
    b = 0;
    let e = a.size,
        g = !1;
    const h = 0 < (this.ab.h[0] & 268435456);
    do {
        var f = a,
            k = c;
        f = {
            bf: f.s.g(k + 16 * d),
            Xj: f.s.g(k + 16 * d + 4),
            Ke: f.s.g(k + 16 * d + 8),
            flags: f.s.Na(k + 16 * d + 12),
            next: f.s.Na(k + 16 * d + 14)
        };
        if (h && f.flags & 4) c = f.bf, b = d = 0, e = f.Ke / 16;
        else {
            if (f.flags & 2) g = !0, this.Mf.push(f);
            else {
                if (g) break;
                this.i.push(f);
                this.mf += f.Ke
            }
            b++;
            if (b > e) break;
            if (f.flags & 1) d = f.next;
            else break
        }
    } while (1)
}

function ua(a, b) {
    let c = 0,
        d = b.length;
    for (; d && a.h !== a.i.length;) {
        var e = a.i[a.h],
            g = e.bf + a.g;
        let l = e.Ke - a.g;
        l > d ? (l = d, a.g += d) : (a.h++, a.g = 0);
        e = b;
        var h = e.set,
            f = a.s,
            k = l;
        k && (f.Je(g), f.Je(g + k - 1));
        h.call(e, f.Ma.subarray(g, g + k), c);
        c += l;
        d -= l
    }
};

function ae() {
    this.ge = {};
    this.g = void 0
}
ae.prototype.register = function(a, b, c) {
    var d = this.ge[a];
    void 0 === d && (d = this.ge[a] = []);
    d.push({
        Ge: b,
        Ef: c
    })
};
ae.prototype.unregister = function(a, b) {
    var c = this.ge[a];
    void 0 !== c && (this.ge[a] = c.filter(function(d) {
        return d.Ge !== b
    }))
};
ae.prototype.send = function(a, b) {
    if (this.g && (a = this.g.ge[a], void 0 !== a))
        for (var c = 0; c < a.length; c++) {
            var d = a[c];
            d.Ge.call(d.Ef, b)
        }
};

function be() {
    var a = new ae,
        b = new ae;
    a.g = b;
    b.g = a;
    return [a, b]
};

function ce() {};

function jb(a, b, c) {
    this.Rg = c;
    this.xa = b;
    de(this);
    b = Object.create(null);
    b.m = this.xa.exports.memory;
    for (var d of Object.keys(this.xa.exports)) d.startsWith("_") || d.startsWith("zstd") || d.endsWith("_js") || (b[d] = this.xa.exports[d]);
    this.Qj = b;
    this.Pa = d = this.xa.exports.memory;
    this.H = Q(Uint32Array, d, 812, 1);
    this.Ma = new Uint8Array(0);
    this.vc = new Int32Array(this.Ma.buffer);
    this.Sa = Q(Uint8Array, d, 724, 8);
    this.cb = Q(Int32Array, d, 736, 8);
    this.bb = Q(Uint32Array, d, 768, 8);
    this.Qa = Q(Int32Array, d, 800, 1);
    this.Xb = Q(Int32Array,
        d, 564, 1);
    this.Wb = Q(Int32Array, d, 568, 1);
    this.Ob = Q(Int32Array, d, 572, 1);
    this.Ub = Q(Int32Array, d, 576, 1);
    this.Jg = Q(Int32Array, d, 1128, 1);
    this.wc = Q(Uint32Array, d, 540, 8);
    this.La = Q(Int32Array, d, 580, 8);
    this.Pb = Q(Uint8Array, d, 612, 1);
    this.aa = Q(Int32Array, d, 804, 1);
    this.tb = Q(Int32Array, d, 808, 1);
    this.h = Q(Uint8Array, d, 616, 1);
    this.uc = Q(Int32Array, d, 620, 1);
    this.Rb = Q(Int32Array, d, 624, 1);
    this.mg = Q(Int32Array, d, 636, 1);
    this.Ig = Q(Int32Array, d, 640, 1);
    this.og = Q(Int32Array, d, 644, 1);
    this.xc = Q(Int32Array, d, 648, 1);
    this.flags =
        Q(Int32Array, d, 120, 1);
    this.Sb = Q(Int32Array, d, 116, 1);
    this.qc = Q(Int32Array, d, 96, 1);
    this.sc = Q(Int32Array, d, 104, 1);
    Q(Int32Array, d, 112, 1);
    this.Gj = Q(Uint32Array, d, 960, 2);
    this.u = {};
    this.B = Q(Int32Array, d, 556, 1);
    this.zc = Q(Int32Array, d, 560, 1);
    Q(Uint8Array, d, 548, 1);
    this.F = Q(Uint8Array, d, 552, 1);
    this.i = [];
    this.l = [];
    this.pa = [];
    this.j = [];
    this.Bd = {
        jg: null,
        Rd: null
    };
    this.Lh = Q(Uint32Array, d, 664, 1);
    this.D = Q(Int32Array, d, 64, 8);
    this.Tb = Q(Int32Array, d, 1152, 32);
    this.X = Q(Uint8Array, d, 816, 1);
    this.X[0] = 255;
    this.Y = Q(Uint8Array,
        d, 1032, 1);
    this.Y[0] = 0;
    this.I = Q(Uint16Array, d, 1036, 1);
    this.I[0] = 895;
    this.Mj = Q(Uint16Array, d, 1040, 1);
    this.Mj[0] = 0;
    this.O = Q(Int32Array, d, 1048, 1);
    this.O[0] = 0;
    this.T = Q(Int32Array, d, 1052, 1);
    this.T[0] = 0;
    this.V = Q(Int32Array, d, 1044, 1);
    this.V[0] = 0;
    this.K = Q(Int32Array, d, 1056, 1);
    this.K[0] = 0;
    this.N = Q(Int32Array, d, 1060, 1);
    this.N[0] = 0;
    this.$c = Q(Int32Array, d, 832, 32);
    Q(Int32Array, d, 824, 1);
    this.sb = Q(Uint16Array, d, 668, 8);
    this.Qb = Q(Int32Array, d, 684, 8);
    this.Ac = Q(Int32Array, d, 968, 8);
    this.Wg = Q(Uint32Array, d, 716, 1);
    this.Vg =
        Q(Uint32Array, d, 720, 1);
    this.Wa = [];
    this.kf = 0;
    this.fd = [];
    this.A = void 0;
    this.v = a;
    this.ig(0, 0);
    ee(this)
}

function de(a) {
    const b = c => {
        const d = a.xa.exports[c];
        console.assert(d, "Missing import: " + c);
        return d
    };
    a.Ra = b("reset_cpu");
    b("getiopl");
    b("get_eflags");
    a.o = b("get_eflags_no_arith");
    a.C = b("pic_call_irq");
    a.Ij = b("do_many_cycles_native");
    b("cycle_internal");
    a.od = b("read8");
    a.Na = b("read16");
    a.g = b("read32s");
    a.af = b("write8");
    a.we = b("write16");
    a.Lc = b("write32");
    a.Je = b("in_mapped_range");
    b("fpu_load_tag_word");
    b("fpu_load_status_word");
    b("fpu_get_sti_f64");
    b("translate_address_system_read_js");
    a.Vb = b("get_seg_cs");
    b("get_real_eip");
    b("clear_tlb");
    a.Oj = b("full_clear_tlb");
    a.ig = b("set_tsc");
    a.Sg = b("store_current_tsc");
    a.Pj = b("jit_clear_cache_js");
    a.Mh = b("jit_dirty_cache");
    a.Fj = b("codegen_finalize_finished");
    a.zj = b("allocate_memory");
    a.Zg = b("zero_memory");
    a.Ug = b("svga_allocate_memory");
    a.Tg = b("svga_allocate_dest_buffer");
    a.Xg = b("svga_fill_pixel_buffer");
    a.kg = b("svga_mark_dirty");
    a.Rj = b("zstd_create_ctx");
    a.Tj = b("zstd_get_src_ptr");
    a.Sj = b("zstd_free_ctx");
    a.ye = b("zstd_read");
    a.ze = b("zstd_read_free")
}
jb.prototype.$ = function() {
    var a = [];
    a[0] = this.H[0];
    a[1] = this.Sa;
    a[2] = this.cb;
    a[3] = this.bb;
    a[4] = this.Qa[0];
    a[5] = this.Wb[0];
    a[6] = this.Xb[0];
    a[7] = this.Ub[0];
    a[8] = this.Ob[0];
    a[9] = this.wc[0];
    a[10] = this.La;
    a[11] = this.Pb[0];
    a[13] = this.aa[0];
    a[16] = this.tb[0];
    a[17] = this.h[0];
    a[18] = this.uc[0];
    a[19] = this.Rb[0];
    a[22] = this.mg[0];
    a[23] = this.og[0];
    a[24] = this.Ig[0];
    a[25] = this.xc[0];
    a[26] = this.flags[0];
    a[27] = this.Sb[0];
    a[28] = this.qc[0];
    a[30] = this.sc[0];
    a[37] = this.B[0];
    a[38] = this.zc[0];
    a[39] = this.D;
    a[40] = this.sb;
    a[41] =
        this.Qb;
    a[42] = this.Ac;
    this.Sg();
    a[43] = this.Gj;
    a[45] = this.u.Jf;
    a[46] = this.u.Mc;
    a[47] = this.u.Ic;
    a[48] = this.u.Ha;
    a[49] = this.u.eb;
    a[50] = this.u.Ea;
    a[51] = this.u.eg;
    a[52] = this.u.Rd;
    a[53] = this.u.uf;
    a[54] = this.u.Hf;
    a[55] = this.u.jf;
    a[56] = this.u.fa;
    a[57] = this.u.M;
    a[58] = this.u.Re;
    a[59] = this.u.qf;
    a[60] = this.u.jc;
    a[61] = this.u.yf;
    a[62] = this.Wa;
    a[63] = this.u.yc;
    a[64] = this.Jg[0];
    a[66] = this.$c;
    a[67] = this.Tb;
    a[68] = this.X[0];
    a[69] = this.Y[0];
    a[70] = this.I[0];
    a[71] = this.O[0];
    a[72] = this.T[0];
    a[73] = this.K[0];
    a[74] = this.N[0];
    a[75] = this.V[0];
    var b = this.Ma.length >> 12,
        c = [];
    for (var d = 0; d < b; d++) {
        var e = d << 12;
        e = this.vc.subarray(e >> 2, e + 4096 >> 2);
        let f = !0;
        for (let k = 0; k < e.length; k++)
            if (0 !== e[k]) {
                f = !1;
                break
            } f || c.push(d)
    }
    b = new Fb(b);
    d = new Uint8Array(c.length << 12);
    for (let [f, k] of c.entries()) b.set(k, 1), c = k << 12, d.set(this.Ma.subarray(c, c + 4096), f << 12);
    const {
        Uh: g,
        bh: h
    } = {
        bh: b,
        Uh: d
    };
    a[77] = g;
    a[78] = new Uint8Array(h.Db());
    a[79] = this.u.re;
    a[80] = this.u.se;
    a[81] = this.u.te;
    return a
};
jb.prototype.G = function(a) {
    this.H[0] = a[0];
    this.Ma.length !== this.H[0] && console.warn("Note: Memory size mismatch. we=" + this.Ma.length + " state=" + this.H[0]);
    this.Sa.set(a[1]);
    this.cb.set(a[2]);
    this.bb.set(a[3]);
    this.Qa[0] = a[4];
    this.Wb[0] = a[5];
    this.Xb[0] = a[6];
    this.Ub[0] = a[7];
    this.Ob[0] = a[8];
    this.wc[0] = a[9];
    this.La.set(a[10]);
    this.Pb[0] = a[11];
    this.aa[0] = a[13];
    this.tb[0] = a[16];
    this.h[0] = a[17];
    this.uc[0] = a[18];
    this.Rb[0] = a[19];
    this.mg[0] = a[22];
    this.og[0] = a[23];
    this.Ig[0] = a[24];
    this.xc[0] = a[25];
    this.flags[0] =
        a[26];
    this.Sb[0] = a[27];
    this.qc[0] = a[28];
    this.sc[0] = a[30];
    this.B[0] = a[37];
    this.zc[0] = a[38];
    this.D.set(a[39]);
    this.sb.set(a[40]);
    this.Qb.set(a[41]);
    a[42] && this.Ac.set(a[42]);
    this.ig(a[43][0], a[43][1]);
    this.u.Jf && this.u.Jf.G(a[45]);
    this.u.Mc && this.u.Mc.G(a[46]);
    this.u.Ic && this.u.Ic.G(a[47]);
    this.u.Ha && this.u.Ha.G(a[48]);
    this.u.eb && this.u.eb.G(a[49]);
    this.u.Ea && this.u.Ea.G(a[50]);
    this.u.eg && this.u.eg.G(a[51]);
    this.u.Rd && this.u.Rd.G(a[52]);
    this.u.uf && this.u.uf.G(a[53]);
    this.u.Hf && this.u.Hf.G(a[54]);
    this.u.jf &&
        this.u.jf.G(a[55]);
    this.u.fa && this.u.fa.G(a[56]);
    this.u.M && this.u.M.G(a[57]);
    this.u.Re && this.u.Re.G(a[58]);
    this.u.qf && this.u.qf.G(a[59]);
    this.u.jc && this.u.jc.G(a[60]);
    this.u.yf && this.u.yf.G(a[61]);
    this.u.re && this.u.re.G(a[79]);
    this.u.se && this.u.se.G(a[80]);
    this.u.te && this.u.te.G(a[81]);
    this.Wa = a[62];
    this.u.yc && this.u.yc.G(a[63]);
    this.Jg[0] = a[64];
    this.$c.set(a[66]);
    this.Tb.set(a[67]);
    this.X[0] = a[68];
    this.Y[0] = a[69];
    this.I[0] = a[70];
    this.O[0] = a[71];
    this.T[0] = a[72];
    this.K[0] = a[73];
    this.N[0] = a[74];
    this.V[0] =
        a[75];
    var b = new Fb(a[78].buffer);
    a = a[77];
    this.Zg(this.H[0]);
    const c = this.H[0] >> 12;
    let d = 0;
    for (let e = 0; e < c; e++)
        if (b.get(e)) {
            let g = d << 12;
            this.Ma.set(a.subarray(g, g + 4096), e << 12);
            d++
        } this.Oj();
    this.Pj()
};

function kc(a) {
    a.Ra();
    a.Wa = [];
    a.u.ab && a.u.ab.reset();
    qb(a)
}

function fe(a, b) {
    1048576 > b ? b = 1048576 : 0 > (b | 0) && (b = Math.pow(2, 31) - 131072);
    b = (b - 1 | 131071) + 1 | 0;
    console.assert(0 === a.H[0], "Expected uninitialised memory");
    a.H[0] = b;
    const c = a.zj(b);
    a.Ma = Q(Uint8Array, a.Pa, c, b);
    a.vc = Q(Uint32Array, a.Pa, c, b >> 2)
}
jb.prototype.hb = function(a, b) {
    fe(this, "number" === typeof a.H ? a.H : 67108864);
    this.F[0] = +a.Ea;
    this.Ra();
    var c = new eb(this);
    this.A = c;
    this.Bd.jg = a.Bd;
    this.Bd.Rd = a.Lj;
    qb(this);
    if (a.ub) {
        const {
            Th: e
        } = ge(this.Ma, a.ub, a.Xc, a.Pc || "");
        e && this.fd.push(e)
    }
    L(c, 179, this, function() {
        return 0
    });
    var d = 0;
    L(c, 146, this, function() {
        return d
    });
    M(c, 146, this, function(e) {
        d = e
    });
    L(c, 1297, this, function() {
        return this.kf < this.Wa.length ? this.Wa[this.kf++] : 0
    });
    M(c, 1296, this, void 0, function(e) {
        function g(k) {
            return new Uint8Array((new Int32Array([k])).buffer)
        }

        function h(k) {
            return k >> 8 | k << 8 & 65280
        }

        function f(k) {
            return k << 24 | k << 8 & 16711680 | k >> 8 & 65280 | k >>> 24
        }
        this.kf = 0;
        if (0 === e) this.Wa = g(1431127377);
        else if (1 === e) this.Wa = g(0);
        else if (3 === e) this.Wa = g(this.H[0]);
        else if (5 === e) this.Wa = g(1);
        else if (15 === e) this.Wa = g(1);
        else if (13 === e) this.Wa = new Uint8Array(16);
        else if (25 === e) {
            e = new Int32Array(4 + 64 * this.fd.length);
            const k = new Uint8Array(e.buffer);
            e[0] = f(this.fd.length);
            for (let l = 0; l < this.fd.length; l++) {
                const {
                    name: n,
                    data: m
                } = this.fd[l], t = 4 + 64 * l;
                e[t >> 2] = f(m.length);
                e[t + 4 >> 2] = h(49152 + l);
                for (let p = 0; p < n.length; p++) k[t + 8 + p] = n.charCodeAt(p)
            }
            this.Wa = k
        } else this.Wa = 32768 <= e && 49152 > e ? g(0) : 49152 <= e && e - 49152 < this.fd.length ? this.fd[e - 49152].data : g(0)
    });
    this.u = {};
    a.Nh && (this.u.jc = new Uc(this), this.u.Ha = new gc(this), this.F[0] && (this.u.yc = new ld(this), this.u.Mc = new ed(this), this.u.Ea = new cd(this)), this.u.Ic = new Vc(this), he(this, this.u.Ic, a), this.u.eb = new pc(this), this.u.Rd = new Bc(this, b, a.ea || 8388608), this.u.uf = new Qc(this, b), this.u.Hf = new Yc(this, 1016, b), a.re && (this.u.re =
        new Yc(this, 760, b)), a.se && (this.u.se = new Yc(this, 1E3, b)), a.te && (this.u.te = new Yc(this, 744, b)), this.u.jf = new mc(this, a.ma), c = 0, a.M && (this.u.M = new Gb(this, a.M, a.He, !1, c++, b)), a.fa && (this.u.fa = new Gb(this, a.fa, void 0, !0, c++, b)), this.u.Re = new uc(this, b), a.xh && (this.u.qf = new rd(this, b, a.tf, a.Gb)), a.Cb && (this.u.Jf = new fa(a.Cb, this, b)), this.u.yf = new Cd(this, b));
    a.ed && ie(this, a.ed)
};

function ie(a, b) {
    if (8192 > b.byteLength) {
        var c = new Int32Array(2048);
        (new Uint8Array(c.buffer)).set(new Uint8Array(b))
    } else c = new Int32Array(b, 0, 2048);
    for (var d = 0; 8192 > d; d += 4)
        if (464367618 === c[d >> 2]) {
            var e = c[d + 4 >> 2];
            if (!(464367618 + e + c[d + 8 >> 2] | 0)) {
                a.D[0] = 732803074;
                a.D[3] = 31744;
                a.Lc(31744, 0);
                a.La[0] = 1;
                a.Qa[0] = 1;
                a.flags[0] = 2;
                a.aa[0] = 1;
                a.tb[0] = 1;
                for (var g = 0; 6 > g; g++) a.Sa[g] = 0, a.cb[g] = 0, a.bb[g] = 4294967295, a.sb[g] = 45058;
                if (e & 65536) {
                    var h = c[d + 16 >> 2];
                    g = c[d + 20 >> 2];
                    e = c[d + 28 >> 2];
                    b = new Uint8Array(b, d - (c[d + 12 >> 2] -
                        h), 0 === g ? void 0 : g - h);
                    ra(a, b, h);
                    a.B[0] = a.Vb() + e | 0
                } else if (1179403647 === c[0]) {
                    c = je(b);
                    a.B[0] = a.Vb() + c.Ih.yh | 0;
                    for (h of c.vj) 0 !== h.type && 1 === h.type && h.pg + h.Qh < a.H[0] && h.Yf && (c = new Uint8Array(b, h.offset, h.Yf), ra(a, c, h.pg))
                }
                a.A.Lb(244, a, function(f) {
                    console.log("Test exited with code " + zb(f, 2));
                    throw "HALT";
                }, function() {}, function() {}, function() {});
                for (let f = 14; 15 >= f; f++) M(a.A, 8192 + f, a, function(k) {
                    k ? this.Ja(f) : Ib(this, f)
                });
                break
            }
        }
}

function he(a, b, c) {
    var d = c.oc || 531;
    b.W[56] = 1 | d >> 4 & 240;
    b.W[61] = d & 255;
    b.W[21] = 128;
    b.W[22] = 2;
    d = 0;
    1048576 <= a.H[0] && (d = a.H[0] - 1048576 >> 10, d = Math.min(d, 65535));
    b.W[23] = d & 255;
    b.W[24] = d >> 8 & 255;
    b.W[48] = d & 255;
    b.W[49] = d >> 8 & 255;
    d = 0;
    16777216 <= a.H[0] && (d = a.H[0] - 16777216 >> 16, d = Math.min(d, 65535));
    b.W[52] = d & 255;
    b.W[53] = d >> 8 & 255;
    b.W[91] = 0;
    b.W[92] = 0;
    b.W[93] = 0;
    b.W[20] = 47;
    b.W[95] = 0;
    c.zh && (b.W[63] = 1)
}

function qb(a) {
    var b = a.Bd.jg,
        c = a.Bd.Rd;
    if (b) {
        var d = new Uint8Array(b);
        ra(a, d, 1048576 - b.byteLength);
        if (c) {
            var e = new Uint8Array(c);
            ra(a, e, 786432);
            hb(a.A, 4272947200, 1048576, function(g) {
                g = g - 4272947200 | 0;
                return g < e.length ? e[g] : 0
            }, function() {})
        }
        hb(a.A, 4293918720, 1048576, function(g) {
            return this.Ma[g & 1048575]
        }.bind(a), function(g, h) {
            this.Ma[g & 1048575] = h
        }.bind(a))
    }
}

function ke(a, b, c, d, e, g) {
    const h = new Uint8Array(a.Pa.buffer, e >>> 0, g >>> 0);
    WebAssembly.instantiate(h, {
        e: a.Qj
    }).then(f => {
        f = f.instance.exports.f;
        a.Fj(b, c, d);
        a.xa.Kf.set(b + 1024, f);
        a.Yg && a.Yg(h)
    })
}

function mb(a) {
    if (a.o() & 512) {
        const b = ob(a, nb());
        pb(a);
        return b
    }
    return 100
}

function ob(a, b) {
    var c = a.u.Re.rb(b, !1);
    var d = a.u.Ic.rb(b, !1);
    let e = 100,
        g = 100;
    a.F[0] && (e = a.u.Ea.rb(b), g = a.u.Mc.rb(b));
    return Math.min(c, d, 100, e, g)
}

function pb(a) {
    a.o() & 512 && (le(a), a.Rg())
}

function le(a) {
    a.o();
    a.u.jc && a.u.jc.Sd();
    a.u.Mc && a.u.Mc.Sd()
}
jb.prototype.Ja = function(a) {
    this.u.jc && this.u.jc.Qd(a);
    this.u.yc && this.u.yc.Qd(a)
};

function Ib(a, b) {
    a.u.jc && a.u.jc.Td(b);
    a.u.yc && a.u.yc.Td(b)
}
"undefined" !== typeof window ? window.CPU = jb : "undefined" !== typeof module && "undefined" !== typeof module.exports ? module.exports.CPU = jb : "function" === typeof importScripts && (self.CPU = jb);

function ee(a) {
    var b = {};
    a.debug = b;
    b.hb = function() {};
    b.nk = function() {};
    b.gk = function() {};
    b.$ = function() {};
    b.ik = function() {};
    b.hk = function() {};
    b.fk = function() {
        if (a.La[4] & 32)
            for (var g = 0; 4 > g; g++) a.g(a.La[3] + 8 * g)
    };
    b.dk = function() {};
    b.ek = function() {};
    b.mk = function() {};
    b.tk = function() {};
    b.Bk = function() {};
    b.$j = function() {};
    let c, d;
    b.ck = function(g, h, f) {
        if (!d) {
            if (void 0 === c && (c = "function" === typeof require ? require("./capstone-x86.min.js") : window.cs, void 0 === c)) return;
            d = [new c.Capstone(c.ARCH_X86, c.MODE_16),
                new c.Capstone(c.ARCH_X86, c.MODE_32)
            ]
        }
        try {
            d[g].disasm(h, f).forEach(function(k) {
                ce(zb(k.Zj >>> 0) + ": " + yb(k.bytes.map(l => zb(l, 2).slice(-2)).join(" "), 20) + " " + k.mnemonic + " " + k.op_str)
            })
        } catch (k) {
            ce("Could not disassemble: " + Array.from(h).map(l => zb(l, 2)).join(" "))
        }
    };
    let e;
    b.jk = function(g) {
        if (void 0 === e && (e = "function" === typeof require ? require("./libwabt.js") : new window.WabtModule, void 0 === e)) return;
        g = g.slice();
        try {
            var h = e.readWasm(g, {
                yk: !1
            });
            h.generateNames();
            h.applyNames();
            h.toText({
                lk: !0,
                qk: !0
            })
        } catch (l) {
            var f =
                new Blob([g]),
                k = document.createElement("a");
            k.download = "failed.wasm";
            k.href = window.URL.createObjectURL(f);
            k.dataset.downloadurl = ["application/octet-stream", k.download, k.href].join(":");
            k.click();
            window.URL.revokeObjectURL(k.src);
            console.log(l.toString())
        } finally {
            h && h.va()
        }
    }
};
let me = DataView.prototype,
    ne = {
        size: 1,
        get: me.getUint8,
        set: me.setUint8
    },
    oe = {
        size: 2,
        get: me.getUint16,
        set: me.setUint16
    },
    X = {
        size: 4,
        get: me.getUint32,
        set: me.setUint32
    },
    qe = pe([{
        Oh: X
    }, {
        gh: ne
    }, {
        data: ne
    }, {
        Jj: ne
    }, {
        vk: ne
    }, {
        Vj: ne
    }, {
        wk: function(a) {
            return {
                size: a,
                get: () => -1
            }
        }(7)
    }, {
        type: oe
    }, {
        sk: oe
    }, {
        Kj: X
    }, {
        yh: X
    }, {
        Wh: X
    }, {
        Aj: X
    }, {
        flags: X
    }, {
        th: oe
    }, {
        tg: oe
    }, {
        ug: oe
    }, {
        Ng: oe
    }, {
        Og: oe
    }, {
        Ak: oe
    }]);
console.assert(52 === qe.reduce((a, b) => a + b.size, 0));
let re = pe([{
    type: X
}, {
    offset: X
}, {
    Ck: X
}, {
    pg: X
}, {
    Yf: X
}, {
    Qh: X
}, {
    flags: X
}, {
    align: X
}]);
console.assert(32 === re.reduce((a, b) => a + b.size, 0));
let se = pe([{
    name: X
}, {
    type: X
}, {
    flags: X
}, {
    Wj: X
}, {
    offset: X
}, {
    size: X
}, {
    link: X
}, {
    info: X
}, {
    Yj: X
}, {
    kk: X
}]);
console.assert(40 === se.reduce((a, b) => a + b.size, 0));

function pe(a) {
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

function je(a) {
    var b = new DataView(a);
    let [c, d] = te(b, qe);
    console.assert(52 === d);
    console.assert(1179403647 === c.Oh, "Bad magic");
    console.assert(1 === c.gh, "Unimplemented: 64 bit elf");
    console.assert(1 === c.data, "Unimplemented: big endian");
    console.assert(1 === c.Jj, "Bad version0");
    console.assert(2 === c.type, "Unimplemented type");
    console.assert(1 === c.Kj, "Bad version1");
    console.assert(52 === c.th, "Bad header size");
    console.assert(32 === c.tg, "Bad program header size");
    console.assert(40 === c.Ng, "Bad section header size");
    [a] = ue(new DataView(b.buffer, b.byteOffset + c.Wh, c.tg * c.ug), re, c.ug);
    [b] = ue(new DataView(b.buffer, b.byteOffset + c.Aj, c.Ng * c.Og), se, c.Og);
    return {
        Ih: c,
        vj: a,
        zk: b
    }
}

function te(a, b) {
    let c = {},
        d = 0;
    for (let e of b) b = e.get.call(a, d, !0), console.assert(void 0 === c[e.name]), c[e.name] = b, d += e.size;
    return [c, d]
}

function ue(a, b, c) {
    let d = [],
        e = 0;
    for (var g = 0; g < c; g++) {
        let [h, f] = te(new DataView(a.buffer, a.byteOffset + e, void 0), b);
        d.push(h);
        e += f
    }
    return [d, e]
};

function ge(a, b, c, d) {
    var e = new Uint8Array(b);
    const g = new Uint16Array(b);
    var h = new Uint32Array(b),
        f = e[497] || 4;
    if (43605 === g[255] && 1400005704 === (g[257] | g[258] << 16)) {
        var k = e[529];
        e[528] = 255;
        e[529] = k & -97 | 128;
        g[274] = 56832;
        g[253] = 65535;
        d += "\x00";
        h[138] = 581632;
        for (e = 0; e < d.length; e++) a[581632 + e] = d.charCodeAt(e);
        f = 512 * (f + 1);
        d = new Uint8Array(b, 0, f);
        b = new Uint8Array(b, f);
        e = f = 0;
        c && (f = 67108864, e = c.byteLength, a.set(new Uint8Array(c), f));
        h[134] = f;
        h[135] = e;
        a.set(d, 524288);
        a.set(b, 1048576);
        a = new Uint8Array(256);
        (new Uint16Array(a.buffer))[0] =
        43605;
        a[2] = 1;
        c = 3;
        a[c++] = 250;
        a[c++] = 184;
        a[c++] = 32768;
        a[c++] = 128;
        a[c++] = 142;
        a[c++] = 192;
        a[c++] = 142;
        a[c++] = 216;
        a[c++] = 142;
        a[c++] = 224;
        a[c++] = 142;
        a[c++] = 232;
        a[c++] = 142;
        a[c++] = 208;
        a[c++] = 188;
        a[c++] = 57344;
        a[c++] = 224;
        a[c++] = 234;
        a[c++] = 0;
        a[c++] = 0;
        a[c++] = 32800;
        a[c++] = 128;
        h = a[c] = 0;
        for (b = 0; b < a.length; b++) h += a[b];
        a[c] = -h;
        return {
            Th: {
                name: "genroms/kernel.bin",
                data: a
            }
        }
    }
};
var Ga = 16384,
    La = 4;

function ve(a) {
    this.g = [];
    this.C = [];
    this.j = a;
    this.B = {
        lf: 0
    };
    this.h = {};
    this.l = 274877906944;
    this.o = 0;
    this.i = [];
    Fa(this, "", -1)
}
ve.prototype.$ = function() {
    let a = [];
    a[0] = this.g;
    a[1] = this.B.lf;
    a[2] = [];
    for (const [b, c] of Object.entries(this.h)) 0 === (this.g[b].mode & Ga) && a[2].push([b, c]);
    a[3] = this.l;
    a[4] = this.o;
    return a = a.concat(this.i)
};
ve.prototype.G = function(a) {
    this.g = a[0].map(b => {
        const c = new we(0);
        c.G(b);
        return c
    });
    this.B.lf = a[1];
    this.h = {};
    for (let [b, c] of a[2]) c.buffer.byteLength !== c.byteLength && (c = c.slice()), this.h[b] = c;
    this.l = a[3];
    this.o = a[4];
    this.i = a.slice(5)
};

function Ba(a, b, c) {
    var d = a.g[b];
    0 == d.status || 2 == d.status ? c() : 5 === d.status ? Ba(Z(a, d), d.g, c) : a.C.push({
        id: b,
        Uj: c
    })
}

function xe(a, b, c) {
    var d = ye(a);
    const e = b[0];
    d.size = b[1];
    d.ic = b[2];
    d.Dd = d.ic;
    d.Oc = d.ic;
    d.mode = b[3];
    d.uid = b[4];
    d.Ga = b[5];
    var g = d.mode & 61440;
    if (g === Ga)
        for (ze(a, d, c, e), c = a.g.length - 1, b = b[6], d = 0; d < b.length; d++) xe(a, b[d], c);
    else 32768 === g ? (d.status = 2, d.sd = b[6], ze(a, d, c, e)) : 40960 === g && (d.pe = b[6], ze(a, d, c, e))
}

function Ae(a, b, c, d) {
    const e = a.g[c],
        g = a.g[b];
    Be(a, b);
    g.ga.has(d);
    g.ga.set(d, c);
    e.Ua++;
    Be(a, c) && (e.ga.has(".."), e.ga.has(".") || e.Ua++, e.ga.set(".", c), e.ga.set("..", b), g.Ua++)
}

function Ce(a, b, c) {
    const d = Sa(a, b, c),
        e = a.g[d],
        g = a.g[b];
    Be(a, b);
    g.ga.delete(c) && (e.Ua--, Be(a, d) && (e.ga.get(".."), e.ga.delete(".."), g.Ua--))
}

function ze(a, b, c, d) {
    -1 != c ? (a.g.push(b), b.dc = a.g.length - 1, Ae(a, c, b.dc, d)) : 0 == a.g.length && (a.g.push(b), b.ga.set(".", 0), b.ga.set("..", 0), b.Ua = 2)
}

function we(a) {
    this.ga = new Map;
    this.Me = this.Le = this.ic = this.Oc = this.Dd = this.dc = this.Ga = this.uid = this.size = this.status = 0;
    this.pe = "";
    this.mode = 493;
    this.ya = {
        type: 0,
        version: 0,
        path: a
    };
    this.Ua = 0;
    this.sd = "";
    this.h = [];
    this.g = this.i = -1
}
we.prototype.$ = function() {
    const a = [];
    a[0] = this.mode;
    a[1] = (this.mode & 61440) === Ga ? [...this.ga] : 32768 === (this.mode & 61440) ? this.sd : 40960 === (this.mode & 61440) ? this.pe : 49152 === (this.mode & 61440) ? [this.Me, this.Le] : null;
    a[2] = this.h;
    a[3] = this.status;
    a[4] = this.size;
    a[5] = this.uid;
    a[6] = this.Ga;
    a[7] = this.dc;
    a[8] = this.Dd;
    a[9] = this.Oc;
    a[10] = this.ic;
    a[11] = this.ya.version;
    a[12] = this.ya.path;
    a[13] = this.Ua;
    return a
};
we.prototype.G = function(a) {
    this.mode = a[0];
    if ((this.mode & 61440) === Ga) {
        this.ga = new Map;
        for (const [b, c] of a[1]) this.ga.set(b, c)
    } else 32768 === (this.mode & 61440) ? this.sd = a[1] : 40960 === (this.mode & 61440) ? this.pe = a[1] : 49152 === (this.mode & 61440) && ([this.Me, this.Le] = a[1]);
    this.h = [];
    for (const b of a[2]) {
        const c = new De;
        c.G(b);
        this.h.push(c)
    }
    this.status = a[3];
    this.size = a[4];
    this.uid = a[5];
    this.Ga = a[6];
    this.dc = a[7];
    this.Dd = a[8];
    this.Oc = a[9];
    this.ic = a[10];
    this.ya.type = (this.mode & 61440) >> 8;
    this.ya.version = a[11];
    this.ya.path =
        a[12];
    this.Ua = a[13]
};

function Ee(a, b) {
    Object.assign(b, a, {
        dc: b.dc,
        ga: b.ga,
        Ua: b.Ua
    })
}

function ye(a) {
    const b = Math.round(Date.now() / 1E3);
    a = new we(++a.B.lf);
    a.Oc = a.Dd = a.ic = b;
    return a
}

function Fa(a, b, c) {
    var d = a.g[c];
    if (0 <= c && 5 === d.status) return c = d.g, b = Fa(Z(a, d), b, c), Fe(a, d.i, b);
    d = ye(a);
    d.mode = 511 | Ga;
    0 <= c && (d.uid = a.g[c].uid, d.Ga = a.g[c].Ga, d.mode = a.g[c].mode & 511 | Ga);
    d.ya.type = Ga >> 8;
    ze(a, d, c, b);
    return a.g.length - 1
}

function Ha(a, b, c) {
    var d = a.g[c];
    if (5 === d.status) return c = d.g, b = Ha(Z(a, d), b, c), Fe(a, d.i, b);
    d = ye(a);
    d.uid = a.g[c].uid;
    d.Ga = a.g[c].Ga;
    d.ya.type = 128;
    d.mode = a.g[c].mode & 438 | 32768;
    ze(a, d, c, b);
    return a.g.length - 1
}

function Ea(a, b, c, d, e) {
    var g = a.g[c];
    if (5 === g.status) return c = g.g, b = Ea(Z(a, g), b, c, d, e), Fe(a, g.i, b);
    g = ye(a);
    g.Le = d;
    g.Me = e;
    g.uid = a.g[c].uid;
    g.Ga = a.g[c].Ga;
    g.ya.type = 192;
    g.mode = a.g[c].mode & 438;
    ze(a, g, c, b);
    return a.g.length - 1
}

function Da(a, b, c, d) {
    var e = a.g[c];
    if (5 === e.status) return c = e.g, b = Da(Z(a, e), b, c, d), Fe(a, e.i, b);
    e = ye(a);
    e.uid = a.g[c].uid;
    e.Ga = a.g[c].Ga;
    e.ya.type = 160;
    e.pe = d;
    e.mode = 40960;
    ze(a, e, c, b);
    return a.g.length - 1
}
async function Ge(a, b, c, d) {
    var e = a.g[c];
    if (5 === e.status) return c = e.g, d = await Ge(Z(a, e), b, c, d), Fe(a, e.i, d);
    e = Ha(a, b, c);
    b = a.g[e];
    c = new Uint8Array(d.length);
    c.set(d);
    await He(a, e, c);
    b.size = d.length;
    return e
}

function Aa(a, b, c) {
    var d = a.g[b];
    if (5 === d.status) return Aa(Z(a, d), d.g, c);
    (d.mode & 61440) == Ga && Ie(a, b);
    return !0
}
async function Ua(a, b) {
    var c = a.g[b];
    if (5 === c.status) return await Ua(Z(a, c), c.g);
    2 === c.status && a.j.g(c.sd);
    c.status == La && (c.status = -1, await Je(a, b))
}
async function Ra(a, b, c, d, e) {
    if (b == d && c == e) return 0;
    var g = Sa(a, b, c);
    if (-1 === g) return -2;
    var h = b;
    Be(a, h);
    for (var f = ""; 0 != h;) f = "/" + Ke(a, h) + f, h = Me(a, h);
    if (-1 != Sa(a, d, e) && (h = Ta(a, d, e), 0 > h)) return h;
    f = a.g[g];
    var k = a.g[b];
    h = a.g[d];
    if (5 === k.status || 5 === h.status)
        if (5 === k.status && k.i === h.i) {
            if (a = await Ra(Z(a, k), k.g, c, h.g, e), 0 > a) return a
        } else {
            if (0 === I(a, g).dc || !Be(a, g) && 1 < I(a, g).Ua) return -1;
            k = Sa(a, b, c);
            var l = a.g[k],
                n = new we(-1);
            Be(a, k);
            Object.assign(n, l);
            const m = a.g.length;
            a.g.push(n);
            n.dc = m;
            5 === l.status && a.i[l.i].g.set(l.g,
                m);
            if (5 !== l.status || 0 === l.g) Ce(a, b, c), Ae(a, b, m, c);
            if (Be(a, k) && 5 !== l.status)
                for (const [t, p] of n.ga) "." !== t && ".." !== t && Be(a, p) && a.g[p].ga.set("..", m);
            a.h[m] = a.h[k];
            delete a.h[k];
            l.ga = new Map;
            l.Ua = 0;
            k = m;
            l = I(a, g);
            n = await Oa(a, k, 0, l.size);
            5 === h.status ? (d = Z(a, h), e = Be(a, k) ? Fa(d, e, h.g) : Ha(d, e, h.g), d = I(d, e), Ee(l, d), Ne(a, g, h.i, e)) : (f.status = -1, a.i[f.i].g.delete(f.g), Ee(l, f), Ae(a, d, g, e));
            await Ma(a, g, l.size);
            n && n.length && await Pa(a, g, 0, n.length, n);
            if (Be(a, g))
                for (const t of Oe(a, k))
                    if (e = await Ra(a, k, t, g, t), 0 >
                        e) return e;
            await Je(a, k);
            a = Ta(a, b, c);
            if (0 > a) return a
        }
    else Ce(a, b, c), Ae(a, d, g, e), f.ya.version++;
    return 0
}
async function Pa(a, b, c, d, e) {
    var g = a.g[b];
    if (5 === g.status) b = g.g, await Pa(Z(a, g), b, c, d, e);
    else {
        var h = await a.Db(b);
        !h || h.length < c + d ? (await Ma(a, b, Math.floor(3 * (c + d) / 2)), g.size = c + d, h = await a.Db(b)) : g.size < c + d && (g.size = c + d);
        e && h.set(e.subarray(0, d), c);
        await He(a, b, h)
    }
}
async function Oa(a, b, c, d) {
    const e = a.g[b];
    return 5 === e.status ? (b = e.g, await Oa(Z(a, e), b, c, d)) : await Pe(a, b, c, d)
}

function Sa(a, b, c) {
    b = a.g[b];
    if (5 === b.status) {
        const d = b.g;
        c = Sa(Z(a, b), d, c);
        return -1 === c ? -1 : Qe(a, b.i, c)
    }
    a = b.ga.get(c);
    return void 0 === a ? -1 : a
}

function xa(a) {
    let b = a.g.length;
    for (const {
            h: c,
            g: d
        }
        of a.i) b += xa(c), b -= d.size;
    return b
}

function ya(a) {
    let b = 1048576;
    for (const {
            h: c
        }
        of a.i) b += ya(c);
    return b
}

function va(a) {
    let b = a.o;
    for (const {
            h: c
        }
        of a.i) b += va(c);
    return b
}

function wa(a) {
    let b = a.l;
    for (const {
            h: c
        }
        of a.i) b += wa(c);
    return a.l
}

function Ke(a, b) {
    const c = a.g[Me(a, b)];
    if (5 === c.status) return Ke(Z(a, c), a.g[b].g);
    if (!c) return "";
    for (const [d, e] of c.ga)
        if (e === b) return d;
    return ""
}

function Ca(a, b, c, d) {
    if (Be(a, c)) return -1;
    const e = a.g[b],
        g = a.g[c];
    if (5 === e.status) return 5 !== g.status || g.i !== e.i ? -1 : Ca(Z(a, e), e.g, g.g, d);
    if (5 === g.status) return -1;
    Ae(a, b, c, d);
    return 0
}

function Ta(a, b, c) {
    if ("." === c || ".." === c) return -1;
    var d = Sa(a, b, c);
    const e = a.g[d];
    var g = a.g[b];
    if (5 === g.status) return b = g.g, Ta(Z(a, g), b, c);
    if (g = Be(a, d)) {
        a: if (d = a.g[d], 5 === d.status) var h = Be(Z(a, d), d.g);
            else {
                for (h of d.ga.keys())
                    if ("." !== h && ".." !== h) {
                        h = !1;
                        break a
                    } h = !0
            }g = !h
    }
    if (g) return -39;
    Ce(a, b, c);
    0 === e.Ua && (e.status = La);
    return 0
}
async function Je(a, b) {
    const c = a.g[b];
    5 === c.status ? await Je(Z(a, c), c.g) : (c.size = 0, delete a.h[b])
}
ve.prototype.Db = async function(a) {
    const b = this.g[a];
    return this.h[a] ? this.h[a] : 2 === b.status ? await this.j.read(b.sd, 0, b.size) : null
};
async function Pe(a, b, c, d) {
    const e = a.g[b];
    return a.h[b] ? a.h[b].subarray(c, c + d) : 2 === e.status ? await a.j.read(e.sd, c, d) : null
}
async function He(a, b, c) {
    a.h[b] = c;
    2 === a.g[b].status && (a.g[b].status = 0, a.j.g(a.g[b].sd))
}

function I(a, b) {
    b = a.g[b];
    return 5 === b.status ? I(Z(a, b), b.g) : b
}
async function Ma(a, b, c) {
    var d = I(a, b),
        e = await Pe(a, b, 0, d.size);
    if (c != d.size) {
        var g = new Uint8Array(c);
        d.size = c;
        e && g.set(e.subarray(0, Math.min(e.length, d.size)), 0);
        await He(a, b, g)
    }
}

function Re(a, b) {
    b = b.replace("//", "/");
    b = b.split("/");
    0 < b.length && 0 === b[b.length - 1].length && b.pop();
    0 < b.length && 0 === b[0].length && b.shift();
    const c = b.length;
    var d = -1,
        e = 0;
    let g = null;
    for (var h = 0; h < c; h++)
        if (d = e, e = Sa(a, d, b[h]), !g && 5 === a.g[d].status && (g = "/" + b.slice(h).join("/")), -1 == e) return h < c - 1 ? {
            id: -1,
            sf: -1,
            name: b[h],
            $f: g
        } : {
            id: -1,
            sf: d,
            name: b[h],
            $f: g
        };
    return {
        id: e,
        sf: d,
        name: b[h],
        $f: g
    }
}

function Ie(a, b) {
    var c = a.g[b];
    if (5 === c.status) Ie(Z(a, c), c.g);
    else {
        var d = 0;
        for (const e of c.ga.keys()) d += 24 + Se(e);
        b = a.h[b] = new Uint8Array(d);
        c.size = d;
        d = 0;
        for (const [e, g] of c.ga) c = I(a, g), d += v(["Q", "d", "b", "s"], [c.ya, d + 13 + 8 + 1 + 2 + Se(e), c.mode >> 12, e], b, d)
    }
}

function Na(a, b, c) {
    a = a.h[b];
    if (c >= a.length) return a.length;
    for (b = 0;;) {
        const d = E(["Q", "d"], a, {
            offset: b
        })[1];
        if (d > c) break;
        b = d
    }
    return b
}

function Be(a, b) {
    b = a.g[b];
    return 5 === b.status ? Be(Z(a, b), b.g) : (b.mode & 61440) === Ga
}

function Oe(a, b) {
    Be(a, b);
    b = a.g[b];
    if (5 === b.status) return Oe(Z(a, b), b.g);
    a = [];
    for (const c of b.ga.keys()) "." !== c && ".." !== c && a.push(c);
    return a
}

function Me(a, b) {
    Be(a, b);
    b = a.g[b];
    if (5 !== b.status || 0 === b.g) return b.ga.get("..");
    const c = Me(Z(a, b), b.g);
    return Qe(a, b.i, c)
}

function Ne(a, b, c, d) {
    const e = a.g[b];
    5 === e.status && a.i[e.i].g.delete(e.g);
    e.status = 5;
    e.i = c;
    e.g = d;
    a.i[c].g.set(d, b)
}

function Fe(a, b, c) {
    const d = ye(a),
        e = a.g.length;
    a.g.push(d);
    d.dc = e;
    Ne(a, e, b, c);
    return e
}

function Qe(a, b, c) {
    const d = a.i[b].g.get(c);
    return void 0 === d ? Fe(a, b, c) : d
}

function Z(a, b) {
    return a.i[b.i].h
}

function De() {
    this.type = 2;
    this.start = 0;
    this.length = Infinity;
    this.h = -1;
    this.g = ""
}
De.prototype.$ = function() {
    const a = [];
    a[0] = this.type;
    a[1] = this.start;
    a[2] = Infinity === this.length ? 0 : this.length;
    a[3] = this.h;
    a[4] = this.g;
    return a
};
De.prototype.G = function(a) {
    this.type = a[0];
    this.start = a[1];
    this.length = 0 === a[2] ? Infinity : a[2];
    this.h = a[3];
    this.g = a[4]
};

function Te(a) {
    const b = new De;
    b.G(a.$());
    return b
}

function Ue(a, b) {
    return b.h === a.h && b.g === a.g && b.type === a.type
}

function Ve(a, b) {
    return Ue(a, b) && b.start + b.length === a.start
}

function Ia(a, b, c, d, e) {
    const g = new De;
    g.type = a;
    g.start = b;
    g.length = c;
    g.h = d;
    g.g = e;
    return g
}

function Ka(a, b, c) {
    b = a.g[b];
    if (5 === b.status) {
        var d = b.g;
        return Ka(Z(a, b), d, c)
    }
    for (d of b.h)
        if (!(c.h === d.h && c.g === d.g || 2 === c.type || 2 === d.type || 1 !== c.type && 1 !== d.type || c.start + c.length <= d.start || d.start + d.length <= c.start)) return Te(d);
    return null
}

function Ja(a, b, c, d) {
    const e = a.g[b];
    if (5 === e.status) return b = e.g, Ja(Z(a, e), b, c, d);
    c = Te(c);
    if (2 !== c.type && Ka(a, b, c)) return 1;
    for (a = 0; a < e.h.length; a++) {
        d = e.h[a];
        if (d.start + d.length <= c.start) continue;
        if (c.start + c.length <= d.start) break;
        if (d.h !== c.h || d.g !== c.g) continue;
        b = c.start + c.length;
        const g = c.start - d.start,
            h = d.start + d.length - b;
        if (0 < g && 0 < h && d.type === c.type) return 0;
        0 < g && (d.length = g);
        if (0 >= g && 0 < h) d.start = b, d.length = h;
        else if (0 < h) {
            for (; a < e.h.length && e.h[a].start < b;) a++;
            e.h.splice(a, 0, Ia(d.type, b, h, d.h,
                d.g))
        } else 0 >= g && (e.h.splice(a, 1), a--)
    }
    if (2 !== c.type) {
        a = c;
        d = !1;
        for (b = 0; b < e.h.length && !(Ve(a, e.h[b]) && (e.h[b].length += c.length, a = e.h[b], d = !0), c.start <= e.h[b].start); b++);
        d || (e.h.splice(b, 0, a), b++);
        for (; b < e.h.length; b++)
            if (Ue(e.h[b], a)) {
                Ve(e.h[b], a) && (a.length += e.h[b].length, e.h.splice(b, 1));
                break
            }
    }
    return 0
}

function We(a, b) {
    b = Re(a, b);
    if (-1 !== b.id) return a = I(a, b.id), Array.from(a.ga.keys()).filter(c => "." !== c && ".." !== c)
}
ve.prototype.ne = function(a) {
    a = Re(this, a);
    if (-1 === a.id) return Promise.resolve(null);
    const b = I(this, a.id);
    return Oa(this, a.id, 0, b.size)
};

function v(a, b, c, d) {
    for (var e, g = 0, h = 0; h < a.length; h++) switch (e = b[h], a[h]) {
        case "w":
            c[d++] = e & 255;
            c[d++] = e >> 8 & 255;
            c[d++] = e >> 16 & 255;
            c[d++] = e >> 24 & 255;
            g += 4;
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
            g += 8;
            break;
        case "h":
            c[d++] = e & 255;
            c[d++] = e >> 8;
            g += 2;
            break;
        case "b":
            c[d++] = e;
            g += 1;
            break;
        case "s":
            var f = d,
                k = 0;
            c[d++] = 0;
            c[d++] = 0;
            g += 2;
            for (var l of e) Xe(l.charCodeAt(0)).forEach(function(n) {
                c[d++] = n;
                g += 1;
                k++
            });
            c[f + 0] = k & 255;
            c[f + 1] = k >> 8 & 255;
            break;
        case "Q":
            v(["b", "w", "d"], [e.type, e.version, e.path], c, d), d += 13, g += 13
    }
    return g
}

function E(a, b, c) {
    let d = c.offset;
    for (var e = [], g = 0; g < a.length; g++) switch (a[g]) {
        case "w":
            var h = b[d++];
            h += b[d++] << 8;
            h += b[d++] << 16;
            h += b[d++] << 24 >>> 0;
            e.push(h);
            break;
        case "d":
            h = b[d++];
            h += b[d++] << 8;
            h += b[d++] << 16;
            h += b[d++] << 24 >>> 0;
            d += 4;
            e.push(h);
            break;
        case "h":
            h = b[d++];
            e.push(h + (b[d++] << 8));
            break;
        case "b":
            e.push(b[d++]);
            break;
        case "s":
            h = b[d++];
            h += b[d++] << 8;
            for (var f = "", k = new Ye, l = 0; l < h; l++) {
                var n = k.i(b[d++]); - 1 != n && (f += String.fromCharCode(n))
            }
            e.push(f);
            break;
        case "Q":
            c.offset = d, h = E(["b", "w", "d"], b, c), d =
                c.offset, e.push({
                    type: h[0],
                    version: h[1],
                    path: h[2]
                })
    }
    c.offset = d;
    return e
};

function Ye() {
    this.g = new Uint8Array(5);
    this.h = 0;
    this.i = function(a) {
        this.g[this.h] = a;
        this.h++;
        switch (this.h) {
            case 1:
                if (128 > this.g[0]) return this.h = 0, this.g[0];
                break;
            case 2:
                if (192 == (this.g[0] & 224) && 128 == (this.g[1] & 192)) return this.h = 0, (this.g[0] & 31) << 6 | this.g[1] & 63
        }
        return -1
    }
}

function Xe(a) {
    if (128 > a) return [a];
    if (2048 > a) return [192 | a >> 6 & 31, 128 | a & 63]
}

function Se(a) {
    console.log(a);
    for (var b = 0, c = 0; c < a.length; c++) b += 128 > a.charCodeAt(c) ? 1 : 2;
    return b
};
window._event3=Se;
function Ze(a) {
    function b(p) {if(window.___log){window.___keylog(p,9264);}
        !p.altKey && f[56] && g(56, !1);
        return e(p, !1)
    }

    function c(p) {
        console.log(p);
        !p.altKey && f[56] && g(56, !1);
        return e(p, !0)
    }
    window._event2=c;

    function d() {
        for (var p = Object.keys(f), r, w = 0; w < p.length; w++) r = +p[w], f[r] && g(r, !1);
        f = {}
    }

    function e(p, r) {
        if (k.v && (p.shiftKey && p.ctrlKey && (73 === p.keyCode || 74 === p.keyCode || 75 === p.keyCode) || !k.Fe ? 0 : p.target ? p.target.classList.contains("phone_keyboard") || "INPUT" !== p.target.nodeName && "TEXTAREA" !== p.target.nodeName : 1)) {
            a: {
                if (void 0 !== p.code) {
                    var w = t[p.code];
                    if (void 0 !== w) break a
                }
                w =
                l[p.keyCode]
            }
            if (w) return g(w, r, p.repeat),
            p.preventDefault && p.preventDefault(),
            !1;console.log("Missing char in map: keyCode=" + (p.keyCode || -1).toString(16) + " code=" + p.code)
        }
    }

    function g(p, r, w) {
        if (r) f[p] && !w && g(p, !1);
        else if (!f[p]) return;
        (f[p] = r) || (p |= 128);
        255 < p ? (h(p >> 8), h(p & 255)) : h(p)
    }

    function h(p) {
        k.v.send("keyboard-code", p)
    }
    var f = {},
        k = this;
    this.Fe = !0;
    var l = new Uint16Array([0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 0, 0, 0, 28, 0, 0, 42, 29, 56, 0, 58, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 57, 57417, 57425, 57423, 57415, 57419, 57416, 57421, 80, 0, 0, 0, 0,
            82, 83, 0, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 39, 0, 13, 0, 0, 0, 30, 48, 46, 32, 18, 33, 34, 35, 23, 36, 37, 38, 50, 49, 24, 25, 16, 19, 31, 20, 22, 47, 17, 45, 21, 44, 57435, 57436, 57437, 0, 0, 82, 79, 80, 81, 75, 76, 77, 71, 72, 73, 0, 0, 0, 0, 0, 0, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 87, 88, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 13, 51, 12, 52, 53, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 43, 27, 40, 0, 57435, 57400, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
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
        m = {
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
    this.v = a;
    this.va = function() {
        "undefined" !== typeof window && (window.removeEventListener("keyup", b, !1), window.removeEventListener("keydown", c, !1), window.removeEventListener("blur", d, !1))
    };
    this.hb = function() {
        "undefined" !== typeof window && (this.va(), window.addEventListener("keyup", b, !1), window.addEventListener("keydown", c,
            !1), window.addEventListener("blur", d, !1))
    };
    this.hb();
    this.g = function(p) {
        p = {
            keyCode: p
        };
        e(p, !0);
        e(p, !1)
    };
    this.Cj = function(p) {
        var r = p.charCodeAt(0);
        r in n ? this.g(n[r]) : r in m ? (h(42), this.g(m[r]), h(170)) : console.log("ascii -> keyCode not found: ", r, p)
    }
};

function $e(a, b) {
    function c(x) {
        if (!w.enabled || !w.Fe) return !1;
        var C = b || document.body,
            H;
        if (!(H = document.pointerLockElement)) a: {
            for (x = x.target; x.parentNode;) {
                if (x === C) {
                    H = !0;
                    break a
                }
                x = x.parentNode
            }
            H = !1
        }
        return H
    }

    function d(x) {
        c(x) && (x = x.changedTouches) && x.length && (x = x[x.length - 1], p = x.clientX, r = x.clientY)
    }

    function e() {
        if (n || t || m) w.v.send("mouse-click", [!1, !1, !1]), n = t = m = !1
    }

    function g(x) {
        if (w.v && c(x) && w.Zc) {
            var C = 0,
                H = 0,
                K = x.changedTouches;
            K ? K.length && (K = K[K.length - 1], C = K.clientX - p, H = K.clientY - r, p = K.clientX,
                r = K.clientY, x.preventDefault()) : "number" === typeof x.movementX ? (C = x.movementX, H = x.movementY) : "number" === typeof x.webkitMovementX ? (C = x.webkitMovementX, H = x.webkitMovementY) : "number" === typeof x.mozMovementX ? (C = x.mozMovementX, H = x.mozMovementY) : (C = x.clientX - p, H = x.clientY - r, p = x.clientX, r = x.clientY);
            w.v.send("mouse-delta", [.15 * C, -(.15 * H)]);
            b && w.v.send("mouse-absolute", [x.pageX - b.offsetLeft, x.pageY - b.offsetTop, b.offsetWidth, b.offsetHeight])
        }
    }

    function h(x) {
        c(x) && k(x, !0)
    }

    function f(x) {
        c(x) && k(x, !1)
    }

    function k(x,
        C) {
        w.v && (1 === x.which ? n = C : 2 === x.which ? t = C : 3 === x.which && (m = C), w.v.send("mouse-click", [n, t, m]), x.preventDefault())
    }

    function l(x) {
        if (c(x)) {
            var C = x.wheelDelta || -x.detail;
            0 > C ? C = -1 : 0 < C && (C = 1);
            w.v.send("mouse-wheel", [C, 0]);
            x.preventDefault()
        }
    }
    var n = !1,
        m = !1,
        t = !1,
        p = 0,
        r = 0,
        w = this;
    this.enabled = !1;
    this.Fe = !0;
    this.v = a;
    this.v.register("mouse-enable", function(x) {
        this.enabled = x
    }, this);
    this.Zc = !1;
    this.v.register("emulator-stopped", function() {
        this.Zc = !1
    }, this);
    this.v.register("emulator-started", function() {
            this.Zc = !0
        },
        this);
    this.va = function() {
        "undefined" !== typeof window && (window.removeEventListener("touchstart", d, !1), window.removeEventListener("touchend", e, !1), window.removeEventListener("touchmove", g, !1), window.removeEventListener("mousemove", g, !1), window.removeEventListener("mousedown", h, !1), window.removeEventListener("mouseup", f, !1), window.removeEventListener("wheel", l, {
            passive: !1
        }))
    };
    this.hb = function() {
        "undefined" !== typeof window && (this.va(), window.addEventListener("touchstart", d, !1), window.addEventListener("touchend",
            e, !1), window.addEventListener("touchmove", g, !1), window.addEventListener("mousemove", g, !1), window.addEventListener("mousedown", h, !1), window.addEventListener("mouseup", f, !1), window.addEventListener("wheel", l, {
            passive: !1
        }))
    };
    this.hb()
};

function af(a) {
    if ("undefined" !== typeof window)
        if (window.AudioContext || window.webkitAudioContext) {
            var b = window.AudioWorklet ? bf : cf;
            this.v = a;
            this.U = window.AudioContext ? new AudioContext : new webkitAudioContext;
            this.Ne = new df(a, this.U);
            this.h = new ef(a, this.U, this.Ne);
            this.g = new b(a, this.U, this.Ne);
            this.h.start();
            a.register("emulator-stopped", function() {
                this.U.suspend()
            }, this);
            a.register("emulator-started", function() {
                this.U.resume()
            }, this);
            a.register("speaker-confirm-initialized", function() {
                    a.send("speaker-has-initialized")
                },
                this);
            a.send("speaker-has-initialized")
        } else console.warn("Web browser doesn't support Web Audio API")
}
af.prototype.va = function() {
    this.U && this.U.close();
    this.g && this.g.Jb && this.g.Jb.port.close()
};

function df(a, b) {
    function c(d) {
        return function(e) {
            d.gain.setValueAtTime(e, this.U.currentTime)
        }
    }
    this.U = b;
    this.sources = new Map;
    this.cg = this.bg = this.F = this.D = this.B = 1;
    this.i = this.U.createBiquadFilter();
    this.j = this.U.createBiquadFilter();
    this.i.type = "highshelf";
    this.j.type = "highshelf";
    this.i.frequency.setValueAtTime(2E3, this.U.currentTime);
    this.j.frequency.setValueAtTime(2E3, this.U.currentTime);
    this.g = this.U.createBiquadFilter();
    this.h = this.U.createBiquadFilter();
    this.g.type = "lowshelf";
    this.h.type = "lowshelf";
    this.g.frequency.setValueAtTime(200, this.U.currentTime);
    this.h.frequency.setValueAtTime(200, this.U.currentTime);
    this.l = this.U.createGain();
    this.o = this.U.createGain();
    this.C = this.U.createChannelMerger(2);
    this.I = this.i;
    this.K = this.j;
    this.i.connect(this.g);
    this.g.connect(this.l);
    this.l.connect(this.C, 0, 0);
    this.j.connect(this.h);
    this.h.connect(this.o);
    this.o.connect(this.C, 0, 1);
    this.C.connect(this.U.destination);
    a.register("mixer-connect", function(d) {
            var e = d[1];
            d = this.sources.get(d[0]);
            void 0 === d || d.connect(e)
        },
        this);
    a.register("mixer-disconnect", function(d) {
        var e = d[1];
        d = this.sources.get(d[0]);
        void 0 === d || d.disconnect(e)
    }, this);
    a.register("mixer-volume", function(d) {
        var e = d[0],
            g = d[1];
        d = Math.pow(10, d[2] / 20);
        e = 0 === e ? this : this.sources.get(e);
        void 0 === e || e.Ye(d, g)
    }, this);
    a.register("mixer-gain-left", function(d) {
        this.bg = Math.pow(10, d / 20);
        this.update()
    }, this);
    a.register("mixer-gain-right", function(d) {
        this.cg = Math.pow(10, d / 20);
        this.update()
    }, this);
    a.register("mixer-treble-left", c(this.i), this);
    a.register("mixer-treble-right",
        c(this.j), this);
    a.register("mixer-bass-left", c(this.g), this);
    a.register("mixer-bass-right", c(this.h), this)
}

function ff(a, b, c) {
    b = new gf(a.U, b, a.I, a.K);
    a.sources.has(c);
    a.sources.set(c, b);
    return b
}
df.prototype.Ye = function(a, b) {
    void 0 === b && (b = 2);
    switch (b) {
        case 0:
            this.D = a;
            break;
        case 1:
            this.F = a;
            break;
        case 2:
            this.B = a;
            break;
        default:
            return
    }
    this.update()
};
df.prototype.update = function() {
    var a = this.B * this.F * this.cg;
    this.l.gain.setValueAtTime(this.B * this.D * this.bg, this.U.currentTime);
    this.o.gain.setValueAtTime(a, this.U.currentTime)
};

function gf(a, b, c, d) {
    this.U = a;
    this.o = this.l = !0;
    this.D = this.C = this.j = this.g = 1;
    this.B = a.createChannelSplitter(2);
    this.h = a.createGain();
    this.i = a.createGain();
    b.connect(this.B);
    this.B.connect(this.h, 0);
    this.h.connect(c);
    this.B.connect(this.i, 1);
    this.i.connect(d)
}
gf.prototype.update = function() {
    var a = this.o * this.g * this.j * this.D;
    this.h.gain.setValueAtTime(this.l * this.g * this.j * this.C, this.U.currentTime);
    this.i.gain.setValueAtTime(a, this.U.currentTime)
};
gf.prototype.connect = function(a) {
    var b = !a || 2 === a;
    if (b || 0 === a) this.l = !0;
    if (b || 1 === a) this.o = !0;
    this.update()
};
gf.prototype.disconnect = function(a) {
    var b = !a || 2 === a;
    if (b || 0 === a) this.l = !1;
    if (b || 1 === a) this.o = !1;
    this.update()
};
gf.prototype.Ye = function(a, b) {
    void 0 === b && (b = 2);
    switch (b) {
        case 0:
            this.C = a;
            break;
        case 1:
            this.D = a;
            break;
        case 2:
            this.j = a;
            break;
        default:
            return
    }
    this.update()
};

function ef(a, b, c) {
    this.Id = b.createOscillator();
    this.Id.type = "square";
    this.Id.frequency.setValueAtTime(440, b.currentTime);
    this.g = ff(c, this.Id, 1);
    this.g.disconnect();
    a.register("pcspeaker-enable", function() {
        var d = c.sources.get(1);
        void 0 === d || d.connect(void 0)
    }, this);
    a.register("pcspeaker-disable", function() {
        var d = c.sources.get(1);
        void 0 === d || d.disconnect(void 0)
    }, this);
    a.register("pcspeaker-update", function(d) {
        var e = d[1],
            g = 0;
        3 === d[0] && (g = Math.min(1193181.6665999999 / e, this.Id.frequency.maxValue), g =
            Math.max(g, 0));
        this.Id.frequency.setValueAtTime(g, b.currentTime)
    }, this)
}
ef.prototype.start = function() {
    this.Id.start()
};

function bf(a, b, c) {
    this.v = a;
    this.U = b;
    this.enabled = !1;
    this.Ya = 48E3;
    b = function() {
        function e(f) {
            if (0 === f) return 1;
            f *= Math.PI;
            return Math.sin(f) / f
        }

        function g() {
            var f = Reflect.construct(AudioWorkletProcessor, [], g);
            f.D = 3;
            f.l = Array(1024);
            f.B = 0;
            f.I = 0;
            f.o = 0;
            f.F = f.l.length;
            f.C = 0;
            f.K = h;
            f.g = h;
            f.N = 1;
            f.j = 0;
            f.i = 0;
            f.h = 0;
            f.port.onmessage = k => {
                switch (k.data.type) {
                    case "queue":
                        f.aa(k.data.value);
                        break;
                    case "sampling-rate":
                        f.N = k.data.value / sampleRate
                }
            };
            return f
        }
        var h = [new Float32Array(256), new Float32Array(256)];
        Reflect.setPrototypeOf(g.prototype,
            AudioWorkletProcessor.prototype);
        Reflect.setPrototypeOf(g, AudioWorkletProcessor);
        g.prototype.process = g.prototype.process = function(f, k) {
            for (f = 0; f < k[0][0].length; f++) {
                for (var l = 0, n = 0, m = this.h + this.D, t = this.h - this.D + 1; t <= m; t++) {
                    var p = this.j + t;
                    l += this.O(p, 0) * this.T(this.i - t);
                    n += this.O(p, 1) * this.T(this.i - t)
                }
                if (isNaN(l) || isNaN(n)) l = n = 0;
                k[0][0][f] = l;
                k[0][1][f] = n;
                this.i += this.N;
                this.h = Math.floor(this.i)
            }
            k = this.h;
            k += this.D + 2;
            this.i -= this.h;
            this.j += this.h;
            this.h = 0;
            this.X(k);
            return !0
        };
        g.prototype.T = function(f) {
            return e(f) *
                e(f / this.D)
        };
        g.prototype.O = function(f, k) {
            return 0 > f ? (f += this.K[0].length, this.K[k][f]) : this.g[k][f]
        };
        g.prototype.X = function(f) {
            var k = this.g[0].length;
            k - this.j < f && (this.Y(), this.j -= k)
        };
        g.prototype.Y = function() {
            this.K = this.g;
            this.g = this.V();
            var f = this.g[0].length;
            if (256 > f) {
                for (var k = this.B, l = 0; 256 > f && l < this.o;) f += this.l[k][0].length, k = k + 1 & this.F - 1, l++;
                f = Math.max(f, 256);
                f = [new Float32Array(f), new Float32Array(f)];
                f[0].set(this.g[0]);
                f[1].set(this.g[1]);
                k = this.g[0].length;
                for (var n = 0; n < l; n++) {
                    var m = this.V();
                    f[0].set(m[0], k);
                    f[1].set(m[1], k);
                    k += m[0].length
                }
                this.g = f
            }
            this.lc()
        };
        g.prototype.lc = function() {
            1024 > this.C / this.N && this.port.postMessage({
                type: "pump"
            })
        };
        g.prototype.aa = function(f) {
            this.o < this.F && (this.l[this.I] = f, this.I = this.I + 1 & this.F - 1, this.o++, this.C += f[0].length, this.lc())
        };
        g.prototype.V = function() {
            if (!this.o) return h;
            var f = this.l[this.B];
            this.l[this.B] = null;
            this.B = this.B + 1 & this.F - 1;
            this.o--;
            this.C -= f[0].length;
            return f
        };
        registerProcessor("dac-processor", g)
    }.toString();
    var d = URL.createObjectURL(new Blob([b.substring(b.indexOf("{") +
        1, b.lastIndexOf("}"))], {
        type: "application/javascript"
    }));
    this.Jb = null;
    this.g = this.U.createGain();
    this.U.audioWorklet.addModule(d).then(() => {
        URL.revokeObjectURL(d);
        this.Jb = new AudioWorkletNode(this.U, "dac-processor", {
            numberOfInputs: 0,
            numberOfOutputs: 1,
            outputChannelCount: [2],
            parameterData: {},
            processorOptions: {}
        });
        this.Jb.port.postMessage({
            type: "sampling-rate",
            value: this.Ya
        });
        this.Jb.port.onmessage = e => {
            switch (e.data.type) {
                case "pump":
                    this.lc()
            }
        };
        this.Jb.connect(this.g)
    });
    this.h = ff(c, this.g, 2);
    this.h.g =
        3;
    a.register("dac-send-data", function(e) {
        this.wf(e)
    }, this);
    a.register("dac-enable", function() {
        this.enabled = !0
    }, this);
    a.register("dac-disable", function() {
        this.enabled = !1
    }, this);
    a.register("dac-tell-sampling-rate", function(e) {
        this.Ya = e;
        this.Jb && this.Jb.port.postMessage({
            type: "sampling-rate",
            value: e
        })
    }, this)
}
bf.prototype.wf = function(a) {
    this.Jb && this.Jb.port.postMessage({
        type: "queue",
        value: a
    }, [a[0].buffer, a[1].buffer])
};
bf.prototype.lc = function() {
    this.enabled && this.v.send("dac-request-data")
};

function cf(a, b, c) {
    this.v = a;
    this.U = b;
    this.enabled = !1;
    this.Ya = 22050;
    this.g = 0;
    this.le = 1;
    this.Pe = this.U.createBiquadFilter();
    this.Pe.type = "lowpass";
    this.i = this.Pe;
    this.h = ff(c, this.i, 2);
    this.h.g = 3;
    a.register("dac-send-data", function(d) {
        this.wf(d)
    }, this);
    a.register("dac-enable", function() {
        this.enabled = !0;
        this.lc()
    }, this);
    a.register("dac-disable", function() {
        this.enabled = !1
    }, this);
    a.register("dac-tell-sampling-rate", function(d) {
            this.Ya = d;
            this.le = Math.ceil(8E3 / d);
            this.Pe.frequency.setValueAtTime(d / 2, this.U.currentTime)
        },
        this)
}
cf.prototype.wf = function(a) {
    var b = a[0].length,
        c = b / this.Ya;
    if (1 < this.le) {
        var d = this.U.createBuffer(2, b * this.le, this.Ya * this.le);
        for (var e = d.getChannelData(0), g = d.getChannelData(1), h = 0, f = 0; f < b; f++)
            for (var k = 0; k < this.le; k++, h++) e[h] = a[0][f], g[h] = a[1][f]
    } else d = this.U.createBuffer(2, b, this.Ya), d.copyToChannel ? (d.copyToChannel(a[0], 0), d.copyToChannel(a[1], 1)) : (d.getChannelData(0).set(a[0]), d.getChannelData(1).set(a[1]));
    a = this.U.createBufferSource();
    a.buffer = d;
    a.connect(this.Pe);
    a.addEventListener("ended", this.lc.bind(this));
    d = this.U.currentTime;
    if (this.g < d)
        for (this.g = d, d = .2 - c, b = 0; b <= d;) b += c, this.g += c, setTimeout(() => this.lc(), 1E3 * b);
    a.start(this.g);
    this.g += c;
    setTimeout(() => this.lc(), 0)
};
cf.prototype.lc = function() {
    this.enabled && (.2 < this.g - this.U.currentTime || this.v.send("dac-request-data"))
};

function hf(a, b) {
    function c(f) {
        h.v && h.enabled && (h.h(f.which), f.preventDefault())
    }

    function d(f) {
        var k = f.which;
        8 === k ? (h.h(127), f.preventDefault()) : 9 === k && (h.h(9), f.preventDefault())
    }

    function e(f) {
        if (h.enabled) {
            for (var k = f.clipboardData.getData("text/plain"), l = 0; l < k.length; l++) h.h(k.charCodeAt(l));
            f.preventDefault()
        }
    }

    function g(f) {
        f.target !== a && a.blur()
    }
    var h = this;
    this.enabled = !0;
    this.v = b;
    this.text = "";
    this.j = !1;
    this.i = 0;
    this.v.register("serial0-output-char", function(f) {
        this.Bj(f)
    }, this);
    this.va = function() {
        a.removeEventListener("keypress",
            c, !1);
        a.removeEventListener("keydown", d, !1);
        a.removeEventListener("paste", e, !1);
        window.removeEventListener("mousedown", g, !1)
    };
    this.hb = function() {
        this.va();
        a.style.display = "block";
        a.addEventListener("keypress", c, !1);
        a.addEventListener("keydown", d, !1);
        a.addEventListener("paste", e, !1);
        window.addEventListener("mousedown", g, !1)
    };
    this.hb();
    this.Bj = function(f) {
        "\b" === f ? (this.text = this.text.slice(0, -1), this.update()) : "\r" !== f && (this.text += f, "\n" === f && (this.j = !0), this.update())
    };
    this.update = function() {
        var f =
            Date.now(),
            k = f - this.i;
        16 > k ? void 0 === this.g && (this.g = setTimeout(() => {
            this.g = void 0;
            this.i = Date.now();
            this.l()
        }, 16 - k)) : (void 0 !== this.g && (clearTimeout(this.g), this.g = void 0), this.i = f, this.l())
    };
    this.l = function() {
        a.value = this.text;
        this.j && (this.j = !1, a.scrollTop = 1E9)
    };
    this.h = function(f) {
        h.v && h.v.send("serial0-input", f)
    }
}

function jf(a, b) {
    this.element = a;
    if (window.Terminal) {
        var c = this.g = new window.Terminal;
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
jf.prototype.show = function() {
    this.g && this.g.open(this.element)
};

function kf(a, b) {
    this.v = b;
    this.g = void 0;
    this.h = [];
    this.url = a;
    this.i = Date.now() - 1E4;
    this.v.register("net0-send", function(c) {
        this.send(c)
    }, this)
}
q = kf.prototype;
q.Eh = function(a) {
    this.v && this.v.send("net0-receive", new Uint8Array(a.data))
};
q.Ch = function() {
    this.connect();
    setTimeout(this.connect.bind(this), 1E4)
};
q.Fh = function() {
    for (var a = 0; a < this.h.length; a++) this.send(this.h[a]);
    this.h = []
};
q.Dh = function() {};
q.va = function() {
    this.g && this.g.close()
};
q.connect = function() {
    if ("undefined" !== typeof WebSocket) {
        if (this.g) {
            var a = this.g.readyState;
            if (0 === a || 1 === a) return
        }
        this.i + 1E4 > Date.now() || (this.i = Date.now(), this.g = new WebSocket(this.url), this.g.binaryType = "arraybuffer", this.g.onopen = this.Fh.bind(this), this.g.onmessage = this.Eh.bind(this), this.g.onclose = this.Ch.bind(this), this.g.onerror = this.Dh.bind(this))
    }
};
q.send = function(a) {
    this.g && 1 === this.g.readyState ? this.g.send(a) : (this.h.push(a), 128 < this.h.length && (this.h = this.h.slice(-64)), this.connect())
};
(function() {
    function a(f, k, l) {
        function n() {
            const w = l || 0;
            setTimeout(() => {
                a(f, k, w + 1)
            }, 1E3 * ([1, 1, 2, 3, 5, 8, 13, 21][w] || 34))
        }
        var m = new XMLHttpRequest;
        m.open(k.method || "get", f, !0);
        m.responseType = k.zd ? "json" : "arraybuffer";
        if (k.headers)
            for (var t = Object.keys(k.headers), p = 0; p < t.length; p++) {
                var r = t[p];
                m.setRequestHeader(r, k.headers[r])
            }
        k.Kd && (t = k.Kd.start, m.setRequestHeader("Range", "bytes=" + t + "-" + (t + k.Kd.length - 1)), m.onreadystatechange = function() {
            200 === m.status && m.abort()
        });
        m.onload = function() {
            4 === m.readyState &&
                (200 !== m.status && 206 !== m.status ? (console.error("Loading the image " + f + " failed (status %d)", m.status), 500 <= m.status && 600 > m.status && n()) : m.response && k.done && k.done(m.response, m))
        };
        m.onerror = function(w) {
            console.error("Loading the image " + f + " failed", w);
            n()
        };
        k.progress && (m.onprogress = function(w) {
            k.progress(w)
        });
        m.send(null)
    }

    function b(f, k) {
        let l = require("fs");
        k.Kd ? l.open(f, "r", (n, m) => {
            if (n) throw n;
            n = k.Kd.length;
            var t = Buffer.allocUnsafe(n);
            l.read(m, t, 0, n, k.Kd.start, p => {
                if (p) throw p;
                k.done && k.done(new Uint8Array(t));
                l.close(m, r => {
                    if (r) throw r;
                })
            })
        }) : l.readFile(f, {
            encoding: k.zd ? "utf-8" : null
        }, function(n, m) {
            n ? console.log("Could not read file:", f, n) : (n = m, k.zd ? n = JSON.parse(n) : n = (new Uint8Array(n)).buffer, k.done(n))
        })
    }

    function c(f, k) {
        this.filename = f;
        this.g = 256;
        this.byteLength = k;
        this.h = new Map;
        this.i = new Set;
        this.onload = void 0
    }

    function d(f, k, l, n) {
        const m = f.match(/(.*)(\..*)/);
        m ? (this.j = m[1], this.l = m[2]) : (this.j = f, this.l = "");
        this.g = 256;
        this.h = new Map;
        this.i = new Set;
        this.byteLength = k;
        this.P = l;
        this.D = !!n;
        this.C = !!l;
        this.onload =
            void 0
    }

    function e(f) {
        this.file = f;
        this.byteLength = f.size;
        1073741824 < f.size && console.warn("SyncFileBuffer: Allocating buffer of " + (f.size >> 20) + " MB ...");
        this.buffer = new ArrayBuffer(f.size);
        this.onload = void 0
    }

    function g(f) {
        this.file = f;
        this.byteLength = f.size;
        this.g = 256;
        this.h = new Map;
        this.i = new Set;
        this.onload = void 0
    }
    "undefined" === typeof XMLHttpRequest ? tb = b : tb = a;
    ub = c;
    vb = d;
    wb = g;
    db = e;
    xb = function(f, k, l) {
        return String.fromCharCode(...(new Uint8Array(f.buffer, k >>> 0, l >>> 0)))
    };
    var h = "undefined" === typeof XMLHttpRequest ?
        function(f, k) {
            require("fs").stat(f, (l, n) => {
                l ? k(l) : k(null, n.size)
            })
        } : function(f, k) {
            tb(f, {
                done: (l, n) => {
                    l = n.getResponseHeader("Content-Range") || "";
                    (n = l.match(/\/(\d+)\s*$/)) ? k(null, +n[1]): k("`Range: bytes=...` header not supported (Got `" + l + "`)")
                },
                headers: {
                    Range: "bytes=0-0"
                }
            })
        };
    c.prototype.load = function() {
        void 0 !== this.byteLength ? this.onload && this.onload(Object.create(null)) : h(this.filename, (f, k) => {
            if (f) throw Error("Cannot use: " + this.filename + ". " + f);
            this.byteLength = k;
            this.onload && this.onload(Object.create(null))
        })
    };
    c.prototype.j = function(f, k) {
        var l = k / this.g;
        f /= this.g;
        for (var n = 0; n < l; n++)
            if (!this.h.get(f + n)) return;
        if (1 === l) return this.h.get(f);
        k = new Uint8Array(k);
        for (n = 0; n < l; n++) k.set(this.h.get(f + n), n * this.g);
        return k
    };
    c.prototype.get = function(f, k, l) {
        console.assert(f + k <= this.byteLength);
        console.assert(0 === f % this.g);
        console.assert(0 === k % this.g);
        console.assert(k);
        var n = this.j(f, k);
        n ? l(n) : tb(this.filename, {
            done: function(m) {
                m = new Uint8Array(m);
                this.l(f, k, m);
                l(m)
            }.bind(this),
            Kd: {
                start: f,
                length: k
            }
        })
    };
    c.prototype.set =
        function(f, k, l) {
            console.assert(f + k.byteLength <= this.byteLength);
            var n = k.length;
            console.assert(0 === f % this.g);
            console.assert(0 === n % this.g);
            console.assert(n);
            f /= this.g;
            n /= this.g;
            for (var m = 0; m < n; m++) {
                var t = this.h.get(f + m);
                void 0 === t && (t = new Uint8Array(this.g), this.h.set(f + m, t));
                var p = k.subarray(m * this.g, (m + 1) * this.g);
                t.set(p);
                console.assert(t.byteLength === p.length);
                this.i.add(f + m)
            }
            l()
        };
    c.prototype.l = function(f, k, l) {
        f /= this.g;
        k /= this.g;
        for (var n = 0; n < k; n++) {
            var m = this.h.get(f + n);
            m ? l.set(m, n * this.g) : this.C &&
                (m = new Uint8Array(this.g), m.set(l.subarray(n * this.g, (n + 1) * this.g)), this.h.set(f + n, m))
        }
    };
    c.prototype.Db = function(f) {
        f()
    };
    c.prototype.$ = function() {
        const f = [],
            k = [];
        for (let [l, n] of this.h) this.i.has(l) && k.push([l, n]);
        f[0] = k;
        return f
    };
    c.prototype.G = function(f) {
        f = f[0];
        this.h.clear();
        this.i.clear();
        for (let [k, l] of f) this.h.set(k, l), this.i.add(k)
    };
    d.prototype.load = function() {
        this.onload && this.onload(Object.create(null))
    };
    d.prototype.get = function(f, k, l) {
        console.assert(f + k <= this.byteLength);
        console.assert(0 ===
            f % this.g);
        console.assert(0 === k % this.g);
        console.assert(k);
        var n = this.o(f, k);
        if (n) l(n);
        else if (this.P) {
            const t = Math.floor(f / this.P),
                p = f - t * this.P,
                r = Math.ceil((p + k) / this.P),
                w = new Uint8Array(r * this.P);
            let x = 0;
            for (let C = 0; C < r; C++) {
                var m = (t + C) * this.P;
                n = this.D ? this.j + "-" + (t + C + "").padStart(8, "0") + this.l : this.j + "-" + m + "-" + (m + this.P) + this.l;
                (m = this.o(m, this.P)) ? (w.set(m, C * this.P), x++, x === r && l(w.subarray(p, p + k))) : tb(n, {
                    done: function(H) {
                        const K = C * this.P;
                        H = new Uint8Array(H);
                        this.B((t + C) * this.P, this.P | 0, H);
                        w.set(H,
                            K);
                        x++;
                        x === r && l(w.subarray(p, p + k))
                    }.bind(this)
                })
            }
        } else tb(this.j + "-" + f + "-" + (f + k) + this.l, {
            done: function(t) {
                t = new Uint8Array(t);
                this.B(f, k, t);
                l(t)
            }.bind(this)
        })
    };
    d.prototype.o = c.prototype.j;
    d.prototype.set = c.prototype.set;
    d.prototype.B = c.prototype.l;
    d.prototype.$ = c.prototype.$;
    d.prototype.G = c.prototype.G;
    e.prototype.load = function() {
        this.g(0)
    };
    e.prototype.g = function(f) {
        var k = new FileReader;
        k.onload = function(l) {
            l = new Uint8Array(l.target.result);
            (new Uint8Array(this.buffer, f)).set(l);
            this.g(f + 4194304)
        }.bind(this);
        f < this.byteLength ? k.readAsArrayBuffer(this.file.slice(f, Math.min(f + 4194304, this.byteLength))) : (this.file = void 0, this.onload && this.onload({
            buffer: this.buffer
        }))
    };
    e.prototype.get = function(f, k, l) {
        console.assert(f + k <= this.byteLength);
        l(new Uint8Array(this.buffer, f, k))
    };
    e.prototype.set = function(f, k, l) {
        console.assert(f + k.byteLength <= this.byteLength);
        (new Uint8Array(this.buffer, f, k.byteLength)).set(k);
        l()
    };
    e.prototype.Db = function(f) {
        f(this.buffer)
    };
    e.prototype.$ = function() {
        const f = [];
        f[0] = this.byteLength;
        f[1] = new Uint8Array(this.buffer);
        return f
    };
    e.prototype.G = function(f) {
        this.byteLength = f[0];
        this.buffer = f[1].slice().buffer
    };
    g.prototype.load = function() {
        this.onload && this.onload(Object.create(null))
    };
    g.prototype.get = function(f, k, l) {
        console.assert(0 === f % this.g);
        console.assert(0 === k % this.g);
        console.assert(k);
        var n = this.j(f, k);
        n ? l(n) : (n = new FileReader, n.onload = function(m) {
            m = new Uint8Array(m.target.result);
            this.l(f, k, m);
            l(m)
        }.bind(this), n.readAsArrayBuffer(this.file.slice(f, f + k)))
    };
    g.prototype.j = c.prototype.j;
    g.prototype.set = c.prototype.set;
    g.prototype.l = c.prototype.l;
    g.prototype.$ = c.prototype.$;
    g.prototype.Db = function(f) {
        f()
    };
    g.prototype.dg = function(f) {
        for (var k = [], l = Array.from(this.h.keys()).sort(function(r, w) {
                return r - w
            }), n = 0, m = 0; m < l.length; m++) {
            var t = l[m],
                p = this.h.get(t);
            t *= this.g;
            console.assert(t >= n);
            t !== n && (k.push(this.file.slice(n, t)), n = t);
            k.push(p);
            n += p.length
        }
        n !== this.file.size && k.push(this.file.slice(n));
        f = new File(k, f);
        console.assert(f.size === this.file.size);
        return f
    }
})();

function Xa(a) {
    console.log(a)
    this.ff = !1;
    var b = be();
    this.v = b[0];
    this.Fd = b[1];
    var c, d;
    const e = new WebAssembly.Table({
        element: "anyfunc",
        initial: 1924
    });
    b = {
        cpu_exception_hook: h => this.cpu_exception_hook && this.cpu_exception_hook(h),
        hlt_op: function() {
            var h = c;
            0 === (h.o() & 512) && h.v.send("cpu-event-halt");
            h.h[0] = 1;
            mb(h)
        },
        abort: function() {},
        microtick: nb,
        get_rand_int: function() {
            return Ab()
        },
        pic_acknowledge: function() {
            le(c)
        },
        io_port_read8: function(h) {
            h = c.A.ports[h];
            return h.od.call(h.oa)
        },
        io_port_read16: function(h) {
            h = c.A.ports[h];
            return h.Na.call(h.oa)
        },
        io_port_read32: function(h) {
            h = c.A.ports[h];
            return h.me.call(h.oa)
        },
        io_port_write8: function(h, f) {
            h = c.A.ports[h];
            h.af.call(h.oa, f)
        },
        io_port_write16: function(h, f) {
            h = c.A.ports[h];
            h.we.call(h.oa, f)
        },
        io_port_write32: function(h, f) {
            h = c.A.ports[h];
            h.Lc.call(h.oa, f)
        },
        mmap_read8: function(h) {
            return c.i[h >>> 17](h)
        },
        mmap_read16: function(h) {
            var f = c.i[h >>> 17];
            return f(h) | f(h + 1 | 0) << 8
        },
        mmap_read32: function(h) {
            return c.pa[h >>> 17](h)
        },
        mmap_write8: function(h, f) {
            c.l[h >>> 17](h, f)
        },
        mmap_write16: function(h,
            f) {
            var k = c.l[h >>> 17];
            k(h, f & 255);
            k(h + 1 | 0, f >> 8)
        },
        mmap_write32: function(h, f) {
            c.j[h >>> 17](h, f)
        },
        mmap_write64: function(h, f, k) {
            var l = c.j[h >>> 17];
            l(h, f);
            l(h + 4, k)
        },
        mmap_write128: function(h, f, k, l, n) {
            var m = c.j[h >>> 17];
            m(h, f);
            m(h + 4, k);
            m(h + 8, l);
            m(h + 12, n)
        },
        log_from_wasm: function(h, f) {
            xb(d, h, f)
        },
        console_log_from_wasm: function(h, f) {
            h = xb(d, h, f);
            console.error(h)
        },
        dbg_trace_from_wasm: function() {},
        codegen_finalize: (h, f, k, l, n) => {
            ke(c, h, f, k, l, n)
        },
        jit_clear_func: h => {
            c.xa.Kf.set(h + 1024, null)
        },
        jit_clear_all_funcs: () => {
            const h =
                c.xa.Kf;
            for (let f = 0; 900 > f; f++) h.set(1024 + f, null)
        },
        __indirect_function_table: e
    };
    let g = a.wasm_fn;
    g || (g = h => new Promise(f => {
        let k = "v86.wasm",
            l = "v86-fallback.wasm";
        if (a.wasm_path) {
            k = a.wasm_path;
            const n = k.lastIndexOf("/");
            l = (-1 === n ? "" : k.substr(0, n)) + "/" + l
        } else "undefined" === typeof window && "string" === typeof __dirname ? (k = __dirname + "/" + k, l = __dirname + "/" + l) : (k = "build/" + k, l = "build/" + l);
        tb(k, {
            done: async n => {
                try {
                    const {
                        instance: m
                    } = await WebAssembly.instantiate(n, h);
                    f(m.exports)
                } catch (m) {
                    tb(l, {
                        done: async t => {
                            ({
                                    instance: t
                                } =
                                await WebAssembly.instantiate(t, h));
                            f(t.exports)
                        }
                    })
                }
            },
            progress: n => {
                this.Fd.send("download-progress", {
                    de: 0,
                    ce: 1,
                    ee: k,
                    lengthComputable: n.lengthComputable,
                    total: n.total,
                    loaded: n.loaded
                })
            }
        })
    }));
    g({
        env: b
    }).then(h => {
        d = h.memory;
        h.rust_init();
        h = this.h = new ib(this.Fd, {
            exports: h,
            Kf: e
        });
        c = h.s;
        lf(this, h, a)
    })
}
async function lf(a, b, c) {
    function d(p, r) {
        switch (p) {
            case "hda":
                h.M = this.ac.hda = r;
                break;
            case "hdb":
                h.He = this.ac.hdb = r;
                break;
            case "cdrom":
                h.fa = this.ac.cdrom = r;
                break;
            case "fda":
                h.ma = this.ac.fda = r;
                break;
            case "fdb":
                h.Xf = this.ac.fdb = r;
                break;
            case "multiboot":
                h.ed = this.ac.multiboot = r.buffer;
                break;
            case "bzimage":
                h.ub = this.ac.bzimage = r.buffer;
                break;
            case "initrd":
                h.Xc = this.ac.initrd = r.buffer;
                break;
            case "bios":
                h.Bd = r.buffer;
                break;
            case "vga_bios":
                h.Lj = r.buffer;
                break;
            case "initial_state":
                h.Wc = r.buffer;
                break;
            case "fs9p_json":
                h.ag =
                    r
        }
    }

    function e(p, r) {
        if (r)
            if (r.get && r.set && r.load) f.push({
                name: p,
                bd: r
            });
            else {
                if ("bios" === p || "vga_bios" === p || "initial_state" === p || "multiboot" === p || "bzimage" === p || "initrd" === p) r.async = !1;
                r.buffer instanceof ArrayBuffer ? (r = new Bb(r.buffer), f.push({
                    name: p,
                    bd: r
                })) : "undefined" !== typeof File && r.buffer instanceof File ? (void 0 === r.async && (r.async = 268435456 <= r.buffer.size), r = r.async ? new wb(r.buffer) : new db(r.buffer), f.push({
                    name: p,
                    bd: r
                })) : r.url && (r.async ? (r = r.la ? new vb(r.url, r.size, r.P) : new ub(r.url, r.size),
                    f.push({
                        name: p,
                        bd: r
                    })) : f.push({
                    name: p,
                    url: r.url,
                    size: r.size
                }))
            }
    }
    async function g() {
        if (h.Cb && h.ag) {
            if (!h.Wc) {
                var p = h.Cb,
                    r = h.ag;
                if (3 !== r.version) throw "The filesystem JSON format has changed. Please update your fs2json (https://github.com/copy/fs2json) and recreate the filesystem JSON.";
                var w = r.fsroot;
                p.o = r.size;
                for (r = 0; r < w.length; r++) xe(p, w[r], 0)
            }
            if (c.bzimage_initrd_from_filesystem) {
                const {
                    dh: x,
                    Kh: C
                } = mf(h.Cb), [H, K] = await Promise.all([h.Cb.ne(C), h.Cb.ne(x)]);
                d.call(this, "initrd", new Bb(H.buffer));
                d.call(this,
                    "bzimage", new Bb(K.buffer))
            }
        } else console.assert(!c.bzimage_initrd_from_filesystem, "bzimage_initrd_from_filesystem: Requires a filesystem");
        this.Pd && this.Pd.show && this.Pd.show();
        this.v.send("cpu-init", h);
        h.Wc && (b.Md(h.Wc), h.Wc = void 0);
        c.autostart && this.v.send("cpu-run");
        this.Fd.send("emulator-loaded")
    }
    a.v.register("emulator-stopped", function() {
        this.ff = !1
    }, a);
    a.v.register("emulator-started", function() {
        this.ff = !0
    }, a);
    var h = {};
    a.ac = {
        fda: void 0,
        fdb: void 0,
        hda: void 0,
        hdb: void 0,
        cdrom: void 0
    };
    h.Ea = c.acpi;
    h.Nh = !0;
    h.rk = c.log_level;
    h.H = c.memory_size || 67108864;
    h.ea = c.vga_memory_size || 8388608;
    h.oc = c.boot_order || 531;
    h.zh = c.fastboot || !1;
    h.ma = void 0;
    h.Xf = void 0;
    h.re = c.uart1;
    h.se = c.uart2;
    h.te = c.uart3;
    h.Pc = c.cmdline;
    h.tf = c.preserve_mac_from_state_image;
    h.Gb = c.mac_address_translation;
    c.network_adapter ? a.o = c.network_adapter(a.v) : c.network_relay_url && (a.o = new kf(c.network_relay_url, a.v));
    h.xh = !0;
    c.disable_keyboard || (a.l = new Ze(a.v));
    c.disable_mouse || (a.j = new $e(a.v, c.screen_container));
    c.screen_container ? a.g =
        new Va(c.screen_container, a.v) : c.screen_dummy && (a.g = new nf(a.v));
    c.serial_container && (a.Pd = new hf(c.serial_container, a.v));
    c.serial_container_xtermjs && (a.Pd = new jf(c.serial_container_xtermjs, a.v));
    c.disable_speaker || (a.i = new af(a.v));
    var f = [];
    c.state && console.warn("Warning: Unknown option 'state'. Did you mean 'initial_state'?");
    for (var k = "bios vga_bios cdrom hda hdb fda fdb initial_state multiboot bzimage initrd".split(" "), l = 0; l < k.length; l++) e(k[l], c[k[l]]);
    if (c.filesystem) {
        k = c.filesystem.ah;
        l =
            c.filesystem.Ae;
        let p = new of;
        l && (p = new pf(p, l));
        h.Cb = a.Cb = new ve(p);
        if (k) {
            console.assert(l, "Filesystem: baseurl must be specified");
            if ("object" === typeof k) {
                var n = k.size;
                k = k.url
            }
            f.push({
                name: "fs9p_json",
                url: k,
                size: n,
                zd: !0
            })
        }
    }
    var m = f.length,
        t = function(p) {
            if (p === m) setTimeout(g.bind(this), 0);
            else {
                var r = f[p];
                r.bd ? (r.bd.onload = function() {
                    d.call(this, r.name, r.bd);
                    t(p + 1)
                }.bind(this), r.bd.load()) : tb(r.url, {
                    done: function(w) {
                        d.call(this, r.name, r.zd ? w : new Bb(w));
                        t(p + 1)
                    }.bind(this),
                    progress: function(w) {
                        200 ===
                            w.target.status ? a.Fd.send("download-progress", {
                                de: p,
                                ce: m,
                                ee: r.url,
                                lengthComputable: w.lengthComputable,
                                total: w.total || r.size,
                                loaded: w.loaded
                            }) : a.Fd.send("download-error", {
                                de: p,
                                ce: m,
                                ee: r.url,
                                request: w.target
                            })
                    },
                    zd: r.zd
                })
            }
        }.bind(a);
    t(0)
}

function mf(a) {
    const b = (We(a, "/") || []).map(e => "/" + e);
    a = (We(a, "/boot/") || []).map(e => "/boot/" + e);
    let c, d;
    for (let e of [].concat(b, a)) {
        const g = /old/i.test(e) || /fallback/i.test(e),
            h = /initrd/i.test(e) || /initramfs/i.test(e);
        !/vmlinuz/i.test(e) && !/bzimage/i.test(e) || d && g || (d = e);
        !h || c && g || (c = e)
    }
    c && d || (console.log("Failed to find bzimage or initrd in filesystem. Files:"), console.log(b.join(" ")), console.log(a.join(" ")));
    return {
        Kh: c,
        dh: d
    }
}
q = Xa.prototype;
q.We = async function() {
    this.v.send("cpu-run")
};
q.stop = async function() {
    this.v.send("cpu-stop")
};
q.va = function() {
    this.stop();
    this.h.va();
    this.l && this.l.va();
    this.o && this.o.va();
    this.j && this.j.va();
    this.g && this.g.va();
    this.Pd && this.Pd.va();
    this.i && this.i.va()
};
q.xf = function() {
    this.v.send("cpu-restart")
};

function J(a, b, c) {
    a.v.register(b, c, a)
}
q.Md = async function(a) {
    console.assert(1 === arguments.length);
    this.h.Md(a)
};
q.oe = async function() {
    console.assert(0 === arguments.length);
    return this.h.oe()
};
q.Zc = function() {
    return this.ff
};

function Za(a, b) {
    for (var c = 0; c < b.length; c++) a.v.send("keyboard-code", b[c])
}

function Wa(a, b) {
    for (var c = 0; c < b.length; c++) a.l.Cj(b[c])
}

function cb() {
    var a = document.body,
        b = a.requestPointerLock || a.mozRequestPointerLock || a.webkitRequestPointerLock;
    b && b.call(a)
}
q.jh = async function(a, b) {
    console.assert(2 === arguments.length);
    var c = this.Cb;
    if (c) {
        var d = a.split("/");
        d = d[d.length - 1];
        var e = Re(c, a).sf;
        if ("" !== d && -1 !== e) await Ge(c, d, e, b);
        else return Promise.reject(new qf)
    }
};
q.ne = async function(a) {
    console.assert(1 === arguments.length);
    var b = this.Cb;
    if (b) return (b = await b.ne(a)) ? b : Promise.reject(new qf)
};

function qf() {
    this.message = "File not found"
}
qf.prototype = Error.prototype;
"undefined" !== typeof window ? (window.V86Starter = Xa, window.V86 = Xa) : "undefined" !== typeof module && "undefined" !== typeof module.exports ? (module.exports.V86Starter = Xa, module.exports.V86 = Xa) : "function" === typeof importScripts && (self.V86Starter = Xa, self.V86 = Xa);

function nf(a) {
    var b, c, d, e, g;
    this.v = a;
    a.register("screen-set-mode", function(h) {
        console.log(h);
        this.Bf(h)
    }, this);
    a.register("screen-fill-buffer-end", function(h) {
        console.log(h);
        this.If(h[0])
    }, this);
    a.register("screen-put-char", function(h) {
        console.log(h);
        this.vf(h[0], h[1], h[2], h[3], h[4])
    }, this);
    a.register("screen-text-scroll", function(h) {
        console.log(h);
        console.log("scroll", h)
    }, this);
    a.register("screen-update-cursor", function(h) {
        console.log(h);
        this.wd(h[0], h[1])
    }, this);
    a.register("screen-update-cursor-scanline", function(h) {
        console.log(h);
        this.xd(h[0], h[1])
    }, this);
    a.register("screen-set-size-text",
        function(h) {
        console.log(h);
            this.rd(h[0], h[1])
        }, this);
    a.register("screen-set-size-graphical", function(h) {
        console.log(h);
        this.qd(h[0], h[1])
    }, this);
    this.vf = function(h, f, k, l, n) {
        h < g && f < e && (h = 3 * (h * e + f), d[h] = k, d[h + 1] = l, d[h + 2] = n)
    };
    this.va = function() {};
    this.Bf = function() {};
    this.Qf = function() {};
    this.rd = function(h, f) {
        if (h !== e || f !== g) d = new Int32Array(h * f * 3), e = h, g = f
    };
    this.qd = function() {};
    this.Cf = function() {};
    this.xd = function() {};
    this.wd = function(h, f) {
        if (h !== b || f !== c) b = h, c = f
    };
    this.If = function() {}
};
const Ya = {
    Ej: function(a) {
        return Ya.uj(a) + Ya.tj(a)
    },
    uj: function(a) {
        let b = "";
        var c = "COMPILE COMPILE_SKIPPED_NO_NEW_ENTRY_POINTS COMPILE_SUCCESS COMPILE_WRONG_ADDRESS_SPACE COMPILE_CUT_OFF_AT_END_OF_PAGE COMPILE_WITH_LOOP_SAFETY COMPILE_PAGE COMPILE_PAGE/COMPILE_SUCCESS COMPILE_PAGE_SKIPPED_NO_NEW_ENTRY_POINTS COMPILE_BASIC_BLOCK COMPILE_DUPLICATED_BASIC_BLOCK COMPILE_WASM_BLOCK COMPILE_WASM_LOOP COMPILE_DISPATCHER COMPILE_ENTRY_POINT COMPILE_WASM_TOTAL_BYTES COMPILE_WASM_TOTAL_BYTES/COMPILE_PAGE JIT_CACHE_OVERRIDE JIT_CACHE_OVERRIDE_DIFFERENT_STATE_FLAGS RUN_INTERPRETED RUN_INTERPRETED_PENDING RUN_INTERPRETED_NEAR_END_OF_PAGE RUN_INTERPRETED_DIFFERENT_STATE RUN_INTERPRETED_MISSED_COMPILED_ENTRY_RUN_INTERPRETED RUN_INTERPRETED_MISSED_COMPILED_ENTRY_LOOKUP RUN_INTERPRETED_STEPS RUN_FROM_CACHE RUN_FROM_CACHE_STEPS RUN_FROM_CACHE_STEPS/RUN_FROM_CACHE RUN_FROM_CACHE_STEPS/RUN_INTERPRETED_STEPS DIRECT_EXIT INDIRECT_JUMP INDIRECT_JUMP_NO_ENTRY NORMAL_PAGE_CHANGE NORMAL_FALLTHRU NORMAL_FALLTHRU_WITH_TARGET_BLOCK NORMAL_BRANCH NORMAL_BRANCH_WITH_TARGET_BLOCK CONDITIONAL_JUMP CONDITIONAL_JUMP_PAGE_CHANGE CONDITIONAL_JUMP_EXIT CONDITIONAL_JUMP_FALLTHRU CONDITIONAL_JUMP_FALLTHRU_WITH_TARGET_BLOCK CONDITIONAL_JUMP_BRANCH CONDITIONAL_JUMP_BRANCH_WITH_TARGET_BLOCK DISPATCHER_SMALL DISPATCHER_LARGE LOOP LOOP_SAFETY CONDITION_OPTIMISED CONDITION_UNOPTIMISED FAILED_PAGE_CHANGE SAFE_READ_FAST SAFE_READ_SLOW_PAGE_CROSSED SAFE_READ_SLOW_NOT_VALID SAFE_READ_SLOW_NOT_USER SAFE_READ_SLOW_IN_MAPPED_RANGE SAFE_WRITE_FAST SAFE_WRITE_SLOW_PAGE_CROSSED SAFE_WRITE_SLOW_NOT_VALID SAFE_WRITE_SLOW_NOT_USER SAFE_WRITE_SLOW_IN_MAPPED_RANGE SAFE_WRITE_SLOW_READ_ONLY SAFE_WRITE_SLOW_HAS_CODE SAFE_READ_WRITE_FAST SAFE_READ_WRITE_SLOW_PAGE_CROSSED SAFE_READ_WRITE_SLOW_NOT_VALID SAFE_READ_WRITE_SLOW_NOT_USER SAFE_READ_WRITE_SLOW_IN_MAPPED_RANGE SAFE_READ_WRITE_SLOW_READ_ONLY SAFE_READ_WRITE_SLOW_HAS_CODE PAGE_FAULT TLB_MISS DO_RUN DO_MANY_CYCLES CYCLE_INTERNAL INVALIDATE_ALL_MODULES_NO_FREE_WASM_INDICES INVALIDATE_MODULE_WRITTEN_WHILE_COMPILED INVALIDATE_MODULE_UNUSED_AFTER_OVERWRITE INVALIDATE_MODULE_DIRTY_PAGE INVALIDATE_PAGE_HAD_CODE INVALIDATE_PAGE_HAD_ENTRY_POINTS DIRTY_PAGE_DID_NOT_HAVE_CODE RUN_FROM_CACHE_EXIT_SAME_PAGE RUN_FROM_CACHE_EXIT_NEAR_END_OF_PAGE RUN_FROM_CACHE_EXIT_DIFFERENT_PAGE CLEAR_TLB FULL_CLEAR_TLB TLB_FULL TLB_GLOBAL_FULL MODRM_SIMPLE_REG MODRM_SIMPLE_REG_WITH_OFFSET MODRM_SIMPLE_CONST_OFFSET MODRM_COMPLEX SEG_OFFSET_OPTIMISED SEG_OFFSET_NOT_OPTIMISED".split(" "),
            d = 0;
        const e = {};
        for (let h = 0; h < c.length; h++) {
            const f = c[h];
            var g = void 0;
            if (f.includes("/")) {
                d++;
                const [k, l] = f.split("/");
                g = e[k] / e[l]
            } else g = e[f] = a.xa.exports.profiler_stat_get(h - d), g = 1E8 <= g ? Math.round(g / 1E6) + "m" : 1E5 <= g ? Math.round(g / 1E3) + "k" : g;
            b += f + "=" + g + "\n"
        }
        b += "\n";
        c = a.xa.exports.get_valid_tlb_entries_count();
        d = a.xa.exports.get_valid_global_tlb_entries_count();
        b = b + ("TLB_ENTRIES=" + c + " (" + d + " global, " + (c - d) + " non-global)\nWASM_TABLE_FREE=") + (a.xa.exports.jit_get_wasm_table_index_free_list_count() + "\n");
        b += "JIT_CACHE_SIZE=" + a.xa.exports.jit_get_cache_size() + "\n";
        b += "FLAT_SEGMENTS=" + a.xa.exports.has_flat_segmentation() + "\n";
        b += "do_many_cycles avg: " + (a.bk / a.ak || 0) + "\n";
        b += "wasm memory size: " + (a.Pa.buffer.byteLength >> 20) + "m\n";
        b = b + "Config:\nMAX_PAGES=" + (a.xa.exports.get_config(0) + "\n");
        b += "JIT_USE_LOOP_SAFETY=" + a.xa.exports.get_config(1) + "\n";
        return b += "MAX_EXTRA_BASIC_BLOCKS=" + a.xa.exports.get_config(2) + "\n"
    },
    tj: function(a) {
        return [Ya.ke(a, !1, !1, !1, !1), Ya.ke(a, !0, !1, !1, !1), Ya.ke(a, !1, !0, !1, !1), Ya.ke(a,
            !1, !1, !0, !1), Ya.ke(a, !1, !1, !1, !0)].join("\n\n")
    },
    ke: function(a, b, c, d, e) {
        let g = "";
        var h = [],
            f = b ? "compiled" : c ? "jit exit" : d ? "unguarded register" : e ? "wasm size" : "executed";
        for (let n = 0; 256 > n; n++)
            for (let m = 0; 8 > m; m++)
                for (let t of [!1, !0]) {
                    var k = a.xa.exports.get_opstats_buffer(b, c, d, e, n, !1, t, m);
                    h.push({
                        Qe: n,
                        count: k,
                        gg: t,
                        Zf: m
                    });
                    k = a.xa.exports.get_opstats_buffer(b, c, d, e, n, !0, t, m);
                    h.push({
                        Qe: 3840 | n,
                        count: k,
                        gg: t,
                        Zf: m
                    })
                }
        a = 0;
        b = new Set([38, 46, 54, 62, 100, 101, 102, 103, 240, 242, 243]);
        for (let {
                count: n,
                Qe: m
            }
            of h) b.has(m) ||
            (a += n);
        if (0 === a) return "";
        c = new Uint32Array(256);
        b = new Uint32Array(256);
        for (let {
                Qe: n,
                count: m
            }
            of h) 3840 == (n & 65280) ? b[n & 255] += m : c[n & 255] += m;
        g = g + "------------------\nTotal: " + (a + "\n");
        const l = 1E7 < a ? 1E3 : 1;
        d = Math.max.apply(Math, h.map(({
            count: n
        }) => Math.round(n / l)));
        d = String(d).length;
        g += `Instruction counts ${f} (in ${l}):\n`;
        for (e = 0; 256 > e; e++) g += e.toString(16).padStart(2, "0") + ":" + yb(Math.round(c[e] / l), d), g = 15 == e % 16 ? g + "\n" : g + " ";
        g = g + "\n" + `Instruction counts ${f} (0f, in ${l}):\n`;
        for (f = 0; 256 > f; f++) g += (f &
            255).toString(16).padStart(2, "0") + ":" + yb(Math.round(b[f] / l), d), g = 15 == f % 16 ? g + "\n" : g + " ";
        g += "\n";
        h = h.filter(({
            count: n
        }) => n).sort(({
            count: n
        }, {
            count: m
        }) => m - n);
        for (let {
                Qe: n,
                gg: m,
                Zf: t,
                count: p
            }
            of h.slice(0, 200)) g += n.toString(16) + "_" + t + (m ? "_m" : "_r") + ":" + (p / a * 100).toFixed(2) + " ";
        return g + "\n"
    }
};
"undefined" !== typeof module && "undefined" !== typeof module.exports && (module.exports.print_stats = Ya);

function of() {
    this.h = new Map
}
of.prototype.read = async function(a, b, c) {
    return (a = this.h.get(a)) ? a.subarray(b, b + c) : null
};
of.prototype.cache = async function(a, b) {
    this.h.set(a, b)
};
of.prototype.g = function(a) {
    this.h.delete(a)
};

function pf(a, b) {
    this.h = a;
    this.Ae = b
}

function rf(a, b) {
    return new Promise(c => {
        tb(a.Ae + b, {
            done: async d => {
                d = new Uint8Array(d);
                await a.cache(b, d);
                c(d)
            }
        })
    })
}
pf.prototype.read = async function(a, b, c) {
    const d = await this.h.read(a, b, c);
    return d ? d : (await rf(this, a)).subarray(b, b + c)
};
pf.prototype.cache = async function(a, b) {
    return await this.h.cache(a, b)
};
pf.prototype.g = function(a) {
    this.h.g(a)
};
"undefined" !== typeof window ? (window.MemoryFileStorage = of, window.ServerFileStorageWrapper = pf) : "undefined" !== typeof module && "undefined" !== typeof module.exports ? (module.exports.MemoryFileStorage = of, module.exports.ServerFileStorageWrapper = pf) : "function" === typeof importScripts && (self.MemoryFileStorage = of, self.ServerFileStorageWrapper = pf);
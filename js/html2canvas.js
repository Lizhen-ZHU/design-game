/*!
 * html2canvas 1.0.0-rc.1 <https://html2canvas.hertzen.com>
 * Copyright (c) 2019 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
! function(A, e) {
  "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.html2canvas = e() : A.html2canvas = e()
}(window, function() {
  return function(A) {
      var e = {};
      function t(r) {
          if (e[r]) return e[r].exports;
          var n = e[r] = {
              i: r,
              l: !1,
              exports: {}
          };
          return A[r].call(n.exports, n, n.exports, t), n.l = !0, n.exports
      }
      return t.m = A, t.c = e, t.d = function(A, e, r) {
          t.o(A, e) || Object.defineProperty(A, e, {
              enumerable: !0,
              get: r
          })
      }, t.r = function(A) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(A, Symbol.toStringTag, {
              value: "Module"
          }), Object.defineProperty(A, "__esModule", {
              value: !0
          })
      }, t.t = function(A, e) {
          if (1 & e && (A = t(A)), 8 & e) return A;
          if (4 & e && "object" == typeof A && A && A.__esModule) return A;
          var r = Object.create(null);
          if (t.r(r), Object.defineProperty(r, "default", {
                  enumerable: !0,
                  value: A
              }), 2 & e && "string" != typeof A)
              for (var n in A) t.d(r, n, function(e) {
                  return A[e]
              }.bind(null, n));
          return r
      }, t.n = function(A) {
          var e = A && A.__esModule ? function() {
              return A.default
          } : function() {
              return A
          };
          return t.d(e, "a", e), e
      }, t.o = function(A, e) {
          return Object.prototype.hasOwnProperty.call(A, e)
      }, t.p = "", t(t.s = 5)
  }([function(A, e, t) {
      "use strict";
      Object.defineProperty(e, "__esModule", {
          value: !0
      });
      var r = t(1);
      Object.defineProperty(e, "toCodePoints", {
          enumerable: !0,
          get: function() {
              return r.toCodePoints
          }
      }), Object.defineProperty(e, "fromCodePoint", {
          enumerable: !0,
          get: function() {
              return r.fromCodePoint
          }
      });
      var n = t(2);
      Object.defineProperty(e, "LineBreaker", {
          enumerable: !0,
          get: function() {
              return n.LineBreaker
          }
      })
  }, function(A, e, t) {
      "use strict";
      Object.defineProperty(e, "__esModule", {
          value: !0
      }), e.toCodePoints = function(A) {
          for (var e = [], t = 0, r = A.length; t < r;) {
              var n = A.charCodeAt(t++);
              if (n >= 55296 && n <= 56319 && t < r) {
                  var B = A.charCodeAt(t++);
                  56320 == (64512 & B) ? e.push(((1023 & n) << 10) + (1023 & B) + 65536) : (e.push(n), t--)
              } else e.push(n)
          }
          return e
      }, e.fromCodePoint = function() {
          if (String.fromCodePoint) return String.fromCodePoint.apply(String, arguments);
          var A = arguments.length;
          if (!A) return "";
          for (var e = [], t = -1, r = ""; ++t < A;) {
              var n = arguments.length <= t ? void 0 : arguments[t];
              n <= 65535 ? e.push(n) : (n -= 65536, e.push(55296 + (n >> 10), n % 1024 + 56320)), (t + 1 === A || e.length > 16384) && (r += String.fromCharCode.apply(String, e), e.length = 0)
          }
          return r
      };
      for (var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), B = 0; B < r.length; B++) n[r.charCodeAt(B)] = B;
      e.decode = function(A) {
          var e = .75 * A.length,
              t = A.length,
              r = void 0,
              B = 0,
              s = void 0,
              o = void 0,
              a = void 0,
              i = void 0;
          "=" === A[A.length - 1] && (e--, "=" === A[A.length - 2] && e--);
          var c = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array && void 0 !== Uint8Array.prototype.slice ? new ArrayBuffer(e) : new Array(e),
              Q = Array.isArray(c) ? c : new Uint8Array(c);
          for (r = 0; r < t; r += 4) s = n[A.charCodeAt(r)], o = n[A.charCodeAt(r + 1)], a = n[A.charCodeAt(r + 2)], i = n[A.charCodeAt(r + 3)], Q[B++] = s << 2 | o >> 4, Q[B++] = (15 & o) << 4 | a >> 2, Q[B++] = (3 & a) << 6 | 63 & i;
          return c
      }, e.polyUint16Array = function(A) {
          for (var e = A.length, t = [], r = 0; r < e; r += 2) t.push(A[r + 1] << 8 | A[r]);
          return t
      }, e.polyUint32Array = function(A) {
          for (var e = A.length, t = [], r = 0; r < e; r += 4) t.push(A[r + 3] << 24 | A[r + 2] << 16 | A[r + 1] << 8 | A[r]);
          return t
      }
  }, function(A, e, t) {
      "use strict";
      Object.defineProperty(e, "__esModule", {
          value: !0
      }), e.LineBreaker = e.inlineBreakOpportunities = e.lineBreakAtIndex = e.codePointsToCharacterClasses = e.UnicodeTrie = e.BREAK_ALLOWED = e.BREAK_NOT_ALLOWED = e.BREAK_MANDATORY = e.classes = e.LETTER_NUMBER_MODIFIER = void 0;
      var r = function() {
              function A(A, e) {
                  for (var t = 0; t < e.length; t++) {
                      var r = e[t];
                      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                  }
              }
              return function(e, t, r) {
                  return t && A(e.prototype, t), r && A(e, r), e
              }
          }(),
          n = function(A, e) {
              if (Array.isArray(A)) return A;
              if (Symbol.iterator in Object(A)) return function(A, e) {
                  var t = [],
                      r = !0,
                      n = !1,
                      B = void 0;
                  try {
                      for (var s, o = A[Symbol.iterator](); !(r = (s = o.next()).done) && (t.push(s.value), !e || t.length !== e); r = !0);
                  } catch (A) {
                      n = !0, B = A
                  } finally {
                      try {
                          !r && o.return && o.return()
                      } finally {
                          if (n) throw B
                      }
                  }
                  return t
              }(A, e);
              throw new TypeError("Invalid attempt to destructure non-iterable instance")
          },
          B = t(3),
          s = function(A) {
              return A && A.__esModule ? A : {
                  default: A
              }
          }(t(4)),
          o = t(1),
          a = e.LETTER_NUMBER_MODIFIER = 50,
          i = 10,
          c = 13,
          Q = 15,
          l = 17,
          w = 18,
          u = 19,
          U = 20,
          g = 21,
          F = 22,
          C = 24,
          h = 25,
          d = 26,
          H = 27,
          f = 28,
          E = 30,
          p = 32,
          K = 33,
          m = 34,
          b = 35,
          N = 37,
          y = 38,
          v = 39,
          I = 40,
          D = 42,
          M = (e.classes = {
              BK: 1,
              CR: 2,
              LF: 3,
              CM: 4,
              NL: 5,
              SG: 6,
              WJ: 7,
              ZW: 8,
              GL: 9,
              SP: i,
              ZWJ: 11,
              B2: 12,
              BA: c,
              BB: 14,
              HY: Q,
              CB: 16,
              CL: l,
              CP: w,
              EX: u,
              IN: U,
              NS: g,
              OP: F,
              QU: 23,
              IS: C,
              NU: h,
              PO: d,
              PR: H,
              SY: f,
              AI: 29,
              AL: E,
              CJ: 31,
              EB: p,
              EM: K,
              H2: m,
              H3: b,
              HL: 36,
              ID: N,
              JL: y,
              JV: v,
              JT: I,
              RI: 41,
              SA: D,
              XX: 43
          }, e.BREAK_MANDATORY = "!"),
          T = e.BREAK_NOT_ALLOWED = "×",
          S = e.BREAK_ALLOWED = "÷",
          X = e.UnicodeTrie = (0, B.createTrieFromBase64)(s.default),
          z = [E, 36],
          L = [1, 2, 3, 5],
          O = [i, 8],
          x = [H, d],
          V = L.concat(O),
          k = [y, v, I, m, b],
          J = [Q, c],
          R = e.codePointsToCharacterClasses = function(A) {
              var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "strict",
                  t = [],
                  r = [],
                  n = [];
              return A.forEach(function(A, B) {
                  var s = X.get(A);
                  if (s > a ? (n.push(!0), s -= a) : n.push(!1), -1 !== ["normal", "auto", "loose"].indexOf(e) && -1 !== [8208, 8211, 12316, 12448].indexOf(A)) return r.push(B), t.push(16);
                  if (4 === s || 11 === s) {
                      if (0 === B) return r.push(B), t.push(E);
                      var o = t[B - 1];
                      return -1 === V.indexOf(o) ? (r.push(r[B - 1]), t.push(o)) : (r.push(B), t.push(E))
                  }
                  return r.push(B), 31 === s ? t.push("strict" === e ? g : N) : s === D ? t.push(E) : 29 === s ? t.push(E) : 43 === s ? A >= 131072 && A <= 196605 || A >= 196608 && A <= 262141 ? t.push(N) : t.push(E) : void t.push(s)
              }), [r, t, n]
          },
          _ = function(A, e, t, r) {
              var n = r[t];
              if (Array.isArray(A) ? -1 !== A.indexOf(n) : A === n)
                  for (var B = t; B <= r.length;) {
                      var s = r[++B];
                      if (s === e) return !0;
                      if (s !== i) break
                  }
              if (n === i)
                  for (var o = t; o > 0;) {
                      var a = r[--o];
                      if (Array.isArray(A) ? -1 !== A.indexOf(a) : A === a)
                          for (var c = t; c <= r.length;) {
                              var Q = r[++c];
                              if (Q === e) return !0;
                              if (Q !== i) break
                          }
                      if (a !== i) break
                  }
              return !1
          },
          P = function(A, e) {
              for (var t = A; t >= 0;) {
                  var r = e[t];
                  if (r !== i) return r;
                  t--
              }
              return 0
          },
          G = function(A, e, t, r, n) {
              if (0 === t[r]) return T;
              var B = r - 1;
              if (Array.isArray(n) && !0 === n[B]) return T;
              var s = B - 1,
                  o = B + 1,
                  a = e[B],
                  E = s >= 0 ? e[s] : 0,
                  D = e[o];
              if (2 === a && 3 === D) return T;
              if (-1 !== L.indexOf(a)) return M;
              if (-1 !== L.indexOf(D)) return T;
              if (-1 !== O.indexOf(D)) return T;
              if (8 === P(B, e)) return S;
              if (11 === X.get(A[B]) && (D === N || D === p || D === K)) return T;
              if (7 === a || 7 === D) return T;
              if (9 === a) return T;
              if (-1 === [i, c, Q].indexOf(a) && 9 === D) return T;
              if (-1 !== [l, w, u, C, f].indexOf(D)) return T;
              if (P(B, e) === F) return T;
              if (_(23, F, B, e)) return T;
              if (_([l, w], g, B, e)) return T;
              if (_(12, 12, B, e)) return T;
              if (a === i) return S;
              if (23 === a || 23 === D) return T;
              if (16 === D || 16 === a) return S;
              if (-1 !== [c, Q, g].indexOf(D) || 14 === a) return T;
              if (36 === E && -1 !== J.indexOf(a)) return T;
              if (a === f && 36 === D) return T;
              if (D === U && -1 !== z.concat(U, u, h, N, p, K).indexOf(a)) return T;
              if (-1 !== z.indexOf(D) && a === h || -1 !== z.indexOf(a) && D === h) return T;
              if (a === H && -1 !== [N, p, K].indexOf(D) || -1 !== [N, p, K].indexOf(a) && D === d) return T;
              if (-1 !== z.indexOf(a) && -1 !== x.indexOf(D) || -1 !== x.indexOf(a) && -1 !== z.indexOf(D)) return T;
              if (-1 !== [H, d].indexOf(a) && (D === h || -1 !== [F, Q].indexOf(D) && e[o + 1] === h) || -1 !== [F, Q].indexOf(a) && D === h || a === h && -1 !== [h, f, C].indexOf(D)) return T;
              if (-1 !== [h, f, C, l, w].indexOf(D))
                  for (var V = B; V >= 0;) {
                      var R = e[V];
                      if (R === h) return T;
                      if (-1 === [f, C].indexOf(R)) break;
                      V--
                  }
              if (-1 !== [H, d].indexOf(D))
                  for (var G = -1 !== [l, w].indexOf(a) ? s : B; G >= 0;) {
                      var W = e[G];
                      if (W === h) return T;
                      if (-1 === [f, C].indexOf(W)) break;
                      G--
                  }
              if (y === a && -1 !== [y, v, m, b].indexOf(D) || -1 !== [v, m].indexOf(a) && -1 !== [v, I].indexOf(D) || -1 !== [I, b].indexOf(a) && D === I) return T;
              if (-1 !== k.indexOf(a) && -1 !== [U, d].indexOf(D) || -1 !== k.indexOf(D) && a === H) return T;
              if (-1 !== z.indexOf(a) && -1 !== z.indexOf(D)) return T;
              if (a === C && -1 !== z.indexOf(D)) return T;
              if (-1 !== z.concat(h).indexOf(a) && D === F || -1 !== z.concat(h).indexOf(D) && a === w) return T;
              if (41 === a && 41 === D) {
                  for (var Y = t[B], q = 1; Y > 0 && 41 === e[--Y];) q++;
                  if (q % 2 != 0) return T
              }
              return a === p && D === K ? T : S
          },
          W = (e.lineBreakAtIndex = function(A, e) {
              if (0 === e) return T;
              if (e >= A.length) return M;
              var t = R(A),
                  r = n(t, 2),
                  B = r[0],
                  s = r[1];
              return G(A, s, B, e)
          }, function(A, e) {
              e || (e = {
                  lineBreak: "normal",
                  wordBreak: "normal"
              });
              var t = R(A, e.lineBreak),
                  r = n(t, 3),
                  B = r[0],
                  s = r[1],
                  o = r[2];
              return "break-all" !== e.wordBreak && "break-word" !== e.wordBreak || (s = s.map(function(A) {
                  return -1 !== [h, E, D].indexOf(A) ? N : A
              })), [B, s, "keep-all" === e.wordBreak ? o.map(function(e, t) {
                  return e && A[t] >= 19968 && A[t] <= 40959
              }) : null]
          }),
          Y = (e.inlineBreakOpportunities = function(A, e) {
              var t = (0, o.toCodePoints)(A),
                  r = T,
                  B = W(t, e),
                  s = n(B, 3),
                  a = s[0],
                  i = s[1],
                  c = s[2];
              return t.forEach(function(A, e) {
                  r += (0, o.fromCodePoint)(A) + (e >= t.length - 1 ? M : G(t, i, a, e + 1, c))
              }), r
          }, function() {
              function A(e, t, r, n) {
                  ! function(A, e) {
                      if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
                  }(this, A), this._codePoints = e, this.required = t === M, this.start = r, this.end = n
              }
              return r(A, [{
                  key: "slice",
                  value: function() {
                      return o.fromCodePoint.apply(void 0, function(A) {
                          if (Array.isArray(A)) {
                              for (var e = 0, t = Array(A.length); e < A.length; e++) t[e] = A[e];
                              return t
                          }
                          return Array.from(A)
                      }(this._codePoints.slice(this.start, this.end)))
                  }
              }]), A
          }());
      e.LineBreaker = function(A, e) {
          var t = (0, o.toCodePoints)(A),
              r = W(t, e),
              B = n(r, 3),
              s = B[0],
              a = B[1],
              i = B[2],
              c = t.length,
              Q = 0,
              l = 0;
          return {
              next: function() {
                  if (l >= c) return {
                      done: !0
                  };
                  for (var A = T; l < c && (A = G(t, a, s, ++l, i)) === T;);
                  if (A !== T || l === c) {
                      var e = new Y(t, A, Q, l);
                      return Q = l, {
                          value: e,
                          done: !1
                      }
                  }
                  return {
                      done: !0
                  }
              }
          }
      }
  }, function(A, e, t) {
      "use strict";
      Object.defineProperty(e, "__esModule", {
          value: !0
      }), e.Trie = e.createTrieFromBase64 = e.UTRIE2_INDEX_2_MASK = e.UTRIE2_INDEX_2_BLOCK_LENGTH = e.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = e.UTRIE2_INDEX_1_OFFSET = e.UTRIE2_UTF8_2B_INDEX_2_LENGTH = e.UTRIE2_UTF8_2B_INDEX_2_OFFSET = e.UTRIE2_INDEX_2_BMP_LENGTH = e.UTRIE2_LSCP_INDEX_2_LENGTH = e.UTRIE2_DATA_MASK = e.UTRIE2_DATA_BLOCK_LENGTH = e.UTRIE2_LSCP_INDEX_2_OFFSET = e.UTRIE2_SHIFT_1_2 = e.UTRIE2_INDEX_SHIFT = e.UTRIE2_SHIFT_1 = e.UTRIE2_SHIFT_2 = void 0;
      var r = function() {
              function A(A, e) {
                  for (var t = 0; t < e.length; t++) {
                      var r = e[t];
                      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
                  }
              }
              return function(e, t, r) {
                  return t && A(e.prototype, t), r && A(e, r), e
              }
          }(),
          n = t(1),
          B = e.UTRIE2_SHIFT_2 = 5,
          s = e.UTRIE2_SHIFT_1 = 11,
          o = e.UTRIE2_INDEX_SHIFT = 2,
          a = e.UTRIE2_SHIFT_1_2 = s - B,
          i = e.UTRIE2_LSCP_INDEX_2_OFFSET = 65536 >> B,
          c = e.UTRIE2_DATA_BLOCK_LENGTH = 1 << B,
          Q = e.UTRIE2_DATA_MASK = c - 1,
          l = e.UTRIE2_LSCP_INDEX_2_LENGTH = 1024 >> B,
          w = e.UTRIE2_INDEX_2_BMP_LENGTH = i + l,
          u = e.UTRIE2_UTF8_2B_INDEX_2_OFFSET = w,
          U = e.UTRIE2_UTF8_2B_INDEX_2_LENGTH = 32,
          g = e.UTRIE2_INDEX_1_OFFSET = u + U,
          F = e.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 65536 >> s,
          C = e.UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << a,
          h = e.UTRIE2_INDEX_2_MASK = C - 1,
          d = (e.createTrieFromBase64 = function(A) {
              var e = (0, n.decode)(A),
                  t = Array.isArray(e) ? (0, n.polyUint32Array)(e) : new Uint32Array(e),
                  r = Array.isArray(e) ? (0, n.polyUint16Array)(e) : new Uint16Array(e),
                  B = r.slice(12, t[4] / 2),
                  s = 2 === t[5] ? r.slice((24 + t[4]) / 2) : t.slice(Math.ceil((24 + t[4]) / 4));
              return new d(t[0], t[1], t[2], t[3], B, s)
          }, e.Trie = function() {
              function A(e, t, r, n, B, s) {
                  ! function(A, e) {
                      if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
                  }(this, A), this.initialValue = e, this.errorValue = t, this.highStart = r, this.highValueIndex = n, this.index = B, this.data = s
              }
              return r(A, [{
                  key: "get",
                  value: function(A) {
                      var e = void 0;
                      if (A >= 0) {
                          if (A < 55296 || A > 56319 && A <= 65535) return e = ((e = this.index[A >> B]) << o) + (A & Q), this.data[e];
                          if (A <= 65535) return e = ((e = this.index[i + (A - 55296 >> B)]) << o) + (A & Q), this.data[e];
                          if (A < this.highStart) return e = g - F + (A >> s), e = this.index[e], e += A >> B & h, e = ((e = this.index[e]) << o) + (A & Q), this.data[e];
                          if (A <= 1114111) return this.data[this.highValueIndex]
                      }
                      return this.errorValue
                  }
              }]), A
          }())
  }, function(A, e, t) {
      "use strict";
      A.exports = "KwAAAAAAAAAACA4AIDoAAPAfAAACAAAAAAAIABAAGABAAEgAUABYAF4AZgBeAGYAYABoAHAAeABeAGYAfACEAIAAiACQAJgAoACoAK0AtQC9AMUAXgBmAF4AZgBeAGYAzQDVAF4AZgDRANkA3gDmAOwA9AD8AAQBDAEUARoBIgGAAIgAJwEvATcBPwFFAU0BTAFUAVwBZAFsAXMBewGDATAAiwGTAZsBogGkAawBtAG8AcIBygHSAdoB4AHoAfAB+AH+AQYCDgIWAv4BHgImAi4CNgI+AkUCTQJTAlsCYwJrAnECeQKBAk0CiQKRApkCoQKoArACuALAAsQCzAIwANQC3ALkAjAA7AL0AvwCAQMJAxADGAMwACADJgMuAzYDPgOAAEYDSgNSA1IDUgNaA1oDYANiA2IDgACAAGoDgAByA3YDfgOAAIQDgACKA5IDmgOAAIAAogOqA4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAK8DtwOAAIAAvwPHA88D1wPfAyAD5wPsA/QD/AOAAIAABAQMBBIEgAAWBB4EJgQuBDMEIAM7BEEEXgBJBCADUQRZBGEEaQQwADAAcQQ+AXkEgQSJBJEEgACYBIAAoASoBK8EtwQwAL8ExQSAAIAAgACAAIAAgACgAM0EXgBeAF4AXgBeAF4AXgBeANUEXgDZBOEEXgDpBPEE+QQBBQkFEQUZBSEFKQUxBTUFPQVFBUwFVAVcBV4AYwVeAGsFcwV7BYMFiwWSBV4AmgWgBacFXgBeAF4AXgBeAKsFXgCyBbEFugW7BcIFwgXIBcIFwgXQBdQF3AXkBesF8wX7BQMGCwYTBhsGIwYrBjMGOwZeAD8GRwZNBl4AVAZbBl4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAGMGXgBqBnEGXgBeAF4AXgBeAF4AXgBeAF4AXgB5BoAG4wSGBo4GkwaAAIADHgR5AF4AXgBeAJsGgABGA4AAowarBrMGswagALsGwwbLBjAA0wbaBtoG3QbaBtoG2gbaBtoG2gblBusG8wb7BgMHCwcTBxsHCwcjBysHMAc1BzUHOgdCB9oGSgdSB1oHYAfaBloHaAfaBlIH2gbaBtoG2gbaBtoG2gbaBjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHbQdeAF4ANQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQd1B30HNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B4MH2gaKB68EgACAAIAAgACAAIAAgACAAI8HlwdeAJ8HpweAAIAArwe3B14AXgC/B8UHygcwANAH2AfgB4AA6AfwBz4B+AcACFwBCAgPCBcIogEYAR8IJwiAAC8INwg/CCADRwhPCFcIXwhnCEoDGgSAAIAAgABvCHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIhAiLCI4IMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAANQc1BzUHNQc1BzUHNQc1BzUHNQc1B54INQc1B6II2gaqCLIIugiAAIAAvgjGCIAAgACAAIAAgACAAIAAgACAAIAAywiHAYAA0wiAANkI3QjlCO0I9Aj8CIAAgACAAAIJCgkSCRoJIgknCTYHLwk3CZYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiAAIAAAAFAAXgBeAGAAcABeAHwAQACQAKAArQC9AJ4AXgBeAE0A3gBRAN4A7AD8AMwBGgEAAKcBNwEFAUwBXAF4QkhCmEKnArcCgAHHAsABz4LAAcABwAHAAd+C6ABoAG+C/4LAAcABwAHAAc+DF4MAAcAB54M3gweDV4Nng3eDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEeDqABVg6WDqABoQ6gAaABoAHXDvcONw/3DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DncPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB7cPPwlGCU4JMACAAIAAgABWCV4JYQmAAGkJcAl4CXwJgAkwADAAMAAwAIgJgACLCZMJgACZCZ8JowmrCYAAswkwAF4AXgB8AIAAuwkABMMJyQmAAM4JgADVCTAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAqwYWBNkIMAAwADAAMADdCeAJ6AnuCR4E9gkwAP4JBQoNCjAAMACAABUK0wiAAB0KJAosCjQKgAAwADwKQwqAAEsKvQmdCVMKWwowADAAgACAALcEMACAAGMKgABrCjAAMAAwADAAMAAwADAAMAAwADAAMAAeBDAAMAAwADAAMAAwADAAMAAwADAAMAAwAIkEPQFzCnoKiQSCCooKkAqJBJgKoAqkCokEGAGsCrQKvArBCjAAMADJCtEKFQHZCuEK/gHpCvEKMAAwADAAMACAAIwE+QowAIAAPwEBCzAAMAAwADAAMACAAAkLEQswAIAAPwEZCyELgAAOCCkLMAAxCzkLMAAwADAAMAAwADAAXgBeAEELMAAwADAAMAAwADAAMAAwAEkLTQtVC4AAXAtkC4AAiQkwADAAMAAwADAAMAAwADAAbAtxC3kLgAuFC4sLMAAwAJMLlwufCzAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAApwswADAAMACAAIAAgACvC4AAgACAAIAAgACAALcLMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAvwuAAMcLgACAAIAAgACAAIAAyguAAIAAgACAAIAA0QswADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAANkLgACAAIAA4AswADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACJCR4E6AswADAAhwHwC4AA+AsADAgMEAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMACAAIAAGAwdDCUMMAAwAC0MNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQw1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHPQwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADUHNQc1BzUHNQc1BzUHNQc2BzAAMAA5DDUHNQc1BzUHNQc1BzUHNQc1BzUHNQdFDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAATQxSDFoMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAF4AXgBeAF4AXgBeAF4AYgxeAGoMXgBxDHkMfwxeAIUMXgBeAI0MMAAwADAAMAAwAF4AXgCVDJ0MMAAwADAAMABeAF4ApQxeAKsMswy7DF4Awgy9DMoMXgBeAF4AXgBeAF4AXgBeAF4AXgDRDNkMeQBqCeAM3Ax8AOYM7Az0DPgMXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgCgAAANoAAHDQ4NFg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAeDSYNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAC4NMABeAF4ANg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAD4NRg1ODVYNXg1mDTAAbQ0wADAAMAAwADAAMAAwADAA2gbaBtoG2gbaBtoG2gbaBnUNeg3CBYANwgWFDdoGjA3aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gaUDZwNpA2oDdoG2gawDbcNvw3HDdoG2gbPDdYN3A3fDeYN2gbsDfMN2gbaBvoN/g3aBgYODg7aBl4AXgBeABYOXgBeACUG2gYeDl4AJA5eACwO2w3aBtoGMQ45DtoG2gbaBtoGQQ7aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B1EO2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQdZDjUHNQc1BzUHNQc1B2EONQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHaA41BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B3AO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B2EO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBkkOeA6gAKAAoAAwADAAMAAwAKAAoACgAKAAoACgAKAAgA4wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAD//wQABAAEAAQABAAEAAQABAAEAA0AAwABAAEAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAKABMAFwAeABsAGgAeABcAFgASAB4AGwAYAA8AGAAcAEsASwBLAEsASwBLAEsASwBLAEsAGAAYAB4AHgAeABMAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAFgAbABIAHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYADQARAB4ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkAFgAaABsAGwAbAB4AHQAdAB4ATwAXAB4ADQAeAB4AGgAbAE8ATwAOAFAAHQAdAB0ATwBPABcATwBPAE8AFgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwArAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAAQABAANAA0ASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAUAArACsAKwArACsAKwArACsABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAGgAaAFAAUABQAFAAUABMAB4AGwBQAB4AKwArACsABAAEAAQAKwBQAFAAUABQAFAAUAArACsAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUAArAFAAUAArACsABAArAAQABAAEAAQABAArACsAKwArAAQABAArACsABAAEAAQAKwArACsABAArACsAKwArACsAKwArAFAAUABQAFAAKwBQACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwAEAAQAUABQAFAABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQAKwArAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeABsAKwArACsAKwArACsAKwBQAAQABAAEAAQABAAEACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAKwArACsAKwArACsAKwArAAQABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwAEAFAAKwBQAFAAUABQAFAAUAArACsAKwBQAFAAUAArAFAAUABQAFAAKwArACsAUABQACsAUAArAFAAUAArACsAKwBQAFAAKwArACsAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQAKwArACsABAAEAAQAKwAEAAQABAAEACsAKwBQACsAKwArACsAKwArAAQAKwArACsAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAB4AHgAeAB4AHgAeABsAHgArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArAFAAUABQACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAB4AUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArACsAKwArACsAKwArAFAAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwArAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAKwBcAFwAKwBcACsAKwBcACsAKwArACsAKwArAFwAXABcAFwAKwBcAFwAXABcAFwAXABcACsAXABcAFwAKwBcACsAXAArACsAXABcACsAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgArACoAKgBcACsAKwBcAFwAXABcAFwAKwBcACsAKgAqACoAKgAqACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAFwAXABcAFwAUAAOAA4ADgAOAB4ADgAOAAkADgAOAA0ACQATABMAEwATABMACQAeABMAHgAeAB4ABAAEAB4AHgAeAB4AHgAeAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUAANAAQAHgAEAB4ABAAWABEAFgARAAQABABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAAQABAAEAAQABAANAAQABABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsADQANAB4AHgAeAB4AHgAeAAQAHgAeAB4AHgAeAB4AKwAeAB4ADgAOAA0ADgAeAB4AHgAeAB4ACQAJACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgAeAB4AHgBcAFwAXABcAFwAXAAqACoAKgAqAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAKgAqACoAKgAqACoAKgBcAFwAXAAqACoAKgAqAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAXAAqAEsASwBLAEsASwBLAEsASwBLAEsAKgAqACoAKgAqACoAUABQAFAAUABQAFAAKwBQACsAKwArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQACsAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwAEAAQABAAeAA0AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAEQArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAADQANAA0AUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAA0ADQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoADQANABUAXAANAB4ADQAbAFwAKgArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAB4AHgATABMADQANAA4AHgATABMAHgAEAAQABAAJACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAUABQAFAAUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwAeACsAKwArABMAEwBLAEsASwBLAEsASwBLAEsASwBLAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwBcAFwAXABcAFwAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcACsAKwArACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwAeAB4AXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsABABLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKgAqACoAKgAqACoAKgBcACoAKgAqACoAKgAqACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAUABQAFAAUABQAFAAUAArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4ADQANAA0ADQAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAHgAeAB4AHgBQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwANAA0ADQANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwBQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsABAAEAAQAHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAABABQAFAAUABQAAQABAAEAFAAUAAEAAQABAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAKwBQACsAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAKwArAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAKwAeAB4AHgAeAB4AHgAeAA4AHgArAA0ADQANAA0ADQANAA0ACQANAA0ADQAIAAQACwAEAAQADQAJAA0ADQAMAB0AHQAeABcAFwAWABcAFwAXABYAFwAdAB0AHgAeABQAFAAUAA0AAQABAAQABAAEAAQABAAJABoAGgAaABoAGgAaABoAGgAeABcAFwAdABUAFQAeAB4AHgAeAB4AHgAYABYAEQAVABUAFQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgANAB4ADQANAA0ADQAeAA0ADQANAAcAHgAeAB4AHgArAAQABAAEAAQABAAEAAQABAAEAAQAUABQACsAKwBPAFAAUABQAFAAUAAeAB4AHgAWABEATwBQAE8ATwBPAE8AUABQAFAAUABQAB4AHgAeABYAEQArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGgAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgBQABoAHgAdAB4AUAAeABoAHgAeAB4AHgAeAB4AHgAeAB4ATwAeAFAAGwAeAB4AUABQAFAAUABQAB4AHgAeAB0AHQAeAFAAHgBQAB4AUAAeAFAATwBQAFAAHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AUABQAFAAUABPAE8AUABQAFAAUABQAE8AUABQAE8AUABPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAE8ATwBPAE8ATwBPAE8ATwBPAE8AUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAATwAeAB4AKwArACsAKwAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB0AHQAeAB4AHgAdAB0AHgAeAB0AHgAeAB4AHQAeAB0AGwAbAB4AHQAeAB4AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB0AHgAdAB4AHQAdAB0AHQAdAB0AHgAdAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAdAB0AHQAdAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAlACUAHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB0AHQAeAB4AHgAeAB0AHQAdAB4AHgAdAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB0AHQAeAB4AHQAeAB4AHgAeAB0AHQAeAB4AHgAeACUAJQAdAB0AJQAeACUAJQAlACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHQAdAB0AHgAdACUAHQAdAB4AHQAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHQAdAB0AHQAlAB4AJQAlACUAHQAlACUAHQAdAB0AJQAlAB0AHQAlAB0AHQAlACUAJQAeAB0AHgAeAB4AHgAdAB0AJQAdAB0AHQAdAB0AHQAlACUAJQAlACUAHQAlACUAIAAlAB0AHQAlACUAJQAlACUAJQAlACUAHgAeAB4AJQAlACAAIAAgACAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeABcAFwAXABcAFwAXAB4AEwATACUAHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACUAJQBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwArACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAE8ATwBPAE8ATwBPAE8ATwAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeACsAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUAArACsAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQBQAFAAUABQACsAKwArACsAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAABAAEAAQAKwAEAAQAKwArACsAKwArAAQABAAEAAQAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsABAAEAAQAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsADQANAA0ADQANAA0ADQANAB4AKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAUABQAFAAUABQAA0ADQANAA0ADQANABQAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwANAA0ADQANAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAeAAQABAAEAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLACsADQArAB4AKwArAAQABAAEAAQAUABQAB4AUAArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwAEAAQABAAEAAQABAAEAAQABAAOAA0ADQATABMAHgAeAB4ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0AUABQAFAAUAAEAAQAKwArAAQADQANAB4AUAArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXABcAA0ADQANACoASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUAArACsAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANACsADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEcARwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwAeAAQABAANAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAEAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUAArACsAUAArACsAUABQACsAKwBQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAeAB4ADQANAA0ADQAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAArAAQABAArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAEAAQABAAEAAQABAAEACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAFgAWAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAKwBQACsAKwArACsAKwArAFAAKwArACsAKwBQACsAUAArAFAAKwBQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQACsAUAArAFAAKwBQACsAUABQACsAUAArACsAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAUABQAFAAUAArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUAArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAlACUAJQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeACUAJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeACUAJQAlACUAJQAeACUAJQAlACUAJQAgACAAIAAlACUAIAAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIQAhACEAIQAhACUAJQAgACAAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAIAAlACUAJQAlACAAJQAgACAAIAAgACAAIAAgACAAIAAlACUAJQAgACUAJQAlACUAIAAgACAAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeACUAHgAlAB4AJQAlACUAJQAlACAAJQAlACUAJQAeACUAHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAIAAgACAAIAAgAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFwAXABcAFQAVABUAHgAeAB4AHgAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAlACAAIAAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsA"
  }, function(A, e, t) {
      "use strict";
      t.r(e);
      var r = {
          VECTOR: 0,
          BEZIER_CURVE: 1,
          CIRCLE: 2
      };
      function n(A, e) {
          for (var t = 0; t < e.length; t++) {
              var r = e[t];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
          }
      }
      var B = /^#([a-f0-9]{3})$/i,
          s = function(A) {
              var e = A.match(B);
              return !!e && [parseInt(e[1][0] + e[1][0], 16), parseInt(e[1][1] + e[1][1], 16), parseInt(e[1][2] + e[1][2], 16), null]
          },
          o = /^#([a-f0-9]{6})$/i,
          a = function(A) {
              var e = A.match(o);
              return !!e && [parseInt(e[1].substring(0, 2), 16), parseInt(e[1].substring(2, 4), 16), parseInt(e[1].substring(4, 6), 16), null]
          },
          i = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
          c = function(A) {
              var e = A.match(i);
              return !!e && [Number(e[1]), Number(e[2]), Number(e[3]), null]
          },
          Q = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/,
          l = function(A) {
              var e = A.match(Q);
              return !!(e && e.length > 4) && [Number(e[1]), Number(e[2]), Number(e[3]), Number(e[4])]
          },
          w = function(A) {
              return [Math.min(A[0], 255), Math.min(A[1], 255), Math.min(A[2], 255), A.length > 3 ? A[3] : null]
          },
          u = function(A) {
              return g[A.toLowerCase()] || !1
          },
          U = function() {
              function A(e) {
                  ! function(A, e) {
                      if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
                  }(this, A);
                  var t = function(A, e) {
                          return function(A) {
                              if (Array.isArray(A)) return A
                          }(A) || function(A, e) {
                              var t = [],
                                  r = !0,
                                  n = !1,
                                  B = void 0;
                              try {
                                  for (var s, o = A[Symbol.iterator](); !(r = (s = o.next()).done) && (t.push(s.value), !e || t.length !== e); r = !0);
                              } catch (A) {
                                  n = !0, B = A
                              } finally {
                                  try {
                                      r || null == o.return || o.return()
                                  } finally {
                                      if (n) throw B
                                  }
                              }
                              return t
                          }(A, e) || function() {
                              throw new TypeError("Invalid attempt to destructure non-iterable instance")
                          }()
                      }(Array.isArray(e) ? w(e) : s(e) || c(e) || l(e) || u(e) || a(e) || [0, 0, 0, null], 4),
                      r = t[0],
                      n = t[1],
                      B = t[2],
                      o = t[3];
                  this.r = r, this.g = n, this.b = B, this.a = o
              }
              return function(A, e, t) {
                  e && n(A.prototype, e)
              }(A, [{
                  key: "isTransparent",
                  value: function() {
                      return 0 === this.a
                  }
              }, {
                  key: "toString",
                  value: function() {
                      return null !== this.a && 1 !== this.a ? "rgba(".concat(this.r, ",").concat(this.g, ",").concat(this.b, ",").concat(this.a, ")") : "rgb(".concat(this.r, ",").concat(this.g, ",").concat(this.b, ")")
                  }
              }]), A
          }(),
          g = {
              transparent: [0, 0, 0, 0],
              aliceblue: [240, 248, 255, null],
              antiquewhite: [250, 235, 215, null],
              aqua: [0, 255, 255, null],
              aquamarine: [127, 255, 212, null],
              azure: [240, 255, 255, null],
              beige: [245, 245, 220, null],
              bisque: [255, 228, 196, null],
              black: [0, 0, 0, null],
              blanchedalmond: [255, 235, 205, null],
              blue: [0, 0, 255, null],
              blueviolet: [138, 43, 226, null],
              brown: [165, 42, 42, null],
              burlywood: [222, 184, 135, null],
              cadetblue: [95, 158, 160, null],
              chartreuse: [127, 255, 0, null],
              chocolate: [210, 105, 30, null],
              coral: [255, 127, 80, null],
              cornflowerblue: [100, 149, 237, null],
              cornsilk: [255, 248, 220, null],
              crimson: [220, 20, 60, null],
              cyan: [0, 255, 255, null],
              darkblue: [0, 0, 139, null],
              darkcyan: [0, 139, 139, null],
              darkgoldenrod: [184, 134, 11, null],
              darkgray: [169, 169, 169, null],
              darkgreen: [0, 100, 0, null],
              darkgrey: [169, 169, 169, null],
              darkkhaki: [189, 183, 107, null],
              darkmagenta: [139, 0, 139, null],
              darkolivegreen: [85, 107, 47, null],
              darkorange: [255, 140, 0, null],
              darkorchid: [153, 50, 204, null],
              darkred: [139, 0, 0, null],
              darksalmon: [233, 150, 122, null],
              darkseagreen: [143, 188, 143, null],
              darkslateblue: [72, 61, 139, null],
              darkslategray: [47, 79, 79, null],
              darkslategrey: [47, 79, 79, null],
              darkturquoise: [0, 206, 209, null],
              darkviolet: [148, 0, 211, null],
              deeppink: [255, 20, 147, null],
              deepskyblue: [0, 191, 255, null],
              dimgray: [105, 105, 105, null],
              dimgrey: [105, 105, 105, null],
              dodgerblue: [30, 144, 255, null],
              firebrick: [178, 34, 34, null],
              floralwhite: [255, 250, 240, null],
              forestgreen: [34, 139, 34, null],
              fuchsia: [255, 0, 255, null],
              gainsboro: [220, 220, 220, null],
              ghostwhite: [248, 248, 255, null],
              gold: [255, 215, 0, null],
              goldenrod: [218, 165, 32, null],
              gray: [128, 128, 128, null],
              green: [0, 128, 0, null],
              greenyellow: [173, 255, 47, null],
              grey: [128, 128, 128, null],
              honeydew: [240, 255, 240, null],
              hotpink: [255, 105, 180, null],
              indianred: [205, 92, 92, null],
              indigo: [75, 0, 130, null],
              ivory: [255, 255, 240, null],
              khaki: [240, 230, 140, null],
              lavender: [230, 230, 250, null],
              lavenderblush: [255, 240, 245, null],
              lawngreen: [124, 252, 0, null],
              lemonchiffon: [255, 250, 205, null],
              lightblue: [173, 216, 230, null],
              lightcoral: [240, 128, 128, null],
              lightcyan: [224, 255, 255, null],
              lightgoldenrodyellow: [250, 250, 210, null],
              lightgray: [211, 211, 211, null],
              lightgreen: [144, 238, 144, null],
              lightgrey: [211, 211, 211, null],
              lightpink: [255, 182, 193, null],
              lightsalmon: [255, 160, 122, null],
              lightseagreen: [32, 178, 170, null],
              lightskyblue: [135, 206, 250, null],
              lightslategray: [119, 136, 153, null],
              lightslategrey: [119, 136, 153, null],
              lightsteelblue: [176, 196, 222, null],
              lightyellow: [255, 255, 224, null],
              lime: [0, 255, 0, null],
              limegreen: [50, 205, 50, null],
              linen: [250, 240, 230, null],
              magenta: [255, 0, 255, null],
              maroon: [128, 0, 0, null],
              mediumaquamarine: [102, 205, 170, null],
              mediumblue: [0, 0, 205, null],
              mediumorchid: [186, 85, 211, null],
              mediumpurple: [147, 112, 219, null],
              mediumseagreen: [60, 179, 113, null],
              mediumslateblue: [123, 104, 238, null],
              mediumspringgreen: [0, 250, 154, null],
              mediumturquoise: [72, 209, 204, null],
              mediumvioletred: [199, 21, 133, null],
              midnightblue: [25, 25, 112, null],
              mintcream: [245, 255, 250, null],
              mistyrose: [255, 228, 225, null],
              moccasin: [255, 228, 181, null],
              navajowhite: [255, 222, 173, null],
              navy: [0, 0, 128, null],
              oldlace: [253, 245, 230, null],
              olive: [128, 128, 0, null],
              olivedrab: [107, 142, 35, null],
              orange: [255, 165, 0, null],
              orangered: [255, 69, 0, null],
              orchid: [218, 112, 214, null],
              palegoldenrod: [238, 232, 170, null],
              palegreen: [152, 251, 152, null],
              paleturquoise: [175, 238, 238, null],
              palevioletred: [219, 112, 147, null],
              papayawhip: [255, 239, 213, null],
              peachpuff: [255, 218, 185, null],
              peru: [205, 133, 63, null],
              pink: [255, 192, 203, null],
              plum: [221, 160, 221, null],
              powderblue: [176, 224, 230, null],
              purple: [128, 0, 128, null],
              rebeccapurple: [102, 51, 153, null],
              red: [255, 0, 0, null],
              rosybrown: [188, 143, 143, null],
              royalblue: [65, 105, 225, null],
              saddlebrown: [139, 69, 19, null],
              salmon: [250, 128, 114, null],
              sandybrown: [244, 164, 96, null],
              seagreen: [46, 139, 87, null],
              seashell: [255, 245, 238, null],
              sienna: [160, 82, 45, null],
              silver: [192, 192, 192, null],
              skyblue: [135, 206, 235, null],
              slateblue: [106, 90, 205, null],
              slategray: [112, 128, 144, null],
              slategrey: [112, 128, 144, null],
              snow: [255, 250, 250, null],
              springgreen: [0, 255, 127, null],
              steelblue: [70, 130, 180, null],
              tan: [210, 180, 140, null],
              teal: [0, 128, 128, null],
              thistle: [216, 191, 216, null],
              tomato: [255, 99, 71, null],
              turquoise: [64, 224, 208, null],
              violet: [238, 130, 238, null],
              wheat: [245, 222, 179, null],
              white: [255, 255, 255, null],
              whitesmoke: [245, 245, 245, null],
              yellow: [255, 255, 0, null],
              yellowgreen: [154, 205, 50, null]
          },
          F = new U([0, 0, 0, 0]),
          C = function(A) {
              switch (A) {
                  case "underline":
                      return 1;
                  case "overline":
                      return 2;
                  case "line-through":
                      return 3
              }
              return 4
          },
          h = function(A) {
              var e = function(A) {
                  return "none" === A ? null : A.split(" ").map(C)
              }(A.textDecorationLine ? A.textDecorationLine : A.textDecoration);
              return null === e ? null : {
                  textDecorationLine: e,
                  textDecorationColor: A.textDecorationColor ? new U(A.textDecorationColor) : null,
                  textDecorationStyle: function(A) {
                      switch (A) {
                          case "double":
                              return 1;
                          case "dotted":
                              return 2;
                          case "dashed":
                              return 3;
                          case "wavy":
                              return 4
                      }
                      return 0
                  }(A.textDecorationStyle)
              }
          };
      function d(A, e) {
          for (var t = 0; t < e.length; t++) {
              var r = e[t];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
          }
      }
      var H = function(A, e) {
              var t = Math.max.apply(null, A.colorStops.map(function(A) {
                      return A.stop
                  })),
                  r = 1 / Math.max(1, t);
              A.colorStops.forEach(function(A) {
                  e.addColorStop(Math.floor(Math.max(0, r * A.stop)), A.color.toString())
              })
          },
          f = function() {
              function A(e) {
                  ! function(A, e) {
                      if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
                  }(this, A), this.canvas = e || document.createElement("canvas")
              }
              return function(A, e, t) {
                  e && d(A.prototype, e)
              }(A, [{
                  key: "render",
                  value: function(A) {
                      this.ctx = this.canvas.getContext("2d"), this.options = A, this.canvas.width = Math.floor(A.width * A.scale), this.canvas.height = Math.floor(A.height * A.scale), this.canvas.style.width = "".concat(A.width, "px"), this.canvas.style.height = "".concat(A.height, "px"), this.ctx.scale(this.options.scale, this.options.scale), this.ctx.translate(-A.x, -A.y), this.ctx.textBaseline = "bottom", A.logger.log("Canvas renderer initialized (".concat(A.width, "x").concat(A.height, " at ").concat(A.x, ",").concat(A.y, ") with scale ").concat(this.options.scale))
                  }
              }, {
                  key: "clip",
                  value: function(A, e) {
                      var t = this;
                      A.length && (this.ctx.save(), A.forEach(function(A) {
                          t.path(A), t.ctx.clip()
                      })), e(), A.length && this.ctx.restore()
                  }
              }, {
                  key: "drawImage",
                  value: function(A, e, t) {
                      this.ctx.drawImage(A, e.left, e.top, e.width, e.height, t.left, t.top, t.width, t.height)
                  }
              }, {
                  key: "drawShape",
                  value: function(A, e) {
                      this.path(A), this.ctx.fillStyle = e.toString(), this.ctx.fill()
                  }
              }, {
                  key: "fill",
                  value: function(A) {
                      this.ctx.fillStyle = A.toString(), this.ctx.fill()
                  }
              }, {
                  key: "getTarget",
                  value: function() {
                      return this.canvas.getContext("2d").setTransform(1, 0, 0, 1, 0, 0), Promise.resolve(this.canvas)
                  }
              }, {
                  key: "path",
                  value: function(A) {
                      var e = this;
                      this.ctx.beginPath(), Array.isArray(A) ? A.forEach(function(A, t) {
                          var n = A.type === r.VECTOR ? A : A.start;
                          0 === t ? e.ctx.moveTo(n.x, n.y) : e.ctx.lineTo(n.x, n.y), A.type === r.BEZIER_CURVE && e.ctx.bezierCurveTo(A.startControl.x, A.startControl.y, A.endControl.x, A.endControl.y, A.end.x, A.end.y)
                      }) : this.ctx.arc(A.x + A.radius, A.y + A.radius, A.radius, 0, 2 * Math.PI, !0), this.ctx.closePath()
                  }
              }, {
                  key: "rectangle",
                  value: function(A, e, t, r, n) {
                      this.ctx.fillStyle = n.toString(), this.ctx.fillRect(A, e, t, r)
                  }
              }, {
                  key: "renderLinearGradient",
                  value: function(A, e) {
                      var t = this.ctx.createLinearGradient(A.left + e.direction.x1, A.top + e.direction.y1, A.left + e.direction.x0, A.top + e.direction.y0);
                      H(e, t), this.ctx.fillStyle = t, this.ctx.fillRect(A.left, A.top, A.width, A.height)
                  }
              }, {
                  key: "renderRadialGradient",
                  value: function(A, e) {
                      var t = this,
                          r = A.left + e.center.x,
                          n = A.top + e.center.y,
                          B = this.ctx.createRadialGradient(r, n, 0, r, n, e.radius.x);
                      if (B)
                          if (H(e, B), this.ctx.fillStyle = B, e.radius.x !== e.radius.y) {
                              var s = A.left + .5 * A.width,
                                  o = A.top + .5 * A.height,
                                  a = e.radius.y / e.radius.x,
                                  i = 1 / a;
                              this.transform(s, o, [1, 0, 0, a, 0, 0], function() {
                                  return t.ctx.fillRect(A.left, i * (A.top - o) + o, A.width, A.height * i)
                              })
                          } else this.ctx.fillRect(A.left, A.top, A.width, A.height)
                  }
              }, {
                  key: "renderRepeat",
                  value: function(A, e, t, r, n) {
                      this.path(A), this.ctx.fillStyle = this.ctx.createPattern(this.resizeImage(e, t), "repeat"), this.ctx.translate(r, n), this.ctx.fill(), this.ctx.translate(-r, -n)
                  }
              }, {
                  key: "renderTextNode",
                  value: function(A, e, t, r, n) {
                      var B = this;
                      this.ctx.font = [t.fontStyle, t.fontVariant, t.fontWeight, t.fontSize, t.fontFamily].join(" "), A.forEach(function(A) {
                          if (B.ctx.fillStyle = e.toString(), n && A.text.trim().length ? (n.slice(0).reverse().forEach(function(e) {
                                  B.ctx.shadowColor = e.color.toString(), B.ctx.shadowOffsetX = e.offsetX * B.options.scale, B.ctx.shadowOffsetY = e.offsetY * B.options.scale, B.ctx.shadowBlur = e.blur, B.ctx.fillText(A.text, A.bounds.left, A.bounds.top + A.bounds.height)
                              }), B.ctx.shadowColor = "", B.ctx.shadowOffsetX = 0, B.ctx.shadowOffsetY = 0, B.ctx.shadowBlur = 0) : B.ctx.fillText(A.text, A.bounds.left, A.bounds.top + A.bounds.height), null !== r) {
                              var s = r.textDecorationColor || e;
                              r.textDecorationLine.forEach(function(e) {
                                  switch (e) {
                                      case 1:
                                          var r = B.options.fontMetrics.getMetrics(t).baseline;
                                          B.rectangle(A.bounds.left, Math.round(A.bounds.top + r), A.bounds.width, 1, s);
                                          break;
                                      case 2:
                                          B.rectangle(A.bounds.left, Math.round(A.bounds.top), A.bounds.width, 1, s);
                                          break;
                                      case 3:
                                          var n = B.options.fontMetrics.getMetrics(t).middle;
                                          B.rectangle(A.bounds.left, Math.ceil(A.bounds.top + n), A.bounds.width, 1, s)
                                  }
                              })
                          }
                      })
                  }
              }, {
                  key: "resizeImage",
                  value: function(A, e) {
                      if (A.width === e.width && A.height === e.height) return A;
                      var t = this.canvas.ownerDocument.createElement("canvas");
                      return t.width = e.width, t.height = e.height, t.getContext("2d").drawImage(A, 0, 0, A.width, A.height, 0, 0, e.width, e.height), t
                  }
              }, {
                  key: "setOpacity",
                  value: function(A) {
                      this.ctx.globalAlpha = A
                  }
              }, {
                  key: "transform",
                  value: function(A, e, t, r) {
                      this.ctx.save(), this.ctx.translate(A, e), this.ctx.transform(t[0], t[1], t[2], t[3], t[4], t[5]), this.ctx.translate(-A, -e), r(), this.ctx.restore()
                  }
              }]), A
          }();
      function E(A, e) {
          for (var t = 0; t < e.length; t++) {
              var r = e[t];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
          }
      }
      var p = function() {
              function A(e, t, r) {
                  ! function(A, e) {
                      if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
                  }(this, A), this.enabled = "undefined" != typeof window && e, this.start = r || Date.now(), this.id = t
              }
              return function(A, e, t) {
                  e && E(A.prototype, e)
              }(A, [{
                  key: "child",
                  value: function(e) {
                      return new A(this.enabled, e, this.start)
                  }
              }, {
                  key: "log",
                  value: function() {
                      if (this.enabled && window.console && window.console.log) {
                          for (var A = arguments.length, e = new Array(A), t = 0; t < A; t++) e[t] = arguments[t];
                          Function.prototype.bind.call(window.console.log, window.console).apply(window.console, [Date.now() - this.start + "ms", this.id ? "html2canvas (".concat(this.id, "):") : "html2canvas:"].concat([].slice.call(e, 0)))
                      }
                  }
              }, {
                  key: "error",
                  value: function() {
                      if (this.enabled && window.console && window.console.error) {
                          for (var A = arguments.length, e = new Array(A), t = 0; t < A; t++) e[t] = arguments[t];
                          Function.prototype.bind.call(window.console.error, window.console).apply(window.console, [Date.now() - this.start + "ms", this.id ? "html2canvas (".concat(this.id, "):") : "html2canvas:"].concat([].slice.call(e, 0)))
                      }
                  }
              }]), A
          }(),
          K = function(A, e) {
              return 0 != (A & e)
          },
          m = function(A, e) {
              return Math.sqrt(A * A + e * e)
          },
          b = function(A, e) {
              for (var t = A.length - 1; t >= 0; t--) {
                  var r = A.item(t);
                  "content" !== r && e.style.setProperty(r, A.getPropertyValue(r))
              }
              return e
          };
      function N(A, e) {
          for (var t = 0; t < e.length; t++) {
              var r = e[t];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
          }
      }
      var y = {
              PX: 0,
              PERCENTAGE: 1
          },
          v = function() {
              function A(e) {
                  ! function(A, e) {
                      if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
                  }(this, A), this.type = "%" === e.substr(e.length - 1) ? y.PERCENTAGE : y.PX;
                  var t = parseFloat(e);
                  this.value = isNaN(t) ? 0 : t
              }
              return function(A, e, t) {
                  e && N(A.prototype, e), t && N(A, t)
              }(A, [{
                  key: "isPercentage",
                  value: function() {
                      return this.type === y.PERCENTAGE
                  }
              }, {
                  key: "getAbsoluteValue",
                  value: function(A) {
                      return this.isPercentage() ? A * (this.value / 100) : this.value
                  }
              }], [{
                  key: "create",
                  value: function(e) {
                      return new A(e)
                  }
              }]), A
          }(),
          I = function(A, e, t) {
              switch (t) {
                  case "px":
                  case "%":
                      return new v(e + t);
                  case "em":
                  case "rem":
                      var r = new v(e);
                      return r.value *= "em" === t ? parseFloat(A.style.font.fontSize) : function A(e) {
                          var t = e.parent;
                          return t ? A(t) : parseFloat(e.style.font.fontSize)
                      }(A), r;
                  default:
                      return new v("0")
              }
          },
          D = function A(e, t) {
              ! function(A, e) {
                  if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
              }(this, A), this.width = e, this.height = t
          },
          M = function A(e, t) {
              ! function(A, e) {
                  if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
              }(this, A), this.type = r.VECTOR, this.x = e, this.y = t
          };
      function T(A, e) {
          for (var t = 0; t < e.length; t++) {
              var r = e[t];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
          }
      }
      var S = function(A, e, t) {
              return new M(A.x + (e.x - A.x) * t, A.y + (e.y - A.y) * t)
          },
          X = function() {
              function A(e, t, n, B) {
                  ! function(A, e) {
                      if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
                  }(this, A), this.type = r.BEZIER_CURVE, this.start = e, this.startControl = t, this.endControl = n, this.end = B
              }
              return function(A, e, t) {
                  e && T(A.prototype, e)
              }(A, [{
                  key: "subdivide",
                  value: function(e, t) {
                      var r = S(this.start, this.startControl, e),
                          n = S(this.startControl, this.endControl, e),
                          B = S(this.endControl, this.end, e),
                          s = S(r, n, e),
                          o = S(n, B, e),
                          a = S(s, o, e);
                      return t ? new A(this.start, r, s, a) : new A(a, o, B, this.end)
                  }
              }, {
                  key: "reverse",
                  value: function() {
                      return new A(this.end, this.endControl, this.startControl, this.start)
                  }
              }]), A
          }();
      function z(A, e) {
          for (var t = 0; t < e.length; t++) {
              var r = e[t];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
          }
      }
      var L = function() {
              function A(e, t, r, n) {
                  ! function(A, e) {
                      if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
                  }(this, A), this.left = e, this.top = t, this.width = r, this.height = n
              }
              return function(A, e, t) {
                  t && z(A, t)
              }(A, 0, [{
                  key: "fromClientRect",
                  value: function(e, t, r) {
                      return new A(e.left + t, e.top + r, e.width, e.height)
                  }
              }]), A
          }(),
          O = function(A, e, t) {
              return L.fromClientRect(A.getBoundingClientRect(), e, t)
          },
          x = function(A) {
              var e = A.body,
                  t = A.documentElement;
              if (!e || !t) throw new Error("");
              var r = Math.max(Math.max(e.scrollWidth, t.scrollWidth), Math.max(e.offsetWidth, t.offsetWidth), Math.max(e.clientWidth, t.clientWidth)),
                  n = Math.max(Math.max(e.scrollHeight, t.scrollHeight), Math.max(e.offsetHeight, t.offsetHeight), Math.max(e.clientHeight, t.clientHeight));
              return new L(0, 0, r, n)
          },
          V = function(A, e, t, r) {
              var n = [];
              return A instanceof X ? n.push(A.subdivide(.5, !1)) : n.push(A), t instanceof X ? n.push(t.subdivide(.5, !0)) : n.push(t), r instanceof X ? n.push(r.subdivide(.5, !0).reverse()) : n.push(r), e instanceof X ? n.push(e.subdivide(.5, !1).reverse()) : n.push(e), n
          },
          k = function(A) {
              return [A.topLeftInner, A.topRightInner, A.bottomRightInner, A.bottomLeftInner]
          },
          J = function(A, e, t) {
              var r = t[R.TOP_LEFT][0].getAbsoluteValue(A.width),
                  n = t[R.TOP_LEFT][1].getAbsoluteValue(A.height),
                  B = t[R.TOP_RIGHT][0].getAbsoluteValue(A.width),
                  s = t[R.TOP_RIGHT][1].getAbsoluteValue(A.height),
                  o = t[R.BOTTOM_RIGHT][0].getAbsoluteValue(A.width),
                  a = t[R.BOTTOM_RIGHT][1].getAbsoluteValue(A.height),
                  i = t[R.BOTTOM_LEFT][0].getAbsoluteValue(A.width),
                  c = t[R.BOTTOM_LEFT][1].getAbsoluteValue(A.height),
                  Q = [];
              Q.push((r + B) / A.width), Q.push((i + o) / A.width), Q.push((n + c) / A.height), Q.push((s + a) / A.height);
              var l = Math.max.apply(Math, Q);
              l > 1 && (r /= l, n /= l, B /= l, s /= l, o /= l, a /= l, i /= l, c /= l);
              var w = A.width - B,
                  u = A.height - a,
                  U = A.width - o,
                  g = A.height - c;
              return {
                  topLeftOuter: r > 0 || n > 0 ? _(A.left, A.top, r, n, R.TOP_LEFT) : new M(A.left, A.top),
                  topLeftInner: r > 0 || n > 0 ? _(A.left + e[3].borderWidth, A.top + e[0].borderWidth, Math.max(0, r - e[3].borderWidth), Math.max(0, n - e[0].borderWidth), R.TOP_LEFT) : new M(A.left + e[3].borderWidth, A.top + e[0].borderWidth),
                  topRightOuter: B > 0 || s > 0 ? _(A.left + w, A.top, B, s, R.TOP_RIGHT) : new M(A.left + A.width, A.top),
                  topRightInner: B > 0 || s > 0 ? _(A.left + Math.min(w, A.width + e[3].borderWidth), A.top + e[0].borderWidth, w > A.width + e[3].borderWidth ? 0 : B - e[3].borderWidth, s - e[0].borderWidth, R.TOP_RIGHT) : new M(A.left + A.width - e[1].borderWidth, A.top + e[0].borderWidth),
                  bottomRightOuter: o > 0 || a > 0 ? _(A.left + U, A.top + u, o, a, R.BOTTOM_RIGHT) : new M(A.left + A.width, A.top + A.height),
                  bottomRightInner: o > 0 || a > 0 ? _(A.left + Math.min(U, A.width - e[3].borderWidth), A.top + Math.min(u, A.height + e[0].borderWidth), Math.max(0, o - e[1].borderWidth), a - e[2].borderWidth, R.BOTTOM_RIGHT) : new M(A.left + A.width - e[1].borderWidth, A.top + A.height - e[2].borderWidth),
                  bottomLeftOuter: i > 0 || c > 0 ? _(A.left, A.top + g, i, c, R.BOTTOM_LEFT) : new M(A.left, A.top + A.height),
                  bottomLeftInner: i > 0 || c > 0 ? _(A.left + e[3].borderWidth, A.top + g, Math.max(0, i - e[3].borderWidth), c - e[2].borderWidth, R.BOTTOM_LEFT) : new M(A.left + e[3].borderWidth, A.top + A.height - e[2].borderWidth)
              }
          },
          R = {
              TOP_LEFT: 0,
              TOP_RIGHT: 1,
              BOTTOM_RIGHT: 2,
              BOTTOM_LEFT: 3
          },
          _ = function(A, e, t, r, n) {
              var B = (Math.sqrt(2) - 1) / 3 * 4,
                  s = t * B,
                  o = r * B,
                  a = A + t,
                  i = e + r;
              switch (n) {
                  case R.TOP_LEFT:
                      return new X(new M(A, i), new M(A, i - o), new M(a - s, e), new M(a, e));
                  case R.TOP_RIGHT:
                      return new X(new M(A, e), new M(A + s, e), new M(a, i - o), new M(a, i));
                  case R.BOTTOM_RIGHT:
                      return new X(new M(a, e), new M(a, e + o), new M(A + s, i), new M(A, i));
                  case R.BOTTOM_LEFT:
                  default:
                      return new X(new M(a, i), new M(a - s, i), new M(A, e + o), new M(A, e))
              }
          },
          P = ["top", "right", "bottom", "left"],
          G = function(A) {
              return P.map(function(e) {
                  return new v(A.getPropertyValue("padding-".concat(e)))
              })
          },
          W = {
              BORDER_BOX: 0,
              PADDING_BOX: 1,
              CONTENT_BOX: 2
          },
          Y = W,
          q = function A(e) {
              switch (function(A, e) {
                  if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
              }(this, A), e) {
                  case "contain":
                      this.size = 1;
                      break;
                  case "cover":
                      this.size = 2;
                      break;
                  case "auto":
                      this.size = 0;
                      break;
                  default:
                      this.value = new v(e)
              }
          },
          j = new q("auto"),
          Z = function(A, e, t, r) {
              var n = function(A, e) {
                  return new L(A.left + e[3].borderWidth, A.top + e[0].borderWidth, A.width - (e[1].borderWidth + e[3].borderWidth), A.height - (e[0].borderWidth + e[2].borderWidth))
              }(e, r);
              switch (A) {
                  case Y.BORDER_BOX:
                      return e;
                  case Y.CONTENT_BOX:
                      var B = t[3].getAbsoluteValue(e.width),
                          s = t[1].getAbsoluteValue(e.width),
                          o = t[0].getAbsoluteValue(e.width),
                          a = t[2].getAbsoluteValue(e.width);
                      return new L(n.left + B, n.top + o, n.width - B - s, n.height - o - a);
                  case Y.PADDING_BOX:
                  default:
                      return n
              }
          },
          $ = function(A, e, t) {
              return new M(A[0].getAbsoluteValue(t.width - e.width), A[1].getAbsoluteValue(t.height - e.height))
          },
          AA = function(A, e) {
              return {
                  backgroundColor: new U(A.backgroundColor),
                  backgroundImage: rA(A, e),
                  backgroundClip: eA(A.backgroundClip),
                  backgroundOrigin: tA(A.backgroundOrigin)
              }
          },
          eA = function(A) {
              switch (A) {
                  case "padding-box":
                      return W.PADDING_BOX;
                  case "content-box":
                      return W.CONTENT_BOX
              }
              return W.BORDER_BOX
          },
          tA = function(A) {
              switch (A) {
                  case "padding-box":
                      return Y.PADDING_BOX;
                  case "content-box":
                      return Y.CONTENT_BOX
              }
              return Y.BORDER_BOX
          },
          rA = function(A, e) {
              var t = sA(A.backgroundImage).map(function(A) {
                      if ("url" === A.method) {
                          var t = e.loadImage(A.args[0]);
                          A.args = t ? [t] : []
                      }
                      return A
                  }),
                  r = A.backgroundPosition.split(","),
                  n = A.backgroundRepeat.split(","),
                  B = A.backgroundSize.split(",");
              return t.map(function(A, e) {
                  var t = (B[e] || "auto").trim().split(" ").map(nA),
                      s = (r[e] || "auto").trim().split(" ").map(BA);
                  return {
                      source: A,
                      repeat: function(A) {
                          switch (("string" == typeof n[e] ? n[e] : n[0]).trim()) {
                              case "no-repeat":
                                  return 1;
                              case "repeat-x":
                              case "repeat no-repeat":
                                  return 2;
                              case "repeat-y":
                              case "no-repeat repeat":
                                  return 3;
                              case "repeat":
                                  return 0
                          }
                          return 0
                      }(),
                      size: t.length < 2 ? [t[0], j] : [t[0], t[1]],
                      position: s.length < 2 ? [s[0], s[0]] : [s[0], s[1]]
                  }
              })
          },
          nA = function(A) {
              return "auto" === A ? j : new q(A)
          },
          BA = function(A) {
              switch (A) {
                  case "bottom":
                  case "right":
                      return new v("100%");
                  case "left":
                  case "top":
                      return new v("0%");
                  case "auto":
                      return new v("0")
              }
              return new v(A)
          },
          sA = function(A) {
              var e = /^\s$/,
                  t = [],
                  r = [],
                  n = "",
                  B = null,
                  s = "",
                  o = 0,
                  a = 0,
                  i = function() {
                      var A = "";
                      if (n) {
                          '"' === s.substr(0, 1) && (s = s.substr(1, s.length - 2)), s && r.push(s.trim());
                          var e = n.indexOf("-", 1) + 1;
                          "-" === n.substr(0, 1) && e > 0 && (A = n.substr(0, e).toLowerCase(), n = n.substr(e)), "none" !== (n = n.toLowerCase()) && t.push({
                              prefix: A,
                              method: n,
                              args: r
                          })
                      }
                      r = [], n = s = ""
                  };
              return A.split("").forEach(function(A) {
                  if (0 !== o || !e.test(A)) {
                      switch (A) {
                          case '"':
                              B ? B === A && (B = null) : B = A;
                              break;
                          case "(":
                              if (B) break;
                              if (0 === o) return void(o = 1);
                              a++;
                              break;
                          case ")":
                              if (B) break;
                              if (1 === o) {
                                  if (0 === a) return o = 0, void i();
                                  a--
                              }
                              break;
                          case ",":
                              if (B) break;
                              if (0 === o) return void i();
                              if (1 === o && 0 === a && !n.match(/^url$/i)) return r.push(s.trim()), void(s = "")
                      }
                      0 === o ? n += A : s += A
                  }
              }), i(), t
          },
          oA = Object.keys({
              TOP: 0,
              RIGHT: 1,
              BOTTOM: 2,
              LEFT: 3
          }).map(function(A) {
              return A.toLowerCase()
          }),
          aA = function(A) {
              return oA.map(function(e) {
                  var t = new U(A.getPropertyValue("border-".concat(e, "-color"))),
                      r = function(A) {
                          switch (A) {
                              case "none":
                                  return 0
                          }
                          return 1
                      }(A.getPropertyValue("border-".concat(e, "-style"))),
                      n = parseFloat(A.getPropertyValue("border-".concat(e, "-width")));
                  return {
                      borderColor: t,
                      borderStyle: r,
                      borderWidth: isNaN(n) ? 0 : n
                  }
              })
          };
      var iA = ["top-left", "top-right", "bottom-right", "bottom-left"],
          cA = function(A) {
              return iA.map(function(e) {
                  var t = function(A, e) {
                          return function(A) {
                              if (Array.isArray(A)) return A
                          }(A) || function(A, e) {
                              var t = [],
                                  r = !0,
                                  n = !1,
                                  B = void 0;
                              try {
                                  for (var s, o = A[Symbol.iterator](); !(r = (s = o.next()).done) && (t.push(s.value), !e || t.length !== e); r = !0);
                              } catch (A) {
                                  n = !0, B = A
                              } finally {
                                  try {
                                      r || null == o.return || o.return()
                                  } finally {
                                      if (n) throw B
                                  }
                              }
                              return t
                          }(A, e) || function() {
                              throw new TypeError("Invalid attempt to destructure non-iterable instance")
                          }()
                      }(A.getPropertyValue("border-".concat(e, "-radius")).split(" ").map(v.create), 2),
                      r = t[0],
                      n = t[1];
                  return void 0 === n ? [r, r] : [r, n]
              })
          },
          QA = {
              NONE: 1,
              BLOCK: 2,
              INLINE: 4,
              RUN_IN: 8,
              FLOW: 16,
              FLOW_ROOT: 32,
              TABLE: 64,
              FLEX: 128,
              GRID: 256,
              RUBY: 512,
              SUBGRID: 1024,
              LIST_ITEM: 2048,
              TABLE_ROW_GROUP: 4096,
              TABLE_HEADER_GROUP: 8192,
              TABLE_FOOTER_GROUP: 16384,
              TABLE_ROW: 32768,
              TABLE_CELL: 65536,
              TABLE_COLUMN_GROUP: 1 << 17,
              TABLE_COLUMN: 1 << 18,
              TABLE_CAPTION: 1 << 19,
              RUBY_BASE: 1 << 20,
              RUBY_TEXT: 1 << 21,
              RUBY_BASE_CONTAINER: 1 << 22,
              RUBY_TEXT_CONTAINER: 1 << 23,
              CONTENTS: 1 << 24,
              INLINE_BLOCK: 1 << 25,
              INLINE_LIST_ITEM: 1 << 26,
              INLINE_TABLE: 1 << 27,
              INLINE_FLEX: 1 << 28,
              INLINE_GRID: 1 << 29
          },
          lA = function(A, e) {
              return A | function(A) {
                  switch (e) {
                      case "block":
                          return QA.BLOCK;
                      case "inline":
                          return QA.INLINE;
                      case "run-in":
                          return QA.RUN_IN;
                      case "flow":
                          return QA.FLOW;
                      case "flow-root":
                          return QA.FLOW_ROOT;
                      case "table":
                          return QA.TABLE;
                      case "flex":
                          return QA.FLEX;
                      case "grid":
                          return QA.GRID;
                      case "ruby":
                          return QA.RUBY;
                      case "subgrid":
                          return QA.SUBGRID;
                      case "list-item":
                          return QA.LIST_ITEM;
                      case "table-row-group":
                          return QA.TABLE_ROW_GROUP;
                      case "table-header-group":
                          return QA.TABLE_HEADER_GROUP;
                      case "table-footer-group":
                          return QA.TABLE_FOOTER_GROUP;
                      case "table-row":
                          return QA.TABLE_ROW;
                      case "table-cell":
                          return QA.TABLE_CELL;
                      case "table-column-group":
                          return QA.TABLE_COLUMN_GROUP;
                      case "table-column":
                          return QA.TABLE_COLUMN;
                      case "table-caption":
                          return QA.TABLE_CAPTION;
                      case "ruby-base":
                          return QA.RUBY_BASE;
                      case "ruby-text":
                          return QA.RUBY_TEXT;
                      case "ruby-base-container":
                          return QA.RUBY_BASE_CONTAINER;
                      case "ruby-text-container":
                          return QA.RUBY_TEXT_CONTAINER;
                      case "contents":
                          return QA.CONTENTS;
                      case "inline-block":
                          return QA.INLINE_BLOCK;
                      case "inline-list-item":
                          return QA.INLINE_LIST_ITEM;
                      case "inline-table":
                          return QA.INLINE_TABLE;
                      case "inline-flex":
                          return QA.INLINE_FLEX;
                      case "inline-grid":
                          return QA.INLINE_GRID
                  }
                  return QA.NONE
              }()
          },
          wA = function(A) {
              return A.split(" ").reduce(lA, 0)
          },
          uA = function(A) {
              switch (A) {
                  case "left":
                      return 1;
                  case "right":
                      return 2;
                  case "inline-start":
                      return 3;
                  case "inline-end":
                      return 4
              }
              return 0
          },
          UA = function(A) {
              return {
                  fontFamily: A.fontFamily,
                  fontSize: A.fontSize,
                  fontStyle: A.fontStyle,
                  fontVariant: A.fontVariant,
                  fontWeight: function(A) {
                      switch (A) {
                          case "normal":
                              return 400;
                          case "bold":
                              return 700
                      }
                      var e = parseInt(A, 10);
                      return isNaN(e) ? 400 : e
                  }(A.fontWeight)
              }
          },
          gA = function(A) {
              if ("normal" === A) return 0;
              var e = parseFloat(A);
              return isNaN(e) ? 0 : e
          },
          FA = function(A) {
              switch (A) {
                  case "strict":
                      return "strict";
                  case "normal":
                  default:
                      return "normal"
              }
          },
          CA = function(A) {
              switch (A) {
                  case "disc":
                      return 0;
                  case "circle":
                      return 1;
                  case "square":
                      return 2;
                  case "decimal":
                      return 3;
                  case "cjk-decimal":
                      return 4;
                  case "decimal-leading-zero":
                      return 5;
                  case "lower-roman":
                      return 6;
                  case "upper-roman":
                      return 7;
                  case "lower-greek":
                      return 8;
                  case "lower-alpha":
                      return 9;
                  case "upper-alpha":
                      return 10;
                  case "arabic-indic":
                      return 11;
                  case "armenian":
                      return 12;
                  case "bengali":
                      return 13;
                  case "cambodian":
                      return 14;
                  case "cjk-earthly-branch":
                      return 15;
                  case "cjk-heavenly-stem":
                      return 16;
                  case "cjk-ideographic":
                      return 17;
                  case "devanagari":
                      return 18;
                  case "ethiopic-numeric":
                      return 19;
                  case "georgian":
                      return 20;
                  case "gujarati":
                      return 21;
                  case "gurmukhi":
                  case "hebrew":
                      return 22;
                  case "hiragana":
                      return 23;
                  case "hiragana-iroha":
                      return 24;
                  case "japanese-formal":
                      return 25;
                  case "japanese-informal":
                      return 26;
                  case "kannada":
                      return 27;
                  case "katakana":
                      return 28;
                  case "katakana-iroha":
                      return 29;
                  case "khmer":
                      return 30;
                  case "korean-hangul-formal":
                      return 31;
                  case "korean-hanja-formal":
                      return 32;
                  case "korean-hanja-informal":
                      return 33;
                  case "lao":
                      return 34;
                  case "lower-armenian":
                      return 35;
                  case "malayalam":
                      return 36;
                  case "mongolian":
                      return 37;
                  case "myanmar":
                      return 38;
                  case "oriya":
                      return 39;
                  case "persian":
                      return 40;
                  case "simp-chinese-formal":
                      return 41;
                  case "simp-chinese-informal":
                      return 42;
                  case "tamil":
                      return 43;
                  case "telugu":
                      return 44;
                  case "thai":
                      return 45;
                  case "tibetan":
                      return 46;
                  case "trad-chinese-formal":
                      return 47;
                  case "trad-chinese-informal":
                      return 48;
                  case "upper-armenian":
                      return 49;
                  case "disclosure-open":
                      return 50;
                  case "disclosure-closed":
                      return 51;
                  case "none":
                  default:
                      return -1
              }
          },
          hA = function(A) {
              var e = sA(A.getPropertyValue("list-style-image"));
              return {
                  listStyleType: CA(A.getPropertyValue("list-style-type")),
                  listStyleImage: e.length ? e[0] : null,
                  listStylePosition: dA(A.getPropertyValue("list-style-position"))
              }
          },
          dA = function(A) {
              switch (A) {
                  case "inside":
                      return 0;
                  case "outside":
                  default:
                      return 1
              }
          },
          HA = ["top", "right", "bottom", "left"],
          fA = function(A) {
              return HA.map(function(e) {
                  return new v(A.getPropertyValue("margin-".concat(e)))
              })
          },
          EA = {
              VISIBLE: 0,
              HIDDEN: 1,
              SCROLL: 2,
              AUTO: 3
          },
          pA = function(A) {
              switch (A) {
                  case "hidden":
                      return EA.HIDDEN;
                  case "scroll":
                      return EA.SCROLL;
                  case "auto":
                      return EA.AUTO;
                  case "visible":
                  default:
                      return EA.VISIBLE
              }
          },
          KA = function(A) {
              switch (A) {
                  case "break-word":
                      return 1;
                  case "normal":
                  default:
                      return 0
              }
          },
          mA = {
              STATIC: 0,
              RELATIVE: 1,
              ABSOLUTE: 2,
              FIXED: 3,
              STICKY: 4
          },
          bA = function(A) {
              switch (A) {
                  case "relative":
                      return mA.RELATIVE;
                  case "absolute":
                      return mA.ABSOLUTE;
                  case "fixed":
                      return mA.FIXED;
                  case "sticky":
                      return mA.STICKY
              }
              return mA.STATIC
          },
          NA = /^([+-]|\d|\.)$/i,
          yA = function(A) {
              if ("none" === A || "string" != typeof A) return null;
              for (var e = "", t = !1, r = [], n = [], B = 0, s = null, o = function() {
                      e.length && (t ? r.push(parseFloat(e)) : s = new U(e)), t = !1, e = ""
                  }, a = function() {
                      r.length && null !== s && n.push({
                          color: s,
                          offsetX: r[0] || 0,
                          offsetY: r[1] || 0,
                          blur: r[2] || 0
                      }), r.splice(0, r.length), s = null
                  }, i = 0; i < A.length; i++) {
                  var c = A[i];
                  switch (c) {
                      case "(":
                          e += c, B++;
                          break;
                      case ")":
                          e += c, B--;
                          break;
                      case ",":
                          0 === B ? (o(), a()) : e += c;
                          break;
                      case " ":
                          0 === B ? o() : e += c;
                          break;
                      default:
                          0 === e.length && NA.test(c) && (t = !0), e += c
                  }
              }
              return o(), a(), 0 === n.length ? null : n
          },
          vA = function(A) {
              switch (A) {
                  case "uppercase":
                      return 2;
                  case "lowercase":
                      return 1;
                  case "capitalize":
                      return 3
              }
              return 0
          },
          IA = function(A) {
              return parseFloat(A.trim())
          },
          DA = /(matrix|matrix3d)\((.+)\)/,
          MA = function(A) {
              var e = SA(A.transform || A.webkitTransform || A.mozTransform || A.msTransform || A.oTransform);
              return null === e ? null : {
                  transform: e,
                  transformOrigin: TA(A.transformOrigin || A.webkitTransformOrigin || A.mozTransformOrigin || A.msTransformOrigin || A.oTransformOrigin)
              }
          },
          TA = function(A) {
              if ("string" != typeof A) {
                  var e = new v("0");
                  return [e, e]
              }
              var t = A.split(" ").map(v.create);
              return [t[0], t[1]]
          },
          SA = function(A) {
              if ("none" === A || "string" != typeof A) return null;
              var e = A.match(DA);
              if (e) {
                  if ("matrix" === e[1]) {
                      var t = e[2].split(",").map(IA);
                      return [t[0], t[1], t[2], t[3], t[4], t[5]]
                  }
                  var r = e[2].split(",").map(IA);
                  return [r[0], r[1], r[4], r[5], r[12], r[13]]
              }
              return null
          },
          XA = function(A) {
              switch (A) {
                  case "hidden":
                      return 1;
                  case "collapse":
                      return 2;
                  case "visible":
                  default:
                      return 0
              }
          },
          zA = function(A) {
              switch (A) {
                  case "break-all":
                      return "break-all";
                  case "keep-all":
                      return "keep-all";
                  case "normal":
                  default:
                      return "normal"
              }
          },
          LA = function(A) {
              var e = "auto" === A;
              return {
                  auto: e,
                  order: e ? 0 : parseInt(A, 10)
              }
          };
      function OA(A, e) {
          for (var t = 0; t < e.length; t++) {
              var r = e[t];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
          }
      }
      var xA = function() {
              function A(e) {
                  ! function(A, e) {
                      if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
                  }(this, A), this.element = e
              }
              return function(A, e, t) {
                  e && OA(A.prototype, e)
              }(A, [{
                  key: "render",
                  value: function(A) {
                      var e = this;
                      this.options = A, this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d"), this.canvas.width = Math.floor(A.width) * A.scale, this.canvas.height = Math.floor(A.height) * A.scale, this.canvas.style.width = "".concat(A.width, "px"), this.canvas.style.height = "".concat(A.height, "px"), this.ctx.scale(A.scale, A.scale), A.logger.log("ForeignObject renderer initialized (".concat(A.width, "x").concat(A.height, " at ").concat(A.x, ",").concat(A.y, ") with scale ").concat(A.scale));
                      var t = VA(Math.max(A.windowWidth, A.width) * A.scale, Math.max(A.windowHeight, A.height) * A.scale, A.scrollX * A.scale, A.scrollY * A.scale, this.element);
                      return kA(t).then(function(t) {
                          return A.backgroundColor && (e.ctx.fillStyle = A.backgroundColor.toString(), e.ctx.fillRect(0, 0, A.width * A.scale, A.height * A.scale)), e.ctx.drawImage(t, -A.x * A.scale, -A.y * A.scale), e.canvas
                      })
                  }
              }]), A
          }(),
          VA = function(A, e, t, r, n) {
              var B = "http://www.w3.org/2000/svg",
                  s = document.createElementNS(B, "svg"),
                  o = document.createElementNS(B, "foreignObject");
              return s.setAttributeNS(null, "width", A), s.setAttributeNS(null, "height", e), o.setAttributeNS(null, "width", "100%"), o.setAttributeNS(null, "height", "100%"), o.setAttributeNS(null, "x", t), o.setAttributeNS(null, "y", r), o.setAttributeNS(null, "externalResourcesRequired", "true"), s.appendChild(o), o.appendChild(n), s
          },
          kA = function(A) {
              return new Promise(function(e, t) {
                  var r = new Image;
                  r.onload = function() {
                      return e(r)
                  }, r.onerror = t, r.src = "data:image/svg+xml;charset=utf-8,".concat(encodeURIComponent((new XMLSerializer).serializeToString(A)))
              })
          },
          JA = function(A) {
              return 0 === A[0] && 255 === A[1] && 0 === A[2] && 255 === A[3]
          },
          RA = {get SUPPORT_RANGE_BOUNDS() {
                  var A = function(A) {
                      if (A.createRange) {
                          var e = A.createRange();
                          if (e.getBoundingClientRect) {
                              var t = A.createElement("boundtest");
                              t.style.height = "".concat(123, "px"), t.style.display = "block", A.body.appendChild(t), e.selectNode(t);
                              var r = e.getBoundingClientRect(),
                                  n = Math.round(r.height);
                              if (A.body.removeChild(t), 123 === n) return !0
                          }
                      }
                      return !1
                  }(document);
                  return Object.defineProperty(RA, "SUPPORT_RANGE_BOUNDS", {
                      value: A
                  }), A
              },
              get SUPPORT_SVG_DRAWING() {
                  var A = function(A) {
                      var e = new Image,
                          t = A.createElement("canvas"),
                          r = t.getContext("2d");
                      e.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
                      try {
                          r.drawImage(e, 0, 0), t.toDataURL()
                      } catch (A) {
                          return !1
                      }
                      return !0
                  }(document);
                  return Object.defineProperty(RA, "SUPPORT_SVG_DRAWING", {
                      value: A
                  }), A
              },
              get SUPPORT_FOREIGNOBJECT_DRAWING() {
                  var A = "function" == typeof Array.from && "function" == typeof window.fetch ? function(A) {
                      var e = A.createElement("canvas");
                      e.width = 100, e.height = 100;
                      var t = e.getContext("2d");
                      t.fillStyle = "rgb(0, 255, 0)", t.fillRect(0, 0, 100, 100);
                      var r = new Image,
                          n = e.toDataURL();
                      r.src = n;
                      var B = VA(100, 100, 0, 0, r);
                      return t.fillStyle = "red", t.fillRect(0, 0, 100, 100), kA(B).then(function(e) {
                          t.drawImage(e, 0, 0);
                          var r = t.getImageData(0, 0, 100, 100).data;
                          t.fillStyle = "red", t.fillRect(0, 0, 100, 100);
                          var B = A.createElement("div");
                          return B.style.backgroundImage = "url(".concat(n, ")"), B.style.height = "".concat(100, "px"), JA(r) ? kA(VA(100, 100, 0, 0, B)) : Promise.reject(!1)
                      }).then(function(A) {
                          return t.drawImage(A, 0, 0), JA(t.getImageData(0, 0, 100, 100).data)
                      }).catch(function(A) {
                          return !1
                      })
                  }(document) : Promise.resolve(!1);
                  return Object.defineProperty(RA, "SUPPORT_FOREIGNOBJECT_DRAWING", {
                      value: A
                  }), A
              },
              get SUPPORT_CORS_IMAGES() {
                  var A = void 0 !== (new Image).crossOrigin;
                  return Object.defineProperty(RA, "SUPPORT_CORS_IMAGES", {
                      value: A
                  }), A
              },
              get SUPPORT_RESPONSE_TYPE() {
                  var A = "string" == typeof(new XMLHttpRequest).responseType;
                  return Object.defineProperty(RA, "SUPPORT_RESPONSE_TYPE", {
                      value: A
                  }), A
              },
              get SUPPORT_CORS_XHR() {
                  var A = "withCredentials" in new XMLHttpRequest;
                  return Object.defineProperty(RA, "SUPPORT_CORS_XHR", {
                      value: A
                  }), A
              }
          },
          _A = RA,
          PA = t(0),
          GA = function A(e, t) {
              ! function(A, e) {
                  if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
              }(this, A), this.text = e, this.bounds = t
          },
          WA = function(A, e, t) {
              var r = A.ownerDocument.createElement("html2canvaswrapper");
              r.appendChild(A.cloneNode(!0));
              var n = A.parentNode;
              if (n) {
                  n.replaceChild(r, A);
                  var B = O(r, e, t);
                  return r.firstChild && n.replaceChild(r.firstChild, r), B
              }
              return new L(0, 0, 0, 0)
          },
          YA = function(A, e, t, r, n) {
              var B = A.ownerDocument.createRange();
              return B.setStart(A, e), B.setEnd(A, e + t), L.fromClientRect(B.getBoundingClientRect(), r, n)
          };
      function qA(A, e) {
          for (var t = 0; t < e.length; t++) {
              var r = e[t];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
          }
      }
      var jA = function() {
              function A(e, t, r) {
                  ! function(A, e) {
                      if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
                  }(this, A), this.text = e, this.parent = t, this.bounds = r
              }
              return function(A, e, t) {
                  t && qA(A, t)
              }(A, 0, [{
                  key: "fromTextNode",
                  value: function(e, t) {
                      var r = $A(e.data, t.style.textTransform);
                      return new A(r, t, function(A, e, t) {
                          for (var r = 0 !== e.style.letterSpacing ? Object(PA.toCodePoints)(A).map(function(A) {
                                  return Object(PA.fromCodePoint)(A)
                              }) : function(A, e) {
                                  for (var t, r = Object(PA.LineBreaker)(A, {
                                          lineBreak: e.style.lineBreak,
                                          wordBreak: 1 === e.style.overflowWrap ? "break-word" : e.style.wordBreak
                                      }), n = []; !(t = r.next()).done;) n.push(t.value.slice());
                                  return n
                              }(A, e), n = r.length, B = t.parentNode ? t.parentNode.ownerDocument.defaultView : null, s = B ? B.pageXOffset : 0, o = B ? B.pageYOffset : 0, a = [], i = 0, c = 0; c < n; c++) {
                              var Q = r[c];
                              if (null !== e.style.textDecoration || Q.trim().length > 0)
                                  if (_A.SUPPORT_RANGE_BOUNDS) a.push(new GA(Q, YA(t, i, Q.length, s, o)));
                                  else {
                                      var l = t.splitText(Q.length);
                                      a.push(new GA(Q, WA(t, s, o))), t = l
                                  }
                              else _A.SUPPORT_RANGE_BOUNDS || (t = t.splitText(Q.length));
                              i += Q.length
                          }
                          return a
                      }(r, t, e))
                  }
              }]), A
          }(),
          ZA = /(^|\s|:|-|\(|\))([a-z])/g,
          $A = function(A, e) {
              switch (e) {
                  case 1:
                      return A.toLowerCase();
                  case 3:
                      return A.replace(ZA, Ae);
                  case 2:
                      return A.toUpperCase();
                  default:
                      return A
              }
          };
      function Ae(A, e, t) {
          return A.length > 0 ? e + t.toUpperCase() : A
      }
      var ee = function A(e, t, n) {
              ! function(A, e) {
                  if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
              }(this, A), this.type = r.CIRCLE, this.x = e, this.y = t, this.radius = n
          },
          te = new U([42, 42, 42]),
          re = new U([165, 165, 165]),
          ne = new U([222, 222, 222]),
          Be = {
              borderWidth: 1,
              borderColor: re,
              borderStyle: 1
          },
          se = [Be, Be, Be, Be],
          oe = {
              backgroundColor: ne,
              backgroundImage: [],
              backgroundClip: W.PADDING_BOX,
              backgroundOrigin: Y.PADDING_BOX
          },
          ae = new v("50%"),
          ie = [ae, ae],
          ce = [ie, ie, ie, ie],
          Qe = new v("3px"),
          le = [Qe, Qe],
          we = [le, le, le, le],
          ue = function(A) {
              return "radio" === A.type ? ce : we
          },
          Ue = function(A, e) {
              if ("radio" === A.type || "checkbox" === A.type) {
                  if (A.checked) {
                      var t = Math.min(e.bounds.width, e.bounds.height);
                      e.childNodes.push("checkbox" === A.type ? [new M(e.bounds.left + .39363 * t, e.bounds.top + .79 * t), new M(e.bounds.left + .16 * t, e.bounds.top + .5549 * t), new M(e.bounds.left + .27347 * t, e.bounds.top + .44071 * t), new M(e.bounds.left + .39694 * t, e.bounds.top + .5649 * t), new M(e.bounds.left + .72983 * t, e.bounds.top + .23 * t), new M(e.bounds.left + .84 * t, e.bounds.top + .34085 * t), new M(e.bounds.left + .39363 * t, e.bounds.top + .79 * t)] : new ee(e.bounds.left + t / 4, e.bounds.top + t / 4, t / 4))
                  }
              } else he(de(A), A, e, !1)
          },
          ge = function(A, e) {
              he(A.value, A, e, !0)
          },
          Fe = function(A, e) {
              var t = A.options[A.selectedIndex || 0];
              he(t && t.text || "", A, e, !1)
          },
          Ce = function(A) {
              return A.width > A.height ? (A.left += (A.width - A.height) / 2, A.width = A.height) : A.width < A.height && (A.top += (A.height - A.width) / 2, A.height = A.width), A
          },
          he = function(A, e, t, r) {
              var n = e.ownerDocument.body;
              if (A.length > 0 && n) {
                  var B = e.ownerDocument.createElement("html2canvaswrapper");
                  b(e.ownerDocument.defaultView.getComputedStyle(e, null), B), B.style.position = "absolute", B.style.left = "".concat(t.bounds.left, "px"), B.style.top = "".concat(t.bounds.top, "px"), r || (B.style.whiteSpace = "nowrap");
                  var s = e.ownerDocument.createTextNode(A);
                  B.appendChild(s), n.appendChild(B), t.childNodes.push(jA.fromTextNode(s, t)), n.removeChild(B)
              }
          },
          de = function(A) {
              var e = "password" === A.type ? new Array(A.value.length + 1).join("•") : A.value;
              return 0 === e.length ? A.placeholder || "" : e
          },
          He = ["OL", "UL", "MENU"],
          fe = function(A) {
              var e = A.parent;
              if (!e) return null;
              do {
                  if (-1 !== He.indexOf(e.tagName)) return e;
                  e = e.parent
              } while (e);
              return A.parent
          },
          Ee = function(A, e, t) {
              var r = e.style.listStyle;
              if (r) {
                  var n, B = A.ownerDocument.defaultView.getComputedStyle(A, null),
                      s = A.ownerDocument.createElement("html2canvaswrapper");
                  switch (b(B, s), s.style.position = "absolute", s.style.bottom = "auto", s.style.display = "block", s.style.letterSpacing = "normal", r.listStylePosition) {
                      case 1:
                          s.style.left = "auto", s.style.right = "".concat(A.ownerDocument.defaultView.innerWidth - e.bounds.left - e.style.margin[1].getAbsoluteValue(e.bounds.width) + 7, "px"), s.style.textAlign = "right";
                          break;
                      case 0:
                          s.style.left = "".concat(e.bounds.left - e.style.margin[3].getAbsoluteValue(e.bounds.width), "px"), s.style.right = "auto", s.style.textAlign = "left"
                  }
                  var o = e.style.margin[0].getAbsoluteValue(e.bounds.width),
                      a = r.listStyleImage;
                  if (a)
                      if ("url" === a.method) {
                          var i = A.ownerDocument.createElement("img");
                          i.src = a.args[0], s.style.top = "".concat(e.bounds.top - o, "px"), s.style.width = "auto", s.style.height = "auto", s.appendChild(i)
                      } else {
                          var c = .5 * parseFloat(e.style.font.fontSize);
                          s.style.top = "".concat(e.bounds.top - o + e.bounds.height - 1.5 * c, "px"), s.style.width = "".concat(c, "px"), s.style.height = "".concat(c, "px"), s.style.backgroundImage = B.listStyleImage
                      }
                  else "number" == typeof e.listIndex && (n = A.ownerDocument.createTextNode(Me(e.listIndex, r.listStyleType, !0)), s.appendChild(n), s.style.top = "".concat(e.bounds.top - o, "px"));
                  var Q = A.ownerDocument.body;
                  Q.appendChild(s), n ? (e.childNodes.push(jA.fromTextNode(n, e)), Q.removeChild(s)) : e.childNodes.push(new Xe(s, e, t, 0))
              }
          },
          pe = {
              integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
              values: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
          },
          Ke = {
              integers: [9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
              values: ["Ք", "Փ", "Ւ", "Ց", "Ր", "Տ", "Վ", "Ս", "Ռ", "Ջ", "Պ", "Չ", "Ո", "Շ", "Ն", "Յ", "Մ", "Ճ", "Ղ", "Ձ", "Հ", "Կ", "Ծ", "Խ", "Լ", "Ի", "Ժ", "Թ", "Ը", "Է", "Զ", "Ե", "Դ", "Գ", "Բ", "Ա"]
          },
          me = {
              integers: [1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 19, 18, 17, 16, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
              values: ["י׳", "ט׳", "ח׳", "ז׳", "ו׳", "ה׳", "ד׳", "ג׳", "ב׳", "א׳", "ת", "ש", "ר", "ק", "צ", "פ", "ע", "ס", "נ", "מ", "ל", "כ", "יט", "יח", "יז", "טז", "טו", "י", "ט", "ח", "ז", "ו", "ה", "ד", "ג", "ב", "א"]
          },
          be = {
              integers: [1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
              values: ["ჵ", "ჰ", "ჯ", "ჴ", "ხ", "ჭ", "წ", "ძ", "ც", "ჩ", "შ", "ყ", "ღ", "ქ", "ფ", "ჳ", "ტ", "ს", "რ", "ჟ", "პ", "ო", "ჲ", "ნ", "მ", "ლ", "კ", "ი", "თ", "ჱ", "ზ", "ვ", "ე", "დ", "გ", "ბ", "ა"]
          },
          Ne = function(A, e, t, r, n, B) {
              return A < e || A > t ? Me(A, n, B.length > 0) : r.integers.reduce(function(e, t, n) {
                  for (; A >= t;) A -= t, e += r.values[n];
                  return e
              }, "") + B
          },
          ye = function(A, e, t, r) {
              var n = "";
              do {
                  t || A--, n = r(A) + n, A /= e
              } while (A * e >= e);
              return n
          },
          ve = function(A, e, t, r, n) {
              var B = t - e + 1;
              return (A < 0 ? "-" : "") + (ye(Math.abs(A), B, r, function(A) {
                  return Object(PA.fromCodePoint)(Math.floor(A % B) + e)
              }) + n)
          },
          Ie = function(A, e) {
              var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ". ",
                  r = e.length;
              return ye(Math.abs(A), r, !1, function(A) {
                  return e[Math.floor(A % r)]
              }) + t
          },
          De = function(A, e, t, r, n, B) {
              if (A < -9999 || A > 9999) return Me(A, 4, n.length > 0);
              var s = Math.abs(A),
                  o = n;
              if (0 === s) return e[0] + o;
              for (var a = 0; s > 0 && a <= 4; a++) {
                  var i = s % 10;
                  0 === i && K(B, 1) && "" !== o ? o = e[i] + o : i > 1 || 1 === i && 0 === a || 1 === i && 1 === a && K(B, 2) || 1 === i && 1 === a && K(B, 4) && A > 100 || 1 === i && a > 1 && K(B, 8) ? o = e[i] + (a > 0 ? t[a - 1] : "") + o : 1 === i && a > 0 && (o = t[a - 1] + o), s = Math.floor(s / 10)
              }
              return (A < 0 ? r : "") + o
          },
          Me = function(A, e, t) {
              var r = t ? ". " : "",
                  n = t ? "、" : "",
                  B = t ? ", " : "";
              switch (e) {
                  case 0:
                      return "•";
                  case 1:
                      return "◦";
                  case 2:
                      return "◾";
                  case 5:
                      var s = ve(A, 48, 57, !0, r);
                      return s.length < 4 ? "0".concat(s) : s;
                  case 4:
                      return Ie(A, "〇一二三四五六七八九", n);
                  case 6:
                      return Ne(A, 1, 3999, pe, 3, r).toLowerCase();
                  case 7:
                      return Ne(A, 1, 3999, pe, 3, r);
                  case 8:
                      return ve(A, 945, 969, !1, r);
                  case 9:
                      return ve(A, 97, 122, !1, r);
                  case 10:
                      return ve(A, 65, 90, !1, r);
                  case 11:
                      return ve(A, 1632, 1641, !0, r);
                  case 12:
                  case 49:
                      return Ne(A, 1, 9999, Ke, 3, r);
                  case 35:
                      return Ne(A, 1, 9999, Ke, 3, r).toLowerCase();
                  case 13:
                      return ve(A, 2534, 2543, !0, r);
                  case 14:
                  case 30:
                      return ve(A, 6112, 6121, !0, r);
                  case 15:
                      return Ie(A, "子丑寅卯辰巳午未申酉戌亥", n);
                  case 16:
                      return Ie(A, "甲乙丙丁戊己庚辛壬癸", n);
                  case 17:
                  case 48:
                      return De(A, "零一二三四五六七八九", "十百千萬", "負", n, 14);
                  case 47:
                      return De(A, "零壹貳參肆伍陸柒捌玖", "拾佰仟萬", "負", n, 15);
                  case 42:
                      return De(A, "零一二三四五六七八九", "十百千萬", "负", n, 14);
                  case 41:
                      return De(A, "零壹贰叁肆伍陆柒捌玖", "拾佰仟萬", "负", n, 15);
                  case 26:
                      return De(A, "〇一二三四五六七八九", "十百千万", "マイナス", n, 0);
                  case 25:
                      return De(A, "零壱弐参四伍六七八九", "拾百千万", "マイナス", n, 7);
                  case 31:
                      return De(A, "영일이삼사오육칠팔구", "십백천만", "마이너스", B, 7);
                  case 33:
                      return De(A, "零一二三四五六七八九", "十百千萬", "마이너스", B, 0);
                  case 32:
                      return De(A, "零壹貳參四五六七八九", "拾百千", "마이너스", B, 7);
                  case 18:
                      return ve(A, 2406, 2415, !0, r);
                  case 20:
                      return Ne(A, 1, 19999, be, 3, r);
                  case 21:
                      return ve(A, 2790, 2799, !0, r);
                  case 22:
                      return ve(A, 2662, 2671, !0, r);
                  case 22:
                      return Ne(A, 1, 10999, me, 3, r);
                  case 23:
                      return Ie(A, "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");
                  case 24:
                      return Ie(A, "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");
                  case 27:
                      return ve(A, 3302, 3311, !0, r);
                  case 28:
                      return Ie(A, "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン", n);
                  case 29:
                      return Ie(A, "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス", n);
                  case 34:
                      return ve(A, 3792, 3801, !0, r);
                  case 37:
                      return ve(A, 6160, 6169, !0, r);
                  case 38:
                      return ve(A, 4160, 4169, !0, r);
                  case 39:
                      return ve(A, 2918, 2927, !0, r);
                  case 40:
                      return ve(A, 1776, 1785, !0, r);
                  case 43:
                      return ve(A, 3046, 3055, !0, r);
                  case 44:
                      return ve(A, 3174, 3183, !0, r);
                  case 45:
                      return ve(A, 3664, 3673, !0, r);
                  case 46:
                      return ve(A, 3872, 3881, !0, r);
                  case 3:
                  default:
                      return ve(A, 48, 57, !0, r)
              }
          };
      function Te(A, e) {
          for (var t = 0; t < e.length; t++) {
              var r = e[t];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
          }
      }
      var Se = ["INPUT", "TEXTAREA", "SELECT"],
          Xe = function() {
              function A(e, t, r, n) {
                  var B = this;
                  ! function(A, e) {
                      if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
                  }(this, A), this.parent = t, this.tagName = e.tagName, this.index = n, this.childNodes = [], this.listItems = [], "number" == typeof e.start && (this.listStart = e.start);
                  var s = e.ownerDocument.defaultView,
                      o = s.pageXOffset,
                      a = s.pageYOffset,
                      i = s.getComputedStyle(e, null),
                      c = wA(i.display),
                      Q = "radio" === e.type || "checkbox" === e.type,
                      l = bA(i.position);
                  if (this.style = {
                          background: Q ? oe : AA(i, r),
                          border: Q ? se : aA(i),
                          borderRadius: (e instanceof s.HTMLInputElement || e instanceof HTMLInputElement) && Q ? ue(e) : cA(i),
                          color: Q ? te : new U(i.color),
                          display: c,
                          float: uA(i.float),
                          font: UA(i),
                          letterSpacing: gA(i.letterSpacing),
                          listStyle: c === QA.LIST_ITEM ? hA(i) : null,
                          lineBreak: FA(i.lineBreak),
                          margin: fA(i),
                          opacity: parseFloat(i.opacity),
                          overflow: -1 === Se.indexOf(e.tagName) ? pA(i.overflow) : EA.HIDDEN,
                          overflowWrap: KA(i.overflowWrap ? i.overflowWrap : i.wordWrap),
                          padding: G(i),
                          position: l,
                          textDecoration: h(i),
                          textShadow: yA(i.textShadow),
                          textTransform: vA(i.textTransform),
                          transform: MA(i),
                          visibility: XA(i.visibility),
                          wordBreak: zA(i.wordBreak),
                          zIndex: LA(l !== mA.STATIC ? i.zIndex : "auto")
                      }, this.isTransformed() && (e.style.transform = "matrix(1,0,0,1,0,0)"), c === QA.LIST_ITEM) {
                      var w = fe(this);
                      if (w) {
                          var u = w.listItems.length;
                          w.listItems.push(this), this.listIndex = e.hasAttribute("value") && "number" == typeof e.value ? e.value : 0 === u ? "number" == typeof w.listStart ? w.listStart : 1 : w.listItems[u - 1].listIndex + 1
                      }
                  }
                  "IMG" === e.tagName && e.addEventListener("load", function() {
                      B.bounds = O(e, o, a), B.curvedBounds = J(B.bounds, B.style.border, B.style.borderRadius)
                  }), this.image = ze(e, r), this.bounds = Q ? Ce(O(e, o, a)) : O(e, o, a), this.curvedBounds = J(this.bounds, this.style.border, this.style.borderRadius)
              }
              return function(A, e, t) {
                  e && Te(A.prototype, e)
              }(A, [{
                  key: "getClipPaths",
                  value: function() {
                      var A = this.parent ? this.parent.getClipPaths() : [];
                      return this.style.overflow !== EA.VISIBLE ? A.concat([k(this.curvedBounds)]) : A
                  }
              }, {
                  key: "isInFlow",
                  value: function() {
                      return this.isRootElement() && !this.isFloating() && !this.isAbsolutelyPositioned()
                  }
              }, {
                  key: "isVisible",
                  value: function() {
                      return !K(this.style.display, QA.NONE) && this.style.opacity > 0 && 0 === this.style.visibility
                  }
              }, {
                  key: "isAbsolutelyPositioned",
                  value: function() {
                      return this.style.position !== mA.STATIC && this.style.position !== mA.RELATIVE
                  }
              }, {
                  key: "isPositioned",
                  value: function() {
                      return this.style.position !== mA.STATIC
                  }
              }, {
                  key: "isFloating",
                  value: function() {
                      return 0 !== this.style.float
                  }
              }, {
                  key: "isRootElement",
                  value: function() {
                      return null === this.parent
                  }
              }, {
                  key: "isTransformed",
                  value: function() {
                      return null !== this.style.transform
                  }
              }, {
                  key: "isPositionedWithZIndex",
                  value: function() {
                      return this.isPositioned() && !this.style.zIndex.auto
                  }
              }, {
                  key: "isInlineLevel",
                  value: function() {
                      return K(this.style.display, QA.INLINE) || K(this.style.display, QA.INLINE_BLOCK) || K(this.style.display, QA.INLINE_FLEX) || K(this.style.display, QA.INLINE_GRID) || K(this.style.display, QA.INLINE_LIST_ITEM) || K(this.style.display, QA.INLINE_TABLE)
                  }
              }, {
                  key: "isInlineBlockOrInlineTable",
                  value: function() {
                      return K(this.style.display, QA.INLINE_BLOCK) || K(this.style.display, QA.INLINE_TABLE)
                  }
              }]), A
          }(),
          ze = function(A, e) {
              if (A instanceof A.ownerDocument.defaultView.SVGSVGElement || A instanceof SVGSVGElement) {
                  var t = new XMLSerializer;
                  return e.loadImage("data:image/svg+xml,".concat(encodeURIComponent(t.serializeToString(A))))
              }
              switch (A.tagName) {
                  case "IMG":
                      var r = A;
                      return e.loadImage(r.currentSrc || r.src);
                  case "CANVAS":
                      var n = A;
                      return e.loadCanvas(n);
                  case "IFRAME":
                      var B = A.getAttribute("data-html2canvas-internal-iframe-key");
                      if (B) return B
              }
              return null
          };
      function Le(A, e) {
          for (var t = 0; t < e.length; t++) {
              var r = e[t];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
          }
      }
      var Oe = function() {
              function A(e, t, r) {
                  ! function(A, e) {
                      if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
                  }(this, A), this.container = e, this.parent = t, this.contexts = [], this.children = [], this.treatAsRealStackingContext = r
              }
              return function(A, e, t) {
                  e && Le(A.prototype, e)
              }(A, [{
                  key: "getOpacity",
                  value: function() {
                      return this.parent ? this.container.style.opacity * this.parent.getOpacity() : this.container.style.opacity
                  }
              }, {
                  key: "getRealParentStackingContext",
                  value: function() {
                      return !this.parent || this.treatAsRealStackingContext ? this : this.parent.getRealParentStackingContext()
                  }
              }]), A
          }(),
          xe = ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"],
          Ve = function(A, e) {
              return A.isRootElement() || A.isPositionedWithZIndex() || A.style.opacity < 1 || A.isTransformed() || Je(A, e)
          },
          ke = function(A) {
              return A.isPositioned() || A.isFloating()
          },
          Je = function(A, e) {
              return "BODY" === e.nodeName && A.parent instanceof Xe && A.parent.style.background.backgroundColor.isTransparent()
          };
      function Re(A, e) {
          for (var t = 0; t < e.length; t++) {
              var r = e[t];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
          }
      }
      var _e = function() {
              function A(e) {
                  ! function(A, e) {
                      if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
                  }(this, A), this._data = {}, this._document = e
              }
              return function(A, e, t) {
                  e && Re(A.prototype, e)
              }(A, [{
                  key: "_parseMetrics",
                  value: function(A) {
                      var e = this._document.createElement("div"),
                          t = this._document.createElement("img"),
                          r = this._document.createElement("span"),
                          n = this._document.body;
                      if (!n) throw new Error("");
                      e.style.visibility = "hidden", e.style.fontFamily = A.fontFamily, e.style.fontSize = A.fontSize, e.style.margin = "0", e.style.padding = "0", n.appendChild(e), t.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", t.width = 1, t.height = 1, t.style.margin = "0", t.style.padding = "0", t.style.verticalAlign = "baseline", r.style.fontFamily = A.fontFamily, r.style.fontSize = A.fontSize, r.style.margin = "0", r.style.padding = "0", r.appendChild(this._document.createTextNode("Hidden Text")), e.appendChild(r), e.appendChild(t);
                      var B = t.offsetTop - r.offsetTop + 2;
                      e.removeChild(r), e.appendChild(this._document.createTextNode("Hidden Text")), e.style.lineHeight = "normal", t.style.verticalAlign = "super";
                      var s = t.offsetTop - e.offsetTop + 2;
                      return n.removeChild(e), {
                          baseline: B,
                          middle: s
                      }
                  }
              }, {
                  key: "getMetrics",
                  value: function(A) {
                      var e = "".concat(A.fontFamily, " ").concat(A.fontSize);
                      return void 0 === this._data[e] && (this._data[e] = this._parseMetrics(A)), this._data[e]
                  }
              }]), A
          }(),
          Pe = /([+-]?\d*\.?\d+)(deg|grad|rad|turn)/i;
      function Ge(A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
      }
      var We = /^(to )?(left|top|right|bottom)( (left|top|right|bottom))?$/i,
          Ye = /^([+-]?\d*\.?\d+)% ([+-]?\d*\.?\d+)%$/i,
          qe = /(px)|%|( 0)$/i,
          je = /^(from|to|color-stop)\((?:([\d.]+)(%)?,\s*)?(.+?)\)$/i,
          Ze = /^\s*(circle|ellipse)?\s*((?:([\d.]+)(px|r?em|%)\s*(?:([\d.]+)(px|r?em|%))?)|closest-side|closest-corner|farthest-side|farthest-corner)?\s*(?:at\s*(?:(left|center|right)|([\d.]+)(px|r?em|%))\s+(?:(top|center|bottom)|([\d.]+)(px|r?em|%)))?(?:\s|$)/i,
          $e = {
              left: new v("0%"),
              top: new v("0%"),
              center: new v("50%"),
              right: new v("100%"),
              bottom: new v("100%")
          },
          At = function(A, e, t) {
              for (var r = [], n = e; n < A.length; n++) {
                  var B = A[n],
                      s = qe.test(B),
                      o = B.lastIndexOf(" "),
                      a = new U(s ? B.substring(0, o) : B),
                      i = s ? new v(B.substring(o + 1)) : n === e ? new v("0%") : n === A.length - 1 ? new v("100%") : null;
                  r.push({
                      color: a,
                      stop: i
                  })
              }
              for (var c = r.map(function(A) {
                      var e = A.color,
                          r = A.stop;
                      return {
                          color: e,
                          stop: 0 === t ? 0 : r ? r.getAbsoluteValue(t) / t : null
                      }
                  }), Q = c[0].stop, l = 0; l < c.length; l++)
                  if (null !== Q) {
                      var w = c[l].stop;
                      if (null === w) {
                          for (var u = l; null === c[u].stop;) u++;
                          for (var g = u - l + 1, F = (c[u].stop - Q) / g; l < u; l++) Q = c[l].stop = Q + F
                      } else Q = w
                  }
              return c
          },
          et = function(A, e, t) {
              var r = function(A) {
                      var e = A.match(Pe);
                      if (e) {
                          var t = parseFloat(e[1]);
                          switch (e[2].toLowerCase()) {
                              case "deg":
                                  return Math.PI * t / 180;
                              case "grad":
                                  return Math.PI / 200 * t;
                              case "rad":
                                  return t;
                              case "turn":
                                  return 2 * Math.PI * t
                          }
                      }
                      return null
                  }(A[0]),
                  n = We.test(A[0]),
                  B = n || null !== r || Ye.test(A[0]),
                  s = B ? null !== r ? rt(t ? r - .5 * Math.PI : r, e) : n ? Bt(A[0], e) : st(A[0], e) : rt(Math.PI, e),
                  o = B ? 1 : 0,
                  a = Math.min(m(Math.abs(s.x0) + Math.abs(s.x1), Math.abs(s.y0) + Math.abs(s.y1)), 2 * e.width, 2 * e.height);
              return new function A(e, t) {
                  Ge(this, A), this.type = 0, this.colorStops = e, this.direction = t
              }(At(A, o, a), s)
          },
          tt = function(A, e, t) {
              var r = e[0].match(Ze),
                  n = r && ("circle" === r[1] || void 0 !== r[3] && void 0 === r[5]) ? 0 : 1,
                  B = {},
                  s = {};
              r && (void 0 !== r[3] && (B.x = I(A, r[3], r[4]).getAbsoluteValue(t.width)), void 0 !== r[5] && (B.y = I(A, r[5], r[6]).getAbsoluteValue(t.height)), r[7] ? s.x = $e[r[7].toLowerCase()] : void 0 !== r[8] && (s.x = I(A, r[8], r[9])), r[10] ? s.y = $e[r[10].toLowerCase()] : void 0 !== r[11] && (s.y = I(A, r[11], r[12])));
              var o = {
                      x: void 0 === s.x ? t.width / 2 : s.x.getAbsoluteValue(t.width),
                      y: void 0 === s.y ? t.height / 2 : s.y.getAbsoluteValue(t.height)
                  },
                  a = at(r && r[2] || "farthest-corner", n, o, B, t);
              return new function A(e, t, r, n) {
                  Ge(this, A), this.type = 1, this.colorStops = e, this.shape = t, this.center = r, this.radius = n
              }(At(e, r ? 1 : 0, Math.min(a.x, a.y)), n, o, a)
          },
          rt = function(A, e) {
              var t = e.width,
                  r = e.height,
                  n = .5 * t,
                  B = .5 * r,
                  s = (Math.abs(t * Math.sin(A)) + Math.abs(r * Math.cos(A))) / 2,
                  o = n + Math.sin(A) * s,
                  a = B - Math.cos(A) * s;
              return {
                  x0: o,
                  x1: t - o,
                  y0: a,
                  y1: r - a
              }
          },
          nt = function(A) {
              return Math.acos(A.width / 2 / (m(A.width, A.height) / 2))
          },
          Bt = function(A, e) {
              switch (A) {
                  case "bottom":
                  case "to top":
                      return rt(0, e);
                  case "left":
                  case "to right":
                      return rt(Math.PI / 2, e);
                  case "right":
                  case "to left":
                      return rt(3 * Math.PI / 2, e);
                  case "top right":
                  case "right top":
                  case "to bottom left":
                  case "to left bottom":
                      return rt(Math.PI + nt(e), e);
                  case "top left":
                  case "left top":
                  case "to bottom right":
                  case "to right bottom":
                      return rt(Math.PI - nt(e), e);
                  case "bottom left":
                  case "left bottom":
                  case "to top right":
                  case "to right top":
                      return rt(nt(e), e);
                  case "bottom right":
                  case "right bottom":
                  case "to top left":
                  case "to left top":
                      return rt(2 * Math.PI - nt(e), e);
                  case "top":
                  case "to bottom":
                  default:
                      return rt(Math.PI, e)
              }
          },
          st = function(A, e) {
              var t = function(A, e) {
                      return function(A) {
                          if (Array.isArray(A)) return A
                      }(A) || function(A, e) {
                          var t = [],
                              r = !0,
                              n = !1,
                              B = void 0;
                          try {
                              for (var s, o = A[Symbol.iterator](); !(r = (s = o.next()).done) && (t.push(s.value), !e || t.length !== e); r = !0);
                          } catch (A) {
                              n = !0, B = A
                          } finally {
                              try {
                                  r || null == o.return || o.return()
                              } finally {
                                  if (n) throw B
                              }
                          }
                          return t
                      }(A, e) || function() {
                          throw new TypeError("Invalid attempt to destructure non-iterable instance")
                      }()
                  }(A.split(" ").map(parseFloat), 2),
                  r = t[0],
                  n = t[1],
                  B = r / 100 * e.width / (n / 100 * e.height);
              return rt(Math.atan(isNaN(B) ? 1 : B) + Math.PI / 2, e)
          },
          ot = function(A, e, t, r) {
              return [{
                  x: 0,
                  y: 0
              }, {
                  x: 0,
                  y: A.height
              }, {
                  x: A.width,
                  y: 0
              }, {
                  x: A.width,
                  y: A.height
              }].reduce(function(A, n) {
                  var B = m(e - n.x, t - n.y);
                  return (r ? B < A.optimumDistance : B > A.optimumDistance) ? {
                      optimumCorner: n,
                      optimumDistance: B
                  } : A
              }, {
                  optimumDistance: r ? 1 / 0 : -1 / 0,
                  optimumCorner: null
              }).optimumCorner
          },
          at = function(A, e, t, r, n) {
              var B = t.x,
                  s = t.y,
                  o = 0,
                  a = 0;
              switch (A) {
                  case "closest-side":
                      0 === e ? o = a = Math.min(Math.abs(B), Math.abs(B - n.width), Math.abs(s), Math.abs(s - n.height)) : 1 === e && (o = Math.min(Math.abs(B), Math.abs(B - n.width)), a = Math.min(Math.abs(s), Math.abs(s - n.height)));
                      break;
                  case "closest-corner":
                      if (0 === e) o = a = Math.min(m(B, s), m(B, s - n.height), m(B - n.width, s), m(B - n.width, s - n.height));
                      else if (1 === e) {
                          var i = Math.min(Math.abs(s), Math.abs(s - n.height)) / Math.min(Math.abs(B), Math.abs(B - n.width)),
                              c = ot(n, B, s, !0);
                          a = i * (o = m(c.x - B, (c.y - s) / i))
                      }
                      break;
                  case "farthest-side":
                      0 === e ? o = a = Math.max(Math.abs(B), Math.abs(B - n.width), Math.abs(s), Math.abs(s - n.height)) : 1 === e && (o = Math.max(Math.abs(B), Math.abs(B - n.width)), a = Math.max(Math.abs(s), Math.abs(s - n.height)));
                      break;
                  case "farthest-corner":
                      if (0 === e) o = a = Math.max(m(B, s), m(B, s - n.height), m(B - n.width, s), m(B - n.width, s - n.height));
                      else if (1 === e) {
                          var Q = Math.max(Math.abs(s), Math.abs(s - n.height)) / Math.max(Math.abs(B), Math.abs(B - n.width)),
                              l = ot(n, B, s, !1);
                          a = Q * (o = m(l.x - B, (l.y - s) / Q))
                      }
                      break;
                  default:
                      o = r.x || 0, a = void 0 !== r.y ? r.y : o
              }
              return {
                  x: o,
                  y: a
              }
          },
          it = function(A) {
              var e = "",
                  t = "",
                  r = "",
                  n = "",
                  B = 0,
                  s = /^(left|center|right|\d+(?:px|r?em|%)?)(?:\s+(top|center|bottom|\d+(?:px|r?em|%)?))?$/i,
                  o = /^\d+(px|r?em|%)?(?:\s+\d+(px|r?em|%)?)?$/i,
                  a = A[B].match(s);
              a && B++;
              var i = A[B].match(/^(circle|ellipse)?\s*(closest-side|closest-corner|farthest-side|farthest-corner|contain|cover)?$/i);
              i && (e = i[1] || "", "contain" === (r = i[2] || "") ? r = "closest-side" : "cover" === r && (r = "farthest-corner"), B++);
              var c = A[B].match(o);
              c && B++;
              var Q = A[B].match(s);
              Q && B++;
              var l = A[B].match(o);
              l && B++;
              var w = Q || a;
              w && w[1] && (n = w[1] + (/^\d+$/.test(w[1]) ? "px" : ""), w[2] && (n += " " + w[2] + (/^\d+$/.test(w[2]) ? "px" : "")));
              var u = l || c;
              return u && (t = u[0], u[1] || (t += "px")), !n || e || t || r || (t = n, n = ""), n && (n = "at ".concat(n)), [
                  [e, r, t, n].filter(function(A) {
                      return !!A
                  }).join(" ")
              ].concat(A.slice(B))
          },
          ct = function(A) {
              return A.map(function(A) {
                  return A.match(je)
              }).map(function(e, t) {
                  if (!e) return A[t];
                  switch (e[1]) {
                      case "from":
                          return "".concat(e[4], " 0%");
                      case "to":
                          return "".concat(e[4], " 100%");
                      case "color-stop":
                          return "%" === e[3] ? "".concat(e[4], " ").concat(e[2]) : "".concat(e[4], " ").concat(100 * parseFloat(e[2]), "%")
                  }
              })
          };
      function Qt(A, e) {
          return function(A) {
              if (Array.isArray(A)) return A
          }(A) || function(A, e) {
              var t = [],
                  r = !0,
                  n = !1,
                  B = void 0;
              try {
                  for (var s, o = A[Symbol.iterator](); !(r = (s = o.next()).done) && (t.push(s.value), !e || t.length !== e); r = !0);
              } catch (A) {
                  n = !0, B = A
              } finally {
                  try {
                      r || null == o.return || o.return()
                  } finally {
                      if (n) throw B
                  }
              }
              return t
          }(A, e) || function() {
              throw new TypeError("Invalid attempt to destructure non-iterable instance")
          }()
      }
      function lt(A, e) {
          for (var t = 0; t < e.length; t++) {
              var r = e[t];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
          }
      }
      var wt = function() {
              function A(e, t) {
                  ! function(A, e) {
                      if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
                  }(this, A), this.target = e, this.options = t, e.render(t)
              }
              return function(A, e, t) {
                  e && lt(A.prototype, e)
              }(A, [{
                  key: "renderNode",
                  value: function(A) {
                      A.isVisible() && (this.renderNodeBackgroundAndBorders(A), this.renderNodeContent(A))
                  }
              }, {
                  key: "renderNodeContent",
                  value: function(A) {
                      var e = this,
                          t = function() {
                              if (A.childNodes.length && A.childNodes.forEach(function(t) {
                                      if (t instanceof jA) {
                                          var r = t.parent.style;
                                          e.target.renderTextNode(t.bounds, r.color, r.font, r.textDecoration, r.textShadow)
                                      } else e.target.drawShape(t, A.style.color)
                                  }), A.image) {
                                  var t = e.options.imageStore.get(A.image);
                                  if (t) {
                                      var r = function(A, e, t) {
                                              var r = e[0].value,
                                                  n = e[1].value,
                                                  B = e[2].value,
                                                  s = e[3].value;
                                              return new L(A.left + s + t[3].borderWidth, A.top + r + t[0].borderWidth, A.width - (t[1].borderWidth + t[3].borderWidth + s + n), A.height - (t[0].borderWidth + t[2].borderWidth + r + B))
                                          }(A.bounds, A.style.padding, A.style.border),
                                          n = "number" == typeof t.width && t.width > 0 ? t.width : r.width,
                                          B = "number" == typeof t.height && t.height > 0 ? t.height : r.height;
                                      n > 0 && B > 0 && e.target.clip([k(A.curvedBounds)], function() {
                                          e.target.drawImage(t, new L(0, 0, n, B), r)
                                      })
                                  }
                              }
                          },
                          r = A.getClipPaths();
                      r.length ? this.target.clip(r, t) : t()
                  }
              }, {
                  key: "renderNodeBackgroundAndBorders",
                  value: function(A) {
                      var e = this,
                          t = !A.style.background.backgroundColor.isTransparent() || A.style.background.backgroundImage.length,
                          r = A.style.border.some(function(A) {
                              return 0 !== A.borderStyle && !A.borderColor.isTransparent()
                          }),
                          n = function() {
                              var r = function(A, e) {
                                  switch (e) {
                                      case W.BORDER_BOX:
                                          return function(A) {
                                              return [A.topLeftOuter, A.topRightOuter, A.bottomRightOuter, A.bottomLeftOuter]
                                          }(A);
                                      case W.PADDING_BOX:
                                      default:
                                          return k(A)
                                  }
                              }(A.curvedBounds, A.style.background.backgroundClip);
                              t && e.target.clip([r], function() {
                                  A.style.background.backgroundColor.isTransparent() || e.target.fill(A.style.background.backgroundColor), e.renderBackgroundImage(A)
                              }), A.style.border.forEach(function(t, r) {
                                  0 === t.borderStyle || t.borderColor.isTransparent() || e.renderBorder(t, r, A.curvedBounds)
                              })
                          };
                      if (t || r) {
                          var B = A.parent ? A.parent.getClipPaths() : [];
                          B.length ? this.target.clip(B, n) : n()
                      }
                  }
              }, {
                  key: "renderBackgroundImage",
                  value: function(A) {
                      var e = this;
                      A.style.background.backgroundImage.slice(0).reverse().forEach(function(t) {
                          "url" === t.source.method && t.source.args.length ? e.renderBackgroundRepeat(A, t) : /gradient/i.test(t.source.method) && e.renderBackgroundGradient(A, t)
                      })
                  }
              }, {
                  key: "renderBackgroundRepeat",
                  value: function(A, e) {
                      var t = this.options.imageStore.get(e.source.args[0]);
                      if (t) {
                          var r = Z(A.style.background.backgroundOrigin, A.bounds, A.style.padding, A.style.border),
                              n = function(A, e, t) {
                                  var r = 0,
                                      n = 0,
                                      B = A.size;
                                  if (1 === B[0].size || 2 === B[0].size) {
                                      var s = t.width / t.height,
                                          o = e.width / e.height;
                                      return s < o != (2 === B[0].size) ? new D(t.width, t.width / o) : new D(t.height * o, t.height)
                                  }
                                  return B[0].value && (r = B[0].value.getAbsoluteValue(t.width)), 0 === B[0].size && 0 === B[1].size ? n = e.height : 0 === B[1].size ? n = r / e.width * e.height : B[1].value && (n = B[1].value.getAbsoluteValue(t.height)), 0 === B[0].size && (r = n / e.height * e.width), new D(r, n)
                              }(e, t, r),
                              B = $(e.position, n, r),
                              s = function(A, e, t, r, n) {
                                  switch (A.repeat) {
                                      case 2:
                                          return [new M(Math.round(n.left), Math.round(r.top + e.y)), new M(Math.round(n.left + n.width), Math.round(r.top + e.y)), new M(Math.round(n.left + n.width), Math.round(t.height + r.top + e.y)), new M(Math.round(n.left), Math.round(t.height + r.top + e.y))];
                                      case 3:
                                          return [new M(Math.round(r.left + e.x), Math.round(n.top)), new M(Math.round(r.left + e.x + t.width), Math.round(n.top)), new M(Math.round(r.left + e.x + t.width), Math.round(n.height + n.top)), new M(Math.round(r.left + e.x), Math.round(n.height + n.top))];
                                      case 1:
                                          return [new M(Math.round(r.left + e.x), Math.round(r.top + e.y)), new M(Math.round(r.left + e.x + t.width), Math.round(r.top + e.y)), new M(Math.round(r.left + e.x + t.width), Math.round(r.top + e.y + t.height)), new M(Math.round(r.left + e.x), Math.round(r.top + e.y + t.height))];
                                      default:
                                          return [new M(Math.round(n.left), Math.round(n.top)), new M(Math.round(n.left + n.width), Math.round(n.top)), new M(Math.round(n.left + n.width), Math.round(n.height + n.top)), new M(Math.round(n.left), Math.round(n.height + n.top))]
                                  }
                              }(e, B, n, r, A.bounds),
                              o = Math.round(r.left + B.x),
                              a = Math.round(r.top + B.y);
                          this.target.renderRepeat(s, t, n, o, a)
                      }
                  }
              }, {
                  key: "renderBackgroundGradient",
                  value: function(A, e) {
                      var t = Z(A.style.background.backgroundOrigin, A.bounds, A.style.padding, A.style.border),
                          r = function(A, e) {
                              var t = A.size,
                                  r = t[0].value ? t[0].value.getAbsoluteValue(e.width) : e.width,
                                  n = t[1].value ? t[1].value.getAbsoluteValue(e.height) : t[0].value ? r : e.height;
                              return new D(r, n)
                          }(e, t),
                          n = $(e.position, r, t),
                          B = new L(Math.round(t.left + n.x), Math.round(t.top + n.y), r.width, r.height),
                          s = function(A, e, t) {
                              var r = e.args,
                                  n = e.method,
                                  B = e.prefix;
                              return "linear-gradient" === n ? et(r, t, !!B) : "gradient" === n && "linear" === r[0] ? et(["to bottom"].concat(ct(r.slice(3))), t, !!B) : "radial-gradient" === n ? tt(A, "-webkit-" === B ? it(r) : r, t) : "gradient" === n && "radial" === r[0] ? tt(A, ct(it(r.slice(1))), t) : void 0
                          }(A, e.source, B);
                      if (s) switch (s.type) {
                          case 0:
                              this.target.renderLinearGradient(B, s);
                              break;
                          case 1:
                              this.target.renderRadialGradient(B, s)
                      }
                  }
              }, {
                  key: "renderBorder",
                  value: function(A, e, t) {
                      this.target.drawShape(function(A, e) {
                          switch (e) {
                              case 0:
                                  return V(A.topLeftOuter, A.topLeftInner, A.topRightOuter, A.topRightInner);
                              case 1:
                                  return V(A.topRightOuter, A.topRightInner, A.bottomRightOuter, A.bottomRightInner);
                              case 2:
                                  return V(A.bottomRightOuter, A.bottomRightInner, A.bottomLeftOuter, A.bottomLeftInner);
                              case 3:
                              default:
                                  return V(A.bottomLeftOuter, A.bottomLeftInner, A.topLeftOuter, A.topLeftInner)
                          }
                      }(t, e), A.borderColor)
                  }
              }, {
                  key: "renderStack",
                  value: function(A) {
                      var e = this;
                      if (A.container.isVisible()) {
                          var t = A.getOpacity();
                          t !== this._opacity && (this.target.setOpacity(A.getOpacity()), this._opacity = t);
                          var r = A.container.style.transform;
                          null !== r ? this.target.transform(A.container.bounds.left + r.transformOrigin[0].value, A.container.bounds.top + r.transformOrigin[1].value, r.transform, function() {
                              return e.renderStackContent(A)
                          }) : this.renderStackContent(A)
                      }
                  }
              }, {
                  key: "renderStackContent",
                  value: function(A) {
                      var e = Qt(Ut(A), 5),
                          t = e[0],
                          r = e[1],
                          n = e[2],
                          B = e[3],
                          s = e[4],
                          o = Qt(ut(A), 2),
                          a = o[0],
                          i = o[1];
                      this.renderNodeBackgroundAndBorders(A.container), t.sort(gt).forEach(this.renderStack, this), this.renderNodeContent(A.container), i.forEach(this.renderNode, this), B.forEach(this.renderStack, this), s.forEach(this.renderStack, this), a.forEach(this.renderNode, this), r.forEach(this.renderStack, this), n.sort(gt).forEach(this.renderStack, this)
                  }
              }, {
                  key: "render",
                  value: function(A) {
                      return this.options.backgroundColor && this.target.rectangle(this.options.x, this.options.y, this.options.width, this.options.height, this.options.backgroundColor), this.renderStack(A), this.target.getTarget()
                  }
              }]), A
          }(),
          ut = function(A) {
              for (var e = [], t = [], r = A.children.length, n = 0; n < r; n++) {
                  var B = A.children[n];
                  B.isInlineLevel() ? e.push(B) : t.push(B)
              }
              return [e, t]
          },
          Ut = function(A) {
              for (var e = [], t = [], r = [], n = [], B = [], s = A.contexts.length, o = 0; o < s; o++) {
                  var a = A.contexts[o];
                  a.container.isPositioned() || a.container.style.opacity < 1 || a.container.isTransformed() ? a.container.style.zIndex.order < 0 ? e.push(a) : a.container.style.zIndex.order > 0 ? r.push(a) : t.push(a) : a.container.isFloating() ? n.push(a) : B.push(a)
              }
              return [e, t, r, n, B]
          },
          gt = function(A, e) {
              return A.container.style.zIndex.order > e.container.style.zIndex.order ? 1 : A.container.style.zIndex.order < e.container.style.zIndex.order ? -1 : A.container.index > e.container.index ? 1 : -1
          },
          Ft = function(A, e) {
              if (!e.proxy) return Promise.reject(null);
              var t = e.proxy;
              return new Promise(function(r, n) {
                  var B = _A.SUPPORT_CORS_XHR && _A.SUPPORT_RESPONSE_TYPE ? "blob" : "text",
                      s = _A.SUPPORT_CORS_XHR ? new XMLHttpRequest : new XDomainRequest;
                  if (s.onload = function() {
                          if (s instanceof XMLHttpRequest)
                              if (200 === s.status)
                                  if ("text" === B) r(s.response);
                                  else {
                                      var A = new FileReader;
                                      A.addEventListener("load", function() {
                                          return r(A.result)
                                      }, !1), A.addEventListener("error", function(A) {
                                          return n(A)
                                      }, !1), A.readAsDataURL(s.response)
                                  }
                          else n("");
                          else r(s.responseText)
                      }, s.onerror = n, s.open("GET", "".concat(t, "?url=").concat(encodeURIComponent(A), "&responseType=").concat(B)), "text" !== B && s instanceof XMLHttpRequest && (s.responseType = B), e.imageTimeout) {
                      var o = e.imageTimeout;
                      s.timeout = o, s.ontimeout = function() {
                          return n("")
                      }
                  }
                  s.send()
              })
          };
      function Ct(A, e) {
          if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
      }
      function ht(A, e) {
          for (var t = 0; t < e.length; t++) {
              var r = e[t];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
          }
      }
      function dt(A, e, t) {
          return e && ht(A.prototype, e), t && ht(A, t), A
      }
      var Ht = function() {
              function A(e, t, r) {
                  Ct(this, A), this.options = e, this._window = r, this.origin = this.getOrigin(r.location.href), this.cache = {}, this.logger = t, this._index = 0
              }
              return dt(A, [{
                  key: "loadImage",
                  value: function(A) {
                      var e = this;
                      if (this.hasResourceInCache(A)) return A;
                      if (Nt(A)) return this.cache[A] = vt(A, this.options.imageTimeout || 0), A;
                      if (!yt(A) || _A.SUPPORT_SVG_DRAWING) {
                          if (!0 === this.options.allowTaint || mt(A) || this.isSameOrigin(A)) return this.addImage(A, A, !1);
                          if (!this.isSameOrigin(A)) {
                              if ("string" == typeof this.options.proxy) return this.cache[A] = Ft(A, this.options).then(function(A) {
                                  return vt(A, e.options.imageTimeout || 0)
                              }), A;
                              if (!0 === this.options.useCORS && _A.SUPPORT_CORS_IMAGES) return this.addImage(A, A, !0)
                          }
                      }
                  }
              }, {
                  key: "inlineImage",
                  value: function(A) {
                      var e = this;
                      return mt(A) ? vt(A, this.options.imageTimeout || 0) : this.hasResourceInCache(A) ? this.cache[A] : this.isSameOrigin(A) || "string" != typeof this.options.proxy ? this.xhrImage(A) : this.cache[A] = Ft(A, this.options).then(function(A) {
                          return vt(A, e.options.imageTimeout || 0)
                      })
                  }
              }, {
                  key: "xhrImage",
                  value: function(A) {
                      var e = this;
                      return this.cache[A] = new Promise(function(t, r) {
                          var n = new XMLHttpRequest;
                          if (n.onreadystatechange = function() {
                                  if (4 === n.readyState)
                                      if (200 !== n.status) r("Failed to fetch image ".concat(A.substring(0, 256), " with status code ").concat(n.status));
                                      else {
                                          var e = new FileReader;
                                          e.addEventListener("load", function() {
                                              var A = e.result;
                                              t(A)
                                          }, !1), e.addEventListener("error", function(A) {
                                              return r(A)
                                          }, !1), e.readAsDataURL(n.response)
                                      }
                              }, n.responseType = "blob", e.options.imageTimeout) {
                              var B = e.options.imageTimeout;
                              n.timeout = B, n.ontimeout = function() {
                                  return r("")
                              }
                          }
                          n.open("GET", A, !0), n.send()
                      }).then(function(A) {
                          return vt(A, e.options.imageTimeout || 0)
                      }), this.cache[A]
                  }
              }, {
                  key: "loadCanvas",
                  value: function(A) {
                      var e = String(this._index++);
                      return this.cache[e] = Promise.resolve(A), e
                  }
              }, {
                  key: "hasResourceInCache",
                  value: function(A) {
                      return void 0 !== this.cache[A]
                  }
              }, {
                  key: "addImage",
                  value: function(A, e, t) {
                      var r = this;
                      return this.cache[A] = new Promise(function(A, n) {
                          var B = new Image;
                          if (B.onload = function() {
                                  return A(B)
                              }, (bt(e) || t) && (B.crossOrigin = "anonymous"), B.onerror = n, B.src = e, !0 === B.complete && setTimeout(function() {
                                  A(B)
                              }, 500), r.options.imageTimeout) {
                              var s = r.options.imageTimeout;
                              setTimeout(function() {
                                  return n("")
                              }, s)
                          }
                      }), A
                  }
              }, {
                  key: "isSameOrigin",
                  value: function(A) {
                      return this.getOrigin(A) === this.origin
                  }
              }, {
                  key: "getOrigin",
                  value: function(A) {
                      var e = this._link || (this._link = this._window.document.createElement("a"));
                      return e.href = A, e.href = e.href, e.protocol + e.hostname + e.port
                  }
              }, {
                  key: "ready",
                  value: function() {
                      var A = this,
                          e = Object.keys(this.cache),
                          t = e.map(function(e) {
                              return A.cache[e].catch(function(A) {
                                  return null
                              })
                          });
                      return Promise.all(t).then(function(A) {
                          return new ft(e, A)
                      })
                  }
              }]), A
          }(),
          ft = function() {
              function A(e, t) {
                  Ct(this, A), this._keys = e, this._resources = t
              }
              return dt(A, [{
                  key: "get",
                  value: function(A) {
                      var e = this._keys.indexOf(A);
                      return -1 === e ? null : this._resources[e]
                  }
              }]), A
          }(),
          Et = /^data:image\/svg\+xml/i,
          pt = /^data:image\/.*;base64,/i,
          Kt = /^data:image\/.*/i,
          mt = function(A) {
              return Kt.test(A)
          },
          bt = function(A) {
              return pt.test(A)
          },
          Nt = function(A) {
              return "blob" === A.substr(0, 4)
          },
          yt = function(A) {
              return "svg" === A.substr(-3).toLowerCase() || Et.test(A)
          },
          vt = function(A, e) {
              return new Promise(function(t, r) {
                  var n = new Image;
                  n.onload = function() {
                      return t(n)
                  }, n.onerror = r, n.src = A, !0 === n.complete && setTimeout(function() {
                      t(n)
                  }, 500), e && setTimeout(function() {
                      return r("")
                  }, e)
              })
          };
      function It(A, e) {
          return function(A) {
              if (Array.isArray(A)) return A
          }(A) || function(A, e) {
              var t = [],
                  r = !0,
                  n = !1,
                  B = void 0;
              try {
                  for (var s, o = A[Symbol.iterator](); !(r = (s = o.next()).done) && (t.push(s.value), !e || t.length !== e); r = !0);
              } catch (A) {
                  n = !0, B = A
              } finally {
                  try {
                      r || null == o.return || o.return()
                  } finally {
                      if (n) throw B
                  }
              }
              return t
          }(A, e) || function() {
              throw new TypeError("Invalid attempt to destructure non-iterable instance")
          }()
      }
      var Dt = function(A, e, t) {
              if (!e || !e.content || "none" === e.content || "-moz-alt-content" === e.content || "none" === e.display) return null;
              var r = Mt(e.content),
                  n = r.length,
                  B = [],
                  s = "",
                  o = e.counterIncrement;
              if (o && "none" !== o) {
                  var a = It(o.split(/\s+/), 2),
                      i = a[0],
                      c = a[1],
                      Q = t.counters[i];
                  Q && (Q[Q.length - 1] += void 0 === c ? 1 : parseInt(c, 10))
              }
              for (var l = 0; l < n; l++) {
                  var w = r[l];
                  switch (w.type) {
                      case 0:
                          s += w.value || "";
                          break;
                      case 1:
                          A instanceof HTMLElement && w.value && (s += A.getAttribute(w.value) || "");
                          break;
                      case 3:
                          var u = t.counters[w.name || ""];
                          u && (s += Xt([u[u.length - 1]], "", w.format));
                          break;
                      case 4:
                          var U = t.counters[w.name || ""];
                          U && (s += Xt(U, w.glue, w.format));
                          break;
                      case 5:
                          s += St(e, !0, t.quoteDepth), t.quoteDepth++;
                          break;
                      case 6:
                          t.quoteDepth--, s += St(e, !1, t.quoteDepth);
                          break;
                      case 2:
                          s && (B.push({
                              type: 0,
                              value: s
                          }), s = ""), B.push({
                              type: 1,
                              value: w.value || ""
                          })
                  }
              }
              return s && B.push({
                  type: 0,
                  value: s
              }), B
          },
          Mt = function(A, e) {
              if (e && e[A]) return e[A];
              for (var t = [], r = A.length, n = !1, B = !1, s = !1, o = "", a = "", i = [], c = 0; c < r; c++) {
                  var Q = A.charAt(c);
                  switch (Q) {
                      case "'":
                      case '"':
                          B ? o += Q : (n = !n, s || n || (t.push({
                              type: 0,
                              value: o
                          }), o = ""));
                          break;
                      case "\\":
                          B ? (o += Q, B = !1) : B = !0;
                          break;
                      case "(":
                          n ? o += Q : (s = !0, a = o, o = "", i = []);
                          break;
                      case ")":
                          if (n) o += Q;
                          else if (s) {
                              switch (o && i.push(o), a) {
                                  case "attr":
                                      i.length > 0 && t.push({
                                          type: 1,
                                          value: i[0]
                                      });
                                      break;
                                  case "counter":
                                      if (i.length > 0) {
                                          var l = {
                                              type: 3,
                                              name: i[0]
                                          };
                                          i.length > 1 && (l.format = i[1]), t.push(l)
                                      }
                                      break;
                                  case "counters":
                                      if (i.length > 0) {
                                          var w = {
                                              type: 4,
                                              name: i[0]
                                          };
                                          i.length > 1 && (w.glue = i[1]), i.length > 2 && (w.format = i[2]), t.push(w)
                                      }
                                      break;
                                  case "url":
                                      i.length > 0 && t.push({
                                          type: 2,
                                          value: i[0]
                                      })
                              }
                              s = !1, o = ""
                          }
                          break;
                      case ",":
                          n ? o += Q : s && (i.push(o), o = "");
                          break;
                      case " ":
                      case "\t":
                          n ? o += Q : o && (Tt(t, o), o = "");
                          break;
                      default:
                          o += Q
                  }
                  "\\" !== Q && (B = !1)
              }
              return o && Tt(t, o), e && (e[A] = t), t
          },
          Tt = function(A, e) {
              switch (e) {
                  case "open-quote":
                      A.push({
                          type: 5
                      });
                      break;
                  case "close-quote":
                      A.push({
                          type: 6
                      })
              }
          },
          St = function(A, e, t) {
              var r = A.quotes ? A.quotes.split(/\s+/) : ["'\"'", "'\"'"],
                  n = 2 * t;
              return n >= r.length && (n = r.length - 2), e || ++n, r[n].replace(/^["']|["']$/g, "")
          },
          Xt = function(A, e, t) {
              for (var r = A.length, n = "", B = 0; B < r; B++) B > 0 && (n += e || ""), n += Me(A[B], CA(t || "decimal"), !1);
              return n
          };
      function zt(A, e) {
          for (var t = 0; t < e.length; t++) {
              var r = e[t];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(A, r.key, r)
          }
      }
      var Lt = function() {
              function A(e, t, r, n, B) {
                  ! function(A, e) {
                      if (!(A instanceof e)) throw new TypeError("Cannot call a class as a function")
                  }(this, A), this.referenceElement = e, this.scrolledElements = [], this.copyStyles = n, this.inlineImages = n, this.logger = r, this.options = t, this.renderer = B, this.resourceLoader = new Ht(t, r, window), this.pseudoContentData = {
                      counters: {},
                      quoteDepth: 0
                  }, this.documentElement = this.cloneNode(e.ownerDocument.documentElement)
              }
              return function(A, e, t) {
                  e && zt(A.prototype, e)
              }(A, [{
                  key: "inlineAllImages",
                  value: function(A) {
                      var e = this;
                      if (this.inlineImages && A) {
                          var t = A.style;
                          Promise.all(sA(t.backgroundImage).map(function(A) {
                              return "url" === A.method ? e.resourceLoader.inlineImage(A.args[0]).then(function(A) {
                                  return A && "string" == typeof A.src ? 'url("'.concat(A.src, '")') : "none"
                              }).catch(function(A) {}) : Promise.resolve("".concat(A.prefix).concat(A.method, "(").concat(A.args.join(","), ")"))
                          })).then(function(A) {
                              A.length > 1 && (t.backgroundColor = ""), t.backgroundImage = A.join(",")
                          }), A instanceof HTMLImageElement && this.resourceLoader.inlineImage(A.src).then(function(e) {
                              if (e && A instanceof HTMLImageElement && A.parentNode) {
                                  var t = A.parentNode,
                                      r = b(A.style, e.cloneNode(!1));
                                  t.replaceChild(r, A)
                              }
                          }).catch(function(A) {})
                      }
                  }
              }, {
                  key: "inlineFonts",
                  value: function(A) {
                      var e = this;
                      return Promise.all(Array.from(A.styleSheets).map(function(e) {
                          return e.href ? fetch(e.href).then(function(A) {
                              return A.text()
                          }).then(function(A) {
                              return xt(A, e.href)
                          }).catch(function(A) {
                              return []
                          }) : Ot(e, A)
                      })).then(function(A) {
                          return A.reduce(function(A, e) {
                              return A.concat(e)
                          }, [])
                      }).then(function(A) {
                          return Promise.all(A.map(function(A) {
                              return fetch(A.formats[0].src).then(function(A) {
                                  return A.blob()
                              }).then(function(A) {
                                  return new Promise(function(e, t) {
                                      var r = new FileReader;
                                      r.onerror = t, r.onload = function() {
                                          var A = r.result;
                                          e(A)
                                      }, r.readAsDataURL(A)
                                  })
                              }).then(function(e) {
                                  return A.fontFace.setProperty("src", 'url("'.concat(e, '")')), "@font-face {".concat(A.fontFace.cssText, " ")
                              })
                          }))
                      }).then(function(t) {
                          var r = A.createElement("style");
                          r.textContent = t.join("\n"), e.documentElement.appendChild(r)
                      })
                  }
              }, {
                  key: "createElementClone",
                  value: function(A) {
                      var e = this;
                      if (this.copyStyles && A instanceof HTMLCanvasElement) {
                          var t = A.ownerDocument.createElement("img");
                          try {
                              return t.src = A.toDataURL(), t
                          } catch (A) {}
                      }
                      if (A instanceof HTMLIFrameElement) {
                          var r = A.cloneNode(!1),
                              n = qt();
                          r.setAttribute("data-html2canvas-internal-iframe-key", n);
                          var B = O(A, 0, 0),
                              s = B.width,
                              o = B.height;
                          return this.resourceLoader.cache[n] = Zt(A, this.options).then(function(A) {
                              return e.renderer(A, {
                                  allowTaint: e.options.allowTaint,
                                  backgroundColor: "#ffffff",
                                  canvas: null,
                                  imageTimeout: e.options.imageTimeout,
                                  logging: e.options.logging,
                                  proxy: e.options.proxy,
                                  removeContainer: e.options.removeContainer,
                                  scale: e.options.scale,
                                  foreignObjectRendering: e.options.foreignObjectRendering,
                                  useCORS: e.options.useCORS,
                                  target: new f,
                                  width: s,
                                  height: o,
                                  x: 0,
                                  y: 0,
                                  windowWidth: A.ownerDocument.defaultView.innerWidth,
                                  windowHeight: A.ownerDocument.defaultView.innerHeight,
                                  scrollX: A.ownerDocument.defaultView.pageXOffset,
                                  scrollY: A.ownerDocument.defaultView.pageYOffset
                              }, e.logger.child(n))
                          }).then(function(e) {
                              return new Promise(function(t, n) {
                                  var B = document.createElement("img");
                                  B.onload = function() {
                                      return t(e)
                                  }, B.onerror = function(A) {
                                      "data:," == B.src ? t(e) : n(A)
                                  }, B.src = e.toDataURL(), r.parentNode && r.parentNode.replaceChild(b(A.ownerDocument.defaultView.getComputedStyle(A), B), r)
                              })
                          }), r
                      }
                      try {
                          if (A instanceof HTMLStyleElement && A.sheet && A.sheet.cssRules) {
                              var a = [].slice.call(A.sheet.cssRules, 0).reduce(function(A, e) {
                                      return e && e.cssText ? A + e.cssText : A
                                  }, ""),
                                  i = A.cloneNode(!1);
                              return i.textContent = a, i
                          }
                      } catch (A) {
                          if (this.logger.log("Unable to access cssRules property"), "SecurityError" !== A.name) throw this.logger.log(A), A
                      }
                      return A.cloneNode(!1)
                  }
              }, {
                  key: "cloneNode",
                  value: function(A) {
                      var e = A.nodeType === Node.TEXT_NODE ? document.createTextNode(A.nodeValue) : this.createElementClone(A),
                          t = A.ownerDocument.defaultView,
                          r = A instanceof t.HTMLElement ? t.getComputedStyle(A) : null,
                          n = A instanceof t.HTMLElement ? t.getComputedStyle(A, ":before") : null,
                          B = A instanceof t.HTMLElement ? t.getComputedStyle(A, ":after") : null;
                      this.referenceElement === A && e instanceof t.HTMLElement && (this.clonedReferenceElement = e), e instanceof t.HTMLBodyElement && Gt(e);
                      for (var s = function(A, e) {
                              if (!A || !A.counterReset || "none" === A.counterReset) return [];
                              for (var t = [], r = A.counterReset.split(/\s*,\s*/), n = r.length, B = 0; B < n; B++) {
                                  var s = It(r[B].split(/\s+/), 2),
                                      o = s[0],
                                      a = s[1];
                                  t.push(o);
                                  var i = e.counters[o];
                                  i || (i = e.counters[o] = []), i.push(parseInt(a || 0, 10))
                              }
                              return t
                          }(r, this.pseudoContentData), o = Dt(A, n, this.pseudoContentData), a = A.firstChild; a; a = a.nextSibling) a.nodeType === Node.ELEMENT_NODE && ("SCRIPT" === a.nodeName || a.hasAttribute("data-html2canvas-ignore") || "function" == typeof this.options.ignoreElements && this.options.ignoreElements(a)) || this.copyStyles && "STYLE" === a.nodeName || e.appendChild(this.cloneNode(a));
                      var i = Dt(A, B, this.pseudoContentData);
                      if (function(A, e) {
                              for (var t = A.length, r = 0; r < t; r++) e.counters[A[r]].pop()
                          }(s, this.pseudoContentData), A instanceof t.HTMLElement && e instanceof t.HTMLElement) switch (n && this.inlineAllImages(kt(A, e, n, o, Jt)), B && this.inlineAllImages(kt(A, e, B, i, Rt)), !r || !this.copyStyles || A instanceof HTMLIFrameElement || b(r, e), this.inlineAllImages(e), 0 === A.scrollTop && 0 === A.scrollLeft || this.scrolledElements.push([e, A.scrollLeft, A.scrollTop]), A.nodeName) {
                          case "CANVAS":
                              this.copyStyles || Vt(A, e);
                              break;
                          case "TEXTAREA":
                          case "SELECT":
                              e.value = A.value
                      }
                      return e
                  }
              }]), A
          }(),
          Ot = function(A, e) {
              return (A.cssRules ? Array.from(A.cssRules) : []).filter(function(A) {
                  return A.type === CSSRule.FONT_FACE_RULE
              }).map(function(A) {
                  for (var t = sA(A.style.getPropertyValue("src")), r = [], n = 0; n < t.length; n++)
                      if ("url" === t[n].method && t[n + 1] && "format" === t[n + 1].method) {
                          var B = e.createElement("a");
                          B.href = t[n].args[0], e.body && e.body.appendChild(B);
                          var s = {
                              src: B.href,
                              format: t[n + 1].args[0]
                          };
                          r.push(s)
                      }
                  return {
                      formats: r.filter(function(A) {
                          return /^woff/i.test(A.format)
                      }),
                      fontFace: A.style
                  }
              }).filter(function(A) {
                  return A.formats.length
              })
          },
          xt = function(A, e) {
              var t = document.implementation.createHTMLDocument(""),
                  r = document.createElement("base");
              r.href = e;
              var n = document.createElement("style");
              return n.textContent = A, t.head && t.head.appendChild(r), t.body && t.body.appendChild(n), n.sheet ? Ot(n.sheet, t) : []
          },
          Vt = function(A, e) {
              try {
                  if (e) {
                      e.width = A.width, e.height = A.height;
                      var t = A.getContext("2d"),
                          r = e.getContext("2d");
                      t ? r.putImageData(t.getImageData(0, 0, A.width, A.height), 0, 0) : r.drawImage(A, 0, 0)
                  }
              } catch (A) {}
          },
          kt = function(A, e, t, r, n) {
              if (t && t.content && "none" !== t.content && "-moz-alt-content" !== t.content && "none" !== t.display) {
                  var B = e.ownerDocument.createElement("html2canvaspseudoelement");
                  if (b(t, B), r)
                      for (var s = r.length, o = 0; o < s; o++) {
                          var a = r[o];
                          switch (a.type) {
                              case 1:
                                  var i = e.ownerDocument.createElement("img");
                                  i.src = sA("url(".concat(a.value, ")"))[0].args[0], i.style.opacity = "1", B.appendChild(i);
                                  break;
                              case 0:
                                  B.appendChild(e.ownerDocument.createTextNode(a.value))
                          }
                      }
                  return B.className = "".concat(_t, " ").concat(Pt), e.className += " ".concat(n === Jt ? _t : Pt), n === Jt ? e.insertBefore(B, e.firstChild) : e.appendChild(B), B
              }
          },
          Jt = ":before",
          Rt = ":after",
          _t = "___html2canvas___pseudoelement_before",
          Pt = "___html2canvas___pseudoelement_after",
          Gt = function(A) {
              Wt(A, ".".concat(_t).concat(Jt).concat('{\n    content: "" !important;\n    display: none !important;\n}', "\n         .").concat(Pt).concat(Rt).concat('{\n    content: "" !important;\n    display: none !important;\n}'))
          },
          Wt = function(A, e) {
              var t = A.ownerDocument.createElement("style");
              t.innerHTML = e, A.appendChild(t)
          },
          Yt = function(A) {
              var e = function(A, e) {
                      return function(A) {
                          if (Array.isArray(A)) return A
                      }(A) || function(A, e) {
                          var t = [],
                              r = !0,
                              n = !1,
                              B = void 0;
                          try {
                              for (var s, o = A[Symbol.iterator](); !(r = (s = o.next()).done) && (t.push(s.value), !e || t.length !== e); r = !0);
                          } catch (A) {
                              n = !0, B = A
                          } finally {
                              try {
                                  r || null == o.return || o.return()
                              } finally {
                                  if (n) throw B
                              }
                          }
                          return t
                      }(A, e) || function() {
                          throw new TypeError("Invalid attempt to destructure non-iterable instance")
                      }()
                  }(A, 3),
                  t = e[0],
                  r = e[1],
                  n = e[2];
              t.scrollLeft = r, t.scrollTop = n
          },
          qt = function() {
              return Math.ceil(Date.now() + 1e7 * Math.random()).toString(16)
          },
          jt = /^data:text\/(.+);(base64)?,(.*)$/i,
          Zt = function(A, e) {
              try {
                  return Promise.resolve(A.contentWindow.document.documentElement)
              } catch (t) {
                  return e.proxy ? Ft(A.src, e).then(function(A) {
                      var e = A.match(jt);
                      return e ? "base64" === e[2] ? window.atob(decodeURIComponent(e[3])) : decodeURIComponent(e[3]) : Promise.reject()
                  }).then(function(e) {
                      return $t(A.ownerDocument, O(A, 0, 0)).then(function(A) {
                          var t = A.contentWindow.document;
                          t.open(), t.write(e);
                          var r = Ar(A).then(function() {
                              return t.documentElement
                          });
                          return t.close(), r
                      })
                  }) : Promise.reject()
              }
          },
          $t = function(A, e) {
              var t = A.createElement("iframe");
              return t.className = "html2canvas-container", t.style.visibility = "hidden", t.style.position = "fixed", t.style.left = "-10000px", t.style.top = "0px", t.style.border = "0", t.width = e.width.toString(), t.height = e.height.toString(), t.scrolling = "no", t.setAttribute("data-html2canvas-ignore", "true"), A.body ? (A.body.appendChild(t), Promise.resolve(t)) : Promise.reject("")
          },
          Ar = function(A) {
              var e = A.contentWindow,
                  t = e.document;
              return new Promise(function(r, n) {
                  e.onload = A.onload = t.onreadystatechange = function() {
                      var e = setInterval(function() {
                          t.body.childNodes.length > 0 && "complete" === t.readyState && (clearInterval(e), r(A))
                      }, 50)
                  }
              })
          };
      var er = function A(e, t, r) {
          var n = e.ownerDocument,
              B = new L(t.scrollX, t.scrollY, t.windowWidth, t.windowHeight),
              s = n.documentElement ? new U(getComputedStyle(n.documentElement).backgroundColor) : F,
              o = n.body ? new U(getComputedStyle(n.body).backgroundColor) : F,
              a = e === n.documentElement ? s.isTransparent() ? o.isTransparent() ? t.backgroundColor ? new U(t.backgroundColor) : null : o : s : t.backgroundColor ? new U(t.backgroundColor) : null;
          return (t.foreignObjectRendering ? _A.SUPPORT_FOREIGNOBJECT_DRAWING : Promise.resolve(!1)).then(function(s) {
              return s ? function(A) {
                  return A.inlineFonts(n).then(function() {
                      return A.resourceLoader.ready()
                  }).then(function() {
                      var B = new xA(A.documentElement),
                          s = n.defaultView,
                          o = s.pageXOffset,
                          i = s.pageYOffset,
                          c = "HTML" === e.tagName || "BODY" === e.tagName ? x(n) : O(e, o, i),
                          Q = c.width,
                          l = c.height,
                          w = c.left,
                          u = c.top;
                      return B.render({
                          backgroundColor: a,
                          logger: r,
                          scale: t.scale,
                          x: "number" == typeof t.x ? t.x : w,
                          y: "number" == typeof t.y ? t.y : u,
                          width: "number" == typeof t.width ? t.width : Math.ceil(Q),
                          height: "number" == typeof t.height ? t.height : Math.ceil(l),
                          windowWidth: t.windowWidth,
                          windowHeight: t.windowHeight,
                          scrollX: t.scrollX,
                          scrollY: t.scrollY
                      })
                  })
              }(new Lt(e, t, r, !0, A)) : function(A, e, t, r, n, B) {
                  var s = new Lt(t, r, n, !1, B),
                      o = A.defaultView.pageXOffset,
                      a = A.defaultView.pageYOffset;
                  return $t(A, e).then(function(n) {
                      var B = n.contentWindow,
                          i = B.document,
                          c = Ar(n).then(function() {
                              s.scrolledElements.forEach(Yt), B.scrollTo(e.left, e.top), !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) || B.scrollY === e.top && B.scrollX === e.left || (i.documentElement.style.top = -e.top + "px", i.documentElement.style.left = -e.left + "px", i.documentElement.style.position = "absolute");
                              var t = Promise.resolve([n, s.clonedReferenceElement, s.resourceLoader]),
                                  o = r.onclone;
                              return s.clonedReferenceElement instanceof B.HTMLElement || s.clonedReferenceElement instanceof A.defaultView.HTMLElement || s.clonedReferenceElement instanceof HTMLElement ? "function" == typeof o ? Promise.resolve().then(function() {
                                  return o(i)
                              }).then(function() {
                                  return t
                              }) : t : Promise.reject("")
                          });
                      return i.open(), i.write("".concat(function(A) {
                              var e = "";
                              return A && (e += "<!DOCTYPE ", A.name && (e += A.name), A.internalSubset && (e += A.internalSubset), A.publicId && (e += '"'.concat(A.publicId, '"')), A.systemId && (e += '"'.concat(A.systemId, '"')), e += ">"), e
                          }(document.doctype), "<html></html>")),
                          function(A, e, t) {
                              !A.defaultView || e === A.defaultView.pageXOffset && t === A.defaultView.pageYOffset || A.defaultView.scrollTo(e, t)
                          }(t.ownerDocument, o, a), i.replaceChild(i.adoptNode(s.documentElement), i.documentElement), i.close(), c
                  })
              }(n, B, e, t, r, A).then(function(A) {
                  var e = function(A, e) {
                          return function(A) {
                              if (Array.isArray(A)) return A
                          }(A) || function(A, e) {
                              var t = [],
                                  r = !0,
                                  n = !1,
                                  B = void 0;
                              try {
                                  for (var s, o = A[Symbol.iterator](); !(r = (s = o.next()).done) && (t.push(s.value), !e || t.length !== e); r = !0);
                              } catch (A) {
                                  n = !0, B = A
                              } finally {
                                  try {
                                      r || null == o.return || o.return()
                                  } finally {
                                      if (n) throw B
                                  }
                              }
                              return t
                          }(A, e) || function() {
                              throw new TypeError("Invalid attempt to destructure non-iterable instance")
                          }()
                      }(A, 3),
                      B = e[0],
                      s = e[1],
                      o = e[2],
                      i = function(A, e, t) {
                          var r = 0,
                              n = new Xe(A, null, e, r++),
                              B = new Oe(n, null, !0);
                          return function A(e, t, r, n, B) {
                              for (var s, o = e.firstChild; o; o = s) {
                                  s = o.nextSibling;
                                  var a = o.ownerDocument.defaultView;
                                  if (o instanceof a.Text || o instanceof Text || a.parent && o instanceof a.parent.Text) o.data.trim().length > 0 && t.childNodes.push(jA.fromTextNode(o, t));
                                  else if (o instanceof a.HTMLElement || o instanceof HTMLElement || a.parent && o instanceof a.parent.HTMLElement) {
                                      if (-1 === xe.indexOf(o.nodeName)) {
                                          var i = new Xe(o, t, n, B++);
                                          if (i.isVisible()) {
                                              "INPUT" === o.tagName ? Ue(o, i) : "TEXTAREA" === o.tagName ? ge(o, i) : "SELECT" === o.tagName ? Fe(o, i) : i.style.listStyle && -1 !== i.style.listStyle.listStyleType && Ee(o, i, n);
                                              var c = "TEXTAREA" !== o.tagName,
                                                  Q = Ve(i, o);
                                              if (Q || ke(i)) {
                                                  var l = Q || i.isPositioned() ? r.getRealParentStackingContext() : r,
                                                      w = new Oe(i, l, Q);
                                                  l.contexts.push(w), c && A(o, i, w, n, B)
                                              } else r.children.push(i), c && A(o, i, r, n, B)
                                          }
                                      }
                                  } else if (o instanceof a.SVGSVGElement || o instanceof SVGSVGElement || a.parent && o instanceof a.parent.SVGSVGElement) {
                                      var u = new Xe(o, t, n, B++),
                                          U = Ve(u, o);
                                      if (U || ke(u)) {
                                          var g = U || u.isPositioned() ? r.getRealParentStackingContext() : r,
                                              F = new Oe(u, g, U);
                                          g.contexts.push(F)
                                      } else r.children.push(u)
                                  }
                              }
                          }(A, n, B, e, 1), B
                      }(s, o),
                      c = s.ownerDocument;
                  return a === i.container.style.background.backgroundColor && (i.container.style.background.backgroundColor = F), o.ready().then(function(A) {
                      var e = new _e(c),
                          o = c.defaultView,
                          Q = o.pageXOffset,
                          l = o.pageYOffset,
                          w = "HTML" === s.tagName || "BODY" === s.tagName ? x(n) : O(s, Q, l),
                          u = w.width,
                          U = w.height,
                          g = w.left,
                          F = w.top,
                          C = {
                              backgroundColor: a,
                              fontMetrics: e,
                              imageStore: A,
                              logger: r,
                              scale: t.scale,
                              x: "number" == typeof t.x ? t.x : g,
                              y: "number" == typeof t.y ? t.y : F,
                              width: "number" == typeof t.width ? t.width : Math.ceil(u),
                              height: "number" == typeof t.height ? t.height : Math.ceil(U)
                          };
                      if (Array.isArray(t.target)) return Promise.all(t.target.map(function(A) {
                          return new wt(A, C).render(i)
                      }));
                      var h = new wt(t.target, C).render(i);
                      return !0 === t.removeContainer && B.parentNode && B.parentNode.removeChild(B), h
                  })
              })
          })
      };
      function tr(A, e, t) {
          return e in A ? Object.defineProperty(A, e, {
              value: t,
              enumerable: !0,
              configurable: !0,
              writable: !0
          }) : A[e] = t, A
      }
      var rr = function(A, e) {
          var t = e || {},
              r = new p("boolean" != typeof t.logging || t.logging);
          r.log("html2canvas ".concat("1.0.0-rc.1"));
          var n = A.ownerDocument;
          if (!n) return Promise.reject("Provided element is not within a Document");
          var B = n.defaultView,
              s = {
                  allowTaint: !1,
                  backgroundColor: "#ffffff",
                  imageTimeout: 15e3,
                  logging: !0,
                  proxy: null,
                  removeContainer: !0,
                  foreignObjectRendering: !1,
                  scale: B.devicePixelRatio || 1,
                  target: new f(t.canvas),
                  useCORS: !1,
                  windowWidth: B.innerWidth,
                  windowHeight: B.innerHeight,
                  scrollX: B.pageXOffset,
                  scrollY: B.pageYOffset
              };
          return er(A, function(A) {
              for (var e = 1; e < arguments.length; e++) {
                  var t = null != arguments[e] ? arguments[e] : {},
                      r = Object.keys(t);
                  "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(t).filter(function(A) {
                      return Object.getOwnPropertyDescriptor(t, A).enumerable
                  }))), r.forEach(function(e) {
                      tr(A, e, t[e])
                  })
              }
              return A
          }({}, s, t), r)
      };
      rr.CanvasRenderer = f, e.default = rr
  }]).default
});
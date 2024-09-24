var Nt = Object.defineProperty;
var Rt = (s, t, e) => t in s ? Nt(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var g = (s, t, e) => (Rt(s, typeof t != "symbol" ? t + "" : t, e), e);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = window, X = U.ShadowRoot && (U.ShadyCSS === void 0 || U.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, tt = Symbol(), st = /* @__PURE__ */ new WeakMap();
class mt {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== tt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (X && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = st.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && st.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const ft = (s) => new mt(typeof s == "string" ? s : s + "", void 0, tt), k = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, o, n) => i + ((r) => {
    if (r._$cssResult$ === !0)
      return r.cssText;
    if (typeof r == "number")
      return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[n + 1], s[0]);
  return new mt(e, s, tt);
}, Ut = (s, t) => {
  X ? s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), o = U.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = e.cssText, s.appendChild(i);
  });
}, ot = X ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return ft(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var j;
const L = window, nt = L.trustedTypes, Lt = nt ? nt.emptyScript : "", rt = L.reactiveElementPolyfillSupport, F = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? Lt : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, vt = (s, t) => t !== s && (t == t || s == s), q = { attribute: !0, type: String, converter: F, reflect: !1, hasChanged: vt };
class w extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var e;
    (e = this.h) !== null && e !== void 0 || (this.h = []), this.h.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, i) => {
      const o = this._$Ep(i, e);
      o !== void 0 && (this._$Ev.set(o, i), t.push(o));
    }), t;
  }
  static createProperty(t, e = q) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t, o = this.getPropertyDescriptor(t, i, e);
      o !== void 0 && Object.defineProperty(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return { get() {
      return this[e];
    }, set(o) {
      const n = this[t];
      this[e] = o, this.requestUpdate(t, n, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || q;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, i = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const o of i)
        this.createProperty(o, e[o]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const o of i)
        e.unshift(ot(o));
    } else
      t !== void 0 && e.push(ot(t));
    return e;
  }
  static _$Ep(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) === null || i === void 0 || i.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return Ut(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EO(t, e, i = q) {
    var o;
    const n = this.constructor._$Ep(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const r = (((o = i.converter) === null || o === void 0 ? void 0 : o.toAttribute) !== void 0 ? i.converter : F).toAttribute(e, i.type);
      this._$El = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$El = null;
    }
  }
  _$AK(t, e) {
    var i;
    const o = this.constructor, n = o._$Ev.get(t);
    if (n !== void 0 && this._$El !== n) {
      const r = o.getPropertyOptions(n), c = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((i = r.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? r.converter : F;
      this._$El = n, this[n] = c.fromAttribute(e, r.type), this._$El = null;
    }
  }
  requestUpdate(t, e, i) {
    let o = !0;
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || vt)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : o = !1), !this.isUpdatePending && o && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((o, n) => this[n] = o), this._$Ei = void 0);
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$ES) === null || t === void 0 || t.forEach((o) => {
        var n;
        return (n = o.hostUpdate) === null || n === void 0 ? void 0 : n.call(o);
      }), this.update(i)) : this._$Ek();
    } catch (o) {
      throw e = !1, this._$Ek(), o;
    }
    e && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((i) => {
      var o;
      return (o = i.hostUpdated) === null || o === void 0 ? void 0 : o.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, i) => this._$EO(i, this[i], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
w.finalized = !0, w.elementProperties = /* @__PURE__ */ new Map(), w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, rt == null || rt({ ReactiveElement: w }), ((j = L.reactiveElementVersions) !== null && j !== void 0 ? j : L.reactiveElementVersions = []).push("1.4.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var W;
const B = window, S = B.trustedTypes, at = S ? S.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, y = `lit$${(Math.random() + "").slice(9)}$`, $t = "?" + y, Bt = `<${$t}>`, C = document, T = (s = "") => C.createComment(s), M = (s) => s === null || typeof s != "object" && typeof s != "function", yt = Array.isArray, zt = (s) => yt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, lt = /-->/g, dt = />/g, _ = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ht = /'/g, ct = /"/g, _t = /^(?:script|style|textarea|title)$/i, It = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), d = It(1), b = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), ut = /* @__PURE__ */ new WeakMap(), A = C.createTreeWalker(C, 129, null, !1), Dt = (s, t) => {
  const e = s.length - 1, i = [];
  let o, n = t === 2 ? "<svg>" : "", r = x;
  for (let a = 0; a < e; a++) {
    const l = s[a];
    let $, h, u = -1, f = 0;
    for (; f < l.length && (r.lastIndex = f, h = r.exec(l), h !== null); )
      f = r.lastIndex, r === x ? h[1] === "!--" ? r = lt : h[1] !== void 0 ? r = dt : h[2] !== void 0 ? (_t.test(h[2]) && (o = RegExp("</" + h[2], "g")), r = _) : h[3] !== void 0 && (r = _) : r === _ ? h[0] === ">" ? (r = o != null ? o : x, u = -1) : h[1] === void 0 ? u = -2 : (u = r.lastIndex - h[2].length, $ = h[1], r = h[3] === void 0 ? _ : h[3] === '"' ? ct : ht) : r === ct || r === ht ? r = _ : r === lt || r === dt ? r = x : (r = _, o = void 0);
    const N = r === _ && s[a + 1].startsWith("/>") ? " " : "";
    n += r === x ? l + Bt : u >= 0 ? (i.push($), l.slice(0, u) + "$lit$" + l.slice(u) + y + N) : l + y + (u === -2 ? (i.push(void 0), a) : N);
  }
  const c = n + (s[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(s) || !s.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [at !== void 0 ? at.createHTML(c) : c, i];
};
class P {
  constructor({ strings: t, _$litType$: e }, i) {
    let o;
    this.parts = [];
    let n = 0, r = 0;
    const c = t.length - 1, a = this.parts, [l, $] = Dt(t, e);
    if (this.el = P.createElement(l, i), A.currentNode = this.el.content, e === 2) {
      const h = this.el.content, u = h.firstChild;
      u.remove(), h.append(...u.childNodes);
    }
    for (; (o = A.nextNode()) !== null && a.length < c; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) {
          const h = [];
          for (const u of o.getAttributeNames())
            if (u.endsWith("$lit$") || u.startsWith(y)) {
              const f = $[r++];
              if (h.push(u), f !== void 0) {
                const N = o.getAttribute(f.toLowerCase() + "$lit$").split(y), R = /([.?@])?(.*)/.exec(f);
                a.push({ type: 1, index: n, name: R[2], strings: N, ctor: R[1] === "." ? qt : R[1] === "?" ? Yt : R[1] === "@" ? Vt : D });
              } else
                a.push({ type: 6, index: n });
            }
          for (const u of h)
            o.removeAttribute(u);
        }
        if (_t.test(o.tagName)) {
          const h = o.textContent.split(y), u = h.length - 1;
          if (u > 0) {
            o.textContent = S ? S.emptyScript : "";
            for (let f = 0; f < u; f++)
              o.append(h[f], T()), A.nextNode(), a.push({ type: 2, index: ++n });
            o.append(h[u], T());
          }
        }
      } else if (o.nodeType === 8)
        if (o.data === $t)
          a.push({ type: 2, index: n });
        else {
          let h = -1;
          for (; (h = o.data.indexOf(y, h + 1)) !== -1; )
            a.push({ type: 7, index: n }), h += y.length - 1;
        }
      n++;
    }
  }
  static createElement(t, e) {
    const i = C.createElement("template");
    return i.innerHTML = t, i;
  }
}
function E(s, t, e = s, i) {
  var o, n, r, c;
  if (t === b)
    return t;
  let a = i !== void 0 ? (o = e._$Co) === null || o === void 0 ? void 0 : o[i] : e._$Cl;
  const l = M(t) ? void 0 : t._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== l && ((n = a == null ? void 0 : a._$AO) === null || n === void 0 || n.call(a, !1), l === void 0 ? a = void 0 : (a = new l(s), a._$AT(s, e, i)), i !== void 0 ? ((r = (c = e)._$Co) !== null && r !== void 0 ? r : c._$Co = [])[i] = a : e._$Cl = a), a !== void 0 && (t = E(s, a._$AS(s, t.values), a, i)), t;
}
class jt {
  constructor(t, e) {
    this.u = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t) {
    var e;
    const { el: { content: i }, parts: o } = this._$AD, n = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : C).importNode(i, !0);
    A.currentNode = n;
    let r = A.nextNode(), c = 0, a = 0, l = o[0];
    for (; l !== void 0; ) {
      if (c === l.index) {
        let $;
        l.type === 2 ? $ = new O(r, r.nextSibling, this, t) : l.type === 1 ? $ = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && ($ = new Zt(r, this, t)), this.u.push($), l = o[++a];
      }
      c !== (l == null ? void 0 : l.index) && (r = A.nextNode(), c++);
    }
    return n;
  }
  p(t) {
    let e = 0;
    for (const i of this.u)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class O {
  constructor(t, e, i, o) {
    var n;
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = o, this._$Cm = (n = o == null ? void 0 : o.isConnected) === null || n === void 0 || n;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cm;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = E(this, t, e), M(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== b && this.g(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : zt(t) ? this.k(t) : this.g(t);
  }
  O(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  g(t) {
    this._$AH !== p && M(this._$AH) ? this._$AA.nextSibling.data = t : this.T(C.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var e;
    const { values: i, _$litType$: o } = t, n = typeof o == "number" ? this._$AC(t) : (o.el === void 0 && (o.el = P.createElement(o.h, this.options)), o);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === n)
      this._$AH.p(i);
    else {
      const r = new jt(n, this), c = r.v(this.options);
      r.p(i), this.T(c), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = ut.get(t.strings);
    return e === void 0 && ut.set(t.strings, e = new P(t)), e;
  }
  k(t) {
    yt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, o = 0;
    for (const n of t)
      o === e.length ? e.push(i = new O(this.O(T()), this.O(T()), this, this.options)) : i = e[o], i._$AI(n), o++;
    o < e.length && (this._$AR(i && i._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const o = t.nextSibling;
      t.remove(), t = o;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cm = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class D {
  constructor(t, e, i, o, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, o) {
    const n = this.strings;
    let r = !1;
    if (n === void 0)
      t = E(this, t, e, 0), r = !M(t) || t !== this._$AH && t !== b, r && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = n[0], a = 0; a < n.length - 1; a++)
        l = E(this, c[i + a], e, a), l === b && (l = this._$AH[a]), r || (r = !M(l) || l !== this._$AH[a]), l === p ? t = p : t !== p && (t += (l != null ? l : "") + n[a + 1]), this._$AH[a] = l;
    }
    r && !o && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class qt extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
const Wt = S ? S.emptyScript : "";
class Yt extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== p ? this.element.setAttribute(this.name, Wt) : this.element.removeAttribute(this.name);
  }
}
class Vt extends D {
  constructor(t, e, i, o, n) {
    super(t, e, i, o, n), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = E(this, t, e, 0)) !== null && i !== void 0 ? i : p) === b)
      return;
    const o = this._$AH, n = t === p && o !== p || t.capture !== o.capture || t.once !== o.once || t.passive !== o.passive, r = t !== p && (o === p || n);
    n && this.element.removeEventListener(this.name, this, o), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Zt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const pt = B.litHtmlPolyfillSupport;
pt == null || pt(P, O), ((W = B.litHtmlVersions) !== null && W !== void 0 ? W : B.litHtmlVersions = []).push("2.4.0");
const Gt = (s, t, e) => {
  var i, o;
  const n = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let r = n._$litPart$;
  if (r === void 0) {
    const c = (o = e == null ? void 0 : e.renderBefore) !== null && o !== void 0 ? o : null;
    n._$litPart$ = r = new O(t.insertBefore(T(), c), c, void 0, e != null ? e : {});
  }
  return r._$AI(s), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Y, V;
class v extends w {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Gt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return b;
  }
}
v.finalized = !0, v._$litElement$ = !0, (Y = globalThis.litElementHydrateSupport) === null || Y === void 0 || Y.call(globalThis, { LitElement: v });
const gt = globalThis.litElementPolyfillSupport;
gt == null || gt({ LitElement: v });
((V = globalThis.litElementVersions) !== null && V !== void 0 ? V : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ft = (s, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, s);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, s);
} };
function bt(s) {
  return (t, e) => e !== void 0 ? ((i, o, n) => {
    o.constructor.createProperty(n, i);
  })(s, t, e) : Ft(s, t);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Z;
((Z = window.HTMLSlotElement) === null || Z === void 0 ? void 0 : Z.prototype.assignedElements) != null;
const Kt = `:root{--animation-duration: .6s;--animation-duration-fast: .3s;--animation-duration-slow: 1.2s;--loading-animation: fade-in var(--animation-duration) ease-in .3s backwards;--fixed-spacing-unit: .5rem}@media (prefers-reduced-motion){*,*:before,*:after{transition-property:none!important;transform:none!important;animation:none!important}}.sr-only:not(:focus):not(:active){clip:rect(0 0 0 0);clip-path:inset(100%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}@keyframes fade-in{0%{opacity:0%}to{opacity:100%}}@keyframes snap-in{0%{width:0;height:0;overflow:hidden}to{height:auto;width:auto;overflow:auto}}mds-drawer{animation:var(--loading-animation)}mds-drawer:not(:defined){animation:snap-in .3s;animation-fill-mode:backwards;animation-delay:.4s;display:block}mds-extra-details{display:block;animation:var(--loading-animation)}mds-extra-details:not(:defined) *{animation:var(--loading-animation)}open-close-toggle,extra-details{animation:wc-fade-in .6s ease-in;display:inline-block}mds-extra-details:not(:defined){visibility:hidden}mds-placeholder,mds-placeholder:not(:defined){display:block;opacity:0%}mds-placeholder[ready]{animation:var(--loading-animation);opacity:100%}mds-toggle-scrim[onState]{display:block;position:absolute;top:0;bottom:0;height:100%;width:100%;z-index:999}mds-toggle-scrim[onState]::part(scrim-layer){background:black;opacity:30%;height:100%;width:100%}mds-menu::part(hidden-slotted-content){height:0;overflow:hidden}mds-dialog{&[onState]{--adjusted-width: calc(var(--mds-container-max-width) * .8);--dialog-width: var(--adjusted-width, 80%)}&.mds-dark::part(dialog-element){background:#111;color:#fff}&::part(dialog-body){padding:5rem 3rem 3rem}.mds-search__submit {align-items: center;} --dialog-animation-time: .3s;input[type="search"]:focus,input[type="search"]:hover {border-color: unset; box-shadow: 0 2px 0 black;}}@supports (-moz-appearance: none){mds-dialog::part(dialog-element){animation:ff-dialog-fade var(--dialog-animation-time) ease-out forwards}mds-dialog::part(dialog-element)::backdrop{backdrop-filter:blur(2px);background:rgb(0 0 0 / 80%)}}@keyframes ff-dialog-fade{0%{opacity:0%}to{opacity:80%}}mds-shutter{display:block}mds-shutter.mds-shutter-closed::part(height-container){--overrideHeight: 0}mds-shutter.mds-shutter-open::part(height-container){--overrideHeight: unset}
`;
let Jt = ft(Kt);
var Qt = Object.defineProperty, Xt = Object.getOwnPropertyDescriptor, wt = (s, t, e, i) => {
  for (var o = i > 1 ? void 0 : i ? Xt(t, e) : t, n = s.length - 1, r; n >= 0; n--)
    (r = s[n]) && (o = (i ? r(t, e, o) : r(o)) || o);
  return i && o && Qt(t, e, o), o;
};
class et extends v {
  constructor() {
    super(...arguments), this.openStatus = !1, this.sectionTitle = "";
  }
  handleClick() {
    this.openStatus = !this.openStatus;
  }
  render() {
    let t = d`<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`, e = d`<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`, i = "open", o = t;
    return this.openStatus && (i = "close", o = e), d`
    <section>
      <button @click=${this.handleClick} >
        <span class="sr-only">
          ${i}
        </span>
          ${o} 
      </button>
      <div class="drawer-contents">      
        <h3>${this.sectionTitle}</h3>
        <slot></slot>
      </div>
    </section>`;
  }
  static get styles() {
    return [
      k`
      /* Main containing element for drawer. */
      :host {
        display: flex;
        position: relative;
        background: white;
        /* Should be full height of screen.*/
        height: 100vh;
        /* Set some basic styling variables for parts of the drawer.*/
        --button-width: 2rem;
        /* Drawer width is relative to button width; allows for space proportionate to button width while also taking up most of the viewport width. */
        --drawer-width: calc(100vw - 4*var(--button-width));
        /* Basic padding for contents. */
        --drawer-padding: 0.5rem;
      }

      /* Open/close button for drawer. */
      button {
        position: absolute;
        top: 0;
        /* Button positioned with reference to it's own width.*/
        right: calc(-1* var(--button-width));
        width: var(--button-width);
        height: var(--button-width);
        padding: 0;
        margin: 0;
        background: white;
        border: none;
      }
      
      /* Defines 'root' of drawer and the element that 'opens'.*/
      section {
        /* Margin-left initially set to negative drawer-width, so 'closed'. */
        margin-left: calc(-1 * var(--drawer-width));
        /* Use transition for animation on open/shut states. */
        transition: margin-left var(--animation-duration-fast);
      }
      /* When open, reset margin-left. */
      :host([openstatus]) section {
        margin-left: 0;
      }
      
      /* Holds main contents of drawer.*/
      .drawer-contents {
        padding: var(--drawer-padding);
        /* Width required to avoid reflow. */
        width: calc(var(--drawer-width) - 2*var(--drawer-padding));
      }
      `,
      Jt
    ];
  }
}
wt([
  bt({ type: Boolean, reflect: !0 })
], et.prototype, "openStatus", 2);
wt([
  bt({ type: String })
], et.prototype, "sectionTitle", 2);
const te = function() {
  customElements.define("mds-drawer", et);
};
class K extends v {
  constructor() {
    super(), this.animate = !0, this.toggleStatus = !1;
  }
  render() {
    return d`
      <div part="toggle-wrapper">
        <!-- Ionicon open icon markup. -->
        <ion-icon aria-hidden="true" name="add-sharp" part="toggle-open-icon" alt="open">
          open
        </ion-icon>
        <!-- Ionicon close icon markup. -->
        <ion-icon
          aria-hidden="true"
          name="remove-sharp"
          part="toggle-close-icon"
          alt="close"
        >
          close
        </ion-icon>
      </div>
    `;
  }
}
g(K, "properties", {
  animate: { type: Boolean, reflect: !0 },
  toggleStatus: { type: Boolean, reflect: !0 }
}), g(K, "styles", k`
    :host {
      /* Specify a general animation duration variable for the entire component, inheriting a common externally provided duration or using a fallback value. */
      --toggle-animation-duration: var(--animation-duration-fast, 0.3s);
    }

    /* Container div - useful for positioning. */
    div[part="toggle-wrapper"] {
      position: relative;
    }

    /* ion-icon component for icon; positioned absolutely so can cross-fade transition. */
    ion-icon {
      /* Position icon in center of wrapper. */
      position: absolute;
      opacity: 0;
    }
    /* If animate attribute is set, use transition. */
    :host([animate]) ion-icon {
      transition: opacity var(--toggle-animation-duration);
    }

    /* If off, show 'on' icon. */
    :host(:not([togglestatus])) ion-icon[name="add-sharp"] {
      opacity: 1;
    }
    /* If on, show 'off' icon. */
    :host([toggleStatus]) ion-icon[name="remove-sharp"] {
      opacity: 1;
    }
  `);
class J extends v {
  constructor() {
    super(), this.activeStatus = !1, this.open = this.activeStatus;
  }
  firstUpdated() {
    let t = new CustomEvent("childready", {
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(t), this._getHeights();
  }
  connectedCallback() {
    if (super.connectedCallback(), this.autoOpenSelector) {
      let e = this.querySelectorAll(this.autoOpenSelector).length > 0;
      !this.activeStatus && e && (this.activeStatus = !0);
    }
    let t = this;
    window.addEventListener(
      "resize",
      function() {
        t._handleWindowResize();
      },
      !1
    );
  }
  _handleWindowResize() {
    this._getHeights();
  }
  _handleToggle() {
    this.activeStatus = this._details.open, this._getHeights();
  }
  get _details() {
    var t, e;
    return (e = (t = this.renderRoot) == null ? void 0 : t.querySelector("details")) != null ? e : null;
  }
  _getHeights() {
    let t = this;
    requestAnimationFrame(function() {
      let e = t._details.querySelector("summary"), i = t._details.querySelector("div"), o = e.clientHeight, r = i.clientHeight + o;
      t.style.setProperty("--initHeight", String(o) + "px"), t.style.setProperty("--activeHeight", String(r) + "px");
    });
  }
  render() {
    return d`
      <details ?open=${this.activeStatus} @toggle=${this._handleToggle}>
        <summary part="summary">
          <!-- open-close-toggle CE for nicer animated toggling; forwards toggle-wrapper part for themeing. -->
          <open-close-toggle
            exportparts="toggle-wrapper"
            ?toggleStatus="${this.activeStatus}"
          ></open-close-toggle>
          <slot name="summary"></slot>
        </summary>
        <div part="contents">
          <slot></slot>
        </div>
      </details>
    `;
  }
}
g(J, "properties", {
  open: {
    type: Boolean
  },
  activeStatus: {
    type: Boolean,
    reflect: !0
  },
  autoOpenSelector: { type: String }
}), g(J, "styles", k`
    :host {
      /* Specify a general animation duration variable for the entire component, inheriting a common externally provided duration or using a fallback value. */
      --ed-animation-duration: var(--animation-duration-fast, 0.3s);
      --ed-animation-duration-slow: calc(3 * var(--ed-animation-duration));
      display: block;
      transition: height var(--ed-animation-duration);
      height: var(--initHeight);
      overflow: hidden;
    }

    /* Set height when active attribute set (thus 'open') to activeHeight variable. */
    :host([activestatus]) {
      height: var(--activeHeight);
    }

    :host details div[part="contents"] {
      opacity: 0;
      transition: opacity var(--ed-animation-duration-slow);
    }

    :host([activestatus]) details div[part="contents"] {
      opacity: 1;
    }

    /* TODO: these rules about summary styling could be styled outside of component in CSS file; using part at the same time as regular details summary is styled. Then again, component should be as self-contained as possible. */

    /* Standards compliant method of unsetting 'marker' in details summary element. */
    :host details summary {
      list-style: none;
    }
    /* Legacy method of hiding marker, still required for some browsers. */
    :host details summary::-webkit-details-marker {
      display: none;
    }

    /* Want any headers inside summary to be inline-block. */
    /* :host details summary * {
      display: inline-block;
    } */
  `);
class At extends v {
  constructor() {
    super(), this.ready = !1, this.awaitChildReady = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.awaitChildReady && this.addEventListener("childready", function(t) {
      t.stopPropagation(), this.ready = !0;
    });
  }
  handleSlotChange() {
    this.awaitChildReady || (this.ready = !0);
  }
  render() {
    return d`
      <slot @slotchange=${this.handleSlotChange}></slot>
    `;
  }
}
g(At, "properties", {
  ready: { type: Boolean, reflect: !0 },
  awaitChildReady: { type: Boolean, reflect: !0 }
});
const ee = function() {
  customElements.define("open-close-toggle", K), customElements.define("mds-extra-details", J), customElements.define("mds-placeholder", At);
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ie = (s) => s.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const St = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Ct = (s) => (...t) => ({ _$litDirective$: s, values: t });
class Et {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H = (s, t) => {
  var e, i;
  const o = s._$AN;
  if (o === void 0)
    return !1;
  for (const n of o)
    (i = (e = n)._$AO) === null || i === void 0 || i.call(e, t, !1), H(n, t);
  return !0;
}, z = (s) => {
  let t, e;
  do {
    if ((t = s._$AM) === void 0)
      break;
    e = t._$AN, e.delete(s), s = t;
  } while ((e == null ? void 0 : e.size) === 0);
}, kt = (s) => {
  for (let t; t = s._$AM; s = t) {
    let e = t._$AN;
    if (e === void 0)
      t._$AN = e = /* @__PURE__ */ new Set();
    else if (e.has(s))
      break;
    e.add(s), ne(t);
  }
};
function se(s) {
  this._$AN !== void 0 ? (z(this), this._$AM = s, kt(this)) : this._$AM = s;
}
function oe(s, t = !1, e = 0) {
  const i = this._$AH, o = this._$AN;
  if (o !== void 0 && o.size !== 0)
    if (t)
      if (Array.isArray(i))
        for (let n = e; n < i.length; n++)
          H(i[n], !1), z(i[n]);
      else
        i != null && (H(i, !1), z(i));
    else
      H(this, s);
}
const ne = (s) => {
  var t, e, i, o;
  s.type == St.CHILD && ((t = (i = s)._$AP) !== null && t !== void 0 || (i._$AP = oe), (e = (o = s)._$AQ) !== null && e !== void 0 || (o._$AQ = se));
};
class re extends Et {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, e, i) {
    super._$AT(t, e, i), kt(this), this.isConnected = t._$AU;
  }
  _$AO(t, e = !0) {
    var i, o;
    t !== this.isConnected && (this.isConnected = t, t ? (i = this.reconnected) === null || i === void 0 || i.call(this) : (o = this.disconnected) === null || o === void 0 || o.call(this)), e && (H(this, t), z(this));
  }
  setValue(t) {
    if (ie(this._$Ct))
      this._$Ct._$AI(t, this);
    else {
      const e = [...this._$Ct._$AH];
      e[this._$Ci] = t, this._$Ct._$AI(e, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = () => new ae();
class ae {
}
const G = /* @__PURE__ */ new WeakMap(), Ht = Ct(class extends re {
  render(s) {
    return p;
  }
  update(s, [t]) {
    var e;
    const i = t !== this.Y;
    return i && this.Y !== void 0 && this.rt(void 0), (i || this.lt !== this.ct) && (this.Y = t, this.dt = (e = s.options) === null || e === void 0 ? void 0 : e.host, this.rt(this.ct = s.element)), p;
  }
  rt(s) {
    var t;
    if (typeof this.Y == "function") {
      const e = (t = this.dt) !== null && t !== void 0 ? t : globalThis;
      let i = G.get(e);
      i === void 0 && (i = /* @__PURE__ */ new WeakMap(), G.set(e, i)), i.get(this.Y) !== void 0 && this.Y.call(this.dt, void 0), i.set(this.Y, s), s !== void 0 && this.Y.call(this.dt, s);
    } else
      this.Y.value = s;
  }
  get lt() {
    var s, t, e;
    return typeof this.Y == "function" ? (t = G.get((s = this.dt) !== null && s !== void 0 ? s : globalThis)) === null || t === void 0 ? void 0 : t.get(this.Y) : (e = this.Y) === null || e === void 0 ? void 0 : e.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
class m extends v {
  constructor() {
    super();
    g(this, "_toggleActions", {
      off: "offEvent",
      on: "onEvent"
    });
    this.onState = !1, this.context = void 0, this.name = void 0;
  }
  connectedCallback() {
    super.connectedCallback(), this._addListeners();
  }
  render() {
    return this._defaultMarkup();
  }
  _toggleEvent(e) {
    let i = new CustomEvent(e, {
      detail: { context: this.context },
      composed: !0,
      bubbles: !0
    });
    this.dispatchEvent(i);
  }
  _addListeners() {
    let e = this;
    this.context && (window.addEventListener(
      e._toggleActions.on,
      function(i) {
        i.detail.context == e.context && (e.onState = !0);
      }
    ), window.addEventListener(e._toggleActions.off, function(i) {
      i.detail.context == e.context && (e.onState = !1);
    }));
  }
  _handleClickType() {
    return this.context ? this._handleClick() : this._simpleHandleClick();
  }
  _simpleHandleClick() {
    this.onState == !0 ? this.onState = !1 : this.onState = !0;
  }
  _handleClick() {
    let e = this._toggleActions.on;
    this.onState && (e = this._toggleActions.off), this._toggleEvent(e);
  }
  _defaultMarkup() {
    return d`<button part="toggle-button" @click=${this._handleClickType}>
      ${this.name}
      <slot></slot>
      ${this.onState ? d`<slot name="on-markup"></slot>` : d`<slot name="off-markup"></slot>`}
    </button>`;
  }
  firstUpdated() {
    let e = new CustomEvent("childready", {
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(e);
  }
}
g(m, "properties", {
  name: { type: String },
  context: { type: String },
  onState: { type: Boolean, reflect: !0 }
});
class le extends m {
  _defaultMarkup() {
    if (this.onState)
      return d`<div><slot></slot></div>`;
  }
}
class Tt extends m {
  _defaultMarkup() {
    let t = "fade-in";
    return this.onState || (t = "fade-out"), d`<div class="${t}"><slot></slot></div>`;
  }
}
g(Tt, "styles", k`
    div {
      transition: opacity 0.3s;
    }
    .fade-in {
      opacity: 100%;
    }
    .fade-out {
      opacity: 0%;
    }
  `);
class Mt extends m {
  constructor() {
    super(), this.iconSet = "ionicons";
  }
  _defaultMarkup() {
    let t;
    return this.iconSet == "ionicons" ? t = d`<ion-icon name="close-outline">close</ion-icon>` : this.iconSet == "lucide" && (t = d`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`), d`
      <button part="close-button" @click=${this._handleClick}>
        ${t}
      </button>
    `;
  }
}
g(Mt, "properties", {
  ...m.properties,
  iconSet: { type: String }
});
class it extends m {
  constructor() {
    super(), this.settingsMenu = void 0;
  }
  _defaultMarkup() {
    return d`
      <button part="menu-button" @click=${this._handleClickType}>
        ${this.onState ? d`<ion-icon name="close-outline">close</ion-icon>` : d`<ion-icon name=${this.settingsMenu ? "options-outline" : "menu-outline"}>menu</ion-icon>`}
      </button>
    `;
  }
}
g(it, "properties", {
  ...m.properties,
  settingsMenu: { type: Boolean }
});
class de extends m {
  _defaultMarkup() {
    return d`
      <div part="scrim-layer" 
      @click=${this._handleClickType}>
        <!-- NB: Nothing goes here, the scrim shouldn't have children elements. -->
      </div>
    `;
  }
}
class I extends m {
  constructor() {
    super();
    g(this, "doSizeCheck", () => {
      this.mq && (this._size = window.matchMedia(this.mq), this._size.matches ? (this.onState = !0, this._matching = !0) : (this.onState = !1, this._matching = !1), this.dynamic && (this._size.onchange = (e) => {
        e.matches ? (this.onState = !0, this._matching = !0) : (this.onState = !1, this._matching = !1);
      }));
    });
    this.dynamic = void 0, this.debug = void 0, this.mq = void 0;
  }
  connectedCallback() {
    super.connectedCallback(), this.doSizeCheck();
  }
  render() {
    let e;
    if (this.debug && (e = d`<span
        >meta info: viewport width: ${this._size}, onState: ${this.onState}, mq:
        ${this.mq}</span
      >`), this.onState)
      return e = d`${e} <slot></slot>`, e;
  }
}
g(I, "properties", {
  ...m.properties,
  mq: { type: String },
  dynamic: { type: Boolean },
  _size: { type: Object },
  _matching: { type: Boolean }
});
class Pt extends I {
  constructor() {
    super(), this.withButton = void 0, this.settingsMenu = void 0;
  }
  render() {
    let t;
    return this.withButton && !this._matching && (t = d`
        <mds-toggle-menu exportparts="menu-button" @click=${this._handleClickType}
          ?settingsMenu=${this.settingsMenu}
          ?onState=${this.onState}
        ></mds-toggle-menu>
      `), d`<slot name="menu-label"></slot> ${t} ${this.onState ? d`<span part="slotted-content"><slot></slot></span>` : d`<span part="hidden-slotted-content"><slot></slot></span>`} `;
  }
}
g(Pt, "properties", {
  ...I.properties,
  withButton: { type: Boolean },
  settingsMenu: { type: Boolean }
});
class he extends it {
  _defaultMarkup() {
    return d`
      <button part="menu-button" @click=${this._handleClickType}>
        ${this.onState ? d`<ion-icon name="close-outline">close</ion-icon>` : d`<ion-icon name="options-outline">settings</ion-icon>`}
      </button>
    `;
  }
}
const ce = function() {
  customElements.define("mds-toggle", m), customElements.define("mds-toggle-view", le), customElements.define("mds-toggle-view-fade", Tt), customElements.define("mds-toggle-close", Mt), customElements.define("mds-toggle-menu", it), customElements.define("mds-toggle-settings", he), customElements.define("mds-toggle-scrim", de), customElements.define("mds-mobile-toggle", I), customElements.define("mds-menu", Pt);
};
class Ot extends m {
  constructor() {
    super(...arguments);
    g(this, "dialogRef", xt());
  }
  _handleClick(e) {
    e.type == "close" && e.target == this.dialogRef.value && (this.onState = !1, this._toggleEvent(this._toggleActions.off));
    let i = e.target;
    ((i == null ? void 0 : i.tagName) == "DIALOG" || (i == null ? void 0 : i.tagName) == "MDS-TOGGLE-CLOSE") && this.dialogRef.value.close();
  }
  updated() {
    this.onState && this.dialogRef.value.showModal();
  }
  _defaultMarkup() {
    return d`
      <dialog part="dialog-element" 
        ${Ht(this.dialogRef)}
        @click=${this._handleClick}
        @close=${this._handleClick}
      >
        <div part="dialog-body">
          <slot></slot>
          <mds-toggle-close part="dialog-close"></mds-toggle-close>
        </div>
      </dialog>
    `;
  }
}
g(Ot, "styles", k`
    dialog {
      margin-top: 10rem;
      /* NB! 0 padding means any child content clicked will pass event.target.tagName !== DIALOG, so clicking child content (except mds-toggle-close) will NOT close the dialog. This allows the background part of a modal dialog to be clicked to close. */
      padding: 0;
      border: none;
      width: var(--dialog-width, 90%);
      overflow: visible;

      &::backdrop {
        animation: wc-backdrop-filter-blur var(--dialog-animation-time) ease-out forwards;
      }
    }
    
    /* Regrettably non-FF browsers require keyframes scoped to same shadow root. */
    @keyframes wc-backdrop-filter-blur {
      from {
        backdrop-filter: blur(0);
      }
      
      to {
        background: rgba(0 0 0 / 80%);
        backdrop-filter: blur(2px);
      }
    }

    /* Holds dialog contents. */
    [part="dialog-body"] {
      padding: 1rem;
    }

    /* Absolutely position mds-toggle-close component to the top-right of the dialog. */
    mds-toggle-close[part="dialog-close"] {
      position: absolute;
      top: 0;
      right: 0;
    }

    /* Theme the actual close button part. */
    mds-toggle-close::part(close-button) {
      border: none;
      border-radius: var(--mds-border-radius);
      font-size: 1.5rem;
      padding-top: 0.45rem;
      background: inherit;
      color: var(--mds-color-gray-900);
    }

    /* Highlight the close button part on hover/focus. */
    mds-toggle-close::part(close-button):hover,
    mds-toggle-close::part(close-button):focus {
      color: var(--mds-color-black);
      cursor: pointer;
    }

    /* Support for dark-mode: e.g. mds-dialog.mds-dark: */
    :host(.mds-dark) mds-toggle-close::part(close-button) {
      color: var(--mds-color-gray-300);
      background: inherit;
    }
    :host(.mds-dark) mds-toggle-close::part(close-button):hover,
    :host(.mds-dark) mds-toggle-close::part(close-button):focus {
      color: var(--mds-color-white);
    }
  `);
const ue = function() {
  customElements.define("mds-dialog", Ot);
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pe = Ct(class extends Et {
  constructor(s) {
    var t;
    if (super(s), s.type !== St.ATTRIBUTE || s.name !== "style" || ((t = s.strings) === null || t === void 0 ? void 0 : t.length) > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(s) {
    return Object.keys(s).reduce((t, e) => {
      const i = s[e];
      return i == null ? t : t + `${e = e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(s, [t]) {
    const { style: e } = s.element;
    if (this.vt === void 0) {
      this.vt = /* @__PURE__ */ new Set();
      for (const i in t)
        this.vt.add(i);
      return this.render(t);
    }
    this.vt.forEach((i) => {
      t[i] == null && (this.vt.delete(i), i.includes("-") ? e.removeProperty(i) : e[i] = "");
    });
    for (const i in t) {
      const o = t[i];
      o != null && (this.vt.add(i), i.includes("-") ? e.setProperty(i, o) : e[i] = o);
    }
    return b;
  }
});
class Q extends v {
  constructor() {
    super();
    g(this, "_heightContainerRef", xt());
    this.open = !1, this.initialHeight = void 0;
  }
  _handleSlotChange() {
    var e, i;
    this.initialHeight = (i = (e = this._heightContainerRef) == null ? void 0 : e.value) == null ? void 0 : i.scrollHeight;
  }
  render() {
    const e = { "--initHeight": this.initialHeight + "px", "--overrideHeight": this.open ? "unset" : "0px" };
    return d`
      <div 
        part="height-container"
        ${Ht(this._heightContainerRef)} 
        style=${pe(e)}
      >
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}
g(Q, "properties", {
  open: { reflect: !0, type: Boolean },
  initialHeight: { type: Number }
}), g(Q, "styles", k`
    div {
      /* Custom properties allow height to be dynamic and set programatically or manually via outside selectors. */
      --initHeight;
      --overrideHeight;

      /* Height calculation. */
      --height: var(--initHeight, 0);

      /* Height falls back to initHeight or 0. */
      height: var(--overrideHeight, var(--height));
      overflow: hidden;

      /* Animate height changes. */
      transition: height .3s;
    }

    /* Utility classes to change override height when applied to host. */
    :host(.mds-shutter-closed) div {
      --overrideHeight: 0;
    }

    :host(.mds-shutter-open) div {
      --overrideHeight: unset;
    }
  `);
const ge = function() {
  customElements.define("mds-shutter", Q);
};
ee();
ce();
ue();
te();
ge();


var wi=Object.defineProperty;var ja=e=>{throw TypeError(e)};var xi=(e,t,n)=>t in e?wi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var vt=(e,t,n)=>xi(e,typeof t!="symbol"?t+"":t,n),Zr=(e,t,n)=>t.has(e)||ja("Cannot "+n);var p=(e,t,n)=>(Zr(e,t,"read from private field"),n?n.call(e):t.get(e)),X=(e,t,n)=>t.has(e)?ja("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),H=(e,t,n,r)=>(Zr(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n),_e=(e,t,n)=>(Zr(e,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const ki=!1;var ka=Array.isArray,Ai=Array.prototype.indexOf,Zn=Array.prototype.includes,Ur=Array.from,Ei=Object.defineProperty,nn=Object.getOwnPropertyDescriptor,ms=Object.getOwnPropertyDescriptors,Mi=Object.prototype,Ni=Array.prototype,Aa=Object.getPrototypeOf,Va=Object.isExtensible;function cr(e){return typeof e=="function"}const Si=()=>{};function zi(e){return e()}function sa(e){for(var t=0;t<e.length;t++)e[t]()}function gs(){var e,t,n=new Promise((r,a)=>{e=r,t=a});return{promise:n,resolve:e,reject:t}}function Pi(e,t){if(Array.isArray(e))return e;if(!(Symbol.iterator in e))return Array.from(e);const n=[];for(const r of e)if(n.push(r),n.length===t)break;return n}const Ae=2,Xn=4,kr=8,Ea=1<<24,dn=16,gt=32,zn=64,ia=128,nt=512,me=1024,Ne=2048,yt=4096,Ke=8192,rt=16384,On=32768,la=1<<25,sn=65536,Ha=1<<17,Ti=1<<18,rr=1<<19,ys=1<<20,St=1<<25,Pn=65536,oa=1<<21,Ma=1<<22,rn=1<<23,zt=Symbol("$state"),bs=Symbol("legacy props"),Ci=Symbol(""),Rt=new class extends Error{constructor(){super(...arguments);vt(this,"name","StaleReactionError");vt(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var ps;const $s=!!((ps=globalThis.document)!=null&&ps.contentType)&&globalThis.document.contentType.includes("xml");function ws(e){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function Oi(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function Ii(e,t,n){throw new Error("https://svelte.dev/e/each_key_duplicate")}function qi(e){throw new Error("https://svelte.dev/e/effect_in_teardown")}function Li(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function Ri(e){throw new Error("https://svelte.dev/e/effect_orphan")}function Di(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Fi(e){throw new Error("https://svelte.dev/e/props_invalid_value")}function ji(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Vi(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function Hi(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function Bi(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}const Gi=1,Wi=2,xs=4,Ui=8,Yi=16,Ki=1,Ji=2,ks=4,Zi=8,Xi=16,Qi=1,el=2,ke=Symbol(),As="http://www.w3.org/1999/xhtml",tl="http://www.w3.org/2000/svg",nl="@attach";function rl(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function al(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function Es(e){return e===this.v}function sl(e,t){return e!=e?t==t:e!==t||e!==null&&typeof e=="object"||typeof e=="function"}function Ms(e){return!sl(e,this.v)}let ar=!1,il=!1;function ll(){ar=!0}let ue=null;function Qn(e){ue=e}function Wt(e,t=!1,n){ue={p:ue,i:!1,c:null,e:null,s:e,x:null,r:G,l:ar&&!t?{s:null,u:null,$:[]}:null}}function Ut(e){var t=ue,n=t.e;if(n!==null){t.e=null;for(var r of n)Js(r)}return t.i=!0,ue=t.p,{}}function sr(){return!ar||ue!==null&&ue.l===null}let wn=[];function Ns(){var e=wn;wn=[],sa(e)}function Vt(e){if(wn.length===0&&!hr){var t=wn;queueMicrotask(()=>{t===wn&&Ns()})}wn.push(e)}function ol(){for(;wn.length>0;)Ns()}function Ss(e){var t=G;if(t===null)return B.f|=rn,e;if(!(t.f&On)&&!(t.f&Xn))throw e;tn(e,t)}function tn(e,t){for(;t!==null;){if(t.f&ia){if(!(t.f&On))throw e;try{t.b.error(e);return}catch(n){e=n}}t=t.parent}throw e}const cl=-7169;function ve(e,t){e.f=e.f&cl|t}function Na(e){e.f&nt||e.deps===null?ve(e,me):ve(e,yt)}function zs(e){if(e!==null)for(const t of e)!(t.f&Ae)||!(t.f&Pn)||(t.f^=Pn,zs(t.deps))}function Ps(e,t,n){e.f&Ne?t.add(e):e.f&yt&&n.add(e),zs(e.deps),ve(e,me)}let Pr=!1;function dl(e){var t=Pr;try{return Pr=!1,[e(),Pr]}finally{Pr=t}}const dr=new Set;let D=null,Ce=null,ca=null,hr=!1,Xr=!1,jn=null,Or=null;var Ba=0;let ul=1;var Vn,Hn,Bn,Gn,$r,et,Wn,Qt,Dt,Un,Ie,da,ua,fa,va,Ts;const Br=class Br{constructor(){X(this,Ie);vt(this,"id",ul++);vt(this,"current",new Map);vt(this,"previous",new Map);X(this,Vn,new Set);X(this,Hn,new Set);X(this,Bn,0);X(this,Gn,0);X(this,$r,null);X(this,et,[]);X(this,Wn,new Set);X(this,Qt,new Set);X(this,Dt,new Map);vt(this,"is_fork",!1);X(this,Un,!1)}skip_effect(t){p(this,Dt).has(t)||p(this,Dt).set(t,{d:[],m:[]})}unskip_effect(t){var n=p(this,Dt).get(t);if(n){p(this,Dt).delete(t);for(var r of n.d)ve(r,Ne),this.schedule(r);for(r of n.m)ve(r,yt),this.schedule(r)}}capture(t,n){n!==ke&&!this.previous.has(t)&&this.previous.set(t,n),t.f&rn||(this.current.set(t,t.v),Ce==null||Ce.set(t,t.v))}activate(){D=this}deactivate(){D=null,Ce=null}flush(){try{if(Xr=!0,D=this,!_e(this,Ie,da).call(this)){for(const t of p(this,Wn))p(this,Qt).delete(t),ve(t,Ne),this.schedule(t);for(const t of p(this,Qt))ve(t,yt),this.schedule(t)}_e(this,Ie,ua).call(this)}finally{Ba=0,ca=null,jn=null,Or=null,Xr=!1,D=null,Ce=null,an.clear()}}discard(){for(const t of p(this,Hn))t(this);p(this,Hn).clear()}increment(t){H(this,Bn,p(this,Bn)+1),t&&H(this,Gn,p(this,Gn)+1)}decrement(t,n){H(this,Bn,p(this,Bn)-1),t&&H(this,Gn,p(this,Gn)-1),!(p(this,Un)||n)&&(H(this,Un,!0),Vt(()=>{H(this,Un,!1),this.flush()}))}oncommit(t){p(this,Vn).add(t)}ondiscard(t){p(this,Hn).add(t)}settled(){return(p(this,$r)??H(this,$r,gs())).promise}static ensure(){if(D===null){const t=D=new Br;Xr||(dr.add(D),hr||Vt(()=>{D===t&&t.flush()}))}return D}apply(){{Ce=null;return}}schedule(t){var a;if(ca=t,(a=t.b)!=null&&a.is_pending&&t.f&(Xn|kr|Ea)&&!(t.f&On)){t.b.defer_effect(t);return}for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(jn!==null&&n===G&&(B===null||!(B.f&Ae)))return;if(r&(zn|gt)){if(!(r&me))return;n.f^=me}}p(this,et).push(n)}};Vn=new WeakMap,Hn=new WeakMap,Bn=new WeakMap,Gn=new WeakMap,$r=new WeakMap,et=new WeakMap,Wn=new WeakMap,Qt=new WeakMap,Dt=new WeakMap,Un=new WeakMap,Ie=new WeakSet,da=function(){return this.is_fork||p(this,Gn)>0},ua=function(){var l,c;Ba++>1e3&&vl();const t=p(this,et);H(this,et,[]),this.apply();var n=jn=[],r=[],a=Or=[];for(const d of t)try{_e(this,Ie,fa).call(this,d,n,r)}catch(f){throw qs(d),f}if(D=null,a.length>0){var i=Br.ensure();for(const d of a)i.schedule(d)}if(jn=null,Or=null,_e(this,Ie,da).call(this)){_e(this,Ie,va).call(this,r),_e(this,Ie,va).call(this,n);for(const[d,f]of p(this,Dt))Is(d,f)}else{p(this,Bn)===0&&dr.delete(this),p(this,Wn).clear(),p(this,Qt).clear();for(const d of p(this,Vn))d(this);p(this,Vn).clear(),Ga(r),Ga(n),(l=p(this,$r))==null||l.resolve()}var s=D;if(p(this,et).length>0){const d=s??(s=this);p(d,et).push(...p(this,et).filter(f=>!p(d,et).includes(f)))}s!==null&&(dr.add(s),_e(c=s,Ie,ua).call(c)),dr.has(this)||_e(this,Ie,Ts).call(this)},fa=function(t,n,r){t.f^=me;for(var a=t.first;a!==null;){var i=a.f,s=(i&(gt|zn))!==0,l=s&&(i&me)!==0,c=l||(i&Ke)!==0||p(this,Dt).has(a);if(!c&&a.fn!==null){s?a.f^=me:i&Xn?n.push(a):Mr(a)&&(i&dn&&p(this,Qt).add(a),nr(a));var d=a.first;if(d!==null){a=d;continue}}for(;a!==null;){var f=a.next;if(f!==null){a=f;break}a=a.parent}}},va=function(t){for(var n=0;n<t.length;n+=1)Ps(t[n],p(this,Wn),p(this,Qt))},Ts=function(){var c;for(const d of dr){var t=d.id<this.id,n=[];for(const[f,h]of this.current){if(d.current.has(f))if(t&&h!==d.current.get(f))d.current.set(f,h);else continue;n.push(f)}if(n.length!==0){var r=[...d.current.keys()].filter(f=>!this.current.has(f));if(r.length>0){d.activate();var a=new Set,i=new Map;for(var s of n)Cs(s,r,a,i);if(p(d,et).length>0){d.apply();for(var l of p(d,et))_e(c=d,Ie,fa).call(c,l,[],[])}d.deactivate()}}}};let Tn=Br;function fl(e){var t=hr;hr=!0;try{for(var n;;){if(ol(),D===null)return n;D.flush()}}finally{hr=t}}function vl(){try{Di()}catch(e){tn(e,ca)}}let pt=null;function Ga(e){var t=e.length;if(t!==0){for(var n=0;n<t;){var r=e[n++];if(!(r.f&(rt|Ke))&&Mr(r)&&(pt=new Set,nr(r),r.deps===null&&r.first===null&&r.nodes===null&&r.teardown===null&&r.ac===null&&Qs(r),(pt==null?void 0:pt.size)>0)){an.clear();for(const a of pt){if(a.f&(rt|Ke))continue;const i=[a];let s=a.parent;for(;s!==null;)pt.has(s)&&(pt.delete(s),i.push(s)),s=s.parent;for(let l=i.length-1;l>=0;l--){const c=i[l];c.f&(rt|Ke)||nr(c)}}pt.clear()}}pt=null}}function Cs(e,t,n,r){if(!n.has(e)&&(n.add(e),e.reactions!==null))for(const a of e.reactions){const i=a.f;i&Ae?Cs(a,t,n,r):i&(Ma|dn)&&!(i&Ne)&&Os(a,t,r)&&(ve(a,Ne),Sa(a))}}function Os(e,t,n){const r=n.get(e);if(r!==void 0)return r;if(e.deps!==null)for(const a of e.deps){if(Zn.call(t,a))return!0;if(a.f&Ae&&Os(a,t,n))return n.set(a,!0),!0}return n.set(e,!1),!1}function Sa(e){D.schedule(e)}function Is(e,t){if(!(e.f&gt&&e.f&me)){e.f&Ne?t.d.push(e):e.f&yt&&t.m.push(e),ve(e,me);for(var n=e.first;n!==null;)Is(n,t),n=n.next}}function qs(e){ve(e,me);for(var t=e.first;t!==null;)qs(t),t=t.next}function pl(e){let t=0,n=ln(0),r;return()=>{Ta()&&(o(n),Oa(()=>(t===0&&(r=Gt(()=>e(()=>_r(n)))),t+=1,()=>{Vt(()=>{t-=1,t===0&&(r==null||r(),r=void 0,_r(n))})})))}}var hl=sn|rr;function _l(e,t,n,r){new ml(e,t,n,r)}var tt,xa,At,An,Ve,Et,We,ht,Ft,En,en,Yn,Kn,Jn,jt,Gr,ge,gl,yl,bl,pa,Ir,qr,ha;class ml{constructor(t,n,r,a){X(this,ge);vt(this,"parent");vt(this,"is_pending",!1);vt(this,"transform_error");X(this,tt);X(this,xa,null);X(this,At);X(this,An);X(this,Ve);X(this,Et,null);X(this,We,null);X(this,ht,null);X(this,Ft,null);X(this,En,0);X(this,en,0);X(this,Yn,!1);X(this,Kn,new Set);X(this,Jn,new Set);X(this,jt,null);X(this,Gr,pl(()=>(H(this,jt,ln(p(this,En))),()=>{H(this,jt,null)})));var i;H(this,tt,t),H(this,At,n),H(this,An,s=>{var l=G;l.b=this,l.f|=ia,r(s)}),this.parent=G.b,this.transform_error=a??((i=this.parent)==null?void 0:i.transform_error)??(s=>s),H(this,Ve,ir(()=>{_e(this,ge,pa).call(this)},hl))}defer_effect(t){Ps(t,p(this,Kn),p(this,Jn))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!p(this,At).pending}update_pending_count(t,n){_e(this,ge,ha).call(this,t,n),H(this,En,p(this,En)+t),!(!p(this,jt)||p(this,Yn))&&(H(this,Yn,!0),Vt(()=>{H(this,Yn,!1),p(this,jt)&&er(p(this,jt),p(this,En))}))}get_effect_pending(){return p(this,Gr).call(this),o(p(this,jt))}error(t){var n=p(this,At).onerror;let r=p(this,At).failed;if(!n&&!r)throw t;p(this,Et)&&(Me(p(this,Et)),H(this,Et,null)),p(this,We)&&(Me(p(this,We)),H(this,We,null)),p(this,ht)&&(Me(p(this,ht)),H(this,ht,null));var a=!1,i=!1;const s=()=>{if(a){al();return}a=!0,i&&Bi(),p(this,ht)!==null&&Nn(p(this,ht),()=>{H(this,ht,null)}),_e(this,ge,qr).call(this,()=>{_e(this,ge,pa).call(this)})},l=c=>{try{i=!0,n==null||n(c,s),i=!1}catch(d){tn(d,p(this,Ve)&&p(this,Ve).parent)}r&&H(this,ht,_e(this,ge,qr).call(this,()=>{try{return Be(()=>{var d=G;d.b=this,d.f|=ia,r(p(this,tt),()=>c,()=>s)})}catch(d){return tn(d,p(this,Ve).parent),null}}))};Vt(()=>{var c;try{c=this.transform_error(t)}catch(d){tn(d,p(this,Ve)&&p(this,Ve).parent);return}c!==null&&typeof c=="object"&&typeof c.then=="function"?c.then(l,d=>tn(d,p(this,Ve)&&p(this,Ve).parent)):l(c)})}}tt=new WeakMap,xa=new WeakMap,At=new WeakMap,An=new WeakMap,Ve=new WeakMap,Et=new WeakMap,We=new WeakMap,ht=new WeakMap,Ft=new WeakMap,En=new WeakMap,en=new WeakMap,Yn=new WeakMap,Kn=new WeakMap,Jn=new WeakMap,jt=new WeakMap,Gr=new WeakMap,ge=new WeakSet,gl=function(){try{H(this,Et,Be(()=>p(this,An).call(this,p(this,tt))))}catch(t){this.error(t)}},yl=function(t){const n=p(this,At).failed;n&&H(this,ht,Be(()=>{n(p(this,tt),()=>t,()=>()=>{})}))},bl=function(){const t=p(this,At).pending;t&&(this.is_pending=!0,H(this,We,Be(()=>t(p(this,tt)))),Vt(()=>{var n=H(this,Ft,document.createDocumentFragment()),r=Ht();n.append(r),H(this,Et,_e(this,ge,qr).call(this,()=>Be(()=>p(this,An).call(this,r)))),p(this,en)===0&&(p(this,tt).before(n),H(this,Ft,null),Nn(p(this,We),()=>{H(this,We,null)}),_e(this,ge,Ir).call(this,D))}))},pa=function(){try{if(this.is_pending=this.has_pending_snippet(),H(this,en,0),H(this,En,0),H(this,Et,Be(()=>{p(this,An).call(this,p(this,tt))})),p(this,en)>0){var t=H(this,Ft,document.createDocumentFragment());La(p(this,Et),t);const n=p(this,At).pending;H(this,We,Be(()=>n(p(this,tt))))}else _e(this,ge,Ir).call(this,D)}catch(n){this.error(n)}},Ir=function(t){this.is_pending=!1;for(const n of p(this,Kn))ve(n,Ne),t.schedule(n);for(const n of p(this,Jn))ve(n,yt),t.schedule(n);p(this,Kn).clear(),p(this,Jn).clear()},qr=function(t){var n=G,r=B,a=ue;it(p(this,Ve)),st(p(this,Ve)),Qn(p(this,Ve).ctx);try{return Tn.ensure(),t()}catch(i){return Ss(i),null}finally{it(n),st(r),Qn(a)}},ha=function(t,n){var r;if(!this.has_pending_snippet()){this.parent&&_e(r=this.parent,ge,ha).call(r,t,n);return}H(this,en,p(this,en)+t),p(this,en)===0&&(_e(this,ge,Ir).call(this,n),p(this,We)&&Nn(p(this,We),()=>{H(this,We,null)}),p(this,Ft)&&(p(this,tt).before(p(this,Ft)),H(this,Ft,null)))};function Ls(e,t,n,r){const a=sr()?Ar:za;var i=e.filter(v=>!v.settled);if(n.length===0&&i.length===0){r(t.map(a));return}var s=G,l=$l(),c=i.length===1?i[0].promise:i.length>1?Promise.all(i.map(v=>v.promise)):null;function d(v){l();try{r(v)}catch($){s.f&rt||tn($,s)}Fr()}if(n.length===0){c.then(()=>d(t.map(a)));return}var f=Rs();function h(){Promise.all(n.map(v=>wl(v))).then(v=>d([...t.map(a),...v])).catch(v=>tn(v,s)).finally(()=>f())}c?c.then(()=>{l(),h(),Fr()}):h()}function $l(){var e=G,t=B,n=ue,r=D;return function(i=!0){it(e),st(t),Qn(n),i&&!(e.f&rt)&&(r==null||r.activate(),r==null||r.apply())}}function Fr(e=!0){it(null),st(null),Qn(null),e&&(D==null||D.deactivate())}function Rs(){var e=G.b,t=D,n=e.is_rendered();return e.update_pending_count(1,t),t.increment(n),(r=!1)=>{e.update_pending_count(-1,t),t.decrement(n,r)}}function Ar(e){var t=Ae|Ne,n=B!==null&&B.f&Ae?B:null;return G!==null&&(G.f|=rr),{ctx:ue,deps:null,effects:null,equals:Es,f:t,fn:e,reactions:null,rv:0,v:ke,wv:0,parent:n??G,ac:null}}function wl(e,t,n){let r=G;r===null&&Oi();var a=void 0,i=ln(ke),s=!B,l=new Map;return ql(()=>{var $;var c=G,d=gs();a=d.promise;try{Promise.resolve(e()).then(d.resolve,d.reject).finally(Fr)}catch(m){d.reject(m),Fr()}var f=D;if(s){if(c.f&On)var h=Rs();if(r.b.is_rendered())($=l.get(f))==null||$.reject(Rt),l.delete(f);else{for(const m of l.values())m.reject(Rt);l.clear()}l.set(f,d)}const v=(m,k=void 0)=>{if(h){var _=k===Rt;h(_)}if(!(k===Rt||c.f&rt)){if(f.activate(),k)i.f|=rn,er(i,k);else{i.f&rn&&(i.f^=rn),er(i,m);for(const[w,q]of l){if(l.delete(w),w===f)break;q.reject(Rt)}}f.deactivate()}};d.promise.then(v,m=>v(null,m||"unknown"))}),Ca(()=>{for(const c of l.values())c.reject(Rt)}),new Promise(c=>{function d(f){function h(){f===a?c(i):d(a)}f.then(h,h)}d(a)})}function Xe(e){const t=Ar(e);return ni(t),t}function za(e){const t=Ar(e);return t.equals=Ms,t}function xl(e){var t=e.effects;if(t!==null){e.effects=null;for(var n=0;n<t.length;n+=1)Me(t[n])}}function kl(e){for(var t=e.parent;t!==null;){if(!(t.f&Ae))return t.f&rt?null:t;t=t.parent}return null}function Pa(e){var t,n=G;it(kl(e));try{e.f&=~Pn,xl(e),t=ii(e)}finally{it(n)}return t}function Ds(e){var t=Pa(e);if(!e.equals(t)&&(e.wv=ai(),(!(D!=null&&D.is_fork)||e.deps===null)&&(e.v=t,e.deps===null))){ve(e,me);return}on||(Ce!==null?(Ta()||D!=null&&D.is_fork)&&Ce.set(e,t):Na(e))}function Al(e){var t,n;if(e.effects!==null)for(const r of e.effects)(r.teardown||r.ac)&&((t=r.teardown)==null||t.call(r),(n=r.ac)==null||n.abort(Rt),r.teardown=Si,r.ac=null,gr(r,0),Ia(r))}function Fs(e){if(e.effects!==null)for(const t of e.effects)t.teardown&&nr(t)}let _a=new Set;const an=new Map;let js=!1;function ln(e,t){var n={f:0,v:e,reactions:null,equals:Es,rv:0,wv:0};return n}function T(e,t){const n=ln(e);return ni(n),n}function El(e,t=!1,n=!0){var a;const r=ln(e);return t||(r.equals=Ms),ar&&n&&ue!==null&&ue.l!==null&&((a=ue.l).s??(a.s=[])).push(r),r}function b(e,t,n=!1){B!==null&&(!mt||B.f&Ha)&&sr()&&B.f&(Ae|dn|Ma|Ha)&&(at===null||!Zn.call(at,e))&&Hi();let r=n?Oe(t):t;return er(e,r,Or)}function er(e,t,n=null){if(!e.equals(t)){var r=e.v;on?an.set(e,t):an.set(e,r),e.v=t;var a=Tn.ensure();if(a.capture(e,r),e.f&Ae){const i=e;e.f&Ne&&Pa(i),Na(i)}e.wv=ai(),Vs(e,Ne,n),sr()&&G!==null&&G.f&me&&!(G.f&(gt|zn))&&(Qe===null?Dl([e]):Qe.push(e)),!a.is_fork&&_a.size>0&&!js&&Ml()}return t}function Ml(){js=!1;for(const e of _a)e.f&me&&ve(e,yt),Mr(e)&&nr(e);_a.clear()}function Wa(e,t=1){var n=o(e),r=t===1?n++:n--;return b(e,n),r}function _r(e){b(e,e.v+1)}function Vs(e,t,n){var r=e.reactions;if(r!==null)for(var a=sr(),i=r.length,s=0;s<i;s++){var l=r[s],c=l.f;if(!(!a&&l===G)){var d=(c&Ne)===0;if(d&&ve(l,t),c&Ae){var f=l;Ce==null||Ce.delete(f),c&Pn||(c&nt&&(l.f|=Pn),Vs(f,yt,n))}else if(d){var h=l;c&dn&&pt!==null&&pt.add(h),n!==null?n.push(h):Sa(h)}}}}function Oe(e){if(typeof e!="object"||e===null||zt in e)return e;const t=Aa(e);if(t!==Mi&&t!==Ni)return e;var n=new Map,r=ka(e),a=T(0),i=Sn,s=l=>{if(Sn===i)return l();var c=B,d=Sn;st(null),Za(i);var f=l();return st(c),Za(d),f};return r&&n.set("length",T(e.length)),new Proxy(e,{defineProperty(l,c,d){(!("value"in d)||d.configurable===!1||d.enumerable===!1||d.writable===!1)&&ji();var f=n.get(c);return f===void 0?s(()=>{var h=T(d.value);return n.set(c,h),h}):b(f,d.value,!0),!0},deleteProperty(l,c){var d=n.get(c);if(d===void 0){if(c in l){const f=s(()=>T(ke));n.set(c,f),_r(a)}}else b(d,ke),_r(a);return!0},get(l,c,d){var $;if(c===zt)return e;var f=n.get(c),h=c in l;if(f===void 0&&(!h||($=nn(l,c))!=null&&$.writable)&&(f=s(()=>{var m=Oe(h?l[c]:ke),k=T(m);return k}),n.set(c,f)),f!==void 0){var v=o(f);return v===ke?void 0:v}return Reflect.get(l,c,d)},getOwnPropertyDescriptor(l,c){var d=Reflect.getOwnPropertyDescriptor(l,c);if(d&&"value"in d){var f=n.get(c);f&&(d.value=o(f))}else if(d===void 0){var h=n.get(c),v=h==null?void 0:h.v;if(h!==void 0&&v!==ke)return{enumerable:!0,configurable:!0,value:v,writable:!0}}return d},has(l,c){var v;if(c===zt)return!0;var d=n.get(c),f=d!==void 0&&d.v!==ke||Reflect.has(l,c);if(d!==void 0||G!==null&&(!f||(v=nn(l,c))!=null&&v.writable)){d===void 0&&(d=s(()=>{var $=f?Oe(l[c]):ke,m=T($);return m}),n.set(c,d));var h=o(d);if(h===ke)return!1}return f},set(l,c,d,f){var O;var h=n.get(c),v=c in l;if(r&&c==="length")for(var $=d;$<h.v;$+=1){var m=n.get($+"");m!==void 0?b(m,ke):$ in l&&(m=s(()=>T(ke)),n.set($+"",m))}if(h===void 0)(!v||(O=nn(l,c))!=null&&O.writable)&&(h=s(()=>T(void 0)),b(h,Oe(d)),n.set(c,h));else{v=h.v!==ke;var k=s(()=>Oe(d));b(h,k)}var _=Reflect.getOwnPropertyDescriptor(l,c);if(_!=null&&_.set&&_.set.call(f,d),!v){if(r&&typeof c=="string"){var w=n.get("length"),q=Number(c);Number.isInteger(q)&&q>=w.v&&b(w,q+1)}_r(a)}return!0},ownKeys(l){o(a);var c=Reflect.ownKeys(l).filter(h=>{var v=n.get(h);return v===void 0||v.v!==ke});for(var[d,f]of n)f.v!==ke&&!(d in l)&&c.push(d);return c},setPrototypeOf(){Vi()}})}function Ua(e){try{if(e!==null&&typeof e=="object"&&zt in e)return e[zt]}catch{}return e}function Nl(e,t){return Object.is(Ua(e),Ua(t))}var Ya,Hs,Bs,Gs;function Sl(){if(Ya===void 0){Ya=window,Hs=/Firefox/.test(navigator.userAgent);var e=Element.prototype,t=Node.prototype,n=Text.prototype;Bs=nn(t,"firstChild").get,Gs=nn(t,"nextSibling").get,Va(e)&&(e.__click=void 0,e.__className=void 0,e.__attributes=null,e.__style=void 0,e.__e=void 0),Va(n)&&(n.__t=void 0)}}function Ht(e=""){return document.createTextNode(e)}function tr(e){return Bs.call(e)}function Er(e){return Gs.call(e)}function u(e,t){return tr(e)}function P(e,t=!1){{var n=tr(e);return n instanceof Comment&&n.data===""?Er(n):n}}function g(e,t=1,n=!1){let r=e;for(;t--;)r=Er(r);return r}function zl(e){e.textContent=""}function Ws(){return!1}function Us(e,t,n){return document.createElementNS(t??As,e,void 0)}function Pl(e,t){if(t){const n=document.body;e.autofocus=!0,Vt(()=>{document.activeElement===n&&e.focus()})}}let Ka=!1;function Tl(){Ka||(Ka=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const n of e.target.elements)(t=n.__on_r)==null||t.call(n)})},{capture:!0}))}function Yr(e){var t=B,n=G;st(null),it(null);try{return e()}finally{st(t),it(n)}}function Ys(e,t,n,r=n){e.addEventListener(t,()=>Yr(n));const a=e.__on_r;a?e.__on_r=()=>{a(),r(!0)}:e.__on_r=()=>r(!0),Tl()}function Ks(e){G===null&&(B===null&&Ri(),Li()),on&&qi()}function Cl(e,t){var n=t.last;n===null?t.last=t.first=e:(n.next=e,e.prev=n,t.last=e)}function bt(e,t){var n=G;n!==null&&n.f&Ke&&(e|=Ke);var r={ctx:ue,deps:null,nodes:null,f:e|Ne|nt,first:null,fn:t,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,wv:0,ac:null},a=r;if(e&Xn)jn!==null?jn.push(r):Tn.ensure().schedule(r);else if(t!==null){try{nr(r)}catch(s){throw Me(r),s}a.deps===null&&a.teardown===null&&a.nodes===null&&a.first===a.last&&!(a.f&rr)&&(a=a.first,e&dn&&e&sn&&a!==null&&(a.f|=sn))}if(a!==null&&(a.parent=n,n!==null&&Cl(a,n),B!==null&&B.f&Ae&&!(e&zn))){var i=B;(i.effects??(i.effects=[])).push(a)}return r}function Ta(){return B!==null&&!mt}function Ca(e){const t=bt(kr,null);return ve(t,me),t.teardown=e,t}function Bt(e){Ks();var t=G.f,n=!B&&(t&gt)!==0&&(t&On)===0;if(n){var r=ue;(r.e??(r.e=[])).push(e)}else return Js(e)}function Js(e){return bt(Xn|ys,e)}function Ol(e){return Ks(),bt(kr|ys,e)}function Il(e){Tn.ensure();const t=bt(zn|rr,e);return(n={})=>new Promise(r=>{n.outro?Nn(t,()=>{Me(t),r(void 0)}):(Me(t),r(void 0))})}function Kr(e){return bt(Xn,e)}function ql(e){return bt(Ma|rr,e)}function Oa(e,t=0){return bt(kr|t,e)}function se(e,t=[],n=[],r=[]){Ls(r,t,n,a=>{bt(kr,()=>e(...a.map(o)))})}function ir(e,t=0){var n=bt(dn|t,e);return n}function Zs(e,t=0){var n=bt(Ea|t,e);return n}function Be(e){return bt(gt|rr,e)}function Xs(e){var t=e.teardown;if(t!==null){const n=on,r=B;Ja(!0),st(null);try{t.call(null)}finally{Ja(n),st(r)}}}function Ia(e,t=!1){var n=e.first;for(e.first=e.last=null;n!==null;){const a=n.ac;a!==null&&Yr(()=>{a.abort(Rt)});var r=n.next;n.f&zn?n.parent=null:Me(n,t),n=r}}function Ll(e){for(var t=e.first;t!==null;){var n=t.next;t.f&gt||Me(t),t=n}}function Me(e,t=!0){var n=!1;(t||e.f&Ti)&&e.nodes!==null&&e.nodes.end!==null&&(Rl(e.nodes.start,e.nodes.end),n=!0),ve(e,la),Ia(e,t&&!n),gr(e,0);var r=e.nodes&&e.nodes.t;if(r!==null)for(const i of r)i.stop();Xs(e),e.f^=la,e.f|=rt;var a=e.parent;a!==null&&a.first!==null&&Qs(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.fn=e.nodes=e.ac=null}function Rl(e,t){for(;e!==null;){var n=e===t?null:Er(e);e.remove(),e=n}}function Qs(e){var t=e.parent,n=e.prev,r=e.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),t!==null&&(t.first===e&&(t.first=r),t.last===e&&(t.last=n))}function Nn(e,t,n=!0){var r=[];ei(e,r,!0);var a=()=>{n&&Me(e),t&&t()},i=r.length;if(i>0){var s=()=>--i||a();for(var l of r)l.out(s)}else a()}function ei(e,t,n){if(!(e.f&Ke)){e.f^=Ke;var r=e.nodes&&e.nodes.t;if(r!==null)for(const l of r)(l.is_global||n)&&t.push(l);for(var a=e.first;a!==null;){var i=a.next,s=(a.f&sn)!==0||(a.f&gt)!==0&&(e.f&dn)!==0;ei(a,t,s?n:!1),a=i}}}function qa(e){ti(e,!0)}function ti(e,t){if(e.f&Ke){e.f^=Ke,e.f&me||(ve(e,Ne),Tn.ensure().schedule(e));for(var n=e.first;n!==null;){var r=n.next,a=(n.f&sn)!==0||(n.f&gt)!==0;ti(n,a?t:!1),n=r}var i=e.nodes&&e.nodes.t;if(i!==null)for(const s of i)(s.is_global||t)&&s.in()}}function La(e,t){if(e.nodes)for(var n=e.nodes.start,r=e.nodes.end;n!==null;){var a=n===r?null:Er(n);t.append(n),n=a}}let Lr=!1,on=!1;function Ja(e){on=e}let B=null,mt=!1;function st(e){B=e}let G=null;function it(e){G=e}let at=null;function ni(e){B!==null&&(at===null?at=[e]:at.push(e))}let He=null,Ge=0,Qe=null;function Dl(e){Qe=e}let ri=1,xn=0,Sn=xn;function Za(e){Sn=e}function ai(){return++ri}function Mr(e){var t=e.f;if(t&Ne)return!0;if(t&Ae&&(e.f&=~Pn),t&yt){for(var n=e.deps,r=n.length,a=0;a<r;a++){var i=n[a];if(Mr(i)&&Ds(i),i.wv>e.wv)return!0}t&nt&&Ce===null&&ve(e,me)}return!1}function si(e,t,n=!0){var r=e.reactions;if(r!==null&&!(at!==null&&Zn.call(at,e)))for(var a=0;a<r.length;a++){var i=r[a];i.f&Ae?si(i,t,!1):t===i&&(n?ve(i,Ne):i.f&me&&ve(i,yt),Sa(i))}}function ii(e){var k;var t=He,n=Ge,r=Qe,a=B,i=at,s=ue,l=mt,c=Sn,d=e.f;He=null,Ge=0,Qe=null,B=d&(gt|zn)?null:e,at=null,Qn(e.ctx),mt=!1,Sn=++xn,e.ac!==null&&(Yr(()=>{e.ac.abort(Rt)}),e.ac=null);try{e.f|=oa;var f=e.fn,h=f();e.f|=On;var v=e.deps,$=D==null?void 0:D.is_fork;if(He!==null){var m;if($||gr(e,Ge),v!==null&&Ge>0)for(v.length=Ge+He.length,m=0;m<He.length;m++)v[Ge+m]=He[m];else e.deps=v=He;if(Ta()&&e.f&nt)for(m=Ge;m<v.length;m++)((k=v[m]).reactions??(k.reactions=[])).push(e)}else!$&&v!==null&&Ge<v.length&&(gr(e,Ge),v.length=Ge);if(sr()&&Qe!==null&&!mt&&v!==null&&!(e.f&(Ae|yt|Ne)))for(m=0;m<Qe.length;m++)si(Qe[m],e);if(a!==null&&a!==e){if(xn++,a.deps!==null)for(let _=0;_<n;_+=1)a.deps[_].rv=xn;if(t!==null)for(const _ of t)_.rv=xn;Qe!==null&&(r===null?r=Qe:r.push(...Qe))}return e.f&rn&&(e.f^=rn),h}catch(_){return Ss(_)}finally{e.f^=oa,He=t,Ge=n,Qe=r,B=a,at=i,Qn(s),mt=l,Sn=c}}function Fl(e,t){let n=t.reactions;if(n!==null){var r=Ai.call(n,e);if(r!==-1){var a=n.length-1;a===0?n=t.reactions=null:(n[r]=n[a],n.pop())}}if(n===null&&t.f&Ae&&(He===null||!Zn.call(He,t))){var i=t;i.f&nt&&(i.f^=nt,i.f&=~Pn),Na(i),Al(i),gr(i,0)}}function gr(e,t){var n=e.deps;if(n!==null)for(var r=t;r<n.length;r++)Fl(e,n[r])}function nr(e){var t=e.f;if(!(t&rt)){ve(e,me);var n=G,r=Lr;G=e,Lr=!0;try{t&(dn|Ea)?Ll(e):Ia(e),Xs(e);var a=ii(e);e.teardown=typeof a=="function"?a:null,e.wv=ri;var i;ki&&il&&e.f&Ne&&e.deps}finally{Lr=r,G=n}}}async function jl(){await Promise.resolve(),fl()}function o(e){var t=e.f,n=(t&Ae)!==0;if(B!==null&&!mt){var r=G!==null&&(G.f&rt)!==0;if(!r&&(at===null||!Zn.call(at,e))){var a=B.deps;if(B.f&oa)e.rv<xn&&(e.rv=xn,He===null&&a!==null&&a[Ge]===e?Ge++:He===null?He=[e]:He.push(e));else{(B.deps??(B.deps=[])).push(e);var i=e.reactions;i===null?e.reactions=[B]:Zn.call(i,B)||i.push(B)}}}if(on&&an.has(e))return an.get(e);if(n){var s=e;if(on){var l=s.v;return(!(s.f&me)&&s.reactions!==null||oi(s))&&(l=Pa(s)),an.set(s,l),l}var c=(s.f&nt)===0&&!mt&&B!==null&&(Lr||(B.f&nt)!==0),d=(s.f&On)===0;Mr(s)&&(c&&(s.f|=nt),Ds(s)),c&&!d&&(Fs(s),li(s))}if(Ce!=null&&Ce.has(e))return Ce.get(e);if(e.f&rn)throw e.v;return e.v}function li(e){if(e.f|=nt,e.deps!==null)for(const t of e.deps)(t.reactions??(t.reactions=[])).push(e),t.f&Ae&&!(t.f&nt)&&(Fs(t),li(t))}function oi(e){if(e.v===ke)return!0;if(e.deps===null)return!1;for(const t of e.deps)if(an.has(t)||t.f&Ae&&oi(t))return!0;return!1}function Gt(e){var t=mt;try{return mt=!0,e()}finally{mt=t}}function $n(e){if(!(typeof e!="object"||!e||e instanceof EventTarget)){if(zt in e)ma(e);else if(!Array.isArray(e))for(let t in e){const n=e[t];typeof n=="object"&&n&&zt in n&&ma(n)}}}function ma(e,t=new Set){if(typeof e=="object"&&e!==null&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e),e instanceof Date&&e.getTime();for(let r in e)try{ma(e[r],t)}catch{}const n=Aa(e);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const r=ms(n);for(let a in r){const i=r[a].get;if(i)try{i.call(e)}catch{}}}}}function Vl(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const Hl=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function Bl(e){return Hl.includes(e)}const Gl={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function Wl(e){return e=e.toLowerCase(),Gl[e]??e}const Ul=["touchstart","touchmove"];function Yl(e){return Ul.includes(e)}const kn=Symbol("events"),ci=new Set,ga=new Set;function Kl(e,t,n,r={}){function a(i){if(r.capture||ya.call(t,i),!i.cancelBubble)return Yr(()=>n==null?void 0:n.call(this,i))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?Vt(()=>{t.addEventListener(e,a,r)}):t.addEventListener(e,a,r),a}function le(e,t,n){(t[kn]??(t[kn]={}))[e]=n}function Nr(e){for(var t=0;t<e.length;t++)ci.add(e[t]);for(var n of ga)n(e)}let Xa=null;function ya(e){var _,w;var t=this,n=t.ownerDocument,r=e.type,a=((_=e.composedPath)==null?void 0:_.call(e))||[],i=a[0]||e.target;Xa=e;var s=0,l=Xa===e&&e[kn];if(l){var c=a.indexOf(l);if(c!==-1&&(t===document||t===window)){e[kn]=t;return}var d=a.indexOf(t);if(d===-1)return;c<=d&&(s=c)}if(i=a[s]||e.target,i!==t){Ei(e,"currentTarget",{configurable:!0,get(){return i||n}});var f=B,h=G;st(null),it(null);try{for(var v,$=[];i!==null;){var m=i.assignedSlot||i.parentNode||i.host||null;try{var k=(w=i[kn])==null?void 0:w[r];k!=null&&(!i.disabled||e.target===i)&&k.call(i,e)}catch(q){v?$.push(q):v=q}if(e.cancelBubble||m===t||m===null)break;i=m}if(v){for(let q of $)queueMicrotask(()=>{throw q});throw v}}finally{e[kn]=t,delete e.currentTarget,st(f),it(h)}}}var hs;const Qr=((hs=globalThis==null?void 0:globalThis.window)==null?void 0:hs.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:e=>e});function Jl(e){return(Qr==null?void 0:Qr.createHTML(e))??e}function di(e){var t=Us("template");return t.innerHTML=Jl(e.replaceAll("<!>","<!---->")),t.content}function yr(e,t){var n=G;n.nodes===null&&(n.nodes={start:e,end:t,a:null,t:null})}function z(e,t){var n=(t&Qi)!==0,r=(t&el)!==0,a,i=!e.startsWith("<!>");return()=>{a===void 0&&(a=di(i?e:"<!>"+e),n||(a=tr(a)));var s=r||Hs?document.importNode(a,!0):a.cloneNode(!0);if(n){var l=tr(s),c=s.lastChild;yr(l,c)}else yr(s,s);return s}}function Zl(e,t,n="svg"){var r=!e.startsWith("<!>"),a=`<${n}>${r?e:"<!>"+e}</${n}>`,i;return()=>{if(!i){var s=di(a),l=tr(s);i=tr(l)}var c=i.cloneNode(!0);return yr(c,c),c}}function Xl(e,t){return Zl(e,t,"svg")}function I(){var e=document.createDocumentFragment(),t=document.createComment(""),n=Ht();return e.append(t,n),yr(t,n),e}function y(e,t){e!==null&&e.before(t)}function Z(e,t){var n=t==null?"":typeof t=="object"?`${t}`:t;n!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=n,e.nodeValue=`${n}`)}function Ql(e,t){return eo(e,t)}const Tr=new Map;function eo(e,{target:t,anchor:n,props:r={},events:a,context:i,intro:s=!0,transformError:l}){Sl();var c=void 0,d=Il(()=>{var f=n??t.appendChild(Ht());_l(f,{pending:()=>{}},$=>{Wt({});var m=ue;i&&(m.c=i),a&&(r.$$events=a),c=e($,r)||{},Ut()},l);var h=new Set,v=$=>{for(var m=0;m<$.length;m++){var k=$[m];if(!h.has(k)){h.add(k);var _=Yl(k);for(const O of[t,document]){var w=Tr.get(O);w===void 0&&(w=new Map,Tr.set(O,w));var q=w.get(k);q===void 0?(O.addEventListener(k,ya,{passive:_}),w.set(k,1)):w.set(k,q+1)}}}};return v(Ur(ci)),ga.add(v),()=>{var _;for(var $ of h)for(const w of[t,document]){var m=Tr.get(w),k=m.get($);--k==0?(w.removeEventListener($,ya),m.delete($),m.size===0&&Tr.delete(w)):m.set($,k)}ga.delete(v),f!==n&&((_=f.parentNode)==null||_.removeChild(f))}});return to.set(c,d),c}let to=new WeakMap;var _t,Mt,Ue,Mn,wr,xr,Wr;class Jr{constructor(t,n=!0){vt(this,"anchor");X(this,_t,new Map);X(this,Mt,new Map);X(this,Ue,new Map);X(this,Mn,new Set);X(this,wr,!0);X(this,xr,t=>{if(p(this,_t).has(t)){var n=p(this,_t).get(t),r=p(this,Mt).get(n);if(r)qa(r),p(this,Mn).delete(n);else{var a=p(this,Ue).get(n);a&&(p(this,Mt).set(n,a.effect),p(this,Ue).delete(n),a.fragment.lastChild.remove(),this.anchor.before(a.fragment),r=a.effect)}for(const[i,s]of p(this,_t)){if(p(this,_t).delete(i),i===t)break;const l=p(this,Ue).get(s);l&&(Me(l.effect),p(this,Ue).delete(s))}for(const[i,s]of p(this,Mt)){if(i===n||p(this,Mn).has(i))continue;const l=()=>{if(Array.from(p(this,_t).values()).includes(i)){var d=document.createDocumentFragment();La(s,d),d.append(Ht()),p(this,Ue).set(i,{effect:s,fragment:d})}else Me(s);p(this,Mn).delete(i),p(this,Mt).delete(i)};p(this,wr)||!r?(p(this,Mn).add(i),Nn(s,l,!1)):l()}}});X(this,Wr,t=>{p(this,_t).delete(t);const n=Array.from(p(this,_t).values());for(const[r,a]of p(this,Ue))n.includes(r)||(Me(a.effect),p(this,Ue).delete(r))});this.anchor=t,H(this,wr,n)}ensure(t,n){var r=D,a=Ws();if(n&&!p(this,Mt).has(t)&&!p(this,Ue).has(t))if(a){var i=document.createDocumentFragment(),s=Ht();i.append(s),p(this,Ue).set(t,{effect:Be(()=>n(s)),fragment:i})}else p(this,Mt).set(t,Be(()=>n(this.anchor)));if(p(this,_t).set(r,t),a){for(const[l,c]of p(this,Mt))l===t?r.unskip_effect(c):r.skip_effect(c);for(const[l,c]of p(this,Ue))l===t?r.unskip_effect(c.effect):r.skip_effect(c.effect);r.oncommit(p(this,xr)),r.ondiscard(p(this,Wr))}else p(this,xr).call(this,r)}}_t=new WeakMap,Mt=new WeakMap,Ue=new WeakMap,Mn=new WeakMap,wr=new WeakMap,xr=new WeakMap,Wr=new WeakMap;function re(e,t,n=!1){var r=new Jr(e),a=n?sn:0;function i(s,l){r.ensure(s,l)}ir(()=>{var s=!1;t((l,c=0)=>{s=!0,i(c,l)}),s||i(-1,null)},a)}const no=Symbol("NaN");function ro(e,t,n){var r=new Jr(e),a=!sr();ir(()=>{var i=t();i!==i&&(i=no),a&&i!==null&&typeof i=="object"&&(i={}),r.ensure(i,n)})}function Cn(e,t){return t}function ao(e,t,n){for(var r=[],a=t.length,i,s=t.length,l=0;l<a;l++){let h=t[l];Nn(h,()=>{if(i){if(i.pending.delete(h),i.done.add(h),i.pending.size===0){var v=e.outrogroups;ba(e,Ur(i.done)),v.delete(i),v.size===0&&(e.outrogroups=null)}}else s-=1},!1)}if(s===0){var c=r.length===0&&n!==null;if(c){var d=n,f=d.parentNode;zl(f),f.append(d),e.items.clear()}ba(e,t,!c)}else i={pending:new Set(t),done:new Set},(e.outrogroups??(e.outrogroups=new Set)).add(i)}function ba(e,t,n=!0){var r;if(e.pending.size>0){r=new Set;for(const s of e.pending.values())for(const l of s)r.add(e.items.get(l).e)}for(var a=0;a<t.length;a++){var i=t[a];if(r!=null&&r.has(i)){i.f|=St;const s=document.createDocumentFragment();La(i,s)}else Me(t[a],n)}}var Qa;function cn(e,t,n,r,a,i=null){var s=e,l=new Map,c=(t&xs)!==0;if(c){var d=e;s=d.appendChild(Ht())}var f=null,h=za(()=>{var O=n();return ka(O)?O:O==null?[]:Ur(O)}),v,$=new Map,m=!0;function k(O){q.effect.f&rt||(q.pending.delete(O),q.fallback=f,so(q,v,s,t,r),f!==null&&(v.length===0?f.f&St?(f.f^=St,pr(f,null,s)):qa(f):Nn(f,()=>{f=null})))}function _(O){q.pending.delete(O)}var w=ir(()=>{v=o(h);for(var O=v.length,A=new Set,M=D,V=Ws(),C=0;C<O;C+=1){var N=v[C],W=r(N,C),te=m?null:l.get(W);te?(te.v&&er(te.v,N),te.i&&er(te.i,C),V&&M.unskip_effect(te.e)):(te=io(l,m?s:Qa??(Qa=Ht()),N,W,C,a,t,n),m||(te.e.f|=St),l.set(W,te)),A.add(W)}if(O===0&&i&&!f&&(m?f=Be(()=>i(s)):(f=Be(()=>i(Qa??(Qa=Ht()))),f.f|=St)),O>A.size&&Ii(),!m)if($.set(M,A),V){for(const[ye,Se]of l)A.has(ye)||M.skip_effect(Se.e);M.oncommit(k),M.ondiscard(_)}else k(M);o(h)}),q={effect:w,items:l,pending:$,outrogroups:null,fallback:f};m=!1}function ur(e){for(;e!==null&&!(e.f&gt);)e=e.next;return e}function so(e,t,n,r,a){var te,ye,Se,qe,Le,lt,ot,Je,ct;var i=(r&Ui)!==0,s=t.length,l=e.items,c=ur(e.effect.first),d,f=null,h,v=[],$=[],m,k,_,w;if(i)for(w=0;w<s;w+=1)m=t[w],k=a(m,w),_=l.get(k).e,_.f&St||((ye=(te=_.nodes)==null?void 0:te.a)==null||ye.measure(),(h??(h=new Set)).add(_));for(w=0;w<s;w+=1){if(m=t[w],k=a(m,w),_=l.get(k).e,e.outrogroups!==null)for(const ze of e.outrogroups)ze.pending.delete(_),ze.done.delete(_);if(_.f&St)if(_.f^=St,_===c)pr(_,null,n);else{var q=f?f.next:c;_===e.effect.last&&(e.effect.last=_.prev),_.prev&&(_.prev.next=_.next),_.next&&(_.next.prev=_.prev),Xt(e,f,_),Xt(e,_,q),pr(_,q,n),f=_,v=[],$=[],c=ur(f.next);continue}if(_.f&Ke&&(qa(_),i&&((qe=(Se=_.nodes)==null?void 0:Se.a)==null||qe.unfix(),(h??(h=new Set)).delete(_))),_!==c){if(d!==void 0&&d.has(_)){if(v.length<$.length){var O=$[0],A;f=O.prev;var M=v[0],V=v[v.length-1];for(A=0;A<v.length;A+=1)pr(v[A],O,n);for(A=0;A<$.length;A+=1)d.delete($[A]);Xt(e,M.prev,V.next),Xt(e,f,M),Xt(e,V,O),c=O,f=V,w-=1,v=[],$=[]}else d.delete(_),pr(_,c,n),Xt(e,_.prev,_.next),Xt(e,_,f===null?e.effect.first:f.next),Xt(e,f,_),f=_;continue}for(v=[],$=[];c!==null&&c!==_;)(d??(d=new Set)).add(c),$.push(c),c=ur(c.next);if(c===null)continue}_.f&St||v.push(_),f=_,c=ur(_.next)}if(e.outrogroups!==null){for(const ze of e.outrogroups)ze.pending.size===0&&(ba(e,Ur(ze.done)),(Le=e.outrogroups)==null||Le.delete(ze));e.outrogroups.size===0&&(e.outrogroups=null)}if(c!==null||d!==void 0){var C=[];if(d!==void 0)for(_ of d)_.f&Ke||C.push(_);for(;c!==null;)!(c.f&Ke)&&c!==e.fallback&&C.push(c),c=ur(c.next);var N=C.length;if(N>0){var W=r&xs&&s===0?n:null;if(i){for(w=0;w<N;w+=1)(ot=(lt=C[w].nodes)==null?void 0:lt.a)==null||ot.measure();for(w=0;w<N;w+=1)(ct=(Je=C[w].nodes)==null?void 0:Je.a)==null||ct.fix()}ao(e,C,W)}}i&&Vt(()=>{var ze,Pt;if(h!==void 0)for(_ of h)(Pt=(ze=_.nodes)==null?void 0:ze.a)==null||Pt.apply()})}function io(e,t,n,r,a,i,s,l){var c=s&Gi?s&Yi?ln(n):El(n,!1,!1):null,d=s&Wi?ln(a):null;return{v:c,i:d,e:Be(()=>(i(t,c??n,d??a,l),()=>{e.delete(r)}))}}function pr(e,t,n){if(e.nodes)for(var r=e.nodes.start,a=e.nodes.end,i=t&&!(t.f&St)?t.nodes.start:n;r!==null;){var s=Er(r);if(i.before(r),r===a)return;r=s}}function Xt(e,t,n){t===null?e.effect.first=n:t.next=n,n===null?e.effect.last=t:n.prev=t}function R(e,t,n,r,a){var l;var i=(l=t.$$slots)==null?void 0:l[n],s=!1;i===!0&&(i=t.children,s=!0),i===void 0||i(e,s?()=>r:r)}function lo(e,t,n){var r=new Jr(e);ir(()=>{var a=t()??null;r.ensure(a,a&&(i=>n(i,a)))},sn)}function oo(e,t,n,r,a,i){var s=null,l=e,c=new Jr(l,!1);ir(()=>{const d=t()||null;var f=tl;if(d===null){c.ensure(null,null);return}return c.ensure(d,h=>{if(d){if(s=Us(d,f),yr(s,s),r){var v=s.appendChild(Ht());r(s,v)}G.nodes.end=s,h.before(s)}}),()=>{}},sn),Ca(()=>{})}function co(e,t){var n=void 0,r;Zs(()=>{n!==(n=t())&&(r&&(Me(r),r=null),n&&(r=Be(()=>{Kr(()=>n(e))})))})}function ui(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var a=e.length;for(t=0;t<a;t++)e[t]&&(n=ui(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function uo(){for(var e,t,n=0,r="",a=arguments.length;n<a;n++)(e=arguments[n])&&(t=ui(e))&&(r&&(r+=" "),r+=t);return r}function fo(e){return typeof e=="object"?uo(e):e??""}const es=[...` 	
\r\f \v\uFEFF`];function vo(e,t,n){var r=e==null?"":""+e;if(t&&(r=r?r+" "+t:t),n){for(var a of Object.keys(n))if(n[a])r=r?r+" "+a:a;else if(r.length)for(var i=a.length,s=0;(s=r.indexOf(a,s))>=0;){var l=s+i;(s===0||es.includes(r[s-1]))&&(l===r.length||es.includes(r[l]))?r=(s===0?"":r.substring(0,s))+r.substring(l+1):s=l}}return r===""?null:r}function ts(e,t=!1){var n=t?" !important;":";",r="";for(var a of Object.keys(e)){var i=e[a];i!=null&&i!==""&&(r+=" "+a+": "+i+n)}return r}function ea(e){return e[0]!=="-"||e[1]!=="-"?e.toLowerCase():e}function po(e,t){if(t){var n="",r,a;if(Array.isArray(t)?(r=t[0],a=t[1]):r=t,e){e=String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var i=!1,s=0,l=!1,c=[];r&&c.push(...Object.keys(r).map(ea)),a&&c.push(...Object.keys(a).map(ea));var d=0,f=-1;const k=e.length;for(var h=0;h<k;h++){var v=e[h];if(l?v==="/"&&e[h-1]==="*"&&(l=!1):i?i===v&&(i=!1):v==="/"&&e[h+1]==="*"?l=!0:v==='"'||v==="'"?i=v:v==="("?s++:v===")"&&s--,!l&&i===!1&&s===0){if(v===":"&&f===-1)f=h;else if(v===";"||h===k-1){if(f!==-1){var $=ea(e.substring(d,f).trim());if(!c.includes($)){v!==";"&&h++;var m=e.substring(d,h).trim();n+=" "+m+";"}}d=h+1,f=-1}}}}return r&&(n+=ts(r)),a&&(n+=ts(a,!0)),n=n.trim(),n===""?null:n}return e==null?null:String(e)}function Ye(e,t,n,r,a,i){var s=e.__className;if(s!==n||s===void 0){var l=vo(n,r,i);l==null?e.removeAttribute("class"):t?e.className=l:e.setAttribute("class",l),e.__className=n}else if(i&&a!==i)for(var c in i){var d=!!i[c];(a==null||d!==!!a[c])&&e.classList.toggle(c,d)}return i}function ta(e,t={},n,r){for(var a in n){var i=n[a];t[a]!==i&&(n[a]==null?e.style.removeProperty(a):e.style.setProperty(a,i,r))}}function jr(e,t,n,r){var a=e.__style;if(a!==t){var i=po(t,r);i==null?e.removeAttribute("style"):e.style.cssText=i,e.__style=t}else r&&(Array.isArray(r)?(ta(e,n==null?void 0:n[0],r[0]),ta(e,n==null?void 0:n[1],r[1],"important")):ta(e,n,r));return r}function Vr(e,t,n=!1){if(e.multiple){if(t==null)return;if(!ka(t))return rl();for(var r of e.options)r.selected=t.includes(mr(r));return}for(r of e.options){var a=mr(r);if(Nl(a,t)){r.selected=!0;return}}(!n||t!==void 0)&&(e.selectedIndex=-1)}function fi(e){var t=new MutationObserver(()=>{Vr(e,e.__value)});t.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),Ca(()=>{t.disconnect()})}function ho(e,t,n=t){var r=new WeakSet,a=!0;Ys(e,"change",i=>{var s=i?"[selected]":":checked",l;if(e.multiple)l=[].map.call(e.querySelectorAll(s),mr);else{var c=e.querySelector(s)??e.querySelector("option:not([disabled])");l=c&&mr(c)}n(l),D!==null&&r.add(D)}),Kr(()=>{var i=t();if(e===document.activeElement){var s=D;if(r.has(s))return}if(Vr(e,i,a),a&&i===void 0){var l=e.querySelector(":checked");l!==null&&(i=mr(l),n(i))}e.__value=i,a=!1}),fi(e)}function mr(e){return"__value"in e?e.__value:e.value}const fr=Symbol("class"),vr=Symbol("style"),vi=Symbol("is custom element"),pi=Symbol("is html"),_o=$s?"option":"OPTION",mo=$s?"select":"SELECT";function go(e,t){t?e.hasAttribute("selected")||e.setAttribute("selected",""):e.removeAttribute("selected")}function br(e,t,n,r){var a=hi(e);a[t]!==(a[t]=n)&&(t==="loading"&&(e[Ci]=n),n==null?e.removeAttribute(t):typeof n!="string"&&_i(e).includes(t)?e[t]=n:e.setAttribute(t,n))}function yo(e,t,n,r,a=!1,i=!1){var s=hi(e),l=s[vi],c=!s[pi],d=t||{},f=e.nodeName===_o;for(var h in t)h in n||(n[h]=null);n.class?n.class=fo(n.class):n[fr]&&(n.class=null),n[vr]&&(n.style??(n.style=null));var v=_i(e);for(const A in n){let M=n[A];if(f&&A==="value"&&M==null){e.value=e.__value="",d[A]=M;continue}if(A==="class"){var $=e.namespaceURI==="http://www.w3.org/1999/xhtml";Ye(e,$,M,r,t==null?void 0:t[fr],n[fr]),d[A]=M,d[fr]=n[fr];continue}if(A==="style"){jr(e,M,t==null?void 0:t[vr],n[vr]),d[A]=M,d[vr]=n[vr];continue}var m=d[A];if(!(M===m&&!(M===void 0&&e.hasAttribute(A)))){d[A]=M;var k=A[0]+A[1];if(k!=="$$")if(k==="on"){const V={},C="$$"+A;let N=A.slice(2);var _=Bl(N);if(Vl(N)&&(N=N.slice(0,-7),V.capture=!0),!_&&m){if(M!=null)continue;e.removeEventListener(N,d[C],V),d[C]=null}if(_)le(N,e,M),Nr([N]);else if(M!=null){let W=function(te){d[A].call(this,te)};var O=W;d[C]=Kl(N,e,W,V)}}else if(A==="style")br(e,A,M);else if(A==="autofocus")Pl(e,!!M);else if(!l&&(A==="__value"||A==="value"&&M!=null))e.value=e.__value=M;else if(A==="selected"&&f)go(e,M);else{var w=A;c||(w=Wl(w));var q=w==="defaultValue"||w==="defaultChecked";if(M==null&&!l&&!q)if(s[A]=null,w==="value"||w==="checked"){let V=e;const C=t===void 0;if(w==="value"){let N=V.defaultValue;V.removeAttribute(w),V.defaultValue=N,V.value=V.__value=C?N:null}else{let N=V.defaultChecked;V.removeAttribute(w),V.defaultChecked=N,V.checked=C?N:!1}}else e.removeAttribute(A);else q||v.includes(w)&&(l||typeof M!="string")?(e[w]=M,w in s&&(s[w]=ke)):typeof M!="function"&&br(e,w,M)}}}return d}function ns(e,t,n=[],r=[],a=[],i,s=!1,l=!1){Ls(a,n,r,c=>{var d=void 0,f={},h=e.nodeName===mo,v=!1;if(Zs(()=>{var m=t(...c.map(o)),k=yo(e,d,m,i,s,l);v&&h&&"value"in m&&Vr(e,m.value);for(let w of Object.getOwnPropertySymbols(f))m[w]||Me(f[w]);for(let w of Object.getOwnPropertySymbols(m)){var _=m[w];w.description===nl&&(!d||_!==d[w])&&(f[w]&&Me(f[w]),f[w]=Be(()=>co(e,()=>_))),k[w]=_}d=k}),h){var $=e;Kr(()=>{Vr($,d.value,!0),fi($)})}v=!0})}function hi(e){return e.__attributes??(e.__attributes={[vi]:e.nodeName.includes("-"),[pi]:e.namespaceURI===As})}var rs=new Map;function _i(e){var t=e.getAttribute("is")||e.nodeName,n=rs.get(t);if(n)return n;rs.set(t,n=[]);for(var r,a=e,i=Element.prototype;i!==a;){r=ms(a);for(var s in r)r[s].set&&n.push(s);a=Aa(a)}return n}function Hr(e,t,n=t){var r=new WeakSet;Ys(e,"input",async a=>{var i=a?e.defaultValue:e.value;if(i=na(e)?ra(i):i,n(i),D!==null&&r.add(D),await jl(),i!==(i=t())){var s=e.selectionStart,l=e.selectionEnd,c=e.value.length;if(e.value=i??"",l!==null){var d=e.value.length;s===l&&l===c&&d>c?(e.selectionStart=d,e.selectionEnd=d):(e.selectionStart=s,e.selectionEnd=Math.min(l,d))}}}),Gt(t)==null&&e.value&&(n(na(e)?ra(e.value):e.value),D!==null&&r.add(D)),Oa(()=>{var a=t();if(e===document.activeElement){var i=D;if(r.has(i))return}na(e)&&a===ra(e.value)||e.type==="date"&&!a&&!e.value||a!==e.value&&(e.value=a??"")})}function na(e){var t=e.type;return t==="number"||t==="range"}function ra(e){return e===""?null:+e}function as(e,t){return e===t||(e==null?void 0:e[zt])===t}function Ra(e={},t,n,r){var a=ue.r,i=G;return Kr(()=>{var s,l;return Oa(()=>{s=l,l=[],Gt(()=>{e!==n(...l)&&(t(e,...l),s&&as(n(...s),e)&&t(null,...s))})}),()=>{let c=i;for(;c!==a&&c.parent!==null&&c.parent.f&la;)c=c.parent;const d=()=>{l&&as(n(...l),e)&&t(null,...l)},f=c.teardown;c.teardown=()=>{d(),f==null||f()}}}),e}function bo(e=!1){const t=ue,n=t.l.u;if(!n)return;let r=()=>$n(t.s);if(e){let a=0,i={};const s=Ar(()=>{let l=!1;const c=t.s;for(const d in c)c[d]!==i[d]&&(i[d]=c[d],l=!0);return l&&a++,a});r=()=>o(s)}n.b.length&&Ol(()=>{ss(t,r),sa(n.b)}),Bt(()=>{const a=Gt(()=>n.m.map(zi));return()=>{for(const i of a)typeof i=="function"&&i()}}),n.a.length&&Bt(()=>{ss(t,r),sa(n.a)})}function ss(e,t){if(e.l.s)for(const n of e.l.s)o(n);t()}const $o={get(e,t){if(!e.exclude.includes(t))return o(e.version),t in e.special?e.special[t]():e.props[t]},set(e,t,n){if(!(t in e.special)){var r=G;try{it(e.parent_effect),e.special[t]=Nt({get[t](){return e.props[t]}},t,ks)}finally{it(r)}}return e.special[t](n),Wa(e.version),!0},getOwnPropertyDescriptor(e,t){if(!e.exclude.includes(t)&&t in e.props)return{enumerable:!0,configurable:!0,value:e.props[t]}},deleteProperty(e,t){return e.exclude.includes(t)||(e.exclude.push(t),Wa(e.version)),!0},has(e,t){return e.exclude.includes(t)?!1:t in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(t=>!e.exclude.includes(t))}};function L(e,t){return new Proxy({props:e,exclude:t,special:{},version:ln(0),parent_effect:G},$o)}const wo={get(e,t){let n=e.props.length;for(;n--;){let r=e.props[n];if(cr(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r)return r[t]}},set(e,t,n){let r=e.props.length;for(;r--;){let a=e.props[r];cr(a)&&(a=a());const i=nn(a,t);if(i&&i.set)return i.set(n),!0}return!1},getOwnPropertyDescriptor(e,t){let n=e.props.length;for(;n--;){let r=e.props[n];if(cr(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r){const a=nn(r,t);return a&&!a.configurable&&(a.configurable=!0),a}}},has(e,t){if(t===zt||t===bs)return!1;for(let n of e.props)if(cr(n)&&(n=n()),n!=null&&t in n)return!0;return!1},ownKeys(e){const t=[];for(let n of e.props)if(cr(n)&&(n=n()),!!n){for(const r in n)t.includes(r)||t.push(r);for(const r of Object.getOwnPropertySymbols(n))t.includes(r)||t.push(r)}return t}};function F(...e){return new Proxy({props:e},wo)}function Nt(e,t,n,r){var O;var a=!ar||(n&Ji)!==0,i=(n&Zi)!==0,s=(n&Xi)!==0,l=r,c=!0,d=()=>(c&&(c=!1,l=s?Gt(r):r),l);let f;if(i){var h=zt in e||bs in e;f=((O=nn(e,t))==null?void 0:O.set)??(h&&t in e?A=>e[t]=A:void 0)}var v,$=!1;i?[v,$]=dl(()=>e[t]):v=e[t],v===void 0&&r!==void 0&&(v=d(),f&&(a&&Fi(),f(v)));var m;if(a?m=()=>{var A=e[t];return A===void 0?d():(c=!0,A)}:m=()=>{var A=e[t];return A!==void 0&&(l=void 0),A===void 0?l:A},a&&!(n&ks))return m;if(f){var k=e.$$legacy;return function(A,M){return arguments.length>0?((!a||!M||k||$)&&f(M?m():A),A):m()}}var _=!1,w=(n&Ki?Ar:za)(()=>(_=!1,m()));i&&o(w);var q=G;return function(A,M){if(arguments.length>0){const V=M?o(w):a&&i?Oe(A):A;return b(w,V),_=!0,l!==void 0&&(l=V),A}return on&&_||q.f&rt?w.v:o(w)}}function Sr(e){ue===null&&ws(),ar&&ue.l!==null?ko(ue).m.push(e):Bt(()=>{const t=Gt(e);if(typeof t=="function")return t})}function xo(e){ue===null&&ws(),Sr(()=>()=>Gt(e))}function ko(e){var t=e.l;return t.u??(t.u={a:[],b:[],m:[]})}const Ao="5";var _s;typeof window<"u"&&((_s=window.__svelte??(window.__svelte={})).v??(_s.v=new Set)).add(Ao);ll();/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The MIT License (MIT) (for portions derived from Feather)
 * 
 * Copyright (c) 2013-2026 Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const Eo={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The MIT License (MIT) (for portions derived from Feather)
 * 
 * Copyright (c) 2013-2026 Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const Mo=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 * ---
 * 
 * The MIT License (MIT) (for portions derived from Feather)
 * 
 * Copyright (c) 2013-2026 Cole Bemis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */const is=(...e)=>e.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();var No=Xl("<svg><!><!></svg>");function j(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]),r=L(n,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);Wt(t,!1);let a=Nt(t,"name",8,void 0),i=Nt(t,"color",8,"currentColor"),s=Nt(t,"size",8,24),l=Nt(t,"strokeWidth",8,2),c=Nt(t,"absoluteStrokeWidth",8,!1),d=Nt(t,"iconNode",24,()=>[]);bo();var f=No();ns(f,($,m,k)=>({...Eo,...$,...r,width:s(),height:s(),stroke:i(),"stroke-width":m,class:k}),[()=>Mo(r)?void 0:{"aria-hidden":"true"},()=>($n(c()),$n(l()),$n(s()),Gt(()=>c()?Number(l())*24/Number(s()):l())),()=>($n(is),$n(a()),$n(n),Gt(()=>is("lucide-icon","lucide",a()?`lucide-${a()}`:"",n.class)))]);var h=u(f);cn(h,1,d,Cn,($,m)=>{var k=Xe(()=>Pi(o(m),2));let _=()=>o(k)[0],w=()=>o(k)[1];var q=I(),O=P(q);oo(O,_,!0,(A,M)=>{ns(A,()=>({...w()}))}),y($,q)});var v=g(h);R(v,t,"default",{}),y(e,f),Ut()}function So(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]];j(e,F({name:"activity"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function zo(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];j(e,F({name:"arrow-right"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function ls(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 8V4H8"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2"}],["path",{d:"M2 14h2"}],["path",{d:"M20 14h2"}],["path",{d:"M15 13v2"}],["path",{d:"M9 13v2"}]];j(e,F({name:"bot"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Po(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]];j(e,F({name:"box"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function $a(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516"}],["path",{d:"M12 13h4"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1"}],["path",{d:"M12 8h8"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2"}],["circle",{cx:"16",cy:"13",r:".5"}],["circle",{cx:"18",cy:"3",r:".5"}],["circle",{cx:"20",cy:"21",r:".5"}],["circle",{cx:"20",cy:"8",r:".5"}]];j(e,F({name:"brain-circuit"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function wa(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M20 6 9 17l-5-5"}]];j(e,F({name:"check"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Rr(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m6 9 6 6 6-6"}]];j(e,F({name:"chevron-down"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function aa(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m9 18 6-6-6-6"}]];j(e,F({name:"chevron-right"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function To(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];j(e,F({name:"circle-alert"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function os(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335"}],["path",{d:"m9 11 3 3L22 4"}]];j(e,F({name:"circle-check-big"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Co(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];j(e,F({name:"circle-check"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Oo(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["rect",{x:"9",y:"9",width:"6",height:"6",rx:"1"}]];j(e,F({name:"circle-stop"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Io(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]];j(e,F({name:"circle-x"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function mi(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];j(e,F({name:"copy"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Da(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 20v2"}],["path",{d:"M12 2v2"}],["path",{d:"M17 20v2"}],["path",{d:"M17 2v2"}],["path",{d:"M2 12h2"}],["path",{d:"M2 17h2"}],["path",{d:"M2 7h2"}],["path",{d:"M20 12h2"}],["path",{d:"M20 17h2"}],["path",{d:"M20 7h2"}],["path",{d:"M7 20v2"}],["path",{d:"M7 2v2"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1"}]];j(e,F({name:"cpu"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function gi(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5"}],["path",{d:"M3 12A9 3 0 0 0 21 12"}]];j(e,F({name:"database"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function cs(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];j(e,F({name:"download"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function qo(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];j(e,F({name:"eye"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function ds(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M12 7v5l4 2"}]];j(e,F({name:"history"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function us(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];j(e,F({name:"info"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Lo(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"}],["path",{d:"M9 18h6"}],["path",{d:"M10 22h4"}]];j(e,F({name:"lightbulb"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Ro(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 2v4"}],["path",{d:"m16.2 7.8 2.9-2.9"}],["path",{d:"M18 12h4"}],["path",{d:"m16.2 16.2 2.9 2.9"}],["path",{d:"M12 18v4"}],["path",{d:"m4.9 19.1 2.9-2.9"}],["path",{d:"M2 12h4"}],["path",{d:"m4.9 4.9 2.9 2.9"}]];j(e,F({name:"loader"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Do(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}]];j(e,F({name:"message-square"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Fo(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]];j(e,F({name:"moon"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function jo(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];j(e,F({name:"play"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Dr(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"}]];j(e,F({name:"puzzle"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Cr(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];j(e,F({name:"refresh-cw"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Vo(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];j(e,F({name:"search"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Ho(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"}],["path",{d:"m21.854 2.147-10.94 10.939"}]];j(e,F({name:"send"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Bo(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];j(e,F({name:"settings"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Go(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]];j(e,F({name:"shield-check"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Wo(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M16 10a4 4 0 0 1-8 0"}],["path",{d:"M3.103 6.034h17.794"}],["path",{d:"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"}]];j(e,F({name:"shopping-bag"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function fs(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{d:"M20 2v4"}],["path",{d:"M22 4h-4"}],["circle",{cx:"4",cy:"20",r:"2"}]];j(e,F({name:"sparkles"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Uo(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];j(e,F({name:"sun"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Yo(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M12 19h8"}],["path",{d:"m4 17 6-6-6-6"}]];j(e,F({name:"terminal"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function yi(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];j(e,F({name:"trash-2"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function vs(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];j(e,F({name:"triangle-alert"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Ko(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];j(e,F({name:"user"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Jo(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"}]];j(e,F({name:"wrench"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Zo(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];j(e,F({name:"x"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}function Xo(e,t){const n=L(t,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.577.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2026 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const r=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]];j(e,F({name:"zap"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=I(),l=P(s);R(l,t,"default",{}),y(a,s)},$$slots:{default:!0}}))}var Qo=z('<button><!> <span class="label"> </span></button>'),ec=z('<button><span class="plugin-icon svelte-129hoe0"> </span> <span class="label"> </span></button>'),tc=z('<div class="empty-plugins svelte-129hoe0">No plugins installed</div>'),nc=z("<!> <span>Light Mode</span>",1),rc=z("<!> <span>Dark Mode</span>",1),ac=z('<aside class="sidebar glass svelte-129hoe0"><div class="logo svelte-129hoe0"><div class="logo-box svelte-129hoe0"><!></div> <span class="logo-text brand-font svelte-129hoe0">Cheesecrab</span></div> <nav class="nav-section svelte-129hoe0"></nav> <div class="separator svelte-129hoe0"></div> <div class="nav-section plugins svelte-129hoe0"><div class="section-header svelte-129hoe0"><!> <span class="section-title svelte-129hoe0">Plugins</span></div> <div class="scroll-area svelte-129hoe0"><!> <!></div></div> <div class="bottom-actions svelte-129hoe0"><button class="theme-toggle svelte-129hoe0" title="Toggle Theme"><!></button></div></aside>');function sc(e,t){Wt(t,!0);let n=Nt(t,"activeView",15),r=Nt(t,"installedPlugins",19,()=>[]),a=Nt(t,"theme",3,"dark");const i=[{id:"chat",icon:Do,label:"AI Space"},{id:"agent",icon:$a,label:"Agent Engine"},{id:"marketplace",icon:Wo,label:"Plugin Store"},{id:"settings",icon:Bo,label:"Settings"}];var s=ac(),l=u(s),c=u(l),d=u(c);Da(d,{size:20,color:"var(--accent-primary)"});var f=g(l,2);cn(f,21,()=>i,Cn,(C,N)=>{var W=Qo();let te;var ye=u(W);{let Le=Xe(()=>n()===o(N).id?2.5:2);lo(ye,()=>o(N).icon,(lt,ot)=>{ot(lt,{size:18,get strokeWidth(){return o(Le)}})})}var Se=g(ye,2),qe=u(Se);se(()=>{te=Ye(W,1,"nav-item svelte-129hoe0",null,te,{active:n()===o(N).id}),Z(qe,o(N).label)}),le("click",W,()=>n(o(N).id)),y(C,W)});var h=g(f,4),v=u(h),$=u(v);Dr($,{size:14});var m=g(v,2),k=u(m);cn(k,17,r,Cn,(C,N)=>{var W=ec();let te;var ye=u(W),Se=u(ye),qe=g(ye,2),Le=u(qe);se(()=>{te=Ye(W,1,"nav-item plugin svelte-129hoe0",null,te,{active:n()===o(N).id}),Z(Se,o(N).icon||"🧩"),Z(Le,o(N).label)}),le("click",W,()=>n(o(N).id)),y(C,W)});var _=g(k,2);{var w=C=>{var N=tc();y(C,N)};re(_,C=>{r().length===0&&C(w)})}var q=g(h,2),O=u(q),A=u(O);{var M=C=>{var N=nc(),W=P(N);Uo(W,{size:18}),y(C,N)},V=C=>{var N=rc(),W=P(N);Fo(W,{size:18}),y(C,N)};re(A,C=>{a()==="dark"?C(M):C(V,-1)})}le("click",O,function(...C){var N;(N=t.onToggleTheme)==null||N.apply(this,C)}),y(e,s),Ut()}Nr(["click"]);var ic=z('<div class="telemetry-bar border-t glass svelte-zgh7bo"><div class="status-group svelte-zgh7bo"><div class="status-item svelte-zgh7bo"><div class="pulse-dot svelte-zgh7bo"></div> <!> <span class="status-text svelte-zgh7bo"></span></div> <div class="separator-v svelte-zgh7bo"></div> <div class="status-item svelte-zgh7bo"><!> <span class="status-text svelte-zgh7bo">Network: Local Only</span></div></div> <div class="metrics-group svelte-zgh7bo"><div class="metric svelte-zgh7bo"><!> <span class="metric-label svelte-zgh7bo">CPU</span> <div class="progress-container svelte-zgh7bo"><div class="progress-bg svelte-zgh7bo"><div class="progress-fill svelte-zgh7bo"></div></div></div> <span class="metric-value svelte-zgh7bo"> </span></div> <div class="separator-v svelte-zgh7bo"></div> <div class="metric svelte-zgh7bo"><!> <span class="metric-label svelte-zgh7bo">RAM</span> <div class="progress-container svelte-zgh7bo"><div class="progress-bg svelte-zgh7bo"><div class="progress-fill svelte-zgh7bo"></div></div></div> <span class="metric-value svelte-zgh7bo"> </span></div></div></div>');function lc(e,t){Wt(t,!0);let n=T(12),r=T(4.2),a=16;Bt(()=>{const ye=setInterval(()=>{b(n,Math.floor(Math.random()*25)+5),b(r,+(4.2+Math.random()*.3).toFixed(1))},3e3);return()=>clearInterval(ye)});var i=ic(),s=u(i),l=u(s),c=g(u(l),2);Go(c,{size:14,color:"#10b981"});var d=g(c,2);d.textContent="System Ready";var f=g(l,4),h=u(f);So(h,{size:14});var v=g(s,2),$=u(v),m=u($);Da(m,{size:14});var k=g(m,4),_=u(k),w=u(_),q=g(k,2),O=u(q),A=g($,4),M=u(A);gi(M,{size:14});var V=g(M,4),C=u(V),N=u(C),W=g(V,2),te=u(W);se(()=>{jr(w,`width: ${o(n)??""}%`),Z(O,`${o(n)??""}%`),jr(N,`width: ${o(r)/a*100}%`),Z(te,`${o(r)??""}G / 16G`)}),y(e,i),Ut()}function zr(){var e,t;return((t=(e=window.go)==null?void 0:e.main)==null?void 0:t.App)??null}async function Fa(){const e=zr();if(e&&e.GetModels){const r=await e.GetModels();return Array.isArray(r)?r:[]}const t=await fetch("/api/models");if(!t.ok)throw new Error(`getModels: ${t.status}`);const n=await t.json();return Array.isArray(n==null?void 0:n.data)?n.data:n&&!Array.isArray(n)?[]:n||[]}async function oc(){const e=zr();if(e&&e.GetSwarmAgents){const t=await e.GetSwarmAgents();return Array.isArray(t)?t:[]}try{const t=await fetch("/v1/agents");if(!t.ok)return[];const n=await t.json();return Array.isArray(n==null?void 0:n.agents)?n.agents:[]}catch{return[]}}function cc(e,{onToken:t,onError:n,onDone:r}){const a=zr();if(a&&a.ChatCompletion&&window.runtime){const s=()=>{try{window.runtime.EventsOff("chat:token"),window.runtime.EventsOff("chat:error"),window.runtime.EventsOff("chat:done")}catch{}};window.runtime.EventsOn("chat:token",l=>{try{t(l)}catch{}}),window.runtime.EventsOn("chat:error",l=>{s();try{n(String(l))}catch{}}),window.runtime.EventsOn("chat:done",()=>{s();try{r()}catch{}}),a.ChatCompletion({...e,stream:!0});return}const i=JSON.stringify({...e,stream:!0});fetch("/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json"},body:i}).then(s=>{if(!s.ok){s.text().then(h=>n(h||`HTTP ${s.status}`)).catch(()=>n(`HTTP ${s.status}`));return}const l=s.body.getReader(),c=new TextDecoder;let d="";function f(){return l.read().then(({done:h,value:v})=>{if(h){r();return}d+=c.decode(v,{stream:!0});const $=d.split(`
`);d=$.pop()??"";for(const m of $)if(m.startsWith("data: ")){const k=m.slice(6);if(k==="[DONE]"){r();return}try{const _=JSON.parse(k);t(_)}catch{}}return f()})}return f()}).catch(s=>n((s==null?void 0:s.message)||String(s)))}function dc(e,{onProgress:t,onError:n}){const r=zr();if(r&&r.PullModel&&window.runtime){window.runtime.EventsOn("pull:progress",i=>{try{t(i)}catch{}}),window.runtime.EventsOn("pull:error",i=>{try{n(String(i))}catch{}}),r.PullModel(e);return}const a=JSON.stringify({model:e,stream:!0});fetch("/api/pull",{method:"POST",headers:{"Content-Type":"application/json"},body:a}).then(i=>{if(!i.ok){i.text().then(f=>n(f||`HTTP ${i.status}`)).catch(()=>n(`HTTP ${i.status}`));return}const s=i.body.getReader(),l=new TextDecoder;let c="";function d(){return s.read().then(({done:f,value:h})=>{if(f)return;c+=l.decode(h,{stream:!0});const v=c.split(`
`);c=v.pop()??"";for(const $ of v)if($.trim())try{t(JSON.parse($))}catch{}return d()})}return d()}).catch(i=>n((i==null?void 0:i.message)||String(i)))}function uc(e,{onEvent:t,onError:n,onDone:r}){const a=new AbortController,i=JSON.stringify(e);return fetch("/v1/agent/run",{method:"POST",headers:{"Content-Type":"application/json"},body:i,signal:a.signal}).then(s=>{if(!s.ok){s.text().then(h=>n(h||`HTTP ${s.status}`)).catch(()=>n(`HTTP ${s.status}`));return}const l=s.body.getReader(),c=new TextDecoder;let d="";function f(){return l.read().then(({done:h,value:v})=>{if(h){r();return}d+=c.decode(v,{stream:!0});const $=d.split(`
`);d=$.pop()??"";for(const m of $)if(m.startsWith("data: ")){const k=m.slice(6).trim();if(k==="[DONE]"){r();return}try{const _=JSON.parse(k);t(_)}catch{}}return f()})}return f()}).catch(s=>{(s==null?void 0:s.name)!=="AbortError"&&n((s==null?void 0:s.message)||String(s))}),{cancel:()=>a.abort()}}async function fc(e,t){const n=await fetch("/v1/agent/approve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:e,approved:t})});if(!n.ok){const r=await n.text();throw new Error(r||`agentApprove: HTTP ${n.status}`)}}async function vc(){try{const e=await fetch("/v1/agent/paths");if(!e.ok)return[];const t=await e.json();return Array.isArray(t==null?void 0:t.paths)?t.paths:[]}catch{return[]}}async function pc(e){const t=zr();if(t&&t.LoadModel){await t.LoadModel(e);return}const n=await fetch("/models/load",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:e})});if(!n.ok){const r=await n.text();throw new Error(r||`HTTP ${n.status}`)}}var hc=z("<span> </span>"),_c=z("<span>Single agent</span>"),mc=z('<div><div><div class="avatar svelte-126kodk"><!></div> <div class="bubble-wrapper svelte-126kodk"><div class="bubble svelte-126kodk"> </div> <div class="bubble-actions svelte-126kodk"><button class="action-btn svelte-126kodk"><!></button></div></div></div></div>'),gc=z('<div class="message-wrapper svelte-126kodk"><div class="message assistant thinking svelte-126kodk"><div class="avatar svelte-126kodk"><!></div> <div class="bubble thinking-bubble svelte-126kodk"><div class="dot-loader svelte-126kodk"></div></div></div></div>'),yc=z('<div class="chat-space animate-fade svelte-126kodk"><header class="chat-header glass svelte-126kodk"><div class="model-info svelte-126kodk"><div></div> <span class="model-name svelte-126kodk"> </span> <!></div> <div><!> <!></div> <div class="header-actions"><button class="icon-btn svelte-126kodk" title="Clear Chat"><!></button></div></header> <div class="messages-container svelte-126kodk"><!> <!></div> <div class="input-area svelte-126kodk"><div><textarea class="svelte-126kodk"></textarea> <div class="input-footer svelte-126kodk"><div class="input-hints svelte-126kodk"><!> <span>Local Engine Ready</span></div> <button class="send-btn svelte-126kodk"><!></button></div></div> <p class="disclaimer svelte-126kodk">Private. Local. Edge-native.</p></div></div>');function bc(e,t){Wt(t,!0);let n=T(Oe([{role:"assistant",content:"Welcome to AI Space. I am the Cheesecrab Engine. How can I assist you today?"}])),r=T(""),a=T(!1),i=T(!1),s=T(null),l=T(null),c=T(Oe({id:"Searching...",status:"idle"})),d=T(Oe([]));async function f(){try{const U=await Fa();if(!Array.isArray(U)||U.length===0){b(c,{id:"No Active Model",status:"idle"},!0);return}const ae=pe=>{var Re;return((Re=pe==null?void 0:pe.status)==null?void 0:Re.value)??(pe==null?void 0:pe.status)},he=U.find(pe=>ae(pe)==="loaded");he&&he.id?b(c,{id:String(he.id).split("/").pop().replace(/\.gguf$/i,""),status:"ready",rawId:he.id},!0):b(c,{id:"No Active Model",status:"idle"},!0)}catch{b(c,{id:"No Active Model",status:"idle"},!0)}}async function h(){try{const U=await oc();b(d,Array.isArray(U)?U:[],!0)}catch{b(d,[],!0)}}Sr(()=>{f(),h();const U=setInterval(()=>{f(),h()},3e3);return()=>clearInterval(U)});function v(){o(s)&&(o(s).scrollTop=o(s).scrollHeight)}Bt(()=>{o(n).length,setTimeout(v,50)});function $(){if(!o(r).trim()||o(a)||o(i))return;if(o(c).status!=="ready"){alert("Please load a model in the Plugin Store first.");return}const U=o(r);b(n,[...o(n),{role:"user",content:U}],!0),b(r,""),b(a,!0),cc({model:o(c).rawId,messages:o(n).map(ae=>({role:ae.role,content:ae.content}))},{onToken:ae=>{var pe,Re,$t;b(a,!1);const he=(($t=(Re=(pe=ae.choices)==null?void 0:pe[0])==null?void 0:Re.delta)==null?void 0:$t.content)||"";if(he){const dt=o(n)[o(n).length-1];dt&&dt.role==="assistant"&&o(i)?(dt.content+=he,b(n,[...o(n)],!0)):(b(n,[...o(n),{role:"assistant",content:he}],!0),b(i,!0))}},onError:ae=>{b(a,!1),b(i,!1),b(n,[...o(n),{role:"assistant",content:`Error: ${ae}`}],!0)},onDone:()=>{b(a,!1),b(i,!1)}})}function m(){b(n,[{role:"assistant",content:"Chat cleared. How can I help you now?"}],!0)}function k(U,ae){navigator.clipboard.writeText(U),b(l,ae,!0),setTimeout(()=>b(l,null),2e3)}var _=yc(),w=u(_),q=u(w),O=u(q);let A;var M=g(O,2),V=u(M),C=g(M,2);Rr(C,{size:14});var N=g(q,2);let W;var te=u(N);fs(te,{size:14});var ye=g(te,2);{var Se=U=>{var ae=hc(),he=u(ae);se(()=>Z(he,`${o(d).length??""} agents in swarm`)),y(U,ae)},qe=U=>{var ae=_c();y(U,ae)};re(ye,U=>{o(d).length>0?U(Se):U(qe,-1)})}var Le=g(N,2),lt=u(Le),ot=u(lt);yi(ot,{size:18});var Je=g(w,2),ct=u(Je);cn(ct,17,()=>o(n),Cn,(U,ae,he)=>{var pe=mc();let Re;var $t=u(pe),dt=u($t),pn=u(dt);{var hn=Y=>{ls(Y,{size:18})},Ln=Y=>{Ko(Y,{size:18})};re(pn,Y=>{o(ae).role==="assistant"?Y(hn):Y(Ln,-1)})}var Rn=g(dt,2),_n=u(Rn),Dn=u(_n),Fn=g(_n,2),ut=u(Fn),lr=u(ut);{var S=Y=>{wa(Y,{size:12,color:"var(--accent-primary)"})},Q=Y=>{mi(Y,{size:12})};re(lr,Y=>{o(l)===he?Y(S):Y(Q,-1)})}se(()=>{Re=Ye(pe,1,"message-wrapper svelte-126kodk",null,Re,{user:o(ae).role==="user"}),Ye($t,1,`message ${o(ae).role??""}`,"svelte-126kodk"),Z(Dn,o(ae).content)}),le("click",ut,()=>k(o(ae).content,he)),y(U,pe)});var ze=g(ct,2);{var Pt=U=>{var ae=gc(),he=u(ae),pe=u(he),Re=u(pe);ls(Re,{size:18}),y(U,ae)};re(ze,U=>{o(a)&&U(Pt)})}Ra(Je,U=>b(s,U),()=>o(s));var un=g(Je,2),Tt=u(un);let fn;var Ct=u(Tt),Yt=g(Ct,2),In=u(Yt),vn=u(In);fs(vn,{size:12});var Kt=g(In,2),qn=u(Kt);Ho(qn,{size:18}),se(()=>{A=Ye(O,1,"status-indicator svelte-126kodk",null,A,{active:o(c).status==="ready"}),Z(V,o(c).id),W=Ye(N,1,"swarm-info svelte-126kodk",null,W,{active:o(d).length>0}),fn=Ye(Tt,1,"input-container glass svelte-126kodk",null,fn,{disabled:o(c).status!=="ready"}),br(Ct,"placeholder",o(c).status==="ready"?"Ask anything...":"Load a model to start chat"),Ct.disabled=o(c).status!=="ready"||o(a)||o(i),Kt.disabled=!o(r)||o(a)||o(i)||o(c).status!=="ready"}),le("click",lt,m),le("keydown",Ct,U=>U.key==="Enter"&&!U.shiftKey&&(U.preventDefault(),$())),Hr(Ct,()=>o(r),U=>b(r,U)),le("click",Kt,$),y(e,_),Ut()}Nr(["click","keydown"]);var $c=z('<div class="empty-state svelte-18mm1rx"><!> <p class="empty-title svelte-18mm1rx">Ready to run</p> <p class="empty-sub svelte-18mm1rx">Enter a goal below and press Run</p></div>'),wc=z('<div class="timeline-card thinking-card svelte-18mm1rx"><div class="card-icon spin svelte-18mm1rx"><!></div> <span class="card-label muted svelte-18mm1rx"> </span></div>'),xc=z('<div class="card-body svelte-18mm1rx"><p class="reasoning-text svelte-18mm1rx"> </p></div>'),kc=z('<div class="timeline-card thought-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx" role="button" tabindex="0"><div class="card-icon svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx"> </span> <span class="card-plan muted svelte-18mm1rx"> </span> <div class="expand-icon svelte-18mm1rx"><!></div></div> <!></div>'),Ac=z('<span class="badge danger svelte-18mm1rx"><!> dangerous</span>'),Ec=z('<div class="card-body svelte-18mm1rx"><pre class="code-block svelte-18mm1rx"> </pre></div>'),Mc=z('<div class="timeline-card tool-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx" role="button" tabindex="0"><div class="card-icon svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx"><code class="svelte-18mm1rx"> </code></span> <!> <div class="expand-icon svelte-18mm1rx"><!></div></div> <!></div>'),Nc=z('<div class="approval-buttons svelte-18mm1rx"><button class="approve-btn svelte-18mm1rx"><!> Approve</button> <button class="deny-btn svelte-18mm1rx"><!> Deny</button></div>'),Sc=z('<div class="approval-resolved muted svelte-18mm1rx"><!> Decision sent</div>'),zc=z('<div class="timeline-card approval-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx"><div class="card-icon warning svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx">Approval required — <code class="svelte-18mm1rx"> </code></span></div> <div class="card-body svelte-18mm1rx"><p class="approval-msg svelte-18mm1rx">This tool is marked <strong>dangerous</strong> and requires your approval before running.</p> <pre class="code-block svelte-18mm1rx"> </pre> <!></div></div>'),Pc=z('<div class="card-body svelte-18mm1rx"><pre class="code-block svelte-18mm1rx"> </pre></div>'),Tc=z('<div class="timeline-card obs-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx" role="button" tabindex="0"><div class="card-icon svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx"> </span> <div class="expand-icon svelte-18mm1rx"><!></div></div> <!></div>'),Cc=z('<div class="timeline-card answer-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx"><div class="card-icon success svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx">Final Answer</span> <button class="icon-btn small svelte-18mm1rx" title="Copy"><!></button></div> <div class="card-body svelte-18mm1rx"><p class="answer-text svelte-18mm1rx"> </p></div></div>'),Oc=z('<div class="timeline-card error-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx"><div class="card-icon error svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx">Error</span></div> <div class="card-body svelte-18mm1rx"><p class="error-text svelte-18mm1rx"> </p></div></div>'),Ic=z('<p class="history-empty svelte-18mm1rx">No completed runs yet.</p>'),qc=z('<div class="history-item svelte-18mm1rx"><span> </span> <span class="history-goal svelte-18mm1rx"> </span></div>'),Lc=z('<aside class="history-panel glass svelte-18mm1rx"><div class="history-header svelte-18mm1rx"><!> <span>Past Runs</span></div> <!></aside>'),Rc=z('<button class="stop-btn svelte-18mm1rx"><!></button>'),Dc=z('<button class="run-btn svelte-18mm1rx"><!></button>'),Fc=z('<div class="agent-space animate-fade svelte-18mm1rx"><header class="agent-header glass svelte-18mm1rx"><div class="header-left svelte-18mm1rx"><!> <span class="header-title brand-font svelte-18mm1rx">Agent Engine</span></div> <div class="model-status svelte-18mm1rx"><div></div> <span class="model-name svelte-18mm1rx"> </span></div> <div class="header-actions svelte-18mm1rx"><button title="Run history"><!></button> <button class="icon-btn svelte-18mm1rx" title="Clear timeline"><!></button></div></header> <div class="workspace svelte-18mm1rx"><div class="timeline-column svelte-18mm1rx"><!> <!></div> <!></div> <div class="input-area svelte-18mm1rx"><div class="options-row svelte-18mm1rx"><label class="option-label svelte-18mm1rx">Strategy <select class="option-select svelte-18mm1rx"><option>ReAct</option><option>Function Calling</option></select></label> <label class="option-label svelte-18mm1rx">Max steps <input class="option-input svelte-18mm1rx" type="number" min="1" max="50"/></label></div> <div><textarea class="goal-input svelte-18mm1rx"></textarea> <div class="goal-footer svelte-18mm1rx"><div class="goal-hints svelte-18mm1rx"><!> <span> </span></div> <!></div></div> <p class="disclaimer svelte-18mm1rx">Agent has access to your filesystem and shell. Review dangerous tool approvals carefully.</p></div></div>');function jc(e,t){Wt(t,!0);let n=T(""),r=T("react"),a=T(20),i=T(Oe({id:"Searching...",status:"idle",rawId:""})),s=T(!1),l=T(null),c=T(null),d=T(Oe([])),f=T(Oe([])),h=T(!1),v=T(null),$=T(null);async function m(){try{const E=await Fa(),x=$e=>{var wt;return((wt=$e==null?void 0:$e.status)==null?void 0:wt.value)??($e==null?void 0:$e.status)},de=Array.isArray(E)?E.find($e=>x($e)==="loaded"):null;de!=null&&de.id?b(i,{id:String(de.id).split("/").pop().replace(/\.gguf$/i,""),status:"ready",rawId:de.id},!0):b(i,{id:"No Model Loaded",status:"idle",rawId:""},!0)}catch{b(i,{id:"No Model Loaded",status:"idle",rawId:""},!0)}}Sr(()=>{m(),k();const E=setInterval(m,5e3);return()=>clearInterval(E)});async function k(){b(f,await vc(),!0)}function _(){if(!o(n).trim()||o(s))return;if(o(i).status!=="ready"){alert("Please load a model in the Plugin Store first.");return}b(d,[],!0),b(l,null),b(v,null),b(s,!0);const{cancel:E}=uc({goal:o(n).trim(),model:o(i).rawId,strategy:o(r),max_steps:o(a)},{onEvent:q,onError:x=>{b(s,!1),b(d,[...o(d),{type:"error",step:-1,payload:x,id:M()}],!0)},onDone:()=>{b(s,!1),k()}});b(c,E,!0)}function w(){o(c)&&o(c)(),b(s,!1),b(c,null),b(d,[...o(d),{type:"error",step:-1,payload:"Run cancelled by user.",id:M()}],!0)}function q(E){if(E.type==="session_start"){b(l,E.session_id??E.payload??null,!0);return}if(E.type!=="stream_token"){if(E.type==="thinking"){b(d,[...o(d).filter(x=>!(x.type==="thinking"&&x.step===E.step)),{...E,id:M()}],!0);return}if(E.type==="approval_required"){const x=E.payload??{};b(v,{toolName:x.tool??"?",args:x.args??{},step:E.step},!0)}["thought","tool_call","observation","final_answer","approval_required"].includes(E.type)&&b(d,o(d).filter(x=>!(x.type==="thinking"&&x.step===E.step)),!0),b(d,[...o(d),{...E,id:M()}],!0)}}async function O(E){if(o(l)){try{await fc(o(l),E)}catch(x){console.warn("approve error:",x)}b(v,null)}}let A=0;function M(){return++A}function V(E){try{return JSON.stringify(E,null,2)}catch{return String(E)}}function C(){b(d,[],!0),b(l,null),b(v,null)}let N=T(Oe(new Set));function W(E){const x=new Set(o(N));x.has(E)?x.delete(E):x.add(E),b(N,x,!0)}let te=T(null);function ye(E,x){navigator.clipboard.writeText(E),b(te,x,!0),setTimeout(()=>b(te,null),2e3)}var Se=Fc(),qe=u(Se),Le=u(qe),lt=u(Le);$a(lt,{size:20,color:"var(--accent-primary)"});var ot=g(Le,2),Je=u(ot);let ct;var ze=g(Je,2),Pt=u(ze),un=g(ot,2),Tt=u(un);let fn;var Ct=u(Tt);ds(Ct,{size:18});var Yt=g(Tt,2),In=u(Yt);yi(In,{size:18});var vn=g(qe,2),Kt=u(vn),qn=u(Kt);{var U=E=>{var x=$c(),de=u(x);$a(de,{size:48,color:"var(--text-tertiary)"}),y(E,x)};re(qn,E=>{o(d).length===0&&!o(s)&&E(U)})}var ae=g(qn,2);cn(ae,17,()=>o(d),E=>E.id,(E,x)=>{var de=I(),$e=P(de);{var wt=ne=>{var ee=wc(),K=u(ee),J=u(K);Ro(J,{size:16});var ce=g(K,2),ie=u(ce);se(()=>Z(ie,`Thinking — step ${o(x).step+1}`)),y(ne,ee)},Jt=ne=>{const ee=Xe(()=>o(x).payload??{});var K=kc(),J=u(K),ce=u(J),ie=u(ce);Lo(ie,{size:16});var Ee=g(ce,2),we=u(Ee),Te=g(Ee,2),Fe=u(Te),kt=g(Te,2),qt=u(kt);{var je=xe=>{Rr(xe,{size:14})},yn=Xe(()=>o(N).has(o(x).id)),bn=xe=>{aa(xe,{size:14})};re(qt,xe=>{o(yn)?xe(je):xe(bn,-1)})}var oe=g(J,2);{var Ze=xe=>{var fe=xc(),Lt=u(fe),or=u(Lt);se(()=>Z(or,o(ee).reasoning??"")),y(xe,fe)},ft=Xe(()=>o(N).has(o(x).id));re(oe,xe=>{o(ft)&&xe(Ze)})}se(()=>{Z(we,o(ee).is_final?"Final reasoning":`Thought — step ${o(x).step+1}`),Z(Fe,o(ee).plan??"")}),le("click",J,()=>W(o(x).id)),le("keydown",J,xe=>xe.key==="Enter"&&W(o(x).id)),y(ne,K)},mn=ne=>{const ee=Xe(()=>o(x).payload??{});var K=Mc(),J=u(K),ce=u(J),ie=u(ce);Jo(ie,{size:16});var Ee=g(ce,2),we=u(Ee),Te=u(we),Fe=g(Ee,2);{var kt=fe=>{var Lt=Ac(),or=u(Lt);vs(or,{size:11}),y(fe,Lt)};re(Fe,fe=>{o(ee).dangerous&&fe(kt)})}var qt=g(Fe,2),je=u(qt);{var yn=fe=>{Rr(fe,{size:14})},bn=Xe(()=>o(N).has(o(x).id)),oe=fe=>{aa(fe,{size:14})};re(je,fe=>{o(bn)?fe(yn):fe(oe,-1)})}var Ze=g(J,2);{var ft=fe=>{var Lt=Ec(),or=u(Lt),bi=u(or);se($i=>Z(bi,$i),[()=>V(o(ee).args??{})]),y(fe,Lt)},xe=Xe(()=>o(N).has(o(x).id));re(Ze,fe=>{o(xe)&&fe(ft)})}se(()=>Z(Te,o(ee).tool??"?")),le("click",J,()=>W(o(x).id)),le("keydown",J,fe=>fe.key==="Enter"&&W(o(x).id)),y(ne,K)},De=ne=>{const ee=Xe(()=>o(x).payload??{});var K=zc(),J=u(K),ce=u(J),ie=u(ce);vs(ie,{size:16});var Ee=g(ce,2),we=g(u(Ee)),Te=u(we),Fe=g(J,2),kt=g(u(Fe),2),qt=u(kt),je=g(kt,2);{var yn=oe=>{var Ze=Nc(),ft=u(Ze),xe=u(ft);wa(xe,{size:14});var fe=g(ft,2),Lt=u(fe);Zo(Lt,{size:14}),le("click",ft,()=>O(!0)),le("click",fe,()=>O(!1)),y(oe,Ze)},bn=oe=>{var Ze=Sc(),ft=u(Ze);os(ft,{size:14}),y(oe,Ze)};re(je,oe=>{o(v)&&o(v).step===o(x).step?oe(yn):oe(bn,-1)})}se(oe=>{Z(Te,o(ee).tool??"?"),Z(qt,oe)},[()=>V(o(ee).args??{})]),y(ne,K)},xt=ne=>{var ee=Tc(),K=u(ee),J=u(K),ce=u(J);qo(ce,{size:16});var ie=g(J,2),Ee=u(ie),we=g(ie,2),Te=u(we);{var Fe=oe=>{Rr(oe,{size:14})},kt=Xe(()=>o(N).has(o(x).id)),qt=oe=>{aa(oe,{size:14})};re(Te,oe=>{o(kt)?oe(Fe):oe(qt,-1)})}var je=g(K,2);{var yn=oe=>{var Ze=Pc(),ft=u(Ze),xe=u(ft);se(()=>Z(xe,o(x).payload??"")),y(oe,Ze)},bn=Xe(()=>o(N).has(o(x).id));re(je,oe=>{o(bn)&&oe(yn)})}se(()=>Z(Ee,`Observation — step ${o(x).step+1}`)),le("click",K,()=>W(o(x).id)),le("keydown",K,oe=>oe.key==="Enter"&&W(o(x).id)),y(ne,ee)},gn=ne=>{var ee=Cc(),K=u(ee),J=u(K),ce=u(J);os(ce,{size:16});var ie=g(J,4),Ee=u(ie);{var we=je=>{wa(je,{size:12})},Te=je=>{mi(je,{size:12})};re(Ee,je=>{o(te)===o(x).id?je(we):je(Te,-1)})}var Fe=g(K,2),kt=u(Fe),qt=u(kt);se(()=>Z(qt,o(x).payload??"")),le("click",ie,()=>ye(o(x).payload??"",o(x).id)),y(ne,ee)},Zt=ne=>{var ee=Oc(),K=u(ee),J=u(K),ce=u(J);Io(ce,{size:16});var ie=g(K,2),Ee=u(ie),we=u(Ee);se(()=>Z(we,o(x).payload??"")),y(ne,ee)};re($e,ne=>{o(x).type==="thinking"?ne(wt):o(x).type==="thought"?ne(Jt,1):o(x).type==="tool_call"?ne(mn,2):o(x).type==="approval_required"?ne(De,3):o(x).type==="observation"?ne(xt,4):o(x).type==="final_answer"?ne(gn,5):o(x).type==="error"&&ne(Zt,6)})}y(E,de)});var he=g(Kt,2);{var pe=E=>{var x=Lc(),de=u(x),$e=u(de);ds($e,{size:14});var wt=g(de,2);{var Jt=De=>{var xt=Ic();y(De,xt)},mn=De=>{var xt=I(),gn=P(xt);cn(gn,17,()=>[...o(f)].reverse(),Cn,(Zt,ne)=>{var ee=qc(),K=u(ee);let J;var ce=u(K),ie=g(K,2),Ee=u(ie);se(()=>{J=Ye(K,1,"history-status svelte-18mm1rx",null,J,{done:o(ne).status==="completed",fail:o(ne).status!=="completed"}),Z(ce,o(ne).status==="completed"?"✓":"✗"),Z(Ee,o(ne).goal)}),le("click",ee,()=>{b(n,o(ne).goal,!0),b(h,!1)}),y(Zt,ee)}),y(De,xt)};re(wt,De=>{o(f).length===0?De(Jt):De(mn,-1)})}y(E,x)};re(he,E=>{o(h)&&E(pe)})}var Re=g(vn,2),$t=u(Re),dt=u($t),pn=g(u(dt)),hn=u(pn);hn.value=hn.__value="react";var Ln=g(hn);Ln.value=Ln.__value="function_calling";var Rn=g(dt,2),_n=g(u(Rn)),Dn=g($t,2);let Fn;var ut=u(Dn);Ra(ut,E=>b($,E),()=>o($));var lr=g(ut,2),S=u(lr),Q=u(S);Yo(Q,{size:12});var Y=g(Q,2),be=u(Y),Pe=g(S,2);{var Ot=E=>{var x=Rc(),de=u(x);Oo(de,{size:18}),le("click",x,w),y(E,x)},It=E=>{var x=Dc(),de=u(x);jo(de,{size:18}),se($e=>x.disabled=$e,[()=>!o(n).trim()||o(i).status!=="ready"]),le("click",x,_),y(E,x)};re(Pe,E=>{o(s)?E(Ot):E(It,-1)})}se(()=>{ct=Ye(Je,1,"status-dot svelte-18mm1rx",null,ct,{active:o(i).status==="ready"}),Z(Pt,o(i).id),fn=Ye(Tt,1,"icon-btn svelte-18mm1rx",null,fn,{active:o(h)}),Yt.disabled=o(s),pn.disabled=o(s),_n.disabled=o(s),Fn=Ye(Dn,1,"goal-container glass svelte-18mm1rx",null,Fn,{disabled:o(i).status!=="ready"}),br(ut,"placeholder",o(i).status==="ready"?'Describe your goal… e.g. "List all Go files and count lines"':"Load a model in Plugin Store to start"),ut.disabled=o(i).status!=="ready"||o(s),Z(be,`Local · Private · ${o(r)==="react"?"ReAct":"Function Calling"}`)}),le("click",Tt,()=>{b(h,!o(h)),o(h)&&k()}),le("click",Yt,C),ho(pn,()=>o(r),E=>b(r,E)),Hr(_n,()=>o(a),E=>b(a,E)),le("keydown",ut,E=>E.key==="Enter"&&!E.shiftKey&&(E.preventDefault(),_())),Hr(ut,()=>o(n),E=>b(n,E)),y(e,Se),Ut()}Nr(["click","keydown"]);var Vc=z("<!> <span>Pulling...</span>",1),Hc=z("<!> <span>Pull Model</span>",1),Bc=z('<div class="progress-zone svelte-1mcp8qp"><div class="progress-meta svelte-1mcp8qp"><span class="status svelte-1mcp8qp"> </span> <span class="percent svelte-1mcp8qp"> </span></div> <div class="progress-bar svelte-1mcp8qp"><div class="progress-fill svelte-1mcp8qp"></div></div></div>'),Gc=z('<div class="error-zone svelte-1mcp8qp"><!> <span> </span></div>'),Wc=z('<div class="loading-box svelte-1mcp8qp"><!> <p>Scanning persistent storage...</p></div>'),Uc=z('<div class="empty-box svelte-1mcp8qp"><!> <h3 class="svelte-1mcp8qp">No Models Found</h3> <p>Your local repository is empty. Pull your first model above.</p></div>'),Yc=z("<!> <span>Booting...</span>",1),Kc=z("<!> <span>Load Engine</span>",1),Jc=z('<button class="load-btn svelte-1mcp8qp"><!></button>'),Zc=z('<div class="engine-ready svelte-1mcp8qp"><!> <span>Ready for Inference</span></div>'),Xc=z('<div class="model-card surface-card svelte-1mcp8qp"><div class="card-top svelte-1mcp8qp"><div class="model-meta"><span> </span></div> <button class="settings-btn svelte-1mcp8qp"><!></button></div> <div class="model-id svelte-1mcp8qp"> </div> <div class="model-repo svelte-1mcp8qp"> </div> <div class="card-footer svelte-1mcp8qp"><!></div></div>'),Qc=z('<div class="models-grid svelte-1mcp8qp"></div>'),ed=z('<div class="loading-state">Syncing store...</div>'),td=z('<div class="plugin-card surface-card svelte-1mcp8qp"><div class="plugin-header svelte-1mcp8qp"><div class="plugin-info svelte-1mcp8qp"><h3 class="svelte-1mcp8qp"> </h3> <span class="version svelte-1mcp8qp"> </span></div> <div class="plugin-brand svelte-1mcp8qp"><!></div></div> <p class="description svelte-1mcp8qp"> </p> <div class="plugin-footer svelte-1mcp8qp"><span class="author svelte-1mcp8qp"> </span> <button class="install-btn svelte-1mcp8qp"><!></button></div></div>'),nd=z('<div class="marketplace animate-fade svelte-1mcp8qp"><header class="page-header svelte-1mcp8qp"><div class="header-content"><h1 class="brand-font svelte-1mcp8qp">Registry</h1> <p class="svelte-1mcp8qp">Discover and deploy edge-native AI models and specialized modules.</p></div> <div class="header-stats svelte-1mcp8qp"><div class="stat-item svelte-1mcp8qp"><!> <span> </span></div> <div class="stat-item svelte-1mcp8qp"><!> <span> </span></div></div></header> <div class="layout-grid svelte-1mcp8qp"><div class="main-column"><section class="section svelte-1mcp8qp"><div class="section-title svelte-1mcp8qp"><!> <h2 class="svelte-1mcp8qp">Model Puller</h2></div> <div class="surface-card puller-card svelte-1mcp8qp"><p class="instruction svelte-1mcp8qp">Download high-performance GGUF models directly to your machine.</p> <div class="input-row svelte-1mcp8qp"><div class="input-wrapper svelte-1mcp8qp"><!> <input type="text" placeholder="Paste Hugging Face URL or Registry Tag..." class="svelte-1mcp8qp"/></div> <button class="primary-btn svelte-1mcp8qp"><!></button></div> <!> <!> <div class="hints svelte-1mcp8qp"><!> <span>Supported: huggingface.co, docker.io, oci://</span></div></div></section> <section class="section svelte-1mcp8qp"><div class="section-title svelte-1mcp8qp"><!> <h2 class="svelte-1mcp8qp">Local Engine Models</h2></div> <!></section></div> <div class="side-column"><section class="section svelte-1mcp8qp"><div class="section-title svelte-1mcp8qp"><!> <h2 class="svelte-1mcp8qp">Plugin Store</h2></div> <div class="plugin-list svelte-1mcp8qp"><!></div></section></div></div></div>');function rd(e,t){Wt(t,!0);let n=T(Oe([])),r=T(!0),a=T(null),i=T(""),s=T(null),l=T(null),c=T(!1),d=T(Oe([])),f=T(!0),h=T(null);async function v(){try{const S=await Fa();b(d,S||[],!0)}catch(S){console.error("Failed to fetch local models:",S)}finally{b(f,!1)}}Bt(()=>{v();const S=setInterval(v,5e3);return()=>clearInterval(S)}),Bt(()=>{setTimeout(()=>{b(n,[{id:"note",name:"CrabNote",description:"Zettelkasten-style neural notes with RAG auto-linking. Perfect for research.",author:"Cheesecrab Labs",version:"1.2.0",download_url:"https://example.com/plugins/crab-note.zip"},{id:"calendar",name:"CrabCalendar",description:"AI-first scheduling. It learns your peak focus hours and manages tasks.",author:"Cheesecrab Labs",version:"0.9.5",download_url:"https://example.com/plugins/crab-calendar.zip"}],!0),b(r,!1)},500)});async function $(S){var Q;if(!o(a)){b(a,S.id,!0);try{window.go&&window.go.main&&window.go.main.App?(await window.go.main.App.InstallPlugin(S.download_url),(Q=t.onPluginInstalled)==null||Q.call(t)):await new Promise(Y=>setTimeout(Y,1500))}catch(Y){console.error(Y)}finally{b(a,null)}}}function m(){!o(i)||o(c)||(b(l,null),b(s,{status:"Initializing...",completed:0,total:100},!0),b(c,!0),dc(o(i),{onProgress:S=>{b(s,S,!0),b(c,!0),S&&S.status==="success"&&(b(c,!1),b(s,null),v())},onError:S=>{b(l,S,!0),b(c,!1)}}))}async function k(S){if(!o(h)){b(h,S,!0);try{await pc(S),v()}catch(Q){console.error(Q)}finally{b(h,null)}}}var _=nd(),w=u(_),q=g(u(w),2),O=u(q),A=u(O);gi(A,{size:14});var M=g(A,2),V=u(M),C=g(O,2),N=u(C);Dr(N,{size:14});var W=g(N,2),te=u(W),ye=g(w,2),Se=u(ye),qe=u(Se),Le=u(qe),lt=u(Le);cs(lt,{size:18});var ot=g(Le,2),Je=g(u(ot),2),ct=u(Je),ze=u(ct);Vo(ze,{size:16,class:"input-icon"});var Pt=g(ze,2),un=g(ct,2),Tt=u(un);{var fn=S=>{var Q=Vc(),Y=P(Q);Cr(Y,{size:16,class:"spin"}),y(S,Q)},Ct=S=>{var Q=Hc(),Y=P(Q);cs(Y,{size:16}),y(S,Q)};re(Tt,S=>{o(c)?S(fn):S(Ct,-1)})}var Yt=g(Je,2);{var In=S=>{var Q=Bc(),Y=u(Q),be=u(Y),Pe=u(be),Ot=g(be,2),It=u(Ot),E=g(Y,2),x=u(E);se(de=>{Z(Pe,o(s).status),Z(It,`${de??""}%`),jr(x,`width: ${o(s).completed/o(s).total*100}%`)},[()=>Math.round(o(s).completed/o(s).total*100)||0]),y(S,Q)};re(Yt,S=>{o(s)&&S(In)})}var vn=g(Yt,2);{var Kt=S=>{var Q=Gc(),Y=u(Q);To(Y,{size:16});var be=g(Y,2),Pe=u(be);se(()=>Z(Pe,o(l))),y(S,Q)};re(vn,S=>{o(l)&&S(Kt)})}var qn=g(vn,2),U=u(qn);us(U,{size:12});var ae=g(qe,2),he=u(ae),pe=u(he);Da(pe,{size:18});var Re=g(he,2);{var $t=S=>{var Q=Wc(),Y=u(Q);Cr(Y,{size:24,class:"spin"}),y(S,Q)},dt=S=>{var Q=Uc(),Y=u(Q);Po(Y,{size:32}),y(S,Q)},pn=S=>{var Q=Qc();cn(Q,21,()=>o(d),Cn,(Y,be)=>{var Pe=Xc(),Ot=u(Pe),It=u(Ot),E=u(It);let x;var de=u(E),$e=g(It,2),wt=u($e);us(wt,{size:14});var Jt=g(Ot,2),mn=u(Jt),De=g(Jt,2),xt=u(De),gn=g(De,2),Zt=u(gn);{var ne=K=>{var J=Jc(),ce=u(J);{var ie=we=>{var Te=Yc(),Fe=P(Te);Cr(Fe,{size:14,class:"spin"}),y(we,Te)},Ee=we=>{var Te=Kc(),Fe=P(Te);Xo(Fe,{size:14}),y(we,Te)};re(ce,we=>{o(h)===o(be).id?we(ie):we(Ee,-1)})}se(()=>J.disabled=o(h)===o(be).id),le("click",J,()=>k(o(be).id)),y(K,J)},ee=K=>{var J=Zc(),ce=u(J);Co(ce,{size:14}),y(K,J)};re(Zt,K=>{o(be).status.value!=="loaded"?K(ne):K(ee,-1)})}se((K,J)=>{x=Ye(E,1,"status-tag svelte-1mcp8qp",null,x,{active:o(be).status.value==="loaded"}),Z(de,o(be).status.value==="loaded"?"Active":"Standby"),Z(mn,K),Z(xt,J)},[()=>o(be).id.split("/").pop(),()=>o(be).id.includes("/")?o(be).id.split("/").slice(0,-1).join("/"):"Local Archive"]),y(Y,Pe)}),y(S,Q)};re(Re,S=>{o(f)?S($t):o(d).length===0?S(dt,1):S(pn,-1)})}var hn=g(Se,2),Ln=u(hn),Rn=u(Ln),_n=u(Rn);Dr(_n,{size:18});var Dn=g(Rn,2),Fn=u(Dn);{var ut=S=>{var Q=ed();y(S,Q)},lr=S=>{var Q=I(),Y=P(Q);cn(Y,17,()=>o(n),Cn,(be,Pe)=>{var Ot=td(),It=u(Ot),E=u(It),x=u(E),de=u(x),$e=g(x,2),wt=u($e),Jt=g(E,2),mn=u(Jt);Dr(mn,{size:20});var De=g(It,2),xt=u(De),gn=g(De,2),Zt=u(gn),ne=u(Zt),ee=g(Zt,2),K=u(ee);{var J=ie=>{Cr(ie,{size:14,class:"spin"})},ce=ie=>{zo(ie,{size:14})};re(K,ie=>{o(a)===o(Pe).id?ie(J):ie(ce,-1)})}se(()=>{Z(de,o(Pe).name),Z(wt,`v${o(Pe).version??""}`),Z(xt,o(Pe).description),Z(ne,`by ${o(Pe).author??""}`),ee.disabled=o(a)===o(Pe).id}),le("click",ee,()=>$(o(Pe))),y(be,Ot)}),y(S,Q)};re(Fn,S=>{o(r)?S(ut):S(lr,-1)})}se(()=>{Z(V,`${o(d).length??""} Models`),Z(te,`${o(n).length??""} Plugins`),Pt.disabled=o(c),un.disabled=o(c)||!o(i)}),Hr(Pt,()=>o(i),S=>b(i,S)),le("click",un,m),y(e,_),Ut()}Nr(["click"]);var ad=z('<div class="loading svelte-3zvtg1"><span class="spinner svelte-3zvtg1">🦀</span> <p>Nibbling plugin files...</p></div>'),sd=z('<div class="plugin-host svelte-3zvtg1"><!></div>');function id(e,t){Wt(t,!0);let n=T(null),r=T(!1),a=T(null);Sr(()=>{i()}),xo(()=>{l()});async function i(){const h=`script-plugin-${t.manifest.id}`;if(document.getElementById(h))b(r,!0),s();else{const v=document.createElement("script");v.id=h,v.type="module",v.src=`plugin://${t.manifest.id}/${t.manifest.main_js}`,v.onload=()=>{b(r,!0),s()},v.onerror=$=>{console.error(`Failed to load plugin script: ${t.manifest.id}`,$)},document.body.appendChild(v)}}function s(){if(!(!o(r)||!o(n))){o(n).innerHTML="";try{const h=document.createElement(t.manifest.entry_element);o(n).appendChild(h),b(a,h,!0),console.log(`Plugin mounted: ${t.manifest.id}`)}catch(h){console.error(`Failed to mount plugin component: ${t.manifest.entry_element}`,h)}}}function l(){o(a)&&o(a).parentNode&&o(a).parentNode.removeChild(o(a))}Bt(()=>{o(n)&&o(r)&&!o(a)&&s()});var c=sd(),d=u(c);{var f=h=>{var v=ad();y(h,v)};re(d,h=>{o(r)||h(f)})}Ra(c,h=>b(n,h),()=>o(n)),y(e,c),Ut()}var ld=z('<div class="placeholder svelte-1n46o8q"><h1 class="brand-font svelte-1n46o8q"> </h1> <p>This module is under development.</p></div>'),od=z('<div class="animate-fade h-full svelte-1n46o8q"><!></div>'),cd=z('<main class="layout svelte-1n46o8q"><!> <div class="content-wrapper svelte-1n46o8q"><div class="main-content svelte-1n46o8q"><!></div> <!></div></main>');function dd(e,t){Wt(t,!0);let n=T("chat"),r=T(Oe([])),a=T("dark");Sr(()=>{const $=localStorage.getItem("cheesecrab-theme")||"dark";b(a,$,!0),document.documentElement.setAttribute("data-theme",o(a))});function i(){b(a,o(a)==="dark"?"light":"dark",!0),document.documentElement.setAttribute("data-theme",o(a)),localStorage.getItem("cheesecrab-theme",o(a))}Bt(()=>{window.go&&window.go.main&&window.go.main.App&&window.go.main.App.GetInstalledPlugins().then($=>{b(r,$||[],!0)})});const s=Xe(()=>o(r).find($=>$.id===o(n)));var l=cd(),c=u(l);sc(c,{get installedPlugins(){return o(r)},get theme(){return o(a)},onToggleTheme:i,get activeView(){return o(n)},set activeView($){b(n,$,!0)}});var d=g(c,2),f=u(d),h=u(f);ro(h,()=>o(n),$=>{var m=od(),k=u(m);{var _=M=>{bc(M,{})},w=M=>{jc(M,{})},q=M=>{rd(M,{onPluginInstalled:()=>{window.go.main.App.GetInstalledPlugins().then(V=>b(r,V||[],!0))}})},O=M=>{id(M,{get manifest(){return o(s)}})},A=M=>{var V=ld(),C=u(V),N=u(C);se(()=>Z(N,o(n))),y(M,V)};re(k,M=>{o(n)==="chat"?M(_):o(n)==="agent"?M(w,1):o(n)==="marketplace"?M(q,2):o(s)?M(O,3):M(A,-1)})}y($,m)});var v=g(f,2);lc(v,{}),se(()=>br(l,"data-theme",o(a))),y(e,l),Ut()}Ql(dd,{target:document.getElementById("app")});

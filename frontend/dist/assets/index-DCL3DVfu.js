var Ai=Object.defineProperty;var Ga=e=>{throw TypeError(e)};var Mi=(e,t,n)=>t in e?Ai(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var bt=(e,t,n)=>Mi(e,typeof t!="symbol"?t+"":t,n),Xr=(e,t,n)=>t.has(e)||Ga("Cannot "+n);var h=(e,t,n)=>(Xr(e,t,"read from private field"),n?n.call(e):t.get(e)),Z=(e,t,n)=>t.has(e)?Ga("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),W=(e,t,n,r)=>(Xr(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n),be=(e,t,n)=>(Xr(e,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const zi=!1;var Aa=Array.isArray,Ni=Array.prototype.indexOf,Zn=Array.prototype.includes,Wr=Array.from,Si=Object.defineProperty,dn=Object.getOwnPropertyDescriptor,ys=Object.getOwnPropertyDescriptors,Pi=Object.prototype,Ti=Array.prototype,Ma=Object.getPrototypeOf,Ua=Object.isExtensible;function or(e){return typeof e=="function"}const Ci=()=>{};function Oi(e){return e()}function ia(e){for(var t=0;t<e.length;t++)e[t]()}function $s(){var e,t,n=new Promise((r,a)=>{e=r,t=a});return{promise:n,resolve:e,reject:t}}function Ii(e,t){if(Array.isArray(e))return e;if(!(Symbol.iterator in e))return Array.from(e);const n=[];for(const r of e)if(n.push(r),n.length===t)break;return n}const Ce=2,Xn=4,xr=8,za=1<<24,mn=16,Et=32,Pn=64,la=128,ot=512,Me=1024,Le=2048,At=4096,nt=8192,ct=16384,On=32768,oa=1<<25,fn=65536,Wa=1<<17,ji=1<<18,ar=1<<19,ws=1<<20,Rt=1<<25,Tn=65536,ca=1<<21,Na=1<<22,un=1<<23,Dt=Symbol("$state"),xs=Symbol("legacy props"),Li=Symbol(""),Wt=new class extends Error{constructor(){super(...arguments);bt(this,"name","StaleReactionError");bt(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var gs;const ks=!!((gs=globalThis.document)!=null&&gs.contentType)&&globalThis.document.contentType.includes("xml");function Es(e){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function Ri(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function Di(e,t,n){throw new Error("https://svelte.dev/e/each_key_duplicate")}function Fi(e){throw new Error("https://svelte.dev/e/effect_in_teardown")}function Vi(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function Hi(e){throw new Error("https://svelte.dev/e/effect_orphan")}function qi(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Bi(e){throw new Error("https://svelte.dev/e/props_invalid_value")}function Gi(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Ui(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function Wi(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function Ki(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}const Yi=1,Ji=2,As=4,Zi=8,Xi=16,Qi=1,el=2,Ms=4,tl=8,nl=16,rl=1,al=2,Te=Symbol(),zs="http://www.w3.org/1999/xhtml",sl="http://www.w3.org/2000/svg",il="@attach";function ll(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function ol(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function Ns(e){return e===this.v}function cl(e,t){return e!=e?t==t:e!==t||e!==null&&typeof e=="object"||typeof e=="function"}function Ss(e){return!cl(e,this.v)}let sr=!1,dl=!1;function ul(){sr=!0}let ve=null;function Qn(e){ve=e}function ft(e,t=!1,n){ve={p:ve,i:!1,c:null,e:null,s:e,x:null,r:Y,l:sr&&!t?{s:null,u:null,$:[]}:null}}function pt(e){var t=ve,n=t.e;if(n!==null){t.e=null;for(var r of n)Qs(r)}return t.i=!0,ve=t.p,{}}function kr(){return!sr||ve!==null&&ve.l===null}let xn=[];function Ps(){var e=xn;xn=[],ia(e)}function Zt(e){if(xn.length===0&&!pr){var t=xn;queueMicrotask(()=>{t===xn&&Ps()})}xn.push(e)}function vl(){for(;xn.length>0;)Ps()}function Ts(e){var t=Y;if(t===null)return K.f|=un,e;if(!(t.f&On)&&!(t.f&Xn))throw e;cn(e,t)}function cn(e,t){for(;t!==null;){if(t.f&la){if(!(t.f&On))throw e;try{t.b.error(e);return}catch(n){e=n}}t=t.parent}throw e}const fl=-7169;function he(e,t){e.f=e.f&fl|t}function Sa(e){e.f&ot||e.deps===null?he(e,Me):he(e,At)}function Cs(e){if(e!==null)for(const t of e)!(t.f&Ce)||!(t.f&Tn)||(t.f^=Tn,Cs(t.deps))}function Os(e,t,n){e.f&Le?t.add(e):e.f&At&&n.add(e),Cs(e.deps),he(e,Me)}let Pr=!1;function pl(e){var t=Pr;try{return Pr=!1,[e(),Pr]}finally{Pr=t}}const cr=new Set;let G=null,Fe=null,da=null,pr=!1,Qr=!1,Vn=null,Cr=null;var Ka=0;let hl=1;var Hn,qn,Bn,Gn,yr,it,Un,ln,Kt,Wn,He,ua,va,fa,pa,Is;const Br=class Br{constructor(){Z(this,He);bt(this,"id",hl++);bt(this,"current",new Map);bt(this,"previous",new Map);Z(this,Hn,new Set);Z(this,qn,new Set);Z(this,Bn,0);Z(this,Gn,0);Z(this,yr,null);Z(this,it,[]);Z(this,Un,new Set);Z(this,ln,new Set);Z(this,Kt,new Map);bt(this,"is_fork",!1);Z(this,Wn,!1)}skip_effect(t){h(this,Kt).has(t)||h(this,Kt).set(t,{d:[],m:[]})}unskip_effect(t){var n=h(this,Kt).get(t);if(n){h(this,Kt).delete(t);for(var r of n.d)he(r,Le),this.schedule(r);for(r of n.m)he(r,At),this.schedule(r)}}capture(t,n){n!==Te&&!this.previous.has(t)&&this.previous.set(t,n),t.f&un||(this.current.set(t,t.v),Fe==null||Fe.set(t,t.v))}activate(){G=this}deactivate(){G=null,Fe=null}flush(){try{if(Qr=!0,G=this,!be(this,He,ua).call(this)){for(const t of h(this,Un))h(this,ln).delete(t),he(t,Le),this.schedule(t);for(const t of h(this,ln))he(t,At),this.schedule(t)}be(this,He,va).call(this)}finally{Ka=0,da=null,Vn=null,Cr=null,Qr=!1,G=null,Fe=null,vn.clear()}}discard(){for(const t of h(this,qn))t(this);h(this,qn).clear()}increment(t){W(this,Bn,h(this,Bn)+1),t&&W(this,Gn,h(this,Gn)+1)}decrement(t,n){W(this,Bn,h(this,Bn)-1),t&&W(this,Gn,h(this,Gn)-1),!(h(this,Wn)||n)&&(W(this,Wn,!0),Zt(()=>{W(this,Wn,!1),this.flush()}))}oncommit(t){h(this,Hn).add(t)}ondiscard(t){h(this,qn).add(t)}settled(){return(h(this,yr)??W(this,yr,$s())).promise}static ensure(){if(G===null){const t=G=new Br;Qr||(cr.add(G),pr||Zt(()=>{G===t&&t.flush()}))}return G}apply(){{Fe=null;return}}schedule(t){var a;if(da=t,(a=t.b)!=null&&a.is_pending&&t.f&(Xn|xr|za)&&!(t.f&On)){t.b.defer_effect(t);return}for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(Vn!==null&&n===Y&&(K===null||!(K.f&Ce)))return;if(r&(Pn|Et)){if(!(r&Me))return;n.f^=Me}}h(this,it).push(n)}};Hn=new WeakMap,qn=new WeakMap,Bn=new WeakMap,Gn=new WeakMap,yr=new WeakMap,it=new WeakMap,Un=new WeakMap,ln=new WeakMap,Kt=new WeakMap,Wn=new WeakMap,He=new WeakSet,ua=function(){return this.is_fork||h(this,Gn)>0},va=function(){var l,c;Ka++>1e3&&gl();const t=h(this,it);W(this,it,[]),this.apply();var n=Vn=[],r=[],a=Cr=[];for(const d of t)try{be(this,He,fa).call(this,d,n,r)}catch(v){throw Ds(d),v}if(G=null,a.length>0){var i=Br.ensure();for(const d of a)i.schedule(d)}if(Vn=null,Cr=null,be(this,He,ua).call(this)){be(this,He,pa).call(this,r),be(this,He,pa).call(this,n);for(const[d,v]of h(this,Kt))Rs(d,v)}else{h(this,Bn)===0&&cr.delete(this),h(this,Un).clear(),h(this,ln).clear();for(const d of h(this,Hn))d(this);h(this,Hn).clear(),Ya(r),Ya(n),(l=h(this,yr))==null||l.resolve()}var s=G;if(h(this,it).length>0){const d=s??(s=this);h(d,it).push(...h(this,it).filter(v=>!h(d,it).includes(v)))}s!==null&&(cr.add(s),be(c=s,He,va).call(c)),cr.has(this)||be(this,He,Is).call(this)},fa=function(t,n,r){t.f^=Me;for(var a=t.first;a!==null;){var i=a.f,s=(i&(Et|Pn))!==0,l=s&&(i&Me)!==0,c=l||(i&nt)!==0||h(this,Kt).has(a);if(!c&&a.fn!==null){s?a.f^=Me:i&Xn?n.push(a):zr(a)&&(i&mn&&h(this,ln).add(a),nr(a));var d=a.first;if(d!==null){a=d;continue}}for(;a!==null;){var v=a.next;if(v!==null){a=v;break}a=a.parent}}},pa=function(t){for(var n=0;n<t.length;n+=1)Os(t[n],h(this,Un),h(this,ln))},Is=function(){var c;for(const d of cr){var t=d.id<this.id,n=[];for(const[v,p]of this.current){if(d.current.has(v))if(t&&p!==d.current.get(v))d.current.set(v,p);else continue;n.push(v)}if(n.length!==0){var r=[...d.current.keys()].filter(v=>!this.current.has(v));if(r.length>0){d.activate();var a=new Set,i=new Map;for(var s of n)js(s,r,a,i);if(h(d,it).length>0){d.apply();for(var l of h(d,it))be(c=d,He,fa).call(c,l,[],[])}d.deactivate()}}}};let Cn=Br;function _l(e){var t=pr;pr=!0;try{for(var n;;){if(vl(),G===null)return n;G.flush()}}finally{pr=t}}function gl(){try{qi()}catch(e){cn(e,da)}}let yt=null;function Ya(e){var t=e.length;if(t!==0){for(var n=0;n<t;){var r=e[n++];if(!(r.f&(ct|nt))&&zr(r)&&(yt=new Set,nr(r),r.deps===null&&r.first===null&&r.nodes===null&&r.teardown===null&&r.ac===null&&ni(r),(yt==null?void 0:yt.size)>0)){vn.clear();for(const a of yt){if(a.f&(ct|nt))continue;const i=[a];let s=a.parent;for(;s!==null;)yt.has(s)&&(yt.delete(s),i.push(s)),s=s.parent;for(let l=i.length-1;l>=0;l--){const c=i[l];c.f&(ct|nt)||nr(c)}}yt.clear()}}yt=null}}function js(e,t,n,r){if(!n.has(e)&&(n.add(e),e.reactions!==null))for(const a of e.reactions){const i=a.f;i&Ce?js(a,t,n,r):i&(Na|mn)&&!(i&Le)&&Ls(a,t,r)&&(he(a,Le),Pa(a))}}function Ls(e,t,n){const r=n.get(e);if(r!==void 0)return r;if(e.deps!==null)for(const a of e.deps){if(Zn.call(t,a))return!0;if(a.f&Ce&&Ls(a,t,n))return n.set(a,!0),!0}return n.set(e,!1),!1}function Pa(e){G.schedule(e)}function Rs(e,t){if(!(e.f&Et&&e.f&Me)){e.f&Le?t.d.push(e):e.f&At&&t.m.push(e),he(e,Me);for(var n=e.first;n!==null;)Rs(n,t),n=n.next}}function Ds(e){he(e,Me);for(var t=e.first;t!==null;)Ds(t),t=t.next}function ml(e){let t=0,n=pn(0),r;return()=>{Oa()&&(o(n),ja(()=>(t===0&&(r=Qt(()=>e(()=>hr(n)))),t+=1,()=>{Zt(()=>{t-=1,t===0&&(r==null||r(),r=void 0,hr(n))})})))}}var bl=fn|ar;function yl(e,t,n,r){new $l(e,t,n,r)}var lt,Ea,It,An,Ye,jt,et,$t,Yt,Mn,on,Kn,Yn,Jn,Jt,Gr,ze,wl,xl,kl,ha,Or,Ir,_a;class $l{constructor(t,n,r,a){Z(this,ze);bt(this,"parent");bt(this,"is_pending",!1);bt(this,"transform_error");Z(this,lt);Z(this,Ea,null);Z(this,It);Z(this,An);Z(this,Ye);Z(this,jt,null);Z(this,et,null);Z(this,$t,null);Z(this,Yt,null);Z(this,Mn,0);Z(this,on,0);Z(this,Kn,!1);Z(this,Yn,new Set);Z(this,Jn,new Set);Z(this,Jt,null);Z(this,Gr,ml(()=>(W(this,Jt,pn(h(this,Mn))),()=>{W(this,Jt,null)})));var i;W(this,lt,t),W(this,It,n),W(this,An,s=>{var l=Y;l.b=this,l.f|=la,r(s)}),this.parent=Y.b,this.transform_error=a??((i=this.parent)==null?void 0:i.transform_error)??(s=>s),W(this,Ye,Mr(()=>{be(this,ze,ha).call(this)},bl))}defer_effect(t){Os(t,h(this,Yn),h(this,Jn))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!h(this,It).pending}update_pending_count(t,n){be(this,ze,_a).call(this,t,n),W(this,Mn,h(this,Mn)+t),!(!h(this,Jt)||h(this,Kn))&&(W(this,Kn,!0),Zt(()=>{W(this,Kn,!1),h(this,Jt)&&er(h(this,Jt),h(this,Mn))}))}get_effect_pending(){return h(this,Gr).call(this),o(h(this,Jt))}error(t){var n=h(this,It).onerror;let r=h(this,It).failed;if(!n&&!r)throw t;h(this,jt)&&(je(h(this,jt)),W(this,jt,null)),h(this,et)&&(je(h(this,et)),W(this,et,null)),h(this,$t)&&(je(h(this,$t)),W(this,$t,null));var a=!1,i=!1;const s=()=>{if(a){ol();return}a=!0,i&&Ki(),h(this,$t)!==null&&Nn(h(this,$t),()=>{W(this,$t,null)}),be(this,ze,Ir).call(this,()=>{be(this,ze,ha).call(this)})},l=c=>{try{i=!0,n==null||n(c,s),i=!1}catch(d){cn(d,h(this,Ye)&&h(this,Ye).parent)}r&&W(this,$t,be(this,ze,Ir).call(this,()=>{try{return Ze(()=>{var d=Y;d.b=this,d.f|=la,r(h(this,lt),()=>c,()=>s)})}catch(d){return cn(d,h(this,Ye).parent),null}}))};Zt(()=>{var c;try{c=this.transform_error(t)}catch(d){cn(d,h(this,Ye)&&h(this,Ye).parent);return}c!==null&&typeof c=="object"&&typeof c.then=="function"?c.then(l,d=>cn(d,h(this,Ye)&&h(this,Ye).parent)):l(c)})}}lt=new WeakMap,Ea=new WeakMap,It=new WeakMap,An=new WeakMap,Ye=new WeakMap,jt=new WeakMap,et=new WeakMap,$t=new WeakMap,Yt=new WeakMap,Mn=new WeakMap,on=new WeakMap,Kn=new WeakMap,Yn=new WeakMap,Jn=new WeakMap,Jt=new WeakMap,Gr=new WeakMap,ze=new WeakSet,wl=function(){try{W(this,jt,Ze(()=>h(this,An).call(this,h(this,lt))))}catch(t){this.error(t)}},xl=function(t){const n=h(this,It).failed;n&&W(this,$t,Ze(()=>{n(h(this,lt),()=>t,()=>()=>{})}))},kl=function(){const t=h(this,It).pending;t&&(this.is_pending=!0,W(this,et,Ze(()=>t(h(this,lt)))),Zt(()=>{var n=W(this,Yt,document.createDocumentFragment()),r=Ft();n.append(r),W(this,jt,be(this,ze,Ir).call(this,()=>Ze(()=>h(this,An).call(this,r)))),h(this,on)===0&&(h(this,lt).before(n),W(this,Yt,null),Nn(h(this,et),()=>{W(this,et,null)}),be(this,ze,Or).call(this,G))}))},ha=function(){try{if(this.is_pending=this.has_pending_snippet(),W(this,on,0),W(this,Mn,0),W(this,jt,Ze(()=>{h(this,An).call(this,h(this,lt))})),h(this,on)>0){var t=W(this,Yt,document.createDocumentFragment());Da(h(this,jt),t);const n=h(this,It).pending;W(this,et,Ze(()=>n(h(this,lt))))}else be(this,ze,Or).call(this,G)}catch(n){this.error(n)}},Or=function(t){this.is_pending=!1;for(const n of h(this,Yn))he(n,Le),t.schedule(n);for(const n of h(this,Jn))he(n,At),t.schedule(n);h(this,Yn).clear(),h(this,Jn).clear()},Ir=function(t){var n=Y,r=K,a=ve;vt(h(this,Ye)),ut(h(this,Ye)),Qn(h(this,Ye).ctx);try{return Cn.ensure(),t()}catch(i){return Ts(i),null}finally{vt(n),ut(r),Qn(a)}},_a=function(t,n){var r;if(!this.has_pending_snippet()){this.parent&&be(r=this.parent,ze,_a).call(r,t,n);return}W(this,on,h(this,on)+t),h(this,on)===0&&(be(this,ze,Or).call(this,n),h(this,et)&&Nn(h(this,et),()=>{W(this,et,null)}),h(this,Yt)&&(h(this,lt).before(h(this,Yt)),W(this,Yt,null)))};function Fs(e,t,n,r){const a=kr()?Er:Ta;var i=e.filter(f=>!f.settled);if(n.length===0&&i.length===0){r(t.map(a));return}var s=Y,l=El(),c=i.length===1?i[0].promise:i.length>1?Promise.all(i.map(f=>f.promise)):null;function d(f){l();try{r(f)}catch(w){s.f&ct||cn(w,s)}Dr()}if(n.length===0){c.then(()=>d(t.map(a)));return}var v=Vs();function p(){Promise.all(n.map(f=>Al(f))).then(f=>d([...t.map(a),...f])).catch(f=>cn(f,s)).finally(()=>v())}c?c.then(()=>{l(),p(),Dr()}):p()}function El(){var e=Y,t=K,n=ve,r=G;return function(i=!0){vt(e),ut(t),Qn(n),i&&!(e.f&ct)&&(r==null||r.activate(),r==null||r.apply())}}function Dr(e=!0){vt(null),ut(null),Qn(null),e&&(G==null||G.deactivate())}function Vs(){var e=Y.b,t=G,n=e.is_rendered();return e.update_pending_count(1,t),t.increment(n),(r=!1)=>{e.update_pending_count(-1,t),t.decrement(n,r)}}function Er(e){var t=Ce|Le,n=K!==null&&K.f&Ce?K:null;return Y!==null&&(Y.f|=ar),{ctx:ve,deps:null,effects:null,equals:Ns,f:t,fn:e,reactions:null,rv:0,v:Te,wv:0,parent:n??Y,ac:null}}function Al(e,t,n){let r=Y;r===null&&Ri();var a=void 0,i=pn(Te),s=!K,l=new Map;return Fl(()=>{var w;var c=Y,d=$s();a=d.promise;try{Promise.resolve(e()).then(d.resolve,d.reject).finally(Dr)}catch(m){d.reject(m),Dr()}var v=G;if(s){if(c.f&On)var p=Vs();if(r.b.is_rendered())(w=l.get(v))==null||w.reject(Wt),l.delete(v);else{for(const m of l.values())m.reject(Wt);l.clear()}l.set(v,d)}const f=(m,A=void 0)=>{if(p){var b=A===Wt;p(b)}if(!(A===Wt||c.f&ct)){if(v.activate(),A)i.f|=un,er(i,A);else{i.f&un&&(i.f^=un),er(i,m);for(const[y,O]of l){if(l.delete(y),y===v)break;O.reject(Wt)}}v.deactivate()}};d.promise.then(f,m=>f(null,m||"unknown"))}),Ia(()=>{for(const c of l.values())c.reject(Wt)}),new Promise(c=>{function d(v){function p(){v===a?c(i):d(a)}v.then(p,p)}d(a)})}function De(e){const t=Er(e);return si(t),t}function Ta(e){const t=Er(e);return t.equals=Ss,t}function Ml(e){var t=e.effects;if(t!==null){e.effects=null;for(var n=0;n<t.length;n+=1)je(t[n])}}function zl(e){for(var t=e.parent;t!==null;){if(!(t.f&Ce))return t.f&ct?null:t;t=t.parent}return null}function Ca(e){var t,n=Y;vt(zl(e));try{e.f&=~Tn,Ml(e),t=ci(e)}finally{vt(n)}return t}function Hs(e){var t=Ca(e);if(!e.equals(t)&&(e.wv=li(),(!(G!=null&&G.is_fork)||e.deps===null)&&(e.v=t,e.deps===null))){he(e,Me);return}hn||(Fe!==null?(Oa()||G!=null&&G.is_fork)&&Fe.set(e,t):Sa(e))}function Nl(e){var t,n;if(e.effects!==null)for(const r of e.effects)(r.teardown||r.ac)&&((t=r.teardown)==null||t.call(r),(n=r.ac)==null||n.abort(Wt),r.teardown=Ci,r.ac=null,mr(r,0),La(r))}function qs(e){if(e.effects!==null)for(const t of e.effects)t.teardown&&nr(t)}let ga=new Set;const vn=new Map;let Bs=!1;function pn(e,t){var n={f:0,v:e,reactions:null,equals:Ns,rv:0,wv:0};return n}function L(e,t){const n=pn(e);return si(n),n}function Sl(e,t=!1,n=!0){var a;const r=pn(e);return t||(r.equals=Ss),sr&&n&&ve!==null&&ve.l!==null&&((a=ve.l).s??(a.s=[])).push(r),r}function $(e,t,n=!1){K!==null&&(!kt||K.f&Wa)&&kr()&&K.f&(Ce|mn|Na|Wa)&&(dt===null||!Zn.call(dt,e))&&Wi();let r=n?Ve(t):t;return er(e,r,Cr)}function er(e,t,n=null){if(!e.equals(t)){var r=e.v;hn?vn.set(e,t):vn.set(e,r),e.v=t;var a=Cn.ensure();if(a.capture(e,r),e.f&Ce){const i=e;e.f&Le&&Ca(i),Sa(i)}e.wv=li(),Gs(e,Le,n),kr()&&Y!==null&&Y.f&Me&&!(Y.f&(Et|Pn))&&(st===null?ql([e]):st.push(e)),!a.is_fork&&ga.size>0&&!Bs&&Pl()}return t}function Pl(){Bs=!1;for(const e of ga)e.f&Me&&he(e,At),zr(e)&&nr(e);ga.clear()}function Ja(e,t=1){var n=o(e),r=t===1?n++:n--;return $(e,n),r}function hr(e){$(e,e.v+1)}function Gs(e,t,n){var r=e.reactions;if(r!==null)for(var a=kr(),i=r.length,s=0;s<i;s++){var l=r[s],c=l.f;if(!(!a&&l===Y)){var d=(c&Le)===0;if(d&&he(l,t),c&Ce){var v=l;Fe==null||Fe.delete(v),c&Tn||(c&ot&&(l.f|=Tn),Gs(v,At,n))}else if(d){var p=l;c&mn&&yt!==null&&yt.add(p),n!==null?n.push(p):Pa(p)}}}}function Ve(e){if(typeof e!="object"||e===null||Dt in e)return e;const t=Ma(e);if(t!==Pi&&t!==Ti)return e;var n=new Map,r=Aa(e),a=L(0),i=Sn,s=l=>{if(Sn===i)return l();var c=K,d=Sn;ut(null),ts(i);var v=l();return ut(c),ts(d),v};return r&&n.set("length",L(e.length)),new Proxy(e,{defineProperty(l,c,d){(!("value"in d)||d.configurable===!1||d.enumerable===!1||d.writable===!1)&&Gi();var v=n.get(c);return v===void 0?s(()=>{var p=L(d.value);return n.set(c,p),p}):$(v,d.value,!0),!0},deleteProperty(l,c){var d=n.get(c);if(d===void 0){if(c in l){const v=s(()=>L(Te));n.set(c,v),hr(a)}}else $(d,Te),hr(a);return!0},get(l,c,d){var w;if(c===Dt)return e;var v=n.get(c),p=c in l;if(v===void 0&&(!p||(w=dn(l,c))!=null&&w.writable)&&(v=s(()=>{var m=Ve(p?l[c]:Te),A=L(m);return A}),n.set(c,v)),v!==void 0){var f=o(v);return f===Te?void 0:f}return Reflect.get(l,c,d)},getOwnPropertyDescriptor(l,c){var d=Reflect.getOwnPropertyDescriptor(l,c);if(d&&"value"in d){var v=n.get(c);v&&(d.value=o(v))}else if(d===void 0){var p=n.get(c),f=p==null?void 0:p.v;if(p!==void 0&&f!==Te)return{enumerable:!0,configurable:!0,value:f,writable:!0}}return d},has(l,c){var f;if(c===Dt)return!0;var d=n.get(c),v=d!==void 0&&d.v!==Te||Reflect.has(l,c);if(d!==void 0||Y!==null&&(!v||(f=dn(l,c))!=null&&f.writable)){d===void 0&&(d=s(()=>{var w=v?Ve(l[c]):Te,m=L(w);return m}),n.set(c,d));var p=o(d);if(p===Te)return!1}return v},set(l,c,d,v){var I;var p=n.get(c),f=c in l;if(r&&c==="length")for(var w=d;w<p.v;w+=1){var m=n.get(w+"");m!==void 0?$(m,Te):w in l&&(m=s(()=>L(Te)),n.set(w+"",m))}if(p===void 0)(!f||(I=dn(l,c))!=null&&I.writable)&&(p=s(()=>L(void 0)),$(p,Ve(d)),n.set(c,p));else{f=p.v!==Te;var A=s(()=>Ve(d));$(p,A)}var b=Reflect.getOwnPropertyDescriptor(l,c);if(b!=null&&b.set&&b.set.call(v,d),!f){if(r&&typeof c=="string"){var y=n.get("length"),O=Number(c);Number.isInteger(O)&&O>=y.v&&$(y,O+1)}hr(a)}return!0},ownKeys(l){o(a);var c=Reflect.ownKeys(l).filter(p=>{var f=n.get(p);return f===void 0||f.v!==Te});for(var[d,v]of n)v.v!==Te&&!(d in l)&&c.push(d);return c},setPrototypeOf(){Ui()}})}function Za(e){try{if(e!==null&&typeof e=="object"&&Dt in e)return e[Dt]}catch{}return e}function Tl(e,t){return Object.is(Za(e),Za(t))}var Xa,Us,Ws,Ks;function Cl(){if(Xa===void 0){Xa=window,Us=/Firefox/.test(navigator.userAgent);var e=Element.prototype,t=Node.prototype,n=Text.prototype;Ws=dn(t,"firstChild").get,Ks=dn(t,"nextSibling").get,Ua(e)&&(e.__click=void 0,e.__className=void 0,e.__attributes=null,e.__style=void 0,e.__e=void 0),Ua(n)&&(n.__t=void 0)}}function Ft(e=""){return document.createTextNode(e)}function tr(e){return Ws.call(e)}function Ar(e){return Ks.call(e)}function u(e,t){return tr(e)}function j(e,t=!1){{var n=tr(e);return n instanceof Comment&&n.data===""?Ar(n):n}}function g(e,t=1,n=!1){let r=e;for(;t--;)r=Ar(r);return r}function Ol(e){e.textContent=""}function Ys(){return!1}function Js(e,t,n){return document.createElementNS(t??zs,e,void 0)}function Il(e,t){if(t){const n=document.body;e.autofocus=!0,Zt(()=>{document.activeElement===n&&e.focus()})}}let Qa=!1;function jl(){Qa||(Qa=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const n of e.target.elements)(t=n.__on_r)==null||t.call(n)})},{capture:!0}))}function Kr(e){var t=K,n=Y;ut(null),vt(null);try{return e()}finally{ut(t),vt(n)}}function Zs(e,t,n,r=n){e.addEventListener(t,()=>Kr(n));const a=e.__on_r;a?e.__on_r=()=>{a(),r(!0)}:e.__on_r=()=>r(!0),jl()}function Xs(e){Y===null&&(K===null&&Hi(),Vi()),hn&&Fi()}function Ll(e,t){var n=t.last;n===null?t.last=t.first=e:(n.next=e,e.prev=n,t.last=e)}function Mt(e,t){var n=Y;n!==null&&n.f&nt&&(e|=nt);var r={ctx:ve,deps:null,nodes:null,f:e|Le|ot,first:null,fn:t,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,wv:0,ac:null},a=r;if(e&Xn)Vn!==null?Vn.push(r):Cn.ensure().schedule(r);else if(t!==null){try{nr(r)}catch(s){throw je(r),s}a.deps===null&&a.teardown===null&&a.nodes===null&&a.first===a.last&&!(a.f&ar)&&(a=a.first,e&mn&&e&fn&&a!==null&&(a.f|=fn))}if(a!==null&&(a.parent=n,n!==null&&Ll(a,n),K!==null&&K.f&Ce&&!(e&Pn))){var i=K;(i.effects??(i.effects=[])).push(a)}return r}function Oa(){return K!==null&&!kt}function Ia(e){const t=Mt(xr,null);return he(t,Me),t.teardown=e,t}function Xt(e){Xs();var t=Y.f,n=!K&&(t&Et)!==0&&(t&On)===0;if(n){var r=ve;(r.e??(r.e=[])).push(e)}else return Qs(e)}function Qs(e){return Mt(Xn|ws,e)}function Rl(e){return Xs(),Mt(xr|ws,e)}function Dl(e){Cn.ensure();const t=Mt(Pn|ar,e);return(n={})=>new Promise(r=>{n.outro?Nn(t,()=>{je(t),r(void 0)}):(je(t),r(void 0))})}function Yr(e){return Mt(Xn,e)}function Fl(e){return Mt(Na|ar,e)}function ja(e,t=0){return Mt(xr|t,e)}function Q(e,t=[],n=[],r=[]){Fs(r,t,n,a=>{Mt(xr,()=>e(...a.map(o)))})}function Mr(e,t=0){var n=Mt(mn|t,e);return n}function ei(e,t=0){var n=Mt(za|t,e);return n}function Ze(e){return Mt(Et|ar,e)}function ti(e){var t=e.teardown;if(t!==null){const n=hn,r=K;es(!0),ut(null);try{t.call(null)}finally{es(n),ut(r)}}}function La(e,t=!1){var n=e.first;for(e.first=e.last=null;n!==null;){const a=n.ac;a!==null&&Kr(()=>{a.abort(Wt)});var r=n.next;n.f&Pn?n.parent=null:je(n,t),n=r}}function Vl(e){for(var t=e.first;t!==null;){var n=t.next;t.f&Et||je(t),t=n}}function je(e,t=!0){var n=!1;(t||e.f&ji)&&e.nodes!==null&&e.nodes.end!==null&&(Hl(e.nodes.start,e.nodes.end),n=!0),he(e,oa),La(e,t&&!n),mr(e,0);var r=e.nodes&&e.nodes.t;if(r!==null)for(const i of r)i.stop();ti(e),e.f^=oa,e.f|=ct;var a=e.parent;a!==null&&a.first!==null&&ni(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.fn=e.nodes=e.ac=null}function Hl(e,t){for(;e!==null;){var n=e===t?null:Ar(e);e.remove(),e=n}}function ni(e){var t=e.parent,n=e.prev,r=e.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),t!==null&&(t.first===e&&(t.first=r),t.last===e&&(t.last=n))}function Nn(e,t,n=!0){var r=[];ri(e,r,!0);var a=()=>{n&&je(e),t&&t()},i=r.length;if(i>0){var s=()=>--i||a();for(var l of r)l.out(s)}else a()}function ri(e,t,n){if(!(e.f&nt)){e.f^=nt;var r=e.nodes&&e.nodes.t;if(r!==null)for(const l of r)(l.is_global||n)&&t.push(l);for(var a=e.first;a!==null;){var i=a.next,s=(a.f&fn)!==0||(a.f&Et)!==0&&(e.f&mn)!==0;ri(a,t,s?n:!1),a=i}}}function Ra(e){ai(e,!0)}function ai(e,t){if(e.f&nt){e.f^=nt,e.f&Me||(he(e,Le),Cn.ensure().schedule(e));for(var n=e.first;n!==null;){var r=n.next,a=(n.f&fn)!==0||(n.f&Et)!==0;ai(n,a?t:!1),n=r}var i=e.nodes&&e.nodes.t;if(i!==null)for(const s of i)(s.is_global||t)&&s.in()}}function Da(e,t){if(e.nodes)for(var n=e.nodes.start,r=e.nodes.end;n!==null;){var a=n===r?null:Ar(n);t.append(n),n=a}}let jr=!1,hn=!1;function es(e){hn=e}let K=null,kt=!1;function ut(e){K=e}let Y=null;function vt(e){Y=e}let dt=null;function si(e){K!==null&&(dt===null?dt=[e]:dt.push(e))}let Je=null,Qe=0,st=null;function ql(e){st=e}let ii=1,kn=0,Sn=kn;function ts(e){Sn=e}function li(){return++ii}function zr(e){var t=e.f;if(t&Le)return!0;if(t&Ce&&(e.f&=~Tn),t&At){for(var n=e.deps,r=n.length,a=0;a<r;a++){var i=n[a];if(zr(i)&&Hs(i),i.wv>e.wv)return!0}t&ot&&Fe===null&&he(e,Me)}return!1}function oi(e,t,n=!0){var r=e.reactions;if(r!==null&&!(dt!==null&&Zn.call(dt,e)))for(var a=0;a<r.length;a++){var i=r[a];i.f&Ce?oi(i,t,!1):t===i&&(n?he(i,Le):i.f&Me&&he(i,At),Pa(i))}}function ci(e){var A;var t=Je,n=Qe,r=st,a=K,i=dt,s=ve,l=kt,c=Sn,d=e.f;Je=null,Qe=0,st=null,K=d&(Et|Pn)?null:e,dt=null,Qn(e.ctx),kt=!1,Sn=++kn,e.ac!==null&&(Kr(()=>{e.ac.abort(Wt)}),e.ac=null);try{e.f|=ca;var v=e.fn,p=v();e.f|=On;var f=e.deps,w=G==null?void 0:G.is_fork;if(Je!==null){var m;if(w||mr(e,Qe),f!==null&&Qe>0)for(f.length=Qe+Je.length,m=0;m<Je.length;m++)f[Qe+m]=Je[m];else e.deps=f=Je;if(Oa()&&e.f&ot)for(m=Qe;m<f.length;m++)((A=f[m]).reactions??(A.reactions=[])).push(e)}else!w&&f!==null&&Qe<f.length&&(mr(e,Qe),f.length=Qe);if(kr()&&st!==null&&!kt&&f!==null&&!(e.f&(Ce|At|Le)))for(m=0;m<st.length;m++)oi(st[m],e);if(a!==null&&a!==e){if(kn++,a.deps!==null)for(let b=0;b<n;b+=1)a.deps[b].rv=kn;if(t!==null)for(const b of t)b.rv=kn;st!==null&&(r===null?r=st:r.push(...st))}return e.f&un&&(e.f^=un),p}catch(b){return Ts(b)}finally{e.f^=ca,Je=t,Qe=n,st=r,K=a,dt=i,Qn(s),kt=l,Sn=c}}function Bl(e,t){let n=t.reactions;if(n!==null){var r=Ni.call(n,e);if(r!==-1){var a=n.length-1;a===0?n=t.reactions=null:(n[r]=n[a],n.pop())}}if(n===null&&t.f&Ce&&(Je===null||!Zn.call(Je,t))){var i=t;i.f&ot&&(i.f^=ot,i.f&=~Tn),Sa(i),Nl(i),mr(i,0)}}function mr(e,t){var n=e.deps;if(n!==null)for(var r=t;r<n.length;r++)Bl(e,n[r])}function nr(e){var t=e.f;if(!(t&ct)){he(e,Me);var n=Y,r=jr;Y=e,jr=!0;try{t&(mn|za)?Vl(e):La(e),ti(e);var a=ci(e);e.teardown=typeof a=="function"?a:null,e.wv=ii;var i;zi&&dl&&e.f&Le&&e.deps}finally{jr=r,Y=n}}}async function Gl(){await Promise.resolve(),_l()}function o(e){var t=e.f,n=(t&Ce)!==0;if(K!==null&&!kt){var r=Y!==null&&(Y.f&ct)!==0;if(!r&&(dt===null||!Zn.call(dt,e))){var a=K.deps;if(K.f&ca)e.rv<kn&&(e.rv=kn,Je===null&&a!==null&&a[Qe]===e?Qe++:Je===null?Je=[e]:Je.push(e));else{(K.deps??(K.deps=[])).push(e);var i=e.reactions;i===null?e.reactions=[K]:Zn.call(i,K)||i.push(K)}}}if(hn&&vn.has(e))return vn.get(e);if(n){var s=e;if(hn){var l=s.v;return(!(s.f&Me)&&s.reactions!==null||ui(s))&&(l=Ca(s)),vn.set(s,l),l}var c=(s.f&ot)===0&&!kt&&K!==null&&(jr||(K.f&ot)!==0),d=(s.f&On)===0;zr(s)&&(c&&(s.f|=ot),Hs(s)),c&&!d&&(qs(s),di(s))}if(Fe!=null&&Fe.has(e))return Fe.get(e);if(e.f&un)throw e.v;return e.v}function di(e){if(e.f|=ot,e.deps!==null)for(const t of e.deps)(t.reactions??(t.reactions=[])).push(e),t.f&Ce&&!(t.f&ot)&&(qs(t),di(t))}function ui(e){if(e.v===Te)return!0;if(e.deps===null)return!1;for(const t of e.deps)if(vn.has(t)||t.f&Ce&&ui(t))return!0;return!1}function Qt(e){var t=kt;try{return kt=!0,e()}finally{kt=t}}function wn(e){if(!(typeof e!="object"||!e||e instanceof EventTarget)){if(Dt in e)ma(e);else if(!Array.isArray(e))for(let t in e){const n=e[t];typeof n=="object"&&n&&Dt in n&&ma(n)}}}function ma(e,t=new Set){if(typeof e=="object"&&e!==null&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e),e instanceof Date&&e.getTime();for(let r in e)try{ma(e[r],t)}catch{}const n=Ma(e);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const r=ys(n);for(let a in r){const i=r[a].get;if(i)try{i.call(e)}catch{}}}}}function Ul(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const Wl=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function Kl(e){return Wl.includes(e)}const Yl={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function Jl(e){return e=e.toLowerCase(),Yl[e]??e}const Zl=["touchstart","touchmove"];function Xl(e){return Zl.includes(e)}const En=Symbol("events"),vi=new Set,ba=new Set;function Ql(e,t,n,r={}){function a(i){if(r.capture||ya.call(t,i),!i.cancelBubble)return Kr(()=>n==null?void 0:n.call(this,i))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?Zt(()=>{t.addEventListener(e,a,r)}):t.addEventListener(e,a,r),a}function te(e,t,n){(t[En]??(t[En]={}))[e]=n}function In(e){for(var t=0;t<e.length;t++)vi.add(e[t]);for(var n of ba)n(e)}let ns=null;function ya(e){var b,y;var t=this,n=t.ownerDocument,r=e.type,a=((b=e.composedPath)==null?void 0:b.call(e))||[],i=a[0]||e.target;ns=e;var s=0,l=ns===e&&e[En];if(l){var c=a.indexOf(l);if(c!==-1&&(t===document||t===window)){e[En]=t;return}var d=a.indexOf(t);if(d===-1)return;c<=d&&(s=c)}if(i=a[s]||e.target,i!==t){Si(e,"currentTarget",{configurable:!0,get(){return i||n}});var v=K,p=Y;ut(null),vt(null);try{for(var f,w=[];i!==null;){var m=i.assignedSlot||i.parentNode||i.host||null;try{var A=(y=i[En])==null?void 0:y[r];A!=null&&(!i.disabled||e.target===i)&&A.call(i,e)}catch(O){f?w.push(O):f=O}if(e.cancelBubble||m===t||m===null)break;i=m}if(f){for(let O of w)queueMicrotask(()=>{throw O});throw f}}finally{e[En]=t,delete e.currentTarget,ut(v),vt(p)}}}var ms;const ea=((ms=globalThis==null?void 0:globalThis.window)==null?void 0:ms.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:e=>e});function eo(e){return(ea==null?void 0:ea.createHTML(e))??e}function fi(e){var t=Js("template");return t.innerHTML=eo(e.replaceAll("<!>","<!---->")),t.content}function rr(e,t){var n=Y;n.nodes===null&&(n.nodes={start:e,end:t,a:null,t:null})}function T(e,t){var n=(t&rl)!==0,r=(t&al)!==0,a,i=!e.startsWith("<!>");return()=>{a===void 0&&(a=fi(i?e:"<!>"+e),n||(a=tr(a)));var s=r||Us?document.importNode(a,!0):a.cloneNode(!0);if(n){var l=tr(s),c=s.lastChild;rr(l,c)}else rr(s,s);return s}}function to(e,t,n="svg"){var r=!e.startsWith("<!>"),a=`<${n}>${r?e:"<!>"+e}</${n}>`,i;return()=>{if(!i){var s=fi(a),l=tr(s);i=tr(l)}var c=i.cloneNode(!0);return rr(c,c),c}}function no(e,t){return to(e,t,"svg")}function Fn(e=""){{var t=Ft(e+"");return rr(t,t),t}}function D(){var e=document.createDocumentFragment(),t=document.createComment(""),n=Ft();return e.append(t,n),rr(t,n),e}function _(e,t){e!==null&&e.before(t)}function U(e,t){var n=t==null?"":typeof t=="object"?`${t}`:t;n!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=n,e.nodeValue=`${n}`)}function ro(e,t){return ao(e,t)}const Tr=new Map;function ao(e,{target:t,anchor:n,props:r={},events:a,context:i,intro:s=!0,transformError:l}){Cl();var c=void 0,d=Dl(()=>{var v=n??t.appendChild(Ft());yl(v,{pending:()=>{}},w=>{ft({});var m=ve;i&&(m.c=i),a&&(r.$$events=a),c=e(w,r)||{},pt()},l);var p=new Set,f=w=>{for(var m=0;m<w.length;m++){var A=w[m];if(!p.has(A)){p.add(A);var b=Xl(A);for(const I of[t,document]){var y=Tr.get(I);y===void 0&&(y=new Map,Tr.set(I,y));var O=y.get(A);O===void 0?(I.addEventListener(A,ya,{passive:b}),y.set(A,1)):y.set(A,O+1)}}}};return f(Wr(vi)),ba.add(f),()=>{var b;for(var w of p)for(const y of[t,document]){var m=Tr.get(y),A=m.get(w);--A==0?(y.removeEventListener(w,ya),m.delete(w),m.size===0&&Tr.delete(y)):m.set(w,A)}ba.delete(f),v!==n&&((b=v.parentNode)==null||b.removeChild(v))}});return so.set(c,d),c}let so=new WeakMap;var wt,Lt,tt,zn,$r,wr,Ur;class Fa{constructor(t,n=!0){bt(this,"anchor");Z(this,wt,new Map);Z(this,Lt,new Map);Z(this,tt,new Map);Z(this,zn,new Set);Z(this,$r,!0);Z(this,wr,t=>{if(h(this,wt).has(t)){var n=h(this,wt).get(t),r=h(this,Lt).get(n);if(r)Ra(r),h(this,zn).delete(n);else{var a=h(this,tt).get(n);a&&(h(this,Lt).set(n,a.effect),h(this,tt).delete(n),a.fragment.lastChild.remove(),this.anchor.before(a.fragment),r=a.effect)}for(const[i,s]of h(this,wt)){if(h(this,wt).delete(i),i===t)break;const l=h(this,tt).get(s);l&&(je(l.effect),h(this,tt).delete(s))}for(const[i,s]of h(this,Lt)){if(i===n||h(this,zn).has(i))continue;const l=()=>{if(Array.from(h(this,wt).values()).includes(i)){var d=document.createDocumentFragment();Da(s,d),d.append(Ft()),h(this,tt).set(i,{effect:s,fragment:d})}else je(s);h(this,zn).delete(i),h(this,Lt).delete(i)};h(this,$r)||!r?(h(this,zn).add(i),Nn(s,l,!1)):l()}}});Z(this,Ur,t=>{h(this,wt).delete(t);const n=Array.from(h(this,wt).values());for(const[r,a]of h(this,tt))n.includes(r)||(je(a.effect),h(this,tt).delete(r))});this.anchor=t,W(this,$r,n)}ensure(t,n){var r=G,a=Ys();if(n&&!h(this,Lt).has(t)&&!h(this,tt).has(t))if(a){var i=document.createDocumentFragment(),s=Ft();i.append(s),h(this,tt).set(t,{effect:Ze(()=>n(s)),fragment:i})}else h(this,Lt).set(t,Ze(()=>n(this.anchor)));if(h(this,wt).set(r,t),a){for(const[l,c]of h(this,Lt))l===t?r.unskip_effect(c):r.skip_effect(c);for(const[l,c]of h(this,tt))l===t?r.unskip_effect(c.effect):r.skip_effect(c.effect);r.oncommit(h(this,wr)),r.ondiscard(h(this,Ur))}else h(this,wr).call(this,r)}}wt=new WeakMap,Lt=new WeakMap,tt=new WeakMap,zn=new WeakMap,$r=new WeakMap,wr=new WeakMap,Ur=new WeakMap;function J(e,t,n=!1){var r=new Fa(e),a=n?fn:0;function i(s,l){r.ensure(s,l)}Mr(()=>{var s=!1;t((l,c=0)=>{s=!0,i(c,l)}),s||i(-1,null)},a)}function br(e,t){return t}function io(e,t,n){for(var r=[],a=t.length,i,s=t.length,l=0;l<a;l++){let p=t[l];Nn(p,()=>{if(i){if(i.pending.delete(p),i.done.add(p),i.pending.size===0){var f=e.outrogroups;$a(e,Wr(i.done)),f.delete(i),f.size===0&&(e.outrogroups=null)}}else s-=1},!1)}if(s===0){var c=r.length===0&&n!==null;if(c){var d=n,v=d.parentNode;Ol(v),v.append(d),e.items.clear()}$a(e,t,!c)}else i={pending:new Set(t),done:new Set},(e.outrogroups??(e.outrogroups=new Set)).add(i)}function $a(e,t,n=!0){var r;if(e.pending.size>0){r=new Set;for(const s of e.pending.values())for(const l of s)r.add(e.items.get(l).e)}for(var a=0;a<t.length;a++){var i=t[a];if(r!=null&&r.has(i)){i.f|=Rt;const s=document.createDocumentFragment();Da(i,s)}else je(t[a],n)}}var rs;function _n(e,t,n,r,a,i=null){var s=e,l=new Map,c=(t&As)!==0;if(c){var d=e;s=d.appendChild(Ft())}var v=null,p=Ta(()=>{var I=n();return Aa(I)?I:I==null?[]:Wr(I)}),f,w=new Map,m=!0;function A(I){O.effect.f&ct||(O.pending.delete(I),O.fallback=v,lo(O,f,s,t,r),v!==null&&(f.length===0?v.f&Rt?(v.f^=Rt,fr(v,null,s)):Ra(v):Nn(v,()=>{v=null})))}function b(I){O.pending.delete(I)}var y=Mr(()=>{f=o(p);for(var I=f.length,k=new Set,x=G,C=Ys(),N=0;N<I;N+=1){var z=f[N],R=r(z,N),H=m?null:l.get(R);H?(H.v&&er(H.v,z),H.i&&er(H.i,N),C&&x.unskip_effect(H.e)):(H=oo(l,m?s:rs??(rs=Ft()),z,R,N,a,t,n),m||(H.e.f|=Rt),l.set(R,H)),k.add(R)}if(I===0&&i&&!v&&(m?v=Ze(()=>i(s)):(v=Ze(()=>i(rs??(rs=Ft()))),v.f|=Rt)),I>k.size&&Di(),!m)if(w.set(x,k),C){for(const[ce,_e]of l)k.has(ce)||x.skip_effect(_e.e);x.oncommit(A),x.ondiscard(b)}else A(x);o(p)}),O={effect:y,items:l,pending:w,outrogroups:null,fallback:v};m=!1}function dr(e){for(;e!==null&&!(e.f&Et);)e=e.next;return e}function lo(e,t,n,r,a){var H,ce,_e,$e,Ne,qe,ne,ge,Oe;var i=(r&Zi)!==0,s=t.length,l=e.items,c=dr(e.effect.first),d,v=null,p,f=[],w=[],m,A,b,y;if(i)for(y=0;y<s;y+=1)m=t[y],A=a(m,y),b=l.get(A).e,b.f&Rt||((ce=(H=b.nodes)==null?void 0:H.a)==null||ce.measure(),(p??(p=new Set)).add(b));for(y=0;y<s;y+=1){if(m=t[y],A=a(m,y),b=l.get(A).e,e.outrogroups!==null)for(const de of e.outrogroups)de.pending.delete(b),de.done.delete(b);if(b.f&Rt)if(b.f^=Rt,b===c)fr(b,null,n);else{var O=v?v.next:c;b===e.effect.last&&(e.effect.last=b.prev),b.prev&&(b.prev.next=b.next),b.next&&(b.next.prev=b.prev),sn(e,v,b),sn(e,b,O),fr(b,O,n),v=b,f=[],w=[],c=dr(v.next);continue}if(b.f&nt&&(Ra(b),i&&(($e=(_e=b.nodes)==null?void 0:_e.a)==null||$e.unfix(),(p??(p=new Set)).delete(b))),b!==c){if(d!==void 0&&d.has(b)){if(f.length<w.length){var I=w[0],k;v=I.prev;var x=f[0],C=f[f.length-1];for(k=0;k<f.length;k+=1)fr(f[k],I,n);for(k=0;k<w.length;k+=1)d.delete(w[k]);sn(e,x.prev,C.next),sn(e,v,x),sn(e,C,I),c=I,v=C,y-=1,f=[],w=[]}else d.delete(b),fr(b,c,n),sn(e,b.prev,b.next),sn(e,b,v===null?e.effect.first:v.next),sn(e,v,b),v=b;continue}for(f=[],w=[];c!==null&&c!==b;)(d??(d=new Set)).add(c),w.push(c),c=dr(c.next);if(c===null)continue}b.f&Rt||f.push(b),v=b,c=dr(b.next)}if(e.outrogroups!==null){for(const de of e.outrogroups)de.pending.size===0&&($a(e,Wr(de.done)),(Ne=e.outrogroups)==null||Ne.delete(de));e.outrogroups.size===0&&(e.outrogroups=null)}if(c!==null||d!==void 0){var N=[];if(d!==void 0)for(b of d)b.f&nt||N.push(b);for(;c!==null;)!(c.f&nt)&&c!==e.fallback&&N.push(c),c=dr(c.next);var z=N.length;if(z>0){var R=r&As&&s===0?n:null;if(i){for(y=0;y<z;y+=1)(ne=(qe=N[y].nodes)==null?void 0:qe.a)==null||ne.measure();for(y=0;y<z;y+=1)(Oe=(ge=N[y].nodes)==null?void 0:ge.a)==null||Oe.fix()}io(e,N,R)}}i&&Zt(()=>{var de,zt;if(p!==void 0)for(b of p)(zt=(de=b.nodes)==null?void 0:de.a)==null||zt.apply()})}function oo(e,t,n,r,a,i,s,l){var c=s&Yi?s&Xi?pn(n):Sl(n,!1,!1):null,d=s&Ji?pn(a):null;return{v:c,i:d,e:Ze(()=>(i(t,c??n,d??a,l),()=>{e.delete(r)}))}}function fr(e,t,n){if(e.nodes)for(var r=e.nodes.start,a=e.nodes.end,i=t&&!(t.f&Rt)?t.nodes.start:n;r!==null;){var s=Ar(r);if(i.before(r),r===a)return;r=s}}function sn(e,t,n){t===null?e.effect.first=n:t.next=n,n===null?e.effect.last=t:n.prev=t}function V(e,t,n,r,a){var l;var i=(l=t.$$slots)==null?void 0:l[n],s=!1;i===!0&&(i=t.children,s=!0),i===void 0||i(e,s?()=>r:r)}function co(e,t,n){var r=new Fa(e);Mr(()=>{var a=t()??null;r.ensure(a,a&&(i=>n(i,a)))},fn)}function uo(e,t,n,r,a,i){var s=null,l=e,c=new Fa(l,!1);Mr(()=>{const d=t()||null;var v=sl;if(d===null){c.ensure(null,null);return}return c.ensure(d,p=>{if(d){if(s=Js(d,v),rr(s,s),r){var f=s.appendChild(Ft());r(s,f)}Y.nodes.end=s,p.before(s)}}),()=>{}},fn),Ia(()=>{})}function vo(e,t){var n=void 0,r;ei(()=>{n!==(n=t())&&(r&&(je(r),r=null),n&&(r=Ze(()=>{Yr(()=>n(e))})))})}function pi(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var a=e.length;for(t=0;t<a;t++)e[t]&&(n=pi(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function fo(){for(var e,t,n=0,r="",a=arguments.length;n<a;n++)(e=arguments[n])&&(t=pi(e))&&(r&&(r+=" "),r+=t);return r}function po(e){return typeof e=="object"?fo(e):e??""}const as=[...` 	
\r\f \v\uFEFF`];function ho(e,t,n){var r=e==null?"":""+e;if(t&&(r=r?r+" "+t:t),n){for(var a of Object.keys(n))if(n[a])r=r?r+" "+a:a;else if(r.length)for(var i=a.length,s=0;(s=r.indexOf(a,s))>=0;){var l=s+i;(s===0||as.includes(r[s-1]))&&(l===r.length||as.includes(r[l]))?r=(s===0?"":r.substring(0,s))+r.substring(l+1):s=l}}return r===""?null:r}function ss(e,t=!1){var n=t?" !important;":";",r="";for(var a of Object.keys(e)){var i=e[a];i!=null&&i!==""&&(r+=" "+a+": "+i+n)}return r}function ta(e){return e[0]!=="-"||e[1]!=="-"?e.toLowerCase():e}function _o(e,t){if(t){var n="",r,a;if(Array.isArray(t)?(r=t[0],a=t[1]):r=t,e){e=String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var i=!1,s=0,l=!1,c=[];r&&c.push(...Object.keys(r).map(ta)),a&&c.push(...Object.keys(a).map(ta));var d=0,v=-1;const A=e.length;for(var p=0;p<A;p++){var f=e[p];if(l?f==="/"&&e[p-1]==="*"&&(l=!1):i?i===f&&(i=!1):f==="/"&&e[p+1]==="*"?l=!0:f==='"'||f==="'"?i=f:f==="("?s++:f===")"&&s--,!l&&i===!1&&s===0){if(f===":"&&v===-1)v=p;else if(f===";"||p===A-1){if(v!==-1){var w=ta(e.substring(d,v).trim());if(!c.includes(w)){f!==";"&&p++;var m=e.substring(d,p).trim();n+=" "+m+";"}}d=p+1,v=-1}}}}return r&&(n+=ss(r)),a&&(n+=ss(a,!0)),n=n.trim(),n===""?null:n}return e==null?null:String(e)}function ye(e,t,n,r,a,i){var s=e.__className;if(s!==n||s===void 0){var l=ho(n,r,i);l==null?e.removeAttribute("class"):t?e.className=l:e.setAttribute("class",l),e.__className=n}else if(i&&a!==i)for(var c in i){var d=!!i[c];(a==null||d!==!!a[c])&&e.classList.toggle(c,d)}return i}function na(e,t={},n,r){for(var a in n){var i=n[a];t[a]!==i&&(n[a]==null?e.style.removeProperty(a):e.style.setProperty(a,i,r))}}function Fr(e,t,n,r){var a=e.__style;if(a!==t){var i=_o(t,r);i==null?e.removeAttribute("style"):e.style.cssText=i,e.__style=t}else r&&(Array.isArray(r)?(na(e,n==null?void 0:n[0],r[0]),na(e,n==null?void 0:n[1],r[1],"important")):na(e,n,r));return r}function Vr(e,t,n=!1){if(e.multiple){if(t==null)return;if(!Aa(t))return ll();for(var r of e.options)r.selected=t.includes(_r(r));return}for(r of e.options){var a=_r(r);if(Tl(a,t)){r.selected=!0;return}}(!n||t!==void 0)&&(e.selectedIndex=-1)}function hi(e){var t=new MutationObserver(()=>{Vr(e,e.__value)});t.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),Ia(()=>{t.disconnect()})}function go(e,t,n=t){var r=new WeakSet,a=!0;Zs(e,"change",i=>{var s=i?"[selected]":":checked",l;if(e.multiple)l=[].map.call(e.querySelectorAll(s),_r);else{var c=e.querySelector(s)??e.querySelector("option:not([disabled])");l=c&&_r(c)}n(l),G!==null&&r.add(G)}),Yr(()=>{var i=t();if(e===document.activeElement){var s=G;if(r.has(s))return}if(Vr(e,i,a),a&&i===void 0){var l=e.querySelector(":checked");l!==null&&(i=_r(l),n(i))}e.__value=i,a=!1}),hi(e)}function _r(e){return"__value"in e?e.__value:e.value}const ur=Symbol("class"),vr=Symbol("style"),_i=Symbol("is custom element"),gi=Symbol("is html"),mo=ks?"option":"OPTION",bo=ks?"select":"SELECT";function yo(e,t){t?e.hasAttribute("selected")||e.setAttribute("selected",""):e.removeAttribute("selected")}function gn(e,t,n,r){var a=mi(e);a[t]!==(a[t]=n)&&(t==="loading"&&(e[Li]=n),n==null?e.removeAttribute(t):typeof n!="string"&&bi(e).includes(t)?e[t]=n:e.setAttribute(t,n))}function $o(e,t,n,r,a=!1,i=!1){var s=mi(e),l=s[_i],c=!s[gi],d=t||{},v=e.nodeName===mo;for(var p in t)p in n||(n[p]=null);n.class?n.class=po(n.class):n[ur]&&(n.class=null),n[vr]&&(n.style??(n.style=null));var f=bi(e);for(const k in n){let x=n[k];if(v&&k==="value"&&x==null){e.value=e.__value="",d[k]=x;continue}if(k==="class"){var w=e.namespaceURI==="http://www.w3.org/1999/xhtml";ye(e,w,x,r,t==null?void 0:t[ur],n[ur]),d[k]=x,d[ur]=n[ur];continue}if(k==="style"){Fr(e,x,t==null?void 0:t[vr],n[vr]),d[k]=x,d[vr]=n[vr];continue}var m=d[k];if(!(x===m&&!(x===void 0&&e.hasAttribute(k)))){d[k]=x;var A=k[0]+k[1];if(A!=="$$")if(A==="on"){const C={},N="$$"+k;let z=k.slice(2);var b=Kl(z);if(Ul(z)&&(z=z.slice(0,-7),C.capture=!0),!b&&m){if(x!=null)continue;e.removeEventListener(z,d[N],C),d[N]=null}if(b)te(z,e,x),In([z]);else if(x!=null){let R=function(H){d[k].call(this,H)};var I=R;d[N]=Ql(z,e,R,C)}}else if(k==="style")gn(e,k,x);else if(k==="autofocus")Il(e,!!x);else if(!l&&(k==="__value"||k==="value"&&x!=null))e.value=e.__value=x;else if(k==="selected"&&v)yo(e,x);else{var y=k;c||(y=Jl(y));var O=y==="defaultValue"||y==="defaultChecked";if(x==null&&!l&&!O)if(s[k]=null,y==="value"||y==="checked"){let C=e;const N=t===void 0;if(y==="value"){let z=C.defaultValue;C.removeAttribute(y),C.defaultValue=z,C.value=C.__value=N?z:null}else{let z=C.defaultChecked;C.removeAttribute(y),C.defaultChecked=z,C.checked=N?z:!1}}else e.removeAttribute(k);else O||f.includes(y)&&(l||typeof x!="string")?(e[y]=x,y in s&&(s[y]=Te)):typeof x!="function"&&gn(e,y,x)}}}return d}function is(e,t,n=[],r=[],a=[],i,s=!1,l=!1){Fs(a,n,r,c=>{var d=void 0,v={},p=e.nodeName===bo,f=!1;if(ei(()=>{var m=t(...c.map(o)),A=$o(e,d,m,i,s,l);f&&p&&"value"in m&&Vr(e,m.value);for(let y of Object.getOwnPropertySymbols(v))m[y]||je(v[y]);for(let y of Object.getOwnPropertySymbols(m)){var b=m[y];y.description===il&&(!d||b!==d[y])&&(v[y]&&je(v[y]),v[y]=Ze(()=>vo(e,()=>b))),A[y]=b}d=A}),p){var w=e;Yr(()=>{Vr(w,d.value,!0),hi(w)})}f=!0})}function mi(e){return e.__attributes??(e.__attributes={[_i]:e.nodeName.includes("-"),[gi]:e.namespaceURI===zs})}var ls=new Map;function bi(e){var t=e.getAttribute("is")||e.nodeName,n=ls.get(t);if(n)return n;ls.set(t,n=[]);for(var r,a=e,i=Element.prototype;i!==a;){r=ys(a);for(var s in r)r[s].set&&n.push(s);a=Ma(a)}return n}function Hr(e,t,n=t){var r=new WeakSet;Zs(e,"input",async a=>{var i=a?e.defaultValue:e.value;if(i=ra(e)?aa(i):i,n(i),G!==null&&r.add(G),await Gl(),i!==(i=t())){var s=e.selectionStart,l=e.selectionEnd,c=e.value.length;if(e.value=i??"",l!==null){var d=e.value.length;s===l&&l===c&&d>c?(e.selectionStart=d,e.selectionEnd=d):(e.selectionStart=s,e.selectionEnd=Math.min(l,d))}}}),Qt(t)==null&&e.value&&(n(ra(e)?aa(e.value):e.value),G!==null&&r.add(G)),ja(()=>{var a=t();if(e===document.activeElement){var i=G;if(r.has(i))return}ra(e)&&a===aa(e.value)||e.type==="date"&&!a&&!e.value||a!==e.value&&(e.value=a??"")})}function ra(e){var t=e.type;return t==="number"||t==="range"}function aa(e){return e===""?null:+e}function os(e,t){return e===t||(e==null?void 0:e[Dt])===t}function Va(e={},t,n,r){var a=ve.r,i=Y;return Yr(()=>{var s,l;return ja(()=>{s=l,l=[],Qt(()=>{e!==n(...l)&&(t(e,...l),s&&os(n(...s),e)&&t(null,...s))})}),()=>{let c=i;for(;c!==a&&c.parent!==null&&c.parent.f&oa;)c=c.parent;const d=()=>{l&&os(n(...l),e)&&t(null,...l)},v=c.teardown;c.teardown=()=>{d(),v==null||v()}}}),e}function yi(e=!1){const t=ve,n=t.l.u;if(!n)return;let r=()=>wn(t.s);if(e){let a=0,i={};const s=Er(()=>{let l=!1;const c=t.s;for(const d in c)c[d]!==i[d]&&(i[d]=c[d],l=!0);return l&&a++,a});r=()=>o(s)}n.b.length&&Rl(()=>{cs(t,r),ia(n.b)}),Xt(()=>{const a=Qt(()=>n.m.map(Oi));return()=>{for(const i of a)typeof i=="function"&&i()}}),n.a.length&&Xt(()=>{cs(t,r),ia(n.a)})}function cs(e,t){if(e.l.s)for(const n of e.l.s)o(n);t()}const wo={get(e,t){if(!e.exclude.includes(t))return o(e.version),t in e.special?e.special[t]():e.props[t]},set(e,t,n){if(!(t in e.special)){var r=Y;try{vt(e.parent_effect),e.special[t]=xt({get[t](){return e.props[t]}},t,Ms)}finally{vt(r)}}return e.special[t](n),Ja(e.version),!0},getOwnPropertyDescriptor(e,t){if(!e.exclude.includes(t)&&t in e.props)return{enumerable:!0,configurable:!0,value:e.props[t]}},deleteProperty(e,t){return e.exclude.includes(t)||(e.exclude.push(t),Ja(e.version)),!0},has(e,t){return e.exclude.includes(t)?!1:t in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(t=>!e.exclude.includes(t))}};function F(e,t){return new Proxy({props:e,exclude:t,special:{},version:pn(0),parent_effect:Y},wo)}const xo={get(e,t){let n=e.props.length;for(;n--;){let r=e.props[n];if(or(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r)return r[t]}},set(e,t,n){let r=e.props.length;for(;r--;){let a=e.props[r];or(a)&&(a=a());const i=dn(a,t);if(i&&i.set)return i.set(n),!0}return!1},getOwnPropertyDescriptor(e,t){let n=e.props.length;for(;n--;){let r=e.props[n];if(or(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r){const a=dn(r,t);return a&&!a.configurable&&(a.configurable=!0),a}}},has(e,t){if(t===Dt||t===xs)return!1;for(let n of e.props)if(or(n)&&(n=n()),n!=null&&t in n)return!0;return!1},ownKeys(e){const t=[];for(let n of e.props)if(or(n)&&(n=n()),!!n){for(const r in n)t.includes(r)||t.push(r);for(const r of Object.getOwnPropertySymbols(n))t.includes(r)||t.push(r)}return t}};function q(...e){return new Proxy({props:e},xo)}function xt(e,t,n,r){var I;var a=!sr||(n&el)!==0,i=(n&tl)!==0,s=(n&nl)!==0,l=r,c=!0,d=()=>(c&&(c=!1,l=s?Qt(r):r),l);let v;if(i){var p=Dt in e||xs in e;v=((I=dn(e,t))==null?void 0:I.set)??(p&&t in e?k=>e[t]=k:void 0)}var f,w=!1;i?[f,w]=pl(()=>e[t]):f=e[t],f===void 0&&r!==void 0&&(f=d(),v&&(a&&Bi(),v(f)));var m;if(a?m=()=>{var k=e[t];return k===void 0?d():(c=!0,k)}:m=()=>{var k=e[t];return k!==void 0&&(l=void 0),k===void 0?l:k},a&&!(n&Ms))return m;if(v){var A=e.$$legacy;return function(k,x){return arguments.length>0?((!a||!x||A||w)&&v(x?m():k),k):m()}}var b=!1,y=(n&Qi?Er:Ta)(()=>(b=!1,m()));i&&o(y);var O=Y;return function(k,x){if(arguments.length>0){const C=x?o(y):a&&i?Ve(k):k;return $(y,C),b=!0,l!==void 0&&(l=C),k}return hn&&b||O.f&ct?y.v:o(y)}}function ir(e){ve===null&&Es(),sr&&ve.l!==null?Eo(ve).m.push(e):Xt(()=>{const t=Qt(e);if(typeof t=="function")return t})}function ko(e){ve===null&&Es(),ir(()=>()=>Qt(e))}function Eo(e){var t=e.l;return t.u??(t.u={a:[],b:[],m:[]})}const Ao="5";var bs;typeof window<"u"&&((bs=window.__svelte??(window.__svelte={})).v??(bs.v=new Set)).add(Ao);ul();/**
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
 */const Mo={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
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
 */const zo=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
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
 */const ds=(...e)=>e.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();var No=no("<svg><!><!></svg>");function B(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]),r=F(n,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);ft(t,!1);let a=xt(t,"name",8,void 0),i=xt(t,"color",8,"currentColor"),s=xt(t,"size",8,24),l=xt(t,"strokeWidth",8,2),c=xt(t,"absoluteStrokeWidth",8,!1),d=xt(t,"iconNode",24,()=>[]);yi();var v=No();is(v,(w,m,A)=>({...Mo,...w,...r,width:s(),height:s(),stroke:i(),"stroke-width":m,class:A}),[()=>zo(r)?void 0:{"aria-hidden":"true"},()=>(wn(c()),wn(l()),wn(s()),Qt(()=>c()?Number(l())*24/Number(s()):l())),()=>(wn(ds),wn(a()),wn(n),Qt(()=>ds("lucide-icon","lucide",a()?`lucide-${a()}`:"",n.class)))]);var p=u(v);_n(p,1,d,br,(w,m)=>{var A=De(()=>Ii(o(m),2));let b=()=>o(A)[0],y=()=>o(A)[1];var O=D(),I=j(O);uo(I,b,!0,(k,x)=>{is(k,()=>({...y()}))}),_(w,O)});var f=g(p);V(f,t,"default",{}),_(e,v),pt()}function So(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]];B(e,q({name:"activity"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Po(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];B(e,q({name:"arrow-right"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function us(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 8V4H8"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2"}],["path",{d:"M2 14h2"}],["path",{d:"M20 14h2"}],["path",{d:"M15 13v2"}],["path",{d:"M9 13v2"}]];B(e,q({name:"bot"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function To(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]];B(e,q({name:"box"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function wa(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516"}],["path",{d:"M12 13h4"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1"}],["path",{d:"M12 8h8"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2"}],["circle",{cx:"16",cy:"13",r:".5"}],["circle",{cx:"18",cy:"3",r:".5"}],["circle",{cx:"20",cy:"21",r:".5"}],["circle",{cx:"20",cy:"8",r:".5"}]];B(e,q({name:"brain-circuit"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function xa(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M20 6 9 17l-5-5"}]];B(e,q({name:"check"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Lr(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m6 9 6 6 6-6"}]];B(e,q({name:"chevron-down"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function sa(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m9 18 6-6-6-6"}]];B(e,q({name:"chevron-right"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function ka(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];B(e,q({name:"circle-alert"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function vs(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335"}],["path",{d:"m9 11 3 3L22 4"}]];B(e,q({name:"circle-check-big"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Co(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];B(e,q({name:"circle-check"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Oo(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["rect",{x:"9",y:"9",width:"6",height:"6",rx:"1"}]];B(e,q({name:"circle-stop"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Io(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]];B(e,q({name:"circle-x"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function $i(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];B(e,q({name:"copy"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Ha(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 20v2"}],["path",{d:"M12 2v2"}],["path",{d:"M17 20v2"}],["path",{d:"M17 2v2"}],["path",{d:"M2 12h2"}],["path",{d:"M2 17h2"}],["path",{d:"M2 7h2"}],["path",{d:"M20 12h2"}],["path",{d:"M20 17h2"}],["path",{d:"M20 7h2"}],["path",{d:"M7 20v2"}],["path",{d:"M7 2v2"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1"}]];B(e,q({name:"cpu"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function qa(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5"}],["path",{d:"M3 12A9 3 0 0 0 21 12"}]];B(e,q({name:"database"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function fs(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];B(e,q({name:"download"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function jo(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];B(e,q({name:"eye"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Rr(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"M10 9H8"}],["path",{d:"M16 13H8"}],["path",{d:"M16 17H8"}]];B(e,q({name:"file-text"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function ps(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M12 7v5l4 2"}]];B(e,q({name:"history"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Lo(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];B(e,q({name:"info"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Ro(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"}],["path",{d:"M9 18h6"}],["path",{d:"M10 22h4"}]];B(e,q({name:"lightbulb"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Do(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56"}]];B(e,q({name:"loader-circle"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Fo(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 2v4"}],["path",{d:"m16.2 7.8 2.9-2.9"}],["path",{d:"M18 12h4"}],["path",{d:"m16.2 16.2 2.9 2.9"}],["path",{d:"M12 18v4"}],["path",{d:"m4.9 19.1 2.9-2.9"}],["path",{d:"M2 12h4"}],["path",{d:"m4.9 4.9 2.9 2.9"}]];B(e,q({name:"loader"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Vo(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}]];B(e,q({name:"message-square"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Ho(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]];B(e,q({name:"moon"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function qo(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"}],["path",{d:"M12 22V12"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["path",{d:"m7.5 4.27 9 5.15"}]];B(e,q({name:"package"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Bo(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];B(e,q({name:"play"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function qr(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"}]];B(e,q({name:"puzzle"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function gr(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];B(e,q({name:"refresh-cw"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Go(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];B(e,q({name:"search"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Uo(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"}],["path",{d:"m21.854 2.147-10.94 10.939"}]];B(e,q({name:"send"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Wo(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];B(e,q({name:"settings"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Ko(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]];B(e,q({name:"shield-check"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function hs(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{d:"M20 2v4"}],["path",{d:"M22 4h-4"}],["circle",{cx:"4",cy:"20",r:"2"}]];B(e,q({name:"sparkles"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Yo(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];B(e,q({name:"sun"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Jo(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 3v18"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}],["path",{d:"M3 15h18"}]];B(e,q({name:"table"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Zo(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 19h8"}],["path",{d:"m4 17 6-6-6-6"}]];B(e,q({name:"terminal"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function wi(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];B(e,q({name:"trash-2"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function _s(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];B(e,q({name:"triangle-alert"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Xo(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];B(e,q({name:"user"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Qo(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"}]];B(e,q({name:"wrench"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function xi(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];B(e,q({name:"x"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function ec(e,t){const n=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]];B(e,q({name:"zap"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}var tc=T('<button><!> <span class="label"> </span></button>'),nc=T('<button><span class="plugin-icon svelte-129hoe0"> </span> <span class="label"> </span></button>'),rc=T('<div class="empty-plugins svelte-129hoe0">No plugins installed</div>'),ac=T("<!> <span>Light Mode</span>",1),sc=T("<!> <span>Dark Mode</span>",1),ic=T('<aside class="sidebar glass svelte-129hoe0"><div class="logo svelte-129hoe0"><div class="logo-box svelte-129hoe0"><!></div> <span class="logo-text brand-font svelte-129hoe0">Cheesecrab</span></div> <nav class="nav-section svelte-129hoe0"></nav> <div class="separator svelte-129hoe0"></div> <div class="nav-section plugins svelte-129hoe0"><div class="section-header svelte-129hoe0"><!> <span class="section-title svelte-129hoe0">Plugins</span></div> <div class="scroll-area svelte-129hoe0"><!> <!></div></div> <div class="bottom-actions svelte-129hoe0"><button class="theme-toggle svelte-129hoe0" title="Toggle Theme"><!></button></div></aside>');function lc(e,t){ft(t,!0);let n=xt(t,"activeView",15),r=xt(t,"installedPlugins",19,()=>[]),a=xt(t,"theme",3,"dark");const i=[{id:"chat",icon:Vo,label:"AI Space"},{id:"agent",icon:wa,label:"Agent Engine"},{id:"models",icon:qa,label:"Models"},{id:"plugins",icon:qr,label:"Plugins"},{id:"crabtable",icon:Jo,label:"Crab Table"},{id:"office",icon:Rr,label:"Cheese Office"},{id:"settings",icon:Wo,label:"Settings"}];var s=ic(),l=u(s),c=u(l),d=u(c);Ha(d,{size:20,color:"var(--accent-primary)"});var v=g(l,2);_n(v,21,()=>i,br,(N,z)=>{var R=tc();let H;var ce=u(R);{let Ne=De(()=>n()===o(z).id?2.5:2);co(ce,()=>o(z).icon,(qe,ne)=>{ne(qe,{size:18,get strokeWidth(){return o(Ne)}})})}var _e=g(ce,2),$e=u(_e);Q(()=>{H=ye(R,1,"nav-item svelte-129hoe0",null,H,{active:n()===o(z).id}),U($e,o(z).label)}),te("click",R,()=>n(o(z).id)),_(N,R)});var p=g(v,4),f=u(p),w=u(f);qr(w,{size:14});var m=g(f,2),A=u(m);_n(A,17,r,br,(N,z)=>{var R=nc();let H;var ce=u(R),_e=u(ce),$e=g(ce,2),Ne=u($e);Q(()=>{H=ye(R,1,"nav-item plugin svelte-129hoe0",null,H,{active:n()===o(z).id}),U(_e,o(z).icon||"🧩"),U(Ne,o(z).label)}),te("click",R,()=>n(o(z).id)),_(N,R)});var b=g(A,2);{var y=N=>{var z=rc();_(N,z)};J(b,N=>{r().length===0&&N(y)})}var O=g(p,2),I=u(O),k=u(I);{var x=N=>{var z=ac(),R=j(z);Yo(R,{size:18}),_(N,z)},C=N=>{var z=sc(),R=j(z);Ho(R,{size:18}),_(N,z)};J(k,N=>{a()==="dark"?N(x):N(C,-1)})}te("click",I,function(...N){var z;(z=t.onToggleTheme)==null||z.apply(this,N)}),_(e,s),pt()}In(["click"]);var oc=T('<div class="telemetry-bar border-t glass svelte-zgh7bo"><div class="status-group svelte-zgh7bo"><div class="status-item svelte-zgh7bo"><div class="pulse-dot svelte-zgh7bo"></div> <!> <span class="status-text svelte-zgh7bo"></span></div> <div class="separator-v svelte-zgh7bo"></div> <div class="status-item svelte-zgh7bo"><!> <span class="status-text svelte-zgh7bo">Network: Local Only</span></div></div> <div class="metrics-group svelte-zgh7bo"><div class="metric svelte-zgh7bo"><!> <span class="metric-label svelte-zgh7bo">CPU</span> <div class="progress-container svelte-zgh7bo"><div class="progress-bg svelte-zgh7bo"><div class="progress-fill svelte-zgh7bo"></div></div></div> <span class="metric-value svelte-zgh7bo"> </span></div> <div class="separator-v svelte-zgh7bo"></div> <div class="metric svelte-zgh7bo"><!> <span class="metric-label svelte-zgh7bo">RAM</span> <div class="progress-container svelte-zgh7bo"><div class="progress-bg svelte-zgh7bo"><div class="progress-fill svelte-zgh7bo"></div></div></div> <span class="metric-value svelte-zgh7bo"> </span></div></div></div>');function cc(e,t){ft(t,!0);let n=L(12),r=L(4.2),a=16;Xt(()=>{const ce=setInterval(()=>{$(n,Math.floor(Math.random()*25)+5),$(r,+(4.2+Math.random()*.3).toFixed(1))},3e3);return()=>clearInterval(ce)});var i=oc(),s=u(i),l=u(s),c=g(u(l),2);Ko(c,{size:14,color:"#10b981"});var d=g(c,2);d.textContent="System Ready";var v=g(l,4),p=u(v);So(p,{size:14});var f=g(s,2),w=u(f),m=u(w);Ha(m,{size:14});var A=g(m,4),b=u(A),y=u(b),O=g(A,2),I=u(O),k=g(w,4),x=u(k);qa(x,{size:14});var C=g(x,4),N=u(C),z=u(N),R=g(C,2),H=u(R);Q(()=>{Fr(y,`width: ${o(n)??""}%`),U(I,`${o(n)??""}%`),Fr(z,`width: ${o(r)/a*100}%`),U(H,`${o(r)??""}G / 16G`)}),_(e,i),pt()}function jn(){var e,t;return((t=(e=window.go)==null?void 0:e.main)==null?void 0:t.App)??null}async function Ba(){const e=jn();if(e&&e.GetModels){const r=await e.GetModels();return Array.isArray(r)?r:[]}const t=await fetch("/api/models");if(!t.ok)throw new Error(`getModels: ${t.status}`);const n=await t.json();return Array.isArray(n==null?void 0:n.data)?n.data:n&&!Array.isArray(n)?[]:n||[]}async function dc(){const e=jn();if(e&&e.GetSwarmAgents){const t=await e.GetSwarmAgents();return Array.isArray(t)?t:[]}try{const t=await fetch("/v1/agents");if(!t.ok)return[];const n=await t.json();return Array.isArray(n==null?void 0:n.agents)?n.agents:[]}catch{return[]}}function uc(e,{onToken:t,onError:n,onDone:r}){const a=jn();if(a&&a.ChatCompletion&&window.runtime){const s=()=>{try{window.runtime.EventsOff("chat:token"),window.runtime.EventsOff("chat:error"),window.runtime.EventsOff("chat:done")}catch{}};window.runtime.EventsOn("chat:token",l=>{try{t(l)}catch{}}),window.runtime.EventsOn("chat:error",l=>{s();try{n(String(l))}catch{}}),window.runtime.EventsOn("chat:done",()=>{s();try{r()}catch{}}),a.ChatCompletion({...e,stream:!0});return}const i=JSON.stringify({...e,stream:!0});fetch("/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json"},body:i}).then(s=>{if(!s.ok){s.text().then(p=>n(p||`HTTP ${s.status}`)).catch(()=>n(`HTTP ${s.status}`));return}const l=s.body.getReader(),c=new TextDecoder;let d="";function v(){return l.read().then(({done:p,value:f})=>{if(p){r();return}d+=c.decode(f,{stream:!0});const w=d.split(`
`);d=w.pop()??"";for(const m of w)if(m.startsWith("data: ")){const A=m.slice(6);if(A==="[DONE]"){r();return}try{const b=JSON.parse(A);t(b)}catch{}}return v()})}return v()}).catch(s=>n((s==null?void 0:s.message)||String(s)))}function vc(e,{onProgress:t,onError:n}){const r=jn();if(r&&r.PullModel&&window.runtime){window.runtime.EventsOn("pull:progress",i=>{try{t(i)}catch{}}),window.runtime.EventsOn("pull:error",i=>{try{n(String(i))}catch{}}),r.PullModel(e);return}const a=JSON.stringify({model:e,stream:!0});fetch("/api/pull",{method:"POST",headers:{"Content-Type":"application/json"},body:a}).then(i=>{if(!i.ok){i.text().then(v=>n(v||`HTTP ${i.status}`)).catch(()=>n(`HTTP ${i.status}`));return}const s=i.body.getReader(),l=new TextDecoder;let c="";function d(){return s.read().then(({done:v,value:p})=>{if(v)return;c+=l.decode(p,{stream:!0});const f=c.split(`
`);c=f.pop()??"";for(const w of f)if(w.trim())try{t(JSON.parse(w))}catch{}return d()})}return d()}).catch(i=>n((i==null?void 0:i.message)||String(i)))}function fc(e,{onEvent:t,onError:n,onDone:r}){const a=new AbortController,i=JSON.stringify(e);return fetch("/v1/agent/run",{method:"POST",headers:{"Content-Type":"application/json"},body:i,signal:a.signal}).then(s=>{if(!s.ok){s.text().then(p=>n(p||`HTTP ${s.status}`)).catch(()=>n(`HTTP ${s.status}`));return}const l=s.body.getReader(),c=new TextDecoder;let d="";function v(){return l.read().then(({done:p,value:f})=>{if(p){r();return}d+=c.decode(f,{stream:!0});const w=d.split(`
`);d=w.pop()??"";for(const m of w)if(m.startsWith("data: ")){const A=m.slice(6).trim();if(A==="[DONE]"){r();return}try{const b=JSON.parse(A);t(b)}catch{}}return v()})}return v()}).catch(s=>{(s==null?void 0:s.name)!=="AbortError"&&n((s==null?void 0:s.message)||String(s))}),{cancel:()=>a.abort()}}async function pc(e,t){const n=await fetch("/v1/agent/approve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:e,approved:t})});if(!n.ok){const r=await n.text();throw new Error(r||`agentApprove: HTTP ${n.status}`)}}async function hc(e,t){const n=await fetch("/v1/agent/crabtable/response",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:e,result:t})});if(!n.ok){const r=await n.text();throw new Error(r||`agentCrabTableResponse: HTTP ${n.status}`)}}async function _c(){try{const e=await fetch("/v1/agent/paths");if(!e.ok)return[];const t=await e.json();return Array.isArray(t==null?void 0:t.paths)?t.paths:[]}catch{return[]}}async function gc(e){const t=jn();if(t&&t.LoadModel){await t.LoadModel(e);return}const n=await fetch("/models/load",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:e})});if(!n.ok){const r=await n.text();throw new Error(r||`HTTP ${n.status}`)}}async function mc(){const e=jn();return e&&e.SelectAndOpenOfficeDocument?await e.SelectAndOpenOfficeDocument():""}async function bc(){const e=jn();e&&e.CloseOfficeDocument&&await e.CloseOfficeDocument()}var yc=T("<span> </span>"),$c=T("<span>Single agent</span>"),wc=T('<div><div><div class="avatar svelte-126kodk"><!></div> <div class="bubble-wrapper svelte-126kodk"><div class="bubble svelte-126kodk"> </div> <div class="bubble-actions svelte-126kodk"><button class="action-btn svelte-126kodk"><!></button></div></div></div></div>'),xc=T('<div class="message-wrapper svelte-126kodk"><div class="message assistant thinking svelte-126kodk"><div class="avatar svelte-126kodk"><!></div> <div class="bubble thinking-bubble svelte-126kodk"><div class="dot-loader svelte-126kodk"></div></div></div></div>'),kc=T('<div class="chat-space animate-fade svelte-126kodk"><header class="chat-header glass svelte-126kodk"><div class="model-info svelte-126kodk"><div></div> <span class="model-name svelte-126kodk"> </span> <!></div> <div><!> <!></div> <div class="header-actions"><button class="icon-btn svelte-126kodk" title="Clear Chat"><!></button></div></header> <div class="messages-container svelte-126kodk"><!> <!></div> <div class="input-area svelte-126kodk"><div><textarea class="svelte-126kodk"></textarea> <div class="input-footer svelte-126kodk"><div class="input-hints svelte-126kodk"><!> <span>Local Engine Ready</span></div> <button class="send-btn svelte-126kodk"><!></button></div></div> <p class="disclaimer svelte-126kodk">Private. Local. Edge-native.</p></div></div>');function Ec(e,t){ft(t,!0);let n=L(Ve([{role:"assistant",content:"Welcome to AI Space. I am the Cheesecrab Engine. How can I assist you today?"}])),r=L(""),a=L(!1),i=L(!1),s=L(null),l=L(null),c=L(Ve({id:"Searching...",status:"idle"})),d=L(Ve([]));async function v(){try{const E=await Ba();if(!Array.isArray(E)||E.length===0){$(c,{id:"No Active Model",status:"idle"},!0);return}const S=re=>{var we;return((we=re==null?void 0:re.status)==null?void 0:we.value)??(re==null?void 0:re.status)},X=E.find(re=>S(re)==="loaded");X&&X.id?$(c,{id:String(X.id).split("/").pop().replace(/\.gguf$/i,""),status:"ready",rawId:X.id},!0):$(c,{id:"No Active Model",status:"idle"},!0)}catch{$(c,{id:"No Active Model",status:"idle"},!0)}}async function p(){try{const E=await dc();$(d,Array.isArray(E)?E:[],!0)}catch{$(d,[],!0)}}ir(()=>{v(),p();const E=setInterval(()=>{v(),p()},3e3);return()=>clearInterval(E)});function f(){o(s)&&(o(s).scrollTop=o(s).scrollHeight)}Xt(()=>{o(n).length,setTimeout(f,50)});function w(){if(!o(r).trim()||o(a)||o(i))return;if(o(c).status!=="ready"){alert("Please load a model in the Plugin Store first.");return}const E=o(r);$(n,[...o(n),{role:"user",content:E}],!0),$(r,""),$(a,!0),uc({model:o(c).rawId,messages:o(n).map(S=>({role:S.role,content:S.content}))},{onToken:S=>{var re,we,xe;$(a,!1);const X=((xe=(we=(re=S.choices)==null?void 0:re[0])==null?void 0:we.delta)==null?void 0:xe.content)||"";if(X){const ue=o(n)[o(n).length-1];ue&&ue.role==="assistant"&&o(i)?(ue.content+=X,$(n,[...o(n)],!0)):($(n,[...o(n),{role:"assistant",content:X}],!0),$(i,!0))}},onError:S=>{$(a,!1),$(i,!1),$(n,[...o(n),{role:"assistant",content:`Error: ${S}`}],!0)},onDone:()=>{$(a,!1),$(i,!1)}})}function m(){$(n,[{role:"assistant",content:"Chat cleared. How can I help you now?"}],!0)}function A(E,S){navigator.clipboard.writeText(E),$(l,S,!0),setTimeout(()=>$(l,null),2e3)}var b=kc(),y=u(b),O=u(y),I=u(O);let k;var x=g(I,2),C=u(x),N=g(x,2);Lr(N,{size:14});var z=g(O,2);let R;var H=u(z);hs(H,{size:14});var ce=g(H,2);{var _e=E=>{var S=yc(),X=u(S);Q(()=>U(X,`${o(d).length??""} agents in swarm`)),_(E,S)},$e=E=>{var S=$c();_(E,S)};J(ce,E=>{o(d).length>0?E(_e):E($e,-1)})}var Ne=g(z,2),qe=u(Ne),ne=u(qe);wi(ne,{size:18});var ge=g(y,2),Oe=u(ge);_n(Oe,17,()=>o(n),br,(E,S,X)=>{var re=wc();let we;var xe=u(re),ue=u(xe),Ue=u(ue);{var We=Ee=>{us(Ee,{size:18})},ht=Ee=>{Xo(Ee,{size:18})};J(Ue,Ee=>{o(S).role==="assistant"?Ee(We):Ee(ht,-1)})}var nn=g(ue,2),_t=u(nn),Ht=u(_t),rn=g(_t,2),Xe=u(rn),ke=u(Xe);{var Re=Ee=>{xa(Ee,{size:12,color:"var(--accent-primary)"})},Nt=Ee=>{$i(Ee,{size:12})};J(ke,Ee=>{o(l)===X?Ee(Re):Ee(Nt,-1)})}Q(()=>{we=ye(re,1,"message-wrapper svelte-126kodk",null,we,{user:o(S).role==="user"}),ye(xe,1,`message ${o(S).role??""}`,"svelte-126kodk"),U(Ht,o(S).content)}),te("click",Xe,()=>A(o(S).content,X)),_(E,re)});var de=g(Oe,2);{var zt=E=>{var S=xc(),X=u(S),re=u(X),we=u(re);us(we,{size:18}),_(E,S)};J(de,E=>{o(a)&&E(zt)})}Va(ge,E=>$(s,E),()=>o(s));var en=g(ge,2),rt=u(en);let Ge;var Vt=u(rt),bn=g(Vt,2),Ln=u(bn),Rn=u(Ln);hs(Rn,{size:12});var tn=g(Ln,2),Dn=u(tn);Uo(Dn,{size:18}),Q(()=>{k=ye(I,1,"status-indicator svelte-126kodk",null,k,{active:o(c).status==="ready"}),U(C,o(c).id),R=ye(z,1,"swarm-info svelte-126kodk",null,R,{active:o(d).length>0}),Ge=ye(rt,1,"input-container glass svelte-126kodk",null,Ge,{disabled:o(c).status!=="ready"}),gn(Vt,"placeholder",o(c).status==="ready"?"Ask anything...":"Load a model to start chat"),Vt.disabled=o(c).status!=="ready"||o(a)||o(i),tn.disabled=!o(r)||o(a)||o(i)||o(c).status!=="ready"}),te("click",qe,m),te("keydown",Vt,E=>E.key==="Enter"&&!E.shiftKey&&(E.preventDefault(),w())),Hr(Vt,()=>o(r),E=>$(r,E)),te("click",tn,w),_(e,b),pt()}In(["click","keydown"]);var Ac=T('<div class="empty-state svelte-18mm1rx"><!> <p class="empty-title svelte-18mm1rx">Ready to run</p> <p class="empty-sub svelte-18mm1rx">Enter a goal below and press Run</p></div>'),Mc=T('<div class="timeline-card thinking-card svelte-18mm1rx"><div class="card-icon spin svelte-18mm1rx"><!></div> <span class="card-label muted svelte-18mm1rx"> </span></div>'),zc=T('<div class="card-body svelte-18mm1rx"><p class="reasoning-text svelte-18mm1rx"> </p></div>'),Nc=T('<div class="timeline-card thought-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx" role="button" tabindex="0"><div class="card-icon svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx"> </span> <span class="card-plan muted svelte-18mm1rx"> </span> <div class="expand-icon svelte-18mm1rx"><!></div></div> <!></div>'),Sc=T('<span class="badge danger svelte-18mm1rx"><!> dangerous</span>'),Pc=T('<div class="card-body svelte-18mm1rx"><pre class="code-block svelte-18mm1rx"> </pre></div>'),Tc=T('<div class="timeline-card tool-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx" role="button" tabindex="0"><div class="card-icon svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx"><code class="svelte-18mm1rx"> </code></span> <!> <div class="expand-icon svelte-18mm1rx"><!></div></div> <!></div>'),Cc=T('<div class="approval-buttons svelte-18mm1rx"><button class="approve-btn svelte-18mm1rx"><!> Approve</button> <button class="deny-btn svelte-18mm1rx"><!> Deny</button></div>'),Oc=T('<div class="approval-resolved muted svelte-18mm1rx"><!> Decision sent</div>'),Ic=T('<div class="timeline-card approval-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx"><div class="card-icon warning svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx">Approval required — <code class="svelte-18mm1rx"> </code></span></div> <div class="card-body svelte-18mm1rx"><p class="approval-msg svelte-18mm1rx">This tool is marked <strong>dangerous</strong> and requires your approval before running.</p> <pre class="code-block svelte-18mm1rx"> </pre> <!></div></div>'),jc=T('<div class="card-body svelte-18mm1rx"><pre class="code-block svelte-18mm1rx"> </pre></div>'),Lc=T('<div class="timeline-card obs-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx" role="button" tabindex="0"><div class="card-icon svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx"> </span> <div class="expand-icon svelte-18mm1rx"><!></div></div> <!></div>'),Rc=T('<div class="timeline-card answer-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx"><div class="card-icon success svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx">Final Answer</span> <button class="icon-btn small svelte-18mm1rx" title="Copy"><!></button></div> <div class="card-body svelte-18mm1rx"><p class="answer-text svelte-18mm1rx"> </p></div></div>'),Dc=T('<div class="timeline-card error-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx"><div class="card-icon error svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx">Error</span></div> <div class="card-body svelte-18mm1rx"><p class="error-text svelte-18mm1rx"> </p></div></div>'),Fc=T('<p class="history-empty svelte-18mm1rx">No completed runs yet.</p>'),Vc=T('<button class="history-item svelte-18mm1rx"><span> </span> <span class="history-goal svelte-18mm1rx"> </span></button>'),Hc=T('<aside class="history-panel glass svelte-18mm1rx"><div class="history-header svelte-18mm1rx"><!> <span>Past Runs</span></div> <!></aside>'),qc=T('<button class="stop-btn svelte-18mm1rx"><!></button>'),Bc=T('<button class="run-btn svelte-18mm1rx"><!></button>'),Gc=T('<div class="agent-space animate-fade svelte-18mm1rx"><header class="agent-header glass svelte-18mm1rx"><div class="header-left svelte-18mm1rx"><!> <span class="header-title brand-font svelte-18mm1rx">Agent Engine</span></div> <div class="model-status svelte-18mm1rx"><div></div> <span class="model-name svelte-18mm1rx"> </span></div> <div class="header-actions svelte-18mm1rx"><button title="Run history"><!></button> <button class="icon-btn svelte-18mm1rx" title="Clear timeline"><!></button></div></header> <div class="workspace svelte-18mm1rx"><div class="timeline-column svelte-18mm1rx"><!> <!></div> <!></div> <div class="input-area svelte-18mm1rx"><div class="options-row svelte-18mm1rx"><label class="option-label svelte-18mm1rx">Strategy <select class="option-select svelte-18mm1rx"><option>ReAct</option><option>Function Calling</option></select></label> <label class="option-label svelte-18mm1rx">Max steps <input class="option-input svelte-18mm1rx" type="number" min="1" max="50"/></label></div> <div><textarea class="goal-input svelte-18mm1rx"></textarea> <div class="goal-footer svelte-18mm1rx"><div class="goal-hints svelte-18mm1rx"><!> <span> </span></div> <!></div></div> <p class="disclaimer svelte-18mm1rx">Agent has access to your filesystem and shell. Review dangerous tool approvals carefully.</p></div></div>');function Uc(e,t){ft(t,!0);let n=L(""),r=L("react"),a=L(20),i=L(Ve({id:"Searching...",status:"idle",rawId:""})),s=L(!1),l=L(null),c=L(null),d=L(Ve([])),v=L(Ve([])),p=L(!1),f=L(null),w=L(null);async function m(){try{const P=await Ba(),M=Ae=>{var ae;return((ae=Ae==null?void 0:Ae.status)==null?void 0:ae.value)??(Ae==null?void 0:Ae.status)},me=Array.isArray(P)?P.find(Ae=>M(Ae)==="loaded"):null;me!=null&&me.id?$(i,{id:String(me.id).split("/").pop().replace(/\.gguf$/i,""),status:"ready",rawId:me.id},!0):$(i,{id:"No Model Loaded",status:"idle",rawId:""},!0)}catch{$(i,{id:"No Model Loaded",status:"idle",rawId:""},!0)}}ir(()=>{m(),A();const P=setInterval(m,5e3),M=async me=>{const{sessionId:Ae,result:ae}=me.detail;if(Ae===o(l)||!o(l))try{await hc(Ae,ae)}catch(fe){console.warn("crabtable response error:",fe)}};return window.addEventListener("crabtable-external-res",M),()=>{clearInterval(P),window.removeEventListener("crabtable-external-res",M)}});async function A(){$(v,await _c(),!0)}function b(){if(!o(n).trim()||o(s))return;if(o(i).status!=="ready"){alert("Please load a model in the Plugin Store first.");return}$(d,[],!0),$(l,null),$(f,null),$(s,!0);const{cancel:P}=fc({goal:o(n).trim(),model:o(i).rawId,strategy:o(r),max_steps:o(a)},{onEvent:O,onError:M=>{$(s,!1),$(d,[...o(d),{type:"error",step:-1,payload:M,id:x()}],!0)},onDone:()=>{$(s,!1),A()}});$(c,P,!0)}function y(){o(c)&&o(c)(),$(s,!1),$(c,null),$(d,[...o(d),{type:"error",step:-1,payload:"Run cancelled by user.",id:x()}],!0)}function O(P){if(P.type==="session_start"){$(l,P.session_id??P.payload??null,!0);return}if(P.type!=="stream_token"){if(P.type==="thinking"){$(d,[...o(d).filter(M=>!(M.type==="thinking"&&M.step===P.step)),{...P,id:x()}],!0);return}if(P.type==="approval_required"){const M=P.payload??{};$(f,{toolName:M.tool??"?",args:M.args??{},step:P.step},!0)}if(["thought","tool_call","observation","final_answer","approval_required"].includes(P.type)&&$(d,o(d).filter(M=>!(M.type==="thinking"&&M.step===P.step)),!0),P.type==="crabtable_req"){const M=P.payload??{};window.dispatchEvent(new CustomEvent("crabtable-external-req",{detail:{tc:M,sessionId:o(l)}}))}$(d,[...o(d),{...P,id:x()}],!0)}}async function I(P){if(o(l)){try{await pc(o(l),P)}catch(M){console.warn("approve error:",M)}$(f,null)}}let k=0;function x(){return++k}function C(P){try{return JSON.stringify(P,null,2)}catch{return String(P)}}function N(){$(d,[],!0),$(l,null),$(f,null)}let z=L(Ve(new Set));function R(P){const M=new Set(o(z));M.has(P)?M.delete(P):M.add(P),$(z,M,!0)}let H=L(null);function ce(P,M){navigator.clipboard.writeText(P),$(H,M,!0),setTimeout(()=>$(H,null),2e3)}var _e=Gc(),$e=u(_e),Ne=u($e),qe=u(Ne);wa(qe,{size:20,color:"var(--accent-primary)"});var ne=g(Ne,2),ge=u(ne);let Oe;var de=g(ge,2),zt=u(de),en=g(ne,2),rt=u(en);let Ge;var Vt=u(rt);ps(Vt,{size:18});var bn=g(rt,2),Ln=u(bn);wi(Ln,{size:18});var Rn=g($e,2),tn=u(Rn),Dn=u(tn);{var E=P=>{var M=Ac(),me=u(M);wa(me,{size:48,color:"var(--text-tertiary)"}),_(P,M)};J(Dn,P=>{o(d).length===0&&!o(s)&&P(E)})}var S=g(Dn,2);_n(S,17,()=>o(d),P=>P.id,(P,M)=>{var me=D(),Ae=j(me);{var ae=ee=>{var se=Mc(),ie=u(se),le=u(ie);Fo(le,{size:16});var Se=g(ie,2),Ie=u(Se);Q(()=>U(Ie,`Thinking — step ${o(M).step+1}`)),_(ee,se)},fe=ee=>{const se=De(()=>o(M).payload??{});var ie=Nc(),le=u(ie),Se=u(le),Ie=u(Se);Ro(Ie,{size:16});var Be=g(Se,2),gt=u(Be),Tt=g(Be,2),Ct=u(Tt),Ot=g(Tt,2),Gt=u(Ot);{var Ke=Pe=>{Lr(Pe,{size:14})},yn=De(()=>o(z).has(o(M).id)),$n=Pe=>{sa(Pe,{size:14})};J(Gt,Pe=>{o(yn)?Pe(Ke):Pe($n,-1)})}var oe=g(le,2);{var at=Pe=>{var pe=zc(),Ut=u(pe),lr=u(Ut);Q(()=>U(lr,o(se).reasoning??"")),_(Pe,pe)},mt=De(()=>o(z).has(o(M).id));J(oe,Pe=>{o(mt)&&Pe(at)})}Q(()=>{U(gt,o(se).is_final?"Final reasoning":`Thought — step ${o(M).step+1}`),U(Ct,o(se).plan??"")}),te("click",le,()=>R(o(M).id)),te("keydown",le,Pe=>Pe.key==="Enter"&&R(o(M).id)),_(ee,ie)},qt=ee=>{const se=De(()=>o(M).payload??{});var ie=Tc(),le=u(ie),Se=u(le),Ie=u(Se);Qo(Ie,{size:16});var Be=g(Se,2),gt=u(Be),Tt=u(gt),Ct=g(Be,2);{var Ot=pe=>{var Ut=Sc(),lr=u(Ut);_s(lr,{size:11}),_(pe,Ut)};J(Ct,pe=>{o(se).dangerous&&pe(Ot)})}var Gt=g(Ct,2),Ke=u(Gt);{var yn=pe=>{Lr(pe,{size:14})},$n=De(()=>o(z).has(o(M).id)),oe=pe=>{sa(pe,{size:14})};J(Ke,pe=>{o($n)?pe(yn):pe(oe,-1)})}var at=g(le,2);{var mt=pe=>{var Ut=Pc(),lr=u(Ut),ki=u(lr);Q(Ei=>U(ki,Ei),[()=>C(o(se).args??{})]),_(pe,Ut)},Pe=De(()=>o(z).has(o(M).id));J(at,pe=>{o(Pe)&&pe(mt)})}Q(()=>U(Tt,o(se).tool??"?")),te("click",le,()=>R(o(M).id)),te("keydown",le,pe=>pe.key==="Enter"&&R(o(M).id)),_(ee,ie)},St=ee=>{const se=De(()=>o(M).payload??{});var ie=Ic(),le=u(ie),Se=u(le),Ie=u(Se);_s(Ie,{size:16});var Be=g(Se,2),gt=g(u(Be)),Tt=u(gt),Ct=g(le,2),Ot=g(u(Ct),2),Gt=u(Ot),Ke=g(Ot,2);{var yn=oe=>{var at=Cc(),mt=u(at),Pe=u(mt);xa(Pe,{size:14});var pe=g(mt,2),Ut=u(pe);xi(Ut,{size:14}),te("click",mt,()=>I(!0)),te("click",pe,()=>I(!1)),_(oe,at)},$n=oe=>{var at=Oc(),mt=u(at);vs(mt,{size:14}),_(oe,at)};J(Ke,oe=>{o(f)&&o(f).step===o(M).step?oe(yn):oe($n,-1)})}Q(oe=>{U(Tt,o(se).tool??"?"),U(Gt,oe)},[()=>C(o(se).args??{})]),_(ee,ie)},an=ee=>{var se=Lc(),ie=u(se),le=u(ie),Se=u(le);jo(Se,{size:16});var Ie=g(le,2),Be=u(Ie),gt=g(Ie,2),Tt=u(gt);{var Ct=oe=>{Lr(oe,{size:14})},Ot=De(()=>o(z).has(o(M).id)),Gt=oe=>{sa(oe,{size:14})};J(Tt,oe=>{o(Ot)?oe(Ct):oe(Gt,-1)})}var Ke=g(ie,2);{var yn=oe=>{var at=jc(),mt=u(at),Pe=u(mt);Q(()=>U(Pe,o(M).payload??"")),_(oe,at)},$n=De(()=>o(z).has(o(M).id));J(Ke,oe=>{o($n)&&oe(yn)})}Q(()=>U(Be,`Observation — step ${o(M).step+1}`)),te("click",ie,()=>R(o(M).id)),te("keydown",ie,oe=>oe.key==="Enter"&&R(o(M).id)),_(ee,se)},Pt=ee=>{var se=Rc(),ie=u(se),le=u(ie),Se=u(le);vs(Se,{size:16});var Ie=g(le,4),Be=u(Ie);{var gt=Ke=>{xa(Ke,{size:12})},Tt=Ke=>{$i(Ke,{size:12})};J(Be,Ke=>{o(H)===o(M).id?Ke(gt):Ke(Tt,-1)})}var Ct=g(ie,2),Ot=u(Ct),Gt=u(Ot);Q(()=>U(Gt,o(M).payload??"")),te("click",Ie,()=>ce(o(M).payload??"",o(M).id)),_(ee,se)},Bt=ee=>{var se=Dc(),ie=u(se),le=u(ie),Se=u(le);Io(Se,{size:16});var Ie=g(ie,2),Be=u(Ie),gt=u(Be);Q(()=>U(gt,o(M).payload??"")),_(ee,se)};J(Ae,ee=>{o(M).type==="thinking"?ee(ae):o(M).type==="thought"?ee(fe,1):o(M).type==="tool_call"?ee(qt,2):o(M).type==="approval_required"?ee(St,3):o(M).type==="observation"?ee(an,4):o(M).type==="final_answer"?ee(Pt,5):o(M).type==="error"&&ee(Bt,6)})}_(P,me)});var X=g(tn,2);{var re=P=>{var M=Hc(),me=u(M),Ae=u(me);ps(Ae,{size:14});var ae=g(me,2);{var fe=St=>{var an=Fc();_(St,an)},qt=St=>{var an=D(),Pt=j(an);_n(Pt,17,()=>[...o(v)].reverse(),br,(Bt,ee)=>{var se=Vc(),ie=u(se);let le;var Se=u(ie),Ie=g(ie,2),Be=u(Ie);Q(()=>{le=ye(ie,1,"history-status svelte-18mm1rx",null,le,{done:o(ee).status==="completed",fail:o(ee).status!=="completed"}),U(Se,o(ee).status==="completed"?"✓":"✗"),U(Be,o(ee).goal)}),te("click",se,()=>{$(n,o(ee).goal,!0),$(p,!1)}),_(Bt,se)}),_(St,an)};J(ae,St=>{o(v).length===0?St(fe):St(qt,-1)})}_(P,M)};J(X,P=>{o(p)&&P(re)})}var we=g(Rn,2),xe=u(we),ue=u(xe),Ue=g(u(ue)),We=u(Ue);We.value=We.__value="react";var ht=g(We);ht.value=ht.__value="function_calling";var nn=g(ue,2),_t=g(u(nn)),Ht=g(xe,2);let rn;var Xe=u(Ht);Va(Xe,P=>$(w,P),()=>o(w));var ke=g(Xe,2),Re=u(ke),Nt=u(Re);Zo(Nt,{size:12});var Ee=g(Nt,2),Nr=u(Ee),Jr=g(Re,2);{var Sr=P=>{var M=qc(),me=u(M);Oo(me,{size:18}),te("click",M,y),_(P,M)},Zr=P=>{var M=Bc(),me=u(M);Bo(me,{size:18}),Q(Ae=>M.disabled=Ae,[()=>!o(n).trim()||o(i).status!=="ready"]),te("click",M,b),_(P,M)};J(Jr,P=>{o(s)?P(Sr):P(Zr,-1)})}Q(()=>{Oe=ye(ge,1,"status-dot svelte-18mm1rx",null,Oe,{active:o(i).status==="ready"}),U(zt,o(i).id),Ge=ye(rt,1,"icon-btn svelte-18mm1rx",null,Ge,{active:o(p)}),bn.disabled=o(s),Ue.disabled=o(s),_t.disabled=o(s),rn=ye(Ht,1,"goal-container glass svelte-18mm1rx",null,rn,{disabled:o(i).status!=="ready"}),gn(Xe,"placeholder",o(i).status==="ready"?'Describe your goal… e.g. "List all Go files and count lines"':"Load a model in Plugin Store to start"),Xe.disabled=o(i).status!=="ready"||o(s),U(Nr,`Local · Private · ${o(r)==="react"?"ReAct":"Function Calling"}`)}),te("click",rt,()=>{$(p,!o(p)),o(p)&&A()}),te("click",bn,N),go(Ue,()=>o(r),P=>$(r,P)),Hr(_t,()=>o(a),P=>$(a,P)),te("keydown",Xe,P=>P.key==="Enter"&&!P.shiftKey&&(P.preventDefault(),b())),Hr(Xe,()=>o(n),P=>$(n,P)),_(e,_e),pt()}In(["click","keydown"]);var Wc=T("<!> <span>Pulling…</span>",1),Kc=T("<!> <span>Pull</span>",1),Yc=T('<span class="prog-pct svelte-rgdxjf"> </span>'),Jc=T('<div><div class="progress-meta svelte-rgdxjf"><span class="prog-status svelte-rgdxjf"><!></span> <!></div> <div class="progress-bar svelte-rgdxjf"><div class="progress-fill svelte-rgdxjf"></div></div></div>'),Zc=T('<div class="error-banner svelte-rgdxjf"><!> <span> </span></div>'),Xc=T('<div class="empty-state svelte-rgdxjf"><!> <p class="svelte-rgdxjf">Scanning storage…</p></div>'),Qc=T('<div class="empty-state svelte-rgdxjf"><!> <h3 class="svelte-rgdxjf">No models found</h3> <p class="svelte-rgdxjf">Pull a model above to get started.</p></div>'),ed=T('<div class="engine-ready svelte-rgdxjf"><!> <span>Ready for inference</span></div>'),td=T("<!> <span>Starting engine…</span>",1),nd=T("<!> <span>Load Engine</span>",1),rd=T('<button class="btn-load svelte-rgdxjf"><!></button>'),ad=T('<div class="model-card surface-card svelte-rgdxjf"><div class="card-top svelte-rgdxjf"><span><!></span> <span class="model-size svelte-rgdxjf"> </span></div> <div class="model-name svelte-rgdxjf"> </div> <div class="model-source svelte-rgdxjf"> </div> <div class="card-footer svelte-rgdxjf"><!></div></div>'),sd=T('<div class="error-banner svelte-rgdxjf" style="margin-top:1rem"><!> <span> </span></div>'),id=T('<div class="models-grid svelte-rgdxjf"></div> <!>',1),ld=T('<div class="models-view animate-fade svelte-rgdxjf"><header class="page-header svelte-rgdxjf"><div class="header-content"><h1 class="brand-font svelte-rgdxjf">Models</h1> <p class="svelte-rgdxjf">Pull GGUF models and manage the local inference engine.</p></div> <div class="stat-pill svelte-rgdxjf"><!> <span> </span></div></header> <section class="section svelte-rgdxjf"><div class="section-title svelte-rgdxjf"><!> <h2 class="svelte-rgdxjf">Pull Model</h2></div> <div class="surface-card pull-card svelte-rgdxjf"><p class="hint-text svelte-rgdxjf">Paste a HuggingFace URL (<code class="svelte-rgdxjf">/blob/</code> or <code class="svelte-rgdxjf">/resolve/</code>) or an Ollama tag.</p> <div class="input-row svelte-rgdxjf"><div class="input-wrap svelte-rgdxjf"><!> <input type="text" placeholder="https://huggingface.co/…/model.gguf" class="svelte-rgdxjf"/></div> <button class="btn-primary svelte-rgdxjf"><!></button></div> <!> <!></div></section> <section class="section svelte-rgdxjf"><div class="section-title svelte-rgdxjf"><!> <h2 class="svelte-rgdxjf">Local Models</h2></div> <!></section> <div class="footer-hint svelte-rgdxjf"><!> <span>Models are stored in <code class="svelte-rgdxjf">~/.cheesecrab/models/</code></span></div></div>');function od(e,t){ft(t,!0);let n=L(Ve([])),r=L(!0),a=L(null),i=L(null),s=L(""),l=L(null),c=L(null),d=L(!1);async function v(){try{const E=await Ba();$(n,E||[],!0)}catch{}finally{$(r,!1)}}Xt(()=>{v();const E=setInterval(v,5e3);return()=>clearInterval(E)});function p(E){const S=E.trim();return S.includes("huggingface.co")?S.replace("/blob/","/resolve/").replace("/tree/","/resolve/"):S}function f(E){return E?E<1024?`${E} B`:E<1024**2?`${(E/1024).toFixed(1)} KB`:E<1024**3?`${(E/1024**2).toFixed(1)} MB`:`${(E/1024**3).toFixed(2)} GB`:""}function w(){if(!o(s)||o(d))return;const E=p(o(s));$(c,null),$(l,{status:"connecting",completed:0,total:0},!0),$(d,!0),vc(E,{onProgress:S=>{$(l,S,!0),(S==null?void 0:S.status)==="success"?($(d,!1),setTimeout(()=>{$(l,null),v()},1500)):(S==null?void 0:S.status)==="error"&&($(c,S.error??"Download failed",!0),$(d,!1),$(l,null))},onError:S=>{$(c,S,!0),$(d,!1),$(l,null)}})}async function m(E){if(!o(a)){$(a,E,!0),$(i,null);try{await gc(E),await v()}catch(S){$(i,(S==null?void 0:S.message)??String(S),!0)}finally{$(a,null)}}}var A=ld(),b=u(A),y=g(u(b),2),O=u(y);qa(O,{size:14});var I=g(O,2),k=u(I),x=g(b,2),C=u(x),N=u(C);fs(N,{size:18});var z=g(C,2),R=g(u(z),2),H=u(R),ce=u(H);Go(ce,{size:16,class:"input-icon"});var _e=g(ce,2),$e=g(H,2),Ne=u($e);{var qe=E=>{var S=Wc(),X=j(S);gr(X,{size:16,class:"spin"}),_(E,S)},ne=E=>{var S=Kc(),X=j(S);fs(X,{size:16}),_(E,S)};J(Ne,E=>{o(d)?E(qe):E(ne,-1)})}var ge=g(R,2);{var Oe=E=>{const S=De(()=>o(l).total>0?Math.round(o(l).completed/o(l).total*100):0),X=De(()=>o(l).status==="success");var re=Jc();let we;var xe=u(re),ue=u(xe),Ue=u(ue);{var We=ke=>{var Re=Fn("✓ Download complete");_(ke,Re)},ht=ke=>{var Re=Fn("Connecting…");_(ke,Re)},nn=ke=>{var Re=Fn();Q((Nt,Ee)=>U(Re,`${Nt??""}${Ee??""}`),[()=>f(o(l).completed),()=>o(l).total>0?" / "+f(o(l).total):""]),_(ke,Re)};J(Ue,ke=>{o(X)?ke(We):o(l).status==="connecting"?ke(ht,1):ke(nn,-1)})}var _t=g(ue,2);{var Ht=ke=>{var Re=Yc(),Nt=u(Re);Q(()=>U(Nt,`${o(S)??""}%`)),_(ke,Re)};J(_t,ke=>{o(l).total>0&&ke(Ht)})}var rn=g(xe,2),Xe=u(rn);Q(()=>{we=ye(re,1,"progress-zone svelte-rgdxjf",null,we,{done:o(X)}),Fr(Xe,`width:${(o(X)?100:o(S))??""}%`)}),_(E,re)};J(ge,E=>{o(l)&&E(Oe)})}var de=g(ge,2);{var zt=E=>{var S=Zc(),X=u(S);ka(X,{size:16});var re=g(X,2),we=u(re);Q(()=>U(we,o(c))),_(E,S)};J(de,E=>{o(c)&&E(zt)})}var en=g(x,2),rt=u(en),Ge=u(rt);Ha(Ge,{size:18});var Vt=g(rt,2);{var bn=E=>{var S=Xc(),X=u(S);gr(X,{size:24,class:"spin"}),_(E,S)},Ln=E=>{var S=Qc(),X=u(S);To(X,{size:32}),_(E,S)},Rn=E=>{var S=id(),X=j(S);_n(X,21,()=>o(n),xe=>xe.id,(xe,ue)=>{const Ue=De(()=>o(ue).status.value==="loaded"),We=De(()=>o(a)===o(ue).id);var ht=ad(),nn=u(ht),_t=u(nn);let Ht;var rn=u(_t);{var Xe=ae=>{var fe=Fn("Starting…");_(ae,fe)},ke=ae=>{var fe=Fn("Active");_(ae,fe)},Re=ae=>{var fe=Fn("Standby");_(ae,fe)};J(rn,ae=>{o(We)?ae(Xe):o(Ue)?ae(ke,1):ae(Re,-1)})}var Nt=g(_t,2),Ee=u(Nt),Nr=g(nn,2),Jr=u(Nr),Sr=g(Nr,2),Zr=u(Sr),P=g(Sr,2),M=u(P);{var me=ae=>{var fe=ed(),qt=u(fe);Co(qt,{size:14}),_(ae,fe)},Ae=ae=>{var fe=rd(),qt=u(fe);{var St=Pt=>{var Bt=td(),ee=j(Bt);gr(ee,{size:14,class:"spin"}),_(Pt,Bt)},an=Pt=>{var Bt=nd(),ee=j(Bt);ec(ee,{size:14}),_(Pt,Bt)};J(qt,Pt=>{o(We)?Pt(St):Pt(an,-1)})}Q(()=>{fe.disabled=!!o(a),gn(fe,"title",o(a)&&!o(We)?"Another model is loading…":void 0)}),te("click",fe,()=>m(o(ue).id)),_(ae,fe)};J(M,ae=>{o(Ue)?ae(me):ae(Ae,-1)})}Q((ae,fe,qt)=>{Ht=ye(_t,1,"status-tag svelte-rgdxjf",null,Ht,{active:o(Ue),booting:o(We)}),U(Ee,ae),U(Jr,fe),U(Zr,qt)},[()=>f(o(ue).size),()=>o(ue).id.split("/").pop(),()=>o(ue).id.includes("/")?o(ue).id.split("/").slice(0,-1).join("/"):"Local"]),_(xe,ht)});var re=g(X,2);{var we=xe=>{var ue=sd(),Ue=u(ue);ka(Ue,{size:16});var We=g(Ue,2),ht=u(We);Q(()=>U(ht,`Engine failed to start: ${o(i)??""}`)),_(xe,ue)};J(re,xe=>{o(i)&&xe(we)})}_(E,S)};J(Vt,E=>{o(r)?E(bn):o(n).length===0?E(Ln,1):E(Rn,-1)})}var tn=g(en,2),Dn=u(tn);Lo(Dn,{size:12}),Q(()=>{U(k,`${o(n).length??""} installed`),_e.disabled=o(d),$e.disabled=o(d)||!o(s)}),te("keydown",_e,E=>E.key==="Enter"&&w()),Hr(_e,()=>o(s),E=>$(s,E)),te("click",$e,w),_(e,A),pt()}In(["keydown","click"]);var cd=T('<div class="loading-state svelte-1kslagv"><!> <span>Syncing registry…</span></div>'),dd=T('<div class="empty-state svelte-1kslagv"><!> <h3 class="svelte-1kslagv">No plugins available</h3> <p class="svelte-1kslagv">Check back later as the registry grows.</p></div>'),ud=T('<div class="plugin-card surface-card svelte-1kslagv"><div class="card-header svelte-1kslagv"><div class="plugin-identity svelte-1kslagv"><span class="plugin-name svelte-1kslagv"> </span> <span class="plugin-version svelte-1kslagv"> </span></div> <div class="plugin-icon-wrap svelte-1kslagv"><!></div></div> <p class="plugin-desc svelte-1kslagv"> </p> <div class="card-footer svelte-1kslagv"><span class="plugin-author svelte-1kslagv"> </span> <button class="btn-install svelte-1kslagv"><!></button></div></div>'),vd=T('<div class="plugin-grid svelte-1kslagv"></div>'),fd=T('<div class="plugins-view animate-fade svelte-1kslagv"><header class="page-header svelte-1kslagv"><div class="header-content"><h1 class="brand-font svelte-1kslagv">Plugins</h1> <p class="svelte-1kslagv">Extend Cheesecrab with community-built modules and integrations.</p></div> <div class="stat-pill svelte-1kslagv"><!> <span> </span></div></header> <!></div>');function pd(e,t){ft(t,!0);let n=xt(t,"onPluginInstalled",3,()=>{}),r=L(Ve([])),a=L(!0),i=L(null);Xt(()=>{const y=setTimeout(()=>{$(r,[{id:"note",name:"CrabNote",description:"Zettelkasten-style neural notes with RAG auto-linking. Perfect for research.",author:"Cheesecrab Labs",version:"1.2.0",download_url:"https://example.com/plugins/crab-note.zip"},{id:"calendar",name:"CrabCalendar",description:"AI-first scheduling. It learns your peak focus hours and manages tasks.",author:"Cheesecrab Labs",version:"0.9.5",download_url:"https://example.com/plugins/crab-calendar.zip"}],!0),$(a,!1)},400);return()=>clearTimeout(y)});async function s(y){var O,I,k;if(!o(i)){$(i,y.id,!0);try{(k=(I=(O=window.go)==null?void 0:O.main)==null?void 0:I.App)!=null&&k.InstallPlugin?(await window.go.main.App.InstallPlugin(y.download_url),n()()):await new Promise(x=>setTimeout(x,1200))}catch(x){console.error("install plugin failed:",x)}finally{$(i,null)}}}var l=fd(),c=u(l),d=g(u(c),2),v=u(d);qr(v,{size:14});var p=g(v,2),f=u(p),w=g(c,2);{var m=y=>{var O=cd(),I=u(O);gr(I,{size:22,class:"spin"}),_(y,O)},A=y=>{var O=dd(),I=u(O);qo(I,{size:36}),_(y,O)},b=y=>{var O=vd();_n(O,21,()=>o(r),I=>I.id,(I,k)=>{var x=ud(),C=u(x),N=u(C),z=u(N),R=u(z),H=g(z,2),ce=u(H),_e=g(N,2),$e=u(_e);qr($e,{size:20});var Ne=g(C,2),qe=u(Ne),ne=g(Ne,2),ge=u(ne),Oe=u(ge),de=g(ge,2),zt=u(de);{var en=Ge=>{gr(Ge,{size:14,class:"spin"})},rt=Ge=>{Po(Ge,{size:14})};J(zt,Ge=>{o(i)===o(k).id?Ge(en):Ge(rt,-1)})}Q(()=>{U(R,o(k).name),U(ce,`v${o(k).version??""}`),U(qe,o(k).description),U(Oe,`by ${o(k).author??""}`),de.disabled=!!o(i),gn(de,"title",o(i)===o(k).id?"Installing…":"Install"),gn(de,"aria-label",`Install ${o(k).name??""}`)}),te("click",de,()=>s(o(k))),_(I,x)}),_(y,O)};J(w,y=>{o(a)?y(m):o(r).length===0?y(A,1):y(b,-1)})}Q(()=>U(f,`${o(r).length??""} available`)),_(e,l),pt()}In(["click"]);var hd=T('<div class="view-container svelte-15jzpb1"><div id="luckysheet" class="svelte-15jzpb1"></div></div>');function _d(e,t){ft(t,!1),ir(()=>{const r=s=>new Promise((l,c)=>{const d=document.createElement("script");d.src=s,d.onload=l,d.onerror=c,document.head.appendChild(d)}),a=s=>{const l=document.createElement("link");l.rel="stylesheet",l.href=s,document.head.appendChild(l)},i="/crabtable/";a(i+"plugins/css/pluginsCss.css"),a(i+"plugins/plugins.css"),a(i+"css/luckysheet.css"),a(i+"assets/iconfont/iconfont.css"),(async()=>{try{await r(i+"plugins/js/plugin.js"),await r(i+"luckysheet.umd.js"),window.luckysheet.create({container:"luckysheet",title:"Crab Table",lang:"en",data:[{name:"Sheet1",color:"",status:"1",order:"0",data:[],config:{},index:0}]}),window.addEventListener("crabtable-external-req",s=>{const{tc:l,sessionId:c}=s.detail,{action:d,range:v,values:p,description:f}=l.args;let w="";try{switch(d){case"get_data":w=JSON.stringify(window.luckysheet.getluckysheetfile());break;case"set_data":window.luckysheet.setRangeValue(p,{range:v}),w="OK: Applied data to "+(v||"active range");break;case"clear":window.luckysheet.setRangeValue([],{range:"A1:Z100"}),w="OK: Cleared sheet";break;case"create_table":p&&p.length>0?(window.luckysheet.setRangeValue(p,{range:v||"A1"}),w="OK: Created table: "+(f||"untitled")):w="Error: Missing values for create_table";break;default:w="Error: Unknown action "+d}}catch(m){w="Error: "+m.message}window.dispatchEvent(new CustomEvent("crabtable-external-res",{detail:{sessionId:c,result:w}}))})}catch(s){console.error("Failed to load Luckysheet:",s)}})()}),yi();var n=hd();_(e,n),pt()}var gd=T('<span class="file-badge svelte-16dblip"> </span>'),md=T('<button class="btn-icon svelte-16dblip" title="Close Document"><!></button>'),bd=T('<div class="loading-state svelte-16dblip"><!> <p class="svelte-16dblip">Opening document...</p></div>'),yd=T('<div class="error-state svelte-16dblip"><!> <h3 class="svelte-16dblip">Error</h3> <p class="svelte-16dblip"> </p> <button class="btn-secondary svelte-16dblip">Clear Error</button></div>'),$d=T('<div class="rendering-placeholder svelte-16dblip"><div class="doc-icon svelte-16dblip"><!></div> <h3 class="svelte-16dblip"> </h3> <p class="svelte-16dblip">LOKit Tile Rendering Coming Soon...</p> <div class="hint svelte-16dblip">The backend handles are active, but tile visualization is being implemented.</div></div>'),wd=T('<div class="welcome-screen svelte-16dblip"><div class="hero-icon svelte-16dblip"><!></div> <h3 class="svelte-16dblip">Welcome to Cheese Office</h3> <p class="svelte-16dblip">The integrated LibreOffice experience within Cheesecrab.</p> <div class="actions svelte-16dblip"><button class="btn-primary svelte-16dblip">Open Document</button></div></div>'),xd=T('<div class="office-container svelte-16dblip"><div class="header svelte-16dblip"><div class="title-group svelte-16dblip"><!> <h2 class="svelte-16dblip">Cheese Office</h2> <!></div> <!></div> <div class="content card shadow-lg svelte-16dblip"><!></div></div>');function kd(e,t){ft(t,!0);let n=L(""),r=L(!1),a=L("");async function i(){$(a,""),$(r,!0);try{const x=await mc();x&&$(n,x,!0)}catch(x){$(a,x.message||"Failed to open document",!0),console.error(x)}finally{$(r,!1)}}async function s(){await bc(),$(n,"")}var l=xd(),c=u(l),d=u(c),v=u(d);Rr(v,{size:20});var p=g(v,4);{var f=x=>{var C=gd(),N=u(C);Q(()=>U(N,o(n))),_(x,C)};J(p,x=>{o(n)&&x(f)})}var w=g(d,2);{var m=x=>{var C=md(),N=u(C);xi(N,{size:20}),te("click",C,s),_(x,C)};J(w,x=>{o(n)&&x(m)})}var A=g(c,2),b=u(A);{var y=x=>{var C=bd(),N=u(C);Do(N,{class:"spinner",size:48}),_(x,C)},O=x=>{var C=yd(),N=u(C);ka(N,{size:48,color:"var(--error)"});var z=g(N,4),R=u(z),H=g(z,2);Q(()=>U(R,o(a))),te("click",H,()=>$(a,"")),_(x,C)},I=x=>{var C=$d(),N=u(C),z=u(N);Rr(z,{size:80,color:"var(--accent-primary)"});var R=g(N,2),H=u(R);Q(()=>U(H,o(n))),_(x,C)},k=x=>{var C=wd(),N=u(C),z=u(N);Rr(z,{size:64,color:"var(--accent-primary)"});var R=g(N,6),H=u(R);te("click",H,i),_(x,C)};J(b,x=>{o(r)?x(y):o(a)?x(O,1):o(n)?x(I,2):x(k,-1)})}_(e,l),pt()}In(["click"]);var Ed=T('<div class="loading svelte-3zvtg1"><span class="spinner svelte-3zvtg1">🦀</span> <p>Nibbling plugin files...</p></div>'),Ad=T('<div class="plugin-host svelte-3zvtg1"><!></div>');function Md(e,t){ft(t,!0);let n=L(null),r=L(!1),a=L(null);ir(()=>{i()}),ko(()=>{l()});async function i(){const p=`script-plugin-${t.manifest.id}`;if(document.getElementById(p))$(r,!0),s();else{const f=document.createElement("script");f.id=p,f.type="module",f.src=`plugin://${t.manifest.id}/${t.manifest.main_js}`,f.onload=()=>{$(r,!0),s()},f.onerror=w=>{console.error(`Failed to load plugin script: ${t.manifest.id}`,w)},document.body.appendChild(f)}}function s(){if(!(!o(r)||!o(n))){o(n).innerHTML="";try{const p=document.createElement(t.manifest.entry_element);o(n).appendChild(p),$(a,p,!0),console.log(`Plugin mounted: ${t.manifest.id}`)}catch(p){console.error(`Failed to mount plugin component: ${t.manifest.entry_element}`,p)}}}function l(){o(a)&&o(a).parentNode&&o(a).parentNode.removeChild(o(a))}Xt(()=>{o(n)&&o(r)&&!o(a)&&s()});var c=Ad(),d=u(c);{var v=p=>{var f=Ed();_(p,f)};J(d,p=>{o(r)||p(v)})}Va(c,p=>$(n,p),()=>o(n)),_(e,c),pt()}var zd=T('<div class="view-wrapper active svelte-1n46o8q"><!></div>'),Nd=T('<main class="layout svelte-1n46o8q"><!> <div class="content-wrapper svelte-1n46o8q"><div class="main-content svelte-1n46o8q"><div><!></div> <div><!></div> <div><!></div> <div><!></div> <div><!></div> <div><!></div> <!></div> <!></div></main>');function Sd(e,t){ft(t,!0);let n=L("chat"),r=L(Ve([])),a=L("dark");ir(()=>{const ne=localStorage.getItem("cheesecrab-theme")||"dark";$(a,ne,!0),document.documentElement.setAttribute("data-theme",o(a))});function i(){$(a,o(a)==="dark"?"light":"dark",!0),document.documentElement.setAttribute("data-theme",o(a)),localStorage.setItem("cheesecrab-theme",o(a))}Xt(()=>{window.go&&window.go.main&&window.go.main.App&&window.go.main.App.GetInstalledPlugins().then(ne=>{$(r,ne||[],!0)})});const s=De(()=>o(r).find(ne=>ne.id===o(n)));var l=Nd(),c=u(l);lc(c,{get installedPlugins(){return o(r)},get theme(){return o(a)},onToggleTheme:i,get activeView(){return o(n)},set activeView(ne){$(n,ne,!0)}});var d=g(c,2),v=u(d),p=u(v);let f;var w=u(p);Ec(w,{});var m=g(p,2);let A;var b=u(m);Uc(b,{});var y=g(m,2);let O;var I=u(y);od(I,{});var k=g(y,2);let x;var C=u(k);pd(C,{onPluginInstalled:()=>{var ne,ge,Oe;(Oe=(ge=(ne=window.go)==null?void 0:ne.main)==null?void 0:ge.App)==null||Oe.GetInstalledPlugins().then(de=>{$(r,de||[],!0)})}});var N=g(k,2);let z;var R=u(N);_d(R,{});var H=g(N,2);let ce;var _e=u(H);kd(_e,{});var $e=g(H,2);{var Ne=ne=>{var ge=zd(),Oe=u(ge);Md(Oe,{get manifest(){return o(s)}}),_(ne,ge)};J($e,ne=>{o(s)&&ne(Ne)})}var qe=g(v,2);cc(qe,{}),Q(()=>{gn(l,"data-theme",o(a)),f=ye(p,1,"view-wrapper svelte-1n46o8q",null,f,{active:o(n)==="chat"}),A=ye(m,1,"view-wrapper svelte-1n46o8q",null,A,{active:o(n)==="agent"}),O=ye(y,1,"view-wrapper svelte-1n46o8q",null,O,{active:o(n)==="models"}),x=ye(k,1,"view-wrapper svelte-1n46o8q",null,x,{active:o(n)==="plugins"}),z=ye(N,1,"view-wrapper svelte-1n46o8q",null,z,{active:o(n)==="crabtable"}),ce=ye(H,1,"view-wrapper svelte-1n46o8q",null,ce,{active:o(n)==="office"})}),_(e,l),pt()}ro(Sd,{target:document.getElementById("app")});

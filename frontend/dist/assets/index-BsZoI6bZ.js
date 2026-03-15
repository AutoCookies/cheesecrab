var ki=Object.defineProperty;var qa=e=>{throw TypeError(e)};var Ei=(e,t,n)=>t in e?ki(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var gt=(e,t,n)=>Ei(e,typeof t!="symbol"?t+"":t,n),Zr=(e,t,n)=>t.has(e)||qa("Cannot "+n);var h=(e,t,n)=>(Zr(e,t,"read from private field"),n?n.call(e):t.get(e)),J=(e,t,n)=>t.has(e)?qa("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),G=(e,t,n,r)=>(Zr(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n),ye=(e,t,n)=>(Zr(e,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Ai=!1;var ka=Array.isArray,Mi=Array.prototype.indexOf,Yn=Array.prototype.includes,Ur=Array.from,Ni=Object.defineProperty,dn=Object.getOwnPropertyDescriptor,ys=Object.getOwnPropertyDescriptors,Si=Object.prototype,zi=Array.prototype,Ea=Object.getPrototypeOf,Ba=Object.isExtensible;function lr(e){return typeof e=="function"}const Pi=()=>{};function Ti(e){return e()}function sa(e){for(var t=0;t<e.length;t++)e[t]()}function bs(){var e,t,n=new Promise((r,a)=>{e=r,t=a});return{promise:n,resolve:e,reject:t}}function Ci(e,t){if(Array.isArray(e))return e;if(!(Symbol.iterator in e))return Array.from(e);const n=[];for(const r of e)if(n.push(r),n.length===t)break;return n}const Te=2,Jn=4,wr=8,Aa=1<<24,mn=16,xt=32,Pn=64,ia=128,ot=512,Ee=1024,Ie=2048,kt=4096,tt=8192,ct=16384,On=32768,la=1<<25,vn=65536,Ga=1<<17,Oi=1<<18,nr=1<<19,$s=1<<20,Rt=1<<25,Tn=65536,oa=1<<21,Ma=1<<22,un=1<<23,Dt=Symbol("$state"),ws=Symbol("legacy props"),Ii=Symbol(""),Wt=new class extends Error{constructor(){super(...arguments);gt(this,"name","StaleReactionError");gt(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var _s;const xs=!!((_s=globalThis.document)!=null&&_s.contentType)&&globalThis.document.contentType.includes("xml");function ks(e){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function ji(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function Li(e,t,n){throw new Error("https://svelte.dev/e/each_key_duplicate")}function Ri(e){throw new Error("https://svelte.dev/e/effect_in_teardown")}function Di(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function Fi(e){throw new Error("https://svelte.dev/e/effect_orphan")}function Vi(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Hi(e){throw new Error("https://svelte.dev/e/props_invalid_value")}function qi(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Bi(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function Gi(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function Ui(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}const Wi=1,Ki=2,Es=4,Yi=8,Ji=16,Zi=1,Xi=2,As=4,Qi=8,el=16,tl=1,nl=2,Pe=Symbol(),Ms="http://www.w3.org/1999/xhtml",rl="http://www.w3.org/2000/svg",al="@attach";function sl(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function il(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function Ns(e){return e===this.v}function ll(e,t){return e!=e?t==t:e!==t||e!==null&&typeof e=="object"||typeof e=="function"}function Ss(e){return!ll(e,this.v)}let rr=!1,ol=!1;function cl(){rr=!0}let ue=null;function Zn(e){ue=e}function Et(e,t=!1,n){ue={p:ue,i:!1,c:null,e:null,s:e,x:null,r:W,l:rr&&!t?{s:null,u:null,$:[]}:null}}function At(e){var t=ue,n=t.e;if(n!==null){t.e=null;for(var r of n)Xs(r)}return t.i=!0,ue=t.p,{}}function xr(){return!rr||ue!==null&&ue.l===null}let xn=[];function zs(){var e=xn;xn=[],sa(e)}function Zt(e){if(xn.length===0&&!vr){var t=xn;queueMicrotask(()=>{t===xn&&zs()})}xn.push(e)}function dl(){for(;xn.length>0;)zs()}function Ps(e){var t=W;if(t===null)return U.f|=un,e;if(!(t.f&On)&&!(t.f&Jn))throw e;cn(e,t)}function cn(e,t){for(;t!==null;){if(t.f&ia){if(!(t.f&On))throw e;try{t.b.error(e);return}catch(n){e=n}}t=t.parent}throw e}const ul=-7169;function he(e,t){e.f=e.f&ul|t}function Na(e){e.f&ot||e.deps===null?he(e,Ee):he(e,kt)}function Ts(e){if(e!==null)for(const t of e)!(t.f&Te)||!(t.f&Tn)||(t.f^=Tn,Ts(t.deps))}function Cs(e,t,n){e.f&Ie?t.add(e):e.f&kt&&n.add(e),Ts(e.deps),he(e,Ee)}let Pr=!1;function fl(e){var t=Pr;try{return Pr=!1,[e(),Pr]}finally{Pr=t}}const or=new Set;let B=null,Re=null,ca=null,vr=!1,Xr=!1,Dn=null,Cr=null;var Ua=0;let vl=1;var Fn,Vn,Hn,qn,yr,it,Bn,ln,Kt,Gn,Fe,da,ua,fa,va,Os;const qr=class qr{constructor(){J(this,Fe);gt(this,"id",vl++);gt(this,"current",new Map);gt(this,"previous",new Map);J(this,Fn,new Set);J(this,Vn,new Set);J(this,Hn,0);J(this,qn,0);J(this,yr,null);J(this,it,[]);J(this,Bn,new Set);J(this,ln,new Set);J(this,Kt,new Map);gt(this,"is_fork",!1);J(this,Gn,!1)}skip_effect(t){h(this,Kt).has(t)||h(this,Kt).set(t,{d:[],m:[]})}unskip_effect(t){var n=h(this,Kt).get(t);if(n){h(this,Kt).delete(t);for(var r of n.d)he(r,Ie),this.schedule(r);for(r of n.m)he(r,kt),this.schedule(r)}}capture(t,n){n!==Pe&&!this.previous.has(t)&&this.previous.set(t,n),t.f&un||(this.current.set(t,t.v),Re==null||Re.set(t,t.v))}activate(){B=this}deactivate(){B=null,Re=null}flush(){try{if(Xr=!0,B=this,!ye(this,Fe,da).call(this)){for(const t of h(this,Bn))h(this,ln).delete(t),he(t,Ie),this.schedule(t);for(const t of h(this,ln))he(t,kt),this.schedule(t)}ye(this,Fe,ua).call(this)}finally{Ua=0,ca=null,Dn=null,Cr=null,Xr=!1,B=null,Re=null,fn.clear()}}discard(){for(const t of h(this,Vn))t(this);h(this,Vn).clear()}increment(t){G(this,Hn,h(this,Hn)+1),t&&G(this,qn,h(this,qn)+1)}decrement(t,n){G(this,Hn,h(this,Hn)-1),t&&G(this,qn,h(this,qn)-1),!(h(this,Gn)||n)&&(G(this,Gn,!0),Zt(()=>{G(this,Gn,!1),this.flush()}))}oncommit(t){h(this,Fn).add(t)}ondiscard(t){h(this,Vn).add(t)}settled(){return(h(this,yr)??G(this,yr,bs())).promise}static ensure(){if(B===null){const t=B=new qr;Xr||(or.add(B),vr||Zt(()=>{B===t&&t.flush()}))}return B}apply(){{Re=null;return}}schedule(t){var a;if(ca=t,(a=t.b)!=null&&a.is_pending&&t.f&(Jn|wr|Aa)&&!(t.f&On)){t.b.defer_effect(t);return}for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(Dn!==null&&n===W&&(U===null||!(U.f&Te)))return;if(r&(Pn|xt)){if(!(r&Ee))return;n.f^=Ee}}h(this,it).push(n)}};Fn=new WeakMap,Vn=new WeakMap,Hn=new WeakMap,qn=new WeakMap,yr=new WeakMap,it=new WeakMap,Bn=new WeakMap,ln=new WeakMap,Kt=new WeakMap,Gn=new WeakMap,Fe=new WeakSet,da=function(){return this.is_fork||h(this,qn)>0},ua=function(){var l,c;Ua++>1e3&&hl();const t=h(this,it);G(this,it,[]),this.apply();var n=Dn=[],r=[],a=Cr=[];for(const d of t)try{ye(this,Fe,fa).call(this,d,n,r)}catch(f){throw Rs(d),f}if(B=null,a.length>0){var i=qr.ensure();for(const d of a)i.schedule(d)}if(Dn=null,Cr=null,ye(this,Fe,da).call(this)){ye(this,Fe,va).call(this,r),ye(this,Fe,va).call(this,n);for(const[d,f]of h(this,Kt))Ls(d,f)}else{h(this,Hn)===0&&or.delete(this),h(this,Bn).clear(),h(this,ln).clear();for(const d of h(this,Fn))d(this);h(this,Fn).clear(),Wa(r),Wa(n),(l=h(this,yr))==null||l.resolve()}var s=B;if(h(this,it).length>0){const d=s??(s=this);h(d,it).push(...h(this,it).filter(f=>!h(d,it).includes(f)))}s!==null&&(or.add(s),ye(c=s,Fe,ua).call(c)),or.has(this)||ye(this,Fe,Os).call(this)},fa=function(t,n,r){t.f^=Ee;for(var a=t.first;a!==null;){var i=a.f,s=(i&(xt|Pn))!==0,l=s&&(i&Ee)!==0,c=l||(i&tt)!==0||h(this,Kt).has(a);if(!c&&a.fn!==null){s?a.f^=Ee:i&Jn?n.push(a):Mr(a)&&(i&mn&&h(this,ln).add(a),er(a));var d=a.first;if(d!==null){a=d;continue}}for(;a!==null;){var f=a.next;if(f!==null){a=f;break}a=a.parent}}},va=function(t){for(var n=0;n<t.length;n+=1)Cs(t[n],h(this,Bn),h(this,ln))},Os=function(){var c;for(const d of or){var t=d.id<this.id,n=[];for(const[f,p]of this.current){if(d.current.has(f))if(t&&p!==d.current.get(f))d.current.set(f,p);else continue;n.push(f)}if(n.length!==0){var r=[...d.current.keys()].filter(f=>!this.current.has(f));if(r.length>0){d.activate();var a=new Set,i=new Map;for(var s of n)Is(s,r,a,i);if(h(d,it).length>0){d.apply();for(var l of h(d,it))ye(c=d,Fe,fa).call(c,l,[],[])}d.deactivate()}}}};let Cn=qr;function pl(e){var t=vr;vr=!0;try{for(var n;;){if(dl(),B===null)return n;B.flush()}}finally{vr=t}}function hl(){try{Vi()}catch(e){cn(e,ca)}}let mt=null;function Wa(e){var t=e.length;if(t!==0){for(var n=0;n<t;){var r=e[n++];if(!(r.f&(ct|tt))&&Mr(r)&&(mt=new Set,er(r),r.deps===null&&r.first===null&&r.nodes===null&&r.teardown===null&&r.ac===null&&ti(r),(mt==null?void 0:mt.size)>0)){fn.clear();for(const a of mt){if(a.f&(ct|tt))continue;const i=[a];let s=a.parent;for(;s!==null;)mt.has(s)&&(mt.delete(s),i.push(s)),s=s.parent;for(let l=i.length-1;l>=0;l--){const c=i[l];c.f&(ct|tt)||er(c)}}mt.clear()}}mt=null}}function Is(e,t,n,r){if(!n.has(e)&&(n.add(e),e.reactions!==null))for(const a of e.reactions){const i=a.f;i&Te?Is(a,t,n,r):i&(Ma|mn)&&!(i&Ie)&&js(a,t,r)&&(he(a,Ie),Sa(a))}}function js(e,t,n){const r=n.get(e);if(r!==void 0)return r;if(e.deps!==null)for(const a of e.deps){if(Yn.call(t,a))return!0;if(a.f&Te&&js(a,t,n))return n.set(a,!0),!0}return n.set(e,!1),!1}function Sa(e){B.schedule(e)}function Ls(e,t){if(!(e.f&xt&&e.f&Ee)){e.f&Ie?t.d.push(e):e.f&kt&&t.m.push(e),he(e,Ee);for(var n=e.first;n!==null;)Ls(n,t),n=n.next}}function Rs(e){he(e,Ee);for(var t=e.first;t!==null;)Rs(t),t=t.next}function _l(e){let t=0,n=pn(0),r;return()=>{Ta()&&(o(n),Oa(()=>(t===0&&(r=Qt(()=>e(()=>pr(n)))),t+=1,()=>{Zt(()=>{t-=1,t===0&&(r==null||r(),r=void 0,pr(n))})})))}}var gl=vn|nr;function ml(e,t,n,r){new yl(e,t,n,r)}var lt,xa,It,An,Ke,jt,Qe,yt,Yt,Mn,on,Un,Wn,Kn,Jt,Br,Me,bl,$l,wl,pa,Or,Ir,ha;class yl{constructor(t,n,r,a){J(this,Me);gt(this,"parent");gt(this,"is_pending",!1);gt(this,"transform_error");J(this,lt);J(this,xa,null);J(this,It);J(this,An);J(this,Ke);J(this,jt,null);J(this,Qe,null);J(this,yt,null);J(this,Yt,null);J(this,Mn,0);J(this,on,0);J(this,Un,!1);J(this,Wn,new Set);J(this,Kn,new Set);J(this,Jt,null);J(this,Br,_l(()=>(G(this,Jt,pn(h(this,Mn))),()=>{G(this,Jt,null)})));var i;G(this,lt,t),G(this,It,n),G(this,An,s=>{var l=W;l.b=this,l.f|=ia,r(s)}),this.parent=W.b,this.transform_error=a??((i=this.parent)==null?void 0:i.transform_error)??(s=>s),G(this,Ke,Ar(()=>{ye(this,Me,pa).call(this)},gl))}defer_effect(t){Cs(t,h(this,Wn),h(this,Kn))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!h(this,It).pending}update_pending_count(t,n){ye(this,Me,ha).call(this,t,n),G(this,Mn,h(this,Mn)+t),!(!h(this,Jt)||h(this,Un))&&(G(this,Un,!0),Zt(()=>{G(this,Un,!1),h(this,Jt)&&Xn(h(this,Jt),h(this,Mn))}))}get_effect_pending(){return h(this,Br).call(this),o(h(this,Jt))}error(t){var n=h(this,It).onerror;let r=h(this,It).failed;if(!n&&!r)throw t;h(this,jt)&&(Oe(h(this,jt)),G(this,jt,null)),h(this,Qe)&&(Oe(h(this,Qe)),G(this,Qe,null)),h(this,yt)&&(Oe(h(this,yt)),G(this,yt,null));var a=!1,i=!1;const s=()=>{if(a){il();return}a=!0,i&&Ui(),h(this,yt)!==null&&Sn(h(this,yt),()=>{G(this,yt,null)}),ye(this,Me,Ir).call(this,()=>{ye(this,Me,pa).call(this)})},l=c=>{try{i=!0,n==null||n(c,s),i=!1}catch(d){cn(d,h(this,Ke)&&h(this,Ke).parent)}r&&G(this,yt,ye(this,Me,Ir).call(this,()=>{try{return Je(()=>{var d=W;d.b=this,d.f|=ia,r(h(this,lt),()=>c,()=>s)})}catch(d){return cn(d,h(this,Ke).parent),null}}))};Zt(()=>{var c;try{c=this.transform_error(t)}catch(d){cn(d,h(this,Ke)&&h(this,Ke).parent);return}c!==null&&typeof c=="object"&&typeof c.then=="function"?c.then(l,d=>cn(d,h(this,Ke)&&h(this,Ke).parent)):l(c)})}}lt=new WeakMap,xa=new WeakMap,It=new WeakMap,An=new WeakMap,Ke=new WeakMap,jt=new WeakMap,Qe=new WeakMap,yt=new WeakMap,Yt=new WeakMap,Mn=new WeakMap,on=new WeakMap,Un=new WeakMap,Wn=new WeakMap,Kn=new WeakMap,Jt=new WeakMap,Br=new WeakMap,Me=new WeakSet,bl=function(){try{G(this,jt,Je(()=>h(this,An).call(this,h(this,lt))))}catch(t){this.error(t)}},$l=function(t){const n=h(this,It).failed;n&&G(this,yt,Je(()=>{n(h(this,lt),()=>t,()=>()=>{})}))},wl=function(){const t=h(this,It).pending;t&&(this.is_pending=!0,G(this,Qe,Je(()=>t(h(this,lt)))),Zt(()=>{var n=G(this,Yt,document.createDocumentFragment()),r=Ft();n.append(r),G(this,jt,ye(this,Me,Ir).call(this,()=>Je(()=>h(this,An).call(this,r)))),h(this,on)===0&&(h(this,lt).before(n),G(this,Yt,null),Sn(h(this,Qe),()=>{G(this,Qe,null)}),ye(this,Me,Or).call(this,B))}))},pa=function(){try{if(this.is_pending=this.has_pending_snippet(),G(this,on,0),G(this,Mn,0),G(this,jt,Je(()=>{h(this,An).call(this,h(this,lt))})),h(this,on)>0){var t=G(this,Yt,document.createDocumentFragment());La(h(this,jt),t);const n=h(this,It).pending;G(this,Qe,Je(()=>n(h(this,lt))))}else ye(this,Me,Or).call(this,B)}catch(n){this.error(n)}},Or=function(t){this.is_pending=!1;for(const n of h(this,Wn))he(n,Ie),t.schedule(n);for(const n of h(this,Kn))he(n,kt),t.schedule(n);h(this,Wn).clear(),h(this,Kn).clear()},Ir=function(t){var n=W,r=U,a=ue;ft(h(this,Ke)),ut(h(this,Ke)),Zn(h(this,Ke).ctx);try{return Cn.ensure(),t()}catch(i){return Ps(i),null}finally{ft(n),ut(r),Zn(a)}},ha=function(t,n){var r;if(!this.has_pending_snippet()){this.parent&&ye(r=this.parent,Me,ha).call(r,t,n);return}G(this,on,h(this,on)+t),h(this,on)===0&&(ye(this,Me,Or).call(this,n),h(this,Qe)&&Sn(h(this,Qe),()=>{G(this,Qe,null)}),h(this,Yt)&&(h(this,lt).before(h(this,Yt)),G(this,Yt,null)))};function Ds(e,t,n,r){const a=xr()?kr:za;var i=e.filter(v=>!v.settled);if(n.length===0&&i.length===0){r(t.map(a));return}var s=W,l=xl(),c=i.length===1?i[0].promise:i.length>1?Promise.all(i.map(v=>v.promise)):null;function d(v){l();try{r(v)}catch(w){s.f&ct||cn(w,s)}Rr()}if(n.length===0){c.then(()=>d(t.map(a)));return}var f=Fs();function p(){Promise.all(n.map(v=>kl(v))).then(v=>d([...t.map(a),...v])).catch(v=>cn(v,s)).finally(()=>f())}c?c.then(()=>{l(),p(),Rr()}):p()}function xl(){var e=W,t=U,n=ue,r=B;return function(i=!0){ft(e),ut(t),Zn(n),i&&!(e.f&ct)&&(r==null||r.activate(),r==null||r.apply())}}function Rr(e=!0){ft(null),ut(null),Zn(null),e&&(B==null||B.deactivate())}function Fs(){var e=W.b,t=B,n=e.is_rendered();return e.update_pending_count(1,t),t.increment(n),(r=!1)=>{e.update_pending_count(-1,t),t.decrement(n,r)}}function kr(e){var t=Te|Ie,n=U!==null&&U.f&Te?U:null;return W!==null&&(W.f|=nr),{ctx:ue,deps:null,effects:null,equals:Ns,f:t,fn:e,reactions:null,rv:0,v:Pe,wv:0,parent:n??W,ac:null}}function kl(e,t,n){let r=W;r===null&&ji();var a=void 0,i=pn(Pe),s=!U,l=new Map;return Rl(()=>{var w;var c=W,d=bs();a=d.promise;try{Promise.resolve(e()).then(d.resolve,d.reject).finally(Rr)}catch(g){d.reject(g),Rr()}var f=B;if(s){if(c.f&On)var p=Fs();if(r.b.is_rendered())(w=l.get(f))==null||w.reject(Wt),l.delete(f);else{for(const g of l.values())g.reject(Wt);l.clear()}l.set(f,d)}const v=(g,A=void 0)=>{if(p){var m=A===Wt;p(m)}if(!(A===Wt||c.f&ct)){if(f.activate(),A)i.f|=un,Xn(i,A);else{i.f&un&&(i.f^=un),Xn(i,g);for(const[y,P]of l){if(l.delete(y),y===f)break;P.reject(Wt)}}f.deactivate()}};d.promise.then(v,g=>v(null,g||"unknown"))}),Ca(()=>{for(const c of l.values())c.reject(Wt)}),new Promise(c=>{function d(f){function p(){f===a?c(i):d(a)}f.then(p,p)}d(a)})}function Le(e){const t=kr(e);return ai(t),t}function za(e){const t=kr(e);return t.equals=Ss,t}function El(e){var t=e.effects;if(t!==null){e.effects=null;for(var n=0;n<t.length;n+=1)Oe(t[n])}}function Al(e){for(var t=e.parent;t!==null;){if(!(t.f&Te))return t.f&ct?null:t;t=t.parent}return null}function Pa(e){var t,n=W;ft(Al(e));try{e.f&=~Tn,El(e),t=oi(e)}finally{ft(n)}return t}function Vs(e){var t=Pa(e);if(!e.equals(t)&&(e.wv=ii(),(!(B!=null&&B.is_fork)||e.deps===null)&&(e.v=t,e.deps===null))){he(e,Ee);return}hn||(Re!==null?(Ta()||B!=null&&B.is_fork)&&Re.set(e,t):Na(e))}function Ml(e){var t,n;if(e.effects!==null)for(const r of e.effects)(r.teardown||r.ac)&&((t=r.teardown)==null||t.call(r),(n=r.ac)==null||n.abort(Wt),r.teardown=Pi,r.ac=null,gr(r,0),Ia(r))}function Hs(e){if(e.effects!==null)for(const t of e.effects)t.teardown&&er(t)}let _a=new Set;const fn=new Map;let qs=!1;function pn(e,t){var n={f:0,v:e,reactions:null,equals:Ns,rv:0,wv:0};return n}function j(e,t){const n=pn(e);return ai(n),n}function Nl(e,t=!1,n=!0){var a;const r=pn(e);return t||(r.equals=Ss),rr&&n&&ue!==null&&ue.l!==null&&((a=ue.l).s??(a.s=[])).push(r),r}function $(e,t,n=!1){U!==null&&(!wt||U.f&Ga)&&xr()&&U.f&(Te|mn|Ma|Ga)&&(dt===null||!Yn.call(dt,e))&&Gi();let r=n?De(t):t;return Xn(e,r,Cr)}function Xn(e,t,n=null){if(!e.equals(t)){var r=e.v;hn?fn.set(e,t):fn.set(e,r),e.v=t;var a=Cn.ensure();if(a.capture(e,r),e.f&Te){const i=e;e.f&Ie&&Pa(i),Na(i)}e.wv=ii(),Bs(e,Ie,n),xr()&&W!==null&&W.f&Ee&&!(W.f&(xt|Pn))&&(st===null?Vl([e]):st.push(e)),!a.is_fork&&_a.size>0&&!qs&&Sl()}return t}function Sl(){qs=!1;for(const e of _a)e.f&Ee&&he(e,kt),Mr(e)&&er(e);_a.clear()}function Ka(e,t=1){var n=o(e),r=t===1?n++:n--;return $(e,n),r}function pr(e){$(e,e.v+1)}function Bs(e,t,n){var r=e.reactions;if(r!==null)for(var a=xr(),i=r.length,s=0;s<i;s++){var l=r[s],c=l.f;if(!(!a&&l===W)){var d=(c&Ie)===0;if(d&&he(l,t),c&Te){var f=l;Re==null||Re.delete(f),c&Tn||(c&ot&&(l.f|=Tn),Bs(f,kt,n))}else if(d){var p=l;c&mn&&mt!==null&&mt.add(p),n!==null?n.push(p):Sa(p)}}}}function De(e){if(typeof e!="object"||e===null||Dt in e)return e;const t=Ea(e);if(t!==Si&&t!==zi)return e;var n=new Map,r=ka(e),a=j(0),i=zn,s=l=>{if(zn===i)return l();var c=U,d=zn;ut(null),Qa(i);var f=l();return ut(c),Qa(d),f};return r&&n.set("length",j(e.length)),new Proxy(e,{defineProperty(l,c,d){(!("value"in d)||d.configurable===!1||d.enumerable===!1||d.writable===!1)&&qi();var f=n.get(c);return f===void 0?s(()=>{var p=j(d.value);return n.set(c,p),p}):$(f,d.value,!0),!0},deleteProperty(l,c){var d=n.get(c);if(d===void 0){if(c in l){const f=s(()=>j(Pe));n.set(c,f),pr(a)}}else $(d,Pe),pr(a);return!0},get(l,c,d){var w;if(c===Dt)return e;var f=n.get(c),p=c in l;if(f===void 0&&(!p||(w=dn(l,c))!=null&&w.writable)&&(f=s(()=>{var g=De(p?l[c]:Pe),A=j(g);return A}),n.set(c,f)),f!==void 0){var v=o(f);return v===Pe?void 0:v}return Reflect.get(l,c,d)},getOwnPropertyDescriptor(l,c){var d=Reflect.getOwnPropertyDescriptor(l,c);if(d&&"value"in d){var f=n.get(c);f&&(d.value=o(f))}else if(d===void 0){var p=n.get(c),v=p==null?void 0:p.v;if(p!==void 0&&v!==Pe)return{enumerable:!0,configurable:!0,value:v,writable:!0}}return d},has(l,c){var v;if(c===Dt)return!0;var d=n.get(c),f=d!==void 0&&d.v!==Pe||Reflect.has(l,c);if(d!==void 0||W!==null&&(!f||(v=dn(l,c))!=null&&v.writable)){d===void 0&&(d=s(()=>{var w=f?De(l[c]):Pe,g=j(w);return g}),n.set(c,d));var p=o(d);if(p===Pe)return!1}return f},set(l,c,d,f){var C;var p=n.get(c),v=c in l;if(r&&c==="length")for(var w=d;w<p.v;w+=1){var g=n.get(w+"");g!==void 0?$(g,Pe):w in l&&(g=s(()=>j(Pe)),n.set(w+"",g))}if(p===void 0)(!v||(C=dn(l,c))!=null&&C.writable)&&(p=s(()=>j(void 0)),$(p,De(d)),n.set(c,p));else{v=p.v!==Pe;var A=s(()=>De(d));$(p,A)}var m=Reflect.getOwnPropertyDescriptor(l,c);if(m!=null&&m.set&&m.set.call(f,d),!v){if(r&&typeof c=="string"){var y=n.get("length"),P=Number(c);Number.isInteger(P)&&P>=y.v&&$(y,P+1)}pr(a)}return!0},ownKeys(l){o(a);var c=Reflect.ownKeys(l).filter(p=>{var v=n.get(p);return v===void 0||v.v!==Pe});for(var[d,f]of n)f.v!==Pe&&!(d in l)&&c.push(d);return c},setPrototypeOf(){Bi()}})}function Ya(e){try{if(e!==null&&typeof e=="object"&&Dt in e)return e[Dt]}catch{}return e}function zl(e,t){return Object.is(Ya(e),Ya(t))}var Ja,Gs,Us,Ws;function Pl(){if(Ja===void 0){Ja=window,Gs=/Firefox/.test(navigator.userAgent);var e=Element.prototype,t=Node.prototype,n=Text.prototype;Us=dn(t,"firstChild").get,Ws=dn(t,"nextSibling").get,Ba(e)&&(e.__click=void 0,e.__className=void 0,e.__attributes=null,e.__style=void 0,e.__e=void 0),Ba(n)&&(n.__t=void 0)}}function Ft(e=""){return document.createTextNode(e)}function Qn(e){return Us.call(e)}function Er(e){return Ws.call(e)}function u(e,t){return Qn(e)}function I(e,t=!1){{var n=Qn(e);return n instanceof Comment&&n.data===""?Er(n):n}}function b(e,t=1,n=!1){let r=e;for(;t--;)r=Er(r);return r}function Tl(e){e.textContent=""}function Ks(){return!1}function Ys(e,t,n){return document.createElementNS(t??Ms,e,void 0)}function Cl(e,t){if(t){const n=document.body;e.autofocus=!0,Zt(()=>{document.activeElement===n&&e.focus()})}}let Za=!1;function Ol(){Za||(Za=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const n of e.target.elements)(t=n.__on_r)==null||t.call(n)})},{capture:!0}))}function Wr(e){var t=U,n=W;ut(null),ft(null);try{return e()}finally{ut(t),ft(n)}}function Js(e,t,n,r=n){e.addEventListener(t,()=>Wr(n));const a=e.__on_r;a?e.__on_r=()=>{a(),r(!0)}:e.__on_r=()=>r(!0),Ol()}function Zs(e){W===null&&(U===null&&Fi(),Di()),hn&&Ri()}function Il(e,t){var n=t.last;n===null?t.last=t.first=e:(n.next=e,e.prev=n,t.last=e)}function Mt(e,t){var n=W;n!==null&&n.f&tt&&(e|=tt);var r={ctx:ue,deps:null,nodes:null,f:e|Ie|ot,first:null,fn:t,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,wv:0,ac:null},a=r;if(e&Jn)Dn!==null?Dn.push(r):Cn.ensure().schedule(r);else if(t!==null){try{er(r)}catch(s){throw Oe(r),s}a.deps===null&&a.teardown===null&&a.nodes===null&&a.first===a.last&&!(a.f&nr)&&(a=a.first,e&mn&&e&vn&&a!==null&&(a.f|=vn))}if(a!==null&&(a.parent=n,n!==null&&Il(a,n),U!==null&&U.f&Te&&!(e&Pn))){var i=U;(i.effects??(i.effects=[])).push(a)}return r}function Ta(){return U!==null&&!wt}function Ca(e){const t=Mt(wr,null);return he(t,Ee),t.teardown=e,t}function Xt(e){Zs();var t=W.f,n=!U&&(t&xt)!==0&&(t&On)===0;if(n){var r=ue;(r.e??(r.e=[])).push(e)}else return Xs(e)}function Xs(e){return Mt(Jn|$s,e)}function jl(e){return Zs(),Mt(wr|$s,e)}function Ll(e){Cn.ensure();const t=Mt(Pn|nr,e);return(n={})=>new Promise(r=>{n.outro?Sn(t,()=>{Oe(t),r(void 0)}):(Oe(t),r(void 0))})}function Kr(e){return Mt(Jn,e)}function Rl(e){return Mt(Ma|nr,e)}function Oa(e,t=0){return Mt(wr|t,e)}function te(e,t=[],n=[],r=[]){Ds(r,t,n,a=>{Mt(wr,()=>e(...a.map(o)))})}function Ar(e,t=0){var n=Mt(mn|t,e);return n}function Qs(e,t=0){var n=Mt(Aa|t,e);return n}function Je(e){return Mt(xt|nr,e)}function ei(e){var t=e.teardown;if(t!==null){const n=hn,r=U;Xa(!0),ut(null);try{t.call(null)}finally{Xa(n),ut(r)}}}function Ia(e,t=!1){var n=e.first;for(e.first=e.last=null;n!==null;){const a=n.ac;a!==null&&Wr(()=>{a.abort(Wt)});var r=n.next;n.f&Pn?n.parent=null:Oe(n,t),n=r}}function Dl(e){for(var t=e.first;t!==null;){var n=t.next;t.f&xt||Oe(t),t=n}}function Oe(e,t=!0){var n=!1;(t||e.f&Oi)&&e.nodes!==null&&e.nodes.end!==null&&(Fl(e.nodes.start,e.nodes.end),n=!0),he(e,la),Ia(e,t&&!n),gr(e,0);var r=e.nodes&&e.nodes.t;if(r!==null)for(const i of r)i.stop();ei(e),e.f^=la,e.f|=ct;var a=e.parent;a!==null&&a.first!==null&&ti(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.fn=e.nodes=e.ac=null}function Fl(e,t){for(;e!==null;){var n=e===t?null:Er(e);e.remove(),e=n}}function ti(e){var t=e.parent,n=e.prev,r=e.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),t!==null&&(t.first===e&&(t.first=r),t.last===e&&(t.last=n))}function Sn(e,t,n=!0){var r=[];ni(e,r,!0);var a=()=>{n&&Oe(e),t&&t()},i=r.length;if(i>0){var s=()=>--i||a();for(var l of r)l.out(s)}else a()}function ni(e,t,n){if(!(e.f&tt)){e.f^=tt;var r=e.nodes&&e.nodes.t;if(r!==null)for(const l of r)(l.is_global||n)&&t.push(l);for(var a=e.first;a!==null;){var i=a.next,s=(a.f&vn)!==0||(a.f&xt)!==0&&(e.f&mn)!==0;ni(a,t,s?n:!1),a=i}}}function ja(e){ri(e,!0)}function ri(e,t){if(e.f&tt){e.f^=tt,e.f&Ee||(he(e,Ie),Cn.ensure().schedule(e));for(var n=e.first;n!==null;){var r=n.next,a=(n.f&vn)!==0||(n.f&xt)!==0;ri(n,a?t:!1),n=r}var i=e.nodes&&e.nodes.t;if(i!==null)for(const s of i)(s.is_global||t)&&s.in()}}function La(e,t){if(e.nodes)for(var n=e.nodes.start,r=e.nodes.end;n!==null;){var a=n===r?null:Er(n);t.append(n),n=a}}let jr=!1,hn=!1;function Xa(e){hn=e}let U=null,wt=!1;function ut(e){U=e}let W=null;function ft(e){W=e}let dt=null;function ai(e){U!==null&&(dt===null?dt=[e]:dt.push(e))}let Ye=null,Xe=0,st=null;function Vl(e){st=e}let si=1,kn=0,zn=kn;function Qa(e){zn=e}function ii(){return++si}function Mr(e){var t=e.f;if(t&Ie)return!0;if(t&Te&&(e.f&=~Tn),t&kt){for(var n=e.deps,r=n.length,a=0;a<r;a++){var i=n[a];if(Mr(i)&&Vs(i),i.wv>e.wv)return!0}t&ot&&Re===null&&he(e,Ee)}return!1}function li(e,t,n=!0){var r=e.reactions;if(r!==null&&!(dt!==null&&Yn.call(dt,e)))for(var a=0;a<r.length;a++){var i=r[a];i.f&Te?li(i,t,!1):t===i&&(n?he(i,Ie):i.f&Ee&&he(i,kt),Sa(i))}}function oi(e){var A;var t=Ye,n=Xe,r=st,a=U,i=dt,s=ue,l=wt,c=zn,d=e.f;Ye=null,Xe=0,st=null,U=d&(xt|Pn)?null:e,dt=null,Zn(e.ctx),wt=!1,zn=++kn,e.ac!==null&&(Wr(()=>{e.ac.abort(Wt)}),e.ac=null);try{e.f|=oa;var f=e.fn,p=f();e.f|=On;var v=e.deps,w=B==null?void 0:B.is_fork;if(Ye!==null){var g;if(w||gr(e,Xe),v!==null&&Xe>0)for(v.length=Xe+Ye.length,g=0;g<Ye.length;g++)v[Xe+g]=Ye[g];else e.deps=v=Ye;if(Ta()&&e.f&ot)for(g=Xe;g<v.length;g++)((A=v[g]).reactions??(A.reactions=[])).push(e)}else!w&&v!==null&&Xe<v.length&&(gr(e,Xe),v.length=Xe);if(xr()&&st!==null&&!wt&&v!==null&&!(e.f&(Te|kt|Ie)))for(g=0;g<st.length;g++)li(st[g],e);if(a!==null&&a!==e){if(kn++,a.deps!==null)for(let m=0;m<n;m+=1)a.deps[m].rv=kn;if(t!==null)for(const m of t)m.rv=kn;st!==null&&(r===null?r=st:r.push(...st))}return e.f&un&&(e.f^=un),p}catch(m){return Ps(m)}finally{e.f^=oa,Ye=t,Xe=n,st=r,U=a,dt=i,Zn(s),wt=l,zn=c}}function Hl(e,t){let n=t.reactions;if(n!==null){var r=Mi.call(n,e);if(r!==-1){var a=n.length-1;a===0?n=t.reactions=null:(n[r]=n[a],n.pop())}}if(n===null&&t.f&Te&&(Ye===null||!Yn.call(Ye,t))){var i=t;i.f&ot&&(i.f^=ot,i.f&=~Tn),Na(i),Ml(i),gr(i,0)}}function gr(e,t){var n=e.deps;if(n!==null)for(var r=t;r<n.length;r++)Hl(e,n[r])}function er(e){var t=e.f;if(!(t&ct)){he(e,Ee);var n=W,r=jr;W=e,jr=!0;try{t&(mn|Aa)?Dl(e):Ia(e),ei(e);var a=oi(e);e.teardown=typeof a=="function"?a:null,e.wv=si;var i;Ai&&ol&&e.f&Ie&&e.deps}finally{jr=r,W=n}}}async function ql(){await Promise.resolve(),pl()}function o(e){var t=e.f,n=(t&Te)!==0;if(U!==null&&!wt){var r=W!==null&&(W.f&ct)!==0;if(!r&&(dt===null||!Yn.call(dt,e))){var a=U.deps;if(U.f&oa)e.rv<kn&&(e.rv=kn,Ye===null&&a!==null&&a[Xe]===e?Xe++:Ye===null?Ye=[e]:Ye.push(e));else{(U.deps??(U.deps=[])).push(e);var i=e.reactions;i===null?e.reactions=[U]:Yn.call(i,U)||i.push(U)}}}if(hn&&fn.has(e))return fn.get(e);if(n){var s=e;if(hn){var l=s.v;return(!(s.f&Ee)&&s.reactions!==null||di(s))&&(l=Pa(s)),fn.set(s,l),l}var c=(s.f&ot)===0&&!wt&&U!==null&&(jr||(U.f&ot)!==0),d=(s.f&On)===0;Mr(s)&&(c&&(s.f|=ot),Vs(s)),c&&!d&&(Hs(s),ci(s))}if(Re!=null&&Re.has(e))return Re.get(e);if(e.f&un)throw e.v;return e.v}function ci(e){if(e.f|=ot,e.deps!==null)for(const t of e.deps)(t.reactions??(t.reactions=[])).push(e),t.f&Te&&!(t.f&ot)&&(Hs(t),ci(t))}function di(e){if(e.v===Pe)return!0;if(e.deps===null)return!1;for(const t of e.deps)if(fn.has(t)||t.f&Te&&di(t))return!0;return!1}function Qt(e){var t=wt;try{return wt=!0,e()}finally{wt=t}}function wn(e){if(!(typeof e!="object"||!e||e instanceof EventTarget)){if(Dt in e)ga(e);else if(!Array.isArray(e))for(let t in e){const n=e[t];typeof n=="object"&&n&&Dt in n&&ga(n)}}}function ga(e,t=new Set){if(typeof e=="object"&&e!==null&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e),e instanceof Date&&e.getTime();for(let r in e)try{ga(e[r],t)}catch{}const n=Ea(e);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const r=ys(n);for(let a in r){const i=r[a].get;if(i)try{i.call(e)}catch{}}}}}function Bl(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const Gl=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function Ul(e){return Gl.includes(e)}const Wl={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function Kl(e){return e=e.toLowerCase(),Wl[e]??e}const Yl=["touchstart","touchmove"];function Jl(e){return Yl.includes(e)}const En=Symbol("events"),ui=new Set,ma=new Set;function Zl(e,t,n,r={}){function a(i){if(r.capture||ya.call(t,i),!i.cancelBubble)return Wr(()=>n==null?void 0:n.call(this,i))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?Zt(()=>{t.addEventListener(e,a,r)}):t.addEventListener(e,a,r),a}function ae(e,t,n){(t[En]??(t[En]={}))[e]=n}function ar(e){for(var t=0;t<e.length;t++)ui.add(e[t]);for(var n of ma)n(e)}let es=null;function ya(e){var m,y;var t=this,n=t.ownerDocument,r=e.type,a=((m=e.composedPath)==null?void 0:m.call(e))||[],i=a[0]||e.target;es=e;var s=0,l=es===e&&e[En];if(l){var c=a.indexOf(l);if(c!==-1&&(t===document||t===window)){e[En]=t;return}var d=a.indexOf(t);if(d===-1)return;c<=d&&(s=c)}if(i=a[s]||e.target,i!==t){Ni(e,"currentTarget",{configurable:!0,get(){return i||n}});var f=U,p=W;ut(null),ft(null);try{for(var v,w=[];i!==null;){var g=i.assignedSlot||i.parentNode||i.host||null;try{var A=(y=i[En])==null?void 0:y[r];A!=null&&(!i.disabled||e.target===i)&&A.call(i,e)}catch(P){v?w.push(P):v=P}if(e.cancelBubble||g===t||g===null)break;i=g}if(v){for(let P of w)queueMicrotask(()=>{throw P});throw v}}finally{e[En]=t,delete e.currentTarget,ut(f),ft(p)}}}var gs;const Qr=((gs=globalThis==null?void 0:globalThis.window)==null?void 0:gs.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:e=>e});function Xl(e){return(Qr==null?void 0:Qr.createHTML(e))??e}function fi(e){var t=Ys("template");return t.innerHTML=Xl(e.replaceAll("<!>","<!---->")),t.content}function tr(e,t){var n=W;n.nodes===null&&(n.nodes={start:e,end:t,a:null,t:null})}function T(e,t){var n=(t&tl)!==0,r=(t&nl)!==0,a,i=!e.startsWith("<!>");return()=>{a===void 0&&(a=fi(i?e:"<!>"+e),n||(a=Qn(a)));var s=r||Gs?document.importNode(a,!0):a.cloneNode(!0);if(n){var l=Qn(s),c=s.lastChild;tr(l,c)}else tr(s,s);return s}}function Ql(e,t,n="svg"){var r=!e.startsWith("<!>"),a=`<${n}>${r?e:"<!>"+e}</${n}>`,i;return()=>{if(!i){var s=fi(a),l=Qn(s);i=Qn(l)}var c=i.cloneNode(!0);return tr(c,c),c}}function eo(e,t){return Ql(e,t,"svg")}function Rn(e=""){{var t=Ft(e+"");return tr(t,t),t}}function L(){var e=document.createDocumentFragment(),t=document.createComment(""),n=Ft();return e.append(t,n),tr(t,n),e}function _(e,t){e!==null&&e.before(t)}function K(e,t){var n=t==null?"":typeof t=="object"?`${t}`:t;n!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=n,e.nodeValue=`${n}`)}function to(e,t){return no(e,t)}const Tr=new Map;function no(e,{target:t,anchor:n,props:r={},events:a,context:i,intro:s=!0,transformError:l}){Pl();var c=void 0,d=Ll(()=>{var f=n??t.appendChild(Ft());ml(f,{pending:()=>{}},w=>{Et({});var g=ue;i&&(g.c=i),a&&(r.$$events=a),c=e(w,r)||{},At()},l);var p=new Set,v=w=>{for(var g=0;g<w.length;g++){var A=w[g];if(!p.has(A)){p.add(A);var m=Jl(A);for(const C of[t,document]){var y=Tr.get(C);y===void 0&&(y=new Map,Tr.set(C,y));var P=y.get(A);P===void 0?(C.addEventListener(A,ya,{passive:m}),y.set(A,1)):y.set(A,P+1)}}}};return v(Ur(ui)),ma.add(v),()=>{var m;for(var w of p)for(const y of[t,document]){var g=Tr.get(y),A=g.get(w);--A==0?(y.removeEventListener(w,ya),g.delete(w),g.size===0&&Tr.delete(y)):g.set(w,A)}ma.delete(v),f!==n&&((m=f.parentNode)==null||m.removeChild(f))}});return ro.set(c,d),c}let ro=new WeakMap;var bt,Lt,et,Nn,br,$r,Gr;class Ra{constructor(t,n=!0){gt(this,"anchor");J(this,bt,new Map);J(this,Lt,new Map);J(this,et,new Map);J(this,Nn,new Set);J(this,br,!0);J(this,$r,t=>{if(h(this,bt).has(t)){var n=h(this,bt).get(t),r=h(this,Lt).get(n);if(r)ja(r),h(this,Nn).delete(n);else{var a=h(this,et).get(n);a&&(h(this,Lt).set(n,a.effect),h(this,et).delete(n),a.fragment.lastChild.remove(),this.anchor.before(a.fragment),r=a.effect)}for(const[i,s]of h(this,bt)){if(h(this,bt).delete(i),i===t)break;const l=h(this,et).get(s);l&&(Oe(l.effect),h(this,et).delete(s))}for(const[i,s]of h(this,Lt)){if(i===n||h(this,Nn).has(i))continue;const l=()=>{if(Array.from(h(this,bt).values()).includes(i)){var d=document.createDocumentFragment();La(s,d),d.append(Ft()),h(this,et).set(i,{effect:s,fragment:d})}else Oe(s);h(this,Nn).delete(i),h(this,Lt).delete(i)};h(this,br)||!r?(h(this,Nn).add(i),Sn(s,l,!1)):l()}}});J(this,Gr,t=>{h(this,bt).delete(t);const n=Array.from(h(this,bt).values());for(const[r,a]of h(this,et))n.includes(r)||(Oe(a.effect),h(this,et).delete(r))});this.anchor=t,G(this,br,n)}ensure(t,n){var r=B,a=Ks();if(n&&!h(this,Lt).has(t)&&!h(this,et).has(t))if(a){var i=document.createDocumentFragment(),s=Ft();i.append(s),h(this,et).set(t,{effect:Je(()=>n(s)),fragment:i})}else h(this,Lt).set(t,Je(()=>n(this.anchor)));if(h(this,bt).set(r,t),a){for(const[l,c]of h(this,Lt))l===t?r.unskip_effect(c):r.skip_effect(c);for(const[l,c]of h(this,et))l===t?r.unskip_effect(c.effect):r.skip_effect(c.effect);r.oncommit(h(this,$r)),r.ondiscard(h(this,Gr))}else h(this,$r).call(this,r)}}bt=new WeakMap,Lt=new WeakMap,et=new WeakMap,Nn=new WeakMap,br=new WeakMap,$r=new WeakMap,Gr=new WeakMap;function X(e,t,n=!1){var r=new Ra(e),a=n?vn:0;function i(s,l){r.ensure(s,l)}Ar(()=>{var s=!1;t((l,c=0)=>{s=!0,i(c,l)}),s||i(-1,null)},a)}function mr(e,t){return t}function ao(e,t,n){for(var r=[],a=t.length,i,s=t.length,l=0;l<a;l++){let p=t[l];Sn(p,()=>{if(i){if(i.pending.delete(p),i.done.add(p),i.pending.size===0){var v=e.outrogroups;ba(e,Ur(i.done)),v.delete(i),v.size===0&&(e.outrogroups=null)}}else s-=1},!1)}if(s===0){var c=r.length===0&&n!==null;if(c){var d=n,f=d.parentNode;Tl(f),f.append(d),e.items.clear()}ba(e,t,!c)}else i={pending:new Set(t),done:new Set},(e.outrogroups??(e.outrogroups=new Set)).add(i)}function ba(e,t,n=!0){var r;if(e.pending.size>0){r=new Set;for(const s of e.pending.values())for(const l of s)r.add(e.items.get(l).e)}for(var a=0;a<t.length;a++){var i=t[a];if(r!=null&&r.has(i)){i.f|=Rt;const s=document.createDocumentFragment();La(i,s)}else Oe(t[a],n)}}var ts;function _n(e,t,n,r,a,i=null){var s=e,l=new Map,c=(t&Es)!==0;if(c){var d=e;s=d.appendChild(Ft())}var f=null,p=za(()=>{var C=n();return ka(C)?C:C==null?[]:Ur(C)}),v,w=new Map,g=!0;function A(C){P.effect.f&ct||(P.pending.delete(C),P.fallback=f,so(P,v,s,t,r),f!==null&&(v.length===0?f.f&Rt?(f.f^=Rt,fr(f,null,s)):ja(f):Sn(f,()=>{f=null})))}function m(C){P.pending.delete(C)}var y=Ar(()=>{v=o(p);for(var C=v.length,k=new Set,z=B,q=Ks(),O=0;O<C;O+=1){var M=v[O],F=r(M,O),Y=g?null:l.get(F);Y?(Y.v&&Xn(Y.v,M),Y.i&&Xn(Y.i,O),q&&z.unskip_effect(Y.e)):(Y=io(l,g?s:ts??(ts=Ft()),M,F,O,a,t,n),g||(Y.e.f|=Rt),l.set(F,Y)),k.add(F)}if(C===0&&i&&!f&&(g?f=Je(()=>i(s)):(f=Je(()=>i(ts??(ts=Ft()))),f.f|=Rt)),C>k.size&&Li(),!g)if(w.set(z,k),q){for(const[ce,_e]of l)k.has(ce)||z.skip_effect(_e.e);z.oncommit(A),z.ondiscard(m)}else A(z);o(p)}),P={effect:y,items:l,pending:w,outrogroups:null,fallback:f};g=!1}function cr(e){for(;e!==null&&!(e.f&xt);)e=e.next;return e}function so(e,t,n,r,a){var Y,ce,_e,Q,fe,Ne,Ve,He,nt;var i=(r&Yi)!==0,s=t.length,l=e.items,c=cr(e.effect.first),d,f=null,p,v=[],w=[],g,A,m,y;if(i)for(y=0;y<s;y+=1)g=t[y],A=a(g,y),m=l.get(A).e,m.f&Rt||((ce=(Y=m.nodes)==null?void 0:Y.a)==null||ce.measure(),(p??(p=new Set)).add(m));for(y=0;y<s;y+=1){if(g=t[y],A=a(g,y),m=l.get(A).e,e.outrogroups!==null)for(const ge of e.outrogroups)ge.pending.delete(m),ge.done.delete(m);if(m.f&Rt)if(m.f^=Rt,m===c)fr(m,null,n);else{var P=f?f.next:c;m===e.effect.last&&(e.effect.last=m.prev),m.prev&&(m.prev.next=m.next),m.next&&(m.next.prev=m.prev),sn(e,f,m),sn(e,m,P),fr(m,P,n),f=m,v=[],w=[],c=cr(f.next);continue}if(m.f&tt&&(ja(m),i&&((Q=(_e=m.nodes)==null?void 0:_e.a)==null||Q.unfix(),(p??(p=new Set)).delete(m))),m!==c){if(d!==void 0&&d.has(m)){if(v.length<w.length){var C=w[0],k;f=C.prev;var z=v[0],q=v[v.length-1];for(k=0;k<v.length;k+=1)fr(v[k],C,n);for(k=0;k<w.length;k+=1)d.delete(w[k]);sn(e,z.prev,q.next),sn(e,f,z),sn(e,q,C),c=C,f=q,y-=1,v=[],w=[]}else d.delete(m),fr(m,c,n),sn(e,m.prev,m.next),sn(e,m,f===null?e.effect.first:f.next),sn(e,f,m),f=m;continue}for(v=[],w=[];c!==null&&c!==m;)(d??(d=new Set)).add(c),w.push(c),c=cr(c.next);if(c===null)continue}m.f&Rt||v.push(m),f=m,c=cr(m.next)}if(e.outrogroups!==null){for(const ge of e.outrogroups)ge.pending.size===0&&(ba(e,Ur(ge.done)),(fe=e.outrogroups)==null||fe.delete(ge));e.outrogroups.size===0&&(e.outrogroups=null)}if(c!==null||d!==void 0){var O=[];if(d!==void 0)for(m of d)m.f&tt||O.push(m);for(;c!==null;)!(c.f&tt)&&c!==e.fallback&&O.push(c),c=cr(c.next);var M=O.length;if(M>0){var F=r&Es&&s===0?n:null;if(i){for(y=0;y<M;y+=1)(Ve=(Ne=O[y].nodes)==null?void 0:Ne.a)==null||Ve.measure();for(y=0;y<M;y+=1)(nt=(He=O[y].nodes)==null?void 0:He.a)==null||nt.fix()}ao(e,O,F)}}i&&Zt(()=>{var ge,Nt;if(p!==void 0)for(m of p)(Nt=(ge=m.nodes)==null?void 0:ge.a)==null||Nt.apply()})}function io(e,t,n,r,a,i,s,l){var c=s&Wi?s&Ji?pn(n):Nl(n,!1,!1):null,d=s&Ki?pn(a):null;return{v:c,i:d,e:Je(()=>(i(t,c??n,d??a,l),()=>{e.delete(r)}))}}function fr(e,t,n){if(e.nodes)for(var r=e.nodes.start,a=e.nodes.end,i=t&&!(t.f&Rt)?t.nodes.start:n;r!==null;){var s=Er(r);if(i.before(r),r===a)return;r=s}}function sn(e,t,n){t===null?e.effect.first=n:t.next=n,n===null?e.effect.last=t:n.prev=t}function D(e,t,n,r,a){var l;var i=(l=t.$$slots)==null?void 0:l[n],s=!1;i===!0&&(i=t.children,s=!0),i===void 0||i(e,s?()=>r:r)}function lo(e,t,n){var r=new Ra(e);Ar(()=>{var a=t()??null;r.ensure(a,a&&(i=>n(i,a)))},vn)}function oo(e,t,n,r,a,i){var s=null,l=e,c=new Ra(l,!1);Ar(()=>{const d=t()||null;var f=rl;if(d===null){c.ensure(null,null);return}return c.ensure(d,p=>{if(d){if(s=Ys(d,f),tr(s,s),r){var v=s.appendChild(Ft());r(s,v)}W.nodes.end=s,p.before(s)}}),()=>{}},vn),Ca(()=>{})}function co(e,t){var n=void 0,r;Qs(()=>{n!==(n=t())&&(r&&(Oe(r),r=null),n&&(r=Je(()=>{Kr(()=>n(e))})))})}function vi(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var a=e.length;for(t=0;t<a;t++)e[t]&&(n=vi(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function uo(){for(var e,t,n=0,r="",a=arguments.length;n<a;n++)(e=arguments[n])&&(t=vi(e))&&(r&&(r+=" "),r+=t);return r}function fo(e){return typeof e=="object"?uo(e):e??""}const ns=[...` 	
\r\f \v\uFEFF`];function vo(e,t,n){var r=e==null?"":""+e;if(t&&(r=r?r+" "+t:t),n){for(var a of Object.keys(n))if(n[a])r=r?r+" "+a:a;else if(r.length)for(var i=a.length,s=0;(s=r.indexOf(a,s))>=0;){var l=s+i;(s===0||ns.includes(r[s-1]))&&(l===r.length||ns.includes(r[l]))?r=(s===0?"":r.substring(0,s))+r.substring(l+1):s=l}}return r===""?null:r}function rs(e,t=!1){var n=t?" !important;":";",r="";for(var a of Object.keys(e)){var i=e[a];i!=null&&i!==""&&(r+=" "+a+": "+i+n)}return r}function ea(e){return e[0]!=="-"||e[1]!=="-"?e.toLowerCase():e}function po(e,t){if(t){var n="",r,a;if(Array.isArray(t)?(r=t[0],a=t[1]):r=t,e){e=String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var i=!1,s=0,l=!1,c=[];r&&c.push(...Object.keys(r).map(ea)),a&&c.push(...Object.keys(a).map(ea));var d=0,f=-1;const A=e.length;for(var p=0;p<A;p++){var v=e[p];if(l?v==="/"&&e[p-1]==="*"&&(l=!1):i?i===v&&(i=!1):v==="/"&&e[p+1]==="*"?l=!0:v==='"'||v==="'"?i=v:v==="("?s++:v===")"&&s--,!l&&i===!1&&s===0){if(v===":"&&f===-1)f=p;else if(v===";"||p===A-1){if(f!==-1){var w=ea(e.substring(d,f).trim());if(!c.includes(w)){v!==";"&&p++;var g=e.substring(d,p).trim();n+=" "+g+";"}}d=p+1,f=-1}}}}return r&&(n+=rs(r)),a&&(n+=rs(a,!0)),n=n.trim(),n===""?null:n}return e==null?null:String(e)}function Ae(e,t,n,r,a,i){var s=e.__className;if(s!==n||s===void 0){var l=vo(n,r,i);l==null?e.removeAttribute("class"):t?e.className=l:e.setAttribute("class",l),e.__className=n}else if(i&&a!==i)for(var c in i){var d=!!i[c];(a==null||d!==!!a[c])&&e.classList.toggle(c,d)}return i}function ta(e,t={},n,r){for(var a in n){var i=n[a];t[a]!==i&&(n[a]==null?e.style.removeProperty(a):e.style.setProperty(a,i,r))}}function Dr(e,t,n,r){var a=e.__style;if(a!==t){var i=po(t,r);i==null?e.removeAttribute("style"):e.style.cssText=i,e.__style=t}else r&&(Array.isArray(r)?(ta(e,n==null?void 0:n[0],r[0]),ta(e,n==null?void 0:n[1],r[1],"important")):ta(e,n,r));return r}function Fr(e,t,n=!1){if(e.multiple){if(t==null)return;if(!ka(t))return sl();for(var r of e.options)r.selected=t.includes(hr(r));return}for(r of e.options){var a=hr(r);if(zl(a,t)){r.selected=!0;return}}(!n||t!==void 0)&&(e.selectedIndex=-1)}function pi(e){var t=new MutationObserver(()=>{Fr(e,e.__value)});t.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),Ca(()=>{t.disconnect()})}function ho(e,t,n=t){var r=new WeakSet,a=!0;Js(e,"change",i=>{var s=i?"[selected]":":checked",l;if(e.multiple)l=[].map.call(e.querySelectorAll(s),hr);else{var c=e.querySelector(s)??e.querySelector("option:not([disabled])");l=c&&hr(c)}n(l),B!==null&&r.add(B)}),Kr(()=>{var i=t();if(e===document.activeElement){var s=B;if(r.has(s))return}if(Fr(e,i,a),a&&i===void 0){var l=e.querySelector(":checked");l!==null&&(i=hr(l),n(i))}e.__value=i,a=!1}),pi(e)}function hr(e){return"__value"in e?e.__value:e.value}const dr=Symbol("class"),ur=Symbol("style"),hi=Symbol("is custom element"),_i=Symbol("is html"),_o=xs?"option":"OPTION",go=xs?"select":"SELECT";function mo(e,t){t?e.hasAttribute("selected")||e.setAttribute("selected",""):e.removeAttribute("selected")}function gn(e,t,n,r){var a=gi(e);a[t]!==(a[t]=n)&&(t==="loading"&&(e[Ii]=n),n==null?e.removeAttribute(t):typeof n!="string"&&mi(e).includes(t)?e[t]=n:e.setAttribute(t,n))}function yo(e,t,n,r,a=!1,i=!1){var s=gi(e),l=s[hi],c=!s[_i],d=t||{},f=e.nodeName===_o;for(var p in t)p in n||(n[p]=null);n.class?n.class=fo(n.class):n[dr]&&(n.class=null),n[ur]&&(n.style??(n.style=null));var v=mi(e);for(const k in n){let z=n[k];if(f&&k==="value"&&z==null){e.value=e.__value="",d[k]=z;continue}if(k==="class"){var w=e.namespaceURI==="http://www.w3.org/1999/xhtml";Ae(e,w,z,r,t==null?void 0:t[dr],n[dr]),d[k]=z,d[dr]=n[dr];continue}if(k==="style"){Dr(e,z,t==null?void 0:t[ur],n[ur]),d[k]=z,d[ur]=n[ur];continue}var g=d[k];if(!(z===g&&!(z===void 0&&e.hasAttribute(k)))){d[k]=z;var A=k[0]+k[1];if(A!=="$$")if(A==="on"){const q={},O="$$"+k;let M=k.slice(2);var m=Ul(M);if(Bl(M)&&(M=M.slice(0,-7),q.capture=!0),!m&&g){if(z!=null)continue;e.removeEventListener(M,d[O],q),d[O]=null}if(m)ae(M,e,z),ar([M]);else if(z!=null){let F=function(Y){d[k].call(this,Y)};var C=F;d[O]=Zl(M,e,F,q)}}else if(k==="style")gn(e,k,z);else if(k==="autofocus")Cl(e,!!z);else if(!l&&(k==="__value"||k==="value"&&z!=null))e.value=e.__value=z;else if(k==="selected"&&f)mo(e,z);else{var y=k;c||(y=Kl(y));var P=y==="defaultValue"||y==="defaultChecked";if(z==null&&!l&&!P)if(s[k]=null,y==="value"||y==="checked"){let q=e;const O=t===void 0;if(y==="value"){let M=q.defaultValue;q.removeAttribute(y),q.defaultValue=M,q.value=q.__value=O?M:null}else{let M=q.defaultChecked;q.removeAttribute(y),q.defaultChecked=M,q.checked=O?M:!1}}else e.removeAttribute(k);else P||v.includes(y)&&(l||typeof z!="string")?(e[y]=z,y in s&&(s[y]=Pe)):typeof z!="function"&&gn(e,y,z)}}}return d}function as(e,t,n=[],r=[],a=[],i,s=!1,l=!1){Ds(a,n,r,c=>{var d=void 0,f={},p=e.nodeName===go,v=!1;if(Qs(()=>{var g=t(...c.map(o)),A=yo(e,d,g,i,s,l);v&&p&&"value"in g&&Fr(e,g.value);for(let y of Object.getOwnPropertySymbols(f))g[y]||Oe(f[y]);for(let y of Object.getOwnPropertySymbols(g)){var m=g[y];y.description===al&&(!d||m!==d[y])&&(f[y]&&Oe(f[y]),f[y]=Je(()=>co(e,()=>m))),A[y]=m}d=A}),p){var w=e;Kr(()=>{Fr(w,d.value,!0),pi(w)})}v=!0})}function gi(e){return e.__attributes??(e.__attributes={[hi]:e.nodeName.includes("-"),[_i]:e.namespaceURI===Ms})}var ss=new Map;function mi(e){var t=e.getAttribute("is")||e.nodeName,n=ss.get(t);if(n)return n;ss.set(t,n=[]);for(var r,a=e,i=Element.prototype;i!==a;){r=ys(a);for(var s in r)r[s].set&&n.push(s);a=Ea(a)}return n}function Vr(e,t,n=t){var r=new WeakSet;Js(e,"input",async a=>{var i=a?e.defaultValue:e.value;if(i=na(e)?ra(i):i,n(i),B!==null&&r.add(B),await ql(),i!==(i=t())){var s=e.selectionStart,l=e.selectionEnd,c=e.value.length;if(e.value=i??"",l!==null){var d=e.value.length;s===l&&l===c&&d>c?(e.selectionStart=d,e.selectionEnd=d):(e.selectionStart=s,e.selectionEnd=Math.min(l,d))}}}),Qt(t)==null&&e.value&&(n(na(e)?ra(e.value):e.value),B!==null&&r.add(B)),Oa(()=>{var a=t();if(e===document.activeElement){var i=B;if(r.has(i))return}na(e)&&a===ra(e.value)||e.type==="date"&&!a&&!e.value||a!==e.value&&(e.value=a??"")})}function na(e){var t=e.type;return t==="number"||t==="range"}function ra(e){return e===""?null:+e}function is(e,t){return e===t||(e==null?void 0:e[Dt])===t}function Da(e={},t,n,r){var a=ue.r,i=W;return Kr(()=>{var s,l;return Oa(()=>{s=l,l=[],Qt(()=>{e!==n(...l)&&(t(e,...l),s&&is(n(...s),e)&&t(null,...s))})}),()=>{let c=i;for(;c!==a&&c.parent!==null&&c.parent.f&la;)c=c.parent;const d=()=>{l&&is(n(...l),e)&&t(null,...l)},f=c.teardown;c.teardown=()=>{d(),f==null||f()}}}),e}function yi(e=!1){const t=ue,n=t.l.u;if(!n)return;let r=()=>wn(t.s);if(e){let a=0,i={};const s=kr(()=>{let l=!1;const c=t.s;for(const d in c)c[d]!==i[d]&&(i[d]=c[d],l=!0);return l&&a++,a});r=()=>o(s)}n.b.length&&jl(()=>{ls(t,r),sa(n.b)}),Xt(()=>{const a=Qt(()=>n.m.map(Ti));return()=>{for(const i of a)typeof i=="function"&&i()}}),n.a.length&&Xt(()=>{ls(t,r),sa(n.a)})}function ls(e,t){if(e.l.s)for(const n of e.l.s)o(n);t()}const bo={get(e,t){if(!e.exclude.includes(t))return o(e.version),t in e.special?e.special[t]():e.props[t]},set(e,t,n){if(!(t in e.special)){var r=W;try{ft(e.parent_effect),e.special[t]=$t({get[t](){return e.props[t]}},t,As)}finally{ft(r)}}return e.special[t](n),Ka(e.version),!0},getOwnPropertyDescriptor(e,t){if(!e.exclude.includes(t)&&t in e.props)return{enumerable:!0,configurable:!0,value:e.props[t]}},deleteProperty(e,t){return e.exclude.includes(t)||(e.exclude.push(t),Ka(e.version)),!0},has(e,t){return e.exclude.includes(t)?!1:t in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(t=>!e.exclude.includes(t))}};function R(e,t){return new Proxy({props:e,exclude:t,special:{},version:pn(0),parent_effect:W},bo)}const $o={get(e,t){let n=e.props.length;for(;n--;){let r=e.props[n];if(lr(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r)return r[t]}},set(e,t,n){let r=e.props.length;for(;r--;){let a=e.props[r];lr(a)&&(a=a());const i=dn(a,t);if(i&&i.set)return i.set(n),!0}return!1},getOwnPropertyDescriptor(e,t){let n=e.props.length;for(;n--;){let r=e.props[n];if(lr(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r){const a=dn(r,t);return a&&!a.configurable&&(a.configurable=!0),a}}},has(e,t){if(t===Dt||t===ws)return!1;for(let n of e.props)if(lr(n)&&(n=n()),n!=null&&t in n)return!0;return!1},ownKeys(e){const t=[];for(let n of e.props)if(lr(n)&&(n=n()),!!n){for(const r in n)t.includes(r)||t.push(r);for(const r of Object.getOwnPropertySymbols(n))t.includes(r)||t.push(r)}return t}};function V(...e){return new Proxy({props:e},$o)}function $t(e,t,n,r){var C;var a=!rr||(n&Xi)!==0,i=(n&Qi)!==0,s=(n&el)!==0,l=r,c=!0,d=()=>(c&&(c=!1,l=s?Qt(r):r),l);let f;if(i){var p=Dt in e||ws in e;f=((C=dn(e,t))==null?void 0:C.set)??(p&&t in e?k=>e[t]=k:void 0)}var v,w=!1;i?[v,w]=fl(()=>e[t]):v=e[t],v===void 0&&r!==void 0&&(v=d(),f&&(a&&Hi(),f(v)));var g;if(a?g=()=>{var k=e[t];return k===void 0?d():(c=!0,k)}:g=()=>{var k=e[t];return k!==void 0&&(l=void 0),k===void 0?l:k},a&&!(n&As))return g;if(f){var A=e.$$legacy;return function(k,z){return arguments.length>0?((!a||!z||A||w)&&f(z?g():k),k):g()}}var m=!1,y=(n&Zi?kr:za)(()=>(m=!1,g()));i&&o(y);var P=W;return function(k,z){if(arguments.length>0){const q=z?o(y):a&&i?De(k):k;return $(y,q),m=!0,l!==void 0&&(l=q),k}return hn&&m||P.f&ct?y.v:o(y)}}function sr(e){ue===null&&ks(),rr&&ue.l!==null?xo(ue).m.push(e):Xt(()=>{const t=Qt(e);if(typeof t=="function")return t})}function wo(e){ue===null&&ks(),sr(()=>()=>Qt(e))}function xo(e){var t=e.l;return t.u??(t.u={a:[],b:[],m:[]})}const ko="5";var ms;typeof window<"u"&&((ms=window.__svelte??(window.__svelte={})).v??(ms.v=new Set)).add(ko);cl();/**
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
 */const Ao=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
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
 */const os=(...e)=>e.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();var Mo=eo("<svg><!><!></svg>");function H(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]),r=R(n,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);Et(t,!1);let a=$t(t,"name",8,void 0),i=$t(t,"color",8,"currentColor"),s=$t(t,"size",8,24),l=$t(t,"strokeWidth",8,2),c=$t(t,"absoluteStrokeWidth",8,!1),d=$t(t,"iconNode",24,()=>[]);yi();var f=Mo();as(f,(w,g,A)=>({...Eo,...w,...r,width:s(),height:s(),stroke:i(),"stroke-width":g,class:A}),[()=>Ao(r)?void 0:{"aria-hidden":"true"},()=>(wn(c()),wn(l()),wn(s()),Qt(()=>c()?Number(l())*24/Number(s()):l())),()=>(wn(os),wn(a()),wn(n),Qt(()=>os("lucide-icon","lucide",a()?`lucide-${a()}`:"",n.class)))]);var p=u(f);_n(p,1,d,mr,(w,g)=>{var A=Le(()=>Ci(o(g),2));let m=()=>o(A)[0],y=()=>o(A)[1];var P=L(),C=I(P);oo(C,m,!0,(k,z)=>{as(k,()=>({...y()}))}),_(w,P)});var v=b(p);D(v,t,"default",{}),_(e,f),At()}function No(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]];H(e,V({name:"activity"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function So(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];H(e,V({name:"arrow-right"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function cs(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 8V4H8"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2"}],["path",{d:"M2 14h2"}],["path",{d:"M20 14h2"}],["path",{d:"M15 13v2"}],["path",{d:"M9 13v2"}]];H(e,V({name:"bot"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function zo(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]];H(e,V({name:"box"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function $a(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516"}],["path",{d:"M12 13h4"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1"}],["path",{d:"M12 8h8"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2"}],["circle",{cx:"16",cy:"13",r:".5"}],["circle",{cx:"18",cy:"3",r:".5"}],["circle",{cx:"20",cy:"21",r:".5"}],["circle",{cx:"20",cy:"8",r:".5"}]];H(e,V({name:"brain-circuit"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function wa(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M20 6 9 17l-5-5"}]];H(e,V({name:"check"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Lr(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m6 9 6 6 6-6"}]];H(e,V({name:"chevron-down"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function aa(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m9 18 6-6-6-6"}]];H(e,V({name:"chevron-right"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function ds(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];H(e,V({name:"circle-alert"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function us(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335"}],["path",{d:"m9 11 3 3L22 4"}]];H(e,V({name:"circle-check-big"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Po(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];H(e,V({name:"circle-check"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function To(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["rect",{x:"9",y:"9",width:"6",height:"6",rx:"1"}]];H(e,V({name:"circle-stop"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Co(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]];H(e,V({name:"circle-x"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function bi(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];H(e,V({name:"copy"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Fa(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 20v2"}],["path",{d:"M12 2v2"}],["path",{d:"M17 20v2"}],["path",{d:"M17 2v2"}],["path",{d:"M2 12h2"}],["path",{d:"M2 17h2"}],["path",{d:"M2 7h2"}],["path",{d:"M20 12h2"}],["path",{d:"M20 17h2"}],["path",{d:"M20 7h2"}],["path",{d:"M7 20v2"}],["path",{d:"M7 2v2"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1"}]];H(e,V({name:"cpu"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Va(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5"}],["path",{d:"M3 12A9 3 0 0 0 21 12"}]];H(e,V({name:"database"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function fs(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];H(e,V({name:"download"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Oo(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];H(e,V({name:"eye"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function vs(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M12 7v5l4 2"}]];H(e,V({name:"history"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Io(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];H(e,V({name:"info"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function jo(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"}],["path",{d:"M9 18h6"}],["path",{d:"M10 22h4"}]];H(e,V({name:"lightbulb"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Lo(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 2v4"}],["path",{d:"m16.2 7.8 2.9-2.9"}],["path",{d:"M18 12h4"}],["path",{d:"m16.2 16.2 2.9 2.9"}],["path",{d:"M12 18v4"}],["path",{d:"m4.9 19.1 2.9-2.9"}],["path",{d:"M2 12h4"}],["path",{d:"m4.9 4.9 2.9 2.9"}]];H(e,V({name:"loader"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Ro(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}]];H(e,V({name:"message-square"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Do(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]];H(e,V({name:"moon"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Fo(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"}],["path",{d:"M12 22V12"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["path",{d:"m7.5 4.27 9 5.15"}]];H(e,V({name:"package"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Vo(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];H(e,V({name:"play"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Hr(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"}]];H(e,V({name:"puzzle"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function _r(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];H(e,V({name:"refresh-cw"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Ho(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];H(e,V({name:"search"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function qo(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"}],["path",{d:"m21.854 2.147-10.94 10.939"}]];H(e,V({name:"send"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Bo(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];H(e,V({name:"settings"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Go(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]];H(e,V({name:"shield-check"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function ps(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{d:"M20 2v4"}],["path",{d:"M22 4h-4"}],["circle",{cx:"4",cy:"20",r:"2"}]];H(e,V({name:"sparkles"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Uo(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];H(e,V({name:"sun"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Wo(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 3v18"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}],["path",{d:"M3 15h18"}]];H(e,V({name:"table"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Ko(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 19h8"}],["path",{d:"m4 17 6-6-6-6"}]];H(e,V({name:"terminal"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function $i(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];H(e,V({name:"trash-2"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function hs(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];H(e,V({name:"triangle-alert"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Yo(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];H(e,V({name:"user"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Jo(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"}]];H(e,V({name:"wrench"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Zo(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];H(e,V({name:"x"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Xo(e,t){const n=R(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]];H(e,V({name:"zap"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=L(),l=I(s);D(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}var Qo=T('<button><!> <span class="label"> </span></button>'),ec=T('<button><span class="plugin-icon svelte-129hoe0"> </span> <span class="label"> </span></button>'),tc=T('<div class="empty-plugins svelte-129hoe0">No plugins installed</div>'),nc=T("<!> <span>Light Mode</span>",1),rc=T("<!> <span>Dark Mode</span>",1),ac=T('<aside class="sidebar glass svelte-129hoe0"><div class="logo svelte-129hoe0"><div class="logo-box svelte-129hoe0"><!></div> <span class="logo-text brand-font svelte-129hoe0">Cheesecrab</span></div> <nav class="nav-section svelte-129hoe0"></nav> <div class="separator svelte-129hoe0"></div> <div class="nav-section plugins svelte-129hoe0"><div class="section-header svelte-129hoe0"><!> <span class="section-title svelte-129hoe0">Plugins</span></div> <div class="scroll-area svelte-129hoe0"><!> <!></div></div> <div class="bottom-actions svelte-129hoe0"><button class="theme-toggle svelte-129hoe0" title="Toggle Theme"><!></button></div></aside>');function sc(e,t){Et(t,!0);let n=$t(t,"activeView",15),r=$t(t,"installedPlugins",19,()=>[]),a=$t(t,"theme",3,"dark");const i=[{id:"chat",icon:Ro,label:"AI Space"},{id:"agent",icon:$a,label:"Agent Engine"},{id:"models",icon:Va,label:"Models"},{id:"plugins",icon:Hr,label:"Plugins"},{id:"crabtable",icon:Wo,label:"Crab Table"},{id:"settings",icon:Bo,label:"Settings"}];var s=ac(),l=u(s),c=u(l),d=u(c);Fa(d,{size:20,color:"var(--accent-primary)"});var f=b(l,2);_n(f,21,()=>i,mr,(O,M)=>{var F=Qo();let Y;var ce=u(F);{let fe=Le(()=>n()===o(M).id?2.5:2);lo(ce,()=>o(M).icon,(Ne,Ve)=>{Ve(Ne,{size:18,get strokeWidth(){return o(fe)}})})}var _e=b(ce,2),Q=u(_e);te(()=>{Y=Ae(F,1,"nav-item svelte-129hoe0",null,Y,{active:n()===o(M).id}),K(Q,o(M).label)}),ae("click",F,()=>n(o(M).id)),_(O,F)});var p=b(f,4),v=u(p),w=u(v);Hr(w,{size:14});var g=b(v,2),A=u(g);_n(A,17,r,mr,(O,M)=>{var F=ec();let Y;var ce=u(F),_e=u(ce),Q=b(ce,2),fe=u(Q);te(()=>{Y=Ae(F,1,"nav-item plugin svelte-129hoe0",null,Y,{active:n()===o(M).id}),K(_e,o(M).icon||"🧩"),K(fe,o(M).label)}),ae("click",F,()=>n(o(M).id)),_(O,F)});var m=b(A,2);{var y=O=>{var M=tc();_(O,M)};X(m,O=>{r().length===0&&O(y)})}var P=b(p,2),C=u(P),k=u(C);{var z=O=>{var M=nc(),F=I(M);Uo(F,{size:18}),_(O,M)},q=O=>{var M=rc(),F=I(M);Do(F,{size:18}),_(O,M)};X(k,O=>{a()==="dark"?O(z):O(q,-1)})}ae("click",C,function(...O){var M;(M=t.onToggleTheme)==null||M.apply(this,O)}),_(e,s),At()}ar(["click"]);var ic=T('<div class="telemetry-bar border-t glass svelte-zgh7bo"><div class="status-group svelte-zgh7bo"><div class="status-item svelte-zgh7bo"><div class="pulse-dot svelte-zgh7bo"></div> <!> <span class="status-text svelte-zgh7bo"></span></div> <div class="separator-v svelte-zgh7bo"></div> <div class="status-item svelte-zgh7bo"><!> <span class="status-text svelte-zgh7bo">Network: Local Only</span></div></div> <div class="metrics-group svelte-zgh7bo"><div class="metric svelte-zgh7bo"><!> <span class="metric-label svelte-zgh7bo">CPU</span> <div class="progress-container svelte-zgh7bo"><div class="progress-bg svelte-zgh7bo"><div class="progress-fill svelte-zgh7bo"></div></div></div> <span class="metric-value svelte-zgh7bo"> </span></div> <div class="separator-v svelte-zgh7bo"></div> <div class="metric svelte-zgh7bo"><!> <span class="metric-label svelte-zgh7bo">RAM</span> <div class="progress-container svelte-zgh7bo"><div class="progress-bg svelte-zgh7bo"><div class="progress-fill svelte-zgh7bo"></div></div></div> <span class="metric-value svelte-zgh7bo"> </span></div></div></div>');function lc(e,t){Et(t,!0);let n=j(12),r=j(4.2),a=16;Xt(()=>{const ce=setInterval(()=>{$(n,Math.floor(Math.random()*25)+5),$(r,+(4.2+Math.random()*.3).toFixed(1))},3e3);return()=>clearInterval(ce)});var i=ic(),s=u(i),l=u(s),c=b(u(l),2);Go(c,{size:14,color:"#10b981"});var d=b(c,2);d.textContent="System Ready";var f=b(l,4),p=u(f);No(p,{size:14});var v=b(s,2),w=u(v),g=u(w);Fa(g,{size:14});var A=b(g,4),m=u(A),y=u(m),P=b(A,2),C=u(P),k=b(w,4),z=u(k);Va(z,{size:14});var q=b(z,4),O=u(q),M=u(O),F=b(q,2),Y=u(F);te(()=>{Dr(y,`width: ${o(n)??""}%`),K(C,`${o(n)??""}%`),Dr(M,`width: ${o(r)/a*100}%`),K(Y,`${o(r)??""}G / 16G`)}),_(e,i),At()}function Nr(){var e,t;return((t=(e=window.go)==null?void 0:e.main)==null?void 0:t.App)??null}async function Ha(){const e=Nr();if(e&&e.GetModels){const r=await e.GetModels();return Array.isArray(r)?r:[]}const t=await fetch("/api/models");if(!t.ok)throw new Error(`getModels: ${t.status}`);const n=await t.json();return Array.isArray(n==null?void 0:n.data)?n.data:n&&!Array.isArray(n)?[]:n||[]}async function oc(){const e=Nr();if(e&&e.GetSwarmAgents){const t=await e.GetSwarmAgents();return Array.isArray(t)?t:[]}try{const t=await fetch("/v1/agents");if(!t.ok)return[];const n=await t.json();return Array.isArray(n==null?void 0:n.agents)?n.agents:[]}catch{return[]}}function cc(e,{onToken:t,onError:n,onDone:r}){const a=Nr();if(a&&a.ChatCompletion&&window.runtime){const s=()=>{try{window.runtime.EventsOff("chat:token"),window.runtime.EventsOff("chat:error"),window.runtime.EventsOff("chat:done")}catch{}};window.runtime.EventsOn("chat:token",l=>{try{t(l)}catch{}}),window.runtime.EventsOn("chat:error",l=>{s();try{n(String(l))}catch{}}),window.runtime.EventsOn("chat:done",()=>{s();try{r()}catch{}}),a.ChatCompletion({...e,stream:!0});return}const i=JSON.stringify({...e,stream:!0});fetch("/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json"},body:i}).then(s=>{if(!s.ok){s.text().then(p=>n(p||`HTTP ${s.status}`)).catch(()=>n(`HTTP ${s.status}`));return}const l=s.body.getReader(),c=new TextDecoder;let d="";function f(){return l.read().then(({done:p,value:v})=>{if(p){r();return}d+=c.decode(v,{stream:!0});const w=d.split(`
`);d=w.pop()??"";for(const g of w)if(g.startsWith("data: ")){const A=g.slice(6);if(A==="[DONE]"){r();return}try{const m=JSON.parse(A);t(m)}catch{}}return f()})}return f()}).catch(s=>n((s==null?void 0:s.message)||String(s)))}function dc(e,{onProgress:t,onError:n}){const r=Nr();if(r&&r.PullModel&&window.runtime){window.runtime.EventsOn("pull:progress",i=>{try{t(i)}catch{}}),window.runtime.EventsOn("pull:error",i=>{try{n(String(i))}catch{}}),r.PullModel(e);return}const a=JSON.stringify({model:e,stream:!0});fetch("/api/pull",{method:"POST",headers:{"Content-Type":"application/json"},body:a}).then(i=>{if(!i.ok){i.text().then(f=>n(f||`HTTP ${i.status}`)).catch(()=>n(`HTTP ${i.status}`));return}const s=i.body.getReader(),l=new TextDecoder;let c="";function d(){return s.read().then(({done:f,value:p})=>{if(f)return;c+=l.decode(p,{stream:!0});const v=c.split(`
`);c=v.pop()??"";for(const w of v)if(w.trim())try{t(JSON.parse(w))}catch{}return d()})}return d()}).catch(i=>n((i==null?void 0:i.message)||String(i)))}function uc(e,{onEvent:t,onError:n,onDone:r}){const a=new AbortController,i=JSON.stringify(e);return fetch("/v1/agent/run",{method:"POST",headers:{"Content-Type":"application/json"},body:i,signal:a.signal}).then(s=>{if(!s.ok){s.text().then(p=>n(p||`HTTP ${s.status}`)).catch(()=>n(`HTTP ${s.status}`));return}const l=s.body.getReader(),c=new TextDecoder;let d="";function f(){return l.read().then(({done:p,value:v})=>{if(p){r();return}d+=c.decode(v,{stream:!0});const w=d.split(`
`);d=w.pop()??"";for(const g of w)if(g.startsWith("data: ")){const A=g.slice(6).trim();if(A==="[DONE]"){r();return}try{const m=JSON.parse(A);t(m)}catch{}}return f()})}return f()}).catch(s=>{(s==null?void 0:s.name)!=="AbortError"&&n((s==null?void 0:s.message)||String(s))}),{cancel:()=>a.abort()}}async function fc(e,t){const n=await fetch("/v1/agent/approve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:e,approved:t})});if(!n.ok){const r=await n.text();throw new Error(r||`agentApprove: HTTP ${n.status}`)}}async function vc(e,t){const n=await fetch("/v1/agent/crabtable/response",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:e,result:t})});if(!n.ok){const r=await n.text();throw new Error(r||`agentCrabTableResponse: HTTP ${n.status}`)}}async function pc(){try{const e=await fetch("/v1/agent/paths");if(!e.ok)return[];const t=await e.json();return Array.isArray(t==null?void 0:t.paths)?t.paths:[]}catch{return[]}}async function hc(e){const t=Nr();if(t&&t.LoadModel){await t.LoadModel(e);return}const n=await fetch("/models/load",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:e})});if(!n.ok){const r=await n.text();throw new Error(r||`HTTP ${n.status}`)}}var _c=T("<span> </span>"),gc=T("<span>Single agent</span>"),mc=T('<div><div><div class="avatar svelte-126kodk"><!></div> <div class="bubble-wrapper svelte-126kodk"><div class="bubble svelte-126kodk"> </div> <div class="bubble-actions svelte-126kodk"><button class="action-btn svelte-126kodk"><!></button></div></div></div></div>'),yc=T('<div class="message-wrapper svelte-126kodk"><div class="message assistant thinking svelte-126kodk"><div class="avatar svelte-126kodk"><!></div> <div class="bubble thinking-bubble svelte-126kodk"><div class="dot-loader svelte-126kodk"></div></div></div></div>'),bc=T('<div class="chat-space animate-fade svelte-126kodk"><header class="chat-header glass svelte-126kodk"><div class="model-info svelte-126kodk"><div></div> <span class="model-name svelte-126kodk"> </span> <!></div> <div><!> <!></div> <div class="header-actions"><button class="icon-btn svelte-126kodk" title="Clear Chat"><!></button></div></header> <div class="messages-container svelte-126kodk"><!> <!></div> <div class="input-area svelte-126kodk"><div><textarea class="svelte-126kodk"></textarea> <div class="input-footer svelte-126kodk"><div class="input-hints svelte-126kodk"><!> <span>Local Engine Ready</span></div> <button class="send-btn svelte-126kodk"><!></button></div></div> <p class="disclaimer svelte-126kodk">Private. Local. Edge-native.</p></div></div>');function $c(e,t){Et(t,!0);let n=j(De([{role:"assistant",content:"Welcome to AI Space. I am the Cheesecrab Engine. How can I assist you today?"}])),r=j(""),a=j(!1),i=j(!1),s=j(null),l=j(null),c=j(De({id:"Searching...",status:"idle"})),d=j(De([]));async function f(){try{const x=await Ha();if(!Array.isArray(x)||x.length===0){$(c,{id:"No Active Model",status:"idle"},!0);return}const N=ne=>{var be;return((be=ne==null?void 0:ne.status)==null?void 0:be.value)??(ne==null?void 0:ne.status)},Z=x.find(ne=>N(ne)==="loaded");Z&&Z.id?$(c,{id:String(Z.id).split("/").pop().replace(/\.gguf$/i,""),status:"ready",rawId:Z.id},!0):$(c,{id:"No Active Model",status:"idle"},!0)}catch{$(c,{id:"No Active Model",status:"idle"},!0)}}async function p(){try{const x=await oc();$(d,Array.isArray(x)?x:[],!0)}catch{$(d,[],!0)}}sr(()=>{f(),p();const x=setInterval(()=>{f(),p()},3e3);return()=>clearInterval(x)});function v(){o(s)&&(o(s).scrollTop=o(s).scrollHeight)}Xt(()=>{o(n).length,setTimeout(v,50)});function w(){if(!o(r).trim()||o(a)||o(i))return;if(o(c).status!=="ready"){alert("Please load a model in the Plugin Store first.");return}const x=o(r);$(n,[...o(n),{role:"user",content:x}],!0),$(r,""),$(a,!0),cc({model:o(c).rawId,messages:o(n).map(N=>({role:N.role,content:N.content}))},{onToken:N=>{var ne,be,$e;$(a,!1);const Z=(($e=(be=(ne=N.choices)==null?void 0:ne[0])==null?void 0:be.delta)==null?void 0:$e.content)||"";if(Z){const de=o(n)[o(n).length-1];de&&de.role==="assistant"&&o(i)?(de.content+=Z,$(n,[...o(n)],!0)):($(n,[...o(n),{role:"assistant",content:Z}],!0),$(i,!0))}},onError:N=>{$(a,!1),$(i,!1),$(n,[...o(n),{role:"assistant",content:`Error: ${N}`}],!0)},onDone:()=>{$(a,!1),$(i,!1)}})}function g(){$(n,[{role:"assistant",content:"Chat cleared. How can I help you now?"}],!0)}function A(x,N){navigator.clipboard.writeText(x),$(l,N,!0),setTimeout(()=>$(l,null),2e3)}var m=bc(),y=u(m),P=u(y),C=u(P);let k;var z=b(C,2),q=u(z),O=b(z,2);Lr(O,{size:14});var M=b(P,2);let F;var Y=u(M);ps(Y,{size:14});var ce=b(Y,2);{var _e=x=>{var N=_c(),Z=u(N);te(()=>K(Z,`${o(d).length??""} agents in swarm`)),_(x,N)},Q=x=>{var N=gc();_(x,N)};X(ce,x=>{o(d).length>0?x(_e):x(Q,-1)})}var fe=b(M,2),Ne=u(fe),Ve=u(Ne);$i(Ve,{size:18});var He=b(y,2),nt=u(He);_n(nt,17,()=>o(n),mr,(x,N,Z)=>{var ne=mc();let be;var $e=u(ne),de=u($e),Ge=u(de);{var Ue=xe=>{cs(xe,{size:18})},vt=xe=>{Yo(xe,{size:18})};X(Ge,xe=>{o(N).role==="assistant"?xe(Ue):xe(vt,-1)})}var nn=b(de,2),pt=u(nn),Ht=u(pt),rn=b(pt,2),Ze=u(rn),we=u(Ze);{var je=xe=>{wa(xe,{size:12,color:"var(--accent-primary)"})},St=xe=>{bi(xe,{size:12})};X(we,xe=>{o(l)===Z?xe(je):xe(St,-1)})}te(()=>{be=Ae(ne,1,"message-wrapper svelte-126kodk",null,be,{user:o(N).role==="user"}),Ae($e,1,`message ${o(N).role??""}`,"svelte-126kodk"),K(Ht,o(N).content)}),ae("click",Ze,()=>A(o(N).content,Z)),_(x,ne)});var ge=b(nt,2);{var Nt=x=>{var N=yc(),Z=u(N),ne=u(Z),be=u(ne);cs(be,{size:18}),_(x,N)};X(ge,x=>{o(a)&&x(Nt)})}Da(He,x=>$(s,x),()=>o(s));var en=b(He,2),rt=u(en);let Be;var Vt=u(rt),yn=b(Vt,2),In=u(yn),jn=u(In);ps(jn,{size:12});var tn=b(In,2),Ln=u(tn);qo(Ln,{size:18}),te(()=>{k=Ae(C,1,"status-indicator svelte-126kodk",null,k,{active:o(c).status==="ready"}),K(q,o(c).id),F=Ae(M,1,"swarm-info svelte-126kodk",null,F,{active:o(d).length>0}),Be=Ae(rt,1,"input-container glass svelte-126kodk",null,Be,{disabled:o(c).status!=="ready"}),gn(Vt,"placeholder",o(c).status==="ready"?"Ask anything...":"Load a model to start chat"),Vt.disabled=o(c).status!=="ready"||o(a)||o(i),tn.disabled=!o(r)||o(a)||o(i)||o(c).status!=="ready"}),ae("click",Ne,g),ae("keydown",Vt,x=>x.key==="Enter"&&!x.shiftKey&&(x.preventDefault(),w())),Vr(Vt,()=>o(r),x=>$(r,x)),ae("click",tn,w),_(e,m),At()}ar(["click","keydown"]);var wc=T('<div class="empty-state svelte-18mm1rx"><!> <p class="empty-title svelte-18mm1rx">Ready to run</p> <p class="empty-sub svelte-18mm1rx">Enter a goal below and press Run</p></div>'),xc=T('<div class="timeline-card thinking-card svelte-18mm1rx"><div class="card-icon spin svelte-18mm1rx"><!></div> <span class="card-label muted svelte-18mm1rx"> </span></div>'),kc=T('<div class="card-body svelte-18mm1rx"><p class="reasoning-text svelte-18mm1rx"> </p></div>'),Ec=T('<div class="timeline-card thought-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx" role="button" tabindex="0"><div class="card-icon svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx"> </span> <span class="card-plan muted svelte-18mm1rx"> </span> <div class="expand-icon svelte-18mm1rx"><!></div></div> <!></div>'),Ac=T('<span class="badge danger svelte-18mm1rx"><!> dangerous</span>'),Mc=T('<div class="card-body svelte-18mm1rx"><pre class="code-block svelte-18mm1rx"> </pre></div>'),Nc=T('<div class="timeline-card tool-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx" role="button" tabindex="0"><div class="card-icon svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx"><code class="svelte-18mm1rx"> </code></span> <!> <div class="expand-icon svelte-18mm1rx"><!></div></div> <!></div>'),Sc=T('<div class="approval-buttons svelte-18mm1rx"><button class="approve-btn svelte-18mm1rx"><!> Approve</button> <button class="deny-btn svelte-18mm1rx"><!> Deny</button></div>'),zc=T('<div class="approval-resolved muted svelte-18mm1rx"><!> Decision sent</div>'),Pc=T('<div class="timeline-card approval-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx"><div class="card-icon warning svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx">Approval required — <code class="svelte-18mm1rx"> </code></span></div> <div class="card-body svelte-18mm1rx"><p class="approval-msg svelte-18mm1rx">This tool is marked <strong>dangerous</strong> and requires your approval before running.</p> <pre class="code-block svelte-18mm1rx"> </pre> <!></div></div>'),Tc=T('<div class="card-body svelte-18mm1rx"><pre class="code-block svelte-18mm1rx"> </pre></div>'),Cc=T('<div class="timeline-card obs-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx" role="button" tabindex="0"><div class="card-icon svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx"> </span> <div class="expand-icon svelte-18mm1rx"><!></div></div> <!></div>'),Oc=T('<div class="timeline-card answer-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx"><div class="card-icon success svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx">Final Answer</span> <button class="icon-btn small svelte-18mm1rx" title="Copy"><!></button></div> <div class="card-body svelte-18mm1rx"><p class="answer-text svelte-18mm1rx"> </p></div></div>'),Ic=T('<div class="timeline-card error-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx"><div class="card-icon error svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx">Error</span></div> <div class="card-body svelte-18mm1rx"><p class="error-text svelte-18mm1rx"> </p></div></div>'),jc=T('<p class="history-empty svelte-18mm1rx">No completed runs yet.</p>'),Lc=T('<button class="history-item svelte-18mm1rx"><span> </span> <span class="history-goal svelte-18mm1rx"> </span></button>'),Rc=T('<aside class="history-panel glass svelte-18mm1rx"><div class="history-header svelte-18mm1rx"><!> <span>Past Runs</span></div> <!></aside>'),Dc=T('<button class="stop-btn svelte-18mm1rx"><!></button>'),Fc=T('<button class="run-btn svelte-18mm1rx"><!></button>'),Vc=T('<div class="agent-space animate-fade svelte-18mm1rx"><header class="agent-header glass svelte-18mm1rx"><div class="header-left svelte-18mm1rx"><!> <span class="header-title brand-font svelte-18mm1rx">Agent Engine</span></div> <div class="model-status svelte-18mm1rx"><div></div> <span class="model-name svelte-18mm1rx"> </span></div> <div class="header-actions svelte-18mm1rx"><button title="Run history"><!></button> <button class="icon-btn svelte-18mm1rx" title="Clear timeline"><!></button></div></header> <div class="workspace svelte-18mm1rx"><div class="timeline-column svelte-18mm1rx"><!> <!></div> <!></div> <div class="input-area svelte-18mm1rx"><div class="options-row svelte-18mm1rx"><label class="option-label svelte-18mm1rx">Strategy <select class="option-select svelte-18mm1rx"><option>ReAct</option><option>Function Calling</option></select></label> <label class="option-label svelte-18mm1rx">Max steps <input class="option-input svelte-18mm1rx" type="number" min="1" max="50"/></label></div> <div><textarea class="goal-input svelte-18mm1rx"></textarea> <div class="goal-footer svelte-18mm1rx"><div class="goal-hints svelte-18mm1rx"><!> <span> </span></div> <!></div></div> <p class="disclaimer svelte-18mm1rx">Agent has access to your filesystem and shell. Review dangerous tool approvals carefully.</p></div></div>');function Hc(e,t){Et(t,!0);let n=j(""),r=j("react"),a=j(20),i=j(De({id:"Searching...",status:"idle",rawId:""})),s=j(!1),l=j(null),c=j(null),d=j(De([])),f=j(De([])),p=j(!1),v=j(null),w=j(null);async function g(){try{const S=await Ha(),E=ke=>{var re;return((re=ke==null?void 0:ke.status)==null?void 0:re.value)??(ke==null?void 0:ke.status)},me=Array.isArray(S)?S.find(ke=>E(ke)==="loaded"):null;me!=null&&me.id?$(i,{id:String(me.id).split("/").pop().replace(/\.gguf$/i,""),status:"ready",rawId:me.id},!0):$(i,{id:"No Model Loaded",status:"idle",rawId:""},!0)}catch{$(i,{id:"No Model Loaded",status:"idle",rawId:""},!0)}}sr(()=>{g(),A();const S=setInterval(g,5e3),E=async me=>{const{sessionId:ke,result:re}=me.detail;if(ke===o(l)||!o(l))try{await vc(ke,re)}catch(ve){console.warn("crabtable response error:",ve)}};return window.addEventListener("crabtable-external-res",E),()=>{clearInterval(S),window.removeEventListener("crabtable-external-res",E)}});async function A(){$(f,await pc(),!0)}function m(){if(!o(n).trim()||o(s))return;if(o(i).status!=="ready"){alert("Please load a model in the Plugin Store first.");return}$(d,[],!0),$(l,null),$(v,null),$(s,!0);const{cancel:S}=uc({goal:o(n).trim(),model:o(i).rawId,strategy:o(r),max_steps:o(a)},{onEvent:P,onError:E=>{$(s,!1),$(d,[...o(d),{type:"error",step:-1,payload:E,id:z()}],!0)},onDone:()=>{$(s,!1),A()}});$(c,S,!0)}function y(){o(c)&&o(c)(),$(s,!1),$(c,null),$(d,[...o(d),{type:"error",step:-1,payload:"Run cancelled by user.",id:z()}],!0)}function P(S){if(S.type==="session_start"){$(l,S.session_id??S.payload??null,!0);return}if(S.type!=="stream_token"){if(S.type==="thinking"){$(d,[...o(d).filter(E=>!(E.type==="thinking"&&E.step===S.step)),{...S,id:z()}],!0);return}if(S.type==="approval_required"){const E=S.payload??{};$(v,{toolName:E.tool??"?",args:E.args??{},step:S.step},!0)}if(["thought","tool_call","observation","final_answer","approval_required"].includes(S.type)&&$(d,o(d).filter(E=>!(E.type==="thinking"&&E.step===S.step)),!0),S.type==="crabtable_req"){const E=S.payload??{};window.dispatchEvent(new CustomEvent("crabtable-external-req",{detail:{tc:E,sessionId:o(l)}}))}$(d,[...o(d),{...S,id:z()}],!0)}}async function C(S){if(o(l)){try{await fc(o(l),S)}catch(E){console.warn("approve error:",E)}$(v,null)}}let k=0;function z(){return++k}function q(S){try{return JSON.stringify(S,null,2)}catch{return String(S)}}function O(){$(d,[],!0),$(l,null),$(v,null)}let M=j(De(new Set));function F(S){const E=new Set(o(M));E.has(S)?E.delete(S):E.add(S),$(M,E,!0)}let Y=j(null);function ce(S,E){navigator.clipboard.writeText(S),$(Y,E,!0),setTimeout(()=>$(Y,null),2e3)}var _e=Vc(),Q=u(_e),fe=u(Q),Ne=u(fe);$a(Ne,{size:20,color:"var(--accent-primary)"});var Ve=b(fe,2),He=u(Ve);let nt;var ge=b(He,2),Nt=u(ge),en=b(Ve,2),rt=u(en);let Be;var Vt=u(rt);vs(Vt,{size:18});var yn=b(rt,2),In=u(yn);$i(In,{size:18});var jn=b(Q,2),tn=u(jn),Ln=u(tn);{var x=S=>{var E=wc(),me=u(E);$a(me,{size:48,color:"var(--text-tertiary)"}),_(S,E)};X(Ln,S=>{o(d).length===0&&!o(s)&&S(x)})}var N=b(Ln,2);_n(N,17,()=>o(d),S=>S.id,(S,E)=>{var me=L(),ke=I(me);{var re=ee=>{var se=xc(),ie=u(se),le=u(ie);Lo(le,{size:16});var Se=b(ie,2),Ce=u(Se);te(()=>K(Ce,`Thinking — step ${o(E).step+1}`)),_(ee,se)},ve=ee=>{const se=Le(()=>o(E).payload??{});var ie=Ec(),le=u(ie),Se=u(le),Ce=u(Se);jo(Ce,{size:16});var qe=b(Se,2),ht=u(qe),Tt=b(qe,2),Ct=u(Tt),Ot=b(Tt,2),Gt=u(Ot);{var We=ze=>{Lr(ze,{size:14})},bn=Le(()=>o(M).has(o(E).id)),$n=ze=>{aa(ze,{size:14})};X(Gt,ze=>{o(bn)?ze(We):ze($n,-1)})}var oe=b(le,2);{var at=ze=>{var pe=kc(),Ut=u(pe),ir=u(Ut);te(()=>K(ir,o(se).reasoning??"")),_(ze,pe)},_t=Le(()=>o(M).has(o(E).id));X(oe,ze=>{o(_t)&&ze(at)})}te(()=>{K(ht,o(se).is_final?"Final reasoning":`Thought — step ${o(E).step+1}`),K(Ct,o(se).plan??"")}),ae("click",le,()=>F(o(E).id)),ae("keydown",le,ze=>ze.key==="Enter"&&F(o(E).id)),_(ee,ie)},qt=ee=>{const se=Le(()=>o(E).payload??{});var ie=Nc(),le=u(ie),Se=u(le),Ce=u(Se);Jo(Ce,{size:16});var qe=b(Se,2),ht=u(qe),Tt=u(ht),Ct=b(qe,2);{var Ot=pe=>{var Ut=Ac(),ir=u(Ut);hs(ir,{size:11}),_(pe,Ut)};X(Ct,pe=>{o(se).dangerous&&pe(Ot)})}var Gt=b(Ct,2),We=u(Gt);{var bn=pe=>{Lr(pe,{size:14})},$n=Le(()=>o(M).has(o(E).id)),oe=pe=>{aa(pe,{size:14})};X(We,pe=>{o($n)?pe(bn):pe(oe,-1)})}var at=b(le,2);{var _t=pe=>{var Ut=Mc(),ir=u(Ut),wi=u(ir);te(xi=>K(wi,xi),[()=>q(o(se).args??{})]),_(pe,Ut)},ze=Le(()=>o(M).has(o(E).id));X(at,pe=>{o(ze)&&pe(_t)})}te(()=>K(Tt,o(se).tool??"?")),ae("click",le,()=>F(o(E).id)),ae("keydown",le,pe=>pe.key==="Enter"&&F(o(E).id)),_(ee,ie)},zt=ee=>{const se=Le(()=>o(E).payload??{});var ie=Pc(),le=u(ie),Se=u(le),Ce=u(Se);hs(Ce,{size:16});var qe=b(Se,2),ht=b(u(qe)),Tt=u(ht),Ct=b(le,2),Ot=b(u(Ct),2),Gt=u(Ot),We=b(Ot,2);{var bn=oe=>{var at=Sc(),_t=u(at),ze=u(_t);wa(ze,{size:14});var pe=b(_t,2),Ut=u(pe);Zo(Ut,{size:14}),ae("click",_t,()=>C(!0)),ae("click",pe,()=>C(!1)),_(oe,at)},$n=oe=>{var at=zc(),_t=u(at);us(_t,{size:14}),_(oe,at)};X(We,oe=>{o(v)&&o(v).step===o(E).step?oe(bn):oe($n,-1)})}te(oe=>{K(Tt,o(se).tool??"?"),K(Gt,oe)},[()=>q(o(se).args??{})]),_(ee,ie)},an=ee=>{var se=Cc(),ie=u(se),le=u(ie),Se=u(le);Oo(Se,{size:16});var Ce=b(le,2),qe=u(Ce),ht=b(Ce,2),Tt=u(ht);{var Ct=oe=>{Lr(oe,{size:14})},Ot=Le(()=>o(M).has(o(E).id)),Gt=oe=>{aa(oe,{size:14})};X(Tt,oe=>{o(Ot)?oe(Ct):oe(Gt,-1)})}var We=b(ie,2);{var bn=oe=>{var at=Tc(),_t=u(at),ze=u(_t);te(()=>K(ze,o(E).payload??"")),_(oe,at)},$n=Le(()=>o(M).has(o(E).id));X(We,oe=>{o($n)&&oe(bn)})}te(()=>K(qe,`Observation — step ${o(E).step+1}`)),ae("click",ie,()=>F(o(E).id)),ae("keydown",ie,oe=>oe.key==="Enter"&&F(o(E).id)),_(ee,se)},Pt=ee=>{var se=Oc(),ie=u(se),le=u(ie),Se=u(le);us(Se,{size:16});var Ce=b(le,4),qe=u(Ce);{var ht=We=>{wa(We,{size:12})},Tt=We=>{bi(We,{size:12})};X(qe,We=>{o(Y)===o(E).id?We(ht):We(Tt,-1)})}var Ct=b(ie,2),Ot=u(Ct),Gt=u(Ot);te(()=>K(Gt,o(E).payload??"")),ae("click",Ce,()=>ce(o(E).payload??"",o(E).id)),_(ee,se)},Bt=ee=>{var se=Ic(),ie=u(se),le=u(ie),Se=u(le);Co(Se,{size:16});var Ce=b(ie,2),qe=u(Ce),ht=u(qe);te(()=>K(ht,o(E).payload??"")),_(ee,se)};X(ke,ee=>{o(E).type==="thinking"?ee(re):o(E).type==="thought"?ee(ve,1):o(E).type==="tool_call"?ee(qt,2):o(E).type==="approval_required"?ee(zt,3):o(E).type==="observation"?ee(an,4):o(E).type==="final_answer"?ee(Pt,5):o(E).type==="error"&&ee(Bt,6)})}_(S,me)});var Z=b(tn,2);{var ne=S=>{var E=Rc(),me=u(E),ke=u(me);vs(ke,{size:14});var re=b(me,2);{var ve=zt=>{var an=jc();_(zt,an)},qt=zt=>{var an=L(),Pt=I(an);_n(Pt,17,()=>[...o(f)].reverse(),mr,(Bt,ee)=>{var se=Lc(),ie=u(se);let le;var Se=u(ie),Ce=b(ie,2),qe=u(Ce);te(()=>{le=Ae(ie,1,"history-status svelte-18mm1rx",null,le,{done:o(ee).status==="completed",fail:o(ee).status!=="completed"}),K(Se,o(ee).status==="completed"?"✓":"✗"),K(qe,o(ee).goal)}),ae("click",se,()=>{$(n,o(ee).goal,!0),$(p,!1)}),_(Bt,se)}),_(zt,an)};X(re,zt=>{o(f).length===0?zt(ve):zt(qt,-1)})}_(S,E)};X(Z,S=>{o(p)&&S(ne)})}var be=b(jn,2),$e=u(be),de=u($e),Ge=b(u(de)),Ue=u(Ge);Ue.value=Ue.__value="react";var vt=b(Ue);vt.value=vt.__value="function_calling";var nn=b(de,2),pt=b(u(nn)),Ht=b($e,2);let rn;var Ze=u(Ht);Da(Ze,S=>$(w,S),()=>o(w));var we=b(Ze,2),je=u(we),St=u(je);Ko(St,{size:12});var xe=b(St,2),Sr=u(xe),Yr=b(je,2);{var zr=S=>{var E=Dc(),me=u(E);To(me,{size:18}),ae("click",E,y),_(S,E)},Jr=S=>{var E=Fc(),me=u(E);Vo(me,{size:18}),te(ke=>E.disabled=ke,[()=>!o(n).trim()||o(i).status!=="ready"]),ae("click",E,m),_(S,E)};X(Yr,S=>{o(s)?S(zr):S(Jr,-1)})}te(()=>{nt=Ae(He,1,"status-dot svelte-18mm1rx",null,nt,{active:o(i).status==="ready"}),K(Nt,o(i).id),Be=Ae(rt,1,"icon-btn svelte-18mm1rx",null,Be,{active:o(p)}),yn.disabled=o(s),Ge.disabled=o(s),pt.disabled=o(s),rn=Ae(Ht,1,"goal-container glass svelte-18mm1rx",null,rn,{disabled:o(i).status!=="ready"}),gn(Ze,"placeholder",o(i).status==="ready"?'Describe your goal… e.g. "List all Go files and count lines"':"Load a model in Plugin Store to start"),Ze.disabled=o(i).status!=="ready"||o(s),K(Sr,`Local · Private · ${o(r)==="react"?"ReAct":"Function Calling"}`)}),ae("click",rt,()=>{$(p,!o(p)),o(p)&&A()}),ae("click",yn,O),ho(Ge,()=>o(r),S=>$(r,S)),Vr(pt,()=>o(a),S=>$(a,S)),ae("keydown",Ze,S=>S.key==="Enter"&&!S.shiftKey&&(S.preventDefault(),m())),Vr(Ze,()=>o(n),S=>$(n,S)),_(e,_e),At()}ar(["click","keydown"]);var qc=T("<!> <span>Pulling…</span>",1),Bc=T("<!> <span>Pull</span>",1),Gc=T('<span class="prog-pct svelte-rgdxjf"> </span>'),Uc=T('<div><div class="progress-meta svelte-rgdxjf"><span class="prog-status svelte-rgdxjf"><!></span> <!></div> <div class="progress-bar svelte-rgdxjf"><div class="progress-fill svelte-rgdxjf"></div></div></div>'),Wc=T('<div class="error-banner svelte-rgdxjf"><!> <span> </span></div>'),Kc=T('<div class="empty-state svelte-rgdxjf"><!> <p class="svelte-rgdxjf">Scanning storage…</p></div>'),Yc=T('<div class="empty-state svelte-rgdxjf"><!> <h3 class="svelte-rgdxjf">No models found</h3> <p class="svelte-rgdxjf">Pull a model above to get started.</p></div>'),Jc=T('<div class="engine-ready svelte-rgdxjf"><!> <span>Ready for inference</span></div>'),Zc=T("<!> <span>Starting engine…</span>",1),Xc=T("<!> <span>Load Engine</span>",1),Qc=T('<button class="btn-load svelte-rgdxjf"><!></button>'),ed=T('<div class="model-card surface-card svelte-rgdxjf"><div class="card-top svelte-rgdxjf"><span><!></span> <span class="model-size svelte-rgdxjf"> </span></div> <div class="model-name svelte-rgdxjf"> </div> <div class="model-source svelte-rgdxjf"> </div> <div class="card-footer svelte-rgdxjf"><!></div></div>'),td=T('<div class="error-banner svelte-rgdxjf" style="margin-top:1rem"><!> <span> </span></div>'),nd=T('<div class="models-grid svelte-rgdxjf"></div> <!>',1),rd=T('<div class="models-view animate-fade svelte-rgdxjf"><header class="page-header svelte-rgdxjf"><div class="header-content"><h1 class="brand-font svelte-rgdxjf">Models</h1> <p class="svelte-rgdxjf">Pull GGUF models and manage the local inference engine.</p></div> <div class="stat-pill svelte-rgdxjf"><!> <span> </span></div></header> <section class="section svelte-rgdxjf"><div class="section-title svelte-rgdxjf"><!> <h2 class="svelte-rgdxjf">Pull Model</h2></div> <div class="surface-card pull-card svelte-rgdxjf"><p class="hint-text svelte-rgdxjf">Paste a HuggingFace URL (<code class="svelte-rgdxjf">/blob/</code> or <code class="svelte-rgdxjf">/resolve/</code>) or an Ollama tag.</p> <div class="input-row svelte-rgdxjf"><div class="input-wrap svelte-rgdxjf"><!> <input type="text" placeholder="https://huggingface.co/…/model.gguf" class="svelte-rgdxjf"/></div> <button class="btn-primary svelte-rgdxjf"><!></button></div> <!> <!></div></section> <section class="section svelte-rgdxjf"><div class="section-title svelte-rgdxjf"><!> <h2 class="svelte-rgdxjf">Local Models</h2></div> <!></section> <div class="footer-hint svelte-rgdxjf"><!> <span>Models are stored in <code class="svelte-rgdxjf">~/.cheesecrab/models/</code></span></div></div>');function ad(e,t){Et(t,!0);let n=j(De([])),r=j(!0),a=j(null),i=j(null),s=j(""),l=j(null),c=j(null),d=j(!1);async function f(){try{const x=await Ha();$(n,x||[],!0)}catch{}finally{$(r,!1)}}Xt(()=>{f();const x=setInterval(f,5e3);return()=>clearInterval(x)});function p(x){const N=x.trim();return N.includes("huggingface.co")?N.replace("/blob/","/resolve/").replace("/tree/","/resolve/"):N}function v(x){return x?x<1024?`${x} B`:x<1024**2?`${(x/1024).toFixed(1)} KB`:x<1024**3?`${(x/1024**2).toFixed(1)} MB`:`${(x/1024**3).toFixed(2)} GB`:""}function w(){if(!o(s)||o(d))return;const x=p(o(s));$(c,null),$(l,{status:"connecting",completed:0,total:0},!0),$(d,!0),dc(x,{onProgress:N=>{$(l,N,!0),(N==null?void 0:N.status)==="success"?($(d,!1),setTimeout(()=>{$(l,null),f()},1500)):(N==null?void 0:N.status)==="error"&&($(c,N.error??"Download failed",!0),$(d,!1),$(l,null))},onError:N=>{$(c,N,!0),$(d,!1),$(l,null)}})}async function g(x){if(!o(a)){$(a,x,!0),$(i,null);try{await hc(x),await f()}catch(N){$(i,(N==null?void 0:N.message)??String(N),!0)}finally{$(a,null)}}}var A=rd(),m=u(A),y=b(u(m),2),P=u(y);Va(P,{size:14});var C=b(P,2),k=u(C),z=b(m,2),q=u(z),O=u(q);fs(O,{size:18});var M=b(q,2),F=b(u(M),2),Y=u(F),ce=u(Y);Ho(ce,{size:16,class:"input-icon"});var _e=b(ce,2),Q=b(Y,2),fe=u(Q);{var Ne=x=>{var N=qc(),Z=I(N);_r(Z,{size:16,class:"spin"}),_(x,N)},Ve=x=>{var N=Bc(),Z=I(N);fs(Z,{size:16}),_(x,N)};X(fe,x=>{o(d)?x(Ne):x(Ve,-1)})}var He=b(F,2);{var nt=x=>{const N=Le(()=>o(l).total>0?Math.round(o(l).completed/o(l).total*100):0),Z=Le(()=>o(l).status==="success");var ne=Uc();let be;var $e=u(ne),de=u($e),Ge=u(de);{var Ue=we=>{var je=Rn("✓ Download complete");_(we,je)},vt=we=>{var je=Rn("Connecting…");_(we,je)},nn=we=>{var je=Rn();te((St,xe)=>K(je,`${St??""}${xe??""}`),[()=>v(o(l).completed),()=>o(l).total>0?" / "+v(o(l).total):""]),_(we,je)};X(Ge,we=>{o(Z)?we(Ue):o(l).status==="connecting"?we(vt,1):we(nn,-1)})}var pt=b(de,2);{var Ht=we=>{var je=Gc(),St=u(je);te(()=>K(St,`${o(N)??""}%`)),_(we,je)};X(pt,we=>{o(l).total>0&&we(Ht)})}var rn=b($e,2),Ze=u(rn);te(()=>{be=Ae(ne,1,"progress-zone svelte-rgdxjf",null,be,{done:o(Z)}),Dr(Ze,`width:${(o(Z)?100:o(N))??""}%`)}),_(x,ne)};X(He,x=>{o(l)&&x(nt)})}var ge=b(He,2);{var Nt=x=>{var N=Wc(),Z=u(N);ds(Z,{size:16});var ne=b(Z,2),be=u(ne);te(()=>K(be,o(c))),_(x,N)};X(ge,x=>{o(c)&&x(Nt)})}var en=b(z,2),rt=u(en),Be=u(rt);Fa(Be,{size:18});var Vt=b(rt,2);{var yn=x=>{var N=Kc(),Z=u(N);_r(Z,{size:24,class:"spin"}),_(x,N)},In=x=>{var N=Yc(),Z=u(N);zo(Z,{size:32}),_(x,N)},jn=x=>{var N=nd(),Z=I(N);_n(Z,21,()=>o(n),$e=>$e.id,($e,de)=>{const Ge=Le(()=>o(de).status.value==="loaded"),Ue=Le(()=>o(a)===o(de).id);var vt=ed(),nn=u(vt),pt=u(nn);let Ht;var rn=u(pt);{var Ze=re=>{var ve=Rn("Starting…");_(re,ve)},we=re=>{var ve=Rn("Active");_(re,ve)},je=re=>{var ve=Rn("Standby");_(re,ve)};X(rn,re=>{o(Ue)?re(Ze):o(Ge)?re(we,1):re(je,-1)})}var St=b(pt,2),xe=u(St),Sr=b(nn,2),Yr=u(Sr),zr=b(Sr,2),Jr=u(zr),S=b(zr,2),E=u(S);{var me=re=>{var ve=Jc(),qt=u(ve);Po(qt,{size:14}),_(re,ve)},ke=re=>{var ve=Qc(),qt=u(ve);{var zt=Pt=>{var Bt=Zc(),ee=I(Bt);_r(ee,{size:14,class:"spin"}),_(Pt,Bt)},an=Pt=>{var Bt=Xc(),ee=I(Bt);Xo(ee,{size:14}),_(Pt,Bt)};X(qt,Pt=>{o(Ue)?Pt(zt):Pt(an,-1)})}te(()=>{ve.disabled=!!o(a),gn(ve,"title",o(a)&&!o(Ue)?"Another model is loading…":void 0)}),ae("click",ve,()=>g(o(de).id)),_(re,ve)};X(E,re=>{o(Ge)?re(me):re(ke,-1)})}te((re,ve,qt)=>{Ht=Ae(pt,1,"status-tag svelte-rgdxjf",null,Ht,{active:o(Ge),booting:o(Ue)}),K(xe,re),K(Yr,ve),K(Jr,qt)},[()=>v(o(de).size),()=>o(de).id.split("/").pop(),()=>o(de).id.includes("/")?o(de).id.split("/").slice(0,-1).join("/"):"Local"]),_($e,vt)});var ne=b(Z,2);{var be=$e=>{var de=td(),Ge=u(de);ds(Ge,{size:16});var Ue=b(Ge,2),vt=u(Ue);te(()=>K(vt,`Engine failed to start: ${o(i)??""}`)),_($e,de)};X(ne,$e=>{o(i)&&$e(be)})}_(x,N)};X(Vt,x=>{o(r)?x(yn):o(n).length===0?x(In,1):x(jn,-1)})}var tn=b(en,2),Ln=u(tn);Io(Ln,{size:12}),te(()=>{K(k,`${o(n).length??""} installed`),_e.disabled=o(d),Q.disabled=o(d)||!o(s)}),ae("keydown",_e,x=>x.key==="Enter"&&w()),Vr(_e,()=>o(s),x=>$(s,x)),ae("click",Q,w),_(e,A),At()}ar(["keydown","click"]);var sd=T('<div class="loading-state svelte-1kslagv"><!> <span>Syncing registry…</span></div>'),id=T('<div class="empty-state svelte-1kslagv"><!> <h3 class="svelte-1kslagv">No plugins available</h3> <p class="svelte-1kslagv">Check back later as the registry grows.</p></div>'),ld=T('<div class="plugin-card surface-card svelte-1kslagv"><div class="card-header svelte-1kslagv"><div class="plugin-identity svelte-1kslagv"><span class="plugin-name svelte-1kslagv"> </span> <span class="plugin-version svelte-1kslagv"> </span></div> <div class="plugin-icon-wrap svelte-1kslagv"><!></div></div> <p class="plugin-desc svelte-1kslagv"> </p> <div class="card-footer svelte-1kslagv"><span class="plugin-author svelte-1kslagv"> </span> <button class="btn-install svelte-1kslagv"><!></button></div></div>'),od=T('<div class="plugin-grid svelte-1kslagv"></div>'),cd=T('<div class="plugins-view animate-fade svelte-1kslagv"><header class="page-header svelte-1kslagv"><div class="header-content"><h1 class="brand-font svelte-1kslagv">Plugins</h1> <p class="svelte-1kslagv">Extend Cheesecrab with community-built modules and integrations.</p></div> <div class="stat-pill svelte-1kslagv"><!> <span> </span></div></header> <!></div>');function dd(e,t){Et(t,!0);let n=$t(t,"onPluginInstalled",3,()=>{}),r=j(De([])),a=j(!0),i=j(null);Xt(()=>{const y=setTimeout(()=>{$(r,[{id:"note",name:"CrabNote",description:"Zettelkasten-style neural notes with RAG auto-linking. Perfect for research.",author:"Cheesecrab Labs",version:"1.2.0",download_url:"https://example.com/plugins/crab-note.zip"},{id:"calendar",name:"CrabCalendar",description:"AI-first scheduling. It learns your peak focus hours and manages tasks.",author:"Cheesecrab Labs",version:"0.9.5",download_url:"https://example.com/plugins/crab-calendar.zip"}],!0),$(a,!1)},400);return()=>clearTimeout(y)});async function s(y){var P,C,k;if(!o(i)){$(i,y.id,!0);try{(k=(C=(P=window.go)==null?void 0:P.main)==null?void 0:C.App)!=null&&k.InstallPlugin?(await window.go.main.App.InstallPlugin(y.download_url),n()()):await new Promise(z=>setTimeout(z,1200))}catch(z){console.error("install plugin failed:",z)}finally{$(i,null)}}}var l=cd(),c=u(l),d=b(u(c),2),f=u(d);Hr(f,{size:14});var p=b(f,2),v=u(p),w=b(c,2);{var g=y=>{var P=sd(),C=u(P);_r(C,{size:22,class:"spin"}),_(y,P)},A=y=>{var P=id(),C=u(P);Fo(C,{size:36}),_(y,P)},m=y=>{var P=od();_n(P,21,()=>o(r),C=>C.id,(C,k)=>{var z=ld(),q=u(z),O=u(q),M=u(O),F=u(M),Y=b(M,2),ce=u(Y),_e=b(O,2),Q=u(_e);Hr(Q,{size:20});var fe=b(q,2),Ne=u(fe),Ve=b(fe,2),He=u(Ve),nt=u(He),ge=b(He,2),Nt=u(ge);{var en=Be=>{_r(Be,{size:14,class:"spin"})},rt=Be=>{So(Be,{size:14})};X(Nt,Be=>{o(i)===o(k).id?Be(en):Be(rt,-1)})}te(()=>{K(F,o(k).name),K(ce,`v${o(k).version??""}`),K(Ne,o(k).description),K(nt,`by ${o(k).author??""}`),ge.disabled=!!o(i),gn(ge,"title",o(i)===o(k).id?"Installing…":"Install"),gn(ge,"aria-label",`Install ${o(k).name??""}`)}),ae("click",ge,()=>s(o(k))),_(C,z)}),_(y,P)};X(w,y=>{o(a)?y(g):o(r).length===0?y(A,1):y(m,-1)})}te(()=>K(v,`${o(r).length??""} available`)),_(e,l),At()}ar(["click"]);var ud=T('<div class="view-container svelte-15jzpb1"><div id="luckysheet" class="svelte-15jzpb1"></div></div>');function fd(e,t){Et(t,!1),sr(()=>{const r=s=>new Promise((l,c)=>{const d=document.createElement("script");d.src=s,d.onload=l,d.onerror=c,document.head.appendChild(d)}),a=s=>{const l=document.createElement("link");l.rel="stylesheet",l.href=s,document.head.appendChild(l)},i="/crabtable/";a(i+"plugins/css/pluginsCss.css"),a(i+"plugins/plugins.css"),a(i+"css/luckysheet.css"),a(i+"assets/iconfont/iconfont.css"),(async()=>{try{await r(i+"plugins/js/plugin.js"),await r(i+"luckysheet.umd.js"),window.luckysheet.create({container:"luckysheet",title:"Crab Table",lang:"en",data:[{name:"Sheet1",color:"",status:"1",order:"0",data:[],config:{},index:0}]}),window.addEventListener("crabtable-external-req",s=>{const{tc:l,sessionId:c}=s.detail,{action:d,range:f,values:p,description:v}=l.args;let w="";try{switch(d){case"get_data":w=JSON.stringify(window.luckysheet.getluckysheetfile());break;case"set_data":window.luckysheet.setRangeValue(p,{range:f}),w="OK: Applied data to "+(f||"active range");break;case"clear":window.luckysheet.setRangeValue([],{range:"A1:Z100"}),w="OK: Cleared sheet";break;case"create_table":p&&p.length>0?(window.luckysheet.setRangeValue(p,{range:f||"A1"}),w="OK: Created table: "+(v||"untitled")):w="Error: Missing values for create_table";break;default:w="Error: Unknown action "+d}}catch(g){w="Error: "+g.message}window.dispatchEvent(new CustomEvent("crabtable-external-res",{detail:{sessionId:c,result:w}}))})}catch(s){console.error("Failed to load Luckysheet:",s)}})()}),yi();var n=ud();_(e,n),At()}var vd=T('<div class="loading svelte-3zvtg1"><span class="spinner svelte-3zvtg1">🦀</span> <p>Nibbling plugin files...</p></div>'),pd=T('<div class="plugin-host svelte-3zvtg1"><!></div>');function hd(e,t){Et(t,!0);let n=j(null),r=j(!1),a=j(null);sr(()=>{i()}),wo(()=>{l()});async function i(){const p=`script-plugin-${t.manifest.id}`;if(document.getElementById(p))$(r,!0),s();else{const v=document.createElement("script");v.id=p,v.type="module",v.src=`plugin://${t.manifest.id}/${t.manifest.main_js}`,v.onload=()=>{$(r,!0),s()},v.onerror=w=>{console.error(`Failed to load plugin script: ${t.manifest.id}`,w)},document.body.appendChild(v)}}function s(){if(!(!o(r)||!o(n))){o(n).innerHTML="";try{const p=document.createElement(t.manifest.entry_element);o(n).appendChild(p),$(a,p,!0),console.log(`Plugin mounted: ${t.manifest.id}`)}catch(p){console.error(`Failed to mount plugin component: ${t.manifest.entry_element}`,p)}}}function l(){o(a)&&o(a).parentNode&&o(a).parentNode.removeChild(o(a))}Xt(()=>{o(n)&&o(r)&&!o(a)&&s()});var c=pd(),d=u(c);{var f=p=>{var v=vd();_(p,v)};X(d,p=>{o(r)||p(f)})}Da(c,p=>$(n,p),()=>o(n)),_(e,c),At()}var _d=T('<div class="view-wrapper active svelte-1n46o8q"><!></div>'),gd=T('<main class="layout svelte-1n46o8q"><!> <div class="content-wrapper svelte-1n46o8q"><div class="main-content svelte-1n46o8q"><div><!></div> <div><!></div> <div><!></div> <div><!></div> <div><!></div> <!></div> <!></div></main>');function md(e,t){Et(t,!0);let n=j("chat"),r=j(De([])),a=j("dark");sr(()=>{const Q=localStorage.getItem("cheesecrab-theme")||"dark";$(a,Q,!0),document.documentElement.setAttribute("data-theme",o(a))});function i(){$(a,o(a)==="dark"?"light":"dark",!0),document.documentElement.setAttribute("data-theme",o(a)),localStorage.getItem("cheesecrab-theme",o(a))}Xt(()=>{window.go&&window.go.main&&window.go.main.App&&window.go.main.App.GetInstalledPlugins().then(Q=>{$(r,Q||[],!0)})});const s=Le(()=>o(r).find(Q=>Q.id===o(n)));var l=gd(),c=u(l);sc(c,{get installedPlugins(){return o(r)},get theme(){return o(a)},onToggleTheme:i,get activeView(){return o(n)},set activeView(Q){$(n,Q,!0)}});var d=b(c,2),f=u(d),p=u(f);let v;var w=u(p);$c(w,{});var g=b(p,2);let A;var m=u(g);Hc(m,{});var y=b(g,2);let P;var C=u(y);ad(C,{});var k=b(y,2);let z;var q=u(k);dd(q,{onPluginInstalled:()=>{var Q,fe,Ne;(Ne=(fe=(Q=window.go)==null?void 0:Q.main)==null?void 0:fe.App)==null||Ne.GetInstalledPlugins().then(Ve=>{$(r,Ve||[],!0)})}});var O=b(k,2);let M;var F=u(O);fd(F,{});var Y=b(O,2);{var ce=Q=>{var fe=_d(),Ne=u(fe);hd(Ne,{get manifest(){return o(s)}}),_(Q,fe)};X(Y,Q=>{o(s)&&Q(ce)})}var _e=b(f,2);lc(_e,{}),te(()=>{gn(l,"data-theme",o(a)),v=Ae(p,1,"view-wrapper svelte-1n46o8q",null,v,{active:o(n)==="chat"}),A=Ae(g,1,"view-wrapper svelte-1n46o8q",null,A,{active:o(n)==="agent"}),P=Ae(y,1,"view-wrapper svelte-1n46o8q",null,P,{active:o(n)==="models"}),z=Ae(k,1,"view-wrapper svelte-1n46o8q",null,z,{active:o(n)==="plugins"}),M=Ae(O,1,"view-wrapper svelte-1n46o8q",null,M,{active:o(n)==="crabtable"})}),_(e,l),At()}to(md,{target:document.getElementById("app")});

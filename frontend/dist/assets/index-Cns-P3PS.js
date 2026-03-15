var ki=Object.defineProperty;var qa=e=>{throw TypeError(e)};var Ei=(e,t,n)=>t in e?ki(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var gt=(e,t,n)=>Ei(e,typeof t!="symbol"?t+"":t,n),Xr=(e,t,n)=>t.has(e)||qa("Cannot "+n);var p=(e,t,n)=>(Xr(e,t,"read from private field"),n?n.call(e):t.get(e)),J=(e,t,n)=>t.has(e)?qa("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),U=(e,t,n,r)=>(Xr(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n),he=(e,t,n)=>(Xr(e,t,"access private method"),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const Ai=!1;var Ea=Array.isArray,Mi=Array.prototype.indexOf,Yn=Array.prototype.includes,Ur=Array.from,Ni=Object.defineProperty,dn=Object.getOwnPropertyDescriptor,ys=Object.getOwnPropertyDescriptors,Si=Object.prototype,zi=Array.prototype,Aa=Object.getPrototypeOf,Ba=Object.isExtensible;function cr(e){return typeof e=="function"}const Pi=()=>{};function Ti(e){return e()}function ia(e){for(var t=0;t<e.length;t++)e[t]()}function bs(){var e,t,n=new Promise((r,a)=>{e=r,t=a});return{promise:n,resolve:e,reject:t}}function Ci(e,t){if(Array.isArray(e))return e;if(!(Symbol.iterator in e))return Array.from(e);const n=[];for(const r of e)if(n.push(r),n.length===t)break;return n}const Me=2,Jn=4,kr=8,Ma=1<<24,mn=16,xt=32,Pn=64,la=128,ot=512,we=1024,Pe=2048,kt=4096,tt=8192,ct=16384,On=32768,oa=1<<25,vn=65536,Ga=1<<17,Oi=1<<18,nr=1<<19,$s=1<<20,Rt=1<<25,Tn=65536,ca=1<<21,Na=1<<22,un=1<<23,Dt=Symbol("$state"),ws=Symbol("legacy props"),Ii=Symbol(""),Wt=new class extends Error{constructor(){super(...arguments);gt(this,"name","StaleReactionError");gt(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var _s;const xs=!!((_s=globalThis.document)!=null&&_s.contentType)&&globalThis.document.contentType.includes("xml");function ks(e){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function ji(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function Li(e,t,n){throw new Error("https://svelte.dev/e/each_key_duplicate")}function Ri(e){throw new Error("https://svelte.dev/e/effect_in_teardown")}function Di(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function Fi(e){throw new Error("https://svelte.dev/e/effect_orphan")}function Vi(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Hi(e){throw new Error("https://svelte.dev/e/props_invalid_value")}function qi(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Bi(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function Gi(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function Ui(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}const Wi=1,Ki=2,Es=4,Yi=8,Ji=16,Zi=1,Xi=2,As=4,Qi=8,el=16,tl=1,nl=2,Ae=Symbol(),Ms="http://www.w3.org/1999/xhtml",rl="http://www.w3.org/2000/svg",al="@attach";function sl(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function il(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function Ns(e){return e===this.v}function ll(e,t){return e!=e?t==t:e!==t||e!==null&&typeof e=="object"||typeof e=="function"}function Ss(e){return!ll(e,this.v)}let rr=!1,ol=!1;function cl(){rr=!0}let de=null;function Zn(e){de=e}function Et(e,t=!1,n){de={p:de,i:!1,c:null,e:null,s:e,x:null,r:Y,l:rr&&!t?{s:null,u:null,$:[]}:null}}function At(e){var t=de,n=t.e;if(n!==null){t.e=null;for(var r of n)Xs(r)}return t.i=!0,de=t.p,{}}function ar(){return!rr||de!==null&&de.l===null}let xn=[];function zs(){var e=xn;xn=[],ia(e)}function Zt(e){if(xn.length===0&&!hr){var t=xn;queueMicrotask(()=>{t===xn&&zs()})}xn.push(e)}function dl(){for(;xn.length>0;)zs()}function Ps(e){var t=Y;if(t===null)return K.f|=un,e;if(!(t.f&On)&&!(t.f&Jn))throw e;cn(e,t)}function cn(e,t){for(;t!==null;){if(t.f&la){if(!(t.f&On))throw e;try{t.b.error(e);return}catch(n){e=n}}t=t.parent}throw e}const ul=-7169;function fe(e,t){e.f=e.f&ul|t}function Sa(e){e.f&ot||e.deps===null?fe(e,we):fe(e,kt)}function Ts(e){if(e!==null)for(const t of e)!(t.f&Me)||!(t.f&Tn)||(t.f^=Tn,Ts(t.deps))}function Cs(e,t,n){e.f&Pe?t.add(e):e.f&kt&&n.add(e),Ts(e.deps),fe(e,we)}let Pr=!1;function fl(e){var t=Pr;try{return Pr=!1,[e(),Pr]}finally{Pr=t}}const dr=new Set;let B=null,je=null,da=null,hr=!1,Qr=!1,Dn=null,Cr=null;var Ua=0;let vl=1;var Fn,Vn,Hn,qn,$r,it,Bn,ln,Kt,Gn,Re,ua,fa,va,pa,Os;const qr=class qr{constructor(){J(this,Re);gt(this,"id",vl++);gt(this,"current",new Map);gt(this,"previous",new Map);J(this,Fn,new Set);J(this,Vn,new Set);J(this,Hn,0);J(this,qn,0);J(this,$r,null);J(this,it,[]);J(this,Bn,new Set);J(this,ln,new Set);J(this,Kt,new Map);gt(this,"is_fork",!1);J(this,Gn,!1)}skip_effect(t){p(this,Kt).has(t)||p(this,Kt).set(t,{d:[],m:[]})}unskip_effect(t){var n=p(this,Kt).get(t);if(n){p(this,Kt).delete(t);for(var r of n.d)fe(r,Pe),this.schedule(r);for(r of n.m)fe(r,kt),this.schedule(r)}}capture(t,n){n!==Ae&&!this.previous.has(t)&&this.previous.set(t,n),t.f&un||(this.current.set(t,t.v),je==null||je.set(t,t.v))}activate(){B=this}deactivate(){B=null,je=null}flush(){try{if(Qr=!0,B=this,!he(this,Re,ua).call(this)){for(const t of p(this,Bn))p(this,ln).delete(t),fe(t,Pe),this.schedule(t);for(const t of p(this,ln))fe(t,kt),this.schedule(t)}he(this,Re,fa).call(this)}finally{Ua=0,da=null,Dn=null,Cr=null,Qr=!1,B=null,je=null,fn.clear()}}discard(){for(const t of p(this,Vn))t(this);p(this,Vn).clear()}increment(t){U(this,Hn,p(this,Hn)+1),t&&U(this,qn,p(this,qn)+1)}decrement(t,n){U(this,Hn,p(this,Hn)-1),t&&U(this,qn,p(this,qn)-1),!(p(this,Gn)||n)&&(U(this,Gn,!0),Zt(()=>{U(this,Gn,!1),this.flush()}))}oncommit(t){p(this,Fn).add(t)}ondiscard(t){p(this,Vn).add(t)}settled(){return(p(this,$r)??U(this,$r,bs())).promise}static ensure(){if(B===null){const t=B=new qr;Qr||(dr.add(B),hr||Zt(()=>{B===t&&t.flush()}))}return B}apply(){{je=null;return}}schedule(t){var a;if(da=t,(a=t.b)!=null&&a.is_pending&&t.f&(Jn|kr|Ma)&&!(t.f&On)){t.b.defer_effect(t);return}for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(Dn!==null&&n===Y&&(K===null||!(K.f&Me)))return;if(r&(Pn|xt)){if(!(r&we))return;n.f^=we}}p(this,it).push(n)}};Fn=new WeakMap,Vn=new WeakMap,Hn=new WeakMap,qn=new WeakMap,$r=new WeakMap,it=new WeakMap,Bn=new WeakMap,ln=new WeakMap,Kt=new WeakMap,Gn=new WeakMap,Re=new WeakSet,ua=function(){return this.is_fork||p(this,qn)>0},fa=function(){var l,c;Ua++>1e3&&hl();const t=p(this,it);U(this,it,[]),this.apply();var n=Dn=[],r=[],a=Cr=[];for(const d of t)try{he(this,Re,va).call(this,d,n,r)}catch(f){throw Rs(d),f}if(B=null,a.length>0){var i=qr.ensure();for(const d of a)i.schedule(d)}if(Dn=null,Cr=null,he(this,Re,ua).call(this)){he(this,Re,pa).call(this,r),he(this,Re,pa).call(this,n);for(const[d,f]of p(this,Kt))Ls(d,f)}else{p(this,Hn)===0&&dr.delete(this),p(this,Bn).clear(),p(this,ln).clear();for(const d of p(this,Fn))d(this);p(this,Fn).clear(),Wa(r),Wa(n),(l=p(this,$r))==null||l.resolve()}var s=B;if(p(this,it).length>0){const d=s??(s=this);p(d,it).push(...p(this,it).filter(f=>!p(d,it).includes(f)))}s!==null&&(dr.add(s),he(c=s,Re,fa).call(c)),dr.has(this)||he(this,Re,Os).call(this)},va=function(t,n,r){t.f^=we;for(var a=t.first;a!==null;){var i=a.f,s=(i&(xt|Pn))!==0,l=s&&(i&we)!==0,c=l||(i&tt)!==0||p(this,Kt).has(a);if(!c&&a.fn!==null){s?a.f^=we:i&Jn?n.push(a):Mr(a)&&(i&mn&&p(this,ln).add(a),er(a));var d=a.first;if(d!==null){a=d;continue}}for(;a!==null;){var f=a.next;if(f!==null){a=f;break}a=a.parent}}},pa=function(t){for(var n=0;n<t.length;n+=1)Cs(t[n],p(this,Bn),p(this,ln))},Os=function(){var c;for(const d of dr){var t=d.id<this.id,n=[];for(const[f,h]of this.current){if(d.current.has(f))if(t&&h!==d.current.get(f))d.current.set(f,h);else continue;n.push(f)}if(n.length!==0){var r=[...d.current.keys()].filter(f=>!this.current.has(f));if(r.length>0){d.activate();var a=new Set,i=new Map;for(var s of n)Is(s,r,a,i);if(p(d,it).length>0){d.apply();for(var l of p(d,it))he(c=d,Re,va).call(c,l,[],[])}d.deactivate()}}}};let Cn=qr;function pl(e){var t=hr;hr=!0;try{for(var n;;){if(dl(),B===null)return n;B.flush()}}finally{hr=t}}function hl(){try{Vi()}catch(e){cn(e,da)}}let mt=null;function Wa(e){var t=e.length;if(t!==0){for(var n=0;n<t;){var r=e[n++];if(!(r.f&(ct|tt))&&Mr(r)&&(mt=new Set,er(r),r.deps===null&&r.first===null&&r.nodes===null&&r.teardown===null&&r.ac===null&&ti(r),(mt==null?void 0:mt.size)>0)){fn.clear();for(const a of mt){if(a.f&(ct|tt))continue;const i=[a];let s=a.parent;for(;s!==null;)mt.has(s)&&(mt.delete(s),i.push(s)),s=s.parent;for(let l=i.length-1;l>=0;l--){const c=i[l];c.f&(ct|tt)||er(c)}}mt.clear()}}mt=null}}function Is(e,t,n,r){if(!n.has(e)&&(n.add(e),e.reactions!==null))for(const a of e.reactions){const i=a.f;i&Me?Is(a,t,n,r):i&(Na|mn)&&!(i&Pe)&&js(a,t,r)&&(fe(a,Pe),za(a))}}function js(e,t,n){const r=n.get(e);if(r!==void 0)return r;if(e.deps!==null)for(const a of e.deps){if(Yn.call(t,a))return!0;if(a.f&Me&&js(a,t,n))return n.set(a,!0),!0}return n.set(e,!1),!1}function za(e){B.schedule(e)}function Ls(e,t){if(!(e.f&xt&&e.f&we)){e.f&Pe?t.d.push(e):e.f&kt&&t.m.push(e),fe(e,we);for(var n=e.first;n!==null;)Ls(n,t),n=n.next}}function Rs(e){fe(e,we);for(var t=e.first;t!==null;)Rs(t),t=t.next}function _l(e){let t=0,n=pn(0),r;return()=>{Ca()&&(o(n),Ia(()=>(t===0&&(r=Qt(()=>e(()=>_r(n)))),t+=1,()=>{Zt(()=>{t-=1,t===0&&(r==null||r(),r=void 0,_r(n))})})))}}var gl=vn|nr;function ml(e,t,n,r){new yl(e,t,n,r)}var lt,ka,It,An,Ge,jt,Qe,yt,Yt,Mn,on,Un,Wn,Kn,Jt,Br,xe,bl,$l,wl,ha,Or,Ir,_a;class yl{constructor(t,n,r,a){J(this,xe);gt(this,"parent");gt(this,"is_pending",!1);gt(this,"transform_error");J(this,lt);J(this,ka,null);J(this,It);J(this,An);J(this,Ge);J(this,jt,null);J(this,Qe,null);J(this,yt,null);J(this,Yt,null);J(this,Mn,0);J(this,on,0);J(this,Un,!1);J(this,Wn,new Set);J(this,Kn,new Set);J(this,Jt,null);J(this,Br,_l(()=>(U(this,Jt,pn(p(this,Mn))),()=>{U(this,Jt,null)})));var i;U(this,lt,t),U(this,It,n),U(this,An,s=>{var l=Y;l.b=this,l.f|=la,r(s)}),this.parent=Y.b,this.transform_error=a??((i=this.parent)==null?void 0:i.transform_error)??(s=>s),U(this,Ge,sr(()=>{he(this,xe,ha).call(this)},gl))}defer_effect(t){Cs(t,p(this,Wn),p(this,Kn))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!p(this,It).pending}update_pending_count(t,n){he(this,xe,_a).call(this,t,n),U(this,Mn,p(this,Mn)+t),!(!p(this,Jt)||p(this,Un))&&(U(this,Un,!0),Zt(()=>{U(this,Un,!1),p(this,Jt)&&Xn(p(this,Jt),p(this,Mn))}))}get_effect_pending(){return p(this,Br).call(this),o(p(this,Jt))}error(t){var n=p(this,It).onerror;let r=p(this,It).failed;if(!n&&!r)throw t;p(this,jt)&&(ze(p(this,jt)),U(this,jt,null)),p(this,Qe)&&(ze(p(this,Qe)),U(this,Qe,null)),p(this,yt)&&(ze(p(this,yt)),U(this,yt,null));var a=!1,i=!1;const s=()=>{if(a){il();return}a=!0,i&&Ui(),p(this,yt)!==null&&Sn(p(this,yt),()=>{U(this,yt,null)}),he(this,xe,Ir).call(this,()=>{he(this,xe,ha).call(this)})},l=c=>{try{i=!0,n==null||n(c,s),i=!1}catch(d){cn(d,p(this,Ge)&&p(this,Ge).parent)}r&&U(this,yt,he(this,xe,Ir).call(this,()=>{try{return We(()=>{var d=Y;d.b=this,d.f|=la,r(p(this,lt),()=>c,()=>s)})}catch(d){return cn(d,p(this,Ge).parent),null}}))};Zt(()=>{var c;try{c=this.transform_error(t)}catch(d){cn(d,p(this,Ge)&&p(this,Ge).parent);return}c!==null&&typeof c=="object"&&typeof c.then=="function"?c.then(l,d=>cn(d,p(this,Ge)&&p(this,Ge).parent)):l(c)})}}lt=new WeakMap,ka=new WeakMap,It=new WeakMap,An=new WeakMap,Ge=new WeakMap,jt=new WeakMap,Qe=new WeakMap,yt=new WeakMap,Yt=new WeakMap,Mn=new WeakMap,on=new WeakMap,Un=new WeakMap,Wn=new WeakMap,Kn=new WeakMap,Jt=new WeakMap,Br=new WeakMap,xe=new WeakSet,bl=function(){try{U(this,jt,We(()=>p(this,An).call(this,p(this,lt))))}catch(t){this.error(t)}},$l=function(t){const n=p(this,It).failed;n&&U(this,yt,We(()=>{n(p(this,lt),()=>t,()=>()=>{})}))},wl=function(){const t=p(this,It).pending;t&&(this.is_pending=!0,U(this,Qe,We(()=>t(p(this,lt)))),Zt(()=>{var n=U(this,Yt,document.createDocumentFragment()),r=Ft();n.append(r),U(this,jt,he(this,xe,Ir).call(this,()=>We(()=>p(this,An).call(this,r)))),p(this,on)===0&&(p(this,lt).before(n),U(this,Yt,null),Sn(p(this,Qe),()=>{U(this,Qe,null)}),he(this,xe,Or).call(this,B))}))},ha=function(){try{if(this.is_pending=this.has_pending_snippet(),U(this,on,0),U(this,Mn,0),U(this,jt,We(()=>{p(this,An).call(this,p(this,lt))})),p(this,on)>0){var t=U(this,Yt,document.createDocumentFragment());Ra(p(this,jt),t);const n=p(this,It).pending;U(this,Qe,We(()=>n(p(this,lt))))}else he(this,xe,Or).call(this,B)}catch(n){this.error(n)}},Or=function(t){this.is_pending=!1;for(const n of p(this,Wn))fe(n,Pe),t.schedule(n);for(const n of p(this,Kn))fe(n,kt),t.schedule(n);p(this,Wn).clear(),p(this,Kn).clear()},Ir=function(t){var n=Y,r=K,a=de;ft(p(this,Ge)),ut(p(this,Ge)),Zn(p(this,Ge).ctx);try{return Cn.ensure(),t()}catch(i){return Ps(i),null}finally{ft(n),ut(r),Zn(a)}},_a=function(t,n){var r;if(!this.has_pending_snippet()){this.parent&&he(r=this.parent,xe,_a).call(r,t,n);return}U(this,on,p(this,on)+t),p(this,on)===0&&(he(this,xe,Or).call(this,n),p(this,Qe)&&Sn(p(this,Qe),()=>{U(this,Qe,null)}),p(this,Yt)&&(p(this,lt).before(p(this,Yt)),U(this,Yt,null)))};function Ds(e,t,n,r){const a=ar()?Er:Pa;var i=e.filter(v=>!v.settled);if(n.length===0&&i.length===0){r(t.map(a));return}var s=Y,l=xl(),c=i.length===1?i[0].promise:i.length>1?Promise.all(i.map(v=>v.promise)):null;function d(v){l();try{r(v)}catch(w){s.f&ct||cn(w,s)}Rr()}if(n.length===0){c.then(()=>d(t.map(a)));return}var f=Fs();function h(){Promise.all(n.map(v=>kl(v))).then(v=>d([...t.map(a),...v])).catch(v=>cn(v,s)).finally(()=>f())}c?c.then(()=>{l(),h(),Rr()}):h()}function xl(){var e=Y,t=K,n=de,r=B;return function(i=!0){ft(e),ut(t),Zn(n),i&&!(e.f&ct)&&(r==null||r.activate(),r==null||r.apply())}}function Rr(e=!0){ft(null),ut(null),Zn(null),e&&(B==null||B.deactivate())}function Fs(){var e=Y.b,t=B,n=e.is_rendered();return e.update_pending_count(1,t),t.increment(n),(r=!1)=>{e.update_pending_count(-1,t),t.decrement(n,r)}}function Er(e){var t=Me|Pe,n=K!==null&&K.f&Me?K:null;return Y!==null&&(Y.f|=nr),{ctx:de,deps:null,effects:null,equals:Ns,f:t,fn:e,reactions:null,rv:0,v:Ae,wv:0,parent:n??Y,ac:null}}function kl(e,t,n){let r=Y;r===null&&ji();var a=void 0,i=pn(Ae),s=!K,l=new Map;return Rl(()=>{var w;var c=Y,d=bs();a=d.promise;try{Promise.resolve(e()).then(d.resolve,d.reject).finally(Rr)}catch(m){d.reject(m),Rr()}var f=B;if(s){if(c.f&On)var h=Fs();if(r.b.is_rendered())(w=l.get(f))==null||w.reject(Wt),l.delete(f);else{for(const m of l.values())m.reject(Wt);l.clear()}l.set(f,d)}const v=(m,E=void 0)=>{if(h){var g=E===Wt;h(g)}if(!(E===Wt||c.f&ct)){if(f.activate(),E)i.f|=un,Xn(i,E);else{i.f&un&&(i.f^=un),Xn(i,m);for(const[y,C]of l){if(l.delete(y),y===f)break;C.reject(Wt)}}f.deactivate()}};d.promise.then(v,m=>v(null,m||"unknown"))}),Oa(()=>{for(const c of l.values())c.reject(Wt)}),new Promise(c=>{function d(f){function h(){f===a?c(i):d(a)}f.then(h,h)}d(a)})}function Ie(e){const t=Er(e);return ai(t),t}function Pa(e){const t=Er(e);return t.equals=Ss,t}function El(e){var t=e.effects;if(t!==null){e.effects=null;for(var n=0;n<t.length;n+=1)ze(t[n])}}function Al(e){for(var t=e.parent;t!==null;){if(!(t.f&Me))return t.f&ct?null:t;t=t.parent}return null}function Ta(e){var t,n=Y;ft(Al(e));try{e.f&=~Tn,El(e),t=oi(e)}finally{ft(n)}return t}function Vs(e){var t=Ta(e);if(!e.equals(t)&&(e.wv=ii(),(!(B!=null&&B.is_fork)||e.deps===null)&&(e.v=t,e.deps===null))){fe(e,we);return}hn||(je!==null?(Ca()||B!=null&&B.is_fork)&&je.set(e,t):Sa(e))}function Ml(e){var t,n;if(e.effects!==null)for(const r of e.effects)(r.teardown||r.ac)&&((t=r.teardown)==null||t.call(r),(n=r.ac)==null||n.abort(Wt),r.teardown=Pi,r.ac=null,yr(r,0),ja(r))}function Hs(e){if(e.effects!==null)for(const t of e.effects)t.teardown&&er(t)}let ga=new Set;const fn=new Map;let qs=!1;function pn(e,t){var n={f:0,v:e,reactions:null,equals:Ns,rv:0,wv:0};return n}function j(e,t){const n=pn(e);return ai(n),n}function Nl(e,t=!1,n=!0){var a;const r=pn(e);return t||(r.equals=Ss),rr&&n&&de!==null&&de.l!==null&&((a=de.l).s??(a.s=[])).push(r),r}function b(e,t,n=!1){K!==null&&(!wt||K.f&Ga)&&ar()&&K.f&(Me|mn|Na|Ga)&&(dt===null||!Yn.call(dt,e))&&Gi();let r=n?Le(t):t;return Xn(e,r,Cr)}function Xn(e,t,n=null){if(!e.equals(t)){var r=e.v;hn?fn.set(e,t):fn.set(e,r),e.v=t;var a=Cn.ensure();if(a.capture(e,r),e.f&Me){const i=e;e.f&Pe&&Ta(i),Sa(i)}e.wv=ii(),Bs(e,Pe,n),ar()&&Y!==null&&Y.f&we&&!(Y.f&(xt|Pn))&&(st===null?Vl([e]):st.push(e)),!a.is_fork&&ga.size>0&&!qs&&Sl()}return t}function Sl(){qs=!1;for(const e of ga)e.f&we&&fe(e,kt),Mr(e)&&er(e);ga.clear()}function Ka(e,t=1){var n=o(e),r=t===1?n++:n--;return b(e,n),r}function _r(e){b(e,e.v+1)}function Bs(e,t,n){var r=e.reactions;if(r!==null)for(var a=ar(),i=r.length,s=0;s<i;s++){var l=r[s],c=l.f;if(!(!a&&l===Y)){var d=(c&Pe)===0;if(d&&fe(l,t),c&Me){var f=l;je==null||je.delete(f),c&Tn||(c&ot&&(l.f|=Tn),Bs(f,kt,n))}else if(d){var h=l;c&mn&&mt!==null&&mt.add(h),n!==null?n.push(h):za(h)}}}}function Le(e){if(typeof e!="object"||e===null||Dt in e)return e;const t=Aa(e);if(t!==Si&&t!==zi)return e;var n=new Map,r=Ea(e),a=j(0),i=zn,s=l=>{if(zn===i)return l();var c=K,d=zn;ut(null),Qa(i);var f=l();return ut(c),Qa(d),f};return r&&n.set("length",j(e.length)),new Proxy(e,{defineProperty(l,c,d){(!("value"in d)||d.configurable===!1||d.enumerable===!1||d.writable===!1)&&qi();var f=n.get(c);return f===void 0?s(()=>{var h=j(d.value);return n.set(c,h),h}):b(f,d.value,!0),!0},deleteProperty(l,c){var d=n.get(c);if(d===void 0){if(c in l){const f=s(()=>j(Ae));n.set(c,f),_r(a)}}else b(d,Ae),_r(a);return!0},get(l,c,d){var w;if(c===Dt)return e;var f=n.get(c),h=c in l;if(f===void 0&&(!h||(w=dn(l,c))!=null&&w.writable)&&(f=s(()=>{var m=Le(h?l[c]:Ae),E=j(m);return E}),n.set(c,f)),f!==void 0){var v=o(f);return v===Ae?void 0:v}return Reflect.get(l,c,d)},getOwnPropertyDescriptor(l,c){var d=Reflect.getOwnPropertyDescriptor(l,c);if(d&&"value"in d){var f=n.get(c);f&&(d.value=o(f))}else if(d===void 0){var h=n.get(c),v=h==null?void 0:h.v;if(h!==void 0&&v!==Ae)return{enumerable:!0,configurable:!0,value:v,writable:!0}}return d},has(l,c){var v;if(c===Dt)return!0;var d=n.get(c),f=d!==void 0&&d.v!==Ae||Reflect.has(l,c);if(d!==void 0||Y!==null&&(!f||(v=dn(l,c))!=null&&v.writable)){d===void 0&&(d=s(()=>{var w=f?Le(l[c]):Ae,m=j(w);return m}),n.set(c,d));var h=o(d);if(h===Ae)return!1}return f},set(l,c,d,f){var O;var h=n.get(c),v=c in l;if(r&&c==="length")for(var w=d;w<h.v;w+=1){var m=n.get(w+"");m!==void 0?b(m,Ae):w in l&&(m=s(()=>j(Ae)),n.set(w+"",m))}if(h===void 0)(!v||(O=dn(l,c))!=null&&O.writable)&&(h=s(()=>j(void 0)),b(h,Le(d)),n.set(c,h));else{v=h.v!==Ae;var E=s(()=>Le(d));b(h,E)}var g=Reflect.getOwnPropertyDescriptor(l,c);if(g!=null&&g.set&&g.set.call(f,d),!v){if(r&&typeof c=="string"){var y=n.get("length"),C=Number(c);Number.isInteger(C)&&C>=y.v&&b(y,C+1)}_r(a)}return!0},ownKeys(l){o(a);var c=Reflect.ownKeys(l).filter(h=>{var v=n.get(h);return v===void 0||v.v!==Ae});for(var[d,f]of n)f.v!==Ae&&!(d in l)&&c.push(d);return c},setPrototypeOf(){Bi()}})}function Ya(e){try{if(e!==null&&typeof e=="object"&&Dt in e)return e[Dt]}catch{}return e}function zl(e,t){return Object.is(Ya(e),Ya(t))}var Ja,Gs,Us,Ws;function Pl(){if(Ja===void 0){Ja=window,Gs=/Firefox/.test(navigator.userAgent);var e=Element.prototype,t=Node.prototype,n=Text.prototype;Us=dn(t,"firstChild").get,Ws=dn(t,"nextSibling").get,Ba(e)&&(e.__click=void 0,e.__className=void 0,e.__attributes=null,e.__style=void 0,e.__e=void 0),Ba(n)&&(n.__t=void 0)}}function Ft(e=""){return document.createTextNode(e)}function Qn(e){return Us.call(e)}function Ar(e){return Ws.call(e)}function u(e,t){return Qn(e)}function I(e,t=!1){{var n=Qn(e);return n instanceof Comment&&n.data===""?Ar(n):n}}function $(e,t=1,n=!1){let r=e;for(;t--;)r=Ar(r);return r}function Tl(e){e.textContent=""}function Ks(){return!1}function Ys(e,t,n){return document.createElementNS(t??Ms,e,void 0)}function Cl(e,t){if(t){const n=document.body;e.autofocus=!0,Zt(()=>{document.activeElement===n&&e.focus()})}}let Za=!1;function Ol(){Za||(Za=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const n of e.target.elements)(t=n.__on_r)==null||t.call(n)})},{capture:!0}))}function Wr(e){var t=K,n=Y;ut(null),ft(null);try{return e()}finally{ut(t),ft(n)}}function Js(e,t,n,r=n){e.addEventListener(t,()=>Wr(n));const a=e.__on_r;a?e.__on_r=()=>{a(),r(!0)}:e.__on_r=()=>r(!0),Ol()}function Zs(e){Y===null&&(K===null&&Fi(),Di()),hn&&Ri()}function Il(e,t){var n=t.last;n===null?t.last=t.first=e:(n.next=e,e.prev=n,t.last=e)}function Mt(e,t){var n=Y;n!==null&&n.f&tt&&(e|=tt);var r={ctx:de,deps:null,nodes:null,f:e|Pe|ot,first:null,fn:t,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,wv:0,ac:null},a=r;if(e&Jn)Dn!==null?Dn.push(r):Cn.ensure().schedule(r);else if(t!==null){try{er(r)}catch(s){throw ze(r),s}a.deps===null&&a.teardown===null&&a.nodes===null&&a.first===a.last&&!(a.f&nr)&&(a=a.first,e&mn&&e&vn&&a!==null&&(a.f|=vn))}if(a!==null&&(a.parent=n,n!==null&&Il(a,n),K!==null&&K.f&Me&&!(e&Pn))){var i=K;(i.effects??(i.effects=[])).push(a)}return r}function Ca(){return K!==null&&!wt}function Oa(e){const t=Mt(kr,null);return fe(t,we),t.teardown=e,t}function Xt(e){Zs();var t=Y.f,n=!K&&(t&xt)!==0&&(t&On)===0;if(n){var r=de;(r.e??(r.e=[])).push(e)}else return Xs(e)}function Xs(e){return Mt(Jn|$s,e)}function jl(e){return Zs(),Mt(kr|$s,e)}function Ll(e){Cn.ensure();const t=Mt(Pn|nr,e);return(n={})=>new Promise(r=>{n.outro?Sn(t,()=>{ze(t),r(void 0)}):(ze(t),r(void 0))})}function Kr(e){return Mt(Jn,e)}function Rl(e){return Mt(Na|nr,e)}function Ia(e,t=0){return Mt(kr|t,e)}function ee(e,t=[],n=[],r=[]){Ds(r,t,n,a=>{Mt(kr,()=>e(...a.map(o)))})}function sr(e,t=0){var n=Mt(mn|t,e);return n}function Qs(e,t=0){var n=Mt(Ma|t,e);return n}function We(e){return Mt(xt|nr,e)}function ei(e){var t=e.teardown;if(t!==null){const n=hn,r=K;Xa(!0),ut(null);try{t.call(null)}finally{Xa(n),ut(r)}}}function ja(e,t=!1){var n=e.first;for(e.first=e.last=null;n!==null;){const a=n.ac;a!==null&&Wr(()=>{a.abort(Wt)});var r=n.next;n.f&Pn?n.parent=null:ze(n,t),n=r}}function Dl(e){for(var t=e.first;t!==null;){var n=t.next;t.f&xt||ze(t),t=n}}function ze(e,t=!0){var n=!1;(t||e.f&Oi)&&e.nodes!==null&&e.nodes.end!==null&&(Fl(e.nodes.start,e.nodes.end),n=!0),fe(e,oa),ja(e,t&&!n),yr(e,0);var r=e.nodes&&e.nodes.t;if(r!==null)for(const i of r)i.stop();ei(e),e.f^=oa,e.f|=ct;var a=e.parent;a!==null&&a.first!==null&&ti(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.fn=e.nodes=e.ac=null}function Fl(e,t){for(;e!==null;){var n=e===t?null:Ar(e);e.remove(),e=n}}function ti(e){var t=e.parent,n=e.prev,r=e.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),t!==null&&(t.first===e&&(t.first=r),t.last===e&&(t.last=n))}function Sn(e,t,n=!0){var r=[];ni(e,r,!0);var a=()=>{n&&ze(e),t&&t()},i=r.length;if(i>0){var s=()=>--i||a();for(var l of r)l.out(s)}else a()}function ni(e,t,n){if(!(e.f&tt)){e.f^=tt;var r=e.nodes&&e.nodes.t;if(r!==null)for(const l of r)(l.is_global||n)&&t.push(l);for(var a=e.first;a!==null;){var i=a.next,s=(a.f&vn)!==0||(a.f&xt)!==0&&(e.f&mn)!==0;ni(a,t,s?n:!1),a=i}}}function La(e){ri(e,!0)}function ri(e,t){if(e.f&tt){e.f^=tt,e.f&we||(fe(e,Pe),Cn.ensure().schedule(e));for(var n=e.first;n!==null;){var r=n.next,a=(n.f&vn)!==0||(n.f&xt)!==0;ri(n,a?t:!1),n=r}var i=e.nodes&&e.nodes.t;if(i!==null)for(const s of i)(s.is_global||t)&&s.in()}}function Ra(e,t){if(e.nodes)for(var n=e.nodes.start,r=e.nodes.end;n!==null;){var a=n===r?null:Ar(n);t.append(n),n=a}}let jr=!1,hn=!1;function Xa(e){hn=e}let K=null,wt=!1;function ut(e){K=e}let Y=null;function ft(e){Y=e}let dt=null;function ai(e){K!==null&&(dt===null?dt=[e]:dt.push(e))}let Ue=null,Xe=0,st=null;function Vl(e){st=e}let si=1,kn=0,zn=kn;function Qa(e){zn=e}function ii(){return++si}function Mr(e){var t=e.f;if(t&Pe)return!0;if(t&Me&&(e.f&=~Tn),t&kt){for(var n=e.deps,r=n.length,a=0;a<r;a++){var i=n[a];if(Mr(i)&&Vs(i),i.wv>e.wv)return!0}t&ot&&je===null&&fe(e,we)}return!1}function li(e,t,n=!0){var r=e.reactions;if(r!==null&&!(dt!==null&&Yn.call(dt,e)))for(var a=0;a<r.length;a++){var i=r[a];i.f&Me?li(i,t,!1):t===i&&(n?fe(i,Pe):i.f&we&&fe(i,kt),za(i))}}function oi(e){var E;var t=Ue,n=Xe,r=st,a=K,i=dt,s=de,l=wt,c=zn,d=e.f;Ue=null,Xe=0,st=null,K=d&(xt|Pn)?null:e,dt=null,Zn(e.ctx),wt=!1,zn=++kn,e.ac!==null&&(Wr(()=>{e.ac.abort(Wt)}),e.ac=null);try{e.f|=ca;var f=e.fn,h=f();e.f|=On;var v=e.deps,w=B==null?void 0:B.is_fork;if(Ue!==null){var m;if(w||yr(e,Xe),v!==null&&Xe>0)for(v.length=Xe+Ue.length,m=0;m<Ue.length;m++)v[Xe+m]=Ue[m];else e.deps=v=Ue;if(Ca()&&e.f&ot)for(m=Xe;m<v.length;m++)((E=v[m]).reactions??(E.reactions=[])).push(e)}else!w&&v!==null&&Xe<v.length&&(yr(e,Xe),v.length=Xe);if(ar()&&st!==null&&!wt&&v!==null&&!(e.f&(Me|kt|Pe)))for(m=0;m<st.length;m++)li(st[m],e);if(a!==null&&a!==e){if(kn++,a.deps!==null)for(let g=0;g<n;g+=1)a.deps[g].rv=kn;if(t!==null)for(const g of t)g.rv=kn;st!==null&&(r===null?r=st:r.push(...st))}return e.f&un&&(e.f^=un),h}catch(g){return Ps(g)}finally{e.f^=ca,Ue=t,Xe=n,st=r,K=a,dt=i,Zn(s),wt=l,zn=c}}function Hl(e,t){let n=t.reactions;if(n!==null){var r=Mi.call(n,e);if(r!==-1){var a=n.length-1;a===0?n=t.reactions=null:(n[r]=n[a],n.pop())}}if(n===null&&t.f&Me&&(Ue===null||!Yn.call(Ue,t))){var i=t;i.f&ot&&(i.f^=ot,i.f&=~Tn),Sa(i),Ml(i),yr(i,0)}}function yr(e,t){var n=e.deps;if(n!==null)for(var r=t;r<n.length;r++)Hl(e,n[r])}function er(e){var t=e.f;if(!(t&ct)){fe(e,we);var n=Y,r=jr;Y=e,jr=!0;try{t&(mn|Ma)?Dl(e):ja(e),ei(e);var a=oi(e);e.teardown=typeof a=="function"?a:null,e.wv=si;var i;Ai&&ol&&e.f&Pe&&e.deps}finally{jr=r,Y=n}}}async function ql(){await Promise.resolve(),pl()}function o(e){var t=e.f,n=(t&Me)!==0;if(K!==null&&!wt){var r=Y!==null&&(Y.f&ct)!==0;if(!r&&(dt===null||!Yn.call(dt,e))){var a=K.deps;if(K.f&ca)e.rv<kn&&(e.rv=kn,Ue===null&&a!==null&&a[Xe]===e?Xe++:Ue===null?Ue=[e]:Ue.push(e));else{(K.deps??(K.deps=[])).push(e);var i=e.reactions;i===null?e.reactions=[K]:Yn.call(i,K)||i.push(K)}}}if(hn&&fn.has(e))return fn.get(e);if(n){var s=e;if(hn){var l=s.v;return(!(s.f&we)&&s.reactions!==null||di(s))&&(l=Ta(s)),fn.set(s,l),l}var c=(s.f&ot)===0&&!wt&&K!==null&&(jr||(K.f&ot)!==0),d=(s.f&On)===0;Mr(s)&&(c&&(s.f|=ot),Vs(s)),c&&!d&&(Hs(s),ci(s))}if(je!=null&&je.has(e))return je.get(e);if(e.f&un)throw e.v;return e.v}function ci(e){if(e.f|=ot,e.deps!==null)for(const t of e.deps)(t.reactions??(t.reactions=[])).push(e),t.f&Me&&!(t.f&ot)&&(Hs(t),ci(t))}function di(e){if(e.v===Ae)return!0;if(e.deps===null)return!1;for(const t of e.deps)if(fn.has(t)||t.f&Me&&di(t))return!0;return!1}function Qt(e){var t=wt;try{return wt=!0,e()}finally{wt=t}}function wn(e){if(!(typeof e!="object"||!e||e instanceof EventTarget)){if(Dt in e)ma(e);else if(!Array.isArray(e))for(let t in e){const n=e[t];typeof n=="object"&&n&&Dt in n&&ma(n)}}}function ma(e,t=new Set){if(typeof e=="object"&&e!==null&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e),e instanceof Date&&e.getTime();for(let r in e)try{ma(e[r],t)}catch{}const n=Aa(e);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const r=ys(n);for(let a in r){const i=r[a].get;if(i)try{i.call(e)}catch{}}}}}function Bl(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const Gl=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function Ul(e){return Gl.includes(e)}const Wl={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function Kl(e){return e=e.toLowerCase(),Wl[e]??e}const Yl=["touchstart","touchmove"];function Jl(e){return Yl.includes(e)}const En=Symbol("events"),ui=new Set,ya=new Set;function Zl(e,t,n,r={}){function a(i){if(r.capture||ba.call(t,i),!i.cancelBubble)return Wr(()=>n==null?void 0:n.call(this,i))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?Zt(()=>{t.addEventListener(e,a,r)}):t.addEventListener(e,a,r),a}function ne(e,t,n){(t[En]??(t[En]={}))[e]=n}function ir(e){for(var t=0;t<e.length;t++)ui.add(e[t]);for(var n of ya)n(e)}let es=null;function ba(e){var g,y;var t=this,n=t.ownerDocument,r=e.type,a=((g=e.composedPath)==null?void 0:g.call(e))||[],i=a[0]||e.target;es=e;var s=0,l=es===e&&e[En];if(l){var c=a.indexOf(l);if(c!==-1&&(t===document||t===window)){e[En]=t;return}var d=a.indexOf(t);if(d===-1)return;c<=d&&(s=c)}if(i=a[s]||e.target,i!==t){Ni(e,"currentTarget",{configurable:!0,get(){return i||n}});var f=K,h=Y;ut(null),ft(null);try{for(var v,w=[];i!==null;){var m=i.assignedSlot||i.parentNode||i.host||null;try{var E=(y=i[En])==null?void 0:y[r];E!=null&&(!i.disabled||e.target===i)&&E.call(i,e)}catch(C){v?w.push(C):v=C}if(e.cancelBubble||m===t||m===null)break;i=m}if(v){for(let C of w)queueMicrotask(()=>{throw C});throw v}}finally{e[En]=t,delete e.currentTarget,ut(f),ft(h)}}}var gs;const ea=((gs=globalThis==null?void 0:globalThis.window)==null?void 0:gs.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:e=>e});function Xl(e){return(ea==null?void 0:ea.createHTML(e))??e}function fi(e){var t=Ys("template");return t.innerHTML=Xl(e.replaceAll("<!>","<!---->")),t.content}function tr(e,t){var n=Y;n.nodes===null&&(n.nodes={start:e,end:t,a:null,t:null})}function T(e,t){var n=(t&tl)!==0,r=(t&nl)!==0,a,i=!e.startsWith("<!>");return()=>{a===void 0&&(a=fi(i?e:"<!>"+e),n||(a=Qn(a)));var s=r||Gs?document.importNode(a,!0):a.cloneNode(!0);if(n){var l=Qn(s),c=s.lastChild;tr(l,c)}else tr(s,s);return s}}function Ql(e,t,n="svg"){var r=!e.startsWith("<!>"),a=`<${n}>${r?e:"<!>"+e}</${n}>`,i;return()=>{if(!i){var s=fi(a),l=Qn(s);i=Qn(l)}var c=i.cloneNode(!0);return tr(c,c),c}}function eo(e,t){return Ql(e,t,"svg")}function Rn(e=""){{var t=Ft(e+"");return tr(t,t),t}}function R(){var e=document.createDocumentFragment(),t=document.createComment(""),n=Ft();return e.append(t,n),tr(t,n),e}function _(e,t){e!==null&&e.before(t)}function W(e,t){var n=t==null?"":typeof t=="object"?`${t}`:t;n!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=n,e.nodeValue=`${n}`)}function to(e,t){return no(e,t)}const Tr=new Map;function no(e,{target:t,anchor:n,props:r={},events:a,context:i,intro:s=!0,transformError:l}){Pl();var c=void 0,d=Ll(()=>{var f=n??t.appendChild(Ft());ml(f,{pending:()=>{}},w=>{Et({});var m=de;i&&(m.c=i),a&&(r.$$events=a),c=e(w,r)||{},At()},l);var h=new Set,v=w=>{for(var m=0;m<w.length;m++){var E=w[m];if(!h.has(E)){h.add(E);var g=Jl(E);for(const O of[t,document]){var y=Tr.get(O);y===void 0&&(y=new Map,Tr.set(O,y));var C=y.get(E);C===void 0?(O.addEventListener(E,ba,{passive:g}),y.set(E,1)):y.set(E,C+1)}}}};return v(Ur(ui)),ya.add(v),()=>{var g;for(var w of h)for(const y of[t,document]){var m=Tr.get(y),E=m.get(w);--E==0?(y.removeEventListener(w,ba),m.delete(w),m.size===0&&Tr.delete(y)):m.set(w,E)}ya.delete(v),f!==n&&((g=f.parentNode)==null||g.removeChild(f))}});return ro.set(c,d),c}let ro=new WeakMap;var bt,Lt,et,Nn,wr,xr,Gr;class Yr{constructor(t,n=!0){gt(this,"anchor");J(this,bt,new Map);J(this,Lt,new Map);J(this,et,new Map);J(this,Nn,new Set);J(this,wr,!0);J(this,xr,t=>{if(p(this,bt).has(t)){var n=p(this,bt).get(t),r=p(this,Lt).get(n);if(r)La(r),p(this,Nn).delete(n);else{var a=p(this,et).get(n);a&&(p(this,Lt).set(n,a.effect),p(this,et).delete(n),a.fragment.lastChild.remove(),this.anchor.before(a.fragment),r=a.effect)}for(const[i,s]of p(this,bt)){if(p(this,bt).delete(i),i===t)break;const l=p(this,et).get(s);l&&(ze(l.effect),p(this,et).delete(s))}for(const[i,s]of p(this,Lt)){if(i===n||p(this,Nn).has(i))continue;const l=()=>{if(Array.from(p(this,bt).values()).includes(i)){var d=document.createDocumentFragment();Ra(s,d),d.append(Ft()),p(this,et).set(i,{effect:s,fragment:d})}else ze(s);p(this,Nn).delete(i),p(this,Lt).delete(i)};p(this,wr)||!r?(p(this,Nn).add(i),Sn(s,l,!1)):l()}}});J(this,Gr,t=>{p(this,bt).delete(t);const n=Array.from(p(this,bt).values());for(const[r,a]of p(this,et))n.includes(r)||(ze(a.effect),p(this,et).delete(r))});this.anchor=t,U(this,wr,n)}ensure(t,n){var r=B,a=Ks();if(n&&!p(this,Lt).has(t)&&!p(this,et).has(t))if(a){var i=document.createDocumentFragment(),s=Ft();i.append(s),p(this,et).set(t,{effect:We(()=>n(s)),fragment:i})}else p(this,Lt).set(t,We(()=>n(this.anchor)));if(p(this,bt).set(r,t),a){for(const[l,c]of p(this,Lt))l===t?r.unskip_effect(c):r.skip_effect(c);for(const[l,c]of p(this,et))l===t?r.unskip_effect(c.effect):r.skip_effect(c.effect);r.oncommit(p(this,xr)),r.ondiscard(p(this,Gr))}else p(this,xr).call(this,r)}}bt=new WeakMap,Lt=new WeakMap,et=new WeakMap,Nn=new WeakMap,wr=new WeakMap,xr=new WeakMap,Gr=new WeakMap;function X(e,t,n=!1){var r=new Yr(e),a=n?vn:0;function i(s,l){r.ensure(s,l)}sr(()=>{var s=!1;t((l,c=0)=>{s=!0,i(c,l)}),s||i(-1,null)},a)}const ao=Symbol("NaN");function so(e,t,n){var r=new Yr(e),a=!ar();sr(()=>{var i=t();i!==i&&(i=ao),a&&i!==null&&typeof i=="object"&&(i={}),r.ensure(i,n)})}function br(e,t){return t}function io(e,t,n){for(var r=[],a=t.length,i,s=t.length,l=0;l<a;l++){let h=t[l];Sn(h,()=>{if(i){if(i.pending.delete(h),i.done.add(h),i.pending.size===0){var v=e.outrogroups;$a(e,Ur(i.done)),v.delete(i),v.size===0&&(e.outrogroups=null)}}else s-=1},!1)}if(s===0){var c=r.length===0&&n!==null;if(c){var d=n,f=d.parentNode;Tl(f),f.append(d),e.items.clear()}$a(e,t,!c)}else i={pending:new Set(t),done:new Set},(e.outrogroups??(e.outrogroups=new Set)).add(i)}function $a(e,t,n=!0){var r;if(e.pending.size>0){r=new Set;for(const s of e.pending.values())for(const l of s)r.add(e.items.get(l).e)}for(var a=0;a<t.length;a++){var i=t[a];if(r!=null&&r.has(i)){i.f|=Rt;const s=document.createDocumentFragment();Ra(i,s)}else ze(t[a],n)}}var ts;function _n(e,t,n,r,a,i=null){var s=e,l=new Map,c=(t&Es)!==0;if(c){var d=e;s=d.appendChild(Ft())}var f=null,h=Pa(()=>{var O=n();return Ea(O)?O:O==null?[]:Ur(O)}),v,w=new Map,m=!0;function E(O){C.effect.f&ct||(C.pending.delete(O),C.fallback=f,lo(C,v,s,t,r),f!==null&&(v.length===0?f.f&Rt?(f.f^=Rt,pr(f,null,s)):La(f):Sn(f,()=>{f=null})))}function g(O){C.pending.delete(O)}var y=sr(()=>{v=o(h);for(var O=v.length,k=new Set,P=B,q=Ks(),M=0;M<O;M+=1){var N=v[M],L=r(N,M),G=m?null:l.get(L);G?(G.v&&Xn(G.v,N),G.i&&Xn(G.i,M),q&&P.unskip_effect(G.e)):(G=oo(l,m?s:ts??(ts=Ft()),N,L,M,a,t,n),m||(G.e.f|=Rt),l.set(L,G)),k.add(L)}if(O===0&&i&&!f&&(m?f=We(()=>i(s)):(f=We(()=>i(ts??(ts=Ft()))),f.f|=Rt)),O>k.size&&Li(),!m)if(w.set(P,k),q){for(const[oe,_e]of l)k.has(oe)||P.skip_effect(_e.e);P.oncommit(E),P.ondiscard(g)}else E(P);o(h)}),C={effect:y,items:l,pending:w,outrogroups:null,fallback:f};m=!1}function ur(e){for(;e!==null&&!(e.f&xt);)e=e.next;return e}function lo(e,t,n,r,a){var G,oe,_e,Ne,Te,Ye,Je,De,nt;var i=(r&Yi)!==0,s=t.length,l=e.items,c=ur(e.effect.first),d,f=null,h,v=[],w=[],m,E,g,y;if(i)for(y=0;y<s;y+=1)m=t[y],E=a(m,y),g=l.get(E).e,g.f&Rt||((oe=(G=g.nodes)==null?void 0:G.a)==null||oe.measure(),(h??(h=new Set)).add(g));for(y=0;y<s;y+=1){if(m=t[y],E=a(m,y),g=l.get(E).e,e.outrogroups!==null)for(const ve of e.outrogroups)ve.pending.delete(g),ve.done.delete(g);if(g.f&Rt)if(g.f^=Rt,g===c)pr(g,null,n);else{var C=f?f.next:c;g===e.effect.last&&(e.effect.last=g.prev),g.prev&&(g.prev.next=g.next),g.next&&(g.next.prev=g.prev),sn(e,f,g),sn(e,g,C),pr(g,C,n),f=g,v=[],w=[],c=ur(f.next);continue}if(g.f&tt&&(La(g),i&&((Ne=(_e=g.nodes)==null?void 0:_e.a)==null||Ne.unfix(),(h??(h=new Set)).delete(g))),g!==c){if(d!==void 0&&d.has(g)){if(v.length<w.length){var O=w[0],k;f=O.prev;var P=v[0],q=v[v.length-1];for(k=0;k<v.length;k+=1)pr(v[k],O,n);for(k=0;k<w.length;k+=1)d.delete(w[k]);sn(e,P.prev,q.next),sn(e,f,P),sn(e,q,O),c=O,f=q,y-=1,v=[],w=[]}else d.delete(g),pr(g,c,n),sn(e,g.prev,g.next),sn(e,g,f===null?e.effect.first:f.next),sn(e,f,g),f=g;continue}for(v=[],w=[];c!==null&&c!==g;)(d??(d=new Set)).add(c),w.push(c),c=ur(c.next);if(c===null)continue}g.f&Rt||v.push(g),f=g,c=ur(g.next)}if(e.outrogroups!==null){for(const ve of e.outrogroups)ve.pending.size===0&&($a(e,Ur(ve.done)),(Te=e.outrogroups)==null||Te.delete(ve));e.outrogroups.size===0&&(e.outrogroups=null)}if(c!==null||d!==void 0){var M=[];if(d!==void 0)for(g of d)g.f&tt||M.push(g);for(;c!==null;)!(c.f&tt)&&c!==e.fallback&&M.push(c),c=ur(c.next);var N=M.length;if(N>0){var L=r&Es&&s===0?n:null;if(i){for(y=0;y<N;y+=1)(Je=(Ye=M[y].nodes)==null?void 0:Ye.a)==null||Je.measure();for(y=0;y<N;y+=1)(nt=(De=M[y].nodes)==null?void 0:De.a)==null||nt.fix()}io(e,M,L)}}i&&Zt(()=>{var ve,Nt;if(h!==void 0)for(g of h)(Nt=(ve=g.nodes)==null?void 0:ve.a)==null||Nt.apply()})}function oo(e,t,n,r,a,i,s,l){var c=s&Wi?s&Ji?pn(n):Nl(n,!1,!1):null,d=s&Ki?pn(a):null;return{v:c,i:d,e:We(()=>(i(t,c??n,d??a,l),()=>{e.delete(r)}))}}function pr(e,t,n){if(e.nodes)for(var r=e.nodes.start,a=e.nodes.end,i=t&&!(t.f&Rt)?t.nodes.start:n;r!==null;){var s=Ar(r);if(i.before(r),r===a)return;r=s}}function sn(e,t,n){t===null?e.effect.first=n:t.next=n,n===null?e.effect.last=t:n.prev=t}function F(e,t,n,r,a){var l;var i=(l=t.$$slots)==null?void 0:l[n],s=!1;i===!0&&(i=t.children,s=!0),i===void 0||i(e,s?()=>r:r)}function co(e,t,n){var r=new Yr(e);sr(()=>{var a=t()??null;r.ensure(a,a&&(i=>n(i,a)))},vn)}function uo(e,t,n,r,a,i){var s=null,l=e,c=new Yr(l,!1);sr(()=>{const d=t()||null;var f=rl;if(d===null){c.ensure(null,null);return}return c.ensure(d,h=>{if(d){if(s=Ys(d,f),tr(s,s),r){var v=s.appendChild(Ft());r(s,v)}Y.nodes.end=s,h.before(s)}}),()=>{}},vn),Oa(()=>{})}function fo(e,t){var n=void 0,r;Qs(()=>{n!==(n=t())&&(r&&(ze(r),r=null),n&&(r=We(()=>{Kr(()=>n(e))})))})}function vi(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var a=e.length;for(t=0;t<a;t++)e[t]&&(n=vi(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function vo(){for(var e,t,n=0,r="",a=arguments.length;n<a;n++)(e=arguments[n])&&(t=vi(e))&&(r&&(r+=" "),r+=t);return r}function po(e){return typeof e=="object"?vo(e):e??""}const ns=[...` 	
\r\f \v\uFEFF`];function ho(e,t,n){var r=e==null?"":""+e;if(t&&(r=r?r+" "+t:t),n){for(var a of Object.keys(n))if(n[a])r=r?r+" "+a:a;else if(r.length)for(var i=a.length,s=0;(s=r.indexOf(a,s))>=0;){var l=s+i;(s===0||ns.includes(r[s-1]))&&(l===r.length||ns.includes(r[l]))?r=(s===0?"":r.substring(0,s))+r.substring(l+1):s=l}}return r===""?null:r}function rs(e,t=!1){var n=t?" !important;":";",r="";for(var a of Object.keys(e)){var i=e[a];i!=null&&i!==""&&(r+=" "+a+": "+i+n)}return r}function ta(e){return e[0]!=="-"||e[1]!=="-"?e.toLowerCase():e}function _o(e,t){if(t){var n="",r,a;if(Array.isArray(t)?(r=t[0],a=t[1]):r=t,e){e=String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var i=!1,s=0,l=!1,c=[];r&&c.push(...Object.keys(r).map(ta)),a&&c.push(...Object.keys(a).map(ta));var d=0,f=-1;const E=e.length;for(var h=0;h<E;h++){var v=e[h];if(l?v==="/"&&e[h-1]==="*"&&(l=!1):i?i===v&&(i=!1):v==="/"&&e[h+1]==="*"?l=!0:v==='"'||v==="'"?i=v:v==="("?s++:v===")"&&s--,!l&&i===!1&&s===0){if(v===":"&&f===-1)f=h;else if(v===";"||h===E-1){if(f!==-1){var w=ta(e.substring(d,f).trim());if(!c.includes(w)){v!==";"&&h++;var m=e.substring(d,h).trim();n+=" "+m+";"}}d=h+1,f=-1}}}}return r&&(n+=rs(r)),a&&(n+=rs(a,!0)),n=n.trim(),n===""?null:n}return e==null?null:String(e)}function Ke(e,t,n,r,a,i){var s=e.__className;if(s!==n||s===void 0){var l=ho(n,r,i);l==null?e.removeAttribute("class"):t?e.className=l:e.setAttribute("class",l),e.__className=n}else if(i&&a!==i)for(var c in i){var d=!!i[c];(a==null||d!==!!a[c])&&e.classList.toggle(c,d)}return i}function na(e,t={},n,r){for(var a in n){var i=n[a];t[a]!==i&&(n[a]==null?e.style.removeProperty(a):e.style.setProperty(a,i,r))}}function Dr(e,t,n,r){var a=e.__style;if(a!==t){var i=_o(t,r);i==null?e.removeAttribute("style"):e.style.cssText=i,e.__style=t}else r&&(Array.isArray(r)?(na(e,n==null?void 0:n[0],r[0]),na(e,n==null?void 0:n[1],r[1],"important")):na(e,n,r));return r}function Fr(e,t,n=!1){if(e.multiple){if(t==null)return;if(!Ea(t))return sl();for(var r of e.options)r.selected=t.includes(gr(r));return}for(r of e.options){var a=gr(r);if(zl(a,t)){r.selected=!0;return}}(!n||t!==void 0)&&(e.selectedIndex=-1)}function pi(e){var t=new MutationObserver(()=>{Fr(e,e.__value)});t.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),Oa(()=>{t.disconnect()})}function go(e,t,n=t){var r=new WeakSet,a=!0;Js(e,"change",i=>{var s=i?"[selected]":":checked",l;if(e.multiple)l=[].map.call(e.querySelectorAll(s),gr);else{var c=e.querySelector(s)??e.querySelector("option:not([disabled])");l=c&&gr(c)}n(l),B!==null&&r.add(B)}),Kr(()=>{var i=t();if(e===document.activeElement){var s=B;if(r.has(s))return}if(Fr(e,i,a),a&&i===void 0){var l=e.querySelector(":checked");l!==null&&(i=gr(l),n(i))}e.__value=i,a=!1}),pi(e)}function gr(e){return"__value"in e?e.__value:e.value}const fr=Symbol("class"),vr=Symbol("style"),hi=Symbol("is custom element"),_i=Symbol("is html"),mo=xs?"option":"OPTION",yo=xs?"select":"SELECT";function bo(e,t){t?e.hasAttribute("selected")||e.setAttribute("selected",""):e.removeAttribute("selected")}function gn(e,t,n,r){var a=gi(e);a[t]!==(a[t]=n)&&(t==="loading"&&(e[Ii]=n),n==null?e.removeAttribute(t):typeof n!="string"&&mi(e).includes(t)?e[t]=n:e.setAttribute(t,n))}function $o(e,t,n,r,a=!1,i=!1){var s=gi(e),l=s[hi],c=!s[_i],d=t||{},f=e.nodeName===mo;for(var h in t)h in n||(n[h]=null);n.class?n.class=po(n.class):n[fr]&&(n.class=null),n[vr]&&(n.style??(n.style=null));var v=mi(e);for(const k in n){let P=n[k];if(f&&k==="value"&&P==null){e.value=e.__value="",d[k]=P;continue}if(k==="class"){var w=e.namespaceURI==="http://www.w3.org/1999/xhtml";Ke(e,w,P,r,t==null?void 0:t[fr],n[fr]),d[k]=P,d[fr]=n[fr];continue}if(k==="style"){Dr(e,P,t==null?void 0:t[vr],n[vr]),d[k]=P,d[vr]=n[vr];continue}var m=d[k];if(!(P===m&&!(P===void 0&&e.hasAttribute(k)))){d[k]=P;var E=k[0]+k[1];if(E!=="$$")if(E==="on"){const q={},M="$$"+k;let N=k.slice(2);var g=Ul(N);if(Bl(N)&&(N=N.slice(0,-7),q.capture=!0),!g&&m){if(P!=null)continue;e.removeEventListener(N,d[M],q),d[M]=null}if(g)ne(N,e,P),ir([N]);else if(P!=null){let L=function(G){d[k].call(this,G)};var O=L;d[M]=Zl(N,e,L,q)}}else if(k==="style")gn(e,k,P);else if(k==="autofocus")Cl(e,!!P);else if(!l&&(k==="__value"||k==="value"&&P!=null))e.value=e.__value=P;else if(k==="selected"&&f)bo(e,P);else{var y=k;c||(y=Kl(y));var C=y==="defaultValue"||y==="defaultChecked";if(P==null&&!l&&!C)if(s[k]=null,y==="value"||y==="checked"){let q=e;const M=t===void 0;if(y==="value"){let N=q.defaultValue;q.removeAttribute(y),q.defaultValue=N,q.value=q.__value=M?N:null}else{let N=q.defaultChecked;q.removeAttribute(y),q.defaultChecked=N,q.checked=M?N:!1}}else e.removeAttribute(k);else C||v.includes(y)&&(l||typeof P!="string")?(e[y]=P,y in s&&(s[y]=Ae)):typeof P!="function"&&gn(e,y,P)}}}return d}function as(e,t,n=[],r=[],a=[],i,s=!1,l=!1){Ds(a,n,r,c=>{var d=void 0,f={},h=e.nodeName===yo,v=!1;if(Qs(()=>{var m=t(...c.map(o)),E=$o(e,d,m,i,s,l);v&&h&&"value"in m&&Fr(e,m.value);for(let y of Object.getOwnPropertySymbols(f))m[y]||ze(f[y]);for(let y of Object.getOwnPropertySymbols(m)){var g=m[y];y.description===al&&(!d||g!==d[y])&&(f[y]&&ze(f[y]),f[y]=We(()=>fo(e,()=>g))),E[y]=g}d=E}),h){var w=e;Kr(()=>{Fr(w,d.value,!0),pi(w)})}v=!0})}function gi(e){return e.__attributes??(e.__attributes={[hi]:e.nodeName.includes("-"),[_i]:e.namespaceURI===Ms})}var ss=new Map;function mi(e){var t=e.getAttribute("is")||e.nodeName,n=ss.get(t);if(n)return n;ss.set(t,n=[]);for(var r,a=e,i=Element.prototype;i!==a;){r=ys(a);for(var s in r)r[s].set&&n.push(s);a=Aa(a)}return n}function Vr(e,t,n=t){var r=new WeakSet;Js(e,"input",async a=>{var i=a?e.defaultValue:e.value;if(i=ra(e)?aa(i):i,n(i),B!==null&&r.add(B),await ql(),i!==(i=t())){var s=e.selectionStart,l=e.selectionEnd,c=e.value.length;if(e.value=i??"",l!==null){var d=e.value.length;s===l&&l===c&&d>c?(e.selectionStart=d,e.selectionEnd=d):(e.selectionStart=s,e.selectionEnd=Math.min(l,d))}}}),Qt(t)==null&&e.value&&(n(ra(e)?aa(e.value):e.value),B!==null&&r.add(B)),Ia(()=>{var a=t();if(e===document.activeElement){var i=B;if(r.has(i))return}ra(e)&&a===aa(e.value)||e.type==="date"&&!a&&!e.value||a!==e.value&&(e.value=a??"")})}function ra(e){var t=e.type;return t==="number"||t==="range"}function aa(e){return e===""?null:+e}function is(e,t){return e===t||(e==null?void 0:e[Dt])===t}function Da(e={},t,n,r){var a=de.r,i=Y;return Kr(()=>{var s,l;return Ia(()=>{s=l,l=[],Qt(()=>{e!==n(...l)&&(t(e,...l),s&&is(n(...s),e)&&t(null,...s))})}),()=>{let c=i;for(;c!==a&&c.parent!==null&&c.parent.f&oa;)c=c.parent;const d=()=>{l&&is(n(...l),e)&&t(null,...l)},f=c.teardown;c.teardown=()=>{d(),f==null||f()}}}),e}function yi(e=!1){const t=de,n=t.l.u;if(!n)return;let r=()=>wn(t.s);if(e){let a=0,i={};const s=Er(()=>{let l=!1;const c=t.s;for(const d in c)c[d]!==i[d]&&(i[d]=c[d],l=!0);return l&&a++,a});r=()=>o(s)}n.b.length&&jl(()=>{ls(t,r),ia(n.b)}),Xt(()=>{const a=Qt(()=>n.m.map(Ti));return()=>{for(const i of a)typeof i=="function"&&i()}}),n.a.length&&Xt(()=>{ls(t,r),ia(n.a)})}function ls(e,t){if(e.l.s)for(const n of e.l.s)o(n);t()}const wo={get(e,t){if(!e.exclude.includes(t))return o(e.version),t in e.special?e.special[t]():e.props[t]},set(e,t,n){if(!(t in e.special)){var r=Y;try{ft(e.parent_effect),e.special[t]=$t({get[t](){return e.props[t]}},t,As)}finally{ft(r)}}return e.special[t](n),Ka(e.version),!0},getOwnPropertyDescriptor(e,t){if(!e.exclude.includes(t)&&t in e.props)return{enumerable:!0,configurable:!0,value:e.props[t]}},deleteProperty(e,t){return e.exclude.includes(t)||(e.exclude.push(t),Ka(e.version)),!0},has(e,t){return e.exclude.includes(t)?!1:t in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(t=>!e.exclude.includes(t))}};function D(e,t){return new Proxy({props:e,exclude:t,special:{},version:pn(0),parent_effect:Y},wo)}const xo={get(e,t){let n=e.props.length;for(;n--;){let r=e.props[n];if(cr(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r)return r[t]}},set(e,t,n){let r=e.props.length;for(;r--;){let a=e.props[r];cr(a)&&(a=a());const i=dn(a,t);if(i&&i.set)return i.set(n),!0}return!1},getOwnPropertyDescriptor(e,t){let n=e.props.length;for(;n--;){let r=e.props[n];if(cr(r)&&(r=r()),typeof r=="object"&&r!==null&&t in r){const a=dn(r,t);return a&&!a.configurable&&(a.configurable=!0),a}}},has(e,t){if(t===Dt||t===ws)return!1;for(let n of e.props)if(cr(n)&&(n=n()),n!=null&&t in n)return!0;return!1},ownKeys(e){const t=[];for(let n of e.props)if(cr(n)&&(n=n()),!!n){for(const r in n)t.includes(r)||t.push(r);for(const r of Object.getOwnPropertySymbols(n))t.includes(r)||t.push(r)}return t}};function V(...e){return new Proxy({props:e},xo)}function $t(e,t,n,r){var O;var a=!rr||(n&Xi)!==0,i=(n&Qi)!==0,s=(n&el)!==0,l=r,c=!0,d=()=>(c&&(c=!1,l=s?Qt(r):r),l);let f;if(i){var h=Dt in e||ws in e;f=((O=dn(e,t))==null?void 0:O.set)??(h&&t in e?k=>e[t]=k:void 0)}var v,w=!1;i?[v,w]=fl(()=>e[t]):v=e[t],v===void 0&&r!==void 0&&(v=d(),f&&(a&&Hi(),f(v)));var m;if(a?m=()=>{var k=e[t];return k===void 0?d():(c=!0,k)}:m=()=>{var k=e[t];return k!==void 0&&(l=void 0),k===void 0?l:k},a&&!(n&As))return m;if(f){var E=e.$$legacy;return function(k,P){return arguments.length>0?((!a||!P||E||w)&&f(P?m():k),k):m()}}var g=!1,y=(n&Zi?Er:Pa)(()=>(g=!1,m()));i&&o(y);var C=Y;return function(k,P){if(arguments.length>0){const q=P?o(y):a&&i?Le(k):k;return b(y,q),g=!0,l!==void 0&&(l=q),k}return hn&&g||C.f&ct?y.v:o(y)}}function lr(e){de===null&&ks(),rr&&de.l!==null?Eo(de).m.push(e):Xt(()=>{const t=Qt(e);if(typeof t=="function")return t})}function ko(e){de===null&&ks(),lr(()=>()=>Qt(e))}function Eo(e){var t=e.l;return t.u??(t.u={a:[],b:[],m:[]})}const Ao="5";var ms;typeof window<"u"&&((ms=window.__svelte??(window.__svelte={})).v??(ms.v=new Set)).add(Ao);cl();/**
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
 */const No=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
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
 */const os=(...e)=>e.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();var So=eo("<svg><!><!></svg>");function H(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]),r=D(n,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);Et(t,!1);let a=$t(t,"name",8,void 0),i=$t(t,"color",8,"currentColor"),s=$t(t,"size",8,24),l=$t(t,"strokeWidth",8,2),c=$t(t,"absoluteStrokeWidth",8,!1),d=$t(t,"iconNode",24,()=>[]);yi();var f=So();as(f,(w,m,E)=>({...Mo,...w,...r,width:s(),height:s(),stroke:i(),"stroke-width":m,class:E}),[()=>No(r)?void 0:{"aria-hidden":"true"},()=>(wn(c()),wn(l()),wn(s()),Qt(()=>c()?Number(l())*24/Number(s()):l())),()=>(wn(os),wn(a()),wn(n),Qt(()=>os("lucide-icon","lucide",a()?`lucide-${a()}`:"",n.class)))]);var h=u(f);_n(h,1,d,br,(w,m)=>{var E=Ie(()=>Ci(o(m),2));let g=()=>o(E)[0],y=()=>o(E)[1];var C=R(),O=I(C);uo(O,g,!0,(k,P)=>{as(k,()=>({...y()}))}),_(w,C)});var v=$(h);F(v,t,"default",{}),_(e,f),At()}function zo(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]];H(e,V({name:"activity"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Po(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];H(e,V({name:"arrow-right"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function cs(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 8V4H8"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2"}],["path",{d:"M2 14h2"}],["path",{d:"M20 14h2"}],["path",{d:"M15 13v2"}],["path",{d:"M9 13v2"}]];H(e,V({name:"bot"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function To(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]];H(e,V({name:"box"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function wa(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516"}],["path",{d:"M12 13h4"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1"}],["path",{d:"M12 8h8"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2"}],["circle",{cx:"16",cy:"13",r:".5"}],["circle",{cx:"18",cy:"3",r:".5"}],["circle",{cx:"20",cy:"21",r:".5"}],["circle",{cx:"20",cy:"8",r:".5"}]];H(e,V({name:"brain-circuit"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function xa(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M20 6 9 17l-5-5"}]];H(e,V({name:"check"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Lr(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m6 9 6 6 6-6"}]];H(e,V({name:"chevron-down"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function sa(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m9 18 6-6-6-6"}]];H(e,V({name:"chevron-right"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function ds(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];H(e,V({name:"circle-alert"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function us(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335"}],["path",{d:"m9 11 3 3L22 4"}]];H(e,V({name:"circle-check-big"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Co(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];H(e,V({name:"circle-check"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Oo(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["rect",{x:"9",y:"9",width:"6",height:"6",rx:"1"}]];H(e,V({name:"circle-stop"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Io(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]];H(e,V({name:"circle-x"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function bi(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];H(e,V({name:"copy"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Fa(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 20v2"}],["path",{d:"M12 2v2"}],["path",{d:"M17 20v2"}],["path",{d:"M17 2v2"}],["path",{d:"M2 12h2"}],["path",{d:"M2 17h2"}],["path",{d:"M2 7h2"}],["path",{d:"M20 12h2"}],["path",{d:"M20 17h2"}],["path",{d:"M20 7h2"}],["path",{d:"M7 20v2"}],["path",{d:"M7 2v2"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1"}]];H(e,V({name:"cpu"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Va(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5"}],["path",{d:"M3 12A9 3 0 0 0 21 12"}]];H(e,V({name:"database"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function fs(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];H(e,V({name:"download"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function jo(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];H(e,V({name:"eye"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function vs(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M12 7v5l4 2"}]];H(e,V({name:"history"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Lo(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];H(e,V({name:"info"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Ro(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"}],["path",{d:"M9 18h6"}],["path",{d:"M10 22h4"}]];H(e,V({name:"lightbulb"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Do(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 2v4"}],["path",{d:"m16.2 7.8 2.9-2.9"}],["path",{d:"M18 12h4"}],["path",{d:"m16.2 16.2 2.9 2.9"}],["path",{d:"M12 18v4"}],["path",{d:"m4.9 19.1 2.9-2.9"}],["path",{d:"M2 12h4"}],["path",{d:"m4.9 4.9 2.9 2.9"}]];H(e,V({name:"loader"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Fo(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}]];H(e,V({name:"message-square"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Vo(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]];H(e,V({name:"moon"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Ho(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"}],["path",{d:"M12 22V12"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["path",{d:"m7.5 4.27 9 5.15"}]];H(e,V({name:"package"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function qo(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];H(e,V({name:"play"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Hr(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"}]];H(e,V({name:"puzzle"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function mr(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];H(e,V({name:"refresh-cw"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Bo(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];H(e,V({name:"search"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Go(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"}],["path",{d:"m21.854 2.147-10.94 10.939"}]];H(e,V({name:"send"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Uo(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];H(e,V({name:"settings"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Wo(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]];H(e,V({name:"shield-check"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function ps(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{d:"M20 2v4"}],["path",{d:"M22 4h-4"}],["circle",{cx:"4",cy:"20",r:"2"}]];H(e,V({name:"sparkles"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Ko(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];H(e,V({name:"sun"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Yo(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 3v18"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}],["path",{d:"M3 15h18"}]];H(e,V({name:"table"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Jo(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M12 19h8"}],["path",{d:"m4 17 6-6-6-6"}]];H(e,V({name:"terminal"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function $i(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];H(e,V({name:"trash-2"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function hs(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];H(e,V({name:"triangle-alert"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Zo(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];H(e,V({name:"user"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Xo(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"}]];H(e,V({name:"wrench"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Qo(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];H(e,V({name:"x"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function ec(e,t){const n=D(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const r=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]];H(e,V({name:"zap"},()=>n,{get iconNode(){return r},children:(a,i)=>{var s=R(),l=I(s);F(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}var tc=T('<button><!> <span class="label"> </span></button>'),nc=T('<button><span class="plugin-icon svelte-129hoe0"> </span> <span class="label"> </span></button>'),rc=T('<div class="empty-plugins svelte-129hoe0">No plugins installed</div>'),ac=T("<!> <span>Light Mode</span>",1),sc=T("<!> <span>Dark Mode</span>",1),ic=T('<aside class="sidebar glass svelte-129hoe0"><div class="logo svelte-129hoe0"><div class="logo-box svelte-129hoe0"><!></div> <span class="logo-text brand-font svelte-129hoe0">Cheesecrab</span></div> <nav class="nav-section svelte-129hoe0"></nav> <div class="separator svelte-129hoe0"></div> <div class="nav-section plugins svelte-129hoe0"><div class="section-header svelte-129hoe0"><!> <span class="section-title svelte-129hoe0">Plugins</span></div> <div class="scroll-area svelte-129hoe0"><!> <!></div></div> <div class="bottom-actions svelte-129hoe0"><button class="theme-toggle svelte-129hoe0" title="Toggle Theme"><!></button></div></aside>');function lc(e,t){Et(t,!0);let n=$t(t,"activeView",15),r=$t(t,"installedPlugins",19,()=>[]),a=$t(t,"theme",3,"dark");const i=[{id:"chat",icon:Fo,label:"AI Space"},{id:"agent",icon:wa,label:"Agent Engine"},{id:"models",icon:Va,label:"Models"},{id:"plugins",icon:Hr,label:"Plugins"},{id:"crabtable",icon:Yo,label:"Crab Table"},{id:"settings",icon:Uo,label:"Settings"}];var s=ic(),l=u(s),c=u(l),d=u(c);Fa(d,{size:20,color:"var(--accent-primary)"});var f=$(l,2);_n(f,21,()=>i,br,(M,N)=>{var L=tc();let G;var oe=u(L);{let Te=Ie(()=>n()===o(N).id?2.5:2);co(oe,()=>o(N).icon,(Ye,Je)=>{Je(Ye,{size:18,get strokeWidth(){return o(Te)}})})}var _e=$(oe,2),Ne=u(_e);ee(()=>{G=Ke(L,1,"nav-item svelte-129hoe0",null,G,{active:n()===o(N).id}),W(Ne,o(N).label)}),ne("click",L,()=>n(o(N).id)),_(M,L)});var h=$(f,4),v=u(h),w=u(v);Hr(w,{size:14});var m=$(v,2),E=u(m);_n(E,17,r,br,(M,N)=>{var L=nc();let G;var oe=u(L),_e=u(oe),Ne=$(oe,2),Te=u(Ne);ee(()=>{G=Ke(L,1,"nav-item plugin svelte-129hoe0",null,G,{active:n()===o(N).id}),W(_e,o(N).icon||"🧩"),W(Te,o(N).label)}),ne("click",L,()=>n(o(N).id)),_(M,L)});var g=$(E,2);{var y=M=>{var N=rc();_(M,N)};X(g,M=>{r().length===0&&M(y)})}var C=$(h,2),O=u(C),k=u(O);{var P=M=>{var N=ac(),L=I(N);Ko(L,{size:18}),_(M,N)},q=M=>{var N=sc(),L=I(N);Vo(L,{size:18}),_(M,N)};X(k,M=>{a()==="dark"?M(P):M(q,-1)})}ne("click",O,function(...M){var N;(N=t.onToggleTheme)==null||N.apply(this,M)}),_(e,s),At()}ir(["click"]);var oc=T('<div class="telemetry-bar border-t glass svelte-zgh7bo"><div class="status-group svelte-zgh7bo"><div class="status-item svelte-zgh7bo"><div class="pulse-dot svelte-zgh7bo"></div> <!> <span class="status-text svelte-zgh7bo"></span></div> <div class="separator-v svelte-zgh7bo"></div> <div class="status-item svelte-zgh7bo"><!> <span class="status-text svelte-zgh7bo">Network: Local Only</span></div></div> <div class="metrics-group svelte-zgh7bo"><div class="metric svelte-zgh7bo"><!> <span class="metric-label svelte-zgh7bo">CPU</span> <div class="progress-container svelte-zgh7bo"><div class="progress-bg svelte-zgh7bo"><div class="progress-fill svelte-zgh7bo"></div></div></div> <span class="metric-value svelte-zgh7bo"> </span></div> <div class="separator-v svelte-zgh7bo"></div> <div class="metric svelte-zgh7bo"><!> <span class="metric-label svelte-zgh7bo">RAM</span> <div class="progress-container svelte-zgh7bo"><div class="progress-bg svelte-zgh7bo"><div class="progress-fill svelte-zgh7bo"></div></div></div> <span class="metric-value svelte-zgh7bo"> </span></div></div></div>');function cc(e,t){Et(t,!0);let n=j(12),r=j(4.2),a=16;Xt(()=>{const oe=setInterval(()=>{b(n,Math.floor(Math.random()*25)+5),b(r,+(4.2+Math.random()*.3).toFixed(1))},3e3);return()=>clearInterval(oe)});var i=oc(),s=u(i),l=u(s),c=$(u(l),2);Wo(c,{size:14,color:"#10b981"});var d=$(c,2);d.textContent="System Ready";var f=$(l,4),h=u(f);zo(h,{size:14});var v=$(s,2),w=u(v),m=u(w);Fa(m,{size:14});var E=$(m,4),g=u(E),y=u(g),C=$(E,2),O=u(C),k=$(w,4),P=u(k);Va(P,{size:14});var q=$(P,4),M=u(q),N=u(M),L=$(q,2),G=u(L);ee(()=>{Dr(y,`width: ${o(n)??""}%`),W(O,`${o(n)??""}%`),Dr(N,`width: ${o(r)/a*100}%`),W(G,`${o(r)??""}G / 16G`)}),_(e,i),At()}function Nr(){var e,t;return((t=(e=window.go)==null?void 0:e.main)==null?void 0:t.App)??null}async function Ha(){const e=Nr();if(e&&e.GetModels){const r=await e.GetModels();return Array.isArray(r)?r:[]}const t=await fetch("/api/models");if(!t.ok)throw new Error(`getModels: ${t.status}`);const n=await t.json();return Array.isArray(n==null?void 0:n.data)?n.data:n&&!Array.isArray(n)?[]:n||[]}async function dc(){const e=Nr();if(e&&e.GetSwarmAgents){const t=await e.GetSwarmAgents();return Array.isArray(t)?t:[]}try{const t=await fetch("/v1/agents");if(!t.ok)return[];const n=await t.json();return Array.isArray(n==null?void 0:n.agents)?n.agents:[]}catch{return[]}}function uc(e,{onToken:t,onError:n,onDone:r}){const a=Nr();if(a&&a.ChatCompletion&&window.runtime){const s=()=>{try{window.runtime.EventsOff("chat:token"),window.runtime.EventsOff("chat:error"),window.runtime.EventsOff("chat:done")}catch{}};window.runtime.EventsOn("chat:token",l=>{try{t(l)}catch{}}),window.runtime.EventsOn("chat:error",l=>{s();try{n(String(l))}catch{}}),window.runtime.EventsOn("chat:done",()=>{s();try{r()}catch{}}),a.ChatCompletion({...e,stream:!0});return}const i=JSON.stringify({...e,stream:!0});fetch("/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json"},body:i}).then(s=>{if(!s.ok){s.text().then(h=>n(h||`HTTP ${s.status}`)).catch(()=>n(`HTTP ${s.status}`));return}const l=s.body.getReader(),c=new TextDecoder;let d="";function f(){return l.read().then(({done:h,value:v})=>{if(h){r();return}d+=c.decode(v,{stream:!0});const w=d.split(`
`);d=w.pop()??"";for(const m of w)if(m.startsWith("data: ")){const E=m.slice(6);if(E==="[DONE]"){r();return}try{const g=JSON.parse(E);t(g)}catch{}}return f()})}return f()}).catch(s=>n((s==null?void 0:s.message)||String(s)))}function fc(e,{onProgress:t,onError:n}){const r=Nr();if(r&&r.PullModel&&window.runtime){window.runtime.EventsOn("pull:progress",i=>{try{t(i)}catch{}}),window.runtime.EventsOn("pull:error",i=>{try{n(String(i))}catch{}}),r.PullModel(e);return}const a=JSON.stringify({model:e,stream:!0});fetch("/api/pull",{method:"POST",headers:{"Content-Type":"application/json"},body:a}).then(i=>{if(!i.ok){i.text().then(f=>n(f||`HTTP ${i.status}`)).catch(()=>n(`HTTP ${i.status}`));return}const s=i.body.getReader(),l=new TextDecoder;let c="";function d(){return s.read().then(({done:f,value:h})=>{if(f)return;c+=l.decode(h,{stream:!0});const v=c.split(`
`);c=v.pop()??"";for(const w of v)if(w.trim())try{t(JSON.parse(w))}catch{}return d()})}return d()}).catch(i=>n((i==null?void 0:i.message)||String(i)))}function vc(e,{onEvent:t,onError:n,onDone:r}){const a=new AbortController,i=JSON.stringify(e);return fetch("/v1/agent/run",{method:"POST",headers:{"Content-Type":"application/json"},body:i,signal:a.signal}).then(s=>{if(!s.ok){s.text().then(h=>n(h||`HTTP ${s.status}`)).catch(()=>n(`HTTP ${s.status}`));return}const l=s.body.getReader(),c=new TextDecoder;let d="";function f(){return l.read().then(({done:h,value:v})=>{if(h){r();return}d+=c.decode(v,{stream:!0});const w=d.split(`
`);d=w.pop()??"";for(const m of w)if(m.startsWith("data: ")){const E=m.slice(6).trim();if(E==="[DONE]"){r();return}try{const g=JSON.parse(E);t(g)}catch{}}return f()})}return f()}).catch(s=>{(s==null?void 0:s.name)!=="AbortError"&&n((s==null?void 0:s.message)||String(s))}),{cancel:()=>a.abort()}}async function pc(e,t){const n=await fetch("/v1/agent/approve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:e,approved:t})});if(!n.ok){const r=await n.text();throw new Error(r||`agentApprove: HTTP ${n.status}`)}}async function hc(){try{const e=await fetch("/v1/agent/paths");if(!e.ok)return[];const t=await e.json();return Array.isArray(t==null?void 0:t.paths)?t.paths:[]}catch{return[]}}async function _c(e){const t=Nr();if(t&&t.LoadModel){await t.LoadModel(e);return}const n=await fetch("/models/load",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:e})});if(!n.ok){const r=await n.text();throw new Error(r||`HTTP ${n.status}`)}}var gc=T("<span> </span>"),mc=T("<span>Single agent</span>"),yc=T('<div><div><div class="avatar svelte-126kodk"><!></div> <div class="bubble-wrapper svelte-126kodk"><div class="bubble svelte-126kodk"> </div> <div class="bubble-actions svelte-126kodk"><button class="action-btn svelte-126kodk"><!></button></div></div></div></div>'),bc=T('<div class="message-wrapper svelte-126kodk"><div class="message assistant thinking svelte-126kodk"><div class="avatar svelte-126kodk"><!></div> <div class="bubble thinking-bubble svelte-126kodk"><div class="dot-loader svelte-126kodk"></div></div></div></div>'),$c=T('<div class="chat-space animate-fade svelte-126kodk"><header class="chat-header glass svelte-126kodk"><div class="model-info svelte-126kodk"><div></div> <span class="model-name svelte-126kodk"> </span> <!></div> <div><!> <!></div> <div class="header-actions"><button class="icon-btn svelte-126kodk" title="Clear Chat"><!></button></div></header> <div class="messages-container svelte-126kodk"><!> <!></div> <div class="input-area svelte-126kodk"><div><textarea class="svelte-126kodk"></textarea> <div class="input-footer svelte-126kodk"><div class="input-hints svelte-126kodk"><!> <span>Local Engine Ready</span></div> <button class="send-btn svelte-126kodk"><!></button></div></div> <p class="disclaimer svelte-126kodk">Private. Local. Edge-native.</p></div></div>');function wc(e,t){Et(t,!0);let n=j(Le([{role:"assistant",content:"Welcome to AI Space. I am the Cheesecrab Engine. How can I assist you today?"}])),r=j(""),a=j(!1),i=j(!1),s=j(null),l=j(null),c=j(Le({id:"Searching...",status:"idle"})),d=j(Le([]));async function f(){try{const x=await Ha();if(!Array.isArray(x)||x.length===0){b(c,{id:"No Active Model",status:"idle"},!0);return}const S=te=>{var ge;return((ge=te==null?void 0:te.status)==null?void 0:ge.value)??(te==null?void 0:te.status)},Z=x.find(te=>S(te)==="loaded");Z&&Z.id?b(c,{id:String(Z.id).split("/").pop().replace(/\.gguf$/i,""),status:"ready",rawId:Z.id},!0):b(c,{id:"No Active Model",status:"idle"},!0)}catch{b(c,{id:"No Active Model",status:"idle"},!0)}}async function h(){try{const x=await dc();b(d,Array.isArray(x)?x:[],!0)}catch{b(d,[],!0)}}lr(()=>{f(),h();const x=setInterval(()=>{f(),h()},3e3);return()=>clearInterval(x)});function v(){o(s)&&(o(s).scrollTop=o(s).scrollHeight)}Xt(()=>{o(n).length,setTimeout(v,50)});function w(){if(!o(r).trim()||o(a)||o(i))return;if(o(c).status!=="ready"){alert("Please load a model in the Plugin Store first.");return}const x=o(r);b(n,[...o(n),{role:"user",content:x}],!0),b(r,""),b(a,!0),uc({model:o(c).rawId,messages:o(n).map(S=>({role:S.role,content:S.content}))},{onToken:S=>{var te,ge,me;b(a,!1);const Z=((me=(ge=(te=S.choices)==null?void 0:te[0])==null?void 0:ge.delta)==null?void 0:me.content)||"";if(Z){const ce=o(n)[o(n).length-1];ce&&ce.role==="assistant"&&o(i)?(ce.content+=Z,b(n,[...o(n)],!0)):(b(n,[...o(n),{role:"assistant",content:Z}],!0),b(i,!0))}},onError:S=>{b(a,!1),b(i,!1),b(n,[...o(n),{role:"assistant",content:`Error: ${S}`}],!0)},onDone:()=>{b(a,!1),b(i,!1)}})}function m(){b(n,[{role:"assistant",content:"Chat cleared. How can I help you now?"}],!0)}function E(x,S){navigator.clipboard.writeText(x),b(l,S,!0),setTimeout(()=>b(l,null),2e3)}var g=$c(),y=u(g),C=u(y),O=u(C);let k;var P=$(O,2),q=u(P),M=$(P,2);Lr(M,{size:14});var N=$(C,2);let L;var G=u(N);ps(G,{size:14});var oe=$(G,2);{var _e=x=>{var S=gc(),Z=u(S);ee(()=>W(Z,`${o(d).length??""} agents in swarm`)),_(x,S)},Ne=x=>{var S=mc();_(x,S)};X(oe,x=>{o(d).length>0?x(_e):x(Ne,-1)})}var Te=$(N,2),Ye=u(Te),Je=u(Ye);$i(Je,{size:18});var De=$(y,2),nt=u(De);_n(nt,17,()=>o(n),br,(x,S,Z)=>{var te=yc();let ge;var me=u(te),ce=u(me),He=u(ce);{var qe=be=>{cs(be,{size:18})},vt=be=>{Zo(be,{size:18})};X(He,be=>{o(S).role==="assistant"?be(qe):be(vt,-1)})}var nn=$(ce,2),pt=u(nn),Ht=u(pt),rn=$(pt,2),Ze=u(rn),ye=u(Ze);{var Ce=be=>{xa(be,{size:12,color:"var(--accent-primary)"})},St=be=>{bi(be,{size:12})};X(ye,be=>{o(l)===Z?be(Ce):be(St,-1)})}ee(()=>{ge=Ke(te,1,"message-wrapper svelte-126kodk",null,ge,{user:o(S).role==="user"}),Ke(me,1,`message ${o(S).role??""}`,"svelte-126kodk"),W(Ht,o(S).content)}),ne("click",Ze,()=>E(o(S).content,Z)),_(x,te)});var ve=$(nt,2);{var Nt=x=>{var S=bc(),Z=u(S),te=u(Z),ge=u(te);cs(ge,{size:18}),_(x,S)};X(ve,x=>{o(a)&&x(Nt)})}Da(De,x=>b(s,x),()=>o(s));var en=$(De,2),rt=u(en);let Ve;var Vt=u(rt),yn=$(Vt,2),In=u(yn),jn=u(In);ps(jn,{size:12});var tn=$(In,2),Ln=u(tn);Go(Ln,{size:18}),ee(()=>{k=Ke(O,1,"status-indicator svelte-126kodk",null,k,{active:o(c).status==="ready"}),W(q,o(c).id),L=Ke(N,1,"swarm-info svelte-126kodk",null,L,{active:o(d).length>0}),Ve=Ke(rt,1,"input-container glass svelte-126kodk",null,Ve,{disabled:o(c).status!=="ready"}),gn(Vt,"placeholder",o(c).status==="ready"?"Ask anything...":"Load a model to start chat"),Vt.disabled=o(c).status!=="ready"||o(a)||o(i),tn.disabled=!o(r)||o(a)||o(i)||o(c).status!=="ready"}),ne("click",Ye,m),ne("keydown",Vt,x=>x.key==="Enter"&&!x.shiftKey&&(x.preventDefault(),w())),Vr(Vt,()=>o(r),x=>b(r,x)),ne("click",tn,w),_(e,g),At()}ir(["click","keydown"]);var xc=T('<div class="empty-state svelte-18mm1rx"><!> <p class="empty-title svelte-18mm1rx">Ready to run</p> <p class="empty-sub svelte-18mm1rx">Enter a goal below and press Run</p></div>'),kc=T('<div class="timeline-card thinking-card svelte-18mm1rx"><div class="card-icon spin svelte-18mm1rx"><!></div> <span class="card-label muted svelte-18mm1rx"> </span></div>'),Ec=T('<div class="card-body svelte-18mm1rx"><p class="reasoning-text svelte-18mm1rx"> </p></div>'),Ac=T('<div class="timeline-card thought-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx" role="button" tabindex="0"><div class="card-icon svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx"> </span> <span class="card-plan muted svelte-18mm1rx"> </span> <div class="expand-icon svelte-18mm1rx"><!></div></div> <!></div>'),Mc=T('<span class="badge danger svelte-18mm1rx"><!> dangerous</span>'),Nc=T('<div class="card-body svelte-18mm1rx"><pre class="code-block svelte-18mm1rx"> </pre></div>'),Sc=T('<div class="timeline-card tool-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx" role="button" tabindex="0"><div class="card-icon svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx"><code class="svelte-18mm1rx"> </code></span> <!> <div class="expand-icon svelte-18mm1rx"><!></div></div> <!></div>'),zc=T('<div class="approval-buttons svelte-18mm1rx"><button class="approve-btn svelte-18mm1rx"><!> Approve</button> <button class="deny-btn svelte-18mm1rx"><!> Deny</button></div>'),Pc=T('<div class="approval-resolved muted svelte-18mm1rx"><!> Decision sent</div>'),Tc=T('<div class="timeline-card approval-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx"><div class="card-icon warning svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx">Approval required — <code class="svelte-18mm1rx"> </code></span></div> <div class="card-body svelte-18mm1rx"><p class="approval-msg svelte-18mm1rx">This tool is marked <strong>dangerous</strong> and requires your approval before running.</p> <pre class="code-block svelte-18mm1rx"> </pre> <!></div></div>'),Cc=T('<div class="card-body svelte-18mm1rx"><pre class="code-block svelte-18mm1rx"> </pre></div>'),Oc=T('<div class="timeline-card obs-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx" role="button" tabindex="0"><div class="card-icon svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx"> </span> <div class="expand-icon svelte-18mm1rx"><!></div></div> <!></div>'),Ic=T('<div class="timeline-card answer-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx"><div class="card-icon success svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx">Final Answer</span> <button class="icon-btn small svelte-18mm1rx" title="Copy"><!></button></div> <div class="card-body svelte-18mm1rx"><p class="answer-text svelte-18mm1rx"> </p></div></div>'),jc=T('<div class="timeline-card error-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx"><div class="card-icon error svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx">Error</span></div> <div class="card-body svelte-18mm1rx"><p class="error-text svelte-18mm1rx"> </p></div></div>'),Lc=T('<p class="history-empty svelte-18mm1rx">No completed runs yet.</p>'),Rc=T('<button class="history-item svelte-18mm1rx"><span> </span> <span class="history-goal svelte-18mm1rx"> </span></button>'),Dc=T('<aside class="history-panel glass svelte-18mm1rx"><div class="history-header svelte-18mm1rx"><!> <span>Past Runs</span></div> <!></aside>'),Fc=T('<button class="stop-btn svelte-18mm1rx"><!></button>'),Vc=T('<button class="run-btn svelte-18mm1rx"><!></button>'),Hc=T('<div class="agent-space animate-fade svelte-18mm1rx"><header class="agent-header glass svelte-18mm1rx"><div class="header-left svelte-18mm1rx"><!> <span class="header-title brand-font svelte-18mm1rx">Agent Engine</span></div> <div class="model-status svelte-18mm1rx"><div></div> <span class="model-name svelte-18mm1rx"> </span></div> <div class="header-actions svelte-18mm1rx"><button title="Run history"><!></button> <button class="icon-btn svelte-18mm1rx" title="Clear timeline"><!></button></div></header> <div class="workspace svelte-18mm1rx"><div class="timeline-column svelte-18mm1rx"><!> <!></div> <!></div> <div class="input-area svelte-18mm1rx"><div class="options-row svelte-18mm1rx"><label class="option-label svelte-18mm1rx">Strategy <select class="option-select svelte-18mm1rx"><option>ReAct</option><option>Function Calling</option></select></label> <label class="option-label svelte-18mm1rx">Max steps <input class="option-input svelte-18mm1rx" type="number" min="1" max="50"/></label></div> <div><textarea class="goal-input svelte-18mm1rx"></textarea> <div class="goal-footer svelte-18mm1rx"><div class="goal-hints svelte-18mm1rx"><!> <span> </span></div> <!></div></div> <p class="disclaimer svelte-18mm1rx">Agent has access to your filesystem and shell. Review dangerous tool approvals carefully.</p></div></div>');function qc(e,t){Et(t,!0);let n=j(""),r=j("react"),a=j(20),i=j(Le({id:"Searching...",status:"idle",rawId:""})),s=j(!1),l=j(null),c=j(null),d=j(Le([])),f=j(Le([])),h=j(!1),v=j(null),w=j(null);async function m(){try{const z=await Ha(),A=Oe=>{var se;return((se=Oe==null?void 0:Oe.status)==null?void 0:se.value)??(Oe==null?void 0:Oe.status)},$e=Array.isArray(z)?z.find(Oe=>A(Oe)==="loaded"):null;$e!=null&&$e.id?b(i,{id:String($e.id).split("/").pop().replace(/\.gguf$/i,""),status:"ready",rawId:$e.id},!0):b(i,{id:"No Model Loaded",status:"idle",rawId:""},!0)}catch{b(i,{id:"No Model Loaded",status:"idle",rawId:""},!0)}}lr(()=>{m(),E();const z=setInterval(m,5e3);return()=>clearInterval(z)});async function E(){b(f,await hc(),!0)}function g(){if(!o(n).trim()||o(s))return;if(o(i).status!=="ready"){alert("Please load a model in the Plugin Store first.");return}b(d,[],!0),b(l,null),b(v,null),b(s,!0);const{cancel:z}=vc({goal:o(n).trim(),model:o(i).rawId,strategy:o(r),max_steps:o(a)},{onEvent:C,onError:A=>{b(s,!1),b(d,[...o(d),{type:"error",step:-1,payload:A,id:P()}],!0)},onDone:()=>{b(s,!1),E()}});b(c,z,!0)}function y(){o(c)&&o(c)(),b(s,!1),b(c,null),b(d,[...o(d),{type:"error",step:-1,payload:"Run cancelled by user.",id:P()}],!0)}function C(z){if(z.type==="session_start"){b(l,z.session_id??z.payload??null,!0);return}if(z.type!=="stream_token"){if(z.type==="thinking"){b(d,[...o(d).filter(A=>!(A.type==="thinking"&&A.step===z.step)),{...z,id:P()}],!0);return}if(z.type==="approval_required"){const A=z.payload??{};b(v,{toolName:A.tool??"?",args:A.args??{},step:z.step},!0)}["thought","tool_call","observation","final_answer","approval_required"].includes(z.type)&&b(d,o(d).filter(A=>!(A.type==="thinking"&&A.step===z.step)),!0),b(d,[...o(d),{...z,id:P()}],!0)}}async function O(z){if(o(l)){try{await pc(o(l),z)}catch(A){console.warn("approve error:",A)}b(v,null)}}let k=0;function P(){return++k}function q(z){try{return JSON.stringify(z,null,2)}catch{return String(z)}}function M(){b(d,[],!0),b(l,null),b(v,null)}let N=j(Le(new Set));function L(z){const A=new Set(o(N));A.has(z)?A.delete(z):A.add(z),b(N,A,!0)}let G=j(null);function oe(z,A){navigator.clipboard.writeText(z),b(G,A,!0),setTimeout(()=>b(G,null),2e3)}var _e=Hc(),Ne=u(_e),Te=u(Ne),Ye=u(Te);wa(Ye,{size:20,color:"var(--accent-primary)"});var Je=$(Te,2),De=u(Je);let nt;var ve=$(De,2),Nt=u(ve),en=$(Je,2),rt=u(en);let Ve;var Vt=u(rt);vs(Vt,{size:18});var yn=$(rt,2),In=u(yn);$i(In,{size:18});var jn=$(Ne,2),tn=u(jn),Ln=u(tn);{var x=z=>{var A=xc(),$e=u(A);wa($e,{size:48,color:"var(--text-tertiary)"}),_(z,A)};X(Ln,z=>{o(d).length===0&&!o(s)&&z(x)})}var S=$(Ln,2);_n(S,17,()=>o(d),z=>z.id,(z,A)=>{var $e=R(),Oe=I($e);{var se=Q=>{var re=kc(),ae=u(re),ie=u(ae);Do(ie,{size:16});var ke=$(ae,2),Se=u(ke);ee(()=>W(Se,`Thinking — step ${o(A).step+1}`)),_(Q,re)},pe=Q=>{const re=Ie(()=>o(A).payload??{});var ae=Ac(),ie=u(ae),ke=u(ie),Se=u(ke);Ro(Se,{size:16});var Fe=$(ke,2),ht=u(Fe),Tt=$(Fe,2),Ct=u(Tt),Ot=$(Tt,2),Gt=u(Ot);{var Be=Ee=>{Lr(Ee,{size:14})},bn=Ie(()=>o(N).has(o(A).id)),$n=Ee=>{sa(Ee,{size:14})};X(Gt,Ee=>{o(bn)?Ee(Be):Ee($n,-1)})}var le=$(ie,2);{var at=Ee=>{var ue=Ec(),Ut=u(ue),or=u(Ut);ee(()=>W(or,o(re).reasoning??"")),_(Ee,ue)},_t=Ie(()=>o(N).has(o(A).id));X(le,Ee=>{o(_t)&&Ee(at)})}ee(()=>{W(ht,o(re).is_final?"Final reasoning":`Thought — step ${o(A).step+1}`),W(Ct,o(re).plan??"")}),ne("click",ie,()=>L(o(A).id)),ne("keydown",ie,Ee=>Ee.key==="Enter"&&L(o(A).id)),_(Q,ae)},qt=Q=>{const re=Ie(()=>o(A).payload??{});var ae=Sc(),ie=u(ae),ke=u(ie),Se=u(ke);Xo(Se,{size:16});var Fe=$(ke,2),ht=u(Fe),Tt=u(ht),Ct=$(Fe,2);{var Ot=ue=>{var Ut=Mc(),or=u(Ut);hs(or,{size:11}),_(ue,Ut)};X(Ct,ue=>{o(re).dangerous&&ue(Ot)})}var Gt=$(Ct,2),Be=u(Gt);{var bn=ue=>{Lr(ue,{size:14})},$n=Ie(()=>o(N).has(o(A).id)),le=ue=>{sa(ue,{size:14})};X(Be,ue=>{o($n)?ue(bn):ue(le,-1)})}var at=$(ie,2);{var _t=ue=>{var Ut=Nc(),or=u(Ut),wi=u(or);ee(xi=>W(wi,xi),[()=>q(o(re).args??{})]),_(ue,Ut)},Ee=Ie(()=>o(N).has(o(A).id));X(at,ue=>{o(Ee)&&ue(_t)})}ee(()=>W(Tt,o(re).tool??"?")),ne("click",ie,()=>L(o(A).id)),ne("keydown",ie,ue=>ue.key==="Enter"&&L(o(A).id)),_(Q,ae)},zt=Q=>{const re=Ie(()=>o(A).payload??{});var ae=Tc(),ie=u(ae),ke=u(ie),Se=u(ke);hs(Se,{size:16});var Fe=$(ke,2),ht=$(u(Fe)),Tt=u(ht),Ct=$(ie,2),Ot=$(u(Ct),2),Gt=u(Ot),Be=$(Ot,2);{var bn=le=>{var at=zc(),_t=u(at),Ee=u(_t);xa(Ee,{size:14});var ue=$(_t,2),Ut=u(ue);Qo(Ut,{size:14}),ne("click",_t,()=>O(!0)),ne("click",ue,()=>O(!1)),_(le,at)},$n=le=>{var at=Pc(),_t=u(at);us(_t,{size:14}),_(le,at)};X(Be,le=>{o(v)&&o(v).step===o(A).step?le(bn):le($n,-1)})}ee(le=>{W(Tt,o(re).tool??"?"),W(Gt,le)},[()=>q(o(re).args??{})]),_(Q,ae)},an=Q=>{var re=Oc(),ae=u(re),ie=u(ae),ke=u(ie);jo(ke,{size:16});var Se=$(ie,2),Fe=u(Se),ht=$(Se,2),Tt=u(ht);{var Ct=le=>{Lr(le,{size:14})},Ot=Ie(()=>o(N).has(o(A).id)),Gt=le=>{sa(le,{size:14})};X(Tt,le=>{o(Ot)?le(Ct):le(Gt,-1)})}var Be=$(ae,2);{var bn=le=>{var at=Cc(),_t=u(at),Ee=u(_t);ee(()=>W(Ee,o(A).payload??"")),_(le,at)},$n=Ie(()=>o(N).has(o(A).id));X(Be,le=>{o($n)&&le(bn)})}ee(()=>W(Fe,`Observation — step ${o(A).step+1}`)),ne("click",ae,()=>L(o(A).id)),ne("keydown",ae,le=>le.key==="Enter"&&L(o(A).id)),_(Q,re)},Pt=Q=>{var re=Ic(),ae=u(re),ie=u(ae),ke=u(ie);us(ke,{size:16});var Se=$(ie,4),Fe=u(Se);{var ht=Be=>{xa(Be,{size:12})},Tt=Be=>{bi(Be,{size:12})};X(Fe,Be=>{o(G)===o(A).id?Be(ht):Be(Tt,-1)})}var Ct=$(ae,2),Ot=u(Ct),Gt=u(Ot);ee(()=>W(Gt,o(A).payload??"")),ne("click",Se,()=>oe(o(A).payload??"",o(A).id)),_(Q,re)},Bt=Q=>{var re=jc(),ae=u(re),ie=u(ae),ke=u(ie);Io(ke,{size:16});var Se=$(ae,2),Fe=u(Se),ht=u(Fe);ee(()=>W(ht,o(A).payload??"")),_(Q,re)};X(Oe,Q=>{o(A).type==="thinking"?Q(se):o(A).type==="thought"?Q(pe,1):o(A).type==="tool_call"?Q(qt,2):o(A).type==="approval_required"?Q(zt,3):o(A).type==="observation"?Q(an,4):o(A).type==="final_answer"?Q(Pt,5):o(A).type==="error"&&Q(Bt,6)})}_(z,$e)});var Z=$(tn,2);{var te=z=>{var A=Dc(),$e=u(A),Oe=u($e);vs(Oe,{size:14});var se=$($e,2);{var pe=zt=>{var an=Lc();_(zt,an)},qt=zt=>{var an=R(),Pt=I(an);_n(Pt,17,()=>[...o(f)].reverse(),br,(Bt,Q)=>{var re=Rc(),ae=u(re);let ie;var ke=u(ae),Se=$(ae,2),Fe=u(Se);ee(()=>{ie=Ke(ae,1,"history-status svelte-18mm1rx",null,ie,{done:o(Q).status==="completed",fail:o(Q).status!=="completed"}),W(ke,o(Q).status==="completed"?"✓":"✗"),W(Fe,o(Q).goal)}),ne("click",re,()=>{b(n,o(Q).goal,!0),b(h,!1)}),_(Bt,re)}),_(zt,an)};X(se,zt=>{o(f).length===0?zt(pe):zt(qt,-1)})}_(z,A)};X(Z,z=>{o(h)&&z(te)})}var ge=$(jn,2),me=u(ge),ce=u(me),He=$(u(ce)),qe=u(He);qe.value=qe.__value="react";var vt=$(qe);vt.value=vt.__value="function_calling";var nn=$(ce,2),pt=$(u(nn)),Ht=$(me,2);let rn;var Ze=u(Ht);Da(Ze,z=>b(w,z),()=>o(w));var ye=$(Ze,2),Ce=u(ye),St=u(Ce);Jo(St,{size:12});var be=$(St,2),Sr=u(be),Jr=$(Ce,2);{var zr=z=>{var A=Fc(),$e=u(A);Oo($e,{size:18}),ne("click",A,y),_(z,A)},Zr=z=>{var A=Vc(),$e=u(A);qo($e,{size:18}),ee(Oe=>A.disabled=Oe,[()=>!o(n).trim()||o(i).status!=="ready"]),ne("click",A,g),_(z,A)};X(Jr,z=>{o(s)?z(zr):z(Zr,-1)})}ee(()=>{nt=Ke(De,1,"status-dot svelte-18mm1rx",null,nt,{active:o(i).status==="ready"}),W(Nt,o(i).id),Ve=Ke(rt,1,"icon-btn svelte-18mm1rx",null,Ve,{active:o(h)}),yn.disabled=o(s),He.disabled=o(s),pt.disabled=o(s),rn=Ke(Ht,1,"goal-container glass svelte-18mm1rx",null,rn,{disabled:o(i).status!=="ready"}),gn(Ze,"placeholder",o(i).status==="ready"?'Describe your goal… e.g. "List all Go files and count lines"':"Load a model in Plugin Store to start"),Ze.disabled=o(i).status!=="ready"||o(s),W(Sr,`Local · Private · ${o(r)==="react"?"ReAct":"Function Calling"}`)}),ne("click",rt,()=>{b(h,!o(h)),o(h)&&E()}),ne("click",yn,M),go(He,()=>o(r),z=>b(r,z)),Vr(pt,()=>o(a),z=>b(a,z)),ne("keydown",Ze,z=>z.key==="Enter"&&!z.shiftKey&&(z.preventDefault(),g())),Vr(Ze,()=>o(n),z=>b(n,z)),_(e,_e),At()}ir(["click","keydown"]);var Bc=T("<!> <span>Pulling…</span>",1),Gc=T("<!> <span>Pull</span>",1),Uc=T('<span class="prog-pct svelte-rgdxjf"> </span>'),Wc=T('<div><div class="progress-meta svelte-rgdxjf"><span class="prog-status svelte-rgdxjf"><!></span> <!></div> <div class="progress-bar svelte-rgdxjf"><div class="progress-fill svelte-rgdxjf"></div></div></div>'),Kc=T('<div class="error-banner svelte-rgdxjf"><!> <span> </span></div>'),Yc=T('<div class="empty-state svelte-rgdxjf"><!> <p class="svelte-rgdxjf">Scanning storage…</p></div>'),Jc=T('<div class="empty-state svelte-rgdxjf"><!> <h3 class="svelte-rgdxjf">No models found</h3> <p class="svelte-rgdxjf">Pull a model above to get started.</p></div>'),Zc=T('<div class="engine-ready svelte-rgdxjf"><!> <span>Ready for inference</span></div>'),Xc=T("<!> <span>Starting engine…</span>",1),Qc=T("<!> <span>Load Engine</span>",1),ed=T('<button class="btn-load svelte-rgdxjf"><!></button>'),td=T('<div class="model-card surface-card svelte-rgdxjf"><div class="card-top svelte-rgdxjf"><span><!></span> <span class="model-size svelte-rgdxjf"> </span></div> <div class="model-name svelte-rgdxjf"> </div> <div class="model-source svelte-rgdxjf"> </div> <div class="card-footer svelte-rgdxjf"><!></div></div>'),nd=T('<div class="error-banner svelte-rgdxjf" style="margin-top:1rem"><!> <span> </span></div>'),rd=T('<div class="models-grid svelte-rgdxjf"></div> <!>',1),ad=T('<div class="models-view animate-fade svelte-rgdxjf"><header class="page-header svelte-rgdxjf"><div class="header-content"><h1 class="brand-font svelte-rgdxjf">Models</h1> <p class="svelte-rgdxjf">Pull GGUF models and manage the local inference engine.</p></div> <div class="stat-pill svelte-rgdxjf"><!> <span> </span></div></header> <section class="section svelte-rgdxjf"><div class="section-title svelte-rgdxjf"><!> <h2 class="svelte-rgdxjf">Pull Model</h2></div> <div class="surface-card pull-card svelte-rgdxjf"><p class="hint-text svelte-rgdxjf">Paste a HuggingFace URL (<code class="svelte-rgdxjf">/blob/</code> or <code class="svelte-rgdxjf">/resolve/</code>) or an Ollama tag.</p> <div class="input-row svelte-rgdxjf"><div class="input-wrap svelte-rgdxjf"><!> <input type="text" placeholder="https://huggingface.co/…/model.gguf" class="svelte-rgdxjf"/></div> <button class="btn-primary svelte-rgdxjf"><!></button></div> <!> <!></div></section> <section class="section svelte-rgdxjf"><div class="section-title svelte-rgdxjf"><!> <h2 class="svelte-rgdxjf">Local Models</h2></div> <!></section> <div class="footer-hint svelte-rgdxjf"><!> <span>Models are stored in <code class="svelte-rgdxjf">~/.cheesecrab/models/</code></span></div></div>');function sd(e,t){Et(t,!0);let n=j(Le([])),r=j(!0),a=j(null),i=j(null),s=j(""),l=j(null),c=j(null),d=j(!1);async function f(){try{const x=await Ha();b(n,x||[],!0)}catch{}finally{b(r,!1)}}Xt(()=>{f();const x=setInterval(f,5e3);return()=>clearInterval(x)});function h(x){const S=x.trim();return S.includes("huggingface.co")?S.replace("/blob/","/resolve/").replace("/tree/","/resolve/"):S}function v(x){return x?x<1024?`${x} B`:x<1024**2?`${(x/1024).toFixed(1)} KB`:x<1024**3?`${(x/1024**2).toFixed(1)} MB`:`${(x/1024**3).toFixed(2)} GB`:""}function w(){if(!o(s)||o(d))return;const x=h(o(s));b(c,null),b(l,{status:"connecting",completed:0,total:0},!0),b(d,!0),fc(x,{onProgress:S=>{b(l,S,!0),(S==null?void 0:S.status)==="success"?(b(d,!1),setTimeout(()=>{b(l,null),f()},1500)):(S==null?void 0:S.status)==="error"&&(b(c,S.error??"Download failed",!0),b(d,!1),b(l,null))},onError:S=>{b(c,S,!0),b(d,!1),b(l,null)}})}async function m(x){if(!o(a)){b(a,x,!0),b(i,null);try{await _c(x),await f()}catch(S){b(i,(S==null?void 0:S.message)??String(S),!0)}finally{b(a,null)}}}var E=ad(),g=u(E),y=$(u(g),2),C=u(y);Va(C,{size:14});var O=$(C,2),k=u(O),P=$(g,2),q=u(P),M=u(q);fs(M,{size:18});var N=$(q,2),L=$(u(N),2),G=u(L),oe=u(G);Bo(oe,{size:16,class:"input-icon"});var _e=$(oe,2),Ne=$(G,2),Te=u(Ne);{var Ye=x=>{var S=Bc(),Z=I(S);mr(Z,{size:16,class:"spin"}),_(x,S)},Je=x=>{var S=Gc(),Z=I(S);fs(Z,{size:16}),_(x,S)};X(Te,x=>{o(d)?x(Ye):x(Je,-1)})}var De=$(L,2);{var nt=x=>{const S=Ie(()=>o(l).total>0?Math.round(o(l).completed/o(l).total*100):0),Z=Ie(()=>o(l).status==="success");var te=Wc();let ge;var me=u(te),ce=u(me),He=u(ce);{var qe=ye=>{var Ce=Rn("✓ Download complete");_(ye,Ce)},vt=ye=>{var Ce=Rn("Connecting…");_(ye,Ce)},nn=ye=>{var Ce=Rn();ee((St,be)=>W(Ce,`${St??""}${be??""}`),[()=>v(o(l).completed),()=>o(l).total>0?" / "+v(o(l).total):""]),_(ye,Ce)};X(He,ye=>{o(Z)?ye(qe):o(l).status==="connecting"?ye(vt,1):ye(nn,-1)})}var pt=$(ce,2);{var Ht=ye=>{var Ce=Uc(),St=u(Ce);ee(()=>W(St,`${o(S)??""}%`)),_(ye,Ce)};X(pt,ye=>{o(l).total>0&&ye(Ht)})}var rn=$(me,2),Ze=u(rn);ee(()=>{ge=Ke(te,1,"progress-zone svelte-rgdxjf",null,ge,{done:o(Z)}),Dr(Ze,`width:${(o(Z)?100:o(S))??""}%`)}),_(x,te)};X(De,x=>{o(l)&&x(nt)})}var ve=$(De,2);{var Nt=x=>{var S=Kc(),Z=u(S);ds(Z,{size:16});var te=$(Z,2),ge=u(te);ee(()=>W(ge,o(c))),_(x,S)};X(ve,x=>{o(c)&&x(Nt)})}var en=$(P,2),rt=u(en),Ve=u(rt);Fa(Ve,{size:18});var Vt=$(rt,2);{var yn=x=>{var S=Yc(),Z=u(S);mr(Z,{size:24,class:"spin"}),_(x,S)},In=x=>{var S=Jc(),Z=u(S);To(Z,{size:32}),_(x,S)},jn=x=>{var S=rd(),Z=I(S);_n(Z,21,()=>o(n),me=>me.id,(me,ce)=>{const He=Ie(()=>o(ce).status.value==="loaded"),qe=Ie(()=>o(a)===o(ce).id);var vt=td(),nn=u(vt),pt=u(nn);let Ht;var rn=u(pt);{var Ze=se=>{var pe=Rn("Starting…");_(se,pe)},ye=se=>{var pe=Rn("Active");_(se,pe)},Ce=se=>{var pe=Rn("Standby");_(se,pe)};X(rn,se=>{o(qe)?se(Ze):o(He)?se(ye,1):se(Ce,-1)})}var St=$(pt,2),be=u(St),Sr=$(nn,2),Jr=u(Sr),zr=$(Sr,2),Zr=u(zr),z=$(zr,2),A=u(z);{var $e=se=>{var pe=Zc(),qt=u(pe);Co(qt,{size:14}),_(se,pe)},Oe=se=>{var pe=ed(),qt=u(pe);{var zt=Pt=>{var Bt=Xc(),Q=I(Bt);mr(Q,{size:14,class:"spin"}),_(Pt,Bt)},an=Pt=>{var Bt=Qc(),Q=I(Bt);ec(Q,{size:14}),_(Pt,Bt)};X(qt,Pt=>{o(qe)?Pt(zt):Pt(an,-1)})}ee(()=>{pe.disabled=!!o(a),gn(pe,"title",o(a)&&!o(qe)?"Another model is loading…":void 0)}),ne("click",pe,()=>m(o(ce).id)),_(se,pe)};X(A,se=>{o(He)?se($e):se(Oe,-1)})}ee((se,pe,qt)=>{Ht=Ke(pt,1,"status-tag svelte-rgdxjf",null,Ht,{active:o(He),booting:o(qe)}),W(be,se),W(Jr,pe),W(Zr,qt)},[()=>v(o(ce).size),()=>o(ce).id.split("/").pop(),()=>o(ce).id.includes("/")?o(ce).id.split("/").slice(0,-1).join("/"):"Local"]),_(me,vt)});var te=$(Z,2);{var ge=me=>{var ce=nd(),He=u(ce);ds(He,{size:16});var qe=$(He,2),vt=u(qe);ee(()=>W(vt,`Engine failed to start: ${o(i)??""}`)),_(me,ce)};X(te,me=>{o(i)&&me(ge)})}_(x,S)};X(Vt,x=>{o(r)?x(yn):o(n).length===0?x(In,1):x(jn,-1)})}var tn=$(en,2),Ln=u(tn);Lo(Ln,{size:12}),ee(()=>{W(k,`${o(n).length??""} installed`),_e.disabled=o(d),Ne.disabled=o(d)||!o(s)}),ne("keydown",_e,x=>x.key==="Enter"&&w()),Vr(_e,()=>o(s),x=>b(s,x)),ne("click",Ne,w),_(e,E),At()}ir(["keydown","click"]);var id=T('<div class="loading-state svelte-1kslagv"><!> <span>Syncing registry…</span></div>'),ld=T('<div class="empty-state svelte-1kslagv"><!> <h3 class="svelte-1kslagv">No plugins available</h3> <p class="svelte-1kslagv">Check back later as the registry grows.</p></div>'),od=T('<div class="plugin-card surface-card svelte-1kslagv"><div class="card-header svelte-1kslagv"><div class="plugin-identity svelte-1kslagv"><span class="plugin-name svelte-1kslagv"> </span> <span class="plugin-version svelte-1kslagv"> </span></div> <div class="plugin-icon-wrap svelte-1kslagv"><!></div></div> <p class="plugin-desc svelte-1kslagv"> </p> <div class="card-footer svelte-1kslagv"><span class="plugin-author svelte-1kslagv"> </span> <button class="btn-install svelte-1kslagv"><!></button></div></div>'),cd=T('<div class="plugin-grid svelte-1kslagv"></div>'),dd=T('<div class="plugins-view animate-fade svelte-1kslagv"><header class="page-header svelte-1kslagv"><div class="header-content"><h1 class="brand-font svelte-1kslagv">Plugins</h1> <p class="svelte-1kslagv">Extend Cheesecrab with community-built modules and integrations.</p></div> <div class="stat-pill svelte-1kslagv"><!> <span> </span></div></header> <!></div>');function ud(e,t){Et(t,!0);let n=$t(t,"onPluginInstalled",3,()=>{}),r=j(Le([])),a=j(!0),i=j(null);Xt(()=>{const y=setTimeout(()=>{b(r,[{id:"note",name:"CrabNote",description:"Zettelkasten-style neural notes with RAG auto-linking. Perfect for research.",author:"Cheesecrab Labs",version:"1.2.0",download_url:"https://example.com/plugins/crab-note.zip"},{id:"calendar",name:"CrabCalendar",description:"AI-first scheduling. It learns your peak focus hours and manages tasks.",author:"Cheesecrab Labs",version:"0.9.5",download_url:"https://example.com/plugins/crab-calendar.zip"}],!0),b(a,!1)},400);return()=>clearTimeout(y)});async function s(y){var C,O,k;if(!o(i)){b(i,y.id,!0);try{(k=(O=(C=window.go)==null?void 0:C.main)==null?void 0:O.App)!=null&&k.InstallPlugin?(await window.go.main.App.InstallPlugin(y.download_url),n()()):await new Promise(P=>setTimeout(P,1200))}catch(P){console.error("install plugin failed:",P)}finally{b(i,null)}}}var l=dd(),c=u(l),d=$(u(c),2),f=u(d);Hr(f,{size:14});var h=$(f,2),v=u(h),w=$(c,2);{var m=y=>{var C=id(),O=u(C);mr(O,{size:22,class:"spin"}),_(y,C)},E=y=>{var C=ld(),O=u(C);Ho(O,{size:36}),_(y,C)},g=y=>{var C=cd();_n(C,21,()=>o(r),O=>O.id,(O,k)=>{var P=od(),q=u(P),M=u(q),N=u(M),L=u(N),G=$(N,2),oe=u(G),_e=$(M,2),Ne=u(_e);Hr(Ne,{size:20});var Te=$(q,2),Ye=u(Te),Je=$(Te,2),De=u(Je),nt=u(De),ve=$(De,2),Nt=u(ve);{var en=Ve=>{mr(Ve,{size:14,class:"spin"})},rt=Ve=>{Po(Ve,{size:14})};X(Nt,Ve=>{o(i)===o(k).id?Ve(en):Ve(rt,-1)})}ee(()=>{W(L,o(k).name),W(oe,`v${o(k).version??""}`),W(Ye,o(k).description),W(nt,`by ${o(k).author??""}`),ve.disabled=!!o(i),gn(ve,"title",o(i)===o(k).id?"Installing…":"Install"),gn(ve,"aria-label",`Install ${o(k).name??""}`)}),ne("click",ve,()=>s(o(k))),_(O,P)}),_(y,C)};X(w,y=>{o(a)?y(m):o(r).length===0?y(E,1):y(g,-1)})}ee(()=>W(v,`${o(r).length??""} available`)),_(e,l),At()}ir(["click"]);var fd=T('<div class="view-container svelte-15jzpb1"><div id="luckysheet" class="svelte-15jzpb1"></div></div>');function vd(e,t){Et(t,!1),lr(()=>{const r=s=>new Promise((l,c)=>{const d=document.createElement("script");d.src=s,d.onload=l,d.onerror=c,document.head.appendChild(d)}),a=s=>{const l=document.createElement("link");l.rel="stylesheet",l.href=s,document.head.appendChild(l)},i="/crabtable/";a(i+"plugins/css/pluginsCss.css"),a(i+"plugins/plugins.css"),a(i+"css/luckysheet.css"),a(i+"assets/iconfont/iconfont.css"),(async()=>{try{await r(i+"plugins/js/plugin.js"),await r(i+"luckysheet.umd.js"),window.luckysheet.create({container:"luckysheet",title:"Crab Table",lang:"en",data:[{name:"Sheet1",color:"",status:"1",order:"0",data:[],config:{},index:0}]})}catch(s){console.error("Failed to load Luckysheet:",s)}})()}),yi();var n=fd();_(e,n),At()}var pd=T('<div class="loading svelte-3zvtg1"><span class="spinner svelte-3zvtg1">🦀</span> <p>Nibbling plugin files...</p></div>'),hd=T('<div class="plugin-host svelte-3zvtg1"><!></div>');function _d(e,t){Et(t,!0);let n=j(null),r=j(!1),a=j(null);lr(()=>{i()}),ko(()=>{l()});async function i(){const h=`script-plugin-${t.manifest.id}`;if(document.getElementById(h))b(r,!0),s();else{const v=document.createElement("script");v.id=h,v.type="module",v.src=`plugin://${t.manifest.id}/${t.manifest.main_js}`,v.onload=()=>{b(r,!0),s()},v.onerror=w=>{console.error(`Failed to load plugin script: ${t.manifest.id}`,w)},document.body.appendChild(v)}}function s(){if(!(!o(r)||!o(n))){o(n).innerHTML="";try{const h=document.createElement(t.manifest.entry_element);o(n).appendChild(h),b(a,h,!0),console.log(`Plugin mounted: ${t.manifest.id}`)}catch(h){console.error(`Failed to mount plugin component: ${t.manifest.entry_element}`,h)}}}function l(){o(a)&&o(a).parentNode&&o(a).parentNode.removeChild(o(a))}Xt(()=>{o(n)&&o(r)&&!o(a)&&s()});var c=hd(),d=u(c);{var f=h=>{var v=pd();_(h,v)};X(d,h=>{o(r)||h(f)})}Da(c,h=>b(n,h),()=>o(n)),_(e,c),At()}var gd=T('<div class="placeholder svelte-1n46o8q"><h1 class="brand-font svelte-1n46o8q"> </h1> <p>This module is under development.</p></div>'),md=T('<div class="animate-fade h-full svelte-1n46o8q"><!></div>'),yd=T('<main class="layout svelte-1n46o8q"><!> <div class="content-wrapper svelte-1n46o8q"><div class="main-content svelte-1n46o8q"><!></div> <!></div></main>');function bd(e,t){Et(t,!0);let n=j("chat"),r=j(Le([])),a=j("dark");lr(()=>{const w=localStorage.getItem("cheesecrab-theme")||"dark";b(a,w,!0),document.documentElement.setAttribute("data-theme",o(a))});function i(){b(a,o(a)==="dark"?"light":"dark",!0),document.documentElement.setAttribute("data-theme",o(a)),localStorage.getItem("cheesecrab-theme",o(a))}Xt(()=>{window.go&&window.go.main&&window.go.main.App&&window.go.main.App.GetInstalledPlugins().then(w=>{b(r,w||[],!0)})});const s=Ie(()=>o(r).find(w=>w.id===o(n)));var l=yd(),c=u(l);lc(c,{get installedPlugins(){return o(r)},get theme(){return o(a)},onToggleTheme:i,get activeView(){return o(n)},set activeView(w){b(n,w,!0)}});var d=$(c,2),f=u(d),h=u(f);so(h,()=>o(n),w=>{var m=md(),E=u(m);{var g=M=>{wc(M,{})},y=M=>{qc(M,{})},C=M=>{sd(M,{})},O=M=>{ud(M,{onPluginInstalled:()=>{var N,L,G;(G=(L=(N=window.go)==null?void 0:N.main)==null?void 0:L.App)==null||G.GetInstalledPlugins().then(oe=>{b(r,oe||[],!0)})}})},k=M=>{vd(M,{})},P=M=>{_d(M,{get manifest(){return o(s)}})},q=M=>{var N=gd(),L=u(N),G=u(L);ee(()=>W(G,o(n))),_(M,N)};X(E,M=>{o(n)==="chat"?M(g):o(n)==="agent"?M(y,1):o(n)==="models"?M(C,2):o(n)==="plugins"?M(O,3):o(n)==="crabtable"?M(k,4):o(s)?M(P,5):M(q,-1)})}_(w,m)});var v=$(f,2);cc(v,{}),ee(()=>gn(l,"data-theme",o(a))),_(e,l),At()}to(bd,{target:document.getElementById("app")});

var xi=Object.defineProperty;var qa=e=>{throw TypeError(e)};var ki=(e,t,r)=>t in e?xi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var gt=(e,t,r)=>ki(e,typeof t!="symbol"?t+"":t,r),Xn=(e,t,r)=>t.has(e)||qa("Cannot "+r);var p=(e,t,r)=>(Xn(e,t,"read from private field"),r?r.call(e):t.get(e)),J=(e,t,r)=>t.has(e)?qa("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),G=(e,t,r,n)=>(Xn(e,t,"write to private field"),n?n.call(e,r):t.set(e,r),r),he=(e,t,r)=>(Xn(e,t,"access private method"),r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(a){if(a.ep)return;a.ep=!0;const i=r(a);fetch(a.href,i)}})();const Ai=!1;var Aa=Array.isArray,Ei=Array.prototype.indexOf,Kr=Array.prototype.includes,Un=Array.from,Mi=Object.defineProperty,cr=Object.getOwnPropertyDescriptor,ys=Object.getOwnPropertyDescriptors,Ni=Object.prototype,Si=Array.prototype,Ea=Object.getPrototypeOf,Ba=Object.isExtensible;function on(e){return typeof e=="function"}const zi=()=>{};function Pi(e){return e()}function ia(e){for(var t=0;t<e.length;t++)e[t]()}function bs(){var e,t,r=new Promise((n,a)=>{e=n,t=a});return{promise:r,resolve:e,reject:t}}function Ti(e,t){if(Array.isArray(e))return e;if(!(Symbol.iterator in e))return Array.from(e);const r=[];for(const n of e)if(r.push(n),r.length===t)break;return r}const Me=2,Yr=4,xn=8,Ma=1<<24,gr=16,xt=32,zr=64,la=128,ot=512,we=1024,Pe=2048,kt=4096,tt=8192,ct=16384,Cr=32768,oa=1<<25,fr=65536,Ga=1<<17,Ci=1<<18,tn=1<<19,$s=1<<20,jt=1<<25,Pr=65536,ca=1<<21,Na=1<<22,dr=1<<23,Lt=Symbol("$state"),ws=Symbol("legacy props"),Oi=Symbol(""),Wt=new class extends Error{constructor(){super(...arguments);gt(this,"name","StaleReactionError");gt(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};var _s;const xs=!!((_s=globalThis.document)!=null&&_s.contentType)&&globalThis.document.contentType.includes("xml");function ks(e){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function Ii(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function ji(e,t,r){throw new Error("https://svelte.dev/e/each_key_duplicate")}function Li(e){throw new Error("https://svelte.dev/e/effect_in_teardown")}function Ri(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function Di(e){throw new Error("https://svelte.dev/e/effect_orphan")}function Fi(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Vi(e){throw new Error("https://svelte.dev/e/props_invalid_value")}function Hi(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function qi(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function Bi(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function Gi(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}const Ui=1,Wi=2,As=4,Ki=8,Yi=16,Ji=1,Zi=2,Es=4,Xi=8,Qi=16,el=1,tl=2,Ee=Symbol(),Ms="http://www.w3.org/1999/xhtml",rl="http://www.w3.org/2000/svg",nl="@attach";function al(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}function sl(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function Ns(e){return e===this.v}function il(e,t){return e!=e?t==t:e!==t||e!==null&&typeof e=="object"||typeof e=="function"}function Ss(e){return!il(e,this.v)}let rn=!1,ll=!1;function ol(){rn=!0}let ce=null;function Jr(e){ce=e}function Dt(e,t=!1,r){ce={p:ce,i:!1,c:null,e:null,s:e,x:null,r:K,l:rn&&!t?{s:null,u:null,$:[]}:null}}function Ft(e){var t=ce,r=t.e;if(r!==null){t.e=null;for(var n of r)Xs(n)}return t.i=!0,ce=t.p,{}}function nn(){return!rn||ce!==null&&ce.l===null}let wr=[];function zs(){var e=wr;wr=[],ia(e)}function Zt(e){if(wr.length===0&&!pn){var t=wr;queueMicrotask(()=>{t===wr&&zs()})}wr.push(e)}function cl(){for(;wr.length>0;)zs()}function Ps(e){var t=K;if(t===null)return W.f|=dr,e;if(!(t.f&Cr)&&!(t.f&Yr))throw e;or(e,t)}function or(e,t){for(;t!==null;){if(t.f&la){if(!(t.f&Cr))throw e;try{t.b.error(e);return}catch(r){e=r}}t=t.parent}throw e}const dl=-7169;function ue(e,t){e.f=e.f&dl|t}function Sa(e){e.f&ot||e.deps===null?ue(e,we):ue(e,kt)}function Ts(e){if(e!==null)for(const t of e)!(t.f&Me)||!(t.f&Pr)||(t.f^=Pr,Ts(t.deps))}function Cs(e,t,r){e.f&Pe?t.add(e):e.f&kt&&r.add(e),Ts(e.deps),ue(e,we)}let Pn=!1;function ul(e){var t=Pn;try{return Pn=!1,[e(),Pn]}finally{Pn=t}}const cn=new Set;let H=null,je=null,da=null,pn=!1,Qn=!1,Rr=null,Cn=null;var Ua=0;let fl=1;var Dr,Fr,Vr,Hr,bn,it,qr,ir,Kt,Br,Re,ua,fa,va,pa,Os;const qn=class qn{constructor(){J(this,Re);gt(this,"id",fl++);gt(this,"current",new Map);gt(this,"previous",new Map);J(this,Dr,new Set);J(this,Fr,new Set);J(this,Vr,0);J(this,Hr,0);J(this,bn,null);J(this,it,[]);J(this,qr,new Set);J(this,ir,new Set);J(this,Kt,new Map);gt(this,"is_fork",!1);J(this,Br,!1)}skip_effect(t){p(this,Kt).has(t)||p(this,Kt).set(t,{d:[],m:[]})}unskip_effect(t){var r=p(this,Kt).get(t);if(r){p(this,Kt).delete(t);for(var n of r.d)ue(n,Pe),this.schedule(n);for(n of r.m)ue(n,kt),this.schedule(n)}}capture(t,r){r!==Ee&&!this.previous.has(t)&&this.previous.set(t,r),t.f&dr||(this.current.set(t,t.v),je==null||je.set(t,t.v))}activate(){H=this}deactivate(){H=null,je=null}flush(){try{if(Qn=!0,H=this,!he(this,Re,ua).call(this)){for(const t of p(this,qr))p(this,ir).delete(t),ue(t,Pe),this.schedule(t);for(const t of p(this,ir))ue(t,kt),this.schedule(t)}he(this,Re,fa).call(this)}finally{Ua=0,da=null,Rr=null,Cn=null,Qn=!1,H=null,je=null,ur.clear()}}discard(){for(const t of p(this,Fr))t(this);p(this,Fr).clear()}increment(t){G(this,Vr,p(this,Vr)+1),t&&G(this,Hr,p(this,Hr)+1)}decrement(t,r){G(this,Vr,p(this,Vr)-1),t&&G(this,Hr,p(this,Hr)-1),!(p(this,Br)||r)&&(G(this,Br,!0),Zt(()=>{G(this,Br,!1),this.flush()}))}oncommit(t){p(this,Dr).add(t)}ondiscard(t){p(this,Fr).add(t)}settled(){return(p(this,bn)??G(this,bn,bs())).promise}static ensure(){if(H===null){const t=H=new qn;Qn||(cn.add(H),pn||Zt(()=>{H===t&&t.flush()}))}return H}apply(){{je=null;return}}schedule(t){var a;if(da=t,(a=t.b)!=null&&a.is_pending&&t.f&(Yr|xn|Ma)&&!(t.f&Cr)){t.b.defer_effect(t);return}for(var r=t;r.parent!==null;){r=r.parent;var n=r.f;if(Rr!==null&&r===K&&(W===null||!(W.f&Me)))return;if(n&(zr|xt)){if(!(n&we))return;r.f^=we}}p(this,it).push(r)}};Dr=new WeakMap,Fr=new WeakMap,Vr=new WeakMap,Hr=new WeakMap,bn=new WeakMap,it=new WeakMap,qr=new WeakMap,ir=new WeakMap,Kt=new WeakMap,Br=new WeakMap,Re=new WeakSet,ua=function(){return this.is_fork||p(this,Hr)>0},fa=function(){var l,c;Ua++>1e3&&pl();const t=p(this,it);G(this,it,[]),this.apply();var r=Rr=[],n=[],a=Cn=[];for(const d of t)try{he(this,Re,va).call(this,d,r,n)}catch(f){throw Rs(d),f}if(H=null,a.length>0){var i=qn.ensure();for(const d of a)i.schedule(d)}if(Rr=null,Cn=null,he(this,Re,ua).call(this)){he(this,Re,pa).call(this,n),he(this,Re,pa).call(this,r);for(const[d,f]of p(this,Kt))Ls(d,f)}else{p(this,Vr)===0&&cn.delete(this),p(this,qr).clear(),p(this,ir).clear();for(const d of p(this,Dr))d(this);p(this,Dr).clear(),Wa(n),Wa(r),(l=p(this,bn))==null||l.resolve()}var s=H;if(p(this,it).length>0){const d=s??(s=this);p(d,it).push(...p(this,it).filter(f=>!p(d,it).includes(f)))}s!==null&&(cn.add(s),he(c=s,Re,fa).call(c)),cn.has(this)||he(this,Re,Os).call(this)},va=function(t,r,n){t.f^=we;for(var a=t.first;a!==null;){var i=a.f,s=(i&(xt|zr))!==0,l=s&&(i&we)!==0,c=l||(i&tt)!==0||p(this,Kt).has(a);if(!c&&a.fn!==null){s?a.f^=we:i&Yr?r.push(a):En(a)&&(i&gr&&p(this,ir).add(a),Qr(a));var d=a.first;if(d!==null){a=d;continue}}for(;a!==null;){var f=a.next;if(f!==null){a=f;break}a=a.parent}}},pa=function(t){for(var r=0;r<t.length;r+=1)Cs(t[r],p(this,qr),p(this,ir))},Os=function(){var c;for(const d of cn){var t=d.id<this.id,r=[];for(const[f,h]of this.current){if(d.current.has(f))if(t&&h!==d.current.get(f))d.current.set(f,h);else continue;r.push(f)}if(r.length!==0){var n=[...d.current.keys()].filter(f=>!this.current.has(f));if(n.length>0){d.activate();var a=new Set,i=new Map;for(var s of r)Is(s,n,a,i);if(p(d,it).length>0){d.apply();for(var l of p(d,it))he(c=d,Re,va).call(c,l,[],[])}d.deactivate()}}}};let Tr=qn;function vl(e){var t=pn;pn=!0;try{for(var r;;){if(cl(),H===null)return r;H.flush()}}finally{pn=t}}function pl(){try{Fi()}catch(e){or(e,da)}}let mt=null;function Wa(e){var t=e.length;if(t!==0){for(var r=0;r<t;){var n=e[r++];if(!(n.f&(ct|tt))&&En(n)&&(mt=new Set,Qr(n),n.deps===null&&n.first===null&&n.nodes===null&&n.teardown===null&&n.ac===null&&ti(n),(mt==null?void 0:mt.size)>0)){ur.clear();for(const a of mt){if(a.f&(ct|tt))continue;const i=[a];let s=a.parent;for(;s!==null;)mt.has(s)&&(mt.delete(s),i.push(s)),s=s.parent;for(let l=i.length-1;l>=0;l--){const c=i[l];c.f&(ct|tt)||Qr(c)}}mt.clear()}}mt=null}}function Is(e,t,r,n){if(!r.has(e)&&(r.add(e),e.reactions!==null))for(const a of e.reactions){const i=a.f;i&Me?Is(a,t,r,n):i&(Na|gr)&&!(i&Pe)&&js(a,t,n)&&(ue(a,Pe),za(a))}}function js(e,t,r){const n=r.get(e);if(n!==void 0)return n;if(e.deps!==null)for(const a of e.deps){if(Kr.call(t,a))return!0;if(a.f&Me&&js(a,t,r))return r.set(a,!0),!0}return r.set(e,!1),!1}function za(e){H.schedule(e)}function Ls(e,t){if(!(e.f&xt&&e.f&we)){e.f&Pe?t.d.push(e):e.f&kt&&t.m.push(e),ue(e,we);for(var r=e.first;r!==null;)Ls(r,t),r=r.next}}function Rs(e){ue(e,we);for(var t=e.first;t!==null;)Rs(t),t=t.next}function hl(e){let t=0,r=vr(0),n;return()=>{Ca()&&(o(r),Ia(()=>(t===0&&(n=Qt(()=>e(()=>hn(r)))),t+=1,()=>{Zt(()=>{t-=1,t===0&&(n==null||n(),n=void 0,hn(r))})})))}}var _l=fr|tn;function gl(e,t,r,n){new ml(e,t,r,n)}var lt,ka,Ct,Ar,Ge,Ot,Qe,yt,Yt,Er,lr,Gr,Ur,Wr,Jt,Bn,xe,yl,bl,$l,ha,On,In,_a;class ml{constructor(t,r,n,a){J(this,xe);gt(this,"parent");gt(this,"is_pending",!1);gt(this,"transform_error");J(this,lt);J(this,ka,null);J(this,Ct);J(this,Ar);J(this,Ge);J(this,Ot,null);J(this,Qe,null);J(this,yt,null);J(this,Yt,null);J(this,Er,0);J(this,lr,0);J(this,Gr,!1);J(this,Ur,new Set);J(this,Wr,new Set);J(this,Jt,null);J(this,Bn,hl(()=>(G(this,Jt,vr(p(this,Er))),()=>{G(this,Jt,null)})));var i;G(this,lt,t),G(this,Ct,r),G(this,Ar,s=>{var l=K;l.b=this,l.f|=la,n(s)}),this.parent=K.b,this.transform_error=a??((i=this.parent)==null?void 0:i.transform_error)??(s=>s),G(this,Ge,an(()=>{he(this,xe,ha).call(this)},_l))}defer_effect(t){Cs(t,p(this,Ur),p(this,Wr))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!p(this,Ct).pending}update_pending_count(t,r){he(this,xe,_a).call(this,t,r),G(this,Er,p(this,Er)+t),!(!p(this,Jt)||p(this,Gr))&&(G(this,Gr,!0),Zt(()=>{G(this,Gr,!1),p(this,Jt)&&Zr(p(this,Jt),p(this,Er))}))}get_effect_pending(){return p(this,Bn).call(this),o(p(this,Jt))}error(t){var r=p(this,Ct).onerror;let n=p(this,Ct).failed;if(!r&&!n)throw t;p(this,Ot)&&(ze(p(this,Ot)),G(this,Ot,null)),p(this,Qe)&&(ze(p(this,Qe)),G(this,Qe,null)),p(this,yt)&&(ze(p(this,yt)),G(this,yt,null));var a=!1,i=!1;const s=()=>{if(a){sl();return}a=!0,i&&Gi(),p(this,yt)!==null&&Nr(p(this,yt),()=>{G(this,yt,null)}),he(this,xe,In).call(this,()=>{he(this,xe,ha).call(this)})},l=c=>{try{i=!0,r==null||r(c,s),i=!1}catch(d){or(d,p(this,Ge)&&p(this,Ge).parent)}n&&G(this,yt,he(this,xe,In).call(this,()=>{try{return We(()=>{var d=K;d.b=this,d.f|=la,n(p(this,lt),()=>c,()=>s)})}catch(d){return or(d,p(this,Ge).parent),null}}))};Zt(()=>{var c;try{c=this.transform_error(t)}catch(d){or(d,p(this,Ge)&&p(this,Ge).parent);return}c!==null&&typeof c=="object"&&typeof c.then=="function"?c.then(l,d=>or(d,p(this,Ge)&&p(this,Ge).parent)):l(c)})}}lt=new WeakMap,ka=new WeakMap,Ct=new WeakMap,Ar=new WeakMap,Ge=new WeakMap,Ot=new WeakMap,Qe=new WeakMap,yt=new WeakMap,Yt=new WeakMap,Er=new WeakMap,lr=new WeakMap,Gr=new WeakMap,Ur=new WeakMap,Wr=new WeakMap,Jt=new WeakMap,Bn=new WeakMap,xe=new WeakSet,yl=function(){try{G(this,Ot,We(()=>p(this,Ar).call(this,p(this,lt))))}catch(t){this.error(t)}},bl=function(t){const r=p(this,Ct).failed;r&&G(this,yt,We(()=>{r(p(this,lt),()=>t,()=>()=>{})}))},$l=function(){const t=p(this,Ct).pending;t&&(this.is_pending=!0,G(this,Qe,We(()=>t(p(this,lt)))),Zt(()=>{var r=G(this,Yt,document.createDocumentFragment()),n=Rt();r.append(n),G(this,Ot,he(this,xe,In).call(this,()=>We(()=>p(this,Ar).call(this,n)))),p(this,lr)===0&&(p(this,lt).before(r),G(this,Yt,null),Nr(p(this,Qe),()=>{G(this,Qe,null)}),he(this,xe,On).call(this,H))}))},ha=function(){try{if(this.is_pending=this.has_pending_snippet(),G(this,lr,0),G(this,Er,0),G(this,Ot,We(()=>{p(this,Ar).call(this,p(this,lt))})),p(this,lr)>0){var t=G(this,Yt,document.createDocumentFragment());Ra(p(this,Ot),t);const r=p(this,Ct).pending;G(this,Qe,We(()=>r(p(this,lt))))}else he(this,xe,On).call(this,H)}catch(r){this.error(r)}},On=function(t){this.is_pending=!1;for(const r of p(this,Ur))ue(r,Pe),t.schedule(r);for(const r of p(this,Wr))ue(r,kt),t.schedule(r);p(this,Ur).clear(),p(this,Wr).clear()},In=function(t){var r=K,n=W,a=ce;ft(p(this,Ge)),ut(p(this,Ge)),Jr(p(this,Ge).ctx);try{return Tr.ensure(),t()}catch(i){return Ps(i),null}finally{ft(r),ut(n),Jr(a)}},_a=function(t,r){var n;if(!this.has_pending_snippet()){this.parent&&he(n=this.parent,xe,_a).call(n,t,r);return}G(this,lr,p(this,lr)+t),p(this,lr)===0&&(he(this,xe,On).call(this,r),p(this,Qe)&&Nr(p(this,Qe),()=>{G(this,Qe,null)}),p(this,Yt)&&(p(this,lt).before(p(this,Yt)),G(this,Yt,null)))};function Ds(e,t,r,n){const a=nn()?kn:Pa;var i=e.filter(v=>!v.settled);if(r.length===0&&i.length===0){n(t.map(a));return}var s=K,l=wl(),c=i.length===1?i[0].promise:i.length>1?Promise.all(i.map(v=>v.promise)):null;function d(v){l();try{n(v)}catch(w){s.f&ct||or(w,s)}Rn()}if(r.length===0){c.then(()=>d(t.map(a)));return}var f=Fs();function h(){Promise.all(r.map(v=>xl(v))).then(v=>d([...t.map(a),...v])).catch(v=>or(v,s)).finally(()=>f())}c?c.then(()=>{l(),h(),Rn()}):h()}function wl(){var e=K,t=W,r=ce,n=H;return function(i=!0){ft(e),ut(t),Jr(r),i&&!(e.f&ct)&&(n==null||n.activate(),n==null||n.apply())}}function Rn(e=!0){ft(null),ut(null),Jr(null),e&&(H==null||H.deactivate())}function Fs(){var e=K.b,t=H,r=e.is_rendered();return e.update_pending_count(1,t),t.increment(r),(n=!1)=>{e.update_pending_count(-1,t),t.decrement(r,n)}}function kn(e){var t=Me|Pe,r=W!==null&&W.f&Me?W:null;return K!==null&&(K.f|=tn),{ctx:ce,deps:null,effects:null,equals:Ns,f:t,fn:e,reactions:null,rv:0,v:Ee,wv:0,parent:r??K,ac:null}}function xl(e,t,r){let n=K;n===null&&Ii();var a=void 0,i=vr(Ee),s=!W,l=new Map;return Ll(()=>{var w;var c=K,d=bs();a=d.promise;try{Promise.resolve(e()).then(d.resolve,d.reject).finally(Rn)}catch(m){d.reject(m),Rn()}var f=H;if(s){if(c.f&Cr)var h=Fs();if(n.b.is_rendered())(w=l.get(f))==null||w.reject(Wt),l.delete(f);else{for(const m of l.values())m.reject(Wt);l.clear()}l.set(f,d)}const v=(m,A=void 0)=>{if(h){var g=A===Wt;h(g)}if(!(A===Wt||c.f&ct)){if(f.activate(),A)i.f|=dr,Zr(i,A);else{i.f&dr&&(i.f^=dr),Zr(i,m);for(const[y,C]of l){if(l.delete(y),y===f)break;C.reject(Wt)}}f.deactivate()}};d.promise.then(v,m=>v(null,m||"unknown"))}),Oa(()=>{for(const c of l.values())c.reject(Wt)}),new Promise(c=>{function d(f){function h(){f===a?c(i):d(a)}f.then(h,h)}d(a)})}function Ie(e){const t=kn(e);return ai(t),t}function Pa(e){const t=kn(e);return t.equals=Ss,t}function kl(e){var t=e.effects;if(t!==null){e.effects=null;for(var r=0;r<t.length;r+=1)ze(t[r])}}function Al(e){for(var t=e.parent;t!==null;){if(!(t.f&Me))return t.f&ct?null:t;t=t.parent}return null}function Ta(e){var t,r=K;ft(Al(e));try{e.f&=~Pr,kl(e),t=oi(e)}finally{ft(r)}return t}function Vs(e){var t=Ta(e);if(!e.equals(t)&&(e.wv=ii(),(!(H!=null&&H.is_fork)||e.deps===null)&&(e.v=t,e.deps===null))){ue(e,we);return}pr||(je!==null?(Ca()||H!=null&&H.is_fork)&&je.set(e,t):Sa(e))}function El(e){var t,r;if(e.effects!==null)for(const n of e.effects)(n.teardown||n.ac)&&((t=n.teardown)==null||t.call(n),(r=n.ac)==null||r.abort(Wt),n.teardown=zi,n.ac=null,mn(n,0),ja(n))}function Hs(e){if(e.effects!==null)for(const t of e.effects)t.teardown&&Qr(t)}let ga=new Set;const ur=new Map;let qs=!1;function vr(e,t){var r={f:0,v:e,reactions:null,equals:Ns,rv:0,wv:0};return r}function L(e,t){const r=vr(e);return ai(r),r}function Ml(e,t=!1,r=!0){var a;const n=vr(e);return t||(n.equals=Ss),rn&&r&&ce!==null&&ce.l!==null&&((a=ce.l).s??(a.s=[])).push(n),n}function b(e,t,r=!1){W!==null&&(!wt||W.f&Ga)&&nn()&&W.f&(Me|gr|Na|Ga)&&(dt===null||!Kr.call(dt,e))&&Bi();let n=r?Le(t):t;return Zr(e,n,Cn)}function Zr(e,t,r=null){if(!e.equals(t)){var n=e.v;pr?ur.set(e,t):ur.set(e,n),e.v=t;var a=Tr.ensure();if(a.capture(e,n),e.f&Me){const i=e;e.f&Pe&&Ta(i),Sa(i)}e.wv=ii(),Bs(e,Pe,r),nn()&&K!==null&&K.f&we&&!(K.f&(xt|zr))&&(st===null?Fl([e]):st.push(e)),!a.is_fork&&ga.size>0&&!qs&&Nl()}return t}function Nl(){qs=!1;for(const e of ga)e.f&we&&ue(e,kt),En(e)&&Qr(e);ga.clear()}function Ka(e,t=1){var r=o(e),n=t===1?r++:r--;return b(e,r),n}function hn(e){b(e,e.v+1)}function Bs(e,t,r){var n=e.reactions;if(n!==null)for(var a=nn(),i=n.length,s=0;s<i;s++){var l=n[s],c=l.f;if(!(!a&&l===K)){var d=(c&Pe)===0;if(d&&ue(l,t),c&Me){var f=l;je==null||je.delete(f),c&Pr||(c&ot&&(l.f|=Pr),Bs(f,kt,r))}else if(d){var h=l;c&gr&&mt!==null&&mt.add(h),r!==null?r.push(h):za(h)}}}}function Le(e){if(typeof e!="object"||e===null||Lt in e)return e;const t=Ea(e);if(t!==Ni&&t!==Si)return e;var r=new Map,n=Aa(e),a=L(0),i=Sr,s=l=>{if(Sr===i)return l();var c=W,d=Sr;ut(null),Qa(i);var f=l();return ut(c),Qa(d),f};return n&&r.set("length",L(e.length)),new Proxy(e,{defineProperty(l,c,d){(!("value"in d)||d.configurable===!1||d.enumerable===!1||d.writable===!1)&&Hi();var f=r.get(c);return f===void 0?s(()=>{var h=L(d.value);return r.set(c,h),h}):b(f,d.value,!0),!0},deleteProperty(l,c){var d=r.get(c);if(d===void 0){if(c in l){const f=s(()=>L(Ee));r.set(c,f),hn(a)}}else b(d,Ee),hn(a);return!0},get(l,c,d){var w;if(c===Lt)return e;var f=r.get(c),h=c in l;if(f===void 0&&(!h||(w=cr(l,c))!=null&&w.writable)&&(f=s(()=>{var m=Le(h?l[c]:Ee),A=L(m);return A}),r.set(c,f)),f!==void 0){var v=o(f);return v===Ee?void 0:v}return Reflect.get(l,c,d)},getOwnPropertyDescriptor(l,c){var d=Reflect.getOwnPropertyDescriptor(l,c);if(d&&"value"in d){var f=r.get(c);f&&(d.value=o(f))}else if(d===void 0){var h=r.get(c),v=h==null?void 0:h.v;if(h!==void 0&&v!==Ee)return{enumerable:!0,configurable:!0,value:v,writable:!0}}return d},has(l,c){var v;if(c===Lt)return!0;var d=r.get(c),f=d!==void 0&&d.v!==Ee||Reflect.has(l,c);if(d!==void 0||K!==null&&(!f||(v=cr(l,c))!=null&&v.writable)){d===void 0&&(d=s(()=>{var w=f?Le(l[c]):Ee,m=L(w);return m}),r.set(c,d));var h=o(d);if(h===Ee)return!1}return f},set(l,c,d,f){var O;var h=r.get(c),v=c in l;if(n&&c==="length")for(var w=d;w<h.v;w+=1){var m=r.get(w+"");m!==void 0?b(m,Ee):w in l&&(m=s(()=>L(Ee)),r.set(w+"",m))}if(h===void 0)(!v||(O=cr(l,c))!=null&&O.writable)&&(h=s(()=>L(void 0)),b(h,Le(d)),r.set(c,h));else{v=h.v!==Ee;var A=s(()=>Le(d));b(h,A)}var g=Reflect.getOwnPropertyDescriptor(l,c);if(g!=null&&g.set&&g.set.call(f,d),!v){if(n&&typeof c=="string"){var y=r.get("length"),C=Number(c);Number.isInteger(C)&&C>=y.v&&b(y,C+1)}hn(a)}return!0},ownKeys(l){o(a);var c=Reflect.ownKeys(l).filter(h=>{var v=r.get(h);return v===void 0||v.v!==Ee});for(var[d,f]of r)f.v!==Ee&&!(d in l)&&c.push(d);return c},setPrototypeOf(){qi()}})}function Ya(e){try{if(e!==null&&typeof e=="object"&&Lt in e)return e[Lt]}catch{}return e}function Sl(e,t){return Object.is(Ya(e),Ya(t))}var Ja,Gs,Us,Ws;function zl(){if(Ja===void 0){Ja=window,Gs=/Firefox/.test(navigator.userAgent);var e=Element.prototype,t=Node.prototype,r=Text.prototype;Us=cr(t,"firstChild").get,Ws=cr(t,"nextSibling").get,Ba(e)&&(e.__click=void 0,e.__className=void 0,e.__attributes=null,e.__style=void 0,e.__e=void 0),Ba(r)&&(r.__t=void 0)}}function Rt(e=""){return document.createTextNode(e)}function Xr(e){return Us.call(e)}function An(e){return Ws.call(e)}function u(e,t){return Xr(e)}function j(e,t=!1){{var r=Xr(e);return r instanceof Comment&&r.data===""?An(r):r}}function $(e,t=1,r=!1){let n=e;for(;t--;)n=An(n);return n}function Pl(e){e.textContent=""}function Ks(){return!1}function Ys(e,t,r){return document.createElementNS(t??Ms,e,void 0)}function Tl(e,t){if(t){const r=document.body;e.autofocus=!0,Zt(()=>{document.activeElement===r&&e.focus()})}}let Za=!1;function Cl(){Za||(Za=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const r of e.target.elements)(t=r.__on_r)==null||t.call(r)})},{capture:!0}))}function Wn(e){var t=W,r=K;ut(null),ft(null);try{return e()}finally{ut(t),ft(r)}}function Js(e,t,r,n=r){e.addEventListener(t,()=>Wn(r));const a=e.__on_r;a?e.__on_r=()=>{a(),n(!0)}:e.__on_r=()=>n(!0),Cl()}function Zs(e){K===null&&(W===null&&Di(),Ri()),pr&&Li()}function Ol(e,t){var r=t.last;r===null?t.last=t.first=e:(r.next=e,e.prev=r,t.last=e)}function At(e,t){var r=K;r!==null&&r.f&tt&&(e|=tt);var n={ctx:ce,deps:null,nodes:null,f:e|Pe|ot,first:null,fn:t,last:null,next:null,parent:r,b:r&&r.b,prev:null,teardown:null,wv:0,ac:null},a=n;if(e&Yr)Rr!==null?Rr.push(n):Tr.ensure().schedule(n);else if(t!==null){try{Qr(n)}catch(s){throw ze(n),s}a.deps===null&&a.teardown===null&&a.nodes===null&&a.first===a.last&&!(a.f&tn)&&(a=a.first,e&gr&&e&fr&&a!==null&&(a.f|=fr))}if(a!==null&&(a.parent=r,r!==null&&Ol(a,r),W!==null&&W.f&Me&&!(e&zr))){var i=W;(i.effects??(i.effects=[])).push(a)}return n}function Ca(){return W!==null&&!wt}function Oa(e){const t=At(xn,null);return ue(t,we),t.teardown=e,t}function Xt(e){Zs();var t=K.f,r=!W&&(t&xt)!==0&&(t&Cr)===0;if(r){var n=ce;(n.e??(n.e=[])).push(e)}else return Xs(e)}function Xs(e){return At(Yr|$s,e)}function Il(e){return Zs(),At(xn|$s,e)}function jl(e){Tr.ensure();const t=At(zr|tn,e);return(r={})=>new Promise(n=>{r.outro?Nr(t,()=>{ze(t),n(void 0)}):(ze(t),n(void 0))})}function Kn(e){return At(Yr,e)}function Ll(e){return At(Na|tn,e)}function Ia(e,t=0){return At(xn|t,e)}function ee(e,t=[],r=[],n=[]){Ds(n,t,r,a=>{At(xn,()=>e(...a.map(o)))})}function an(e,t=0){var r=At(gr|t,e);return r}function Qs(e,t=0){var r=At(Ma|t,e);return r}function We(e){return At(xt|tn,e)}function ei(e){var t=e.teardown;if(t!==null){const r=pr,n=W;Xa(!0),ut(null);try{t.call(null)}finally{Xa(r),ut(n)}}}function ja(e,t=!1){var r=e.first;for(e.first=e.last=null;r!==null;){const a=r.ac;a!==null&&Wn(()=>{a.abort(Wt)});var n=r.next;r.f&zr?r.parent=null:ze(r,t),r=n}}function Rl(e){for(var t=e.first;t!==null;){var r=t.next;t.f&xt||ze(t),t=r}}function ze(e,t=!0){var r=!1;(t||e.f&Ci)&&e.nodes!==null&&e.nodes.end!==null&&(Dl(e.nodes.start,e.nodes.end),r=!0),ue(e,oa),ja(e,t&&!r),mn(e,0);var n=e.nodes&&e.nodes.t;if(n!==null)for(const i of n)i.stop();ei(e),e.f^=oa,e.f|=ct;var a=e.parent;a!==null&&a.first!==null&&ti(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.fn=e.nodes=e.ac=null}function Dl(e,t){for(;e!==null;){var r=e===t?null:An(e);e.remove(),e=r}}function ti(e){var t=e.parent,r=e.prev,n=e.next;r!==null&&(r.next=n),n!==null&&(n.prev=r),t!==null&&(t.first===e&&(t.first=n),t.last===e&&(t.last=r))}function Nr(e,t,r=!0){var n=[];ri(e,n,!0);var a=()=>{r&&ze(e),t&&t()},i=n.length;if(i>0){var s=()=>--i||a();for(var l of n)l.out(s)}else a()}function ri(e,t,r){if(!(e.f&tt)){e.f^=tt;var n=e.nodes&&e.nodes.t;if(n!==null)for(const l of n)(l.is_global||r)&&t.push(l);for(var a=e.first;a!==null;){var i=a.next,s=(a.f&fr)!==0||(a.f&xt)!==0&&(e.f&gr)!==0;ri(a,t,s?r:!1),a=i}}}function La(e){ni(e,!0)}function ni(e,t){if(e.f&tt){e.f^=tt,e.f&we||(ue(e,Pe),Tr.ensure().schedule(e));for(var r=e.first;r!==null;){var n=r.next,a=(r.f&fr)!==0||(r.f&xt)!==0;ni(r,a?t:!1),r=n}var i=e.nodes&&e.nodes.t;if(i!==null)for(const s of i)(s.is_global||t)&&s.in()}}function Ra(e,t){if(e.nodes)for(var r=e.nodes.start,n=e.nodes.end;r!==null;){var a=r===n?null:An(r);t.append(r),r=a}}let jn=!1,pr=!1;function Xa(e){pr=e}let W=null,wt=!1;function ut(e){W=e}let K=null;function ft(e){K=e}let dt=null;function ai(e){W!==null&&(dt===null?dt=[e]:dt.push(e))}let Ue=null,Xe=0,st=null;function Fl(e){st=e}let si=1,xr=0,Sr=xr;function Qa(e){Sr=e}function ii(){return++si}function En(e){var t=e.f;if(t&Pe)return!0;if(t&Me&&(e.f&=~Pr),t&kt){for(var r=e.deps,n=r.length,a=0;a<n;a++){var i=r[a];if(En(i)&&Vs(i),i.wv>e.wv)return!0}t&ot&&je===null&&ue(e,we)}return!1}function li(e,t,r=!0){var n=e.reactions;if(n!==null&&!(dt!==null&&Kr.call(dt,e)))for(var a=0;a<n.length;a++){var i=n[a];i.f&Me?li(i,t,!1):t===i&&(r?ue(i,Pe):i.f&we&&ue(i,kt),za(i))}}function oi(e){var A;var t=Ue,r=Xe,n=st,a=W,i=dt,s=ce,l=wt,c=Sr,d=e.f;Ue=null,Xe=0,st=null,W=d&(xt|zr)?null:e,dt=null,Jr(e.ctx),wt=!1,Sr=++xr,e.ac!==null&&(Wn(()=>{e.ac.abort(Wt)}),e.ac=null);try{e.f|=ca;var f=e.fn,h=f();e.f|=Cr;var v=e.deps,w=H==null?void 0:H.is_fork;if(Ue!==null){var m;if(w||mn(e,Xe),v!==null&&Xe>0)for(v.length=Xe+Ue.length,m=0;m<Ue.length;m++)v[Xe+m]=Ue[m];else e.deps=v=Ue;if(Ca()&&e.f&ot)for(m=Xe;m<v.length;m++)((A=v[m]).reactions??(A.reactions=[])).push(e)}else!w&&v!==null&&Xe<v.length&&(mn(e,Xe),v.length=Xe);if(nn()&&st!==null&&!wt&&v!==null&&!(e.f&(Me|kt|Pe)))for(m=0;m<st.length;m++)li(st[m],e);if(a!==null&&a!==e){if(xr++,a.deps!==null)for(let g=0;g<r;g+=1)a.deps[g].rv=xr;if(t!==null)for(const g of t)g.rv=xr;st!==null&&(n===null?n=st:n.push(...st))}return e.f&dr&&(e.f^=dr),h}catch(g){return Ps(g)}finally{e.f^=ca,Ue=t,Xe=r,st=n,W=a,dt=i,Jr(s),wt=l,Sr=c}}function Vl(e,t){let r=t.reactions;if(r!==null){var n=Ei.call(r,e);if(n!==-1){var a=r.length-1;a===0?r=t.reactions=null:(r[n]=r[a],r.pop())}}if(r===null&&t.f&Me&&(Ue===null||!Kr.call(Ue,t))){var i=t;i.f&ot&&(i.f^=ot,i.f&=~Pr),Sa(i),El(i),mn(i,0)}}function mn(e,t){var r=e.deps;if(r!==null)for(var n=t;n<r.length;n++)Vl(e,r[n])}function Qr(e){var t=e.f;if(!(t&ct)){ue(e,we);var r=K,n=jn;K=e,jn=!0;try{t&(gr|Ma)?Rl(e):ja(e),ei(e);var a=oi(e);e.teardown=typeof a=="function"?a:null,e.wv=si;var i;Ai&&ll&&e.f&Pe&&e.deps}finally{jn=n,K=r}}}async function Hl(){await Promise.resolve(),vl()}function o(e){var t=e.f,r=(t&Me)!==0;if(W!==null&&!wt){var n=K!==null&&(K.f&ct)!==0;if(!n&&(dt===null||!Kr.call(dt,e))){var a=W.deps;if(W.f&ca)e.rv<xr&&(e.rv=xr,Ue===null&&a!==null&&a[Xe]===e?Xe++:Ue===null?Ue=[e]:Ue.push(e));else{(W.deps??(W.deps=[])).push(e);var i=e.reactions;i===null?e.reactions=[W]:Kr.call(i,W)||i.push(W)}}}if(pr&&ur.has(e))return ur.get(e);if(r){var s=e;if(pr){var l=s.v;return(!(s.f&we)&&s.reactions!==null||di(s))&&(l=Ta(s)),ur.set(s,l),l}var c=(s.f&ot)===0&&!wt&&W!==null&&(jn||(W.f&ot)!==0),d=(s.f&Cr)===0;En(s)&&(c&&(s.f|=ot),Vs(s)),c&&!d&&(Hs(s),ci(s))}if(je!=null&&je.has(e))return je.get(e);if(e.f&dr)throw e.v;return e.v}function ci(e){if(e.f|=ot,e.deps!==null)for(const t of e.deps)(t.reactions??(t.reactions=[])).push(e),t.f&Me&&!(t.f&ot)&&(Hs(t),ci(t))}function di(e){if(e.v===Ee)return!0;if(e.deps===null)return!1;for(const t of e.deps)if(ur.has(t)||t.f&Me&&di(t))return!0;return!1}function Qt(e){var t=wt;try{return wt=!0,e()}finally{wt=t}}function $r(e){if(!(typeof e!="object"||!e||e instanceof EventTarget)){if(Lt in e)ma(e);else if(!Array.isArray(e))for(let t in e){const r=e[t];typeof r=="object"&&r&&Lt in r&&ma(r)}}}function ma(e,t=new Set){if(typeof e=="object"&&e!==null&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e),e instanceof Date&&e.getTime();for(let n in e)try{ma(e[n],t)}catch{}const r=Ea(e);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const n=ys(r);for(let a in n){const i=n[a].get;if(i)try{i.call(e)}catch{}}}}}function ql(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const Bl=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function Gl(e){return Bl.includes(e)}const Ul={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function Wl(e){return e=e.toLowerCase(),Ul[e]??e}const Kl=["touchstart","touchmove"];function Yl(e){return Kl.includes(e)}const kr=Symbol("events"),ui=new Set,ya=new Set;function Jl(e,t,r,n={}){function a(i){if(n.capture||ba.call(t,i),!i.cancelBubble)return Wn(()=>r==null?void 0:r.call(this,i))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?Zt(()=>{t.addEventListener(e,a,n)}):t.addEventListener(e,a,n),a}function re(e,t,r){(t[kr]??(t[kr]={}))[e]=r}function sn(e){for(var t=0;t<e.length;t++)ui.add(e[t]);for(var r of ya)r(e)}let es=null;function ba(e){var g,y;var t=this,r=t.ownerDocument,n=e.type,a=((g=e.composedPath)==null?void 0:g.call(e))||[],i=a[0]||e.target;es=e;var s=0,l=es===e&&e[kr];if(l){var c=a.indexOf(l);if(c!==-1&&(t===document||t===window)){e[kr]=t;return}var d=a.indexOf(t);if(d===-1)return;c<=d&&(s=c)}if(i=a[s]||e.target,i!==t){Mi(e,"currentTarget",{configurable:!0,get(){return i||r}});var f=W,h=K;ut(null),ft(null);try{for(var v,w=[];i!==null;){var m=i.assignedSlot||i.parentNode||i.host||null;try{var A=(y=i[kr])==null?void 0:y[n];A!=null&&(!i.disabled||e.target===i)&&A.call(i,e)}catch(C){v?w.push(C):v=C}if(e.cancelBubble||m===t||m===null)break;i=m}if(v){for(let C of w)queueMicrotask(()=>{throw C});throw v}}finally{e[kr]=t,delete e.currentTarget,ut(f),ft(h)}}}var gs;const ea=((gs=globalThis==null?void 0:globalThis.window)==null?void 0:gs.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:e=>e});function Zl(e){return(ea==null?void 0:ea.createHTML(e))??e}function fi(e){var t=Ys("template");return t.innerHTML=Zl(e.replaceAll("<!>","<!---->")),t.content}function en(e,t){var r=K;r.nodes===null&&(r.nodes={start:e,end:t,a:null,t:null})}function T(e,t){var r=(t&el)!==0,n=(t&tl)!==0,a,i=!e.startsWith("<!>");return()=>{a===void 0&&(a=fi(i?e:"<!>"+e),r||(a=Xr(a)));var s=n||Gs?document.importNode(a,!0):a.cloneNode(!0);if(r){var l=Xr(s),c=s.lastChild;en(l,c)}else en(s,s);return s}}function Xl(e,t,r="svg"){var n=!e.startsWith("<!>"),a=`<${r}>${n?e:"<!>"+e}</${r}>`,i;return()=>{if(!i){var s=fi(a),l=Xr(s);i=Xr(l)}var c=i.cloneNode(!0);return en(c,c),c}}function Ql(e,t){return Xl(e,t,"svg")}function Lr(e=""){{var t=Rt(e+"");return en(t,t),t}}function D(){var e=document.createDocumentFragment(),t=document.createComment(""),r=Rt();return e.append(t,r),en(t,r),e}function _(e,t){e!==null&&e.before(t)}function U(e,t){var r=t==null?"":typeof t=="object"?`${t}`:t;r!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=r,e.nodeValue=`${r}`)}function eo(e,t){return to(e,t)}const Tn=new Map;function to(e,{target:t,anchor:r,props:n={},events:a,context:i,intro:s=!0,transformError:l}){zl();var c=void 0,d=jl(()=>{var f=r??t.appendChild(Rt());gl(f,{pending:()=>{}},w=>{Dt({});var m=ce;i&&(m.c=i),a&&(n.$$events=a),c=e(w,n)||{},Ft()},l);var h=new Set,v=w=>{for(var m=0;m<w.length;m++){var A=w[m];if(!h.has(A)){h.add(A);var g=Yl(A);for(const O of[t,document]){var y=Tn.get(O);y===void 0&&(y=new Map,Tn.set(O,y));var C=y.get(A);C===void 0?(O.addEventListener(A,ba,{passive:g}),y.set(A,1)):y.set(A,C+1)}}}};return v(Un(ui)),ya.add(v),()=>{var g;for(var w of h)for(const y of[t,document]){var m=Tn.get(y),A=m.get(w);--A==0?(y.removeEventListener(w,ba),m.delete(w),m.size===0&&Tn.delete(y)):m.set(w,A)}ya.delete(v),f!==r&&((g=f.parentNode)==null||g.removeChild(f))}});return ro.set(c,d),c}let ro=new WeakMap;var bt,It,et,Mr,$n,wn,Gn;class Yn{constructor(t,r=!0){gt(this,"anchor");J(this,bt,new Map);J(this,It,new Map);J(this,et,new Map);J(this,Mr,new Set);J(this,$n,!0);J(this,wn,t=>{if(p(this,bt).has(t)){var r=p(this,bt).get(t),n=p(this,It).get(r);if(n)La(n),p(this,Mr).delete(r);else{var a=p(this,et).get(r);a&&(p(this,It).set(r,a.effect),p(this,et).delete(r),a.fragment.lastChild.remove(),this.anchor.before(a.fragment),n=a.effect)}for(const[i,s]of p(this,bt)){if(p(this,bt).delete(i),i===t)break;const l=p(this,et).get(s);l&&(ze(l.effect),p(this,et).delete(s))}for(const[i,s]of p(this,It)){if(i===r||p(this,Mr).has(i))continue;const l=()=>{if(Array.from(p(this,bt).values()).includes(i)){var d=document.createDocumentFragment();Ra(s,d),d.append(Rt()),p(this,et).set(i,{effect:s,fragment:d})}else ze(s);p(this,Mr).delete(i),p(this,It).delete(i)};p(this,$n)||!n?(p(this,Mr).add(i),Nr(s,l,!1)):l()}}});J(this,Gn,t=>{p(this,bt).delete(t);const r=Array.from(p(this,bt).values());for(const[n,a]of p(this,et))r.includes(n)||(ze(a.effect),p(this,et).delete(n))});this.anchor=t,G(this,$n,r)}ensure(t,r){var n=H,a=Ks();if(r&&!p(this,It).has(t)&&!p(this,et).has(t))if(a){var i=document.createDocumentFragment(),s=Rt();i.append(s),p(this,et).set(t,{effect:We(()=>r(s)),fragment:i})}else p(this,It).set(t,We(()=>r(this.anchor)));if(p(this,bt).set(n,t),a){for(const[l,c]of p(this,It))l===t?n.unskip_effect(c):n.skip_effect(c);for(const[l,c]of p(this,et))l===t?n.unskip_effect(c.effect):n.skip_effect(c.effect);n.oncommit(p(this,wn)),n.ondiscard(p(this,Gn))}else p(this,wn).call(this,n)}}bt=new WeakMap,It=new WeakMap,et=new WeakMap,Mr=new WeakMap,$n=new WeakMap,wn=new WeakMap,Gn=new WeakMap;function X(e,t,r=!1){var n=new Yn(e),a=r?fr:0;function i(s,l){n.ensure(s,l)}an(()=>{var s=!1;t((l,c=0)=>{s=!0,i(c,l)}),s||i(-1,null)},a)}const no=Symbol("NaN");function ao(e,t,r){var n=new Yn(e),a=!nn();an(()=>{var i=t();i!==i&&(i=no),a&&i!==null&&typeof i=="object"&&(i={}),n.ensure(i,r)})}function yn(e,t){return t}function so(e,t,r){for(var n=[],a=t.length,i,s=t.length,l=0;l<a;l++){let h=t[l];Nr(h,()=>{if(i){if(i.pending.delete(h),i.done.add(h),i.pending.size===0){var v=e.outrogroups;$a(e,Un(i.done)),v.delete(i),v.size===0&&(e.outrogroups=null)}}else s-=1},!1)}if(s===0){var c=n.length===0&&r!==null;if(c){var d=r,f=d.parentNode;Pl(f),f.append(d),e.items.clear()}$a(e,t,!c)}else i={pending:new Set(t),done:new Set},(e.outrogroups??(e.outrogroups=new Set)).add(i)}function $a(e,t,r=!0){var n;if(e.pending.size>0){n=new Set;for(const s of e.pending.values())for(const l of s)n.add(e.items.get(l).e)}for(var a=0;a<t.length;a++){var i=t[a];if(n!=null&&n.has(i)){i.f|=jt;const s=document.createDocumentFragment();Ra(i,s)}else ze(t[a],r)}}var ts;function hr(e,t,r,n,a,i=null){var s=e,l=new Map,c=(t&As)!==0;if(c){var d=e;s=d.appendChild(Rt())}var f=null,h=Pa(()=>{var O=r();return Aa(O)?O:O==null?[]:Un(O)}),v,w=new Map,m=!0;function A(O){C.effect.f&ct||(C.pending.delete(O),C.fallback=f,io(C,v,s,t,n),f!==null&&(v.length===0?f.f&jt?(f.f^=jt,vn(f,null,s)):La(f):Nr(f,()=>{f=null})))}function g(O){C.pending.delete(O)}var y=an(()=>{v=o(h);for(var O=v.length,k=new Set,z=H,P=Ks(),I=0;I<O;I+=1){var M=v[I],R=n(M,I),Y=m?null:l.get(R);Y?(Y.v&&Zr(Y.v,M),Y.i&&Zr(Y.i,I),P&&z.unskip_effect(Y.e)):(Y=lo(l,m?s:ts??(ts=Rt()),M,R,I,a,t,r),m||(Y.e.f|=jt),l.set(R,Y)),k.add(R)}if(O===0&&i&&!f&&(m?f=We(()=>i(s)):(f=We(()=>i(ts??(ts=Rt()))),f.f|=jt)),O>k.size&&ji(),!m)if(w.set(z,k),P){for(const[fe,_e]of l)k.has(fe)||z.skip_effect(_e.e);z.oncommit(A),z.ondiscard(g)}else A(z);o(h)}),C={effect:y,items:l,pending:w,outrogroups:null,fallback:f};m=!1}function dn(e){for(;e!==null&&!(e.f&xt);)e=e.next;return e}function io(e,t,r,n,a){var Y,fe,_e,Ne,Te,Ye,Je,De,rt;var i=(n&Ki)!==0,s=t.length,l=e.items,c=dn(e.effect.first),d,f=null,h,v=[],w=[],m,A,g,y;if(i)for(y=0;y<s;y+=1)m=t[y],A=a(m,y),g=l.get(A).e,g.f&jt||((fe=(Y=g.nodes)==null?void 0:Y.a)==null||fe.measure(),(h??(h=new Set)).add(g));for(y=0;y<s;y+=1){if(m=t[y],A=a(m,y),g=l.get(A).e,e.outrogroups!==null)for(const ve of e.outrogroups)ve.pending.delete(g),ve.done.delete(g);if(g.f&jt)if(g.f^=jt,g===c)vn(g,null,r);else{var C=f?f.next:c;g===e.effect.last&&(e.effect.last=g.prev),g.prev&&(g.prev.next=g.next),g.next&&(g.next.prev=g.prev),sr(e,f,g),sr(e,g,C),vn(g,C,r),f=g,v=[],w=[],c=dn(f.next);continue}if(g.f&tt&&(La(g),i&&((Ne=(_e=g.nodes)==null?void 0:_e.a)==null||Ne.unfix(),(h??(h=new Set)).delete(g))),g!==c){if(d!==void 0&&d.has(g)){if(v.length<w.length){var O=w[0],k;f=O.prev;var z=v[0],P=v[v.length-1];for(k=0;k<v.length;k+=1)vn(v[k],O,r);for(k=0;k<w.length;k+=1)d.delete(w[k]);sr(e,z.prev,P.next),sr(e,f,z),sr(e,P,O),c=O,f=P,y-=1,v=[],w=[]}else d.delete(g),vn(g,c,r),sr(e,g.prev,g.next),sr(e,g,f===null?e.effect.first:f.next),sr(e,f,g),f=g;continue}for(v=[],w=[];c!==null&&c!==g;)(d??(d=new Set)).add(c),w.push(c),c=dn(c.next);if(c===null)continue}g.f&jt||v.push(g),f=g,c=dn(g.next)}if(e.outrogroups!==null){for(const ve of e.outrogroups)ve.pending.size===0&&($a(e,Un(ve.done)),(Te=e.outrogroups)==null||Te.delete(ve));e.outrogroups.size===0&&(e.outrogroups=null)}if(c!==null||d!==void 0){var I=[];if(d!==void 0)for(g of d)g.f&tt||I.push(g);for(;c!==null;)!(c.f&tt)&&c!==e.fallback&&I.push(c),c=dn(c.next);var M=I.length;if(M>0){var R=n&As&&s===0?r:null;if(i){for(y=0;y<M;y+=1)(Je=(Ye=I[y].nodes)==null?void 0:Ye.a)==null||Je.measure();for(y=0;y<M;y+=1)(rt=(De=I[y].nodes)==null?void 0:De.a)==null||rt.fix()}so(e,I,R)}}i&&Zt(()=>{var ve,Et;if(h!==void 0)for(g of h)(Et=(ve=g.nodes)==null?void 0:ve.a)==null||Et.apply()})}function lo(e,t,r,n,a,i,s,l){var c=s&Ui?s&Yi?vr(r):Ml(r,!1,!1):null,d=s&Wi?vr(a):null;return{v:c,i:d,e:We(()=>(i(t,c??r,d??a,l),()=>{e.delete(n)}))}}function vn(e,t,r){if(e.nodes)for(var n=e.nodes.start,a=e.nodes.end,i=t&&!(t.f&jt)?t.nodes.start:r;n!==null;){var s=An(n);if(i.before(n),n===a)return;n=s}}function sr(e,t,r){t===null?e.effect.first=r:t.next=r,r===null?e.effect.last=t:r.prev=t}function V(e,t,r,n,a){var l;var i=(l=t.$$slots)==null?void 0:l[r],s=!1;i===!0&&(i=t.children,s=!0),i===void 0||i(e,s?()=>n:n)}function oo(e,t,r){var n=new Yn(e);an(()=>{var a=t()??null;n.ensure(a,a&&(i=>r(i,a)))},fr)}function co(e,t,r,n,a,i){var s=null,l=e,c=new Yn(l,!1);an(()=>{const d=t()||null;var f=rl;if(d===null){c.ensure(null,null);return}return c.ensure(d,h=>{if(d){if(s=Ys(d,f),en(s,s),n){var v=s.appendChild(Rt());n(s,v)}K.nodes.end=s,h.before(s)}}),()=>{}},fr),Oa(()=>{})}function uo(e,t){var r=void 0,n;Qs(()=>{r!==(r=t())&&(n&&(ze(n),n=null),r&&(n=We(()=>{Kn(()=>r(e))})))})}function vi(e){var t,r,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e)){var a=e.length;for(t=0;t<a;t++)e[t]&&(r=vi(e[t]))&&(n&&(n+=" "),n+=r)}else for(r in e)e[r]&&(n&&(n+=" "),n+=r);return n}function fo(){for(var e,t,r=0,n="",a=arguments.length;r<a;r++)(e=arguments[r])&&(t=vi(e))&&(n&&(n+=" "),n+=t);return n}function vo(e){return typeof e=="object"?fo(e):e??""}const rs=[...` 	
\r\f \v\uFEFF`];function po(e,t,r){var n=e==null?"":""+e;if(t&&(n=n?n+" "+t:t),r){for(var a of Object.keys(r))if(r[a])n=n?n+" "+a:a;else if(n.length)for(var i=a.length,s=0;(s=n.indexOf(a,s))>=0;){var l=s+i;(s===0||rs.includes(n[s-1]))&&(l===n.length||rs.includes(n[l]))?n=(s===0?"":n.substring(0,s))+n.substring(l+1):s=l}}return n===""?null:n}function ns(e,t=!1){var r=t?" !important;":";",n="";for(var a of Object.keys(e)){var i=e[a];i!=null&&i!==""&&(n+=" "+a+": "+i+r)}return n}function ta(e){return e[0]!=="-"||e[1]!=="-"?e.toLowerCase():e}function ho(e,t){if(t){var r="",n,a;if(Array.isArray(t)?(n=t[0],a=t[1]):n=t,e){e=String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var i=!1,s=0,l=!1,c=[];n&&c.push(...Object.keys(n).map(ta)),a&&c.push(...Object.keys(a).map(ta));var d=0,f=-1;const A=e.length;for(var h=0;h<A;h++){var v=e[h];if(l?v==="/"&&e[h-1]==="*"&&(l=!1):i?i===v&&(i=!1):v==="/"&&e[h+1]==="*"?l=!0:v==='"'||v==="'"?i=v:v==="("?s++:v===")"&&s--,!l&&i===!1&&s===0){if(v===":"&&f===-1)f=h;else if(v===";"||h===A-1){if(f!==-1){var w=ta(e.substring(d,f).trim());if(!c.includes(w)){v!==";"&&h++;var m=e.substring(d,h).trim();r+=" "+m+";"}}d=h+1,f=-1}}}}return n&&(r+=ns(n)),a&&(r+=ns(a,!0)),r=r.trim(),r===""?null:r}return e==null?null:String(e)}function Ke(e,t,r,n,a,i){var s=e.__className;if(s!==r||s===void 0){var l=po(r,n,i);l==null?e.removeAttribute("class"):t?e.className=l:e.setAttribute("class",l),e.__className=r}else if(i&&a!==i)for(var c in i){var d=!!i[c];(a==null||d!==!!a[c])&&e.classList.toggle(c,d)}return i}function ra(e,t={},r,n){for(var a in r){var i=r[a];t[a]!==i&&(r[a]==null?e.style.removeProperty(a):e.style.setProperty(a,i,n))}}function Dn(e,t,r,n){var a=e.__style;if(a!==t){var i=ho(t,n);i==null?e.removeAttribute("style"):e.style.cssText=i,e.__style=t}else n&&(Array.isArray(n)?(ra(e,r==null?void 0:r[0],n[0]),ra(e,r==null?void 0:r[1],n[1],"important")):ra(e,r,n));return n}function Fn(e,t,r=!1){if(e.multiple){if(t==null)return;if(!Aa(t))return al();for(var n of e.options)n.selected=t.includes(_n(n));return}for(n of e.options){var a=_n(n);if(Sl(a,t)){n.selected=!0;return}}(!r||t!==void 0)&&(e.selectedIndex=-1)}function pi(e){var t=new MutationObserver(()=>{Fn(e,e.__value)});t.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),Oa(()=>{t.disconnect()})}function _o(e,t,r=t){var n=new WeakSet,a=!0;Js(e,"change",i=>{var s=i?"[selected]":":checked",l;if(e.multiple)l=[].map.call(e.querySelectorAll(s),_n);else{var c=e.querySelector(s)??e.querySelector("option:not([disabled])");l=c&&_n(c)}r(l),H!==null&&n.add(H)}),Kn(()=>{var i=t();if(e===document.activeElement){var s=H;if(n.has(s))return}if(Fn(e,i,a),a&&i===void 0){var l=e.querySelector(":checked");l!==null&&(i=_n(l),r(i))}e.__value=i,a=!1}),pi(e)}function _n(e){return"__value"in e?e.__value:e.value}const un=Symbol("class"),fn=Symbol("style"),hi=Symbol("is custom element"),_i=Symbol("is html"),go=xs?"option":"OPTION",mo=xs?"select":"SELECT";function yo(e,t){t?e.hasAttribute("selected")||e.setAttribute("selected",""):e.removeAttribute("selected")}function _r(e,t,r,n){var a=gi(e);a[t]!==(a[t]=r)&&(t==="loading"&&(e[Oi]=r),r==null?e.removeAttribute(t):typeof r!="string"&&mi(e).includes(t)?e[t]=r:e.setAttribute(t,r))}function bo(e,t,r,n,a=!1,i=!1){var s=gi(e),l=s[hi],c=!s[_i],d=t||{},f=e.nodeName===go;for(var h in t)h in r||(r[h]=null);r.class?r.class=vo(r.class):r[un]&&(r.class=null),r[fn]&&(r.style??(r.style=null));var v=mi(e);for(const k in r){let z=r[k];if(f&&k==="value"&&z==null){e.value=e.__value="",d[k]=z;continue}if(k==="class"){var w=e.namespaceURI==="http://www.w3.org/1999/xhtml";Ke(e,w,z,n,t==null?void 0:t[un],r[un]),d[k]=z,d[un]=r[un];continue}if(k==="style"){Dn(e,z,t==null?void 0:t[fn],r[fn]),d[k]=z,d[fn]=r[fn];continue}var m=d[k];if(!(z===m&&!(z===void 0&&e.hasAttribute(k)))){d[k]=z;var A=k[0]+k[1];if(A!=="$$")if(A==="on"){const P={},I="$$"+k;let M=k.slice(2);var g=Gl(M);if(ql(M)&&(M=M.slice(0,-7),P.capture=!0),!g&&m){if(z!=null)continue;e.removeEventListener(M,d[I],P),d[I]=null}if(g)re(M,e,z),sn([M]);else if(z!=null){let R=function(Y){d[k].call(this,Y)};var O=R;d[I]=Jl(M,e,R,P)}}else if(k==="style")_r(e,k,z);else if(k==="autofocus")Tl(e,!!z);else if(!l&&(k==="__value"||k==="value"&&z!=null))e.value=e.__value=z;else if(k==="selected"&&f)yo(e,z);else{var y=k;c||(y=Wl(y));var C=y==="defaultValue"||y==="defaultChecked";if(z==null&&!l&&!C)if(s[k]=null,y==="value"||y==="checked"){let P=e;const I=t===void 0;if(y==="value"){let M=P.defaultValue;P.removeAttribute(y),P.defaultValue=M,P.value=P.__value=I?M:null}else{let M=P.defaultChecked;P.removeAttribute(y),P.defaultChecked=M,P.checked=I?M:!1}}else e.removeAttribute(k);else C||v.includes(y)&&(l||typeof z!="string")?(e[y]=z,y in s&&(s[y]=Ee)):typeof z!="function"&&_r(e,y,z)}}}return d}function as(e,t,r=[],n=[],a=[],i,s=!1,l=!1){Ds(a,r,n,c=>{var d=void 0,f={},h=e.nodeName===mo,v=!1;if(Qs(()=>{var m=t(...c.map(o)),A=bo(e,d,m,i,s,l);v&&h&&"value"in m&&Fn(e,m.value);for(let y of Object.getOwnPropertySymbols(f))m[y]||ze(f[y]);for(let y of Object.getOwnPropertySymbols(m)){var g=m[y];y.description===nl&&(!d||g!==d[y])&&(f[y]&&ze(f[y]),f[y]=We(()=>uo(e,()=>g))),A[y]=g}d=A}),h){var w=e;Kn(()=>{Fn(w,d.value,!0),pi(w)})}v=!0})}function gi(e){return e.__attributes??(e.__attributes={[hi]:e.nodeName.includes("-"),[_i]:e.namespaceURI===Ms})}var ss=new Map;function mi(e){var t=e.getAttribute("is")||e.nodeName,r=ss.get(t);if(r)return r;ss.set(t,r=[]);for(var n,a=e,i=Element.prototype;i!==a;){n=ys(a);for(var s in n)n[s].set&&r.push(s);a=Ea(a)}return r}function Vn(e,t,r=t){var n=new WeakSet;Js(e,"input",async a=>{var i=a?e.defaultValue:e.value;if(i=na(e)?aa(i):i,r(i),H!==null&&n.add(H),await Hl(),i!==(i=t())){var s=e.selectionStart,l=e.selectionEnd,c=e.value.length;if(e.value=i??"",l!==null){var d=e.value.length;s===l&&l===c&&d>c?(e.selectionStart=d,e.selectionEnd=d):(e.selectionStart=s,e.selectionEnd=Math.min(l,d))}}}),Qt(t)==null&&e.value&&(r(na(e)?aa(e.value):e.value),H!==null&&n.add(H)),Ia(()=>{var a=t();if(e===document.activeElement){var i=H;if(n.has(i))return}na(e)&&a===aa(e.value)||e.type==="date"&&!a&&!e.value||a!==e.value&&(e.value=a??"")})}function na(e){var t=e.type;return t==="number"||t==="range"}function aa(e){return e===""?null:+e}function is(e,t){return e===t||(e==null?void 0:e[Lt])===t}function Da(e={},t,r,n){var a=ce.r,i=K;return Kn(()=>{var s,l;return Ia(()=>{s=l,l=[],Qt(()=>{e!==r(...l)&&(t(e,...l),s&&is(r(...s),e)&&t(null,...s))})}),()=>{let c=i;for(;c!==a&&c.parent!==null&&c.parent.f&oa;)c=c.parent;const d=()=>{l&&is(r(...l),e)&&t(null,...l)},f=c.teardown;c.teardown=()=>{d(),f==null||f()}}}),e}function $o(e=!1){const t=ce,r=t.l.u;if(!r)return;let n=()=>$r(t.s);if(e){let a=0,i={};const s=kn(()=>{let l=!1;const c=t.s;for(const d in c)c[d]!==i[d]&&(i[d]=c[d],l=!0);return l&&a++,a});n=()=>o(s)}r.b.length&&Il(()=>{ls(t,n),ia(r.b)}),Xt(()=>{const a=Qt(()=>r.m.map(Pi));return()=>{for(const i of a)typeof i=="function"&&i()}}),r.a.length&&Xt(()=>{ls(t,n),ia(r.a)})}function ls(e,t){if(e.l.s)for(const r of e.l.s)o(r);t()}const wo={get(e,t){if(!e.exclude.includes(t))return o(e.version),t in e.special?e.special[t]():e.props[t]},set(e,t,r){if(!(t in e.special)){var n=K;try{ft(e.parent_effect),e.special[t]=$t({get[t](){return e.props[t]}},t,Es)}finally{ft(n)}}return e.special[t](r),Ka(e.version),!0},getOwnPropertyDescriptor(e,t){if(!e.exclude.includes(t)&&t in e.props)return{enumerable:!0,configurable:!0,value:e.props[t]}},deleteProperty(e,t){return e.exclude.includes(t)||(e.exclude.push(t),Ka(e.version)),!0},has(e,t){return e.exclude.includes(t)?!1:t in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(t=>!e.exclude.includes(t))}};function F(e,t){return new Proxy({props:e,exclude:t,special:{},version:vr(0),parent_effect:K},wo)}const xo={get(e,t){let r=e.props.length;for(;r--;){let n=e.props[r];if(on(n)&&(n=n()),typeof n=="object"&&n!==null&&t in n)return n[t]}},set(e,t,r){let n=e.props.length;for(;n--;){let a=e.props[n];on(a)&&(a=a());const i=cr(a,t);if(i&&i.set)return i.set(r),!0}return!1},getOwnPropertyDescriptor(e,t){let r=e.props.length;for(;r--;){let n=e.props[r];if(on(n)&&(n=n()),typeof n=="object"&&n!==null&&t in n){const a=cr(n,t);return a&&!a.configurable&&(a.configurable=!0),a}}},has(e,t){if(t===Lt||t===ws)return!1;for(let r of e.props)if(on(r)&&(r=r()),r!=null&&t in r)return!0;return!1},ownKeys(e){const t=[];for(let r of e.props)if(on(r)&&(r=r()),!!r){for(const n in r)t.includes(n)||t.push(n);for(const n of Object.getOwnPropertySymbols(r))t.includes(n)||t.push(n)}return t}};function q(...e){return new Proxy({props:e},xo)}function $t(e,t,r,n){var O;var a=!rn||(r&Zi)!==0,i=(r&Xi)!==0,s=(r&Qi)!==0,l=n,c=!0,d=()=>(c&&(c=!1,l=s?Qt(n):n),l);let f;if(i){var h=Lt in e||ws in e;f=((O=cr(e,t))==null?void 0:O.set)??(h&&t in e?k=>e[t]=k:void 0)}var v,w=!1;i?[v,w]=ul(()=>e[t]):v=e[t],v===void 0&&n!==void 0&&(v=d(),f&&(a&&Vi(),f(v)));var m;if(a?m=()=>{var k=e[t];return k===void 0?d():(c=!0,k)}:m=()=>{var k=e[t];return k!==void 0&&(l=void 0),k===void 0?l:k},a&&!(r&Es))return m;if(f){var A=e.$$legacy;return function(k,z){return arguments.length>0?((!a||!z||A||w)&&f(z?m():k),k):m()}}var g=!1,y=(r&Ji?kn:Pa)(()=>(g=!1,m()));i&&o(y);var C=K;return function(k,z){if(arguments.length>0){const P=z?o(y):a&&i?Le(k):k;return b(y,P),g=!0,l!==void 0&&(l=P),k}return pr&&g||C.f&ct?y.v:o(y)}}function Mn(e){ce===null&&ks(),rn&&ce.l!==null?Ao(ce).m.push(e):Xt(()=>{const t=Qt(e);if(typeof t=="function")return t})}function ko(e){ce===null&&ks(),Mn(()=>()=>Qt(e))}function Ao(e){var t=e.l;return t.u??(t.u={a:[],b:[],m:[]})}const Eo="5";var ms;typeof window<"u"&&((ms=window.__svelte??(window.__svelte={})).v??(ms.v=new Set)).add(Eo);ol();/**
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
 */const os=(...e)=>e.filter((t,r,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===r).join(" ").trim();var So=Ql("<svg><!><!></svg>");function B(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]),n=F(r,["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"]);Dt(t,!1);let a=$t(t,"name",8,void 0),i=$t(t,"color",8,"currentColor"),s=$t(t,"size",8,24),l=$t(t,"strokeWidth",8,2),c=$t(t,"absoluteStrokeWidth",8,!1),d=$t(t,"iconNode",24,()=>[]);$o();var f=So();as(f,(w,m,A)=>({...Mo,...w,...n,width:s(),height:s(),stroke:i(),"stroke-width":m,class:A}),[()=>No(n)?void 0:{"aria-hidden":"true"},()=>($r(c()),$r(l()),$r(s()),Qt(()=>c()?Number(l())*24/Number(s()):l())),()=>($r(os),$r(a()),$r(r),Qt(()=>os("lucide-icon","lucide",a()?`lucide-${a()}`:"",r.class)))]);var h=u(f);hr(h,1,d,yn,(w,m)=>{var A=Ie(()=>Ti(o(m),2));let g=()=>o(A)[0],y=()=>o(A)[1];var C=D(),O=j(C);co(O,g,!0,(k,z)=>{as(k,()=>({...y()}))}),_(w,C)});var v=$(h);V(v,t,"default",{}),_(e,f),Ft()}function zo(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]];B(e,q({name:"activity"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Po(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];B(e,q({name:"arrow-right"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function cs(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M12 8V4H8"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2"}],["path",{d:"M2 14h2"}],["path",{d:"M20 14h2"}],["path",{d:"M15 13v2"}],["path",{d:"M9 13v2"}]];B(e,q({name:"bot"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function To(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{d:"m3.3 7 8.7 5 8.7-5"}],["path",{d:"M12 22V12"}]];B(e,q({name:"box"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function wa(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516"}],["path",{d:"M12 13h4"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1"}],["path",{d:"M12 8h8"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2"}],["circle",{cx:"16",cy:"13",r:".5"}],["circle",{cx:"18",cy:"3",r:".5"}],["circle",{cx:"20",cy:"21",r:".5"}],["circle",{cx:"20",cy:"8",r:".5"}]];B(e,q({name:"brain-circuit"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function xa(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M20 6 9 17l-5-5"}]];B(e,q({name:"check"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Ln(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"m6 9 6 6 6-6"}]];B(e,q({name:"chevron-down"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function sa(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"m9 18 6-6-6-6"}]];B(e,q({name:"chevron-right"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function ds(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];B(e,q({name:"circle-alert"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function us(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335"}],["path",{d:"m9 11 3 3L22 4"}]];B(e,q({name:"circle-check-big"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Co(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]];B(e,q({name:"circle-check"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Oo(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["circle",{cx:"12",cy:"12",r:"10"}],["rect",{x:"9",y:"9",width:"6",height:"6",rx:"1"}]];B(e,q({name:"circle-stop"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Io(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m15 9-6 6"}],["path",{d:"m9 9 6 6"}]];B(e,q({name:"circle-x"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function yi(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];B(e,q({name:"copy"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Fa(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M12 20v2"}],["path",{d:"M12 2v2"}],["path",{d:"M17 20v2"}],["path",{d:"M17 2v2"}],["path",{d:"M2 12h2"}],["path",{d:"M2 17h2"}],["path",{d:"M2 7h2"}],["path",{d:"M20 12h2"}],["path",{d:"M20 17h2"}],["path",{d:"M20 7h2"}],["path",{d:"M7 20v2"}],["path",{d:"M7 2v2"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1"}]];B(e,q({name:"cpu"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Va(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5"}],["path",{d:"M3 12A9 3 0 0 0 21 12"}]];B(e,q({name:"database"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function fs(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];B(e,q({name:"download"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function jo(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];B(e,q({name:"eye"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function vs(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M12 7v5l4 2"}]];B(e,q({name:"history"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Lo(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];B(e,q({name:"info"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Ro(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"}],["path",{d:"M9 18h6"}],["path",{d:"M10 22h4"}]];B(e,q({name:"lightbulb"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Do(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M12 2v4"}],["path",{d:"m16.2 7.8 2.9-2.9"}],["path",{d:"M18 12h4"}],["path",{d:"m16.2 16.2 2.9 2.9"}],["path",{d:"M12 18v4"}],["path",{d:"m4.9 19.1 2.9-2.9"}],["path",{d:"M2 12h4"}],["path",{d:"m4.9 4.9 2.9 2.9"}]];B(e,q({name:"loader"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Fo(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}]];B(e,q({name:"message-square"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Vo(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]];B(e,q({name:"moon"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Ho(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"}],["path",{d:"M12 22V12"}],["polyline",{points:"3.29 7 12 12 20.71 7"}],["path",{d:"m7.5 4.27 9 5.15"}]];B(e,q({name:"package"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function qo(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]];B(e,q({name:"play"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Hn(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"}]];B(e,q({name:"puzzle"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function gn(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];B(e,q({name:"refresh-cw"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Bo(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];B(e,q({name:"search"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Go(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"}],["path",{d:"m21.854 2.147-10.94 10.939"}]];B(e,q({name:"send"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Uo(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];B(e,q({name:"settings"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Wo(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]];B(e,q({name:"shield-check"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function ps(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{d:"M20 2v4"}],["path",{d:"M22 4h-4"}],["circle",{cx:"4",cy:"20",r:"2"}]];B(e,q({name:"sparkles"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Ko(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];B(e,q({name:"sun"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Yo(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M12 19h8"}],["path",{d:"m4 17 6-6-6-6"}]];B(e,q({name:"terminal"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function bi(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];B(e,q({name:"trash-2"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function hs(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];B(e,q({name:"triangle-alert"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Jo(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];B(e,q({name:"user"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Zo(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"}]];B(e,q({name:"wrench"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Xo(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];B(e,q({name:"x"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}function Qo(e,t){const r=F(t,["children","$$slots","$$events","$$legacy"]);/**
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
 */const n=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]];B(e,q({name:"zap"},()=>r,{get iconNode(){return n},children:(a,i)=>{var s=D(),l=j(s);V(l,t,"default",{}),_(a,s)},$$slots:{default:!0}}))}var ec=T('<button><!> <span class="label"> </span></button>'),tc=T('<button><span class="plugin-icon svelte-129hoe0"> </span> <span class="label"> </span></button>'),rc=T('<div class="empty-plugins svelte-129hoe0">No plugins installed</div>'),nc=T("<!> <span>Light Mode</span>",1),ac=T("<!> <span>Dark Mode</span>",1),sc=T('<aside class="sidebar glass svelte-129hoe0"><div class="logo svelte-129hoe0"><div class="logo-box svelte-129hoe0"><!></div> <span class="logo-text brand-font svelte-129hoe0">Cheesecrab</span></div> <nav class="nav-section svelte-129hoe0"></nav> <div class="separator svelte-129hoe0"></div> <div class="nav-section plugins svelte-129hoe0"><div class="section-header svelte-129hoe0"><!> <span class="section-title svelte-129hoe0">Plugins</span></div> <div class="scroll-area svelte-129hoe0"><!> <!></div></div> <div class="bottom-actions svelte-129hoe0"><button class="theme-toggle svelte-129hoe0" title="Toggle Theme"><!></button></div></aside>');function ic(e,t){Dt(t,!0);let r=$t(t,"activeView",15),n=$t(t,"installedPlugins",19,()=>[]),a=$t(t,"theme",3,"dark");const i=[{id:"chat",icon:Fo,label:"AI Space"},{id:"agent",icon:wa,label:"Agent Engine"},{id:"models",icon:Va,label:"Models"},{id:"plugins",icon:Hn,label:"Plugins"},{id:"settings",icon:Uo,label:"Settings"}];var s=sc(),l=u(s),c=u(l),d=u(c);Fa(d,{size:20,color:"var(--accent-primary)"});var f=$(l,2);hr(f,21,()=>i,yn,(I,M)=>{var R=ec();let Y;var fe=u(R);{let Te=Ie(()=>r()===o(M).id?2.5:2);oo(fe,()=>o(M).icon,(Ye,Je)=>{Je(Ye,{size:18,get strokeWidth(){return o(Te)}})})}var _e=$(fe,2),Ne=u(_e);ee(()=>{Y=Ke(R,1,"nav-item svelte-129hoe0",null,Y,{active:r()===o(M).id}),U(Ne,o(M).label)}),re("click",R,()=>r(o(M).id)),_(I,R)});var h=$(f,4),v=u(h),w=u(v);Hn(w,{size:14});var m=$(v,2),A=u(m);hr(A,17,n,yn,(I,M)=>{var R=tc();let Y;var fe=u(R),_e=u(fe),Ne=$(fe,2),Te=u(Ne);ee(()=>{Y=Ke(R,1,"nav-item plugin svelte-129hoe0",null,Y,{active:r()===o(M).id}),U(_e,o(M).icon||"🧩"),U(Te,o(M).label)}),re("click",R,()=>r(o(M).id)),_(I,R)});var g=$(A,2);{var y=I=>{var M=rc();_(I,M)};X(g,I=>{n().length===0&&I(y)})}var C=$(h,2),O=u(C),k=u(O);{var z=I=>{var M=nc(),R=j(M);Ko(R,{size:18}),_(I,M)},P=I=>{var M=ac(),R=j(M);Vo(R,{size:18}),_(I,M)};X(k,I=>{a()==="dark"?I(z):I(P,-1)})}re("click",O,function(...I){var M;(M=t.onToggleTheme)==null||M.apply(this,I)}),_(e,s),Ft()}sn(["click"]);var lc=T('<div class="telemetry-bar border-t glass svelte-zgh7bo"><div class="status-group svelte-zgh7bo"><div class="status-item svelte-zgh7bo"><div class="pulse-dot svelte-zgh7bo"></div> <!> <span class="status-text svelte-zgh7bo"></span></div> <div class="separator-v svelte-zgh7bo"></div> <div class="status-item svelte-zgh7bo"><!> <span class="status-text svelte-zgh7bo">Network: Local Only</span></div></div> <div class="metrics-group svelte-zgh7bo"><div class="metric svelte-zgh7bo"><!> <span class="metric-label svelte-zgh7bo">CPU</span> <div class="progress-container svelte-zgh7bo"><div class="progress-bg svelte-zgh7bo"><div class="progress-fill svelte-zgh7bo"></div></div></div> <span class="metric-value svelte-zgh7bo"> </span></div> <div class="separator-v svelte-zgh7bo"></div> <div class="metric svelte-zgh7bo"><!> <span class="metric-label svelte-zgh7bo">RAM</span> <div class="progress-container svelte-zgh7bo"><div class="progress-bg svelte-zgh7bo"><div class="progress-fill svelte-zgh7bo"></div></div></div> <span class="metric-value svelte-zgh7bo"> </span></div></div></div>');function oc(e,t){Dt(t,!0);let r=L(12),n=L(4.2),a=16;Xt(()=>{const fe=setInterval(()=>{b(r,Math.floor(Math.random()*25)+5),b(n,+(4.2+Math.random()*.3).toFixed(1))},3e3);return()=>clearInterval(fe)});var i=lc(),s=u(i),l=u(s),c=$(u(l),2);Wo(c,{size:14,color:"#10b981"});var d=$(c,2);d.textContent="System Ready";var f=$(l,4),h=u(f);zo(h,{size:14});var v=$(s,2),w=u(v),m=u(w);Fa(m,{size:14});var A=$(m,4),g=u(A),y=u(g),C=$(A,2),O=u(C),k=$(w,4),z=u(k);Va(z,{size:14});var P=$(z,4),I=u(P),M=u(I),R=$(P,2),Y=u(R);ee(()=>{Dn(y,`width: ${o(r)??""}%`),U(O,`${o(r)??""}%`),Dn(M,`width: ${o(n)/a*100}%`),U(Y,`${o(n)??""}G / 16G`)}),_(e,i),Ft()}function Nn(){var e,t;return((t=(e=window.go)==null?void 0:e.main)==null?void 0:t.App)??null}async function Ha(){const e=Nn();if(e&&e.GetModels){const n=await e.GetModels();return Array.isArray(n)?n:[]}const t=await fetch("/api/models");if(!t.ok)throw new Error(`getModels: ${t.status}`);const r=await t.json();return Array.isArray(r==null?void 0:r.data)?r.data:r&&!Array.isArray(r)?[]:r||[]}async function cc(){const e=Nn();if(e&&e.GetSwarmAgents){const t=await e.GetSwarmAgents();return Array.isArray(t)?t:[]}try{const t=await fetch("/v1/agents");if(!t.ok)return[];const r=await t.json();return Array.isArray(r==null?void 0:r.agents)?r.agents:[]}catch{return[]}}function dc(e,{onToken:t,onError:r,onDone:n}){const a=Nn();if(a&&a.ChatCompletion&&window.runtime){const s=()=>{try{window.runtime.EventsOff("chat:token"),window.runtime.EventsOff("chat:error"),window.runtime.EventsOff("chat:done")}catch{}};window.runtime.EventsOn("chat:token",l=>{try{t(l)}catch{}}),window.runtime.EventsOn("chat:error",l=>{s();try{r(String(l))}catch{}}),window.runtime.EventsOn("chat:done",()=>{s();try{n()}catch{}}),a.ChatCompletion({...e,stream:!0});return}const i=JSON.stringify({...e,stream:!0});fetch("/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json"},body:i}).then(s=>{if(!s.ok){s.text().then(h=>r(h||`HTTP ${s.status}`)).catch(()=>r(`HTTP ${s.status}`));return}const l=s.body.getReader(),c=new TextDecoder;let d="";function f(){return l.read().then(({done:h,value:v})=>{if(h){n();return}d+=c.decode(v,{stream:!0});const w=d.split(`
`);d=w.pop()??"";for(const m of w)if(m.startsWith("data: ")){const A=m.slice(6);if(A==="[DONE]"){n();return}try{const g=JSON.parse(A);t(g)}catch{}}return f()})}return f()}).catch(s=>r((s==null?void 0:s.message)||String(s)))}function uc(e,{onProgress:t,onError:r}){const n=Nn();if(n&&n.PullModel&&window.runtime){window.runtime.EventsOn("pull:progress",i=>{try{t(i)}catch{}}),window.runtime.EventsOn("pull:error",i=>{try{r(String(i))}catch{}}),n.PullModel(e);return}const a=JSON.stringify({model:e,stream:!0});fetch("/api/pull",{method:"POST",headers:{"Content-Type":"application/json"},body:a}).then(i=>{if(!i.ok){i.text().then(f=>r(f||`HTTP ${i.status}`)).catch(()=>r(`HTTP ${i.status}`));return}const s=i.body.getReader(),l=new TextDecoder;let c="";function d(){return s.read().then(({done:f,value:h})=>{if(f)return;c+=l.decode(h,{stream:!0});const v=c.split(`
`);c=v.pop()??"";for(const w of v)if(w.trim())try{t(JSON.parse(w))}catch{}return d()})}return d()}).catch(i=>r((i==null?void 0:i.message)||String(i)))}function fc(e,{onEvent:t,onError:r,onDone:n}){const a=new AbortController,i=JSON.stringify(e);return fetch("/v1/agent/run",{method:"POST",headers:{"Content-Type":"application/json"},body:i,signal:a.signal}).then(s=>{if(!s.ok){s.text().then(h=>r(h||`HTTP ${s.status}`)).catch(()=>r(`HTTP ${s.status}`));return}const l=s.body.getReader(),c=new TextDecoder;let d="";function f(){return l.read().then(({done:h,value:v})=>{if(h){n();return}d+=c.decode(v,{stream:!0});const w=d.split(`
`);d=w.pop()??"";for(const m of w)if(m.startsWith("data: ")){const A=m.slice(6).trim();if(A==="[DONE]"){n();return}try{const g=JSON.parse(A);t(g)}catch{}}return f()})}return f()}).catch(s=>{(s==null?void 0:s.name)!=="AbortError"&&r((s==null?void 0:s.message)||String(s))}),{cancel:()=>a.abort()}}async function vc(e,t){const r=await fetch("/v1/agent/approve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({session_id:e,approved:t})});if(!r.ok){const n=await r.text();throw new Error(n||`agentApprove: HTTP ${r.status}`)}}async function pc(){try{const e=await fetch("/v1/agent/paths");if(!e.ok)return[];const t=await e.json();return Array.isArray(t==null?void 0:t.paths)?t.paths:[]}catch{return[]}}async function hc(e){const t=Nn();if(t&&t.LoadModel){await t.LoadModel(e);return}const r=await fetch("/models/load",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:e})});if(!r.ok){const n=await r.text();throw new Error(n||`HTTP ${r.status}`)}}var _c=T("<span> </span>"),gc=T("<span>Single agent</span>"),mc=T('<div><div><div class="avatar svelte-126kodk"><!></div> <div class="bubble-wrapper svelte-126kodk"><div class="bubble svelte-126kodk"> </div> <div class="bubble-actions svelte-126kodk"><button class="action-btn svelte-126kodk"><!></button></div></div></div></div>'),yc=T('<div class="message-wrapper svelte-126kodk"><div class="message assistant thinking svelte-126kodk"><div class="avatar svelte-126kodk"><!></div> <div class="bubble thinking-bubble svelte-126kodk"><div class="dot-loader svelte-126kodk"></div></div></div></div>'),bc=T('<div class="chat-space animate-fade svelte-126kodk"><header class="chat-header glass svelte-126kodk"><div class="model-info svelte-126kodk"><div></div> <span class="model-name svelte-126kodk"> </span> <!></div> <div><!> <!></div> <div class="header-actions"><button class="icon-btn svelte-126kodk" title="Clear Chat"><!></button></div></header> <div class="messages-container svelte-126kodk"><!> <!></div> <div class="input-area svelte-126kodk"><div><textarea class="svelte-126kodk"></textarea> <div class="input-footer svelte-126kodk"><div class="input-hints svelte-126kodk"><!> <span>Local Engine Ready</span></div> <button class="send-btn svelte-126kodk"><!></button></div></div> <p class="disclaimer svelte-126kodk">Private. Local. Edge-native.</p></div></div>');function $c(e,t){Dt(t,!0);let r=L(Le([{role:"assistant",content:"Welcome to AI Space. I am the Cheesecrab Engine. How can I assist you today?"}])),n=L(""),a=L(!1),i=L(!1),s=L(null),l=L(null),c=L(Le({id:"Searching...",status:"idle"})),d=L(Le([]));async function f(){try{const x=await Ha();if(!Array.isArray(x)||x.length===0){b(c,{id:"No Active Model",status:"idle"},!0);return}const N=te=>{var ge;return((ge=te==null?void 0:te.status)==null?void 0:ge.value)??(te==null?void 0:te.status)},Z=x.find(te=>N(te)==="loaded");Z&&Z.id?b(c,{id:String(Z.id).split("/").pop().replace(/\.gguf$/i,""),status:"ready",rawId:Z.id},!0):b(c,{id:"No Active Model",status:"idle"},!0)}catch{b(c,{id:"No Active Model",status:"idle"},!0)}}async function h(){try{const x=await cc();b(d,Array.isArray(x)?x:[],!0)}catch{b(d,[],!0)}}Mn(()=>{f(),h();const x=setInterval(()=>{f(),h()},3e3);return()=>clearInterval(x)});function v(){o(s)&&(o(s).scrollTop=o(s).scrollHeight)}Xt(()=>{o(r).length,setTimeout(v,50)});function w(){if(!o(n).trim()||o(a)||o(i))return;if(o(c).status!=="ready"){alert("Please load a model in the Plugin Store first.");return}const x=o(n);b(r,[...o(r),{role:"user",content:x}],!0),b(n,""),b(a,!0),dc({model:o(c).rawId,messages:o(r).map(N=>({role:N.role,content:N.content}))},{onToken:N=>{var te,ge,me;b(a,!1);const Z=((me=(ge=(te=N.choices)==null?void 0:te[0])==null?void 0:ge.delta)==null?void 0:me.content)||"";if(Z){const oe=o(r)[o(r).length-1];oe&&oe.role==="assistant"&&o(i)?(oe.content+=Z,b(r,[...o(r)],!0)):(b(r,[...o(r),{role:"assistant",content:Z}],!0),b(i,!0))}},onError:N=>{b(a,!1),b(i,!1),b(r,[...o(r),{role:"assistant",content:`Error: ${N}`}],!0)},onDone:()=>{b(a,!1),b(i,!1)}})}function m(){b(r,[{role:"assistant",content:"Chat cleared. How can I help you now?"}],!0)}function A(x,N){navigator.clipboard.writeText(x),b(l,N,!0),setTimeout(()=>b(l,null),2e3)}var g=bc(),y=u(g),C=u(y),O=u(C);let k;var z=$(O,2),P=u(z),I=$(z,2);Ln(I,{size:14});var M=$(C,2);let R;var Y=u(M);ps(Y,{size:14});var fe=$(Y,2);{var _e=x=>{var N=_c(),Z=u(N);ee(()=>U(Z,`${o(d).length??""} agents in swarm`)),_(x,N)},Ne=x=>{var N=gc();_(x,N)};X(fe,x=>{o(d).length>0?x(_e):x(Ne,-1)})}var Te=$(M,2),Ye=u(Te),Je=u(Ye);bi(Je,{size:18});var De=$(y,2),rt=u(De);hr(rt,17,()=>o(r),yn,(x,N,Z)=>{var te=mc();let ge;var me=u(te),oe=u(me),He=u(oe);{var qe=be=>{cs(be,{size:18})},vt=be=>{Jo(be,{size:18})};X(He,be=>{o(N).role==="assistant"?be(qe):be(vt,-1)})}var rr=$(oe,2),pt=u(rr),Ht=u(pt),nr=$(pt,2),Ze=u(nr),ye=u(Ze);{var Ce=be=>{xa(be,{size:12,color:"var(--accent-primary)"})},Mt=be=>{yi(be,{size:12})};X(ye,be=>{o(l)===Z?be(Ce):be(Mt,-1)})}ee(()=>{ge=Ke(te,1,"message-wrapper svelte-126kodk",null,ge,{user:o(N).role==="user"}),Ke(me,1,`message ${o(N).role??""}`,"svelte-126kodk"),U(Ht,o(N).content)}),re("click",Ze,()=>A(o(N).content,Z)),_(x,te)});var ve=$(rt,2);{var Et=x=>{var N=yc(),Z=u(N),te=u(Z),ge=u(te);cs(ge,{size:18}),_(x,N)};X(ve,x=>{o(a)&&x(Et)})}Da(De,x=>b(s,x),()=>o(s));var er=$(De,2),nt=u(er);let Ve;var Vt=u(nt),mr=$(Vt,2),Or=u(mr),Ir=u(Or);ps(Ir,{size:12});var tr=$(Or,2),jr=u(tr);Go(jr,{size:18}),ee(()=>{k=Ke(O,1,"status-indicator svelte-126kodk",null,k,{active:o(c).status==="ready"}),U(P,o(c).id),R=Ke(M,1,"swarm-info svelte-126kodk",null,R,{active:o(d).length>0}),Ve=Ke(nt,1,"input-container glass svelte-126kodk",null,Ve,{disabled:o(c).status!=="ready"}),_r(Vt,"placeholder",o(c).status==="ready"?"Ask anything...":"Load a model to start chat"),Vt.disabled=o(c).status!=="ready"||o(a)||o(i),tr.disabled=!o(n)||o(a)||o(i)||o(c).status!=="ready"}),re("click",Ye,m),re("keydown",Vt,x=>x.key==="Enter"&&!x.shiftKey&&(x.preventDefault(),w())),Vn(Vt,()=>o(n),x=>b(n,x)),re("click",tr,w),_(e,g),Ft()}sn(["click","keydown"]);var wc=T('<div class="empty-state svelte-18mm1rx"><!> <p class="empty-title svelte-18mm1rx">Ready to run</p> <p class="empty-sub svelte-18mm1rx">Enter a goal below and press Run</p></div>'),xc=T('<div class="timeline-card thinking-card svelte-18mm1rx"><div class="card-icon spin svelte-18mm1rx"><!></div> <span class="card-label muted svelte-18mm1rx"> </span></div>'),kc=T('<div class="card-body svelte-18mm1rx"><p class="reasoning-text svelte-18mm1rx"> </p></div>'),Ac=T('<div class="timeline-card thought-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx" role="button" tabindex="0"><div class="card-icon svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx"> </span> <span class="card-plan muted svelte-18mm1rx"> </span> <div class="expand-icon svelte-18mm1rx"><!></div></div> <!></div>'),Ec=T('<span class="badge danger svelte-18mm1rx"><!> dangerous</span>'),Mc=T('<div class="card-body svelte-18mm1rx"><pre class="code-block svelte-18mm1rx"> </pre></div>'),Nc=T('<div class="timeline-card tool-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx" role="button" tabindex="0"><div class="card-icon svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx"><code class="svelte-18mm1rx"> </code></span> <!> <div class="expand-icon svelte-18mm1rx"><!></div></div> <!></div>'),Sc=T('<div class="approval-buttons svelte-18mm1rx"><button class="approve-btn svelte-18mm1rx"><!> Approve</button> <button class="deny-btn svelte-18mm1rx"><!> Deny</button></div>'),zc=T('<div class="approval-resolved muted svelte-18mm1rx"><!> Decision sent</div>'),Pc=T('<div class="timeline-card approval-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx"><div class="card-icon warning svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx">Approval required — <code class="svelte-18mm1rx"> </code></span></div> <div class="card-body svelte-18mm1rx"><p class="approval-msg svelte-18mm1rx">This tool is marked <strong>dangerous</strong> and requires your approval before running.</p> <pre class="code-block svelte-18mm1rx"> </pre> <!></div></div>'),Tc=T('<div class="card-body svelte-18mm1rx"><pre class="code-block svelte-18mm1rx"> </pre></div>'),Cc=T('<div class="timeline-card obs-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx" role="button" tabindex="0"><div class="card-icon svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx"> </span> <div class="expand-icon svelte-18mm1rx"><!></div></div> <!></div>'),Oc=T('<div class="timeline-card answer-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx"><div class="card-icon success svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx">Final Answer</span> <button class="icon-btn small svelte-18mm1rx" title="Copy"><!></button></div> <div class="card-body svelte-18mm1rx"><p class="answer-text svelte-18mm1rx"> </p></div></div>'),Ic=T('<div class="timeline-card error-card svelte-18mm1rx"><div class="card-header svelte-18mm1rx"><div class="card-icon error svelte-18mm1rx"><!></div> <span class="card-label svelte-18mm1rx">Error</span></div> <div class="card-body svelte-18mm1rx"><p class="error-text svelte-18mm1rx"> </p></div></div>'),jc=T('<p class="history-empty svelte-18mm1rx">No completed runs yet.</p>'),Lc=T('<button class="history-item svelte-18mm1rx"><span> </span> <span class="history-goal svelte-18mm1rx"> </span></button>'),Rc=T('<aside class="history-panel glass svelte-18mm1rx"><div class="history-header svelte-18mm1rx"><!> <span>Past Runs</span></div> <!></aside>'),Dc=T('<button class="stop-btn svelte-18mm1rx"><!></button>'),Fc=T('<button class="run-btn svelte-18mm1rx"><!></button>'),Vc=T('<div class="agent-space animate-fade svelte-18mm1rx"><header class="agent-header glass svelte-18mm1rx"><div class="header-left svelte-18mm1rx"><!> <span class="header-title brand-font svelte-18mm1rx">Agent Engine</span></div> <div class="model-status svelte-18mm1rx"><div></div> <span class="model-name svelte-18mm1rx"> </span></div> <div class="header-actions svelte-18mm1rx"><button title="Run history"><!></button> <button class="icon-btn svelte-18mm1rx" title="Clear timeline"><!></button></div></header> <div class="workspace svelte-18mm1rx"><div class="timeline-column svelte-18mm1rx"><!> <!></div> <!></div> <div class="input-area svelte-18mm1rx"><div class="options-row svelte-18mm1rx"><label class="option-label svelte-18mm1rx">Strategy <select class="option-select svelte-18mm1rx"><option>ReAct</option><option>Function Calling</option></select></label> <label class="option-label svelte-18mm1rx">Max steps <input class="option-input svelte-18mm1rx" type="number" min="1" max="50"/></label></div> <div><textarea class="goal-input svelte-18mm1rx"></textarea> <div class="goal-footer svelte-18mm1rx"><div class="goal-hints svelte-18mm1rx"><!> <span> </span></div> <!></div></div> <p class="disclaimer svelte-18mm1rx">Agent has access to your filesystem and shell. Review dangerous tool approvals carefully.</p></div></div>');function Hc(e,t){Dt(t,!0);let r=L(""),n=L("react"),a=L(20),i=L(Le({id:"Searching...",status:"idle",rawId:""})),s=L(!1),l=L(null),c=L(null),d=L(Le([])),f=L(Le([])),h=L(!1),v=L(null),w=L(null);async function m(){try{const S=await Ha(),E=Oe=>{var se;return((se=Oe==null?void 0:Oe.status)==null?void 0:se.value)??(Oe==null?void 0:Oe.status)},$e=Array.isArray(S)?S.find(Oe=>E(Oe)==="loaded"):null;$e!=null&&$e.id?b(i,{id:String($e.id).split("/").pop().replace(/\.gguf$/i,""),status:"ready",rawId:$e.id},!0):b(i,{id:"No Model Loaded",status:"idle",rawId:""},!0)}catch{b(i,{id:"No Model Loaded",status:"idle",rawId:""},!0)}}Mn(()=>{m(),A();const S=setInterval(m,5e3);return()=>clearInterval(S)});async function A(){b(f,await pc(),!0)}function g(){if(!o(r).trim()||o(s))return;if(o(i).status!=="ready"){alert("Please load a model in the Plugin Store first.");return}b(d,[],!0),b(l,null),b(v,null),b(s,!0);const{cancel:S}=fc({goal:o(r).trim(),model:o(i).rawId,strategy:o(n),max_steps:o(a)},{onEvent:C,onError:E=>{b(s,!1),b(d,[...o(d),{type:"error",step:-1,payload:E,id:z()}],!0)},onDone:()=>{b(s,!1),A()}});b(c,S,!0)}function y(){o(c)&&o(c)(),b(s,!1),b(c,null),b(d,[...o(d),{type:"error",step:-1,payload:"Run cancelled by user.",id:z()}],!0)}function C(S){if(S.type==="session_start"){b(l,S.session_id??S.payload??null,!0);return}if(S.type!=="stream_token"){if(S.type==="thinking"){b(d,[...o(d).filter(E=>!(E.type==="thinking"&&E.step===S.step)),{...S,id:z()}],!0);return}if(S.type==="approval_required"){const E=S.payload??{};b(v,{toolName:E.tool??"?",args:E.args??{},step:S.step},!0)}["thought","tool_call","observation","final_answer","approval_required"].includes(S.type)&&b(d,o(d).filter(E=>!(E.type==="thinking"&&E.step===S.step)),!0),b(d,[...o(d),{...S,id:z()}],!0)}}async function O(S){if(o(l)){try{await vc(o(l),S)}catch(E){console.warn("approve error:",E)}b(v,null)}}let k=0;function z(){return++k}function P(S){try{return JSON.stringify(S,null,2)}catch{return String(S)}}function I(){b(d,[],!0),b(l,null),b(v,null)}let M=L(Le(new Set));function R(S){const E=new Set(o(M));E.has(S)?E.delete(S):E.add(S),b(M,E,!0)}let Y=L(null);function fe(S,E){navigator.clipboard.writeText(S),b(Y,E,!0),setTimeout(()=>b(Y,null),2e3)}var _e=Vc(),Ne=u(_e),Te=u(Ne),Ye=u(Te);wa(Ye,{size:20,color:"var(--accent-primary)"});var Je=$(Te,2),De=u(Je);let rt;var ve=$(De,2),Et=u(ve),er=$(Je,2),nt=u(er);let Ve;var Vt=u(nt);vs(Vt,{size:18});var mr=$(nt,2),Or=u(mr);bi(Or,{size:18});var Ir=$(Ne,2),tr=u(Ir),jr=u(tr);{var x=S=>{var E=wc(),$e=u(E);wa($e,{size:48,color:"var(--text-tertiary)"}),_(S,E)};X(jr,S=>{o(d).length===0&&!o(s)&&S(x)})}var N=$(jr,2);hr(N,17,()=>o(d),S=>S.id,(S,E)=>{var $e=D(),Oe=j($e);{var se=Q=>{var ne=xc(),ae=u(ne),ie=u(ae);Do(ie,{size:16});var ke=$(ae,2),Se=u(ke);ee(()=>U(Se,`Thinking — step ${o(E).step+1}`)),_(Q,ne)},pe=Q=>{const ne=Ie(()=>o(E).payload??{});var ae=Ac(),ie=u(ae),ke=u(ie),Se=u(ke);Ro(Se,{size:16});var Fe=$(ke,2),ht=u(Fe),zt=$(Fe,2),Pt=u(zt),Tt=$(zt,2),Gt=u(Tt);{var Be=Ae=>{Ln(Ae,{size:14})},yr=Ie(()=>o(M).has(o(E).id)),br=Ae=>{sa(Ae,{size:14})};X(Gt,Ae=>{o(yr)?Ae(Be):Ae(br,-1)})}var le=$(ie,2);{var at=Ae=>{var de=kc(),Ut=u(de),ln=u(Ut);ee(()=>U(ln,o(ne).reasoning??"")),_(Ae,de)},_t=Ie(()=>o(M).has(o(E).id));X(le,Ae=>{o(_t)&&Ae(at)})}ee(()=>{U(ht,o(ne).is_final?"Final reasoning":`Thought — step ${o(E).step+1}`),U(Pt,o(ne).plan??"")}),re("click",ie,()=>R(o(E).id)),re("keydown",ie,Ae=>Ae.key==="Enter"&&R(o(E).id)),_(Q,ae)},qt=Q=>{const ne=Ie(()=>o(E).payload??{});var ae=Nc(),ie=u(ae),ke=u(ie),Se=u(ke);Zo(Se,{size:16});var Fe=$(ke,2),ht=u(Fe),zt=u(ht),Pt=$(Fe,2);{var Tt=de=>{var Ut=Ec(),ln=u(Ut);hs(ln,{size:11}),_(de,Ut)};X(Pt,de=>{o(ne).dangerous&&de(Tt)})}var Gt=$(Pt,2),Be=u(Gt);{var yr=de=>{Ln(de,{size:14})},br=Ie(()=>o(M).has(o(E).id)),le=de=>{sa(de,{size:14})};X(Be,de=>{o(br)?de(yr):de(le,-1)})}var at=$(ie,2);{var _t=de=>{var Ut=Mc(),ln=u(Ut),$i=u(ln);ee(wi=>U($i,wi),[()=>P(o(ne).args??{})]),_(de,Ut)},Ae=Ie(()=>o(M).has(o(E).id));X(at,de=>{o(Ae)&&de(_t)})}ee(()=>U(zt,o(ne).tool??"?")),re("click",ie,()=>R(o(E).id)),re("keydown",ie,de=>de.key==="Enter"&&R(o(E).id)),_(Q,ae)},Nt=Q=>{const ne=Ie(()=>o(E).payload??{});var ae=Pc(),ie=u(ae),ke=u(ie),Se=u(ke);hs(Se,{size:16});var Fe=$(ke,2),ht=$(u(Fe)),zt=u(ht),Pt=$(ie,2),Tt=$(u(Pt),2),Gt=u(Tt),Be=$(Tt,2);{var yr=le=>{var at=Sc(),_t=u(at),Ae=u(_t);xa(Ae,{size:14});var de=$(_t,2),Ut=u(de);Xo(Ut,{size:14}),re("click",_t,()=>O(!0)),re("click",de,()=>O(!1)),_(le,at)},br=le=>{var at=zc(),_t=u(at);us(_t,{size:14}),_(le,at)};X(Be,le=>{o(v)&&o(v).step===o(E).step?le(yr):le(br,-1)})}ee(le=>{U(zt,o(ne).tool??"?"),U(Gt,le)},[()=>P(o(ne).args??{})]),_(Q,ae)},ar=Q=>{var ne=Cc(),ae=u(ne),ie=u(ae),ke=u(ie);jo(ke,{size:16});var Se=$(ie,2),Fe=u(Se),ht=$(Se,2),zt=u(ht);{var Pt=le=>{Ln(le,{size:14})},Tt=Ie(()=>o(M).has(o(E).id)),Gt=le=>{sa(le,{size:14})};X(zt,le=>{o(Tt)?le(Pt):le(Gt,-1)})}var Be=$(ae,2);{var yr=le=>{var at=Tc(),_t=u(at),Ae=u(_t);ee(()=>U(Ae,o(E).payload??"")),_(le,at)},br=Ie(()=>o(M).has(o(E).id));X(Be,le=>{o(br)&&le(yr)})}ee(()=>U(Fe,`Observation — step ${o(E).step+1}`)),re("click",ae,()=>R(o(E).id)),re("keydown",ae,le=>le.key==="Enter"&&R(o(E).id)),_(Q,ne)},St=Q=>{var ne=Oc(),ae=u(ne),ie=u(ae),ke=u(ie);us(ke,{size:16});var Se=$(ie,4),Fe=u(Se);{var ht=Be=>{xa(Be,{size:12})},zt=Be=>{yi(Be,{size:12})};X(Fe,Be=>{o(Y)===o(E).id?Be(ht):Be(zt,-1)})}var Pt=$(ae,2),Tt=u(Pt),Gt=u(Tt);ee(()=>U(Gt,o(E).payload??"")),re("click",Se,()=>fe(o(E).payload??"",o(E).id)),_(Q,ne)},Bt=Q=>{var ne=Ic(),ae=u(ne),ie=u(ae),ke=u(ie);Io(ke,{size:16});var Se=$(ae,2),Fe=u(Se),ht=u(Fe);ee(()=>U(ht,o(E).payload??"")),_(Q,ne)};X(Oe,Q=>{o(E).type==="thinking"?Q(se):o(E).type==="thought"?Q(pe,1):o(E).type==="tool_call"?Q(qt,2):o(E).type==="approval_required"?Q(Nt,3):o(E).type==="observation"?Q(ar,4):o(E).type==="final_answer"?Q(St,5):o(E).type==="error"&&Q(Bt,6)})}_(S,$e)});var Z=$(tr,2);{var te=S=>{var E=Rc(),$e=u(E),Oe=u($e);vs(Oe,{size:14});var se=$($e,2);{var pe=Nt=>{var ar=jc();_(Nt,ar)},qt=Nt=>{var ar=D(),St=j(ar);hr(St,17,()=>[...o(f)].reverse(),yn,(Bt,Q)=>{var ne=Lc(),ae=u(ne);let ie;var ke=u(ae),Se=$(ae,2),Fe=u(Se);ee(()=>{ie=Ke(ae,1,"history-status svelte-18mm1rx",null,ie,{done:o(Q).status==="completed",fail:o(Q).status!=="completed"}),U(ke,o(Q).status==="completed"?"✓":"✗"),U(Fe,o(Q).goal)}),re("click",ne,()=>{b(r,o(Q).goal,!0),b(h,!1)}),_(Bt,ne)}),_(Nt,ar)};X(se,Nt=>{o(f).length===0?Nt(pe):Nt(qt,-1)})}_(S,E)};X(Z,S=>{o(h)&&S(te)})}var ge=$(Ir,2),me=u(ge),oe=u(me),He=$(u(oe)),qe=u(He);qe.value=qe.__value="react";var vt=$(qe);vt.value=vt.__value="function_calling";var rr=$(oe,2),pt=$(u(rr)),Ht=$(me,2);let nr;var Ze=u(Ht);Da(Ze,S=>b(w,S),()=>o(w));var ye=$(Ze,2),Ce=u(ye),Mt=u(Ce);Yo(Mt,{size:12});var be=$(Mt,2),Sn=u(be),Jn=$(Ce,2);{var zn=S=>{var E=Dc(),$e=u(E);Oo($e,{size:18}),re("click",E,y),_(S,E)},Zn=S=>{var E=Fc(),$e=u(E);qo($e,{size:18}),ee(Oe=>E.disabled=Oe,[()=>!o(r).trim()||o(i).status!=="ready"]),re("click",E,g),_(S,E)};X(Jn,S=>{o(s)?S(zn):S(Zn,-1)})}ee(()=>{rt=Ke(De,1,"status-dot svelte-18mm1rx",null,rt,{active:o(i).status==="ready"}),U(Et,o(i).id),Ve=Ke(nt,1,"icon-btn svelte-18mm1rx",null,Ve,{active:o(h)}),mr.disabled=o(s),He.disabled=o(s),pt.disabled=o(s),nr=Ke(Ht,1,"goal-container glass svelte-18mm1rx",null,nr,{disabled:o(i).status!=="ready"}),_r(Ze,"placeholder",o(i).status==="ready"?'Describe your goal… e.g. "List all Go files and count lines"':"Load a model in Plugin Store to start"),Ze.disabled=o(i).status!=="ready"||o(s),U(Sn,`Local · Private · ${o(n)==="react"?"ReAct":"Function Calling"}`)}),re("click",nt,()=>{b(h,!o(h)),o(h)&&A()}),re("click",mr,I),_o(He,()=>o(n),S=>b(n,S)),Vn(pt,()=>o(a),S=>b(a,S)),re("keydown",Ze,S=>S.key==="Enter"&&!S.shiftKey&&(S.preventDefault(),g())),Vn(Ze,()=>o(r),S=>b(r,S)),_(e,_e),Ft()}sn(["click","keydown"]);var qc=T("<!> <span>Pulling…</span>",1),Bc=T("<!> <span>Pull</span>",1),Gc=T('<span class="prog-pct svelte-rgdxjf"> </span>'),Uc=T('<div><div class="progress-meta svelte-rgdxjf"><span class="prog-status svelte-rgdxjf"><!></span> <!></div> <div class="progress-bar svelte-rgdxjf"><div class="progress-fill svelte-rgdxjf"></div></div></div>'),Wc=T('<div class="error-banner svelte-rgdxjf"><!> <span> </span></div>'),Kc=T('<div class="empty-state svelte-rgdxjf"><!> <p class="svelte-rgdxjf">Scanning storage…</p></div>'),Yc=T('<div class="empty-state svelte-rgdxjf"><!> <h3 class="svelte-rgdxjf">No models found</h3> <p class="svelte-rgdxjf">Pull a model above to get started.</p></div>'),Jc=T('<div class="engine-ready svelte-rgdxjf"><!> <span>Ready for inference</span></div>'),Zc=T("<!> <span>Starting engine…</span>",1),Xc=T("<!> <span>Load Engine</span>",1),Qc=T('<button class="btn-load svelte-rgdxjf"><!></button>'),ed=T('<div class="model-card surface-card svelte-rgdxjf"><div class="card-top svelte-rgdxjf"><span><!></span> <span class="model-size svelte-rgdxjf"> </span></div> <div class="model-name svelte-rgdxjf"> </div> <div class="model-source svelte-rgdxjf"> </div> <div class="card-footer svelte-rgdxjf"><!></div></div>'),td=T('<div class="error-banner svelte-rgdxjf" style="margin-top:1rem"><!> <span> </span></div>'),rd=T('<div class="models-grid svelte-rgdxjf"></div> <!>',1),nd=T('<div class="models-view animate-fade svelte-rgdxjf"><header class="page-header svelte-rgdxjf"><div class="header-content"><h1 class="brand-font svelte-rgdxjf">Models</h1> <p class="svelte-rgdxjf">Pull GGUF models and manage the local inference engine.</p></div> <div class="stat-pill svelte-rgdxjf"><!> <span> </span></div></header> <section class="section svelte-rgdxjf"><div class="section-title svelte-rgdxjf"><!> <h2 class="svelte-rgdxjf">Pull Model</h2></div> <div class="surface-card pull-card svelte-rgdxjf"><p class="hint-text svelte-rgdxjf">Paste a HuggingFace URL (<code class="svelte-rgdxjf">/blob/</code> or <code class="svelte-rgdxjf">/resolve/</code>) or an Ollama tag.</p> <div class="input-row svelte-rgdxjf"><div class="input-wrap svelte-rgdxjf"><!> <input type="text" placeholder="https://huggingface.co/…/model.gguf" class="svelte-rgdxjf"/></div> <button class="btn-primary svelte-rgdxjf"><!></button></div> <!> <!></div></section> <section class="section svelte-rgdxjf"><div class="section-title svelte-rgdxjf"><!> <h2 class="svelte-rgdxjf">Local Models</h2></div> <!></section> <div class="footer-hint svelte-rgdxjf"><!> <span>Models are stored in <code class="svelte-rgdxjf">~/.cheesecrab/models/</code></span></div></div>');function ad(e,t){Dt(t,!0);let r=L(Le([])),n=L(!0),a=L(null),i=L(null),s=L(""),l=L(null),c=L(null),d=L(!1);async function f(){try{const x=await Ha();b(r,x||[],!0)}catch{}finally{b(n,!1)}}Xt(()=>{f();const x=setInterval(f,5e3);return()=>clearInterval(x)});function h(x){const N=x.trim();return N.includes("huggingface.co")?N.replace("/blob/","/resolve/").replace("/tree/","/resolve/"):N}function v(x){return x?x<1024?`${x} B`:x<1024**2?`${(x/1024).toFixed(1)} KB`:x<1024**3?`${(x/1024**2).toFixed(1)} MB`:`${(x/1024**3).toFixed(2)} GB`:""}function w(){if(!o(s)||o(d))return;const x=h(o(s));b(c,null),b(l,{status:"connecting",completed:0,total:0},!0),b(d,!0),uc(x,{onProgress:N=>{b(l,N,!0),(N==null?void 0:N.status)==="success"?(b(d,!1),setTimeout(()=>{b(l,null),f()},1500)):(N==null?void 0:N.status)==="error"&&(b(c,N.error??"Download failed",!0),b(d,!1),b(l,null))},onError:N=>{b(c,N,!0),b(d,!1),b(l,null)}})}async function m(x){if(!o(a)){b(a,x,!0),b(i,null);try{await hc(x),await f()}catch(N){b(i,(N==null?void 0:N.message)??String(N),!0)}finally{b(a,null)}}}var A=nd(),g=u(A),y=$(u(g),2),C=u(y);Va(C,{size:14});var O=$(C,2),k=u(O),z=$(g,2),P=u(z),I=u(P);fs(I,{size:18});var M=$(P,2),R=$(u(M),2),Y=u(R),fe=u(Y);Bo(fe,{size:16,class:"input-icon"});var _e=$(fe,2),Ne=$(Y,2),Te=u(Ne);{var Ye=x=>{var N=qc(),Z=j(N);gn(Z,{size:16,class:"spin"}),_(x,N)},Je=x=>{var N=Bc(),Z=j(N);fs(Z,{size:16}),_(x,N)};X(Te,x=>{o(d)?x(Ye):x(Je,-1)})}var De=$(R,2);{var rt=x=>{const N=Ie(()=>o(l).total>0?Math.round(o(l).completed/o(l).total*100):0),Z=Ie(()=>o(l).status==="success");var te=Uc();let ge;var me=u(te),oe=u(me),He=u(oe);{var qe=ye=>{var Ce=Lr("✓ Download complete");_(ye,Ce)},vt=ye=>{var Ce=Lr("Connecting…");_(ye,Ce)},rr=ye=>{var Ce=Lr();ee((Mt,be)=>U(Ce,`${Mt??""}${be??""}`),[()=>v(o(l).completed),()=>o(l).total>0?" / "+v(o(l).total):""]),_(ye,Ce)};X(He,ye=>{o(Z)?ye(qe):o(l).status==="connecting"?ye(vt,1):ye(rr,-1)})}var pt=$(oe,2);{var Ht=ye=>{var Ce=Gc(),Mt=u(Ce);ee(()=>U(Mt,`${o(N)??""}%`)),_(ye,Ce)};X(pt,ye=>{o(l).total>0&&ye(Ht)})}var nr=$(me,2),Ze=u(nr);ee(()=>{ge=Ke(te,1,"progress-zone svelte-rgdxjf",null,ge,{done:o(Z)}),Dn(Ze,`width:${(o(Z)?100:o(N))??""}%`)}),_(x,te)};X(De,x=>{o(l)&&x(rt)})}var ve=$(De,2);{var Et=x=>{var N=Wc(),Z=u(N);ds(Z,{size:16});var te=$(Z,2),ge=u(te);ee(()=>U(ge,o(c))),_(x,N)};X(ve,x=>{o(c)&&x(Et)})}var er=$(z,2),nt=u(er),Ve=u(nt);Fa(Ve,{size:18});var Vt=$(nt,2);{var mr=x=>{var N=Kc(),Z=u(N);gn(Z,{size:24,class:"spin"}),_(x,N)},Or=x=>{var N=Yc(),Z=u(N);To(Z,{size:32}),_(x,N)},Ir=x=>{var N=rd(),Z=j(N);hr(Z,21,()=>o(r),me=>me.id,(me,oe)=>{const He=Ie(()=>o(oe).status.value==="loaded"),qe=Ie(()=>o(a)===o(oe).id);var vt=ed(),rr=u(vt),pt=u(rr);let Ht;var nr=u(pt);{var Ze=se=>{var pe=Lr("Starting…");_(se,pe)},ye=se=>{var pe=Lr("Active");_(se,pe)},Ce=se=>{var pe=Lr("Standby");_(se,pe)};X(nr,se=>{o(qe)?se(Ze):o(He)?se(ye,1):se(Ce,-1)})}var Mt=$(pt,2),be=u(Mt),Sn=$(rr,2),Jn=u(Sn),zn=$(Sn,2),Zn=u(zn),S=$(zn,2),E=u(S);{var $e=se=>{var pe=Jc(),qt=u(pe);Co(qt,{size:14}),_(se,pe)},Oe=se=>{var pe=Qc(),qt=u(pe);{var Nt=St=>{var Bt=Zc(),Q=j(Bt);gn(Q,{size:14,class:"spin"}),_(St,Bt)},ar=St=>{var Bt=Xc(),Q=j(Bt);Qo(Q,{size:14}),_(St,Bt)};X(qt,St=>{o(qe)?St(Nt):St(ar,-1)})}ee(()=>{pe.disabled=!!o(a),_r(pe,"title",o(a)&&!o(qe)?"Another model is loading…":void 0)}),re("click",pe,()=>m(o(oe).id)),_(se,pe)};X(E,se=>{o(He)?se($e):se(Oe,-1)})}ee((se,pe,qt)=>{Ht=Ke(pt,1,"status-tag svelte-rgdxjf",null,Ht,{active:o(He),booting:o(qe)}),U(be,se),U(Jn,pe),U(Zn,qt)},[()=>v(o(oe).size),()=>o(oe).id.split("/").pop(),()=>o(oe).id.includes("/")?o(oe).id.split("/").slice(0,-1).join("/"):"Local"]),_(me,vt)});var te=$(Z,2);{var ge=me=>{var oe=td(),He=u(oe);ds(He,{size:16});var qe=$(He,2),vt=u(qe);ee(()=>U(vt,`Engine failed to start: ${o(i)??""}`)),_(me,oe)};X(te,me=>{o(i)&&me(ge)})}_(x,N)};X(Vt,x=>{o(n)?x(mr):o(r).length===0?x(Or,1):x(Ir,-1)})}var tr=$(er,2),jr=u(tr);Lo(jr,{size:12}),ee(()=>{U(k,`${o(r).length??""} installed`),_e.disabled=o(d),Ne.disabled=o(d)||!o(s)}),re("keydown",_e,x=>x.key==="Enter"&&w()),Vn(_e,()=>o(s),x=>b(s,x)),re("click",Ne,w),_(e,A),Ft()}sn(["keydown","click"]);var sd=T('<div class="loading-state svelte-1kslagv"><!> <span>Syncing registry…</span></div>'),id=T('<div class="empty-state svelte-1kslagv"><!> <h3 class="svelte-1kslagv">No plugins available</h3> <p class="svelte-1kslagv">Check back later as the registry grows.</p></div>'),ld=T('<div class="plugin-card surface-card svelte-1kslagv"><div class="card-header svelte-1kslagv"><div class="plugin-identity svelte-1kslagv"><span class="plugin-name svelte-1kslagv"> </span> <span class="plugin-version svelte-1kslagv"> </span></div> <div class="plugin-icon-wrap svelte-1kslagv"><!></div></div> <p class="plugin-desc svelte-1kslagv"> </p> <div class="card-footer svelte-1kslagv"><span class="plugin-author svelte-1kslagv"> </span> <button class="btn-install svelte-1kslagv"><!></button></div></div>'),od=T('<div class="plugin-grid svelte-1kslagv"></div>'),cd=T('<div class="plugins-view animate-fade svelte-1kslagv"><header class="page-header svelte-1kslagv"><div class="header-content"><h1 class="brand-font svelte-1kslagv">Plugins</h1> <p class="svelte-1kslagv">Extend Cheesecrab with community-built modules and integrations.</p></div> <div class="stat-pill svelte-1kslagv"><!> <span> </span></div></header> <!></div>');function dd(e,t){Dt(t,!0);let r=$t(t,"onPluginInstalled",3,()=>{}),n=L(Le([])),a=L(!0),i=L(null);Xt(()=>{const y=setTimeout(()=>{b(n,[{id:"note",name:"CrabNote",description:"Zettelkasten-style neural notes with RAG auto-linking. Perfect for research.",author:"Cheesecrab Labs",version:"1.2.0",download_url:"https://example.com/plugins/crab-note.zip"},{id:"calendar",name:"CrabCalendar",description:"AI-first scheduling. It learns your peak focus hours and manages tasks.",author:"Cheesecrab Labs",version:"0.9.5",download_url:"https://example.com/plugins/crab-calendar.zip"}],!0),b(a,!1)},400);return()=>clearTimeout(y)});async function s(y){var C,O,k;if(!o(i)){b(i,y.id,!0);try{(k=(O=(C=window.go)==null?void 0:C.main)==null?void 0:O.App)!=null&&k.InstallPlugin?(await window.go.main.App.InstallPlugin(y.download_url),r()()):await new Promise(z=>setTimeout(z,1200))}catch(z){console.error("install plugin failed:",z)}finally{b(i,null)}}}var l=cd(),c=u(l),d=$(u(c),2),f=u(d);Hn(f,{size:14});var h=$(f,2),v=u(h),w=$(c,2);{var m=y=>{var C=sd(),O=u(C);gn(O,{size:22,class:"spin"}),_(y,C)},A=y=>{var C=id(),O=u(C);Ho(O,{size:36}),_(y,C)},g=y=>{var C=od();hr(C,21,()=>o(n),O=>O.id,(O,k)=>{var z=ld(),P=u(z),I=u(P),M=u(I),R=u(M),Y=$(M,2),fe=u(Y),_e=$(I,2),Ne=u(_e);Hn(Ne,{size:20});var Te=$(P,2),Ye=u(Te),Je=$(Te,2),De=u(Je),rt=u(De),ve=$(De,2),Et=u(ve);{var er=Ve=>{gn(Ve,{size:14,class:"spin"})},nt=Ve=>{Po(Ve,{size:14})};X(Et,Ve=>{o(i)===o(k).id?Ve(er):Ve(nt,-1)})}ee(()=>{U(R,o(k).name),U(fe,`v${o(k).version??""}`),U(Ye,o(k).description),U(rt,`by ${o(k).author??""}`),ve.disabled=!!o(i),_r(ve,"title",o(i)===o(k).id?"Installing…":"Install"),_r(ve,"aria-label",`Install ${o(k).name??""}`)}),re("click",ve,()=>s(o(k))),_(O,z)}),_(y,C)};X(w,y=>{o(a)?y(m):o(n).length===0?y(A,1):y(g,-1)})}ee(()=>U(v,`${o(n).length??""} available`)),_(e,l),Ft()}sn(["click"]);var ud=T('<div class="loading svelte-3zvtg1"><span class="spinner svelte-3zvtg1">🦀</span> <p>Nibbling plugin files...</p></div>'),fd=T('<div class="plugin-host svelte-3zvtg1"><!></div>');function vd(e,t){Dt(t,!0);let r=L(null),n=L(!1),a=L(null);Mn(()=>{i()}),ko(()=>{l()});async function i(){const h=`script-plugin-${t.manifest.id}`;if(document.getElementById(h))b(n,!0),s();else{const v=document.createElement("script");v.id=h,v.type="module",v.src=`plugin://${t.manifest.id}/${t.manifest.main_js}`,v.onload=()=>{b(n,!0),s()},v.onerror=w=>{console.error(`Failed to load plugin script: ${t.manifest.id}`,w)},document.body.appendChild(v)}}function s(){if(!(!o(n)||!o(r))){o(r).innerHTML="";try{const h=document.createElement(t.manifest.entry_element);o(r).appendChild(h),b(a,h,!0),console.log(`Plugin mounted: ${t.manifest.id}`)}catch(h){console.error(`Failed to mount plugin component: ${t.manifest.entry_element}`,h)}}}function l(){o(a)&&o(a).parentNode&&o(a).parentNode.removeChild(o(a))}Xt(()=>{o(r)&&o(n)&&!o(a)&&s()});var c=fd(),d=u(c);{var f=h=>{var v=ud();_(h,v)};X(d,h=>{o(n)||h(f)})}Da(c,h=>b(r,h),()=>o(r)),_(e,c),Ft()}var pd=T('<div class="placeholder svelte-1n46o8q"><h1 class="brand-font svelte-1n46o8q"> </h1> <p>This module is under development.</p></div>'),hd=T('<div class="animate-fade h-full svelte-1n46o8q"><!></div>'),_d=T('<main class="layout svelte-1n46o8q"><!> <div class="content-wrapper svelte-1n46o8q"><div class="main-content svelte-1n46o8q"><!></div> <!></div></main>');function gd(e,t){Dt(t,!0);let r=L("chat"),n=L(Le([])),a=L("dark");Mn(()=>{const w=localStorage.getItem("cheesecrab-theme")||"dark";b(a,w,!0),document.documentElement.setAttribute("data-theme",o(a))});function i(){b(a,o(a)==="dark"?"light":"dark",!0),document.documentElement.setAttribute("data-theme",o(a)),localStorage.getItem("cheesecrab-theme",o(a))}Xt(()=>{window.go&&window.go.main&&window.go.main.App&&window.go.main.App.GetInstalledPlugins().then(w=>{b(n,w||[],!0)})});const s=Ie(()=>o(n).find(w=>w.id===o(r)));var l=_d(),c=u(l);ic(c,{get installedPlugins(){return o(n)},get theme(){return o(a)},onToggleTheme:i,get activeView(){return o(r)},set activeView(w){b(r,w,!0)}});var d=$(c,2),f=u(d),h=u(f);ao(h,()=>o(r),w=>{var m=hd(),A=u(m);{var g=P=>{$c(P,{})},y=P=>{Hc(P,{})},C=P=>{ad(P,{})},O=P=>{dd(P,{onPluginInstalled:()=>{var I,M,R;(R=(M=(I=window.go)==null?void 0:I.main)==null?void 0:M.App)==null||R.GetInstalledPlugins().then(Y=>{b(n,Y||[],!0)})}})},k=P=>{vd(P,{get manifest(){return o(s)}})},z=P=>{var I=pd(),M=u(I),R=u(M);ee(()=>U(R,o(r))),_(P,I)};X(A,P=>{o(r)==="chat"?P(g):o(r)==="agent"?P(y,1):o(r)==="models"?P(C,2):o(r)==="plugins"?P(O,3):o(s)?P(k,4):P(z,-1)})}_(w,m)});var v=$(f,2);oc(v,{}),ee(()=>_r(l,"data-theme",o(a))),_(e,l),Ft()}eo(gd,{target:document.getElementById("app")});

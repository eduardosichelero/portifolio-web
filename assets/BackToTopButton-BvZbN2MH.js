import{c as i,r as t,j as o}from"./index-CkqQiVJi.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=i("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]);function c(){const[e,a]=t.useState(!1);t.useEffect(()=>{const r=()=>{a(window.scrollY>200)};return window.addEventListener("scroll",r),()=>window.removeEventListener("scroll",r)},[]);const s=()=>{window.scrollTo({top:0,behavior:"smooth"})};return e?o.jsx("button",{onClick:s,"aria-label":"Voltar ao topo",className:"fixed bottom-6 right-6 z-50 bg-primary-light dark:bg-primary-dark text-white rounded-full shadow-lg p-3 hover:bg-primary-dark dark:hover:bg-primary-light transition flex items-center justify-center",children:o.jsx(l,{className:"w-6 h-6"})}):null}export{c as B};

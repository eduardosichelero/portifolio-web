import{r as o,j as t}from"./index-7CHcPrxa.js";function G({onLogin:m}){const[c,g]=o.useState(""),[p,j]=o.useState(""),[x,f]=o.useState(""),y=async a=>{a.preventDefault(),f("");const s=await fetch("https://portifolio-api-mu.vercel.app/api/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({usuario:c,senha:p})});if(s.ok){const{token:i}=await s.json();localStorage.setItem("admin_token",i),m()}else f("Usuário ou senha inválidos")};return t.jsx("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg, #6366f1 0%, #a5b4fc 100%)"},children:t.jsxs("form",{onSubmit:y,style:{background:"white",borderRadius:16,boxShadow:"0 4px 24px 0 rgba(0,0,0,0.10)",padding:32,minWidth:320,display:"flex",flexDirection:"column",gap:18},children:[t.jsx("h2",{style:{textAlign:"center",color:"#3730a3",fontWeight:700,fontSize:28,marginBottom:12},children:"Painel Admin"}),t.jsx("label",{style:{fontWeight:500,color:"#4b5563"},children:"Usuário"}),t.jsx("input",{placeholder:"Digite seu usuário",value:c,onChange:a=>g(a.target.value),required:!0,style:{padding:10,borderRadius:8,border:"1px solid #d1d5db",fontSize:16}}),t.jsx("label",{style:{fontWeight:500,color:"#4b5563"},children:"Senha"}),t.jsx("input",{type:"password",placeholder:"Digite sua senha",value:p,onChange:a=>j(a.target.value),required:!0,style:{padding:10,borderRadius:8,border:"1px solid #d1d5db",fontSize:16}}),t.jsx("button",{type:"submit",style:{marginTop:10,background:"linear-gradient(90deg, #6366f1 0%, #818cf8 100%)",color:"white",border:"none",borderRadius:8,padding:"12px 0",fontWeight:600,fontSize:18,cursor:"pointer",boxShadow:"0 2px 8px 0 rgba(99,102,241,0.10)"},children:"Entrar"}),x&&t.jsx("div",{style:{color:"#dc2626",textAlign:"center",marginTop:8},children:x})]})})}function q(){const[m,c]=o.useState([]),[g,p]=o.useState([]),[j,x]=o.useState(!0),[f,y]=o.useState(()=>!!localStorage.getItem("admin_token")),[a,s]=o.useState({id:"",title:"",deadline:"",progress:0,category:""}),[i,d]=o.useState({id:"",title:"",date:"",issuer:"",progress:0,externalUrl:""}),[u,v]=o.useState(null),[h,C]=o.useState(null),[S,b]=o.useState("");o.useEffect(()=>{Promise.all([fetch("https://portifolio-api-mu.vercel.app/api/goals").then(e=>e.json()),fetch("https://portifolio-api-mu.vercel.app/api/certificates").then(e=>e.json())]).then(([e,r])=>{c(Array.isArray(e)?e:e.goals||[]),p(Array.isArray(r)?r:r.certificates||[]),x(!1)})},[]);const A=async e=>{e.preventDefault();const r=localStorage.getItem("admin_token");if(u){const n={...a,id:u};(await fetch(`https://portifolio-api-mu.vercel.app/api/goals/${u}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(n)})).ok&&(c(m.map(l=>l.id===u?n:l)),s({id:"",title:"",deadline:"",progress:0,category:""}),v(null))}else{const n={...a,id:crypto.randomUUID()};(await fetch("https://portifolio-api-mu.vercel.app/api/goals",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(n)})).ok&&(c([...m,n]),s({id:"",title:"",deadline:"",progress:0,category:""}))}},E=e=>{s(e),v(e.id)},U=async e=>{const r=localStorage.getItem("admin_token");await fetch(`https://portifolio-api-mu.vercel.app/api/goals/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}}),c(m.filter(n=>n.id!==e))},T=async e=>{e.preventDefault(),b("");const r=localStorage.getItem("admin_token");try{if(h){const n={...i,id:h};if((await fetch(`https://portifolio-api-mu.vercel.app/api/certificates/${h}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(n)})).ok){const l=await fetch("https://portifolio-api-mu.vercel.app/api/certificates").then(w=>w.json());p(Array.isArray(l)?l:l.certificates||[]),d({id:"",title:"",date:"",issuer:"",progress:0,externalUrl:""}),C(null)}else b("Erro ao editar certificado.")}else{const n={...i,id:crypto.randomUUID()};if((await fetch("https://portifolio-api-mu.vercel.app/api/certificates",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(n)})).ok){const l=await fetch("https://portifolio-api-mu.vercel.app/api/certificates").then(w=>w.json());p(Array.isArray(l)?l:l.certificates||[]),d({id:"",title:"",date:"",issuer:"",progress:0,externalUrl:""})}else b("Erro ao adicionar certificado.")}}catch{b("Erro de conexão com o servidor.")}},z=e=>{d(e),C(e.id)},I=async e=>{const r=localStorage.getItem("admin_token");await fetch(`https://portifolio-api-mu.vercel.app/api/certificates/${e}`,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}}),p(g.filter(n=>n.id!==e))},P=()=>{localStorage.removeItem("admin_token"),window.location.reload()};return f?j?t.jsxs("div",{className:"admin-bg flex-center",children:[t.jsx("div",{className:"admin-loader",children:"Carregando..."}),t.jsx("style",{children:N})]}):t.jsxs("div",{className:"admin-bg",children:[t.jsxs("div",{className:"admin-panel",children:[t.jsxs("header",{className:"admin-header",children:[t.jsx("h2",{children:"Painel Admin"}),t.jsx("button",{className:"admin-logout",onClick:P,children:"Sair"})]}),t.jsxs("section",{children:[t.jsx("h3",{className:"admin-section-title",children:"Goals"}),t.jsxs("form",{className:"admin-form",onSubmit:A,children:[t.jsx("input",{placeholder:"Título",value:a.title,onChange:e=>s({...a,title:e.target.value}),required:!0,"aria-label":"Título do Goal"}),t.jsx("input",{placeholder:"Deadline",value:a.deadline,onChange:e=>s({...a,deadline:e.target.value}),required:!0,"aria-label":"Deadline do Goal"}),t.jsx("input",{placeholder:"Categoria",value:a.category,onChange:e=>s({...a,category:e.target.value}),required:!0,"aria-label":"Categoria do Goal"}),t.jsx("input",{type:"number",placeholder:"Progresso",value:a.progress,onChange:e=>s({...a,progress:Number(e.target.value)}),min:0,max:100,required:!0,"aria-label":"Progresso do Goal"}),t.jsx("button",{type:"submit",className:"admin-btn",children:u?"Salvar Alteração":"Adicionar Goal"}),u&&t.jsx("button",{type:"button",className:"admin-btn admin-btn-cancel",onClick:()=>{v(null),s({id:"",title:"",deadline:"",progress:0,category:""})},children:"Cancelar"})]}),t.jsx("ul",{className:"admin-list",children:m.map(e=>t.jsxs("li",{className:"admin-list-item",children:[t.jsxs("div",{children:[t.jsx("span",{className:"admin-list-title",children:e.title}),t.jsxs("span",{className:"admin-list-progress",children:[e.progress,"%"]}),t.jsxs("div",{className:"admin-list-meta",children:[e.category," | ",e.deadline]})]}),t.jsxs("div",{className:"admin-list-actions",children:[t.jsx("button",{onClick:()=>U(e.id),className:"admin-btn admin-btn-remove",children:"Remover"}),t.jsx("button",{onClick:()=>E(e),className:"admin-btn admin-btn-edit",children:"Editar"})]})]},e.id))})]}),t.jsxs("section",{children:[t.jsx("h3",{className:"admin-section-title",children:"Certificados"}),t.jsxs("form",{className:"admin-form",onSubmit:T,children:[t.jsx("input",{placeholder:"Título",value:i.title,onChange:e=>d({...i,title:e.target.value}),required:!0,"aria-label":"Título do Certificado"}),t.jsx("input",{placeholder:"Data",value:i.date,onChange:e=>d({...i,date:e.target.value}),required:!0,"aria-label":"Data do Certificado"}),t.jsx("input",{placeholder:"Emissor",value:i.issuer,onChange:e=>d({...i,issuer:e.target.value}),required:!0,"aria-label":"Emissor do Certificado"}),t.jsx("input",{type:"number",placeholder:"Progresso",value:i.progress,onChange:e=>d({...i,progress:Number(e.target.value)}),min:0,max:100,required:!0,"aria-label":"Progresso do Certificado"}),t.jsx("input",{placeholder:"URL externa",value:i.externalUrl,onChange:e=>d({...i,externalUrl:e.target.value}),"aria-label":"URL externa do Certificado"}),t.jsx("button",{type:"submit",className:"admin-btn",children:h?"Salvar Alteração":"Adicionar Certificado"}),h&&t.jsx("button",{type:"button",className:"admin-btn admin-btn-cancel",onClick:()=>{C(null),d({id:"",title:"",date:"",issuer:"",progress:0,externalUrl:""})},children:"Cancelar"})]}),S&&t.jsx("div",{className:"admin-error",role:"alert",children:S}),t.jsx("ul",{className:"admin-list",children:g.map(e=>t.jsxs("li",{className:"admin-list-item",children:[t.jsxs("div",{children:[t.jsx("span",{className:"admin-list-title",children:e.title}),t.jsx("span",{className:"admin-list-progress",children:e.issuer}),t.jsxs("div",{className:"admin-list-meta",children:[e.date," | ",e.progress,"% ",e.externalUrl&&t.jsx("a",{href:e.externalUrl,target:"_blank",rel:"noopener noreferrer",className:"admin-list-link",children:"Ver"})]})]}),t.jsxs("div",{className:"admin-list-actions",children:[t.jsx("button",{onClick:()=>I(e.id),className:"admin-btn admin-btn-remove",children:"Remover"}),t.jsx("button",{onClick:()=>z(e),className:"admin-btn admin-btn-edit",children:"Editar"})]})]},e.id))})]})]}),t.jsx("style",{children:N})]}):t.jsx(G,{onLogin:()=>y(!0)})}const N=`
.admin-bg {
  min-height: 100vh;
  background: linear-gradient(135deg, #6366f1 0%, #a5b4fc 100%);
  font-family: Inter, Arial, sans-serif;
  padding: 0;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.admin-loader {
  color: #3730a3;
  font-size: 24px;
  font-weight: 600;
}
.admin-panel {
  max-width: 900px;
  margin: 40px auto;
  background: white;
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.10);
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.admin-header h2 {
  color: #3730a3;
  font-weight: 700;
  font-size: 32px;
  margin: 0;
}
.admin-logout {
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(99,102,241,0.10);
  transition: background 0.2s;
}
.admin-logout:hover {
  background: #3730a3;
}
.admin-section-title {
  color: #6366f1;
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 12px;
}
.admin-form {
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.admin-form input {
  flex: 1;
  min-width: 120px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 15px;
  background: #f9fafb;
}
.admin-form input:focus {
  outline: 3px solid #6366f1;
  outline-offset: 2px;
}
.admin-btn {
  background: linear-gradient(90deg, #6366f1 0%, #818cf8 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}
.admin-btn-cancel {
  background: #e0e7ff;
  color: #3730a3;
}
.admin-btn-remove {
  background: #dc2626;
  color: white;
  border-radius: 6px;
  padding: 6px 12px;
  font-weight: 500;
  margin-right: 0;
}
.admin-btn-edit {
  background: #6366f1;
  color: white;
  border-radius: 6px;
  padding: 6px 12px;
  font-weight: 500;
}
.admin-list {
  margin-bottom: 0;
  padding: 0;
  list-style: none;
}
.admin-list-item {
  background: #f3f4f6;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}
.admin-list-title {
  font-weight: 500;
}
.admin-list-progress {
  color: #818cf8;
  font-weight: 600;
  margin-left: 8px;
}
.admin-list-meta {
  font-size: 13px;
  color: #6b7280;
  margin-top: 2px;
}
.admin-list-link {
  color: #6366f1;
  margin-left: 8px;
  text-decoration: underline;
}
.admin-list-actions {
  display: flex;
  gap: 8px;
}
.admin-error {
  color: #dc2626;
  margin-bottom: 16px;
}
@media (max-width: 700px) {
  .admin-panel {
    padding: 12px !important;
  }
  .admin-form {
    flex-direction: column !important;
    gap: 8px !important;
  }
  .admin-header h2 {
    font-size: 22px;
  }
}
`;export{q as default};

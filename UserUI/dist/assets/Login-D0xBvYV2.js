import{d as f,af as g,r as n,j as e,Q as x,B as N}from"./index-Bvu6Xm-K.js";import{p as j}from"./userService-DzUxTQAM.js";const w=()=>{const i=f(),u=g(),[a,d]=n.useState({username:"",password:""}),c=n.useRef(),[l,t]=n.useState(null),m=r=>{const o=r.target.name;let s=r.target.value;d({...a,[o]:s})};n.useEffect(()=>{c.current.focus()},[]);const p=async r=>{var o;r.preventDefault();try{const s=await j(a.username,a.password);if(s.token&&s.account.roleName==="MEMBER"){localStorage.setItem("token",JSON.stringify(s.token)),localStorage.setItem("account",JSON.stringify(s.account)),N.success("Login successful");const h=((o=u.state)==null?void 0:o.from)||"/";setTimeout(()=>{i(h)},1e3)}else t("Invalid username or password")}catch(s){s.response?t(s.response.data.message):s.request?t("Server error"):t("An error occurred")}};return e.jsx("div",{className:"container",children:e.jsxs("div",{className:"row mt-5",children:[e.jsx("div",{className:"col-lg-3"}),e.jsxs("div",{className:"col-lg-6",children:[e.jsx("h4",{className:"text-center mb-5",children:"SIGN IN"}),e.jsxs("form",{action:"",method:"",onSubmit:p,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"username",children:"Username"}),e.jsx("input",{ref:c,type:"text",className:"",id:"username",name:"username",value:a.username,onChange:m})]}),e.jsxs("div",{className:"form-group mt-3",children:[e.jsx("label",{htmlFor:"password",children:"Password"}),e.jsx("input",{type:"password",className:"",id:"password",name:"password",autoComplete:"off",value:a.password,onChange:m})]}),e.jsx("div",{className:"form-group form-check mt-3",children:e.jsxs("label",{className:"form-check-label",children:[e.jsx("input",{className:"form-check-input",type:"checkbox"})," Remember me"]})}),e.jsxs("div",{className:"mt-3",children:["No account yet?"," ",e.jsx("a",{className:"register",href:"/sign-up",children:"Create an account"})]}),l&&e.jsx("div",{className:"alert alert-danger mt-3",children:l}),e.jsx("button",{type:"submit",className:"login-btn mt-3",children:"LOG IN"})]}),e.jsx(x,{})]}),e.jsx("div",{className:"col-lg-3"})]})})};export{w as default};
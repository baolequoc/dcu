import{o as c,c as b,a as t,t as g,r as o,b as u}from"./index.f0a91f5b.js";const y={class:"block mb-2 text-sm font-medium text-gray-900"},U=["model-value"],a={__name:"FormInput",props:{modelValue:{type:String,default:"0"},title:{type:String,default:"title"}},emits:["update:modelValue"],setup(m){return(n,s)=>(c(),b("div",null,[t("label",y,g(m.title),1),t("input",{type:"text","model-value":m.modelValue,"on:update:modelValue":s[0]||(s[0]=d=>n.$emit("update:modelValue",d.target.value)),class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"},null,40,U)]))}},k={class:"w-full h-full flex flex-col"},w=t("div",{class:"flex flex-col"},[t("img",{src:"https://i.postimg.cc/Pr1Kdf31/banner-UTE.png",border:"0",alt:"banner-UTE"}),t("h1",{class:"w-full flex justify-center items-center p-4 bg-sky-200 font-semibold text-2xl text-gray-700"}," \u1EE8NG D\u1EE4NG BMS V\xC0O \u0110I\u1EC0U KHI\u1EC2N FCU TRONG PH\xD2NG TH\xCD NGI\u1EC6M ")],-1),_={class:"flex flex-col bg-sky-100 h-full w-full"},C=t("div",{class:"h-20 flex justify-center text-2xl text-bold bg-white w-full items-center text-slate-800"}," Trang \u0111ie\u0302\u0300u khie\u0302\u0309n ",-1),N={class:"flex space-x-8 justify-center"},T={class:"flex space-x-8"},D={class:"flex flex-col w-64 space-y-4 mt-8"},E={class:"flex flex-col w-64 space-y-4 mt-8"},G=t("button",{type:"submit",class:"text-white mt-16 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}," Submit ",-1),B={__name:"ControlPage",setup(m){const n=o(""),s=o(""),d=o(""),i=o(""),r=o(""),f=o(""),p=o(""),V=o(""),v=o(""),x=o("");return(P,e)=>(c(),b("div",k,[w,t("div",_,[C,t("div",N,[t("form",T,[t("div",D,[u(a,{title:"\u0110i\u1EC7n \xE1p",modelValue:s.value,"onUpdate:modelValue":e[0]||(e[0]=l=>s.value=l)},null,8,["modelValue"]),u(a,{title:"D\xF2ng \u0111i\u1EC1n",modelValue:n.value,"onUpdate:modelValue":e[1]||(e[1]=l=>n.value=l)},null,8,["modelValue"]),u(a,{title:"T\u1EA7n s\u1ED1",modelValue:d.value,"onUpdate:modelValue":e[2]||(e[2]=l=>d.value=l)},null,8,["modelValue"]),u(a,{title:"T\u1ED1c \u0111\u1ED9",modelValue:i.value,"onUpdate:modelValue":e[3]||(e[3]=l=>i.value=l)},null,8,["modelValue"]),u(a,{title:"C\xF4ng su\u1EA5t",modelValue:r.value,"onUpdate:modelValue":e[4]||(e[4]=l=>r.value=l)},null,8,["modelValue"])]),t("div",E,[u(a,{title:"ACC",modelValue:f.value,"onUpdate:modelValue":e[5]||(e[5]=l=>f.value=l)},null,8,["modelValue"]),u(a,{title:"DEC",modelValue:p.value,"onUpdate:modelValue":e[6]||(e[6]=l=>p.value=l)},null,8,["modelValue"]),u(a,{title:"Para lock",modelValue:V.value,"onUpdate:modelValue":e[7]||(e[7]=l=>V.value=l)},null,8,["modelValue"]),u(a,{title:"Fre ref",modelValue:v.value,"onUpdate:modelValue":e[8]||(e[8]=l=>v.value=l)},null,8,["modelValue"]),u(a,{title:"Run com",modelValue:x.value,"onUpdate:modelValue":e[9]||(e[9]=l=>x.value=l)},null,8,["modelValue"])]),G])])])]))}};export{B as default};
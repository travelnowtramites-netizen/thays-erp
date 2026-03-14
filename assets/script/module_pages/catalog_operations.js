const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxAm_8mmEzw1RwDggPaYItd5roIpK3Q7w-9k9rGWSOOKSKLNLlHJo0szSNI5PWd6yXmFA/exec";

const CONFIG = {

CAT_MATERIA_PRIMA:[
{field:"ID_MP",type:"auto",label:"ID Materia Prima"},
{field:"FECHA_ALTA",type:"date",label:"Fecha de Alta"},
{field:"NOMBRE_INSUMO",type:"text",label:"Nombre Insumo"},
{field:"PRESENTACION",type:"number",label:"Presentación (Cant.)"},
{field:"ID_UNIDAD",type:"select",label:"Unidad Medida",source:"LST_UNIDADES_MEDIDA",key:"ID_UNIDAD",display:"NOMBRE"},
{field:"COMENTARIO",type:"textarea",label:"Comentario"}
],

CAT_PRODUCTOS:[
{field:"ID_PT",type:"auto",label:"ID Producto"},
{field:"FECHA_ALTA",type:"date",label:"Fecha de Alta"},
{field:"ID_TP_PRODUCTO",type:"select",label:"Tipo Producto",source:"LST_TIPO_PRODUCTO",key:"ID_TP_PRODUCTO",display:"NOMBRE"},
{field:"NOMBRE_PRODUCTO",type:"text",label:"Nombre Producto"},
{field:"ID_SABOR",type:"select",label:"Sabor",source:"LST_SABORES",key:"ID_SABOR",display:"NOMBRE"},
{field:"ID_PRESENTACION",type:"select",label:"Presentación",source:"LST_PRESENTACIONES",key:"ID_PRESENTACION",display:"NOMBRE"},
{field:"VIDA_UTIL_DIAS",type:"number",label:"Vida Útil (Días)"},
{field:"PRECIO_VENTA",type:"currency",label:"Precio Venta ($)"},
{field:"ACTIVO",type:"checkbox",label:"¿Está Activo?"},
{field:"COMENTARIO",type:"textarea",label:"Comentario"}
]

};

const COLUMNAS_VISIBLES={

CAT_MATERIA_PRIMA:[
"NOMBRE_INSUMO",
"PRESENTACION",
"ID_UNIDAD",
"COMENTARIO"
],

CAT_PRODUCTOS:[
"ID_TP_PRODUCTO",
"NOMBRE_PRODUCTO",
"ID_SABOR",
"ID_PRESENTACION",
"VIDA_UTIL_DIAS",
"PRECIO_VENTA",
"ACTIVO",
"COMENTARIO"
]

};

let currentSheet="CAT_MATERIA_PRIMA";

document.addEventListener("ERP_READY",()=>{
loadModule("CAT_MATERIA_PRIMA",document.querySelector('.module-btn'));
actualizarBadges();
});


/* ============================= */
/* CARGAR MODULO */
/* ============================= */

function loadModule(sheetName,element){

currentSheet=sheetName;

document.querySelectorAll('.module-btn').forEach(b=>b.classList.remove('active'));
if(element) element.classList.add('active');

document.getElementById('current-table-title').innerText=
sheetName.replace("CAT_","").replace(/_/g," ");

renderSkeleton();

const data=Array.isArray(window.APP_CACHE?.[sheetName]) ? window.APP_CACHE[sheetName] : [];

renderData(data);

}


/* ============================= */
/* DISPLAY SELECT */
/* ============================= */

function getDisplayValue(fieldConfig,value){

if(!fieldConfig) return value;

if(fieldConfig.type!=="select") return value;

const lista=Array.isArray(window.APP_CACHE?.[fieldConfig.source]) ? window.APP_CACHE[fieldConfig.source] : [];

const encontrado=lista.find(x=>String(x?.[fieldConfig.key])===String(value));

return encontrado ? encontrado[fieldConfig.display] : value;

}


/* ============================= */
/* SKELETON TABLA */
/* ============================= */

function renderSkeleton(){

const head=document.getElementById("table-head");

const visibles=COLUMNAS_VISIBLES[currentSheet]||[];

const fields=CONFIG[currentSheet].filter(f=>visibles.includes(f.field));

head.innerHTML=fields.map(f=>`<th>${f.label}</th>`).join("")+"<th>ACCIONES</th>";

document.getElementById("table-body").innerHTML=
`<tr><td colspan="${fields.length+1}">Cargando...</td></tr>`;

}


/* ============================= */
/* RENDER DATA */
/* ============================= */

function renderData(data){

const visibles=COLUMNAS_VISIBLES[currentSheet]||[];

const fields=CONFIG[currentSheet].filter(f=>visibles.includes(f.field));

const body=document.getElementById("table-body");

if(!Array.isArray(data)||data.length===0){

body.innerHTML=`<tr><td colspan="${fields.length+1}" class="status-indicator danger">Sin datos</td></tr>`;
return;

}

body.innerHTML=data.map(row=>{

const cols=fields.map(f=>{

let val=row?.[f.field];

val=getDisplayValue(f,val);

if(f.type==="checkbox") val=val==="SI"?"Activo":"No";

return `<td>${val ?? ""}</td>`;

}).join("");

return `
<tr>
${cols}
<td>
<button class="btn-edit" onclick='openModal("edit",${JSON.stringify(row)})'>
<i class="fas fa-edit"></i>
</button>
</td>
</tr>
`;

}).join("");

}


/* ============================= */
/* MODAL */
/* ============================= */

function openModal(mode,data=null){

const modal=document.getElementById("formModal");
const container=document.getElementById("formInputs");
const fields=CONFIG[currentSheet];
const today=new Date().toISOString().split("T")[0];

document.getElementById("modalTitle").innerText=
mode==="add"?"Nuevo Registro":"Editar Registro";

container.innerHTML=fields.map(f=>{

let val=data ? data[f.field] : "";

if(mode==="add"){
if(f.type==="auto") val="(Auto)";
if(f.type==="date") val=today;
}

let inputHtml="";

switch(f.type){

case "select":

const lista=Array.isArray(window.APP_CACHE?.[f.source]) ? window.APP_CACHE[f.source] : [];

const options=lista.map(opt=>
`<option value="${opt[f.key]}" ${val==opt[f.key]?'selected':''}>${opt[f.display]}</option>`
).join("");

inputHtml=`<select name="${f.field}" required>
<option value="">Seleccione...</option>
${options}
</select>`;
break;

case "textarea":
inputHtml=`<textarea name="${f.field}" rows="3">${val||""}</textarea>`;
break;

case "checkbox":
const checked=val==="SI"||val===true?"checked":"";
inputHtml=`<input type="checkbox" name="${f.field}" ${checked}>`;
break;

case "currency":
inputHtml=`<input type="number" step="0.01" name="${f.field}" value="${val||""}" required>`;
break;

case "auto":
inputHtml=`<input type="text" name="${f.field}" value="${val||""}" readonly style="background:#eee">`;
break;

default:
inputHtml=`<input type="${f.type}" name="${f.field}" value="${val||""}" required>`;
break;

}

return `
<div class="form-group">
<label>${f.label}</label>
${inputHtml}
</div>
`;

}).join("");

document.querySelector(".modal-footer").innerHTML=`

${mode==="edit"
?`<button type="button" class="btn-eliminar" onclick="deleteRecord('${data[fields[0].field]}')">
<i class="fas fa-trash"></i> Eliminar
</button>`:""}

<button type="button" class="btn-cancelar" onclick="closeModal()">Cancelar</button>
<button type="button" class="btn-guardar" onclick="saveRecord()">Guardar</button>
`;

modal.dataset.mode=mode;
modal.style.display="block";

}


/* ============================= */
/* GUARDAR REGISTRO */
/* ============================= */

async function saveRecord(){

const modal=document.getElementById("formModal");
const form=document.getElementById("dynamicForm");

const formData=new FormData(form);
const obj=Object.fromEntries(formData.entries());

form.querySelectorAll('input[type="checkbox"]').forEach(cb=>{
obj[cb.name]=cb.checked?"SI":"NO";
});

const data=Array.isArray(window.APP_CACHE?.[currentSheet]) ? window.APP_CACHE[currentSheet] : [];


/* VALIDACION MATERIA PRIMA */

if(currentSheet==="CAT_MATERIA_PRIMA"){

const duplicado=data.find(x=>
String(x?.NOMBRE_INSUMO||"").trim().toLowerCase()===
String(obj?.NOMBRE_INSUMO||"").trim().toLowerCase()
);

if(duplicado && modal.dataset.mode!=="edit"){
alert("Este insumo ya existe");
openModal("edit",duplicado);
return;
}

}


/* VALIDACION PRODUCTOS */

if(currentSheet==="CAT_PRODUCTOS"){

const nombreNuevo=String(obj?.NOMBRE_PRODUCTO||"").trim().toLowerCase();

const duplicado=data.find(x=>
String(x?.NOMBRE_PRODUCTO||"").trim().toLowerCase()===nombreNuevo
);

if(duplicado && modal.dataset.mode!=="edit"){
alert("Este producto ya existe");
openModal("edit",duplicado);
return;
}

}

obj.tabla=currentSheet;
obj.action=modal.dataset.mode==="edit"?"update":"insertar";

try{

await fetch(WEB_APP_URL,{
method:"POST",
mode:"no-cors",
body:JSON.stringify(obj)
});

closeModal();

const res=await fetch(WEB_APP_URL);
window.APP_CACHE=await res.json();

loadModule(currentSheet);
actualizarBadges();

}catch(e){

console.error(e);
alert("Error al guardar");

}

}


/* ============================= */
/* CERRAR MODAL */
/* ============================= */

function closeModal(){

const modal=document.getElementById("formModal");

modal.style.display="none";

document.getElementById("dynamicForm").reset();

}


/* ============================= */
/* ELIMINAR */
/* ============================= */

async function deleteRecord(id){

if(!confirm("¿Eliminar este registro?")) return;

try{

await fetch(WEB_APP_URL,{
method:"POST",
mode:"no-cors",
body:JSON.stringify({action:"delete",tabla:currentSheet,id:id})
});

closeModal();

const res=await fetch(WEB_APP_URL);
window.APP_CACHE=await res.json();

loadModule(currentSheet);
actualizarBadges();

}catch(e){

alert("Error eliminando");

}

}


/* ============================= */
/* BADGES */
/* ============================= */

function actualizarBadges(){

["CAT_MATERIA_PRIMA","CAT_PRODUCTOS"].forEach(sheet=>{

const data=Array.isArray(window.APP_CACHE?.[sheet]) ? window.APP_CACHE[sheet] : [];

updateBadge(sheet,data.length);

});

}


function updateBadge(sheetName,count){

const btn=document.querySelector(`[onclick*="${sheetName}"] .status-indicator`);

if(!btn) return;

btn.innerText=count>0?`${count} registros`:"Vacío";

btn.className=count>0?"status-indicator success":"status-indicator danger";

}


/* ============================= */
/* CLICK FUERA MODAL */
/* ============================= */

window.onclick=function(event){

const modal=document.getElementById("formModal");

if(event.target===modal) closeModal();

};
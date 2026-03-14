// const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwRS_Jol3jAjcmG1YDYtTda5JifPB72Dv9gA46vQdHN-fIikjohGwxP_g2dz7gO0WqybA/exec";

// const CONFIG = {
// "LST_UNIDADES_MEDIDA": ["ID_UNIDAD", "NOMBRE", "ABREVIATURA"],
// "LST_TIPO_GASTO": ["ID_TP_GASTO", "NOMBRE", "DESCRIPCION"],
// "LST_ESTADOS_PRODUCCION": ["ID_ESTADO_PROD", "NOMBRE", "COMENTARIO"],
// "LST_ESTADOS_INVENTARIO": ["ID_ESTADO_INV", "NOMBRE", "COMENTARIO"],
// "LST_SABORES": ["ID_SABOR", "NOMBRE", "COMENTARIO"],
// "LST_PRESENTACIONES": ["ID_PRESENTACION", "NOMBRE", "COMENTARIO"],
// "LST_TIPO_PRODUCTO": ["ID_TP_PRODUCTO", "NOMBRE", "COMENTARIO"]
// };

// let currentSheet = "LST_UNIDADES_MEDIDA";



// async function loadModule(sheetName, element){

// currentSheet = sheetName;

// document.querySelectorAll('.module-btn')
// .forEach(b=>b.classList.remove('active'));

// if(element) element.classList.add('active');

// document.getElementById('current-table-title').innerText =
// sheetName.replace('LST_','').replace(/_/g,' ');

// renderSkeleton();

// try{

// const res = await fetch(`${WEB_APP_URL}?action=read&sheet=${sheetName}`);

// const data = await res.json();

// renderData(Array.isArray(data)?data:[]);

// updateBadge(sheetName,data.length);

// }catch(e){

// document.getElementById('table-body').innerHTML =
// `<tr><td colspan="5" style="color:red">Error al cargar datos</td></tr>`;

// }

// }



// function renderSkeleton(){

// const head=document.getElementById('table-head');

// head.innerHTML = CONFIG[currentSheet]
// .map(f=>`<th>${f}</th>`).join('') + "<th>ACCIONES</th>";

// document.getElementById('table-body').innerHTML =
// `<tr><td colspan="5">Cargando...</td></tr>`;

// }



// function renderData(data){

// const fields = CONFIG[currentSheet];

// const body = document.getElementById('table-body');

// if(!Array.isArray(data) || data.length===0){

// body.innerHTML =
// `<tr><td colspan="${fields.length+1}" class="status-indicator danger">Sin datos</td></tr>`;

// return;

// }

// body.innerHTML = data.map(row=>`

// <tr>

// ${fields.map(f=>`<td>${row[f]||''}</td>`).join('')}

// <td>

// <button class="btn-edit" onclick='openModal("edit", ${JSON.stringify(row)})'>

// <i class="fas fa-edit"></i>

// </button>

// </td>

// </tr>

// `).join('');

// }



// function openModal(mode,data=null){

// const modal = document.getElementById('formModal');

// const container = document.getElementById('formInputs');

// const fields = CONFIG[currentSheet];

// document.getElementById('modalTitle').innerText =
// mode==="add"?"Nuevo Registro":"Editar Registro";

// container.innerHTML = fields.map((f,index)=>`

// <div class="form-group">

// <label>${f.replace(/_/g,' ')}</label>

// <input
// type="text"
// name="${f}"
// value="${data?data[f]:''}"
// ${index===0 && mode==="edit"?"readonly":""}
// required>

// </div>

// `).join('');

// modal.dataset.mode = mode;

// modal.style.display="block";

// }



// function closeModal(){

// document.getElementById('formModal').style.display="none";

// }



// async function saveRecord(){

// const modal = document.getElementById('formModal');

// const form = document.querySelectorAll('#formInputs input');

// const obj = {};

// form.forEach(i=>obj[i.name]=i.value);

// obj.sheet = currentSheet;

// obj.action = modal.dataset.mode==="edit"?"update":"create";

// try{

// await fetch(WEB_APP_URL,{

// method:"POST",

// mode:"no-cors",

// body:JSON.stringify(obj)

// });

// closeModal();

// loadModule(currentSheet);

// }catch(e){

// alert("Error guardando registro");

// }

// }



// function updateBadge(sheetName,count){

// const btn=document.querySelector(`[onclick*="${sheetName}"] .status-indicator`);

// if(!btn) return;

// if(count>0){

// btn.innerText=`${count} creados`;

// btn.className="status-indicator success";

// }else{

// btn.innerText="Sin datos";

// btn.className="status-indicator danger";

// }

// }



// window.onload = ()=>{

// const first=document.querySelector('.module-btn');

// loadModule("LST_UNIDADES_MEDIDA",first);

// };







const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwCdd85VBkQgL5XtBo6O5q1gpU8eMWYG9GGX6Z404K_4fxq6BwTm5fW6SAqhTBnC9hyrA/exec";

const CONFIG = {
"LST_UNIDADES_MEDIDA": ["ID_UNIDAD", "NOMBRE", "ABREVIATURA"],
"LST_TIPO_GASTO": ["ID_TP_GASTO", "NOMBRE", "DESCRIPCION"],
"LST_ESTADOS_PRODUCCION": ["ID_ESTADO_PROD", "NOMBRE", "COMENTARIO"],
"LST_ESTADOS_INVENTARIO": ["ID_ESTADO_INV", "NOMBRE", "COMENTARIO"],
"LST_SABORES": ["ID_SABOR", "NOMBRE", "COMENTARIO"],
"LST_PRESENTACIONES": ["ID_PRESENTACION", "NOMBRE", "COMENTARIO"],
"LST_TIPO_PRODUCTO": ["ID_TP_PRODUCTO", "NOMBRE", "COMENTARIO"]
};

let currentSheet = "LST_UNIDADES_MEDIDA";

if(window.APP_READY){
    iniciarModulo();
}

document.addEventListener("ERP_READY", iniciarModulo);



function iniciarModulo(){

    const first = document.querySelector('.module-btn');

    loadModule("LST_UNIDADES_MEDIDA", first);

    actualizarBadges();

}



/* ========= CAMBIAR MODULO ========= */

function loadModule(sheetName, element){

    currentSheet = sheetName;

    document.querySelectorAll('.module-btn')
    .forEach(b => b.classList.remove('active'));

    if(element) element.classList.add('active');

    document.getElementById('current-table-title').innerText =
    sheetName.replace('LST_','').replace(/_/g,' ');

    renderSkeleton();

    const data = window.APP_CACHE[sheetName] || [];

    renderData(data);

}



/* ========= CONTADORES ========= */

function actualizarBadges(){

    Object.keys(CONFIG).forEach(sheet => {

        const data = window.APP_CACHE[sheet] || [];

        updateBadge(sheet, data.length);

    });

}



/* ========= TABLA ========= */

function renderSkeleton(){

    const head = document.getElementById('table-head');

    head.innerHTML = CONFIG[currentSheet]
    .map(f => `<th>${f}</th>`).join('') + "<th>ACCIONES</th>";

    document.getElementById('table-body').innerHTML =
    `<tr><td colspan="5">Cargando...</td></tr>`;

}



function renderData(data){

    const fields = CONFIG[currentSheet];

    const body = document.getElementById('table-body');

    if(!Array.isArray(data) || data.length === 0){

        body.innerHTML =
        `<tr><td colspan="${fields.length+1}" class="status-indicator danger">Sin datos</td></tr>`;

        return;

    }

    body.innerHTML = data.map(row => `

        <tr>

        ${fields.map(f => `<td>${row[f] || ''}</td>`).join('')}

        <td>

        <button class="btn-edit" onclick='openModal("edit", ${JSON.stringify(row)})'>
        <i class="fas fa-edit"></i>
        </button>

        </td>

        </tr>

    `).join('');

}



/* ========= MODAL ========= */

function openModal(mode,data=null){

    const modal = document.getElementById('formModal');
    const container = document.getElementById('formInputs');
    const footer = document.querySelector('.modal-footer');

    const fields = CONFIG[currentSheet];

    document.getElementById('modalTitle').innerText =
    mode === "add" ? "Nuevo Registro" : "Editar Registro";

    container.innerHTML = fields.map((f,index)=>{

        /* NO MOSTRAR ID EN CREAR */

        if(index===0 && mode==="add") return "";

        return `
        <div class="form-group">
            <label>${f.replace(/_/g,' ')}</label>
            <input
            type="text"
            name="${f}"
            value="${data ? data[f] : ''}"
            ${index===0 && mode==="edit" ? "readonly" : ""}
            required>
        </div>
        `;

    }).join('');

    /* BOTONES MODAL */

    if(mode==="edit"){

        footer.innerHTML = `

        <button type="button" class="btn-eliminar" onclick="deleteRecord('${data[fields[0]]}')">
        <i class="fas fa-trash"></i> Eliminar
        </button>

        <button type="button" class="btn-cancelar" onclick="closeModal()">Cancelar</button>

        <button type="button" class="btn-guardar" onclick="saveRecord()">Guardar</button>

        `;

    }else{

        footer.innerHTML = `

        <button type="button" class="btn-cancelar" onclick="closeModal()">Cancelar</button>

        <button type="button" class="btn-guardar" onclick="saveRecord()">Guardar</button>

        `;

    }

    modal.dataset.mode = mode;

    modal.style.display = "block";

}



function closeModal(){

    document.getElementById('formModal').style.display="none";

}



/* ========= GUARDAR ========= */

async function saveRecord(){

    const modal = document.getElementById('formModal');

    const inputs = document.querySelectorAll('#formInputs input');

    const obj = {};

    inputs.forEach(i => obj[i.name] = i.value);

    obj.tabla = currentSheet;

    obj.action = modal.dataset.mode === "edit" ? "update" : "insertar";

    try{

        await fetch(WEB_APP_URL,{
            method:"POST",
            mode:"no-cors",
            body:JSON.stringify(obj)
        });

        closeModal();

        /* refrescar cache */

        const res = await fetch(WEB_APP_URL);
        window.APP_CACHE = await res.json();

        loadModule(currentSheet);

        actualizarBadges();

    }
    catch(e){

        alert("Error guardando registro");

    }

}



/* ========= ELIMINAR ========= */

async function deleteRecord(id){

    if(!confirm("¿Eliminar este registro?")) return;

    try{

        await fetch(WEB_APP_URL,{
            method:"POST",
            mode:"no-cors",
            body:JSON.stringify({
                action:"delete",
                tabla:currentSheet,
                id:id
            })
        });

        closeModal();

        const res = await fetch(WEB_APP_URL);
        window.APP_CACHE = await res.json();

        loadModule(currentSheet);

        actualizarBadges();

    }
    catch(e){

        alert("Error eliminando");

    }

}



/* ========= BADGE ========= */

function updateBadge(sheetName,count){

    const btn = document.querySelector(`[onclick*="${sheetName}"] .status-indicator`);

    if(!btn) return;

    if(count > 0){

        btn.innerText = `${count} creados`;
        btn.className = "status-indicator success";

    }else{

        btn.innerText = "Sin datos";
        btn.className = "status-indicator danger";

    }

}
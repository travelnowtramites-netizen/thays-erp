<!-- const SHEET_NAME = 'CFG_DATOS_NEGOCIO';

function getSheet(){
  const ss = SpreadsheetApp.openById("1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY");
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "ID_CONFIG",
      "NOMBRE_NEGOCIO",
      "NOMBRE_RESPONSABLE",
      "TELEFONO",
      "WHATSAPP",
      "EMAIL",
      "MAPS_LINK",
      "FACEBOOK_LINK",
      "INSTAGRAM__LINK",
      "TIKTOK",
      "WEB_LINK",
      "LOGO_URL",
      "BANNER_URL",
      "FECHA_ALTA",
      "COMENTARIO"
    ]);
  }

  return sheet;
}

function doGet() {

  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return ContentService
      .createTextOutput(JSON.stringify({status:"empty"}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const headers = data[0];
  const row = data[1];

  let obj = {};

  headers.forEach((h,i)=>{
    obj[h]=row[i];
  });

  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e){

  const sheet = getSheet();

  let data = JSON.parse(e.postData.contents);

  if(data.action=="delete"){

    sheet.getRange("A2:O2").clearContent();

    return ContentService
      .createTextOutput(JSON.stringify({status:"deleted"}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const registro = [

    "CFG-"+new Date().getTime(),

    data.NOMBRE_NEGOCIO || "",
    data.NOMBRE_RESPONSABLE || "",
    data.TELEFONO || "",
    data.WHATSAPP || "",
    data.EMAIL || "",
    data.MAPS_LINK || "",
    data.FACEBOOK_LINK || "",
    data.INSTAGRAM__LINK || "",
    data.TIKTOK || "",
    data.WEB_LINK || "",
    data.LOGO_URL || "",
    data.BANNER_URL || "",
    data.FECHA_ALTA || new Date(),
    data.COMENTARIO || ""

  ];

  sheet.getRange(2,1,1,15).setValues([registro]);

  return ContentService
    .createTextOutput(JSON.stringify({status:"ok"}))
    .setMimeType(ContentService.MimeType.JSON);
}



















const SPREADSHEET_ID = "1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY";

const TABLAS = [
"CFG_DATOS_NEGOCIO",
"LST_UNIDADES_MEDIDA",
"LST_TIPO_GASTO",
"LST_ESTADOS_PRODUCCION",
"LST_ESTADOS_INVENTARIO",
"LST_SABORES",
"LST_PRESENTACIONES",
"LST_TIPO_PRODUCTO",
"CAT_MATERIA_PRIMA",
"CAT_PRODUCTOS"
];

function getSheet(name){

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(name);

  if(!sheet){
    sheet = ss.insertSheet(name);
  }

  return sheet;

}

function generarID(prefijo){

  return prefijo + "-" + new Date().getTime();

}

function leerTabla(sheet){

  const data = sheet.getDataRange().getValues();

  if(data.length < 2) return [];

  const headers = data[0];

  return data.slice(1).map(row=>{
    
    let obj = {};

    headers.forEach((h,i)=>{
      obj[h] = row[i];
    });

    return obj;

  });

}

function cargarSistema(){

  let resultado = {};

  TABLAS.forEach(nombre => {

    const sheet = getSheet(nombre);

    resultado[nombre] = leerTabla(sheet);

  });

  return resultado;

}

function doGet(){

  const data = cargarSistema();

  return ContentService
  .createTextOutput(JSON.stringify(data))
  .setMimeType(ContentService.MimeType.JSON);

}

function insertarRegistro(tabla,data){

  const sheet = getSheet(tabla);

  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];

  let registro = [];

  headers.forEach(campo=>{

    if(campo.startsWith("ID_") && !data[campo]){
      
      const prefijo = campo.replace("ID_","");

      registro.push(generarID(prefijo));

    }else{

      registro.push(data[campo] || "");

    }

  });

  sheet.appendRow(registro);

}

function actualizarPerfil(data){

  const sheet = getSheet("CFG_DATOS_NEGOCIO");

  const headers = sheet.getRange(1,1,1,15).getValues()[0];

  const existingID = sheet.getRange(2,1).getValue();

  let registro = [];

  headers.forEach(campo=>{

    if(campo == "ID_CONFIG"){
      registro.push(existingID || generarID("CFG"));
    }else{
      registro.push(data[campo] || "");
    }

  });

  sheet.getRange(2,1,1,headers.length).setValues([registro]);

}

function doPost(e){

  const data = JSON.parse(e.postData.contents);

  if(data.action == "perfil_guardar"){

    actualizarPerfil(data);

    return ContentService
    .createTextOutput(JSON.stringify({status:"ok"}))
    .setMimeType(ContentService.MimeType.JSON);

  }

  if(data.action == "insertar"){

    insertarRegistro(data.tabla,data);

    return ContentService
    .createTextOutput(JSON.stringify({status:"inserted"}))
    .setMimeType(ContentService.MimeType.JSON);

  }

}





 -->
















const SPREADSHEET_ID = "1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY";


/* ========= UTILIDADES ========= */

function getSheet(name){

const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

let sheet = ss.getSheetByName(name);

if(!sheet){
sheet = ss.insertSheet(name);
}

return sheet;

}



function leerTabla(sheet){

const data = sheet.getDataRange().getValues();

if(data.length < 2) return [];

const headers = data[0];

return data.slice(1).map(row=>{

let obj = {};

headers.forEach((h,i)=>{
obj[h] = row[i];
});

return obj;

});

}



/* ========= GENERADOR ID PRO ========= */

function generarID(sheetName){

const sheet = getSheet(sheetName);

const prefix = sheetName
.replace("LST_","")
.split("_")
.map(w=>w[0])
.join("")
.toUpperCase();

const lastRow = sheet.getLastRow();

if(lastRow < 2) return prefix + "001";

const lastID = sheet.getRange(lastRow,1).getValue();

const num = parseInt(lastID.replace(prefix,"")) + 1;

return prefix + ("000"+num).slice(-3);

}



/* ========= VALIDAR DUPLICADOS ========= */

function existeDuplicado(sheet,data){

const registros = leerTabla(sheet);

return registros.some(r=>{

return Object.keys(data).some(k=>{

if(k.startsWith("ID_")) return false;

return r[k] == data[k];

});

});

}



/* ========= INSERTAR ========= */

function insertarRegistro(tabla,data){

const sheet = getSheet(tabla);

const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];

if(existeDuplicado(sheet,data)){
return {status:"duplicado"};
}

let registro = [];

headers.forEach((campo,i)=>{

if(i===0 && campo.startsWith("ID_")){
registro.push(generarID(tabla));
}
else{
registro.push(data[campo] || "");
}

});

sheet.appendRow(registro);

return {status:"inserted"};

}



/* ========= ACTUALIZAR ========= */

function actualizarRegistro(tabla,data){

const sheet = getSheet(tabla);

const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];

const idField = headers[0];

const registros = sheet.getDataRange().getValues();

for(let i=1;i<registros.length;i++){

if(registros[i][0] == data[idField]){

let fila = [];

headers.forEach(c=>{
fila.push(data[c] || "");
});

sheet.getRange(i+1,1,1,headers.length).setValues([fila]);

return {status:"updated"};

}

}

return {status:"not_found"};

}



/* ========= ELIMINAR ========= */

function eliminarRegistro(tabla,id){

const sheet = getSheet(tabla);

const data = sheet.getDataRange().getValues();

for(let i=1;i<data.length;i++){

if(data[i][0] == id){

sheet.deleteRow(i+1);

return {status:"deleted"};

}

}

return {status:"not_found"};

}



/* ========= GET ========= */
function doGet(e){

  const action = e && e.parameter && e.parameter.action;
  const sheetName = e && e.parameter && e.parameter.sheet;

  // leer una sola tabla
  if(action === "read" && sheetName){

    const sheet = getSheet(sheetName);
    const data = leerTabla(sheet);

    return ContentService
      .createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);

  }

  // cargar TODO el sistema (solo hojas LST_*)
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  let result = {};

  ss.getSheets().forEach(s=>{

    const name = s.getName();

    if(name.startsWith("LST_")){
      result[name] = leerTabla(s);
    }

  });

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);

}


/* devolver todo el sistema */

const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

let result = {};

ss.getSheets().forEach(s=>{

if(s.getName().startsWith("LST_")){
result[s.getName()] = leerTabla(s);
}

});

return ContentService
.createTextOutput(JSON.stringify(result))
.setMimeType(ContentService.MimeType.JSON);

}



/* ========= POST ========= */

function doPost(e){

const data = JSON.parse(e.postData.contents);

const action = data.action;

const tabla = data.tabla;

let result = {};

if(action === "insertar"){
result = insertarRegistro(tabla,data);
}

if(action === "update"){
result = actualizarRegistro(tabla,data);
}

if(action === "delete"){
result = eliminarRegistro(tabla,data.id);
}

return ContentService
.createTextOutput(JSON.stringify(result))
.setMimeType(ContentService.MimeType.JSON);

}






















const SPREADSHEET_ID = "1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY";

const CACHE_TIME = 60; // segundos


/* ========= UTILIDADES ========= */

function getSheet(name){

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  let sheet = ss.getSheetByName(name);

  if(!sheet){
    sheet = ss.insertSheet(name);
  }

  return sheet;

}



function leerTabla(sheet){

  const data = sheet.getDataRange().getValues();

  if(data.length < 2) return [];

  const headers = data[0];

  return data.slice(1).map(row=>{

    let obj = {};

    headers.forEach((h,i)=>{
      obj[h] = row[i];
    });

    return obj;

  });

}



/* ========= GENERADOR ID ERP ========= */

function generarID(sheetName){

  const sheet = getSheet(sheetName);

  const prefix = sheetName
  .replace("LST_","")
  .split("_")
  .map(w=>w[0])
  .join("")
  .toUpperCase();

  const lastRow = sheet.getLastRow();

  if(lastRow < 2) return prefix + "001";

  const lastID = sheet.getRange(lastRow,1).getValue();

  const num = parseInt(lastID.replace(prefix,"")) + 1;

  return prefix + ("000"+num).slice(-3);

}



/* ========= VALIDAR DUPLICADOS ========= */

function existeDuplicado(sheet,data){

  const registros = leerTabla(sheet);

  return registros.some(r=>{

    return Object.keys(data).some(k=>{

      if(k.startsWith("ID_")) return false;

      return r[k] == data[k];

    });

  });

}



/* ========= INSERTAR ========= */

function insertarRegistro(tabla,data){

  const sheet = getSheet(tabla);

  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];

  if(existeDuplicado(sheet,data)){
    return {status:"duplicado"};
  }

  let registro = [];

  headers.forEach((campo,i)=>{

    if(i === 0 && campo.startsWith("ID_")){
      registro.push(generarID(tabla));
    }
    else{
      registro.push(data[campo] || "");
    }

  });

  sheet.appendRow(registro);

  limpiarCache();

  return {status:"inserted"};

}



/* ========= ACTUALIZAR ========= */

function actualizarRegistro(tabla,data){

  const sheet = getSheet(tabla);

  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];

  const idField = headers[0];

  const registros = sheet.getDataRange().getValues();

  for(let i=1;i<registros.length;i++){

    if(registros[i][0] == data[idField]){

      let fila = [];

      headers.forEach(c=>{
        fila.push(data[c] || "");
      });

      sheet.getRange(i+1,1,1,headers.length).setValues([fila]);

      limpiarCache();

      return {status:"updated"};

    }

  }

  return {status:"not_found"};

}



/* ========= ELIMINAR ========= */

function eliminarRegistro(tabla,id){

  const sheet = getSheet(tabla);

  const data = sheet.getDataRange().getValues();

  for(let i=1;i<data.length;i++){

    if(data[i][0] == id){

      sheet.deleteRow(i+1);

      limpiarCache();

      return {status:"deleted"};

    }

  }

  return {status:"not_found"};

}



/* ========= CACHE ========= */

function limpiarCache(){

  const cache = CacheService.getScriptCache();

  cache.remove("ERP_CACHE");

}


function cargarSistema(){

  const cache = CacheService.getScriptCache();

  const cached = cache.get("ERP_CACHE");

  if(cached){
    return JSON.parse(cached);
  }

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  let result = {};

  ss.getSheets().forEach(s=>{

    const name = s.getName();

    if(
      name.startsWith("LST_") ||
      name.startsWith("CAT_") ||
      name.startsWith("CFG_")
    ){
      result[name] = leerTabla(s);
    }

  });

  cache.put("ERP_CACHE", JSON.stringify(result), CACHE_TIME);

  return result;

}


/* ========= GET ========= */

function doGet(e){

  const action = e.parameter.action;
  const sheetName = e.parameter.sheet;

  if(action === "read" && sheetName){

    const sheet = getSheet(sheetName);

    const data = leerTabla(sheet);

    return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);

  }

  const data = cargarSistema();

  return ContentService
  .createTextOutput(JSON.stringify(data))
  .setMimeType(ContentService.MimeType.JSON);

}



/* ========= POST ========= */

function doPost(e){

  const data = JSON.parse(e.postData.contents);

  const action = data.action;

  const tabla = data.tabla;

  let result = {};

  if(action === "insertar"){
    result = insertarRegistro(tabla,data);
  }

  if(action === "update"){
    result = actualizarRegistro(tabla,data);
  }

  if(action === "delete"){
    result = eliminarRegistro(tabla,data.id);
  }

  return ContentService
  .createTextOutput(JSON.stringify(result))
  .setMimeType(ContentService.MimeType.JSON);

}













*************





const SPREADSHEET_ID = "1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY";

const CACHE_TIME = 60; // segundos


/* ========= UTILIDADES ========= */

function getSheet(name){

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  let sheet = ss.getSheetByName(name);

  if(!sheet){
    sheet = ss.insertSheet(name);
  }

  return sheet;

}



function leerTabla(sheet){

  const data = sheet.getDataRange().getValues();

  if(data.length < 2) return [];

  const headers = data[0];

  return data.slice(1).map(row=>{

    let obj = {};

    headers.forEach((h,i)=>{
      obj[h] = row[i];
    });

    return obj;

  });

}



/* ========= GENERADOR ID ERP ========= */

function generarID(sheetName){

  const sheet = getSheet(sheetName);

  const prefix = sheetName
  .replace("LST_","")
  .split("_")
  .map(w=>w[0])
  .join("")
  .toUpperCase();

  const lastRow = sheet.getLastRow();

  if(lastRow < 2) return prefix + "001";

  const lastID = sheet.getRange(lastRow,1).getValue();

  const num = parseInt(lastID.replace(prefix,"")) + 1;

  return prefix + ("000"+num).slice(-3);

}



/* ========= VALIDAR DUPLICADOS ========= */

function existeDuplicado(sheet,data){

  const registros = leerTabla(sheet);

  return registros.some(r=>{

    return Object.keys(data).some(k=>{

      if(k.startsWith("ID_")) return false;

      return r[k] == data[k];

    });

  });

}



/* ========= INSERTAR ========= */

function insertarRegistro(tabla,data){

  const sheet = getSheet(tabla);

  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];

  if(existeDuplicado(sheet,data)){
    return {status:"duplicado"};
  }

  let registro = [];

  headers.forEach((campo,i)=>{

    if(i === 0 && campo.startsWith("ID_")){
      registro.push(generarID(tabla));
    }
    else{
      registro.push(data[campo] || "");
    }

  });

  sheet.appendRow(registro);

  limpiarCache();

  return {status:"inserted"};

}



/* ========= ACTUALIZAR ========= */

function actualizarRegistro(tabla,data){

  const sheet = getSheet(tabla);

  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];

  const idField = headers[0];

  const registros = sheet.getDataRange().getValues();

  for(let i=1;i<registros.length;i++){

    if(registros[i][0] == data[idField]){

      let fila = [];

      headers.forEach(c=>{
        fila.push(data[c] || "");
      });

      sheet.getRange(i+1,1,1,headers.length).setValues([fila]);

      limpiarCache();

      return {status:"updated"};

    }

  }

  return {status:"not_found"};

}



/* ========= ELIMINAR ========= */

function eliminarRegistro(tabla,id){

  const sheet = getSheet(tabla);

  const data = sheet.getDataRange().getValues();

  for(let i=1;i<data.length;i++){

    if(data[i][0] == id){

      sheet.deleteRow(i+1);

      limpiarCache();

      return {status:"deleted"};

    }

  }

  return {status:"not_found"};

}



/* ========= CACHE ========= */

function limpiarCache(){

  const cache = CacheService.getScriptCache();

  cache.remove("ERP_CACHE");

}


function cargarSistema(){

  const cache = CacheService.getScriptCache();

  const cached = cache.get("ERP_CACHE");

  if(cached){
    return JSON.parse(cached);
  }

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  let result = {};

  ss.getSheets().forEach(s=>{

    const name = s.getName();

    if(
      name.startsWith("LST_") ||
      name.startsWith("CAT_") ||
      name.startsWith("CFG_")
    ){
      result[name] = leerTabla(s);
    }

  });

  cache.put("ERP_CACHE", JSON.stringify(result), CACHE_TIME);

  return result;

}


/* ========= GET ========= */

function doGet(e){

  const action = e.parameter.action;
  const sheetName = e.parameter.sheet;

  if(action === "read" && sheetName){

    const sheet = getSheet(sheetName);

    const data = leerTabla(sheet);

    return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);

  }

  const data = cargarSistema();

  return ContentService
  .createTextOutput(JSON.stringify(data))
  .setMimeType(ContentService.MimeType.JSON);

}



/* ========= POST ========= */

function doPost(e){

  const data = JSON.parse(e.postData.contents);

  const action = data.action;

  const tabla = data.tabla;

  let result = {};

  if(action === "insertar"){
    result = insertarRegistro(tabla,data);
  }

  if(action === "update"){
    result = actualizarRegistro(tabla,data);
  }

  if(action === "delete"){
    result = eliminarRegistro(tabla,data.id);
  }

  return ContentService
  .createTextOutput(JSON.stringify(result))
  .setMimeType(ContentService.MimeType.JSON);

}










******
const SPREADSHEET_ID = "1Iq_wcafr5ehbBS_IB86rvDynn3BNF71O44YbZXjmPFY";
const CACHE_TIME = 60;


/* ========= UTILIDADES ========= */

function getSheet(name){

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  let sheet = ss.getSheetByName(name);

  if(!sheet){
    sheet = ss.insertSheet(name);
  }

  return sheet;

}



function leerTabla(sheet){

  const data = sheet.getDataRange().getValues();

  if(data.length < 2) return [];

  const headers = data[0];

  return data.slice(1).map(row=>{

    let obj = {};

    headers.forEach((h,i)=>{
      obj[h] = row[i];
    });

    return obj;

  });

}



/* ========= GENERADOR ID ERP SEGURO ========= */

function generarID(sheetName){

  const sheet = getSheet(sheetName);

  const data = sheet.getDataRange().getValues();

  const prefix = sheetName
  .replace("LST_","")
  .split("_")
  .map(w=>w[0])
  .join("")
  .toUpperCase();

  if(data.length < 2){
    return prefix + "001";
  }

  let max = 0;

  for(let i=1;i<data.length;i++){

    const id = data[i][0];

    if(!id) continue;

    const num = parseInt(String(id).replace(prefix,""));

    if(!isNaN(num) && num > max){
      max = num;
    }

  }

  const nuevo = max + 1;

  return prefix + ("000" + nuevo).slice(-3);

}



/* ========= INSERTAR ========= */

function insertarRegistro(tabla,data){

  const sheet = getSheet(tabla);

  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];

  let registro = [];

  headers.forEach((campo,i)=>{

    if(i === 0 && campo.startsWith("ID_")){
      registro.push(generarID(tabla));
    }
    else{
      registro.push(data[campo] || "");
    }

  });

  sheet.appendRow(registro);

  limpiarCache();

  return {status:"inserted"};

}



/* ========= ACTUALIZAR ========= */

function actualizarRegistro(tabla,data){

  const sheet = getSheet(tabla);

  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];

  const idField = headers[0];

  const registros = sheet.getDataRange().getValues();

  for(let i=1;i<registros.length;i++){

    if(registros[i][0] == data[idField]){

      let fila = [];

      headers.forEach(c=>{
        fila.push(data[c] || "");
      });

      sheet.getRange(i+1,1,1,headers.length).setValues([fila]);

      limpiarCache();

      return {status:"updated"};

    }

  }

  return {status:"not_found"};

}



/* ========= ELIMINAR ========= */

function eliminarRegistro(tabla,id){

  const sheet = getSheet(tabla);

  const data = sheet.getDataRange().getValues();

  for(let i=1;i<data.length;i++){

    if(data[i][0] == id){

      sheet.deleteRow(i+1);

      limpiarCache();

      return {status:"deleted"};

    }

  }

  return {status:"not_found"};

}



/* ========= CACHE ========= */

function limpiarCache(){

  const cache = CacheService.getScriptCache();

  cache.remove("ERP_CACHE");

}



function cargarSistema(){

  const cache = CacheService.getScriptCache();

  const cached = cache.get("ERP_CACHE");

  if(cached){
    return JSON.parse(cached);
  }

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  let result = {};

  ss.getSheets().forEach(s=>{

    const name = s.getName();

    if(
      name.startsWith("LST_") ||
      name.startsWith("CAT_") ||
      name.startsWith("CFG_")
    ){
      result[name] = leerTabla(s);
    }

  });

  cache.put("ERP_CACHE", JSON.stringify(result), CACHE_TIME);

  return result;

}



/* ========= GET ========= */

function doGet(e){

  const action = e.parameter.action;
  const sheetName = e.parameter.sheet;

  if(action === "read" && sheetName){

    const sheet = getSheet(sheetName);

    const data = leerTabla(sheet);

    return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);

  }

  const data = cargarSistema();

  return ContentService
  .createTextOutput(JSON.stringify(data))
  .setMimeType(ContentService.MimeType.JSON);

}



/* ========= POST ========= */

function doPost(e){

  const data = JSON.parse(e.postData.contents);

  const action = data.action;

  const tabla = data.tabla;

  let result = {};

  if(action === "insertar"){
    result = insertarRegistro(tabla,data);
  }

  if(action === "update"){
    result = actualizarRegistro(tabla,data);
  }

  if(action === "delete"){
    result = eliminarRegistro(tabla,data.id);
  }

  return ContentService
  .createTextOutput(JSON.stringify(result))
  .setMimeType(ContentService.MimeType.JSON);

}
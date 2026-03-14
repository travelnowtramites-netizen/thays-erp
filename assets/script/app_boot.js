async function bootERP(){

    console.log("Iniciando carga ERP...");

    try{

        const res = await fetch(API);

        const data = await res.json();

        window.APP_CACHE = data;
        window.APP_READY = true;

        console.log("ERP cache cargado", window.APP_CACHE);

        document.dispatchEvent(new Event("ERP_READY"));

    }catch(err){

        console.error("Error cargando ERP", err);

    }

}
const API = "https://script.google.com/macros/s/AKfycbxAm_8mmEzw1RwDggPaYItd5roIpK3Q7w-9k9rGWSOOKSKLNLlHJo0szSNI5PWd6yXmFA/exec";

window.APP_CACHE = {};
window.APP_READY = false;

async function bootERP(){

    try{

        const res = await fetch(API); // sin parámetros → devuelve todas las LST_*
        const data = await res.json();

        window.APP_CACHE = data;
        window.APP_READY = true;

        console.log("ERP cache cargado", window.APP_CACHE);

        document.dispatchEvent(new Event("ERP_READY"));

    }catch(err){
        console.error("Error cargando ERP", err);
    }

}

window.addEventListener("load", bootERP);
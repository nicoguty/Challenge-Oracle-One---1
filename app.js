
//Declaracion de variables
var input = document.getElementById("input-texto");
var botonEncriptar = document.getElementById("btn-encriptar");
var botonDesencriptar = document.getElementById("btn-desencriptar");
var botonCopiar = document.getElementById("boton-copiar");
var divHistorico = document.getElementById("lista");
var historico = [];
var lista = "";

//Asignando funciones a los botones

botonEncriptar.onclick = encriptar;
botonDesencriptar.onclick = desencriptar;
botonCopiar.onclick = accionCopiar;


//Logica de negocio

function encriptar () {
    var original = input.value;
    var convertido = "";
    if(original == ""){
        return;
    }
    
    for (let i = 0; i < original.length; i++) {
        var aux = original.substr(i,1);
        
        if (aux == "a") {
            convertido += "ai";
            continue;
        } 
        
        if (aux == "e") {
            convertido += "enter";
            continue;
        } 
        if (aux == "i") {
            convertido += "imes";
            continue;
        } 
        if (aux == "o") {
            convertido += "ober";
            continue;
        }
        if (aux == "u") {
            convertido += "ufat";
            continue;
        }
        convertido += aux;
    }
    console.log(convertido);
    agregarAlHistorico(convertido);
    
}

function desencriptar() {
    var original = input.value;
    var convertido = "";
    if(original == ""){
        return;
    }
    
    for (let i = 0; i < original.length; i++) {
        var aux = original.substr(i,1);
        
        if (aux == "a") {
            convertido += "a";
            i = i + 1;
            continue;
        } 
        
        if (aux == "e") {
            convertido += "e";
            i = i + 4;
            continue;
        } 
        if (aux == "i") {
            convertido += "i";
            i = i + 3;
            continue;
        } 
        if (aux == "o") {
            convertido += "o";
            i = i + 3;
            continue;
        }
        if (aux == "u") {
            convertido += "u";
            i = i + 3;
            continue;
        }
        convertido += aux;
        
    }
    console.log(convertido);
    agregarAlHistorico(convertido);
}

function agregarAlHistorico(valor) {
    historico.push(valor);
    console.log("Agregado al historico el texto:" + historico[ historico.length - 1 ]);
    actualizarHistorico();
}

function actualizarHistorico(){
    
    for (let i = 0; i < historico.length; i++) {
        lista += "<li class='list-group-item'>"+historico[i]+"</li>"; 
    }
    divHistorico.innerHTML = lista;
    lista = ""
}

function accionCopiar() {
    copiarAlPortapapeles(historico[ historico.length - 1 ]);
}

function copiarAlPortapapeles(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text); 
        
    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}
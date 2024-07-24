import correo  from "./modulos/modulo_correo.js";
import letras from "./modulos/modulo_letras.js";
import numero from "./modulos/modulo_numero.js";
// import validar from "./modulos/modulo_validar.js";
import remover from "./modulos/modulo_remover.js";


const $formulario = document.querySelector("form");

const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const direccion = document.querySelector("#direc");
const telefono = document.querySelector("#tel");
const tipo_doc = document.querySelector("#tipo_doc");
const documento = document.querySelector("#num_doc");
const politicas = document.querySelector("#politicas");
const enviar = document.querySelector("#enviar");
const email = document.querySelector("#email");

function quitarCalse (valor) {
    valor.classList.remove("error");
}


const validar = (event) => {
    event.preventDefault()
    console.log(nombre.value);
    if (nombre.value === "") {
        // alert("el campo no puede estar vacio")
        nombre.focus()
        nombre.classList.add("error")
        // nombre.addEventListener.remove("error")


// keydown -- cuando ecribo tecla por tecla 
// keypress -- cuando la presiono
// keyup -- cuando la oprimo 


    }
    if( apellido.value === ""){
        // alert("el campo no puede estar vacio")
        apellido.focus()
        apellido.classList.add("error")

    }if(tipo_doc.value === "0"){
        // alert("el campo no puede estar vacio")
        tipo_doc.focus()
        tipo_doc.classList.add("error")
    }
    if(direccion.value === ""){
        // alert("el campo no puede estar vacio")
        direccion.focus()
        direccion.classList.add("error")
    }if(telefono.value === ""){
        // alert("el campo no puede estar vacio")
        telefono.focus()
        telefono.classList.add("error")
    }if(documento.value === ""){
        // alert("el campo no puede estar vacio")
        documento.focus()
        documento.classList.add("error")
    }

    if (email.value === "") {
        email.focus();
        email.classList.add("error");
    }
}


$formulario.addEventListener("submit", validar)  //boton, al dar click haga la funcion


nombre.addEventListener("keyup", () => {
    remover(nombre);
});

apellido.addEventListener("keyup", () => {
    remover(apellido);
});

direccion.addEventListener("keyup", () => {
    remover(direccion);
});

telefono.addEventListener("keyup", () => {
    remover(telefono);
});

tipo_doc.addEventListener("change", () => {
    if (tipo_doc.value !== "0") {
        tipo_doc.classList.remove("error");
        tipo_doc.classList.add("correcto");
    } else {
        tipo_doc.classList.remove("correcto");
        tipo_doc.classList.add("error");
    }
});

documento.addEventListener("keyup", () => {
    remover(documento);
});

// email.addEventListener("keyup", () => {
//     remover(email);
// });


// enviar.setAttribute("disabled");
enviar.setAttribute('disabled', '');

// addEventListener("DOMContentLoaded", (event) => {
    // if(!politicas.checked){
    //     enviar.setAttribute('disabled', '');
    // }
// });


politicas.addEventListener("change", () => {
    if(politicas.checked){
        enviar.removeAttribute("disabled","");
    }else{
        enviar.setAttribute("disabled","");
    }
})

// function () {
//     if(nombre.value != ""){
//         nombre.classList.remove("error")
//     }
// }

console.log($formulario)



// expreciones regulares para validar cada campo 

// validar nombre y apellido 



documento.addEventListener("keypress", numero);
telefono.addEventListener("keypress", numero)


nombre.addEventListener("keypress", (event)=>{
    letras(event, nombre)
});
apellido.addEventListener("keypress", (event)=>{
    letras(event, apellido)
})


documento.addEventListener("keypress", function(event){
    console.log("keypress", event)
    console.log(this.value)
    console.log(event.keyCode)
    
})


email.addEventListener('input', (event) => {
    correo(event, email)
})


// --------------------------


// 
// email.addEventListener('input', function() {
//     campo = event.target;    
//     valido = document.getElementById('emailOK');
        
//     emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
//     //Se muestra un texto a modo de ejemplo, luego va a ser un icono
//     if (emailRegex.test(campo.value)) {
//         email.classList.remove("error");
//         email.classList.add("correcto");
//     } else {
//         email.classList.remove("correcto");
//         email.classList.add("error");
//     }
// });





// email.addEventListener("keypress", (event) => {
//     const ValidarEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     const inputValue = email.value + event.key; // Combina el valor actual con la tecla presionada
//     if (!ValidarEmail.test(inputValue)) {
//         event.preventDefault();
//     }
// });


// keydown -- cualdo la oprimimos cuando ecribo tecla por tecla, toma cada numero que entra al campo
// keypress -- cuando la mantenemos presionada
// keyup -- cuando la suelto, si se mantiene la tecla oprimida toma el ultimo elemento al soltar


// addEventListener("DOMContentLoaded", )



// const ValidarEmail = /^[(a-zA-Z)@(.com|.com.co|.edu.co)]*$/



// ('^(.+)@(\\S
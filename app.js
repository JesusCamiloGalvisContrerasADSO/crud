const $formulario = document.querySelector("form");

const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const direccion = document.querySelector("#direc");
const telefono = document.querySelector("#tel");
const tipo_doc = document.querySelector("#tipo_doc");
const documento = document.querySelector("#num_doc");
const politicas = document.querySelector("#politicas");
const enviar = document.querySelector("#enviar");

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
}

$formulario.addEventListener("submit", validar)  //boton, al dar click haga la funcion

const remover = (input, validacion) => {
    if(validacion.test(input.value)){
        input.classList.add("correcto");
        input.classList.remove("error");
    }else{
        input.classList.remove("correcto");
        input.classList.add("error");
    }
}

nombre.addEventListener("keyup",() => {
    remover(nombre, ValidarNombre)
})

apellido.addEventListener("keyup", (event) =>{
    remover(apellido, ValidarNombre)
})

direccion.addEventListener("keyup", (event) =>{
    remover(direccion, ValidarDireccion)
})

telefono.addEventListener("keyup", (event)=>{
    remover( telefono, ValidarNumero)
})

tipo_doc.addEventListener("change", () =>{
    if (tipo_doc.value !== "0") {
        tipo_doc.classList.remove("error");
        tipo_doc.classList.add("correcto");
    } else {
        tipo_doc.classList.remove("correcto");
        tipo_doc.classList.add("error");
    }
})

documento.addEventListener("keyup", (event) =>{
    remover(documento, ValidarDocumento)
})

// enviar.setAttribute("disabled");
enviar.setAttribute('disabled', '');


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


const ValidarNombre = /^[a-zA-Z]{4,}$/;

const ValidarDireccion = /^[a-zA-Z0-9\s,.'-]{3,}$/;

const ValidarNumero = /^[0-9]{10}$/;  // Exactamente 10 dígitos
const ValidarDocumento = /^[0-9]{8,10}$/;  // Entre 8 y 10 dígitos

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

$formulario.addEventListener("submit", validar)

const remover = (e, input) => {
    if(input.value != ""){
        input.classList.add("correcto")
    }
}

nombre.addEventListener("keyup",(event) => {
    remover(event, nombre)
})

apellido.addEventListener("keyup", (event) =>{
    remover(event, apellido)
})

direccion.addEventListener("keyup", (event) =>{
    remover(event, direccion)
})

telefono.addEventListener("keyup", (event)=>{
    remover(event, telefono)
})

tipo_doc.addEventListener("change", (event) =>{
    remover(event, tipo_doc)
})

documento.addEventListener("keyup", (event) =>{
    remover(event, documento)
})

// enviar.setAttribute("disabled");
enviar.setAttribute('disabled', '');


politicas.addEventListener("change", () => {
    if(politicas){

    }
    enviar.removeAttribute("disabled","");
    politicas.addEventListener("change", () => {
        enviar.setAttribute("disabled","");
    })
})

// function () {
//     if(nombre.value != ""){
//         nombre.classList.remove("error")
//     }
// }

console.log($formulario)
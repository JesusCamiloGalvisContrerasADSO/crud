import correo  from "./modulos/modulo_correo.js";
import letras from "./modulos/modulo_letras.js";
import numero from "./modulos/modulo_numero.js";
// import validar from "./modulos/modulo_validar.js";
import remover from "./modulos/modulo_remover.js";
import is_valid from "./modulos/is_valid.js";
import solicitud from "./modulos/ajax.js";



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

const Todos_required = document.querySelectorAll("form > [required]");

// console.log(Todos_required)

// Todos_required.forEach("input", )

function quitarCalse (valor) {
    valor.classList.remove("error");
}

const documentos = () =>{
    const $fragmento = document.createDocumentFragment()
fetch('http://localhost:3000/documentos')
    .then((response)=>{
        return response.json()
    })
    .then((mostrar)=>{
        let option = document.createElement("option");

            option.value = ''
            option.textContent = 'seleccione...'
            option.setAttribute('disabled', '')
            option.setAttribute('selected', '')
            $fragmento.appendChild(option)

        mostrar.forEach(element => {
            
                console.log(element)
                let option = document.createElement("option");
    
                option.value = element.id
                option.textContent = element.nombre
    
                $fragmento.appendChild(option)
            

        });
        tipo_doc.appendChild($fragmento)
    })
}


const listar = () =>{
    const $fragmento = document.createDocumentFragment();
    const tabla = document.querySelector('#tabla')
    let data = solicitud('users')
            .then((users) => {
            console.log(users);
            users.forEach(element => {
                let tr = document.createElement("tr");
                for (let i = 0; i < element.length; i++) {
                    let td = document.createElement("td");
                    td.textContent = element.name;
                    $fragmento.appendChild(td);
                }
                tr.appendChild(td);
            });
            tabla.appendChild(tr);
            });
}

enviar.setAttribute('disabled', '');

addEventListener("DOMContentLoaded", (event) => {

    documentos()
    listar()

    politicas.addEventListener("change", () => {
    if(politicas.checked){
        enviar.removeAttribute("disabled","");
    }else{
        enviar.setAttribute("disabled","");
    }
})
});



$formulario.addEventListener("submit", (event)=>{
    let responde = is_valid(event, "form [required]")
    console.log(responde)

    const data = {
        nombre: nombre.value,
        apellido: apellido.value,
        direccion: direccion.value,
        email: email.value,
        telefono: telefono.value,
        tipodoc: tipo_doc.value,
        numerodoc: documento.value,
    }
    if(responde){
        fetch('http://localhost:3000/users',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            }
        })
        .then(() =>{
            alert('sus datos fueron guardados correctamente')
            nombre.value = ""
            apellido.value = ""
            direccion.value = ""
            telefono.value = "" 
            email.value = ""
            tipo_doc.value = 0
            documento.value = ""
            politicas.value = false

        })
        .catch(() =>{
            alert('error a cargar sus datos')
        })
    }

    
})  


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



// politicas.addEventListener("change", () => {
//     if(politicas.checked){
//         enviar.removeAttribute("disabled","");
//     }else{
//         enviar.setAttribute("disabled","");
//     }
// })

// function () {
//     if(nombre.value != ""){
//         nombre.classList.remove("error")
//     }
// }

// console.log($formulario)



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


// documento.addEventListener("keypress", function(event){
//     console.log("keypress", event)
//     console.log(this.value)
//     console.log(event.keyCode)
    
// })


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

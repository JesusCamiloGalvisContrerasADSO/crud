import correo  from "./modulos/modulo_correo.js";
import letras from "./modulos/modulo_letras.js";
import numero from "./modulos/modulo_numero.js";
// import validar from "./modulos/modulo_validar.js";
import remover from "./modulos/modulo_remover.js";
import is_valid from "./modulos/is_valid.js";
import {envia, solicitud} from "./modulos/ajax.js";
// import { solicitud, envia } from "./modulos/ajax.js";



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
const id_user = document.querySelector("#id");
const tbusers = document.querySelector("#tb_users").content;
const $fragmento = document.createDocumentFragment();
const tbody = document.querySelector("tbody");
console.log(tbusers)

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
            option.textContent = 'Seleccione...'
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



const listar = async () =>{

    let data = await solicitud('users')
    const documentos = await solicitud('documentos')
    


    data.forEach(element =>{

        //aqui es un poco confuso pero se tiene en cuenta que es como una operacion ternaria
        //documento.id === element.tipodoc ? documento.nombre : null
        //la diferencia es que se coloca solo la condicion y al final el .nombre para llamarlo
        let nombre  = documentos.find(documento=> documento.id === element.tipodoc).nombre

        // tbusers.querySelector("tr").setAttribute("id", `user_${element.id}`)
        tbusers.querySelector("tr").id = `user_${element.id}`;

        tbusers.querySelector(".nombre").textContent = element.nombre
        tbusers.querySelector(".apellido").textContent = element.apellido
        tbusers.querySelector(".telefono").textContent = element.telefono
        tbusers.querySelector(".direccion").textContent = element.direccion
        tbusers.querySelector(".email").textContent = element.email

        // documentos.forEach(e => element.tipodoc == e.id ? tbusers.querySelector(".tipo").textContent = e.nombre : null)
        tbusers.querySelector(".tipo").textContent = nombre
        tbusers.querySelector(".documento").textContent = element.numerodoc
        
        tbusers.querySelector(".modificar").setAttribute ("data-id", element.id)
        tbusers.querySelector(".eliminar").setAttribute("data-id",element.id)

        
        const clone = document.importNode(tbusers, true);

        $fragmento.appendChild(clone);
    })
    tbody.appendChild($fragmento)
    
}

const buscar = async (element) => {

    const data = await envia(`users/${element.dataset.id}`,{
        method: "PATCH",
        headers:{
            'Content-Type': 'application/json; charset=utf-8'
        }
    });

    llenarformulario(data)
}



const save = (event) =>{

    let responde = is_valid(event, "form [required]")
    const data = {
        nombre: nombre.value,
        apellido: apellido.value,
        direccion: direccion.value,
        email: email.value,
        telefono: telefono.value,
        tipodoc: tipo_doc.value,
        numerodoc: documento.value,
    }

    event.preventDefault();
    if(responde){
        if(id_user.value === ""){
 
            guardar(data)
        }else{
            actualizar(data)
        }
    }
    return;
    
    console.log(responde)

    
    

}

const guardar = (data) =>{
    console.log(data)
    fetch('http://localhost:3000/users',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
        }
    })
    .then((response)=>response.json())
    .then((json) =>{
        alert('sus datos fueron guardados correctamente')
        limpiarform();

        crearfilas(json)
    })
    .catch(() =>{
        alert('error a cargar sus datos')
    })
}

const actualizar = async (data) =>{
    
    const actual = await envia(`users/${id_user.value}`,{
        method: 'PUT',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        }
    })
    limpiarform()
    editRow(actual)
}

const eliminar = async (a) =>{
    const data = await envia(`users/${a.dataset.id}`,{
        method: "PATCH",
        headers:{
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
    let resultado = window.confirm(`Estas seguro de eliminar a ${data.nombre}?`);
    if (resultado === true) {
        const eliminar = await envia(`users/${a.dataset.id}`,{
            method: 'DELETE',
        });
        document.querySelector(`#user_${a.dataset.id}`).remove()
    } 
    
}

const editRow = async (data) => {

    const documentos = await solicitud('documentos')
    let nombreDoc  = documentos.find(documento=> documento.id === data.tipodoc).nombre

    const tr = document.querySelector(`#user_${data.id}`);
    tr.querySelector(".nombre").textContent = data.nombre;
    tr.querySelector(".apellido").textContent = data.apellido;
    tr.querySelector(".telefono").textContent = data.telefono;
    tr.querySelector(".direccion").textContent = data.direccion;
    tr.querySelector(".email").textContent = data.email;
    tr.querySelector(".tipo").textContent = nombreDoc;
    tr.querySelector(".documento").textContent = data.numerodoc;

    console.log(tr)

}

const limpiarform = () =>{
    id_user.value = ""
    nombre.value = ""
    apellido.value = ""
    direccion.value = ""
    telefono.value = "" 
    email.value = ""
    tipo_doc.value = ""
    documento.value = ""
    politicas.checked = false
}


const llenarformulario = (data) => {

    const { id, nombre:primer_nombre, apellido:segundo_apellido, telefono:num_celular, direccion:direc_hogar,email:correo, tipodoc:tipoDeDoc, numerodoc } = data;

    console.log(data)

    id_user.value = id
    nombre.value = primer_nombre;
    apellido.value = segundo_apellido
    telefono.value = num_celular
    direccion.value = direc_hogar
    email.value = correo
    tipo_doc.value = tipoDeDoc
    documento.value = numerodoc
    politicas.checked = false

    
}

const crearfilas = (data) =>{
    const tr = tbody.insertRow(-1);


    const tdNombre = tr.insertCell(0);
    const tdApellido = tr.insertCell(1);
    const tdTelefono = tr.insertCell(2);
    const tdDireccion = tr.insertCell(3);
    const tdEmail = tr.insertCell(4);
    const tdTipoDoc = tr.insertCell(5);
    const tdDocumento = tr.insertCell(6);

    tdNombre.textContent = data.nombre;
    tdApellido.textContent = data.apellido;
    tdTelefono.textContent = data.telefono;
    tdDireccion.textContent = data.direccion;
    tdEmail.textContent = data.email;
    tdTipoDoc.textContent = data.tipodoc;
    tdDocumento.textContent = data.numerodoc;

}

document.addEventListener("click",e => {
    if(e.target.matches(".modificar")){
        enviar
        console.log(e.target)
        // console.log(e.target)
        buscar(e.target)
    }
})

document.addEventListener("click",e =>{
    if(e.target.matches(".eliminar")){
        console.log(e.target)
        eliminar(e.target);
    }
})



enviar.setAttribute('disabled', '');

addEventListener("DOMContentLoaded", (event) => {

    documentos()
    listar()

    politicas.addEventListener("change", () => {
    if(politicas.checked ){
        enviar.removeAttribute("disabled","");
    }else{
        enviar.setAttribute("disabled","");
    }
})
});



$formulario.addEventListener("submit",save)  


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

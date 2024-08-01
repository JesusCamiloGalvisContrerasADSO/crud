import letras from "./modulos/modulo_letras.js";
import is_valid from "./modulos/is_valid.js";


const $formulario = document.querySelector('form');
const TipoDocumento = document.querySelector('#TipoDoc');
const enviar = document.querySelector("#enviar");


TipoDocumento.addEventListener("keypress", (event)=>{
  letras(event, TipoDocumento)
});


$formulario.addEventListener("submit", (event)=>{
  let responde = is_valid(event, "form [required]")

  const data = {
      nombre: TipoDocumento.value,
  }

  if(responde){

    enviar.setAttribute('disabled', '');
    console.log("eee")

      fetch('http://localhost:3000/documentos',{
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
          'Content-Type': 'application/json; charset=utf-8'
          }
      })
        .then((response) => response.json())
        .then((json) => {
          TipoDocumento.value = ""
          enviar.removeAttribute('disabled', '');
        });
      
  }

  console.log(data)
})  

fetch('http://localhost:3000/documentos')
  .then((db)=>{
      return db.json()
  })
  .then((mostrar)=>{
      const dataContainer = document.querySelector('.mostrar_Doc');
      dataContainer.innerHTML = JSON.stringify(mostrar, null, 2);
      
  })


// enviar.setAttribute('disabled', '');



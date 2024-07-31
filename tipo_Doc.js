import letras from "./modulos/modulo_letras.js";
import is_valid from "./modulos/is_valid.js";


const $formulario = document.querySelector('form');
const TipoDocumento = document.querySelector('#TipoDoc');


TipoDocumento.addEventListener("keypress", (event)=>{
  letras(event, TipoDocumento)
});

$formulario.addEventListener("submit", (event)=>{
  let responde = is_valid(event, "form [required]")

  const data = {
      nombre: TipoDocumento.value,
  }

  if(responde){
      fetch('http://localhost:3000/documentos',{
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
          'Content-Type': 'application/json;charset=utf-8'
          }
      })
      .then(() =>{
          alert('sus datos fueron guardados correctamente')
      })
      .catch('no saleeee')
  }

  console.log(data)
})  

// enviar.setAttribute('disabled', '');



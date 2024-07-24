export default function letras (event, elemento){
    // console.log(event.value)
    let letras = /^[A-Za-zÀ-ÿ\s]*$/
    if (!letras.test(event.key)) {
        event.preventDefault();
    }
}
export default function numero(event) {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.preventDefault(); // Esto evitará que se ingrese el valor
    }
}
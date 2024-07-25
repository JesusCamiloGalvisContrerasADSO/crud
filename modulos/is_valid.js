const is_valid = (event, form) =>{
  event.prevenDefault();
  const elements = document.querySelectorAll(form)
  elements.forEach(element => {
    element.focus()
    element.classList.add("error")
  });
}

export default is_valid;
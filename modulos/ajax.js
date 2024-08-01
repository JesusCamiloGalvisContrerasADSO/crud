 const solicitud = async (url) =>{
  const json = await fetch(`http://localhost:3000/${url}`)
  const usuarios = await json.json()

  return usuarios

  fetch(`http://localhost:3000/${url}`)
    .then((response) => {
      return response.json();
    })
    .then((users) => {
      console.log(users);
      users.forEach(element => {
        let tr = document.createElement("tr");
        element.forEach((name) => {
          let td = document.createElement("td");
          td.textContent = element.name;
          $fragmento.appendChild(td);

        });
        tr.appendChild(td);
      });
      tabla.appendChild(tr);
    });

    
}

export default solicitud
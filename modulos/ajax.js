 const solicitud = async (url) =>{
  const json = await fetch(`http://localhost:3000/${url}`)
  const usuarios = await json.json()

  return usuarios



    
}

export const enviar = async (endpoint, option) =>{
  try {
    let solicitud = await fetch(`http://localhost:3000/${endpoint}`,option)
    let data = await solicitud.json();
    return data
  } catch (error) {
    return error
  }
}

export default solicitud;

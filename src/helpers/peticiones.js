// import useState from 'react'
// import env from "react-dotenv";
// import { useNavigate } from "react-router-dom";
// const barco = useNavigate();

const Peticiones = () => {
  //DATOS A UTILIZAR EN EL OBJETO CARDS
    // const [imagenes,setImagenes] = useState([])
    // const [buscador,setBuscador] = useState("")
    // const base =  "https://alberto.valurq.com/"
    const base =  "http://localhost:8000/"
    let usuario;
    try {
        usuario =  JSON.parse((localStorage.getItem("usuario") ?? {"token":"error"}));

    } catch (e) {
        console.log(e)
    } finally {

    }

    // const [carga,setCarga] = useState(true)
    //FUNCIONES A UTILIZAR
    const obtenerPanel = async (modulo,setState,pagina=0,buscar="",filtros=[]) =>{
        // setCarga(true)
        // IDEA: Cambiar por constante de ambiente

        // const url = base + modulo + "/"+pagina+"/"+((buscar!=="")?buscar : "")
        try {
            const url = base + modulo ;
            console.log(usuario)
            const temp = await fetch(url,{
                "headers": {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${usuario.token}`
                 },
            })
            const data = await temp.json();
           //console.log.log(url,"testting");
           //console.log.log(data,"testting");
            setState(data)
            // setCarga(false)
        } catch (e) {
            console.log(e)
        } finally {

        }
    }

    const obtenerUnicoRegistro = async (modulo,id) =>{
        try {
            // setCarga(true)
            // IDEA: Cambiar por constante de ambiente
            const url = base + modulo +"/"+id
           //console.log.log(url)
            const temp = await fetch(url,{
                "headers": {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${usuario.token}`
              }})
            const data = await temp.json();
            return data
        } catch (e) {
            console.log(e)
        } finally {

        }
    }

    const guardarNuevoJson = async (modulo,datos)=>{
        try {
            const url = base + modulo ;
            console.log(url)
           console.log(usuario.token)
            const temp = await fetch(url, {
              "method": "POST",
              "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${usuario.token}`,
               },
                "body": JSON.stringify(datos)
            });
           //console.log.log(temp);
            // const res = await fetch(url)
            const data = await temp.json();
           //console.log.log(data);
            return data;
        } catch (e) {
            console.log(e)
        } finally {

        }
    }

    const guardarNuevoArchivo = async (modulo,datos)=>{
        try {

            const form = new FormData();

            for (let indice in datos) {
                if (datos.hasOwnProperty(indice)) {
                    console.log(datos[indice])
                    if (Array.isArray(datos[indice])) {
                        form.append(indice,JSON.stringify(datos[indice]))
                    } else {
                        form.append(indice,datos[indice])
                    }
                }
            }
            const url = base + modulo ;
            console.log(form)
            const temp = await fetch(url, {
              "method": "POST",
              "body": form,
              "headers": {
                // "Content-Type":"multipart/form-data",
                "Authorization": `Bearer ${usuario.token}`,
                }
            });
            const data = await temp.json();
           //console.log.log(data);
            return data;
        } catch (e) {
            console.log(e)
        } finally {

        }
    }

    const modificarRegistroJson = async (modulo,id,datos)=>{
        try {
            const url = base + modulo + "/" + id ;
            const temp = await fetch(url, {
                "method": "PUT",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${usuario.token}`,
                },
                "body": JSON.stringify(datos)
            });
            const data = await temp.json()
            return data;

        } catch (e) {
            console.log(e)
        } finally {

        }

    }

    const eliminarRegistro = async (modulo,id)=>{
        try {

            const url = base + modulo + "/" + id ;
            console.log(url)
            const temp = await fetch(url, {
                "method": "DELETE",
                "headers": {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${usuario.token}`,
                }
            });
            const data = await temp.json();
            return data;
        } catch (e) {
            console.log(e)
        } finally {

        }
    }

    const endpointLibre = async (modulo,metodo)=>{
        const url = base + modulo ;
        console.log(url)
        try {
            const temp = await fetch(url, {
                "method": metodo,
                "headers":{
                    "Accept": "application/json",
                    "Authorization": `Bearer ${usuario.token}`,
                }
            });

            const data = await temp.json();
            return data;

        } catch (e) {
            console.log(e)
        } finally {

        }
    }
    return [obtenerPanel,guardarNuevoJson,obtenerUnicoRegistro,eliminarRegistro,endpointLibre,modificarRegistroJson,guardarNuevoArchivo,base]
}

export default Peticiones

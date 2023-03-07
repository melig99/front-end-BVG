import React,{useEffect,useState} from 'react'

const Peticiones = () => {
  //DATOS A UTILIZAR EN EL OBJETO CARDS
    const [imagenes,setImagenes] = useState([])
    const [buscador,setBuscador] = useState("")
    const base = "http://localhost:8000/"
    // const [carga,setCarga] = useState(true)
    //FUNCIONES A UTILIZAR
    const obtenerPanel = async (modulo,setState,pagina=0,buscar="",filtros=[]) =>{
        // setCarga(true)
        // IDEA: Cambiar por constante de ambiente
        const url = base + modulo + "/"+pagina+"/"+((buscar!="")?buscar : "")
        const temp = await fetch(url)
        const data = await temp.json();
        console.log(url,"testting");
        console.log(data,"testting");
        console.log("testting");
        setState(data)
        // setCarga(false)
    }

    const obtenerUnicoRegistro = async (modulo,id) =>{
        // setCarga(true)
        // IDEA: Cambiar por constante de ambiente
        const url = base + modulo +"/"+id
        const temp = await fetch(url)
        const data = await temp.json();
        return data
    }

    const guardarNuevoJson = async (modulo,datos)=>{
        const url = base + modulo ;
        console.log(url)
        const temp = await fetch(url, {
          "method": "POST",
          "headers": {
            "Content-Type": "application/json",
           },
            "body": JSON.stringify(datos)
        });
        console.log(temp);
        // const res = await fetch(url)
        const data = await temp.json();
        console.log(data);
        return data;
    }

    const guardarNuevoArchivo = async (modulo,datos)=>{

        const form = new FormData();

        for (var indice in datos) {
            if (datos.hasOwnProperty(indice)) {
                form.append(indice, datos[indice]);
            }
        }
        const url = base + modulo ;
        const temp = await fetch(url, {
          "method": "POST",
          "headers": {
            "Content-Type": "multipart/form-data",
            "body": form
            }
        });
        const res = await fetch(url)
        const data = await res.json();

    }

    const modificarRegistroJson = async (modulo,id,datos)=>{
        const url = base + modulo + "/" + id ;
        const temp = await fetch(url, {
          "method": "PUT",
          "headers": {
            "Content-Type": "application/json",
           },
            "body": JSON.stringify(datos)
        });
        const res = await fetch(url)
        const data = await res.json();

    }

    const eliminarRegistro = async (modulo,id)=>{
        const url = base + modulo + "/" + id ;
        const temp = await fetch(url, {
          "method": "DELETE",
        });
        const res = await fetch(url)
        const data = await res.json();
        return data;
    }

    const endpointLibre = async (modulo,metodo)=>{
        const url = base + modulo ;
        console.log(url)
        const temp = await fetch(url, {
          "method": metodo,
        });

        const res = await fetch(url)
        const data = await res.json();
        return data;
    }
    return [obtenerPanel,guardarNuevoJson,obtenerUnicoRegistro,eliminarRegistro,endpointLibre]
}

export default Peticiones

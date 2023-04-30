const localBD = () =>{
    const iniciarSesion = (datos)=> {
        //temporal
        datos.perfil = "1";
        datos.nombre = "Administrador"
        datos.token = "prueba"
        localStorage.setItem("usuario",JSON.stringify({
            "nombre":datos.usuario,
            "perfil":datos.perfil,
            "token" : datos.token
        }));
        return true
    }

    const obtenerUsuario = ()=>{
        let usuario
        if(localStorage.getItem("usuario") != null){
            usuario = localStorage.getItem("usuario")
            console.log(usuario)
        }else{
            throw new Error('No existe indice');
        }
        return JSON.parse(usuario)
    }

    const cerrarSesion = ()=>{
        localStorage.clear();
        return true
    }

    const abrirCaja=(promesa,alerta)=>{
        promesa.then(
          (a)=>{
            if(a.cod==0){
              console.log(a.datos,"Caja abierta correctamente")
              alerta("Caja abierta correctamente");
              localStorage.setItem("caja",JSON.stringify({
                  "caja":a.datos.id,
                  "descripcion":a.datos.descripcion
              }))
            }else{
              console.log(a)
              alerta(a.msg);
            }
          }
        ).catch(
          (e)=>{
            console.log(e)
            alerta(e.msg);
          }
        )
    }

    const obtenerCaja = ( )=>{
        let caja
        if(localStorage.getItem("caja") != null){
            caja = localStorage.getItem("caja")
            console.log(caja)
        }else{
            throw new Error('No existe indice');
        }
        return JSON.parse(caja)
    }
    const cerrarCaja = (promesa,alerta) =>{
        //pendiente
    }
    return ({"obtenerUsuario":obtenerUsuario,"iniciarSesion":iniciarSesion,"cerrarSesion":cerrarSesion,"abrirCaja":abrirCaja,"obtenerCaja":obtenerCaja})
}
export default localBD

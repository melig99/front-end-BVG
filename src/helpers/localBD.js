const localBD = () =>{
    const base =  "https://alberto.valurq.com/"
    // const base =  "http://localhost:8000/"

    const iniciarSesion = async (datos) => {
        //temporal
        let temp = await fetch(`${base}api/usuario/login`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify(datos)
        });
        const data = await temp.json();
        if (data.cod == "00") {

            localStorage.setItem("usuario", JSON.stringify({
                "nombre": data.success.name,
                "perfil": data.success.perfil,
                "token": data.success.token,
            }));
            localStorage.removeItem("caja");
            localStorage.setItem("menu", JSON.stringify(data.success.menu))
            return data
        } else {
            return data
        }
    }
    
    const cerrarSesion = async () => {
        let usuario =  JSON.parse((localStorage.getItem("usuario") ?? {"token":"error"}));

        let temp = await fetch(`${base}api/usuario/logout`, {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${usuario.token}`
            },
        });
        localStorage.removeItem("caja");
        localStorage.clear();
        return true
    }

    const obtenerMenu = () => {
        let menu
        if (localStorage.getItem("menu") != null) {
            menu = localStorage.getItem("menu")
        } else {
            throw new Error('No existe indice');
        }
        return JSON.parse(menu)
    }
    const obtenerUsuario = () => {
        let usuario
        if (localStorage.getItem("usuario") != null) {
            usuario = localStorage.getItem("usuario")
            console.log(usuario)
        } else {
            throw new Error('No existe indice');
        }
        return JSON.parse(usuario)
    }



    const abrirCaja = (promesa, alerta) => {
        promesa.then(
            (a) => {
                if (a.cod == 0) {
                    console.log(a.datos, "Caja abierta correctamente")
                    alerta("Caja abierta correctamente");
                    localStorage.setItem("caja", JSON.stringify({
                        "caja": a.datos.id,
                        "descripcion": a.datos.descripcion
                    }))
                } else {
                    console.log(a)
                    alerta(a.msg);
                }
            }
        ).catch(
            (e) => {
                console.log(e)
                alerta(e.msg);
            }
        )
    }

    const obtenerCaja = () => {
        let caja
        if (localStorage.getItem("caja") != null) {
            caja = localStorage.getItem("caja")
            console.log(caja)
        } else {
            throw new Error('No existe indice');
        }
        return JSON.parse(caja)
    }

    const cerrarCaja = (promesa, alerta) => {
        promesa.then((a) => console.log(a)).catch((e) => console.log(e));
        localStorage.removeItem("caja");
    }

    return ({ "obtenerUsuario": obtenerUsuario, "iniciarSesion": iniciarSesion, "cerrarSesion": cerrarSesion, "abrirCaja": abrirCaja, "obtenerCaja": obtenerCaja, "cerrarCaja": cerrarCaja, "obtenerMenu": obtenerMenu })
}
export default localBD

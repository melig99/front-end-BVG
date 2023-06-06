import React,{useState,useEffect} from 'react';
import {Form,Row,Button} from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';


export const Formulario = ({cambiarModalAlerta,idSelec,estadoForm}) => {
    const [,guardarNuevoJson,obtenerUnicoRegistro,,,modificarRegistroJson] = Peticiones();
    const vacio = {
			"id": 0,
			"descripcion": "",
			"saldo": 0,
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        const form = {
            'descripcion':e.target.tipo_plazo.value,
            'pin':e.target.pin.value,
        }
         console.log(form)
        if(idSelec === ""){
            guardarNuevoJson('api/caja',form).then(
              (a)=>{
                if(a.cod==0){
                   console.log(a,"Guardado correctamente")
                   estadoForm(false)
                  cambiarModalAlerta("Guardado Correctamente");
                }else{
                   console.log(a)
                  cambiarModalAlerta(a.msg);
                }
              }
            ).catch(
              (e)=>{
                 console.log(e)
                cambiarModalAlerta(e.msg);
              }
            )
          }else{
            modificarRegistroJson('api/caja',idSelec,form).then(
              (a)=>{
                 console.log(a.cod," a.cod")
                if(a.cod==0){
                   console.log(a,"Guardado correctamente")
                   estadoForm(false)
                  cambiarModalAlerta("Guardado Correctamente");

                }else{
                   console.log(a)
                  cambiarModalAlerta(a.msg);
                }
              }
            ).catch(
              (a)=>{
                 console.log(a)
                cambiarModalAlerta(a.msg);
              }
            )
          }
          e.target.reset();
          setDatosCaja(vacio)
    }

     console.log("idselec: ",idSelec)

    const [datosCaja,setDatosCaja] = useState({
			"id": 0,
            "descripcion": "",
			"pin": "",
			"saldo": 0,
    })



    useEffect(()=>{
        if(idSelec != ""){
            cargarForm()
        }
    },[idSelec])


    const cargarForm = async ()=>{
       console.log(idSelec);
      let datosCrudo =  (await obtenerUnicoRegistro('api/caja/u',idSelec)).datos[0]
       console.log(datosCrudo,"datos solicitud")
      setDatosCaja (datosCrudo)
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Row className="g-2">
                <Form.Group className='mb-2'>
                    <Form.Label>Descripción<b className="fw-bold text-danger">*</b></Form.Label>
                    <Form.Control type="text" id="tipo_plazo" defaultValue={datosCaja.descripcion} placeholder="Ingrese la descripcion de la caja" required/>
                </Form.Group>
            </Row>
            <Row className="g-2">
                <Form.Group className='mb-2'>
                    <Form.Label>Pin<b className="fw-bold text-danger">*</b></Form.Label>
                    <Form.Control type="password" id="pin" placeholder="Ingrese el nuevo pin" required/>
                </Form.Group>
            </Row>
            <Row>
                <Button type='submit' variant="success" >Guardar</Button>
            </Row>
        </Form>
    )
}

import React,{useState,useEffect} from 'react';
import {Form,Row,Button} from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';


export const Formulario = ({cambiarModalAlerta,idSelec}) => {
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
            'saldo_acutal':e.target.factor_divisor.value,
            'pin':e.target.pin.value,
        }
        console.log(form)
        if(idSelec === ""){
            guardarNuevoJson('api/caja',form).then(
              (a)=>{
                if(a.cod==0){
                  console.log(a,"Guardado correctamente")
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
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" id="tipo_plazo" defaultValue={datosCaja.descripcion} />
                </Form.Group>
            </Row>
            <Row className="g-2">
                <Form.Group className='mb-2'>
                    <Form.Label>Pin</Form.Label>
                    <Form.Control type="password" id="pin"  />
                </Form.Group>
            </Row>
            <Row className="g-2">
                <Form.Group className='mb-2'>
                    <Form.Label>Saldo</Form.Label>
                    <Form.Control type="number" min="0" id="factor_divisor" defaultValue="0" readOnly />
                </Form.Group>
            </Row>
            <Row>
                <Button type='submit' variant="success" >Guardar</Button>
            </Row>
        </Form>
    )
}

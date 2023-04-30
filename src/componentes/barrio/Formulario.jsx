import React,{useState,useEffect} from 'react';
import {Form,Row,Button} from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';


export const Formulario = ({cambiarModalAlerta,idSelec}) => {
  const [listaBarrio,setListaBarrio] = useState([{"label":"Testing1","value":1},{"label":"Testing2","value":2}])
  const [selectedOption, setSelectedOption] = useState(null);
  const [,guardarNuevoJson,obtenerUnicoRegistro,,,modificarRegistroJson] = Peticiones();
  const vacio = {
    "id": 0,
    "nombre": "",
    "observacion": ""
  }

  const handleSubmit = (e)=> {
    e.preventDefault();
    const form = {
      'nombre':e.target.nombre.value,
      'observacion':e.target.observacion.value,
    }
    console.log(form)
    if(idSelec === ""){
      guardarNuevoJson('api/barrio',form).then(
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
      modificarRegistroJson('api/barrio',idSelec,form).then(
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
    setDatosBarrio(vacio)
  }

  console.log("idselec: ",idSelec)

  const [datosBarrio,setDatosBarrio] = useState({
    "id": 0,
    "nombre": "",
    "observacion": ""
  })

  console.log("barrio: " +JSON.stringify(datosBarrio))

	useEffect(()=>{
    if(idSelec != ""){
      cargarForm()
    }
  },[idSelec])

  
  const cargarForm = async ()=>{
    console.log(idSelec);
    let datosCrudo =  (await obtenerUnicoRegistro('api/barrio/u',idSelec)).datos[0]
    console.log(datosCrudo,"datos solicitud")
    setDatosBarrio (datosCrudo)
  }
     
     

  return(
    <Form onSubmit={handleSubmit}>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Barrio</Form.Label>
          <Form.Control type="text" id="nombre" defaultValue={datosBarrio.nombre}/>
        </Form.Group>
      </Row>

      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Observacion</Form.Label>
          <Form.Control
            defaultValue={datosBarrio.observacion}
            id="observacion"
            as="textarea"
            style={{ height: '100px' }}
          />
        </Form.Group>
      </Row>
      <Row>
          <Button type='submit' variant="success" >Guardar</Button>
      </Row>
    </Form>
  )
}

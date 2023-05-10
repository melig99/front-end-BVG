import React,{useState,useEffect} from 'react';
import {Form,Row,Button} from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';


export const Formulario = ({cambiarModalAlerta,idSelec}) => {
  const [listaBarrio,setListaBarrio] = useState([{"label":"Testing1","value":1},{"label":"Testing2","value":2}])
  const [selectedOption, setSelectedOption] = useState(null);
  const [,guardarNuevoJson,obtenerUnicoRegistro,,,modificarRegistroJson] = Peticiones();
  const vacio = {
    "id": 0,
    "descripcion": "",
    "icono": ""
  }

  const handleSubmit = (e)=> {
    e.preventDefault();
    const form = {
      'descripcion':e.target.descripcion.value,
      'icono':e.target.icono.value,
    }
    console.log(form)
    if(idSelec === ""){
      guardarNuevoJson('api/agrupador',form).then(
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
      modificarRegistroJson('api/agrupador',idSelec,form).then(
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

  const [datosBarrio,setDatosBarrio] = useState({
    "id": 0,
    "descripcion": "",
    "icono": ""
  })


useEffect(()=>{
    if(idSelec != ""){
      cargarForm()
    }
  },[idSelec])


  const cargarForm = async ()=>{
    console.log(idSelec);
    let datosCrudo =  (await obtenerUnicoRegistro('api/agrupador/u',idSelec)).datos[0]
    console.log(datosCrudo,"datos solicitud")
    setDatosBarrio (datosCrudo)
  }



  return(
    <Form onSubmit={handleSubmit}>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Descripcion</Form.Label>
          <Form.Control type="text" id="descripcion" defaultValue={datosBarrio.descripcion}/>
        </Form.Group>
      </Row>

      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>icono</Form.Label>
           <Form.Control type="text" id="icono" defaultValue={datosBarrio.icono}/>
        </Form.Group>
      </Row>
      <Row>
          <Button type='submit' variant="success" >Guardar</Button>
      </Row>
    </Form>
  )
}

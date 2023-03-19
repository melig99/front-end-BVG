import React , { useState, useEffect }from 'react'
import {Form,Row, Col,Button} from 'react-bootstrap';
import Select from 'react-select';
import Peticiones from '../../helpers/peticiones';

export const Formulario = ({cambiarModalAlerta,idSeleccionado}) => {

  const [listaBarrio,setListaBarrio] = useState([])
  const [listaCivil,setListaCivil] = useState([])
  const [listaTipoDocumento,setListaTipoDocumento] = useState([])
  const [selectedOption, setSelectedOption] = useState(null);
  const [,guardarNuevoJson,,,endpointLibre ] = Peticiones();

  const handleSubmit = (e)=> {
    e.preventDefault();
    const form = {
      'nombre':e.target.nombre.value,
      'apellido':e.target.apellido.value,
      'tipo_documento':e.target.tipo_documento.value,
      'documento':e.target.documento.value,
      'correo':e.target.correo.value,
      'estado_civil':e.target.estado_civil.value,
      'sexo':e.target.sexo.value,
      'telefono':e.target.telefono.value,
      'f_nacimiento':e.target.f_nacimiento.value,
      'direccion':e.target.direccion.value,
      'observacion':e.target.observacion.value,
      'barrio':e.target.barrio.value,
    }
    console.log(form)
    guardarNuevoJson('api/cliente',form).then(
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
    e.target.reset();
  }


  useEffect(()=>{
    cargarListas();
  },[]);

  const cargarListas = async()=>{
    //Extrae Datos de la BD para BARRIO
    let variable = []
    let options =  await endpointLibre("api/barrio","GET")
    for (let i of options.datos){
      variable.push({'label':i.nombre,'value':i.id})
    }
    console.log(variable)
    setListaBarrio (variable)
    //Extrae Datos de la BD para ESTADO CIVIL
    variable = [];
    options =  await endpointLibre("api/estadoCivil","GET")
    for (let i of options.datos){
      variable.push({'label':i.descripcion,'value':i.id})
    }
    console.log(variable)
    setListaCivil (variable)
    //Extrae Datos de la BD para TIPO DOCUMENTO
    variable = [];
    options =  await endpointLibre("api/tipoDocumento","GET")
    for (let i of options.datos){
      variable.push({'label':i.descripcion,'value':i.id})
    }
    console.log(variable)
    setListaTipoDocumento (variable)
  }
  //console.log(datos.map(datos))
  console.log ("option selec",selectedOption)




  return(
    <Form onSubmit={handleSubmit} >
      <Row className="g-2">
        <Col md>
        <Form.Group className='mb-2'>
          <Form.Label>Nombres</Form.Label>
          <Form.Control placeholder="Ingrese nombres" id="nombre"/>
        </Form.Group>
        </Col>
        <Col md>
        <Form.Group className='mb-2'>
          <Form.Label>Apellidos</Form.Label>
          <Form.Control  placeholder="Ingrese apellidos" id="apellido"/>
        </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">
        <Col md>
          <Form.Group className='mb-2' >
            <Form.Label className='padding-left'>Tipo Documento</Form.Label>
            <Form.Select defaultValue="" id="tipo_documento">
              { listaTipoDocumento.map(valor => <option value={valor.value}>{valor.label}</option> ) }
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md>
        <Form.Group className='mb-2'>
          <Form.Label>Nro. Documento</Form.Label>
          <Form.Control  placeholder="Ingrese numero documento" id="documento"/>
        </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">
        <Col>
          <Form.Group className='mb-2'>
            <Form.Label>Barrio</Form.Label>
            <Select
              name="barrio"
              id="barrio"
              defaultValue={listaBarrio[0] }
              onChange={setSelectedOption}
              options={listaBarrio}
              placeholder="Buscar barrio"
              isClearable = {true}
              />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-2'>
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email"  placeholder="correo@correo.com" id="correo"/>
          </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Direccion</Form.Label>
          <Form.Control placeholder="Ingrese direccion" id="direccion"/>
        </Form.Group>
      </Row>
      <Row className="g-2">
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Estado Civil</Form.Label>
            <Select
              name="estado_civil"
              id="estado_civil"
              defaultValue={listaCivil[0] }
              onChange={setSelectedOption}
              options={listaCivil}
              isClearable = {true}
              placeholder="Buscar estado civil"
           />
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Sexo</Form.Label>
            <Form.Select defaultValue="" id="sexo">
              <option>Femenino</option>
              <option>Masculino</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Telefono</Form.Label>
            <Form.Control placeholder="Ingrese telefono" id="telefono"/>
          </Form.Group>
        </Col>
        <Col md>
          <Form.Group className='mb-2'>
            <Form.Label>Fecha Nacimiento</Form.Label>
            <Form.Control type="date" id="f_nacimiento"/>
          </Form.Group>
        </Col>
      </Row>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Observacion</Form.Label>
          <Form.Control
            as="textarea"
            style={{ height: '100px' }}
            id="observacion"
          />
        </Form.Group>
      </Row>
      <Row>
        <Button type='submit' variant="success" >Guardar</Button>
      </Row>
    </Form>
  )
}

import React,{useState,useEffect} from 'react';
import {Form,Row,Button} from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';
import Select from 'react-select';


export const Formulario = ({cambiarModalAlerta,idSeleccionado}) => {
    const [listaBarrio,setListaBarrio] = useState([{"label":"Testing1","value":1},{"label":"Testing2","value":2}])
    const [datosForm,setDatosForm] =useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [obtenerPanel,guardarNuevoJson,,eliminarRegistro,] = Peticiones();

    const handleSubmit = (e)=> {
        e.preventDefault();
        const form = {
            'nombre':e.target.nombre.value,
            'observacion':e.target.observacion.value,
        }
        console.log(form)
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
        e.target.reset();
    }

  return(
    <Form onSubmit={handleSubmit}>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Barrio</Form.Label>
          <Form.Control type="text" id="nombre" />
        </Form.Group>
      </Row>
      <Row>
        {
            // <Form.Group className='mb-2'>
            //   <Form.Label>Barrio</Form.Label>
            //   <Select
            //     defaultValue={listaBarrio[0] }
            //     onChange={setSelectedOption}
            //     options={listaBarrio}
            //     name="barrio"
            //     placeholder="Buscar barrio"
            //     isClearable = {true}
            //     id= "barrio"
            //   />
            // </Form.Group>
        }

      </Row>
      <Row className="g-2">
        <Form.Group className='mb-2'>
          <Form.Label>Observacion</Form.Label>
          <Form.Control
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

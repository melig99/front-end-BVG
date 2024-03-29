import React,{useState,useEffect} from 'react';
import {Form,Row,Button} from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';
import localBD from '../../helpers/localBD';
import Select from 'react-select';



export const FormularioCierre = ({cambiarModalAlerta,idSelec,estadoForm }) => {
    const [,guardarNuevoJson,obtenerUnicoRegistro,,endpointLibre,modificarRegistroJson] = Peticiones();
    const [selectedOption, setSelectedOption] = useState(null);
    const [listaCaja,setListaCaja] = useState([])
    const {cerrarCaja} = localBD()
    const vacio = {
			"id": 0,
			"descripcion": "",
			"saldo": 0,
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        const form = {
            'pin':e.target.pin.value,
            'saldo':e.target.saldo.value,
        }
         console.log(e.target.caja.value + " caja id")
        if(e.target.caja.value !== ""){
            cerrarCaja(guardarNuevoJson('api/cierre/caja/'+e.target.caja.value,form),cambiarModalAlerta)
            estadoForm(false)
          }
    }


    const [datosPlazo,setDatosPlazo] = useState({
			"id": 0,
			"descripcion": "",
			"saldo": 0,
    })

    const cargarListas = async ()=>{
        let variable = []
        let options =  await endpointLibre("api/caja","GET")
        for (let i of options.datos){
          variable.push({'label':i.descripcion,'value':i.id})
        }
         console.log(variable)
        setListaCaja (variable)
    }

    useEffect(()=>{
        cargarListas()
    },[])

    useEffect(()=>{
        if(idSelec != ""){
            cargarForm()
        }
    },[idSelec])


    const cargarForm = async ()=>{
         console.log(idSelec);
        let datosCrudo =  (await obtenerUnicoRegistro('api/caja/u',idSelec)).datos[0]
         console.log(datosCrudo,"datos solicitud")
        setDatosPlazo (datosCrudo)
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Row className="g-2">
                <Form.Group className='mb-2'>
                    <Form.Label>Caja</Form.Label>
                        <Form.Select  id="caja">
                          { listaCaja.map(valor => <option key={valor.value} value={valor.value}>{valor.label}</option> ) }
                        </Form.Select>
                </Form.Group>
            </Row>
            <Row className="g-2">
                <Form.Group className='mb-2'>
                    <Form.Label>Saldo Sistema</Form.Label>
                    <Form.Control type="text" id="pin" defaultValue={datosPlazo.descripcion} />
                </Form.Group>
            </Row>
            <Row className="g-2">
                <Form.Group className='mb-2'>
                    <Form.Label>Saldo Físico</Form.Label>
                    <Form.Control type="number" min="0" id="saldo" defaultValue="0" />
                </Form.Group>
            </Row>
            <Row>
                <Button type='submit' variant="success" >Guardar</Button>
            </Row>
        </Form>
    )
}

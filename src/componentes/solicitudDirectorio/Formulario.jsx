import React , { useState, useEffect }from 'react'
import {Form,Row,Col,Tab,Tabs,Table,Button,Stack} from 'react-bootstrap';
import Select from 'react-select';
import Peticiones from '../../helpers/peticiones';
import CartasAnalisis from '../solicitudAnalista/CartasAnalisis'
export const Formulario = ({idSeleccionado}) => {

    const [listaCliente,setListaCliente] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);
    const [,guardarNuevoJson,,,endpointLibre ] = Peticiones();
    const [referenciasPersonales,setReferenciasPersonales] = useState([]);
    const [referenciasComerciales,setReferenciasComerciales] = useState([]);
    const [historialEstado,setHistorialEstado] = useState([]);
    const [analisis,setAnalisis] = useState([]);
    const [datosSolicitud,setDatosSolicitud] = useState({"id": 0,
        "ingresos_actuales": 0,
        "monto_credito": 0,
        "gastos_administrativos": 0,
        "interes": 0,
        "interes_moratorio": 0,
        "cliente": {
            "documento": "",
            "tipo_documento": 0,
            "nombre": "",
            "apellido": "",
            "f_nacimiento": "",
            "correo": "",
            "direccion": "",
            "sexo": "",
            "observaciones": "",
            "estado_civil": 0,

        },
        "tipo_plazo": {
            "id": 0,
            "descripcion": "",
            "factor_divisor": 0,
            "dias_vencimiento": 0,
            "interes": "0"
        },
    });

    const almacenDatos= (a)=>{
        console.log(a);
    }
    const actualizarReferenciasPersonales=(e)=>{
        e.preventDefault();
        console.log("Formulario Ref Personales")

        console.log([e.target.cliente.value ,e.target.relacion.value]);
        let temp = listaCliente.find((a)=>a.value==e.target.cliente.value);
        let arrTemp = referenciasPersonales;
        arrTemp.push({"cliente_id":temp.value,"nombre":"test","relacion_cliente":e.target.relacion.value})
        setReferenciasPersonales(arrTemp)
        console.log(referenciasPersonales);
    }

    const actualizarReferenciasComerciales=(e)=>{
        e.preventDefault();
        let campos =e.target;
        console.log("Formulario Ref Comerciales")

        console.log([e.target.entidad.value, e.target.estado.value, e.target.monto_cuota.value, e.target.cuotas_totales.value, e.target.cuotas_pendientes.value]);
        let arrTemp = referenciasComerciales;
        arrTemp.push({"entidad":campos.entidad.value,"estado":campos.estado.value,"monto_cuota":campos.monto_cuota.value,"cuotas_totales":campos.cuotas_totales.value,"cuotas_pendientes":campos.cuotas_pendientes.value})

        setReferenciasComerciales(arrTemp)
        console.log(referenciasComerciales);
    }

    useEffect(()=>{
        cargarListas();
    },[]);
    useEffect(()=>{
        cargarForm()
    },[idSeleccionado])

    const cargarForm = async ()=>{
        console.log(idSeleccionado);
        let ds =  (await endpointLibre(`api/solicitudUnico/${idSeleccionado}`,"GET"))
        console.log(ds,"datos solicitud")
        setDatosSolicitud (ds.datos)
        setReferenciasPersonales(ds.datos.referencia_personal)
        setReferenciasComerciales(ds.datos.referencia_comercial)
        setHistorialEstado(ds.datos.historial_estado)
        setAnalisis(ds.analisis)
        console.log(referenciasPersonales,"datos refPersonal")
        console.log(referenciasComerciales,"datos refPersonal")
        console.log(historialEstado,"datos historialEstado")
        console.log(analisis,"datos analisis")


    }
    const cargarListas = async()=>{
        //Extrae Datos de la BD para CLIENTE
        let variable = []
        let options =  await endpointLibre("api/cliente","GET")
        for (let i of options.datos){
            variable.push({'label':i.nombre,'value':i.id})
        }

    }


    return(
        <Form >
            <Tabs defaultActiveKey="solicitud" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="solicitud" title="Solicitud">
                    <Row className="g-2">
                        <Col md>
                            <Form.Group className='mb-2'>
                                <Form.Label>Cliente</Form.Label>
                                <Form.Control value={datosSolicitud.cliente.nombre+" "+datosSolicitud.cliente.apellido} placeholder="Ingrese nombres" id="nombre"  disabled/>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col md>
                            <Form.Group className='mb-2'>
                                <Form.Label>Ingresos Actuales (Mensuales)</Form.Label>
                                <Form.Control value={datosSolicitud.ingresos_actuales}  placeholder="Ingrese ingresos actuales" id="ingresos" onChange={(e)=>{almacenDatos(e)}} disabled/>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col md>
                            <Form.Group className='mb-2'>
                                <Form.Label>Monto Credito</Form.Label>
                                <Form.Control value={datosSolicitud.monto_credito} placeholder="Ingrese ingresos actuales" id="ingresos" onChange={(e)=>{almacenDatos(e)}} disabled/>
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group className='mb-2'>
                                <Form.Label>Gastos Administrativos</Form.Label>
                                <Form.Control value={datosSolicitud.gastos_administrativos} placeholder="Ingrese apellidos" id="apellido" onChange={(e)=>{almacenDatos(e)}} disabled/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md>
                            <Form.Group className='mb-2'>
                                <Form.Label>Tipo Plazo</Form.Label>
                                <Form.Control value={datosSolicitud.tipo_plazo.descripcion} placeholder="Ingrese ingresos actuales" id="ingresos" onChange={(e)=>{almacenDatos(e)}} disabled/>
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group className='mb-2'>
                                <Form.Label>Interes</Form.Label>
                                <Form.Control value={datosSolicitud.interes} placeholder="Ingrese ingresos actuales" id="ingresos" onChange={(e)=>{almacenDatos(e)}} disabled/>
                            </Form.Group>
                        </Col>
                        <Col md>
                            <Form.Group className='mb-2'>
                                <Form.Label>Interes Moratorio</Form.Label>
                                <Form.Control value={datosSolicitud.interes_moratorio} placeholder="Ingrese apellidos" id="apellido" onChange={(e)=>{almacenDatos(e)}} disabled/>
                            </Form.Group>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="refPersonal" title="Referencia Personal">
                    <Row>
                        <Table table table-striped table-hover style={{backgroundColor:"#ffffff"}}>
                            <thead className="table-dark">
                                <tr >
                                    <th>Cedula</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                </tr>
                            </thead>
                            <tbody>
                                {referenciasPersonales.map((fila)=>{return ( <tr> <td>{fila.cliente_id}</td><td>{fila.relacion_cliente}</td></tr>)})}
                            </tbody>
                        </Table>
                    </Row>
                </Tab>
                <Tab eventKey="refComercial" title="Referencia Comercial">
                    <Row>
                        <Table table table-striped table-hover style={{backgroundColor:"#ffffff"}}>
                            <thead className="table-dark">
                                <tr >
                                    <th>Entidad</th>
                                    <th>Estado</th>
                                    <th>Monto Cuota</th>
                                    <th>Cuotas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {referenciasComerciales.map((fila)=>{return ( <tr> <td>{fila.entidad}</td><td>{fila.estado}</td><td>{fila.monto_cuota}</td><td>{fila.cuotas_pendientes+"/"+fila.cuotas_totales}</td></tr>)})}
                            </tbody>
                        </Table>
                    </Row>
                </Tab>
                <Tab eventKey="analisis" title="Analisis">
                    <Row className="g-2">
                        <Col md={10}>
                            <Form.Group className='mb-2'>
                                <Form.Label>Ingresos Mensuales</Form.Label>
                                <Form.Control value={datosSolicitud.ingresos_actuales}  id="analisis_ing_mensuales"  disabled/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Button> Ver Perfil Cliente</Button>
                        </Col>
                    </Row>
                    <Row className="g-2">
                        <Col md>
                            <Form.Group className='mb-2'>
                                <Form.Label>Costos Mensuales (creditos)</Form.Label>
                                <Form.Control value={(analisis.length ? analisis[0].total : "")}  id="analisis_ing_mensuales"  disabled/>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <hr/>
                        <h6>
                            Calculos aproximados (3 meses)
                        </h6>
                    </Row>
                    <Row>
                        <Stack direction="horizontal" gap={3} style={{justifyContent:"center"}}>
                            {
                                analisis.map((dato)=>{
                                     return (
                                        <div className="bg-light border">
                                            <CartasAnalisis mes={dato.mes} ingresos={dato.ingresos} costos={dato.costos} restante={dato.restante} cuotaN={dato.cuotaN}></CartasAnalisis>
                                        </div>
                                    )

                                })
                            }

                        </Stack>
                    </Row>
                </Tab>
                <Tab eventKey="cuotero" title="Cuotero">
                </Tab>
                <Tab eventKey="Estado" title="Estado">
                    <Row className="g-2">
                        <Col md>
                            <Form.Group className='mb-2'>
                                <Form.Label>Estado</Form.Label>
                                <Form.Select defaultValue="" id="estadoSolicitud">
                                    <option value="1">Pendiente</option>
                                    <option value="2">Analizado</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Table table table-striped table-hover style={{backgroundColor:"#ffffff"}}>
                            <thead className="table-dark">
                                <tr >
                                    <th>Estado</th>
                                    <th>Observacion</th>

                                </tr>
                            </thead>
                            <tbody>
                                {historialEstado.map((fila)=>{return ( <tr key={fila.id}> <td>{fila.estado_solicitud.descripcion}</td><td>{fila.observacion_cambio}</td></tr>)})}
                            </tbody>
                        </Table>
                    </Row>
                </Tab>
            </Tabs>
        </Form>
    )
}

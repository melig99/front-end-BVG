import React , { useState, useEffect }from 'react'
import {Form,Row,Col,Tab,Tabs,Table,Button,Stack} from 'react-bootstrap';
import Select from 'react-select';
import Peticiones from '../../helpers/peticiones';
import CartasAnalisis from './CartasAnalisis'

export const Formulario = ({idSeleccionado,cambiarModalAlerta}) => {

    const [listaCliente,setListaCliente] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);
    const [,guardarNuevoJson,,,endpointLibre,modificarRegistroJson ] = Peticiones();
    const [referenciasPersonales,setReferenciasPersonales] = useState([]);
    const [referenciasComerciales,setReferenciasComerciales] = useState([]);
    const [analisis,setAnalisis] = useState([]);
    const [cuotero,setCuotero] = useState([]);
    const [historialEstado,setHistorialEstado] = useState([]);
    const [estadosPosibles,setEstadosPosibles] = useState([]);
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
    const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, "");
    const handleChange = (event) =>{
        if(event.target.id =="monto_credito"){
            handleCuotero(event)
        }
        let temp ={...numericos} ;
        temp[event.target.id] = addCommas(removeNonNumeric(event.target.value)) ;
        console.log(event.target.id , event.target.value,temp);
        setNumericos(temp);
    }

    const actualizarReferenciasPersonales=(e)=>{
        e.preventDefault();
         console.log("Formulario Ref Personales")

        console.log([e.target.cliente.value ,e.target.relacion.value]);
        let temp = listaCliente.find((a)=>a.value==e.target.cliente.value);
        console.log({"cliente":clienteSolicitud});
        if(e.target.cliente.value == datosSolicitud.cliente.id){
            cambiarModalAlerta("No se puede cargar una referencia personal igual que cliente de solicitud");
            return;
        }
        setReferenciasPersonales(
            [
                ...referenciasPersonales,
                { "cliente_id": temp.value, "nombre": temp.label, "relacion_cliente": e.target.relacion.value }
            ])
    }

    const actualizarReferenciasComerciales=(e)=>{
        e.preventDefault();
        let campos =e.target;
         console.log("Formulario Ref Comerciales")

         console.log([e.target.entidad.value, e.target.estado.value, e.target.monto_cuota.value, e.target.cuotas_totales.value, e.target.cuotas_pendientes.value]);
         setReferenciasComerciales(
             [
                 ...referenciasComerciales,
                 { "entidad": campos.entidad.value, "estado": campos.estado.value, "monto_cuota": removeNonNumeric(campos.monto_cuota.value), "cuotas_totales": campos.cuotas_totales.value, "cuotas_pendientes": campos.cuotas_pendientes.value }
             ])
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
        let refPersonales = [];
        for (const ref of ds.datos.solicitud.referencia_personal) {
             console.log(ref.cliente.nombre)
            refPersonales.push({"cliente_id":`${ref.cliente_id}`,"nombre":`${ref.cliente.nombre} ${ref.cliente.apellido}`,"relacion_cliente":`${ref.relacion_cliente}`})
        }

        ds.datos.solicitud.ingresos_actuales = addCommas(ds.datos.solicitud.ingresos_actuales);
        ds.datos.solicitud.monto_credito = addCommas(ds.datos.solicitud.monto_credito);
        ds.datos.solicitud.gastos_administrativos = addCommas(ds.datos.solicitud.gastos_administrativos);
        setDatosSolicitud (ds.datos.solicitud)
        setReferenciasPersonales(refPersonales)
        setReferenciasComerciales(ds.datos.solicitud.referencia_comercial)
        setHistorialEstado(ds.datos.solicitud.historial_estado)
        setAnalisis(ds.datos.analisis)
        setCuotero(ds.datos.cuotero);
        setEstadosPosibles(ds.datos.reglas);
         console.log(referenciasPersonales,"datos refPersonal")
         console.log(historialEstado,"datos historialEstado")
         console.log(referenciasComerciales,"datos refPersonal")
         console.log(analisis,"datos analisis")
         console.log(estadosPosibles,"datos estados posibles")

    }

    const cargarListas = async()=>{
        //Extrae Datos de la BD para CLIENTE
        let variable = []
        let options =  await endpointLibre("api/cliente","GET")
        for (let i of options.datos){
            variable.push({'label':i.nombre,'value':i.id})
        }
        setListaCliente(variable);

    }

    const guardarForm = (e) =>{
        e.preventDefault();
        const SELECT_ESTADO = document.getElementById('estadoSolicitud')
        const OBSERVACION = document.getElementById('observacion')
        const form = {
            'ref_personales':referenciasPersonales,
            'ref_comerciales':referenciasComerciales,
            'estado_id':SELECT_ESTADO.value,
            'observacion':OBSERVACION.value,
        }
         console.log(form)
        modificarRegistroJson('api/solicitud',idSeleccionado,form)
        .then(
            (a)=>{
                if(a.cod==0){
                     console.log(a,"Guardado correctamente")
                    cambiarModalAlerta("Guardado Correctamente");
                    e.target.reset();
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
    }
    return(
            <>
                <Tabs defaultActiveKey="solicitud" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="solicitud" title="Solicitud">
                        <Form id="formGeneral" onSubmit={guardarForm}>
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
                                        <Form.Control value={datosSolicitud.ingresos_actuales}  placeholder="Ingrese ingresos actuales" id="ingresos"  disabled/>
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row>
                                <Col md>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Monto Crédito</Form.Label>
                                        <Form.Control value={datosSolicitud.monto_credito} placeholder="Ingrese ingresos actuales" id="ingresos"  disabled/>
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Gastos Administrativos</Form.Label>
                                        <Form.Control value={datosSolicitud.gastos_administrativos} placeholder="Ingrese apellidos" id="apellido"  disabled/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Tipo Plazo</Form.Label>
                                        <Form.Control value={datosSolicitud.tipo_plazo.descripcion} placeholder="Ingrese ingresos actuales" id="ingresos"  disabled/>
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Interés</Form.Label>
                                        <Form.Control value={datosSolicitud.interes} placeholder="Ingrese ingresos actuales" id="ingresos"  disabled/>
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Interés Moratorio</Form.Label>
                                        <Form.Control value={datosSolicitud.interes_moratorio} placeholder="Ingrese apellidos" id="apellido"  disabled/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Tab>
                    <Tab eventKey="refPersonal" title="Referencia Personal">
                        <Form id="formRefPers" onSubmit={actualizarReferenciasPersonales}>
                            <Row className="g-2">
                                <Col md={8}>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Cliente</Form.Label>
                                        <Select
                                            name="cliente"
                                            id="cliente"
                                            defaultValue={listaCliente[0] }
                                            onChange={setSelectedOption}
                                            options={listaCliente}
                                            isClearable = {true}
                                            placeholder="Buscar cliente"
                                            />
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Relación (con el cliente)</Form.Label>
                                        <Form.Control  placeholder="Vecino,primo,pariente..." id="relacion" />
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row>
                                <Col md={10}>

                                </Col>
                                <Col md={2}>
                                    <Form.Group className='mb-2'>
                                        <Button type='submit' form="formRefPers" variant="success" >Guardar</Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                        <Row>
                            <Table table-striped table-hover style={{backgroundColor:"#ffffff"}}>
                                <thead className="table-dark">
                                    <tr >
                                        <th>Nombre</th>
                                        <th>Relación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {referenciasPersonales.map((fila)=>{return ( <tr key={`rf-${fila.cliente_id}`}> <td>{fila.nombre}</td><td>{fila.relacion_cliente}</td></tr>)})}
                                </tbody>
                            </Table>
                        </Row>
                    </Tab>
                    <Tab eventKey="refComercial" title="Referencia Comercial">
                        <Form id="formRefCom" onSubmit={actualizarReferenciasComerciales}>
                            <Row>
                                <Col md>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Entidad</Form.Label>
                                        <Form.Control placeholder="Ingrese nombres" id="entidad" />
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Estado</Form.Label>
                                        <Form.Control  placeholder="Ingrese ingresos actuales" id="estado" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Monto cuota</Form.Label>
                                        <Form.Control  placeholder="Ingrese ingresos actuales" id="monto_cuota" />
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Cuotas Pendientes</Form.Label>
                                        <Form.Control  placeholder="Ingrese apellidos" id="cuotas_pendientes" />
                                    </Form.Group>
                                </Col>
                                <Col md>
                                    <Form.Group className='mb-2'>
                                        <Form.Label>Cuotas Totales</Form.Label>
                                        <Form.Control  placeholder="Ingrese apellidos" id="cuotas_totales" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={10}>

                                </Col>
                                <Col md={2}>
                                    <Form.Group className='mb-2'>
                                        <Button type='submit' form="formRefCom" variant="success" >Guardar</Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                        <Row>
                            <Table table-striped table-hover style={{backgroundColor:"#ffffff"}}>
                                <thead className="table-dark">
                                    <tr >
                                        <th>Entidad</th>
                                        <th>Estado</th>
                                        <th>Monto Cuota</th>
                                        <th>Cuotas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {referenciasComerciales.map((fila)=>{return ( <tr key={`rC-${fila.id}`}> <td>{fila.entidad}</td><td>{fila.estado}</td><td>{fila.monto_cuota}</td><td>{fila.cuotas_pendientes+"/"+fila.cuotas_totales}</td></tr>)})}
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
                                Cálculos aproximados (3 meses)
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
                        <Row>
                            <Table table-striped table-hover style={{backgroundColor:"#ffffff"}}>
                                <thead className="table-dark">
                                    <tr >
                                        <th>N</th>
                                        <th>Cuota</th>
                                        <th>Interés</th>
                                        <th>Neto</th>
                                        <th>Capital</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cuotero.map((fila)=>{return ( <tr key={`cuo-${fila.n_cuota}`}> <td>{fila.n_cuota}</td><td>{addCommas(fila.cuota)}</td><td>{addCommas(fila.interes)}</td><td>{addCommas(fila.neto)}</td><td>{addCommas(fila.capital)}</td><td>{fila.vencimiento}</td></tr>)})}
                                </tbody>
                            </Table>
                        </Row>
                    </Tab>
                    <Tab eventKey="Estado" title="Estado">
                        <Row className="g-2">
                            <Col md>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Estado<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Form.Select defaultValue="" id="estadoSolicitud">
                                        <option value={0}>Seleccione un estado nuevo</option>
                                        {estadosPosibles.map((opcion)=>{return (<option value={opcion.estado_posible[0].id}>{opcion.estado_posible[0].descripcion}</option>)})}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="g-2">
                            <Col md>
                                <Form.Group className='mb-2'>
                                    <Form.Label>Observación de Cambio<b class="fw-bold text-danger">*</b></Form.Label>
                                    <Form.Control as="textarea" style={{ height: '100px' }} id="observacion" required/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Table table-striped table-hover style={{backgroundColor:"#ffffff"}}>
                                <thead className="table-dark">
                                    <tr >
                                        <th>Estado</th>
                                        <th>Observación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historialEstado.map((fila)=>{return ( <tr key={fila.id}> <td>{fila.estado_solicitud.descripcion}</td><td>{fila.observacion_cambio}</td></tr>)})}
                                </tbody>
                            </Table>
                        </Row>
                        <Row>
                            <Button type='submit' form="formGeneral" variant="success" >Guardar</Button>
                        </Row>
                    </Tab>
                </Tabs>
            </>
    )
}

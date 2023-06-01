import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import Peticiones from '../../helpers/peticiones';

export const Formulario = ({ cambiarModalAlerta, idSelec, estadoForm }) => {

    const [listaBarrio, setListaBarrio] = useState([])
    const [listaCivil, setListaCivil] = useState([])
    const [listaTipoDocumento, setListaTipoDocumento] = useState([])
    const [barrioSelect, setBarrioSelect] = useState(null);
    const [estadoCivilSelect, setEstadoCivilSelect] = useState(null);
    const [, guardarNuevoJson, obtenerUnicoRegistro, , endpointLibre, modificarRegistroJson, guardarNuevoArchivo] = Peticiones();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = {
            'nombre': e.target.nombre.value,
            'apellido': e.target.apellido.value,
            'tipo_documento': e.target.tipo_documento.value,
            'documento': e.target.documento.value,
            'correo': e.target.correo.value,
            'estado_civil': e.target.estado_civil.value,
            'sexo': e.target.sexo.value,
            'tel_cliente': JSON.stringify([
                { "telefono_cliente": e.target.telefono1.value },
                { "telefono_cliente": e.target.telefono2.value },
                { "telefono_cliente": e.target.telefono3.value }
            ]),
            'f_nacimiento': e.target.f_nacimiento.value,
            'direccion': e.target.direccion.value,
            'observacion': e.target.observacion.value,
            'barrio': e.target.barrio.value,
            "dir_imagen": e.target.dir_imagen.files[0],
            "venc_cedula": e.target.fechaVenc.value
        }
        console.log(form)
        if (idSelec === "") {
            guardarNuevoArchivo('api/cliente', form).then(
                (a) => {
                    if (a.cod == 0) {
                        estadoForm(false)
                        console.log(a, "Guardado correctamente")
                        cambiarModalAlerta("Guardado Correctamente");
                        e.target.reset();
                    } else {
                        console.log(a)
                        cambiarModalAlerta(a.msg);
                    }
                }
            ).catch(
                (e) => {
                    console.log(e)
                    cambiarModalAlerta(e.msg);
                }
            )
        } else {
            modificarRegistroJson('api/cliente', idSelec, form).then(
                (a) => {
                    console.log(a.cod, " a.cod")
                    if (a.cod == 0) {
                        estadoForm(false)
                        console.log(a, "Guardado correctamente")
                        cambiarModalAlerta("Guardado Correctamente");

                    } else {
                        console.log(a)
                        cambiarModalAlerta(a.msg);
                    }
                }
            ).catch(
                (a) => {
                    console.log(a)
                    cambiarModalAlerta(a.msg);
                }
            )
        }
        // setDatosCliente(vacio)
    }


    useEffect(() => {
        cargarListas();
    }, []);

    const cargarListas = async () => {
        //Extrae Datos de la BD para BARRIO
        let variable = []
        let lBarrio, lCivil;
        let options = await endpointLibre("api/barrio", "GET")
        for (let i of options?.datos) {
            variable.push({ 'label': i.nombre, 'value': i.id })
        }
        console.log(variable)
        lBarrio = variable;
        await setListaBarrio(variable)
        //Extrae Datos de la BD para ESTADO CIVIL
        variable = [];
        options = await endpointLibre("api/estadoCivil", "GET")
        for (let i of options?.datos) {
            variable.push({ 'label': i.descripcion, 'value': i.id })
        }
        console.log(variable)
        lCivil = variable
        await setListaCivil(variable)
        //Extrae Datos de la BD para TIPO DOCUMENTO
        variable = [];
        options = await endpointLibre("api/tipoDocumento", "GET")
        for (let i of options?.datos) {
            variable.push({ 'label': i.descripcion, 'value': i.id })
        }
        console.log(variable)
        await setListaTipoDocumento(variable)
        if (idSelec != "") {
            cargarForm(lBarrio, lCivil)
        }
    }

    const [datosCliente, setDatosCliente] = useState({
        "id": 0,
        "barrio": 0,
        "documento": "",
        "tipo_documento": 0,
        "nombre": "",
        "apellido": "",
        "f_nacimiento": "",
        "correo": "",
        "direccion": "",
        "sexo": "",
        'telefono': [
            { "telefono": "" },
            { "telefono": "" },
            { "telefono": "" },
        ],
        "observaciones": "",
        "estado_civil": 0,
    })

    const cargarForm = async (lBarrio, lCivil) => {
        console.log(idSelec);
        let datosCrudo = (await obtenerUnicoRegistro('api/cliente/u', idSelec)).datos[0]
        console.log(datosCrudo, "datos solicitud")
        let tempBarrio = lBarrio.find((elemento) => { return elemento.value == datosCrudo.barrio });
        let tempECivil = lCivil.find((elemento) => { return elemento.value == datosCrudo.estado_civil });

        console.log(lBarrio)
        console.log(tempBarrio)
        console.log(tempECivil)

        setEstadoCivilSelect(tempECivil)
        setBarrioSelect(tempBarrio)
        setDatosCliente(datosCrudo)

    }


    return (
        <Form onSubmit={handleSubmit} >
            <Row className="g-2">
                <Col md>
                    <Form.Group className='mb-2'>
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control placeholder="Ingrese nombres" id="nombre" defaultValue={datosCliente.nombre} />
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group className='mb-2'>
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control placeholder="Ingrese apellidos" id="apellido" defaultValue={datosCliente.apellido} />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="g-2">
                <Col md>
                    <Form.Group className='mb-2' >
                        <Form.Label className='padding-left'>Tipo Documento</Form.Label>
                        <Form.Select id="tipo_documento" defaultValue={datosCliente.tipo_documento}>
                            {listaTipoDocumento.map(valor => <option value={valor.value}>{valor.label} </option>)}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group className='mb-2'>
                        <Form.Label>Nro. Documento</Form.Label>
                        <Form.Control placeholder="Ingrese numero documento" id="documento" defaultValue={datosCliente.documento} />
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
                            onChange={setBarrioSelect}
                            options={listaBarrio}
                            placeholder="Buscar barrio"
                            isClearable={true}
                            value={barrioSelect}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className='mb-2'>
                        <Form.Label>Correo</Form.Label>
                        <Form.Control type="email" placeholder="correo@correo.com" id="correo" defaultValue={datosCliente.correo} />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="g-2">
                <Form.Group className='mb-2'>
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control placeholder="Ingrese direccion" id="direccion" defaultValue={datosCliente.direccion} />
                </Form.Group>
            </Row>
            <Row className="g-2">
                <Col md>
                    <Form.Group className='mb-2'>
                        <Form.Label>Estado Civil</Form.Label>
                        <Select
                            name="estado_civil"
                            id="estado_civil"
                            defaultValue={listaCivil[0]}
                            onChange={setEstadoCivilSelect}
                            options={listaCivil}
                            isClearable={true}
                            placeholder="Buscar estado civil"
                            value={estadoCivilSelect}
                        //defaultValue={datosCliente.estado_civil}
                        />
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group className='mb-2'>
                        <Form.Label>Sexo</Form.Label>
                        <Form.Select defaultValue={datosCliente.sexo} id="sexo">
                            <option>Femenino</option>
                            <option>Masculino</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group className='mb-2'>
                        <Form.Label>Fecha Nacimiento</Form.Label>
                        <Form.Control type="date" id="f_nacimiento" defaultValue={datosCliente.f_nacimiento} />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="g-2">
                <Col md>
                    <Form.Group className='mb-2'>
                        <Form.Label>Telefono 1 </Form.Label>
                        <Form.Control placeholder="Ingrese telefono 1" id="telefono1" defaultValue={(datosCliente?.telefono[0].telefono ?? "")} />
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group className='mb-2'>
                        <Form.Label>Telefono 2</Form.Label>
                        <Form.Control placeholder="Ingrese telefono 2 " id="telefono2" defaultValue={((datosCliente.telefono.length > 1) ? datosCliente.telefono[1].telefono : "")} />
                    </Form.Group>
                </Col>
                <Col md>
                    <Form.Group className='mb-2'>
                        <Form.Label>Telefono 3</Form.Label>
                        <Form.Control placeholder="Ingrese telefono 3 " id="telefono3" defaultValue={((datosCliente.telefono.length > 2) ? datosCliente.telefono[2].telefono : "")} />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="g-2">
                <Col>
                    <Form.Group className='mb-2'>
                        <Form.Label>Cedula</Form.Label>
                        <Form.Control type="file" id="dir_imagen" name="dir_imagen" defaultValue={datosCliente.dir_imagen} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className='mb-2'>
                        <Form.Label>Vencimiento</Form.Label>
                        <Form.Control type="date" id="fechaVenc" name="fechaVenc" defaultValue={datosCliente.venc} />
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
                        defaultValue={datosCliente.observaciones}
                    />
                </Form.Group>
            </Row>
            <Row>
                <Button type='submit' variant="success" >Guardar</Button>
            </Row>
        </Form>
    )
}

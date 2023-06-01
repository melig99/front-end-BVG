import React, { useState, useEffect } from 'react';
import { Form, Row, Button } from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';
import Select from 'react-select';


export const Formulario = ({ cambiarModalAlerta, idSelec, estadoForm }) => {
    const [listaAgrupador, setListaAgrupador] = useState([{ "label": "Testing1", "value": 1 }, { "label": "Testing2", "value": 2 }])
    const [selectedOption, setSelectedOption] = useState(null);
    const [, guardarNuevoJson, obtenerUnicoRegistro, , endpointLibre, modificarRegistroJson] = Peticiones();

    const vacio = {
        "id": 0,
        "descripcion": "",
        "icono": "",
        "agrupador_id": ""
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = {
            'descripcion': e.target.descripcion.value,
            'icono': e.target.icono.value,
            'agrupador_id': e.target.agrupador.value,
        }
        console.log(form, "Formulario")
        if (idSelec === "") {
            guardarNuevoJson('api/opcionMenu', form).then(
                (a) => {
                    if (a.cod == 0) {
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
            modificarRegistroJson('api/opcionMenu', idSelec, form).then(
                (a) => {
                    console.log(a.cod, " a.cod")
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
                (a) => {
                    console.log(a)
                    cambiarModalAlerta(a.msg);
                }
            )
        }

        setDatosOpcionMenu(vacio)
    }

    const [datosOpcionMenu, setDatosOpcionMenu] = useState({
        "id": 0,
        "descripcion": "",
        "icono": "",
        "agrupador_id": ""
    })

    useEffect(() => {
        cargarListas();
    }, []);

    useEffect(() => {
        if (idSelec != "") {
            cargarForm()
        }
    }, [idSelec])

    const cargarListas = async () => {
        //Extrae Datos de la BD para BARRIO
        let variable = []
        let options = await endpointLibre("api/agrupador", "GET")
        for (let i of options?.datos) {
            variable.push({ 'label': i.descripcion, 'value': i.id })
        }
        console.log(variable)
        setListaAgrupador(variable)
    }

    const cargarForm = async () => {
        console.log(idSelec);
        let datosCrudo = (await obtenerUnicoRegistro('api/opcionMenu/u', idSelec)).datos[0]
        console.log(datosCrudo, "datos solicitud")
        setDatosOpcionMenu(datosCrudo)
    }



    return (
        <Form onSubmit={handleSubmit}>
            <Row className="g-2">
                <Form.Group className='mb-2'>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" id="descripcion" name="descripcion" defaultValue={datosOpcionMenu.descripcion} />
                </Form.Group>
            </Row>

            <Row className="g-2">
                <Form.Group className='mb-2'>
                    <Form.Label>icono</Form.Label>
                    <Form.Control type="text" id="icono" name="icono" defaultValue={datosOpcionMenu.icono} />
                </Form.Group>
            </Row>

            <Row className="g-2">
                <Form.Group className='mb-2'>
                    <Form.Label>Agrupador</Form.Label>
                    <Select
                        name="agrupador"
                        id="agrupador"
                        onChange={setSelectedOption}
                        options={listaAgrupador}
                        placeholder="Buscar Agrupador"
                        isClearable={true}
                        defaultValue={datosOpcionMenu.agrupador_id}
                    />
                </Form.Group>
            </Row>
            <Row>
                <Button type='submit' variant="success" >Guardar</Button>
            </Row>
        </Form>
    )
}

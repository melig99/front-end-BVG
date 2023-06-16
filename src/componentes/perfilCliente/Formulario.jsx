import React , { useState, useEffect }from 'react'
import {Form,Row, Col,Button,ProgressBar, Container,Table,Accordion,OverlayTrigger,Tooltip } from 'react-bootstrap';
import Select from 'react-select';
import Peticiones from '../../helpers/peticiones';
import {BiInfoCircle } from "react-icons/bi";

export const Formulario = ({idSeleccionado}) => {
  const [,,obtenerUnicoRegistro,,]= Peticiones();

  const [datosPerfil,setDatosPerfil] = useState({
     "cliente": {
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
         "observaciones": "",
         "estado_civil": 0,
     },
     "edad": 0,
     "maximo_alcanzable": 0,
     "perfil": {
         "total_puntos": 0,
         "edad": 0,
         "promedio_atraso": 0,
         "maximo_atraso": 0
     },
     "parametros": []
  })


	useEffect(()=>{
        console.log('id',idSeleccionado)
        cargarForm()
    },[idSeleccionado])

	const cargarForm = async ()=>{
        //  console.log(idSeleccionado);
        let datosCrudo =  (await obtenerUnicoRegistro('api/perfilCliente',idSeleccionado)).datos
         console.log(datosCrudo,"datos solicitud")
        setDatosPerfil (datosCrudo)
    }

    const generarTabla = (datosParametro)=>{
        //  console.log(datosParametro)
        let cantDatos = datosParametro.parametros.length;
        return (
            <Table  hover bordered >
                <thead>
                    <tr style={{backgroundColor:"#154360", color: 'white'}}>
                        <th colSpan={cantDatos} style={{textAlign:"center"}}>
                            {datosParametro.parametro}
                        </th>
                    </tr>
                    <tr style={{backgroundColor:"#87a1b2", }}>
                        {datosParametro.parametros.map((reg)=>{
                            return (<td style={{textAlign:"center"}} > {reg.rango_inf +" - "+ reg.rango_sup}</td>)
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {datosParametro.parametros.map((reg)=>{
                        return (<td style={{textAlign:"center"}} >{reg.punto}</td>)
                    })
                    }
                </tbody>

            </Table>

        )
    }


  return(
    <>
		<Container>
			<Container>
            <ProgressBar animated variant="info" now={(datosPerfil.perfil.total_puntos/datosPerfil.maximo_alcanzable)*100} />
            <br/>
            <h4>{datosPerfil.cliente.nombre+" "+datosPerfil.cliente.apellido} </h4>
				<Row xs={1} md={2}>
					<Col>
						<Form>
							<Row className="g-2">
								<Col md>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                        <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="button-tooltip-2">Puntuación asignada a el promedio de atraso de pago de cuotas</Tooltip>}
                                        >
                                            <Form.Label column sm="6"><BiInfoCircle/>Promedio Atrasado: </Form.Label>
                                        </OverlayTrigger>
										<Col sm="6">
										<Form.Control plaintext readOnly value={datosPerfil.perfil.promedio_atraso} />
										</Col>
									</Form.Group>
								</Col>
							</Row>
							<Row className="g-2">
								<Col md>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                        <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="button-tooltip-2">Puntuación asignada a el máximo cantidad de días en el pago de cuotas de algun credito realizado.</Tooltip>}
                                        >
										    <Form.Label column sm="6"><BiInfoCircle/>Maximo Atrasado: </Form.Label>
                                        </OverlayTrigger>
										<Col sm="6">
										<Form.Control plaintext readOnly value={datosPerfil.perfil.maximo_atraso}/>
										</Col>
									</Form.Group>
								</Col>
							</Row>
							<Row className="g-2">
								<Col md>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                        <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="button-tooltip-2">Puntuación correspondiente a la edad con respecto al rango especificado en las reglas.</Tooltip>}
                                        >
										    <Form.Label column sm="6"><BiInfoCircle/>Edad: </Form.Label>
                                        </OverlayTrigger>
                                        <Col sm="6">
										<Form.Control plaintext readOnly value={datosPerfil.perfil.edad} />
										</Col>
									</Form.Group>
								</Col>
							</Row>
						</Form>
					</Col>
					<Col>
						<Form>
							<Row className="g-2">
								<Col md>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
										<Form.Label column sm="6">Cedula de identidad: </Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly value={datosPerfil.cliente.documento}/>
										</Col>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col md>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
										<Form.Label column sm="6">Edad: </Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly value={datosPerfil.edad} />
										</Col>
									</Form.Group>
								</Col>
							</Row>
                            <Row>
								<Col md>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
										<Form.Label column sm="6">Sexo: </Form.Label>
										<Col sm="6">
										    <Form.Control plaintext readOnly value={datosPerfil.cliente.sexo} />
										</Col>
									</Form.Group>
								</Col>
							</Row>
						</Form>
					</Col>
				</Row>
                <Row className="g-2">
                    <Col md>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="6">Total Alcanzado: </Form.Label>
                            <Col sm="6">
                                <b>{datosPerfil.perfil.total_puntos+"/"+datosPerfil.maximo_alcanzable} </b>

                            </Col>
                        </Form.Group>
                    </Col>
                </Row>

			</Container>
            <Container >
				<Row>
					<Col>
						<Row>
							<Form>
                            <Accordion >
                                <Accordion.Item eventKey="0">
                                <Accordion.Header>REGLAS A SER APLICADAS</Accordion.Header>
                                <Accordion.Body>
    								 <Row className="g-2">
    									<Col md>
    										<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
    											<Form.Label column sm="4">Maximo Alcanzable: </Form.Label>
    											<Col sm="8">
    											<Form.Control plaintext readOnly value={datosPerfil.maximo_alcanzable} />
    											</Col>
    										</Form.Group>
    									</Col>
    								</Row>
                                    {
                                        datosPerfil.parametros.map((parametro)=>{
                                            return generarTabla(parametro);
                                        })
                                    }
                                </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

							</Form>
						</Row>
					</Col>
				</Row>
            </Container>
		</Container>

	</>
  )
}

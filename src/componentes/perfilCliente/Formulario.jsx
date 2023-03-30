import React , { useState, useEffect }from 'react'
import {Form,Row, Col,Button,ProgressBar, Container } from 'react-bootstrap';
import Select from 'react-select';
import Peticiones from '../../helpers/peticiones';

export const Formulario = ({idSeleccionado}) => {
  console.log(idSeleccionado)
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
        cargarForm()
    },[idSeleccionado])

	const cargarForm = async ()=>{
        console.log(idSeleccionado);
        let datosCrudo =  (await obtenerUnicoRegistro('api/perfilCliente',idSeleccionado)).datos
        console.log(datosCrudo,"datos solicitud")
        setDatosPerfil (datosCrudo)
    }

  return(
    <>
		<Container>
            <Container >
				<Row>
					<Col>
						<Row>
							<Form>
								<Row>
									<Form.Label ><b>REGALAS A SER APLICADAS</b></Form.Label>
								</Row>
								 <Row className="g-2">
									<Col md>
										<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
											<Form.Label column sm="4">Maxima Alcanzado: </Form.Label>
											<Col sm="8">
											<Form.Control plaintext readOnly value={datosPerfil.maximo_alcanzable} />
											</Col>
										</Form.Group>
									</Col>
								</Row>
                                {
                                    datosPerfil.parametros.map((parametro)=>{
                                        
                                    })
                                }
								{/*<Row className="g-2">
									<Col md>
										<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
											<Form.Label column sm="10">Rango Promedio Atrasos</Form.Label>
											<Col sm="2">

											</Col>
											<Row>
												<Form.Label column sm="4">| 0 a 3 |</Form.Label>
												<Form.Label column sm="4">| 4 a 7 |</Form.Label>
												<Form.Label column sm="4">| 8 a  99 |</Form.Label>
											</Row>
											<Row>
												<Col sm="4">
												<Form.Control plaintext readOnly defaultValue="3" />
												</Col>
												<Col sm="4">
												<Form.Control plaintext readOnly defaultValue="2" />
												</Col>
												<Col sm="4">
												<Form.Control plaintext readOnly defaultValue="1" />
												</Col>
											</Row>
										</Form.Group>
									</Col>
								</Row>
								<Row className="g-2">
									<Col md>
										<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
											<Form.Label column sm="6">Rango Maximo Atraso</Form.Label>
											<Col sm="6">

											</Col>
											<Row>
												<Form.Label column sm="4">| 0 a 8 |</Form.Label>
												<Form.Label column sm="4">| 9 a 20 |</Form.Label>
												<Form.Label column sm="4">| 20 a  99 |</Form.Label>
											</Row>
											<Row>
												<Col sm="4">
												<Form.Control plaintext readOnly defaultValue="3" />
												</Col>
												<Col sm="4">
												<Form.Control plaintext readOnly defaultValue="2" />
												</Col>
												<Col sm="4">
												<Form.Control plaintext readOnly defaultValue="1" />
												</Col>
											</Row>
										</Form.Group>
									</Col>
								</Row>
								<Row className="g-2">
									<Col md>
										<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
											<Form.Label column sm="6">Rango Edad</Form.Label>
											<Col sm="6">

											</Col>
											<Row>
												<Form.Label column sm="4">| 18 a 25 |</Form.Label>
												<Form.Label column sm="4">| 26 a 45 |</Form.Label>
												<Form.Label column sm="4">| 46 a  X |</Form.Label>
											</Row>
											<Row>
												<Col sm="4">
												<Form.Control plaintext readOnly defaultValue="3" />
												</Col>
												<Col sm="4">
												<Form.Control plaintext readOnly defaultValue="2" />
												</Col>
												<Col sm="4">
												<Form.Control plaintext readOnly defaultValue="1" />
												</Col>
											</Row>
										</Form.Group>
									</Col>
								</Row> */}
							</Form>
						</Row>
					</Col>
				</Row>
            </Container>
			<hr/>
			<Container>
				<Row xs={1} md={2}>
					<Col>
						<Form>
							<Row className="g-2">
								<Col md>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
										<Form.Label column sm="6">Total Alcanzado: </Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly value={datosPerfil.perfil.total_puntos} />
										</Col>
									</Form.Group>
								</Col>
							</Row>
							<Row className="g-2">
								<Col md>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
										<Form.Label column sm="6">Promedio Atrasado: </Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly value={datosPerfil.perfil.promedio_atraso} />
										</Col>
									</Form.Group>
								</Col>
							</Row>
							<Row className="g-2">
								<Col md>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
										<Form.Label column sm="6">Maximo Atrasado: </Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly value={datosPerfil.perfil.maximo_atraso}/>
										</Col>
									</Form.Group>
								</Col>
							</Row>
							<Row className="g-2">
								<Col md>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
										<Form.Label column sm="6">Edad: </Form.Label>
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
										<Form.Label column sm="6">Nombres: </Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly value={datosPerfil.cliente.nombre} />
										</Col>
									</Form.Group>
								</Col>
							</Row>
							<Row className="g-2">
								<Col md>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
										<Form.Label column sm="6">Apellidos: </Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly value={datosPerfil.cliente.apellido} />
										</Col>
									</Form.Group>
								</Col>
							</Row>
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
						</Form>
					</Col>
				</Row>

			</Container>
		</Container>
		<ProgressBar animated now={45} />
	</>
  )
}

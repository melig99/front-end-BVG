import React, { useState, useEffect } from 'react';
import { Form, Row, Button, Container, Card, Col } from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';
import { useNavigate } from "react-router-dom";
import localBD from '../../helpers/localBD';
import { CgChevronDoubleLeftO } from "react-icons/cg";


export const FormularioPerfil = () => {

	const { obtenerUsuario } = localBD()
	const [, , obtenerUnicoRegistro, , ,] = Peticiones();
	let temp = obtenerUsuario()
	const barco = useNavigate();
	const [datosPerfil, setDatosPerfil] = useState({
		"nombre_usuario": "",
		"nombre": "",
		"apellido": "",
		"cedula": "",
		"password": "",
		"fecha_nacimiento": "",
		"email": "",
		"perfil_id": 0,
		"restablecer_pass": true,
		"perfil": {
			'descripcion': ''
		}
	})

	useEffect(() => {
		cargarForm()
	}, []);


	const cargarForm = async () => {
		console.log(temp.id);
		let datosCrudo = (await obtenerUnicoRegistro('api/usuario/u', temp.id)).datos[0]
		console.log(datosCrudo, "datos solicitud")
		console.log({ 'label': datosCrudo.perfil.descripcion, 'value': datosCrudo.perfil.id })
		setDatosPerfil(datosCrudo)
	}

	const volver = () => {
		barco('/home')
	}

	return (
		<>
			<Container className='align-items-center justify-content-center'>
				<br />
				<Row>
					<div style={{ display: "flex", justifyContent: "center" }}>
						<div style={{ marginRight: "20px", paddingTop: '8px'}} onClick={e => volver()}>
							<CgChevronDoubleLeftO style={{ fontSize: "24px" , color: "#154360", cursor:'pointer'}}/>
						</div>
						<div className="text-center">
							<h2 style={{ color: "#154360", fontSize: "35px", fontWeight: "bold", marginBottom: "20px" }}>Usuario</h2>
						</div>
					</div>
				</Row>
				<br />
				<Row className="justify-content-center">
					<Col></Col>
					<Col>
						<Card style={{ background: "#eaecee" }}>
							<Card.Body>
								<Form >
									<Row className="g-2">
										<Col md>
											<Form.Group className='mb-2'>
												<Form.Label>Nombre de usuario<b class="fw-bold text-danger">*</b></Form.Label>
												<Form.Control type="text" placeholder="Ingrese un nombre de usuario" id="nombre_usuario" defaultValue={datosPerfil.nombre_usuario} required />
											</Form.Group>
										</Col>
										<Col md>
											<Form.Group className='mb-2'>
												<Form.Label>Perfil<b class="fw-bold text-danger">*</b></Form.Label>
												<Form.Control type="text" placeholder="Ingrese un nombre de usuario" id="nombre_usuario" defaultValue={datosPerfil.perfil.descripcion} required />
											</Form.Group>
										</Col>
									</Row>
									<Row className="g-2">
										<Col md>
											<Form.Group className='mb-2'>
												<Form.Label>Nombres<b class="fw-bold text-danger">*</b></Form.Label>
												<Form.Control type="text" placeholder="Ingrese sus nombres" id="nombre" defaultValue={datosPerfil.nombre} required />
											</Form.Group>
										</Col>
										<Col md>
											<Form.Group className='mb-2'>
												<Form.Label>Apellidos<b class="fw-bold text-danger">*</b></Form.Label>
												<Form.Control type="text" placeholder="Ingrese sus apellidos" id="apellido" defaultValue={datosPerfil.apellido} required />
											</Form.Group>
										</Col>
									</Row>
									<Row className="g-2">
										<Col md>
											<Form.Group className='mb-2'>
												<Form.Label>Cédula<b class="fw-bold text-danger">*</b></Form.Label>
												<Form.Control type="text" placeholder="Ingrese una cedula" id="cedula" defaultValue={datosPerfil.cedula} required />
											</Form.Group>
										</Col>
										<Col md>
											<Form.Group className='mb-2'>
												<Form.Label>Fecha de nacimiento<b class="fw-bold text-danger">*</b></Form.Label>
												<Form.Control type="date" id="fecha_nacimiento" defaultValue={datosPerfil.fecha_nacimiento} required />
											</Form.Group>
										</Col>
									</Row>
									<Row className="g-2">
										<Col >
											<Form.Group className='mb-2'>
												<Form.Label>Correo<b class="fw-bold text-danger">*</b></Form.Label>
												<Form.Control type="email" placeholder="correo@correo.com" id="email" defaultValue={datosPerfil.email} required />
											</Form.Group>
										</Col>
									</Row>
								</Form>
							</Card.Body>
						</Card>
					</Col>
					<Col></Col>
				</Row>
			</Container>
		</>
	)
}

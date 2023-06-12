import React, { useState, useEffect } from 'react';
import { Form, Row, Button, Container, Card, Col } from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';
import { ModalAlerta } from '../Utiles';
import { useNavigate } from "react-router-dom";



export const FormularioContrasenha = () => {
	
	const barco = useNavigate();
	const [, , , , , modificarRegistroJson] = Peticiones();
	const [modalAlerta, setModalAlerta] = useState({ "estado": false, "msg": "" });
	const cambiarModalAlerta = (msg) => {
		setModalAlerta({ "estado": !modalAlerta.estado, "msg": msg })
		console.log(modalAlerta)
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = {
			'password': e.target.password.value,
			'password_confirmation': e.target.password_confirmation.value,
		}
		if (form.password !== form.password_confirmation) {
			cambiarModalAlerta("Las contraseñas no coinciden");
			return
		}
		modificarRegistroJson('api/pass/usuario', '', form).then(
			(a) => {
				console.log(a.cod, " a.cod")
				if (a.cod == 0) {
					console.log(a, "Guardado correctamente")
					cambiarModalAlerta("Guardado Correctamente");
					setTimeout(()=> barco("/home"), 5000); 
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

	return (
		<>
			<Container className='align-items-center justify-content-center'>
				<br />
				<Row>
					<div className="text-center" >
						<h2 style={{ color: "#154360", fontSize: "35px", fontWeight: "bold", marginBottom: "20px" }}>Actualizar Contraseña</h2>
					</div>

				</Row>
				<br />
				<Row className="justify-content-center">
					<Col></Col>
					<Col>
						<Card style={{ background: "#eaecee" }}>
							<Card.Body>
								<Form onSubmit={handleSubmit}>
									<br />
									<Form.Group>
										<Form.Label className="d-flex justify-content-start">Nueva contraseña<b className="fw-bold text-danger">*</b></Form.Label>
										<Form.Control type="password" id="password" placeholder="Ingrese una contraseña" minlength="6" required />
									</Form.Group>
									<br />
									<Form.Group>
										<Form.Label className="d-flex justify-content-start" >Confirmar contraseña<b className="fw-bold text-danger">*</b></Form.Label>
										<Form.Control type="password" id="password_confirmation" placeholder="Confirme su contraseña" minlength="6" required />
									</Form.Group>
									<br />
									<Form.Group className="d-flex justify-content-center">
										<Button type='submit' className="w-100" style={{ backgroundColor: "#154360", borderColor: "#154360" }}>Guardar</Button>
									</Form.Group>
								</Form>
							</Card.Body>
						</Card>
					</Col>
					<Col></Col>
				</Row>
			</Container>
			<ModalAlerta valores={modalAlerta} ></ModalAlerta>
		</>

	)
}

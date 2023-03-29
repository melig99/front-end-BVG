import React , { useState, useEffect }from 'react'
import {Form,Row, Col,Button,ProgressBar, Container } from 'react-bootstrap';
import Select from 'react-select';
import Peticiones from '../../helpers/peticiones';

export const Formulario = () => {
  
 
    
  return(
    <>
		<Container>
            <Container >
				<Row>
					<Col>
						<Row>
							<Form>
								<Row className="g-2">
									<Col md>
										<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
											<Form.Label column sm="3">Nombres y Apellidos: </Form.Label>
											<Col sm="9">
											<Form.Control plaintext readOnly defaultValue="Melinda Sueli Gimenez Aveiro" />
											</Col>
										</Form.Group>
									</Col>
								</Row>
								<Row className="g-2">
									<Col md>
										<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
											<Form.Label column sm="6">Cedula de identidad: </Form.Label>
											<Col sm="6">
											<Form.Control plaintext readOnly defaultValue="5663687" />
											</Col>
										</Form.Group>
									</Col>
									<Col md>
										<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
											<Form.Label column sm="2">Edad: </Form.Label>
											<Col sm="10">
											<Form.Control plaintext readOnly defaultValue="24" />
											</Col>
										</Form.Group>
									</Col>
								</Row>
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
										<Form.Control plaintext readOnly defaultValue="8" />
										</Col>
									</Form.Group>
								</Col>
							</Row>
							<Row className="g-2">
								<Col md>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
										<Form.Label column sm="6">Promedio Atrasado: </Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly defaultValue="3" />
										</Col>
									</Form.Group>
								</Col>
							</Row>
							<Row className="g-2">
								<Col md>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
										<Form.Label column sm="6">Maximo Atrasado: </Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly defaultValue="3" />
										</Col>
									</Form.Group>
								</Col>
							</Row>
							<Row className="g-2">
								<Col md>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
										<Form.Label column sm="6">Edad: </Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly defaultValue="2" />
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
										<Form.Label column sm="6">Maxima Alcanzado: </Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly defaultValue="9" />
										</Col>
									</Form.Group>
								</Col>
							</Row>
							<Row className="g-2">
								<Col md>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
										<Form.Label column sm="10">Rango Promedio Atrasos</Form.Label>
										<Col sm="2">

										</Col>
										<Form.Label column sm="6">| 0 a 3 |</Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly defaultValue="3" />
										</Col>
										<Form.Label column sm="6">| 4 a 7 |</Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly defaultValue="2" />
										</Col>
										<Form.Label column sm="6">| 8 a  99 |</Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly defaultValue="1" />
										</Col>
									</Form.Group>
								</Col>
							</Row>
							<Row className="g-2">
								<Col md>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
										<Form.Label column sm="6">Rango Maximo Atraso</Form.Label>
										<Col sm="6">

										</Col>
										<Form.Label column sm="6">| 0 a 8 |</Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly defaultValue="3" />
										</Col>
										<Form.Label column sm="6">| 9 a 20 |</Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly defaultValue="2" />
										</Col>
										<Form.Label column sm="6">| 20 a  99 |</Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly defaultValue="1" />
										</Col>
									</Form.Group>
								</Col>
							</Row>
							<Row className="g-2">
								<Col md>
									<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
										<Form.Label column sm="6">Rango Edad</Form.Label>
										<Col sm="6">

										</Col>
										<Form.Label column sm="6">| 18 a 25 |</Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly defaultValue="3" />
										</Col>
										<Form.Label column sm="6">| 26 a 45 |</Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly defaultValue="2" />
										</Col>
										<Form.Label column sm="6">| 46 a  X |</Form.Label>
										<Col sm="6">
										<Form.Control plaintext readOnly defaultValue="1" />
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

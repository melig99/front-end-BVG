import {useRef, useState} from 'react'
import { Form, Button, Card, Container } from 'react-bootstrap'
import { Navigate  } from "react-router-dom";

const Login = () => {
    const [usuarioValido, cambiarUsuarioValido] = useState(false);

    return (
        <>
            <Container  className="d-flex align-items-center justify-content-center"  style={{height: "100vh",maxWidth: "100vw",padding: '0', backgroundColor: "#212529",  margin: "0"}}>
                <Card>
                    <Card.Body >
                        {/* <img
                            src="/logo.png"
                            width="120"
                            height="80"
                            className="d-inline-block align-top"
                        /> */}
                        <div className="text-center " style={{ fontFamily: "monospace"}}>
                            <h2 >Inicio Sesion</h2>
                        </div>
                        <Form>
                            <Form.Group >
                                <Form.Label className="d-flex justify-content-start">Usuario</Form.Label>
                                <Form.Control />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="d-flex justify-content-start">Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <br/>
                            <Form.Group className="d-flex" > 
                                <Button onClick={()=>cambiarUsuarioValido(true)} className="w-100" type="button" style={{backgroundColor: "#01569a",borderColor: "#01569a"}}> Iniciar</Button>
                                {usuarioValido && (
                                    <Navigate to="/home" replace={true} />
                                )}
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default Login
import { useState } from 'react'
import { Form, Button, Card, Container } from 'react-bootstrap'
import { Navigate } from "react-router-dom";
import localBD from '../../helpers/localBD';
import Alert from 'react-bootstrap/Alert';

const Login = () => {
    const [usuarioValido, cambiarUsuarioValido] = useState(false);
    const [usuarioInvalido, cambiarUsuarioInvalido] = useState(false);
    const { iniciarSesion } = localBD()

    const loguear = async (e) => {
        e.preventDefault();
        const form = {
            'usuario': e.target.usuario.value,
            'password': e.target.pass.value,
        }
        //condicionando mensajes
        if (1) {
            let temp = await iniciarSesion(form);
            cambiarUsuarioValido(true)

            if (temp.cod == "00") {
                console.log(temp)
                cambiarUsuarioValido(true)
            } else if(temp.cod=="11"){
                console.log(temp)

                cambiarUsuarioInvalido(true)
            }
        } else {
            //error
        }
    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ height: "100vh", maxWidth: "100vw", padding: '0', margin: "0", backgroundImage:"url('/fondo_login.jpg')" }}>
                <Card>
                    <Card.Body >
                        <div
                            style={{backgroundImage:"url('/B-VG_logo.png')",width: "350px",height: "190px",backgroundPositionY: "center",backgroundPositionX: "center"}}
                            className="d-inline-block align-top"
                        />
                        <div className="text-center " style={{ fontFamily: "monospace" }}>
                            <h2 >Inicio Sesión</h2>
                        </div>
                        <Form method="post" onSubmit={loguear}>
                            <Form.Group >
                                <Form.Label className="d-flex justify-content-start">Usuario</Form.Label>
                                <Form.Control type="text" id="usuario" name="usuario" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="d-flex justify-content-start">Contraseña</Form.Label>
                                <Form.Control type="password" id="pass" name="pass" />
                            </Form.Group>
                            <br />
                            <Form.Group className="d-flex" >
                                {usuarioInvalido && (
                                    <Alert variant={'danger'}>
                                        Usuario o contraseña invalida
                                    </Alert>
                                )}
                            </Form.Group>
                            <Form.Group className="d-flex" >
                                <Button type="submit" className="w-100" style={{ backgroundColor: "#01569a", borderColor: "#01569a" }}> Iniciar</Button>
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

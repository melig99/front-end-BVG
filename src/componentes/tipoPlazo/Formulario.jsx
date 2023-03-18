import React,{useState,useEffect} from 'react';
import {Form,Row,Button} from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';


export const Formulario = ({cambiarModalAlerta,idSeleccionado}) => {
    const [obtenerPanel,guardarNuevoJson,,eliminarRegistro,] = Peticiones();

    const handleSubmit = (e)=> {
        e.preventDefault();
        const form = {
            'descripcion':e.target.tipo_plazo.value,
            'factor_divisor':e.target.factor_divisor.value,
            'dias_vencimiento':e.target.dias_vencimiento.value,
            'interes':e.target.interes.value,
        }
        console.log(form)
        guardarNuevoJson('api/tipoPlazo',form).then(
            (a)=>{
                if(a.cod==0){
                    console.log(a,"Guardado correctamente")
                    cambiarModalAlerta("Guardado Correctamente");

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
        e.target.reset();
    }
    return(
        <Form onSubmit={handleSubmit}>
            <Row className="g-2">
                <Form.Group className='mb-2'>
                    <Form.Label>Tipo Plazo</Form.Label>
                    <Form.Control type="text" id="tipo_plazo" />
                </Form.Group>
            </Row>
            <Row className="g-2">
                <Form.Group className='mb-2'>
                    <Form.Label>Factor divisor</Form.Label>
                    <Form.Control type="number" min="0" id="factor_divisor" />
                </Form.Group>
            </Row>
            <Row className="g-2">
                <Form.Group className='mb-2'>
                    <Form.Label>Dias Vencimiento</Form.Label>
                    <Form.Control type="number" min="0" id="dias_vencimiento" />
                </Form.Group>
            </Row>
            <Row className="g-2">
                <Form.Group className='mb-2'>
                    <Form.Label>Intereses</Form.Label>
                    <Form.Control type="number" min="0" id="interes" />
                </Form.Group>
            </Row>
            <Row>
                <Button type='submit' variant="success" >Guardar</Button>
            </Row>
        </Form>
    )
}

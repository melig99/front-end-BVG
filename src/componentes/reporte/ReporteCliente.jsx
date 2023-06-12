import React from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';


export const ReporteCliente = () => {
    const URL_REPORTE = "clientes/pdf"
    const [,,,,,,,base] = Peticiones();
    window.open(`${base}${URL_REPORTE}`)
  return (
      <>
        <Container className='align-items-center justify-content-center'>
        <br />
        <Row>
          <div className="text-center" >
            <h2 style={{ color: "#154360", fontSize: "35px", fontWeight: "bold", marginBottom: "20px" }}>Reporte de clientes</h2>
          </div>
        </Row>
        <br />
        <Row className="justify-content-center">
          <Col></Col>
          <Col>
            <Card style={{ background: "#eaecee" }}>
              <Card.Body>
                <div style={{ backgroundColor: '#f8f8f8', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', textAlign: 'center' }}>
                  <h4 style={{ color: '#333', fontSize: '18px' }}>¡Reporte generado!</h4>
                  <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>Revise su carpeta de descargas</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      </>
  )
}

import React, { useState, useEffect } from 'react';
import { Form, Row, Button, Col, Tabs, Tab } from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';
import Table from 'react-bootstrap/Table';


export const ReporteCliente = () => {
    const URL_REPORTE = "clientes/pdf"
    const [,,,,,,,base] = Peticiones();
    window.open(`${base}${URL_REPORTE}`)
  return (
      <>
        <p>Reporte generado (Revise su carpeta de descargas)</p>
      </>
  )
}

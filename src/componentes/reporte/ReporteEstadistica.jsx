import React, { useState, useEffect } from 'react';
import { Form, Row, Button, Col, Tabs, Tab } from 'react-bootstrap';
import Peticiones from '../../helpers/peticiones';
import Table from 'react-bootstrap/Table';


export const ReporteEstadistica= () => {
    const URL_REPORTE = "estadisticaMov/pdf"
    const [,,,,,,,base] = Peticiones();

  return (
      <>
        <iframe src={`${base}${URL_REPORTE}`}></iframe>
      </>
  )
}

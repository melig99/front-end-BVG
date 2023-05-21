import React from 'react'
import PropTypes from 'prop-types'
import Fila from './Fila'
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import { useState } from 'react';

const Tabla = ({ datos, ver }) => {

    //// <th>Nombre</th><th>Correo</th><th>Rol</th>
    const cabecera = ["Cliente", "Ingresos", "Monto Credito", "Interes", "Accion"];
     console.log(datos)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        visibles()
    }, [datos]);

    const visibles = () => {
        if (datos?.datos.length < 1 || datos?.datos.length === 0) {
            setVisible(true)
        }else{
            setVisible(false)
        }
    }
    
    return (
        <>
            <Table striped hover >
                <thead style={{ backgroundColor: "#154360", color: 'white' }}>
                    <tr >
                        {
                            cabecera.map(
                                (dato) => {
                                    return <th key={`col-${dato}`}>{dato}</th>
                                }
                            )
                        }

                    </tr>
                </thead>
                <tbody>
                    {
                        !visible &&
                        datos.datos.map((fila) => {
                            return <Fila key={"fila-" + fila.id + ""} dato={fila} ver={ver} />
                        })
                    }
                </tbody>
            </Table>
            {
                visible &&
                <div style={{ color: 'gray', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h4>No se encontraron datos</h4>
                </div>
            }
        </>
    )
}

Tabla.propTypes = {
    datos: PropTypes.object,
    eliminar: PropTypes.func
}

export default Tabla

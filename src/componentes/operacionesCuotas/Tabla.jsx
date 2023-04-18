import React from 'react'
import PropTypes from 'prop-types'
import Fila from './Fila'
import Table from 'react-bootstrap/Table';

const  Tabla = ({datos,ver}) => {

    //// <th>Nombre</th><th>Correo</th><th>Rol</th>
    const cabecera=["Caja","Concepto","Monto","Fecha Operacion","Nro Solicitud","Usuario"];
    console.log(datos)
  return (
    <>
        <Table striped hover >
            <thead style={{backgroundColor:"#154360", color: 'white'}}>
                <tr key="cabecera">
                    {
                        cabecera.map(
                            (dato) => {
                             return  <th key={`col-${dato}`}>{dato}</th>
                            }
                        )
                    }

                </tr>
            </thead>
            <tbody>
                {
                    datos.datos.map((fila)=>{
                        return <Fila key={"filaPanel-"+fila.id+""} dato ={fila} ver={ver}/>
                    })
                }
            </tbody>
        </Table>
    </>
  )
}

Tabla.propTypes = {
    datos:PropTypes.object,
    ver:PropTypes.func
}

export default Tabla

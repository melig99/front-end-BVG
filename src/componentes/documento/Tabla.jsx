import React from 'react'
import PropTypes from 'prop-types'
import Fila from './Fila'
import Table from 'react-bootstrap/Table';

const  Tabla = ({datos,eliminar,ver}) => {

    //// <th>Nombre</th><th>Correo</th><th>Rol</th>
    const cabecera=["Nombre Documento", "Fecha Vencimiento", "Acciones"];
    console.log(datos)
  return (
    <>
        <Table striped hover>
            <thead style={{backgroundColor:"#154360", color: 'white'}}>
                <tr >
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
                    !visible &&
                    datos.datos.map((fila)=>{
                        return <Fila key={"fila-"+fila.id+""} dato ={fila} eliminar={eliminar} ver={ver}/>
                    })
                }
            </tbody>
        </Table>
    </>
  )
}

Tabla.propTypes = {
    datos:PropTypes.object,
    eliminar:PropTypes.func
}

export default Tabla

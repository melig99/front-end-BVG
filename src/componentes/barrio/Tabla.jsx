import React from 'react'
import PropTypes from 'prop-types'
import Fila from './Fila'
import Table from 'react-bootstrap/Table';

const  Tabla = ({datos,eliminar}) => {

    //// <th>Nombre</th><th>Correo</th><th>Rol</th>
    const cabecera=["Barrio","Acciones"];
    console.log(datos)
  return (
    <>
        <Table table table-striped table-hover >
            <thead style={{backgroundColor:"#154360", color: 'white'}}>
                <tr >
                    {
                        cabecera.map(
                            (dato) => {
                             return  <th>{dato}</th>
                            }
                        )
                    }

                </tr>
            </thead>
            <tbody>
                {
                    datos.datos.map((fila)=>{
                        return <Fila key={"fila-"+fila.id+""} dato ={fila} eliminar={eliminar}/>
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

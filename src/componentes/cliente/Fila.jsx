import React from 'react'
import PropTypes from 'prop-types'

const  Fila = (prop) => {
    const {dato,eliminar} = prop;
    return (
        <tr>
            <td>{dato.nombre}</td>
            <td>{dato.apellido}</td>
            <td>{dato.nro_doc}</td>
            <td>{dato.telefono}</td>
            <td>{dato.nacionalidad}</td>
            { (prop.eliminar && <td><button onClick={()=>{eliminar(dato.id)}} style={{backgroundColor: "red", border: "solid 1px white"}}><i className="bi bi-trash" style={{color: "white"}}></i></button></td>) }
        </tr>

    )
}
Fila.propTypes = {
    dato:PropTypes.object
}

export default Fila

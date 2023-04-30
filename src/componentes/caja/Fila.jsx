import React from 'react'
import PropTypes from 'prop-types'
import {CgTrash,CgPen} from "react-icons/cg";

const  Fila = (prop) => {
    const {dato,eliminar,ver} = prop;
    return (
        <tr key={`filaC-${dato.id}`}>
            <td>{dato.descripcion}</td>
            <td>{dato.saldo_actual}</td>
            { (prop.eliminar && <td>
                                    <button onClick={()=>{eliminar(dato.id)}} style={{backgroundColor: "red", border: "solid 1px white"}}>
                                        <CgTrash style={{color:'white'}} className='m-2 item'/>
                                    </button>
            { (prop.ver && <button onClick={()=>{ver(dato.id)}} style={{backgroundColor: "#0b5ed7", border: "solid 1px white"}}>
                                <CgPen style={{color:'white'}} className='m-2 item'/>
                            </button>
            ) }
                                </td>
            ) }
        </tr>

    )
}
Fila.propTypes = {
    dato:PropTypes.object
}

export default Fila

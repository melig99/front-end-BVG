import React from 'react'
import PropTypes from 'prop-types'
import { CgTrash, CgPen } from "react-icons/cg";

const Fila = (prop) => {
    const { dato, ver } = prop;
    return (
        <tr>
            <td>{dato.nombre}</td>
            <td>{dato.fecha_vencimiento.split('-')[2]+"/"+dato.fecha_vencimiento.split('-')[1]+"/"+dato.fecha_vencimiento.split('-')[0]}</td>
            {(prop.ver && <td>
                <button onClick={() => { ver(dato.id) }} style={{ backgroundColor: "#0b5ed7", border: "solid 1px white" }}>
                    <CgPen style={{ color: 'white' }} className='m-2 item' />
                </button>
            </td>
            )}
        </tr>

    )
}
Fila.propTypes = {
    dato: PropTypes.object
}

export default Fila

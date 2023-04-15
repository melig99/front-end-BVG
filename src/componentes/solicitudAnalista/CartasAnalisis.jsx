import React from 'react'
import PropTypes from 'prop-types'
import {Card,Table} from 'react-bootstrap';

const CartasAnalisis = ({mes,ingresos,costos,restante,cuotaN}) => {
    return (
        <Card style={{ width: '13rem' }}>
          <Card.Body>
            <Card.Title>Mes {mes}</Card.Title>
            <Card.Text>
                <Table bordered>
                    <tbody>
                        <tr>
                            <th>Ingresos</th>
                            <td style={{textAlign:"right"}}>{ingresos}</td>
                        </tr>
                        <tr>
                            <th>Costos</th>
                            <td style={{textAlign:"right"}}>{costos}</td>
                        </tr>
                        <tr>
                            <th>Restante</th>
                            <td style={{textAlign:"right"}}>{restante}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}></td>
                        </tr>
                        <tr>
                            <th> + Cuota</th>
                            <td style={{textAlign:"right"}}>{cuotaN}</td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Text>
          </Card.Body>
        </Card>
    )
}

export default CartasAnalisis

import { render } from '@testing-library/react';

import {Formulario as FormularioAgrupador} from '../componentes/agrupador/Formulario';
import {Formulario as FormularioBarrio} from '../componentes/barrio/Formulario';
import {Formulario as FormularioCaja} from '../componentes/caja/Formulario';
import {Formulario as FormularioCliente} from '../componentes/cliente/Formulario';
import {Formulario as FormularioConceptoCaja} from '../componentes/conceptosCaja/Formulario';
import {Formulario as FormularioDesembolso} from '../componentes/operacionesCuotas/FormularioDesembolso';
import {Formulario as FormularioMovGenerico} from '../componentes/operacionesCuotas/FormularioMovGenerico';
import {Formulario as FormularioPagoCuota} from '../componentes/operacionesCuotas/FormularioPagoCuota';
import {Formulario as FormularioPerfil} from '../componentes/perfil/Formulario';
import {Formulario as FormularioTipoPlazo} from '../componentes/tipoPlazo/Formulario';
import {Formulario as FormularioUsuario} from '../componentes/usuario/Formulario';
// import {Panel} from '../componentes/barrio/Panel';
// import Fila from '../componentes/barrio/Fila';
//         render(<Formulario cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
describe('Formularios component', () => {
    test('Renderiza el Form de Agrupador crashing', () => {
        // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
        render(<FormularioAgrupador cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
    });
    test('Renderiza el Form de Barrio crashing', () => {
        // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
        render(<FormularioBarrio cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
    });
    test('Renderiza el Form de Caja crashing', () => {
        // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
        render(<FormularioCaja cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
    });
//     test('Renderiza el Form de Cliente crashing', () => {
//         // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
//         render(<FormularioCliente cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
//     });
    test('Renderiza el Form de Conceptos de Caja crashing', () => {
        // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
        render(<FormularioConceptoCaja cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
    });
//     test('Renderiza el Form de Operaciones de Cuotas crashing', () => {
//             // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
//         render(<FormularioDesembolso cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
//     });
//     test('Renderiza el Form de Operaciones de Cuotas crashing', () => {
//         // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
//         render(<FormularioMovGenerico cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
//     });
//     test('Renderiza el Form de Operaciones de Cuotas crashing', () => {
//         // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
//         render(<FormularioPagoCuota cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
//     });
//     test('Renderiza el Form de Perfil crashing', () => {
//         // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
//         render(<FormularioPerfil cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
//     });
//     test('Renderiza el Form de Tipo Plazo crashing', () => {
//         // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
//         render(<FormularioTipoPlazo cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
//     });
//     test('Renderiza el Form de Usuario crashing', () => {
//         // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
//         render(<FormularioUsuario cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
//     });
});

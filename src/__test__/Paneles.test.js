import { render } from '@testing-library/react';

import {Panel as PanelAgrupador} from '../componentes/agrupador/Panel'
import {Panel as PanelBarrio} from '../componentes/barrio/Panel'
import {Panel as PanelCaja} from '../componentes/caja/Panel'
import {Panel as PanelCliente} from '../componentes/cliente/Panel'
import {Panel as PanelConceptoCaja} from '../componentes/conceptosCaja/Panel'
import {Panel as PanelDesembolso} from '../componentes/operacionesCuotas/Panel'
import {Panel as PanelPerfil} from '../componentes/perfil/Panel'
import {Panel as PanelTipoPlazo} from '../componentes/tipoPlazo/Panel'
import {Panel as PanelUsuario} from '../componentes/usuario/Panel'
// import {Panel} from '../componentes/barrio/Panel';
// import Fila from '../componentes/barrio/Fila';
//         render(<Panelulario cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
describe('Formularios component', () => {
    test('Renderiza el Panel de Agrupador crashing', () => {
        // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
        render(<PanelAgrupador cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
    });
    test('Renderiza el Panel de Barrio crashing', () => {
        // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
        render(<PanelBarrio cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
    });
    test('Renderiza el Panel de Caja crashing', () => {
        // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
        render(<PanelCaja cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
    });
    test('Renderiza el Panel de Cliente crashing', () => {
        // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
        render(<PanelCliente cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
    });
    test('Renderiza el Panel de Conceptos de Caja crashing', () => {
        // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
        render(<PanelConceptoCaja cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
    });
    test('Renderiza el Panel de Operaciones de Cuotas crashing', () => {
            // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
        render(<PanelDesembolso cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
    });
    test('Renderiza el Panel de Perfil crashing', () => {
        // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
        render(<PanelPerfil cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
    });
    test('Renderiza el Panel de Tipo Plazo crashing', () => {
        // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
        render(<PanelTipoPlazo cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
    });
    test('Renderiza el Panel de Usuario crashing', () => {
        // render(<Fila dato={{"nombre":"test","observacion":"prueba de observacion"}}/>);
        render(<PanelUsuario cambiarModalAlerta={(a)=>{}} idSelec={""} />); 
    });
});

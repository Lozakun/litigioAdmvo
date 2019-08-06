import { RegistroDemandaAdmon } from './registroDemandaAdmon.model';
import { EventEmitter, Output } from '@angular/core';

export class AdmonFormService {
    @Output() registro: RegistroDemandaAdmon;
    registroAgregado = new EventEmitter<RegistroDemandaAdmon>();

    // registrarDemanda(demanda: RegistroDemandaAdmon) {
    //     this.registro = new RegistroDemandaAdmon(demanda.folioDemanda, demanda.oficio, demanda.expediente,
    //         demanda.fechaNotificacion, demanda.autoridadImpositora, demanda.fechaDemanda, demanda.tipoDemanda,
    //         demanda.participaTercero, demanda.motivoDemanda, demanda.sociedad, demanda.determinante, demanda.participaWalmart,
    //         demanda.importeHistorico);
    // }

    obtenerRegistro() {
        return this.registroAgregado;
    }

    // updateRegistro() {}
}

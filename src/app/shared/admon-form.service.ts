import { EventEmitter, Output, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegistroDemandaAdmon } from './registroDemandaAdmon.model';

@Injectable({providedIn: 'root'})
export class AdmonFormService {
    @Output() registro: RegistroDemandaAdmon;
    registroAgregado = new EventEmitter<RegistroDemandaAdmon>();

    // registrarDemanda(demanda: RegistroDemandaAdmon) {
    //     this.registro = new RegistroDemandaAdmon(demanda.folioDemanda, demanda.oficio, demanda.expediente,
    //         demanda.fechaNotificacion, demanda.autoridadImpositora, demanda.fechaDemanda, demanda.tipoDemanda,
    //         demanda.participaTercero, demanda.motivoDemanda, demanda.sociedad, demanda.determinante, demanda.participaWalmart,
    //         demanda.importeHistorico);
    // }
    constructor(private http: HttpClient) {}
    obtenerRegistro() {
        this.fetchRegistros();
        return this.registroAgregado;
    }

    // guardarRegistro(registro: RegistroDemandaAdmon) {
    //     this.http.post('https://prtllegal.firebaseio.com/litadmvo.json',
    //     registro).subscribe(responseData => {
    //         console.log(responseData);
    //     });
    // }

    guardarRegistro(registro: RegistroDemandaAdmon) {
        this.http.post('https://prtllegal.firebaseio.com/registrolitadmvo.json',
        registro).subscribe(responseData => {
            console.log(responseData);
        });
    }

    actualizarRegistro(registro: RegistroDemandaAdmon) {
        this.http.put('https://prtllegal.firebaseio.com/registrolitadmvo.json',
        registro).subscribe(responseData => {
            console.log(responseData);
        });
    }

    private fetchRegistros() {
        this.http.get<AdmonFormService>('https://prtllegal.firebaseio.com/registrolitadmvo.json')
        .subscribe(registros => {
            console.log(registros);
        });
    }
}

import { Component, OnInit, Input } from '@angular/core';

import { AdmonFormService } from './shared/admon-form.service';
import { RegistroDemandaAdmon } from './shared/registroDemandaAdmon.model';
import { DespachoService } from './shared/despacho.service';
import { Audiencia } from './shared/audiencia.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'litAdmvo';
  @Input() folioDemanda: string;
  registroDemanda: RegistroDemandaAdmon;
  fechaDemanda: Date;
  fechaDay: string;
  fechaMonth: string;
  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
              'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  fechaYear: string;

  constructor(private admonService: AdmonFormService, private despachos: DespachoService) {
    this.admonService.registroAgregado.subscribe(
      (registro: RegistroDemandaAdmon) => {
        this.registroDemanda = registro;
        this.admonService.registro.folioDemanda = this.registroDemanda.folioDemanda;
        this.admonService.registro = registro;
      }
    );
  }

  ngOnInit() {
    this.admonService.registro = new RegistroDemandaAdmon('', '', '', null, {
      rfc: '',
      numAutoridad: '',
      razonSocial: '',
      tipoPersona: ''
    }, null, null, null, '', '', {numDeterminante: null, nombreDeterminante: '',
      formatoDeterminante: ''}, null, null, false, false, false, false, false, null, null,
      false, false, false, false, false, [], null, null, [null], false, null, null, null,
      null, null, null, [], false, null, null, null, null, null, null);
    this.registroDemanda = this.admonService.registro;
    console.log(this.registroDemanda);
    this.folioDemanda = this.registroDemanda.folioDemanda;
    console.log(this.folioDemanda);
    this.fechaDemanda = new Date();
    this.fechaDay = this.fechaDemanda.getDay().toString();
    this.fechaMonth = this.months[this.fechaDemanda.getMonth() + 1];
    this.fechaYear = this.fechaDemanda.getFullYear().toString();
  }

}

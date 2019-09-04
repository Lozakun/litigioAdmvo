import { Component, OnInit } from '@angular/core';
import { RegistroDemandaAdmon } from '../shared/registroDemandaAdmon.model';
import { AdmonFormService } from '../shared/admon-form.service';

@Component({
  selector: 'app-pestanas',
  templateUrl: './pestanas.component.html',
  styleUrls: ['./pestanas.component.css']
})
export class PestanasComponent implements OnInit {

  registroDemanda: RegistroDemandaAdmon;

  constructor(private admonFormService: AdmonFormService) {}

  ngOnInit() {
    this.admonFormService.registroAgregado.subscribe((registro: RegistroDemandaAdmon) => {
      this.registroDemanda = registro;
      this.admonFormService.registro = registro;
    });
  }

  validaInactivo(pestana: string) {
    switch (pestana) {
      case 'registroDemanda':
        return this.admonFormService.registro.registroRealizado;
      case 'registroPae':
        return this.admonFormService.registro.registroPae;
      case 'registroDespacho':
        return this.admonFormService.registro.registroDespacho;
      case 'registroAudiencia':
        return this.admonFormService.registro.registroAudiencia;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AdmonFormService } from '../shared/admon-form.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistroDemandaAdmon } from '../shared/registroDemandaAdmon.model';

@Component({
  selector: 'app-resolucion-form',
  templateUrl: './resolucion-form.component.html',
  styleUrls: ['./resolucion-form.component.css']
})
export class ResolucionFormComponent implements OnInit {

  motivos = ['Convenio', 'Desistimiento', 'Transacción', 'Sentencia', 'Pago', 'Otros'];
  sentidos = ['Favorable', 'Desfavorable'];
  registroDemanda: RegistroDemandaAdmon;

  resolucionForm: FormGroup;

  constructor(private admonFormService: AdmonFormService) {
    this.registroDemanda = this.admonFormService.registro;

    this.admonFormService.registroAgregado.subscribe(registro => {
      this.admonFormService.registro = registro;
      this.registroDemanda = registro;
    });

    this.initializeForm();
   }

  ngOnInit() {
  }

  initializeForm() {
    this.resolucionForm = new FormGroup({
      motivoTermino: new FormControl(this.registroDemanda.motivoTermino, Validators.required),
      instanciaConclusion: new FormControl(this.registroDemanda.autoridadMateria, Validators.required),
      sentidoTermino: new FormControl(this.registroDemanda.sentidoTermino, Validators.required),
      fechaTermino: new FormControl(this.registroDemanda.fechaTermino, Validators.required),
      importeHistorico: new FormControl(this.registroDemanda.importeHistorico, Validators.maxLength(20)),
      importeActualizado: new FormControl(this.registroDemanda.importeActualizado, Validators.maxLength(20))
    });
  }

  guardarResolucion() {
    console.log(this.resolucionForm);
    this.admonFormService.registro.motivoTermino = this.resolucionForm.get('motivoTermino').value;
    this.admonFormService.registro.instanciaConclusion = this.resolucionForm.get('instanciaConclusion').value;
    this.admonFormService.registro.sentidoTermino = this.resolucionForm.get('sentidoTermino').value;
    this.admonFormService.registro.fechaTermino = this.resolucionForm.get('fechaTermino').value;
    this.admonFormService.registro.importeActualizado = this.resolucionForm.get('importeActualizado').value;
    this.admonFormService.registro.estadoDemanda = 'Terminada';
    this.admonFormService.actualizarRegistro(this.registroDemanda);
    console.log(this.registroDemanda);
  }

}

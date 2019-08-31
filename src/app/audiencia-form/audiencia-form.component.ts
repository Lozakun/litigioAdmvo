import { Component, OnInit } from '@angular/core';
import { AdmonFormService } from '../shared/admon-form.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { RegistroDemandaAdmon } from '../shared/registroDemandaAdmon.model';

@Component({
  selector: 'app-audiencia-form',
  templateUrl: './audiencia-form.component.html',
  styleUrls: ['./audiencia-form.component.css']
})
export class AudienciaFormComponent implements OnInit {
  sociedad: string;
  determinante: string;
  expJuicio: string;
  despacho: string;
  reclamo: string;
  fechaDemanda: string;
  oficioResolucion: string;
  autoridad: string;
  tribunalJuzgado: string;
  importeHistorico: string;
  pago: string;
  fianza: string;
  embargo: string;
  resoluciones = ['Concedida'];
  horas = ['0', '1', '2', '3', '4', '5', '6', '7', '8',
  '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19' , '20', '21', '22', '23' ];
  minutos = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  estados = ['Programada', 'Cancelada', 'Reprogramada', 'Desahogada'];
  factibilidades = ['Remoto', 'Posible', 'Probable'];
  EtapasProcesales = ['Revisión', 'Apelación', 'Recurso', 'Amparo'];

  audienciaForm: FormGroup;
  registroDemanda: RegistroDemandaAdmon;

  constructor(private admonFormService: AdmonFormService) { }

  ngOnInit() {

    this.registroDemanda = this.admonFormService.registro;
    console.log(this.registroDemanda);
    this.initForm();

    this.admonFormService.registroAgregado
    .subscribe(registro => {
      this.registroDemanda = registro;
    });
    console.log(this.registroDemanda);
  }

  initForm() {
    this.audienciaForm = new FormGroup({
      fechaSuspension: new FormControl(this.registroDemanda.fechaSuspension),
      resolucionSuspension: new FormControl(this.registroDemanda.resolucionSuspension),
      sentenciaTFJFA: new FormControl({value: this.registroDemanda.sentenciaTFJFA, disabled: false}),
      sentenciaDefinitiva: new FormControl({
        value: this.registroDemanda.sentenciaDefinitiva, disabled: true}),
      resultadoFinal: new FormControl({value: this.registroDemanda.resultadoFinal, disabled: true}),
      estadoFinal: new FormControl({value: this.registroDemanda.estadoFinal, disabled: true})
    });
    this.validaSentencia(this.audienciaForm.get('sentenciaTFJFA') as FormControl);
    this.validaSentencia(this.audienciaForm.get('sentenciaDefinitiva') as FormControl);
    this.validaSentencia(this.audienciaForm.get('resultadoFinal') as FormControl);
    this.validaSentencia(this.audienciaForm.get('estadoFinal') as FormControl);
    // if()
    // this.audienciaForm.controls.sentenciaTFJFA.disable;
  }

  guardarAudiencia() {
    this.admonFormService.registro.fechaSuspension = this.audienciaForm.get('fechaSuspension').value;
    this.admonFormService.registro.resolucionSuspension = this.audienciaForm.get('resolucionSuspension').value;
    this.admonFormService.registro.sentenciaTFJFA = this.audienciaForm.get('sentenciaTFJFA').value;
    this.admonFormService.registro.sentenciaDefinitiva = this.audienciaForm.get('sentenciaDefinitiva').value;
    this.admonFormService.registro.resultadoFinal = this.audienciaForm.get('resultadoFinal').value;
    this.admonFormService.registro.estadoFinal = this.audienciaForm.get('estadoFinal').value;
    this.admonFormService.registroAgregado.subscribe(registro => {
      this.registroDemanda = registro;
    });
    this.validaSentencia(this.audienciaForm.get('sentenciaTFJFA') as FormControl);
    this.validaSentencia(this.audienciaForm.get('sentenciaDefinitiva') as FormControl);
    this.validaSentencia(this.audienciaForm.get('resultadoFinal') as FormControl);
    this.validaSentencia(this.audienciaForm.get('estadoFinal') as FormControl);
    console.log(this.registroDemanda);
    console.log(this.registroDemanda.sentenciaTFJFA != null);
    console.log(this.audienciaForm);
  }

  validaSentencia(control: FormControl) {
    // if (this.registroDemanda.sentenciaTFJFA != null) {
    //   this.audienciaForm.controls.sentenciaTFJFA.disable();
    // }
    console.log(control);
    // switch (registroDemanda != null) {
    //   case 
    // }
    if (control.value != null) {
      control.disable();
    } else {
      return false;
    }
  }


}

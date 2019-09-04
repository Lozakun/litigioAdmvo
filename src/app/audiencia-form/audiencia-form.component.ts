import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AdmonFormService } from '../shared/admon-form.service';
import { RegistroDemandaAdmon } from '../shared/registroDemandaAdmon.model';
import { Audiencia } from '../shared/audiencia.model';
import { AudienciaService } from '../shared/audiencia.service';
import { Router } from '@angular/router';

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
  estadoSentencia = 0;
  resoluciones = ['Concedida'];
  horas = ['00', '01', '02', '03', '04', '05', '06', '07', '08',
  '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19' , '20', '21', '22', '23' ];
  minutos = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  estados = ['Programada', 'Cancelada', 'Reprogramada', 'Desahogada'];
  factibilidades = ['Remoto', 'Posible', 'Probable'];
  EtapasProcesales = ['Revisión', 'Apelación', 'Recurso', 'Amparo'];

  audienciaForm: FormGroup;
  registroAudiencia: FormGroup;
  registroDemanda: RegistroDemandaAdmon;

  constructor(private admonFormService: AdmonFormService,
              private audienciaService: AudienciaService,
              private router: Router) { }

  ngOnInit() {

    this.registroDemanda = this.admonFormService.registro;
    console.log(this.registroDemanda);
    this.initForm();
    this.initFormSecondary();

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
    // this.validaSentencia(this.audienciaForm.get('sentenciaTFJFA') as FormControl);
    const TFJFA = this.audienciaForm.get('sentenciaTFJFA') as FormControl;
    if (TFJFA.value !== null) {
      TFJFA.disable();
    }
    const sentDefinitiva = this.audienciaForm.get('sentenciaDefinitiva') as FormControl;
    console.log(this.audienciaForm.get('sentenciaTFJFA').disabled);
    console.log(sentDefinitiva.value === null);
    if (this.audienciaForm.get('sentenciaTFJFA').disabled && sentDefinitiva.value === null) {
      sentDefinitiva.enable();
    }
    // this.validaSentencia(this.audienciaForm.get('sentenciaDefinitiva') as FormControl);
    // this.validaSentencia(this.audienciaForm.get('resultadoFinal') as FormControl);
    // this.validaSentencia(this.audienciaForm.get('estadoFinal') as FormControl);
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
    this.admonFormService.registro.registroAudiencia = true;
    this.admonFormService.registroAgregado.subscribe(registro => {
      this.registroDemanda = registro;
    });
    this.validaSentencia(this.audienciaForm.get('sentenciaTFJFA') as FormControl, 0);
    this.validaSentencia(this.audienciaForm.get('sentenciaDefinitiva') as FormControl, 1);
    this.validaSentencia(this.audienciaForm.get('resultadoFinal') as FormControl, 2);
    this.validaSentencia(this.audienciaForm.get('estadoFinal') as FormControl, 3);
    this.router.navigate(['litigioAdmvo', 'resolucion']);
    console.log(this.registroDemanda);
    console.log(this.registroDemanda.sentenciaTFJFA != null);
    console.log(this.audienciaForm);
  }

  validaSentencia(control: FormControl, estado: number) {
    if (control.value === null && estado === this.estadoSentencia) {
      control.enable();
    } else if (control.value !== null && estado === this.estadoSentencia) {
      control.disable();
      this.estadoSentencia++;
    } else {
      control.disable();
    }
  }

  addAudiencia() {
    console.log(this.registroAudiencia);
    const audiencia = new Audiencia(this.registroAudiencia.get('fechaAudiencia').value,
    this.registroAudiencia.get('horaAudiencia').value,
    this.registroAudiencia.get('minutoAudiencia').value,
    this.registroAudiencia.get('estadoAudiencia').value,
    this.registroAudiencia.get('factibilidadAudiencia').value,
    this.registroAudiencia.get('etapaAudiencia').value,
    this.registroAudiencia.get('tribunalJuzgado').value,
    this.registroAudiencia.get('numExpediente').value,
    this.registroAudiencia.get('observaciones').value);

    this.audienciaService.addAudiencia(audiencia);
    this.registroDemanda.audiencias = this.audienciaService.fetchAudiencias();
    this.registroAudiencia.reset();
    // this.initFormSecondary();
  }

  initFormSecondary() {
    console.log(this.estadoSentencia);
    console.log(this.EtapasProcesales[this.estadoSentencia]);
    this.registroAudiencia = new FormGroup({
      fechaAudiencia: new FormControl(null, Validators.required),
      horaAudiencia: new FormControl(null, Validators.required),
      minutoAudiencia: new FormControl(null, Validators.required),
      estadoAudiencia: new FormControl(this.EtapasProcesales[this.estadoSentencia], Validators.required),
      factibilidadAudiencia: new FormControl(null, Validators.required),
      etapaAudiencia: new FormControl(null, Validators.required),
      tribunalJuzgado: new FormControl(this.registroDemanda.autoridadMateria, Validators.required),
      numExpediente: new FormControl(this.registroDemanda.expediente, Validators.required),
      observaciones: new FormControl(null, Validators.required)
    });
  }

  onCancelar() {
    this.registroAudiencia.reset();
    this.initFormSecondary();
    // this.registroAudiencia.setValue({
    //   fechaAudiencia: new FormControl(null, Validators.required),
    //   horaAudiencia: new FormControl(null, Validators.required),
    //   minutoAudiencia: new FormControl(null, Validators.required),
    //   estadoAudiencia: new FormControl(this.EtapasProcesales[this.estadoSentencia], Validators.required),
    //   factibilidadAudiencia: new FormControl(null, Validators.required),
    //   etapaAudiencia: new FormControl(null, Validators.required),
    //   tribunalJuzgado: new FormControl(this.registroDemanda.autoridadMateria, Validators.required),
    //   numExpediente: new FormControl(this.registroDemanda.expediente, Validators.required),
    //   observaciones: new FormControl(null, Validators.required)
    // });
  }

}

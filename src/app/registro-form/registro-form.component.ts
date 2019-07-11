import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { AdmonFormService } from '../shared/admon-form.service';
import { Router } from '@angular/router';

import { Proveedor } from '../shared/proveedor.model';
import { Determinante } from '../shared/determinante.model';
import { RegistroDemandaAdmon } from '../shared/registroDemandaAdmon.model';

@Component({
  selector: 'app-registro-form',
  templateUrl: './registro-form.component.html',
  styleUrls: ['./registro-form.component.css']
})
export class RegistroFormComponent implements OnInit {
  @ViewChild('registroForm', {static: false}) regForm: NgForm;
  @ViewChild('oficio', {static: false}) oficio: NgModel;
  @ViewChild('expediente', {static: false}) expediente: NgModel;
  @ViewChild('fechaNotificacion', {static: false}) fechaNotificacion: NgModel;
  @ViewChild('fechaDemanda', {static: false}) fechaDemanda: NgModel;
  @ViewChild('tipoDemanda', {static: false}) tipoDemanda: NgModel;
  @ViewChild('participaTercero', {static: false}) participaTercero: NgModel;
  @ViewChild('motivoDemanda', {static: false}) motivoDemanda: NgModel;
  @ViewChild('sociedad', {static: false}) sociedad: NgModel;
  @ViewChild('participaWalmart', {static: false}) participaWalmart: NgModel;
  @ViewChild('importeHistorico', {static: false}) importeHistorico: NgModel;
  tiposDemanda = ['Requerimiento', 'Demanda', 'Resolución'];
  tiposParticipacion = ['Actor', 'Demandado', 'Tercero'];
  sociedades = ['Sociedad 1', 'Sociedad 2', 'Sociedad 3'];
  autoridad: Proveedor = {rfc: '', razonSocial: '', numAutoridad: '', tipoPersona: ''};
  determinante: Determinante = {numDeterminante: '', nombreDeterminante: '', formatoDeterminante: ''};
  registroDemanda: RegistroDemandaAdmon;
  folioDemanda: string;

  constructor(private admonFormService: AdmonFormService, private routes: Router) { }

  ngOnInit() {
  }

  onRegistrar() {
    console.log('Intento de Registro!');
    this.folioDemanda = 'LA - ' + Math.floor(Math.random() * (999999 - 1) + 1);
    this.registroDemanda = new RegistroDemandaAdmon(this.folioDemanda, this.oficio.value, this.expediente.value,
      this.fechaNotificacion.value, this.autoridad, this.fechaDemanda.value, this.tipoDemanda.value,
      this.participaTercero.value, this.motivoDemanda.value, this.sociedad.value, this.determinante,
      this.participaWalmart.value, this.importeHistorico.value);
    console.log(this.registroDemanda);
    // this.routes.navigate(['pae']); arreglar el cambio de ruta
    // integrar el servicio
  }

  seleccionAutoridad() {
    console.log('seleccionando autoridad..');
    this.autoridad.rfc = 'PATO500101PAT';
    this.autoridad.numAutoridad = '12345';
    this.autoridad.razonSocial = 'Patito, S.A. de C.V.';
    this.autoridad.tipoPersona = 'Moral';
  }

  seleccionDeterminante() {
    console.log('seleccionando autoridad..');
    this.determinante = {
      numDeterminante: '09876',
      nombreDeterminante: 'Sams Universidad',
      formatoDeterminante: 'SAMS'
    };
  }
}

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
  @ViewChild('autoridadImpositora', {static: false}) autoridadImpositora: Proveedor;
  tiposDemanda = ['Requerimiento', 'Demanda', 'Resolución'];
  tiposParticipacion = ['Actor', 'Demandado', 'Tercero'];
  sociedades = ['Sociedad 1', 'Sociedad 2', 'Sociedad 3'];
  autoridad: Proveedor = {rfc: '', razonSocial: '', numAutoridad: '', tipoPersona: ''};
  determinante: Determinante = {numDeterminante: '', nombreDeterminante: '', formatoDeterminante: ''};
  registroDemanda: RegistroDemandaAdmon;
  folioDemanda: string;
  autoridadImpositoraSeleccionada = false;

  constructor(private admonFormService: AdmonFormService, private router: Router) { }

  ngOnInit() {
  }

  onRegistrar() {
    console.log('Intento de Registro!');
    if (this.autoridadImpositoraSeleccionada) {
      this.folioDemanda = 'LA - ' + Math.floor(Math.random() * (999999 - 1) + 1);
      this.registroDemanda = new RegistroDemandaAdmon(this.folioDemanda, this.oficio.value, this.expediente.value,
      this.fechaNotificacion.value, this.autoridadImpositora, this.fechaDemanda.value, this.tipoDemanda.value,
      this.participaTercero.value, this.motivoDemanda.value, this.sociedad.value, this.determinante,
      this.participaWalmart.value, this.importeHistorico.value);
      console.log(this.registroDemanda);
      this.router.navigate(['litigioAdmvo', 'pae']);
    } else {
      console.log('Debes terminar de llenar los campos!');
    }
    // integrar el servicio
  }

  seleccionAutoridad() {
    console.log('seleccionando autoridad..');
    this.autoridadImpositoraSeleccionada = true;
    this.autoridadImpositora = {
      rfc: 'PATO500101PAT',
      numAutoridad: '12345',
      razonSocial: 'Patito, S.A. de C.V.',
      tipoPersona: 'Moral'};
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

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

import { Proveedor } from '../shared/proveedor.model';
import { Determinante } from '../shared/determinante.model';
import { RegistroDemandaAdmon } from '../shared/registroDemandaAdmon.model';
import { AdmonFormService } from '../shared/admon-form.service';

@Component({
  selector: 'app-registro-form',
  templateUrl: './registro-form.component.html',
  styleUrls: ['./registro-form.component.css']
})
export class RegistroFormComponent implements OnInit {
  @ViewChild('registroForm', {static: false}) regForm: NgForm;
  @ViewChild('oficio', {static: false}) oficioM: NgModel;
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
  @Input() registroDemanda: RegistroDemandaAdmon;
  folioDemanda: string;
  autoridadImpositoraSeleccionada = false;
  oficio: string;

  constructor(private admonFormService: AdmonFormService, private router: Router) {
    this.admonFormService.registroAgregado.subscribe(
      (registro: RegistroDemandaAdmon) => {
        this.registroDemanda = registro;
      }
    );
  }

  ngOnInit() {
      this.registroDemanda = this.admonFormService.registro;
  }

  onRegistrar() {
    this.folioDemanda = 'LA - ' + Math.floor(Math.random() * (999999 - 1) + 1);
    console.log('Intento de Registro! ' + this.folioDemanda);
    if (this.autoridadImpositoraSeleccionada || this.registroDemanda.registroRealizado) {
      this.registroDemanda.folioDemanda = this.folioDemanda;
      this.registroDemanda.oficio = this.oficioM.value;
      this.registroDemanda.expediente = this.expediente.value;
      this.registroDemanda.fechaNotificacion = this.fechaNotificacion.value;
      this.registroDemanda.autoridadImpositora = this.registroDemanda.autoridadImpositora;
      this.registroDemanda.fechaDemanda = this.fechaDemanda.value;
      this.registroDemanda.tipoDemanda = this.tipoDemanda.value;
      this.registroDemanda.participaTercero = this.participaTercero.value;
      this.registroDemanda.motivoDemanda = this.motivoDemanda.value;
      this.registroDemanda.sociedad = this.sociedad.value;
      this.registroDemanda.determinante = this.registroDemanda.determinante;
      this.registroDemanda.participaWalmart = this.participaWalmart.value;
      this.registroDemanda.importeHistorico = this.importeHistorico.value;
      this.registroDemanda.registroRealizado = true;

      this.admonFormService.registroAgregado.emit(this.registroDemanda);
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
    this.registroDemanda.autoridadImpositora = {
      rfc: 'PATO500101PAT',
      numAutoridad: '12345',
      razonSocial: 'Patito, S.A. de C.V.',
      tipoPersona: 'Moral'};
    this.registroDemanda.autoridadImpositora.rfc = 'PATO500101PAT';
    this.registroDemanda.autoridadImpositora.numAutoridad = '12345';
    this.registroDemanda.autoridadImpositora.razonSocial = 'Patito, S.A. de C.V.';
    this.registroDemanda.autoridadImpositora.tipoPersona = 'Moral';
  }

  seleccionDeterminante() {
    console.log('seleccionando autoridad..');
    this.registroDemanda.determinante = {
      numDeterminante: '09876',
      nombreDeterminante: 'Sams Universidad',
      formatoDeterminante: 'SAMS'
    };
  }
}

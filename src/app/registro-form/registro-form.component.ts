import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Proveedor } from '../shared/proveedor.model';
import { Determinante } from '../shared/determinante.model';
import { RegistroDemandaAdmon } from '../shared/registroDemandaAdmon.model';
import { AdmonFormService } from '../shared/admon-form.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-registro-form',
  templateUrl: './registro-form.component.html',
  styleUrls: ['./registro-form.component.css']
})
export class RegistroFormComponent implements OnInit {

  tiposDemanda = ['Requerimiento', 'Demanda', 'Resolución'];
  tiposParticipacion = ['Actor', 'Demandado', 'Tercero'];
  sociedades = ['Sociedad 1', 'Sociedad 2', 'Sociedad 3'];
  autoridad: Proveedor = {rfc: '', razonSocial: '', numAutoridad: '', tipoPersona: ''};
  determinante: Determinante = {numDeterminante: '', nombreDeterminante: '', formatoDeterminante: ''};
  @Input() registroDemanda: RegistroDemandaAdmon;
  folioDemanda: string;
  autoridadImpositoraSeleccionada = false;
  oficio: string;
  today = new Date();
  todayDate = new Date();

  registroForm: FormGroup;

  constructor(private admonFormService: AdmonFormService, private router: Router,
              private auth: AuthService) {
    this.admonFormService.registroAgregado.subscribe(
      (registro: RegistroDemandaAdmon) => {
        this.registroDemanda = registro;
      }
    );
  }

  ngOnInit() {
      this.registroDemanda = this.admonFormService.registro;
      this.initializaForm();
      console.log(this.registroForm);
      this.auth.login();
      this.admonFormService.obtenerRegistro();
  }

  initializaForm() {
    console.log(Date.now());
    this.registroForm = new FormGroup({
      oficio: new FormControl(this.registroDemanda.oficio, Validators.required),
      expediente: new FormControl(this.registroDemanda.expediente, Validators.required),
      // tslint:disable-next-line:max-line-length
      fechaNotificacion: new FormControl(!this.registroDemanda.fechaNotificacion ? this.toJSONLocal(this.todayDate) : this.registroDemanda.fechaNotificacion,
      [Validators.required, this.validaFecha.bind(this)]),
      fechaDemanda: new FormControl(this.registroDemanda.fechaDemanda, [Validators.required,
        this.validaFecha.bind(this)]),
      tipoDemanda: new FormControl(this.registroDemanda.tipoDemanda, Validators.required),
      participaTercero: new FormControl(this.registroDemanda.participaTercero, Validators.required),
      motivoDemanda: new FormControl(this.registroDemanda.motivoDemanda, Validators.required),
      sociedad: new FormControl(this.registroDemanda.sociedad, Validators.required),
      formato: new FormControl({value: this.registroDemanda.determinante.formatoDeterminante, disabled: true}, Validators.required),
      participaWalmart: new FormControl(this.registroDemanda.participaWalmart, Validators.required),
      importeHistorico: new FormControl(this.registroDemanda.importeHistorico, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      autoridadImpositora: new FormControl(this.registroDemanda.autoridadImpositora, Validators.required),
    });
  }

  onRegistrar() {
    this.folioDemanda = 'LA - ' + Math.floor(Math.random() * (999999 - 1) + 1);
    console.log('Intento de Registro! ' + this.folioDemanda);

    if (this.autoridadImpositoraSeleccionada || this.registroDemanda.registroRealizado) {
      this.registroDemanda.folioDemanda = this.folioDemanda;
      this.registroDemanda.oficio = this.registroForm.get('oficio').value;
      this.registroDemanda.expediente = this.registroForm.get('expediente').value;
      this.registroDemanda.fechaNotificacion = this.registroForm.get('fechaNotificacion').value;
      this.registroDemanda.fechaDemanda = this.registroForm.get('fechaDemanda').value;
      this.registroDemanda.tipoDemanda = this.registroForm.get('tipoDemanda').value;
      this.registroDemanda.participaTercero = this.registroForm.get('participaTercero').value;
      this.registroDemanda.motivoDemanda = this.registroForm.get('motivoDemanda').value;
      this.registroDemanda.sociedad = this.registroForm.get('sociedad').value;
      this.registroDemanda.participaWalmart = this.registroForm.get('participaWalmart').value;
      this.registroDemanda.importeHistorico = this.registroForm.get('importeHistorico').value;
      this.registroDemanda.registroRealizado = true;
      this.registroDemanda.estadoDemanda = 'En Registro';

      this.admonFormService.registroAgregado.emit(this.registroDemanda);
      console.log(this.registroDemanda);
      this.admonFormService.guardarRegistro(this.registroDemanda);
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

  toJSONLocal(date) {
    const local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
}

  validaFecha(control: FormControl): {[s: string]: boolean} {
    console.log(control);
    if (control.value > this.toJSONLocal(this.todayDate)) {
      console.log(control);
      return {fechaMayor: true};
    }
  }
}

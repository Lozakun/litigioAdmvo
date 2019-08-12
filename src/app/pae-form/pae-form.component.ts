import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AdmonFormService } from '../shared/admon-form.service';
import { RegistroDemandaAdmon } from '../shared/registroDemandaAdmon.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pae-form',
  templateUrl: './pae-form.component.html',
  styleUrls: ['./pae-form.component.css']
})
export class PaeFormComponent implements OnInit {
  @ViewChild('paeForm', {static: false}) paeForm: NgForm;
  @ViewChild('paeCheck', {static: false}) paeChecked: NgModel;
  @ViewChild('clausura', {static: false}) clausura: NgModel;
  registroDemanda: RegistroDemandaAdmon;
  tiposEmbargo = ['Administrativo', 'Con Extracción', 'Bloqueo y/o Aseguramiento de Cta Bancaria'];
  changesSaved = false;

  constructor(private admonFormService: AdmonFormService, private router: Router) { }

  ngOnInit() {
    this.registroDemanda = this.admonFormService.registro;
    this.admonFormService.registroAgregado.subscribe((registro: RegistroDemandaAdmon) => {
      this.registroDemanda = registro;
      this.admonFormService.registro = registro;
    });
    console.log(this.registroDemanda);
    console.log(this.registroDemanda.paeChecked);
  }

  avanzaPAE(paeFormData) {
    console.log('Avanza PAE' + paeFormData.paeCheck);
    this.changesSaved = true;
    this.router.navigate(['/LilitigioAdmvo', 'despacho']);
  }

}

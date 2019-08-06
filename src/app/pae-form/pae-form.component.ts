import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdmonFormService } from '../shared/admon-form.service';
import { RegistroDemandaAdmon } from '../shared/registroDemandaAdmon.model';

@Component({
  selector: 'app-pae-form',
  templateUrl: './pae-form.component.html',
  styleUrls: ['./pae-form.component.css']
})
export class PaeFormComponent implements OnInit {
  @ViewChild('paeForm', {static: false}) paeForm: NgForm;
  registroDemanda: RegistroDemandaAdmon;
  tiposEmbargo = ['Administrativo', 'Con Extracción', 'Bloqueo y/o Aseguramiento de Cta Bancaria'];

  constructor(private admonFormService: AdmonFormService) { }

  ngOnInit() {
    this.registroDemanda = this.admonFormService.registro;
  }

  avanzaPAE() {
    console.log('Avanza PAE');
  }

}

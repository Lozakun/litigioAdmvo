import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { AdmonFormService } from '../shared/admon-form.service';
import { FormGroup, FormControl, FormArray, Form, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RegistroDemandaAdmon } from '../shared/registroDemandaAdmon.model';
import { Despacho } from '../shared/despachos.model';
import { Abogado } from '../shared/abogados.model';
import { DespachoService } from '../shared/despacho.service';

@Component({
  selector: 'app-despacho-form',
  templateUrl: './despacho-form.component.html',
  styleUrls: ['./despacho-form.component.css']
})
export class DespachoFormComponent implements OnInit {
  // @ViewChild('despachoForm', {static: false}) despachoForm: NgForm;
  // @ViewChild('autoridadMateria', {static: false}) autoridadMateria: NgModel;
  // @ViewChild('despacho', {static: false}) despacho: NgModel;
  // @ViewChild('abogado', {static: false}) abogado: NgModel;
  despachoForm: FormGroup;
  abogadosArray = new FormArray([]);

  autoridadesMaterias = ['Secretaria del Trabajo'];
  autoridadMat: FormControl;
  registroDemanda: RegistroDemandaAdmon;
  despachos = [];
  abogados: Abogado[];
  despachoSeleccionado = new EventEmitter<Despacho>();
  // abogados = [];

  constructor(private admonFormService: AdmonFormService, private despachoService: DespachoService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.despachos = this.despachoService.fetchDespachos();
    this.registroDemanda = this.admonFormService.registro;
    console.log(this.registroDemanda);
    if (this.registroDemanda.registroDespacho === true) {
      this.abogados = this.registroDemanda.abogados;
      for (const abogadoControl of this.abogados) {
        this.abogadosArray.push(
          new FormGroup({
            selectorAbogado: new FormControl(abogadoControl.selec)
          })
        );
      }
    }
    this.initForm();
    this.admonFormService.registroAgregado.subscribe(
      (registro: RegistroDemandaAdmon) => {
        this.registroDemanda = registro;
        this.admonFormService.registro = registro;
        console.log('se actualiza registro');
      });
  }

  initForm() {
    this.despachoForm = new FormGroup({
      autoridadMat: new FormControl(this.registroDemanda.autoridadMateria, Validators.required),
      despachoControl: new FormControl(this.registroDemanda.despacho, Validators.required),
      abogados: this.abogadosArray
    });
  }
  guardarDespacho() {
    // let count = 0;
    for (let i = 0; i < this.abogados.length; i++ ) {
      console.log(this.despachoForm.get('abogados').value[i]);
      this.abogados[i].selec = this.despachoForm.get('abogados').value[i].selectorAbogado;
    }
    // Agregar una validación para que grabe solo cuando por lo menos haya un abogado seleccionado.
    // for (let i = 0; i < this.abogados.length; i++) {
    //   if (this.abogados[i].selec) ? count++;
    // }

    // if (count > 0) {
    this.registroDemanda.autoridadMateria = this.despachoForm.get('autoridadMat').value;
    this.registroDemanda.despacho = this.despachoForm.get('despachoControl').value;
    this.registroDemanda.abogados = this.abogados;
    this.registroDemanda.registroDespacho = true;
    console.log(this.registroDemanda);
    this.router.navigate(['../', 'audiencia'], {relativeTo: this.route});
    // } else {

    // }
  }

  asignaDespacho() {
    this.registroDemanda.despacho = this.despachoForm.get('despachoControl').value;

    this.abogados = this.despachos[this.despachos.findIndex((desp) => desp.nombreDespacho === this.registroDemanda.despacho)].abogados;
    this.abogadosArray.clear();
    for (const abogadoControl of this.abogados) {
      this.abogadosArray.push(
        new FormGroup({
          selectorAbogado: new FormControl(abogadoControl.selec)
        })
      );
    }
    // console.log(this.abogados);
  }

  getAbogadosControls() {
    return (this.despachoForm.get('abogados') as FormArray).controls;
  }

  pestanaAnt() {
    this.router.navigate(['../', 'pae'], {relativeTo: this.route});
  }

}

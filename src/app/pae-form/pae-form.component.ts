import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { AdmonFormService } from '../shared/admon-form.service';
import { RegistroDemandaAdmon } from '../shared/registroDemandaAdmon.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Bienes } from '../shared/bienes.model';

@Component({
  selector: 'app-pae-form',
  templateUrl: './pae-form.component.html',
  styleUrls: ['./pae-form.component.css']
})
export class PaeFormComponent implements OnInit {
  @ViewChild('paeForm', {static: false}) paeForm: NgForm;
  @ViewChild('paeCheck', {static: false}) paeChecked: NgModel;
  @ViewChild('clausura', {static: false}) clausura: NgModel;
  @ViewChild('cantBien', {static: false}) cantBien: NgModel;
  @ViewChild('descBien', {static: false}) descBien: NgModel;
  @ViewChild('embargo', {static: false}) embargo: NgModel;
  @ViewChild('tipoEmbargo', {static: false}) tipoEmbargo: NgModel;
  @ViewChild('fechaEmbargo', {static: false}) fechaEmbargo: NgModel;
  @ViewChild('cancelaEmbargo', {static: false}) cancelaEmbargo: NgModel;
  @ViewChild('solRetiroEmbargo', {static: false}) solRetiroEmbargo: NgModel;
  @ViewChild('remocionDepositaria', {static: false}) remocionDepositaria: NgModel;
  @ViewChild('pagado', {static: false}) pagado: NgModel;
  @ViewChild('garantizado', {static: false}) garantizado: NgModel;
  // bienes = [];
  registroDemanda: RegistroDemandaAdmon;
  tiposEmbargo = ['Administrativo', 'Con Extracción', 'Bloqueo y/o Aseguramiento de Cta Bancaria'];
  changesSaved = false;

  constructor(private admonFormService: AdmonFormService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.registroDemanda = this.admonFormService.registro;
    this.admonFormService.registroAgregado.subscribe((registro: RegistroDemandaAdmon) => {
      this.registroDemanda = registro;
      this.admonFormService.registro = registro;
    });
    console.log(this.registroDemanda);
    console.log(this.registroDemanda.paeChecked);
  }

  avanzaPAE() {
    console.log('Avanza PAE');
    this.guardarPAE();
    this.changesSaved = true;
    this.admonFormService.actualizarRegistro(this.registroDemanda);
    this.router.navigate(['../', 'despacho'], {relativeTo: this.route});
  }

  agregarBien() {
    if (this.cantBien.value && this.descBien.value) {
      const cant = +this.cantBien.value;
      const bien = new Bienes(cant, this.descBien.value);
      this.registroDemanda.bienesEmbargados.push(bien);
      this.cantBien.control.setValue('');
      this.descBien.control.setValue('');
      console.log(this.registroDemanda.bienesEmbargados);
    }
  }

  eliminarBien(index: number) {
    console.log('intentando borrar index: ' + index);
    this.registroDemanda.bienesEmbargados.splice(index, 1);
    console.log(this.registroDemanda.bienesEmbargados);
  }

  guardarPAE() {
      this.registroDemanda.paeChecked = this.paeChecked.value;
      this.registroDemanda.clausura = this.clausura.value;
      this.registroDemanda.embargo = this.embargo.value;
      this.registroDemanda.tipoEmbargo = this.tipoEmbargo.value;
      this.registroDemanda.fechaEmbargo = this.fechaEmbargo.value;
      this.registroDemanda.cancelaEmbargo = this.cancelaEmbargo.value;
      this.registroDemanda.solRetiroEmbargo = this.solRetiroEmbargo.value;
      this.registroDemanda.remocionDepositaria = this.remocionDepositaria.value;
      this.registroDemanda.pagado = this.pagado.value;
      this.registroDemanda.garantizado = this.garantizado.value;
      // this.registroDemanda.bienesEmbargados = this.bienes.slice();
      this.registroDemanda.registroPae = true;
  }

}

import { Component, OnInit } from '@angular/core';
import { AdmonFormService } from '../shared/admon-form.service';

@Component({
  selector: 'app-resolucion-form',
  templateUrl: './resolucion-form.component.html',
  styleUrls: ['./resolucion-form.component.css']
})
export class ResolucionFormComponent implements OnInit {

  motivos = ['Convenio', 'Desistimiento', 'Transacción', 'Sentencia', 'Pago', 'Otros'];
  sentidos = ['Favorable', 'Desfavorable'];

  constructor(private admonFormService: AdmonFormService) { }

  ngOnInit() {
  }

}

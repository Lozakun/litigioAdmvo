import { Component, OnInit } from '@angular/core';
import { AdmonFormService } from '../shared/admon-form.service';

@Component({
  selector: 'app-despacho-form',
  templateUrl: './despacho-form.component.html',
  styleUrls: ['./despacho-form.component.css']
})
export class DespachoFormComponent implements OnInit {
  autoridadesMaterias = ['Secretaria del Trabajo'];
  despachos = ['Interno', 'Martinez Serrano y Rangel Bang S.C.'];

  constructor(private admonFormService: AdmonFormService) { }

  ngOnInit() {
  }

}

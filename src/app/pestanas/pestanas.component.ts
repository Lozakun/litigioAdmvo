import { Component, OnInit } from '@angular/core';
import { RegistroDemandaAdmon } from '../shared/registroDemandaAdmon.model';

@Component({
  selector: 'app-pestanas',
  templateUrl: './pestanas.component.html',
  styleUrls: ['./pestanas.component.css']
})
export class PestanasComponent implements OnInit {

  registroDemanda: RegistroDemandaAdmon;

  constructor() { }

  ngOnInit() {
  }

}

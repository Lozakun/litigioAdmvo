import { Component, OnInit } from '@angular/core';
import { RegistroDemandaAdmon } from '../shared/registroDemandaAdmon.model';
import { AdmonFormService } from '../shared/admon-form.service';

@Component({
  selector: 'app-pestanas',
  templateUrl: './pestanas.component.html',
  styleUrls: ['./pestanas.component.css'],
  providers: [AdmonFormService]
})
export class PestanasComponent implements OnInit {

  registroDemanda: RegistroDemandaAdmon;

  constructor(private admonFormService: AdmonFormService) { }

  ngOnInit() {
  }

}

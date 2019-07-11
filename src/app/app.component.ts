import { Component, OnInit, Injectable } from '@angular/core';
import { AdmonFormService } from './shared/admon-form.service';

@Injectable()

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AdmonFormService]
})
export class AppComponent implements OnInit {
  title = 'litAdmvo';
  folioDemanda: number;
  fechaDemanda: Date;
  fechaDay: string;
  fechaMonth: string;
  months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
              'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  fechaYear: string;

  constructor(private admonService: AdmonFormService) {}

  ngOnInit() {
    this.fechaDemanda = new Date();
    this.fechaDay = this.fechaDemanda.getDay().toString();
    this.fechaMonth = this.months[this.fechaDemanda.getMonth() + 1];
    this.fechaYear = this.fechaDemanda.getFullYear().toString();
  }
}

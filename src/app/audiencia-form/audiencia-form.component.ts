import { Component, OnInit } from '@angular/core';
import { AdmonFormService } from '../shared/admon-form.service';

@Component({
  selector: 'app-audiencia-form',
  templateUrl: './audiencia-form.component.html',
  styleUrls: ['./audiencia-form.component.css']
})
export class AudienciaFormComponent implements OnInit {
  sociedad: string;
  determinante: string;
  expJuicio: string;
  despacho: string;
  reclamo: string;
  fechaDemanda: string;
  oficioResolucion: string;
  autoridad: string;
  tribunalJuzgado: string;
  importeHistorico: string;
  pago: string;
  fianza: string;
  embargo: string;
  resoluciones = ['Concedida'];
  horas = ['0', '1', '2', '3', '4', '5', '6', '7', '8',
  '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19' , '20', '21', '22', '23' ];
  minutos = ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  estados = ['Programada', 'Cancelada', 'Reprogramada', 'Desahogada'];
  factibilidades = ['Remoto', 'Posible', 'Probable'];
  EtapasProcesales = ['Revisión', 'Apelación', 'Recurso', 'Amparo'];

  constructor(private admonFormService: AdmonFormService) { }

  ngOnInit() {
  }

}

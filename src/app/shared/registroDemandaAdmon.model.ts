import { Proveedor } from './proveedor.model';
import { Determinante } from './determinante.model';

export class RegistroDemandaAdmon {

    constructor(
        public folioDemanda: string,
        public oficio: string,
        public expediente: string,
        public fechaNotificacion: Date,
        public autoridadImpositora: Proveedor,
        public fechaDemanda: Date,
        public tipoDemanda: number,
        public participaTercero: number,
        public motivoDemanda: string,
        public sociedad: string,
        public determinante: Determinante,
        public participaWalmart: number,
        public importeHistorico: number,
        public registroRealizado: boolean,
        public registroPae: boolean,
        public paeChecked: boolean,
        public clausura: boolean,
        public embargo: boolean,
        public fechaEmbargo: Date,
        public cancelaEmbargo: boolean,
        public solRetiroEmbargo: boolean,
        public remocionDepositaria: boolean,
        public pagado: boolean,
        public garantizado: boolean,
        // public bienesEmbargados: []
    ) { }
}

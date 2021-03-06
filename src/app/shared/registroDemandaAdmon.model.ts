import { Proveedor } from './proveedor.model';
import { Determinante } from './determinante.model';
import { Abogado } from './abogados.model';
import { Audiencia } from './audiencia.model';

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
        public tipoEmbargo: string,
        public fechaEmbargo: Date,
        public cancelaEmbargo: boolean,
        public solRetiroEmbargo: boolean,
        public remocionDepositaria: boolean,
        public pagado: boolean,
        public garantizado: boolean,
        public bienesEmbargados = [],
        public autoridadMateria: string,
        public despacho: string,
        public abogados: Abogado[],
        public registroDespacho: boolean,
        public fechaSuspension: Date,
        public resolucionSuspension: string,
        public sentenciaTFJFA: string,
        public sentenciaDefinitiva: string,
        public resultadoFinal: string,
        public estadoFinal: string,
        public audiencias: Audiencia[],
        public registroAudiencia: boolean,
        public motivoTermino: string,
        public instanciaConclusion: string,
        public sentidoTermino: string,
        public fechaTermino: Date,
        public importeActualizado: number,
        public estadoDemanda: string,
        public fechaRegistro: Date
    ) { }
}

import { Abogado } from './abogados.model';

export class Despacho {
    constructor(public nombreDespacho: string, public abogados: Abogado[]) {
        nombreDespacho = nombreDespacho,
        abogados = abogados;
    }

}

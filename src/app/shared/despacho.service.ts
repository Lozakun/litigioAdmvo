import { Despacho } from './despachos.model';
import { Abogado } from './abogados.model';

const despachos = [new Despacho('Despacho y Asoc', [new Abogado('Mario Lopez', false), new Abogado('Azucena García', false)]),
new Despacho('Abogados Asociados',
[new Abogado('Patricia Malpica', false),
new Abogado('Julio Jurado', false), new Abogado('Margarita Moreno', false)])
];

export class DespachoService {
    agregarDespacho(despacho: Despacho) {
        const desp = despacho;
        despachos.push(desp);
    }

    fetchDespachos() {
        console.log(despachos.slice());
        return despachos.slice();
    }
}

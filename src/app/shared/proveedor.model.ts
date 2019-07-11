export class Proveedor {
    constructor(public rfc: string, public numAutoridad: string, public razonSocial: string, public tipoPersona: string ) {
        rfc = rfc,
        numAutoridad = numAutoridad,
        razonSocial = razonSocial,
        tipoPersona = tipoPersona;
    }
}

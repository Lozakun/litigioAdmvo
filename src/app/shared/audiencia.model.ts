export class Audiencia {
    constructor(
        public fecha: Date,
        public hora: string,
        public minutos: string,
        public estado: string,
        public factibilidad: string,
        public etapaProcesal: string,
        public tribunalJuzgado: string,
        public expediente: string,
        public observaciones: string) {}
}

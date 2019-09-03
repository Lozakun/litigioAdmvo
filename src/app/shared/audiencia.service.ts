import { Audiencia } from './audiencia.model';
const audiencias = [];

export class AudienciaService {
    public addAudiencia(audiencia: Audiencia) {
        audiencias.push(audiencia);
    }

    public fetchAudiencias() {
        return audiencias.slice();
    }
}

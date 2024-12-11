import { Test } from './test';

export class Materiale {

    id!: number;
    idDomanda?: number;
    idQuiz?: number;
    materialeTestuale: string = "";
    titolo: string = "";;
    descrizione: string = "";;
    downloadPresente?: boolean;
    ordine?: number;
    tipoFile?: string;
    test? : Test;

    constructor(data?: any) {
        if (null != data) {

            if (null != data.id && undefined != data.id) {
                this.id = data.id;
            }

            if (null != data.idDomanda && undefined != data.idDomanda) {
                this.idDomanda = data.idDomanda;
            }

            if (null != data.idQuiz && undefined != data.idQuiz) {
                this.idQuiz = data.idQuiz;
            }

            if (null != data.tipoFile && undefined != data.tipoFile) {
                this.tipoFile = data.tipoFile;
            }

            if (null != data.materialeTestuale && undefined != data.materialeTestuale) {
                this.materialeTestuale = data.materialeTestuale;
            }

            if (null != data.downloadPresente && undefined != data.downloadPresente) {
                this.downloadPresente = data.downloadPresente;
            }

            if (null != data.titolo && undefined != data.titolo) {
                this.titolo = data.titolo;
            }

            if (null != data.descrizione && undefined != data.descrizione) {
                this.descrizione = data.descrizione;
            }

            if (null != data.ordine && undefined != data.ordine) {
                this.ordine = data.ordine;
            }



        }
    }
}
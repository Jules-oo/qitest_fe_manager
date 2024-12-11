export class AssegnaQuiz {
    idQuiz: number;
    idUtente: number;
    durata: number;
    nomeQuiz: string;
    tipoQuiz: string;
    ordine: number;
    risultati: number;
    dataUltimaAssegnazione: Date;
    studio: boolean = false;
    selezionato: boolean = false;

    constructor(data: any) {
        data = data || {};
        this.idQuiz = data.idQuiz;
        this.idUtente= data.idUtente;
        this.durata= data.durata;
        this.nomeQuiz = data.nomeQuiz;
        this.tipoQuiz = data.tipoQuiz;
        this.ordine = data.ordine;
        this.risultati = data.risultati;
        this.dataUltimaAssegnazione= data.dataUltimaAssegnazione;
        this.studio = data.studio;
    }
}
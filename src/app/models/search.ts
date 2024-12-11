export class Search {
    nome: string;
    cognome: string;
    username: string;
    profilo: string;

    constructor(data: any) {
        data = data || {};
        this.nome = data.nome;
        this.cognome = data.cognome;
        this.username = data.username;
        this.profilo = data.profilo;

    }
}

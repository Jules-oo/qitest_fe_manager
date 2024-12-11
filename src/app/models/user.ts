import { Azienda } from "./azienda";

export class User {
    profilo: String;
    azienda?: Azienda;
    nome: String;
    cognome: String;
    email: String;
    password: String;

    constructor(nome: String, cognome: String, password: String, email: String, profilo: String = "USR") {
        
        if (undefined === this.azienda || null === this.azienda) {
            this.azienda = new Azienda(1);
        }

        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.password = password;
        this.profilo = profilo;
    }
}
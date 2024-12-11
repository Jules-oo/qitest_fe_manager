
export class TestMateriale{
    idTest : number;
    deleted : boolean;
    descrizioneTest: String;
    durata: number;
    ordine: number;

    constructor(idTest: number, deleted: boolean = false, descrizioneTest: String, durata: number, ordine: number){
        this.idTest = idTest;
        this.deleted = deleted;
        this.descrizioneTest = descrizioneTest;
        this.durata = durata;
        this.ordine = ordine;
    }
}
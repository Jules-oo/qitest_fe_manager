export class Test{
    
	idTest : number;

    descrizioneTest? : string;
    
    constructor(idTest : number, descrizioneTest? : string){
        this.idTest = idTest;
        if (null !== descrizioneTest)
            this.descrizioneTest = descrizioneTest;
    }

	


}
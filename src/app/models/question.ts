import { Option } from './option';

export class Question {
    id: number;
    img:string;
    name: string;
    questionTypeId: number;
    options: Option[];
    answered?: boolean;
    risp:string;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.img = data.img;
        this.questionTypeId = data.questionTypeId;
        this.risp = data.risp;
        this.options = [];
        data.options.forEach((o: any) => {
            this.options.push(new Option(o));
        });
    }

  
}

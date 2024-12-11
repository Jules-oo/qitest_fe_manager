import { QuizConfig } from './quiz-config';
import { Question } from './question';

export class Quiz {
    id?: number;
    inizio:any;
    name?: string;
    description?: string;
    config?: QuizConfig;
    questions!: Question[];
    time?: number;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            console.log(data.name+" nel modellllll");
            this.description = data.description;
            this.config = new QuizConfig(data.config);
            this.time = data.time;
            this.inizio= data.inizio;
            this.questions = [];
            data.questions.forEach((q:any) => {
                this.questions.push(new Question(q));
            });
        }
    }
}
export { Question };


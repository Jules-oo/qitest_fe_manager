import { Component, OnInit } from '@angular/core';
import { Quiz, Question } from '../models/quiz';
import { Subscription } from "rxjs";
import { environment } from '../../environments/environment';
import { NavbarService } from '../_services/navbar.service';
import { QuizService } from '../services/quiz.service';
import { AuthenticationService } from '../_services/authentication.serivce';
import { DialogsService } from '../_services/confirmdialog.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Option } from '../models/option';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'createst',
  templateUrl: 'createst.component.html',
  providers: [QuizService, NavbarService, AuthenticationService, DialogsService, HttpClient],
  imports: [CommonModule, FormsModule]
})
export class CreaTestComponent implements OnInit {

  listaQuestion!: Question[];
  listaOption!: Option[];
  quiz!: Quiz;
  question!: Question;
  option!: Option;
  tipoRisposta?: number;
  fakeQuestion!: string;
  fakeAnswer!: string;
  countLenght!: number;
  quizTitle!: string;
  quizTime?: number;
  result?: string;
  showResult?: boolean;
  message?: string;

  constructor(
    private router: Router,
    public nav: NavbarService,
    private http: HttpClient,
    public authenticationService: AuthenticationService,
    private dialogsService: DialogsService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.message = '';
    this.showResult = false;
    this.quizTitle = '';
    this.quizTime = 0;
    this.listaQuestion = [];
    this.listaOption = [];
    this.quiz = new Quiz('');
    this.countLenght = 0;
    this.fakeQuestion = '{"id":0,"name":"","questionTypeId":1,"options":[{ "id":0,"questionId":0,"name":"","isAnswer":false,"img":""}], "questionType":{  },"img":""}';
    this.fakeAnswer = '{"id":0,"questionId":0,"name":"","isAnswer":false,"img":""}';
    this.question = new Question(JSON.parse(this.fakeQuestion));
    this.question.questionTypeId = 1;
    this.listaQuestion.push(this.question);
  }

  selectTipoRisposta(i: number, type: number) {
    this.listaQuestion[i].questionTypeId = type;
    this.option = new Option(JSON.parse(this.fakeAnswer));
    this.listaQuestion[i].options = [this.option];
  }

  addQuestion() {
    this.countLenght++;
    this.question = new Question(JSON.parse(this.fakeQuestion));
    this.question.questionTypeId = 1;
    this.listaQuestion.push(this.question);
  }

  removeQuestion(i: number) {
    this.countLenght--;
    this.listaQuestion.splice(i, 1);
  }

  addOption(i: number) {
    this.option = new Option(JSON.parse(this.fakeAnswer));
    this.listaQuestion[i].options.push(this.option);
  }

  removeOption(i: number, j: number) {
    this.listaQuestion[i].options.splice(j, 1);
  }

  isCorretta(i: number, j: number) {
    this.listaQuestion[i].options[j].isAnswer = !this.listaQuestion[i].options[j].isAnswer;
  }

  uploadImageOption(i: number, j: number) {
    console.log("Upload image option");
  }

  uploadImageQuestion(i: number) {
    console.log("Upload image question ");
  }

  resetTest() {
    this.initialize();
  }

  newTest() {
    this.showResult = false;
    this.initialize();
  }

  // Metodo per il cambio di file domanda
  fileChangeDomanda(event: any, i: number) {
    const fileList: FileList = event.target.files;
    const title = this.quizTitle.replace(" ", "_");
    const imageName = `${title.toLowerCase()}/domanda${i}.png`;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('file', file, imageName);

      this.http.post<any>(`${environment.baseUrl}/test/caricaFile`, formData).pipe(
        catchError(error => {
          console.error(error);
          return of(null); // Ritorna un valore di fallback se c'è un errore
        })
      ).subscribe(response => {
        if (response) {
          this.listaQuestion[i].img = `domande/${title.toLowerCase()}/domanda${i}.png`;
        }
      });
    }
  }

  // Metodo per il cambio di file risposta
  fileChangeRisposta(event: any, i: number, j: number) {
    const fileList: FileList = event.target.files;
    const title = this.quizTitle.replace(" ", "_");
    const imageName = `${title.toLowerCase()}/risposta${i}${j}.png`;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('file', file, imageName);

      this.http.post<any>(`${environment.baseUrl}/test/caricaFile`, formData).pipe(
        catchError(error => {
          console.error(error);
          return of(null); // Ritorna un valore di fallback se c'è un errore
        })
      ).subscribe(response => {
        if (response) {
          this.listaQuestion[i].options[j].img = `risposte/${title.toLowerCase()}/risposta${i}${j}.png`;
        }
      });
    }
  }

  // Metodo per salvare il test
  salvaTest() {
    this.quiz.questions = this.listaQuestion;
    this.quiz.name = this.quizTitle;
    this.quiz.time = this.quizTime;

    console.log(this.quiz);

    this.http.post<any>(`${environment.baseUrl}/test/creaTest`, { quiz: this.quiz }).pipe(
      catchError(error => {
        this.message = "Errore durante la creazione del test!";
        this.showResult = true;
        console.error(error);
        return of(null); // Ritorna un valore di fallback se c'è un errore
      })
    ).subscribe(response => {
      if (response) {
        this.result = response.result;
        this.showResult = true;
        this.message = (this.result === "OK") ? "Test salvato correttamente" : "Errore durante la creazione del test!";
        console.log(this.result);
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AssegnaQuiz } from '../models/assegnaQuiz';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { NavbarService } from '../_services/navbar.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../_services/authentication.serivce';
import { DialogsService } from '../_services/confirmdialog.service';
import { Search } from '../models/search';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestionetest',
  imports: [FormsModule, CommonModule],
  providers: [QuizService, NavbarService, HttpClient, AuthenticationService, DialogsService],
  templateUrl: './gestionetest.component.html',
  styleUrl: './gestionetest.component.css'
})
export class GestionetestComponent implements OnInit {

  listaUtenti: any;
  user?: string;
  search: any;
  listaTestEsami!: AssegnaQuiz[];
  utenteSelected!: boolean;
  listaQuiz!: AssegnaQuiz[];
  idUtenteSelezionato!: number;
  listaAssegnaQuiz!: AssegnaQuiz[];
  result!: string;
  utenteSelezionato = false;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router,
    public nav: NavbarService,
    private http: HttpClient,
    public authService: AuthenticationService,
    private dialogsService: DialogsService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log("L'id recuperato è: " + id);

    if (undefined != id && null != id) {
      let parsedId = Number(id);
      console.log("L'id parsato è: " + parsedId);
      this.getListaTestByIdUtente(parsedId);
    }

    this.search = new Search("");
    this.listaQuiz = new Array;
    this.listaAssegnaQuiz = new Array;
    this.initialize();
    this.utenteSelected = false;
  }

  initialize() {
    this.getListaUtenti();
  }

  getListaTestByIdUtente(idUtente: number): void {
    this.result = "";
    this.idUtenteSelezionato = idUtente;
    console.log("L'id utente selezionato è: " + this.idUtenteSelezionato);
  
    this.http.post<any>(`${environment.baseUrl}/test/getListaTestByIdUtente`, { id: this.idUtenteSelezionato }).subscribe({
      next: (response) => {
        if (response && response.listaTestEsami) {
          this.listaQuiz = response.listaTestEsami.map((q: any) => {
            return {
              ...q,
              ordine: -1,
              risultati: 0,
            };
          });
          console.log("Recupero completato: ", this.listaQuiz);
          this.utenteSelected = true; 
        } else {
          this.listaTestEsami = new Array;
        }
      },
      error: (err) => {
        console.error("Errore durante il recupero della lista dei test:", err);
        this.listaQuiz = [];
      }
    });
  }

  searchUtente() {
    this.user = JSON.parse(sessionStorage.getItem("currentUser") || '{}').username;
    this.http.post(environment.baseUrl + '/user/getListaUtentiFiltrata', {userLogged: this.user, search: this.search}).subscribe({
      next: (response) => {
        this.listaUtenti = response;
      },
      error: (err) => {
        console.error("Errore durante il recupero della lista degli utenti:", err);
        this.listaUtenti = [];
      }
    })
  }

  assegnaQuizSelezionati() {
    this.dialogsService.confirm("Assegnazione", "Sei sicuro di voler assegnare i test o il materiale all\'utente ?").subscribe({
      next: (result) => {
        this.user = JSON.parse(sessionStorage.getItem("currentUser") || '{})').username;
        for(let u of this.listaAssegnaQuiz) 
          u.dataUltimaAssegnazione = new Date();
        console.log(this.listaAssegnaQuiz);
        this.http.post(environment.baseUrl + '/test/assegnaTestEsame', {userLogged: this.user, assegnaQuiz: this.listaAssegnaQuiz}).subscribe({
          next: (response) => {
            this.result = JSON.stringify(response);
            this.listaQuiz = new Array;
          },
          error: () => {
            this.result = "ERROR";
          }
        })
      }
    })
  }

  aggiungiQuiz(quiz: any) {
    quiz.idUtente = this.idUtenteSelezionato;
    var flagFound = false;

    if (this.listaAssegnaQuiz.length === 0) {
      this.listaAssegnaQuiz.push(quiz);
      this.utenteSelected = true;
    } else {
      for(let u of this.listaAssegnaQuiz) {
        if (u.idQuiz === quiz.idQuiz)
          flagFound = true;
      }

      if (flagFound) {
        this.listaAssegnaQuiz.splice(this.listaAssegnaQuiz.indexOf(quiz), 1);
        if (this.listaAssegnaQuiz.length === 0)
          this.utenteSelected = false;
      } else {
        this.listaAssegnaQuiz.push(quiz);
        this.utenteSelected = true;
      }
    }
  }
  
  ngOnDestroy() {
    this.nav.show();
  }

  assegnaAssegnabili() {
    console.log("Questi sono i quiz selezionati")
    this.quizService.getMaterialeDisponibile(this.idUtenteSelezionato).subscribe({
      next: (result) => {
        let arrayIds : Array<number> = result;
        console.log(arrayIds);
        this.listaAssegnaQuiz = new Array;

        this.listaQuiz.filter(e => arrayIds.find(f => f === e.idQuiz && e.tipoQuiz == 'T')).forEach(g => {
          console.log(g.idQuiz);
          g.studio = true;
          this.listaAssegnaQuiz.push(g);
          this.utenteSelected = true;
          g.selezionato = true;
          g.idUtente = this.idUtenteSelezionato;
        })
        console.log(this.listaAssegnaQuiz);
      }
    })
  }

  getListaUtenti() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser') || '{}').username;
    this.http.post<{ listaUtenti: any[] }>(`${environment.baseUrl}/user/getListaUtenti`, { username: this.user }).subscribe({
      next: (response) => {
        console.log(response);
        this.listaUtenti = response.listaUtenti || [];
      },
      error: (error) => {
        this.listaUtenti = [];
        console.error(error);
      }
    });
  }
}

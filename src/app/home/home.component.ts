import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.serivce';
import { NavbarService } from '../_services/navbar.service';
import { HttpClient } from '@angular/common/http';
import { DialogsService } from '../_services/confirmdialog.service';
import { Search } from '../models/search';
import { environment } from '../../environments/environment';
import { Question } from '../models/question';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  providers: [UserService, AuthenticationService, HttpClient, DialogsService, NavbarService],
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  users: User[] = [];
  user!: string;
  token!: string;
  listaQuizPerUtente: any;
  listaUtenti: any;
  showUserList!: boolean;
  nomeCognome!: string;
  listaQuizPerUtenteDettaglioEsame: any;
  showDettaglioEsame!: boolean;
  listaQuiz: any;
  usernameUtente!: string;
  risultatiTest: any;
  showResultTest!: boolean;
  search: any;
  
  constructor(
    private router: Router,
    public authService: AuthenticationService,
    public nav: NavbarService,
    private http: HttpClient,
    private dialogsService: DialogsService
  ) { }

  ngOnInit(): void {
    this.nav.show();
    this.initialize();
    this.showUserList = true;
    this.showResultTest = false;
    this.search = new Search("");
  }

  initialize() {
    this.getListaUtenti();
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

  getDettaglioUtente(idUtente: number) {
    this.showUserList = false;
    this.showDettaglioEsame = false;

    this.http.post(environment.baseUrl + '/user/getDettaglioUtente', {idUtente: idUtente}).subscribe({
      next: (response) => {
        this.listaQuizPerUtente = response;
        this.nomeCognome = this.listaQuizPerUtente.nomeUtente.toUpperCase() + " " + this.listaQuizPerUtente.cognomeUtente.toUpperCase();
        this.listaQuiz = this.listaQuizPerUtente.listaQuiz;
        this.usernameUtente = this.listaQuizPerUtente.emailUtente;
        console.log("Lista test da fare: " + this.listaQuizPerUtente);
      },
      error: () => {
        this.listaQuizPerUtente = [];
      }
    })
  }

  goBackToUser() {
    this.showUserList = true;
  }

  goBackToTest() {
    this.showDettaglioEsame = false;
  }

  goBackToTestDettaglio() {
    this.showResultTest = false;
  }

  mostraTestByIdEsame(idEsame: number) {
    this.showDettaglioEsame = true;
    this.listaQuizPerUtenteDettaglioEsame = this.listaQuizPerUtente.listaQuiz;

    for(let test of this.listaQuizPerUtente.listaQuiz) {
      if (test.idQuiz === idEsame)
        this.listaQuizPerUtenteDettaglioEsame = test.listaEsameTest
    }
  }

  mostraRisultatiByIdTest(idTest: number, idUtenteQuiz: number, username: string) {
    this.http.get(environment.baseUrl+'/risultati/risultatoTestUtente?idTest=' + idTest + '&idUtenteQuiz=' + idUtenteQuiz + '&username=' + username).subscribe({
      next: (response) => {
        console.log(response);
        this.risultatiTest = response;
        this.showResultTest = true;
      },
      error: () => {
        this.listaQuizPerUtente = {};
      }
    })
  }

  isCorrect(question: Question) {
    return question.options.find(x => x.isAnswer == x.selected) != undefined ? 'CORRETTA' : 'ERRATA';
  }

  rispostaCorretta(question: Question) {
    const option = question.options.filter(e => e.isAnswer)
    return option[0].name;
  }

  eliminaUtente(idUtente: number) {
    this.dialogsService.confirm('', 'Sei sicuro di voler eliminare l\'utente?');
  }

  eliminaTestUtente(idUtente: number){
    this.dialogsService
   .confirm('','Sei sicuro di voler rimuovere all\'utente questo test ? '
              +'ATTENZIONE : verranno eliminati anche tutti i risultati! ');
  }

  searchUtente() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser') || '{}').username;
    this.http.post(environment.baseUrl + '/user/getListaUtentiFiltrata', {userLogged: this.user, search: this.search}).subscribe({
      next: (response) => {
        this.listaUtenti = response;
      },
      error: () => {
        this.listaUtenti = {};
      }
    })
  }

  goToUserTest(id: number) {
    this.router.navigate(['/gestionetest', { id: id }]);
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { DialogsService } from '../_services/confirmdialog.service';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-creautente',
  imports: [FormsModule],
  providers: [UserService, DialogsService],
  templateUrl: './creautente.component.html',
  styleUrl: './creautente.component.css'
})
export class CreautenteComponent implements OnInit{

  nome!: String;
  cognome!: String;
  email!: String;
  password!: String;
  utente!: User;

  constructor(private dialogsService: DialogsService, private userService: UserService) { 
  }

  ngOnInit(): void {
  }

  salvaUtente() {

    if (this.email.length != 0 && this.password.length != 0) {
      this.utente = new User(this.nome, this.cognome, this.email, this.password);
      this.userService.creaUtente(this.utente).subscribe({
        next:() => {
          this.dialogsService.alert("Registrazione avvenuta con successo", "L'utente " + this.nome + " è stato correttamente creato!");
        },
        error:() => {
          this.dialogsService.alert("Errore", "Errore durante la registrazione dell'utente " + this.nome);
        }
      });
    }
  }


}

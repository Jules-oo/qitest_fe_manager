import { Component, OnInit } from '@angular/core';
import { Materiale } from '../models/materiale';
import { TestMateriale } from '../models/testMateriale';
import { DialogsService } from '../_services/confirmdialog.service';
import { MaterialeService } from '../services/materiale.service';
import { FormsModule } from '@angular/forms';
import { CreamaterialeComponent } from '../creamateriale/creamateriale.component';
import { ListaMaterialeComponent } from '../lista-materiale/lista-materiale.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestionemateriale',
  imports: [FormsModule, CreamaterialeComponent, ListaMaterialeComponent, CommonModule],
  providers: [MaterialeService, DialogsService],
  templateUrl: './gestionemateriale.component.html',
  styleUrl: './gestionemateriale.component.css'
})
export class GestionematerialeComponent implements OnInit {

  materiale!: Array<Materiale>;
  idArgomentoScelto!: number;
  tests: Array<TestMateriale> = [];
  materialeNuovo!: Materiale;

  nuovoMateriale?: boolean;
  materialePresente?: boolean;

  constructor(private dialogsService: DialogsService, private matService: MaterialeService) { }

  ngOnInit(): void {
    this.materialeNuovo = new Materiale();
    this.matService.getAllTest().subscribe({
      next: (result) => {
        this.tests = result;
      }
    })
  }

  caricaMaterialeTestSelezionato() {
    this.nuovoMateriale = true;

    this.matService.caricaMaterialeById(this.idArgomentoScelto).subscribe({
      next: (result) => {
        this.materiale.push(result);
        this.materialePresente = true;
      },
      error: () => {
        this.materialePresente = false;
      }
    })
  }

  ricaricaMaterialeTestSelezionato() {
    return this.matService.caricaMaterialeById(this.idArgomentoScelto);
  }

  aggiornaLista() {
    this.caricaMaterialeTestSelezionato();
  }

  modificaAvvenuta(event: any) {
    if (event === true) {
      this.ricaricaMaterialeTestSelezionato().subscribe({
        next: (result) => {
          this.materiale.push(result);
          this.dialogsService.confirm("Operazione completata!", "Il materiale e' stato correttamente modificato.");
        },
        error: () => {
          this.dialogsService.confirm("Errore!", "Il materiale non e' stato modificato.");
        }
      })
    }
  }

  eliminazioneAvvenuta(event: any) {
    if (event === true) {
      this.dialogsService.confirm("Operazione completata!", "Il materiale e' stato correttamente eliminato.");
      this.ricaricaMaterialeTestSelezionato().subscribe({
        next: (result) => {
          this.materiale.push(result);
          if (this.materiale.length > 0)
            this.materialePresente = true;
          else
            this.materialePresente = false;
        },
        error: () => {
          this.dialogsService.confirm("Errore!", "Il materiale non e' stato eliminato.");
        }
      })
    }
  }

  creazioneAvvenuta(event: any) {
    if (event === true) {
      this.ricaricaMaterialeTestSelezionato().subscribe({
        next: (result) => {
          this.materialeNuovo = new Materiale();
          this.materiale.push(result);
          if (this.materiale.length > 0)
            this.materialePresente = true;
          else
            this.materialePresente = false;
          this.dialogsService.confirm("Operazione completata!", "Il materiale e' stato correttamente creato.");
        },
        error: () => {
          this.dialogsService.confirm("Errore!", "Il materiale non e' stato creato.");
        }
      })
    }
  }

}

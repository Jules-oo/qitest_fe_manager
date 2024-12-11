import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Materiale } from '../models/materiale';
import { MaterialeService } from '../services/materiale.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-materiale',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-materiale.component.html',
  styleUrl: './lista-materiale.component.css'
})
export class ListaMaterialeComponent implements OnInit {

  @Input() listaMaterialeTest! : Array<Materiale>;
  @Output() aggiornato: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() eliminato: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private matService: MaterialeService) { }

  ngOnInit(): void {
  }

  modificaMateriale(materiale: Materiale) {
    this.matService.modificaMateriale(materiale).subscribe({
      next: () => {
        this.aggiornato.emit(true);
      },
      error: () => {
        this.aggiornato.emit(false);
      }
    })
  }

  eliminaMateriale(materiale: Materiale) {
    this.matService.eliminaMateriale(materiale.id).subscribe({
      next: () => {
        this.eliminato.emit(true);
      },
      error: () => {
        this.eliminato.emit(false);
      }
    })
  }


}

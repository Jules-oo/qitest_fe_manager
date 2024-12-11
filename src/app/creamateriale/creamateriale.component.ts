import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Materiale } from '../models/materiale';
import { Test } from '../models/test';
import { MaterialeService } from '../services/materiale.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-creamateriale',
  imports: [FormsModule],
  providers: [MaterialeService],
  templateUrl: './creamateriale.component.html',
  styleUrl: './creamateriale.component.css'
})
export class CreamaterialeComponent {

  @Input() nuovoMat!: Materiale;
  @Input() idTest!: number;
  @Output() creato : EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(private matService: MaterialeService) {
 
  }

  ngOnInit() {}

  creaMateriale() {
    this.nuovoMat.test = new Test(this.idTest);
    this.matService.creaMateriale(this.nuovoMat).subscribe({
      next: () => {
        this.creato.emit(true);
      },
      error: () => {
        this.creato.emit(false);
      }
    })
  }
}

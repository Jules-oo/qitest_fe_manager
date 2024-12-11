import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmdialog',
  imports: [],
  templateUrl: './confirmdialog.component.html',
  styleUrl: './confirmdialog.component.css'
})
export class ConfirmdialogComponent {
  public title!: string;
  public message!: string;

  constructor(public dialogRef: MatDialogRef<ConfirmdialogComponent>) {}
}

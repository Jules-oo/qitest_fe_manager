import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.css'
})
export class AlertDialogComponent {
public title!: String;
  public message!: String;

  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>) {
  }

  ngOnInit() {
  }

}

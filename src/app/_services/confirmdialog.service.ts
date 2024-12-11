import { Observable } from 'rxjs';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Injectable()
export class DialogsService {

    constructor(private dialog: MatDialog) { }

    public confirm(title: string, message: string): Observable<boolean> {
        let dialogRef: MatDialogRef<ConfirmdialogComponent>;

        dialogRef = this.dialog.open(ConfirmdialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }

    public alert(title: string, message: string): Observable<boolean> {
        let dialogRef: MatDialogRef<AlertDialogComponent>;

        dialogRef = this.dialog.open(AlertDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}

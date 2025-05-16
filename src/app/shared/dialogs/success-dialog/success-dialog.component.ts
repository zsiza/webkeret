import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface SuccessDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="true" color="primary">OK</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      mat-dialog-content {
        min-height: 80px;
        display: flex;
        align-items: center;
      }

      p {
        font-size: 16px;
        margin: 0;
      }
    `,
  ],
})
export class SuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuccessDialogData
  ) {}
}

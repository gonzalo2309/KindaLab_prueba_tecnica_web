import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MapComponent } from '../map/map.component';

@Component({
    selector: 'app-movie-detail-modal',
    standalone: true,
    templateUrl: './movie-detail-modal.component.html',
    styleUrls: ['./movie-detail-modal.component.scss'],
    imports: [MapComponent]
})
export class MovieDetailModalComponent{
    constructor(
        public dialogRef: MatDialogRef<MovieDetailModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { movie: any; }
    ) {}

    closeDialog(): void {
        this.dialogRef.close();
    }




}

import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { Dossier } from 'app/interface/Dossier';
import {UpdateComponentComponent} from '../update-component/update-component.component';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  selectedDossier: any

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _matDialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.selectedDossier = this.data.dossier
  }
}

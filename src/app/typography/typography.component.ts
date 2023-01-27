import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dossier } from 'app/interface/Dossier';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  selectedDossier: any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit() {
    this.selectedDossier = this.data.dossier
  }

}

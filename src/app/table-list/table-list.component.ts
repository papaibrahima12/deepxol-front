import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Dossier} from 'app/interface/Dossier';
import {DossierService} from 'app/upgrade/dossier.service';
import {UpgradeComponent} from 'app/upgrade/upgrade.component';
import {TypographyComponent} from 'app/typography/typography.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  fetchedDossier: any
  searchForm: FormGroup;
  searchedDossier: any
  closeResult: string;

  constructor(
    private _matDialog: MatDialog,
    private _dossierService: DossierService,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal
    ) {}

  ngOnInit(): void  {

    this.searchForm = this._formBuilder.group({
      search: ['' || null],
    });

    this._dossierService.fetchedNodes$.subscribe({
      next: (response: Dossier[]) => {
          this.fetchedDossier = response
      },
      error: (errors) => {
          console.log(errors);
      },
    })
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
  }

  add() {
    this._matDialog.open(UpgradeComponent, {
      autoFocus: true,
      height: '70%',
      width: '70%'
    });
  }

  openDetails(dossier: Dossier): void {
    // Open Dialog Modal
    this._matDialog.open(TypographyComponent, {
      autoFocus: false,
      data: {
          dossier
      },
      height: '70%',
      width: '70%'
    })
  }

  search() {
    const payload = Object.assign({}, this.searchForm.value);
    if (payload.search == null || payload.search === '') {
      this._dossierService.fetchedNodes$.subscribe({
        next: (response: Dossier[]) => {
            this.fetchedDossier = response
        },
        error: (errors) => {
            console.log(errors);
        },
      })
      console.log(this.fetchedDossier)
    } else {
      console.log('something to search')
      this.fetchedDossier = this.fetchedDossier.filter(dossier => dossier.dossierNumber === payload.search)
    }
  }

}

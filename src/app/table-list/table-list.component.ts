import {Component, Injectable, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Dossier} from 'app/interface/Dossier';
import {DossierService} from 'app/upgrade/dossier.service';
import {UpgradeComponent} from 'app/upgrade/upgrade.component';
import {TypographyComponent} from 'app/typography/typography.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Service {

  opts = [];
  constructor(private http: HttpClient) {}

  getData() {
    return this.opts.length
        ? of(this.opts)
        : this.http
            .get<any>(`${environment.apiUrl}/api/dossier`)
            .pipe(tap((data) => (this.opts = data)));
  }
}

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  fetchedDossier: any
  searchForm: FormGroup;

  constructor(
    private _matDialog: MatDialog,
    private _dossierService: DossierService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void  {
    this.searchForm = this._formBuilder.group({
      search: ['' || null, Validators.required],
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
      console.log('something to search')
      if(payload.search === null || payload.search === '') {
        this._dossierService.fetchedNodes$.subscribe({
          next: (response: Dossier[]) => {
            this.fetchedDossier = response
          },
          error: (errors) => {
            console.log(errors);
          },
        })
      } else {
        this._dossierService.fetchedNodes$.subscribe({
          next: (response: Dossier[]) => {
            this.fetchedDossier = response.filter(dossier => dossier.dossierNumber === payload.search)
          },
          error: (errors) => {
            console.log(errors);
          },
        })
      }
    }
}

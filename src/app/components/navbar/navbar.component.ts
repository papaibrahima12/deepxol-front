import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import {LoginComponent} from '../login/login.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Dossier} from '../../interface/Dossier';
import {DossierService} from '../../upgrade/dossier.service';
import {UpgradeComponent} from '../../upgrade/upgrade.component';
import {MatDialog} from '@angular/material/dialog';
import {TypographyComponent} from '../../typography/typography.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    fetchedDossier: any
    public loggedIn = false;
    public user = this.authservice.getUsername();
    private listTitles: any[];
    location: Location;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    searchForm: FormGroup;

    constructor(location: Location,
                private _matDialog: MatDialog,
                private _dossierService: DossierService,
                private _formBuilder: FormBuilder,
                private element: ElementRef,
                private router: Router,
                private readonly authservice: AuthService) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit() {
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });
        this.loggedIn = !!this.authservice.currentUser;
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

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            }else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { // assign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };
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

    add() {
        this._matDialog.open(UpgradeComponent, {
            autoFocus: true,
            height: '70%',
            width: '70%'
        });
    }

    getTitle() {
        let titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
          titlee = titlee.slice( 1 );
      }

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }

    public logout(): void {
        this.authservice.logout();
        this.router.navigate(['/login']);
    }
}

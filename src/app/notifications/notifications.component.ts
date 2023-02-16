import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {UserserviceService} from '../services/userservice.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _httpClient: HttpClient,
    private userService: UserserviceService
  ) { }
  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  login() {
    if (this.loginForm) { return ; }
    const payload = Object.assign({}, this.loginForm.value);

    this.userService.login(payload?.username, payload?.password).subscribe({
      next(value) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Dossier enregistré avec succés',
          timer: 10000
        })
        this._router.navigateByUrl('/dashboard')
      },
      error(err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Quelque chose s\'est mal passé !',
          timer: 1000
        })
      },
    })
    // this.currentUser = this._httpClient.get(`${environment.apiUrl}/profile`)
    // if (this.loginForm.invalid) { return; }
    // const payload = Object.assign({}, this.loginForm.value);
    //
    // if (payload.username === this.currentUser.username && payload.password === this.currentUser.password) {
    //   this.router.navigateByUrl('/dashboard')
    // } else {
    //   Swal.fire({
    //       icon: 'error',
    //       title: 'Error',
    //       text: 'Login et/ou mot de passe incorrect',
    //       timer: 1000
    //   })
    //   console.log('error password username')
    // }
  }

}

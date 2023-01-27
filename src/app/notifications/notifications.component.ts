import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router
  ) { }
  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: [''],
      password: ['']
    });
  }


  login(){
    if (this.loginForm.invalid) return;
    let payload = Object.assign({}, this.loginForm.value);
    if(payload.username === 'fadel@esp.sn' && payload.password === 'passer123'){
      this.router.navigateByUrl('/dashboard')
    }else{
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Erreur mot de passe',
          timer: 1000
      })
      console.log("error password username")
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({ templateUrl: 'login.component.html', styleUrls: ['login.component.css']})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe(data => {
      this.error = '';
      this.router.navigate([this.returnUrl]);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Login et/ou mot de passe incorrect',
        timer: 1000
      })
    });
  }

  getUser() {
    return this.f.username;
  }
}

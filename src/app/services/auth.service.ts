import { Injectable } from '@angular/core';
import * as Http from 'http';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../interface/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private readonly _httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    return this._httpClient.post<any>(`${environment.apiUrl}/auth/login`, { username, password }).pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.access_token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
    );
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

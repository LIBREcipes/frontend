import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import User from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<string>
  public currentUser: Observable<string>

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('currentUser'))
    this.currentUser = this.currentUserSubject.asObservable()
  }

   public get currentUserValue(): string {
        return this.currentUserSubject.value
    }

    login(username: string, password: string) {
        return this.http.post<{acces_token: string}>(`http://localhost:5000/api/token`, { username, password })
            .pipe(map(res => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('wurrentUser', res.acces_token)
                this.currentUserSubject.next(res.acces_token)
                return res.acces_token
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}

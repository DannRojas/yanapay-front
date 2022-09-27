import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/domain/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
  });

  registerUser(user: any): Observable<UserModel> {
    const url = `${environment.apiUrl}/auth/register`;
    return this.http.post<UserModel>(url, user, { headers: this.headers });
  }

  loginUser(user: any): Observable<UserModel> {
    const url = `${environment.apiUrl}/auth/login`;
    return this.http.post<UserModel>(url, user, { headers: this.headers });
  }

  setDataLogin(userData: any) {
    // console.log(userData);
    let user_string = JSON.stringify(userData.user);
    let token_string = JSON.stringify(userData.token);
    localStorage.setItem('user.data', user_string);
    localStorage.setItem('tk.access', token_string);
  }

  getUserData(): UserModel | null {
    let user_string = localStorage.getItem('user.data')!;
    if (user_string !== null || user_string !== undefined) {
      let user: UserModel = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }
  getAccessToken() {
    return JSON.parse(localStorage.getItem('tk.access')!);
  }

  logout() {
    localStorage.removeItem('user.data');
    localStorage.removeItem('tk.access');
    this.router.navigate(['/']);
  }
}

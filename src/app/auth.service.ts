import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/login';
  router: any;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }

  logout() {
    // Implementacija logike za odjavu, kao što je brisanje tokena, sesije itd.
    
    // Nakon odjave, preusmerite korisnika na početnu stranicu
    this.router.navigate(['/login']);
  }
  register(userData: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post('http://localhost:8080/register', userData);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
}

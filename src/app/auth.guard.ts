import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log('AuthGuard: provera tokena i uloge');
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
  
    console.log('Token iz localStorage:', token);
    console.log('Uloga korisnika:', user.role);
  
    if (token && user.role) {
      if ((route.data['role'] && route.data['role'] === user.role) || !route.data['role']) {
        console.log('Token i odgovarajuća uloga pronađeni, pristup dozvoljen');
        return true;
      } else {
        console.log('Pogrešna uloga, preusmeravanje na odgovarajući dashboard');
        this.router.navigate([`/${user.role}-dashboard`]);
        return false;
      }
    } else {
      console.log('Token ili uloga nisu pronađeni, preusmeravanje na login');
      this.router.navigate(['/login']);
      return false;
    }
  }
}  
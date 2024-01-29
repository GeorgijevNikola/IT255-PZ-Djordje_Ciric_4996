import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth.guard';
import { ProductComponent } from './product/product.component'; 
import { ONamaComponent } from './o-nama/o-nama.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { DodajKomponentuComponent } from './admin/dodaj-komponentu/dodaj-komponentu.component';
import { PregledKomponentiComponent } from './admin/pregled-komponenti/pregled-komponenti.component';
import { IzmeniKomponentuComponent } from './admin/izmeni-komponentu/izmeni-komponentu.component';

const routes: Routes = [
  { path: '', redirectTo: '/proizvodi', pathMatch: 'full' }, // Preusmeravanje na '/o-nama' pri pokretanju
  { path: 'o-nama', component: ONamaComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'admin/dodaj-komponentu', component: DodajKomponentuComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'admin/pregled-komponenti', component: PregledKomponentiComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'admin/izmeni-komponentu/:id', component: IzmeniKomponentuComponent , canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'proizvodi', component: ProductComponent }, 
  { path: '**', redirectTo: '/login' } // Preusmeravanje na '/login' za nepostojeće rute
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
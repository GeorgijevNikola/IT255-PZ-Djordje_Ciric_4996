import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { ProductComponent } from './product/product.component';
import { GuestNavbarComponent } from './guest-navbar/guest-navbar.component';
import { ONamaComponent } from './o-nama/o-nama.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { DodajKomponentuComponent } from './admin/dodaj-komponentu/dodaj-komponentu.component';
import { PregledKomponentiComponent } from './admin/pregled-komponenti/pregled-komponenti.component';
import { IzmeniKomponentuComponent } from './admin/izmeni-komponentu/izmeni-komponentu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    ProductComponent,
    GuestNavbarComponent,
    ONamaComponent,
    KontaktComponent,
    DodajKomponentuComponent,
    PregledKomponentiComponent,
    IzmeniKomponentuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

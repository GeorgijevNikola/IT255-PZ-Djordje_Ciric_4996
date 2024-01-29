import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          // Obrada uspešnog login-a
          if (response.user && response.user.role) {
            if (response.user.role === 'admin') {
              this.router.navigate(['/admin-dashboard']); // Preusmerite na admin dashboard
            } else if (response.user.role === 'user') {
              this.router.navigate(['/user-dashboard']);
            }

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user)); // Sačuvajte kor

          } else {
            // Uloga korisnika nije definisana
            Swal.fire({
              icon: 'error',
              title: 'Greška',
              text: 'Nedostaju informacije o ulozi korisnika.',
            });
          }
        },
        (error) => {
          // Obrada greške
          Swal.fire({
            icon: 'error',
            title: 'Greška pri prijavljivanju',
            text: 'Neispravni kredencijali ili korisnik ne postoji.',
          });
        }
      );
    } else {
      // Forma nije validna
      Swal.fire({
        icon: 'info',
        title: 'Nepotpuni podaci',
        text: 'Molimo vas da popunite sva polja forme.',
      });
    }
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; // Pretpostavljamo da imate AuthService
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
          // Sačuvajte token u localStorage
          localStorage.setItem('token', response.token);
  
          // Prikazivanje Swal obaveštenja o uspešnoj registraciji
          Swal.fire({
            title: 'Uspešna registracija!',
            text: 'Korisnik je uspešno registrovan.',
            icon: 'success',
            confirmButtonText: 'U redu',
          }).then((result) => {
            if (result.isConfirmed) {
              // Preusmeravanje na korisnički dashboard
              this.router.navigate(['/user-dashboard']);
            }
          });
        },
        (error) => {
          // Prikazivanje Swal obaveštenja o grešci
          Swal.fire({
            title: 'Greška!',
            text: 'Došlo je do greške pri registraciji.',
            icon: 'error',
            confirmButtonText: 'U redu',
          });
          console.error('Greška pri registraciji', error);
        }
      );
    } else {
      // Forma nije validna, prikažite odgovarajuću poruku
      Swal.fire({
        title: 'Nepotpuni podaci',
        text: 'Molimo vas da popunite sva polja forme.',
        icon: 'info',
        confirmButtonText: 'U redu',
      });
    }
  }  
}

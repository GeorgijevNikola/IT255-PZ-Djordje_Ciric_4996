import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Dodajte ovaj import

@Component({
  selector: 'app-dodaj-komponentu',
  templateUrl: './dodaj-komponentu.component.html',
  styleUrls: ['./dodaj-komponentu.component.css']
})
export class DodajKomponentuComponent implements OnInit {

  dodajKomponentuForm!: FormGroup;

  constructor(private http: HttpClient, private router: Router) { } 

  ngOnInit(): void {
    this.dodajKomponentuForm = new FormGroup({
      'componentName': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'price': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }

  onSubmit() {
    if (this.dodajKomponentuForm.valid) {
      this.http.post('http://localhost:8080/addComponent', this.dodajKomponentuForm.value)
        .subscribe(
          response => {
            console.log('Uspesno dodata komponenta!', response);
            this.router.navigate(['/admin/pregled-komponenti']); // Preusmeravanje na pregled komponenti
          },
          error => console.error('Doslo je do greske!', error)
        );
    }
  }
}
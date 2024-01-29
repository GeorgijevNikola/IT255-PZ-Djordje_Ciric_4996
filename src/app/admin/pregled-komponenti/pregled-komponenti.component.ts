import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregled-komponenti',
  templateUrl: './pregled-komponenti.component.html',
  styleUrls: ['./pregled-komponenti.component.css']
})
export class PregledKomponentiComponent implements OnInit {

  komponente: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.ucitajKomponente();
  }

  ucitajKomponente() {
    this.http.get('http://localhost:8080/getComponents')
      .subscribe(
        (response: any) => {
          this.komponente = response.data;
        },
        error => console.error('Doslo je do greske prilikom dohvatanja komponenti!', error)
      );
  }
  izmeni(id: number) {
    this.router.navigate(['/admin/izmeni-komponentu', id]);
  }

  obrisi(id: number) {
    this.http.delete(`http://localhost:8080/deleteComponent/${id}`)
      .subscribe(
        response => {
          console.log('Komponenta uspešno obrisana!', response);
          this.ucitajKomponente(); // Ponovo učitajte komponente nakon brisanja
        },
        error => console.error('Doslo je do greske prilikom brisanja komponente!', error)
      );
  }
}
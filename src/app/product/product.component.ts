import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any[] = []; // Promenljiva za čuvanje proizvoda
  randomImageSources: string[] = [ // Dodajte URL-ove slika ovde
    'https://i.ibb.co/KjGFHVJ/card1.png',
    'https://i.ibb.co/2cnshH6/card3.png',
    'https://i.ibb.co/G57P0Pb/card4.png',
    // Dodajte više URL-ova slika ovde
  ];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  this.getProducts().subscribe(
    response => {
      if (response && Array.isArray(response.data)) {
        this.products = response.data;
      } else {
        console.error('Odgovor sa servera nije u ispravnom formatu!');
      }
    },
    error => console.error('Došlo je do greške!', error)
  );
}

  getProducts(): Observable<any> {
    return this.http.get('http://localhost:8080/getComponents');
  }
  getRandomImage(): string {
    // Generišite slučajan broj da odaberete izvor slike
    const randomIndex = Math.floor(Math.random() * this.randomImageSources.length);
    return this.randomImageSources[randomIndex];
  }
}

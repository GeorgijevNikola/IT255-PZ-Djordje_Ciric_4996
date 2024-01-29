import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-izmeni-komponentu',
  templateUrl: './izmeni-komponentu.component.html',
  styleUrls: ['./izmeni-komponentu.component.css']
})
export class IzmeniKomponentuComponent implements OnInit {

  izmeniKomponentuForm!: FormGroup;
  currentId!: number; // ID trenutne komponente koja se menja

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentId = this.route.snapshot.params['id']; // Dohvatanje ID-a iz URL-a

    this.izmeniKomponentuForm = new FormGroup({
      'componentName': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'price': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });

    this.ucitajPodatkeKomponente();
  }

  ucitajPodatkeKomponente() {
    // HTTP GET zahtev da dohvati podatke komponente na osnovu ID-a
    this.http.get(`http://localhost:8080/getComponent/${this.currentId}`).subscribe(
      (response: any) => {
        const komponenta = response.data;
        this.izmeniKomponentuForm.patchValue({
          componentName: komponenta.componentName,
          description: komponenta.description,
          price: komponenta.price
        });
      },
      error => console.error('Doslo je do greske!', error)
    );
  }

  onSubmit() {
    if (this.izmeniKomponentuForm.valid) {
      this.http.put(`http://localhost:8080/editComponent/${this.currentId}`, this.izmeniKomponentuForm.value)
        .subscribe(
          response => {
            console.log('Komponenta uspešno izmenjena!', response);
            this.router.navigate(['/admin/pregled-komponenti']); // Preusmeravanje na pregled komponenti
          },
          error => console.error('Doslo je do greske!', error)
        );
    }
  }
}

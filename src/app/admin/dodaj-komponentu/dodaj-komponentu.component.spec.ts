import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajKomponentuComponent } from './dodaj-komponentu.component';

describe('DodajKomponentuComponent', () => {
  let component: DodajKomponentuComponent;
  let fixture: ComponentFixture<DodajKomponentuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodajKomponentuComponent]
    });
    fixture = TestBed.createComponent(DodajKomponentuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

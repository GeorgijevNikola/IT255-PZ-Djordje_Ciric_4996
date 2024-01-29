import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledKomponentiComponent } from './pregled-komponenti.component';

describe('PregledKomponentiComponent', () => {
  let component: PregledKomponentiComponent;
  let fixture: ComponentFixture<PregledKomponentiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PregledKomponentiComponent]
    });
    fixture = TestBed.createComponent(PregledKomponentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

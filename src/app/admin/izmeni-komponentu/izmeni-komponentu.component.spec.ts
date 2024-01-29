import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniKomponentuComponent } from './izmeni-komponentu.component';

describe('IzmeniKomponentuComponent', () => {
  let component: IzmeniKomponentuComponent;
  let fixture: ComponentFixture<IzmeniKomponentuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IzmeniKomponentuComponent]
    });
    fixture = TestBed.createComponent(IzmeniKomponentuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

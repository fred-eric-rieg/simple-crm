import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechnungsAdresseComponent } from './rechnungs-adresse.component';

describe('RechnungsAdresseComponent', () => {
  let component: RechnungsAdresseComponent;
  let fixture: ComponentFixture<RechnungsAdresseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechnungsAdresseComponent]
    });
    fixture = TestBed.createComponent(RechnungsAdresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

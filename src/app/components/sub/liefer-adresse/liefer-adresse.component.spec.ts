import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieferAdresseComponent } from './liefer-adresse.component';

describe('LieferAdresseComponent', () => {
  let component: LieferAdresseComponent;
  let fixture: ComponentFixture<LieferAdresseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LieferAdresseComponent]
    });
    fixture = TestBed.createComponent(LieferAdresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdukteDetailsComponent } from './produkte-details.component';

describe('ProdukteDetailsComponent', () => {
  let component: ProdukteDetailsComponent;
  let fixture: ComponentFixture<ProdukteDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdukteDetailsComponent]
    });
    fixture = TestBed.createComponent(ProdukteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

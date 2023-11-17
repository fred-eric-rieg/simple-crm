import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechnungErstellenComponent } from './rechnung-erstellen.component';

describe('RechnungErstellenComponent', () => {
  let component: RechnungErstellenComponent;
  let fixture: ComponentFixture<RechnungErstellenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechnungErstellenComponent]
    });
    fixture = TestBed.createComponent(RechnungErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahlungserinnerungComponent } from './zahlungserinnerung.component';

describe('ZahlungserinnerungComponent', () => {
  let component: ZahlungserinnerungComponent;
  let fixture: ComponentFixture<ZahlungserinnerungComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZahlungserinnerungComponent]
    });
    fixture = TestBed.createComponent(ZahlungserinnerungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

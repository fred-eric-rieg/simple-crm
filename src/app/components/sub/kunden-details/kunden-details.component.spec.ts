import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundenDetailsComponent } from './kunden-details.component';

describe('KundenDetailsComponent', () => {
  let component: KundenDetailsComponent;
  let fixture: ComponentFixture<KundenDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KundenDetailsComponent]
    });
    fixture = TestBed.createComponent(KundenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftraegeDetailsComponent } from './auftraege-details.component';

describe('AuftraegeDetailsComponent', () => {
  let component: AuftraegeDetailsComponent;
  let fixture: ComponentFixture<AuftraegeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuftraegeDetailsComponent]
    });
    fixture = TestBed.createComponent(AuftraegeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

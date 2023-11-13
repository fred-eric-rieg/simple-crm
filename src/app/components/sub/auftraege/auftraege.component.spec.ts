import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuftraegeComponent } from './auftraege.component';

describe('AuftraegeComponent', () => {
  let component: AuftraegeComponent;
  let fixture: ComponentFixture<AuftraegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuftraegeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuftraegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mahnung2Component } from './mahnung2.component';

describe('Mahnung2Component', () => {
  let component: Mahnung2Component;
  let fixture: ComponentFixture<Mahnung2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Mahnung2Component]
    });
    fixture = TestBed.createComponent(Mahnung2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

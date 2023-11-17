import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mahnung1Component } from './mahnung1.component';

describe('Mahnung1Component', () => {
  let component: Mahnung1Component;
  let fixture: ComponentFixture<Mahnung1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Mahnung1Component]
    });
    fixture = TestBed.createComponent(Mahnung1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { BtnSidenavDirective } from './btn-sidenav.directive';
import { ElementRef } from '@angular/core';

describe('BtnSidenavDirective', () => {
  it('should create an instance', () => {
    const el: ElementRef = new ElementRef('div');
    const directive = new BtnSidenavDirective(el);
    expect(directive).toBeTruthy();
  });
});

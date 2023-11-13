import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBtnSidenav]',
  standalone: true
})
export class BtnSidenavDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.width = '150px';
  }

}

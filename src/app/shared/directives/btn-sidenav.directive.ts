import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBtnSidenav]'
})
export class BtnSidenavDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.width = '150px';
    this.el.nativeElement.style.display = 'flex';
    this.el.nativeElement.style.justifyContent = 'start';
  }

}

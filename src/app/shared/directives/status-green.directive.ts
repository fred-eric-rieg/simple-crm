import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appStatusGreen]'
})
export class StatusGreenDirective {

  constructor(
    private ef: ElementRef
  ) {
    this.ef.nativeElement.style.color = 'white';
    this.ef.nativeElement.style.backgroundColor = 'green';
    this.ef.nativeElement.style.fontWeight = 'bold';
    this.ef.nativeElement.style.padding = '0.25rem 0.5rem';
  }

}

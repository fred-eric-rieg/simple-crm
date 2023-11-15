import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimal'
})
export class DecimalPipe implements PipeTransform {

  transform(value: number, ...args: string[]): string {
    return (Math.round((value) * 100) / 100).toFixed(2);
  }

}

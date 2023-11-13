import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortId'
})
export class SortIdPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

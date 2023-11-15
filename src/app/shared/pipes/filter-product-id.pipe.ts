import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

interface Produkt {
  id: number;
  fid: string;
  name: string;
  beschreibung: string;
  preis: number;
  erstellt: Timestamp;
  geaendert: Timestamp;
}

@Pipe({
  name: 'filterProductId'
})
export class FilterProductIdPipe implements PipeTransform {

  transform(value: Produkt[] | null, ...args: string[]): Produkt[] | null {
    if (value) {
      const filtered = value.filter((product: Produkt) => product.fid === args[0]);
      return filtered;
    }
    return null;
  }

}

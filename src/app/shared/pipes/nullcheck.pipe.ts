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
  name: 'nullcheck'
})
export class NullcheckPipe implements PipeTransform {

  transform(value: Produkt[] | null, ...args: unknown[]): Produkt[] | [] {
    if (value) {
      return value;
    }
    return [];
  }

}

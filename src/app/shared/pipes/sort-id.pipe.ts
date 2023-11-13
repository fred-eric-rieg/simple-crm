import { Pipe, PipeTransform } from '@angular/core';

interface Customer {
  id: number;
  vorname: string;
  nachname: string;
  unternehmen: string;
  email: string;
  telefon: string;
  strasse: string;
  plz: number;
  ort: string;
  anmerkungen: string;
  erstellt: Date;
  geaendert: Date;
}

@Pipe({
  name: 'sortId'
})
export class SortIdPipe implements PipeTransform {

  transform(value: Customer[] | null, ...args: string[]): Customer[] | null {
    if(!value) return null;
    if(args[0] === 'aufsteigend') {
      return value.sort((a: Customer, b: Customer) => a.id - b.id);
    } else if(args[0] === 'absteigend') {
      return value.sort((a: Customer, b: Customer) => b.id - a.id);
    }
    return null;
  }

}

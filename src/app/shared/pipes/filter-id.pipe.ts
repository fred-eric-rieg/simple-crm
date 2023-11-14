import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

interface Customer {
  id: number;
  fid: string;
  vorname: string;
  nachname: string;
  unternehmen: string;
  email: string;
  telefon: string;
  strasse: string;
  plz: number;
  ort: string;
  anmerkungen: string;
  erstellt: Timestamp;
  geaendert: Timestamp;
}

@Pipe({
  name: 'filterId'
})
export class FilterIdPipe implements PipeTransform {

  transform(value: Customer[] | null, ...args: string[]): Customer[] | null {
    if(value) {
      let filteredCustomers: Customer[] = [];
      value.forEach((customer: Customer) => {
        if(customer.fid == (args[0])) {
          filteredCustomers.push(customer);
        }
      });
      return filteredCustomers;
    }
    return null;
  }

}

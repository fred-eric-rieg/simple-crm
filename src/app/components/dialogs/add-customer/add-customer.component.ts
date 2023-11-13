import { Component, HostListener } from '@angular/core';

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
  land: string;
  anmerkungen: string;
  erstellt: Date;
  geaendert: Date;
}

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {

  windowWidth: number = 0;

  vorname: string = '';
  nachname: string = '';
  unternehmen: string = '';
  email: string = '';
  telefon: string = '';
  strasse: string = '';
  plz: string = '';
  ort: string = '';
  land: string = '';
  anmerkungen: string = '';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = window.innerWidth;
    console.log(this.windowWidth);
  }

  constructor() {
    this.windowWidth = window.innerWidth;
  }


  createCustomer() {
    console.log('createCustomer()');
  }

}

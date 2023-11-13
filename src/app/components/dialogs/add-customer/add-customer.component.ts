import { Component, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

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
  anmerkungen: string = '';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = window.innerWidth;
  }

  constructor(
    private dialogRef: MatDialogRef<AddCustomerComponent>,
    private fs: FirebaseService
  ) {
    this.windowWidth = window.innerWidth;
  }


  async createCustomer(element: any) {
    if (this.isStatusGreen()) {
      let length = this.fs.customers.getValue()?.length;
      length ? element.id = length + 1 : element.id = 1;
      let res = await this.fs.createCustomer(element);
      if (res) {
        console.log("Customer created");
        this.dialogRef.close();
      } else {
        console.log("Your mom again");
      }
    } else {
      console.log("Your mom")
    }
  }


  isStatusGreen() {
    if (this.vorname === '') return false;
    if (this.nachname === '') return false;
    if (this.unternehmen === '') return false;
    if (this.strasse === '') return false;
    if (this.plz === '') return false;
    if (this.ort === '') return false;
    return true;
  }


  async makeGanzViel() {
    await this.createDummyCustomers();
  }


  async createDummyCustomers() {
    let promises: any[] = [];

    for (let i = 0; i < 50; i++) {
      let customer: any = {
        id: 0,
        vorname: 'Max' + i,
        nachname: 'Mustermann' + i,
        unternehmen: 'Mustermann GmbH' + i,
        email: 'MaxMustermann' + i + '@mail.de',
        telefon: '0123456789',
        strasse: 'Musterstraße ' + i,
        plz: 12345,
        ort: 'Musterstadt' + i,
        anmerkungen: 'Musteranmerkung',
      }

      let length = this.fs.customers.getValue()?.length;
      length ? customer.id = length + 1 : customer.id = 1;

      promises.push(await this.fs.createCustomer(customer))
    }

    Promise.all(promises).then(() => {
      console.log("All customers created");
      this.dialogRef.close();
    });
  }

}

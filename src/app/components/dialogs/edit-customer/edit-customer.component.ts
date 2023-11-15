import { Component, HostListener, Inject } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

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
  erstellt: Date;
  geaendert: Date;
}

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent {

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
    private dialogRef: MatDialogRef<EditCustomerComponent>,
    private fs: FirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: Customer
  ) {
    this.windowWidth = window.innerWidth;
    this.vorname = data.vorname;
    this.nachname = data.nachname;
    this.unternehmen = data.unternehmen;
    this.email = data.email;
    this.telefon = data.telefon;
    this.strasse = data.strasse;
    this.plz = data.plz.toString();
    this.ort = data.ort;
    this.anmerkungen = data.anmerkungen;
  }


  async updateCustomer() {
    let customer = {
      id: this.data.id,
      fid: this.data.fid,
      vorname: this.vorname,
      nachname: this.nachname,
      unternehmen: this.unternehmen,
      email: this.email,
      telefon: this.telefon,
      strasse: this.strasse,
      plz: parseInt(this.plz),
      ort: this.ort,
      anmerkungen: this.anmerkungen,
      erstellt: this.data.erstellt,
      geaendert: Timestamp.fromDate(new Date())
    }
    if (this.isStatusGreen()) {
      let res = await this.fs.updateCustomer(customer);
      if (res) {
        console.log("Customer updated");
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
}

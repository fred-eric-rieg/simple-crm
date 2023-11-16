import { Component, HostListener, Inject } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

interface Address {
  fid: string;
  kunde: string;
  vorname: string;
  nachname: string;
  unternehmen: string;
  strasse: string;
  plz: number;
  ort: string;
  anmerkungen: string;
  erstellt: Timestamp;
  geaendert: Timestamp;
}

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent {
  windowWidth: number = window.innerWidth;

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
    private dialogRef: MatDialogRef<EditAddressComponent>,
    private fs: FirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.vorname = data[1].vorname;
    this.nachname = data[1].nachname;
    this.unternehmen = data[1].unternehmen;
    this.email = data[1].email;
    this.telefon = data[1].telefon;
    this.strasse = data[1].strasse;
    this.plz = data[1].plz;
    this.ort = data[1].ort;
    this.anmerkungen = data[1].anmerkungen;
  }


  async updateAddress() {
    let address: Address = {
      fid: this.data[1].fid,
      kunde: this.data[1].kunde,
      vorname: this.vorname,
      nachname: this.nachname,
      unternehmen: this.unternehmen,
      strasse: this.strasse,
      plz: parseInt(this.plz),
      ort: this.ort,
      anmerkungen: this.anmerkungen,
      erstellt: this.data[1].erstellt,
      geaendert: Timestamp.fromDate(new Date())
    }
    let res = await this.fs.updateAddress(address, this.data[0]);
    if (res) this.dialogRef.close();
    else console.log('Fehler beim Speichern!');
  }
}

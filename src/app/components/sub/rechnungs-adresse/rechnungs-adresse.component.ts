import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Timestamp, Unsubscribe } from '@angular/fire/firestore';
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
  erstellt: Timestamp;
  geaendert: Timestamp;
}

interface Address {
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
  selector: 'app-rechnungs-adresse',
  templateUrl: './rechnungs-adresse.component.html',
  styleUrls: ['./rechnungs-adresse.component.scss']
})
export class RechnungsAdresseComponent implements OnInit, OnDestroy {

  unsub!: Promise<Unsubscribe>;

  @Input() kunde: Customer = {} as Customer;


  constructor(public fs: FirebaseService) { }

  /**
   * Call data with listener and store in unsub.
   */
  ngOnInit(): void {  
    this.unsub = this.fs.getInvoiceAddress(this.kunde.fid);
  }

  /**
   * Unsubscribe from listener.
   */
  ngOnDestroy(): void {
    this.unsub.then(unsub => unsub());
  }


  formatDate(date: Timestamp) {
    return date.toDate();
  }


  openDialog() {
    console.log('openDialog');
  }
}

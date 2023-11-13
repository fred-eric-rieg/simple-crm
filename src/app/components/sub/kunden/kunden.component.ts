import { Component } from '@angular/core';
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
  land: string;
  anmerkungen: string;
  erstellt: Date;
  geaendert: Date;
}

@Component({
  selector: 'app-kunden',
  templateUrl: './kunden.component.html',
  styleUrls: ['./kunden.component.scss']
})
export class KundenComponent {

  constructor(public fs: FirebaseService) { }


  formatDate(timestamp: any) {
    const date = timestamp.toDate();
    return date.toLocaleDateString('de-DE');
  }

}

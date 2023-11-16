import { Component, Input } from '@angular/core';
import { Timestamp, Unsubscribe } from '@angular/fire/firestore';
import { Subscription, Unsubscribable } from 'rxjs';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { EditAddressComponent } from '../../dialogs/edit-address/edit-address.component';
import { MatDialog } from '@angular/material/dialog';

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
  selector: 'app-liefer-adresse',
  templateUrl: './liefer-adresse.component.html',
  styleUrls: ['./liefer-adresse.component.scss']
})
export class LieferAdresseComponent {

  unsub!: Promise<Unsubscribe>;

  @Input() kunde: Customer = {} as Customer;


  constructor(
    public fs: FirebaseService,
    private dialog: MatDialog
  ) { }

  /**
   * Call data with listener and store in unsub.
   */
  ngOnInit(): void {
    this.unsub = this.fs.getDeliveryAddress(this.kunde.fid);
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


  openDialog(address: Address) {
    const dialogRef = this.dialog.open(EditAddressComponent, {
      data: ['lieferadressen', address],
      height: 'fit-content',
    });
    const sub = dialogRef.afterClosed().subscribe(result => {

    });
  }


}

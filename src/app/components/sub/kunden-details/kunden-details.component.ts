import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { EditCustomerComponent } from '../../dialogs/edit-customer/edit-customer.component';

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

@Component({
  selector: 'app-kunden-details',
  templateUrl: './kunden-details.component.html',
  styleUrls: ['./kunden-details.component.scss']
})
export class KundenDetailsComponent {

  customer: string = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog,
    public fs: FirebaseService,) {
    this.route.params.subscribe(params => {
      this.customer = params['id'];
    });
  }

  
  formatDate(date: Timestamp) {
    return date.toDate();
  }


  openDialog(kunde: Customer) {
    const dialogRef = this.dialog.open(EditCustomerComponent, {
      data: kunde,
      height: 'fit-content',
    });
    const sub = dialogRef.afterClosed().subscribe(result => {

    });
  }

}

import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { EditProductComponent } from '../../dialogs/edit-product/edit-product.component';

interface Produkt {
  id: number;
  fid: string;
  name: string;
  beschreibung: string;
  preis: number;
  erstellt: Timestamp;
  geaendert: Timestamp;
}

@Component({
  selector: 'app-produkte-details',
  templateUrl: './produkte-details.component.html',
  styleUrls: ['./produkte-details.component.scss']
})
export class ProdukteDetailsComponent {
  product: string = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog,
    public fs: FirebaseService,) {
    this.route.params.subscribe(params => {
      this.product = params['id'];
    });
  }


  formatDate(date: Timestamp) {
    return date.toDate();
  }


  formatPrice(price: number) {
    return (Math.round((price) * 100) / 100).toFixed(2);
  }
  

  openDialog(product: Produkt) {
    const dialogRef = this.dialog.open(EditProductComponent, {
      data: product,
      height: 'fit-content',
    });
    const sub = dialogRef.afterClosed().subscribe(result => {

    });
  }

}

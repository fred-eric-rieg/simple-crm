import { Component, HostListener, Inject } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

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
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  windowWidth: number = window.innerWidth;

  id: number = this.data.id;
  name: string = this.data.name;
  beschreibung: string = this.data.beschreibung;
  preis: string = this.data.preis.toString();

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = window.innerWidth;
  }

  constructor(
    private dialogRef: MatDialogRef<EditProductComponent>,
    public fs: FirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: Produkt
  ) {
    this.windowWidth = window.innerWidth;
  }


  async updateProduct() {
    if (this.isStatusGreen()) {
      let product: any = {
        id: this.id,
        fid: this.data.fid,
        name: this.name,
        beschreibung: this.beschreibung,
        preis: Number(this.preis)
      }
      let res = await this.fs.updateProduct(product);
      if (res) {
        console.log("Product updated");
        this.dialogRef.close();
      } else {
        console.log("Your mom again");
      }
    } else {
      console.log("Your mom")
    }
  }


  isStatusGreen() {
    if (this.id === null) return false;
    if (this.name === '') return false;
    if (this.preis === null) return false;
    return true;
  }
}

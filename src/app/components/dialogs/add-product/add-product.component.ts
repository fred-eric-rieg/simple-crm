import { Component, HostListener } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  windowWidth: number = 0;

  id: number = 1;
  name: string = '';
  beschreibung: string = '';
  preis: string = '';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = window.innerWidth;
  }

  constructor(
    private dialogRef: MatDialogRef<AddProductComponent>,
    public fs: FirebaseService,
  ) {
    this.windowWidth = window.innerWidth;
    let length = this.fs.products.getValue()?.length;
    length ? this.id = length + 1 : this.id = 1;
  }


  async createTask() {
    if (this.isStatusGreen()) {
      let product: any = {
        id: 0,
        fid: '',
        name: this.name,
        beschreibung: this.beschreibung,
        preis: Number(this.preis)
      }
      let length = this.fs.products.getValue()?.length;
      length ? product.id = length + 1 : product.id = 1;
      let res = await this.fs.createProduct(product);
      if (res) {
        console.log("Product created");
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

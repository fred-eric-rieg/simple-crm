import { Component, HostListener, Inject } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

interface Task {
  id: number;
  fid: string;
  unternehmen: string;
  anmerkungen: string;
  erstellt: Timestamp;
  geaendert: Timestamp;
  deadline: Timestamp;
  wert: number;
  posten: Posten[];
}

interface Posten {
  anzahl: number;
  produkt: string;
}

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {
  windowWidth: number = 0;

  id: number = this.data.id;
  unternehmen: string = this.data.unternehmen;
  anmerkungen: string = this.data.anmerkungen;
  posten: Posten[] = this.data.posten;
  deadline: Date = this.data.deadline.toDate();

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = window.innerWidth;
  }

  constructor(
    private dialogRef: MatDialogRef<EditTaskComponent>,
    public fs: FirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.windowWidth = window.innerWidth;
  }


  async updateTask() {
    if (this.isStatusGreen()) {
      let task: any = {
        fid: '',
        unternehmen: this.unternehmen,
        anmerkungen: this.anmerkungen,
      }
      let res = await this.fs.updateTask(task);
      if (res) {
        console.log("Task updated");
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
    if (this.unternehmen === '') return false;
    if (this.anmerkungen === '') return false;
    return true;
  }

  /**
   * Finds the name of the product by its id.
   * @param product as string
   * @returns string
   */
  getProduct(product: string) {
    let name: string = '';
    this.fs.products.getValue()?.forEach((p: any) => {
      if (p.fid == product) {
        name = p.name;
      }
    });
    return name;
  }

  /**
   * Listens to the event emitted by the product selector.
   * @param event any
   */
  onPostenChange(event: any) {
    this.posten.length = 0;
    event.forEach((e: any) => {
      let posten: Posten = {
        anzahl: 1,
        produkt: e
      }
      this.posten.push(posten);
    });
  }


  updateCounter(event: any, index: number) {
    this.posten[index].anzahl = event.target.valueAsNumber;
  }

  /**
   * Extracts the product ids from the posten array.
   * @returns Array of product ids
   */
  getProductIds() {
    return this.data.posten.map((p: any) => {
      return p.produkt;
    });
  }


}

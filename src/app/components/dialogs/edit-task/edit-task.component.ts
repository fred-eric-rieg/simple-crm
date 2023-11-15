import { AfterViewInit, Component, HostListener, Inject, ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatOption } from '@angular/material/core';
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
  status: string;
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
export class EditTaskComponent implements AfterViewInit {
  windowWidth: number = 0;

  newTask: Task = {
    id: this.data.id,
    fid: this.data.fid,
    unternehmen: this.data.unternehmen,
    anmerkungen: this.data.anmerkungen,
    deadline: this.data.deadline,
    posten: this.data.posten,
    wert: this.data.wert,
    status: this.data.status,
    erstellt: this.data.erstellt,
    geaendert: this.data.geaendert,
  }

  deadline: Date = this.data.deadline.toDate();

  changeCounter: number = this.data.posten.length;


  @ViewChild('multiSelect') multiSelect: any;

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


  ngAfterViewInit() {
    this.multiSelect.options.forEach((o: MatOption) => {
      this.newTask.posten.forEach((p: Posten) => {
        if (o.value == p.produkt) {
          o.select();
        }
      });
    });
  }


  async updateTask() {
    if (this.isStatusGreen()) {
      let task: Task = {
        id: this.newTask.id,
        fid: this.newTask.fid,
        unternehmen: this.newTask.unternehmen,
        anmerkungen: this.newTask.anmerkungen,
        status: this.newTask.status,
        posten: this.newTask.posten,
        wert: this.newTask.wert,
        erstellt: this.newTask.erstellt,
        deadline: Timestamp.fromDate(this.deadline),
        geaendert: Timestamp.fromDate(new Date()),
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
    if (this.newTask.id === null) return false;
    if (this.newTask.unternehmen === '') return false;
    if (this.newTask.anmerkungen === '') return false;
    if (this.newTask.deadline === null) return false;
    if (this.newTask.posten.length === 0) return false;
    if (this.newTask.status === '') return false;
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
   * On each change of the multiselect, the new task's posten array is updated.
   * @param e as string array
   */
  onChangeProduct(e: string[]) {
    this.changeCounter--;
    // All transfered values will be retained, otherwise the array will be overwritten.
    if (this.changeCounter < 0) {
      this.newTask.posten = [];
      e.forEach(fid => {
        let pos: Posten = {
          anzahl: 1,
          produkt: ''
        }
        pos.produkt = fid;
        this.newTask.posten.push(pos);
      });
    }
  }

  /**
     * Removes a product from the new task's posten array and deselects it in the multiselect.
     * @param i as index number
     * @param fid as id of the product
     */
  removePosten(i: number, fid: string) {
    this.newTask.posten.splice(i, 1);
    this.multiSelect.options.forEach((o: MatOption) => {
      if (o.value == fid) {
        o.deselect();
      }
    });
  }
}

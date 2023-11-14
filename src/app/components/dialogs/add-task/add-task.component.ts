import { Component, HostListener } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  windowWidth: number = 0;

  id: number = 0;
  posten: Posten[] = [];
  unternehmen: string = '';
  anmerkungen: string = '';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = window.innerWidth;
  }

  constructor(
    private dialogRef: MatDialogRef<AddTaskComponent>,
    public fs: FirebaseService,
  ) {
    this.windowWidth = window.innerWidth;
    let length = this.fs.tasks.getValue()?.length;
    length ? this.id = length + 1 : this.id = 1;
  }


  async createTask() {
    if (this.isStatusGreen()) {
      let task: any = {
        id: 0,
        fid: '',
        posten: this.posten,
        unternehmen: this.unternehmen,
        anmerkungen: this.anmerkungen,
        erstellt: Timestamp.now(),
        geaendert: Timestamp.now()
      }
      let length = this.fs.tasks.getValue()?.length;
      length ? task.id = length + 1 : task.id = 1;
      let res = await this.fs.createTask(task);
      if (res) {
        console.log("Task created");
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
    if (this.posten.length === 0) return false;
    return true;
  }


  getProduct(product: string) {
    let name: string = '';
    this.fs.products.getValue()?.forEach((p: any) => {
      if (p.fid == product) {
        name = p.name;
      }
    });
    return name;
  }


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
}

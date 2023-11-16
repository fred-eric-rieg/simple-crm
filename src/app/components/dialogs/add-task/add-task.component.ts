import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatOption } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

interface Task {
  title: string;
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
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements AfterViewInit {
  windowWidth: number = window.innerWidth;

  newTask: Task = {
    title: '',
    id: 0,
    fid: '',
    unternehmen: '',
    anmerkungen: '',
    deadline: Timestamp.fromDate(new Date()),
    posten: [],
    wert: 0,
    status: 'in Bearbeitung',
    erstellt: Timestamp.fromDate(new Date()),
    geaendert: Timestamp.fromDate(new Date()),
  }

  @ViewChild('multiSelect') multiSelect: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = window.innerWidth;
  }

  constructor(
    private dialogRef: MatDialogRef<AddTaskComponent>,
    public fs: FirebaseService,
  ) {
    this.windowWidth = window.innerWidth;
  }


  ngAfterViewInit(): void {
      console.log(this.multiSelect);
  }


  async createTask() {
    let task: any = {
      title: this.newTask.title,
      id: 0,
      fid: '',
      posten: this.newTask.posten,
      deadline: this.newTask.deadline,
      unternehmen: this.newTask.unternehmen,
      anmerkungen: this.newTask.anmerkungen,
      status: this.newTask.status,
      erstellt: Timestamp.fromDate(new Date()),
      geaendert: Timestamp.fromDate(new Date())
    }
    console.log(task);
    let length = this.fs.tasks.getValue()?.length;
    length ? task.id = length + 1 : task.id = 1;
    let res = await this.fs.createTask(task);
    if (res) {
      console.log("Task created");
      this.dialogRef.close();
    } else {
      console.log("Your mom again");
    }
  }

  /**
   * On each change of the multiselect, the new task's posten array is updated.
   * @param e as string array
   */
  onChangeProduct(e: string[]) {
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

  /**
   * Replaces a product id with its name.
   * @param pos as Posten
   * @returns a string
   */
  getProduct(pos: string) {
    let name: string = '';
    this.fs.products.getValue()?.forEach((p: any) => {
      if (p.fid == pos) {
        name = p.name;
      }
    });
    return name;
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

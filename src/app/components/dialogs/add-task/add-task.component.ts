import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
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
export class AddTaskComponent implements AfterViewInit {
  windowWidth: number = 0;

  newTask: Task = {
    id: 0,
    fid: '',
    unternehmen: '',
    anmerkungen: '',
    deadline: Timestamp.fromDate(new Date()),
    posten: [],
    wert: 0,
    erstellt: Timestamp.fromDate(new Date()),
    geaendert: Timestamp.fromDate(new Date()),
  }

  prodIds: string[] = [];

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
      id: 0,
      fid: '',
      posten: this.newTask.posten,
      deadline: Timestamp.fromDate(new Date()),
      unternehmen: this.newTask.unternehmen,
      anmerkungen: this.newTask.anmerkungen,
      erstellt: Timestamp.fromDate(new Date()),
      geaendert: Timestamp.fromDate(new Date())
    }
    console.log(task);
    let length = this.fs.tasks.getValue()?.length;
    length ? task.id = length + 1 : task.id = 1;
    /**let res = await this.fs.createTask(task);
    if (res) {
      console.log("Task created");
      this.dialogRef.close();
    } else {
      console.log("Your mom again");
    }**/
  }


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


  removePosten(i: number) {
    this.newTask.posten.splice(i, 1);
  }

}

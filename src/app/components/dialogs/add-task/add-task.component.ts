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
  posten: string[];
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  windowWidth: number = 0;

  id: number = 0;
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
  }


  async createTask() {
    if (this.isStatusGreen()) {
      let task: any = {
        id: 0,
        fid: '',
        unternehmen: this.unternehmen,
        anmerkungen: this.anmerkungen,
        erstellt: Timestamp.now(),
        geaendert: Timestamp.now()
      } 
      let length = this.fs.tasks.getValue()?.length;
      length ? task.id = length + 1 : task.id = 1;
      let res = await this.fs.createTask(task);
      if (res) {
        console.log("Customer created");
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
}

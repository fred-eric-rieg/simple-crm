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
  posten: string[];
}

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {
  windowWidth: number = 0;

  id: number = 0;
  unternehmen: string = '';
  anmerkungen: string = '';

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

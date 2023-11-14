import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { EditTaskComponent } from '../../dialogs/edit-task/edit-task.component';

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
  selector: 'app-auftraege-details',
  templateUrl: './auftraege-details.component.html',
  styleUrls: ['./auftraege-details.component.scss']
})
export class AuftraegeDetailsComponent {
  task: string = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog,
    public fs: FirebaseService,) {
    this.route.params.subscribe(params => {
      this.task = params['id'];
    });
  }

  
  formatDate(date: Timestamp) {
    return date.toDate();
  }


  formatCustomer(customer: string) {
    let name = "";
    this.fs.customers.getValue()?.forEach(c => {
      if (c.fid === customer) {
        name = c.unternehmen;
      }
    });
    return name;
  }
  

  openDialog(task: Task) {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: task,
      height: 'fit-content',
    });
    const sub = dialogRef.afterClosed().subscribe(result => {

    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  constructor(
    private fs: FirebaseService
    ) {}

  ngOnInit() {
    this.fs.getAllCustomers();
    this.fs.getAllTasks();
    this.fs.getAllProducts();
  }

}

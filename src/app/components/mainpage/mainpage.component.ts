import { Component, HostListener, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {

  windowWidth: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = window.innerWidth;
  }

  constructor(private fs: FirebaseService) {
    this.windowWidth = window.innerWidth;
  }

  ngOnInit() {
    this.fs.getAllCustomers();
  }

}

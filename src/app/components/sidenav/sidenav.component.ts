import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/shared/services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnDestroy, OnInit {

  showFiller = false;

  @ViewChild('snav') snav: any;

  constructor(
    private snavservice: SidenavService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {
    this.snavservice.snav = this.snav;
  }


  open(url: string) {
    this.router.navigate([url]);
    // Auto close sidenav on mobile
    if (window.innerWidth < 600) {
      console.log(window.innerWidth)
      this.snav.toggle();
      this.snavservice.toggled = !this.snavservice.toggled;
    }
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/shared/services/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(
    public snavservice: SidenavService,
    private router: Router) { }


  toggleSidenav() {
    this.snavservice.snav.toggle();
    this.snavservice.toggled = !this.snavservice.toggled;
  }

  open(url: string) {
    this.router.navigate([url]);
  }

}

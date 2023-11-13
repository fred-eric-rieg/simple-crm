import { Component } from '@angular/core';
import { SidenavService } from 'src/app/shared/services/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(public snavservice: SidenavService) { }


  toggleSidenav() {
    this.snavservice.snav.toggle();
    this.snavservice.toggled = !this.snavservice.toggled;
  }

}

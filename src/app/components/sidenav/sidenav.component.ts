import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy, OnInit {

  showFiller = false;

  @ViewChild('snav') snav: any;


  constructor(
    public snavservice: SidenavService,
    private router: Router,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {
    this.snavservice.snav = this.snav;
  }


  open(url: string) {
    this.router.navigate([url]);
    this.snav.toggle();
    this.snavservice.toggled = !this.snavservice.toggled;
  }

  toggle() {
    this.snav.toggle();
    this.snavservice.toggled = !this.snavservice.toggled;
  }


  changeTheme() {
    this.themeService.darkTheme = !this.themeService.darkTheme;
    let theme = this.themeService.darkTheme ? 'pink-bluegrey' : 'indigo-pink';
    this.themeService.setTheme(theme);
  }

}

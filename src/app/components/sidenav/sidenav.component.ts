import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
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
    private themeService: ThemeService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {
    this.snavservice.snav = this.snav;
  }


  open(url: string) {
    this.router.navigate(["main/"+url]);
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


  async logout() {
    await this.loginService.logout();
    this.loginService.isAuth().then((user) => {
      user === null ? this.router.navigateByUrl("login") : this.router.navigateByUrl("main/dashboard");
    }).catch((err) => {
      console.log(err);
      this.router.navigateByUrl("login");
    });
  }
}

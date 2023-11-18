import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(
    public snavservice: SidenavService,
    private router: Router,
    public themeService: ThemeService,
    private loginService: LoginService
    ) { }


  toggleSidenav() {
    this.snavservice.snav.toggle();
    this.snavservice.toggled = !this.snavservice.toggled;
  }

  open(url: string) {
    this.router.navigate(["main/"+url]);
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

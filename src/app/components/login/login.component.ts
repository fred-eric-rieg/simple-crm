import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  firestore: Firestore = inject(Firestore);
  
  loginForm: any;

  
  constructor(
    private loginService: LoginService,
    private router: Router
    ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  async login() {
    let res = await this.loginService.login(this.loginForm.value.username, this.loginForm.value.password);
    this.loginService.isAuth().then((user) => {
      user === res ? this.router.navigateByUrl("main/dashboard") : console.log("not logged in");
    }).catch((err) => {
      console.log(err);
    });
  }
}

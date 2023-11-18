import { inject } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { FirebaseService } from './services/firebase.service';


export const authguardGuard: CanActivateFn = async (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const firebase = inject(FirebaseService);

  const auth = getAuth();
  const user = auth.currentUser;

  let userLogged = await loginService.isAuth();
  if (user === null) {
    if (userLogged !== null) {
      return true;
    } else {
      router.navigateByUrl("login");
      return false;
    }
  }
  return true;
};
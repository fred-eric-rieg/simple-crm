import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  async login(email: string, password: string) {
    const auth = getAuth();
    let res = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return errorMessage;
      });

    return res;
  }


  async isAuth() {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject(null);
        }
      });
    });
  }


  async logout() {
    const auth = getAuth();
    await auth.signOut();
  }

}

import { Injectable } from '@angular/core';
import { StylemanagerService } from './stylemanager.service';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  darkTheme: boolean = false;

  constructor(
    private styleManager: StylemanagerService
  ) {}
 
 
  setTheme(themeToSet: string) {
    if (themeToSet === 'pink-bluegrey') {
      this.darkTheme = true;
    } else {
      this.darkTheme = false;
    }
    this.styleManager.setStyle(
      "theme",
      `../assets/${themeToSet}.css`
    );
  }
}


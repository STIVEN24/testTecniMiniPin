import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeThemeService {

  private themeSource = new BehaviorSubject<string>("null");
  currentTheme = this.themeSource.asObservable();

  constructor() {
    if (!!localStorage.getItem('theme')) {
      this.changeTheme(localStorage.getItem('theme'))
    }
  }

  changeTheme(theme: string) {
    localStorage.setItem('theme', theme);
    this.themeSource.next(theme)
  }

}
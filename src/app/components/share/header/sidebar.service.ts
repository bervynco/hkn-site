import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private menuState = new BehaviorSubject<boolean>(false);  // Default state is closed
  currentMenuState = this.menuState.asObservable();

  constructor() {}

  setMenuState(state: boolean): void {
    this.menuState.next(state);  // Update state
  }

  getMenuState(): boolean {
    return this.menuState.value;  // Get current state
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarToggleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public sidebarToggle$ = this.sidebarToggleSubject.asObservable();

  toggleSidebar() : void {
    this.sidebarToggleSubject.next(!this.sidebarToggleSubject.value);
  }
}

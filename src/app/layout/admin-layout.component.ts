import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [SidebarComponent],
  template: `
    <app-sidebar />
  `,
  styles: ``
})
export class AdminLayoutComponent {

}

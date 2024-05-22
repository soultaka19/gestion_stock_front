import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [SidebarComponent, RouterOutlet]
})
export class DashboardComponent  {
}

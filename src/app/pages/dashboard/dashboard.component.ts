import { Component, inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent  {


  userInfos = inject(AuthService).currentUser.pipe(
    tap((user) => {
      console.log('user', user);
    })
  ).subscribe();
  
}

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  unsubscribe$!: Subject<boolean>;
  authService = inject(AuthService);

  ngOnInit(): void {
    console.log("isLogges",this.authService.isLogged());
    this.unsubscribe$ = new Subject<boolean>();
    this.authService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        console.log('utilisateur actuel', user);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }
}

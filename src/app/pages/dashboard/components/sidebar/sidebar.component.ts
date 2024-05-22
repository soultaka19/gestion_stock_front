import { AfterViewInit, Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../services/sidebar.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    NavbarComponent,
    RouterOutlet,
    RouterModule,
    MatToolbarModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  private sidebarService = inject(SidebarService);
  toggleSubscrition!: Subscription;

  ngAfterViewInit(): void {
    this.toggleSubscrition = this.sidebarService.sidebarToggle$.subscribe((open) => {
        setTimeout(() => {
          this.sidenav.opened = open;
        });
    });
  }


  ngOnDestroy(): void {
    this.toggleSubscrition.unsubscribe();
  }
}

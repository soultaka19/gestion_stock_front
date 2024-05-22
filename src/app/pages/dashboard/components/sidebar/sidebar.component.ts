import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';

export type MenuItem = {
  libelle: string;
  route: string;
  icon: string;
}

/** @title Responsive sidenav */
@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule,
     MatListModule, RouterOutlet, RouterModule
  ],
})



export class SidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  
  menuIems = signal<MenuItem[]>([
    {
      libelle: "products",
      route: "/dashboard/product",
      icon: "add_shopping_cart"
    },
    {
      libelle: "fournisseurs",
      route: "/dashboard/fournisseur",
      icon: "local_shipping"
    },
    {
      libelle: "categories",
      route: "/dashboard/category",
      icon: "category"
    },
    {
      libelle: "users",
      route: "/dashboard/user",
      icon: "person"
    },
  ]);

  collapsed = signal(false);
  sidenavWidth = computed(() =>(this.collapsed() ? "65px" : "250px" ));

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { filter, map, mergeMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eclat_du_textile';

  showHeader = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // Abonnez-vous aux événements de navigation pour déterminer si le header doit être affiché
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route) => route.data) // Accédez aux données de la route active
      )
      .subscribe((data) => {
        this.showHeader = data['showHeader'] !== false; // Défaut : header affiché
      });
  }
}

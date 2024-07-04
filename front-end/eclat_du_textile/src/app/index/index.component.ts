import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryArticleService } from '../shared/services/category-article.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  categoryArticle$ = inject(CategoryArticleService).fetchAllCategoryArticle();

  authService = inject(AuthService);

  logout() {
  this.authService.logout();
  }
}

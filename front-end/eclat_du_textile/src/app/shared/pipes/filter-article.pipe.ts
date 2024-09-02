import { Pipe, PipeTransform } from '@angular/core';
import { CategoryArticle } from '../interfaces/entities';

@Pipe({
  name: 'isSubArticle',
  standalone: true
})
export class FilterArticlePipe implements PipeTransform {

  transform(articles: CategoryArticle[]): CategoryArticle[] {
    return articles.filter(product => product.subcategory_article !== undefined);
  }

}

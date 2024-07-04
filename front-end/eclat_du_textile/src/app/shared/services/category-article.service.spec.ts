import { TestBed } from '@angular/core/testing';
import { CategoryArticleService } from './category-article.service';

describe('CategoryArticleService', () => {
  let service: CategoryArticleService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

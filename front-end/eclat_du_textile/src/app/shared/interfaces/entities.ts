export interface categoryArticleEntitie {
  id: number,
  name_category_article: string,
  categoryArticles: [],
  items: []
}

export interface ICredentials {
  username: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface IUser {
  username: string;
  password: string;
}
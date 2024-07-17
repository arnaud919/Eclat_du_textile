export interface ApiListResponse {
  '@id': string;
  'hydra:totalItems': number;
  'hydra:member': [];
}

export interface categoryArticleEntitie {
  id: number,
  name_category_article: string,
  categoryArticles: [],
  items: []
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface IUser {
  email: string;
  password: string;
}

export interface ServiceProvision {
    "@id": string,
    "@type": string,
    id: number,
    name_service: string,
    price_service: number,
    items: [],
    description: string,
}
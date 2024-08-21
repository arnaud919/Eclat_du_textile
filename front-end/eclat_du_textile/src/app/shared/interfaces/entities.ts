export interface ApiListResponse {
  '@id': string;
  'hydra:totalItems': number;
  'hydra:member': [];
}
export interface Credentials {
  email: string;
  password: string;
}

export interface Token {
  token: string;
}

export interface ConnectUser {
  email: string;
  password: string;
}

export interface ServiceProvision {
  "@context": string,
  "@id": string,
  "@type": string,
  "id": number,
  "name_service": string,
  "price_service": number,
  "items": [],
  "description": string,
  "image_service": string
}

export interface CategoryArticle {
  "@context": string,
  "@id": string,
  "@type": string,
  id: number,
  name_category_article: string,
  subcategory_article: string,
  categoryArticles: [],
  items: [],
  multiplier_price: number
}

export interface ServiceProvision {
  "@id": string,
  "@type": string,
  id: number,
  name_service: string,
  price_service: number,
  items: [],
  description: string,
  image_service: string
}

export interface Color {
  "@context": string,
  "@id": string,
  "@type": string,
  id: number,
  name_color: string,
  items: []
}

export interface CustomerOrder {
  "@context": string,
  "@id": string,
  "@type": string,
  id: 0,
  user: string,
  date_order: Date,
  end_date_order: Date,
  items: []
}

export interface Item {
  "@context": string,
  "@id": string,
  "@type": string,
  id: 0,
  name_item: string,
  category_article: string,
  type_material: string,
  color: string,
  service: string,
  customer_order: string,
  price_service: 0,
  multiplier_price: 0
}

export interface TypeMaterial{
  "@context": string,
  "@id": string,
  "@type": string,
  id: 0,
  name_type_material: string,
  items: []
}
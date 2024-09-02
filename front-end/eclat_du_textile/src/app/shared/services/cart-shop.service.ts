import { Injectable, signal } from '@angular/core';
import { Item, PostItem } from '../interfaces/entities';

@Injectable({
  providedIn: 'root'
})
export class CartShopService {

  private itemCart:Item[] = [];
  private itemList: [] = [];

  addToCart(item:Item): void {
    const existingItem = this.itemCart.find(cartItem => cartItem.id === item.id);
    if (!existingItem) {
      this.itemCart.push(item);
    }
  }

  getCartItems(): Item[] {
    return this.itemCart;
  }

  removeFromCart(item: Item): void {
    this.itemCart = this.itemCart.filter(itemCart => itemCart.id !== item.id);
  }

  clearCart(): void {
    this.itemCart = [];
  }
}

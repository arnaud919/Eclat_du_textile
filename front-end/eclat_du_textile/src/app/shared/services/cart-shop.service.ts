import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartShopService {
  private panierKey = 'serviceProvisionData';

  // Récupérer le panier depuis le sessionStorage
  getPanier(): any {
    const storedPanier = sessionStorage.getItem(this.panierKey);
    return storedPanier ? JSON.parse(storedPanier) : { items: [], coordinates: null, payment: null };
  }

  // Mettre à jour les données du panier (articles, coordonnées, paiement)
  updatePanierData(items: any[], coordinates: any = null, payment: any = null): void {
    const panier = { items, coordinates, payment };
    sessionStorage.setItem(this.panierKey, JSON.stringify(panier));
  }

  // Vider le panier après confirmation
  clearPanier(): void {
    sessionStorage.removeItem(this.panierKey);
  }
}

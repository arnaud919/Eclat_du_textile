import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataServiceService {

  private storageKey = 'serviceProvisionData';  // Clé pour stocker les données

  // Méthode pour stocker les données dans le sessionStorage
  setFormData(data: any): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(data));  // Convertir l'objet en chaîne JSON
  }

  // Méthode pour récupérer les données du sessionStorage
  getFormData(): any {
    const data = sessionStorage.getItem(this.storageKey);  // Récupérer les données sous forme de chaîne JSON
    return data ? JSON.parse(data) : [];  // Si les données existent, les convertir en objet
  }

  // Méthode pour vider les données du sessionStorage
  clearFormData(): void {
    sessionStorage.removeItem(this.storageKey);  // Supprimer les données du sessionStorage
  }
}

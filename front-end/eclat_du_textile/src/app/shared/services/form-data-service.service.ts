import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataServiceService {

  private storageKey = 'formData';  // Clé utilisée pour stocker les données

  constructor() {}

  // Méthode pour stocker les données dans le localStorage
  setFormData(data: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));  // Convertir l'objet en chaîne JSON
  }

  // Méthode pour récupérer les données du localStorage
  getFormData(): any {
    const data = localStorage.getItem(this.storageKey);  // Récupérer les données sous forme de chaîne JSON
    return data ? JSON.parse(data) : {};  // Si les données existent, les convertir en objet
  }

  // Méthode pour vider les données du localStorage (facultatif)
  clearFormData(): void {
    localStorage.removeItem(this.storageKey);  // Supprimer les données du localStorage
  }
}

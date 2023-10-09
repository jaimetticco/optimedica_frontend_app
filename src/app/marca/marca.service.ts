import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private images: string[] = [
    'http://localhost:8080/api/v1/image/lentes_azules_2023-10-09_15_53_35_gucci-logo.jpg',

  ];

  getImages(): string[] {
    return this.images;
  }

  constructor() { }
}

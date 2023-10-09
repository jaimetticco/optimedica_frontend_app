import { Component, OnInit } from '@angular/core';
import { MarcaService } from './marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit{
  images: string[];

  constructor(private marcaService: MarcaService) { }

  ngOnInit(): void {
    this.images = this.marcaService.getImages();
  }
  
  //metodos
  
}

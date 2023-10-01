import { Component } from '@angular/core';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent {

  listaMarca: string[] = [
    'Oakley',
    'Maui Jim',
    'American Optical',
    'Tom Ford',
    'Persol',
    'Oliver People'];

  habilitar: boolean = true;

  //metodos
  setHabilitar(): void {
    this.habilitar=(this.habilitar==true)? false: true;
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  
})
export class FormComponent implements OnInit{
  public categoria: Categoria = new Categoria();
  public titulo: string ="Crear Categoria";
  public errores: string[];

  constructor(private categoriaService: CategoriaService,
    private router: Router,
    private activateRoute: ActivatedRoute){}

    ngOnInit(){
      this.cargarCategoria();
    };
  //cargar categoria
    cargarCategoria(): void {
      this.activateRoute.params.subscribe(params => {
        let id_categoria = params['id_categoria'];
        if (id_categoria){
          this.categoriaService.getCategoria(id_categoria).subscribe((categoria) => this.categoria = categoria);
        }
      })
    };
/*
    create(): void {
      this.categoriaService.create(this.categoria).subscribe({
        next:
          categoria => {
            this.router.navigate([ '/categorias' ]);
            Swal.fire('Nueva Categoria', `Categoria ${ this.categoria.nombre } ha sido creado con éxito!`, 'success');
          },
        error:
          err => {
            this.errores = err.error.errors as string[];
            console.error('Codigo del error desde el backend: ' + err.status);
            console.error(err.error.errors);
          }
      });
    }
    */

//henry
  async create() {
    try {
      const response = await lastValueFrom( this.categoriaService.create(this.categoria));
      this.router.navigate([ '/categorias' ]);
      Swal.fire('Nueva Categoria', `Categoria ${ response.nombre } ha sido creado con éxito!`, 'success');
    } catch (err) {
      this.errores = err.error.errors as string[];
      console.error('Codigo del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    }
  }

    update(): void {
      this.categoriaService.update(this.categoria)
        .subscribe({
          next:
          json => {
            this.router.navigate(['/categorias']);
            console.log('json', json)
            Swal.fire('Categoria Actualizada', `${json.mensaje}: ${json.categoria.nombre}`, 'success');
          },
          error:
          err => {
            this.errores = err.error.errors as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error(err.error.errors);
          }
        });
    }

}

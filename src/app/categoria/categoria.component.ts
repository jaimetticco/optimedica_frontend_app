import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',

})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[];

  constructor(private categoriaService: CategoriaService){}

  ngOnInit(): void {
      //this.categoriaService.getCategorias().subscribe(
        //categorias => this.categorias = categorias);
      this.obetenerCategorias();
  }

  async obetenerCategorias(){
    this.categorias = await lastValueFrom(this.categoriaService.getCategorias());
  }

  delete(categoria: Categoria): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas Seguro?',
      text: `¿Seguro que desea aliminar la categoria ${categoria.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, elimiar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.delete(categoria.id_categoria).subscribe(
          response => {
            this.categorias = this.categorias.filter(cli => cli !== categoria);
            swalWithBootstrapButtons.fire(
              'Categoria eliminado!',
              `Categoria ${categoria.nombre} eliminado con éxito!`,
              'success'
            )
          }
        )
      }
    })
  }

}

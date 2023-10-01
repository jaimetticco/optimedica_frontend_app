import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Categoria } from './categoria';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
private urlEndPoint: string = 'http://localhost:8080/api/v1/categoria';

private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

constructor(private http: HttpClient, private router: Router) { }

//metodo listar
  public getCategorias(): Observable<Categoria[]> {
    return this.http.get(this.urlEndPoint).pipe(
      tap(response => {
        let categorias = response as Categoria[];
        console.log('CategoriaService: tap 1');
        categorias.forEach(categoria => {
          console.log(categoria.nombre);
        });
      }),
      map(response => {
        let categorias = response as Categoria[];
        return categorias.map(categoria =>{
          categoria.nombre = categoria.nombre.toUpperCase();
          return categoria;
        });
      }
    ),
    tap(response => {
      console.log('CategoriaService: tap 2');
      response.forEach(categoria => {
        console.log(categoria.nombre);
      })
    })
    );
  }

//metodo crear
  public create(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(this.urlEndPoint, categoria, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.categoria as Categoria),
      catchError(e => {
        if(e.status == 400) {
          return throwError(() => e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  //listar
  public getCategoria(id_categoria): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id_categoria}`).pipe(
      catchError(e => {
        this.router.navigate(['/categoria']);
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() =>e);
      })
    );
  }

//actualizar
public update(categoria: Categoria): Observable<any> {
  return this.http.put<any>(`${this.urlEndPoint}/${categoria.id_categoria}`, categoria, { headers: this.httpHeaders }).pipe(
    catchError(e => {

      if (e.status == 400) {
        return throwError(() => e);
      }

      console.error(e.error.mensaje);
      Swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(() => e);
    })
  );
}

//eliminar
public delete(id_categoria: number): Observable<Categoria> {
  return this.http.delete<Categoria>(`${this.urlEndPoint}/${id_categoria}`, { headers: this.httpHeaders }).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      Swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(()=>e);
    })
  );
}



}



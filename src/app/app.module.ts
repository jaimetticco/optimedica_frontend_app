import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaService } from './categoria/categoria.service';
import { FormComponent } from './categoria/form.component';
import { MarcaComponent } from './marca/marca.component';



const routes: Routes = [
  {path: '', redirectTo: '/categorias', pathMatch: 'full'},
  {path: 'marcas', component: MarcaComponent},
  {path: 'categorias', component: CategoriaComponent},
  {path: 'categorias/form', component: FormComponent},
  {path: 'categorias/form/:id_categoria', component: FormComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MarcaComponent,
    CategoriaComponent,
    FormComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CategoriaService],
  bootstrap: [AppComponent]
})
export class AppModule { }

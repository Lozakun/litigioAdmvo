import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PestanasComponent } from './pestanas/pestanas.component';
import { RegistroFormComponent } from './registro-form/registro-form.component';
import { PaeFormComponent } from './pae-form/pae-form.component';
import { DespachoFormComponent } from './despacho-form/despacho-form.component';
import { AudienciaFormComponent } from './audiencia-form/audiencia-form.component';
import { ResolucionFormComponent } from './resolucion-form/resolucion-form.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    PestanasComponent,
    RegistroFormComponent,
    PaeFormComponent,
    DespachoFormComponent,
    AudienciaFormComponent,
    ResolucionFormComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

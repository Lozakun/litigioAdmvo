import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaeFormComponent } from './pae-form/pae-form.component';
import { DespachoFormComponent } from './despacho-form/despacho-form.component';
import { AudienciaFormComponent } from './audiencia-form/audiencia-form.component';
import { ResolucionFormComponent } from './resolucion-form/resolucion-form.component';
import { PestanasComponent } from './pestanas/pestanas.component';
import { RegistroFormComponent } from './registro-form/registro-form.component';
import { AuthGuard } from './shared/auth-guard.service';

const appRoutes: Routes = [
    {path: '', component: RegistroFormComponent},
     {path: 'litigioAdmvo', children: [
        {path: 'registro', component: RegistroFormComponent},
        {path: 'pae', canActivate: [AuthGuard], component: PaeFormComponent},
        {path: 'despacho', canActivate: [AuthGuard], component: DespachoFormComponent},
        {path: 'audiencia', canActivate: [AuthGuard], component: AudienciaFormComponent},
        {path: 'resolucion', canActivate: [AuthGuard], component: ResolucionFormComponent}
    ]}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}

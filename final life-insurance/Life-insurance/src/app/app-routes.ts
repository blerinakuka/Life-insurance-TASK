
import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DankeComponent } from './dankePage/danke.component';
import { FormsComponent } from './forms/forms.component';

const routes: Routes = [

  {
    path: 'danke' , component:DankeComponent,
  }
  ,
  {
    path: 'forms' , component:FormsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
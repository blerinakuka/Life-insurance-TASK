import { Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { DankeComponent } from './dankePage/danke.component';
import { HomeComponent } from './home/home.component';
import { SwissHomeComponent } from './swiss-home/swiss-home.component';

export const routes: Routes = [
  { path: '', component: FormsComponent },
  { path: 'danke', component: DankeComponent },
  { path: 'home', component: HomeComponent},
  {path: 'swiss-home', component: SwissHomeComponent}
];



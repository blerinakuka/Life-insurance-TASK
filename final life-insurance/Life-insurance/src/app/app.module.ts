import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DankeComponent } from './dankePage/danke.component';

import { routes } from './app.routes';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { HomeComponent } from './home/home.component';
import {AngularSignaturePadModule} from '@almothafar/angular-signature-pad';
import {SignatureFormControlDirective} from './forms/signature-form-control.directive';


@NgModule({
  declarations: [
    AppComponent,
    DankeComponent,
    HomeComponent,
    SignatureFormControlDirective
  ],
  imports: [
    AngularSignaturePadModule,
    BrowserModule,
    HttpClientModule,
    NgxIntlTelInputModule,
    RouterModule.forRoot(routes), 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

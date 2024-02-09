import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from "@angular/material/icon";
import {SignatureFormControlDirective} from './signature-form-control.directive';

@NgModule({
  declarations: [SignatureFormControlDirective],
  exports: [SignatureFormControlDirective],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule]
})
export class FormssModule {
}

import { Component } from '@angular/core';
import { FirstFormComponent } from '../first-form/first-form.component';

@Component({
  selector: 'app-swiss-home',
  standalone: true,
  imports: [FirstFormComponent],
  templateUrl: './swiss-home.component.html',
  styleUrl: './swiss-home.component.scss'
})
export class SwissHomeComponent {

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-danke',
  standalone: true,
  imports: [],
  templateUrl: './danke.component.html',
  styleUrl: './danke.component.scss'
})
export class DankeComponent {

  constructor(private router: Router) { }
  goToHome() {
    this.router.navigate(['/home']);
  }

}

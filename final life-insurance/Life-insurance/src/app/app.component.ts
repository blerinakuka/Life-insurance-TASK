import{Component} from '@angular/core'
import { CommonModule } from '@angular/common'
import {RouterOutlet} from '@angular/router'
import { DankeComponent } from './dankePage/danke.component';
import { FormsComponent } from './forms/forms.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';



@Component({
  selector: 'app-root',
  standalone:true,
  imports: [CommonModule, FormsComponent, RouterOutlet, DankeComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent{
  
}
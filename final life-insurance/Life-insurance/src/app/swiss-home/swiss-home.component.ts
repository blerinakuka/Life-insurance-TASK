import { Component } from '@angular/core';
import { FirstFormComponent } from '../first-form/first-form.component';
import { FamilyInsuranceComponent } from '../family-insurance/family-insurance.component';
import { AnniversaryComponent } from '../anniversary/anniversary.component';
import { WorkComponent } from '../work/work.component';
@Component({
  selector: 'app-swiss-home',
  standalone: true,
  imports: [FirstFormComponent,FamilyInsuranceComponent, AnniversaryComponent,WorkComponent],
  templateUrl: './swiss-home.component.html',
  styleUrl: './swiss-home.component.scss'
})
export class SwissHomeComponent {

}

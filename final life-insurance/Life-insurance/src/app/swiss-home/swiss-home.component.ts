import { Component ,CUSTOM_ELEMENTS_SCHEMA,ViewChild,ElementRef, ViewEncapsulation } from '@angular/core';
import { FirstFormComponent } from '../first-form/first-form.component';
import { FamilyInsuranceComponent } from '../family-insurance/family-insurance.component';
import { AnniversaryComponent } from '../anniversary/anniversary.component';
import { WorkComponent } from '../work/work.component';
import { PartnersComponent } from '../partners/partners.component';
import { SliderComponent } from '../slider/slider.component';
import { CommonModule } from '@angular/common';
import { SwissHomeFinanceSliderComponent } from '../swiss-home-finance-slider/swiss-home-finance-slider.component';
import { SwiperModule } from 'swiper/angular';
import Swiper from 'swiper';
import SwiperCore, {Autoplay, Navigation, Pagination, EffectCoverflow} from 'swiper'


SwiperCore.use([Navigation, Pagination, EffectCoverflow, Autoplay]);
@Component({
  selector: 'app-swiss-home',
  standalone: true,
  imports: [FirstFormComponent,SwiperModule, FamilyInsuranceComponent, AnniversaryComponent, WorkComponent, PartnersComponent, SliderComponent, CommonModule, SwissHomeFinanceSliderComponent],
  templateUrl: './swiss-home.component.html',
  styleUrl: './swiss-home.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  encapsulation:ViewEncapsulation.None
})
export class SwissHomeComponent {

}

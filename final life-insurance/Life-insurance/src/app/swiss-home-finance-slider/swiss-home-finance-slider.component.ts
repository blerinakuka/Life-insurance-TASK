import {  CUSTOM_ELEMENTS_SCHEMA,Component,ViewChild,ElementRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import Swiper from 'swiper';
import SwiperCore, {Autoplay, Navigation, Pagination, EffectCoverflow} from 'swiper'


SwiperCore.use([Navigation, Pagination, EffectCoverflow, Autoplay]);
@Component({
  selector: 'app-swiss-home-finance-slider',
  standalone: true,
  imports: [SwiperModule, CommonModule],
  templateUrl: './swiss-home-finance-slider.component.html',
  styleUrl: './swiss-home-finance-slider.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  encapsulation:ViewEncapsulation.None
})
export class SwissHomeFinanceSliderComponent {

}

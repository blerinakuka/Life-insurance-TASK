import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import Swiper from 'swiper';
import SwiperCore, {Autoplay, Navigation, Pagination, EffectCoverflow} from 'swiper'

SwiperCore.use([Navigation, Pagination, EffectCoverflow, Autoplay]);
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, SwiperModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderComponent {


  testimonials = [
    {
      image: '../assets/Mask Group 17.png',
      name: 'Marissa Garza',
      stars: [1, 1, 1, 0.5, 0.5],
      quoteImage: 'quote1.png',
      quote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took.'

    },
    {
      image: '../assets/Mask Group 17.png',
      name: 'Blerina Kukaj',
      stars: [1, 1, 1, 1, 1],
      quoteImage: 'quote2.png',
      quote: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took.'
    },

  ];
}
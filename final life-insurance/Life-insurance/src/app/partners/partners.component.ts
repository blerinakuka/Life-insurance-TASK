import { Component, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, takeWhile } from 'rxjs/operators';
import { interval } from 'rxjs';


@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss'
})
export class PartnersComponent {
  @ViewChild('slides') slides!: ElementRef;

  counter = 0;
  slideWidth!: number;
  numVisibleSlides = 3;
  isMobile = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngAfterViewInit() {
    this.slideWidth = this.slides.nativeElement.firstElementChild.clientWidth;
    console.log('Slide width:', this.slideWidth);
    this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
        takeWhile(() => !this.isMobile),
        map(result => result.matches)
      )
      .subscribe(matches => {
        if (matches) {
          this.isMobile = true;
          if (window.innerWidth < 767) {
            this.startAutoSlide();
          }
        }
      });
  }
  
  startAutoSlide() {
    if (this.isMobile) {
      interval(3000).subscribe(() => {
        this.counter++;
        if (this.counter >= this.slides.nativeElement.children.length) {
          this.counter = 0; 
          this.slides.nativeElement.style.transition = 'none'; 
          this.slides.nativeElement.style.transform = `translateX(0)`;
          setTimeout(() => {
            this.slides.nativeElement.style.transition = 'transform 0.5s ease-in-out'; 
          }, 50); 
        } else {
          const offset = -this.counter * (this.slideWidth * 1.23); 
          this.slides.nativeElement.style.transition = 'transform 0.5s ease-in-out';
          this.slides.nativeElement.style.transform = `translateX(${offset}px)`;
        }
      });
    }
  }
}
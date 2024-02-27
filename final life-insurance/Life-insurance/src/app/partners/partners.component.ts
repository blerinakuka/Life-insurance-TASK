import { Component, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, takeWhile } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';

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
  numVisibleSlides = 6;
  isMobile = false;
  autoSlideSubscription: Subscription | undefined;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngAfterViewInit() {
    this.slideWidth = this.slides.nativeElement.firstElementChild.clientWidth;
    console.log('Slide width:', this.slideWidth);
    this.breakpointObserver.observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches)
      )
      .subscribe(matches => {
        if (matches) {
          this.isMobile = true;
          if (window.innerWidth < 769) {
            this.startAutoSlide();
          } else {
            this.stopAutoSlide();
          }
        } else {
          this.isMobile = false;
          this.stopAutoSlide();
        }
      });


  }

  startAutoSlide() {
    const totalSlides = this.slides.nativeElement.children.length;
    let isTransitioning = false;

    const cloneSlides = () => {
      for (let i = 0; i < totalSlides; i++) {
        const clonedSlide = this.slides.nativeElement.children[i].cloneNode(true);
        this.slides.nativeElement.appendChild(clonedSlide);
      }
    };

    // Initial cloning of slides
    cloneSlides();

    this.autoSlideSubscription = interval(3000).subscribe(() => {
      if (!isTransitioning) { // Check if not currently transitioning
        isTransitioning = true; // Set transitioning flag

        this.counter++;

        // Calculate the offset to transition to the next slide
        const offset = -this.counter * (this.slideWidth * 1.23);

        // Smooth transition to the next slide
        this.slides.nativeElement.style.transition = 'transform 0.5s ease-in-out';
        this.slides.nativeElement.style.transform = `translateX(${offset}px)`;



        // Check if transition is completed
        setTimeout(() => {
          isTransitioning = false;
          if (this.counter >= totalSlides - 1) {
            cloneSlides();
          }
        }, 500);
      }
    });
  }

  stopAutoSlide() {
    if (this.autoSlideSubscription) {
      this.autoSlideSubscription.unsubscribe();
    }
  }

  resetSlidePosition() {
    this.slides.nativeElement.style.transition = 'none';
    this.slides.nativeElement.style.transform = `translateX(0)`;
    setTimeout(() => {
      this.slides.nativeElement.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
  }
}
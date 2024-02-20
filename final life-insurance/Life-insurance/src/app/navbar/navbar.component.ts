import {Component, OnInit, OnDestroy, ViewChild, ElementRef,HostListener} from '@angular/core';

import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatMenuTrigger} from "@angular/material/menu";
import {trigger, state, style, animate, transition} from '@angular/animations';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('dropdownState', [
      state('closed', style({
        opacity: '0',
      })),
      state('open', style({
        opacity: '1',
      })),
      transition('closed <=> open', animate('500ms ease-in-out'))
    ])
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  @ViewChild('menuBtn') menuBtn!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;
  menuExpanded = false;

  toggleMenu() {
    setTimeout(() => {
      this.menuExpanded = !this.menuExpanded;
    }, 0);
  }

  @HostListener('window:click', ['$event'])
  listenToOutsideClick() {
    console.log(this.menuExpanded)
    if (!this.menuExpanded) {
      return;
    }

    this.menuExpanded = false;
  }
  isMainDropdownOpen: boolean = false;
  private timeoutId: any | undefined;
  activeLang: string = '';
  private langChangeSubscription: Subscription = new Subscription();

  constructor(  private snackBar: MatSnackBar) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }

  open = false;

  toggleToggler() {
    this.open = !this.open;
  }




}

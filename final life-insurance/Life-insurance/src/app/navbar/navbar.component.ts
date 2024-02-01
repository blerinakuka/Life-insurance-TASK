import {Component, OnInit, OnDestroy, ViewChild, ElementRef,} from '@angular/core';

import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatMenuTrigger} from "@angular/material/menu";
import {trigger, state, style, animate, transition} from '@angular/animations';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
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

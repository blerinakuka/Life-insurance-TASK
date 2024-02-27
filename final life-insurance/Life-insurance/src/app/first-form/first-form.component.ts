import intlTelInput from 'intl-tel-input';
import { ChangeDetectorRef, Component, ElementRef, ViewChild, EventEmitter, Output, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-first-form',
  standalone: true,
  imports: [],
  templateUrl: './first-form.component.html',
  styleUrl: './first-form.component.scss'
})
export class FirstFormComponent {

  //TEL
  @ViewChild('phoneInput') phoneInput!: ElementRef;
  @ViewChild('btn') button!: ElementRef;
  @ViewChild('errorMsg') errorMsg!: ElementRef;
  @ViewChild('validMsg') validMsg!: ElementRef;

  iti: any;

  errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];

  reset() {
    this.phoneInput.nativeElement.classList.remove("error");
    this.errorMsg.nativeElement.innerHTML = "";
    this.errorMsg.nativeElement.classList.add("hide");
    this.validMsg.nativeElement.classList.add("hide");
  }

  ngAfterViewInit() {
    this.iti = intlTelInput(this.phoneInput.nativeElement, {
      initialCountry: "ch",
      separateDialCode: true,
      utilsScript: "/intl-tel-input/js/utils.js?1706723638591"
    });

    this.phoneInput.nativeElement.addEventListener('input', () => {
      this.validatePhoneNumber();
    });
    this.phoneInput.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {

      if (!/^\d$/.test(event.key) && event.key !== 'Delete' && event.key !== 'Backspace' && event.key !== '+') {
        event.preventDefault();
      }
    });

  }
  validatePhoneNumber(): boolean {
    this.reset();
    const inputValue = this.phoneInput.nativeElement.value.trim();
    if (!inputValue) {
      return false;
    }
    if (this.iti.isValidNumberPrecise()) {
      const number = this.iti.getNumber(intlTelInputUtils.numberFormat.E164);
      // this.myFormPersonalDetails.patchValue({ phoneNumber: number });
      this.validMsg.nativeElement.classList.remove("hide");
      return true;
    } else {
      this.phoneInput.nativeElement.classList.add("error-message");
      const errorCode = this.iti.getValidationError();
      this.errorMsg.nativeElement.innerHTML = this.errorMap[errorCode] || "Invalid number";
      this.errorMsg.nativeElement.classList.remove("hide");
      return false;
    }
  }

}
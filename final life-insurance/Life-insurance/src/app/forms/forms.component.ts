import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormControl,
  NgModel,
} from '@angular/forms';
import { ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { PLZService } from "../PLZ.service";
import intlTelInput from 'intl-tel-input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import 'intl-tel-input/build/css/intlTelInput.css';
import 'intl-tel-input/build/js/utils.js';

function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { 'invalidEmail': true };
  };
}
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSlideToggleModule,
    NgbModule,
    
  ],
})

export class FormsComponent {
  myFormStart: FormGroup;
  myFormWorkStatus: FormGroup;
  myFormLifeInsurancePlan: FormGroup;
  myFormLifeInsuranceGoal: FormGroup;
  myFormChooseOffer: FormGroup;
  myFormPersonalDetails: FormGroup;

  showTooltip = false;
  showPremiumTooltip = false;
  phoneNumberIsValid: boolean = true;

  isChecked: boolean = false;

  @ViewChild('select') selectRef!: ElementRef;
  @ViewChild('optionsContainer') optionsContainerRef!: ElementRef;
  showOptions: boolean = false;

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
    if ( this.iti.isValidNumberPrecise()) {
      const number = this.iti.getNumber(intlTelInputUtils.numberFormat.E164);
      this.myFormPersonalDetails.patchValue({ phoneNumber: number });
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

  

  //STEPPER
  currentStep = 0;
  steps = Array.from({ length: 6 }, (_, i) => i);

  isStepClickable(step: number): boolean {

    return true;
  }
  
  goToStep(step: number): void {
    this.currentStep = step;
  }
  goToNextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      window.scrollTo(0, 0);
    }
  }
  nextStep(): void {
    this.markFormGroupAndArraysTouched(this.myFormStart);
  
    if (this.myFormStart.valid && this.isSuggestionSelected) {
      console.log('Form is valid. Proceeding to the next step.');
      this.currentStep++;
      window.scrollTo(0, 0);
    } else {
      console.log('Form is invalid. Please check the error messages.');
    }
  }
  
  markFormGroupAndArraysTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupAndArraysTouched(control);
      }
    });
  }

  goToNextStepTwo(): void {
    this.markFormGroupTouched(this.myFormWorkStatus);

    if (this.myFormWorkStatus.valid) {
      console.log('Form is valid. Proceeding to the next step.');
      this.currentStep++;
      window.scrollTo(0, 0);
    } else {
      console.log('Form is invalid. Please check the error messages.');
    }
  }

  //CHECKBOXES REQUIRED
  nextButtonClicked = false;
  goToNextStepThree(): void {
    this.nextButtonClicked = true;

    if (!this.atLeastOneCheckboxChecked() || !this.myFormLifeInsuranceGoal.valid) {
      console.log('Please select at least one checkbox.');
      window.scrollTo(0, 0);
    } else {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
      }
    }
  }

  atLeastOneCheckboxChecked(): boolean {
    return Object.keys(this.myFormLifeInsuranceGoal.controls)
      .some(key => this.myFormLifeInsuranceGoal.get(key)?.value);
  }

  goToPreviousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.myFormPersonalDetails.markAsUntouched();
      this.myFormStart.markAsUntouched();
      this.myFormChooseOffer.markAsUntouched();
      this.myFormLifeInsuranceGoal.markAsUntouched();
      this.myFormWorkStatus.markAsUntouched();
      this.myFormLifeInsurancePlan.markAsUntouched();
  
      window.scrollTo(0, 0);
    }
  }

  //RANGE INPUT
  rangeSlide(value: number) {
    this.myFormLifeInsurancePlan.get('insuredSum')?.setValue(value);
  }
  calculateValue(): number {
    const birthYear = this.myFormStart.get('birthyear')?.value;
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (age === 65) {
      return 1;
    } else if (age < 65) {
      return Math.max(0, 65 - age);
    } else {
      return 30;
    }
  }

  calculateValueMin(): number {
    const birthYear = this.myFormStart.get('birthyear')?.value;
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (age >= 64 && age <= 65) {
      return 0;
    } else {
      return 1;
    }
  }
  rangeSlideDuration(value: number) {
    this.myFormLifeInsurancePlan.get('insuredDuration')?.setValue(value);
  }

  selectedCountry: any;

  //COUNTRY SELECT INPUT
  countries = [
    { value: 'Armenia', name: 'Armenia' },
    { value: 'Afghanistan', name: 'Afghanistan' },
    { value: 'Aland Islands', name: 'Aland Islands' },
    { value: 'Albania', name: 'Albania' },
    { value: 'Algeria', name: 'Algeria' },
    { value: 'American Samoa', name: 'American Samoa' },
    { value: 'Andorra', name: 'Andorra' },
    { value: 'Anguilla', name: 'Anguilla' },
    { value: 'Antigua and Barbuda', name: 'Antigua and Barbuda' },
    { value: 'Argentina', name: 'Argentina' },
    { value: 'Switzerland', name: 'Switzerland' },
  ];
  onCountrySelected(country: any) {
    this.selectedCountry = country;
  }

  constructor(private formBuilder: FormBuilder, private router: Router, private PLZservice: PLZService, private cdr: ChangeDetectorRef, private ElementRef: ElementRef) {
    this.myFormStart = this.formBuilder.group({
      fullName: ['', [Validators.required, this.errorValidator.bind(this)]],
      birthyear: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), this.birthYearValidator.bind(this)]],
      city: ['', [this.customPLZValidator, Validators.pattern('^[0-9]*$')]],
      insuranceModel: ['', Validators.required],
      premiumModel: ['', Validators.required],
      franchises: this.formBuilder.array([])
    });
    this.myFormWorkStatus = this.formBuilder.group({
      smokingStatus: ['', Validators.required],
      profession: ['', this.onProfessionInput],
      employmentStatus: ['', Validators.required],
    });
    this.myFormLifeInsurancePlan = this.formBuilder.group({
      insuredSum: ['100000', [Validators.required]],
      insuredDuration: ['1', [Validators.required]],
    });
    this.myFormLifeInsuranceGoal = this.formBuilder.group({
      protectionOfFamily: [''],
      buyOwnHome: [''],
      taxOptimization: [''],
      financialInvestments: [''],
      financialIndependence: [''],
      wealthAccumulation: [''],
    });

    this.myFormChooseOffer = this.formBuilder.group({
      selectedAccordion: [''],

    });
    this.myFormPersonalDetails = this.formBuilder.group({
      nationality: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', [Validators.required, this.errorValidator.bind(this)]],
      email: ['', [Validators.required, customEmailValidator()]],
      gender: ['', Validators.required],
      agreedToTerms: [false, Validators.requiredTrue],
    });

    this.addFranchise();
    this.myFormPersonalDetails.get('nationality')?.setValue('Switzerland');

    this.myFormStart.get('birthyear')?.valueChanges.subscribe(() => {

      this.myFormLifeInsurancePlan.get('insuredDuration')?.setValue(1);
    });
    

  }
//FORM ARRAY
get franchises() {
  return this.myFormStart.get('franchises') as FormArray;
}

addFranchise() {
  const lastFranchiseIndex = this.franchises.length - 1;
  
  if (lastFranchiseIndex >= 0) {
    const lastFranchise = this.franchises.at(lastFranchiseIndex) as FormGroup;

    if (lastFranchise) {
      Object.keys(lastFranchise.controls).forEach(key => {
        const control = lastFranchise.get(key);
        if (control && control.invalid) {
          control.markAsTouched();
        }
      });

      if (lastFranchise.valid) {
        const franchiseGroup = this.formBuilder.group({
          name: ['', Validators.required],
          birthyearAddperson: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), this.birthYearValidator.bind(this)]],
          franchise: ['', Validators.required],
          slideToggleControl: [false]
        });

        this.franchises.push(franchiseGroup);
      } else {
        console.log('Last person details are not valid. Please complete them before adding another person.');
      }
    }
  } else {
    const franchiseGroup = this.formBuilder.group({
      name: ['', Validators.required],
      birthyearAddperson: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), this.birthYearValidator.bind(this)]],
      franchise: ['', Validators.required],
      slideToggleControl: [false]
    });

    this.franchises.push(franchiseGroup);
  }
}
removeFranchise(index: number) {
  this.franchises.removeAt(index);
}

onSlideToggleChange(event: MatSlideToggleChange, index: number) {
  const franchiseControl = this.franchises.at(index).get('slideToggleControl');
  if (franchiseControl) {
    franchiseControl.setValue(event.checked);
  }
}


  //GENDER BUTTONS VALUE
  clickedButton: string = '';
  setGender(gender: string) {
    this.myFormPersonalDetails.controls['gender'].setValue(gender);
    this.clickedButton = gender;
  }

  //ACCORDIONS
  updateSelectedAccordion(selectedAccordion: string) {
    this.myFormChooseOffer.patchValue({
      selectedAccordion,
    });
  }
  selectedImage: string | null = null;
  updateSelectedImage(button: HTMLButtonElement, image: string) {
    this.selectedImage = image;
  }
  showAdditionalAccordions = false;
  isButtonDisabled = false;
  onLoadMoreClick() {
    this.showAdditionalAccordions = true;
    this.isButtonDisabled = true;
  }

  isAccordionCollapsed = true;

  toggleAccordion() {
    this.isAccordionCollapsed = !this.isAccordionCollapsed;
  }

  //PLZ 
  customPLZValidator(control: AbstractControl): ValidationErrors | null {
    const plzValue: string = control.value;

    if (!plzValue || plzValue.length < 4 || plzValue.length > 5 || !/^\d+$/.test(plzValue)) {
      return { invalidPLZLength: true };
    }
    return null;
  }
  onPlzChange() {
    const plzControl = this.myFormStart.get('city');

    if (!plzControl || !plzControl.value) {
      this.resetSuggestionState();
      this.autocompleteSuggestions = [];
      plzControl?.setErrors({ invalidPLZLength: true });
      return;
    }

    const plzValue = plzControl.value.toString();
    const plzLength = plzValue.length;

    if (plzLength > 4 && plzLength === 5) {
      this.resetSuggestionState();
      this.autocompleteSuggestions = [];
      plzControl.setErrors({ invalidPLZLength: true });
      return;
    }

    const plzSubstring = plzValue.substring(0, 4);
    this.PLZservice.fetchDataByPlz(plzSubstring).subscribe(
      (data: any) => {
        this.autocompleteSuggestions = this.PLZservice.extractAutocompleteData(data, plzSubstring);
        this.resetSuggestionState();
      },
      (error: any) => {
        this.resetSuggestionState();
      }
    );

    plzControl.setErrors(null);
  }

  resetSuggestionState() {
    this.isSuggestionSelected = false;
  }

  autocompleteSuggestions: string[] = [];
  isSuggestionSelected: boolean = false;
  inputValue: string = '';
  isDataSelected: boolean = false;
  selectSuggestion(suggestion: string) {
    if (suggestion !== '') {
      this.myFormStart.get('city')?.patchValue(suggestion);
      this.inputValue = suggestion;
      this.autocompleteSuggestions = [];
      this.isDataSelected = true;
      this.myFormStart.get('city')?.clearValidators();
      this.myFormStart.get('city')?.updateValueAndValidity();
      this.isSuggestionSelected = true;
    } else {
      this.isSuggestionSelected = false;
    }
  }

  //STREET INPUT VALIDATION
  onStrasseInputFormat(controlName: string): ValidationErrors | null {
    let inputValue: string = this.myFormPersonalDetails.get(controlName)?.value;

    const originalValue = inputValue;

    inputValue = inputValue.replace(/[^a-zA-Z0-9\s'-]/g, '');


    if (inputValue.length > 0 && inputValue.charAt(0) === ' ') {
      inputValue = inputValue.slice(1);
    }

    inputValue = inputValue.replace(/(\s{2,}|-{2,}|'{2,})/g, (_, match) => match.charAt(0));

    inputValue = inputValue.replace(/\s\w/g, match => match.toUpperCase());

    const words = inputValue.split(/\s+/);
    if (words.length > 4) {
      words.splice(4);
    }
    inputValue = words.join(' ');

    inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

    if (inputValue.length > 150) {
      inputValue = inputValue.substring(0, 150);
    }

    if (inputValue !== originalValue) {

      this.myFormPersonalDetails.get(controlName)?.setValue(inputValue, { emitEvent: false });
      return { 'invalidFormat': true };
    }

    return null;
  }
  onStrasseInput() {
    this.onStrasseInputFormat('address');
  }

  //BIRTH YEAR INPUT VALIDATION

  calculateSubtraction() {
    const birthYear = this.myFormStart.get('birthyear')?.value;
    const ageDifference = 65 - birthYear;
    console.log('Age difference:', ageDifference);
  }

  birthYearValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const birthYear = control.value;
  
    const currentYear = new Date().getFullYear();
    const minYear = 1924;
  
    if (isNaN(birthYear) || birthYear < minYear || birthYear > currentYear) {
      return { 'invalidYear': true };
    }
  
    return null;
  }
  onBirthYearInput(event: Event): void {
    let inputValue = (event.target as HTMLInputElement).value;

    if (inputValue.length > 4) {
        inputValue = inputValue.slice(0, 4);
    }

    const parsedValue = parseInt(inputValue, 10);

    if (!isNaN(parsedValue)) {
        this.myFormStart.get('birthyear')?.setValue(parsedValue, { emitEvent: false });
    } else {
        this.myFormStart.get('birthyear')?.setValue(null, { emitEvent: false });
    }
}
  //BIRTH YEAR ADD PERSON INPUT VALIDATION
onBirthYearInputAddPerson(event: Event, index: number): void {
  let inputValue = (event.target as HTMLInputElement).value;

  if (inputValue.length > 4) {
      inputValue = inputValue.slice(0, 4);
  }

  const parsedValue = parseInt(inputValue, 10);

  if (!isNaN(parsedValue)) {
      this.franchises.at(index).get('birthyearAddperson')?.setValue(parsedValue, { emitEvent: false });
  } else {
      this.franchises.at(index).get('birthyearAddperson')?.setValue(null, { emitEvent: false });
  }
}

  //ERROR TRIGGERING FOR ALL THE INPUT VALIDATIONS
  errorValidator(control: AbstractControl): ValidationErrors | null {
    const inputValue: string = control.value;

    const sanitizedValue = inputValue.replace(/[^a-zA-Z0-9\s'-]/g, '');

    let formattedValue = sanitizedValue.trim();

    formattedValue = formattedValue.replace(/(\s{2,}|-{2,}|'{2,})/g, (_, match) => match.charAt(0));

    formattedValue = formattedValue.replace(/\s\w/g, match => match.toUpperCase());

    const words = formattedValue.split(/\s+/);
    if (words.length > 4) {
      words.splice(4);
    }
    formattedValue = words.join(' ');

    formattedValue = formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1);

    if (formattedValue !== inputValue) {
      return { 'invalidFormat': true };
    }

    return null;
  }

  // FULL NAME INPUT VALIDATION
  onInputFormat1(controlName: string): ValidationErrors | null {
    let inputValue: string = this.myFormStart.get(controlName)?.value;

    const originalValue = inputValue;

    inputValue = inputValue.replace(/[^a-zA-Z\s'-]/g, '');

    if (inputValue.length > 0 && inputValue.charAt(0) === ' ') {
      inputValue = inputValue.slice(1);
    }

    inputValue = inputValue.replace(/(\s{2,}|-{2,}|'{2,})/g, (_, match) => match.charAt(0));

    inputValue = inputValue.replace(/\s\w/g, match => match.toUpperCase());

    const words = inputValue.split(/\s+/);
    if (words.length > 4) {
      words.splice(4);
    }
    inputValue = words.join(' ');

    inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

    if (inputValue.length > 100) {
      inputValue = inputValue.substring(0, 100);
    }

    if (inputValue !== originalValue) {
      this.myFormStart.get(controlName)?.setValue(inputValue, { emitEvent: false });
      return { 'invalidFormat': true };
    }

    return null;
  }

  onFullNameInput(){
  this.onInputFormat1('fullName');
}

//FULL NAME INPUT FORM ARRAY
onInputFormat2(franchiseIndex: number, controlName: string): ValidationErrors | null {
  const franchise = this.franchises.at(franchiseIndex);
  let inputValue: string = franchise.get(controlName)?.value;

  const originalValue = inputValue;

  inputValue = inputValue.replace(/[^a-zA-Z\s'-]/g, '');

  if (inputValue.length > 0 && inputValue.charAt(0) === ' ') {
      inputValue = inputValue.slice(1);
  }

  inputValue = inputValue.replace(/(\s{2,}|-{2,}|'{2,})/g, (_, match) => match.charAt(0));

  inputValue = inputValue.replace(/\s\w/g, match => match.toUpperCase());

  const words = inputValue.split(/\s+/);
  if (words.length > 4) {
      words.splice(4);
  }
  inputValue = words.join(' ');

  inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

  if (inputValue.length > 100) {
      inputValue = inputValue.substring(0, 100);
  }

  if (inputValue !== originalValue) {
      franchise.get(controlName)?.setValue(inputValue, { emitEvent: false });
      return { 'invalidFormat': true };
  }

  return null;
}

onFranchiseNameInput(franchiseIndex: number) {
  this.onInputFormat2(franchiseIndex, 'name');
}

//PROFESSION INPUT VALIDATION
  onProfessionInput(control: AbstractControl): ValidationErrors | null {
    let inputValue: string = control.value || '';
  
    inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
  
    const trimmedValue = inputValue.trim();
  
    if (trimmedValue.length === 0) {
      return { required: true };
    }

    control.setErrors(null);
  
    return null;
  }

  //MARK FORM GROUP TOUCHED kur e bon submit nese ka error
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  //SUBMIT
  onSubmit() {
    this.markFormGroupTouched(this.myFormPersonalDetails);
  
    if (this.myFormPersonalDetails.valid && this.validatePhoneNumber()) {
      const savingsGoals = Object.entries(this.myFormLifeInsuranceGoal.value)
        .filter(([key, value]) => value)
        .map(([key]) => {
          switch (key) {
            case 'protectionOfFamily':
              return 'Protection of Family';
            case 'buyOwnHome':
              return 'Buy Own Home';
            case 'taxOptimization':
              return 'Tax Optimization';
            case 'financialInvestments':
              return 'Financial Investments';
            case 'financialIndependence':
              return 'Financial Independence';
            case 'wealthAccumulation':
              return 'Wealth Accumulation';
            default:
              return '';
          }
        })
        .filter(goal => goal !== '');
      let formData = {
        fullName: this.myFormStart.value.fullName,
        birthyear: this.myFormStart.value.birthyear,
        city: this.myFormStart.value.city,
        insuranceModel: this.myFormStart.value.insuranceModel,
        premiumModel: this.myFormStart.value.premiumModel,
        smokingStatus: this.myFormWorkStatus.value.smokingStatus,
        profession: this.myFormWorkStatus.value.profession,
        employmentStatus: this.myFormWorkStatus.value.employmentStatus,
        insuredSum: this.myFormLifeInsurancePlan.value.insuredSum,
        insuredDuration: this.myFormLifeInsurancePlan.value.insuredDuration,
        selectedAccordion: this.myFormChooseOffer.value.selectedAccordion,
        nationality: this.myFormPersonalDetails.value.nationality,
        phoneNumber: this.myFormPersonalDetails.value.phoneNumber,
        address: this.myFormPersonalDetails.value.address,
        email: this.myFormPersonalDetails.value.email,
        gender: this.myFormPersonalDetails.value.gender,
        agreedToTerms: this.myFormPersonalDetails.value.agreedToTerms,
        person: this.myFormStart.get('franchises')?.value,
        "Savings Goal": savingsGoals.join(", ")
      };
  
      console.log(formData);
      this.router.navigate(['/danke']);
    } else {
      console.log('Validation failed. Cannot submit.');
    }
  }

}
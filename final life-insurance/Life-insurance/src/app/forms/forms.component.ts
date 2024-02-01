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
  NgModel
} from '@angular/forms';
import {
  CountryISO,
  NgxIntlTelInputModule,
  SearchCountryField, 
  PhoneNumberFormat
} from "ngx-intl-tel-input";
import { ChangeDetectorRef } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import {PLZService} from "../PLZ.service";

function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : {'invalidEmail': true};
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
      useValue: {displayDefaultIndicatorType: false},
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
    NgxIntlTelInputModule,
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
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom
  ];
  
protected readonly PhoneNumberFormat = PhoneNumberFormat;

//STEPPER
  steps = [0, 1, 2,3 ,4 ,5 ]; 
  currentStep = 0;
  isStepClickable(step: number): boolean {
    return step <= this.currentStep;
  }
  goToStep(step: number): void {
    this.currentStep = step;
  }
  goToNextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }
  nextStep(): void {
 
    this.markFormGroupTouched(this.myFormStart);

    if (this.myFormStart.valid  && this.isSuggestionSelected) {
      console.log('Form is valid. Proceeding to the next step.');
      this.currentStep++;
    } else {
      console.log('Form is invalid. Please check the error messages.');
    }
  }

  goToNextStepTwo(): void {
    this.markFormGroupTouched(this.myFormWorkStatus);

    if (this.myFormWorkStatus.valid) {
      console.log('Form is valid. Proceeding to the next step.');
      this.currentStep++;
    } else {
      console.log('Form is invalid. Please check the error messages.');
    }
  }

  goToPreviousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  //RANGE INPUT
  rangeSlide(value: number) {
    this.myFormLifeInsurancePlan.get('insuredSum')?.setValue(value);
  }

  rangeSlideDuration(value: number) {
    this.myFormLifeInsurancePlan.get('insuredDuration')?.setValue(value);
  }
  

  selectedCountry: any; 

//COUNTRY SELECT INPUT
  countries = [
    { value: '1', name: 'Armenia' },
    { value: '2', name: 'Afghanistan' },
    { value: '3', name: 'Aland Islands' },
    { value: '4', name: 'Albania' },
    { value: '5', name: 'Algeria' },
    { value: '6', name: 'American Samoa' },
    { value: '7', name: 'Andorra' },
    { value: '8', name: 'Anguilla' },
    { value: '9', name: 'Antigua and Barbuda' },
    { value: '10', name: 'Argentina' },
    { value: '11', name: 'Switzerland' },
  ];
  onCountrySelected(country: any) {
    this.selectedCountry = country;
  }

  constructor(private formBuilder: FormBuilder,private router: Router, private PLZservice: PLZService,private cdr: ChangeDetectorRef) {
        this.myFormStart = this.formBuilder.group({
          fullName: ['', [Validators.required, this.errorValidator.bind(this)]],
          birthyear: ['', [Validators.required,  Validators.minLength(4), Validators.maxLength(4), this.birthYearValidator.bind(this)]],
          city: ['', [this.customPLZValidator, Validators.pattern('^[0-9]*$')]],
          insuranceModel: ['', Validators.required],
          premiumModel: ['', Validators.required],
        });
        this.myFormWorkStatus = this.formBuilder.group({
          smokingStatus: ['', Validators.required],      
          profession: [''],        
          employmentStatus: ['']
        });
        this.myFormLifeInsurancePlan = this.formBuilder.group({
         insuredSum: 0, 
         insuredDuration: 0, 
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
          adress: ['', [Validators.required, this.errorValidator.bind(this)]],
          email: ['', [Validators.required, customEmailValidator()]],
          gender: ['', Validators.required],
          agreedToTerms: [false, Validators.requiredTrue],
        });
        this.myFormPersonalDetails.get('nationality')?.setValue('11');
    
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
    console.log('Selected Image:', image);
    this.selectedImage = image;
    console.log('Button Clicked:', button);
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
            return {invalidPLZLength: true};
            }
          return null;
        }
  onPlzChange() {
          const plzControl = this.myFormStart.get('city');

          if (!plzControl || !plzControl.value) {
          this.resetSuggestionState();
          this.autocompleteSuggestions = [];
          plzControl?.setErrors({invalidPLZLength: true});
          return;
          }

          const plzValue = plzControl.value.toString();
          const plzLength = plzValue.length;

          if (plzLength > 4 && plzLength === 5) {
          this.resetSuggestionState();
          this.autocompleteSuggestions = [];
          plzControl.setErrors({invalidPLZLength: true});
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
            console.log('isSuggestionSelected:', this.isSuggestionSelected);
          } else {
            this.isSuggestionSelected = false;
            console.log('isSuggestionSelected:', this.isSuggestionSelected);
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

    if (inputValue !== originalValue) {

      this.myFormPersonalDetails.get(controlName)?.setValue(inputValue, {emitEvent: false});
      return {'invalidFormat': true};
    }

    return null;
  }
  onStrasseInput() {
    this.onStrasseInputFormat('adress');
  }

  //BIRTH YEAR INPUT VALIDATION
  birthYearValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const birthYear = control.value;

    const currentYear = new Date().getFullYear();

    const minYear = 1924;

    if (birthYear < minYear || birthYear > currentYear) {
      return { 'invalidYear': true };
    }

    return null;
  }

  onBirthYearInput(event: Event): void {
    let inputValue = (event.target as HTMLInputElement).value;

    inputValue = inputValue.slice(0, 4);

    this.myFormStart.get('birthyear')?.setValue(inputValue, { emitEvent: false });
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

  //FULL NAME INPUT VALIDATION

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

    if (inputValue !== originalValue) {
      this.myFormStart.get(controlName)?.setValue(inputValue, {emitEvent: false});
      return {'invalidFormat': true};
    }

    return null;
  }
  onFullNameInput() {
    this.onInputFormat1('fullName');
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
  
    if (this.myFormPersonalDetails.valid) {
      console.log('myFormStart:', this.myFormStart.value);
      console.log('myFormWorkStatus:', this.myFormWorkStatus.value);
      console.log('myFormLifeInsurancePlan:', this.myFormLifeInsurancePlan.value);
      console.log('myFormLifeInsuranceGoal:', this.myFormLifeInsuranceGoal.value);
      console.log('myFormChooseOffer:', this.myFormChooseOffer.value);
      console.log('myFormPersonalDetails:', this.myFormPersonalDetails.value);
  
      this.router.navigate(['/danke']);
    } else {
      console.log('myFormPersonalDetails is not valid. Cannot submit.');
    }
  }

}
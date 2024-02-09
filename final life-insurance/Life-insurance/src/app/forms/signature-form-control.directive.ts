import {Directive, ElementRef, Renderer2, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Directive({
  selector: '[appSignatureFormControl]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignatureFormControlDirective),
      multi: true,
    },
  ],
})
export class SignatureFormControlDirective implements ControlValueAccessor {
  private onChange: Function | undefined;
  private onTouch: Function | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  writeValue(value: any): void {
    // Implement how the value is written to the DOM
    this.renderer.setProperty(this.el.nativeElement, 'value', value);
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.el.nativeElement, 'disabled', isDisabled);
  }

  // Implement methods to handle signature changes
}

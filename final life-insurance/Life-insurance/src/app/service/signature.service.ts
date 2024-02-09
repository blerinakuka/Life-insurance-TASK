import {Injectable, NgZone} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignatureService {
  public signatureData: string | null = null;

  constructor(private ngZone: NgZone) {
  }

  setSignature(data: string | null): void {
    this.signatureData = data;
    this.ngZone.run(() => {
    }); // Trigger change detection
  }

  getSignature(): string | null {
    return this.signatureData;
  }
}

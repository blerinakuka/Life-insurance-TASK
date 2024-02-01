import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PLZService {
  private apiUrl = 'https://api.hoi-versicherung.ch/api/Location/all';

  constructor(private http: HttpClient) {}

  fetchDataByPlz(plzValue: string): Observable<any> {
    const url = `https://api.hoi-versicherung.ch/api/Location/locationFilter?zipCode=${plzValue}`;
    return this.http.get(url);
  }

  extractAutocompleteData(data: any, plzValue: string): string[] {
    const suggestions: string[] = data
      .filter((place: any) => place.ZipCode.toString().startsWith(plzValue) && /^\d{1,5}$/.test(place.ZipCode))
      .map((place: any) => {
        return `${place.ZipCode}, ${place.City}, ${place.Community}`;
      });
    return suggestions;
  }

}

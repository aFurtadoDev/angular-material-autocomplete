import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { City } from '../models/city.model';
import { Country } from '../models/country.model';
import { State } from '../models/state.model';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  constructor(private http: HttpClient) {}

  getCountry(): Observable<Country[]> {
    return of([
      { id: 1, name: 'Brasil' },
      { id: 2, name: 'EUA' },
    ]);
  }

  getState(): Observable<State[]> {
    return of([
      { id: 1, name: 'Rio de Janeiro', countryId: 1 },
      { id: 2, name: 'São Paulo', countryId: 1 },
      { id: 3, name: 'Miami', countryId: 2 },
    ]);
  }

  getCity(): Observable<City[]> {
    return of([
      { id: 1, name: 'Angra dos Reis', stateId: 1 },
      { id: 2, name: 'Rio de Janeiro', stateId: 1 },
      { id: 3, name: 'Barueri', stateId: 2 },
      { id: 4, name: 'São Paulo', stateId: 2 },
      { id: 5, name: 'Miami', stateId: 3 },
    ]);
  }
}

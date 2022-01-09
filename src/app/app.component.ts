import { Component, VERSION } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { City } from './core/models/city.model';
import { Country } from './core/models/country.model';
import { State } from './core/models/state.model';
import { MockService } from './core/services/mock.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  country = new FormControl();
  state = new FormControl();
  city = new FormControl();

  countryData: Country[];
  stateData: State[];
  cityData: City[];

  filteredCountryOptions: Observable<Country[]>;
  filteredStateOptions: Observable<State[]>;
  filteredCityOptions: Observable<City[]>;

  constructor(private countryService: MockService) {}

  ngOnInit() {
    this.countryService.getCountry().subscribe((s) => (this.countryData = s));
    this.countryService.getState().subscribe((s) => (this.stateData = s));
    this.countryService.getCity().subscribe((s) => (this.cityData = s));

    this.country.valueChanges
      .pipe(
        startWith<string | Country>(),
        map((value) => (typeof value === 'string' ? value : value.name)),
        map((name) =>
          name ? this._filterCountry(name) : this.countryData?.slice()
        )
      )
      .subscribe((s) => {
        this.filteredCountryOptions = of(s);
        this.filteredStateOptions = of(
          this.stateData.filter((f) => f.countryId === s[0].id)
        );
      });

    this.state.valueChanges
      .pipe(
        startWith<string | State>(''),
        map((value) => (typeof value === 'string' ? value : value.name)),
        map((name) =>
          name ? this._filterState(name) : this.stateData?.slice()
        )
      )
      .subscribe((s) => {
        this.filteredStateOptions = of(s);
        this.filteredCityOptions = of(
          this.cityData.filter((f) => f.stateId === s[0].id)
        );
      });

    this.city.valueChanges
      .pipe(
        startWith<string | City>(''),
        map((value) => (typeof value === 'string' ? value : value.name)),
        map((name) => (name ? this._filterCity(name) : this.cityData?.slice()))
      )
      .subscribe((s) => (this.filteredCityOptions = of(s)));
  }

  private _filterCountry(name: string): Country[] {
    const filterValue = name?.toLowerCase();

    return this.countryData?.filter(
      (option) => option?.name?.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private _filterState(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.stateData?.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private _filterCity(value: string): City[] {
    const filterValue = value.toLowerCase();

    return this.cityData?.filter(
      (option) => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayCountryFn(country?: Country): string | undefined {
    return country ? country.name : undefined;
  }

  displayStateFn(state?: State): string | undefined {
    return state ? state.name : undefined;
  }

  displayCityFn(city?: City): string | undefined {
    return city ? city.name : undefined;
  }
}

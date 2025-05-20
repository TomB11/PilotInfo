import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { StationRequest } from '../../interfaces/stationRequest';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-formular',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  templateUrl: './formular.component.html',
  styleUrl: './formular.component.scss'
})
export class FormularComponent {
  @Output() submit = new EventEmitter<void>();
  submitted = false;
  public enterInputsForm: FormGroup = new FormGroup({});
  
  constructor(public fb: FormBuilder, public router: Router, public apiService: ApiService) {
    this.enterInputsForm = this.fb.group({
      options: this.fb.group({
          metar: new FormControl(false),
          sigmet: new FormControl(false),
          taf: new FormControl(false),
        }, { validators: this.atLeastOneCheckboxOrInputValidator() }),
      locations: this.fb.group({
          airports: new FormControl('', [this.inputMinLengthValidator(4)]),
          countries: new FormControl('', [this.inputMinLengthValidator(2)]),
        }, { validators: this.atLeastOneCheckboxOrInputValidator()
      })
    });
  }

  atLeastOneCheckboxOrInputValidator(minRequired = 1): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const checked = Object.values(control.value).filter(Boolean).length;
      return checked >= minRequired ? null : { atLeastOneRequired: true };
    };
  }

  inputMinLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = (control.value || '').replace(/\s+/g, '');
      return (value.length >= minLength || value.length === 0) ? null : { notMinimumLetters: true };
    };
  }

  formatForInput(event: Event, inputType: number) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\s+/g, '');

    if (inputType === 1) {
      value = value.replace(/(.{4})/g, '$1 ').trim();
      this.enterInputsForm.get('locations.airports')?.setValue(value, { emitEvent: false });
    } else{
      value = value.replace(/(.{2})/g, '$1 ').trim();
      this.enterInputsForm.get('locations.countries')?.setValue(value, { emitEvent: false });
    }
  }

  createPostRequestTemplate(airports: string[], countries: string[], reportTypes: any[]) {
    let reqTemplate : StationRequest = {
      id: "request" + this.apiService.postCounter(), 
      reportTypes: reportTypes,        
      stations: [] ,
      countries: []
    }

    if (airports.length > 0) {
      airports = airports.map((airport: string) => airport.toUpperCase());
      reqTemplate.stations = airports
        .map((airport: string) => airport.trim())
        .filter((airport: string) => airport.length === 4);
    }
    if (countries.length > 0) {
      countries = countries.map((country: string) => country.toUpperCase());
      reqTemplate.countries = countries
        .map((country: string) => country.trim())
        .filter((country: string) => country.length === 2);
    }

    return reqTemplate;
  }

  async onSubmit(form: FormGroup) {
    this.submitted = true;
    if (this.enterInputsForm.valid) {
      this.submit.emit();
      const airportsData = this.enterInputsForm.get('locations.airports')?.value.split(' ');
      const countriesData = this.enterInputsForm.get('locations.countries')?.value.split(' ');
      const reportTypesData = this.enterInputsForm.get('options')?.value;
      const reportTypes = []; 
      if (reportTypesData.metar) reportTypes.push("METAR");
      if (reportTypesData.sigmet) reportTypes.push("SIGMET");
      if (reportTypesData.taf) reportTypes.push("TAF_LONGTAF");

      const query = {
        id: "query" + this.apiService.postCounter(),
        method: "query",
        params: [this.createPostRequestTemplate(airportsData, countriesData, reportTypes)]
      };

      this.apiService.resultDataFromServer.set(await this.apiService.postJsonRpcQuery(query));
      //this.router.navigate(['resultTable']);
    }

    return;
  }
}

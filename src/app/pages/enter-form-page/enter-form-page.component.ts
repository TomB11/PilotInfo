import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormularComponent } from "../../components/formular/formular.component";
import { HeaderComponent } from "../../components/header/header.component";
import { Store } from '@ngrx/store';
import { StationReport } from '../../interfaces/station';
import { InformationTableComponent } from "../../components/information-table/information-table.component";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-enter-form-page',
  standalone: true,
  imports: [
    CommonModule,
    FormularComponent,
    HeaderComponent,
    InformationTableComponent
],
  templateUrl: './enter-form-page.component.html',
  styleUrl: './enter-form-page.component.scss',
})
export class EnterFormPageComponent {
  headerText = 'Choose your destination';
  headerTableText = 'Weather informations';
  dataSource = signal<StationReport[]>([]);
  formSubmitted = false;
  
  constructor(private store: Store) {
    this.store.select((state: any) => state.weather.data)
      .pipe(
        map((weather: any[]) => weather.map(item => ({
          ...item,
          textHTML: this.processTextHTML(item.textHTML ?? '')
        })))
      )
      .subscribe((processedData: StationReport[]) => {
        this.dataSource.set(processedData);
      });
  }

  processTextHTML(textHTML: string): string {
    return textHTML.replace(/\b(BKN|FEW|SCT)(\d{3})\b/g, (match, prefix, digits) => {
      const num = parseInt(digits, 10);
      if (num > 30) {
        return `<font color="red">${match}</font>`;
      } else {
        return `<font color="blue">${match}</font>`;
      }
    });
  }

  onSubmit() {
    this.formSubmitted = true;
  }
}

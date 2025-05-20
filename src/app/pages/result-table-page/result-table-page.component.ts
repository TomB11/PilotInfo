import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { StationReport } from '../../interfaces/station';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { InformationTableComponent } from "../../components/information-table/information-table.component";

@Component({
  selector: 'app-result-table',
  standalone: true,
  imports: [CommonModule, HeaderComponent, InformationTableComponent],
  templateUrl: './result-table-page.component.html',
  styleUrl: './result-table-page.component.scss'
})
export class ResultTablePageComponent {
  dataSource: StationReport[] = [];
  headerText = 'Weather informations';

  constructor( public apiService: ApiService) {
    this.dataSource = this.apiService.resultDataFromServer().map(item => ({
      ...item,
      textHTML: this.processTextHTML(item.textHTML ?? '')
    }));
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

  onBack(): void {
    window.history.back();
  }
}

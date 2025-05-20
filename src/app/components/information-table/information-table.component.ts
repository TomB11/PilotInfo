import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-information-table',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './information-table.component.html',
  styleUrl: './information-table.component.scss'
})
export class InformationTableComponent {
  @Input() data: any[] = [];
}

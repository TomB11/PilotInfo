import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultTablePageComponent } from './result-table-page.component';

describe('ResultTablePageComponent', () => {
  let component: ResultTablePageComponent;
  let fixture: ComponentFixture<ResultTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultTablePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

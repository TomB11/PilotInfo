import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterFormPageComponent } from './enter-form-page.component';

describe('EnterFormPageComponent', () => {
  let component: EnterFormPageComponent;
  let fixture: ComponentFixture<EnterFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

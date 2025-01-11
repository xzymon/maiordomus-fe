import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlyCandlesTableComponent } from './quarterly-candles-table.component';

describe('QuarterlyCandlesTableComponent', () => {
  let component: QuarterlyCandlesTableComponent;
  let fixture: ComponentFixture<QuarterlyCandlesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuarterlyCandlesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuarterlyCandlesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlyCandlesGraphComponent } from './quarterly-candles-graph.component';

describe('QuarterlyCandlesGraphComponent', () => {
  let component: QuarterlyCandlesGraphComponent;
  let fixture: ComponentFixture<QuarterlyCandlesGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuarterlyCandlesGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuarterlyCandlesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

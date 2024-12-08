import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterSpringComponent } from './starter-spring.component';

describe('StarterSpringComponent', () => {
  let component: StarterSpringComponent;
  let fixture: ComponentFixture<StarterSpringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarterSpringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarterSpringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

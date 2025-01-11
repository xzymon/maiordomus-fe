import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterSpringNewComponent } from './starter-spring-new.component';

describe('StarterSpringNewComponent', () => {
  let component: StarterSpringNewComponent;
  let fixture: ComponentFixture<StarterSpringNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarterSpringNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarterSpringNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

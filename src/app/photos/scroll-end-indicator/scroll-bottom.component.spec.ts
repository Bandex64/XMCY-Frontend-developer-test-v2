import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollEndIndicatorComponent } from './scroll-end-indicator.component';

describe('ScrollBottomComponent', () => {
  let component: ScrollEndIndicatorComponent;
  let fixture: ComponentFixture<ScrollEndIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollEndIndicatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollEndIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

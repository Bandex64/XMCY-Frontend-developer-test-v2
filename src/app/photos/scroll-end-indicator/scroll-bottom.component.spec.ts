import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ScrollEndIndicatorComponent } from './scroll-end-indicator.component';

class MockIntersectionObserver {
  static callback: any;

  observe: () => void;
  disconnect: () => void;

  constructor(
    public callback: (entries: Array<IntersectionObserverEntry>) => void
  ) {
    this.observe = jasmine.createSpy('observe');
    this.disconnect = jasmine.createSpy('unobserve');

    MockIntersectionObserver.callback = callback;
  }
}

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

    (window as any).IntersectionObserver = MockIntersectionObserver;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render the loading indicator when not intersected', () => {
    MockIntersectionObserver.callback([{ intersectionRatio: 0 }]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const loadingIndicator = compiled.querySelector('mat-spinner');

    expect(loadingIndicator).toBeNull();
  });

  it('should not render the loading indicator when partially intersected', () => {
    MockIntersectionObserver.callback([{ intersectionRatio: 0.8 }]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const loadingIndicator = compiled.querySelector('mat-spinner');

    expect(loadingIndicator).toBeNull();
  });


  it('should render the loading indicator when fully intersected', () => {
    MockIntersectionObserver.callback([{ intersectionRatio: 1 }]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const loadingIndicator = compiled.querySelector('mat-spinner');

    expect(loadingIndicator).toBeTruthy();
  });

  it('should not emit the scrollEndReached event immedieately', () => {
    spyOn(fixture.componentInstance.scrollEndReached, 'emit');

    MockIntersectionObserver.callback([{ intersectionRatio: 1 }]);
    fixture.detectChanges();

    expect(fixture.componentInstance.scrollEndReached.emit).toHaveBeenCalledTimes(0);
  });

  it('should emit the scrollEndReached event after 300ms', fakeAsync(() => {
    spyOn(fixture.componentInstance.scrollEndReached, 'emit');

    MockIntersectionObserver.callback([{ intersectionRatio: 1 }]);
    fixture.detectChanges();

    tick(300);
    fixture.detectChanges();

    expect(fixture.componentInstance.scrollEndReached.emit).toHaveBeenCalledTimes(1);
  }));

  it('should also hide the loading indicator after 300ms', fakeAsync(() => {
    spyOn(fixture.componentInstance.scrollEndReached, 'emit');

    MockIntersectionObserver.callback([{ intersectionRatio: 1 }]);
    fixture.detectChanges();

    tick(300);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const loadingIndicator = compiled.querySelector('mat-spinner');

    expect(loadingIndicator).toBeNull();
  }));
});

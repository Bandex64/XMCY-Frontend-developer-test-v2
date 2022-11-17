import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output } from '@angular/core';
import { delay, Subject } from 'rxjs';

@Component({
  selector: 'app-scroll-end-indicator',
  templateUrl: './scroll-end-indicator.component.html',
  styleUrls: ['./scroll-end-indicator.component.scss']
})
export class ScrollEndIndicatorComponent implements AfterViewInit, OnDestroy {
  @Output() scrollEndReached: EventEmitter<string[]> = new EventEmitter();

  protected intersected: boolean = false;

  private interSectionObserver: IntersectionObserver | undefined;
  private delaySubject = new Subject();

  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    this.createObserver();

    this.delaySubject.pipe(delay(300)).subscribe(()=> {
      this.scrollEndReached.emit();
      this.intersected = false;
    });
  }

  private createObserver() {
    const options = {
      rootMargin: '0px',
      threshold: 1
    }

    this.interSectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio === 1) {
        this.intersected = true;
        this.delaySubject.next(true);
      }
    }, options);

    this.interSectionObserver.observe(this.element.nativeElement);
  }

  ngOnDestroy() {
    this.interSectionObserver?.disconnect();
    this.delaySubject.unsubscribe();
  }
}

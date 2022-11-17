import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ImageGridComponent } from './image-grid.component';

const mockImageUrls = ['url1', 'url2', 'url3', 'url4'];

@Component({
  template: `<app-image-grid>
    <div id="projected-content"></div>
  </app-image-grid>`
})
class TestHostComponent {
}

describe('ImageGridComponent', () => {
  let component: ImageGridComponent;
  let fixture: ComponentFixture<ImageGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageGridComponent, TestHostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a grid component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const grid = compiled.querySelector('mat-grid-list');

    expect(grid).toBeTruthy();
  });

  it('should not render any images when the related input is not defined', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('img');

    expect(images.length).toEqual(0);
  });

  it('should render all the images inside the grid received as an input', () => {
    fixture.componentInstance.imageUrls = mockImageUrls;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('img');

    expect(images.length).toEqual(mockImageUrls.length);

    images.forEach((img, index) => {
      expect(img.getAttribute('src')).toEqual(mockImageUrls[index]);;
    });
  });

  it('should emit an event with the url of the image in a parameter when user clicks on the image', fakeAsync(() => {
    spyOn(fixture.componentInstance.imageClicked, 'emit');

    fixture.componentInstance.imageUrls = mockImageUrls;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('img');

    images.forEach((img, index) => {
      img.click();
      tick();

      expect(fixture.componentInstance.imageClicked.emit).toHaveBeenCalledWith(mockImageUrls[index]);
    });
  }));

  it('should accept a projected content from the parent component', () => {
    const testFixture = TestBed.createComponent(TestHostComponent);
    const projectedContent = testFixture.debugElement.query(By.css('#projected-content'));

    expect(projectedContent).toBeTruthy();
  });
});

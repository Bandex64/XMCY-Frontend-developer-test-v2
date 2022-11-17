import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FavoritesService } from '../services/favorites.service';

import { FavoritesComponent } from './favorites.component';

const mockFavoriteUrls = ['url1', 'url2', 'url3', 'url4'];
const mockFavoritesService = { getFavoriteImageUrls: () => mockFavoriteUrls };

@Component({
  template: '<ng-content></ng-content>',
  selector: 'app-image-grid'
})
class MockImageGridComponent {
  @Input() imageUrls = [];

  @Output() imageClicked = new EventEmitter();
}

@Component({})
class DummyComponent {}

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesComponent, MockImageGridComponent ],
      imports: [RouterTestingModule.withRoutes([
        {path: '**', component: DummyComponent},
        {path: 'photos/:id', component: DummyComponent}]
      )],
      providers: [{provide: FavoritesService, useValue: mockFavoritesService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the ImageGridComponent', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const imageGrid = compiled.querySelector('app-image-grid');

    expect(imageGrid).toBeTruthy();
  });

  it('should pass the image urls to the grid component received from the FavoritesService', () => {    
    const imageuRls = fixture.debugElement.query(By.directive(MockImageGridComponent)).componentInstance.imageUrls;
    fixture.detectChanges();

    expect(imageuRls.length).toEqual(mockFavoriteUrls.length);
    imageuRls.forEach((url: string, index: number) => {
      expect(url).toEqual(mockFavoriteUrls[index]);
    });
  });

  it('should naviagte to the proper router location when ImageGridComponent emits a click event', () => {
    const mockUrl = 'clicked_image_url';
    const router = TestBed.inject(Router);

    spyOn(router, 'navigate');

    fixture.debugElement.query(By.directive(MockImageGridComponent)).componentInstance.imageClicked.emit(mockUrl);
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledOnceWith(['photos', mockUrl]);
  });
});

import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({})
class DummyComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{path: '**', component: DummyComponent}])],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should render the toolbar with two buttons`, () => {
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toolbar = compiled.querySelector('mat-toolbar');
    const btnPhotos = toolbar?.querySelector('#btn-photos');
    const btnFavorites = toolbar?.querySelector('#btn-favorites');

    expect(toolbar).toBeDefined();
    expect(btnPhotos).toBeDefined();
    expect(btnFavorites).toBeDefined();
  });

  it(`should render a router-outlet`, () => {
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const toolbar = compiled.querySelector('router-outlet');

    expect(toolbar).toBeDefined();
  });

  it('should navigate to the default path when clicking on the "Photos" button and highlgiht the buttomn itself', fakeAsync(() => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const btnPhotos = compiled.querySelector('#btn-photos') as HTMLElement;
    const btnFavorites = compiled.querySelector('#btn-favorites') as HTMLElement; 

    btnPhotos.click();
    tick();

    expect(router.url).toEqual('/');
    expect(btnPhotos.classList.contains('active')).toBeTrue();
    expect(btnFavorites.classList.contains('active')).toBeFalse();
  }));

  it('should navigate to the favorites path when clicking on the "Favorites" button', fakeAsync(() => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const btnFavorites = compiled.querySelector('#btn-favorites') as HTMLElement; 
    const btnPhotos = compiled.querySelector('#btn-photos') as HTMLElement;

    btnFavorites.click();
    tick();

    expect(router.url).toEqual('/favorites');
    expect(btnFavorites.classList.contains('active')).toBeTrue();
    expect(btnPhotos.classList.contains('active')).toBeFalse();
  }));
});

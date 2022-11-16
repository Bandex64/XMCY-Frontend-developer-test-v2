import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { IMAGE_BASE_URL } from '../app-constants';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {

  constructor(private httpClient: HttpClient) { }

  getRandomImage(): Observable<string> {
    return this.httpClient.get(IMAGE_BASE_URL, {observe: 'response', responseType: 'blob'}).pipe(
      map((response) => {
        const val = response.url || '';
        return val;
      }
    )
    );
  }
}

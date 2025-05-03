// news.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsResolver implements Resolve<any> {
  resolve() {
    return of(true); // Yahan actual API call karo aur observable return karo
  }
}
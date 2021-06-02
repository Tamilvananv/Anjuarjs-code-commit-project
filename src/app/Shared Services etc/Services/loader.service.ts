import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  isLoading = new BehaviorSubject(false);

  display() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }
}

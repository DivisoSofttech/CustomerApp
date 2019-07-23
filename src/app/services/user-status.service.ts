import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {
  constructor() {
    this.loggedIn = false;
    this.enableFilter = true;
    this.observableStatus = new BehaviorSubject<boolean>(this.loggedIn);
    this.observableFilterToggle = new BehaviorSubject<boolean>(this.enableFilter);
  }

  observableStatus: BehaviorSubject<boolean>;
  loggedIn: boolean;
  observableFilterToggle: BehaviorSubject<boolean>;
  enableFilter: boolean;

  setstatusTrue() {
    this.loggedIn = true;
    this.observableStatus.next(this.loggedIn);
  }

  setstatusFalse() {
    this.loggedIn = false;
    this.observableStatus.next(this.loggedIn);
  }

  enableFilterView() {
    this.enableFilter = true;
    this.observableFilterToggle.next(this.enableFilter);
  }

  disableFilterView() {
    this.enableFilter = false;
    this.observableFilterToggle.next(this.enableFilter);
  }
}

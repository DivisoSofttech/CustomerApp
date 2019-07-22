import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {
  constructor() {
    this.loggedIn = false;
    this.observableStatus = new BehaviorSubject<boolean>(this.loggedIn);
  }

  observableStatus: BehaviorSubject<boolean>;
  loggedIn: boolean;

  setstatusTrue() {
    this.loggedIn = true;
    this.observableStatus.next(this.loggedIn);
  }

  setstatusFalse() {
    this.loggedIn = false;
    this.observableStatus.next(this.loggedIn);
  }
}

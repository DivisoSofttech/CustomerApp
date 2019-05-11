import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentSubPage : string = 'history'
  constructor() { }

  ngOnInit() {
  }
  
  segmentChanged(ev : any)
  {
    this.currentSubPage = ev.detail.value;
  }

}

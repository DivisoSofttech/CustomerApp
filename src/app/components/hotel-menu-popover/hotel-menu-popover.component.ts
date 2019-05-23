import { Category } from './../../api/models/category';
import { Component, OnInit, Input } from '@angular/core';
import { QueryResourceService } from 'src/app/api/services';

@Component({
  selector: 'app-hotel-menu-popover',
  templateUrl: './hotel-menu-popover.component.html',
  styleUrls: ['./hotel-menu-popover.component.scss']
})
export class HotelMenuPopoverComponent implements OnInit {
  @Input()
  categories: Category[] = [];

  constructor() {}

  ngOnInit() {
  }
}

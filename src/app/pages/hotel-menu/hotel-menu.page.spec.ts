import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelMenuPage } from './hotel-menu.page';

describe('HotelMenuPage', () => {
  let component: HotelMenuPage;
  let fixture: ComponentFixture<HotelMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

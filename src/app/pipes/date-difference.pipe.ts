import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateDifference'
})
export class DateDifferencePipe implements PipeTransform {

  transform(value: any,  arg1?: any , arg2?:any): any {

    let date = new Date();

    let st = {
      month: date.getMonth(),
      year: date.getFullYear(),
    };

    let now = moment(value)
    let openingTime = moment(new Date(arg1).setDate(date.getDate()));
    let closingTime = moment(new Date(arg2).setDate(date.getDate()));
    openingTime.set(st);
    closingTime.set(st);

    if(closingTime.isBefore(openingTime)) {
      closingTime.add(1,'days');
    }

    if(now.isAfter(closingTime)) {
      openingTime.add(1,'days');
    }

    return moment.duration(now.diff(openingTime)).asHours();
  }

}

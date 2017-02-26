import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'milliToTime'})
export class MilliToTime implements PipeTransform {
  transform(milli: number): string {
    let minutes = Math.floor(milli / 60000);
    let seconds = parseInt(((milli % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
}

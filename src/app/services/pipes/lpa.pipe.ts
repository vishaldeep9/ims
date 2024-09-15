import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lpa'
})
export class LpaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value+"LPA";
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizePipe'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'removeChar'})
export class RemoveCharPipe implements PipeTransform {
  transform(value: string) {
    let charTorepcae='_';
    return value.replace(charTorepcae,' ');
  }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fileName'})
export class FileNamePipe implements PipeTransform {
  transform(value: string,removeTimeStamp:boolean) {
    let filename =value.replace(/^.*(\\|\/|\:)/, '');
    if(removeTimeStamp){
      return filename.replace(filename.substring(filename.lastIndexOf('_'),filename.lastIndexOf('.')),'');
    }else{
      return filename;
    }
  }
}
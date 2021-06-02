import { Pipe } from '@angular/core';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({ name: 'filterlist', pure: true })
export class Filterlist {
  transform(List: any, ID: any, SearchElement: any): any {
    List = List.filter(o => o[SearchElement] === ID.value);
    return List;
  }
}

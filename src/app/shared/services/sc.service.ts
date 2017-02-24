import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SCService {

  constructor() { }

  getPlayer(track: any) {
    return Observable.create(observer => {
      SC.stream('/tracks/' + track.id, {autoPlay: false}).then(player => {
        observer.next(player);
        observer.complete();
      });
    });
  };

  search(query: any) {
    return Observable.create(observer => {
      SC.get('/search/', {q: query, limit: 10}).then(res => {
        observer.next(res.collection);
        observer.complete();
      });
    });
  }

}

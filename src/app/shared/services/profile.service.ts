import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// import { environment } from '../../../environments/environment';

@Injectable()
export class ProfileService {

  constructor(private http: Http) { }

  getProfile() {
    // check and return a user obj from local ionic storage
    // for not mocking demo account id: 1209
    let user = {
      id: '1209',
      name: 'Demo',
      pic_url: ''
    };

    return Observable.create(observer => {
      observer.next(user);
      observer.complete();
    });
  };

}

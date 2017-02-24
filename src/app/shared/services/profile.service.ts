import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

// import { environment } from '../../../environments/environment';

@Injectable()
export class ProfileService {
  url: String = '';

  constructor(private http: Http, private storage: Storage) {
    this.url = '/soundbox';
  }

  getProfile() {
    return Observable.create(observer => {
      this.storage.get('profile').then((val) => {
        observer.next(val);
        observer.complete();
      });
    });
  };

  verifyUser(userId, name) {
    return this.http
      .put(`${this.url}/api/login/checkUser/${userId}`, name)
      .map(res => res.json());
  };

}

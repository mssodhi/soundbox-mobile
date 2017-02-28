import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Storage } from '@ionic/storage';
import { Facebook } from 'ionic-native';
import { Observable } from 'rxjs';
import { ACTION } from '../../shared';

// import { environment } from '../../../environments/environment';

@Injectable()
export class ProfileService {
  url: String = '';

  constructor(private http: Http, private storage: Storage, private store: Store<any>) {
    Facebook.browserInit(615039345329876, '2.4');
    this.url = 'http://mssodhi.me/soundbox';
    // this.url = '/soundbox';
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
      .map(res => {
        this.storage.set('profile', res.json());
        return res.json();
      });
  };

  facebookLogin() {
    let permissions = ['email', 'public_profile'];
    return Observable.create(observer => {
      Facebook.login(permissions).then(res => {
        if(res.status === 'connected'){
          Facebook.api('/me', permissions).then(response => {
            observer.next(response);
            observer.complete();
          });
        }
      });
    });
  };

  facebookLogout() {
    return Observable.create(observer => {
      Facebook.logout().then(res => {
        this.storage.remove('profile');
        observer.next(res);
        observer.complete();
      });
    });
  }

}

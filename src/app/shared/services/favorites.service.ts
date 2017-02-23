import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// import { environment } from '../../../environments/environment';

@Injectable()
export class FavoritesService {

  constructor(private http: Http) { }

  getFavorites(userId: any) {
    return this.http
      .get(`/soundbox/api/favorites/getFavorites/user/${userId}`)
      .map(res => res.json());
  }

}

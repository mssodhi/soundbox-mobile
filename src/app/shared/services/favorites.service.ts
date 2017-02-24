import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class FavoritesService {
  url: String = '';

  constructor(private http: Http, private platform: Platform) {
    // this.url = 'http://mssodhi.me/soundbox';
    this.url = '/soundbox';
  }

  getFavorites(userId: any) {
    return this.http
      .get(`${this.url}/api/favorites/getFavorites/user/${userId}`)
      .map(res => res.json());
  }

  getCharts(name: String) {
    return this.http
      .get(`${this.url}/api/charts/getByGenre/${name}`)
      .map(res => res.json());
  }

  getGenres() {
    return this.http
      .get(`${this.url}/api/charts/getGenres`)
      .map(res => res.json());
  }

}

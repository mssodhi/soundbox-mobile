import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';

@Injectable()
export class FavoritesService {
  url: String = '';

  constructor(private http: Http, private platform: Platform) {
    this.url = 'http://mssodhi.me/soundbox';
    // this.url = '/soundbox';
  }

  loadPlaylist(playlist) {
    return Observable.create(observer => {
      let playlistTracks = [];
      playlist.songs.forEach(song => {
        SC.get('/tracks/' + song.track_id).then(data => playlistTracks.push(data));
      });
      observer.next(playlistTracks);
      observer.complete();
    });
  }

  loadArtist(artist) {
    return Observable.create(observer => {
      let tracks = [];

      SC.get('/tracks', {user_id: artist.id}).then(res => {
        res.forEach(track => {
          tracks.push(track);
        })
      });
      observer.next(tracks);
      observer.complete();
    });
  }

  getPlaylists(userId: any) {
    return this.http
      .get(`${this.url}/api/playlist/getPlaylist/user/${userId}`)
      .map(res => res.json());
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

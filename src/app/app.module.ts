import { NgModule, ErrorHandler } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ChartsPage } from '../pages/charts/charts';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { SearchPage } from '../pages/search/search';
import { SignInPage } from '../pages/signin/signin';
import { TabsPage } from '../pages/tabs/tabs';
import { ARTIST_REDUCER, CHARTS_REDUCER, FAVORITES_REDUCER, PLAYER_REDUCER, PROFILE_REDUCER, SEARCH_REDUCER, FavoritesService, ProfileService, SCService, Effects, ArtistComponent, MusicPlayer, TrackListItem, UserListItem } from './shared';

@NgModule({
  declarations: [
    MyApp,
    ArtistComponent,
    ChartsPage,
    HomePage,
    TabsPage,
    SearchPage,
    SettingsPage,
    SignInPage,
    MusicPlayer,
    TrackListItem,
    UserListItem
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    EffectsModule.run(Effects),
    StoreModule.provideStore({ ARTIST_REDUCER, CHARTS_REDUCER, FAVORITES_REDUCER, PLAYER_REDUCER, PROFILE_REDUCER, SEARCH_REDUCER })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ArtistComponent,
    ChartsPage,
    HomePage,
    TabsPage,
    SearchPage,
    SettingsPage,
    SignInPage,
    MusicPlayer,
    TrackListItem,
    UserListItem
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ProfileService, FavoritesService, SCService]
})
export class AppModule {}

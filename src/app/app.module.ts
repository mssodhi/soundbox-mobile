import { NgModule, ErrorHandler } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ChartsPage } from '../pages/charts/charts';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SignInPage } from '../pages/signin/signin';
import { CHARTS_REDUCER, FAVORITES_REDUCER, PLAYER_REDUCER, PROFILE_REDUCER, FavoritesService, ProfileService, SCService, Effects, MusicPlayer } from './shared';

@NgModule({
  declarations: [
    MyApp,
    ChartsPage,
    HomePage,
    TabsPage,
    SignInPage,
    MusicPlayer
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    EffectsModule.run(Effects),
    StoreModule.provideStore({ CHARTS_REDUCER, FAVORITES_REDUCER, PLAYER_REDUCER, PROFILE_REDUCER })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChartsPage,
    HomePage,
    TabsPage,
    SignInPage,
    MusicPlayer
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ProfileService, FavoritesService, SCService]
})
export class AppModule {}

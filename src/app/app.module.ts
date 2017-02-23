import { NgModule, ErrorHandler } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SignInPage } from '../pages/signin/signin';
import { PROFILE_REDUCER, FAVORITES_REDUCER, FavoritesService, ProfileService, Effects } from './shared';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SignInPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    EffectsModule.run(Effects),
    StoreModule.provideStore({ PROFILE_REDUCER, FAVORITES_REDUCER })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SignInPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ProfileService, FavoritesService]
})
export class AppModule {}

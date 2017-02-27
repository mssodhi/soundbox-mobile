import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ChartsPage } from '../charts/charts';
import { SettingsPage } from '../settings/settings';
import { SearchPage } from '../search/search';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homePage: any = HomePage;
  chartsPage: any = ChartsPage;
  searchPage: any = SearchPage;
  settingsPage: any = SettingsPage;

  constructor() {}
}

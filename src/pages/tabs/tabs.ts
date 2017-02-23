import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ChartsPage } from '../charts/charts';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homePage: any = HomePage;
  chartsPage: any = ChartsPage;
  settingsPage: any = SettingsPage;

  constructor() {}
}

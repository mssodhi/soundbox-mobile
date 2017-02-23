import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ChartsPage } from '../charts/charts';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  homePage: any = HomePage;
  chartsPage: any = ChartsPage;

  constructor() {}
}

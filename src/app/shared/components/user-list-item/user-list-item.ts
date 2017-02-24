import {Component, Input} from '@angular/core';
import { Store } from '@ngrx/store';

import { ACTION, STATUS } from "../../constants";

@Component({
  selector: 'user-list-item',
  templateUrl: 'user-list-item.html'
})
export class UserListItem {
  @Input() user: any;

  constructor(private store: Store<any>) {}

  onSelect(user) {
    console.log(user);
  }

}

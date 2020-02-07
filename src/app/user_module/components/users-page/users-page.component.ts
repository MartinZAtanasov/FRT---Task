import { selectAllUsers$ } from './../../store/user.selectors';
import { State } from './../../store/user.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { onFetchUsers } from '../../store/user.actions';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  constructor(private store: Store<State>) { }

  newUserModal = false;

  ngOnInit() {
    this.store.select(selectAllUsers$).pipe(take(1)).subscribe( users => {
      if (!users.length) { this.store.dispatch(onFetchUsers()); }
    });
  }

}

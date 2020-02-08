import { selectAllUsers$, loading$ } from './../../store/user.selectors';
import { State } from './../../store/user.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { onFetchUsers } from '../../store/user.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  constructor(private store: Store<State>) { }

  newUserModal = false;
  delUserModal = false;
  delUserId: string;

  loading$: Observable<boolean>;

  ngOnInit() {
    this.store.select(selectAllUsers$).pipe(take(1)).subscribe( users => {
      if (!users.length) { this.store.dispatch(onFetchUsers()); }
    });

    this.loading$ = this.store.select(loading$);
  }

  openDelUserModal(id: string) {
    this.delUserId = id;
    this.delUserModal = true;
  }

}

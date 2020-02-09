import { selectAllUsers$, loading$, loaded$, error$ } from './../../store/user.selectors';
import { State } from './../../store/user.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { onFetchUsers } from '../../store/user.actions';
import { Observable } from 'rxjs';
import { fadeInOut } from 'src/app/animations';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  animations: [fadeInOut]
})
export class UsersPageComponent implements OnInit {

  constructor(private store: Store<State>) { }

  newUserModal = false;
  delUserModal = false;
  delUserId: string;

  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  error$: Observable<string>;


  ngOnInit() {
    this.store.select(selectAllUsers$).pipe(take(1)).subscribe( users => {
      if (!users.length) { this.store.dispatch(onFetchUsers()); }
    });

    this.loading$ = this.store.select(loading$);
    this.loaded$ = this.store.select(loaded$);
    this.error$ = this.store.select(error$);

  }

  openDelUserModal(id: string) {
    this.delUserId = id;
    this.delUserModal = true;
  }

}

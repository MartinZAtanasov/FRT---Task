import { exhaustMap, take } from 'rxjs/operators';
import { selectUser, selectAllUsers$ } from './../../store/user.selectors';
import { State, User } from './../../store/user.reducer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { onFetchUsers } from '../../store/user.actions';

@Component({
  selector: 'app-single-user-page',
  templateUrl: './single-user-page.component.html',
  styleUrls: ['./single-user-page.component.scss']
})
export class SingleUserPageComponent implements OnInit {

  user$: Observable<User>;

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit() {
    this.store.select(selectAllUsers$).pipe(take(1)).subscribe( users => {
      if (!users.length) { this.store.dispatch(onFetchUsers()); }
    });

    this.user$ = this.route.params.pipe(
      exhaustMap( params => this.store.select(selectUser, params.id))
    );
  }

}

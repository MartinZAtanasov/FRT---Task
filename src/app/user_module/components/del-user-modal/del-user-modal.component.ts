import { loading$, error$ } from './../../store/user.selectors';
import { State, User } from './../../store/user.reducer';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser$ } from '../../store/user.selectors';
import { Observable, Subscription } from 'rxjs';
import { onDeleteUser } from '../../store/user.actions';

@Component({
  selector: 'app-del-user-modal',
  templateUrl: './del-user-modal.component.html',
  styleUrls: ['./del-user-modal.component.scss']
})
export class DelUserModalComponent implements OnInit, OnDestroy {

  constructor(private store: Store<State>) { }

  @Input() userId: string;
  error$: Observable<string>;
  loading$: Observable<boolean>;
  user: User;
  subscription: Subscription;

  ngOnInit() {
    this.loading$ = this.store.select(loading$);
    this.error$ = this.store.select(error$);
    this.subscription = this.store.select(selectUser$, this.userId).subscribe( user => this.user = user);
  }

  deleteUser() {
    this.store.dispatch(onDeleteUser({id: this.user.id}));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

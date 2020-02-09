import { fade } from 'src/app/animations';
import { onUpdateUser } from './../../store/user.actions';
import { User, State } from './../../store/user.reducer';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { loading$ } from '../../store/user.selectors';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  animations: [fade]
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  constructor(private store: Store<State>) { }

  @Input() user$: Observable<User>;
  loading$: Observable<boolean>;
  copyUser: User;
  subscription: Subscription;
  user: User;

  ngOnInit() {
    this.subscription = this.user$.subscribe( user => {
      this.copyUser = {...user};
      this.user = user;
    });
    this.loading$ = this.store.select(loading$);
  }

  onSubmit(form: NgForm) {
    this.user.firstName = form.value.firstName;
    this.user.lastName = form.value.lastName;
    this.user.role = form.value.role;
    this.store.dispatch(onUpdateUser(this.user));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  switchStatus(): void {
    this.store.dispatch(onUpdateUser({...this.user, active: !this.user.active}));
  }
}

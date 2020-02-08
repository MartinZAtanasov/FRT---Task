import { updateUser, onUpdateUser } from './../../store/user.actions';
import { User, State } from './../../store/user.reducer';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  constructor(private store: Store<State>) { }

  @Input() user$: Observable<User>;
  copyUser: User;
  subscription: Subscription;
  user: User;

  ngOnInit() {
    this.subscription = this.user$.subscribe( user => {
      this.copyUser = {...user};
      this.user = user;
    });
  }

  onSubmit(form: NgForm) {
    this.user.firstName = form.value.firstName;
    this.store.dispatch(onUpdateUser(this.user));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

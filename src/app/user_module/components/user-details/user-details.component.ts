import { User } from './../../store/user.reducer';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  constructor() { }

  @Input() user$: Observable<User>;
  copyUser: User;
  subscription: Subscription;

  ngOnInit() {
    this.subscription = this.user$.subscribe( user => user ? this.copyUser = {...user} : null);
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

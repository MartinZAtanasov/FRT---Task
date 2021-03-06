import { loading$, loaded$ } from './../../store/user.selectors';
import { State, User } from './../../store/user.reducer';
import { onAddUser } from './../../store/user.actions';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {

  loading$: Observable<boolean>;
  loaded: boolean;

  @ViewChild('f', {static: true}) form: NgForm;

  constructor(private store: Store<State>) {
    this.loading$ = store.select(loading$);
  }

  ngOnInit() {
    this.store.select(loaded$).subscribe( loaded => {
      if (loaded) {
        this.form.resetForm();
      }
    });
  }

  onSubmit(form: NgForm) {
    const newUser: User = {
      id: null,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      role: form.value.role,
      active: false
    };
    this.store.dispatch(onAddUser(newUser));
  }

}


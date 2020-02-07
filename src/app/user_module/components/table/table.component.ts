import { State, User } from './../../store/user.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllUsers$, loading$ } from '../../store/user.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  users: Observable<User[]>;
  loading: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.users = store.select(selectAllUsers$);
    this.loading = store.select(loading$);
  }

  ngOnInit() {
  }

}

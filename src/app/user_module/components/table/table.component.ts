import { State, User } from './../../store/user.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllUsers$, loading$ } from '../../store/user.selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  users: Observable<User[]>;
  loading: Observable<boolean>;

  constructor(private store: Store<State>, private router: Router) {
    this.users = store.select(selectAllUsers$);
    this.loading = store.select(loading$);
  }

  ngOnInit() {
  }

  navigatoToUser(id: string): void {
    this.router.navigate(['users/' + id]);
  }

}

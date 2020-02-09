import { onUpdateUser } from './../../store/user.actions';
import { UserService } from './../../user.service';
import { State, User } from './../../store/user.reducer';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllUsers$ } from '../../store/user.selectors';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  @Output() openDelUserModal: EventEmitter<string> = new EventEmitter();
  subs: Subscription[] = [];
  // Table
  users: User[];
  filteredUsers: User[] = [];
  rows = 5;
  paginationCount = 2;
  currentPage = 1;
  filterString: string;
  sortProperty = {
    activeSort: '',
    types: {
      name: false,
      role: false,
      status: false
    }
  };
  // Table
  constructor(private store: Store<State>, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.subs.push(this.store.select(selectAllUsers$).subscribe( users => this.users = users));
    this.subs.push(this.userService.filterSubject.subscribe( filterString => {
      this.currentPage = 1;
      this.filterString = filterString;
    }));
    this.filterString = null;
  }

  navigatoToUser(id: string): void {
    this.router.navigate(['users/' + id]);
  }

  pages(): number {
    const users = this.filterString ? this.filteredUsers : this.users;
    return Math.ceil(users.length / this.rows);
  }

  pagination(): number[] {
    const pages =  [...Array(this.pages()).keys()].map( v => v += 1);
    const range = Math.ceil(this.paginationCount / 2);
    if (this.currentPage < this.paginationCount) {
      return pages.filter( v => v <= this.paginationCount);
    } else {
        if (this.currentPage > this.pages() - this.paginationCount) {
          return pages.filter( v => v > this.pages() - this.paginationCount);
        } else {
          return pages.filter( v => v <= this.currentPage + range && v > this.currentPage - range);
        }
    }
  }

  selectRows(): void {
    const usersLength = this.filteredUsers.length ? this.filteredUsers.length : this.users.length;
    if (this.rows * this.currentPage > usersLength) {
      this.currentPage = Math.ceil(usersLength / this.rows);
    }
  }

  displayedUsers(): User[] {
    let users: User[] = [...this.users];
    if ( this.filterString) {
      users = this.users.filter( v => this.filterUsers(v, this.filterString));
      this.filteredUsers = users;
    }
    users = this.sort(users);
    const endIndex = this.currentPage * this.rows;
    const startIndex = endIndex - this.rows;
    return users.filter( (_, i) => i < endIndex && i >= startIndex);
  }

  selectPage(page: number): void {
    this.currentPage = page;
  }

  navigate(forward: boolean): void {
    forward ? this.currentPage += 1 : this.currentPage -= 1;
  }

  sort(users: User[]): User[] {
    let sortedUsers: User[];
    const type = this.sortProperty.activeSort;
    switch (type) {
      case 'name':
        sortedUsers = users.sort( (a, b) => a.firstName.localeCompare(b.firstName));
        break;
      case 'status':
        sortedUsers = users.sort( (a, b) => +b.active - +a.active);
        break;
      case 'role':
        sortedUsers = users.sort( (a, b) => a.role.localeCompare(b.role));
        break;
      default:
        sortedUsers = users;
    }
    return this.sortProperty.types[type] ? sortedUsers : sortedUsers.reverse();
  }

  onSort(type: string): void {
    this.sortProperty.activeSort = type;
    this.sortProperty.types[type] = !this.sortProperty.types[type];
  }

  ngOnDestroy() {
    this.subs.forEach( v => v.unsubscribe());
  }

  deleteUser(id: string): void {
    this.openDelUserModal.emit(id);
  }

  switchStatus(user: User): void {
    this.store.dispatch(onUpdateUser({...user, active: !user.active}));
  }

  // Helper Functions
  filterUsers(user: User, filterString: string) {
    const values = [user.firstName, user.lastName, user.email].map( v => v.toLowerCase());
    filterString = filterString.toLowerCase();
    const pass = values.some( v => v.includes(filterString));
    return pass;
  }


}

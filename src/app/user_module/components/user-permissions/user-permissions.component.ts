import { State } from './../../store/user.reducer';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from '../../store/user.reducer';
import { Store } from '@ngrx/store';
import { onUpdateUser } from '../../store/user.actions';
import { Observable, Subscription } from 'rxjs';
import { fade } from 'src/app/animations';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.scss'],
  animations: [fade]
})
export class UserPermissionsComponent implements OnInit, OnDestroy {

  constructor(private store: Store<State>) { }

  @Input() user$: Observable<User>;
  user: User;
  subscription: Subscription;
  permissionGroups = [...Array(3).keys()].map( v => v += 1);
  permissions = [...Array(5).keys()].map( v => v += 1);
  groups = {
    1: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    },
    2: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    },
    3: {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    }
  };

  showGroups = {
    1: false,
    2: false,
    3: false
  };

  ngOnInit() {
    this.subscription = this.user$.subscribe( user => {
      if (user) {
        this.user = user;
        if (user.permissions) {
          if (user.permissions[1]) {this.groups[1] = {...user.permissions[1]}; }
          if (user.permissions[2]) {this.groups[2] = {...user.permissions[2]}; }
          if (user.permissions[3]) {this.groups[3] = {...user.permissions[3]}; }
        }
      }
    });
  }

  switchSuperAdmin() {
    this.store.dispatch(onUpdateUser({...this.user, superAdmin: !this.user.superAdmin}));
  }

  switchGroup(group: number): void {
    this.groups[group][0] = !this.groups[group][0];
    this.store.dispatch(onUpdateUser({...this.user, permissions: this.groups}));
  }

  switchPermission(group: number, permission: number): void {
    this.groups[group][permission] = !this.groups[group][permission];
    this.store.dispatch(onUpdateUser({...this.user, permissions: this.groups}));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

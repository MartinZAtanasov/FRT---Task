import { errorUser } from './../store/user.actions';
import { selectUser$ } from './../store/user.selectors';
import { State } from './../store/user.reducer';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckForUserGuard implements CanActivate   {

  constructor(private router: Router, private store: Store<State>) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectUser$, next.params.id).pipe(
      map( user => {
        if (user) { return true; } else {
          this.router.navigate(['/users']);
          return false;
        }
      })
    );
  }
}

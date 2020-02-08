import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { User } from './user.reducer';
import * as fromUserActions from './user.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private fireStore: AngularFirestore) {}

    addRecipe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUserActions.onAddUser),
            exhaustMap( async (newUser: User) => {
                try {
                    const docRef = await this.fireStore.collection('users').add(newUser);
                    newUser.id = docRef.id;
                    return fromUserActions.addUser(newUser);
                } catch (err) {
                    return fromUserActions.errorUser({msg: 'Something went wrong'});
                }
            })
        )
    );

    onFetchUsers$ = createEffect(() => this.actions$.pipe(
        ofType(fromUserActions.onFetchUsers),
        exhaustMap(() => this.fireStore.collection('users').get()
          .pipe(
              map( docRefs => {
                  const users = this.convertDocRefsToUsers(docRefs);
                  return fromUserActions.fetchUsers({users});
              }),
              catchError( () => of(fromUserActions.errorUser({msg: 'Something went wrong'}))),
          ))
        )
      );

      onUpdateUser$ = createEffect(() => this.actions$.pipe(
        ofType(fromUserActions.onUpdateUser),
        exhaustMap( async (user: User) => {
            try {
                await this.fireStore.doc(`users/${user.id}`).set(user);
                return fromUserActions.updateUser({user: {id: user.id, changes: user}});
            } catch (err) {
                return fromUserActions.errorUser({msg: 'Something went wrong'});
            }
        })
      ));

      onDeleteUser$ = createEffect(() => this.actions$.pipe(
        ofType(fromUserActions.onDeleteUser),
        exhaustMap( async payload => {
            try {
                await this.fireStore.doc(`users/${payload.id}`).delete();
                return fromUserActions.deleteUser({id: payload.id});
            } catch (err) {
                return fromUserActions.errorUser({msg: 'Something went wrong'});
            }
        })
      ));

    //   Helper Functions
    convertDocRefsToUsers(docRefs: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>): User[] | any[] {
        const users = [];
        docRefs.docs.forEach( doc => {
            const user = {...doc.data(), id: doc.id};
            users.push(user);
        });
        return users;
    }
}

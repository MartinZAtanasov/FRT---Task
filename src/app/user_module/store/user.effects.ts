import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { exhaustMap, catchError, map } from 'rxjs/operators';
import { User } from './user.reducer';
import { onAddUser, addUser, errorUser, onFetchUsers, fetchUsers } from './user.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private fireStore: AngularFirestore) {}

    addRecipe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(onAddUser),
            exhaustMap( async (newUser: User) => {
                try {
                    const docRef = await this.fireStore.collection('users').add(newUser);
                    newUser.id = docRef.id;
                    return addUser(newUser);
                } catch (err) {
                    return errorUser({msg: 'Something went wrong'});
                }
            })
        )
    );

    onFetchUsers$ = createEffect(() => this.actions$.pipe(
        ofType(onFetchUsers),
        exhaustMap(() => this.fireStore.collection('users').get()
          .pipe(
              map( docRefs => {
                  const users = this.convertDocRefsToUsers(docRefs);
                  return fetchUsers({users});
              }),
              catchError( () => of(errorUser({msg: 'Something went wrong'}))),
          ))
        )
      );

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

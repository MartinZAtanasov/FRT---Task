import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as fromUserAction from './user.actions';
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    active: boolean;
    permissions?: {
      1?: {
        0: boolean,
        1: boolean,
        2: boolean,
        3: boolean,
        4: boolean,
        5: boolean,
      },
      2?: {
        0: boolean,
        1: boolean,
        2: boolean,
        3: boolean,
        4: boolean,
        5: boolean,
      },
      3?: {
        0: boolean,
        1: boolean,
        2: boolean,
        3: boolean,
        4: boolean,
        5: boolean,
      }
    };
    superAdmin?: boolean;
    type?: string;
}

export interface State extends EntityState<User> {
  loading: boolean;
  error: string;
}
export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
});
export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
});
const recipesReducer = createReducer(initialState,
    on(
      fromUserAction.onAddUser,
      fromUserAction.onUpdateUser,
      fromUserAction.onDeleteUser,
      fromUserAction.onFetchUsers,
      state => ({...state, loading: true, error: null})
    ),
    on(fromUserAction.addUser, (state, newRecipe) => adapter.addOne(newRecipe, {...state, loading: false})),
    on(fromUserAction.errorUser, (state, payload) => ({...state, loading: false, error: payload.msg})),
    on(fromUserAction.fetchUsers, (state, {users}) => adapter.addAll(users, {...state, loading: false})),
    on(fromUserAction.updateUser, (state, {user} ) => adapter.updateOne(user, {...state, loading: false})),
    on(fromUserAction.deleteUser, (state, {id} ) => adapter.removeOne(id, {...state, loading: false})),

);
export function reducer(state: State | undefined, action: Action) {
  return recipesReducer(state, action);
}

export const userFeatureKey = 'user';

export const { selectAll } = adapter.getSelectors();

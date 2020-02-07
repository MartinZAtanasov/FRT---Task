import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { onAddUser, addUser, errorUser, onFetchUsers, fetchUsers } from './user.actions';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    active: boolean;
    permissions?: {
        group1: {},
        group2: {}
        group3: {}
    };
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
    on(addUser, (state, newRecipe) => adapter.addOne(newRecipe, {...state, loading: false})),
    on(onAddUser, state => ({...state, loading: true, error: null})),

    on(errorUser, (state, payload) => ({...state, loading: false, error: payload.msg})),

    on(onFetchUsers, state => ({...state, loading: true, error: null})),
    on(fetchUsers, (state, {users}) => adapter.addAll(users, {...state, loading: false})),
);
export function reducer(state: State | undefined, action: Action) {
  return recipesReducer(state, action);
}

export const userFeatureKey = 'user';

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

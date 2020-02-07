
import { createAction, props } from '@ngrx/store';
import { User } from './user.reducer';

export const addUser = createAction('[User] Add', props<User>());
export const onAddUser = createAction('[User] On add', props<User>());

export const errorUser = createAction('[User] On error', props<{msg: string}>());

export const onFetchUsers = createAction('[User] On fetch');
export const fetchUsers = createAction('[User] Fetch', props<{users: User[] | any[]}>());



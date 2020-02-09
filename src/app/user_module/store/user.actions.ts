
import { createAction, props } from '@ngrx/store';
import { User } from './user.reducer';
import { Update } from '@ngrx/entity';

export const addUser = createAction('[User] Add', props<User>());
export const onAddUser = createAction('[User] On add', props<User>());

export const errorUser = createAction('[User] On error', props<{msg: string}>());

export const onFetchUsers = createAction('[User] On fetch');
export const fetchUsers = createAction('[User] Fetch', props<{users: User[] | any[]}>());

export const onUpdateUser = createAction('[User] On update', props<User>());
export const updateUser = createAction('[User] Update', props<{ user: Update<User> }>());

export const onDeleteUser = createAction('[User] On delete', props<{id: string}>());
export const deleteUser = createAction('[User] Delete', props<{id: string}>());

export const clearLoadedAndError = createAction('[User] Clear loaded and error');


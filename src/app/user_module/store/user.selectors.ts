import * as fromUsers from './user.reducer';
import { createFeatureSelector, createSelector, props } from '@ngrx/store';


export const selectUsersState = createFeatureSelector<fromUsers.State>(fromUsers.userFeatureKey);

export const selectAllUsers$ = createSelector(
    selectUsersState,
    fromUsers.selectAll
);

export const loading$ = createSelector(
    selectUsersState,
    state => state.loading
);

export const error$ = createSelector(
    selectUsersState,
    state => state.error
);

export const selectUser$ = createSelector(
    selectUsersState,
    (state: fromUsers.State, id: string) => state.entities[id]
);

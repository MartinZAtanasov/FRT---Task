import * as fromUsers from './user.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export const selectUsersState = createFeatureSelector<fromUsers.State>(fromUsers.userFeatureKey);

export const selectAllUsers$ = createSelector(
    selectUsersState,
    fromUsers.selectAll
);

export const selecEntities$ = createSelector(
    selectUsersState,
    fromUsers.selectEntities
);

export const loading$ = createSelector(
    selectUsersState,
    state => state.loading
);

export const error$ = createSelector(
    selectUsersState,
    state => state.error
);

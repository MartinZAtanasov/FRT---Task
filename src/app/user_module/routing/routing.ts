import { SingleUserPageComponent } from './../components/single-user-page/single-user-page.component';
import { UsersPageComponent } from './../components/users-page/users-page.component';

import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: 'users', component: UsersPageComponent },
    { path: 'users/:id', component: SingleUserPageComponent },
];

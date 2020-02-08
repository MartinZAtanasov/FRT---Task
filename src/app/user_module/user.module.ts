import { UserEffects } from './store/user.effects';
import { SharedModule } from './../shared_module/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { SingleUserPageComponent } from './components/single-user-page/single-user-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './routing/routing';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableComponent } from './components/table/table.component';
import { AddUserFormComponent } from './components/add-user-form/add-user-form.component';
import {FormsModule} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { userFeatureKey, reducer } from './store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { UserSummaryComponent } from './components/user-summary/user-summary.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserPermissionsComponent } from './components/user-permissions/user-permissions.component';
import { DelUserModalComponent } from './components/del-user-modal/del-user-modal.component';

@NgModule({
  declarations: [
  UsersPageComponent,
  SingleUserPageComponent,
  TableHeaderComponent,
  TableComponent,
  AddUserFormComponent,
  UserHeaderComponent,
  UserSummaryComponent,
  UserDetailsComponent,
  UserPermissionsComponent,
  DelUserModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    StoreModule.forFeature( userFeatureKey, reducer ),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [],
  exports: [
    RouterModule
  ]
})
export class UserModule { }

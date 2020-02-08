import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

const route = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    RouterModule.forRoot(route),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  providers: [],
})
export class CoreModule { }

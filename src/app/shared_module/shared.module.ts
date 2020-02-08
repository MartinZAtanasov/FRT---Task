import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './components/modal/modal.component';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [
    ModalComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [
    ModalComponent,
    LoadingComponent
  ]
})
export class SharedModule { }

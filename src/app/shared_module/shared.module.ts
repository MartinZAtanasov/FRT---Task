import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './components/modal/modal.component';
import { BtnSpinnerComponent } from './components/btn-spinner/btn-spinner.component';


@NgModule({
  declarations: [
    ModalComponent,
    BtnSpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [
    ModalComponent,
    BtnSpinnerComponent
  ]
})
export class SharedModule { }

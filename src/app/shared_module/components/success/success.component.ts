import { clearLoadedAndError } from './../../../user_module/store/user.actions';
import { State } from './../../../user_module/store/user.reducer';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, OnDestroy {

  constructor(private store: Store<State>) { }

  ngOnInit() {
    setTimeout( () => {this.store.dispatch(clearLoadedAndError()); }, 2000);
  }

  ngOnDestroy() {
    this.store.dispatch(clearLoadedAndError());
  }

}

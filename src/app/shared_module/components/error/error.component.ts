import { State } from './../../../user_module/store/user.reducer';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearLoadedAndError } from 'src/app/user_module/store/user.actions';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {

  constructor(private store: Store<State>) { }

  @Input() msg: string;

  ngOnInit() {
    setTimeout( () => {this.store.dispatch(clearLoadedAndError()); }, 4000);
  }

  ngOnDestroy() {
    this.store.dispatch(clearLoadedAndError());
  }

}

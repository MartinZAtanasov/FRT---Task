import { User } from './../../store/user.reducer';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-summary',
  templateUrl: './user-summary.component.html',
  styleUrls: ['./user-summary.component.scss']
})
export class UserSummaryComponent implements OnInit {

  constructor() { }

  @Input() user: User;

  ngOnInit() {
  }

}

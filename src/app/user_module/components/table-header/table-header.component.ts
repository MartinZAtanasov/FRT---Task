import { UserService } from './../../user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {

  constructor(private userService: UserService) { }

  @Output() openNewUserModal: EventEmitter<null> = new EventEmitter();

  filterString: string;

  ngOnInit() {
  }

  onOpenNewUserModal() {
    this.openNewUserModal.emit();
  }

  onEmitString() {
    this.userService.filterSubject.next(this.filterString);
  }

}

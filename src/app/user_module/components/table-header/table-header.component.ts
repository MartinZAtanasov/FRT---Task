import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {

  constructor() { }

  @Output() openNewUserModal: EventEmitter<null> = new EventEmitter();

  ngOnInit() {
  }

  onOpenNewUserModal() {
    this.openNewUserModal.emit();
  }

}

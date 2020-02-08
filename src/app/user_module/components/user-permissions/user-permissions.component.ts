import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.scss']
})
export class UserPermissionsComponent implements OnInit {

  constructor() { }

  permissions = [...Array(5).keys()];
  showGroupOne = false;
  showGroupTwo = false;
  showGroupThree = false;

  ngOnInit() {
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor() { }

  @Output() closeModal: EventEmitter<null> = new EventEmitter();

  ngOnInit() {
  }

  onCloseModal() {
    this.closeModal.emit();
  }

}

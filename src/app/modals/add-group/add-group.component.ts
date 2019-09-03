import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  action = new Subject();
  heading: string;
  contnet: any;
  groupName: string;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  add() {
    this.action.next(this.groupName);
    this.modalRef.hide();
  }

}

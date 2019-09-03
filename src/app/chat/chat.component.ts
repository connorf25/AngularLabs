import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {ModalDirective} from 'angular-bootstrap-md';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AddGroupComponent } from '../modals/add-group/add-group.component'
// import { userInfo } from 'os';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../services/user.class';
import { Group, Channel } from '../services/group.class';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

var checkIfAssistant = (user: User, group, admin): boolean => {
  console.log(user.username)
  console.log(group.groupAssis)
  if (user.username == admin) return true;
  for (var i in group.groupAssis) {
    if (user.username == group.groupAssis[i]) {
      return true;
    }
  }
  return false;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild(ModalDirective, {static: false}) modal: ModalDirective;
  groups = [];
  activeGroup: Group;
  activeChannel: Channel;
  channels = [];
  user: User;
  selectedGroup: string;
  selectedChannel: string;
  ofGroupAssistantRole: boolean;

  constructor(private router: Router, private httpClient: HttpClient, private modalService: MDBModalService) { }

  modalRef: MDBModalRef;
  modalOptions = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: false,
    class: '',
    containerClass: '',
    animated: true,
    data: {
        heading: 'Add Group',
        content: { input: 'Group Name' }
    }
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    if (!this.user || this.user.username == "" || !this.user.valid) {
      this.router.navigateByUrl('/login')
    }
    this.groups = this.user.groupList;
  }

  onSelect(group): void {
    this.activeChannel = null;
    this.selectedGroup = group;
    this.channels = [];
    this.httpClient.post('http://localhost:3000/api/getGroup', {"name": this.selectedGroup}, httpOptions).subscribe((data: any) => {
      this.activeGroup = data
      this.channels = this.activeGroup.channels
      this.ofGroupAssistantRole = checkIfAssistant(this.user, this.activeGroup, this.activeGroup.groupAdmin);
      console.log(this.channels)
    })
  }

  onSelectChannel(channel) :void {
    this.selectedChannel = channel.name
    this.activeChannel = channel
    console.log(channel)
  }

  addGroup() {
    this.modalOptions.data.heading = "Add Group";
    this.modalOptions.data.content.input = "Group Name";
    this.modalRef = this.modalService.show(AddGroupComponent, this.modalOptions);

    this.modalRef.content.action.subscribe( (result: any ) => { 
      var newGroup = new Group(result, this.user.username)
      console.log(newGroup);
    })
  }

  addChannel() {
    this.modalOptions.data.heading = "Add Channel";
    this.modalOptions.data.content.input = "Channel Name";
    this.modalRef = this.modalService.show(AddGroupComponent, this.modalOptions);

    this.modalRef.content.action.subscribe( (result: any ) => { console.log(result) })

  }

  addAssistant() {
    this.modalOptions.data.heading = "Add Assistant";
    this.modalOptions.data.content.input = "Assistant Username";
    this.modalRef = this.modalService.show(AddGroupComponent, this.modalOptions);

    this.modalRef.content.action.subscribe( (result: any ) => { console.log(result) })

  }

  addUserToChannel() {
    this.modalOptions.data.heading = "Add User";
    this.modalOptions.data.content.input = "User Userame";
    this.modalRef = this.modalService.show(AddGroupComponent, this.modalOptions);

    this.modalRef.content.action.subscribe( (result: any ) => { console.log(result) })

  }

  deleteGroup() {}

  deleteChannel() {}

  deleteAssistant() {}

  deleteUser() {}


}

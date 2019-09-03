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

      // NEED TO CHECK USER BEFORE GETTING CHANNELS
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

    this.modalRef.content.action.subscribe( (result: string ) => { 
      var newGroup = new Group(result, this.user.username)
      console.log(newGroup);
      this.httpClient.post('http://localhost:3000/api/updateGroup', newGroup, { ...httpOptions, responseType: 'text' })
        .subscribe( (data:string) => {
          if (data == "Successfully added group") {
            this.user.groupList.push(newGroup.name)
            console.log(this.user)
            this.httpClient.post('http://localhost:3000/api/updateUser', this.user, { ...httpOptions, responseType: 'text' })
              .subscribe((res:string) => console.log(res))
            // Update User Locally
            sessionStorage.setItem('user', JSON.stringify(this.user));
          }
        })
    })
  }

  addChannel() {
    this.modalOptions.data.heading = "Add Channel";
    this.modalOptions.data.content.input = "Channel Name";
    this.modalRef = this.modalService.show(AddGroupComponent, this.modalOptions);

    this.modalRef.content.action.subscribe( (result: string ) => { 
      this.activeGroup.channels.push(new Channel(result));
      this.httpClient.post('http://localhost:3000/api/updateGroup', this.activeGroup, { ...httpOptions, responseType: 'text' })
        .subscribe( (data:any) => console.log(result));
      })
  }

  addUserToServer() {
    this.modalOptions.data.heading = "Add User to Server";
    this.modalOptions.data.content.input = "User Userame";
    this.modalRef = this.modalService.show(AddGroupComponent, this.modalOptions);

    this.modalRef.content.action.subscribe( (result: string ) => {
      // Fetch user from server, if user does not exist create user
      // Add group.name to user.groupList
      // SERVER: updateUser
      // Add user.username to group.allUsers
      // SERVER: updateGroup
      console.log(result)  
    })
  }

  addAssistant() {
    this.modalOptions.data.heading = "Add Assistant";
    this.modalOptions.data.content.input = "Assistant Username";
    this.modalRef = this.modalService.show(AddGroupComponent, this.modalOptions);

    this.modalRef.content.action.subscribe( (result: string ) => { 
      // If user.username does not exist in group.allUsers addUserToServer()
      // Add user.username to group.groupAssis array
      // SERVER: updateGroup
      console.log(result) 
    })

  }

  addUserToChannel() {
    this.modalOptions.data.heading = "Add User";
    this.modalOptions.data.content.input = "User Userame";
    this.modalRef = this.modalService.show(AddGroupComponent, this.modalOptions);

    this.modalRef.content.action.subscribe( (result: string ) => { 
      // If user.username does not exist in group.allUsers: error
      // Add user.username to group.channel[i].users
      // SERVER: updateGroup
      console.log(result) 
    })

  }

  deleteGroup() {
    // For each group.allUsers : 
    //    removeUserFromServer()
    // SERVER: Remove Group
  }

  deleteChannel() {
    // Remove channel from group.channels array
    // SERVER: updateGroup
  }

  removeUserFromServer() {
    // Remove user from group.allUsers
    // SERVER: updateGroup
    // Remove group from user.groupList
    // SERVER: updateUser
  }

  removeUserFromChannel() {
    // Remove user from group.channel[i].users
    // SERVER: updateGroup
  }

  removeAssistant() {
    // Remove assistant from group.groupAssis
    // SERVER: updateGroup
  }



}

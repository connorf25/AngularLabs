import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {ModalDirective} from 'angular-bootstrap-md';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { AddGroupComponent } from '../modals/add-group/add-group.component'
// import { userInfo } from 'os';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../services/user.class';
import { Group, Channel } from '../services/group.class';
import { group } from '@angular/animations';
import { SocketService } from '../services/socket.service';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

var checkIfAssistant = (user: User, group, admin): boolean => {
  console.log("Checking if user is admin or groupAssis")
  console.log(user.username)
  console.log(admin)
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
  ofGroupAssistantRole: boolean;
  msg:string = "";
  messages:string[] = [];
  ioConnection:any;

  constructor(private router: Router, 
              private httpClient: HttpClient, 
              private modalService: MDBModalService,
              private socketService: SocketService) { }

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
    this.groups = this.user.groupList? this.user.groupList : null;
    this.initToConnection()
  }

  private initToConnection() {
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage()
      .subscribe((message:string) => {
        this.messages.push(message);
      })
  }

  send() {
    if(this.msg && this.activeChannel.name) {
      let message_data = {room: this.activeChannel.name, message: this.msg} 
      console.log(message_data);
      this.socketService.send(message_data);
      this.msg = null;
    } else {
      console.log("No message")
    }
  }

  onSelect(group): void {
    this.activeChannel = null;
    this.selectedGroup = group;
    this.channels = [];
    this.httpClient.post('http://localhost:3000/api/getGroup', {"name": this.selectedGroup}, httpOptions).subscribe((data: any) => {
      this.activeGroup = data

      //If group does not exist remove from user grouplist
      console.log("Active group:")
      console.log(data)
      if (data == null) {
        this.httpClient.post('http://localhost:3000/api/removeUserFromServer', {"username": this.user.username, "servername": this.selectedGroup}, { ...httpOptions, responseType: 'text' })
          .subscribe( (data:string) => {
            console.log(data)
          })
        for (var i = 0; i < this.user.groupList.length; i++) {
          if (this.user.groupList[i] == this.selectedGroup) {
            this.user.groupList.splice(i, 1);
          }
        }
        return
      }

      this.ofGroupAssistantRole = checkIfAssistant(this.user, this.activeGroup, this.activeGroup.groupAdmin);
      // NEED TO CHECK USER BEFORE GETTING CHANNELS
      // If regular user only display channels user is in
      if (this.ofGroupAssistantRole) {
        this.channels = this.activeGroup.channels
      } else {
        for (var x = 0; x < this.activeGroup.channels.length; x++) {
          // For each channel loop through users in channel
          for (var y = 0; y < this.activeGroup.channels[x].users.length; y++) {
            console.log(this.user.username, " == ", this.activeGroup.channels[x].users[y])
            if (this.user.username == this.activeGroup.channels[x].users[y]) {
              this.channels.push(this.activeGroup.channels[x]);
              break;
            }
          }
        }
      }
      console.log(this.channels)
    })
  }

  onSelectChannel(channel) :void {
    this.activeChannel = channel
    this.socketService.join(this.activeChannel.name)
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

  addUserToServer(username: string) {
    // If user does not exist in server
    if (!this.activeGroup.allUsers.includes(username)) {
      console.log("Adding new user: ", username)
      // SERVER: Add group to user groupList
      this.httpClient.post('http://localhost:3000/api/addUserToServer', {"username": username, "servername": this.activeGroup.name})
        .subscribe( (data:string) => {
          console.log(data)
          // Add user to group list
          this.activeGroup.allUsers.push(username)
          // SERVER: updateGroup
          this.httpClient.post('http://localhost:3000/api/updateGroup', this.activeGroup, { ...httpOptions, responseType: 'text' })
            .subscribe( (res:any) => console.log(res));
        })
    }
    else {
      console.log("User already exists in server")
    }
  }

  addUserToServerModal() {
    this.modalOptions.data.heading = "Add User to Server";
    this.modalOptions.data.content.input = "User Userame";
    this.modalRef = this.modalService.show(AddGroupComponent, this.modalOptions);

    this.modalRef.content.action.subscribe( (username: string ) => {
      this.addUserToServer(username)
    })
  }

  addAssistant() {
    this.modalOptions.data.heading = "Add Assistant";
    this.modalOptions.data.content.input = "Assistant Username";
    this.modalRef = this.modalService.show(AddGroupComponent, this.modalOptions);

    this.modalRef.content.action.subscribe( (username: string ) => { 
      // If username does not exist in group.allUsers addUserToServer()
      if (!this.activeGroup.allUsers.includes(username)) {
        this.addUserToServer(username)
      }
      // Add username to group.groupAssis array
      this.activeGroup.groupAssis.push(username)
      // SERVER: updateGroup
      this.httpClient.post('http://localhost:3000/api/updateGroup', this.activeGroup, { ...httpOptions, responseType: 'text' })
            .subscribe( (res:any) => console.log(res));
    })

  }

  addUserToChannel() {
    this.modalOptions.data.heading = "Add User";
    this.modalOptions.data.content.input = "User Userame";
    this.modalRef = this.modalService.show(AddGroupComponent, this.modalOptions);

    this.modalRef.content.action.subscribe( (username: string ) => { 
      // If user.username does not exist in group.allUsers: error
      if (!this.activeGroup.allUsers.includes(username)) {
        console.log("User does not exist in group")
        return
      }
      // Add user.username to group.channel[i].users
      this.activeChannel.users.push(username)
      // SERVER: updateGroup
      this.httpClient.post('http://localhost:3000/api/updateGroup', this.activeGroup, { ...httpOptions, responseType: 'text' })
        .subscribe( (res:any) => console.log(res));
    })

  }

  removeUserFromServer(username: string) {
    // Remove user from group.allUsers
    for( var i = 0; i < this.activeGroup.allUsers.length; i++){ 
      if ( this.activeGroup.allUsers[i] == username) {
        this.activeGroup.allUsers.splice(i, 1); 
      }
    }
    // Remove user from all channels
    for ( var i = 0; i < this.activeGroup.channels.length; i++) {
      this.removeUserFromChannel(username, this.activeGroup.channels[i])
    }
    // Remove user from assistance group if they are a member
    // This function also updates the group on the server
    this.removeAssistant(username)
    // Remove group from user.groupList
    this.httpClient.post('http://localhost:3000/api/removeUserFromServer', {"username": username, "servername": this.activeGroup.name}, { ...httpOptions, responseType: 'text' })
      .subscribe( (data:string) => {
        console.log(data)
      })
  }

  removeUserFromChannel(username: string, channel: Channel) {
    // Remove user from group.channel[i].users
    for( var i = 0; i < channel.users.length; i++){ 
      if ( channel.users[i] == username) {
        channel.users.splice(i, 1); 
      }
    }
    // SERVER: updateGroup
    this.httpClient.post('http://localhost:3000/api/updateGroup', this.activeGroup, { ...httpOptions, responseType: 'text' })
      .subscribe( (res:any) => console.log(res));
  }

  removeAssistant(username: string) {
    // Remove assistant from group.groupAssis
    for( var i = 0; i < this.activeGroup.groupAssis.length; i++ ){ 
      if ( this.activeGroup.groupAssis[i] == username) {
        console.log("Removing ", username, " from groupAssis")
        this.activeGroup.groupAssis.splice(i, 1); 
      }
    }
    // SERVER: updateGroup
    this.httpClient.post('http://localhost:3000/api/updateGroup', this.activeGroup, { ...httpOptions, responseType: 'text' })
        .subscribe( (res:any) => console.log(res));
  }

  deleteGroup(groupName: String) {
    // Get Group
    this.httpClient.post('http://localhost:3000/api/getGroup', {"name": groupName}, httpOptions).subscribe((data: Group) => {
      if (data == null) return
      var group: Group = data
      console.log(group)
      console.log("Inside del")
      // For each user in group
      for (var i = 0; i < group.allUsers.length; i++) {
        console.log("Removing group from user list...")
        this.httpClient.post('http://localhost:3000/api/removeUserFromServer', {"username": group.allUsers[i], "servername": group.name}, { ...httpOptions, responseType: 'text' })
          .subscribe( (data:string) => {
            console.log(data)
            // Update User Locally
            sessionStorage.setItem('user', JSON.stringify(this.user));
          })
      }
      // SERVER: Remove Group
      this.httpClient.post('http://localhost:3000/api/removeGroup', {"name": groupName}, { ...httpOptions, responseType: 'text' })
        .subscribe((data:string) => console.log(data))
    })
  }

  deleteChannel(index: number) {
    // Remove channel from group.channels array
    this.activeGroup.channels.splice(index, 1)
    // SERVER: updateGroup
    this.httpClient.post('http://localhost:3000/api/updateGroup', this.activeGroup, { ...httpOptions, responseType: 'text' })
      .subscribe( (res:any) => console.log(res));
  }

}

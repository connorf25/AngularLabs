import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userInfo } from 'os';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../services/user.class';
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
  groups = [];
  activeGroup;
  activeChannel;
  channels = [];
  user: User;
  selectedGroup: string;
  selectedChannel: string;
  ofGroupAssistantRole: boolean;

  constructor(private router: Router, private httpClient: HttpClient) { }

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

  }

  addChannel() {

  }

  addAssistant() {

  }

  addUserToChannel() {

  }


}

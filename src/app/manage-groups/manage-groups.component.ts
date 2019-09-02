import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.scss']
})
export class ManageGroupsComponent implements OnInit {
  selectedGroup: number;
  selectedChannel: number;
  newGroupName = "";
  newChannelName = "";
  groups = [
    {name: "hi", channels: [{name: "one"}, {name: "two"}]}, 
    {name: "hello", channels: [{name: "three"}, {name: "four"}]}
  ]
  constructor() { }

  ngOnInit() {
  }

}

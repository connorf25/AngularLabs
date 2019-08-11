import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'))
  }
  

}

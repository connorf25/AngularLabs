import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../services/user.class';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    if (this.user && (typeof this.user.pic == 'undefined' || this.user.pic))
      this.user.pic = 'https://support.apple.com/library/content/dam/edam/applecare/images/en_US/social/thumbnail/apple-id-account-person-thumbnail-2x.png'
  }
  

}

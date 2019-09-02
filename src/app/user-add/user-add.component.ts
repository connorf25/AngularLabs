import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../services/user.class';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  user: any;
  suppString = "false";
  ofGroupAdminsRoleString = "false";

  newuser = new User();

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    if (!this.user || this.user == "null" || !this.user.valid) {
      this.router.navigateByUrl('/login')
    }
  }

  add() {
    console.log("Adding User..")
    if (this.suppString == "true") {
      this.newuser.supp = true;
      this.newuser.ofGroupAdminsRole = true;
    } else {
      this.newuser.supp = false;
      if (this.ofGroupAdminsRoleString == "true") {
        this.newuser.ofGroupAdminsRole = true;
      } else {
        this.newuser.ofGroupAdminsRole = false;
      }
    }
    console.log(this.newuser)
    this.httpClient.post('http://localhost:3000/api/addUser', this.newuser, { ...httpOptions, responseType: 'text' })
      .subscribe((data: any) => {
        console.log(data);
      })
  }
  
}

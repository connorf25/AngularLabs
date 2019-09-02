import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  newuser = {
    username: "", 
    pw: "", 
    birthdate: "", 
    age: 0,
    email: "", 
    supp: false, 
    ofGroupAdminsRole: false
  };

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
    } else {
      this.newuser.supp = false;
    }
    if (this.ofGroupAdminsRoleString == "true") {
      this.newuser.ofGroupAdminsRole = true;
    } else {
      this.newuser.ofGroupAdminsRole = false;
    }
    var newuser = {
      "username": "newuser", 
      "pw": "new", 
      "birthdate": "1997-10-22", 
      "age": 200,
      "email": "new@gmail.com", 
      "supp": false, 
      "ofGroupAdminsRole": false
    }
    console.log(newuser)
    this.httpClient.post('http://localhost:3000/api/addUser', newuser, { ...httpOptions, responseType: 'text' })
      .subscribe((data: any) => {
        console.log(data);
      })
  }
  
}

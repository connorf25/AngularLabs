import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../services/user.class';
import { DataService } from '../services/data.service';
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

  constructor(private router: Router, private httpClient: HttpClient, private dataService: DataService) { }

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
    this.dataService.addUser(this.newuser).subscribe(data => console.log(data))
  }
  
}

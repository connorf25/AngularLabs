import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  myuser: any;
  users: [];

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.myuser = JSON.parse(sessionStorage.getItem('user'))
    if (!this.myuser || this.myuser == "null" || !this.myuser.valid) {
      this.router.navigateByUrl('/login')
    }

    this.httpClient.post('http://localhost:3000/api/getUsers', this.myuser, httpOptions)
      .subscribe((data: any) => {
        console.log(data);
        this.users = data;
      }, error => console.log(error))
  }

  delete (i: number) {
    this.users.splice(i, 1);
    console.log(this.users)
  }

}

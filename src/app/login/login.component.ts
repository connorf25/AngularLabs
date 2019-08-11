import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = "";
  pw = "";
  fail = false;

  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  submit() {
    this.userService.checkUser(this.login, this.pw)
    // if(this.userService.checkUser(this.login, this.pw)) {
    //   this.fail = false;
    //   this.router.navigateByUrl('/account')
    // } else {
    //   this.fail = true;
    //   console.log("Incorrect Login")
    // }
  }

}

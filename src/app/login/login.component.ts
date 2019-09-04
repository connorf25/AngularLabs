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
      .subscribe((data: any) => {
        if (data.valid) {
          console.log("Logged in")
          sessionStorage.setItem('user', JSON.stringify(data));
          this.router.navigateByUrl('');
        } 
        else {
          console.log("Invalid username or email");
          // Show dialog that informs user
        }
      })
  }
}

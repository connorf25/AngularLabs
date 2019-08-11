import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    if (!this.user || this.user == "null" || !this.user.valid) {
      this.router.navigateByUrl('/login')
    }
  }

  save() {
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }

}

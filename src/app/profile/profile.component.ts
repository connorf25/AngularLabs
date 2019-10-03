import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../services/user.class';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'))
    if (this.user && (typeof this.user.pic == 'undefined' || this.user.pic))
      this.user.pic = 'https://support.apple.com/library/content/dam/edam/applecare/images/en_US/social/thumbnail/apple-id-account-person-thumbnail-2x.png'
    if (!this.user || this.user.username == "" || !this.user.valid) {
      this.router.navigateByUrl('/login')
    }
  }

  save() {
    this.httpClient.post('http://localhost:3000/api/updateUser', this.user, { ...httpOptions, responseType: 'text' })
      .subscribe((res:any) => console.log(res))
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }

}

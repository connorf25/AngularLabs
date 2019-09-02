import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
import { Observable } from 'rxjs';

class User {
  username: string;
  birthdate: string;
  age:number;
  email:string;
  password:string;
  valid:boolean;
  supp: boolean;
  ofGroupAdminsRole: boolean;
  groupList: string[];
  adminGroupList: string[];
  constructor(username:string, password:string) {
    this.username = username
    this.password = password
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  checkUser(username: string, pw: string): Observable<any> {
    var user = {"username": username, "pw": pw}
    return this.httpClient.post('http://localhost:3000/api/auth', user, httpOptions)
  }


}
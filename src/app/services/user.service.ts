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

  checkUser(username, pw) {
    var user = {"username": username, "pw": pw}
    this.httpClient.post('http://localhost:3000/api/auth', user, httpOptions)
      .subscribe((data: any) => {
        if (data.valid) {
          console.log("Logged in")
          // Store user in session storage
          sessionStorage.setItem('user', JSON.stringify(data));
        } else {
          console.log("Invalid username or email")
        }
      })
  }

//   checkUser(email, pw): Boolean {
//     for (let user in this.users) {
//       console.log(this.users[user].email)
//         if (email == this.users[user].email && pw == this.users[user].upwd) {
//             return true;
//         }
//     }
//     return false;
//   }

}
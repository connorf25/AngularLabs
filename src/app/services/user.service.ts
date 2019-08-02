import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = [
    {"email": "abc@com.au", "upwd": "123"},
    {"email": "test@gmail.com", "upwd": "123456"},
    {"email": "admin@company.com", "upwd": "password"}
  ]

  constructor() { }

  checkUser(email, pw): Boolean {
    for (let user in this.users) {
      console.log(this.users[user].email)
        if (email == this.users[user].email && pw == this.users[user].upwd) {
            return true;
        }
    }
    return false;
  }
}

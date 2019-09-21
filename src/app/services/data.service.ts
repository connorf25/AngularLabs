import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.class';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  addUser(user: User) {
    return this.http.post<any>('http://localhost:3000/api/addUser', user)
  }
  addUserToServer(username: string, servername: string) {
    return this.http.post<any>('http://localhost:3000/api/addUserToServer', {"username": username, "servername": servername})
  }
}


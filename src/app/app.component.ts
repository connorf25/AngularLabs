import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Week4';

  constructor(private router: Router) {}

  logOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login')
  } 
}

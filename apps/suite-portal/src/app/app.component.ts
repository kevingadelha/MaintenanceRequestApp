import { Component } from '@angular/core';

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'suite-portal';
  //If you're not logged in, this will take you to the login page instead
  adminLink = this.getAdminLink();
  getAdminLink(): string {
    //The token is already verified when you go to the page so I don't have to verify it here
    if (sessionStorage.getItem('token'))
     return "admin-operations";
    else
      return "admin";
  }
}

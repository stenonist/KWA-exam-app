import { Component } from '@angular/core';
import { UserService, User } from './auth/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ispit-app';
  currUser: User;
  profileOpened : boolean = false;

  constructor(public User: UserService){
  }

  ngOnInit(){
    this.currUser=this.User.getCurrUser();
  }
  
  logout(){
    this.currUser=null;
  }

}



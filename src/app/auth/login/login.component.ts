import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorExists = false;
  errorText = "";

  constructor(public User : UserService, public router : Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    var email = form.value.email;
    var password = form.value.password;
    var user = this.User.getUserByMail(email);
    if(user==undefined) {
      this.errorExists = true;
      this.errorText = "There is no registered user with username " + email;
      return;
    }
    var isPasswordValid = this.User.isPasswordCorrect(email, password);
    if(!isPasswordValid) {
      this.errorExists = true;
      this.errorText = "Password is incorrect";
      return;
    }
    this.errorExists = false;
    this.User.currentUser=user;
    this.router.navigate(['/profile']);
  }
}

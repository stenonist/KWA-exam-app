import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  locations = ["Zemun","Novi Beograd","Galenika","Dorcol","Savamala","Senjak","Banovo Brdo"];
  selectedLocation:string;
  errorExists = false;
  errorText = "";

  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    if(!this.userService.getUserByMail(form.value.email)){
      this.errorExists = false;

      var newUser = this.userService.registerUser(form.value.name,form.value.surname,form.value.email,form.value.password,this.selectedLocation);
      this.router.navigate(['/profile']);
    } else {
      this.errorText = 'User with this email already exists';
    }
  }

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User{
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  location: string;
  privateTags: string[];
  reservedEvents: number[];
  gradedEvents:number[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  
  static dummyUserList: Array<User> = [
    {
      id:1,
      name: "Stefan",
      surname: "Lazarevic",
      email: "stefan@gmail.com",
      password: "12345678",
      location: "Zemun",
      privateTags: ["kafic","pivnica"],
      reservedEvents: [1,2,3,4],
      gradedEvents: []
    },
    {
      id:2,
      name: "Marko",
      surname: "Markovic",
      email: "marko@gmail.com",
      password: "12345678",
      location: "Novi Beograd",
      privateTags: ["kafic"],
      reservedEvents: [],
      gradedEvents: []
    }
  ]
  currentUser: User = null;

  /* nalazimo korisnika na osnovu id polja iz niza objekata korisnika */
  getUserById(id: number) : User {
    var foundUser: User;
    UserService.dummyUserList.forEach(user => {
      if(user.id == id){
        foundUser = user;
      }
    });
    this.currentUser = foundUser;
    return foundUser;
  }
  
  getUserByMail(email: string) : User {
    
    return UserService.dummyUserList.find(userToFind => userToFind.email == email);;
  }

  isPasswordCorrect(userEmail: string, password: string) : boolean {
    return UserService.dummyUserList.find(userToFind => 
      (userToFind.email == userEmail && userToFind.password == password)) != undefined;
  }

  registerUser(name: string, surname: string,email:string,password: string,location: string) : User {
    var maxId: number = UserService.dummyUserList.length;
    UserService.dummyUserList.forEach(user => {
      if (maxId < user.id) {
        maxId = user.id;
      }
    });

    var privateTags: string[] = null,reservedEvents:number[] = null, gradedEvents: number[] = null;

    var id =  ++maxId;
    var user: User = {id,name,surname,email,password,location,privateTags,reservedEvents,gradedEvents};
    UserService.dummyUserList.push(user);

    this.currentUser = user;
    return user;
  }

  getCurrUser(){
    return this.currentUser;
  }

  checkUser(){
    let currUser=this.getCurrUser();
    if (currUser==null) {
      window.alert("You are not logged in")
      this.router.navigate(['/login']);
    }else{
      return true;
    }
  }

  constructor(public router: Router) { }
}

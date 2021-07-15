import { Component, OnInit, Inject } from '@angular/core';
import { UserService, User } from '../user.service';
import { EventService, Event } from '../../event/event.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  static getData() {
    this.getData();
  }
  
  locations = ["Zemun","Novi Beograd","Galenika","Dorcol","Savamala","Senjak","Banovo Brdo"];
  selectedLocation:string;
  grades = [ 1,2,3,4,5 ];
  tags:string = "Please add some tags.";
  selectedGrade:number;
  personalTags: boolean;
  
  constructor(public User: UserService,public Event: EventService, public  router : Router,public dialog: MatDialog) { }
  
  currUser:User;
  userEvents:Array<Event>=[];
  passedEvents:Array<Event>=[];
  activeEvents:Array<Event>=[];
  
  ngOnInit(){
    this.currUser=null;
    this.User.checkUser()
    this.currUser=this.User.getCurrUser();
    this.checkPrivateTags();
    this.getAllEvents();
    this.getData();
    this.currUser=this.User.getCurrUser();
    this.reloadTags();
  }

  reloadTags(){
    if (this.currUser.privateTags!=[]) {
      this.tags="";
      this.currUser.privateTags.forEach(tag=>{this.tags+=tag+" "})
    }
  }

  openDialog(id:number,type:string){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: id,
        type: type
    };
    const dialogRef = this.dialog.open(DialogComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  checkPrivateTags(){
    let personalTags;
    
    if (this.currUser.privateTags==[]) {
      window.alert("Please add personal favourites");
      personalTags=false;
    }else{
      personalTags=true;
    }
  }

  getData(){
    this.getPassedEvents();
    this.getActiveEvents();
  }

  changeLocation(){
    this.currUser.location = this.selectedLocation;
  }

  addPrivateTag(newTag: string){
    let tags = this.currUser.privateTags;
    if (tags.includes(newTag)) {
      window.alert("Desired tag already exists in your preferences");
    }else{
      tags.push(newTag);
    }
    this.reloadTags();
    console.log(this.currUser.privateTags);
  }
  removePrivateTag(toBeRemoved: string){
    let tags = this.currUser.privateTags;
    if (!tags.includes(toBeRemoved)) {
      window.alert("Desired tag does exist in your preferences")
    }else{
      tags.filter(item=>item!==toBeRemoved);
    }
  }
  removeEvent(eventId: number){
    let eventForChange = this.Event.findEventById(eventId);
    eventForChange.reserve--;
    this.currUser.reservedEvents = this.currUser.reservedEvents.filter(item => item !== eventId)
    this.openDialog(eventId,"remove");
    this.ngOnInit();
  }
  getAllEvents(){
    this.userEvents=[];
    let resEvents = this.currUser.reservedEvents;
    for(let i = 0;i<resEvents.length;i++){
      this.userEvents.push(this.Event.findEventById(Number(resEvents[i])));
    }
  }
  getPassedEvents(){
    this.passedEvents=[];
    this.userEvents.forEach(event=>{
      let state = this.Event.checkEventDate(event.id);
      if(!state){
        this.passedEvents.push(event);
      }
    })
  }
  getActiveEvents(){
    this.activeEvents=[];
    this.userEvents.forEach(event=>{
      let state = this.Event.checkEventDate(event.id);
      if(state){
        this.activeEvents.push(event);
      }
    })
  }

  rateEvent(id:number){
    let newGrade = this.selectedGrade;
    let selectedEvent = this.Event.findEventById(id);
    let state = this.checkIfAlreadyGraded(id);
    if (state) {
      selectedEvent.grades.push(newGrade);
      this.currUser.gradedEvents.push(id);
      this.Event.getAverageGrades(id);
      this.openDialog(id,"rate");
    }else{
      window.alert("You already rated the event");
    }
    
  }

  checkIfAlreadyGraded(eventId: number){
    if (this.currUser.gradedEvents.includes(eventId)) {
      return false;
    }else{
      return true;
    }
  }

}

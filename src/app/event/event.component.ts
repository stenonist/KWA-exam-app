import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService, User } from '../auth/user.service';
import { EventService,Event } from './event.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../auth/dialog/dialog.component';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  
  displayedColumns = ["name", "description","location","tags", "event-start", "event-end","status" , "capacity","grade","button"];
  eventSource = new MatTableDataSource<Event>(); //datasource za tabelu
  currUser:User;
  tags:string[];
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator) paginator : MatPaginator;

  constructor(public user: UserService, public event: EventService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.currUser = this.user.getCurrUser();
    if (this.currUser!=null) {
      if (this.currUser.privateTags) {
        this.tags=this.currUser.privateTags;
      }
    }
    this.eventSource.data = EventService.dummyEventList;
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

  ngAfterViewInit(){
    this.eventSource.sort = this.sort;
    this.eventSource.paginator = this.paginator;
  }
  filt:boolean;
  doFilter(filterValue : string) {
    this.eventSource.filter = filterValue.trim().toLowerCase();
    if (filterValue=="") {
      this.filt=false;
    }else{
      this.filt=true
    }
  }

  reserveEvent(eventId: number){
    let state = this.event.checkEventDate(eventId);
    let present = this.checkIfUserAlreadyRegistered(eventId);
    let status = this.event.findEventById(eventId).status;
    let foundEvent = EventService.dummyEventList.find(event=>{
      return event.id==eventId;
    })
    if (status=="cancled") {
      window.alert("This event has been cancled");
    }else if (status=="finished") {
      window.alert("Event has passed");
    }else{
      if (state){
        if(present){
          if (foundEvent.capacity==foundEvent.reserve){
            window.alert("This event has already reached its capacity");
          }else{
            this.user.currentUser.reservedEvents.push(eventId);
            foundEvent.reserve++;
            this.openDialog(eventId,"reserve");
          }
        }else{
          window.alert("You already reserved your place");
        }
      }
    }
  }

  checkIfUserAlreadyRegistered(eventId: number){
    if (this.user.currentUser.reservedEvents.includes(eventId)) {
      return false;
    }else{
      return true;
    }
  }
  

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { EventService,Event } from '../../event/event.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  id:number;
  type:string;
  selectedEv:Event;
  evName: string;
  constructor(public Event:EventService,public dialogRef: MatDialogRef<ProfileComponent>, @Inject(MAT_DIALOG_DATA) data:any) { 
    this.id=data.id;
    this.type=data.type;
    this.selectedEv=this.Event.findEventById(this.id);
    if (this.type=="rate") {
      this.evName="Sucessfully rated "+ this.selectedEv.name +".";
    }else if (this.type=="remove"){
      this.evName="Your reservation for "+ this.selectedEv.name +" has been cancled.";
    }else if (this.type=="reserve"){
      this.evName="Sucessfully reserved for "+ this.selectedEv.name + ".";
    }
  }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }

}

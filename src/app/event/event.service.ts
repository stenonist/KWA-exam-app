import { Injectable } from '@angular/core';

export interface Event {
  id: number;
  name: string;
  description: string;
  location: [string, string]; // Mozda moze nesto drugo, pin, gmaps???? //prvo opstina, drugo ime kafica
  tags: string[];
  eventStart: Date;
  eventEnd: Date;
  reserve: number;
  capacity: number;
  //otherParticipents: String[]
  status: 'finished' | 'cancled' | 'ongoing' | 'available' | null;
  grades: number[];
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  avgGradesPerEvent=[];
  static dummyEventList: Array<Event> = [
    {
        id: 1,
        name: "Svirka",
        description: "Bend pocinje u 17:30",
        location: ["Zemun","Impress"],
        tags: ["muzika"],
        eventStart: new Date(2020, 5, 5, 17, 0),
        eventEnd: new Date(2020, 5, 5, 19, 30),
        reserve: 3,
        capacity: 10,
        status: "finished",
        grades: [2.5]
    },
    {
        id: 2,
        name: "demonstracije",
        description: "Okupljanje od 11:45",
        location: ["Novi Beograd","Krokodil Bar"],
        tags: ["kafic"],
        eventStart: new Date(2020, 6, 11, 12, 0),
        eventEnd: new Date(2020, 6, 11, 15, 30),
        reserve: 0,
        capacity: 10,
        status: "finished",
        grades: [3.5]
    },
    {
        id: 3,
        name: "Izlozba slika",
        description: "Organizovali studenti fakulteta savremenih umetnosti",
        location: ["Zemun","Kafeterija Mlin"],
        tags: ["umetnost"],
        eventStart: new Date(2020, 7, 2, 9, 0),
        eventEnd: new Date(2020, 7, 2, 12, 15),
        reserve: 0,
        capacity: 10,
        status: "finished",
        grades: [2.5]
    },
    {
        id: 4,
        name: "utakmica",
        description: "Partizan-Zvezda",
        location: ["Galenika","Autsajder"],
        tags: ["sport"],
        eventStart: new Date(2020, 8, 2, 9, 0),
        eventEnd: new Date(2020, 8, 2, 12, 15),
        reserve: 0,
        capacity: 10,
        status: "finished",
        grades: [0]
    },
    {
        id: 5,
        name: "Seminarski rad",
        description: "Organizovali studenti ETF-a",
        location: ["Dorcol","Kafeterija Dorcol"],
        tags: ["edukacija"],
        eventStart: new Date(2020, 8, 26, 9, 0),
        eventEnd: new Date(2020, 8, 27, 12, 15),
        reserve: 0,
        capacity: 10,
        status: "cancled",
        grades: [0]
    },
    {
        id: 6,
        name: "Degustacija",
        description: "Sirok asortiman piva",
        location: ["Savamala","Budhha Bar"],
        tags: ["pivnica"],
        eventStart: new Date(2020, 9, 1, 9, 0),
        eventEnd: new Date(2020, 9, 12, 12, 15),
        reserve: 0,
        capacity: 10,
        status: "available",
        grades: [0]
    },
    {
        id: 7,
        name: "Svirka",
        description: "Bend pocinje od 19:30",
        location: ["Senjak","Graficar"],
        tags: ["pivnica"],
        eventStart: new Date(2020, 9, 26, 18, 0),
        eventEnd: new Date(2020, 9, 27, 1, 0),
        reserve: 0,
        capacity: 10,
        status: "available",
        grades: [0]
    },
    {
        id: 8,
        name: "Guslarske vecere",
        description: "Muzika pocinje od 19:00",
        location: ["Banovo Brdo","Restoran Zar"],
        tags: ["vecera"],
        eventStart: new Date(2020, 10, 1, 18, 0),
        eventEnd: new Date(2020, 10, 12, 1, 0),
        reserve: 10,
        capacity: 10,
        status: "available",
        grades: [0]
    }
  ]
  constructor() { }

  findEventById(id:number):Event{
    let foundEvent: Event;
    EventService.dummyEventList.forEach(event => {
      if(event.id == id){
        foundEvent = event;
      }
    });
    return foundEvent;
  }
  checkEventDate(eventId: number){
    let foundEvent = EventService.dummyEventList.find(event=>{
      return event.id==eventId;
    })
    let currDateTime=Date.now();
    if(currDateTime>foundEvent.eventEnd.getTime()){
      return false;
    }else if (currDateTime>foundEvent.eventStart.getTime()) {
      window.alert("Event has already started");
      return false;
    }else{
      return true;
    }
  }

  getAverageGrades(id:number){
    let allGrades = this.findEventById(id).grades;
    let newGrade = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    if (allGrades==[0]) {
      newGrade = allGrades;
    }else if(allGrades.length==2 && allGrades[0]==0){
      newGrade.push(allGrades.reduce(reducer,0));
    }else{
      newGrade.push(allGrades.reduce(reducer,0)/2);
    }
    EventService.dummyEventList.forEach(event=>{
      if (event.id==id) {
        event.grades=newGrade;
      }
    });
  }
}

import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { EventComponent } from './event/event.component';
import { ProfileComponent } from './auth/profile/profile.component';

const rute: Routes=[
    {path: '', component: WelcomeComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'event', component: EventComponent},
]

@NgModule({
    imports:[
        RouterModule.forRoot(rute)
    ],
    exports:[
        RouterModule
    ]
})

export class RoutingModule{}



import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EventComponent } from './event/event.component';


import { MaterialModule } from './material.module';
import { RoutingModule } from './routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './auth/user.service';
import { EventService } from './event/event.service';
import { DialogComponent } from './auth/dialog/dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    WelcomeComponent,
    EventComponent,
    ProfileComponent
  ],
  entryComponents:[DialogComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    RoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
    
  ],
  providers: [UserService,EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }

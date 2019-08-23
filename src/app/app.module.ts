import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ChatroomsComponent } from './pages/chatrooms/chatrooms.component';
import { NavbarComponent } from './components/navbar/navbar.component';



import { BsDropdownModule } from 'ngx-bootstrap';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatroomListComponent } from './components/chatroom-list/chatroom-list.component';
import { ChatroomTitleBarComponent } from './components/chatroom-title-bar/chatroom-title-bar.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatroomWindowComponent } from './components/chatroom-window/chatroom-window.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChatroomsComponent,
    NavbarComponent,
    ChatInputComponent,
    ChatroomListComponent,
    ChatroomTitleBarComponent,
    ChatMessageComponent,
    ChatroomWindowComponent
  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

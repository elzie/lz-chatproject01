// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// External Modules
import { AlertModule, BsDropdownModule } from 'ngx-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Services
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';
import { ChatroomService } from './services/chatroom.service';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ChatroomsComponent } from './pages/chatrooms/chatrooms.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatroomListComponent } from './components/chatroom-list/chatroom-list.component';
import { ChatroomTitleBarComponent } from './components/chatroom-title-bar/chatroom-title-bar.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatroomWindowComponent } from './components/chatroom-window/chatroom-window.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { environment } from 'src/environments/environment';

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
    ChatroomWindowComponent,
    ProfileComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule,
    BsDropdownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [
    AlertService,
    LoadingService,
    AuthService,
    AuthGuard,
    DatePipe,
    ChatroomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { ChatroomService } from './../../services/chatroom.service';
@Component({
  selector: 'app-chatroom-user-list',
  templateUrl: './chatroom-user-list.component.html',
  styleUrls: ['./chatroom-user-list.component.scss']
})
export class ChatroomUserListComponent implements OnInit {

  constructor(
    public chatroomService: ChatroomService
  ) { }

  ngOnInit() {
  }

}

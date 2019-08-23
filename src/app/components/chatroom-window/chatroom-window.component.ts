import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit {
  // Replace with firebase data :3
  public dummyData = [
    {
      message: 'test',
      createdAt: new Date(),
      sender: {
        firstName: 'Sally',
        lastName: 'Jones',
        photoUrl: 'http://via.placeholder.com/150x150'
      }
    },
    {
      message: 'asdasdasdfasfasdasd',
      createdAt: new Date(),
      sender: {
        firstName: 'Kate',
        lastName: 'Moss',
        photoUrl: 'http://via.placeholder.com/150x150'
      }
    }, {
      message: 'dlkfgjdjfgfsdsdf sdf dsfsd sfsdf',
      createdAt: new Date(),
      sender: {
        firstName: 'Spider',
        lastName: 'man',
        photoUrl: 'http://via.placeholder.com/150x150'
      }
    },
    {
      message: 'Dooooooooooooom!',
      createdAt: new Date(),
      sender: {
        firstName: 'Dr',
        lastName: 'Doom',
        photoUrl: 'http://via.placeholder.com/150x150'
      }
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}

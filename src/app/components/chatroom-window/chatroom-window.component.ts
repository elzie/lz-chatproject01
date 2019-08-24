import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe', { static: false }) private myScrollContainer: ElementRef;


  // Replace with firebase data :3
  public dummyData = [
    {
      message: 'test',
      createdAt: new Date(),
      sender: {
        firstName: 'Sally',
        lastName: 'Jones',
        photoUrl: 'http://via.placeholder.com/50x50'
      }
    },
    {
      message: 'asdasdasdfasfasdasd',
      createdAt: new Date(),
      sender: {
        firstName: 'Kate',
        lastName: 'Moss',
        photoUrl: 'http://via.placeholder.com/50x50'
      }
    }, {
      message: 'dlkfgjdjfgfsdsdf sdf dsfsd sfsdf',
      createdAt: new Date(),
      sender: {
        firstName: 'Spider',
        lastName: 'man',
        photoUrl: 'http://via.placeholder.com/50x50'
      }
    },
    {
      message: 'Dooooooooooooom!',
      createdAt: new Date(),
      sender: {
        firstName: 'Dr',
        lastName: 'Doom',
        photoUrl: 'http://via.placeholder.com/50x50'
      }
    },
  ];

  constructor() { }

  ngOnInit() {
    this.scrollToBottom();
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}

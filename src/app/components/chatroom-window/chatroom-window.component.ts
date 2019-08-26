import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit, AfterViewChecked, OnDestroy {

  private subscriptions: Subscription[] = [];
  public chatroom: Observable<any>;
  public messages: Observable<any>;

  // Scroll to bottom chat-like feature
  @ViewChild('scrollWindow', { static: false }) private myScrollContainer: ElementRef;

  // Replace with firebase data :3
  // public dummyData = [
  //   {
  //     message: 'test',
  //     createdAt: new Date(),
  //     sender: {
  //       firstName: 'Sally',
  //       lastName: 'Jones',
  //       photoUrl: 'http://via.placeholder.com/50x50'
  //     }
  //   },
  //   {
  //     message: 'asdasdasdfasfasdasd',
  //     createdAt: new Date(),
  //     sender: {
  //       firstName: 'Kate',
  //       lastName: 'Moss',
  //       photoUrl: 'http://via.placeholder.com/50x50'
  //     }
  //   }, {
  //     message: 'dlkfgjdjfgfsdsdf sdf dsfsd sfsdf',
  //     createdAt: new Date(),
  //     sender: {
  //       firstName: 'Spider',
  //       lastName: 'man',
  //       photoUrl: 'http://via.placeholder.com/50x50'
  //     }
  //   },
  //   {
  //     message: 'Dooooooooooooom!',
  //     createdAt: new Date(),
  //     sender: {
  //       firstName: 'Dr',
  //       lastName: 'Doom',
  //       photoUrl: 'http://via.placeholder.com/50x50'
  //     }
  //   },
  // ];

  constructor(
    private route: ActivatedRoute,
    private chatroomService: ChatroomService,
    private loadingService: LoadingService
  ) {
    this.subscriptions.push(
      this.chatroomService.selectedChatroom.subscribe(chatroom => {
        this.chatroom = chatroom;
        // this.loadingService.isLoading.next(false);
      })
    );
    this.subscriptions.push(
      this.chatroomService.selectedChatroomMessages.subscribe(messages => {
        this.messages = messages;
        // this.loadingService.isLoading.next(false);
      })
    );
  }

  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const chatroomId = params.get('chatroomId');
        this.chatroomService.changeChatroom.next(chatroomId);
      })
    );
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
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

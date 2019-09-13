import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatroomService } from './../../services/chatroom.service';
import { LoadingService } from './../../services/loading.service';
import { Chatroom } from './../../interfaces/chatroom';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit, AfterViewChecked, OnDestroy {

  private subscriptions: Subscription[] = [];
  public chatroom: Chatroom;
  public messages: Observable<any[]>;

  // Scroll to bottom chat-like feature
  @ViewChild('scrollWindow', { static: false }) private myScrollContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private chatroomService: ChatroomService,
    private loadingService: LoadingService
  ) {
    this.subscriptions.push(
      this.chatroomService.selectedChatroom.subscribe(chatroom => {
        this.chatroom = chatroom;
        console.log(chatroom);
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

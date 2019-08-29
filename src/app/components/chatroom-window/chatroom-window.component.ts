import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatroomService } from './../../services/chatroom.service';
import { LoadingService } from './../../services/loading.service';
import { Chatroom } from './../../interfaces/chatroom';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit, AfterViewChecked, OnDestroy {

  private subscriptions: Subscription[] = [];
  public chatroom: Chatroom[] = [];
  public chatroomname: Observable<any>;
  public messages: Observable<any>;
  public newChatForm: FormGroup;
  public chatsToLog: any;

  // Scroll to bottom chat-like feature
  @ViewChild('scrollWindow', { static: false }) private myScrollContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatroomService: ChatroomService,
    private loadingService: LoadingService,
    private fb: FormBuilder,
    private authService: AuthService,
    private db: AngularFirestore
  ) {
    this.subscriptions.push(
      this.chatroomService.selectedChatroom.subscribe(chatroom => {
        this.chatroom = chatroom;
        // console.log(chatroom);
        // this.loadingService.isLoading.next(false);
      })
    );
    this.subscriptions.push(
      this.chatroomService.selectedChatroomMessages.subscribe(messages => {
        this.messages = messages;
        // this.loadingService.isLoading.next(false);
      })
    );

    this.createNewChatroomForm();
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

  private createNewChatroomForm(): void {
    this.newChatForm = this.fb.group({
      chatroomname: ['', Validators.required],
      creatorId: this.authService.currentUserSnapshot.id
    });
  }
  submitCreateNewChatroom(): void {
    // ################ PUSH chatroomname to ChatroomService ###################
    if (this.newChatForm.valid) {
      const { chatroomname, creatorId } = this.newChatForm.value;
      const newChatInfo = {
        chatroomname,
        createdAt: new Date(),
        creatorId
      };
      // console.log(`NewChatName: ${chatroomname}, CreatorId: ${creatorId}`);
      // Add new chatroom to firebase
      this.db.collection(`chatrooms`).add({
        name: chatroomname,
        createdAt: new Date(),
        creatorId
      }).then(newChatId => {
        // console.log('Added document with ID: ', newChat.id);
        // Add Collection ID to first document.
        this.db.collection("chatrooms").doc(newChatId.id).update({
          id: newChatId.id
        });
        // Send Creator to the newly created room.
        this.router.navigate([`/chatrooms/${newChatId.id}`]);
      });
    }
    // TODO Call authService > createNewChatroom function
    // Look at signup.submit for inspiration
    // TODO check if room name is allready taken / list chatrooms ...

    // Add new Chat to database
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



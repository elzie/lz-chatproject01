import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from './loading.service';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  public chatrooms: Observable<any>;
  public changeChatroom: BehaviorSubject<string | null> = new BehaviorSubject(null);
  public selectedChatroom: Observable<any>;
  public selectedChatroomMessages: Observable<any>;

  constructor(
    private db: AngularFirestore,
    private loadingService: LoadingService,
    private authService: AuthService
  ) {
    this.selectedChatroom = this.changeChatroom.switchMap(chatroomId => {
      if (chatroomId) {
        // this.loadingService.isLoading.next(true);
        return db.doc(`chatrooms/${chatroomId}`).valueChanges();
      }
      return Observable.of(null);
    });

    this.selectedChatroomMessages = this.changeChatroom.switchMap(chatroomId => {
      if (chatroomId) {
        // this.loadingService.isLoading.next(true);
        return db.collection(`chatrooms/${chatroomId}/messages`, ref => {
          return ref.orderBy('createdAt', 'desc').limit(50);
        }).valueChanges()
          .map(arr => arr.reverse());
      }
      return Observable.of(null);
    });
    this.chatrooms = db.collection('chatrooms').valueChanges();
  }
  public createMessage(text: string): void {
    const chatroomId = this.changeChatroom.value;
    const message = {
      message: text,
      createdAt: new Date(),
      sender: this.authService.currentUserSnapshot
    };
    // Add message to database
    this.db.collection(`chatrooms/${chatroomId}/messages`).add(message);
  }
}

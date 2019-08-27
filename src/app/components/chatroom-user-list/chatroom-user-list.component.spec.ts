import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomUserListComponent } from './chatroom-user-list.component';

describe('ChatroomUserListComponent', () => {
  let component: ChatroomUserListComponent;
  let fixture: ComponentFixture<ChatroomUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatroomUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

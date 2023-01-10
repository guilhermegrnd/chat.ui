import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-contacts',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Output() chatSwitch: EventEmitter<User> = new EventEmitter()
  userChats: User[] = [];

  constructor(private chatService: ChatService) { 
    
  }

  async ngOnInit() {
    this.userChats = (await this.chatService.getChats()).data
  }

  changeUser(userSelected: User) {
    this.chatSwitch.emit(userSelected)
  }
}

import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Message } from 'src/app/types/message';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() currentChatUser: User | undefined

  isLoading = false
  messages: Message[]
  messageToSend: Message | undefined

  constructor(private chatService: ChatService) { 
    this.messages = []
  }

  async ngOnInit() {
    
  }

  async ngOnChanges(changes: SimpleChanges) {
    console.log('changes',changes)
    if(!this.isEqualObjects(changes['currentChatUser'].previousValue, this.currentChatUser)) {
      this.messages = (await this.chatService.getMessages(this.currentChatUser?.id!))!.data
      console.log('messages',this.messages)
    }
  }

  onEnter(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    const request = this.chatService.sendMessage(this.currentChatUser?.id!,input.value)

    
  }

  private isEqualObjects(x:any, y:any): boolean {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
      ok(x).length === ok(y).length &&
        ok(x).every(key => this.isEqualObjects(x[key], y[key]))
    ) : (x === y);
  }

}

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

  isProcessing:boolean
  messages: Message[]
  messageToSend: Message | undefined

  constructor(private chatService: ChatService) { 
    this.messages = []
    this.isProcessing = false
  }

  async ngOnInit() {
  }

  async ngOnChanges(changes: SimpleChanges) {
    if(!this.isEqualObjects(changes['currentChatUser'].previousValue, this.currentChatUser)) this.messages = (await this.chatService.getMessages(this.currentChatUser?.id!))!.data
  }

  async onEnter(event: Event) {
    this.isProcessing = true
    const input = event.target as HTMLInputElement;
    
    const request = await this.chatService.sendMessage(this.currentChatUser?.id!,input.value)
    if(request.success) this.messages.push(request.data)

    input.value = ''
    input.focus()
    this.isProcessing = false
  }

  private isEqualObjects(x:any, y:any): boolean {
    const ok = Object.keys, tx = typeof x, ty = typeof y
    return x && y && tx === 'object' && tx === ty ? (
      ok(x).length === ok(y).length &&
        ok(x).every(key => this.isEqualObjects(x[key], y[key]))
    ) : (x === y)
  }

}

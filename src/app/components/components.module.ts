import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { ContactComponent } from './contact/contact.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [ChatComponent, ContactComponent, MessageComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ChatComponent, ContactComponent]
})
export class ComponentsModule { }
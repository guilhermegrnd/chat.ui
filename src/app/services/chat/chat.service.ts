import { Injectable } from '@angular/core';
import { DefaultRequest } from 'src/app/types/DefaultRequest';
import { Message } from 'src/app/types/message';
import { Token } from 'src/app/types/Token';
import { User } from 'src/app/types/User';
import { environment } from 'src/environments/environment';
import { FetchService } from '../fetch/fetch.service';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private fetchService: FetchService, private localStorage: LocalStorageService) { }

  public async getChats() {

    const json = this.localStorage.getLocalStorage<Token>('token')

    const request = await this.fetchService.fetchData<DefaultRequest<User[]>>(`${environment.apiBaseUrl}/api/v1/chats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${json?.token}`
      }
    })
    
    return request
  }

  public async getMessages(toUserId: number) {

    if (toUserId === undefined) return

    const json = this.localStorage.getLocalStorage<Token>('token')

    const request = await this.fetchService.fetchData<DefaultRequest<Message[]>>(`${environment.apiBaseUrl}/api/v1/chats/${toUserId}/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${json?.token}`
      }
    })

    if (request.success) {
      request.data.map(item => item.createAt = this.formatDate(item.createAt!))
    }
    
    return request
  }

  public async sendMessage(toUserId: number, messageText: string) {

    const data: Message = {
      text: messageText,
      toUserId: toUserId,
      sent: true,
      type: 'text',
      createAt: new Date(new Date().getTime())
    }

    const json = this.localStorage.getLocalStorage<Token>('token')
    
    const request = await this.fetchService.fetchData<DefaultRequest<Message>>(`${environment.apiBaseUrl}/api/v1/chats/${toUserId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${json?.token}`
      },
      body: JSON.stringify(data),
    })

    return request
  }

  private formatDate(date: Date): Date {
    const dateObj = new Date(date)
    return new Date(Date.UTC(
      dateObj.getFullYear(),
      dateObj.getMonth(),
      dateObj.getDate(),
      dateObj.getHours(),
      dateObj.getMinutes(),
      dateObj.getSeconds()
    ))
  }
}

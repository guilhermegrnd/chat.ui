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

  public async getMessages(userId: number) {

    if (userId === undefined) return

    const json = this.localStorage.getLocalStorage<Token>('token')

    const request = await this.fetchService.fetchData<DefaultRequest<Message[]>>(`${environment.apiBaseUrl}/api/v1/chats/${userId}/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${json?.token}`
      }
    })
    
    return request
  }

  public async sendMessage(toUserId: number, messageText: string) {
    const data = {
      text: messageText,
      toUserId: toUserId,
      sent: true,
      type: 'text',
      createAt: 0
    }
    
    const request = await this.fetchService.fetchData<DefaultRequest<Token>>(`${environment.apiBaseUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    this.localStorage.setLocalStorage('token',request.data)

    return request
  }
}

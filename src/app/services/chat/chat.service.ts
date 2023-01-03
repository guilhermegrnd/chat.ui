import { Injectable } from '@angular/core';
import { DefaultRequest } from 'src/app/types/DefaultRequest';
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
    console.log('jsontoken',json)
    const request = await this.fetchService.fetchData<DefaultRequest<User[]>>(`${environment.apiBaseUrl}/api/v1/chats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${json?.token}`
      }
    })
    console.log('chatrequest',request)
    return request
  }
}

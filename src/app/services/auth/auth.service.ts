import { Injectable } from '@angular/core';
import { DefaultRequest } from 'src/app/types/DefaultRequest';
import { Token } from 'src/app/types/Token';
import { FetchService } from '../fetch/fetch.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fetchService: FetchService, private localStorage: LocalStorageService) { }

  public async singIn(username: string, password: string) {
    const data = {
      Name: username,
      Password: password
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

  public async signup(username: string, password: string) {
        
    const data = {
      Name: username,
      Password: password
    }
    
    const request = await this.fetchService.fetchData<DefaultRequest<number>>(`${environment.apiBaseUrl}/api/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return request
  } 

  public async signout() {

    if(!this.isUserAuthenticated()) return true

    const json = this.localStorage.getLocalStorage<Token>('token')

    try
    {
      const request = await this.fetchService.fetchData<DefaultRequest<Token>>(`${environment.apiBaseUrl}/api/v1/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${json?.token}`
        }
      })

      if (request.success) {
        this.localStorage.removeLocalStorage('token')
  
        return true
      } else {
        return false
      }
    }
    catch(e)
    {
      console.log('logouterror')
      this.localStorage.removeLocalStorage('token')

      return true
    }
  }

  public isUserAuthenticated() {
    const json = this.localStorage.getLocalStorage<Token>('token')
    if(json != null) return true
    return false
  }

}

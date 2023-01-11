import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { Token } from 'src/app/types/Token';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedUser: User | undefined
  currentChatUser: User | undefined

  constructor(private router: Router, private localStorage: LocalStorageService, private authService: AuthService, private chatService: ChatService) { 
    if(!authService.isUserAuthenticated()) this.router.navigate(['login'])
    
    // const json = this.localStorage.getLocalStorage<Token>('token')
    // this.token = json?.token
  }

  async ngOnInit() {
    // this.userChats = (await this.chatService.getChats()).data
    this.loggedUser = (await this.authService.getLoggedUserData()).data
  }

  async logout() {
    await this.authService.signout()
    this.router.navigate(['login'])
  }

  changeChat(event: any) {
    this.currentChatUser = event
  }

}

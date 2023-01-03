import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Auth } from 'src/app/types/Auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css']
})
export class LoginComponent implements OnInit {

  form: Auth

  constructor(private router: Router, private authService: AuthService) { 
    this.form = {} as Auth

    if(this.authService.isUserAuthenticated()) this.router.navigate(['home'])
  }

  ngOnInit(): void {
  }

  async handleSubmit(event:any) {

    const request = await this.authService.singIn(this.form.username, this.form.password)

    this.form.message = request.message
    if (request.success) this.router.navigate(['home'])
  }

}

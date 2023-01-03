import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Auth } from 'src/app/types/Auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.css']
})
export class SignupComponent implements OnInit {

  form: Auth

  constructor(private router: Router, private authService: AuthService) { 
    this.form = {} as Auth

    if(this.authService.isUserAuthenticated()) this.router.navigate(['home'])
  }

  ngOnInit(): void {
  }

  async handleSubmit(event:any) {

    if (this.form.password !== this.form.passwordConfirmation) {
      this.form.message = 'Passwords Missmatch'
      return null
    }
    
    const request = await this.authService.signup(this.form.username, this.form.password)

    this.form.message = request.message
    if (request.success) return this.router.navigate(['login'])

    return null
  }
}

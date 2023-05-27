import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { Response, UserInfo } from '../ResponseTemplate';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private router: Router) { }

  async registerClick(username: HTMLInputElement, password: HTMLInputElement) {

    if (username.value === '' && password.value === '') {
      return alert("Invalid Credentials")
    }

    await this.Login(username, password);
  }

  async Login(username: HTMLInputElement, password: HTMLInputElement) {
    const response = await fetch('http://localhost:3001/api/v2/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      })
    })
    
    if(!response.ok){
      password.value = ''
      return alert('Invalid Username or Password.')
    }

    const result = (await response.json()) as Response;

    username.value = ''
    password.value = ''

    const getUserInfo = await fetch(`http://localhost:3001/api/v1/user/${result.result.data[0].id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${result.token}`
      }
    })

    if(!getUserInfo.ok){
      return alert(`Couldn't get user info, Please try again later.`)
    }

    const userInfoResult = (await getUserInfo.json()) as UserInfo[];

    // To access user info -> userInfoResult[0].*
    
    const homeComp = new HomeComponent()
    homeComp.RetrieveInfo(userInfoResult[0])

    this.router.navigate(['/']);
  }
}

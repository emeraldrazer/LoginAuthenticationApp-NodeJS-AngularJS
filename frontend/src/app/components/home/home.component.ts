import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../ResponseTemplate';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  RetrieveInfo(userInfo: UserInfo): void {
    // To Access data from home page
    //alert(`ID: ${userInfo.id}\nEmail: ${userInfo.email}\nFull Name: ${userInfo.fullname}\nUsername: ${userInfo.username}\nPassword: ${userInfo.password}`) 
  }
}

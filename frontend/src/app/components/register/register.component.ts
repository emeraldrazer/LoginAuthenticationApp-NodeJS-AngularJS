import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router: Router) { }

  registerClick(fullname: HTMLInputElement, username: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement) {

    let isValid: String = this.VerifyInfo(fullname, username, email, password);

    if (isValid !== '') {
      return alert(isValid);
    }

    fetch('http://localhost:3001/api/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: 0,
        fullname: fullname.value,
        username: username.value,
        email: email.value,
        password: password.value,
      })
    })
      .then(response => {
        if (!response.ok) {
          return alert('Something went wrong. Please try again, or try again later');
        }

        this.router.navigate(['/login']);

        console.log(response.json);
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    fullname.value = ''
    username.value = ''
    email.value = ''
    password.value = ''

    alert('Successfully Registered!')
  }

  VerifyInfo(fullname: HTMLInputElement, username: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement): String {
    if (fullname.value == "" || username.value == "" || email.value == "" || password.value == "") {
      return 'Please Fill out the form.';
    }

    for (let i = 0; i < 10; i++) {
      if (fullname.value.includes(i.toString())) {
        return 'Invalid Name';
      }
    }

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.value.match(validRegex)) {
      email.value = ''
      return 'Invalid Email';
    }

    return '';
  }
}

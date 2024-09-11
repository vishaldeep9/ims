import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm:FormGroup=new FormGroup({
    userName:new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.pattern( /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
  });

  constructor(){}
  ngOnInit():void
  {}

  // * ------login function----------
  login(){
    console.log(this.loginForm.value);
  }
}

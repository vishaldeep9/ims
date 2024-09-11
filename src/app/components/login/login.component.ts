import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
  });

  constructor(private authService: AuthService,private router:Router) {}
  ngOnInit(): void {}

  // * ------login function----------
  login() {
    this.authService.login(this.loginForm.value).subscribe((value) => {
      localStorage.setItem('token', value.token);
      alert(`login successful`);
      this.router.navigate(['/dashboard']);
    },(error)=>{
      alert(`invalid credentials`)
    });
  }
}

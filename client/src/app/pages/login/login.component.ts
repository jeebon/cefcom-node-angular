import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  msg = '';
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/home']);
    }
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    );
  }


  onSubmit() {
    this.msg = '';
    if (this.loginForm.invalid) {
      this.msg = "Please provide valid information.";
      return;
    }

    this.authService.login(this.loginForm.value).subscribe((res) => {
      this.msg = 'Successfully Logged in.';
      if (res.status == 200) {
        this.router.navigate(['/home']);
      }
    }, (err) => {
      console.log('err', err);
      this.msg = err || 'Unable to process request!';
    });

  }
}

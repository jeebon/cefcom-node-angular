import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  msg = '';
  signupForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/home']);
    }

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        repeatPassword: ['', [Validators.required]],
      }
    );
  }


  onSubmit() {
    this.msg = '';
    if (this.signupForm.invalid) {
      this.msg = "Please provide valid information.";
      return;
    }

    if (this.signupForm.value['password'] !== this.signupForm.value['repeatPassword']) {
      this.msg = "Password doesn't match.";
      return;
    }

    this.authService.signup(this.signupForm.value).subscribe((res) => {
      this.msg = res.message;
      this.router.navigate(['/login']);
    }, (err) => {
      console.log('err', err);
      this.msg = err.message || 'Unable to process request!';
    });

  }
}

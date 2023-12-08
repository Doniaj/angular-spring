import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  forminput!: FormGroup;
  hide: boolean = true;
  captchaToken: string = '';
  rememberMe: boolean = false; // Add the rememberMe property
  constructor(private fb: FormBuilder, private route: Router) {}

  ngOnInit(): void {
    this.forminput = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });

    // Check if "Remember Me" was previously selected
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      this.forminput.patchValue({ email: savedEmail });
      this.rememberMe = true;
    }
  }

  onsubmit() {
   // console.log(this.forminput.valid);
    
    if (this.forminput.valid && this.captchaToken) {
      if (this.rememberMe) {
        localStorage.setItem('rememberedEmail', this.forminput.value.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      this.route.navigate(['/']);
    }
  }

  resolved(captchaResponse: string) {
    this.captchaToken = captchaResponse;
    console.log('resolved captcha with token: ' + this.captchaToken);
  }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { GenericResponse } from 'src/app/models/genericresponse';

@Component({
  selector: 'app-forgot-password-email-form',
  templateUrl: './forgot-password-email-form.component.html',
  styleUrls: ['./forgot-password-email-form.component.css','../../components/forgot-password/forgot-password.component.css']
})
export class ForgotPasswordEmailFormComponent implements OnInit {

  emailForm: FormGroup;
  message: GenericResponse;

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendRequest(){
    const email = this.emailForm.controls['email'].value;
    this.auth.requestPasswordReset(email).subscribe(data => {
      this.message = data
    });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatternValidation } from 'src/app/validators/patternValidation';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { PasswordValidation } from 'src/app/validators/PasswordValidation';
import { GenericResponse } from 'src/app/models/genericresponse';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['./new-password-form.component.css','../../components/forgot-password/forgot-password.component.css']
})
export class NewPasswordFormComponent implements OnInit {

  passwordForm: FormGroup;
  message: GenericResponse;
  @Input()
  userId: string;
  @Input()
  token: string;
  submitted: boolean = false;
  passwordTouched: boolean = false;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private profileService: ProfileService) { 

  }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.passwordForm = this.fb.group({
      password: ['', [

        Validators.minLength(8),
        Validators.maxLength(20),
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        PatternValidation.patternValidator(/\d/, { hasNumber: true }),
        // 3. check whether the entered password has upper case letter
        PatternValidation.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        PatternValidation.patternValidator(/[a-z]/, { hasSmallCase: true }),
      ]],
      rpassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    },{
        validator: PasswordValidation.MatchPassword
      
    });
  }
  changePassword(){
    this.submitted = true;
    this.isLoading = true;
    this.profileService.changePassword(this.userId,this.token,this.passwordForm.controls['password'].value).subscribe(data => {
        this.message = data;
        this.isLoading = false;
    })
  }
}

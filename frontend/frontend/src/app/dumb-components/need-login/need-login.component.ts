import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-need-login',
  templateUrl: './need-login.component.html',
  styleUrls: ['./need-login.component.css']
})
export class NeedLoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/home'])
    }
  }

}

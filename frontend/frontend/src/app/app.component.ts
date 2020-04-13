import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lat: number = 51.678418;
  lng: number = 7.809007;
  icon = {url:"https://image.flaticon.com/icons/svg/190/190786.svg",scaledSize:{width: 50,height: 50}}


}

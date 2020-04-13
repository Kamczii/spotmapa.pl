import { Component, OnInit } from '@angular/core';
import { Spot } from 'src/app/models/spot';

@Component({
  selector: 'app-info-window',
  templateUrl: './info-window.component.html',
  styleUrls: ['./info-window.component.css']
})
export class InfoWindowComponent implements OnInit {

  spot: Spot;

  constructor() { }

  ngOnInit() {
    console.log(this.spot.images[0])
  }

}

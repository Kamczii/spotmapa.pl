import { Component, OnInit, Input } from '@angular/core';
import { SpotService } from 'src/app/services/spot.service';
import { BaseSearchCriteria } from 'src/app/criteria/BaseSearchCrtieria';
import { Spot } from 'src/app/models/spot';

@Component({
  selector: 'app-spot-preview',
  templateUrl: './spot-preview.component.html',
  styleUrls: ['./spot-preview.component.css']
})
export class SpotPreviewComponent implements OnInit {
  @Input()
  spot: Spot;
  distance: number;
  location: boolean = false;
  constructor() { }

  ngOnInit() {
    const that = this;
    if (navigator.geolocation) {
      this.location = true;
      navigator.geolocation.getCurrentPosition(function (position) {
        const initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        that.distance = google.maps.geometry.spherical.computeDistanceBetween(initialLocation, new google.maps.LatLng(that.spot.lat, that.spot.lng)) / 1000;
      });
    }

  }

}

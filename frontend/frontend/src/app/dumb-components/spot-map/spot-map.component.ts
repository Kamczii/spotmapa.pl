import { Component, OnInit, ViewChild, AfterViewInit, ComponentFactoryResolver, ComponentRef, Injector, ApplicationRef } from '@angular/core';
import { SpotService } from 'src/app/services/spot.service';
import { BaseSearchCriteria } from 'src/app/criteria/BaseSearchCrtieria';
import { } from 'googlemaps';
import { Spot } from 'src/app/models/spot';
import { HomeComponentComponent } from '../home-component/home-component.component';
import { InfoWindowComponent } from '../info-window/info-window.component';
import { Position } from 'src/app/models/position';

@Component({
  selector: 'app-spot-map',
  templateUrl: './spot-map.component.html',
  styleUrls: ['./spot-map.component.css']
})
export class SpotMapComponent implements OnInit {

  pageNumber: number = 1;
  maxSize: number = 5;
  sc: BaseSearchCriteria = new BaseSearchCriteria();

  @ViewChild('map', { static: false })
  mapElement: any;
  map: google.maps.Map;

  markerArray: any[] = new Array();
  activeInfoWindow: any;

  compRef: ComponentRef<InfoWindowComponent>;

  position: Position;

  customLabel = {
    SKATEPARK: {
      label: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
    },
    SPOT: {
      label: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    }
  };

  iconBase = 'https://maps.google.com/mapfiles/ms/icons/';
  icons = {
    SPOT: {
      name: 'Spot',
      icon: this.iconBase + 'green-dot.png'
    },
    SKATEPARK: {
      name: 'Skatepark',
      icon: this.iconBase + 'red-dot.png'
    }
  };

  constructor(private injector: Injector, private spotService: SpotService, private resolver: ComponentFactoryResolver, private appRef: ApplicationRef) {


  }

  ngOnInit() {
    this.sc.pageNumber = this.pageNumber - 1;
    this.sc.maxResults = this.maxSize;

    this.spotService.getAllPosts().subscribe(data => {
      let that = this;
      let spots = data.results;
      for (let i = 0; i < spots.length; i++) {

        let contentString = this.createInfoWindow(spots[i]);

        let infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 400
        });

        let icon = this.icons[spots[i].spotType].icon || {};
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(spots[i].lat, spots[i].lng),
          title: spots[i].name,
          animation: google.maps.Animation.DROP,
          icon: icon
        });

        marker.addListener('click', function () {
          that.openInfoWindow(infowindow, marker);
        });


        this.markerArray.push(marker);
      }

      this.drop();

      var legend = document.getElementById('legend');
      for (var key in this.icons) {
        var type = this.icons[key];
        var name = type.name;
        var icon = type.icon;
        var div = document.createElement('div');
        div.innerHTML = '<img src="' + icon + '"> <span style="font-size:140%;font-weight:bold">' + name + '</span><br><br>';
        legend.appendChild(div);
      }

      this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
    }
    );

  }

  ngAfterViewInit() {

    const mapProperties = {
      center: new google.maps.LatLng(53, 18),
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

    const that = this;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        that.map.setCenter(initialLocation);
        that.map.setZoom(10);
      });
    } else {

    }
  }

  drop() {
    for (var i = 0; i < this.markerArray.length; i++) {
      this.addMarkerWithTimeout(this.markerArray[i], i * 100);
    }
  }

  addMarkerWithTimeout(marker, timeout) {
    let that = this;
    setTimeout(function () { marker.setMap(that.map) }, timeout)
  }

  clearMarkers() {
    for (var i = 0; i < this.markerArray.length; i++) {
      this.markerArray[i].setMap(null);
    }
    this.markerArray = [];
  }

  openInfoWindow(infowindow: any, marker: any) {
    if (this.activeInfoWindow) { this.activeInfoWindow.close(); }
    infowindow.open(this.map, marker);
    this.activeInfoWindow = infowindow;
  }

  createInfoWindow(spot: Spot) {
    const compFactory = this.resolver.resolveComponentFactory(InfoWindowComponent);
    this.compRef = compFactory.create(this.injector);
    this.compRef.instance.spot = spot;
    this.appRef.attachView(this.compRef.hostView);

    let div = document.createElement('div');
    div.appendChild(this.compRef.location.nativeElement);
    return div;
  }

  ngOnDestroy() {
    if (this.compRef) {
      this.appRef.detachView(this.compRef.hostView)
    }
  }


}

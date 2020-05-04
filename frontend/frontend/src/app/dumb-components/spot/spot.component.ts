import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SpotService } from 'src/app/services/spot.service';
import { Spot } from 'src/app/models/spot';
import { AuthService } from 'src/app/services/auth.service';
import { BaseSearchCriteria } from 'src/app/criteria/BaseSearchCrtieria';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.css']
})
export class SpotComponent implements OnInit {

  spot_id: number;
  spot: Spot;
  isLiked: boolean;
  isUserOwningPost: boolean;

  @ViewChild('map', { static: false })
  mapElement: any;
  map: google.maps.Map;
  markers: any[];

  currentFragmet = 'info';

  additionalSpots: Spot[];

  constructor(private auth: AuthService, private spotService: SpotService, private route: ActivatedRoute, private router: Router) {

    router.events.subscribe((val) => {
      this.checkHash();
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      
      this.spot_id = params['id'];
      this.spotService.getSpotById(this.spot_id).subscribe(spot => {
        this.spot = spot;
        if (spot.user.id == this.auth.getUserId())
          this.isUserOwningPost = true;
        let location = new google.maps.LatLng(this.spot.lat, this.spot.lng);
        this.markers = [];
        this.markers.push(new google.maps.Marker({
          position: location,
          map: this.map
        })) ;
        this.map.setCenter(location);
        this.checkIfSpotIsLiked();

        // let sc = new BaseSearchCriteria();
        // sc.pageNumber=0;
        // sc.maxResults=3;
        // this.spotService.getAllPosts(sc).subscribe(data => this.additionalSpots = data.results);
      });
    });


  }

  ngAfterViewInit() {
    const mapProperties = {
      center: new google.maps.LatLng(53.131410, 18.002468),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    

  }

  myFunction(imgs) {
    // Get the expanded image
    var expandImg = document.getElementById("expandedImg") as HTMLImageElement;
    // Get the image text
    var imgText = document.getElementById("imgtext");
    // Use the same src in the expanded image as the image being clicked on from the grid
    expandImg.src = imgs.src;
    // Use the value of the alt attribute of the clickable image as text inside the expanded image
    imgText.innerHTML = imgs.alt;
    // Show the container element (hidden with CSS)
    expandImg.parentElement.style.display = "block";
  }

  checkHash() {
    this.route.fragment.subscribe((fragment: string) => {
      this.currentFragmet = fragment
    })
  }

  checkIfSpotIsLiked() {
    if (!this.auth.isAuthenticated())
      return;
    this.spotService.isSpotLiked(this.spot_id).subscribe(data => this.isLiked = data);
  }

  checkLikesCount() {
    this.spotService.getSpotLikes(this.spot_id).subscribe(data => this.spot.likes = data);
  }

  likePost() {
    if (!this.isAuthenticated())
      return;
    this.spotService.likeSpotById(this.spot_id).subscribe(data => {
      if (data == true) {
        this.checkIfSpotIsLiked();
        this.checkLikesCount();
      }
    })
  }

  unlikePost() {
    this.spotService.unlikeSpotById(this.spot_id).subscribe(data => {
      if (data == true) {
        this.checkIfSpotIsLiked();
        this.checkLikesCount();
      }
    })
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  deleteSpot(){
    if(confirm("Czy na pewno chcesz usunąć post?"))
      this.spotService.deleteSpot(this.spot.id).subscribe(data => this.router.navigate(['/profile/',this.spot.user.id]));
  }
}

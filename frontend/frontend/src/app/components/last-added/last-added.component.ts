import { Component, OnInit } from '@angular/core';
import { SpotService } from 'src/app/services/spot.service';
import { PageWrapper } from 'src/app/models/page';
import { Spot } from 'src/app/models/spot';

@Component({
  selector: 'app-last-added',
  templateUrl: './last-added.component.html',
  styleUrls: ['./last-added.component.css']
})
export class LastAddedComponent implements OnInit {

  spots: PageWrapper<Spot>;

  constructor(private spotService: SpotService) { }

  ngOnInit() {

  }

  getSpots(sc) {

    this.spotService.getAllPosts(sc).subscribe(data => {
      this.spots = data;
    });
  }
}

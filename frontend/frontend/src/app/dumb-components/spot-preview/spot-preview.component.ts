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

  constructor() { }

  ngOnInit() {

  }

}

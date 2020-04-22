import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BaseSearchCriteria } from 'src/app/criteria/BaseSearchCrtieria';
import { Spot } from 'src/app/models/spot';
import { SpotService } from 'src/app/services/spot.service';
import { SearchOrder } from 'src/app/criteria/SearchOrder';
import { PageWrapper } from 'src/app/models/page';

@Component({
  selector: 'app-spots-list',
  templateUrl: './spots-list.component.html',
  styleUrls: ['./spots-list.component.css']
})
export class SpotsListComponent implements OnInit {

  @Output() emitter = new EventEmitter();

  pageNumber: number = 1;
  maxSize: number = 8;

  sc: BaseSearchCriteria = new BaseSearchCriteria();
  title: String = "Spoty";

  @Input() spots: PageWrapper<Spot> = new PageWrapper<Spot>();
  @Input() showSorting = true;

  finished = false;

  constructor() { }

  ngOnInit() {
    window.onresize = this.howManySpots;
    this.howManySpots();
    this.createCriteria();
    this.getSpots();
  }

  createCriteria() {
    let so = new SearchOrder();
    so.fieldName = 'createdAt';
    so.orderType = 'DESC';
    this.sc.sortOrder = so;
    this.sc.pageNumber = this.pageNumber - 1;
    this.sc.maxResults = this.maxSize;
  }

  changePage($event) {
    this.pageNumber = $event;
    this.sc.pageNumber = this.pageNumber - 1;
    this.getSpots();
  }

  getSpots() {
    this.emitter.emit(this.sc);
  }

  howManySpots() {
    const screenWidth = window.screen.width;
    let count = screenWidth / 300;

    if (count < 2) {
      this.maxSize = 8;
    } else {
      this.maxSize = count;
    }
  }
}

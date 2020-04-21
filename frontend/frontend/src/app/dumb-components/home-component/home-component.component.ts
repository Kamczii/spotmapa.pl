import { Component, OnInit } from '@angular/core';
import { BaseSearchCriteria } from 'src/app/criteria/BaseSearchCrtieria';
import { Spot } from 'src/app/models/spot';
import { SpotService } from 'src/app/services/spot.service';
import { SearchOrder } from 'src/app/criteria/SearchOrder';
import { SORT } from 'src/app/enums/sort';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  pageNumber: number = 1;
  maxSize: number = 5;
  sc: BaseSearchCriteria = new BaseSearchCriteria();

  spots: Spot[] = [];

  constructor(private spotService: SpotService) { }

  ngOnInit() {
    let so = new SearchOrder();
    so.fieldName = 'createdAt';
    so.orderType = 'DESC';
    this.sc.sortOrder = so;
    this.sc.pageNumber = this.pageNumber - 1;
    this.sc.maxResults = this.maxSize;
    let that = this;

    this.spotService.getAllPosts(this.sc).subscribe(data => {
      that.spots = data.results;
    });
    // let so = new SearchOrder();
    // so.fieldName = 'createdAt';
    // so.orderType = 'DESC';
    // this.sc.sortOrder = so;
    // this.sc.pageNumber = this.pageNumber-1;
    // this.sc.maxResults = this.maxSize;
    // let that = this;

    // this.spotService.getAllPosts(this.sc).subscribe(data => {
    //   let length = data.results.length;
    //   for(let i=0;i<length;i++){
    //     setTimeout(function(){ 
    //       that.spots.push(data.results[i]); 

    //     console.log("log")
    //     }, (100/length)*i);
    //   }
    // });
  }
}

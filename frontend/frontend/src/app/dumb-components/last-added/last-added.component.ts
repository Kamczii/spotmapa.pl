import { Component, OnInit } from '@angular/core';
import { BaseSearchCriteria } from 'src/app/criteria/BaseSearchCrtieria';
import { Spot } from 'src/app/models/spot';
import { SpotService } from 'src/app/services/spot.service';
import { SearchOrder } from 'src/app/criteria/SearchOrder';

@Component({
  selector: 'app-last-added',
  templateUrl: './last-added.component.html',
  styleUrls: ['./last-added.component.css']
})
export class LastAddedComponent implements OnInit {

  pageNumber: number = 1;
  maxSize: number = 50;
  sc: BaseSearchCriteria = new BaseSearchCriteria();
  title: String = "Spoty";
  spots: Spot[] = [];
  
  finished = false;

  constructor(private spotService: SpotService) { }

  ngOnInit() {
    
    let so = new SearchOrder();
    so.fieldName = 'createdAt';
    so.orderType = 'DESC';
    this.sc.sortOrder = so;
    this.sc.pageNumber = this.pageNumber-1;
    this.sc.maxResults = this.maxSize;

    this.getSpots();
  }

  getSpots(){
    let that = this;
    this.spots = [];
    this.spotService.getAllPosts(this.sc).subscribe(data => {
      let length = data.results.length;
      for(let i=0;i<length;i++){
        setTimeout(function(){ 
          that.spots.push(data.results[i]); 
          
        }, (100/length)*i);
      }
    });
  }
  

}

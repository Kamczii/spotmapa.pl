import { BaseSearchCriteria } from './../../criteria/BaseSearchCrtieria';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchOrder } from 'src/app/criteria/SearchOrder';
import { SpotFields } from 'src/app/enums/SpotFields';
import { SortTypes } from 'src/app/enums/SortTypes';

@Component({
  selector: 'app-sort-post',
  templateUrl: './sort-post.component.html',
  styleUrls: ['./sort-post.component.css']
})
export class SortPostComponent implements OnInit {

  @Input() title: String;
  @Input() sc: BaseSearchCriteria = new BaseSearchCriteria();

  @Output() refreshPosts = new EventEmitter();
  postFields = SpotFields;
  sortTypes = SortTypes;
  isSorting = false;

  actualSortField: String;
  actualSortType: string;

  sortingForm = new FormGroup({
    fieldName: new FormControl('', Validators.required),
    sortType: new FormControl('', Validators.required)
  })

  constructor() { }

  ngOnInit() {
  }

  sort() {
    this.isSorting = true;
    let so = new SearchOrder();
    so.fieldName = this.postFields[this.sortingForm.controls['fieldName'].value].key;
    so.orderType = this.sortTypes[this.sortingForm.controls['sortType'].value].key;
    this.sc.sortOrder = so;

    this.actualSortField = this.postFields[this.sortingForm.controls['fieldName'].value].value;
    this.actualSortType = this.sortTypes[this.sortingForm.controls['sortType'].value].value;

    this.getPosts();
  }

  unSort() {
    this.isSorting = false;
    this.actualSortField = null;
    this.actualSortType = null;

    this.sc.sortOrder = null;

    this.sortingForm.reset({ fieldName: this.postFields[0].value, sortType: this.sortTypes[0].value });

    this.getPosts();
  }

  getPosts() {
    this.refreshPosts.emit('');
  }
}

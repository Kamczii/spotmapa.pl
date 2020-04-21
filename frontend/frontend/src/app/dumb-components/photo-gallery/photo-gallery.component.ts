import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as Hammer from 'hammerjs';
@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements AfterViewInit, OnInit {

  @Input()
  images;

  lightboxEnabled = true;
  currentImage = 0;
  image = '';

  myElement: HTMLElement = document.getElementById('img');;

  constructor() { }

  ngOnInit() {
    this.setImage(0);

  }

  ngAfterViewInit() {
    if (this.myElement)
      var mc = new Hammer(this.myElement);

  }


  onSwipeRight() {
    this.SwipeLeft();
  }

  onSwipeLeft() {
    this.SwipeRight();
  }

  goFullScreen(i) {
    this.lightboxEnabled = true;
    this.setImage(i);
  }

  closeFullScreen() {
    this.lightboxEnabled = false;
    this.currentImage = null;
  }

  setImage(i) {
    this.currentImage = i;
    this.image = this.images[this.currentImage];
  }

  SwipeRight() {
    if (this.currentImage < this.images.length - 1)
      this.currentImage++;
    this.image = this.images[this.currentImage];
  }
  SwipeLeft() {
    if (this.currentImage > 0)
      this.currentImage--;
    this.image = this.images[this.currentImage];
  }
}

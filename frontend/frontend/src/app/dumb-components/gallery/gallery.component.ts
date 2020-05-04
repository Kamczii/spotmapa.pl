import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { transition, animate, keyframes, trigger, state, style } from '@angular/animations';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],

})
export class GalleryComponent implements OnInit {

  @Input()
  items;

  image;
  currentImage = 0;

  lightboxEnabled = true;

  imageRef;

  constructor() {
  }

  ngOnInit() {
    this.image = this.items[this.currentImage];
  }

  ngAfterViewInit() {

    var myElement = document.getElementById('img');
    if (myElement)
      var mc = new Hammer(myElement);

  }


  onSwipeRight(event) {
    if (this.currentImage > 0)
      this.currentImage--;
    event.target.src = this.items[this.currentImage];
  }

  onSwipeLeft(event) {
    if (this.currentImage < this.items.length - 1)
      this.currentImage++;
    event.target.src = this.items[this.currentImage];
  }

  goFullScreen() {
    this.lightboxEnabled = true;
  }

  closeFullScreen() {
    this.lightboxEnabled = false;
    console.log("close")
  }

  setImage(i) {
    this.currentImage = i;
    this.image = this.items[this.currentImage]
  }
}

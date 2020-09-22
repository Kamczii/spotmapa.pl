import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-edit-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrls: ['./edit-avatar.component.css']
})
export class EditAvatarComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileToUpload;

  currentAvatar: String;
  editing: boolean = false;
  isLoading = false;
  constructor(private imageService: ImageService, private profileService: ProfileService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.profileService.getCurrentUserProfile().subscribe(data => this.currentAvatar = data.avatar_url);
    });
  }


  fileChangeEvent(event: any): void {
    this.editing = true;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.fileToUpload = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  uploadAvatar() {
    this.isLoading = true;
    const that = this;
    this.urltoFile(this.fileToUpload, "avatar.png", "image/png").then(
      function (file) {
        that.imageService.uploadAvatar(file).subscribe(data => 
          {
            that.reset(data.data.link);
          }
          );
      }
    );
    // let file = new File([this.fileToUpload], "avatar.png", {type: "image/png" , lastModified: Date.now()});
    // console.log(file);
  }

  urltoFile(url, filename, mimeType) {
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  }

  reset(link: String){
    this.isLoading = false;
    this.imageChangedEvent = '';
    this.croppedImage = '';
    this.fileToUpload = '';
    this.currentAvatar = link;
    this.editing = false;
  }
}

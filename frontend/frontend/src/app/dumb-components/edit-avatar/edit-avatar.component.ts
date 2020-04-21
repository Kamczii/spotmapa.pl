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
  fileToUpload: Blob;

  currentAvatar: String;
  editing: boolean = false;
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
        this.fileToUpload = event.file;
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
    uploadAvatar(){
      console.log(typeof this.croppedImage);
      let file = new File([this.fileToUpload], "avatar.png", {type: "image/png" , lastModified: Date.now()});
      this.imageService.uploadAvatar(file).subscribe(data => console.log(data));
    }

    urltoFile(url, filename, mimeType){
      return (fetch(url)
          .then(function(res){return res.arrayBuffer();})
          .then(function(buf){return new File([buf], filename, {type:mimeType});})
      );
    }
}

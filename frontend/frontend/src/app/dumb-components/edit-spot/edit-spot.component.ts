import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SpotService } from 'src/app/services/spot.service';
import { SpotType } from 'src/app/enums/spotType';
import { ActivatedRoute, Router } from '@angular/router';
import { Spot } from 'src/app/models/spot';

@Component({
  selector: 'app-edit-spot',
  templateUrl: './edit-spot.component.html',
  styleUrls: ['../add-spot/add-spot.component.css']
})
export class EditSpotComponent implements OnInit {

  spotsTypes: SpotType;
  creatingForm: FormGroup;
  radioForm: FormGroup;
  submitted = false;
  spotID: number;
  spot: Spot;

  @ViewChild('map', { static: false })
  mapElement: any;
  map: google.maps.Map;
  marker: any;

  urls = [];
  files = [];
  filesToUpload = [];
  idsToDelete = [];

  addedSpot = '';

  maxFileSizeInBytes = 1048576;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private spotService: SpotService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.createForm();
    this.route.params.subscribe(params => this.spotService.getSpotById(params.id).subscribe(data => {
      this.spotID = params.id;
      this.spot = data;
      this.creatingForm.controls['name'].setValue(data.name);
      this.creatingForm.controls['type'].setValue(data.spotType);
      let clickedLocation = new google.maps.LatLng(data.lat, data.lng);
      this.marker = new google.maps.Marker({
        position: clickedLocation,
        map: this.map,
        draggable: true //make it draggable
      });
      this.creatingForm.controls['description'].setValue(data.description);
    }));
  }

  ngAfterViewInit() {
    const mapProperties = {
      center: new google.maps.LatLng(53.131410, 18.002468),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    let that = this;

    google.maps.event.addListener(this.map, 'click', function (event) {
      let clickedLocation = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());

      if (that.marker == null) {
        //Create the marker.
        that.marker = new google.maps.Marker({
          position: clickedLocation,
          map: that.map,
          draggable: true //make it draggable
        });
      } else {
        //Marker has already been added, so just change its location.
        that.marker.setPosition(clickedLocation);
      }

    });

  }

  updateSpot() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.creatingForm.invalid || this.marker == null) {
      return;
    }

    this.isLoading = true;
    let spot = new Spot();
    spot.name = this.creatingForm.controls['name'].value;
    spot.description = this.creatingForm.controls['description'].value;
    spot.security = 1;
    spot.spotType = this.creatingForm.controls['type'].value;
    spot.lat = this.getMarkerLocation().lat();
    spot.lng = this.getMarkerLocation().lng();

    let files = [];
    let length = this.filesToUpload.length;
    for (let i = 0; i < length; i++) {
      if (!this.idsToDelete.includes(i)) {
        files.push(this.filesToUpload[i])
      }
    }

    this.spotService.updatePost(spot, this.spotID).subscribe(added => {

      if (files.length > 0) {
        this.spotService.addImagesToSpot(added.spot_id, files).subscribe(data => {
          this.afterUpdate(added.spot_id, added.name);
        });
      } else {
        this.afterUpdate(added.spot_id, added.name);
      }

    });
  }

  afterUpdate(spot_id: number, name: string) {
    this.creatingForm.reset();
    this.urls = [];
    this.files = [];
    this.submitted = false;
    this.isLoading = false;
    this.addedSpot = name;

    this.router.navigate(['/spots/' + spot_id]);
  }

  createForm() {
    this.creatingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(400)]],
      type: ['', Validators.required],
      files: []
    });
  }

  getMarkerLocation() {
    return this.marker.getPosition();
  }

  onSelectFile(event) {

    let files = event.srcElement.files;

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        if (this.checkSize(event.target.files[i].size, this.maxFileSizeInBytes)) {

          var reader = new FileReader();

          reader.onload = (event: any) => {
            this.urls.push(event.target.result);
          }

          reader.readAsDataURL(event.target.files[i]);

          this.filesToUpload.push(event.target.files[i]);
        }

        else
          alert((i + 1) + '. plik za duży. Nazwa pliku: ' + event.target.files[i].name);

      }
    }
  }

  onChange(event) {

  }

  urltoFile(url, filename, mimeType) {
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  }

  get f() { return this.creatingForm.controls; }

  remove(i) {
    this.urls[i] = null;
    this.idsToDelete.push(i);
  }

  checkSize(fileSize, size) {
    if (fileSize > size) {
      return false;
    } else
      return true;
  };

  deleteImage(deleteHash: string) {
    if (confirm('Czy na pewno chcesz usunąć zdjęcie?')) {
      this.spotService.deleteImageFromSpotByDeletehash(this.spotID, deleteHash).subscribe(data => {
        if (data.success) {
          this.spotService.getSpotById(this.spotID).subscribe(data => {
            this.spot.images = data.images;
          });
        }
      });
    }
  }
}

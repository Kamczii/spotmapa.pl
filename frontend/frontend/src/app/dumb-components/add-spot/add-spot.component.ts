import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SpotType } from 'src/app/enums/spotType';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Spot } from 'src/app/models/spot';
import { SpotService } from 'src/app/services/spot.service';
import {} from 'googlemaps';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-spot',
  templateUrl: './add-spot.component.html',
  styleUrls: ['./add-spot.component.css']
})
export class AddSpotComponent implements OnInit {

  spotsTypes: SpotType;
  creatingForm: FormGroup;
  radioForm: FormGroup;
  submitted = false;

  @ViewChild('map',{static: false})
  mapElement: any;
  map: google.maps.Map;
  marker: any;
  
  urls = [];
  files = [];
  filesToUpload = [];
  idsToDelete = [];

  addedSpot='';

  maxFileSizeInBytes = 1048576;

  constructor(private fb: FormBuilder, private spotService: SpotService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  ngAfterViewInit(){
    const mapProperties = {
      center: new google.maps.LatLng(53.131410, 18.002468),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
    let that = this;

    google.maps.event.addListener(this.map, 'click', function(event) {
      let clickedLocation = new google.maps.LatLng(event.latLng.lat() , event.latLng.lng());

      if(that.marker == null){
        //Create the marker.
        that.marker = new google.maps.Marker({
            position: clickedLocation,
            map: that.map,
            draggable: true //make it draggable
        });
        } else{
            //Marker has already been added, so just change its location.
            that.marker.setPosition(clickedLocation);
        }
        
      });

  }

  addSpot(){

    this.submitted = true;

        // stop here if form is invalid
        if (this.creatingForm.invalid || this.marker == null) {
            return;
        }

    let spot = new Spot();
    spot.name = this.creatingForm.controls['name'].value;
    spot.description = this.creatingForm.controls['description'].value;
    spot.security = 1;
    spot.spotType = this.creatingForm.controls['type'].value;
    spot.lat = this.getMarkerLocation().lat();
    spot.lng = this.getMarkerLocation().lng();

    let files = [];
    let length =  this.filesToUpload.length;
    for(let i=0;i<length;i++){
      if(!this.idsToDelete.includes(i)){
        files.push(this.filesToUpload[i])
      }
    }
    
    this.spotService.addPost(spot).subscribe(added => {

      if(files.length>0){
        this.spotService.addImagesToSpot(added.spot_id, files).subscribe(data => {
          this.afterUpdate(added.spot_id);
        });
      }else{
        this.afterUpdate(added.spot_id);
      }
      
    });
  }
  
  afterUpdate(spot_id: number){
    this.creatingForm.reset();
        this.urls = [];
        this.files = [];
        this.submitted = false;
        
        document.getElementById("popup").style.opacity = '0';
        document.getElementById("popup").style.display = 'none';

        this.router.navigate(['/spots/'+spot_id]);
  }

  createForm(){
    this.creatingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      description: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(400)]],
      type: ['',Validators.required],
      files: []
    });
  }

  getMarkerLocation(){
   return this.marker.getPosition();
  }

  onSelectFile(event) {

    let files = event.srcElement.files;
    console.log(files)

    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                if(this.checkSize(event.target.files[i].size,this.maxFileSizeInBytes)){

                  var reader = new FileReader();

                  reader.onload = (event:any) => {
                    console.log(event.target);
                     this.urls.push(event.target.result); 
                  }
                  
                  reader.readAsDataURL(event.target.files[i]);

                  this.filesToUpload.push(event.target.files[i]);
                  console.log(this.filesToUpload)
                }

                else
                  alert((i+1)+'. plik za duży. Nazwa pliku: '+event.target.files[i].name);

        }
    }
  }

  onChange(event) {

  }

  urltoFile(url, filename, mimeType){
    return (fetch(url)
        .then(function(res){return res.arrayBuffer();})
        .then(function(buf){return new File([buf], filename, {type:mimeType});})
    );
  }

  get f() { return this.creatingForm.controls; }

  remove(i){
    this.urls[i]=null;
    this.idsToDelete.push(i);
    console.log(this.idsToDelete)
  }

  checkSize(fileSize, size) {
    if(fileSize > size){
       return false;
    } else
      return true;
  };
}
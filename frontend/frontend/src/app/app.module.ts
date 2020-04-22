import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterFormComponent } from './dumb-components/register-form/register-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginFormComponent } from './dumb-components/login-form/login-form.component';
import { SpotMapComponent } from './dumb-components/spot-map/spot-map.component';
import { NotFoundComponent } from './dumb-components/not-found/not-found.component';
import { HomeComponentComponent } from './dumb-components/home-component/home-component.component';
import { InfoWindowComponent } from './dumb-components/info-window/info-window.component';
import { AddSpotComponent } from './dumb-components/add-spot/add-spot.component';
import { SpotComponent } from './dumb-components/spot/spot.component';
import { GalleryModule } from '@ngx-gallery/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GalleryComponent } from './dumb-components/gallery/gallery.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { FragmentPolyfillModule } from './fragmet.module';
import { CommentFormComponent } from './dumb-components/comment-form/comment-form.component';
import { CommentPreviewComponent } from './dumb-components/comment-preview/comment-preview.component';
import { CommentListComponent } from './dumb-components/comment-list/comment-list.component';
import { SpotPreviewComponent } from './dumb-components/spot-preview/spot-preview.component';
import { FooterComponent } from './dumb-components/footer/footer.component';
import { MatRadioModule } from '@angular/material/radio';
import { SpotsListComponent } from './dumb-components/spots-list/spots-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TruncatePipe } from './pipes/TruncatePipe';
import { PhotoGalleryComponent } from './dumb-components/photo-gallery/photo-gallery.component';
import { SortPostComponent } from './dumb-components/sort-post/sort-post.component';
import { UpdateSpotComponent } from './dumb-components/update-spot/update-spot.component';
import { SpotContainerComponent } from './dumb-components/spot-container/spot-container.component';
import { EditSpotComponent } from './dumb-components/edit-spot/edit-spot.component';
import { ProfileInfoComponent } from './dumb-components/profile-info/profile-info.component';
import { EditProfileComponent } from './dumb-components/edit-profile/edit-profile.component';
import { EditAvatarComponent } from './dumb-components/edit-avatar/edit-avatar.component';
import { ProfileComponentsContainerComponent } from './dumb-components/profile-components-container/profile-components-container.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { Angular2ImageGalleryModule } from 'angular2-image-gallery';
import { NgxPaginationModule } from 'ngx-pagination';
import { LastAddedComponent } from './components/last-added/last-added.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

export class MyHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    let mc = new Hammer(element, {
      //touchAction: "auto",

    });
    return mc;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterFormComponent,
    LoginFormComponent,
    SpotMapComponent,
    NotFoundComponent,
    HomeComponentComponent,
    InfoWindowComponent,
    AddSpotComponent,
    SpotComponent,
    GalleryComponent,
    CommentFormComponent,
    CommentPreviewComponent,
    CommentListComponent,
    SpotPreviewComponent,
    FooterComponent,
    SpotsListComponent,
    LastAddedComponent,
    LoadingSpinnerComponent,
    TruncatePipe,
    PhotoGalleryComponent,
    SortPostComponent,
    UpdateSpotComponent,
    SpotContainerComponent,
    EditSpotComponent,
    ProfileInfoComponent,
    EditProfileComponent,
    EditAvatarComponent,
    ProfileComponentsContainerComponent
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FragmentPolyfillModule.forRoot({
      smooth: true
    }),
    ReactiveFormsModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    Ng2CarouselamosModule,
    LightboxModule,
    MatRadioModule,
    Angular2ImageGalleryModule,
    ImageCropperModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080', '192.168.1.2:8080', 's41.mydevil.net:38501', 'spotmapa.pl', 'kamil123.usermd.net', 'localhost:8443']
      }
    })
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
  ],
  entryComponents: [
    InfoWindowComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

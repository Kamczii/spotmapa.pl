import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponentsContainerComponent } from './profile-components-container.component';

describe('ProfileComponentsContainerComponent', () => {
  let component: ProfileComponentsContainerComponent;
  let fixture: ComponentFixture<ProfileComponentsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponentsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponentsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpotComponent } from './add-spot.component';

describe('AddSpotComponent', () => {
  let component: AddSpotComponent;
  let fixture: ComponentFixture<AddSpotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotMapComponent } from './spot-map.component';

describe('SpotMapComponent', () => {
  let component: SpotMapComponent;
  let fixture: ComponentFixture<SpotMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpotMapComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

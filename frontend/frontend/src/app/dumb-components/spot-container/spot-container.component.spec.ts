import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotContainerComponent } from './spot-container.component';

describe('SpotContainerComponent', () => {
  let component: SpotContainerComponent;
  let fixture: ComponentFixture<SpotContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpotContainerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotPreviewComponent } from './spot-preview.component';

describe('SpotPreviewComponent', () => {
  let component: SpotPreviewComponent;
  let fixture: ComponentFixture<SpotPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpotPreviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

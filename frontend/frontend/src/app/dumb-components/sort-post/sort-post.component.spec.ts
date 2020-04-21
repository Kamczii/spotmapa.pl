import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortPostComponent } from './sort-post.component';

describe('SortPostComponent', () => {
  let component: SortPostComponent;
  let fixture: ComponentFixture<SortPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SortPostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

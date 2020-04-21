import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAvatarComponent } from './edit-avatar.component';

describe('EditAvatarComponent', () => {
  let component: EditAvatarComponent;
  let fixture: ComponentFixture<EditAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

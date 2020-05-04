import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedLoginComponent } from './need-login.component';

describe('NeedLoginComponent', () => {
  let component: NeedLoginComponent;
  let fixture: ComponentFixture<NeedLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

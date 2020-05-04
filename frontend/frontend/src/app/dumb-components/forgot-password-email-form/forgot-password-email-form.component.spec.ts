import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordEmailFormComponent } from './forgot-password-email-form.component';

describe('ForgotPasswordEmailFormComponent', () => {
  let component: ForgotPasswordEmailFormComponent;
  let fixture: ComponentFixture<ForgotPasswordEmailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordEmailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpAComponent } from './sign-up-a.component';

describe('SignUpAComponent', () => {
  let component: SignUpAComponent;
  let fixture: ComponentFixture<SignUpAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

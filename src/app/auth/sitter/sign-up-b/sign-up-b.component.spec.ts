import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpBComponent } from './sign-up-b.component';

describe('SignUpBComponent', () => {
  let component: SignUpBComponent;
  let fixture: ComponentFixture<SignUpBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

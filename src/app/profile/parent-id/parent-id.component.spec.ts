import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentIdComponent } from './parent-id.component';

describe('ParentIdComponent', () => {
  let component: ParentIdComponent;
  let fixture: ComponentFixture<ParentIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

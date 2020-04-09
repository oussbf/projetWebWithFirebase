import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitteridComponent } from './sitterid.component';

describe('SitteridComponent', () => {
  let component: SitteridComponent;
  let fixture: ComponentFixture<SitteridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitteridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitteridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

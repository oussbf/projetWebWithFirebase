import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitterComponent } from './sitter.component';

describe('SitterComponent', () => {
  let component: SitterComponent;
  let fixture: ComponentFixture<SitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

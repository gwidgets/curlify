import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersOptionComponent } from './headers-option.component';

describe('HeadersOptionComponent', () => {
  let component: HeadersOptionComponent;
  let fixture: ComponentFixture<HeadersOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadersOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadersOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

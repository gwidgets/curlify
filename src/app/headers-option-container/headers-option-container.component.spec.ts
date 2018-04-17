import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersOptionContainerComponent } from './headers-option-container.component';

describe('HeadersOptionContainerComponent', () => {
  let component: HeadersOptionContainerComponent;
  let fixture: ComponentFixture<HeadersOptionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadersOptionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadersOptionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

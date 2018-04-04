import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedCommandComponent } from './generated-command.component';

describe('GeneratedCommandComponent', () => {
  let component: GeneratedCommandComponent;
  let fixture: ComponentFixture<GeneratedCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

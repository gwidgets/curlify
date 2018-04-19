import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPanelComponent } from './header-panel.component';
import {MatToolbarModule} from '@angular/material';

describe('HeaderPanelComponent', () => {
  let component: HeaderPanelComponent;
  let fixture: ComponentFixture<HeaderPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPanelComponent ],
      imports: [
        MatToolbarModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header-panel component', () => {
    expect(component).toBeTruthy();
    expect(component.appTitle).toEqual("Curlify")
    expect(fixture.debugElement.nativeElement.querySelector("mat-toolbar") !== null).toBe(true)
  });
});

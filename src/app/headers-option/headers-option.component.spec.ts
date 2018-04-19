import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersOptionComponent } from './headers-option.component';
import {MatInputModule, MatFormFieldModule, MatOptionModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import * as headers from "./headers.json";

describe('HeadersOptionComponent', () => {
  let component: HeadersOptionComponent;
  let fixture: ComponentFixture<HeadersOptionComponent>;
  let headersList = headers;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadersOptionComponent ],
      imports:[MatSelectModule, MatOptionModule, MatInputModule, MatFormFieldModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    
    fixture = TestBed.createComponent(HeadersOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the headers-option component', () => {
    expect(component).toBeTruthy();
    expect(component.headerListSelect).toBeTruthy();
    expect(component.headerValueInput).toBeTruthy();
    component.headerListSelect.options.toArray().map(mapOption => mapOption.value)
                                     .forEach(optionValue => expect(headersList).toContain(optionValue));
      });
  
  it('change of header type should call headerTypeChanged', () => {
    spyOn(component, "headerTypeChanged");
   const firstOption = component.headerListSelect.options.first;
   firstOption.select;
   component.headerListSelect._elementRef.nativeElement.dispatchEvent(new Event("change"));
   fixture.detectChanges();
   expect(component.headerTypeChanged).toHaveBeenCalled();

  });

  it('change of header value should call headerValueChanged', () => {
    spyOn(component, "headerValueChanged");
    const newValue = "newValue";
    component.headerValueInput.value = newValue;
    const table = <HTMLTableElement>fixture.nativeElement.querySelector("table");
    const headerValueInput = table.rows[0].cells[1].querySelector("mat-form-field input");
    headerValueInput.dispatchEvent(new Event("keyup"));
    fixture.detectChanges();
    expect(component.headerValueChanged).toHaveBeenCalled();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionSelectComponent } from './option-select.component';
import {MatCheckboxModule, MatInputModule, MatFormFieldModule, MatInput} from '@angular/material';
import { OptionCommandConfig } from '../main-panel/option-command-config';
import { OptionOperation } from '../main-panel/option-config';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('OptionSelectComponent', () => {
  let component: OptionSelectComponent;
  let fixture: ComponentFixture<OptionSelectComponent>;
  const optionObjWithoutArgument = {"longFormOption":"--unix-socket", "description":"Connect through this Unix domain socket"};
  const optionObjWithArgument = {"longFormOption":"--unix-socket","argument":"path","description":"Connect through this Unix domain socket"  };
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionSelectComponent ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionSelectComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when the option has no argument, the component should have a material checkbox only', () => {
    component.option =  optionObjWithoutArgument;
    fixture.detectChanges();
    let checkbox = fixture.debugElement.nativeElement.querySelector("mat-checkbox");
    expect(checkbox != null).toBe(true);
    expect(checkbox.querySelector("input").name).toEqual(optionObjWithoutArgument.longFormOption);
    expect(fixture.debugElement.nativeElement.querySelector("mat-form-field")).toBeNull();
    
  });

  it('when the option has an argument, the component should have a material checkbox and an input', () => {
    component.option =  optionObjWithArgument;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector("mat-checkbox") != null).toBe(true);
    let matformfield = fixture.debugElement.nativeElement.querySelector("mat-form-field");
    expect(matformfield != null).toBe(true);
    expect(matformfield.querySelector("input").placeholder).toEqual(optionObjWithArgument.argument);
  });

  it('when the option checkbox is ticked, onCommandChanged is called', () => {
   spyOn(component, 'onCommandChanged')
    component.option =  optionObjWithoutArgument;
    let materialCheckbox = fixture.debugElement.nativeElement.querySelector("mat-checkbox");
    materialCheckbox.dispatchEvent(new Event("change"));
    fixture.detectChanges();
    expect(component.onCommandChanged).toHaveBeenCalled();
  });

  it('when argument value changes, onOptionArgumentChanged should be called', () => {
    spyOn(component, 'onOptionArgumentChanged')
    component.option =  optionObjWithArgument;
    fixture.detectChanges();
    const argumentInput =  fixture.debugElement.nativeElement.querySelector("mat-form-field").querySelector("input");
    argumentInput.value = "newArgumentValue";
    argumentInput.dispatchEvent(new Event("keyup"));
    fixture.detectChanges();
    expect(component.onOptionArgumentChanged).toHaveBeenCalled();
  });
});

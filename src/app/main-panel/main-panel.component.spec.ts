import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPanelComponent } from './main-panel.component';
import { AppModule } from '../app.module';
import * as optionsConfig from "./commands.json";
import { By } from '@angular/platform-browser';
import { MatSelect, MatOption } from '@angular/material';

describe('MainPanelComponent', () => {
  let component: MainPanelComponent;
  let fixture: ComponentFixture<MainPanelComponent>;
  let optionsList : Array<string>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    optionsList = <any>optionsConfig;
  });

  it('should create the main-panel components with the correct layout and children components', () => {
    expect(component).toBeTruthy();
    expect(component._generatedCommand).toBeTruthy();
    expect(component._dataTextArea).toBeTruthy();
    expect(component._dataTypeRadioGroup).toBeTruthy();
    const nativeElement = fixture.nativeElement;
    expect(nativeElement.childElementCount).toEqual(2)
    const commandGenerationContainer = nativeElement.querySelector(".container")
    expect(commandGenerationContainer.childElementCount).toEqual(2)
    const requiredCommandsContainer = commandGenerationContainer.querySelector("#leftContainer");
    expect(requiredCommandsContainer !== null).toBe(true);
    const childrenRequiredCommands = requiredCommandsContainer.querySelectorAll("app-item-container-child");
    expect(childrenRequiredCommands.length).toEqual(4);

    const urlInputChildCommand = childrenRequiredCommands[0];
    const httpMethodChildCommand = childrenRequiredCommands[1];
    const dataInputChildCommand = childrenRequiredCommands[2];
    const dataTypeChildCommand = childrenRequiredCommands[3];

    expect(urlInputChildCommand.querySelector("mat-form-field") !== null).toBe(true)
    expect(httpMethodChildCommand.querySelector("mat-form-field") !== null).toBe(true)
    expect(dataInputChildCommand.querySelector("mat-form-field") !== null).toBe(true)
    expect(dataTypeChildCommand.querySelector("mat-radio-group") !== null).toBe(true)

    const optionsCommandsContainer = commandGenerationContainer.querySelector("#optionsContainer");

    const optionsCommands = optionsCommandsContainer.querySelectorAll("app-item-container-child");
    expect(optionsCommands.length).toEqual(optionsList.length + 1);
  });

  it('ensure changing the url calls updateCommand', () => {
    spyOn(component._generatedCommand, "updateCommand");
    const nativeElement = fixture.nativeElement;
    const urlFormField = nativeElement.querySelector("#leftContainer > div > div > app-item-container-child:nth-child(1) > div > mat-form-field");
    const urlInput = urlFormField.querySelector("input");
    urlInput.value = "google.com";
    urlInput.dispatchEvent(new Event("keyup"));
    fixture.detectChanges();
    expect(component._generatedCommand.updateCommand).toHaveBeenCalled();
  });

  it('ensure changing the http method calls updateCommand', () => {
    spyOn(component._generatedCommand, "updateCommand")
    const matSelect = <MatSelect>fixture.debugElement.query(By.css("#leftContainer > div > div > app-item-container-child:nth-child(2) > div > mat-form-field > div > div.mat-input-flex.mat-form-field-flex > div > mat-select")).componentInstance;
   matSelect.options.last.select();
    matSelect._elementRef.nativeElement.dispatchEvent(new Event("change"));
    fixture.detectChanges();
    expect(component._generatedCommand.updateCommand).toHaveBeenCalled();
  });

  it('ensure changing the data calls updateCommand', () => {
    spyOn(component._generatedCommand, "updateCommand")
    const nativeElement = fixture.nativeElement;
    const dataFormField = nativeElement.querySelector("#leftContainer > div > div > app-item-container-child:nth-child(3) > div > mat-form-field");
    const dataInput = dataFormField.querySelector("textarea");
    dataInput.value = "somedata"
    dataInput.dispatchEvent(new Event("keyup"));
    fixture.detectChanges();
    expect(component._generatedCommand.updateCommand).toHaveBeenCalled()
  });

  it('ensure ticking an option calls updateCommand', () => {
    spyOn(component._generatedCommand, "updateCommand")
    const nativeElement = fixture.nativeElement;
    const appOptionSelectElement = nativeElement.querySelector("#optionsContainer > div > div > app-item-container-child:nth-child(5) > div > mat-accordion > mat-expansion-panel > div > div > app-option-select");
    const optionCheckboxElement = appOptionSelectElement.querySelector("mat-checkbox > label > div > input");
    optionCheckboxElement.checked = true;
    appOptionSelectElement.dispatchEvent(new Event("commandChanged"));
    fixture.detectChanges();
    expect(component._generatedCommand.updateCommand).toHaveBeenCalled();
  });
});

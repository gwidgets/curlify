import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommandConfig } from '../main-panel/command-config';
import { OptionCommandConfig } from '../main-panel/option-command-config';
import { OptionOperation } from '../main-panel/option-config';
import { MatCheckboxChange, MatFormField, MatCheckbox, MatInput } from '@angular/material';
import * as $ from 'jquery';

@Component({
  selector: 'app-option-select',
  templateUrl: './option-select.component.html',
  styleUrls: ['./option-select.component.css']
})
export class OptionSelectComponent implements OnInit {
  @Input()
  option: object;

  @Output()
  commandChanged: EventEmitter<object> = new EventEmitter<object>();

  @Output()
  optionChanged: EventEmitter<object> = new EventEmitter<object>();

  @ViewChild(MatCheckbox)
  public optionCheckBox: MatCheckbox;

  @ViewChild(MatInput)
  private argumentField: MatInput;

  constructor() {
   }

  ngOnInit() {
  }

  onCommandChanged(event: MatCheckboxChange) {
    if (event.checked) {
      if (this.argumentField !== undefined) {
        let argument = this.argumentField.value === "" ? this.argumentField.placeholder : this.argumentField.value;
        this.commandChanged.emit(new CommandConfig(5, event.source.name, true, new OptionCommandConfig(event.source.name, argument, OptionOperation.TAIL, true)));
      } else {
        this.commandChanged.emit(new CommandConfig(5, event.source.name, true, new OptionCommandConfig(event.source.name, "", OptionOperation.TAIL)));
      }
    } else {
      this.commandChanged.emit(new CommandConfig(5, event.source.name, true, new OptionCommandConfig(event.source.name, "", OptionOperation.REMOVE))); 
    }
  }

  onOptionArgumentChanged(event: Event) {

    const target = <HTMLInputElement>event.target;
    if (event.type === "paste") { 
      //to make sure the value is there if there is a paste
      setTimeout(() => this.handleArgumentValueChanged(target), 100)
    } else {
      this.handleArgumentValueChanged(target);
    }
  }

  private handleArgumentValueChanged(target) {
    if (this.optionCheckBox.checked) {
      this.optionChanged.emit(new CommandConfig(5, target.name, true, new OptionCommandConfig(target.name, target.value, OptionOperation.MODIFY, true)));
     }
  }

}

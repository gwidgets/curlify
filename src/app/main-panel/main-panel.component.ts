import { Component, OnInit, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { GeneratedCommandComponent }  from '../generated-command/generated-command.component';
import { concat } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import * as optionsConfig from "./commands.json";
import { MatCheckboxChange, MatFormField, MatRadioChange, MatRadioGroup, MatTextareaAutosize, MatOptionSelectionChange, MatSelectChange } from '@angular/material';
import { CommandConfig } from './command-config';
import { OptionCommandConfig } from './option-command-config';
import { OptionOperation } from './option-config';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css'],
})
export class MainPanelComponent implements OnInit {

  onUrlChanged = new EventEmitter<object>();
  onHttpMethodChanged = new EventEmitter<object>();
  onDataChanged = new EventEmitter<object>();
  onOptionChanged = new EventEmitter<object>();
  onDataTypeChanged = new EventEmitter<object>();
  onHeaderChanged = new EventEmitter<object>();
  requiredCommands = [];
  optionCommands = [];
  headersCommands = [];
  options = optionsConfig;

  @ViewChild(GeneratedCommandComponent)
  private generatedCommand: GeneratedCommandComponent;

  @ViewChild(MatRadioGroup)
  private dataTypeRadioGroup: MatRadioGroup;

  @ViewChild("dataTextArea")
  private dataTextArea: ElementRef;

  constructor() { 
  }

  ngOnInit() {
   merge( this.onUrlChanged, this.onHttpMethodChanged, this.onDataChanged, this.onOptionChanged, this.onDataTypeChanged, this.onHeaderChanged)
        .subscribe((command: CommandConfig) => {
          if (!command.isOptionalCommand) {
              this.requiredCommands[command.position] = command;
          } else {
            switch(+command.optionConfig.optionOperation) {
                  case OptionOperation.TAIL : {
                    if (command.isHeaderCommand) {
                     this.headersCommands.push(command);
                    } else {
                      this.optionCommands.push(command);
                    }
                    break;
                  } 
                  case OptionOperation.REMOVE: {
                    if (command.isHeaderCommand) {
                      this.headersCommands.splice(parseInt(command.optionConfig.argumentValue), 1);
                    } else {
                      const index = this.optionCommands.filter((option) => option != null && option.optionConfig !== undefined && option.optionConfig != null).findIndex((option) => option.optionConfig.name.includes(command.optionConfig.name));
                      this.optionCommands.splice(index, 1);
                    }
                    break;
                  } 
                  default: {
                    if (command.isHeaderCommand) {
                      this.headersCommands[parseInt(command.optionConfig.argumentValue)] = command;
                    } else {
                      const index = this.optionCommands.filter((option) => option != null && option.optionConfig !== undefined && option.optionConfig != null).findIndex((option) => option.optionConfig.name.includes(command.optionConfig.name));
                      this.optionCommands[index] = command;
                    }
                    break;
                  }
            }
          }
             this.generatedCommand.updateCommand(this.getCommandAsString());
            }) 
  }

  urlChanged(event: KeyboardEvent) {
    const target = <HTMLInputElement>event.target;
    this.onUrlChanged.emit(new CommandConfig(1, target.value));
  }

  httpMethodChanged(event: MatSelectChange) {
    this.onHttpMethodChanged.emit(new CommandConfig(0, "-X" +event.value));
  }

  dataChanged(event: Event) {
    const target = <HTMLTextAreaElement>event.target;
    if (event.type === "paste") {
      setTimeout(() => {
        this.readDataAndEmit(target)
      }, 100)
    } else {
      this.readDataAndEmit(target)
    }
  }

  optionEvent(newValue) {
    this.onOptionChanged.emit(newValue);
  }

  dataTypeChanged(event: MatRadioChange) {
    let value = event.value+" '" +this.dataTextArea.nativeElement.value +"'";
    if (this.dataTextArea.nativeElement.value === "")
      value = "";
    this.onDataTypeChanged.emit(new CommandConfig(2, value));
  }

  headerChanged(headerCommand) {
     this.onHeaderChanged.emit(headerCommand)      
  }

  getCommandAsString() {
    let optionsCommandsCopy = this.optionCommands.filter(command => command != null).sort((currentCommandConfig, nextCommandConfig) => {
      if (currentCommandConfig.position < nextCommandConfig.position) {
       return -1;
      } else if (currentCommandConfig.position > nextCommandConfig.position) {
        return 1;
      }
     return 0;
    });
    let commandArray = ["curl"]

    let commandsOptionsAsStringsArray = optionsCommandsCopy.map(command => {
        if (command.optionConfig.hasArgument) {
          return command.value + " '" + command.optionConfig.argumentValue + "'";
        } else {
          return command.value;
        }
    })

    let requiredOptionsAsStringsArray = this.requiredCommands.map(command => {
        return command.value;
    })

    let headerOptionsAsStringsArray = this.headersCommands.map(headerCommand => {
      return headerCommand.value;
  })

    return commandArray.concat(requiredOptionsAsStringsArray).concat(headerOptionsAsStringsArray)
                      .concat(commandsOptionsAsStringsArray).toString().replace(/,/g, " ") ;
  }

 private readDataAndEmit(target) {
    let value =  this.dataTypeRadioGroup.value +" '" +target.value +"'" ;
    if (target.value === "")
    value = "";
  this.onDataChanged.emit(new CommandConfig(2,  value ));
  }

  get _generatedCommand() {
    return this.generatedCommand;
  }

  get _dataTypeRadioGroup() {
    return this.dataTypeRadioGroup;
  }

  get _dataTextArea() {
    return this.dataTextArea;
  }
}
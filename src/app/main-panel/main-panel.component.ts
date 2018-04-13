import { Component, OnInit, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { GeneratedCommandComponent }  from '../generated-command/generated-command.component';
import { concat } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import * as optionsConfig from "./commands.json";
import { MatCheckboxChange, MatFormField } from '@angular/material';
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
  requiredCommands = [];
  optionCommands = [];
  options = optionsConfig.list;

  @ViewChild(GeneratedCommandComponent)
  private generatedCommand: GeneratedCommandComponent;

  constructor() { 
  }

  ngOnInit() {
   merge( this.onUrlChanged, this.onHttpMethodChanged, this.onDataChanged, this.onOptionChanged)
        .subscribe(command => {
          if (!command.isOptionalCommand) {
            this.requiredCommands[command.position] = command;
          } else {
            switch(+command.optionConfig.optionOperation) {
                  case OptionOperation.TAIL : {
                      this.optionCommands.push(command)
                    break;
                  } 
                  case OptionOperation.REMOVE: {
                    let index = this.optionCommands.filter((option) => option != null && option.optionConfig !== undefined && option.optionConfig != null).findIndex((option) => option.optionConfig.name.includes(command.optionConfig.name));
                    this.optionCommands.splice(index, 1);
                    break;
                  } 
                  default: {
                    let index = this.optionCommands.filter((option) => option != null && option.optionConfig !== undefined && option.optionConfig != null).findIndex((option) => option.optionConfig.name.includes(command.optionConfig.name));
                    this.optionCommands[index] = command;
                    break;
                  }
            }
          }
             this.generatedCommand.updateCommand(this.getCommandAsString());
            }) 
  }

  urlChanged(event: KeyboardEvent) {
    this.onUrlChanged.emit(new CommandConfig(1, event.target.value));
  }

  httpMethodChanged(event: Event) {
    this.onHttpMethodChanged.emit(new CommandConfig(0, "-X" +event.value));
  }

  dataChanged(event: Event) {
    this.onDataChanged.emit(new CommandConfig(2,  "-d '" +event.target.value +"'" ));
  }

  onOptionEvent(newValue) {
    this.onOptionChanged.emit(newValue);
  }

  getCommandAsString() {
    let optionsCommandsCopy = this.optionCommands.filter(command => command != null).sort((currentCommandConfig, nextCommandConfig) => {return currentCommandConfig.position > nextCommandConfig.position});
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

    return commandArray.concat(requiredOptionsAsStringsArray).concat(commandsOptionsAsStringsArray).toString().replace(/,/g, " ") ;
  }
}
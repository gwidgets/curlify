import { Component, OnInit, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { GeneratedCommandComponent }  from '../generated-command/generated-command.component';
import { concat } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import * as optionsConfig from "./commands.json";
import { MatCheckboxChange } from '@angular/material';
import { CommandConfig } from './command-config';
import { OptionCommandConfig } from './option-command-config';
import { OptionOperation } from './option-config';
import * as $ from 'jquery';

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
  onOptionArgumentChanged = new EventEmitter<object>();
  commands = ["curl"];
  options = optionsConfig.list;

  @ViewChild(GeneratedCommandComponent)
  private generatedCommand: GeneratedCommandComponent;

  constructor() { 
    console.log(optionsConfig);
  }

  ngOnInit() {
   merge( this.onUrlChanged, this.onHttpMethodChanged, this.onDataChanged, this.onOptionChanged, this.onOptionArgumentChanged)
        .subscribe(command => {
          console.log(command);
          console.log(this.commands.toString());
          if(!command.isOption) {
             this.commands[command.position] = command.value;
          } else {
            switch(+command.optionConfig.optionOperation) {
                  case OptionOperation.TAIL : {
                    this.commands.push(command.value);
                    break;
                  } 
                  case OptionOperation.REMOVE: {
                    let index = this.commands.findIndex((option) => option.includes(command.optionConfig.name));
                    this.commands[index] = "";
                    break;
                  } 
                  default: {
                    let index = this.commands.findIndex((option) => option.includes(command.optionConfig.name));
                    this.commands[index] = command.optionConfig.name + " '" + command.optionConfig.argumentValue + "'";
                    break;
                  }

            }
          }
             this.generatedCommand.elementRef.nativeElement.querySelector(".command").innerText = this.commands.toString().replace(/,/g, " ");
            }) 

    
       // .subscribe(method => {this.generatedCommand.elementRef.nativeElement.querySelector(".command").innerText = "curl -X" + method})
  }

  urlChanged(event: KeyboardEvent) {
    this.onUrlChanged.emit(new CommandConfig(2, event.target.value));
  }

  httpMethodChanged(event: Event) {
    console.log(event)
    this.onHttpMethodChanged.emit(new CommandConfig(1, "-X" +event.value));
  }

  dataChanged(event: Event) {
    console.log(event)
    this.onDataChanged.emit(new CommandConfig(3,  "-d '" +event.target.value +"'" ));
  }

  commandChanged(event: MatCheckboxChange) {
    console.log(event)
    console.log($(event.source._elementRef.nativeElement).next().is("mat-form-field"));
    if (event.checked) {
     this.onOptionChanged.emit(new CommandConfig(4, event.source.name, true, new OptionCommandConfig(event.source.name, "", OptionOperation.TAIL)));
    } else {
      this.onOptionChanged.emit(new CommandConfig(4, event.source.name, true, new OptionCommandConfig(event.source.name, "", OptionOperation.REMOVE))); 
    }
  }

  optionArgumentChanged(event: Event) {
     // this.onOptionArgumentChanged.emit();

     let optionChecked = $( "mat-checkbox[ng-reflect-name='"+event.target.name+"']").find("input").get(0).checked;

     console.log(optionChecked);

     if (optionChecked) {
      this.onOptionArgumentChanged.emit(new CommandConfig(4, event.target.name, true, new OptionCommandConfig(event.target.name, event.target.value, OptionOperation.MODIFY)));
     }
  }
}
import { Component, OnInit, EventEmitter, ViewChild} from '@angular/core';
import { GeneratedCommandComponent }  from '../generated-command/generated-command.component';
import { concat } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import * as optionsConfig from "./commands.json";
import { MatCheckboxChange } from '@angular/material';

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
  commands = ["curl"];
  options = <any>optionsConfig.list;

  @ViewChild(GeneratedCommandComponent)
  private generatedCommand: GeneratedCommandComponent;

  constructor() { 
    console.log(optionsConfig);
  }

  ngOnInit() {
   merge( this.onUrlChanged, this.onHttpMethodChanged, this.onDataChanged, this.onOptionChanged)
        .subscribe(command => {
          console.log(command);
          console.log(this.commands.toString());
             this.commands[command.position] = command.value;
             this.generatedCommand.elementRef.nativeElement.querySelector(".command").innerText = this.commands.toString().replace(/,/g, " ");
            }) 

    
       // .subscribe(method => {this.generatedCommand.elementRef.nativeElement.querySelector(".command").innerText = "curl -X" + method})
  }

  urlChanged(event: KeyboardEvent) {
    this.onUrlChanged.emit({"position": 2, "value": event.target.value});
  }

  httpMethodChanged(event: Event) {
    console.log(event)
    this.onHttpMethodChanged.emit({"position": 1, "value": "-X" +event.value});
  }

  dataChanged(event: Event) {
    console.log(event)
    this.onDataChanged.emit({"position": 3, "value": "-d '" +event.target.value +"'"});
  }

  commandChanged(event: MatCheckboxChange) {
    console.log(event)
    if (event.checked) {
     this.onOptionChanged.emit({"position": 4, "value": event.source.name });
    }
  }
}
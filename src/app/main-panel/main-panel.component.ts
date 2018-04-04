import { Component, OnInit, EventEmitter, ViewChild} from '@angular/core';
import { GeneratedCommandComponent }  from '../generated-command/generated-command.component';
import { concat } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import * as commandConfig from "./commands.json";

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css'],
})
export class MainPanelComponent implements OnInit {

  onUrlChanged = new EventEmitter<object>();
  onHttpMethodChanged = new EventEmitter<object>();
  onHttpDataChanged = new EventEmitter<object>();
  commands = ["curl"];

  @ViewChild(GeneratedCommandComponent)
  private generatedCommand: GeneratedCommandComponent;

  constructor() { 
    console.log(commandConfig);
  }

  ngOnInit() {
   merge( this.onUrlChanged, this.onHttpMethodChanged)
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
}
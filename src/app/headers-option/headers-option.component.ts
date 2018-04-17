import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter} from '@angular/core';
import * as headers from "./headers.json";
import { CommandConfig } from '../main-panel/command-config';
import { MatSelect, MatInput } from '@angular/material';
import { OptionCommandConfig } from '../main-panel/option-command-config';
import { OptionOperation } from '../main-panel/option-config';

@Component({
  selector: 'app-headers-option',
  templateUrl: './headers-option.component.html',
  styleUrls: ['./headers-option.component.css']
})
export class HeadersOptionComponent implements OnInit {
  headersList = headers;

  @Output()
  headerChangedEmitter: EventEmitter<object> = new EventEmitter<object>();

  @ViewChild(MatSelect)
  headerListSelect: MatSelect;

  @ViewChild(MatInput)
  headerValueInput: MatInput;

  index: number;

  constructor() { }

  ngOnInit() {
  }

  headerTypeChanged(event: Event) {
    this.headerChangedEmitter.emit(new CommandConfig(4, "-H '"+this.headerListSelect.value+":"+this.headerValueInput.value+"'", true, new OptionCommandConfig("-H", this.index.toString(), OptionOperation.MODIFY), true));
  }

  headerValueChanged(event: Event) {
    this.headerChangedEmitter.emit(new CommandConfig(4, "-H '"+this.headerListSelect.value+":"+this.headerValueInput.value+"'", true, new OptionCommandConfig("-H", this.index.toString(), OptionOperation.MODIFY), true));
  }
}
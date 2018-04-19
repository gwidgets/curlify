import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { HeadersOptionComponent } from '../headers-option/headers-option.component';
import {Observable} from 'rxjs';
import { CommandConfig } from '../main-panel/command-config';
import { OptionCommandConfig } from '../main-panel/option-command-config';
import { OptionOperation } from '../main-panel/option-config';
import { truncate } from 'fs';

@Component({
  selector: 'app-headers-option-container',
  templateUrl: './headers-option-container.component.html',
  styleUrls: ['./headers-option-container.component.css']
})
export class HeadersOptionContainerComponent implements OnInit {

  @ViewChild("headersListElement")
  headerListElement: ElementRef;

  private headersComponents = [];

  @Output()
  childrenHeadersChanged = new EventEmitter<object>();

  @ViewChild('dynamicHeadersList', { read: ViewContainerRef }) dynamicHeadersList: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {}

  addHeaderClicked(event: Event) {
   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HeadersOptionComponent);
   const headersOptionNewElement = <HeadersOptionComponent>this.dynamicHeadersList.createComponent(componentFactory).instance;
   headersOptionNewElement.index = this.dynamicHeadersList.length - 1;
   this.headersComponents.push(headersOptionNewElement);
   headersOptionNewElement.headerChangedEmitter.subscribe((headerCommand) => {
    this.childrenHeadersChanged.emit(headerCommand);
  });

  this.childrenHeadersChanged.emit(new CommandConfig(4, "-H '"+headersOptionNewElement.headersList[0]+":"+headersOptionNewElement.headerValueInput.placeholder+"'", true, new OptionCommandConfig("-H", headersOptionNewElement.index.toString(), OptionOperation.TAIL), true));

  }

  removeHeaderClicked(event: Event) {
    if (this.dynamicHeadersList.length > 0) {
      let toBeDeleted =  this.headersComponents.pop()
      this.childrenHeadersChanged.emit(new CommandConfig(4, toBeDeleted.headerListSelect.value, true, new OptionCommandConfig("-H", toBeDeleted.index.toString(), OptionOperation.REMOVE), true));
      this.dynamicHeadersList.remove(this.dynamicHeadersList.length - 1);
    }
  }
}
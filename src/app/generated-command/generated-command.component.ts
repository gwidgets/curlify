import {Component, OnInit, ElementRef, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-generated-command',
  templateUrl: './generated-command.component.html',
  styleUrls: ['./generated-command.component.css']
})
export class GeneratedCommandComponent implements OnInit {

  constructor(public elementRef: ElementRef) { }

  ngOnInit() {
     
  }
}
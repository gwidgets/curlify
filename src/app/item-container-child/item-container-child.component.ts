import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-container-child',
  templateUrl: './item-container-child.component.html',
  styleUrls: ['./item-container-child.component.css']
})
export class ItemContainerChildComponent implements OnInit {

 
  
  constructor() { }

  ngOnInit() {

  }

  onChangeUrl(event: any) {
    console.log("test");
  }
}
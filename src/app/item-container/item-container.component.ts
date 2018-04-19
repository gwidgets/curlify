import { Component, OnInit, Input, ElementRef} from '@angular/core';

@Component({
  selector: 'app-item-container',
  templateUrl: './item-container.component.html',
  styleUrls: ['./item-container.component.css']
})
export class ItemContainerComponent implements OnInit {

  
  public isContentCentered: boolean; 

  @Input()
  centerContent: String; 
  

   elementWrapper: ElementRef;

  constructor(private elementRef: ElementRef) { 
    this.elementWrapper = elementRef;
    
  }

  ngOnInit() {
    this.isContentCentered = (this.centerContent === "" ? true: false);

  }

  ngAfterViewInit() {
    if (this.isContentCentered) {
      let innerContainer = this.elementWrapper.nativeElement.querySelector(".form-container");
      innerContainer.style.justifyContent = "center";
    }
  }
}
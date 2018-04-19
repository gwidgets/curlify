import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemContainerChildComponent } from './item-container-child.component';
import { DebugElement } from '@angular/core';

describe('ItemContainerChildComponent', () => {
  let component: ItemContainerChildComponent;
  let fixture: ComponentFixture<ItemContainerChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemContainerChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemContainerChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the item-container-child component', () => {
    expect(component).toBeTruthy();
    const containerDiv = fixture.debugElement.nativeElement.querySelector(".container-item-child")
    expect(containerDiv !== null ).toBe(true);
  });
});

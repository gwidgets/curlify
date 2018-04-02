import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemContainerChildComponent } from './item-container-child.component';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

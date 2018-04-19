import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemContainerComponent } from './item-container.component';

describe('ItemContainerComponent', () => {
  let component: ItemContainerComponent;
  let fixture: ComponentFixture<ItemContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemContainerComponent);
    component = fixture.componentInstance;
    component.centerContent = "";
    fixture.detectChanges();
  });

  it('should create the item-container component', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector(".form-container") !== null).toBe(true);
    expect(fixture.nativeElement.querySelector(".container-item") !== null).toBe(true);
  });

  it('should center content if isContentCentered attribute is set', () => {
    const container = fixture.nativeElement.querySelector(".form-container");
    expect(container.style.justifyContent).toEqual("center");
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersOptionContainerComponent } from './headers-option-container.component';
import { AppModule } from '../app.module';

describe('HeadersOptionContainerComponent', () => {
  let component: HeadersOptionContainerComponent;
  let fixture: ComponentFixture<HeadersOptionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadersOptionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the headers-option-container component', () => {
    expect(component).toBeTruthy();
    const nativeElement = fixture.debugElement.nativeElement;
    const buttons = nativeElement.querySelectorAll("button");
    expect(buttons.length).toEqual(2);
    expect(buttons[0].innerText).toEqual("+");
    expect(buttons[1].innerText).toEqual("-");
    const unorderedListElemet = nativeElement.querySelector("ul") 
    expect(unorderedListElemet !== null ).toBe(true)
  });

  it('clicking on + button adds a new headers-option component to the list', () => {
    const nativeElement = fixture.debugElement.nativeElement;
    const buttons = nativeElement.querySelectorAll("button");
    const plusButton = buttons[0];
    plusButton.click();
    fixture.detectChanges();
    expect(component.dynamicHeadersList.length).toEqual(1)
  });

  it('clicking on - button removes the last headers-option component from the list', () => {
    const nativeElement = fixture.debugElement.nativeElement;
    const buttons = nativeElement.querySelectorAll("button");
    const plusButton = buttons[0];
    const minusButton = buttons[1];
    plusButton.click();
    plusButton.click();
    minusButton.click();
    fixture.detectChanges();
   expect(component.dynamicHeadersList.length).toEqual(1)
  });

  it('clicking on + calls addHeaderClicked and invokes the childrenHeadersChanged EventEmitter ', () => {
    spyOn(component, "addHeaderClicked")
    const nativeElement = fixture.debugElement.nativeElement;
    const buttons = nativeElement.querySelectorAll("button");
    const plusButton = buttons[0];
    plusButton.click();
    fixture.detectChanges();
    expect(component.addHeaderClicked).toHaveBeenCalled()
  });

  it('clicking on - button calls removeHeaderClicked and invokes the childrenHeadersChanged EventEmitter', () => {
    spyOn(component, "removeHeaderClicked")
    const nativeElement = fixture.debugElement.nativeElement;
    const buttons = nativeElement.querySelectorAll("button");
    const plusButton = buttons[0];
    const minusButton = buttons[1];
    plusButton.click();
    minusButton.click();
    fixture.detectChanges();
    expect(component.removeHeaderClicked).toHaveBeenCalled()
  });
});

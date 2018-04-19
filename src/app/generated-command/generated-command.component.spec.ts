import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedCommandComponent } from './generated-command.component';

describe('GeneratedCommandComponent', () => {
  let component: GeneratedCommandComponent;
  let fixture: ComponentFixture<GeneratedCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the generated-command component', () => {
    expect(component).toBeTruthy();
    const nativeElement = fixture.nativeElement;
    expect(nativeElement.querySelector(".command") !== null).toBe(true);
    expect(nativeElement.querySelector(".bash") !== null).toBe(true);
    const commandSpan = nativeElement.querySelector(".command-text");
    expect(commandSpan !== null).toBe(true);
    expect(commandSpan.innerText).toEqual(component.command);
    expect(nativeElement.querySelector(".blinking-cursor") !== null).toBe(true);
  });

  it('calling updateCommand updates the command text ', () => {
    const newCommand = "someCommand";
    component.updateCommand(newCommand);
    fixture.detectChanges();
    const nativeElement = fixture.nativeElement;
    const commandSpan = nativeElement.querySelector(".command-text");
    expect(commandSpan.innerText).toEqual(newCommand)
  });
});

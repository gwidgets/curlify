import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderPanelComponent } from './header-panel/header-panel.component';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatOptionModule, MatIconModule, MatSnackBar } from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import { MainPanelComponent } from './main-panel/main-panel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ItemContainerComponent } from './item-container/item-container.component';
import { ItemContainerChildComponent } from './item-container-child/item-container-child.component';
import { GeneratedCommandComponent } from './generated-command/generated-command.component';
import { OptionSelectComponent } from './option-select/option-select.component';
import {MatRadioModule} from '@angular/material/radio';
import { HeadersOptionComponent } from './headers-option/headers-option.component';
import { HeadersOptionContainerComponent } from './headers-option-container/headers-option-container.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderPanelComponent,
        MainPanelComponent,
        ItemContainerComponent,
        ItemContainerChildComponent,
        GeneratedCommandComponent,
        OptionSelectComponent,
        HeadersOptionComponent,
        HeadersOptionContainerComponent
      ],
      imports: [
        MatButtonModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatExpansionModule,
        MatRadioModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should have two child components: app-header-panel, app-main-panel ', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-header-panel')).toBeDefined();
    expect(compiled.querySelector('app-main-panel')).toBeDefined();
  }));
});

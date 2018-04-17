import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";


import { AppComponent } from './app.component';
import { HeaderPanelComponent } from './header-panel/header-panel.component';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatOptionModule, MatIconModule } from '@angular/material';
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


@NgModule({
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
    BrowserModule,
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
    BrowserAnimationsModule
  ],
  entryComponents: [HeadersOptionComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

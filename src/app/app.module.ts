import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderPanelComponent } from './header-panel/header-panel.component';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatOptionModule, MatIconModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MainPanelComponent } from './main-panel/main-panel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ItemContainerComponent } from './item-container/item-container.component';
import { ItemContainerChildComponent } from './item-container-child/item-container-child.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderPanelComponent,
    MainPanelComponent,
    ItemContainerComponent,
    ItemContainerChildComponent,
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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

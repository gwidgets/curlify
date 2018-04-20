import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getGeneratedCommand() {
    return element(by.css(".command-text")).getText();
  }

  getUrlInput() {
    return element(by.css("#leftContainer > div > div > app-item-container-child:nth-child(1) > div > mat-form-field > div > div.mat-input-flex.mat-form-field-flex > div > input"));
  }

  getHttpMethodSelect() {
    return element(by.css("#httpMethodSelect"));
  }

  getDataTextArea() {
    return element(by.css("textarea"));
  }

  getBasicOptionExpansionPanel() {
    return element(by.css("#optionsContainer > div > div > app-item-container-child:nth-child(5) > div > mat-accordion > mat-expansion-panel"));
  }

  getBasicOptionCheckBox() {
    return this.getBasicOptionExpansionPanel().element(by.css("div > div > app-option-select > mat-checkbox > label > span"));
  }

  getConfigOptionExpansionPanel() {
    return element(by.css("#optionsContainer > div > div > app-item-container-child:nth-child(14) > div > mat-accordion > mat-expansion-panel"));
  }

  getHeadersExpansionPanel() {
    return element(by.css("#optionsContainer > div > div > app-item-container-child:nth-child(1) > div > mat-accordion > mat-expansion-panel"));
  }

  getHeadersAddButton() {
    return this.getHeadersExpansionPanel().element(by.css("div > div > app-headers-option-container > button:nth-child(1)"));
  }

  getHeadersTypeSelect() {
    return this.getHeadersExpansionPanel().element(by.css("div > div > app-headers-option-container > ul > app-headers-option:nth-child(1) > li > table > tbody > tr > td:nth-child(1) > mat-form-field > div > div.mat-input-flex.mat-form-field-flex"));
  }

  getHeadersValueInput() {
   return this.getHeadersExpansionPanel().element(by.css("div > div > app-headers-option-container > ul > app-headers-option > li > table > tbody > tr > td:nth-child(2) > mat-form-field > div > div.mat-input-flex.mat-form-field-flex > div > input"))
  }

  getDataTypeAsciiRadioButton() {
    return element(by.css("#leftContainer > div > div > app-item-container-child:nth-child(4) > div > mat-radio-group > mat-radio-button:nth-child(2) > label > div.mat-radio-container"));
  }
}

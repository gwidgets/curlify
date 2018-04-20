import { AppPage } from './app.po';
import { browser, element, by, Key } from 'protractor';

describe('Curlify app command generation', () => {
  let page: AppPage;
  const curl = "curl";
  const randomJsonData = '{"dummy":"dummy"}';
  const commandUrl = "www.g-widgets.com";
  const commandMethod = "-XGET";
  const commandDataOption = "--data"
  const basicAuthOption = "--basic";
  const configFileOption = "--config";
  const headerOption = "-H";
  const configFileRandomValue = "/path/to/file";
  const headerRandomValue = "testValue";


  beforeEach(() => {
    page = new AppPage();
  });

  it('correct command is generated after interactions', () => {
    page.navigateTo();

    const urlInput =  page.getUrlInput();
    urlInput.click();
    urlInput.sendKeys(commandUrl);
    const httpMethodSelect =  page.getHttpMethodSelect();
    httpMethodSelect.click();
    const getMethodOption =  element(by.css('mat-option[value="GET"]'))
    getMethodOption.click();
    const dataField = page.getDataTextArea();
    dataField.click().then((field) => dataField.sendKeys(randomJsonData))
           /*  "curl -XGET www.g-widgets.com --data '{\"dummy\":\"dummy\"}'*/
    expect(page.getGeneratedCommand()).toEqual(
        curl.concat(" ")
        .concat(commandMethod)
        .concat(" ")
        .concat(commandUrl)
        .concat(" ")
        .concat(commandDataOption)
        .concat(" ")
        .concat("'"+randomJsonData+"'")
      );

    /*****  add option without argument *******************/

    const basicAuthOptionExpansionPanel = page.getBasicOptionExpansionPanel();
    basicAuthOptionExpansionPanel.click();
    const basicOptionCheckBox = page.getBasicOptionCheckBox();
    basicOptionCheckBox.click();
       /*  "curl -XGET www.g-widgets.com --data '{\"dummy\":\"dummy\"}' --basic */
    expect(page.getGeneratedCommand()).toEqual(
      curl.concat(" ")
      .concat(commandMethod)
      .concat(" ")
      .concat(commandUrl)
      .concat(" ")
      .concat(commandDataOption)
      .concat(" ")
      .concat("'"+randomJsonData+"'")
      .concat(" ")
      .concat(basicAuthOption)
    );
    /*****  add option with argument *******************/

    const configOptionExpansionPanel = page.getConfigOptionExpansionPanel();
    configOptionExpansionPanel.click();
    const configOptionCheckBox = configOptionExpansionPanel.element(by.css("div > div > app-option-select > mat-checkbox > label > span"));
    configOptionCheckBox.click();
    const configArgumentInput = configOptionExpansionPanel.element(by.css("div > div > app-option-select > mat-form-field > div > div.mat-input-flex.mat-form-field-flex > div > input"));
    configArgumentInput.sendKeys(configFileRandomValue)

   /*  "curl -XGET www.g-widgets.com --data '{\"dummy\":\"dummy\"}' --basic --config '/path/to/file'" */

    expect(page.getGeneratedCommand()).toEqual(
      curl.concat(" ")
      .concat(commandMethod)
      .concat(" ")
      .concat(commandUrl)
      .concat(" ")
      .concat(commandDataOption)
      .concat(" ")
      .concat("'"+randomJsonData+"'")
      .concat(" ")
      .concat(basicAuthOption)
      .concat(" ")
      .concat(configFileOption)
      .concat(" ")
      .concat("'" + configFileRandomValue + "'")
    );

    /*****  add headers *******************/



    const headersExpansionPanel = page.getHeadersExpansionPanel();
    headersExpansionPanel.click();
    const headersAddButton = page.getHeadersAddButton();
    headersAddButton.click();
    const headerTypeSelect = page.getHeadersTypeSelect();
    headerTypeSelect.click();
    const matOptionHeaderAccept =  element(by.cssContainingText('.mat-option-text', 'Accept'))
    matOptionHeaderAccept.click();
    const headerValueInput = page.getHeadersValueInput();
    headerValueInput.sendKeys(headerRandomValue);

    /* "curl -XGET www.g-widgets.com --data '{\"dummy\":\"dummy\"}' -H 'Accept:testValue' --basic --config '/path/to/file'" */
    expect(page.getGeneratedCommand()).toEqual("curl -XGET www.g-widgets.com --data '{\"dummy\":\"dummy\"}' -H 'Accept:testValue' --basic --config '/path/to/file'");

    expect(page.getGeneratedCommand()).toEqual(
      curl.concat(" ")
      .concat(commandMethod)
      .concat(" ")
      .concat(commandUrl)
      .concat(" ")
      .concat(commandDataOption)
      .concat(" ")
      .concat("'"+randomJsonData+"'")
      .concat(" ")
      .concat(headerOption)
      .concat(" ")
      .concat("'Accept:"+headerRandomValue+"'")
      .concat(" ")
      .concat(basicAuthOption)
      .concat(" ")
      .concat(configFileOption)
      .concat(" ")
      .concat("'" + configFileRandomValue + "'")
    );

     /*****  remove basic option *******************/
     basicOptionCheckBox.click();
     /*"curl -XGET www.g-widgets.com --data '{\"dummy\":\"dummy\"}' -H 'Accept:testValue' --config '/path/to/file'" */
     expect(page.getGeneratedCommand()).toEqual(
      curl
      .concat(" ")
      .concat(commandMethod)
      .concat(" ")
      .concat(commandUrl)
      .concat(" ")
      .concat(commandDataOption)
      .concat(" ")
      .concat("'"+randomJsonData+"'")
      .concat(" ")
      .concat(headerOption)
      .concat(" ")
      .concat("'Accept:"+headerRandomValue+"'")
      .concat(" ")
      .concat(configFileOption)
      .concat(" ")
      .concat("'" + configFileRandomValue + "'")
    );

    /*****  modify config value *******************/
    const newRandomPath = "/new/path/to/file";
    configArgumentInput.clear().then((result) => configArgumentInput.sendKeys(newRandomPath))
    /* "curl -XGET www.g-widgets.com --data '{\"dummy\":\"dummy\"}' -H 'Accept:testValue' --config '/new/path/to/file'" */
    expect(page.getGeneratedCommand()).toEqual(
      curl
      .concat(" ")
      .concat(commandMethod)
      .concat(" ")
      .concat(commandUrl)
      .concat(" ")
      .concat(commandDataOption)
      .concat(" ")
      .concat("'"+randomJsonData+"'")
      .concat(" ")
      .concat(headerOption)
      .concat(" ")
      .concat("'Accept:"+headerRandomValue+"'")
      .concat(" ")
      .concat(configFileOption)
      .concat(" ")
      .concat("'" + newRandomPath + "'")
    );

    /*****  modify data type *******************/
    const commandDataOptionAscii = "--data-ascii";
    const dataAsciiDataTypeRadioButton = page.getDataTypeAsciiRadioButton();
    dataAsciiDataTypeRadioButton.click();
   /*  "curl -XGET www.g-widgets.com --data-ascii '{\"dummy\":\"dummy\"}' -H 'Accept:testValue' --config '/new/path/to/file'" */

    expect(page.getGeneratedCommand()).toEqual(
      curl
      .concat(" ")
      .concat(commandMethod)
      .concat(" ")
      .concat(commandUrl)
      .concat(" ")
      .concat(commandDataOptionAscii)
      .concat(" ")
      .concat("'"+randomJsonData+"'")
      .concat(" ")
      .concat(headerOption)
      .concat(" ")
      .concat("'Accept:"+headerRandomValue+"'")
      .concat(" ")
      .concat(configFileOption)
      .concat(" ")
      .concat("'" + newRandomPath + "'")
    );
  });
});

import { OptionCommandConfig } from './option-command-config';

export class CommandConfig  {

    public position: number;
    public value: string;
    public isOption: boolean;
    public optionConfig: OptionCommandConfig;
  
    constructor(position: number, value: string, isOption: boolean = false, optionConfig: OptionCommandConfig = null) {
        this.position = position;
        this.value = value; 
        this.isOption = isOption;
        this.optionConfig = optionConfig;
    }

  }
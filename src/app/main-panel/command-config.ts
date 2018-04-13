import { OptionCommandConfig } from './option-command-config';

export class CommandConfig  {

    public position: number;
    public value: string;
    public isOptionalCommand: boolean;
    public optionConfig: OptionCommandConfig;
  
    constructor(position: number, value: string, isOptionalCommand: boolean = false, optionConfig: OptionCommandConfig = null) {
        this.position = position;
        this.value = value; 
        this.isOptionalCommand = isOptionalCommand;
        this.optionConfig = optionConfig;
    }
  }
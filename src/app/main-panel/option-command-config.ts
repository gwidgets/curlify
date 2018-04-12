import { OptionOperation } from './option-config';

export class OptionCommandConfig  {

    public name: string;
    public argumentValue: string;
    public optionOperation: OptionOperation;

  
    constructor(name: string, argumentValue: string, optionOperation: OptionOperation = OptionOperation.TAIL) {
        this.name = name;
        this.argumentValue = argumentValue; 
        this.optionOperation = optionOperation;
    }
  }


import { OptionOperation } from './option-config';

export class OptionCommandConfig  {

    public name: string;
    public argumentValue: string;
    public optionOperation: OptionOperation;
    public hasArgument: boolean;

  
    constructor(name: string, argumentValue: string, optionOperation: OptionOperation = OptionOperation.TAIL, hasArgument: boolean = false) {
        this.name = name;
        this.argumentValue = argumentValue; 
        this.optionOperation = optionOperation;
        this.hasArgument = hasArgument;
    }
  }


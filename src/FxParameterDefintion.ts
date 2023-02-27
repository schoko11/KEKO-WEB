export class FxParameterDefinitions  {
    name: string;
    id: number;
    min: string[] = []; //value for display
    max: string[] = []; //value for display
    steps: string[] = [];
    minVal: string[] = []; //value message 
    maxVal: string[] = [];
    constructor (fxName: string) {
        this.name = fxName;
        if (this.name === "Wah Wah") { 
            this.min.push("0");     this.max.push("0");    this.steps.push("10");    this.minVal.push("0");    this.maxVal.push("10"); 
        }
        if (this.name === "Wah Low Pass") { 
            this.min.push("0");     this.max.push("0");    this.steps.push("10");    this.minVal.push("0");    this.maxVal.push("10"); 
        }
        
    }
}
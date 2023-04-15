
//mainly for setting the html tags
export class FxParameterDescription {
    fxParameter: string;
    //fxName: string[]; //in which fx is this parameter used 
    min: string;
    max: string;
    step: string;
    log: number;
    defvalue: string;
    value: string;

    constructor(parameter: string, containingFx: string) {
        this.min = "";
        this.max = "";
        this.step = "";
        this.log = 0;
        this.defvalue = "";
        this.value = "";
        this.fxParameter = "";
        //this.fxName = [];
    }

};
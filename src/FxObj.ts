
class FxObj {
    name: string;

    //parameterNamesPerFx: ; 
    fxParameter: FxParameterDescription;
    constructor (fxName: string) {
        this.name = fxName;
        this.fxParameter = new FxParameterDescription("",fxName);
    }
}
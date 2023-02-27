import { FxParameterDefinitions } from "./FxParameterDefintion";
import { FxParameterIds } from "./FxParameterIds";
import { FxParameterNames } from "./FxParameterNames";


export class FxObj {
    name: string;

    //parameterNamesPerFx: ; 
    fxParameterNames: FxParameterNames;
    //fxIds: typeof FxParameterIds[] = [];
    fxIds: FxParameterIds;
    fxDefintions: FxParameterDefinitions;
    //fxIds: number[] = [];
    constructor (fxName: string) {
        this.name = fxName;
        //let tempVal: number[] = [];
        //let fxPar = new FxParameterNames();
        this.fxParameterNames = new FxParameterNames(fxName);
        this.fxIds = new FxParameterIds(fxName)
        this.fxDefintions = new FxParameterDefinitions(fxName);
    }
}
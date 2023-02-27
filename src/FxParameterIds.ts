export class FxParameterIds {
    //"Wah Wah": [8,9,10,52,12,4,53,6]
    name: string;
    values: number[];
    constructor (fxName: string) {
        this.name = fxName;
        if (this.name === "Wah Wah") { this.values = [8,9,10,52,12,4,53,6]; }
        if (this.name === "Wah Low Pass") { this.values = [8,9,10,52,12,4,53,13,14,15,6] }
    }
}
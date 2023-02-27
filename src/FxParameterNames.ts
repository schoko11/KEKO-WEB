export class FxParameterNames  {
    name: string;
    values: string[];
    constructor (fxName: string) {
        this.name = fxName;
        if (this.name === "Wah Wah") { this.values = ["Manual","Peak","Pedal Range","Peak Range","Pedal Mode","Mix","Ducking","Volume"]; }
        if (this.name === "Wah Low Pass") { this.values = ["Manual", "Peak", "Pedal Range", "Peak Range","Pedal Mode" , "Mix", "Ducking","Touch Attack","Touch Release","Touch Boost", "Volume"]; } 
        
    }
}
import { prototype } from "events";
import { FxParameterDefinitions } from "./FxParameterDefintion";
import { FxParameterIds } from "./FxParameterIds";
import { FxParameterNames } from "./FxParameterNames";


//const makeMap = <V = unknown>(obj:  Record<string, V>) => 
//  new Map<string, V>(Object.entries(obj))

//let arrayOfFxMaps: Array<Map<string, Object>> = [];
let arrayOfFxObj: Array<Object> = [];

const fxKeyNames = ["step","min","max","label","textRepl","nameOfFx","nameOfFxId","multiReqPos","singleReqPos","adressPage"];

export const defFxObj = {
    [fxKeyNames[0]] : ["0"],     //step
    [fxKeyNames[1]]: ["0"],      //min
    [fxKeyNames[2]]: ["0"],      //max 
    [fxKeyNames[3]]: [""],       //label
    [fxKeyNames[4]]: [[""]],     //textRepl  
    [fxKeyNames[5]]: "",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [0],        //multiReqPos
    [fxKeyNames[8]]: [0],        //singleReqPos 
    [fxKeyNames[9]]: [0]         //adressPage
} 


//rig settings adr. page 0x4
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0"],    //step
    [fxKeyNames[1]]: ["0"],     //min
    [fxKeyNames[2]]: ["0"],    //max 
    [fxKeyNames[3]]: [""],    //label
    [fxKeyNames[4]]: [[""]],    //textRepl  
    [fxKeyNames[5]]: "Rig",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [0],       //multiReqPos
    [fxKeyNames[8]]: [0],       //singleReqPos 
    [fxKeyNames[9]]: [0]        //adressPage
    }
);

//input adr. page 0x9
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0"],    //step
    [fxKeyNames[1]]: ["0"],     //min
    [fxKeyNames[2]]: ["0"],    //max 
    [fxKeyNames[3]]: [""],    //label
    [fxKeyNames[4]]: [[""]],    //textRepl  
    [fxKeyNames[5]]: "Input",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [0],       //multiReqPos
    [fxKeyNames[8]]: [0],       //singleReqPos 
    [fxKeyNames[9]]: [0]        //adressPage
    }
);

//amplifier adr. page 0x0A
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1"],    //step
    [fxKeyNames[1]]: ["0"],     //min
    [fxKeyNames[2]]: ["10"],    //max 
    [fxKeyNames[3]]: ["knobGain"],    //label
    [fxKeyNames[4]]: [[""]],    //textRepl  
    [fxKeyNames[5]]: "Amplifier",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [18],       //multiReqPos
    [fxKeyNames[8]]: [4],       //singleReqPos 
    [fxKeyNames[9]]: [10]        //adressPage
    }
);

//Equalizer adr. page 0x0B
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1"],    //step
    [fxKeyNames[1]]: ["-5","-5","-5","-5"],     //min
    [fxKeyNames[2]]: ["5","5","5","5","5"],    //max 
    [fxKeyNames[3]]: ["knobBass","knobMids","knobTrebble","knobPresence"],    //label
    [fxKeyNames[4]]: [[""],[""],[""],[""]],    //textRepl  
    [fxKeyNames[5]]: "Equalizer",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [18,20,22,24],       //multiReqPos
    [fxKeyNames[8]]: [4,5,6,7],       //singleReqPos 
    [fxKeyNames[9]]: [11,11,11,11]        //adressPage
    }
);

//Cabinet adr. page 0x0C
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0"],    //step
    [fxKeyNames[1]]: ["0"],     //min
    [fxKeyNames[2]]: ["0"],    //max 
    [fxKeyNames[3]]: [""],    //label
    [fxKeyNames[4]]: [[""]],    //textRepl  
    [fxKeyNames[5]]: "Cabinet",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [0],       //multiReqPos
    [fxKeyNames[8]]: [0],       //singleReqPos 
    [fxKeyNames[9]]: [0]        //adressPage
    }
);

//User scales adr. page 0x76
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0"],    //step
    [fxKeyNames[1]]: ["0"],     //min
    [fxKeyNames[2]]: ["0"],    //max 
    [fxKeyNames[3]]: [""],    //label
    [fxKeyNames[4]]: [[""]],    //textRepl  
    [fxKeyNames[5]]: "Userscales",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [0],       //multiReqPos
    [fxKeyNames[8]]: [0],       //singleReqPos 
    [fxKeyNames[9]]: [0]        //adressPage
    }
);

//Clooper and fx module freeze adr. page 0x7D
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0"],    //step
    [fxKeyNames[1]]: ["0"],     //min
    [fxKeyNames[2]]: ["0"],    //max 
    [fxKeyNames[3]]: [""],    //label
    [fxKeyNames[4]]: [[""]],    //textRepl  
    [fxKeyNames[5]]: "LooperAndFxFreeze",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [0],       //multiReqPos
    [fxKeyNames[8]]: [0],       //singleReqPos 
    [fxKeyNames[9]]: [0]        //adressPage
    }
);

//System global adr. page 0x7F
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0"],    //step
    [fxKeyNames[1]]: ["0"],     //min
    [fxKeyNames[2]]: ["0"],    //max 
    [fxKeyNames[3]]: [""],    //label
    [fxKeyNames[4]]: [[""]],    //textRepl  
    [fxKeyNames[5]]: "Global",    //nameOfFx
    [fxKeyNames[6]]: [0],       //nameofFxId
    [fxKeyNames[7]]: [0],       //multiReqPos
    [fxKeyNames[8]]: [0],       //singleReqPos 
    [fxKeyNames[9]]: [0]        //adressPage
    }
);

//let fx2 = {
//    "step": ["0.1"],
//    "min": ["0"],
//    "max": ["10"],
//    "label": ["Threshold"],
//    "textRepl": [[""]],
//    "nameOfFx": "Noise Gate 2:1",
//    "nameOfFxId": ["0","37"],
//    "multiReqPos": [46]
// }


//off fx
arrayOfFxObj.push(  defFxObj );

//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking",     "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""]],
    [fxKeyNames[5]]: "Wah Wah",
    [fxKeyNames[6]]: [0,1],
    [fxKeyNames[7]]: [26,28,30,114, 34 ,18,  116,  22],
    [fxKeyNames[8]]: [8,9,10,52,12,4,53,6],
    [fxKeyNames[9]]: [0]
    }
);

//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","0","0","0","0"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","10","10","10","10"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking", "Touch Attack","Touch Release","Touch Boost",     "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Wah Low Pass",
    [fxKeyNames[6]]: [0,2],
    [fxKeyNames[7]]: [26,28,30,114,  34 ,18,  116,  22,11,11,11],
    [fxKeyNames[8]]: [0],
    [fxKeyNames[9]]: [0]
    }
);

//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","0","0","0","0"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","10","10","10","10"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking", "Touch Attack","Touch Release","Touch Boost",     "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Wah High Pass",
    [fxKeyNames[6]]: [0,3],
    [fxKeyNames[7]]: [26,28,30,114,  ,34 ,18,  116,  22,11,11,11],
    [fxKeyNames[8]]: [0],
    [fxKeyNames[9]]: [0]
    }
);

//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","0","0","0","0"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","10","10","10","10"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking","Touch Attack","Touch Release","Touch Boost", "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Wah Vowel Filter",
    [fxKeyNames[6]]: [0,4],
    [fxKeyNames[7]]: [26,28,30,114,  ,34 ,18,  116,  22,11,11,11],
    [fxKeyNames[8]]: [0],
    [fxKeyNames[9]]: [0]
    }
);

//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1","0.1","0.1","0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","0","0","0","0","0","0","0"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","10","10","10","10","10","10","10"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Spread","Stages","Pedal Mode", "Mix", "Ducking", "Touch Attack","Touch Release","Touch Boost", "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""],[""],[""],[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Wah Phaser",
    [fxKeyNames[6]]: [0,6],
    [fxKeyNames[7]]: [26,28,30,114,  ,34 ,18,  116,  22,11,11,11,11,11,11,11],
    [fxKeyNames[8]]: [0],
    [fxKeyNames[9]]: [0]
    }
);

//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","0","0","0","0"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","10","10","10","10"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking", "Touch Attack","Touch Release","Touch Boost",     "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Wah Flanger",
    [fxKeyNames[6]]: [0,7],
    [fxKeyNames[7]]: [26,28,30,114,  ,34 ,18,  116,  22,11,11,11],
    [fxKeyNames[8]]: [0],
    [fxKeyNames[9]]: [0]
    }
);



//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","0","0","0","0"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","10","10","10","10"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking","Touch Attack","Touch Release","Touch Boost",     "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""],[""], ,[""], ,[""], ],
    [fxKeyNames[5]]: "Wah Rate Reducer",
    [fxKeyNames[6]]: [0,8],
    [fxKeyNames[7]]: [26,28,30,114,  ,34 ,18,  116,  22,11,11,11],
    [fxKeyNames[8]]: [0],
    [fxKeyNames[9]]: [0]
    }
);


arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","0","0"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","10","10"],
    [fxKeyNames[3]]: ["Manual","Pedal Range","Pedal Mode", "Mix", "Ducking","Touch Attack","Touch Release","Touch Boost",     "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],[""],[""],[""],[""],[""]  ],
    [fxKeyNames[5]]: "Wah Ring Modulator",
    [fxKeyNames[6]]: [0,9],
    [fxKeyNames[7]]: [26,28,30,114,  ,34 ,18,  116,  22,11],
    [fxKeyNames[8]]: [0],
    [fxKeyNames[9]]: [0]
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","0","0"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","10","10"],
    [fxKeyNames[3]]: ["Manual","Pedal Range","Pedal Mode", "Mix", "Ducking","Touch Attack","Touch Release","Touch Boost",     "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],[""],[""],[""],[""],[""]  ],
    [fxKeyNames[5]]: "Wah Freq Shifter",
    [fxKeyNames[6]]: [0,10],
    [fxKeyNames[7]]: [26,28,30,114,  ,34 ,18,  116,  22,11],
    [fxKeyNames[8]]: [0],
    [fxKeyNames[9]]: [0]
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","0","0","0"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","10","10","10"],
    [fxKeyNames[3]]: ["Manual","Pedal Range","Pitch Shift","Pedal Mode", "Mix", "Ducking","Touch Attack","Touch Release","Touch Boost","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]  ],
    [fxKeyNames[5]]: "Wah Format Shifter",
    [fxKeyNames[6]]: [0,12],
    [fxKeyNames[7]]: [26,28,30,114,  ,34 ,18,  116,  22,11,22],
    [fxKeyNames[8]]: [0],
    [fxKeyNames[9]]: [0]
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1"],
    [fxKeyNames[1]]: ["0","0","-100"],
    [fxKeyNames[2]]: ["10","10","100"],
    [fxKeyNames[3]]: ["Drive","Tone","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""]],
    [fxKeyNames[5]]: "Bit Shaper",
    [fxKeyNames[6]]: [0,17],
    [fxKeyNames[7]]: [26,28,30],
    [fxKeyNames[8]]: [0],
    [fxKeyNames[9]]: [0]
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1"],
    [fxKeyNames[1]]: ["0","0","-100","-100"],
    [fxKeyNames[2]]: ["10","10","100","100"],
    [fxKeyNames[3]]: ["Drive","Soft","Ducking","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Octa Shaper",
    [fxKeyNames[6]]: [0,18],
    [fxKeyNames[7]]: [26,28,30,114],
    [fxKeyNames[8]]: [0],
    [fxKeyNames[9]]: [1]
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1"],
    [fxKeyNames[1]]: ["0","0"],
    [fxKeyNames[2]]: ["10","10"],
    [fxKeyNames[3]]: ["Drive","Volume"],
    [fxKeyNames[4]]: [[""],[""]],
    [fxKeyNames[5]]: "Soft Shaper",
    [fxKeyNames[6]]: [0,19],
    [fxKeyNames[7]]: [26,28],
    [fxKeyNames[8]]: [0],
    [fxKeyNames[9]]: [1]
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1"],
    [fxKeyNames[1]]: ["0","0"],
    [fxKeyNames[2]]: ["10","10"],
    [fxKeyNames[3]]: ["Drive","Volume"],
    [fxKeyNames[4]]: [[""],[""]],
    [fxKeyNames[5]]: "Hard Shaper",
    [fxKeyNames[6]]: [0,20],
    [fxKeyNames[7]]: [26,28],
    [fxKeyNames[8]]: [0],
    [fxKeyNames[9]]: [1]
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1"],
    [fxKeyNames[1]]: ["0","0"],
    [fxKeyNames[2]]: ["10","10"],
    [fxKeyNames[3]]: ["Drive","Volume"],
    [fxKeyNames[4]]: [[""],[""]],
    [fxKeyNames[5]]: "Wave Shaper",
    [fxKeyNames[6]]: [0,21],
    [fxKeyNames[7]]: [26,28],
    [fxKeyNames[8]]: [0],
    [fxKeyNames[9]]: [1]
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1"],
    [fxKeyNames[1]]: ["0","0","-100"],
    [fxKeyNames[2]]: ["10","10","100"],
    [fxKeyNames[3]]: ["Drive","Tone","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""]  ],
    [fxKeyNames[5]]: "Kemper Drive",
    [fxKeyNames[6]]: [0,32],
    [fxKeyNames[7]]: [26,28,30],
    [fxKeyNames[8]]: [0],
    [fxKeyNames[9]]: [1]
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1"],
    [fxKeyNames[1]]: ["0","0","-100","-100",],
    [fxKeyNames[2]]: ["10","10","100","100"],
    [fxKeyNames[3]]: ["Drive","Tone","Volume","Mix"],
    [fxKeyNames[4]]: [[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Green Scream",
    [fxKeyNames[6]]: [0,33],
    [fxKeyNames[7]]: [26,28,30,114],
    [fxKeyNames[8]]: [0],
    [fxKeyNames[9]]: [1]
    }
);


export {arrayOfFxObj};

//arrayOfFxMaps.push("fes",temp);





//export class FxObj {
//    name: string;

    //parameterNamesPerFx: ; 
//    fxParameterNames: FxParameterNames;
    //fxIds: typeof FxParameterIds[] = [];
//    fxIds: FxParameterIds;
//    fxDefintions: FxParameterDefinitions;
    //fxIds: number[] = [];
//    constructor (fxName: string) {
//        this.name = fxName;
        //let tempVal: number[] = [];
        //let fxPar = new FxParameterNames();
//        this.fxParameterNames = new FxParameterNames(fxName);
//        this.fxIds = new FxParameterIds(fxName)
//        this.fxDefintions = new FxParameterDefinitions(fxName);
//    }
//}
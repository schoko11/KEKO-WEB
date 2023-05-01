import { prototype } from "events";

//const makeMap = <V = unknown>(obj:  Record<string, V>) => 
//  new Map<string, V>(Object.entries(obj))

//let arrayOfFxMaps: Array<Map<string, Object>> = [];

//-33			   450
//-30			   466
//-27			   490
//-24			   554
//-21			   804
//-18			  1086		0,125
//-15			  1518		0,178		
//-12			  2167		0,25
//-9			  3048		0,355
//-6			  4328		0,5
//-3			  6198		0,708
//0 db            8128		1
//1 db            8779      1.122
//2 db            9430      1.259
//+3db           10117		1.412   //wurzel 2
//4db            10795      1.585
//+6 db          12161		2
//+9 db          14097		2,82
//+12 db at      16256		4


//20 x log(IN/8128) = volume <=0 0db



let arrayOfFxObj: Array<Object> = [];

const fxKeyNames = ["step","min","max","label","textRepl","nameOfFx","nameOfFxId","multiReqPos","singleReqPos","adressPage","addValue"];


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
    [fxKeyNames[9]]: [0],         //adressPage
    [fxKeyNames[10]]: [""]         //addValue
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
    [fxKeyNames[9]]: [0],        //adressPage
    [fxKeyNames[10]]: [""]         //addValue
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
    [fxKeyNames[9]]: [0],        //adressPage
    [fxKeyNames[10]]: [""]         //addValue
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
    [fxKeyNames[9]]: [10],        //adressPage
    [fxKeyNames[10]]: [""]         //addValue
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
    [fxKeyNames[9]]: [11,11,11,11],        //adressPage
    [fxKeyNames[10]]: ["","","",""]         //addValue
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
    [fxKeyNames[9]]: [0],        //adressPage
    [fxKeyNames[10]]: [""]         //addValue
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
    [fxKeyNames[9]]: [0],        //adressPage
    [fxKeyNames[10]]: [""]         //addValue
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
    [fxKeyNames[9]]: [0],        //adressPage
    [fxKeyNames[10]]: [""]         //addValue
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
    [fxKeyNames[9]]: [0],        //adressPage
    [fxKeyNames[10]]: [""]         //addValue
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
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","","%","%","","%","",""]         //addValue
    }
);

//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking",     "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""]],
    [fxKeyNames[5]]: "Wah Low Pass",
    [fxKeyNames[6]]: [0,2],
    [fxKeyNames[7]]: [26,28,30,114, 34 ,18,  116,  22],
    [fxKeyNames[8]]: [8,9,10,52,12,4,53,6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","","%","%","","%","",""]        
    }
);

//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking",     "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""]],
    [fxKeyNames[5]]: "Wah High Pass",
    [fxKeyNames[6]]: [0,3],
    [fxKeyNames[7]]: [26,28,30,114, 34 ,18,  116,  22],
    [fxKeyNames[8]]: [8,9,10,52,12,4,53,6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","","%","%","","%","",""]        
    }
);

//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking",     "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""]],
    [fxKeyNames[5]]: "Wah Vowel Filter",
    [fxKeyNames[6]]: [0,4],
    [fxKeyNames[7]]: [26,28,30,114, 34 ,18,  116,  22],
    [fxKeyNames[8]]: [8,9,10,52,12,4,53,6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","","%","%","","%","",""]        
    }
);

//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","0.1","1","1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","-5","0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","10","100","100","5","5","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Spread","Stages", "Mix", "Ducking", "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],["2","4","6","8","10","12"],
                    [""],[""],[""]],
    [fxKeyNames[5]]: "Wah Phaser",
    [fxKeyNames[6]]: [0,6],
    [fxKeyNames[7]]: [26,28,30,114,34 ,62,  64,  18,116,11],
    [fxKeyNames[8]]: [8,9,10,52,12,26,27,4,53,6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","","%","%","","","","%","",""]   
    }
);

//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking", "Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""]],
    [fxKeyNames[5]]: "Wah Flanger",
    [fxKeyNames[6]]: [0,7],
    [fxKeyNames[7]]: [26,28,30,114, 34 ,18,  116, 22],
    [fxKeyNames[8]]: [8,9,10,52,12,4,53, 6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","","%","%","","%","",""]   
    }
);



//wah, wah
arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","1","1","1","1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-100","-100","0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","10","100","100","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""], [""], [""] ],
    [fxKeyNames[5]]: "Wah Rate Reducer",
    [fxKeyNames[6]]: [0,8],
    [fxKeyNames[7]]: [26,28,30,114,  34,18,116, 22],
    //36  ,38 ,40 
    [fxKeyNames[8]]: [8,9,10,52,12,4,53,6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","","%","%","","%","","","","",""]   
    }
);


arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","1","1","1","0.1","0.1"],
    [fxKeyNames[1]]: ["-5","-100","0","0","-5","-5"],
    [fxKeyNames[2]]: ["5","100","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Pedal Range","Pedal Mode", "Mix", "Ducking", "Volume"],
    [fxKeyNames[4]]: [[""],[""],["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""]  ],
    [fxKeyNames[5]]: "Wah Ring Modulator",
    [fxKeyNames[6]]: [0,9],
    [fxKeyNames[7]]: [26,30,34,18,  116,  22],
    [fxKeyNames[8]]: [8,10,12,4,53,6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","%","","%","",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","1","1","1","1","0.1"],
    [fxKeyNames[1]]: ["-5","-100","0","0","-5","-5"],
    [fxKeyNames[2]]: ["5","100","5","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Pedal Range","Pedal Mode", "Mix","Ducking", "Volume"],
    [fxKeyNames[4]]: [[""],[""],["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""]  ],
    [fxKeyNames[5]]: "Wah Freq Shifter",
    [fxKeyNames[6]]: [0,10],
    [fxKeyNames[7]]: [26,30,34,18,  116,  22],
    [fxKeyNames[8]]: [8,10,12,4,53,6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","%","","%","",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","1","1","1","1","0.1"],
    [fxKeyNames[1]]: ["-5","-100","28","0","-5","-5"],
    [fxKeyNames[2]]: ["5","100","100","100","5","5"],
    [fxKeyNames[3]]: ["Manual","Pedal Range","Pitch Shift", "Mix","Ducking", "Volume"],
    [fxKeyNames[4]]: [[""],[""],
    ["","","","","","","","","","","","","","","","","","","","","","","","","","","","", 
    "-36","-35","-34","-33","-32","-31","-30","-29","-28","-27","-26","-25","-24","-23","-22","-21","-20","-19",
    "-18","-17","-16","-15","-14","-13","-12","-11","-10","-9","-8","-7","-6","-5","-4","-3","-2","-1","0",
    "1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19",
    "20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36"],
    [""],[""],[""]  ],
    [fxKeyNames[5]]: "Wah Formant Shift",
    [fxKeyNames[6]]: [0,12],
    [fxKeyNames[7]]: [26,30,124,18,  116,  22],
    [fxKeyNames[8]]: [8,10,57,4,53,6],
    [fxKeyNames[9]]: [0],
    [fxKeyNames[10]]: ["","%","","%","",""]  
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
    [fxKeyNames[7]]: [26,28,22],
    [fxKeyNames[8]]: [16,17,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","",""]   
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
    [fxKeyNames[7]]: [26,28,22,114],
    [fxKeyNames[8]]: [16,17,6,4],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","","","%"]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5",],
    [fxKeyNames[2]]: ["10","100","5"],
    [fxKeyNames[3]]: ["Drive","Mix","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""]],
    [fxKeyNames[5]]: "Plus DS",
    [fxKeyNames[6]]: [0,34],
    [fxKeyNames[7]]: [24,34,22],
    [fxKeyNames[8]]: [16,4,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","%",""]   
    }
);


arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","0"],
    [fxKeyNames[2]]: ["10","10","5","100"],
    [fxKeyNames[3]]: ["Drive","Tone","Volume","Mix"],
    [fxKeyNames[4]]: [[""],[""],[""],[""]],
    [fxKeyNames[5]]: "One DS",
    [fxKeyNames[6]]: [0,35],
    [fxKeyNames[7]]: [26,28,22,114],
    [fxKeyNames[8]]: [16,17,6,4],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","","","%"]   
    }
);


arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","0"],
    [fxKeyNames[2]]: ["10","10","5","100"],
    [fxKeyNames[3]]: ["Drive","Tone","Volume","Mix"],
    [fxKeyNames[4]]: [[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Muffin",
    [fxKeyNames[6]]: [0,36],
    [fxKeyNames[7]]: [26,28,22,114],
    [fxKeyNames[8]]: [16,17,6,4],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","","","%"]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","0"],
    [fxKeyNames[2]]: ["10","10","5","100"],
    [fxKeyNames[3]]: ["Drive","Tone","Volume","Mix"],
    [fxKeyNames[4]]: [[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Mouse",
    [fxKeyNames[6]]: [0,37],
    [fxKeyNames[7]]: [26,28,22,114],
    [fxKeyNames[8]]: [16,17,6,4],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","","","%"]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","0"],
    [fxKeyNames[2]]: ["10","10","5","100"],
    [fxKeyNames[3]]: ["Drive","Tone","Volume","Mix"],
    [fxKeyNames[4]]: [[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Full OC",
    [fxKeyNames[6]]: [0,42],
    [fxKeyNames[7]]: [26,28,22,114],
    [fxKeyNames[8]]: [16,17,6,4],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","","","%"]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1","0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","-5","0","0","0","0","0","0"],
    [fxKeyNames[2]]: ["10","5","10","10","10","10","10", "100"],
    [fxKeyNames[3]]: ["Drive","Volume","Transistor Shape","Transistor Tone","Impedance LP","Definition","Octa",  "Mix"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],[""],[""],[""], [""]],
    [fxKeyNames[5]]: "Kemper Fuzz",
    [fxKeyNames[6]]: [0,38],
    [fxKeyNames[7]]: [26,22,50,52,208,56,46,114],
    [fxKeyNames[8]]: [16,6,20,21,19,23,18,4],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","","","","","","","%"]   
    }
);


arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","-18","-18","20.6","-18"],
    [fxKeyNames[2]]: ["10","100","5","18","18","33488.1","18"],
    [fxKeyNames[3]]: ["Drive","Mix","Volume","Low","Middle","Mid Freq","High"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Metal DS",
    [fxKeyNames[6]]: [0,39],
    [fxKeyNames[7]]: [26,114,22,90,98,100,94 ],
    [fxKeyNames[8]]: [16,4,6,42,46,47,44],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","%",""," dB"," dB", " Hz", " dB"]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","100","5", "5"],
    [fxKeyNames[3]]: ["Tone","Mix","Ducking","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Treble Booster",
    [fxKeyNames[6]]: [0,113],
    [fxKeyNames[7]]: [42,114,112,22 ],
    [fxKeyNames[8]]: [17,4,53,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","%","",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","100","5", "5"],
    [fxKeyNames[3]]: ["Tone","Mix","Ducking","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Lead Booster",
    [fxKeyNames[6]]: [0,114],
    [fxKeyNames[7]]: [42,114,112,22 ],
    [fxKeyNames[8]]: [17,4,53,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","%","",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1"],
    [fxKeyNames[1]]: ["-5"],
    [fxKeyNames[2]]: ["5"],
    [fxKeyNames[3]]: ["Volume"],
    [fxKeyNames[4]]: [[""]],
    [fxKeyNames[5]]: "Pure Booster",
    [fxKeyNames[6]]: [0,115],
    [fxKeyNames[7]]: [22 ],
    [fxKeyNames[8]]: [6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: [""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["1","0.1"],
    [fxKeyNames[1]]: ["-100","-5"],
    [fxKeyNames[2]]: ["100","5"],
    [fxKeyNames[3]]: ["Pedal Range","Volume"],
    [fxKeyNames[4]]: [[""],[""]],
    [fxKeyNames[5]]: "Wah Pedal Booster",
    [fxKeyNames[6]]: [0,116],
    [fxKeyNames[7]]: [30,22 ],
    [fxKeyNames[8]]: [10,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["%",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5"],
    [fxKeyNames[2]]: ["10","10","5"],
    [fxKeyNames[3]]: ["Drive","Tone","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""]],
    [fxKeyNames[5]]: "Bit Shaper",
    [fxKeyNames[6]]: [0,17],
    [fxKeyNames[7]]: [42,44,22],
    [fxKeyNames[8]]: [16,17,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["0","0","-5","-5"],
    [fxKeyNames[2]]: ["10","10","5","5"],
    [fxKeyNames[3]]: ["Drive","Soft","Ducking","Volume"],
    [fxKeyNames[4]]: [[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Octa Shaper",
    [fxKeyNames[6]]: [0,18],
    [fxKeyNames[7]]: [42,28,112,22],
    [fxKeyNames[8]]: [16,18,53,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["","","",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1"],
    [fxKeyNames[1]]: ["0","-5"],
    [fxKeyNames[2]]: ["10","5"],
    [fxKeyNames[3]]: ["Drive","Volume"],
    [fxKeyNames[4]]: [[""],[""]],
    [fxKeyNames[5]]: "Soft Shaper",
    [fxKeyNames[6]]: [0,19],
    [fxKeyNames[7]]: [26,22],
    [fxKeyNames[8]]: [16,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["",""]   
    }
);

arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1"],
    [fxKeyNames[1]]: ["0","-5"],
    [fxKeyNames[2]]: ["10","5"],
    [fxKeyNames[3]]: ["Drive","Volume"],
    [fxKeyNames[4]]: [[""],[""]],
    [fxKeyNames[5]]: "Hard Shaper",
    [fxKeyNames[6]]: [0,20],
    [fxKeyNames[7]]: [26,22],
    [fxKeyNames[8]]: [16,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["",""]   
    }
);




arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1"],
    [fxKeyNames[1]]: ["0","-5"],
    [fxKeyNames[2]]: ["10","5"],
    [fxKeyNames[3]]: ["Drive","Volume"],
    [fxKeyNames[4]]: [[""],[""]],
    [fxKeyNames[5]]: "Wave Shaper",
    [fxKeyNames[6]]: [0,21],
    [fxKeyNames[7]]: [26,22],
    [fxKeyNames[8]]: [16,6],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: ["",""]   
    }
);


arrayOfFxObj.push({
    [fxKeyNames[0]]: ["0.1","0.1","0.1","0.1","0.1","0.1", "0.1","0.1","0.1"],
    [fxKeyNames[1]]: ["-12","-12","-12","-12","20.3","33470",  "-5","0","-5"],
    [fxKeyNames[2]]: ["12","12","12","12","830.6","830.6",   "5","100","5"],
    [fxKeyNames[3]]: ["1250 Hz","2500 Hz","5000 Hz","10 000 Hz","Low Cut","High Cut","Volume","Mix","Ducking"],
    [fxKeyNames[4]]: [[""],[""],[""],[""],[""],[""],[""],[""],[""]],
    [fxKeyNames[5]]: "Graphic Equalizer",
    [fxKeyNames[6]]: [0,97],
    [fxKeyNames[7]]: [86,88,90,92,140,142,22,114,112],
    [fxKeyNames[8]]: [38,39,40,41,67,68,6,4,53],
    [fxKeyNames[9]]: [1],
    [fxKeyNames[10]]: [" dB"," dB"," dB", " dB", " Hz", " Hz","","",""]   
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
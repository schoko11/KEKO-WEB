
import { arrayBuffer } from "node:stream/consumers";
import {TabulatorFull} from "tabulator-tables";
import { triggerLongPress } from "../src/triggerLongPress";
import { getAdrPageFromFxId, midiOutput, wholeRig } from "./app";
import { arrayOfFxObj } from "./FxObj";

let fxTable = new TabulatorFull('#fxTable', {       
    //autoColumns:true,
    layout: "fitColumns", //alternative: fitData
    //resizableColumnFit: true,
    columns: [
        {title:"Name", field:"name", headerFilter:"input",
            cellClick:function(e, cell) {
                let fxLabel = document.getElementById("offCanvasBottomLabel")?.textContent?.split(":");
                console.log("cell 1 "  + getAdrPageFromFxId("lpFx" + fxLabel![0]) + "#" + arrayOfFxObj[11]["nameOfFxId"] + "#" + fxLabel![0] + "#");
                let value = cell.getValue();
                cell.getElement().style.color = "#3FB449";
                //midiOutput.sendSysex([0,32,51,0 ],[ 127,1,0,50,0, 0,1]); //WAH WAH stomp a 
                for(let i = 0; i < arrayOfFxObj.length; i++) {
                    if (arrayOfFxObj[i]["nameOfFx"] === value) {
                        //console.log( "celllll" + arrayOfFxObj[i]["nameOfFxId"] + " " + getAdrPageFromFxId("lpFx" + fxLabel![0]));
                        midiOutput.sendSysex([0,32,51,0 ],[ 127,1,0,getAdrPageFromFxId("lpFx" + fxLabel![0]),0, arrayOfFxObj[i]["nameOfFxId"][0],arrayOfFxObj[i]["nameOfFxId"][1]  ]); //WAH WAH stomp a 
                        document.getElementById("offCanvasBottomLabel")!.textContent = fxLabel![0]+ ": " + value;  //set right fx label
                        console.log("cell3 " + document.getElementById("lpFxA"));
                        //document.getElementById("lpFxA")![0].innerHTML = "yooo";
                        break;
                    }
                }
                for (let i = 0; i < document.getElementsByClassName("longPress").length; i++) {
                    if (document.getElementsByClassName("longPress")[i].id === "lpFx" + fxLabel![0]) {
                        console.log("yoooooooooofds ");
                        document.getElementsByClassName("longPress")[i].firstChild!.nodeValue = value; //set the name of the stomp button

                    }
                }

                
            return value;
            }
        },
        {title:"Category", field:"category", headerFilter:"input" }
    ],
    reactiveData: true,
    //pagination: "local",
    paginationSize: 8,
    minHeight: "20%",
    //maxHeight: "40%",
    data: [
        {id: 1, name:"Wah Wah", category: "Wah" },
        {id: 2, name:"Wah Low Pass", category: "Wah"},
        {id: 3, name:"Wah High Pass", category: "Wah"},
        {id: 4, name:"Wah Vowel Filter", category: "Wah"},
        {id: 5, name:"Wah Phaser", category: "Wah"},
        {id: 6, name:"Wah Flanger", category: "Wah"},
        {id: 7, name:"Wah Rate Reducer", category: "Wah"},
        {id: 8, name:"Wah Ring Modulator", category: "Wah"},
        {id: 9, name:"Wah Freq Shifter", category: "Wah"},
        {id: 10, name:"Wah Formant Shift", category: "Wah"},
        {id: 11, name:"Kemper Drive", category: "Distortion"},
        {id: 12, name:"Green Scream", category: "Distortion"},
        {id: 13, name:"Plus DS", category: "Distortion"},
        {id: 14, name:"One DS", category: "Distortion"},
        {id: 15, name:"Muffin", category: "Distortion"},
        {id: 16, name:"Mouse", category: "Distortion"},
        {id: 17, name:"Full OC", category: "Distortion"},
        {id: 18, name:"Kemper Fuzz", category: "Distortion"},
        {id: 19, name:"Metal DS", category: "Distortion"},
        {id: 20, name:"Treble Booster", category: "Booster"}
    ]
} );



export {fxTable}
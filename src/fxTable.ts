
import { arrayBuffer } from "node:stream/consumers";
import {TabulatorFull} from "tabulator-tables";
import { triggerLongPress } from "../src/triggerLongPress";
import { getAdrPageFromFxId, midiOutput, wholeRig } from "./app";
import { arrayOfFxObj } from "./FxObj";

//midi controller documentation side 9
function getCCOfStomp(stompId: string,withTail: boolean): number {
    if (stompId === "A") { return 17; }
    if (stompId === "B") { return 18; }
    if (stompId === "C") { return 19; }
    if (stompId === "D") { return 20; }
    if (stompId === "X") { return 22; }
    if (stompId === "M") { return 24; }
    if (stompId === "Y" && !withTail) { return 26; }
    if (stompId === "Y" && withTail) { return 27; }
    if (stompId === "R" && !withTail) { return 28; }
    if (stompId === "R" && withTail) { return 29; }
    return 0;
}


let fxTable = new TabulatorFull('#fxTable', {       
    //autoColumns:true,
    layout: "fitColumns", //alternative: fitData
    //resizableColumnFit: true,
    columns: [
        {title:"Name", field:"name", headerFilter:"input",
            cellClick:function(e, cell) {
                let fxLabel = document.getElementById("offCanvasBottomLabel")?.textContent?.split(":");
                console.log("cell 1 "  + getAdrPageFromFxId("lpFx" + fxLabel![0]) + "#" + arrayOfFxObj[11]["nameOfFxId"] + "#" + fxLabel![0] + "#" + cell.getValue() );
                let value = cell.getValue();
                cell.getElement().style.color = "#3FB449";
                if (value === "off") {
                    console.log("off" + getCCOfStomp(fxLabel![0],false));
                    document.getElementById("offCanvasBottomLabel")!.textContent = fxLabel![0]+ ": "; 
                    midiOutput.sendControlChange(getCCOfStomp(fxLabel![0],false),0);
                    midiOutput.sendSysex([0,32,51,0 ],[ 127,1,0,getAdrPageFromFxId("lpFx" + fxLabel![0]),0, 0,0  ]); //off

                    //return;
                } else {
                //midiOutput.sendSysex([0,32,51,0 ],[ 127,1,0,50,0, 0,1]); //WAH WAH stomp a 
                    for(let i = 0; i < arrayOfFxObj.length; i++) {
                        if (arrayOfFxObj[i]["nameOfFx"] === value) {
                            //console.log( "celllll" + arrayOfFxObj[i]["nameOfFxId"] + " " + getAdrPageFromFxId("lpFx" + fxLabel![0]));
                            midiOutput.sendSysex([0,32,51,0 ],[ 127,1,0,getAdrPageFromFxId("lpFx" + fxLabel![0]),0, arrayOfFxObj[i]["nameOfFxId"][0],arrayOfFxObj[i]["nameOfFxId"][1]  ]); //WAH WAH stomp a 
                            midiOutput.sendControlChange(getCCOfStomp(fxLabel![0],false),1);
                            document.getElementById("offCanvasBottomLabel")!.textContent = fxLabel![0]+ ": " + value;  //set right fx label
                            console.log("cell3 " + document.getElementById("lpFxA"));
                            //document.getElementById("lpFxA")![0].innerHTML = "yooo";
                            break;
                        }
                    }
                }
                for (let i = 0; i < document.getElementsByClassName("longPress").length; i++) {
                    console.log("all longpresses" + document.getElementsByClassName("longPress")[i].id);
                    if (document.getElementsByClassName("longPress")[i].id === "lpFx" + fxLabel![0]) {
                        console.log("yoooooooooofds " + value + "#");
                        if (value === "off") { document.getElementsByClassName("longPress")[i].firstChild!.nodeValue = ""; }
                        if (value !== "off") { document.getElementsByClassName("longPress")[i].firstChild!.nodeValue = value;  } //set stomp button name
                        

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
        {id: 0, name:"off", category: "" }, 
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
        {id: 20, name:"Treble Booster", category: "Booster"},
        {id: 21, name:"Lead Booster", category: "Booster"},
        {id: 22, name:"Pure Booster", category: "Booster"},
        {id: 23, name:"Wah Pedal Booster", category: "Booster"},
        {id: 24, name:"Bit Shaper", category: "Shaper"},
        {id: 25, name:"Octa Shaper", category: "Shaper"},
        {id: 26, name:"Soft Shaper", category: "Shaper"},
        {id: 27, name:"Hard Shaper", category: "Shaper"},
        {id: 28, name:"Wave Shaper", category: "Shaper"},
        {id: 29, name:"Graphic Equalizer", category: "Equalizer"},
    ]
} );



export {fxTable}
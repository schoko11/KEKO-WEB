//const {WebMidi} = require("webmidi");
import {WebMidi} from "webmidi";
import {TabulatorFull} from "tabulator-tables";
import '../src/externalLibs/popper.min.js';
//import { triggerLongPress } from "../src/triggerLongPress";
const webaudio = require('../src/externalLibs/webaudio-controls.min.cjs');  //add as cinnibjs module otherwise esbuild will complain
//https://esbuild.github.io/content-types/
const longpress = require('../src/externalLibs/long-press-event.min.cjs');
//when starting the browser locally with --allow-file-access-from-files you can open index.html and it will load JS without CORS errors

import { triggerLongPress } from "../src/triggerLongPress"; 
import { perfRigsTable,perfRigsTableData } from "../src/perfRigsTable";
import { Modal, Offcanvas } from "bootstrap";
import { arrayOfFxObj, defFxObj } from "../src/FxObj";
import { rejects } from "assert";

console.log("start" + arrayOfFxObj[1]["nameOfFx"]);

let myOffcanvas = document.getElementById("offCanvasBottom");
let bsOffCanvas = new Offcanvas(myOffcanvas!);
let kekoSettings = document.getElementById("kekoSettings");
let kekoSettingsOffCanvas = new Offcanvas(kekoSettings!);

let modalParamsHeader = document.getElementById("modalParamsHeader");

let myCollapse = document.getElementById("perfRigsTable");


const fxTable = require('../src/fxTable');
const modalNameMapping = require('../src/modalNameMapping');


//unfortuntly necessary at the moment, reason not known set in offcanvas.scss
myOffcanvas?.addEventListener('show.bs.offcanvas', function () { this.style.visibility = "visible"; });
myOffcanvas?.addEventListener('hide.bs.offcanvas', function (e) { 
    this.style.visibility = "hidden";
    let fxIdLetter: string = "";
    //console.log("close offcanvas#" +  e.target!.getAttribute("id") + "#" + document.getElementById("offCanvasBottomLabel")?.textContent);
    fxIdLetter = document.getElementById("offCanvasBottomLabel")!.textContent!.split(":")[0]; //get A,B,C... 
    midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,getAdrPageFromFxId("lpFx" + fxIdLetter), 0]);  //request the corresponding stomp for update of parameters
});

kekoSettings?.addEventListener('show.bs.offcanvas', function () { this.style.visibility = "visible"; });
kekoSettings?.addEventListener('hide.bs.offcanvas', function () { this.style.visibility = "hidden"; });

const maxTime = 9999999999999;
let startTimeFxInputs: Array<number> = [maxTime,maxTime,maxTime,maxTime,maxTime,
                                        maxTime,maxTime,maxTime,maxTime,maxTime,
                                        maxTime,maxTime,maxTime,maxTime,maxTime,
                                        maxTime];

WebMidi
    .enable({sysex: true})
    .then(onEnabled)
    .catch(err => alert("Error " + err));

let midiInName = localStorage.getItem("KEKO_MIDI_IN");
let midiOutName = localStorage.getItem("KEKO_MIDI_OUT");

let midiOutput;
let midiInput;
let perfMode: boolean = true;

var modalForMidiConn = new Modal(document.getElementById('chooseMidiConn')!, {keyboard: false});
let chooseMidiConnModal = document.getElementById('chooseMidiConn');
var modalTitle = chooseMidiConnModal?.querySelector('.modal-title');
let setDefaultMidi = (<HTMLInputElement>document.getElementById('setDefaultMidi'));

let midiModalClose = (<HTMLInputElement>document.getElementById('midiClose'));
let rigsOrPerfRight = (<HTMLInputElement>document.getElementById('rigsOrPerfRight'));
let rigsOrPerfLeft = (<HTMLInputElement>document.getElementById('rigsOrPerfLeft'));

let selectMidiIn = (<HTMLInputElement>document.getElementById('inputGroupSelect'));
let selectMidiOut = (<HTMLInputElement>document.getElementById('outputGroupSelect'));
selectMidiIn!.innerHTML += '<option selected>Choose...</option>';
selectMidiOut!.innerHTML += '<option selected>Choose...</option>';

let obj = document.getElementsByTagName("webaudio-knob");

let stompsSwitch =  (<HTMLCollection>document.getElementsByClassName("STOMPS"));
let stackSwitch =  (<HTMLCollection>document.getElementsByClassName("STACK"));
let effectsSwitch =  (<HTMLCollection>document.getElementsByClassName("EFFECTS"));

//240,0,32,51,0,0,3,0,0,0,48,0,247   //unknown
//240,0,32,51,0,0,3,0,0,0,48,0,247

//127,1,0,4,64,0,1 all stomps on
//127,1,0,4,64,0,0 all stomps off
for(let i = 0;i < stompsSwitch.length; i++ ) {
    stompsSwitch[i].addEventListener('change', function(e) {
        //console.log("addeventlistener stomps" + e.target!.value + "#" + i);
        //depending on the screensize the view changes, so we also have two stomps stack, effects main switches
        if (i === 0) { stompsSwitch[1]!.setValue(e.target!.value,false); }
        if (i === 1) { stompsSwitch[0]!.setValue(e.target!.value,false); }
        //console.log("midioutput stompswitch " + midiOutput.state);
        midiOutput.sendSysex([0,32,51,0 ],[ 127,1,0,4,64,0, e.target!.value]); 
    });
}

//127,1,0,4,65,0,1 all stack on
//127,1,0,4,65,0,0 all stack off
for(let i = 0;i < stackSwitch.length; i++ ) {
    stackSwitch[i].addEventListener('change', function(e) {
        //console.log("addeventlistener stack" + e.target!.value + "#" + i);
        //depending on the screensize the view changes, so we also have two stomps stack, effects main switches
        if (i === 0) { stackSwitch[1]!.setValue(e.target!.value,false); }
        if (i === 1) { stackSwitch[0]!.setValue(e.target!.value,false); }
        //console.log("midioutput stackswitch " + midiOutput.state);
        midiOutput.sendSysex([0,32,51,0 ],[ 127,1,0,4,65,0, e.target!.value]); 
    });
}

//127,1,0,4,66,0,1 all effects on
//127,1,0,4,66,0,0 all effects off
for(let i = 0;i < effectsSwitch.length; i++ ) {
    effectsSwitch[i].addEventListener('change', function(e) {
        //console.log("addeventlistener effects" + e.target!.value + "#" + i);
        //depending on the screensize the view changes, so we also have two stomps stack, effects main switches
        if (i === 0) { effectsSwitch[1]!.setValue(e.target!.value,false); }
        if (i === 1) { effectsSwitch[0]!.setValue(e.target!.value,false); }
        //console.log("midioutput stackswitch " + midiOutput.state);
        midiOutput.sendSysex([0,32,51,0 ],[ 127,1,0,4,66,0, e.target!.value]); 
    });
}


//catch the variable input fx elements and attach event handler
let inputKnobVarFxElements = document.getElementsByClassName("fxContainers");
let divFxContainers = document.getElementsByClassName('divFxContainers');

let currentRigname: string = "";

let startTime: number;
let endTime: number;

function calcMsbLsb(msb: number, lsb: number, obj: any, index: number): number {
    let x1;
   
    if ( obj.min[index] < 0 ) {
        //if 
        x1 = parseFloat( (((msb*127 + lsb) / 8128) *  Math.abs(obj.min[index]) ).toFixed(2)) - Math.abs(obj.min[index]);
        //console.log("calcmsblsb neg " + x1 + "#" + msb + "#" + lsb);
    } else {
        //console.log("xxxdxd 3" + obj.label[index] + "# msb " + msb + "# lsb " + lsb);
        x1 = parseFloat( (((msb*127 + lsb) / 16256) *  obj.max[index]  ).toFixed(2)) ;
        if (obj.label[index] === "knobGain") {

        }
        if (obj["textRepl"][index].length > 1 ) {
            let val = Math.floor( ( msb * 127) + lsb);
        }
        if (obj.label[index] === "Pedal Mode") {
            //console.log("pedal mode " + x1 + "##" + Math.floor((msb*127 + lsb) / 16256) );
        }
    }
    //console.log("calcmsblsb " + obj.min[index] + "###" + x1);

    let x2 = ((msb*127 + lsb) / 8128);
    let x3 = msb*127 + lsb;
    return x1.toFixed(2);
}


 

 let wholeRig: Object = {
    "lpFxA": defFxObj,
    "lpFxB": defFxObj,
    "lpFxC": defFxObj, 
    "lpFxD": defFxObj, 
    "lpFxX": defFxObj, 
    "lpFxM": defFxObj, 
    "lpFxY": defFxObj, 
    "lpFxR": defFxObj,
   // "lpFxG": defFxObj //Rig settings
    "lpFxP": arrayOfFxObj[9], //amp, be carefull about position 
    "lpFxE": defFxObj, //eq
    "lpFxS": defFxObj //cab aka speaker   
   // "lpFxI": fx1, //input
   // "lpFxO": fx1  //output
 }


 //document.getElementById(wholeRig[this.id]["label"][0])!.setValue(3,true); //setvalue of knobs
 //document.getElementById(wholeRig["lpFxA"]["label"][0])!.setValue(3,true); //first 


//document.getElementById("fxContainer" + "0")!.innerHTML = 
//'<label class="fw-bold fs-6 font-monospace p-1 d-flex justify-content-center">' + "labelll" + '</label>' +   
//'<webaudio-knob class="fw-bold fs-6 font-monospace d-flex justify-content-center inputKnobFix" id="fxConatainerx1" diameter=75 ' +
//'step=' + "5" + ' min=' + "0" + ' max=' + "30" + ' src="ASSETS/pots/kjLEDknob_1447_64x64_64.png" ></webaudio-knob>';


//prepare html for fx


//for (let i = 0; i < divFxContainers.length; i++) {
//    console.log(wholeRig[divFxContainers[i].id]?.label + "dddd" + divFxContainers[i].id + "##" +  divFxContainers.length);
//    for (let j = 0; j <  wholeRig[divFxContainers[i].id]?.label.length ; j++) {
//         console.log("prepare html for fx" + wholeRig[divFxContainers[i].id]?.label[0] + "#" + divFxContainers[i].id);
//        if (wholeRig[divFxContainers[i].id]?.label[0] === "") { continue; }
//        divFxContainers[i].innerHTML += '<div class="col border pb-4 pt-0 fxContainers" id="' + divFxContainers[i].id + j.toString() + '"> ' +
//        '<label class="fw-bold fs-6 font-monospace p-1 d-flex justify-content-center">' + wholeRig[divFxContainers[i].id].label[j] + '</label>' +
//        '<webaudio-knob class="fw-bold fs-6 font-monospace d-flex justify-content-center inputKnobFix" diameter=75 id="' + wholeRig[divFxContainers[i].id].label[j] + '" ' +
//        'step=' + wholeRig[divFxContainers[i].id].step[j] + ' min=' + wholeRig[divFxContainers[i].id].min[j] + ' max=' + wholeRig[divFxContainers[i].id].max[j] +
//         ' src="ASSETS/pots/kjLEDknob_1447_64x64_64.png" value="" >' +
//        ' </webaudio-knob>  </div>';
        //divFxContainers[i].children[j].children[1].innerHTML = i.toString() + j.toString(); //set value when toogle fx
//    }    
    //console.log("fds" + fxContainers[i].children[1].getAttribute("max") + fxContainers[i].id  )
//}

let knob1 = document.getElementsByTagName("webaudio-knob");
let testknob = document.getElementById("Pedal Mode");


//var modalForKekoSettings = new Modal(document.getElementById('kekoSettings')!, {keyboard: false});
let kekoSetMidi= (<HTMLInputElement>document.getElementById('kekoSetMidi'));

//console.log("#x#x#x"+ kekoSetMidi!.getAttributeNames());
kekoSetMidi!.addEventListener('click', function () {
    console.log("settings pressed " + this );
    midiInName = null;
    midiOutName = null;
    selectMidiIn.innerHTML = '';
    selectMidiOut.innerHTML = '';
    //selectMidiIn.innerHTML += '<label class="form-check-label" for="inputGroupSelect"> Midi In </label>';
    selectMidiIn!.innerHTML += '<option selected>Choose...</option>';
    selectMidiOut!.innerHTML += '<option selected>Choose...</option>';
    //console.log("before setmidi " + midiInName + "#" + selectMidiIn.innerHTML)
    setMidi();
    midiInput = WebMidi.getInputByName(midiInName!);
    midiOutput = WebMidi.getOutputByName(midiOutName!);
});



selectMidiIn?.addEventListener('change', function () {
    //var options = temp!.querySelector("selected");
    //console.log('fdsfds' + this!.value +  "##"  + this.children[1].getAttributeNames());
    if (this.children.length > 1) {
        if (this.children[1].getAttributeNames().includes("input")) { //we added input on midi in and output on midi output
            console.log("midi in found " + this.value);
            if (this!.value !== "Choose...") { midiInName = this.value; }
        }
        if (midiInName !== null && midiOutName !== null && this!.value !== "Choose..." ) {  midiModalClose?.removeAttribute("disabled"); }
        if (this.value === "Choose...") {  midiModalClose?.setAttribute("disabled",""); }
    }
});


selectMidiOut?.addEventListener('change', function () {
    //console.log('fdsfds' + this!.value +  "##"  + this.children[1].getAttributeNames());
    if (this.children.length > 1) {

        if (this.children[1].getAttributeNames().includes("output")) { //we added input on midi in and output on midi output
            console.log("midi output found")
            if (this!.value !== "Choose...") { midiOutName = this.value; }
        }
        if (midiInName !== null && midiOutName !== null && this!.value !== "Choose..." ) {  midiModalClose?.removeAttribute("disabled"); }
        if (this.value === "Choose...") {  midiModalClose?.setAttribute("disabled",""); }
    }
});

async function changeAndWaitForDetails(CCNumber: number, perfMode: boolean, startTime: number) {
    if (!perfMode) {

        //request next rig
        const timeout1 = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        (async () => {
            for(let i = 0; i < 1; i++) {
                //console.log("right rig 2 " + Date.now() + "###" + perfRigsTable.getData()[0].name  + "#" + currentRigname);
                await midiOutput.channels[1].sendControlChange(CCNumber,0);
                await timeout1(100);
                await requestRigDetails();
                //console.log("right rig 2x " + Date.now() + "###" + perfRigsTable.getData()[0].name  + "#" + currentRigname);
            }
        })();
        //return;

        //wait until everyting is here
        const timeout2 = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        (async () => {
            for(let i = 0; i <= 20; i++) {
                //if (perfRigsTable.getData()[0].name  === currentRigname) {
                    let j = 0;
                    for (j = 0; j < 15; j++) {
                        if (startTimeFxInputs[j] > startTime) {
                            startTimeFxInputs[j] = startTime;
                        } else {
                            //console.log("rig not finally loaded " + j + "#" + startTimeFxInputs[j] + "###" + startTime );
                            break;
                        } 
                    }
                    if (j >= 14) {
                        endTime = Date.now(); 
                        return;
                    }
                //}  
                //when the sysexin changes the rigname we are finished, assuming taking the longest time, if not should be no problem
                await timeout2(100);
            }
        //startTimeFxInputs.forEach(e => {e = maxTime});
        })();
    }
}

function buildFxControls(id: string, index: number){
    //for (let i = 0; i < divFxContainers.length; i++) {
        divFxContainers[index].innerHTML = '';
        console.log("buildfxcontrols " + id + " " +  wholeRig[id]!.label.length);
        for (let j = 0; j <  wholeRig[id]!.label.length ; j++) {
            //the 8 fx slots have 5 chars, the others are fixed
            //if (divFxContainers[i].id.length <= 5 ) { 
           
            if (wholeRig[id]?.label[0] === "") { continue; }
            divFxContainers[index].innerHTML += '<div class="col border pb-4 pt-0 fxContainers" id="' + id + j.toString() + '"> ' +
            '<label class="fw-bold fs-6 font-monospace p-1 d-flex justify-content-center">' + wholeRig[id].label[j] + '</label>' +
            '<webaudio-knob class="fw-bold fs-6 font-monospace d-flex justify-content-center inputKnobFix" diameter=75 id="' + id + j + "fXC" + '" ' +
            'step=' + wholeRig[id].step[j] + ' min=' + wholeRig[id].min[j] + ' max=' + wholeRig[id].max[j] +
             ' src="ASSETS/pots/kjLEDknob_1447_64x64_64.png" value="" >' +
            ' </webaudio-knob>  </div>';
            console.log("prepare html for fx" + wholeRig[id]?.label[0] + "#" + id);
            //console.log("xxfdfdx" + divFxContainers[0].children[0].innerHTML);
            //console.log(divFxContainers[i].children[0].children[0].children[1]);
            //divFxContainers[i].children[j].children[1].innerHTML = i.toString() + j.toString(); //set value when toogle fx
    
        }    
        //console.log("fds" + fxContainers[i].children[1].getAttribute("max") + fxContainers[i].id  )
    //}
}

function prepareFxControls(fxId: string, messageData) {
    for (let i = 0; i < wholeRig[fxId]["label"].length; i++) {
        let temp = calcMsbLsb(messageData[wholeRig[fxId]["multiReqPos"][i]],
            messageData[wholeRig[fxId]["multiReqPos"][i] + 1],wholeRig[fxId],i).toString();
        //console.log("preparefxcontrols temp " + temp + " " + fxId + " " + wholeRig[fxId]["label"][i] + wholeRig[fxId]["label"][i].length );
        if (document.getElementById(fxId + i + "fXC") === null) { 
            modalParamsHeader!.innerHTML = "";
            modalParamsHeader!.innerHTML = "off";
            break;
        }
        //console.log("preparefxcontrols temp " + temp + " " + fxId + " " + wholeRig[fxId]["label"][i] + wholeRig[fxId]["label"][i].length );
        if (wholeRig[fxId]["textRepl"][i].length > 1) {
            //console.log("###textrepl " + messageData[122] + "Ö"  + messageData[123] + "Ö" + messageData[124] + "Ö" + messageData[125] + "Ö"  );
            let val = Math.floor( (messageData[wholeRig[fxId]["multiReqPos"][i]] * 127) + messageData[wholeRig[fxId]["multiReqPos"][i] + 1])
            let posMsb = wholeRig[fxId]["multiReqPos"][i];
            let posLsb = posMsb + 1;
            let valMsb = messageData[posMsb];
            let valLsb = messageData[posLsb];
            //console.log(" textrepl " + i + " " + temp + "###"  + valMsb + "#" + valLsb + "###" + posMsb + "#" + posLsb)
            //console.log("math "+ Math.floor( ((e.message.data[34] *127) + e.message.data[35])) + " val " + val );
            document.getElementById(fxId + i + "fXC")!.innerHTML = wholeRig[fxId]["textRepl"][i][val] + wholeRig[fxId]["addValue"][i] ;    
            (<HTMLInputElement>document.getElementById(fxId + i + "fXC"))!.setValue(val,false);
        } else {
            //console.log("###notextrepl " + temp + "Ö" + wholeRig[fxId]["label"][i]  );
            //document.getElementById(wholeRig[fxId]["label"][i])!.innerHTML = temp + wholeRig[fxId]["addValue"][i];
            document.getElementById(fxId + i + "fXC")!.innerHTML = temp + wholeRig[fxId]["addValue"][i];
            (<HTMLInputElement>document.getElementById(fxId + i + "fXC"))!.setValue(temp,false);
            //(<HTMLInputElement>document.getElementById("lpFxB1"))!.setValue("xxxxx",false);
        }
        
        //(<HTMLInputElement>document.getElementById(wholeRig["lpFxA"]["label"][i]))!.setValue(temp,false);
    }
}

function prepareSingleSysexIns(fxId: string, messageData) {
    for (let i = 0; i < wholeRig[fxId]["singleReqPos"].length; i++) { 
        //console.log("single req lpfxa in " + wholeRig[fxId]["singleReqPos"][i] + "#" + wholeRig[fxId]["textRepl"][i].length);
        //console.log("single req lpfxa in 2 " + i + "#" +  wholeRig[fxId]["singleReqPos"] + "#" +  wholeRig[fxId]["nameOfFx"] + "#" + fxId);
        if ( wholeRig[fxId]["singleReqPos"][i] === messageData[9] && wholeRig[fxId]["textRepl"][i].length <= 1 ) {
            //console.log("singlre req lpfxa in 3 " )
            
            let temp = calcMsbLsb(messageData[10],messageData[11],wholeRig[fxId],i).toString();
            document.getElementById(fxId + i + "fXC")!.innerHTML = temp + wholeRig[fxId]["addValue"][i];
            (<HTMLInputElement>document.getElementById(fxId + i + "fXC"))!.setValue(temp,false);

        }
        if ( wholeRig[fxId]["singleReqPos"][i] === messageData[9] && wholeRig[fxId]["textRepl"][i].length > 1 ) { 
            let temp  = Math.floor( (messageData[10] * 127) + messageData[11]);
            //console.log(" single req lpfxa  " + temp);
            document.getElementById(fxId + i + "fXC")!.innerHTML = wholeRig[fxId]["textRepl"][i][temp] + wholeRig[fxId]["addValue"][i] ;
            (<HTMLInputElement>document.getElementById(fxId + i + "fXC"))!.setValue(temp,false);
        }               
    }
}

async function requestRigDetails() {
    console.log("requestRigDetails");
    midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,4, 0]); //req rig section
    midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,9, 0]); //req input section
    midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,10, 0]); //Amplifier
    midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,11, 0]); //EQ
    midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,12, 0]); //Cabinet
    midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,50, 0]); //req multi A
    midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,51, 0]); //req multi B
    midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,52, 0]); //req multi C
    midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,53, 0]); //req multi D
    midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,56, 0]); //req multi X
    midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,58, 0]); //req multi mod
    midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,60, 0]); //req multi dly
    midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,61, 0]); //req multi rev
    //midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,125, 0]); //req multi looper
    midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,127, 0]); //req multi system
    
    midiOutput.sendSysex([0,32,51,0 ],[ 127,65,0,4,64]);  //request single stomp section
    midiOutput.sendSysex([0,32,51,0 ],[ 127,65,0,4,65]);  //request single stack section
    midiOutput.sendSysex([0,32,51,0 ],[ 127,65,0,4,66]);  //request single effects section
    //midiOutput.sendSysex([0,32,51,0 ],[ 127,65,0,4, 1]); //RigVolume
    midiOutput.sendSysex([0,32,51,0 ],[ 127,67,0,0, 1]); //request rig name as ascii
    midiOutput.sendSysex([0,32,51,0 ],[ 127,67,0,0, 2]); //request author as ascii
}

async function midiSet() {
    console.log("in midiset " + midiInName + "#" + midiOutName );
  
    if (midiInName === null || midiOutName === null) {
        //alert("no midi in found");
        console.log("midi in and or midi out not set");
        //let myModal = new Modal(document.getElementById('staticBackdrop')! , {keyboard: false});
        //myModal.show();
 
        modalTitle!.textContent = 'Please choose midiin and midiout';
        
        WebMidi.inputs.forEach(input => {
            //console.log(input + " " + WebMidi.inputs.length);
            selectMidiIn!.innerHTML += '<option ' + "input" + ' value="' + input.name + '">' + input.name + '</option>';
        });    
            
        WebMidi.outputs.forEach( output => {
            //console.log(output + " " + WebMidi.outputs.length)
            selectMidiOut!.innerHTML += '<option ' + "output" + ' value="' + output.name + '">' + output.name + '</option>';
        });    
            
        modalForMidiConn.show();

        return new Promise<void>((resolve,reject) => 
            document.getElementById('midiClose')?.addEventListener('click', () => {
                //console.log("clicked" + midiInName + "###" + midiOutName + "##" + setDefaultMidi!.checked);
                //console.log("xxxxx" + document.getElementById('setDefaultMidi')?.hasAttribute("checked") + "");
                if (midiInName !== null && midiOutName !== null)  { resolve() };
                if (midiInName === null || midiOutName === null)  { reject("not all have been chosen") }
            })            
        );
    }
}

function setMidi() {
    WebMidi.inputs.forEach(input => {
        console.log(input.name + " ")
    }); 
    WebMidi.outputs.forEach(output => {
        console.log(output.name + " ")
    });  
    const promises: Promise<void>[] = [];
    promises.push( midiSet());

    Promise.all(promises).then((values) => {
        //console.log("end" + values + " # " + setDefaultMidi!.checked);
        //store midi in and midi out in local storage
        if (setDefaultMidi!.checked) {
            localStorage.setItem("KEKO_MIDI_IN",midiInName!);
            localStorage.setItem("KEKO_MIDI_OUT", midiOutName!);
        }
        midiInput = WebMidi.getInputByName(midiInName!);
        midiOutput = WebMidi.getOutputByName(midiOutName!);
        //WebMidi.getInputByName(midiOutName!)?.channels[1].sendControlChange(48,0)


        rigsOrPerfRight.addEventListener('click', async () => {
            //if (await changeAndWaitForDetails(48,perfMode,startTime)) {

            //}

           
            //console.log("right right pressed");
            if (midiOutput.state === 'connected' && !perfMode)  {
                const startTime: number = Date.now();
                //startTime = 9999999999999;        //1680014238181 set time to max
                //await midiOutput.channels[1].sendControlChange(48,0);
                //const timeout0 = (ms) => new Promise(resolve => setTimeout(resolve, ms));
                //(async () => {
                //    for(let i = 0; i < 1; i++) {
                //        console.log("right rig 2 " + Date.now() + "###" + perfRigsTable.getData()[0].name  + "#" + currentRigname);
                //        midiOutput.channels[1].sendControlChange(48,0);
                //        await timeout0(1000);
                //        requestRigDetails();
                //    }
                //})();

                await changeAndWaitForDetails(48,perfMode,startTime);

                //const timeout1 = (ms) => new Promise(resolve => setTimeout(resolve, ms));
                //(async () => {
                //    for(let i = 0; i < 1; i++) {
                //        console.log("right rig 2 " + Date.now() + "###" + perfRigsTable.getData()[0].name  + "#" + currentRigname);
                //        midiOutput.channels[1].sendControlChange(48,0);
                //        await timeout1(100);
                //        requestRigDetails();
                //    }
                //})();

                //const timeout2 = (ms) => new Promise(resolve => setTimeout(resolve, ms));
                //(async () => {
                //    for(let i = 0; i <= 20; i++) {
                //        if (perfRigsTable.getData()[0].name  === currentRigname) {
                //            if (startTimeFxInputs[13] >  startTime) { 
                //                console.log("right rig 4 " + perfRigsTable.getData()[0].name  + "#" + currentRigname + "####" + startTimeFxInputs[13]  + "-" + Date.now());    
                //                startTimeFxInputs[13] = startTime;
                //                return;
                //            } 
                //        }  
                        //when the sysexin changes the rigname we are finished, assuming taking the longest time, if not should be no problem
                //        await timeout2(100);
                //    }
                    //startTimeFxInputs.forEach(e => {e = maxTime});
               // })();

                //console.log("right rig 4 " + perfRigsTable.getData()[0].name + + "###" + currentRigname + "#" + Date.now());

            } //rig right
 
        });
    
        rigsOrPerfLeft.addEventListener('click', async () => {
            const startTime: number = Date.now();
            if (midiOutput.state === 'connected' && !perfMode)  { await changeAndWaitForDetails(49,perfMode,startTime); }
            //    midiOutput.channels[1].sendControlChange(49,0); //rig left
            //requestRigDetails();
        })


        //window.location.reload();
        //document.location.reload();
      }).catch( (err) => {
        console.log("uhh" + err);
      });


}

function sysexIn() {
    //console.log("sysexin " + Object.keys(this.eventMap.sysex) + "#" + this.message.data);
}

function onEnabled() {
    let fxIndexStart: number = 7;

    //(async () => {
    //})();

    setMidi(); //if midi in and out are not set request them via modal popup
    
    midiInput = WebMidi.getInputByName(midiInName!);
    midiOutput = WebMidi.getOutputByName(midiOutName!);

   

    //midiInput.addListener("sysex", sysexIn(this));

    //midiOutput.addListener("sysex", e => {
    //    console.log("sysexout " + e.message.data);
    //})

    midiInput.addListener("sysex", e => {
        let fxId: string = "";

        //console.log("sysexin " + e.message.data + "##" + e.message.data[6] + " " + e.message.data[8]);
        if (e.message.data[6] === 2 && e.message.data[8] === 4) {  //is answer to multirequest rig
            startTimeFxInputs[0] = Date.now();
            //console.log(" multi input " + e.message.data[26] + "#"+ e.message.data[27] );
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 9) {  //is answer to multirequest Input
            startTimeFxInputs[1] = Date.now();
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 10) {  //is answer to multirequest Amplifier
            let arrayOfValues: string[] = [];
            startTimeFxInputs[2] = Date.now();
            //set different always seen main controls, other dom treatment
            for(let i = 0;i < 1; i++) {
                arrayOfValues.push(calcMsbLsb(e.message.data[arrayOfFxObj[2]["multiReqPos"]![i]],
                    e.message.data[arrayOfFxObj[2]["multiReqPos"][i] + 1],arrayOfFxObj[2],i).toString());
                    //console.log("multireq sysexin amp 2 " + i  + "#" +  arrayOfValues[i] + "##" + mainFrontKnobs.label[i]);
                document.getElementById(arrayOfFxObj[2]["label"]![i])!.innerHTML = arrayOfValues[i] + arrayOfFxObj[2]["addValue"][i];
                (<HTMLInputElement>document.getElementById(arrayOfFxObj[2]["label"][i]))!.setValue(arrayOfValues[i],false);
                    //(<HTMLInputElement>document.getElementById(mainFrontKnobs.label[i]))!.value = arrayOfValues[i];
            }

            fxId = "lpFxP";

            buildFxControls(fxId,8);  //meaning the 9-th div element, fxa is 0 fxb 1 and so on
            prepareFxControls(fxId,e.message.data);


        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 11) {  //is answer to multirequest Equalizer
            let arrayOfValues: string[] = [];
            startTimeFxInputs[3] = Date.now();
            for(let i = 0;i < arrayOfFxObj[3]["step"].length; i++) {
                //console.log("eq multirequest in " + arrayOfFxObj[3]["multiReqPos"][i])
                arrayOfValues.push(calcMsbLsb(e.message.data[arrayOfFxObj[3]["multiReqPos"][i]],
                    e.message.data[arrayOfFxObj[3]["multiReqPos"][i] + 1],arrayOfFxObj[3],i).toString());
                    document.getElementById(arrayOfFxObj[3]["label"][i])!.innerHTML = arrayOfValues[i] + arrayOfFxObj[3]["addValue"][i];
                    (<HTMLInputElement>document.getElementById(arrayOfFxObj[3]["label"][i]))!.setValue(arrayOfValues[i],false);
                  //(<HTMLInputElement>document.getElementById(mainFrontKnobs.label[i]))!.value = arrayOfValues[i];
            }
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 12) {  //is answer to multirequest cabinet
            startTimeFxInputs[4] = Date.now();
            //console.log(" xxxx " + e.message.data[26] + "#"+ e.message.data[27] );
        }
        //multi req in 10,11: appendix b midi manual
        else if (e.message.data[6] === 2 && e.message.data[8] === 50) {  //is answer to multirequest stomp A
            fxId = "lpFxA";
            startTimeFxInputs[5] = Date.now();
            //let longpr = document.getElementsByClassName("longPress");
         
            for (let i = fxIndexStart; i < arrayOfFxObj.length; i++) {
                //console.log("find arrayoffxobj "  + e.message.data[10] + " " + arrayOfFxObj[i]["nameOfFxId"][0] + "#" + e.message.data[11] + " " + arrayOfFxObj[i]["nameOfFxId"][1] + "#" + i );
                if (e.message.data[10] === arrayOfFxObj[i]["nameOfFxId"][0] && e.message.data[11] === arrayOfFxObj[i]["nameOfFxId"][1]) {
                    wholeRig![fxId] = arrayOfFxObj[i];
                    break;
                }
            }


            
            buildFxControls(fxId,0);
            prepareFxControls(fxId, e.message.data);


            //label the stomp button
            for(let i = 0;i < longClickElements.length; i++) {
                if (longClickElements![i].id === fxId) { longClickElements[i]!.firstChild!.nodeValue = wholeRig[longClickElements![i].id]["nameOfFx"].toString();  }
            }

        

            //console.log(" xxxx " + e.message.data[46] + "#"+ e.message.data[47] );
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 51) {  //is answer to multirequest stomp B
            fxId = "lpFxB"
            startTimeFxInputs[6] = Date.now();
         
            for (let i = fxIndexStart; i < arrayOfFxObj.length; i++) {
                if (e.message.data[10] === arrayOfFxObj[i]["nameOfFxId"][0] && e.message.data[11] === arrayOfFxObj[i]["nameOfFxId"][1]) {
                    wholeRig![fxId] = arrayOfFxObj[i];
                    break;
                }
            }
            
            buildFxControls(fxId,1);
            prepareFxControls(fxId, e.message.data);

            //label the stomp knob
            for(let i = 0;i < longClickElements.length; i++) {
                if (longClickElements![i].id === fxId) { longClickElements[i]!.firstChild!.nodeValue = wholeRig[longClickElements![i].id]["nameOfFx"].toString();  }
            }
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 52) {  //is answer to multirequest stomp C
            fxId = "lpFxC";
            startTimeFxInputs[7] = Date.now();
            for (let i = fxIndexStart; i < arrayOfFxObj.length; i++) {
                if (e.message.data[10] === arrayOfFxObj[i]["nameOfFxId"][0] && e.message.data[11] === arrayOfFxObj[i]["nameOfFxId"][1]) {
                    wholeRig![fxId] = arrayOfFxObj[i];
                    break;
                }
            }
            
            buildFxControls(fxId,2);
            prepareFxControls(fxId, e.message.data);


            //label the stomp knob
            for(let i = 0;i < longClickElements.length; i++) {
                if (longClickElements![i].id === fxId) { longClickElements[i]!.firstChild!.nodeValue = wholeRig[longClickElements![i].id]["nameOfFx"].toString();  }
            }

        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 53) {  //is answer to multirequest stomp D
            fxId = "lpFxD";
            startTimeFxInputs[8] = Date.now();
            for (let i = fxIndexStart; i < arrayOfFxObj.length; i++) {
                if (e.message.data[10] === arrayOfFxObj[i]["nameOfFxId"][0] && e.message.data[11] === arrayOfFxObj[i]["nameOfFxId"][1]) {
                    wholeRig![fxId] = arrayOfFxObj[i];
                    break;
                }
            }
            
            buildFxControls(fxId,3);
            prepareFxControls(fxId, e.message.data);

            //label the stomp knob
            for(let i = 0;i < longClickElements.length; i++) {
                if (longClickElements![i].id === fxId) { longClickElements[i]!.firstChild!.nodeValue = wholeRig[longClickElements![i].id]["nameOfFx"].toString();  }
            }

        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 56) {  //is answer to multirequest stomp X
            startTimeFxInputs[9] = Date.now();
            //console.log(" Stomp E " + e.message.data[26] + "#"+ e.message.data[27] );
        }

        else if (e.message.data[6] === 2 && e.message.data[8] === 58) {  //is answer to multirequest stomp X
            startTimeFxInputs[10] = Date.now();
            //console.log(" stomp x " + e.message.data[26] + "#"+ e.message.data[27] );
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 60) {  //is answer to multirequest stomp X
            startTimeFxInputs[11] = Date.now();
            //console.log(" xxxx " + e.message.data[26] + "#"+ e.message.data[27] );
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 61) {  //is answer to multirequest stomp X
            startTimeFxInputs[12] = Date.now();
            //console.log(" xxxx " + e.message.data[26] + "#"+ e.message.data[27] );
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 127) {  //is answer to multirequest stomp X
            startTimeFxInputs[13] = Date.now();
            //console.log(" xxxx " + e.message.data[26] + "#"+ e.message.data[27] );
        }

       
      
        else if (e.message.data[6] === 1 && e.message.data[8] === 10 ) {  //single request Amplifier 
            fxId = "lpFxP";
            prepareSingleSysexIns(fxId,e.message.data);

            //special handling for always visible controls
            for (let i = 0; i < arrayOfFxObj[2]["singleReqPos"].length; i++) {
                if ((arrayOfFxObj[2]["singleReqPos"][i] === e.message.data[9]) && (arrayOfFxObj[2]["adressPage"][i] === e.message.data[8]) )  {
          //          console.log("amplifier sysex single in" + mainFrontKnobs.singleReqId[i] + "####" + i);
                    let temp = calcMsbLsb(e.message.data[10],e.message.data[11],arrayOfFxObj[2],i).toString();
                    document.getElementById(arrayOfFxObj[2]["label"][i])!.innerHTML = temp + arrayOfFxObj[2]["addValue"][i];
                    (<HTMLInputElement>document.getElementById(arrayOfFxObj[2]["label"][i]))!.setValue(temp,false);
                }
            }

           
        }
        else if (e.message.data[6] === 1 && e.message.data[8] === 11 ) {  //single request Equalizer settings in
            fxId = "lpFxE";
            for (let i = 0; i < arrayOfFxObj[3]["singleReqPos"].length; i++) {
                if ( (arrayOfFxObj[3]["singleReqPos"][i] === e.message.data[9]) && (arrayOfFxObj[3]["adressPage"][i] === e.message.data[8]) ) {
                    let temp = calcMsbLsb(e.message.data[10],e.message.data[11],arrayOfFxObj[3],i).toString();
                    document.getElementById(arrayOfFxObj[3]["label"][i])!.innerHTML = temp + arrayOfFxObj[3]["addValue"][i];
                    (<HTMLInputElement>document.getElementById(arrayOfFxObj[3]["label"][i]))!.setValue(temp,false);
                }
            }
        }
        else if (e.message.data[6] === 1 && e.message.data[8] === 50 ) {  //single request FXa  in
            fxId = "lpFxA";
            //avoid single req errors when there is no fx loaded
            if (wholeRig[fxId]["nameOfFxId"][0] === 0 && wholeRig[fxId]["nameOfFxId"][1] === 0) { return; }

            prepareSingleSysexIns(fxId,e.message.data);

        }
        else if (e.message.data[6] === 1 && e.message.data[8] === 4 ) {  //single request stomps. stack fx on and off
            //console.log("single in " + e.message.data[9]);
            if (e.message.data[9] === 64) {
                stompsSwitch[0]!.setValue(e.message.data[11],false);
                stompsSwitch[1]!.setValue(e.message.data[11],false);
            }    
            if (e.message.data[9] === 65) {
                stackSwitch[0]!.setValue(e.message.data[11],false);
                stackSwitch[1]!.setValue(e.message.data[11],false);
            }  
            if (e.message.data[9] === 66) {
                effectsSwitch[0]!.setValue(e.message.data[11],false);
                effectsSwitch[1]!.setValue(e.message.data[11],false);
            }    
        
        }
        else if (e.message.data[6] === 3 ) {  //string req
            
            if (e.message.data[8] === 0 && e.message.data[9] === 1 && !perfMode) {
                let temp = e.message.data.slice(10, e.message.data.length - 2);
                currentRigname = String.fromCharCode(...temp);
                startTime = Date.now();
                startTimeFxInputs[14] = Date.now();
                perfRigsTable.setData([{ id:1, name: String.fromCharCode(...temp)}]);
              
                //perfRigsTable.setData( )
                //perfRigsTable.addData([{ id:1, name: String.fromCharCode(...temp), author: "authorx1"}]); //add new perf or rig to table
                //console.log("string in " + String.fromCharCode(...temp) );
            }
                        //console.log(String.fromCharCode(...temp));
            if (e.message.data[8] === 0 && e.message.data[9] === 2 && !perfMode) {
                startTimeFxInputs[15] = Date.now();
                let temp = e.message.data.slice(10, e.message.data.length - 2);
                perfRigsTable.setData([{ id:1, name: perfRigsTable.getData()[0].name,  author: String.fromCharCode(...temp)}]);
                //console.log("string in " + String.fromCharCode(...temp) );
            }

        }
      
            


       
        //e.preventDefault;

    });

    midiOutput = WebMidi.getOutputByName(midiOutName!);
    //midiOutput.send(0xf0,[ 0x00, 0x20, 0x33, 0x02, 0x7f, 0x42, 0x00, 0x09, 0x00, 0xf7]); //send multi req Input Section
    //midiOutput.send(0xf0,[ 0x00, 0x20, 0x33, 0x02, 0x7f, 0x42, 0x00, 0x0b, 0x00, 0xf7]); //send multi req Equalizer
    //midiOutput.send(0xf0,[ 0x00, 0x20, 0x33, 0x02, 0x7f, 0x42, 0x00, 0x0a, 0x00, 0xf7]); //send multi req Amplifier
   
    //midiOutput.send(0xf0,[ 0x00, 0x20, 0x33, 0x02, 0x7f, 0x42, 0x00, 0x32, 0x00, 0xf7]); //send multi req Stomp A
    //00 20 33 00 00 02 00 0b 00 00 01 00 01 00 01 40 00 19 1f 40 00 1b 1d 40 00 00 00 (27 bytes)
    //midiOutput.send(0xf0,[ 0x00, 0x20, 0x33, 0x00, 0x7f, 0x42, 0x00, 0x32, 0x00, 0xf7]); //send fx stomp A
    //midiOutput.send(0xf0,[ 0, 32, 51, 0, 127, 66, 0, 50, 0, 0xf7]); //send fx stomp A
    //midiOutput.sendSysex( [],[0,32,51, 0,127, 66, 0, 50, 0] ); //send fx stomp A

    
    //midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,9, 0]); //req multi req input Section
    //midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,11, 0]); //req multi req Equalizer
    //midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,10, 0]); //req multi req Amplifier
    //midiOutput.sendSysex([0,32,51,0 ],[ 127,66,0,12, 0]); //req multi req Cabinet
    //midiOutput.sendSysex([0,32,51 ],[0,127, 66, 0, 50, 0] ); //req fx stomp A
    //midiOutput.sendSysex([0,32,51,0 ],[127, 66, 0, 61, 0] ); //req fx stomp REV
    //midiOutput.sendSysex([0,32,51,0 ],[127, 66, 0, 127, 0] ); //req fx system global


    console.log("midiinname " + midiInName + "#" + midiOutput.state);
    //if (midiInName === null) {
        //alert("no midi in found");
    //    console.log("no midi in found");
        //let myModal = new Modal(document.getElementById('staticBackdrop')! , {keyboard: false});
        //myModal.show();
         
    //console.log("xxx " + midiOutName);

   
}


document.addEventListener('DOMContentLoaded',function () {


} );


//write obj to disk
//const myJSON = JSON.stringify(rigTestObj);
//localStorage.setItem("test1",myJSON);
let text = localStorage.getItem("test1");
console.log("localstorage item text" + text);

//read obj
//let newObj = JSON.parse(text?);


function paramLookup(cell) {
    //console.log(cell);
    //return {tickElement: "<i class='fa fa-check'> </i>"};
    //return {param1:"green"}
}


// document.getElementById("fxContainer1").children[0].innerHTML = 'yyy'; //set fx name 
//document.getElementById("fxContainer1").children[1].innerHTML = 'xxxx';  //set value

//for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'hidden';  } //hide rig gain on startup because we start in perf mode

let longClickElements = document.getElementsByClassName('longPress');
for(let i = 0; i < longClickElements.length; i++) {    //add longpress event listeners to fx, amplifier equalizer and cabinet
    //console.log("" + longClickElements[i].id.substring(0,1) );
    //only buttons with id starting with "lp"
    if (longClickElements[i].id.substring(0,2) === "lp") { 
        //not nice adding class longpress, but avoid it on fixed ones
        if (longClickElements[i].id !== "lpFxP" && longClickElements[i].id !== "lpFxE" && longClickElements[i].id !== "lpFxS") {
            longClickElements[i].addEventListener('long-press',triggerLongPress, true);
        }
        longClickElements[i].addEventListener('click',triggerShortPress, true);
    }
}


//listen on table long press
perfRigsTable.on("rowTapHold", function(e,row)  {
    //let temp = row.getCells();
    //console.log("##" + row.getCells()[0].getValue()); //get name of perf or rig
    //console.log("lonpgpress rig or row" + e + "#"  + "#" + "#" + row.getCells() + "#" + row.getData());
});


//show Slots for performance via remove class and read performance table when toggle "BROWSER/PEFORM"
myCollapse?.addEventListener('show.bs.collapse', function () {
    //for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'hidden';  }
    //console.log('show.bs.collapse perfrigstable' + "#" + Object.keys(this));

    perfRigsTable.setColumns( [{title:"Name", field:"name", headerHozAlign:"center" }, {title:"Author", field:"author", headerHozAlign:"center", maxWidth: 220, width: 140, minWidth: 80}]);
    perfRigsTable.clearData();
    //perfRigsTable.addData([{ id:1, name:"perf1", author: "author1"}]); //add new perf or rig to table

    perfMode = true;
});

//hide slot section for rig mode and read rig table
myCollapse?.addEventListener('hide.bs.collapse', function() {    
    //for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'hidden';  }
    //console.log('hide.bs.collapse perfrigstable' + "#" + Object.keys(this) + "##" + this.classList);
    requestRigDetails();

    //perfRigsTable.clearData();
    //perfRigsTable.addData([{ id:1, name:"rig1", author: "authorx1"}]); //add new perf or rig to table
    perfMode = false;
});

//set maxvalue of the first fx element
//fxContainers[0].children[1]["max"] = "30";

function triggerShortPress() {
   
   //console.log("trigger short press" + wholeRig[this.id].nameOfFx + "##" + this.id  + wholeRig[this.id]["label"]);

   //update label
   //document.getElementById(this.id + "0")!.children[0].innerHTML = "joo";

   //console.log("start triggershortpress " + this.id );
   if (wholeRig[this.id].nameOfFx === '') { modalParamsHeader!.innerHTML = "Off"; }
   if (wholeRig[this.id].nameOfFx !== '') { modalParamsHeader!.innerHTML = wholeRig[this.id].nameOfFx; }

   //replace value of knob, incase its not a "simple" value on open the fx
   //for(let i = 0; i < wholeRig[this.id]["textRepl"].length; i++) {
   //     console.log("trigger val:" + wholeRig[this.id]["textRepl"][i].length  + "##" + i);
   //     if (wholeRig[this.id]["textRepl"][i].length > 1) { //two elements minimum
   

    //        document.getElementById(this.id)!.children[1].innerHTML = wholeRig[this.id]["nameOfFx"];
           // wholeRig[this.id]["nameOfFx"][(<HTMLInputElement>document.getElementById(this.id)!.children[1]).value];
    //    }
        
   //}

   //hide all fx controls
    for (let i = 0;i < divFxContainers.length; i++) {
        divFxContainers[i].classList.add("d-none");
    }
   //and remove the hide class "d-none" just on the current
   document.getElementById(this.id)?.classList.remove("d-none");

   if (this.id.includes("lpFx")) {
        for (let i = 0; i < wholeRig[this.id]["label"].length; i++) {
            //console.log("triggershortpress " +  document.getElementById(this.id + i)?.children[1]);
            document.getElementById(this.id + i)?.children[1].removeEventListener("touchend",handleKnobFixElements,true);
            document.getElementById(this.id + i)?.children[1].addEventListener("touchend", handleKnobFixElements, true );
            //document.getElementById(this.id + i)!.children[1]!.setValue(5,false)
            //document.getElementById(this.id + i)!.children[1]!.innerHTML = "5";
        }

        
   }

}

function getIndexOfFx(obj: Object, id): number {
    for(let i = 0; i < obj["label"].length; i++ ) { 
        //console.log("getindexoffx " + obj["label"][i] + "#" + id.substring(5,) + "##" + i + " " + id);
        if (obj["label"][i] === id) {  return i;  }  
    }
    return -1;
}

function getAdrPageFromFxId(fxId: string): number  {
    if (fxId.includes("lpFxG")) { return 4; }
    if (fxId.includes("lpFxI")) { return 9; }
    if (fxId.includes("lpFxP")) { return 10; }
    if (fxId.includes("lpFxE")) { return 11; }
    if (fxId.includes("lpFxS")) { return 12; }
    if (fxId.includes("lpFxA")) { return 50; }     
    if (fxId.includes("lpFxB")) { return 51; }
    if (fxId.includes("lpFxC")) { return 52; }
    if (fxId.includes("lpFxD")) { return 53; }
    if (fxId.includes("lpFxX")) { return 56; }
    if (fxId.includes("lpFxM")) { return 58; }
    if (fxId.includes("lpFxD")) { return 60; }
    if (fxId.includes("lpFxR")) { return 61; }
    if (fxId.includes("lpFxR")) { return 61; }
    if (fxId.includes("lpFxU")) { return 118; }
    if (fxId.includes("lpFxL")) { return 125; }
    if (fxId.includes("lpFxY")) { return 127; }     
    return 0;
}

function handleKnobFixElements(event) {
    //when touching knobs of fx, print text instead value if defined in the fx obj
    //console.log("!!!! " + this.id + "#" + this.parentElement.id + "###");
    
    if (this.parentElement.id !== "") {
        //console.log("handleknobfixelements " + this.parentElement.id.substring(5,) + "#" );
        if (wholeRig[this.parentElement.id.substring(0,5)]["textRepl"][this.parentElement.id.substring(5,)].length > 1) {
            this.innerText =  wholeRig[this.parentElement.id.substring(0,5)]["textRepl"][this.parentElement.id.substring(5,)][this.value];
        }
        if (wholeRig[this.parentElement.id.substring(0,5)]["textRepl"][this.parentElement.id.substring(5,)].length <= 1) {
            this.innerText =  (this.value).toFixed(2) + wholeRig[this.parentElement.id.substring(0,5)]["addValue"][this.parentElement.id.substring(5,)];
        }
    }

    //if (this.parentElement.id === "") {
    //    if (wholeRig[this.id.substring(0,5)]["textRepl"][this.parentElement.id.substring(5,)].length > 1) {
    //        this.innerText =  wholeRig[this.id.substring(0,5)]["textRepl"][this.parentElement.id.substring(5,)][this.value];
    //    }
    //    if (wholeRig[this.parentElement.id.substring(0,5)]["textRepl"][this.parentElement.id.substring(5,)].length <= 1) {
    //        this.innerText =  (this.value).toFixed(2) + wholeRig[this.parentElement.id.substring(0,5)]["addValue"][this.parentElement.id.substring(5,)];
    //    }
    //}


    
    let maxFxObjToScan: number = 4; //visible objects have a name starting with "knob" 
    //equalizer is at place 4 or index 3 so it must be found until this index
    let currVal = this.value;
    //let index =  mainFrontKnobs.label.findIndex(x => x === this.id);
    let index: number = -1;

    let j: number = 0;

    if (this.id.includes("knob")) {
        //6215: 48, 119     //x30 = 48     //x47      //5190: 40, 110       //9910: 78, 4
        for (j = 0; j < maxFxObjToScan;j++ ) {
            index = getIndexOfFx(arrayOfFxObj[j],this.id.trim());
            if (index >= 0) { break;}  //we keep j as index to set obj correctly even if the are in another obj, equalizer / Amplifier / Rig
        }

        //update text on touch device
        if (arrayOfFxObj[j]["textRepl"][index].length > 1) {
            this.innerText =  arrayOfFxObj[j]["textRepl"][index][this.value];
        }
        if (arrayOfFxObj[j]["textRepl"][index].length <= 1) {
            this.innerText =  (this.value).toFixed(2) + arrayOfFxObj[j]["addValue"][index];
        }


        let modifier: number = 1625.6;
        //if it there is a negative value and symmetric
        if (parseInt(arrayOfFxObj[j]["min"][index]) < 0  && (Math.abs(parseInt(arrayOfFxObj[j]["min"][index])) ===  Math.abs(parseInt(arrayOfFxObj[j]["max"][index])))  ) {
            currVal = currVal  + Math.abs(parseInt(arrayOfFxObj[j]["max"][index])); //add e.g. 5 to the current value if the max range is -5 to 5, correspond to 0 - max (16256)
            modifier = 8128 / Math.abs(parseInt(arrayOfFxObj[j]["max"][index])); //if the value changes e.g. 0 - 1, the absulute value increases by 1625,6 (ten value steps)
            //modifier = 3251.2;
        }
        let temp1 = Math.floor((Math.abs(currVal) * modifier) >> 7);
        let temp2 = temp1* 127;
        if ( Math.floor((Math.abs(currVal) * modifier) - temp2) > 127) { temp1++; }
        let temp3 = Math.floor(Math.abs(currVal) * modifier) - (temp1 * 127);
  
        //console.log("knob: " + this.id + "#" + this.value + "#" + (this.value & 0x7f).toString(16).padStart(2,'0') + "###" + ((this.value >> 127) & 0x7f).toString(16).padStart(2,'0') );
        //console.log("knob1: " + temp1 + "#" + temp3 + "#" +  "##" + index + "##" + arrayOfFxObj[j]["adressPage"][index] + " + " + j);
        //console.log("knob2: " + ((9910 >> 7) & 0x7f) + "#" +  index    + "###" + (5190 & 0x7f).toString(16).padStart(2,'0') + "#" + ((5190 >>  7) & 0x7f).toString(16).padStart(2,'0') + 
        //    "###" + ((6215 >> 127) & 127).toString(10) + "##" + arrayOfFxObj[j]["adressPage"][index] + "#" + j);

        midiOutput.sendSysex([0,32,51,0 ],[ 127,1,0,arrayOfFxObj[j]["adressPage"][index], arrayOfFxObj[j]["singleReqPos"][index],temp1,temp3]);

        return;
    }

    if (this.parentElement.id.includes("lpFx")) {
        let adrPage: number = 0; 
        adrPage = getAdrPageFromFxId(this.parentElement.id);
       
        let tempIndex = this.id.split("fXC");
        index = tempIndex[0].substring(5,);
        //index = getIndexOfFx(wholeRig[this.parentElement.id.substring(0,5)],this.id);

        let modifier: number = 1625.6;
        //console.log("knob1: " + parseInt(wholeRig[this.parentElement.id.substring(0,5)]["min"][index] + "#" + 
        //    Math.abs(parseInt(wholeRig[this.parentElement.id.substring(0,5)]["min"][index])) + "#" + 
        //    Math.abs(parseInt(wholeRig[this.parentElement.id.substring(0,5)]["max"][index]))) + "#" + 
        //    wholeRig[this.parentElement.id.substring(0,5)]["textRepl"][index].length )
        
        //if it there is a negative value and symmetric
        if (parseInt(wholeRig[this.parentElement.id.substring(0,5)]["min"][index]) < 0  && (Math.abs(parseInt(wholeRig[this.parentElement.id.substring(0,5)]["min"][index])) ===  
                Math.abs(parseInt(wholeRig[this.parentElement.id.substring(0,5)]["max"][index])))  ) {
            currVal = currVal  + Math.abs(parseInt(wholeRig[this.parentElement.id.substring(0,5)]["max"][index])); //add e.g. 5 to the current value if the max range is -5 to 5, correspond to 0 - max (16256)
            modifier = 8128 / Math.abs(parseInt(wholeRig[this.parentElement.id.substring(0,5)]["max"][index])); //if the value changes e.g. 0 - 1, the absulute value increases by 1625,6 (ten value steps)
            //modifier = 3251.2;
        }
        //fix min 0 fx, e.g. "Mix" of WAH WAH
        if (parseInt(wholeRig[this.parentElement.id.substring(0,5)]["min"][index]) === 0 && wholeRig[this.parentElement.id.substring(0,5)]["textRepl"][index].length <= 1) {
            //currVal = currVal  + Math.abs(parseInt(wholeRig[this.parentElement.id.substring(0,5)]["max"][index]));
            modifier = 16256 / Math.abs(parseInt(wholeRig[this.parentElement.id.substring(0,5)]["max"][index])); 
        } 
        let temp1 = Math.floor((Math.abs(currVal) * modifier) >> 7);
        let temp2 = temp1* 127;
        if ( Math.floor((Math.abs(currVal) * modifier) - temp2) > 127) { temp1++; }
        let temp3 = Math.floor(Math.abs(currVal) * modifier) - (temp1 * 127);

        //console.log("knob2: " + ((9910 >> 7) & 0x7f) + "#" +  index    + "###" + (5190 & 0x7f).toString(16).padStart(2,'0') + "#" + ((5190 >>  7) & 0x7f).toString(16).padStart(2,'0') + 
        //    "###" + ((6215 >> 127) & 127).toString(10) + "##" + adrPage );
        //correct textrepl value sent out...
        if (wholeRig[this.parentElement.id.substring(0,5)]["textRepl"][index].length > 1 && wholeRig[this.parentElement.id.substring(0,5)]["max"][index] <= 127) {
            temp1 = 0;
            temp3 = currVal;
        }
        //correct the global control "knobGain" which is visible all the time especially when controlling the gain in the Amplifier stack
        if (this.parentElement.id === "lpFxP1") {
            document.getElementById(arrayOfFxObj[2]["label"][0])!.innerHTML =  currVal;
            (<HTMLInputElement>document.getElementById(arrayOfFxObj[2]["label"][0]))!.setValue(currVal,false);
        }

        midiOutput.sendSysex([0,32,51,0 ],[ 127,1,0,adrPage, wholeRig[this.parentElement.id.substring(0,5)]["singleReqPos"][index],temp1,temp3]);
        return;
    }

    //if (this.parentElement)
    //update textvalue instean of normal value if present, when touching
    for(let i = 0; i < wholeRig[this.parentElement.id.substring(0,5)]["textRepl"].length; i++) {
        //console.log("trigger val:" + wholeRig[this.parentElement.id.substring(0,5)]["textRepl"][i] + "#");
        if (wholeRig[this.parentElement.id.substring(0,5)]["textRepl"][i].length > 1) { //two elements minimum
            //console.log("trigger value" + document.getElementById(this.parentElement.id)!.children[1].value  + "####" + document.getElementById(this.parentElement.id.substring(0,5) + i )!.children[1].innerHTML);
            document.getElementById(this.parentElement.id.substring(0,5) + i )!.children[1].innerHTML =
                wholeRig[this.parentElement.id.substring(0,5)]["textRepl"][i][(<HTMLInputElement>document.getElementById(this.parentElement.id.substring(0,5) + i)!.children[1]).value];
        }
        
    }
    //let targetTouch = event.targetTouches;
}


//console.log("start" + window.screen.availHeight + "#" + window.screen.availWidth);

//catch the fixed elements by classname on all fix knobs and attach event handler just trigger on touchleave
let inputKnobFixElements = document.getElementsByClassName("inputKnobFix");
//debugger;
//for (inputKnobFixElement of inputKnobFixElements) {  
//console.log("inputknobfix " + inputKnobFixElements.length);
for(let i = 0; i < inputKnobFixElements.length; i++) {    
    //debugger;
    //console.log("inputknobfix " + i + "#" + inputKnobFixElements[i]);
    //inputKnobFixElement.addEventListener("input", handleKnobFixElements, true ); 
    inputKnobFixElements[i].addEventListener("touchend", handleKnobFixElements, true );
    //inputKnobFixElement.addEventListener("mouseup", handleKnobFixElements, true );  //support mouse unclick
}



export { bsOffCanvas, myOffcanvas, midiOutput, wholeRig, getAdrPageFromFxId}
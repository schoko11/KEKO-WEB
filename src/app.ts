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
import { FxObj } from "../src/FxObj";
import { rejects } from "assert";


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
myOffcanvas?.addEventListener('hide.bs.offcanvas', function () { this.style.visibility = "hidden"; });

kekoSettings?.addEventListener('show.bs.offcanvas', function () { this.style.visibility = "visible"; });
kekoSettings?.addEventListener('hide.bs.offcanvas', function () { this.style.visibility = "hidden"; });

const maxTime = 9999999999999;
let startTimeFxInputs: Array<number> = [maxTime,maxTime,maxTime,maxTime,maxTime,
                                        maxTime,maxTime,maxTime,maxTime,maxTime,
                                        maxTime,maxTime,maxTime,maxTime,maxTime];

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
        console.log("addeventlistener stomps" + e.target!.value + "#" + i);
        //depending on the screensize the view changes, so we also have two stomps stack, effects main switches
        if (i === 0) { stompsSwitch[1]!.setValue(e.target.value,false); }
        if (i === 1) { stompsSwitch[0]!.setValue(e.target.value,false); }
        console.log("midioutput stompswitch " + midiOutput.state);
        midiOutput.sendSysex([0,32,51,0 ],[ 127,1,0,4,64,0, e.target.value]); 
    });
}

//127,1,0,4,65,0,1 all stack on
//127,1,0,4,65,0,0 all stack off
for(let i = 0;i < stackSwitch.length; i++ ) {
    stackSwitch[i].addEventListener('change', function(e) {
        console.log("addeventlistener stack" + e.target!.value + "#" + i);
        //depending on the screensize the view changes, so we also have two stomps stack, effects main switches
        if (i === 0) { stackSwitch[1]!.setValue(e.target.value,false); }
        if (i === 1) { stackSwitch[0]!.setValue(e.target.value,false); }
        console.log("midioutput stackswitch " + midiOutput.state);
        midiOutput.sendSysex([0,32,51,0 ],[ 127,1,0,4,65,0, e.target.value]); 
    });
}

//127,1,0,4,66,0,1 all effects on
//127,1,0,4,66,0,0 all effects off
for(let i = 0;i < effectsSwitch.length; i++ ) {
    effectsSwitch[i].addEventListener('change', function(e) {
        console.log("addeventlistener effects" + e.target!.value + "#" + i);
        //depending on the screensize the view changes, so we also have two stomps stack, effects main switches
        if (i === 0) { effectsSwitch[1]!.setValue(e.target.value,false); }
        if (i === 1) { effectsSwitch[0]!.setValue(e.target.value,false); }
        console.log("midioutput stackswitch " + midiOutput.state);
        midiOutput.sendSysex([0,32,51,0 ],[ 127,1,0,4,66,0, e.target.value]); 
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
    } else {
        console.log("xxxdxd 3" + obj.label[index]);
        x1 = parseFloat( (((msb*127 + lsb) / 16256) *  obj.max[index]  ).toFixed(2)) ;
    }


    let x2 = ((msb*127 + lsb) / 8128);
    let x3 = msb*127 + lsb;
    //console.log("calcmsblsb " + x1 + "#" + x2 + "#" + x3 + "###" + obj.min[index]);
    //console.log("calcmsblsb " + ((x1 / 10) * 50)+ "#" + x2 + "#" + x3 );
    return x1.toFixed(2);
}


let mainFrontKnobs = {
    "step": ["0.1", "0.1","0.1","0.1","0.1"],
    "min": ["0", "-5","-5","-5","-5"],
    "max": ["10", "5","5","5","5","5"],
    "label": ["knobGain","knobBass","knobMids","knobTrebble","knobPresence"],
    "textRepl": [[""], [""],[""],[""],[""]],
    "nameOfFx": "Equalizer",
    "multiReqPos": [18,18,20,22,24],
    "singleReqId": [4,4,5,6,7],
    "adressPage": [10,11,11,11,11]
}


let fx0 = {    
   "step": ["0.1","0.1","1","1","1","1","0.1","0.1"],
    "min": ["0","0","-100","-100","0","0","-5","0"],
    "max": ["10","10","100","100","5","100","5","10"],
    "label": ["Manual","Peak","Pedal Range","Peak Range",  "Pedal Mode", "Mix", "Ducking",     "Volume"],
    "textRepl": [[""],[""],[""],[""],  ["Off","Touch","On","Bypass @ Stop","Bypass @ Heel", "Bypass @ Toe"],[""],[""],[""]],
    "nameOfFx": "Wah Wah",
    "nameOfFxId": ["0","1"],
    "multiReqPos": [26,28,30,114,  ,34 ,18,  116,  22]
    
    //"minVal": []
};
let fx1 = {    
    "step": ["2","10","20","1"],
     "min": ["0","0","0","2"],
     "max": ["10","50","100","22"],
     "label": ["fxpar4", "fxpar5", "fxpar6", "fxpar7"],
     "textRepl": [[""],[""],[""],[""]],
     "nameOfFx": ""
 }; 

 let fx2 = {
    "step": ["0.1"],
    "min": ["0"],
    "max": ["10"],
    "label": ["Threshold"],
    "textRepl": [[""]],
    "nameOfFx": "Noise Gate 2:1",
    "nameOfFxId": ["0","37"],
    "multiReqPos": [46]
 }

 let wholeRig = {
    "lpFxA": fx0,
    "lpFxB": fx1,
    "lpFxC": fx2, 
    "lpFxD": fx1, 
    "lpFxX": fx1, 
    "lpFxM": fx1, 
    "lpFxY": fx1, 
    "lpFxR": fx1,
   // "lpFxP": fx1, //amp 
   // "lpFxE": fx1, //eq
   // "lpFxS": fx1, //cab aka speaker   
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
for (let i = 0; i < divFxContainers.length; i++) {
    console.log(wholeRig[divFxContainers[i].id]?.label + "dddd" + divFxContainers[i].id );
    for (let j = 0; j <  wholeRig[divFxContainers[i].id]?.label.length ; j++) {
        //the 8 fx slots have 5 chars, the others are fixed
        //if (divFxContainers[i].id.length <= 5 ) { 
        //console.log(wholeRig[divFxContainers[i].id].label[j])
        if (wholeRig[divFxContainers[i].id]?.label[0] === "") { continue; }
        divFxContainers[i].innerHTML += '<div class="col border pb-4 pt-0 fxContainers" id="' + divFxContainers[i].id + j.toString() + '"> ' +
        '<label class="fw-bold fs-6 font-monospace p-1 d-flex justify-content-center">' + wholeRig[divFxContainers[i].id].label[j] + '</label>' +
        '<webaudio-knob class="fw-bold fs-6 font-monospace d-flex justify-content-center inputKnobFix" diameter=75 id="' + wholeRig[divFxContainers[i].id].label[j] + '" ' +
        'step=' + wholeRig[divFxContainers[i].id].step[j] + ' min=' + wholeRig[divFxContainers[i].id].min[j] + ' max=' + wholeRig[divFxContainers[i].id].max[j] +
         ' src="ASSETS/pots/kjLEDknob_1447_64x64_64.png" value="" >' +
        ' </webaudio-knob>  </div>';
        //console.log("xxfdfdx" + divFxContainers[0].children[0].innerHTML);
        //console.log(divFxContainers[i].children[0].children[0].children[1]);
        //divFxContainers[i].children[j].children[1].innerHTML = i.toString() + j.toString(); //set value when toogle fx

    }    
    //console.log("fds" + fxContainers[i].children[1].getAttribute("max") + fxContainers[i].id  )
}

let knob1 = document.getElementsByTagName("webaudio-knob");
let testknob = document.getElementById("Pedal Mode");


//var modalForKekoSettings = new Modal(document.getElementById('kekoSettings')!, {keyboard: false});
let kekoSetMidi= (<HTMLInputElement>document.getElementById('kekoSetMidi'));

console.log("#x#x#x"+ kekoSetMidi!.getAttributeNames());
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
    console.log('fdsfds' + this!.value +  "##"  + this.children[1].getAttributeNames());
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
                console.log("right rig 2 " + Date.now() + "###" + perfRigsTable.getData()[0].name  + "#" + currentRigname);
                await midiOutput.channels[1].sendControlChange(CCNumber,0);
                await timeout1(100);
                await requestRigDetails();
                console.log("right rig 2x " + Date.now() + "###" + perfRigsTable.getData()[0].name  + "#" + currentRigname);
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
                            console.log("rig not finally loaded " + j + "#" + startTimeFxInputs[j] + "###" + startTime );
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

async function requestRigDetails() {
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
                console.log("clicked" + midiInName + "###" + midiOutName + "##" + setDefaultMidi!.checked);
                //console.log("xxxxx" + document.getElementById('setDefaultMidi')?.hasAttribute("checked") + "");
                if (midiInName !== null && midiOutName !== null)  { resolve() };
                if (midiInName === null || midiOutName === null)  { reject("not all have been chosen") }
            })            
        );
    }
}

function setMidi() {
    WebMidi.inputs.forEach(input => {
        console.log(input.name + "fdfd ")
    }); 
    WebMidi.outputs.forEach(output => {
        console.log(output.name + "fdfd ")
    });  
    const promises: Promise<void>[] = [];
    promises.push( midiSet());

    Promise.all(promises).then((values) => {
        console.log("end" + values + " # " + setDefaultMidi!.checked);
        //store midi in and midi out in local storage
        if (setDefaultMidi!.checked) {
            localStorage.setItem("KEKO_MIDI_IN",midiInName!);
            localStorage.setItem("KEKO_MIDI_OUT", midiOutName!);
        }
        midiInput = WebMidi.getInputByName(midiInName!);
        midiOutput = WebMidi.getOutputByName(midiOutName!);
        //WebMidi.getInputByName(midiOutName!)?.channels[1].sendControlChange(48,0)
        //console.log("end2" + midiOutput.connection + "##" + midiOutput.state);
     



        rigsOrPerfRight.addEventListener('click', async () => {
            //if (await changeAndWaitForDetails(48,perfMode,startTime)) {

            //}

           
            console.log("right right pressed");
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
    
        rigsOrPerfLeft.addEventListener('click', () => {
            const startTime: number = Date.now();
            if (midiOutput.state === 'connected' && !perfMode)  { changeAndWaitForDetails(49,perfMode,startTime); }
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
    console.log("sysexin " + Object.keys(this.eventMap.sysex) + "#" + this.message.data);

}

function onEnabled() {

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
        console.log("sysexin " + e.message.data + "##" + e.message.data[6] + " " + e.message.data[8]);
        if (e.message.data[6] === 2 && e.message.data[8] === 9) {  //is answer to multirequest input
            startTimeFxInputs[0] = Date.now();
            console.log(" xxxx " + e.message.data[26] + "#"+ e.message.data[27] );
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 10) {  //is answer to multirequest Amplifier
            let arrayOfValues: string[] = [];
            startTimeFxInputs[1] = Date.now();
            for(let i = 0;i < mainFrontKnobs.step.length; i++) {
                arrayOfValues.push(calcMsbLsb(e.message.data[mainFrontKnobs.multiReqPos[i]],
                    e.message.data[mainFrontKnobs.multiReqPos[i] + 1],mainFrontKnobs,i).toString());
                    document.getElementById(mainFrontKnobs.label[i])!.innerHTML = arrayOfValues[i];
                    (<HTMLInputElement>document.getElementById(mainFrontKnobs.label[i]))!.value = arrayOfValues[i];
            }
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 11) {  //is answer to multirequest Equalizer
            let arrayOfValues: string[] = [];
            startTimeFxInputs[2] = Date.now();
            for(let i = 0;i < mainFrontKnobs.step.length; i++) {
                arrayOfValues.push(calcMsbLsb(e.message.data[mainFrontKnobs.multiReqPos[i]],
                    e.message.data[mainFrontKnobs.multiReqPos[i] + 1],mainFrontKnobs,i).toString());
                    document.getElementById(mainFrontKnobs.label[i])!.innerHTML = arrayOfValues[i];
                    (<HTMLInputElement>document.getElementById(mainFrontKnobs.label[i]))!.value = arrayOfValues[i];
            }
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 12) {  //is answer to multirequest cabinet
            startTimeFxInputs[3] = Date.now();
            console.log(" xxxx " + e.message.data[26] + "#"+ e.message.data[27] );
        }
        //multi req in 10,11: appendix b midi manual
        else if (e.message.data[6] === 2 && e.message.data[8] === 50) {  //is answer to multirequest stomp A
            startTimeFxInputs[4] = Date.now();
            let longpr = document.getElementsByClassName("longPress");
         
            //set the two stomps switches to on or off 
           // if (e.message.data[14] === 0 && e.message.data[15] === 1) {
           //     stompsSwitch[0]!.setValue(1,false);
           //     stompsSwitch[1]!.setValue(1,false);
           // }
           // if (e.message.data[14] === 0 && e.message.data[15] === 0) {
           //     stompsSwitch[0]!.setValue(0,false);
           //     stompsSwitch[1]!.setValue(0,false);
           // }

            for(let i = 0;i < longpr.length; i++) {
                if (longpr![i].id === "lpFxA") {
                    console.log("yesss " + i + "#" + longpr[i].firstChild?.nodeValue + "###" );
                    longpr[i]!.firstChild!.nodeValue = fx2.nameOfFx;
                    console.log("stomps change " );

                    //test1[0].setValue(1,false);
                    //test1[1].setValue(1,false);
                   
                    //});
                    //document.getElementById("STOMPS")![0].setValue(1,true); //nope
                }
            }
            if (e.message.data[16] === 0 && e.message.data[17] === 1 ) { //turn on stomps
                //document.getElementById("STOMPS")?.setValue(1);
            }

            //findAndLoadFx(e.message.data[10],e.message.data[11])
            //if ( (fx0.nameOfFxId[0] === e.message.data[10]) && (fx0.nameOfFxId[1] === e.message.data[11])) {
                console.log("fxa sysexin " + document.getElementsByClassName("longPress").length + "#" + fx0.nameOfFxId[0] + "#" + e.message.data[10] + e.message.data[11])
            //}
            console.log(" xxxx " + e.message.data[46] + "#"+ e.message.data[47] );
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 51) {  //is answer to multirequest stomp B
            startTimeFxInputs[5] = Date.now();
            console.log(" xxxx " + e.message.data[26] + "#"+ e.message.data[27] );
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 52) {  //is answer to multirequest stomp C
            startTimeFxInputs[6] = Date.now();
            console.log(" xxxx " + e.message.data[26] + "#"+ e.message.data[27] );
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 53) {  //is answer to multirequest stomp D
            startTimeFxInputs[7] = Date.now();
            console.log(" xxxx " + e.message.data[26] + "#"+ e.message.data[27] );
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 56) {  //is answer to multirequest stomp X
            startTimeFxInputs[8] = Date.now();
            console.log(" xxxx " + e.message.data[26] + "#"+ e.message.data[27] );
        }

        else if (e.message.data[6] === 2 && e.message.data[8] === 58) {  //is answer to multirequest stomp X
            startTimeFxInputs[9] = Date.now();
            console.log(" xxxx " + e.message.data[26] + "#"+ e.message.data[27] );
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 60) {  //is answer to multirequest stomp X
            startTimeFxInputs[10] = Date.now();
            console.log(" xxxx " + e.message.data[26] + "#"+ e.message.data[27] );
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 61) {  //is answer to multirequest stomp X
            startTimeFxInputs[11] = Date.now();
            console.log(" xxxx " + e.message.data[26] + "#"+ e.message.data[27] );
        }
        else if (e.message.data[6] === 2 && e.message.data[8] === 127) {  //is answer to multirequest stomp X
            startTimeFxInputs[12] = Date.now();
            console.log(" xxxx " + e.message.data[26] + "#"+ e.message.data[27] );
        }

       
      
        else if (e.message.data[6] === 1 && e.message.data[8] === 10 ) {  //single request Amplifier 
            for (let i = 0; i < mainFrontKnobs.singleReqId.length; i++) {
                if ((mainFrontKnobs.singleReqId[i] === e.message.data[9]) && (mainFrontKnobs.adressPage[i] === e.message.data[8]) )  {
                    console.log("amplifier sysex single in" + mainFrontKnobs.singleReqId[i] + "####" + i);
                    let temp = calcMsbLsb(e.message.data[10],e.message.data[11],mainFrontKnobs,i).toString();
                    //console.log( )
                    document.getElementById(mainFrontKnobs.label[i])!.innerHTML = temp;
                    (<HTMLInputElement>document.getElementById(mainFrontKnobs.label[i]))!.value = temp;
                }
            }
        }
        else if (e.message.data[6] === 1 && e.message.data[8] === 11 ) {  //single request Rig settings in
            for (let i = 0; i < mainFrontKnobs.singleReqId.length; i++) {
                if ( (mainFrontKnobs.singleReqId[i] === e.message.data[9]) && (mainFrontKnobs.adressPage[i] === e.message.data[8]) ) {
                    console.log("equalizer sysex single in " + mainFrontKnobs.singleReqId[i] + "#" + i);
                    let temp = calcMsbLsb(e.message.data[10],e.message.data[11],mainFrontKnobs,i).toString();
                    document.getElementById(mainFrontKnobs.label[i])!.innerHTML = temp;
                    (<HTMLInputElement>document.getElementById(mainFrontKnobs.label[i]))!.value = temp;
                }
            }
        }
        else if (e.message.data[6] === 1 && e.message.data[8] === 4 ) {  //single request stomps. stack fx on and off
            console.log("single in " + e.message.data[9]);
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
            
            //console.log(String.fromCharCode(...temp));
            if (e.message.data[8] === 0 && e.message.data[9] === 1 && !perfMode) {
                let temp = e.message.data.slice(10, e.message.data.length - 2);
                currentRigname = String.fromCharCode(...temp);
                startTime = Date.now();
                startTimeFxInputs[13] = Date.now();
                perfRigsTable.setData([{ id:1, name: String.fromCharCode(...temp)}]);
              
                //perfRigsTable.setData( )
                //perfRigsTable.addData([{ id:1, name: String.fromCharCode(...temp), author: "authorx1"}]); //add new perf or rig to table
                console.log("string in " + String.fromCharCode(...temp) );
            }
                        //console.log(String.fromCharCode(...temp));
            if (e.message.data[8] === 0 && e.message.data[9] === 2 && !perfMode) {
                startTimeFxInputs[14] = Date.now();
                let temp = e.message.data.slice(10, e.message.data.length - 2);
                perfRigsTable.setData([{ id:1, name: perfRigsTable.getData()[0].name,  author: String.fromCharCode(...temp)}]);
                console.log("string in " + String.fromCharCode(...temp) );
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


let fxNames = ["Wah Wah", "Wah Low Pass"];
let fxObjects: FxObj[] = [];
fxNames.forEach( element => {
    console.log("xxxxx" + element);   
    fxObjects.push(new FxObj(element)); 
})
//let fxObj1 = new FxObj("Wah Wah");


console.log(" fxObj1 " + Object.keys(fxObjects[0]) + "#" + fxObjects[0].name + "#");

//write obj to disk
//const myJSON = JSON.stringify(rigTestObj);
//localStorage.setItem("test1",myJSON);
let text = localStorage.getItem("test1");
console.log("localstorage item text" + text);

//read obj
//let newObj = JSON.parse(text?);
//console.log("newobj" + newObj.fxA.name);


function paramLookup(cell) {
    console.log(cell);
    //return {tickElement: "<i class='fa fa-check'> </i>"};
    //return {param1:"green"}
}


// document.getElementById("fxContainer1").children[0].innerHTML = 'yyy'; //set fx name 
//document.getElementById("fxContainer1").children[1].innerHTML = 'xxxx';  //set value

//for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'hidden';  } //hide rig gain on startup because we start in perf mode

let longClickElements = document.getElementsByClassName('longPress');
console.log(longClickElements.length);
for(let i = 0; i < longClickElements.length; i++) {    //add longpress event listeners to fx, amplifier equalizer and cabinet
    //console.log("" + longClickElements[i].id.substring(0,1) );
    //only buttons with id starting with "lp"
    if (longClickElements[i].id.substring(0,2) === "lp") { 
        longClickElements[i].addEventListener('long-press',triggerLongPress, true); 
        longClickElements[i].addEventListener('click',triggerShortPress, true);
    }
}






//listen on table long press
perfRigsTable.on("rowTapHold", function(e,row)  {
    //let temp = row.getCells();
    //console.log("##" + row.getCells()[0].getValue()); //get name of perf or rig
    console.log("lonpgpress rig or row" + e + "#"  + "#" + "#" + row.getCells() + "#" + row.getData());
});


//show Slots for performance via remove class and read performance table when toggle "BROWSER/PEFORM"
myCollapse?.addEventListener('show.bs.collapse', function () {
    //for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'hidden';  }
    console.log('show.bs.collapse perfrigstable' + "#" + Object.keys(this));

    perfRigsTable.setColumns( [{title:"Name", field:"name", headerHozAlign:"center" }, {title:"Author", field:"author", headerHozAlign:"center", maxWidth: 220, width: 140, minWidth: 80}]);
    perfRigsTable.clearData();
    //perfRigsTable.addData([{ id:1, name:"perf1", author: "author1"}]); //add new perf or rig to table

    perfMode = true;
});

//hide slot section for rig mode and read rig table
myCollapse?.addEventListener('hide.bs.collapse', function() {    
    //for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'hidden';  }
    console.log('hide.bs.collapse perfrigstable' + "#" + Object.keys(this) + "##" + this.classList);
    requestRigDetails();

    //perfRigsTable.clearData();
    //perfRigsTable.addData([{ id:1, name:"rig1", author: "authorx1"}]); //add new perf or rig to table
    perfMode = false;
});

//set maxvalue of the first fx element
//fxContainers[0].children[1]["max"] = "30";

function triggerShortPress() {
   //debugger;

   //wholeRig["lpFxA"] = fx1;
   
   console.log( Object.keys(modalParamsHeader!.innerText ) + "##" + this.id  + wholeRig[this.id]["label"]);

   //update label
   //document.getElementById(this.id + "0")!.children[0].innerHTML = "joo";

   //wholeRig[this.id]["label"]  //array of fx name where to 
   document.getElementById("lpFxA0")!.children[1].innerHTML = "fds";
   //document.getElementById("lpFxA1")!.children[1].setValue(3,true);
   //document.getElementById(wholeRig[this.id]["label"][0])!.setValue(3,true);

   console.log("innerhtml fx" + document.getElementById("lpFxA0")?.children[1].nodeName);
   console.log("innerhtml fx" + document.getElementById("lpFxA0")?.children[1].classList );
   console.log("innerhtml fx" + wholeRig[this.id]["textRepl"].length);



   //replace value of knob, incase its not a "simple" value on open the fx
   for(let i = 0; i < wholeRig[this.id]["textRepl"].length; i++) {
        console.log("trigger val:" + wholeRig[this.id]["textRepl"][i] + "#" + wholeRig[this.id]["textRepl"][i].length );
        if (wholeRig[this.id]["textRepl"][i].length > 1) { //two elements minimum
           
            document.getElementById(this.id + i)!.children[1].innerHTML = wholeRig[this.id]["textRepl"][i][(<HTMLInputElement>document.getElementById(this.id + i)!.children[1]).value];
        }
        
   }

   //hide all fx controls
    for (let i = 0;i < divFxContainers.length; i++) {
        divFxContainers[i].classList.add("d-none");
    }
   //and remove the hide class "d-none" just on the current
   document.getElementById(this.id)?.classList.remove("d-none");

   let objtest1 = document.getElementById("fxContainer" + "0");
   let objtest = document.getElementById("lpFxA" + "0")?.children[1]
   if (this.id.includes("lpFx")) {
        console.log("fffff" +  document.getElementById("fxContainer" + "0")?.children[1].innerHTML);
        objtest1?.setAttribute("value","test");
        //objtest!.setAttribute("step","15");
        //objtest!.innerHTML = 'fds';
   }

   //modalParamsHeader?.innerText = "test";  //set text of modal header to id "modalParamsHeader"
   modalParamsHeader!.innerHTML = wholeRig[this.id].nameOfFx;

}

function handleKnobFixElements(event) {
    //debugger;
    //event.preventDefault();
    //assign value
    //this.innerText = Number((this.value).toFixed(3));
    this.innerText =  (this.value).toFixed(2);


    console.log("trigger val1:" + this.parentElement.id.substring(0,5) + "#" + this.value + "###" );
    

    if (this.id.includes("knob")) {
        //6215: 48, 119
         //x30 = 48
         //x47
        //5190: 40, 110
        //9910: 78, 4
        //
        let currVal = this.value;
        let index = mainFrontKnobs.label.findIndex(x => x === this.id);

        let modifier: number = 1625.6;
        //if it there is a negative value and symmetric
        if (parseInt(mainFrontKnobs.min[index]) < 0  && (Math.abs(parseInt(mainFrontKnobs.min[index])) ===  Math.abs(parseInt(mainFrontKnobs.max[index])))  ) {
            currVal = currVal  + Math.abs(parseInt(mainFrontKnobs.max[index])); //add e.g. 5 to the current value if the max range is -5 to 5, correspond to 0 - max (16256)
            modifier = 8128 / Math.abs(parseInt(mainFrontKnobs.max[index])); //if the value changes e.g. 0 - 1, the absulute value increases by 1625,6 (ten value steps)
            //modifier = 3251.2;
        }
        let temp1 = Math.floor((Math.abs(currVal) * modifier) >> 7);
        let temp2 = temp1* 127;
        if ( Math.floor((Math.abs(currVal) * modifier) - temp2) > 127) { temp1++; }
        let temp3 = Math.floor(Math.abs(currVal) * modifier) - (temp1 * 127);

          
        //console.log("knob: " + this.id + "#" + this.value + "#" + (this.value & 0x7f).toString(16).padStart(2,'0') + "###" + ((this.value >> 127) & 0x7f).toString(16).padStart(2,'0') );
        console.log("knob1: " + temp1 + "#" + temp3 + "#" + (Math.abs(this.value) * modifier) + "##");
        console.log("knob2: " + ((9910 >> 7) & 0x7f) + "#" +  index    + "###" + (5190 & 0x7f).toString(16).padStart(2,'0') + "#" + ((5190 >>  7) & 0x7f).toString(16).padStart(2,'0') + "###" + ((6215 >> 127) & 127).toString(10) );

        midiOutput.sendSysex([0,32,51,0 ],[ 127,1,0,mainFrontKnobs.adressPage[index], mainFrontKnobs.singleReqId[index],temp1,temp3]);

        return;
    }

    //if (this.parentElement)
    //update textvalue instean of normal value if present, when touching
    for(let i = 0; i < wholeRig[this.parentElement.id.substring(0,5)]["textRepl"].length; i++) {
        //console.log("trigger val:" + wholeRig[this.parentElement.id.substring(0,5)]["textRepl"][i] + "#");
        if (wholeRig[this.parentElement.id.substring(0,5)]["textRepl"][i].length > 1) { //two elements minimum
            //console.log("trigger value" + document.getElementById(this.parentElement.id)!.children[1].value  + "####" + document.getElementById(this.parentElement.id.substring(0,5) + i )!.children[1].innerHTML);
            document.getElementById(this.parentElement.id.substring(0,5) + i )!.children[1].innerHTML = wholeRig[this.parentElement.id.substring(0,5)]["textRepl"][i][(<HTMLInputElement>document.getElementById(this.parentElement.id.substring(0,5) + i)!.children[1]).value];
        }
        
    }
    console.log("handleknobfixelements " + this.id + "#" + this.value +  "#" + this.max + "#" + this.step + "#" + this.parentElement.id );
    let targetTouch = event.targetTouches;
    //debugger;
    let temp = this.id;
    if (this.parentElement.id !== "") {  
        if (this.parentElement.id === "fxContainer5") {
            console.log("fxcontainer5 " + this.getAttribute("max") );
            //this!.setAttribute("max","500");  
        }
    }


}


//console.log("start" + window.screen.availHeight + "#" + window.screen.availWidth);

console.log("inputknobfix " + document.getElementsByClassName("inputKnobFix").length);
//catch the fixed elements by classname on all fix knobs and attach event handler just trigger on touchleave
let inputKnobFixElements = document.getElementsByClassName("inputKnobFix");
//debugger;
//for (inputKnobFixElement of inputKnobFixElements) {  
console.log("inputknobfix " + inputKnobFixElements.length);
for(let i = 0; i < inputKnobFixElements.length; i++) {    
    //debugger;
    //inputKnobFixElement.addEventListener("input", handleKnobFixElements, true ); 
    inputKnobFixElements[i].addEventListener("touchend", handleKnobFixElements, true );
    //inputKnobFixElement.addEventListener("mouseup", handleKnobFixElements, true );  //support mouse unclick
}



export { bsOffCanvas, myOffcanvas}
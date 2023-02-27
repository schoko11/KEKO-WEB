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


WebMidi
    .enable({sysex: true})
    .then(onEnabled)
    .catch(err => alert("Error " + err));

//this is trigger from relevant longpress buttons
//function triggerLongPress() {
//    console.log("longpress " + "#" + this.id + "###" + document?.getElementById("offCanvasBottomLabel")?.attributes + "###" + document?.getElementById("offCanvasBottomLabel")?.innerText);
//    document?.getElementById("offCanvasBottomLabel")?.setAttribute("inner.Text","hugoooo");
    //bsOffCanvas.show();
//}
//let kemperMidiOut = WebMidi
//    .enable({sysex:true}) 
//    .then(function () {
//        WebMidi.inputs.forEach(inputs => {
//            console.log("###" + inputs.manufacturer, inputs.name);
//        });
//        inAndOut++;
//        kemperMidiOut = WebMidi.getOutputByName("WIDI Master OUT")  
//        console.log(kemperMidiOut);
//        console.log("active");       
//        //kemperMidiOut.channels[1].sendControlChange(48,0);

//        return kemperMidiOut;
//    })         
//    .catch(err => alert(err));

//let kemperMidiIn = WebMidi
//    .enable({sysex:true}) 
//    .then(function () {
//        kemperMidiIn = WebMidi.getOutputByName("WIDI Master In")  
//        console.log("then in" + kemperMidiOut)
//        return kemperMidiOut
//    })         
//    .catch(err => alert(err));    

//function to send midi out with async await, because of asynchronity of a promise
//const sendKemperMidiOut = async (typ,par1,par2) => {
//    const out = await kemperMidiOut;
//    if (typ === 'CC') {
//        out.channels[1].sendControlChange(par1,par2)
//    }
//    console.log("async await" + out)
//}

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
    console.log("before setmidi " + midiInName + "#" + selectMidiIn.innerHTML)
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
    //var options = temp!.querySelector("selected");
    console.log('fdsfds' + this!.value +  "##"  + this.children[1].getAttributeNames());
    if (this.children.length > 1) {

        if (this.children[1].getAttributeNames().includes("output")) { //we added input on midi in and output on midi output
            console.log("midi output found")
            if (this!.value !== "Choose...") { midiOutName = this.value; }
        }
        if (midiInName !== null && midiOutName !== null && this!.value !== "Choose..." ) {  midiModalClose?.removeAttribute("disabled"); }
        if (this.value === "Choose...") {  midiModalClose?.setAttribute("disabled",""); }
    }
});


async function midiSet() {
    console.log("in midiset " + midiInName + "#" + midiOutName );
  
    if (midiInName === null || midiOutName === null) {
        //alert("no midi in found");
        console.log("midi in and or midi out not set");
        //let myModal = new Modal(document.getElementById('staticBackdrop')! , {keyboard: false});
        //myModal.show();
 
        modalTitle!.textContent = 'Please choose midiin and midiout';
        
        WebMidi.inputs.forEach(input => {
            console.log(input + " " + WebMidi.inputs.length);
            selectMidiIn!.innerHTML += '<option ' + "input" + ' value="' + input.name + '">' + input.name + '</option>';
        });    
            
        WebMidi.outputs.forEach( output => {
            console.log(output + " " + WebMidi.outputs.length)
            selectMidiOut!.innerHTML += '<option ' + "output" + ' value="' + output.name + '">' + output.name + '</option>';
        });    
            
        modalForMidiConn.show();

        return new Promise<void>((resolve,reject) => 
            document.getElementById('midiClose')?.addEventListener('click', () => {
                console.log("clicked" + midiInName + "###" + midiOutName + "##" + setDefaultMidi!.checked);
                console.log("xxxxx" + document.getElementById('setDefaultMidi')?.hasAttribute("checked") + "");
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
        console.log("end2" + midiOutput.connection + "##" + midiOutput.state);
        rigsOrPerfRight.addEventListener('click', () => {
            if (midiOutput.state === 'connected' && !perfMode) midiOutput.channels[1].sendControlChange(48,0); //rig right
        })

        rigsOrPerfLeft.addEventListener('click', () => {
            if (midiOutput.state === 'connected' && !perfMode) midiOutput.channels[1].sendControlChange(49,0); //rig left
        })


        //window.location.reload();
        //document.location.reload();
      }).catch( (err) => {
        console.log("uhh" + err);
      });


}

function onEnabled() {

    //(async () => {
        //Object.keys({midiInName})[0]
    //    await midiSet(midiInName!, "midiInName");
    //    await midiSet(midiOutName!, "midiOutName");

    //})();

    setMidi(); //if midi in and out are not set request them via modal popup


    console.log("midiinname " + midiInName);
    //if (midiInName === null) {
        //alert("no midi in found");
    //    console.log("no midi in found");
        //let myModal = new Modal(document.getElementById('staticBackdrop')! , {keyboard: false});
        //myModal.show();
 
    //    if (selectMidi!.children.length > 1) {
    //        for (let i = 1; i < selectMidi!.children.length; i++) {
    //            selectMidi!.children[i].remove();
    //        }
    //    }


        //var modalBodyInput = chooseMidiConnModal?.querySelector('.modal-body input');
    //    modalTitle!.textContent = 'Please choose Midi in';
        
    //    WebMidi.inputs.forEach( input => {
    //        selectMidi!.innerHTML += '<option ' + "input" + ' value="' + input.name + '">' + input.name + '</option>';
    //    });

        
    console.log("xxx " + midiOutName);

    //if (midiOutName === null) {
            //if we appended options to choose from we remove all except choose...
    //        console.log("xxx out " + selectMidi?.children.length);
    //    if (selectMidi!.children.length > 1) {
    //        for (let i = 1; i < selectMidi!.children.length; i++) {
    //            selectMidi!.children[i].remove();
    //        }
    //    }
    //    modalTitle!.textContent = 'Please choose Midi in';
        
    //    WebMidi.outputs.forEach( output => {
    //        selectMidi!.innerHTML += '<option ' + "output" + ' value="' + output.name + '">' + output.name + '</option>';
    //    });

    //    modalForMidiConn.show();
        
    //    console.log("##" + selectMidi!.children.length + selectMidi!.children[0]);
    //}

    //debugger;
    //WebMidi.outputs.forEach(output =>  {
    //    console.log("out " + output.manufacturer + "#" + output.name);
       // alert("output " + output.name);
    //});
    
    

    //midiOut = WebMidi.getOutputByName["Fireface UCX (23654150) Port 1"];
    //midiIn = WebMidi.getInputByName("Fireface UCX (23654150) Port 1");
   
    //console.log("midin " + midiIn + "#" + WebMidi);
    //midiIn.addListener("sysex", e => {
        //alert("sysex in " + Object.keys(e));
    //    console.log("sysex in" + e.message.statusByte+ "#" + e.message.rawDataBytes + "#" + e.dataBytes );
    //})
    //e.message.statusByte:240
    //e.message.statusrawDataBytes and //e.message.dataBytes equal: 
    //0,0,1,0,11,4,2,11  //kemper bass
    //          id,highbyte, lowbyte
    //0,0,1,0,4,64,0,0  //kemper stomp A OFF
    //0,0,1,0,4,64,0,1  //kemper stomp A ON
    //0,0,1,0,4,1  //kemper rig vol
    //0,0,1,0,9,3  //kemper noise gate 
    //0,0,1,0,10,4  //kemper gain
    //0,0,1,0,11,4  //kemper bass
    //0,0,1,0,11,5  //kemper middle
    //0,0,1,0,11,5  //kemper middle
    //0,0,1,0,11,6  //kemper trebble
    //0,0,1,0,11,7  //kemper presence
    //0,0,1,0,11,5  //kemper middle
    //0,0,1,0,60,69  //kemper delay mix
    //0,0,1,0,60,93  //kemper delay feedback
    //0,0,1,0,61,93  //kemper time reverb
    //0,0,1,0,61,69  //kemper mix reverb
    //0,0,1,0,11,5  //kemper middle

    //console.log(kemperMidiOut);
    //kemperMidiIn = WebMidi.inputs[0];
    //WebMidi.inputs[0].addListener("sysex", (e) => {
        //debugger;
    //    alert("sysex in" + Object.keys(e));
    //    alert("#" + e.message + "##" + e.rawData + "###" + e.type + "####" + e.dataBytes + "#####" + e.statusByte);
    //    console.log("sysex in:" + Object.keys(e));
    //    console.log("#" + e.message + "##" + e.rawData + "###" + e.type + "####" + e.dataBytes + "#####" + e.statusByte);
    //});
   
}

//element.addEventListener('change',() => sendKemperMidiOut('CC',48,0))
//const event = new Event('change')
//element.dispatchEvent(event)

//set gain value of rig
//rigGain1.value = 10;

//document.getElementById("example").attributes.DataTable();
//let doc = document.getElementById('example');
//console.log(Object.keys($('#example')) + "#" + Object.keys(document.getElementById('example').attributes ));
//console.log($('#example') + "#"  + $('#example')[0] + "##" +  document.getElementById('example') + "##"  );

document.addEventListener('DOMContentLoaded',function () {

} );



let rigTestObj = {
    "fxA" : {
        "name": "wah wah",
        "params": ["delay","gain" ], 
        "gain": 3,
        "bass" : 3,
        "middle": 5,
        "trebble": 2,
        "presence": 7,
        "rigvol": 4
    }
}

let fxNames = ["Wah Wah", "Wah Low Pass"];
let fxObjects: FxObj[] = [];
fxNames.forEach( element => {
    console.log("xxxxx" + element);   
    fxObjects.push(new FxObj(element)); 
})
//let fxObj1 = new FxObj("Wah Wah");


console.log(" fxObj1 " + Object.keys(fxObjects[0]) + "#" + fxObjects[0].name + "#");

//write obj to disk
const myJSON = JSON.stringify(rigTestObj);
localStorage.setItem("test1",myJSON);
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

//let perfModes = document.getElementsByClassName("perfMode");
//let rigModeMeters = document.getElementsByClassName("rigMode");
//let elementsToHide = document.getElementsByClassName("toHide");
//let fxContainers = document.getElementsByClassName("fxContainers");


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


let fxContainers = document.getElementsByClassName('fxContainers');



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
    perfRigsTable.addData([{ id:1, name:"perf1", author: "author1"}]); //add new perf or rig to table

    perfMode = true;
});

//hide slot section for rig mode and read rig table
myCollapse?.addEventListener('hide.bs.collapse', function() {    
    //for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'hidden';  }
    console.log('hide.bs.collapse perfrigstable' + "#" + Object.keys(this) + "##" + this.classList);

    perfRigsTable.clearData();
    perfRigsTable.addData([{ id:1, name:"rig1", author: "authorx1"}]); //add new perf or rig to table
    perfMode = false;
});

//set maxvalue of the first fx element
//fxContainers[0].children[1]["max"] = "30";

function triggerShortPress() {
   //debugger;
   console.log( Object.keys(modalParamsHeader!.innerText ) + "##" + this.id );
   //modalParamsHeader?.innerText = "test";  //set text of modal header to id "modalParamsHeader"
   modalParamsHeader!.innerHTML = "innerText";
   //console.log(fxContainers[0].children[1].getAttribute("max"));
   for (let i = 0; i < fxContainers.length; i++) {
        //console.log(fxContainers[i].id + "###" + fxContainers[i].classList.add("d-none"));
   }
   //modalParamsHeader!.children[0].innerHTML = 'firstFx'; //set fx name 
   //modalParamsHeader!.children[1].innerHTML = "4";
   //modalParamsHeader!.children[2].innerHTML = "fx 2";

}

function handleKnobFixElements(event) {
    //debugger;
    //event.preventDefault();
    console.log("handleknobfixelements " + this.id + "#" + this.value +  "#" + this.parentElement.id + "#" + event.touchend );
    let targetTouch = event.targetTouches;
    //debugger;
    let temp = this.id;
    if (this.parentElement.id === "") {     //fixed knob elements no need to dynamically assign 
    }
    if (this.parentElement.id !== "") {     // variable fx knobs elements 
    }

    //assign value
    this.innerText = this.value;
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


//catch the variable input fx elements and attach event handler
let inputKnobVarFxElements = document.getElementsByClassName("fxContainers");
//debugger;
//for (inputKnobVarFxElement of inputKnobVarFxElements) {  
for(let i = 0; i < inputKnobVarFxElements.length; i++) { 
    //inputKnobVarFxElement.children[1].addEventListener("input", handleKnobFixElements, true ); 
    inputKnobVarFxElements[i].children[1].addEventListener("touchend", handleKnobFixElements, true ); 
    //inputKnobVarFxElement.children[1].addEventListener("touseup", handleKnobFixElements, true ); //support mouse unclick 
}

export { bsOffCanvas, myOffcanvas}
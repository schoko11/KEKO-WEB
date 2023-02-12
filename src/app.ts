//const {WebMidi} = require("webmidi");
import {WebMidi} from "webmidi";
import {TabulatorFull} from "tabulator-tables";
import './popper.min.js';
const webaudio = require('../src/webaudio-controls.min.cjs');  //add as cinnibjs module otherwise esbuild will complain
//https://esbuild.github.io/content-types/
const longpress = require('../src/long-press-event.min.cjs');
//when starting the browser locally with --allow-file-access-from-files you can open index.html and it will load JS without CORS errors

import { Offcanvas } from '../src/bootstrap.esm.min.js';
//import {Alert, Button, Carousel, Collapse, Dropdown, Modal, Offcanvas, Popover, ScrollSpy, Tab, Toast, Tooltip} from "bootstrap"
//import * as bootstrap from "bootstrap"
//import bootstrap from 'bootstrap'
//import bootstrap  from "../JS/bootstrap.bundle.min.js"
//const {Webmidi} = require("webmidi")
//import {} from "./webaudio-controls.js"

let inAndOut = 0;

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

WebMidi
    .enable({sysex: true})
    .then(onEnabled)
    .catch(err => alert("Error " + err));


//(async (kemperMidi) => {
//    try {
//        kemperInit(await kemperMidi);
//        //await kemperMidiOut;
//    } catch (err) {
//        console.log(err);
//    }
//})(kemperMidi);


//sendKemperMidiOut('CC',48,0);

function test() {
    //alert("sysex in detected" + this + "#" + this.message + "##" + this.dataBytes + "#####");
    console.log("sysex in")
}

function onEnabled() {
    //Object.keys(obj);
    let midiOut;
    let midiIn;
    //alert("WebMidi activated");
    //WebMidi.inputs[1].addListener("sysex",test);
    WebMidi.inputs.forEach(input => {
        console.log(input.manufacturer + "#" + input.name);
        //alert("input" + input.name + "#" + Object.keys(input));      
    });
        
    //debugger;
    WebMidi.outputs.forEach(output =>  {
        console.log(output.manufacturer + "#" + output.name);
       // alert("output " + output.name);
    });
    midiOut = WebMidi.getOutputByName["Fireface UCX (23654150) Port 1"];
    midiIn = WebMidi.getInputByName("Fireface UCX (23654150) Port 1");
   
    console.log("midin " + midiIn + "#" + WebMidi);
    midiIn.addListener("sysex", e => {
        //alert("sysex in " + Object.keys(e));
        console.log("sysex in" + e.message.statusByte+ "#" + e.message.rawDataBytes + "#" + e.dataBytes );
    })
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

    //alert("kempermidiout keys:" + Object.keys(kemperMidiOut));
    //console.log(kemperMidiOut);
    //alert("kemperMidiIn1:" + kemperMidiIn);
    //kemperMidiIn = WebMidi.inputs[0];
    //alert("kemperMidiIn2:" + kemperMidiIn);
    //WebMidi.inputs[0].addListener("sysex", (e) => {
        //debugger;
    //    alert("sysex in" + Object.keys(e));
    //    alert("#" + e.message + "##" + e.rawData + "###" + e.type + "####" + e.dataBytes + "#####" + e.statusByte);
    //    console.log("sysex in:" + Object.keys(e));
    //    console.log("#" + e.message + "##" + e.rawData + "###" + e.type + "####" + e.dataBytes + "#####" + e.statusByte);
    //});
    //alert("kempermidiin keys1:" + Object.keys(kemperMidiIn.eventMap));
    //alert("kempermidiin keys2:" + Object.keys(kemperMidiIn._midiInput) + "#" + Object.keys(kemperMidiIn.channels));
   
}
 //alert("browser or node " + WebMidi.Utilities.isBrowser + "#" + WebMidiUtilities.isNode);

//element.addEventListener('change',() => sendKemperMidiOut('CC',48,0))
//const event = new Event('change')
//element.dispatchEvent(event)

let perfRigsTableData = [{  id:1, name:"perf1", author: "author1" }];

let perfRigsTable = new TabulatorFull('#perfRigsTablex', {
       
    //autoColumns:true,
    layout: "fitColumns", //alternative: fitData
    //resizableColumnFit: true,
    columns: [
        {title:"Name", field:"name" , headerHozAlign:"center"
        //,
        //    cellClick:function(e, cell) {
        //        let value = cell.getValue();
        //        cell.getElement().style.color = "#3FB449";
        //        return value;
        //    }
        },
        {title:"Author", field:"author" , headerHozAlign:"center", maxWidth: 220, width: 140, minWidth: 80}
        ],
    reactiveData: true,
    //pagination:"local",
    paginationSize: 7,
    rowHeight: 50,
    //columnDefaults: { height: 100 },
    //minHeight: "30%",
    //maxHeight: "40%",
    //height: "25%",
    footerElement: "<button> Details</button>",
    data: perfRigsTableData

} );

//perfRigsTable.clearData();

//perfRigsTable.addData([{ id:1, name:"perf1", author: "author1"}]); //add new perf or rig to table

let modalNameMapping = {
    lpFxAHeader: "Fx Stomp A",
    lpFxBHeader: "Fx Stomp B",
    lpFxCHeader: "Fx Stomp C",
    lpFxDHeader: "Fx Stomp D",
    lpFxXHeader: "Fx Stomp X",
    lpFxMHeader: "Fx Stomp M",
    lpFxYHeader: "Fx Stomp Y",
    lpFxRHeader: "Fx Stomp R",
    lpAmplifierHeader: "Amplifier",
    lpEqualizerHeader: "Equalizer",
    lpCabinetHeader: "Cabinet"
}

let myOffcanvas = document.getElementById("offCanvasBottom");
//let bsOffCanvas = document.getElementById("myOffcanvas");
let bsOffCanvas = new Offcanvas(myOffcanvas!);


let modalParamsHeader = document.getElementById("modalParamsHeader");

//this is trigger from relevant longpress buttons
function triggerLongPress() {

     console.log("longpress " + "#" + this.id + "###" + document?.getElementById("offCanvasBottomLabel")?.attributes + "###" + document?.getElementById("offCanvasBottomLabel")?.innerText);
    //button.removeEventListener('long-press', once);
    //offCanvasBottomLabel.innerText = "xxx";
    document?.getElementById("offCanvasBottomLabel")?.setAttribute("inner.Text","hugoooo");
    bsOffCanvas.show();
    
}

//set gain value of rig
//rigGain1.value = 10;

//document.getElementById("example").attributes.DataTable();
//let doc = document.getElementById('example');
//console.log(Object.keys($('#example')) + "#" + Object.keys(document.getElementById('example').attributes ));
//console.log($('#example') + "#"  + $('#example')[0] + "##" +  document.getElementById('example') + "##"  );

document.addEventListener('DOMContentLoaded',function () {

  

} );




let fxTable = new TabulatorFull('#fxTable', {       
    //autoColumns:true,
    layout: "fitColumns", //alternative: fitData
    //resizableColumnFit: true,
    columns: [
        {title:"Name", field:"name", headerFilter:"input",
            cellClick:function(e, cell) {
                alert("cell clicked " + cell.getValue() + Object.keys(cell) + "###" + this )
                let value = cell.getValue();
                this.addEventListener('long-press',triggerLongPress, true);
                cell.getElement().style.color = "#3FB449";
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
        {id: 2, name:"Wah low pass", category: "Wah"},
        {id: 3, name:"Wah high pass", category: "Wah"},
        {id: 4, name:"Wah Vowel filter", category: "Wah"},
        {id: 5, name:"Wah Phaser", category: "Wah"},
        {id: 6, name:"Wah Flanger", category: "Wah"},
        {id: 7, name:"Wah Rate Reducer", category: "Wah"},
        {id: 8, name:"Wah Ring Modulator", category: "Wah"},
        {id: 9, name:"Wah Formant Modulator", category: "Wah"},
        {id: 10, name:"Kemper Drive", category: "Distortion"},
        {id: 11, name:"Green Scream", category: "Distortion"},
        {id: 12, name:"Plus DS", category: "Distortion"},
        {id: 13, name:"One DS", category: "Distortion"}
    ]
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


//write obj to disk
const myJSON = JSON.stringify(rigTestObj);
localStorage.setItem("test1",myJSON);
let text = localStorage.getItem("test1");

//read obj
//let newObj = JSON.parse(text?);
//console.log("newobj" + newObj.fxA.name);


function paramLookup(cell) {
    console.log(cell);
    //return {tickElement: "<i class='fa fa-check'> </i>"};
    //return {param1:"green"}
}

let perfModes = document.getElementsByClassName("perfMode");
let rigModeMeters = document.getElementsByClassName("rigMode");
let elementsToHide = document.getElementsByClassName("toHide");
//let fxContainers = document.getElementsByClassName("fxContainers");

//console.log("fxcontainer" + document.getElementById("fxContainer1").nextSibling.nodeName );

//let fxtemps = document.getElementById("fxContainer1").children;
//console.log(fxtemps[1].innerHTML);
// console.log(document.getElementById("fxContainer1").children[0].innerHTML + "## " + document.getElementById("fxContainer1").children[1].innerHTML);

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
document?.getElementById('perfRigsTable')?.addEventListener('show.bs.collapse', function () {
    //for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'hidden';  }
    console.log('show.bs.collapse perfrigstable' + "#" + this.Tabulator);
    //rigTableElement.classList.remove("show");
    for (let elementToHide of elementsToHide) { 
        console.log(Object.keys(elementToHide)); 
        //elementToHide.setAttribute("style.display",'inherit');
        elementToHide.classList.remove("d-none");
    }
    perfRigsTable.setColumns( [{title:"Name", field:"name", headerHozAlign:"center" }, {title:"Author", field:"author", headerHozAlign:"center", maxWidth: 220, width: 140, minWidth: 80}]);
    perfRigsTable.clearData();
    perfRigsTable.addData([{ id:1, name:"perf1", author: "author1"}]); //add new perf or rig to table

});

//hide slot section for rig mode and read rig table
document?.getElementById('perfRigsTable')?.addEventListener('hide.bs.collapse', e => {
    //for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'hidden';  }
    for (let elementToHide of elementsToHide) { elementToHide.classList.add("d-none"); }
    console.log('hide.bs.collapse perfrigstable' + "#"  );
    //rigTableElement.classList.add("show");
    perfRigsTable.clearData();
    perfRigsTable.addData([{ id:1, name:"rig1", author: "authorx1"}]); //add new perf or rig to table
});


function triggerShortPress() {
   //debugger;
   modalParamsHeader?.setAttribute("innerText" , modalNameMapping[this.id + "Header"]);  //set text of modal header to id "modalParamsHeader"
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


console.log("start" + window.screen.availHeight + "#" + window.screen.availWidth);

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


//show or hide all fxContainers
//for(fxContainer of fxContainers) {
    //fxContainer.style.display = 'none';
    //fxContainer.style.display = 'inline';
//}

//export {}

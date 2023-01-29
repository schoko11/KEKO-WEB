//const {WebMidi} = require("webmidi");
import {WebMidi} from "./webmidi.esm.min.js";
import {TabulatorFull} from "./tabulator_esm.min.js";
//import {Alert,Button,Carousel,Collapse,Dropdown,Modal,Offcanvas,Popover,ScrollSpy,Tab,Toast,Tooltip} from "../JS/bootstrap.esm.min.js"
//import bootstrapBundle from "../JS/bootstrap.bundle.min.js"
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

const kemperMidi = WebMidi
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

function test(e) {
    alert("sysex in detected" + e.message + "##" + e.rawData + "###" + e.type + "####" + e.dataBytes + "#####" + e.statusByte);
}

function onEnabled() {
    //Object.keys(obj);
    let kemperMidiOut;
    let kemperMidiIn;
    alert("WebMidi activated");
    WebMidi.inputs[0].addListener("sysex",test(e));
    WebMidi.inputs.forEach(input => {
        console.log(input.manufacturer + "#" + input.name);
        alert(input.name + "#" + Object.keys(input));      
    });
        
       
    WebMidi.outputs.forEach(output =>  {
        console.log(output.manufacturer + "#" + output.name);
        //alert("output " + output.name);
    });
    kemperMidiOut = WebMidi.getOutputByName("WIDI Master");
    kemperMidiIn = WebMidi.getInputByName("WIDI Master");
    
    alert("kempermidiout keys:" + Object.keys(kemperMidiOut));
    console.log(kemperMidiOut);
    alert("kemperMidiIn1:" + kemperMidiIn);
    kemperMidiIn = WebMidi.inputs[0];
    alert("kemperMidiIn2:" + kemperMidiIn);
    //WebMidi.inputs[0].addListener("sysex", (e) => {
        //debugger;
    //    alert("sysex in" + Object.keys(e));
    //    alert("#" + e.message + "##" + e.rawData + "###" + e.type + "####" + e.dataBytes + "#####" + e.statusByte);
    //    console.log("sysex in:" + Object.keys(e));
    //    console.log("#" + e.message + "##" + e.rawData + "###" + e.type + "####" + e.dataBytes + "#####" + e.statusByte);
    //});
    alert("kempermidiin keys1:" + Object.keys(kemperMidiIn.eventMap));
    alert("kempermidiin keys2:" + Object.keys(kemperMidiIn._midiInput) + "#" + Object.keys(kemperMidiIn.channels));
    alert("browser or node " + WebMidi.Utilities.isBrowser() + "#" + WebMidiUtilities.isNode());
}

//element.addEventListener('change',() => sendKemperMidiOut('CC',48,0))
//const event = new Event('change')
//element.dispatchEvent(event)


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
let bsOffCanvas = new bootstrap.Offcanvas(myOffcanvas);


//this is trigger from relevant longpress buttons
function triggerLongPress() {
     console.log("done " + this + "#" + this.id);
    //button.removeEventListener('long-press', once);
    offCanvasBottomLabel.innerText = "hugoooo";
    bsOffCanvas.show();
    
}

//set gain value of rig
//rigGain1.value = 10;

//document.getElementById("example").attributes.DataTable();
//let doc = document.getElementById('example');
//console.log(Object.keys($('#example')) + "#" + Object.keys(document.getElementById('example').attributes ));
//console.log($('#example') + "#"  + $('#example')[0] + "##" +  document.getElementById('example') + "##"  );

document.addEventListener('DOMContentLoaded',function () {
    perfRigsTableData.pop();
    perfRigsTableData.push({ name:"perf1", author: "tttt"}); //add new perf or rig to table

} );

let perfRigsTableData = [];



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
    pagination:"local",
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
let newObj = JSON.parse(text);
console.log("newobj" + newObj.fxA.name);


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

//show gain meter in rigmode aka "browser"
/*
document.getElementById('perfRigsTable').addEventListener('hide.bs.collapse', function () {
    for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'visible';  } //hide rig gain on startup, because we start in per mode
    console.log('hide.bs.collapse ' + perfRigsTable.style + "#" + rigTable.style);
    perfRigsTable.style.visibility = 'hidden';
    rigTable.style.visibility = 'visible';
});
*/

//document.getElementById('fxContainer1').style.display = 'none';  //remove the container with one fx control
//document.getElementById('fxContainer1').style.display = 'inherit'; //show the container with one fx control


//listen on table long press
perfRigsTable.on("rowTapHold", function(e,row)  {
    //let temp = row.getCells();
    //console.log("##" + row.getCells()[0].getValue()); //get name of perf or rig
    console.log("lonpgpress rig or row" + e + "#"  + "#" + "#" + row.getCells() + "#" + row.getData());
});


//hide gain meter when in perfmode aka "perform"
document.getElementById('perfRigsTable').addEventListener('show.bs.collapse', function () {
    //for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'hidden';  }
    console.log('show.bs.collapse perfrigstable' + "#" + this.Tabulator);
    //rigTableElement.classList.remove("show");
    for (elementToHide of elementsToHide) { 
        "####" + console.log(Object.keys(elementToHide) + elementsToHide.length); 
        elementToHide.style.display = 'inherit';
    }

    perfRigsTable.setColumns( [{title:"Name", field:"name", headerHozAlign:"center" }, {title:"Author", field:"author", headerHozAlign:"center", maxWidth: 220, width: 140, minWidth: 80}]);
    perfRigsTableData.pop();
    perfRigsTableData.push({ name:"perf1", author: "tttt" , headerHozAlign:"center"}); //add new perf or rig to table
    //this.toggleClass('show');
    //document.getElementById('perfRigsTable').toggleClass;
    //perfRigsTable.style.visibility = 'visible';
    //rigTable.style.visibility = 'hidden';
});

//document.getElementsByClassName('fxContainers').addEventListener('fxContainers', e=> {
//    console.log("###fxcont " + this + "#" + e);
//}) ;

document.getElementById('perfRigsTable').addEventListener('hide.bs.collapse', e => {
    //for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'hidden';  }
    for (elementToHide of elementsToHide) { 
        "####" + console.log(Object.keys(elementToHide) + elementsToHide.length); 
        elementToHide.style.display = 'none';
    }
    console.log('hide.bs.collapse perfrigstable' + "#"  );
    //rigTableElement.classList.add("show");
    
    perfRigsTable.setColumns( [{title:"Name", field:"name", headerHozAlign:"center" }, {title:"Gain", field:"gain" , headerHozAlign:"center", maxWidth: 220, width: 140, minWidth: 80}]);
    perfRigsTableData.pop();
    perfRigsTableData.push({ name:"rigxxxxxxxxxx 1", gain: 8 , headerHozAlign:"center"}); //add new perf or rig to table

});


function triggerShortPress() {
   console.log(document.getElementById("modalParamsHeader").setAttribute("textContent","fdsfds") );
   //debugger;
   modalParamsHeader.innerText = modalNameMapping[this.id + "Header"];  //set text of modal header to id "modalParamsHeader"
}

function handleKnobFixElements(event) {
    //debugger;
    event.preventDefault();
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



//catch the fixed elements by classname on all fix knobs and attach event handler just trigger on touchleave
let inputKnobFixElements = document.getElementsByClassName("inputKnobFix");
//debugger;
//for (inputKnobFixElement of inputKnobFixElements) {  
for(let i = 0; i < inputKnobFixElements.length; i++) {    
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

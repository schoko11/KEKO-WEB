
/*
let kemperMidiOut = WebMidi
    .enable({sysex:true}) 
    .then(function () {
        WebMidi.inputs.forEach(inputs => {
            console.log("###" + inputs.manufacturer, inputs.name);
        });
        kemperMidiOut = WebMidi.getOutputByName("WIDI Master OUT")  
        console.log(kemperMidiOut);
        console.log("active");
        //var el = document.getElementById('rignext');
        //el.addEventListener('click', function(event) {
        //    event.preventDefault();
        //    kemperMidiOut.channels[1].sendControlChange(48,0);
        //})
        //if (el !== undefined) {
        //    console.log("el " + Object.keys(el));
           
        //}
        
        //kemperMidiOut.channels[1].sendControlChange(48,0);

        return kemperMidiOut;
    })         
    .catch(err => alert(err));

let kemperMidiIn = WebMidi
    .enable({sysex:true}) 
    .then(function () {
        kemperMidiIn = WebMidi.getOutputByName("WIDI Master In")  
        console.log("then in" + kemperMidiOut)
        return kemperMidiOut
    })         
    .catch(err => alert(err));    

//function to send midi out with async await, because of asynchronity of a promise
const sendKemperMidiOut = async (typ,par1,par2) => {
    const out = await kemperMidiOut;
    if (typ === 'CC') {
        out.channels[1].sendControlChange(par1,par2)
    }
    console.log("async await" + out)
}
console.log("kempermidiout " + kemperMidiOut)
//sendKemperMidiOut('CC',48,0);


//element.addEventListener('change',() => sendKemperMidiOut('CC',48,0))
const event = new Event('change')
element.dispatchEvent(event)
*/


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
let bsOffCanvas = new bootstrap.Offcanvas(myOffcanvas);

//this is trigger from relevant longpress buttons
function triggerLongPress() {
     console.log("done " + this + "#" + this.id);
    //button.removeEventListener('long-press', once);
    offCanvasBottomLabel.innerText = "hugoooo";
    bsOffCanvas.show();
    //const bsCollapse = new bootstrap.Collapse(myCollapse);
    //const toggleButton = document.getElementById(this.id);
    //bsCollapse.show();
    //toggleButton.addEventListener('click', () => {
    //    bsCollapse.toggle();
    //})
    
}

//set gain value of rig
//rigGain1.value = 10;

//document.getElementById("example").attributes.DataTable();
//let doc = document.getElementById('example');
//console.log(Object.keys($('#example')) + "#" + Object.keys(document.getElementById('example').attributes ));
//console.log($('#example') + "#"  + $('#example')[0] + "##" +  document.getElementById('example') + "##"  );

document.addEventListener('DOMContentLoaded',function () {
   table.on("rowClick", function(e, row) {
     alert("row" + row.getIndex() );
    });
//    let table = new DataTable('#example');
//    console.log(Object.keys(table));

//let rigOrPerfData = [
//    {id: 1, name:"rig 1", gain: 12},
//    {id: 2, name:"rig 2", gain: 6},
//    {id: 3, name:"rig 3", gain: 3}
//];

    //let table = new Tabulator('#example-table', {
       
        //autoColumns:true,
     //   layout: "fitColumns",
        //resizableColumnFit: true,
    //    columns: [
    //        {title:"Name", field:"name" },
    //        {title:"Gain", field:"gain"}
    //    ],
    //    reactiveData: true,
    //    data: [
    //        {id: 1, name:"rig 1", gain: 12},
    //        {id: 2, name:"rig 2", gain: 6}
    //    ]  
    //} );

} );


let table = new Tabulator('#example-table', {
       
    //autoColumns:true,
    layout: "fitColumns", //alternative: fitData
    //resizableColumnFit: true,
    columns: [
        {title:"Name", field:"name" },
        {title:"Gain", field:"gain"}
    ],
    reactiveData: true,
    pagination:"local",
    paginationSize: 10,
    minHeight: 300,
    maxHeight: "40%",
    data: [
        {id: 1, name:"rig 1", gain: 12},
        {id: 2, name:"rig 2", gain: 6},
        {id: 3, name:"rig 3", gain: 12},
        {id: 4, name:"rig 4", gain: 6},
        {id: 5, name:"rig 5", gain: 12},
        {id: 6, name:"rig 6", gain: 6},
        {id: 7, name:"rig 7", gain: 12},
        {id: 8, name:"rig 8", gain: 6},
        {id: 9, name:"rig 9", gain: 12},
        {id: 10, name:"rig 10", gain: 6},
        {id: 11, name:"rig 11", gain: 12},
        {id: 12, name:"rig 12", gain: 6},
    ]

    

} );




let perfModeMeters = document.getElementsByClassName("perfMode");
let rigModeMeters = document.getElementsByClassName("rigMode");
for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'hidden';  } //hide rig gain on startup because we start in perf mode

let longClickElements = document.getElementsByClassName('longPress');
console.log(longClickElements.length);
for(i = 0; i < longClickElements.length; i++) {    //add longpress event listeners to fx, amplifier equalizer and cabinet
    //console.log("" + longClickElements[i].id.substring(0,1) );
    //only buttons with id starting with "lp"
    if (longClickElements[i].id.substring(0,2) === "lp") { 
        longClickElements[i].addEventListener('long-press',triggerLongPress, true); 
        longClickElements[i].addEventListener('click',triggerShortPress, true);
    }
}

//show gain meter in rigmode aka "browser"
document.getElementById('perform').addEventListener('hide.bs.collapse', function () {
    for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'visible';  } //hide rig gain on startup, because we start in per mode
 
});

//hide gain meter when in perfmode aka "perform"
document.getElementById('perform').addEventListener('show.bs.collapse', function () {
    for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'hidden';  }
});


function triggerShortPress() {
   console.log(document.getElementById("modalParamsHeader").setAttribute("textContent","fdsfds") );
   modalParamsHeader.innerText = modalNameMapping[this.id + "Header"];  //set text of modal header to id "modalParamsHeader"
}

function handleKnobFixElements() {
    console.log("handleknobfixelements " + this.id + "#" + this.value);
    let temp = this.id;
    document.getElementById(this.id).innerText = this.value;
    console.log(document.getElementById("perform").className);
    //console.log( document.getElementById("perform").offsetHeight + "#" + document.getElementById("perform").className.match(/collapse show/g) + "##" + document.getElementById("perform").visibility);
    //this.id.innerText = this.value;
}


console.log("start" + window.screen.availHeight + "#" + window.screen.availWidth);


//catch the fixed elements by class
let inputKnobFixElements = document.getElementsByClassName("inputKnobFix");
for (inputKnobFixElement of inputKnobFixElements) {
    inputKnobFixElement.addEventListener("input", handleKnobFixElements, true );
}



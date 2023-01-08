
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
   rigTable.on("rowClick", function(e, row) {
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


let rigTable = new Tabulator('#rigTable', {
       
    //autoColumns:true,
    layout: "fitColumns", //alternative: fitData
    //resizableColumnFit: true,
    columns: [
        {title:"Name", field:"name", headerFilter:"input",
            cellClick:function(e, cell) {
                alert("cell clicked " + cell.getValue() + Object.keys(cell) )
                let value = cell.getValue();
                cell.getElement().style.color = "#3FB449";
                return value;
            }
        },
        {title:"Gain", field:"gain", headerFilter:"input"}
    ],
    reactiveData: true,
    responsiveLayout: true,
    pagination:"local",
    paginationSize: 7,
    minHeight: "20%",
    maxHeight: "40%",
    data: [
        {id: 1, name:"rigxxxxxxxxxx 1", gain: 12},
        {id: 2, name:"rigfffffffff 2", gain: 6},
        {id: 3, name:"rigeeeeeeeee 3", gain: 12},
        {id: 4, name:"rigf 4", gain: 6},
        {id: 5, name:"rig 5", gain: 12},
        {id: 6, name:"rig 6", gain: 6},
        {id: 7, name:"rig 7", gain: 12},
        {id: 8, name:"rig 8", gain: 6},
        {id: 9, name:"rig 9", gain: 12},
        {id: 10, name:"rig 10", gain: 6},
        {id: 11, name:"rig 11", gain: 12},
        {id: 12, name:"rig 12", gain: 6},
        {id: 13, name:"rig 13", gain: 6}
    ]
} );

let perfRigsTable = new Tabulator('#perfRigsTable', {
       
    //autoColumns:true,
    layout: "fitColumns", //alternative: fitData
    //resizableColumnFit: true,
    columns: [
        {title:"Name", field:"name", headerFilter:"input",
            cellClick:function(e, cell) {
                alert("cell clicked " + cell.getValue() + Object.keys(cell) )
                let value = cell.getValue();
                cell.getElement().style.color = "#3FB449";
                return value;
            }
        },
        {title:"Author", field:"author", headerFilter:"input"}
    ],
    reactiveData: true,
    pagination:"local",
    paginationSize: 7,
    minHeight: "20%",
    maxHeight: "40%",
    data: [
        {id: 1, name:"perfxxxxxxxxx 1", author: 12},
        {id: 2, name:"perffffffffff 2", author: 6},
        {id: 3, name:"perfeeeeeeeee 3", author: 12},
        {id: 4, name:"perff 4", author: 6},
        {id: 5, name:"perf 5", author: 12},
        {id: 6, name:"perf 6", author: 6},
        {id: 7, name:"perf 7", author: 12},
        {id: 8, name:"perf 8", author: 6},
        {id: 9, name:"perf 9", author: 12},
        {id: 10, name:"perf 10", author: 6},
        {id: 11, name:"perf 11", author: 12},
        {id: 12, name:"perf 12", author: 6},
        {id: 13, name:"perf 13", author: 6}
    ]
} );


let fxTable = new Tabulator('#fxTable', {
       
    //autoColumns:true,
    layout: "fitColumns", //alternative: fitData
    //resizableColumnFit: true,
    columns: [
        {title:"Name", field:"name", headerFilter:"input",
            cellClick:function(e, cell) {
                alert("cell clicked " + cell.getValue() + Object.keys(cell) )
                let value = cell.getValue();
                cell.getElement().style.color = "#3FB449";
            return value;
            }
        },
        {title:"Category", field:"category", headerFilter:"input" }
    ],
    reactiveData: true,
    pagination:"local",
    paginationSize: 12,
   // minHeight: "20%",
   // maxHeight: "40%",
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

/*
let perfRigsTable = new Tabulator('#perfRigsTable', {
    headerVisible: false, 
    rowHeight: 40,
    //layout: "fitDataTable",
    //layout: "fitDataFill",
    //layout: "fitData",
    layout: "fitColumns",
    //responsiveLayout: "collapse",
    columns: [
        {title:"Rig1", field:"rig1",cellClick:function(e, cell) {alert("cell clicked " + cell.getValue())}, formatter:"textarea" },
        //{title:"G.1", field:"gain1",cellClick:function(e, cell) {alert("cell clicked " + cell.getValue())} },
        {title:"Rig2", field:"rig2",cellClick:function(e, cell) {alert("cell clicked " + cell.getValue())}, formatter:"textarea"  },
        //{title:"G.2", field:"gain2",cellClick:function(e, cell) {alert("cell clicked " + cell.getValue())} },
        {title:"Rig3", field:"rig3",cellClick:function(e, cell) {
                alert("cell clicked " + cell.getValue() + Object.keys(cell) )
                let value = cell.getValue();
                cell.getElement().style.color = "#3FB449";
                return value;
            }, formatter:"textarea"
            //formatter: function(cell, formatterParams) {
            //    let value = cell.getValue();
            //    return "<span style='color:#3FB449;'>" + value + "</span>";
            //    } 
        },
        //{title:"G.3", field:"gain3",cellClick:function(e, cell) {alert("cell clicked " + cell.getValue())} },
        {title:"Rig4", field:"rig4",cellClick:function(e, cell) {
            alert("cell clicked " + cell.getValue());
            let value = cell.getValue();
            cell.getElement().style.color = "#3FB449";
            return value;
            }, 
            formatter:"textarea"
        },
        //{title:"G.4", field:"gain4",cellClick:function(e, cell) {alert("cell clicked " + cell.getValue())} },
        {title:"Rig5", field:"rig5",cellClick:function(e, cell) {
            alert("cell clicked " + cell.getValue());
            let value = cell.getValue();
            cell.getElement().style.color = "#3FB449";
            return value;
        }, formatter:"textarea" },
        //{title:"G.5", field:"gain5",cellClick:function(e, cell) {alert("cell clicked " + cell.getValue())} }
    ],
    data:[
        {id: 1, rig1:"Rigyyyyyyyy 1",
         //gain1:"10",
         rig2:"Rigwwwwwwwww 2",
         // gain2:"10",
         rig3:"Rigweeeeeeee 3",
         // gain3:"3",
         rig4:"Rigwadwdwad 4",
         // gain4:"7",
         rig5:"Rig ddsad    5"}
         // gain5:"1"}
    ]
});
*/


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



let rigTableElement = document.getElementById('rigTable');
document.getElementById('rigTable').addEventListener('hide.bs.collapse', function () {
    for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'visible';  } //hide rig gain on startup, because we start in per mode
    console.log('hide.bs.collapse rigTable' + perfRigsTable.style + "#" + rigTable.style + "#" + this.value);
    document.getElementById('perfRigsTable').toggleClass('show');
});

document.getElementById('rigTable').addEventListener('show.bs.collapse', function () {
    for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'visible';  } //hide rig gain on startup, because we start in per mode
    console.log('show.bs.collapse rigTable' + perfRigsTable.style + "#" + rigTable.style + "#" + this.value);
    document.getElementById('rigTable').toggleClass('show');
});


//hide gain meter when in perfmode aka "perform"
document.getElementById('perfRigsTable').addEventListener('show.bs.collapse', function () {
    for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'hidden';  }
    console.log('show.bs.collapse perfrigstable' + "#" + this.Tabulator);
    rigTableElement.classList.remove("show");
    for (elementToHide of elementsToHide) { 
        "####" + console.log(Object.keys(elementToHide) + elementsToHide.length); 
        elementToHide.style.display = 'inherit';
    }
    //this.toggleClass('show');
    //document.getElementById('perfRigsTable').toggleClass;
    //perfRigsTable.style.visibility = 'visible';
    //rigTable.style.visibility = 'hidden';
});

//document.getElementsByClassName('fxContainers').addEventListener('fxContainers', e=> {
//    console.log("###fxcont " + this + "#" + e);
//}) ;

document.getElementById('perfRigsTable').addEventListener('hide.bs.collapse', e => {
    for (rigModeMeter of rigModeMeters) { rigModeMeter.style.visibility = 'hidden';  }
    for (elementToHide of elementsToHide) { 
        "####" + console.log(Object.keys(elementToHide) + elementsToHide.length); 
        elementToHide.style.display = 'none';
    }
    console.log('hide.bs.collapse perfrigstable' + "#"  );
    rigTableElement.classList.add("show");

});


function triggerShortPress() {
   console.log(document.getElementById("modalParamsHeader").setAttribute("textContent","fdsfds") );
   modalParamsHeader.innerText = modalNameMapping[this.id + "Header"];  //set text of modal header to id "modalParamsHeader"
}

function handleKnobFixElements(event) {
    event.preventDefault();
    console.log("handleknobfixelements " + this.id + "#" + this.value +  "#" + this.parentElement.id + "#" + event.touchend );
    let targetTouch = event.targetTouches;
  
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
for (inputKnobFixElement of inputKnobFixElements) {  
    //inputKnobFixElement.addEventListener("input", handleKnobFixElements, true ); 
    inputKnobFixElement.addEventListener("touchend", handleKnobFixElements, true );
    //inputKnobFixElement.addEventListener("mouseup", handleKnobFixElements, true );  //support mouse unclick
}


//catch the variable input fx elements and attach event handler
let inputKnobVarFxElements = document.getElementsByClassName("fxContainers");
for (inputKnobVarFxElement of inputKnobVarFxElements) {  
    //inputKnobVarFxElement.children[1].addEventListener("input", handleKnobFixElements, true ); 
    inputKnobVarFxElement.children[1].addEventListener("touchend", handleKnobFixElements, true ); 
    //inputKnobVarFxElement.children[1].addEventListener("touseup", handleKnobFixElements, true ); //support mouse unclick 
}


//show or hide all fxContainers
//for(fxContainer of fxContainers) {
    //fxContainer.style.display = 'none';
    //fxContainer.style.display = 'inline';
//}


//this downloads a js object to local disk
//let fileBlob = new Blob([JSON.stringify(rigTestObj)], {type: 'text/plain'})
//function download(data, filename, type) {
    //fileBlob = new Blob([data], {type: type});
    //if(window.navigator.)
//    let a = document.createElement("a");
//    let url = URL.createObjectURL(file);
//    a.href = url;
//    a.download = filename;
//    document.body.appendChild(a);
//    a.click();
//    setTimeout(function() {
//        document.body.removeChild(a);
//        window.URL.revokeObjectURL(url);
//    }, 0);
//}
//download rigs or performance objects
//download(JSON.stringify(rigTestObj),'testfile','txt');

//read blob to object
//let reader = new FileReader();
//reading in blob
//reader.readAsText(fileBlob);
//reader.onload = function() {
//    link.href = reader.result;
//    console.log("reader result" + reader.result);
//    link.click();
//};
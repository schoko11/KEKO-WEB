
import {TabulatorFull} from "tabulator-tables";
import { triggerLongPress } from "../src/triggerLongPress";

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



export {fxTable}
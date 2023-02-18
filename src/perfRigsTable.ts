
import {TabulatorFull} from "tabulator-tables";

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
    footerElement: "<button> Details</button>",
    data: perfRigsTableData

} );

export {perfRigsTable}
export {perfRigsTableData}
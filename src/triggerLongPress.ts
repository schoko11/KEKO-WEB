import { bsOffCanvas, myOffcanvas} from "../src/app"


//this is trigger from relevant longpress buttons
function triggerLongPress() {

     console.log("longpress " + "#" + this.id + "###" + document?.getElementById("offCanvasBottomLabel")?.attributes + "###" + document?.getElementById("offCanvasBottomLabel")?.innerText);
    //button.removeEventListener('long-press', once);
    //offCanvasBottomLabel.innerText = "xxx";
    document?.getElementById("offCanvasBottomLabel")?.setAttribute("inner.Text","hugoooo");
    //debugger;
    bsOffCanvas.show(myOffcanvas!);
    
}

export {triggerLongPress}
import { bsOffCanvas, myOffcanvas, wholeRig} from "../src/app"


//this is trigger from relevant longpress buttons
function triggerLongPress() {

     console.log("longpress " + "#" + this.id + "###" + document?.getElementById("offCanvasBottomLabel")?.attributes + "###" + document?.getElementById("offCanvasBottomLabel")?.innerText);
    //button.removeEventListener('long-press', once);
    //offCanvasBottomLabel.innerText = "xxx";
    //document?.getElementById("offCanvasBottomLabel")?.setAttribute("h4","hugoooo");
    document!.getElementById("offCanvasBottomLabel")!.textContent = this.id.substring(4,5) + ": " + wholeRig[this.id]["nameOfFx"];
    //debugger;
    bsOffCanvas.show(myOffcanvas!);
    
}

export {triggerLongPress}
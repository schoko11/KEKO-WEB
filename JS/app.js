let kemperMidiOut = WebMidi
    .enable({sysex:true}) 
    .then(function () {
        kemperMidiOut = WebMidi.getOutputByName("WIDI Master OUT")  
        console.log(WebMidi)
        return kemperMidiOut
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

//kemperMidiOut.channels[1].sendControlChange(48,0)

//let idsel = document.getElementById("input1")
//alert("idsel" + idsel.) 

//eventlistener, if addeventlistener and event are not labelled 'change' values are trigger while moving
let element = document.getElementById('input1')
element.value = 12
element.addEventListener('change',() => console.log('change' + element.value + element.checked))

//element.addEventListener('change',() => sendKemperMidiOut('CC',48,0))
const event = new Event('change')
element.dispatchEvent(event)

var el = document.getElementById('demo');

el.addEventListener('long-press', function(e) {
    alert("fdsfd")
    // do something
});
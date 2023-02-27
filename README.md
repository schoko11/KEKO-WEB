# KEKO-WEB
Control the Kemper from Web

This is a design draft! Any real functionality is not implemented yet. The midi Connection should be done with bluetooth(i use a cme widi pro), so this should be useable with android!

On Startup there is a Dialog requesting Midi in and Out connection.
The information is stored in the browser via localstorage (midi in: KEKO_MIDI_IN, midi out: KEKO_MIDI_OUT).
The midi connection Dialog can be updated any time when pressing "settings" -> set midi


When pressing an Fx button there is a dual functionality: 

Long press brings up the offcanvas element (selecting an fx or setting it off)
Short press brings up the parameter of the fx
 
As of now (04.02.2023) i will switch to a rather conventional midi cable to do the development.
Could use linux to code, which is way more convenient than with an offline WIN 10 (doing bluetooth later on).


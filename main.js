function setup() {
    canvas=createCanvas(420, 400);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyc);
    synth = window.speechSynthesis;
}

function ClearCanvas() {
    background("white");
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw() {
    // This is used to set the thickness of your pen 
    strokeWeight(9);

    // This is used to change the colour of the pen (0 means black)
    stroke(0);

    // This is used to create a line between previous and current mouse positions when we press the mouse
    if(mouseIsPressed) {

        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}


function classifyc() {
    classifier.classify(canvas, gotResults)
}


function gotResults(error, results) {
    if(error) {
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("label").innerHTML = "Label - " + results[0].label;
        document.getElementById("confidence").innerHTML = "Confidence - " + Math.round(results[0].confidence*100) + "%";

        speech = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(speech);
    }
}

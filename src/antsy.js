///////////////////////
//// loading files ////
///////////////////////
function handleFiles(event) {
    // load the file uploaded into audio
    var files = event.target.files;
    $("#src").attr("src", URL.createObjectURL(files[0]));
    document.getElementById("audio").load();

    // reset audio replay value stuff
    currentlyPlaying = replayProperties(document.getElementById("audio"));
}

document.getElementById("upload").addEventListener("change", handleFiles, false);

///////////////////////////
//// replay properties ////
///////////////////////////


function handleReplay(evemt) {
    var audio = document.getElementById("audio");
    audio.currentTime = 0;
    // updateReplayFunction(audio);
    currentlyPlaying.step();

    audio.play();
};

document.getElementById("audio").addEventListener("ended", handleReplay, false);

function replayProperties() {
    let myAudio = document.getElementById("audio")
    let curSpeed = 1;
    let curPitch = 1;
    let setSpeed = function(newSpeed) {
        curSpeed = newSpeed;
        myAudio.playbackRate = curSpeed;
        updateDisplay();
    };
    let setPitch = function(newPitch) {
        curPitch = newPitch;
        myAudio.playbackPitch = curPitch;
        updateDisplay();
    };
    let step = () => {
        curSpeed += Number(document.getElementById("deltaSpeed").value);
        curPitch += Number(document.getElementById("deltaPitch").value);
        myAudio.playbackRate = curSpeed;
        myAudio.playbackPitch = curPitch;
        updateDisplay();
    };

    return {
        step: step,
        setSpeed: setSpeed,
        setPitch: setPitch,
        get curSpeed() { return curSpeed; },
        get curPitch() { return curPitch; }
    }
}

function updateDisplay() {
    document.getElementById("curSpeed").textContent = currentlyPlaying.curSpeed;
    document.getElementById("curPitch").textContent = currentlyPlaying.curPitch;
}

let currentlyPlaying = replayProperties(document.getElementById("audio"));
updateDisplay();

////////////////////////
//// setter buttons ////
////////////////////////

function setProperties(event) {
    let newSpeed = Number(document.getElementById("setSpeed").value);
    let newPitch = Number(document.getElementById("setPitch").value);
    currentlyPlaying.setSpeed(newSpeed);
    currentlyPlaying.setPitch(newPitch);
}


document.getElementById("setterButton").addEventListener("click", setProperties, false);

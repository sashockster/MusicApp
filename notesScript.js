var context = new AudioContext();


var keyboard={
65:{note:"c_note", freq:261.63},
83:{note:"d_note", freq:293.66},
68:{note:"e_note", freq:329.63},
70:{note:"f_note", freq:349.23},
71:{note:"g_note", freq:392},
72:{note:"a_note", freq:440},
74:{note:"b_note", freq:493.88},


};


//frequencies from http://www.phy.mtu.edu/~suits/notefreqs.html
//add notes being pressed to array
var keysPressed=[];

function Note(frequency, name){

	var oscillator;
	this.name=name
	this.oscillator=context.createOscillator();
	this.oscillator.frequency.value=frequency;
	this.pressed=false;
	// add start to this so when pressing play it won't continously start
	this.oscillator.start(0);
}

//this will play the Note if pressed
Note.prototype.play=function(){
	if(!this.pressed){
		this.pressed=true;
		this.oscillator.connect(context.destination);
		console.log(this.name +" is connected. Frequency is "+
		this.oscillator.frequency.value)
		}
}
//All Note objects will share this same protoype
Note.prototype.stop=function(){
	this.pressed=false;
	this.oscillator.disconnect();
	console.log(this.name + "is NOT connected")
}
/*
KEY PRESS





*/
function isKeyboard(keyCode){
//take in the event listener key code paremeter
//ask keyboard object if keycode is in list
//if in list, see if pushed by isPushed function
// if pushed do nothing
//if not pushed, create a new Note using newNote function
	if(keyboard[keyCode] !== undefined){
		if(isPressed(keyboard[keyCode].note) ==-1){
			document.getElementById("key").innerHTML= keyboard[keyCode].note+" is Released"

			createNote(keyboard[keyCode].freq,keyboard[keyCode].note)
		}
	}
}

function stopNote(keyCode){
	if(keyboard[keyCode] !== undefined){
		keysPressed[isPressed(keyboard[keyCode].note)].stop();
		keysPressed.splice(isPressed(keyboard[keyCode].note), 1);
}

}


window.addEventListener("keydown", function(e){
isKeyboard(e.keyCode)

	});


	window.addEventListener("keyup", function(e){
stopNote(e.keyCode)

		});



	function createNote(frequency, noteName){
			var aNote=new Note(frequency,noteName)
			aNote.play();
			keysPressed.push(aNote)

	}



//check to see if function is pressed
function isPressed(noteName){
for(var i=0; i<keysPressed.length;i++){
	if(noteName==keysPressed[i].name){
		return i;
	}
}
	return -1;
}

//window.addEventListener("keydown", function(e){

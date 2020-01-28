/*
* Synthèse vocale
* FROM : github.com:mdn/web-speech-api.git
*
*/


const PITCH = 1.1;
const RATE = 0.7;
const VOICE_NAME = 'french';


var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voice;

function getVoice() {
  var voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });

  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === VOICE_NAME) {
      voice = voices[i];
      break;
    }
  }
}



getVoice();


function tts(txt){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (txt !== '') {
    var utterThis = new SpeechSynthesisUtterance(txt);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    utterThis.voice = voice;
    utterThis.pitch = PITCH;
    utterThis.rate = RATE;
    synth.speak(utterThis);
  }
}

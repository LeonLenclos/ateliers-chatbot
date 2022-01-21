/*
Ce script importe les fichiers .rive de riveList dans un
interpreteur RiveScript (https://github.com/aichaos/rivescript-js).
C'est du copié collé de l'exemple sur le readme de rivescript-js et
du code l'interface pour parler à Alan.
*/

// the time in ms to wait before reply
let responseDelay = 3000;


// create the interpreter and import .rive files
let bot = new RiveScript({utf8: true});
bot.loadFile(riveList)
.then(function() {
    bot.sortReplies();
    enable_input();
})
.catch(function(err){
    console.log(err);
});

////////// EVENTS //////////
// Event for pressing ENTER key
$(window).keydown(function(event){
    if(event.keyCode == 13) {
        talk()
        event.preventDefault();
        return false;
    }
});

// Event for pressing #talk button
$(document).ready(function() {
    $("#talk").click(talk);
});


///////// SET HTML FUNCTIONS //////////
// disable the input and the button
function disable_input (){
    $("#talk").prop( "disabled", true );
    $("#msg").prop( "disabled", true );
}

// enable the input and the button
function enable_input (){
    $("#talk").prop( "disabled", false );
    $("#msg").prop( "disabled", false );
}

// add a txt to the discussion. speaker must be 'human' or 'alan'
function addToDiscussion(txt, speaker) {
    console.log(speaker + ' > ' + txt);
    // #discussion is a ul ellement (unordered list)
    var new_entry = '<li class="'+speaker+'">'+txt+'</li>'
    var discussion = $("#discussion").html()
    $("#discussion").html(discussion + new_entry)
    // scroll to the bottom (with animation)
    $("#discussion-container").animate(
        { scrollTop: $('#discussion-container').prop("scrollHeight")}, 1000);
}

///////// TALK FUNCTION //////////
function talk() {
    // human entry
    var entry = $("#msg").val();
    $("#msg").val("");
    disable_input();
    addToDiscussion(entry, 'human');
    
    // bot reply
    bot.reply('human', entry)
    .then(function(reply) {
        // delay
        setTimeout(function() {
            addToDiscussion(reply, 'bot');
            enable_input();
        }, responseDelay);
    });
}


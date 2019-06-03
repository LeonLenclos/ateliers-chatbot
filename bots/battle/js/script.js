/*
LE BATTLE
*/


const BATTLE_LENGTH = 15;

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

// example.com?a=0&b=1

const ID_BOT_A = $.urlParam('a');
const ID_BOT_B = $.urlParam('b');

$("#title").html(bots[ID_BOT_A].name + ' vs. ' + bots[ID_BOT_B].name);

let RESPONSE_DELAY = 3000;

// create the interpreter and import .rive files
bots[ID_BOT_A].interpreter = new RiveScript({utf8: true});
bots[ID_BOT_B].interpreter = new RiveScript({utf8: true});

// Load bot 1
bots[ID_BOT_A].interpreter.loadFile(bots[ID_BOT_A].riveList)
.then(function() {
    bots[ID_BOT_A].interpreter.sortReplies();
    // Load bot 2
    bots[ID_BOT_B].interpreter.loadFile(bots[ID_BOT_B].riveList)
    .then(function() {
        bots[ID_BOT_B].interpreter.sortReplies();
        //start the battle
        console.log('Bots are ready.');
    })
    .catch(function(err){
        console.log(err);
    });
})
.catch(function(err){
    console.log(err);
});

////////// EVENTS //////////
// Event for pressing ENTER key
$(window).keydown(function(event){
    if(event.keyCode == 13) {
        talk('Salut.', ID_BOT_A, ID_BOT_B, '')
        event.preventDefault();
        return false;
    }
});



function talk(last_reply, you, me, ante_last) {
    bots[me].interpreter
    .reply(you, removeDicretics(last_reply))
    .then(function(reply) {
        // delay
        if(reply == ante_last){
            talk('', you, me, ante_last);
        }
        else {
            setTimeout(function() {
                addToDiscussion(reply, me);
                talk(reply, me, you, last_reply);

            }, RESPONSE_DELAY);
        }
    });
}

// add a txt to the discussion. speaker must be 'human' or 'alan'
function addToDiscussion(txt, speaker) {
    s = bots[speaker];
    txt = txt.replace(/ *\[[^]*\] */g, "");
    console.log(s.name + ' > ' + txt);
    // #discussion is a ul ellement (unordered list)
    var new_entry = '<div class="reply"><img class="avatar" src="'+s.avatar+'"><div class="content"><span class="name">'+s.name+'</span>'+txt+'</div></div>'

    var discussion = $("#discussion").html()
    $("#discussion").html(discussion + new_entry)
    // scroll to the bottom (with animation)
    $("#discussion-container").animate(
        { scrollTop: $('#discussion-container').prop("scrollHeight")}, 1000);
}


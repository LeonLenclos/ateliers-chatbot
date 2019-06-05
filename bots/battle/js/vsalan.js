/*
LE BATTLE
*/

/////////////// ALAN

ALAN_ADDRESS = "http://10.0.0.10"
ALAN_ADDRESS = "http://localhost:8888"

let last_bot_reply = '';
    ////////// VARS/////////////////
    // state of the conversation
    var conversation_open = false;
    // id of the conversation
    var conv = null;

    ////////// CONVERSATIONS //////////
    function newConv() {
            $.ajax({
            type: "POST",
            url: ALAN_ADDRESS +'/new',
            data: JSON.stringify(''),
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            success: openConvCallback,
            failure: console.log
        });



    }
        
    function openConvCallback(response) {
        var response = $.parseJSON(response)
        // open conversation
        conv = response.conversation_id
        conversation_open = true;
        console.log("alan is ready " + conv);
    }

    function talkToAlan(msg) {

        // prevent for talking to a closed conversation
        if(!conversation_open) return
            last_bot_reply = msg;
        // Create Json Msg (with user entry)
        var jsonMsg = {
            msg:msg,
            conversation_id:conv
        };

        // Send POST request
        console.log("Sending msg : " +jsonMsg.msg)

        $.ajax({
            type: "POST",
            url: ALAN_ADDRESS +'/talk',
            data: JSON.stringify(jsonMsg),
            contentType: "application/json; charset=utf-8",
            dataType: "text",
            success: talkToAlanCallback,
            failure: console.log
        });
      }


            function talkToAlanCallback(response) {
            response = $.parseJSON(response)
            //catch errors in response
            setTimeout(function() {
                addToDiscussion(response.text, 'alan');
                talk(response.text, 'alan', ID_BOT_A, last_bot_reply);

            }, RESPONSE_DELAY);

            }

newConv();
////////////////

const BATTLE_LENGTH = 15;

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

// example.com?a=0&b=1

const ID_BOT_A = $.urlParam('a');
const ID_BOT_B = 'alan'

$("#title").html(bots[ID_BOT_A].name + ' vs. Alan');

let RESPONSE_DELAY = 3000;

// create the interpreter and import .rive files
bots[ID_BOT_A].interpreter = new RiveScript({utf8: true});

// Load bot 1
bots[ID_BOT_A].interpreter.loadFile(bots[ID_BOT_A].riveList)
.then(function() {
    bots[ID_BOT_A].interpreter.sortReplies();
    // Load bot 2
    console.log('Bot is ready.');
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
    console.log(you + ' > ' + last_reply);
    if(me == 'alan'){
        talkToAlan(last_reply)
    }
    else {
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
}

// add a txt to the discussion. speaker must be 'human' or 'alan'
function addToDiscussion(txt, speaker) {
    if (speaker=='alan'){
        speaker = 3;
    }
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


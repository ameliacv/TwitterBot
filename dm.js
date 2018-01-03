// Dependencies =========================
var
path = require('path'),
fs = require('fs'),
twit = require('./node_modules/twit'),
config = require('./config');

var Twitter = new twit(config);
var user_send_id = "";

var stream = Twitter.stream('user');
stream.on('direct_message', function (eventMsg) {    
 var target_id = eventMsg.direct_message.sender.id_str; 
 console.log(eventMsg);
 if(target_id != user_send_id){
  var sender_name = eventMsg.direct_message.sender.name;
  var param = {
    Name : "Amel",
    text : "Hallo ," + sender_name + " !  Error 404: Message recipient is currently introverting and is unable to communicate with other human beings at this time. Please feel free to send further messages to be read at a time when recipient has emotionally recharged enough to interact with other again. (ketcup manjah \u2764)",
    user_id : target_id   
 }
 Twitter.post('direct_messages/new', param, function(err,data,response){          
 });
}

});
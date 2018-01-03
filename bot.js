// Dependencies =========================
var
path = require('path'),
fs = require('fs'),
twit = require('./node_modules/twit'),
config = require('./config');

var Twitter = new twit(config);
var dayInMilliseconds = 1000 * 60 * 60 * 24;
var weekInMilliseconds = 24 * 60 * 60 * 1000 * 2;
// RETWEET BOT ==========================



var stream = Twitter.stream('user');
stream.on('direct_message', function (eventMsg) {    
 var target_id = eventMsg.direct_message.sender.id_str;
 if(target_id != YOUR_ID){
 var param = {
    Name : "Amel",
    text : "Welcome to The Jungle",
    user_id : target_id   
 }
 Twitter.post('direct_messages/new', param, function(err,data,response){   
        console.log(response);  
 });
}

});

var listDM = function(){
  Twitter.get('direct_messages/events/list', params, function(err, data) {

  });
}

// var target_id = eventMsg.direct_message.sender.id_str;
//     var param_dm = {
//       event:{
//         type : "message_create", 
//         message_create: {
//           target : {
//             recipient_id: target_id},
//             message_data: {
//               text: "Hello World!"}}}
//             }
//             Twitter.post('direct_messages/events/new', param_dm, function(err,data){
//               if(data){
//                 console.log("message reply send");
//                 console.log(data);        
//               }
//             });}, 1000
//             );
// find latest tweet according the query 'q' in params
var retweet = function() {
  var params = {
        q: '#programmer, #Android',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
      }
      Twitter.get('search/tweets', params, function(err, data) {
      // if there no errors
      if (!err) {
          // grab ID of tweet to retweet
          var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
              id: retweetId
            }, function(err, response) {
              if (response) {
                console.log('Retweeted!!!');
              }
                // if there was an error while tweeting
                if (err) {
                  console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
              });
          }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
        }
      });
    }

// grab & retweet as soon as program is running...
 retweet();
// // retweet in every 50 minutes
 setInterval(retweet, dayInMilliseconds);

var favoriteTweet = function(){
  var params = {
      q: '#programmer, #android',  // REQUIRED
      result_type: 'recent',
      lang: 'en'
    }
  // find the tweet
  Twitter.get('search/tweets', params, function(err,data){

    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);   // pick a random tweet

    // if random tweet exists
    if(typeof randomTweet != 'undefined'){
      // Tell TWITTER to 'favorite'
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        // if there was an error while 'favorite'
        if(err){
          console.log('CANNOT BE FAVORITE... Error');
        }
        else{
          console.log('FAVORITED... Success!!!');
        }
      });
    }
  });
}
// grab & 'favorite' as soon as program is running...
 favoriteTweet();
// // 'favorite' a tweet in every 60 minutes
 setInterval(favoriteTweet, dayInMilliseconds);

// function to generate a random tweet tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};
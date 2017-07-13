// require various stuff
var inquirer = require("inquirer");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
command = [];
title = ""

// get input
inquirer.prompt([
{
	type:"list",
	name: "command",
	message: "What would you like to do?",
	choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
},

{
	type: "input",
	message: "input your search query!",
	name: "input",
	when: function(answers){
		return answers.command === "spotify-this-song" || answers.command === "movie-this" || answers.command === "do-what-it-says";
	}
}
])
.then(function(user){
	command = user.command;
	input = user.input;

	getCommand();

	console.log(command);
	// console.log(input);

});	

// // function to determine what LIRI was asked
function getCommand(){
	switch(command){
		case "my-tweets":
			showTweets();
			break;

		case "spotify-this-song":
			showSpotify();
			break;

		case "movie-this":
			showMovie();
			break;

		case "do-what-it-says":
			doTheThing();
			break;
	}
}

// getCommand();

// // function to see tweets
	var client = new Twitter({
  	consumer_key: keys.twitterKeys.consumer_key,
  	consumer_secret: keys.twitterKeys.consumer_secret,
  	access_token_key: keys.twitterKeys.access_token_key,
  	access_token_secret: keys.twitterKeys.access_token_secret
	});

function showTweets(){
	// console.log("tweets")

	var params = {screen_name: 'olivec4t'};


	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		// console.log(tweets);
		if (!error){
			for (var i = 0; i < tweets.length; i++) {
			
				var twittage = tweets[i].text + "\n" + tweets[i].created_at;
				console.log(twittage);
				
			}
		}
	});
};

// // function to see spotify
function showSpotify(data){
	console.log("Spotify");


	var Spotify = require('node-spotify-api');
	var title = input;
 
	var spotify = new Spotify({
  	id: 'd6c8c32cebb045b8aed97a2d0357b999',
  	secret: 'da39759a2b5b404bb71d640a602d7826'
});
 
	spotify.search({ type: 'track', query: }, function(err, data) {
  	if (err) {
    return console.log('Error occurred: ' + err);
  }
 

});


	// if(input === undefined){
	// 	songName = "The Sign";
	// }else{
	// 	console.log(data.tracks.artists.name);
	// 	console.log(data.tracks.name);

	// }

	
	


}
// // function to see movies
// // function for do what it says
// // bonus: function to write to a local file

















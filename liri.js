// require various stuff
var inquirer = require("inquirer");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var command = [];
var userInput = [];
var param = userInput[0];

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
	// push input to userInput array
	userInput.push(input);

	// console.log("UI: " + userInput);


	getCommand();

	// console.log(command);
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

getCommand();

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
	// console.log("Spotify");

	var songName = userInput.pop();
	// console.log(songName);
 
	var spotify = new Spotify({
  	id: 'd6c8c32cebb045b8aed97a2d0357b999',
  	secret: 'da39759a2b5b404bb71d640a602d7826'

});
	if(songName.length === 0){
		songName = "The Sign";
}
 
	spotify.search({ type: 'track', query: songName, limit: 5 }, function(err, data) {
  	if (err) {
    return console.log('Error occurred: ' + err);
  }else{

  		var songInfo = data.tracks.items;

  		for (var i = 0; i < songInfo.length; i++) {
  			
 
		console.log("Song Name: ", JSON.stringify(songInfo[i].name, null, 2));
		console.log("Artist: ", JSON.stringify(songInfo[i].artists[0].name, null, 2));
		console.log("Preview Link :", JSON.stringify(songInfo[i].preview_url, null, 2));
		console.log("Album: ", JSON.stringify(songInfo[i].album.name, null, 2));
	}
  		}

});
}
// // function to see movies
function showMovie(){
	// console.log("OMDB");
	var movie = userInput.pop();
	// console.log(movie);
	if(movie.length === 0){

		movie = "Mr Nobody";
	}
	request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&limit=1&apikey=40e9cece", function(err, response, body){
		if(err){
			console.log(err);
		}else{
			var movieInfo = JSON.parse(body);
			console.log("Title: " + movieInfo.Title);
			console.log("Year: " + movieInfo.Year);
			console.log("IMDB Rating: " + movieInfo.imdbRating);
			console.log("Rotten Tomatoes Rating: " + movieInfo.tomatoRating);
			console.log("Country: " + movieInfo.Country);
			console.log("Language: " + movieInfo.Language);
			console.log("Plot: " + movieInfo.Plot);
			console.log("Actors: " + movieInfo.Actors);
		}
	});

}

// // function for do what it says
// // bonus: function to write to a local file

















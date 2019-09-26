require("dotenv").config();

// variables
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");
const axios = require("axios");

// gets the spotify key
var spotify = new Spotify(keys.spotify);

var userInput = process.argv[2];
var secondUserInput = process.argv.slice(3).join(' ');

for (let i = 4; i < process.argv.length; i++) {
    secondUserInput += "+" + process.argv[i];
}

function mySwitch(userInput) {
    switch (userInput) {
        case "concert-this":
            concert();
            saveInfo();
            break;

        case "spotify-this-song":
            getSpotify();
            saveInfo();
            break;

        case "movie-this":
            getMovie();
            saveInfo();
            break;

        case "do-what-it-says":
            doWhat();
            saveInfo();
            break;
    }
}

// function for getting concert information - command is concert-this
function concert() {
    var url = "https://rest.bandsintown.com/artists/" + secondUserInput + "/events?app_id=codingbootcamp";
    axios.get(url)
        .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                console.log("----Concert Info----");
                console.log("Name of the venue: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city + " " + response.data[i].venue.country);
                console.log("Date of the Event: " + response.data[i].datetime);
                console.log("-----------");

            }
        })
}

// funciton for searching spotify - the command is spotify-this-song

function getSpotify() {

    if (!secondUserInput) {
        secondUserInput = "The Ace";
    }

    spotify
        .search({
            type: "track",
            query: secondUserInput
        })
        .then(function (data) {
            var artists = [];

            for (let i = 0; i < data.tracks.items[0].artists.length; i++) {
                artists.push(data.tracks.items[0].artists[i].name)
            }

            console.log("-----------------------------------");
            console.log("Artist(s): " + artists);
            console.log("Song name: " + data.tracks.items[0].name);
            console.log("Preview song: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("-----------------------------------");
        })
        .catch(function (error) {
            console.log(error);
        });
}
// funcion for searching movie data base - command is movie-this
function getMovie() {

    var movieName = secondUserInput;
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        // If the request is successful = 200
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);

            //Simultaneously output to console and log.txt via NPM simple-node-logger
            console.log('----Movie Info----');
            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMDB Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log('-------------');

        } else {
            //else - throw error
            console.log("Error occurred.")
        }
        //Response if user does not type in a movie title
        if (movieName === "Mr. Nobody") {
            console.log("-----------------------");
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");
        }
    });
}

// function for reading our text file
function doWhat() {
    //Read random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            throw (error)
        }
        console.log(data.toString());
        //split text with comma 
        userInput = data.toString().split(',')[0];
        movieName = data.toString().split(',')[1];
        mySwitch(userInput, secondUserInput);
    });
}

mySwitch(userInput);

function saveInfo() {
    fs.appendFile("log.txt", userInput + " : " + secondUserInput + "\n", function (error) {
        if (error) {
            throw error;
        }
        console.log("Saved.");
    })
}
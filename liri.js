require("dotenv").config();

// variables
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");

// gets the spotify key
var spotify = new Spotify(keys.spotify);

// npm module used to write output to console and log.txt at the same time
var log = require("simple-node-logger").createSimpleFileLogger(filename);
log.setLevel("all");


var userInput = process.argv[2];
var secondUserInput = process.argv[3];

for (let i = 4; i < process.argv.length; i++) {
    secondUserInput += "+" + process.argv[i];
}

var getArtistName = function (artist) {
    return artist.name;
}

// funciton for searching spotify - the command is spotify-this-song
var getSpotify = function (songName) {

        if (songName === underfined) {
            songName = "The Ace";}

        spotify.search(
            {
                type: "track",
                query: userCommand
            },
            function (err, data) {
                if (err) {
                    console.log("Error ocurred: " + err);
                    return;
                }

                var songs = data.tracks.items;

                for (let i = 0; i < songs.length; i++) {
                    console.log(i);
                    console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                    console.log("song name: " + songs[i].name);
                    console.log("preview song: " + songs[i].preview_url);
                    console.log("album: " + songs[i].album.name);
                    console.log("-----------------------------------");

                }
            });
        };

        function mySwitch (userCommand){
            switch (userCommand){
                case "spotify-this-song";
                getSpotify();
                break;
            }
        }

        mySwitch(userCommand);
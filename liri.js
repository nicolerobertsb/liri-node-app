require("dotenv").config();

// variables
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");

// gets the spotify key
var spotify = new Spotify(keys.spotify);

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

        if (songName === undefined) {
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
                console.log(songs);


                for (let i = 0; i < songs.length; i++) {
                    console.log(i);
                    console.log("Artist(s): " + songs[i].artists.map(getArtistNames));
                    console.log("Song name: " + songs[i].name);
                    console.log("Preview song: " + songs[i].preview_url);
                    console.log("Album: " + songs[i].album.name);
                    console.log("-----------------------------------");
                    
                }
            });
        };

        function mySwitch (userInput){
            switch (userInput){

                case "spotify-this-song":
                getSpotify();
                break;

                case "movie-this":
                    getMovie();
                    break;
        
                case "do-what-it-says":
                    doWhat();
                    break;
            }

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
        function doWhat() {
            //Read random.txt file
            fs.readFile("random.txt", "utf8", function (error, data) {
                if (!error);
                console.log(data.toString());
                //split text with comma 
                var cmds = data.toString().split(',');
            });
        }
    
    }

        mySwitch(userInput);
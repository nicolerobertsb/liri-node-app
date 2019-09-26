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

        function mySwitch (userCommand){
            switch (userCommand){

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
            
            var movieName = secondCommand;
            // Then run a request to the OMDB API with the movie specified
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy";
    
            request(queryUrl, function (error, response, body) {
    
                // If the request is successful = 200
                if (!error && response.statusCode === 200) {
                    var body = JSON.parse(body);
    
                    //Simultaneously output to console and log.txt via NPM simple-node-logger
                    logOutput('----Movie Info----');
                    logOutput("Title: " + body.Title);
                    logOutput("Release Year: " + body.Year);
                    logOutput("IMdB Rating: " + body.imdbRating);
                    logOutput("Country: " + body.Country);
                    logOutput("Language: " + body.Language);
                    logOutput("Plot: " + body.Plot);
                    logOutput("Actors: " + body.Actors);
                    logOutput("Rotten Tomatoes Rating: " + body.Ratings[2].Value);
                    logOutput("Rotten Tomatoes URL: " + body.tomatoURL);
                    logOutput('-------------');
    
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
                //split text with comma delimiter
                var cmds = data.toString().split(',');
            });
        }
    
    }

        mySwitch(userCommand);
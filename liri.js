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

// function for getting concert information - command is concer-this
function concert() {
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(url)
        .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                console.log("----Concert Info----");
                console.log("Name of the venue: " + response.data[i].venue.data);
                console.log("Venue Location: " + response.data[i].venue.city + response.data[i].venue.country);
                console.log("Date of the Event: " + response.data[i].venue.datetime);
                console.log("-----------");

            }
        })
}

var getArtistName = function (artist) {
    return artist.name;
}
// funciton for searching spotify - the command is spotify-this-song

function getSpotify(songName) {

    if (songName === undefined) {
        songName = "The Ace";
    }

    spotify.search({
            type: "track",
            query: secondUserInput
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
    fs.appendFile("log.txt", userInput + " : " + name + "\n", function (error) {
        if (error) {
            throw error;
        }
        console.log("Saved.");
    })
}
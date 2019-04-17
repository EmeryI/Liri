require("dotenv").config();
const axios = require('axios');
const fs = require('fs');
var moment = require('moment');

// var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
// console.log('thisis being called')
var nodeArgs = process.argv;
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: "ddfef8fe67d64152853bf0c6d61e8d13",
    secret: "8b73033b98b844b9b8939fc32744bfba"
});

// console.log(nodeArgs, "nodeArgs")

//know what command its asking
var action = nodeArgs[2];
// console.log(action)
//know the name / info user is asking for 
//once you know info call that partiular function 

if (nodeArgs[2] == 'concert-this') {
    console.log("made it here")
    concert(nodeArgs[3]);
    console.log("im here");
} else if (nodeArgs[2] == 'spotify-this-song') {
    song(nodeArgs[3]);
    console.log("im here2");
} else if (nodeArgs[2] == `movie-this`) {
    movie(nodeArgs[3]);
    console.log("im here3");
} else if (nodeArgs[2] == `do-what-it-says`) {
    fileRead();
    // First I want to read the file
    // fs.readFile('./random.txt', function read(err, data) {
    //     if (err) {
    //         throw err;
    //     }
    //     content = data;
    //     console.log(content); // Put all of the 
    // });
}

function fileRead() {

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);

    });
}

function concert(artist) {

    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function(response) {
            // If the axios was successful...
            // Then log the body from the site!
            // console.log(response.data.length);
            var array = [];
            for (i = 0; i < response.data.length; i++) {
                let data = {
                    name: response.data[i]['venue']['name'],
                    venue: response.data[i]['venue']['city'],
                    date: moment(response.data[i]['datetime']).format("MM/DD/YYYY"),
                };
                array.push(data);

            }
            console.log(array, "array");
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });



}

function song(songname) {
    spotify.search({ type: 'track', query: songname }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (i = 0; i < data.tracks.items.length; i++) {
            console.log("ARTIST NAME:" + data.tracks.items[1].album.artists[0].name);
            console.log("SONG:" + data.tracks.items[i].name);
            console.log("Album Name:" + data.tracks.items[i].album.name);
            console.log("Preview Link:" + data.tracks.items[i].external_urls.spotify);
        }
        // console.log("ARTIST NAME:" + data.tracks.items[1].album.artists[0].name);
        // console.log("SONG:" + data.tracks.items[1].name);
        // console.log("Album Name:" + data.tracks.items[1].album.name);
        // console.log("Preview Link:" + data.tracks.items[1].external_urls.spotify);
    });
}

function movie(movieName) {
    var movie;

    if (movieName == undefined) {
        movie = "Mr Nobody";
    } else {
        movie = movieName;
    }
    console.log(movieName)
    axios
        .get("http://www.omdbapi.com/?apikey=e63761b0&t=" + movie)
        .then(function(response) {
            console.log(response.data)
        })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });



}
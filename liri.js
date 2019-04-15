require("dotenv").config();
const axios = require('axios');
const fs = require('fs');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var nodeArgs = process.argv;

console.log(nodeArgs)

//know what command its asking
var action = nodeArgs[2];
//know the name / info user is asking for 
//once you know info call that partiular function 

if (nodeArgs[2] == 'concert-this') {
    concert(nodeArgs[3]);
    console.log("im here");
} else if (nodeArgs[2] == 'spotify-this-song') {
    // movie();
    console.log("im here2");
} else if (nodeArgs[2] == `movie-this`) {
    // movie();
    console.log("im here3");
} else if (nodeArgs[2] == `do-what-it-says`) {
    // First I want to read the file
    fs.readFile('./random.txt', function read(err, data) {
        if (err) {
            throw err;
        }
        content = data;
        console.log(content); // Put all of the 
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
            console.log(array);
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
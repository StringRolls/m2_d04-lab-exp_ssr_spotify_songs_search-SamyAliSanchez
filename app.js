require("dotenv/config");

const express = require("express");
const hbs = require("hbs");

// require spotify-web-api-node package here:
// as we will work inside the routes folder that needs to be there, so we can call the API
// const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// setting the spotify-api goes here:
/*
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));

*/

// 🪙 Routers
const indexRouter = require("./routes/index");

// 👇 Handling routes here
app.use("/", indexRouter);

const PORT = process.env.PORT;
app.listen(PORT || 3000, () =>
  console.log(`My Spotify project running on port ${PORT} 🎧 🥁 🎸 🔊`)
);

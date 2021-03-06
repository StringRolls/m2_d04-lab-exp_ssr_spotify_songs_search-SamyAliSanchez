require("dotenv/config");

const express = require("express");
const hbs = require("hbs");

// require spotify-web-api-node package here:
const SpotifyWebApi = require("spotify-web-api-node");

// setting the spotify-api goes here:

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Retrieve an access token

spotifyApi
 .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );

const app = express();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));



// Our routes go here:
app.get("/", (req, res) => {
  res.render("index");
});

//artists

app.get("/artist-search", (req, res) => {
  const cappuccino = req.query.artist;
  spotifyApi
    .searchArtists(cappuccino) //searchString
    .then((data) => {
      console.log("The received data from the API: ", data.body.artists.items);
      res.render("artist-search-results", { artists: data.body.artists.items });
      //res.render("result-page", { data: res });
    })
    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
});

//albums
app.get("/albums/:id", (req, res) => {
  const request = req.params["id"];

  spotifyApi
    .getArtistAlbums(request)
    .then((data) => {
      console.log(data.body);
      res.render("albums", { albums: data.body.items });
    })

    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
});

//tracks
app.get("/tracks/:id", (req, res) => {
  const request = req.params["id"];

  spotifyApi
    .getAlbumTracks(request)
    .then(data => {
      console.log(data.body);
      res.render("tracks", { tracks: data.body.items });
    })

    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
});

app.listen(3000, () =>
  console.log("My Spotify project running on port 3000 ???? ???? ???? ????")
);

const express = require("express");
const router = express.Router();

const SpotifyWebApi = require("spotify-web-api-node");

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

router.get("/", (req, res, next) => {
  res.render("index");
});

// GET '/artist-search?artist=nombre-del-artista' => devuelve artistas que corresponden a ese nombre
router.get("/artist-search", (req, res, next) => {
  const { artist } = req.query;

  spotifyApi
    .searchArtists(artist)
    .then((data) => {
      console.log("data -> ", data);
      const artistsArray = data.body.artists.items;
      res.render("artist-search-results", { artists: artistsArray });
    })
    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
});
// SOLUTION with async/await
// router.get('/artist-search', async (req, res, next) => {
//   const { artist } = req.query;
//   try {
//     const promise = await spotifyApi.searchArtists(artist);
//     const artistsArray = promise.body.artists.items;
//     res.render('artist-search-results', { artists: artistsArray });
//   } catch(err) {
//     console.log('The error while searching artists occurred: ', err);
//   }
// })

// GET '/albums/:artistId' => devuelve los albums de un artista en particular
router.get("/albums/:artistId", (req, res, next) => {
  const { artistId } = req.params;

  spotifyApi
    .getArtistAlbums(artistId)
    .then((data) => {
      // console.log('data -> ', data);
      const artistAlbumsArray = data.body.items;
      res.render("albums", { albums: artistAlbumsArray });
    })
    .catch((err) =>
      console.log("The error while searching artist albums occurred: ", err)
    );
});
//SOLUTION with async/await
// router.get('/albums/:artistId', async (req, res, next) => {
//   const { artistId } = req.params;
//   try {
//     const promise = await spotifyApi.getArtistAlbums(artistId)
//     const artistAlbumsArray = promise.body.items;
//     res.render('albums', { albums: artistAlbumsArray });
//   } catch(err) {
//     console.log('The error while searching artist albums occurred: ', err);
//   }
// })

// GET '/tracks/:albumId' => devuelve los tracks de un album en particular
router.get("/tracks/:albumId", (req, res, next) => {
  const { albumId } = req.params;

  spotifyApi
    .getAlbumTracks(albumId)
    .then((data) => {
      // console.log('data -> ', data);
      const albumTracksArray = data.body.items;
      res.render("tracks", { tracks: albumTracksArray });
    })
    .catch((err) =>
      console.log("The error while searching album tracks occurred: ", err)
    );
});

// SOLUTION with async/await
// router.get('/tracks/:albumId', async (req, res, next) => {
//   const { albumId } = req.params;
//   try {
//     const promise = await spotifyApi.getAlbumTracks(albumId);
//     const albumTracksArray = promise.body.items;
//     res.render('tracks', { tracks: albumTracksArray });
//   } catch(err) {
//     console.log('The error while searching album tracks occurred: ', err);
//   }
// })

module.exports = router;

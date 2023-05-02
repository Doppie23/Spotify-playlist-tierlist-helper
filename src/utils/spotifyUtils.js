export async function getUserPlaylists(spotifyApi) {
  try {
    let userName = await spotifyApi.getMe();
    userName = userName.body.display_name;

    let offset = 0;
    let playlists = [];
    while (true) {
      const [niewe_playlists, oudeoffset] = await getPlatlistBatch(userName, offset, spotifyApi);
      playlists.push(...niewe_playlists);
      offset = oudeoffset + 50;
      if (niewe_playlists.length <= 0) {
        break;
      }
    }
    return playlists;
  } catch (error) {
    console.log(error);
  }
}

async function getPlatlistBatch(userName, offset, spotifyApi) {
  const niewe_playlists = await spotifyApi.getUserPlaylists(userName, { offset: offset });
  return [niewe_playlists.body.items, offset];
}

export async function getAllSongs(id, spotifyApi) {
  var data = await spotifyApi.getPlaylistTracks(id);
  var numBatches = Math.floor(data.body.total / 100) + 1;
  var promises = [];
  for (let batchNum = 0; batchNum < numBatches; batchNum++) {
    var promise = getSongs(id, batchNum * 100, spotifyApi);
    promises.push(promise);
  }
  var rawSongData = await Promise.all(promises);
  var songs = [];
  for (let i = 0; i < rawSongData.length; i++) {
    songs = songs.concat(rawSongData[i].body.items);
  }
  return songs;
}

async function getSongs(id, offset, spotifyApi) {
  var songs = await spotifyApi.getPlaylistTracks(id, { offset: offset });
  return songs;
}

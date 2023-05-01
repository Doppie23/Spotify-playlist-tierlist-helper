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

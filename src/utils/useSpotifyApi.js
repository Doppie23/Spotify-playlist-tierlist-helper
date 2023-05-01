import { getToken } from "./authUtils";
import SpotifyWebApi from "spotify-web-api-node";

export default function createSpotifyApi() {
  const ClientID = import.meta.env.VITE_CLIENTID;
  const ClientSecret = import.meta.env.VITE_CLIENTSECRET;

  const code = getToken();
  let SpotifyApi = new SpotifyWebApi({
    clientId: ClientID,
    clientSecret: ClientSecret,
    redirectUri: "http://localhost:5173",
  });
  SpotifyApi.setAccessToken(code);
  return SpotifyApi;
}

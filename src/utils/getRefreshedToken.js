// Enviroment variables, needed to connect to our Spotify APP and get an access token
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"

export default async function getRefreshedToken(refreshToken) {
    // First we need to encode the credentials to a base 64
    const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;
    const encodedCredentials = btoa(credentials);

    // fetch parameters, wanted by Spotify
    const authParameters = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${encodedCredentials}`
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`
    }

    // We need this access token from our APP to use de Spotify API
    const response = await fetch(TOKEN_ENDPOINT, authParameters)
    const tokenData = await response.json()

    return tokenData.access_token
}
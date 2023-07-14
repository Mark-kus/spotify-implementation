// Enviroment variables, needed to connect to our Spotify APP and get an access token
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"
const REDIRECT_URI = "http://localhost:5173"

export default async function getUserToken(code) {
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
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}`
    }

    // We need this access token from our APP to use de Spotify API
    const response = await fetch(TOKEN_ENDPOINT, authParameters)
    const tokenData = await response.json()

    window.localStorage.setItem("refresh_token", tokenData.refresh_token)
    window.localStorage.removeItem("code")

    return tokenData.access_token
}
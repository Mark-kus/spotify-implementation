// Enviroment variables, needed to connect to our Spotify APP and get an access token
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token"

export default async function getAppToken () {
    // fetch parameters, wanted by Spotify
    const authParameters = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    }

    // We need this access token from our APP to use de Spotify API
    const response = await fetch(TOKEN_ENDPOINT, authParameters)
    const tokenData = await response.json()

    return tokenData.access_token
}
import formatResource from "./formatResource"
import getToken from "./getToken";

export default async function getResource(input, token) {
    // Need to get token at time of request, cause it lasts a short time
    const access_token = !token ? await getToken() : null

    // fetch parameters, wanted by Spotify
    const searchParameters = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token || access_token}`
        }
    }
    console.log(token, access_token);
    // The URL the user is going to insert will be like this one:
    // https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3?si=f347b29465f84a9b
    // We'll need the type      /\  and the id /\
    const url = input.replace("https://open.spotify.com/", "")

    // NOTE: The type to insert in the API request, should be in plural
    const searchType = url.slice(0, url.indexOf("/")) + "s"

    // It may not include the ?, so just in case:
    const endOfResource = url.includes("?") ? url.indexOf("?") : url.length
    const searchId = url.slice(url.indexOf("/") + 1, endOfResource)
    const data2 = await fetch('https://api.spotify.com/v1/search?q=Unholy&type=track&include_external=audio', {
      headers: {
        Authorization: `Bearer ${token}`
      }})
    const response2 = await data2.json()
    console.log("response", response2);
    // So, we now get to fetch the data
    const response = await fetch(`https://api.spotify.com/v1/${searchType}/${searchId}`, searchParameters)
    const data = await response.json()
    console.log(data);

    // Return only the data we are going to use
    return formatResource(data, searchType)
}
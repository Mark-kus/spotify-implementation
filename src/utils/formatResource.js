export default function formatResource(data, searchType) {
    // Returned resource format
    // The start type of each variable is unchanged if it is not necessary, to avoid errors (such as tracks.length being undefined)
    const formatedResource = {
        name: null,
        owner: null,
        image: null,
        tracks: [],
        url: null,
        type: null,
        genres: [],
    }

    // Each type gives us the data in different ways
    switch (searchType) {
        case "tracks":

            const formatedTrack = {
                name: null,
                preview_url: data.preview_url,
                author: data.artists.map(artist => {
                    return artist.name
                }),
                time: data.duration_ms
            }

            formatedResource.name = data.name
            formatedResource.owner = data.album.artists[0].name
            formatedResource.image = data.album.images[0].url
            formatedResource.tracks = [formatedTrack]
            formatedResource.url = data.external_urls.spotify
            formatedResource.type = data.type

            return formatedResource

        case "playlists":

            const formatedTracks = data.tracks.items.map(track => {
                return {
                    name: track.track.name,
                    preview_url: track.track.preview_url,
                    author: track.track.artists.map(artist => {
                        return artist.name
                    }),
                    time: track.track.duration_ms
                }
            })

            formatedResource.name = data.name
            formatedResource.owner = data.owner.display_name
            formatedResource.image = data.images[0].url
            formatedResource.tracks = [...formatedTracks]
            formatedResource.url = data.external_urls.spotify
            formatedResource.type = data.type

            return formatedResource

        case "users":

            formatedResource.name = data.display_name
            formatedResource.owner = `${data.followers.total}`
            formatedResource.image = data.images[data.images.length - 1].url || "https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021"
            formatedResource.tracks = []
            formatedResource.url = data.external_urls.spotify
            formatedResource.type = data.type

            return formatedResource

        case "artists":

            formatedResource.name = data.name
            formatedResource.owner = `${data.popularity}`
            formatedResource.image = data.images[data.images.length - 1].url
            formatedResource.tracks = []
            formatedResource.url = data.external_urls.spotify
            formatedResource.type = data.type
            formatedResource.genres = data.genres

            return formatedResource

        default:
            return data
    }

}
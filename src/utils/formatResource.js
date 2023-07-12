export default function formatResource(data, searchType) {
    // Returned resource format
    const formatedResource = {
        name: null,
        owner: null,
        image: null,
        tracks: [],
    }

    // Each type gives us the data in different ways
    switch (searchType) {
        case "tracks":
            // The track property just holds the preview_url
            const formatedTrack = {
                name: null,
                preview_url: data.preview_url
            }

            formatedResource.name = data.name
            formatedResource.owner = data.album.artists[0].name
            formatedResource.image = data.album.images[0].url
            formatedResource.tracks = [formatedTrack]

            return formatedResource

        case "playlists":
            // The tracks property holds each name and preview_url
            const formatedTracks = data.tracks.items.map(track => {
                return {
                    name: track.track.name,
                    preview_url: track.track.preview_url
                }
            })

            formatedResource.name = data.name
            formatedResource.owner = data.owner.display_name
            formatedResource.image = data.images[0].url
            formatedResource.tracks = [...formatedTracks]

            return formatedResource

        case "users":
            // The tracks property holds an empty array
            // If there is no image, gives a default cdn
            formatedResource.name = data.display_name
            formatedResource.owner = data.publisher
            formatedResource.image = data.images[data.images.length - 1].url || "https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021"
            formatedResource.tracks = []

            return formatedResource

        default:
            return data
    }

}
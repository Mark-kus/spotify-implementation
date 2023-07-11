export default function formatResource(data, searchType) {

    const formatedResource = {
        name: null,
        owner: null,
        image: null,
        tracks: [],
    }

    // Each type gives us the data in different ways
    switch (searchType) {
        case "tracks":
            formatedResource.name = data.name
            formatedResource.owner = data.album.artists[0].name
            formatedResource.image = data.album.images[0].url
            return formatedResource

        case "playlists":
            formatedResource.name = data.name
            formatedResource.owner = data.owner.display_name
            formatedResource.image = data.images[0].url
            formatedResource.tracks = [...data.tracks.items]
            return formatedResource

        case "shows":
            formatedResource.name = data.name
            formatedResource.owner = data.publisher
            formatedResource.image = data.images[0].url
            return formatedResource

        case "users":
            formatedResource.name = data.display_name
            formatedResource.owner = data.publisher
            formatedResource.image = "https://i.scdn.co/image/ab6761610000e5eb55d39ab9c21d506aa52f7021"
            return formatedResource

        default:
            return data
    }

}
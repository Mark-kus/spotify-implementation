import "./Curtain.css"

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

const REDIRECT_URI = "http://localhost:5173"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "code"

export default function Curtain({refreshToken, code}) {
    return (
        <>
            {refreshToken || code ? null
                : <div className='curtain'>
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
                </div>
            }
        </>
    )
}
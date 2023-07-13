import './App.css'
import { useEffect, useState } from 'react'
import getResource from './utils/getResource'
import Player from "./components/Player/Player";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

const REDIRECT_URI = "http://localhost:5173"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

function App() {
  const [resource, setResource] = useState()
  const [token, setToken] = useState(null)

  async function search(e) {
    // Request the resource
    setResource(await getResource(e.target.value, token))
  }

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }
    setToken(token)
  }, [])

  const searchByName = async () => {
    const data = await fetch('https://api.spotify.com/v1/search?q=Unholy&type=track&include_external=audio', {
      headers: {
        Authorization: `Bearer ${token}`
      }})
    const response = await data.json()
    console.log(response);
  }

  return (
    <>
      <div className='container'>
          <iframe style={{ "border-radius": "12px" }} src="https://open.spotify.com/embed/playlist/7tmqxXppNtc5XvWsBHUcFA?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <div>
          {resource?.name ?
            <Player resource={resource} />
            : null}
        </div> <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
          to Spotify</a>

        <div key={1} className='embedSpotify'>
          <input
            placeholder='Coloca aquí el link'
            className='input-spotify-link'
            value="https://open.spotify.com/playlist/7tmqxXppNtc5XvWsBHUcFA?si=23b6e1a4570044e1"
            onKeyDown={
              (e) => {
                if (e.key === "Enter" && e.target.value.length > 0) {
                  search(e)
                }
              }
            }
          />
        </div>
      </div>
    </>
  )
}

export default App

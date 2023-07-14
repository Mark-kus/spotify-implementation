import './App.css'
import { useEffect, useState } from 'react'
import getResource from './utils/getResource'
import Player from "./components/Player/Player";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

const REDIRECT_URI = "http://localhost:5173"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "code"

function App() {
  const [resource, setResource] = useState()
  const [refreshToken, setRefreshToken] = useState(null)
  const [code, setCode] = useState(null)

  async function search(e) {
    // Request the resource
    setResource(await getResource(e.target.value, code, refreshToken))
  }

  useEffect(() => {
    // Asigna, si hay un refresh_token en localStorage
    const refreshT = window.localStorage.getItem("refresh_token")
    if (refreshT) setRefreshToken(refreshT)
    else {
      // Verifica si el code tras iniciar sesion existe en el localStorage
      const hash = window.location.search
      let code = window.localStorage.getItem("code")
      if (!code && hash) {
        code = hash.substring(1).split("&").find(elem => elem.startsWith("code")).split("=")[1]

        window.location.search = ""
        window.localStorage.setItem("code", code)
      }
      setCode(code)
    }
  }, [])

  return (
    <>
      <div className='main-container'>
        <div>
          {resource?.name ?
            <div className="container">
              <Player resource={resource} />
              {refreshToken || code ? null :
                <div className='curtain'>
                  <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
                </div>}
            </div>
            : <div className='embedSpotify'>
              <svg fill="limegreen" role="img" height="48" width="48" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22zm5.045 15.866a.686.686 0 0 1-.943.228c-2.583-1.579-5.834-1.935-9.663-1.06a.686.686 0 0 1-.306-1.337c4.19-.958 7.785-.546 10.684 1.226a.686.686 0 0 1 .228.943zm1.346-2.995a.858.858 0 0 1-1.18.282c-2.956-1.817-7.464-2.344-10.961-1.282a.856.856 0 0 1-1.11-.904.858.858 0 0 1 .611-.737c3.996-1.212 8.962-.625 12.357 1.462a.857.857 0 0 1 .283 1.179zm.116-3.119c-3.546-2.106-9.395-2.3-12.78-1.272a1.029 1.029 0 0 1-.597-1.969c3.886-1.18 10.345-.952 14.427 1.471a1.029 1.029 0 0 1-1.05 1.77z"></path></svg>
              <input
                placeholder='Coloca aquí el link'
                className='input-spotify-link'
                onKeyDown={
                  (e) => {
                    if (e.key === "Enter" && e.target.value.length > 0) {
                      search(e)
                    }
                  }
                }
              />
            </div>}
        </div>
      </div>
    </>
  )
}

export default App

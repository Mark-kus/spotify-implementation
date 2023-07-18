import './App.css'
import { useEffect, useState } from 'react'
import getResource from './utils/getResource'

import Player from "./components/Player/Player";
import LoadingRing from './components/LoadingRing/LoadingRing';
import SearchInput from './components/SearchInput/SearchInput';
import Curtain from './components/Curtain/Curtain';

function App() {
  const [resource, setResource] = useState()
  const [refreshToken, setRefreshToken] = useState(null)
  const [code, setCode] = useState(null)

  const [loading, setLoading] = useState(true)

  async function search(e, spotifyURL) {
    if (!loading) setLoading(true)
    const resource = spotifyURL || e.target.value

    // Request the resource and saves the URL on localStorage if needed
    if (!spotifyURL) window.localStorage.setItem("spotifyURL", resource)
    setResource(await getResource(resource, code, refreshToken))
    setLoading(false)
  }

  useEffect(() => {
    // Verifies if there is a spotifyURL on localStorage
    const spotifyURL = window.localStorage.getItem("spotifyURL")
    if (spotifyURL) search(null, spotifyURL)
    else setLoading(false)

    // Assigns, if there is one, refresh_token from the localStorage
    const refreshT = window.localStorage.getItem("refresh_token")
    if (refreshT) setRefreshToken(refreshT)
    else {
      // Verifies if code exists in localSotrage
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
        <div className="container">
          {resource?.name && <Player resource={resource} />}
          {resource?.name && <Curtain refreshToken={refreshToken} code={code} />}
        </div>
        {loading ? <LoadingRing /> : !resource?.name && <SearchInput search={search} loading={loading} />}
      </div>
    </>
  )
}

export default App

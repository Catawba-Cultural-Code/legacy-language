import { Fab, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'

const Player = ({ base64 }) => {
  const AUDIO = new Audio(base64)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState(false)
  const hasEnded = (event) => {
    setIsPlaying(false)
    console.log('done!')
    event.currentTarget.removeEventListener(event.type, hasEnded)
  }
  const handlePlay = () => {
    setIsPlaying(true)
    AUDIO.play()
      .then(() => {
        AUDIO.addEventListener('ended', hasEnded)
      })
      .catch((e) => {
        console.error(e)
        setError(true)
      })
  }

  return (
    <Grid item>
      <Fab onClick={handlePlay} disabled={isPlaying}>
        {error ? <ErrorOutlineIcon /> : <PlayArrowIcon />}
      </Fab>
    </Grid>
  )
}

export default React.memo(Player)
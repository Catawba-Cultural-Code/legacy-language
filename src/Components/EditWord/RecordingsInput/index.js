import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, MicIcon, NoMicIcon, Paper, Player } from 'Components'
import useEdit from '../useEdit'
import useRecorder from './useRecorder'

export const RecInput = styled.div`
  grid-area: r;
  background-color: ${({ theme }) => theme.light};
  transition: all 1s;
  opacity: ${({ show = true }) => (show ? `1` : `0`)};
`
const RecordingsGrid = styled(RecInput)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const AudioPaper = styled(Paper)`
  margin: 5px;
  padding: 10px;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  grid-auto-flow: columns;
  grid-gap: 10px;
`
const MicButton = styled(Button)`
  background-color: ${({ theme, status, disabled = false, isRecording }) => {
    // status === 'recording' ? theme.red : theme.secondary};
    if (disabled) {
      return '#ccc'
    } else {
      if (isRecording) {
        return theme.red
      } else {
        return theme.yellow
      }
    }
  }};
`
const Recordings = ({ show }) => {
  const { recordings, replace } = useEdit()
  const [loaded, setLoaded] = useState(false)
  // const [recs, setRecs] = useState([])
  // const [loaded, setLoaded] = useState(false)
  const property = 'recordings'
  // useEffect(() => {
  //   console.log('recording input', recordings)
  //   if (recordings !== undefined && !loaded) {
  //     console.log("setting recordings")
  //     setRecs(recordings)
  //     setLoaded(true)
  //   }
  // }, [recordings])
  // useEffect(() => {

  // }, [recs])

  const removeRec = (i) => {
    // setRecs((arr) => arr.toSpliced(i, 1))
    replace(property, recordings.toSpliced(i, 1))
  }

  const {
    permission,
    recordingStatus,
    startRecording,
    stopRecording,
    getMicrophonePermission,
  } = useRecorder(({ base64 }) => {
    // setRecs((arr) => [...arr, base64])
    replace(property, [...recordings, base64])
  })
  useEffect(() => {
    if (recordings !== undefined) {
      console.log('not undefined')
      setLoaded(true)
    }
  }, [recordings])
  return (
    <RecordingsGrid show={show}>
      <AudioPaper color='transparent'>
        {!permission ? (
          <MicButton
            round={true}
            onClick={getMicrophonePermission}
            disabled={true}
          >
            <NoMicIcon />
          </MicButton>
        ) : (
          <MicButton
            round={true}
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            isRecording={recordingStatus === 'recording'}
          >
            <MicIcon />
          </MicButton>
        )}
      </AudioPaper>
      {loaded &&
        recordings.map((base64, i) => {
          return (
            <AudioPaper key={i} color='transparent'>
              <Player base64={base64} />
              <Button onClick={() => removeRec(i)}>Delete</Button>
            </AudioPaper>
          )
        })}
    </RecordingsGrid>
  )
}

export default Recordings
